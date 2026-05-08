import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverRoot = path.resolve(__dirname, '../..');
const uploadFolders = {
  photos: path.join(serverRoot, 'uploads/photos'),
  projets: path.join(serverRoot, 'uploads/projets'),
  avatars: path.join(serverRoot, 'uploads/avatars'),
};

function ensureFolder(folder) {
  fs.mkdirSync(folder, { recursive: true });
  return folder;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = path.join(serverRoot, 'uploads');

    if (req.baseUrl.includes('galerie')) {
      folder = uploadFolders.photos;
    } else if (req.baseUrl.includes('projets')) {
      folder = uploadFolders.projets;
    } else if (req.baseUrl.includes('admin') || req.baseUrl.includes('temoignages')) {
      folder = uploadFolders.avatars;
    }

    cb(null, ensureFolder(folder));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const filename = `${uuidv4()}${ext}`;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Type de fichier non autorisé. Utilisez: jpg, png, webp, gif'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB max
  }
});

export const uploadPaths = uploadFolders;

export async function processImage(inputPath, outputPath, options = {}) {
  const { width = 800, height = 600, fit = 'cover' } = options;

  await sharp(inputPath)
    .resize(width, height, { fit })
    .jpeg({ quality: 80 })
    .toFile(outputPath);

  return outputPath;
}

export async function createThumbnail(inputPath, thumbnailPath) {
  await sharp(inputPath)
    .resize(300, 200, { fit: 'cover' })
    .jpeg({ quality: 70 })
    .toFile(thumbnailPath);
}
