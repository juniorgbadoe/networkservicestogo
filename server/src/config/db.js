import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const DATABASE_URL = process.env.DATABASE_URL;

console.log('DATABASE_URL:', DATABASE_URL ? 'Configured' : 'NOT FOUND');

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in .env');
  process.exit(1);
}

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: DATABASE_URL,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export async function query(text, params) {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (error) {
    console.error('Database error:', error.message);
    throw error;
  }
}

export async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        nom VARCHAR(100),
        role VARCHAR(20) DEFAULT 'editor',
        actif BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS galerie_categories (
        id SERIAL PRIMARY KEY,
        nom VARCHAR(100) NOT NULL,
        slug VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        ordre INT DEFAULT 0,
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS galerie_photos (
        id SERIAL PRIMARY KEY,
        categorie_id INT REFERENCES galerie_categories(id) ON DELETE CASCADE,
        titre VARCHAR(200),
        description TEXT,
        fichier VARCHAR(255) NOT NULL,
        miniature VARCHAR(255),
        alt_text VARCHAR(200),
        tags JSONB,
        ordre INT DEFAULT 0,
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS projets (
        id SERIAL PRIMARY KEY,
        titre VARCHAR(200) NOT NULL,
        slug VARCHAR(200) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        resultat VARCHAR(255),
        categorie VARCHAR(100),
        tags JSONB,
        images JSONB,
        ordre INT DEFAULT 0,
        actif BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS temoignages (
        id SERIAL PRIMARY KEY,
        client VARCHAR(150) NOT NULL,
        entreprise VARCHAR(150),
        pays VARCHAR(50),
        quote TEXT NOT NULL,
        logo VARCHAR(255),
        ordre INT DEFAULT 0,
        actif BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        titre VARCHAR(200) NOT NULL,
        slug VARCHAR(200) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(50),
        couleur VARCHAR(50),
        features JSONB,
        ordre INT DEFAULT 0,
        actif BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS pages (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(100) UNIQUE NOT NULL,
        titre VARCHAR(200),
        contenu JSONB,
        meta_title VARCHAR(200),
        meta_desc VARCHAR(500),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS parametres (
        id SERIAL PRIMARY KEY,
        cle VARCHAR(100) UNIQUE NOT NULL,
        valeur TEXT,
        description VARCHAR(255)
      );
    `);

    await pool.query(`
      ALTER TABLE services
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

      ALTER TABLE temoignages
      ADD COLUMN IF NOT EXISTS note INT;
    `);

    console.log('✅ Tables créées avec succès');
  } catch (error) {
    console.error('❌ Erreur création tables:', error.message);
  }
}

export default pool;
