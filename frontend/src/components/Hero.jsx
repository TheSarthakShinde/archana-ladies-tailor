import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroBanner from '@/assets/hero-banner.jpg';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBanner} alt="Elegant tailor workshop" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-2xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
            Premium Ladies Tailoring
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
            Perfect Fit,{' '}
            <span className="text-gradient">Perfect Style</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg text-muted-foreground mb-8 max-w-lg">
            Crafting bespoke garments with precision and passion. From bridal blouses to everyday elegance, every stitch tells your story.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4">
            <Link to="/booking" className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-white font-medium text-base hover:bg-primary/90 transition-colors">
              Book Appointment
            </Link>
            <Link to="/services" className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border text-foreground font-medium text-base hover:bg-muted transition-colors">
              View Designs
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
