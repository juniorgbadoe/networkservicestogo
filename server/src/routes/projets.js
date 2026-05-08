import express from 'express';
import fs from 'fs';
import path from 'path';
import { query } from '../config/db.js';
import { upload, createThumbnail, uploadPaths } from '../middleware/upload.js';
import { authMiddleware } from '../utils/jwt.js';
import { createSlug } from '../utils/slug.js';

const router = express.Router();

function parseJsonArray(value, fallback = []) {
  if (value == null || value === '') return fallback;
  if (Array.isArray(value)) return value;

  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return String(value).split(',').map((item) => item.trim()).filter(Boolean);
  }
}

async function buildProjectImage(file) {
  let miniature = file.filename;

  try {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.gif') {
      const thumbFilename = file.filename.replace(ext, '-thumb.jpg');
      await createThumbnail(
        path.join(uploadPaths.projets, file.filename),
        path.join(uploadPaths.projets, thumbFilename)
      );
      miniature = thumbFilename;
    }
  } catch (error) {
    console.error('Thumbnail error:', error);
  }

  return { fichier: file.filename, miniature, principal: true };
}

function removeProjectImageFiles(images) {
  const parsedImages = parseJsonArray(images);

  for (const image of parsedImages) {
    if (!image || typeof image !== 'object') continue;

    if (image.fichier) {
      const filePath = path.join(uploadPaths.projets, image.fichier);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    if (image.miniature && image.miniature !== image.fichier) {
      const thumbPath = path.join(uploadPaths.projets, image.miniature);
      if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);
    }
  }
}

router.get('/', async (req, res) => {
  try {
    const { categorie, actif } = req.query;
    const values = [];
    let paramCount = 1;
    let sql = 'SELECT * FROM projets WHERE 1=1';

    if (categorie) {
      values.push(categorie);
      sql += ` AND categorie = $${paramCount++}`;
    }
    if (actif !== undefined) {
      values.push(actif === 'true');
      sql += ` AND actif = $${paramCount++}`;
    }

    sql += ' ORDER BY ordre ASC, created_at DESC';

    const result = await query(sql, values);
    res.json({ projets: result.rows });
  } catch (error) {
    console.error('Get projets error:', error);
    res.status(500).json({ error: 'Erreur recuperation projets' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await query('SELECT * FROM projets WHERE slug = $1 AND actif = TRUE', [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Projet non trouve' });
    }

    res.json({ projet: result.rows[0] });
  } catch (error) {
    console.error('Get projet error:', error);
    res.status(500).json({ error: 'Erreur recuperation projet' });
  }
});

router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { titre, description, resultat, categorie, tags, images, ordre = 0 } = req.body;

    if (!titre || !description) {
      return res.status(400).json({ error: 'Titre et description requis' });
    }

    let slug = createSlug(titre);
    const existing = await query('SELECT id FROM projets WHERE slug = $1', [slug]);
    if (existing.rows.length > 0) {
      slug = `${slug}-${Date.now()}`;
    }

    const projectImages = [];
    if (req.file) {
      projectImages.push(await buildProjectImage(req.file));
    }
    projectImages.push(...parseJsonArray(images));

    const result = await query(
      'INSERT INTO projets (titre, slug, description, resultat, categorie, tags, images, ordre) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        titre,
        slug,
        description,
        resultat || null,
        categorie || null,
        JSON.stringify(parseJsonArray(tags)),
        JSON.stringify(projectImages),
        ordre,
      ]
    );

    res.json({ success: true, projet: result.rows[0] });
  } catch (error) {
    if (req.file) removeProjectImageFiles([{ fichier: req.file.filename }]);
    console.error('Create projet error:', error);
    res.status(500).json({ error: 'Erreur creation projet' });
  }
});

router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, resultat, categorie, tags, images, ordre, actif } = req.body;

    const existing = await query('SELECT images FROM projets WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Projet non trouve' });
    }

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (titre !== undefined) {
      values.push(titre);
      updates.push(`titre = $${paramCount++}`);
      values.push(createSlug(titre));
      updates.push(`slug = $${paramCount++}`);
    }
    if (description !== undefined) {
      values.push(description);
      updates.push(`description = $${paramCount++}`);
    }
    if (resultat !== undefined) {
      values.push(resultat || null);
      updates.push(`resultat = $${paramCount++}`);
    }
    if (categorie !== undefined) {
      values.push(categorie || null);
      updates.push(`categorie = $${paramCount++}`);
    }
    if (tags !== undefined) {
      values.push(JSON.stringify(parseJsonArray(tags)));
      updates.push(`tags = $${paramCount++}`);
    }
    if (images !== undefined || req.file) {
      let nextImages = images !== undefined ? parseJsonArray(images) : parseJsonArray(existing.rows[0].images);

      if (req.file) {
        removeProjectImageFiles(existing.rows[0].images);
        nextImages = [await buildProjectImage(req.file), ...parseJsonArray(images)];
      }

      values.push(JSON.stringify(nextImages));
      updates.push(`images = $${paramCount++}`);
    }
    if (ordre !== undefined) {
      values.push(ordre);
      updates.push(`ordre = $${paramCount++}`);
    }
    if (actif !== undefined) {
      values.push(actif);
      updates.push(`actif = $${paramCount++}`);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'Aucune modification fournie' });
    }

    values.push(new Date().toISOString());
    updates.push(`updated_at = $${paramCount++}`);

    values.push(id);
    const result = await query(
      `UPDATE projets SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    res.json({ success: true, projet: result.rows[0] });
  } catch (error) {
    if (req.file) removeProjectImageFiles([{ fichier: req.file.filename }]);
    console.error('Update projet error:', error);
    res.status(500).json({ error: 'Erreur mise a jour projet' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const projet = await query('SELECT images FROM projets WHERE id = $1', [id]);
    if (projet.rows.length > 0) {
      removeProjectImageFiles(projet.rows[0].images);
    }

    await query('DELETE FROM projets WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Delete projet error:', error);
    res.status(500).json({ error: 'Erreur suppression projet' });
  }
});

export default router;
