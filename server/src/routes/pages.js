import express from 'express';
import { query } from '../config/db.js';
import { authMiddleware } from '../utils/jwt.js';

const router = express.Router();

router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await query('SELECT * FROM pages WHERE slug = $1', [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Page non trouvée' });
    }

    res.json({ page: result.rows[0] });
  } catch (error) {
    console.error('Get page error:', error);
    res.status(500).json({ error: 'Erreur récupération page' });
  }
});

router.put('/:slug', authMiddleware, async (req, res) => {
  try {
    const { slug } = req.params;
    const { titre, contenu, meta_title, meta_desc } = req.body;

    const existing = await query('SELECT id FROM pages WHERE slug = $1', [slug]);

    if (existing.rows.length === 0) {
      const result = await query(
        'INSERT INTO pages (slug, titre, contenu, meta_title, meta_desc) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [slug, titre || slug, contenu ? JSON.stringify(contenu) : null, meta_title || null, meta_desc || null]
      );
      return res.json({ success: true, page: result.rows[0] });
    }

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (titre !== undefined) {
      values.push(titre);
      updates.push(`titre = $${paramCount++}`);
    }
    if (contenu !== undefined) {
      values.push(typeof contenu === 'string' ? JSON.stringify(JSON.parse(contenu)) : JSON.stringify(contenu));
      updates.push(`contenu = $${paramCount++}`);
    }
    if (meta_title !== undefined) {
      values.push(meta_title);
      updates.push(`meta_title = $${paramCount++}`);
    }
    if (meta_desc !== undefined) {
      values.push(meta_desc);
      updates.push(`meta_desc = $${paramCount++}`);
    }

    values.push(new Date().toISOString());
    updates.push(`updated_at = $${paramCount++}`);

    values.push(slug);
    const result = await query(
      `UPDATE pages SET ${updates.join(', ')} WHERE slug = $${paramCount} RETURNING *`,
      values
    );

    res.json({ success: true, page: result.rows[0] });
  } catch (error) {
    console.error('Update page error:', error);
    res.status(500).json({ error: 'Erreur mise à jour page' });
  }
});

export default router;