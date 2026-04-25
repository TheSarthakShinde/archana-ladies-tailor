import express from 'express';
import Appointment from '../models/Appointment.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// POST /api/appointments (public - book appointment)
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, clothingType, preferredDate, measurements, instructions, userId } = req.body;
    if (!name || !phone || !clothingType)
      return res.status(400).json({ message: 'Name, phone, and clothing type are required' });

    const appointment = await Appointment.create({
      name, phone, email, clothingType, preferredDate, measurements, instructions,
      userId: userId || null,
    });
    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/appointments/my — logged in user sees their own appointments
router.get('/my', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ appointments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/appointments (admin only)
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const total = await Appointment.countDocuments(filter);
    const appointments = await Appointment.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ appointments, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/appointments/:id/status (admin only)
router.patch('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/appointments/:id (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
