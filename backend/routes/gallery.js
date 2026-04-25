import express from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import GalleryPhoto from '../models/GalleryPhoto.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Memory storage — no disk needed
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    if (allowed.test(file.mimetype)) cb(null, true);
    else cb(new Error('Images only'));
  },
});

// Upload buffer to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { folder: 'archana-tailor', transformation: [{ width: 800, quality: 'auto' }] },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};

// GET /api/gallery (public)
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

// POST /api/gallery (admin only)
router.post('/', protect, adminOnly, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const { category, title } = req.body;
    if (!category || !title) return res.status(400).json({ message: 'Category and title required' });

    const result = await uploadToCloudinary(req.file.buffer);

    const photo = await GalleryPhoto.create({
      category,
      title,
      filename: result.public_id,
      url: result.secure_url,
      uploadedBy: req.user._id,
    });
    res.status(201).json({ photo });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/gallery/:id (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const photo = await GalleryPhoto.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Photo not found' });

    if (photo.filename) {
      await cloudinary.v2.uploader.destroy(photo.filename);
    }

    await GalleryPhoto.findByIdAndDelete(req.params.id);
    res.json({ message: 'Photo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
