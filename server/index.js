import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDatabase } from './src/config/db.js';
import authRoutes from './src/routes/auth.js';
import adminRoutes from './src/routes/admin.js';
import galerieRoutes from './src/routes/galerie.js';
import projetRoutes from './src/routes/projets.js';
import temoignageRoutes from './src/routes/temoignages.js';
import serviceRoutes from './src/routes/services.js';
import pageRoutes from './src/routes/pages.js';
import parametreRoutes from './src/routes/parametres.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, 'uploads');

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(uploadsDir));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/galerie', galerieRoutes);
app.use('/api/projets', projetRoutes);
app.use('/api/temoignages', temoignageRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/parametres', parametreRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  if (err.name === 'MulterError') {
    const message = err.code === 'LIMIT_FILE_SIZE'
      ? 'Le fichier depasse la taille maximale de 10 Mo'
      : err.message;

    return res.status(400).json({ error: message });
  }

  if (err.message?.includes('Type de fichier')) {
    return res.status(400).json({ error: err.message });
  }

  console.error(err.stack);
  res.status(500).json({ error: 'Erreur serveur', message: err.message });
});

async function start() {
  try {
    await initDatabase();
    console.log('✅ Base de données initialisée');

    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erreur démarrage:', error);
    process.exit(1);
  }
}

start();
