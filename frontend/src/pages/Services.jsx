import { motion } from 'framer-motion';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/lib/services-data';

export default function Services() {
  return (
    <div className="pt-20 sm:pt-24">
      <section className="section-padding gradient-peach">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3">
            Our Services
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-muted-foreground max-w-lg mx-auto">
            Every garment is crafted with precision, passion, and the perfect fit in mind.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, i) => (
              <ServiceCard key={service.id} {...service} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
