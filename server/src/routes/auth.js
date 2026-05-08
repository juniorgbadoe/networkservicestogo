import express from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../config/db.js';
import { generateToken, authMiddleware } from '../utils/jwt.js';
import { createSlug } from '../utils/slug.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, nom } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et password requis' });
    }

    const existing = await query('SELECT id FROM admins WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await query(
      'INSERT INTO admins (email, password, nom, role) VALUES ($1, $2, $3, $4) RETURNING id, email, nom, role',
      [email, hashedPassword, nom || 'Admin', 'super_admin']
    );

    const user = result.rows[0];
    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ success: true, user: { ...user, password: undefined } });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Erreur inscription' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email et password requis' });
    }

    const result = await query('SELECT * FROM admins WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || !user.actif) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Identifiants invalides' });
    }

    const token = generateToken(user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erreur connexion' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const result = await query('SELECT id, email, nom, role FROM admins WHERE id = $1', [req.user.id]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Me error:', error);
    res.status(500).json({ error: 'Erreur récupération user' });
  }
});

export default router;