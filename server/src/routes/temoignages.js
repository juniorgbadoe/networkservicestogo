import express from 'express';
import { query } from '../config/db.js';
import { authMiddleware } from '../utils/jwt.js';
import { upload, uploadPaths } from '../middleware/upload.js';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { actif } = req.query;

    let sql = 'SELECT * FROM temoignages WHERE 1=1';
    const values = [];

    if (actif !== undefined) {
      values.push(actif === 'true');
      sql += ' AND actif = $1';
    }

    sql += ' ORDER BY ordre ASC, created_at DESC';

    const result = await query(sql, values);
    res.json({ temoignages: result.rows });
  } catch (error) {
    console.error('Get temoignages error:', error);
    res.status(500).json({ error: 'Erreur récupération témoignages' });
  }
});

router.post('/', authMiddleware, upload.single('logo'), async (req, res) => {
  try {
    const { client, entreprise, pays, quote, note, ordre = 0 } = req.body;

    if (!client || !quote) {
      return res.status(400).json({ error: 'Client et quote requis' });
    }

    let logo = null;
    if (req.file) {
      logo = req.file.filename;
    }

    const result = await query(
      'INSERT INTO temoignages (client, entreprise, pays, quote, logo, note, ordre) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [client, entreprise || null, pays || null, quote, logo, note || null, ordre]
    );

    res.json({ success: true, temoignage: result.rows[0] });
  } catch (error) {
    console.error('Create temoignage error:', error);
    res.status(500).json({ error: 'Erreur création témoignage' });
  }
});

router.put('/:id', authMiddleware, upload.single('logo'), async (req, res) => {
  try {
    const { id } = req.params;
    const { client, entreprise, pays, quote, note, ordre, actif } = req.body;

    const existing = await query('SELECT logo FROM temoignages WHERE id = $1', [id]);
    let logo = existing.rows[0]?.logo;

    if (req.file) {
      if (logo) {
        const oldPath = path.join(uploadPaths.avatars, logo);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      logo = req.file.filename;
    }

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (client !== undefined) {
      values.push(client);
      updates.push(`client = $${paramCount++}`);
    }
    if (entreprise !== undefined) {
      values.push(entreprise);
      updates.push(`entreprise = $${paramCount++}`);
    }
    if (pays !== undefined) {
      values.push(pays);
      updates.push(`pays = $${paramCount++}`);
    }
    if (quote !== undefined) {
      values.push(quote);
      updates.push(`quote = $${paramCount++}`);
    }
    if (note !== undefined) {
      values.push(note);
      updates.push(`note = $${paramCount++}`);
    }
    if (logo !== undefined && logo !== existing.rows[0]?.logo) {
      values.push(logo);
      updates.push(`logo = $${paramCount++}`);
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

    values.push(id);
    const result = await query(
      `UPDATE temoignages SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Témoignage non trouvé' });
    }

    res.json({ success: true, temoignage: result.rows[0] });
  } catch (error) {
    console.error('Update temoignage error:', error);
    res.status(500).json({ error: 'Erreur mise à jour témoignage' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const temoignage = await query('SELECT logo FROM temoignages WHERE id = $1', [id]);
    if (temoignage.rows.length > 0 && temoignage.rows[0].logo) {
      const filePath = path.join(uploadPaths.avatars, temoignage.rows[0].logo);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await query('DELETE FROM temoignages WHERE id = $1', [id]);

    res.json({ success: true });
  } catch (error) {
    console.error('Delete temoignage error:', error);
    res.status(500).json({ error: 'Erreur suppression témoignage' });
  }
});

export default router;
