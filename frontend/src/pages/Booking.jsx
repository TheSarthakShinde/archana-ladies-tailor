import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const OWNER_PHONE = '919226173399';

const clothingTypes = ['Blouse', 'Designer Blouse', 'Bridal Blouse', 'Salwar Suit', 'Kurta', 'Pico & Fall', 'Custom Alteration'];

function formatDate(date) {
  if (!date) return '';
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Booking() {
  const { user, token } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [date, setDate] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', clothingType: '', measurements: '', instructions: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.clothingType) {
      setError('Please fill in all required fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/appointments', { ...formData, preferredDate: date || undefined, userId: user?._id || null });
      if (res.message === 'Appointment booked successfully') {
        setSubmitted(true);
      } else {
        setError(res.message || 'Something went wrong');
      }
    } catch {
      setError('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setFormData({ name: '', phone: '', email: '', clothingType: '', measurements: '', instructions: '' });
    setDate('');
    setError('');
  };

  if (submitted) {
    const waMessage = encodeURIComponent(
      `Hi! I have booked an appointment at Archana Tailors.\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Clothing Type:* ${formData.clothingType}\n` +
      (date ? `*Preferred Date:* ${new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}\n` : '') +
      (formData.measurements ? `*Measurements:* ${formData.measurements}\n` : '') +
      (formData.instructions ? `*Instructions:* ${formData.instructions}\n` : '') +
      `\nPlease confirm my appointment. Thank you! 🙏`
    );
    const waUrl = `https://wa.me/${OWNER_PHONE}?text=${waMessage}`;

    return (
      <div className="pt-20 sm:pt-24 min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-10 max-w-md">
          <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">Booking Submitted!</h2>
          <p className="text-muted-foreground mb-6">
            Thank you, {formData.name}! Your appointment request has been received. Click below to notify the shop owner directly on WhatsApp.
          </p>
          <div className="flex flex-col gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Send Message on WhatsApp
            </a>
            <button onClick={reset} className="px-6 py-2.5 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors">
              Book Another
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 sm:pt-24">
      <section className="section-padding gradient-peach">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3">
            Book an Appointment
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-muted-foreground max-w-lg mx-auto">
            Fill out the form below and we'll get back to you shortly.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name *</label>
              <input className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone Number *</label>
              <input className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Clothing Type *</label>
              <select className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" value={formData.clothingType} onChange={(e) => setFormData({ ...formData, clothingType: e.target.value })} required>
                <option value="">Select type</option>
                {clothingTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Preferred Date</label>
              <input type="date" className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring" min={new Date().toISOString().split('T')[0]} value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Measurement Details</label>
            <textarea className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="E.g., Bust: 36, Waist: 30, Length: 15..." value={formData.measurements} onChange={(e) => setFormData({ ...formData, measurements: e.target.value })} rows={3} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Special Instructions</label>
            <textarea className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Any special design preferences, fabric details..." value={formData.instructions} onChange={(e) => setFormData({ ...formData, instructions: e.target.value })} rows={3} />
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-primary text-white font-medium text-base hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </motion.form>
      </section>
    </div>
  );
}
