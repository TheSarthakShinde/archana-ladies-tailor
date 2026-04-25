import mongoose from 'mongoose';

const galleryPhotoSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['Blouses', 'Bridal', 'Suits', 'Kurtas', 'Finishing', 'Alterations', 'Other'],
  },
  title: { type: String, required: true, trim: true },
  filename: { type: String, required: true },
  url: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('GalleryPhoto', galleryPhotoSchema);
