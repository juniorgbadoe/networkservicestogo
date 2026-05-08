import express from 'express';
import { query } from '../config/db.js';
import { authMiddleware } from '../utils/jwt.js';

const router = express.Router();

function parseParamValue(value) {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
    return value;
  }

  try {
    return JSON.parse(trimmed);
  } catch {
    return value;
  }
}

function serializeParamValue(value) {
  if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
    return JSON.stringify(value);
  }

  return value ?? '';
}

router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM parametres ORDER BY cle ASC');
    const params = {};
    result.rows.forEach(p => {
      params[p.cle] = parseParamValue(p.valeur);
    });
    res.json({ parametres: params });
  } catch (error) {
    console.error('Get parametres error:', error);
    res.status(500).json({ error: 'Erreur récupération paramètres' });
  }
});

router.get('/:cle', async (req, res) => {
  try {
    const { cle } = req.params;
    const result = await query('SELECT * FROM parametres WHERE cle = $1', [cle]);

    if (result.rows.length === 0) {
      return res.json({ valeur: null });
    }

    res.json({ valeur: parseParamValue(result.rows[0].valeur) });
  } catch (error) {
    console.error('Get parametre error:', error);
    res.status(500).json({ error: 'Erreur récupération paramètre' });
  }
});

router.put('/:cle', authMiddleware, async (req, res) => {
  try {
    const { cle } = req.params;
    const { valeur, description } = req.body;

    const result = await query(
      'INSERT INTO parametres (cle, valeur, description) VALUES ($1, $2, $3) ON CONFLICT (cle) DO UPDATE SET valeur = $2, description = $3 RETURNING *',
      [cle, serializeParamValue(valeur), description || null]
    );

    res.json({
      success: true,
      parametre: {
        ...result.rows[0],
        valeur: parseParamValue(result.rows[0].valeur),
      }
    });
  } catch (error) {
    console.error('Update parametre error:', error);
    res.status(500).json({ error: 'Erreur mise à jour paramètre' });
  }
});

router.post('/bulk', authMiddleware, async (req, res) => {
  try {
    const { parametres } = req.body;

    if (!parametres || typeof parametres !== 'object') {
      return res.status(400).json({ error: 'Paramètres invalides' });
    }

    for (const [cle, valeur] of Object.entries(parametres)) {
      await query(
        'INSERT INTO parametres (cle, valeur) VALUES ($1, $2) ON CONFLICT (cle) DO UPDATE SET valeur = $2',
        [cle, serializeParamValue(valeur)]
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Bulk update error:', error);
    res.status(500).json({ error: 'Erreur mise à jour batch' });
  }
});

export default router;
