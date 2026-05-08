import express from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../config/db.js';
import { authMiddleware, adminOnly } from '../utils/jwt.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/users', adminOnly, async (req, res) => {
  try {
    const result = await query('SELECT id, email, nom, role, actif, created_at FROM admins ORDER BY created_at DESC');
    res.json({ users: result.rows });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Erreur récupération utilisateurs' });
  }
});

router.post('/users', adminOnly, async (req, res) => {
  try {
    const { email, password, nom, role = 'editor' } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et password requis' });
    }

    const existing = await query('SELECT id FROM admins WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await query(
      'INSERT INTO admins (email, password, nom, role) VALUES ($1, $2, $3, $4) RETURNING id, email, nom, role, actif, created_at',
      [email, hashedPassword, nom || 'Utilisateur', role]
    );

    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Erreur création utilisateur' });
  }
});

router.put('/users/:id', adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { email, nom, role, actif } = req.body;

    if (parseInt(id) === req.user.id && role !== undefined) {
      return res.status(400).json({ error: 'Vous ne pouvez pas changer votre propre rôle' });
    }

    const updates = [];
    const values = [];
    let paramCount = 1;

    if (email !== undefined) {
      values.push(email);
      updates.push(`email = $${paramCount++}`);
    }
    if (nom !== undefined) {
      values.push(nom);
      updates.push(`nom = $${paramCount++}`);
    }
    if (role !== undefined) {
      values.push(role);
      updates.push(`role = $${paramCount++}`);
    }
    if (actif !== undefined) {
      values.push(actif);
      updates.push(`actif = $${paramCount++}`);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'Aucune modification' });
    }

    values.push(id);
    const result = await query(
      `UPDATE admins SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING id, email, nom, role, actif`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({ success: true, user: result.rows[0] });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Erreur mise à jour utilisateur' });
  }
});

router.delete('/users/:id', adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ error: 'Vous ne pouvez pas vous supprimer vous-même' });
    }

    await query('DELETE FROM admins WHERE id = $1', [id]);

    res.json({ success: true });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Erreur suppression utilisateur' });
  }
});

export default router;