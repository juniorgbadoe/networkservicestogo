import express from 'express';
import fs from 'fs';
import path from 'path';
import { query } from '../config/db.js';
import { upload, createThumbnail, uploadPaths } from '../middleware/upload.js';
import { authMiddleware } from '../utils/jwt.js';
import { createSlug } from '../utils/slug.js';

const router = express.Router();

function parseTags(tags) {
  if (tags == null) return null;

  const tagsStr = String(tags).trim();
  if (!tagsStr) return null;

  const cleaned = tagsStr.replace(/[\[\]{}]/g, '');
  const parsedTags = cleaned.split(',').map((tag) => tag.trim()).filter(Boolean);
  return parsedTags.length > 0 ? parsedTags : null;
}

async function createPhotoThumbnail(file) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.gif') {
    return file.filename;
  }

  const thumbnailFilename = file.filename.replace(ext, '-thumb.jpg');
  await createThumbnail(
    path.join(uploadPaths.photos, file.filename),
    path.join(uploadPaths.photos, thumbnailFilename)
  );

  return thumbnailFilename;
}

function removePhotoFiles(photo) {
  if (!photo) return;

  if (photo.fichier) {
    const filePath = path.join(uploadPaths.photos, photo.fichier);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  if (photo.miniature && photo.miniature !== photo.fichier) {
    const thumbPath = path.join(uploadPaths.photos, photo.miniature);
    if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);
  }
}

router.get('/categories', async (req, res) => {
  try {
    const { active } = req.query;
    const values = [];
    let paramCount = 1;
    let sql = 'SELECT * FROM galerie_categories WHERE 1=1';

    if (active !== undefined && active !== 'all') {
      values.push(active === 'true');
      sql += ` AND active = $${paramCount++}`;
    }

    sql += ' ORDER BY ordre ASC, id ASC';

    const result = await query(sql, values);
    res.json({ categories: result.rows });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ error: 'Erreur recuperation categories' });
  }
});

router.post('/categories', authMiddleware, async (req, res) => {
  try {
    const { nom, description, ordre = 0 } = req.body;

    if (!nom) {
      return res.status(400).json({ error: 'Nom requis' });
    }

    const result = await query(
      'INSERT INTO galerie_categories (nom, slug, description, ordre) VALUES ($1, $2, $3, $4) RETURNING *',
      [nom, createSlug(nom), description || null, ordre]
    );

    res.json({ success: true, category: result.rows[0] });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ error: 'Erreur creation categorie' });
  }
});

router.put('/categories/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, description, ordre, active } = req.body;
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (nom !== undefined) {
      values.push(nom);
      updates.push(`nom = $${paramCount++}`);
      values.push(createSlug(nom));
      updates.push(`slug = $${paramCount++}`);
    }
    if (description !== undefined) {
      values.push(description);
      updates.push(`description = $${paramCount++}`);
    }
    if (ordre !== undefined) {
      values.push(ordre);
      updates.push(`ordre = $${paramCount++}`);
    }
    if (active !== undefined) {
      values.push(active);
      updates.push(`active = $${paramCount++}`);
    }
    if (updates.length === 0) {
      return res.status(400).json({ error: 'Aucune modification fournie' });
    }

    values.push(id);
    const result = await query(
      `UPDATE galerie_categories SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    res.json({ success: true, category: result.rows[0] });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ error: 'Erreur mise a jour categorie' });
  }
});

router.delete('/categories/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const photos = await query('SELECT fichier, miniature FROM galerie_photos WHERE categorie_id = $1', [id]);
    photos.rows.forEach(removePhotoFiles);

    await query('DELETE FROM galerie_categories WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ error: 'Erreur suppression categorie' });
  }
});

router.get('/photos', async (req, res) => {
  try {
    const { categorie, active } = req.query;
    const values = [];
    let paramCount = 1;
    let sql = 'SELECT * FROM galerie_photos WHERE 1=1';

    if (categorie) {
      values.push(categorie);
      sql += ` AND categorie_id = $${paramCount++}`;
    }
    if (active !== undefined && active !== 'all') {
      values.push(active === 'true');
      sql += ` AND active = $${paramCount++}`;
    }

    sql += ' ORDER BY ordre ASC, created_at DESC';

    const result = await query(sql, values);
    res.json({ photos: result.rows });
  } catch (error) {
    console.error('Get photos error:', error);
    res.status(500).json({ error: 'Erreur recuperation photos' });
  }
});

router.get('/photos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM galerie_photos WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Photo non trouvee' });
    }

    res.json({ photo: result.rows[0] });
  } catch (error) {
    console.error('Get photo error:', error);
    res.status(500).json({ error: 'Erreur recuperation photo' });
  }
});

router.post('/photos', authMiddleware, upload.single('fichier'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Fichier requis' });
    }

    const { categorie_id, titre, description, alt_text, tags, ordre = 0 } = req.body;
    let miniature = req.file.filename;

    try {
      miniature = await createPhotoThumbnail(req.file);
    } catch (error) {
      console.error('Thumbnail error:', error);
    }

    const result = await query(
      'INSERT INTO galerie_photos (categorie_id, titre, description, fichier, miniature, alt_text, tags, ordre) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        categorie_id || null,
        titre || null,
        description || null,
        req.file.filename,
        miniature,
        alt_text || null,
        parseTags(tags) ? JSON.stringify(parseTags(tags)) : null,
        ordre,
      ]
    );

    res.json({ success: true, photo: result.rows[0] });
  } catch (error) {
    if (req.file) removePhotoFiles({ fichier: req.file.filename });
    console.error('Create photo error:', error);
    res.status(500).json({ error: 'Erreur creation photo' });
  }
});

router.put('/photos/:id', authMiddleware, upload.single('fichier'), async (req, res) => {
  try {
    const { id } = req.params;
    const { categorie_id, titre, description, alt_text, tags, ordre, active } = req.body;

    const existing = await query('SELECT fichier, miniature FROM galerie_photos WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Photo non trouvee' });
    }

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (categorie_id !== undefined) {
      values.push(categorie_id || null);
      updates.push(`categorie_id = $${paramCount++}`);
    }
    if (titre !== undefined) {
      values.push(titre || null);
      updates.push(`titre = $${paramCount++}`);
    }
    if (description !== undefined) {
      values.push(description || null);
      updates.push(`description = $${paramCount++}`);
    }
    if (alt_text !== undefined) {
      values.push(alt_text || null);
      updates.push(`alt_text = $${paramCount++}`);
    }
    if (tags !== undefined) {
      values.push(parseTags(tags) ? JSON.stringify(parseTags(tags)) : null);
      updates.push(`tags = $${paramCount++}`);
    }
    if (ordre !== undefined) {
      values.push(ordre);
      updates.push(`ordre = $${paramCount++}`);
    }
    if (active !== undefined) {
      values.push(active);
      updates.push(`active = $${paramCount++}`);
    }
    if (req.file) {
      let miniature = req.file.filename;
      try {
        miniature = await createPhotoThumbnail(req.file);
      } catch (error) {
        console.error('Thumbnail error:', error);
      }

      removePhotoFiles(existing.rows[0]);
      values.push(req.file.filename);
      updates.push(`fichier = $${paramCount++}`);
      values.push(miniature);
      updates.push(`miniature = $${paramCount++}`);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'Aucune modification fournie' });
    }

    values.push(id);
    const result = await query(
      `UPDATE galerie_photos SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    res.json({ success: true, photo: result.rows[0] });
  } catch (error) {
    if (req.file) removePhotoFiles({ fichier: req.file.filename });
    console.error('Update photo error:', error);
    res.status(500).json({ error: 'Erreur mise a jour photo' });
  }
});

router.delete('/photos/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await query('SELECT fichier, miniature FROM galerie_photos WHERE id = $1', [id]);
    removePhotoFiles(photo.rows[0]);

    await query('DELETE FROM galerie_photos WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Delete photo error:', error);
    res.status(500).json({ error: 'Erreur suppression photo' });
  }
});

export default router;
