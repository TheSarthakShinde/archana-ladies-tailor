import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: Mail, label: 'Email', value: 'info@archanatailor.com', href: 'mailto:info@archanatailor.com' },
  { icon: MapPin, label: 'Address', value: '123 Fashion Street, Anna Nagar, Chennai - 600040' },
  { icon: Clock, label: 'Hours', value: 'Mon–Sat: 10 AM – 7 PM | Sun: Closed' },
];

export default function Contact() {
  return (
    <div className="pt-20 sm:pt-24">
      <section className="section-padding gradient-lavender">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3">
            Contact Us
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-muted-foreground max-w-lg mx-auto">
            We'd love to hear from you. Reach out to us anytime.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">{item.label}</h3>
                  {item.href ? (
                    <a href={item.href} className="text-muted-foreground text-sm hover:text-primary transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-muted-foreground text-sm">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-4">
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="rounded-xl overflow-hidden border border-border h-80 lg:h-full min-h-[320px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.1234567890!2d80.2090!3d13.0850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDA1JzA2LjAiTiA4MMKwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Archana Tailors Location"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
