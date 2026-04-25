import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/lib/services-data';
import { Sparkles, Heart, Clock } from 'lucide-react';

const features = [
  { icon: Sparkles, title: 'Expert Craftsmanship', desc: '20+ years of tailoring excellence' },
  { icon: Heart, title: 'Made with Love', desc: 'Every stitch is placed with care' },
  { icon: Clock, title: 'On time stitching', desc: 'Giving Your Clothes On Time' },
];

export default function Home() {
  return (
    <div>
      <Hero />

      <section className="section-padding gradient-peach">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">Our Services</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">From traditional blouses to modern designer wear, we bring your vision to life.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.slice(0, 6).map((service, i) => (
              <ServiceCard key={service.id} {...service} index={i} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services" className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding gradient-lavender">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">Ready for Your Perfect Outfit?</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">Book your appointment today and let us create something beautiful just for you.</p>
            <Link to="/booking" className="inline-flex items-center justify-center px-10 py-3 rounded-lg bg-primary text-white font-medium text-base hover:bg-primary/90 transition-colors">
              Book Your Appointment
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
