import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import GalleryPhoto from '../models/GalleryPhoto.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);
  if (ext && mime) cb(null, true);
  else cb(new Error('Only image files are allowed'));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

// GET /api/gallery  (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'All' ? { category } : {};
    const photos = await GalleryPhoto.find(filter).sort({ createdAt: -1 });
    res.json({ photos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/gallery  (admin only - upload photo)
router.post('/', protect, adminOnly, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const { category, title } = req.body;
    if (!category || !title) return res.status(400).json({ message: 'Category and title are required' });

    // const baseUrl = `${req.protocol}://${req.get('host')}`;
    // const url = `${baseUrl}/uploads/${req.file.filename}`;
    const url = `/uploads/${req.file.filename}`;

    const photo = await GalleryPhoto.create({
      category,
      title,
      filename: req.file.filename,
      url,
      uploadedBy: req.user._id,
    });
    res.status(201).json({ photo });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/gallery/:id  (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const photo = await GalleryPhoto.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Photo not found' });

    // Delete file from disk
    const filePath = path.join(__dirname, '../uploads', photo.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await GalleryPhoto.findByIdAndDelete(req.params.id);
    res.json({ message: 'Photo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
