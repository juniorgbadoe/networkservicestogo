import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-me';

export function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    nom: user.nom,
    role: user.role
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function authMiddleware(req, res, next) {
  const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Token invalide' });
  }

  req.user = decoded;
  next();
}

export function adminOnly(req, res, next) {
  if (req.user?.role !== 'super_admin') {
    return res.status(403).json({ error: 'Accès refusé' });
  }
  next();
}