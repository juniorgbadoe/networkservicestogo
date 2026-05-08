import express from 'express';
import { query } from '../config/db.js';
import { authMiddleware } from '../utils/jwt.js';
import { createSlug } from '../utils/slug.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { actif } = req.query;

    let sql = 'SELECT * FROM services WHERE 1=1';
    const values = [];

    if (actif !== undefined) {
      values.push(actif === 'true');
      sql += ' AND actif = $1';
    }

    sql += ' ORDER BY ordre ASC, id ASC';

    const result = await query(sql, values);
    res.json({ services: result.rows });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ error: 'Erreur récupération services' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await query('SELECT * FROM services WHERE slug = $1 AND actif = TRUE', [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service non trouvé' });
    }

    res.json({ service: result.rows[0] });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ error: 'Erreur récupération service' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { titre, description, icon, couleur, features, ordre = 0 } = req.body;

    if (!titre || !description) {
      return res.status(400).json({ error: 'Titre et description requis' });
    }

    const slug = createSlug(titre);
    const featuresArray = features ? (typeof features === 'string' ? JSON.parse(features) : features) : [];

    const result = await query(
      'INSERT INTO services (titre, slug, description, icon, couleur, features, ordre) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [titre, slug, description, icon || null, couleur || null, JSON.stringify(featuresArray), ordre]
    );

    res.json({ success: true, service: result.rows[0] });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ error: 'Erreur création service' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, icon, couleur, features, ordre, actif } = req.body;

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
    if (icon !== undefined) {
      values.push(icon);
      updates.push(`icon = $${paramCount++}`);
    }
    if (couleur !== undefined) {
      values.push(couleur);
      updates.push(`couleur = $${paramCount++}`);
    }
    if (features !== undefined) {
      values.push(typeof features === 'string' ? JSON.parse(features) : features);
      updates.push(`features = $${paramCount++}`);
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
      `UPDATE services SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service non trouvé' });
    }

    res.json({ success: true, service: result.rows[0] });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ error: 'Erreur mise à jour service' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM services WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ error: 'Erreur suppression service' });
  }
});

export default router;
