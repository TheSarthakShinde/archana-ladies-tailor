import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '+91 9226173399', href: 'tel:+91 9226173399' },
  { icon: Mail, label: 'Email', value: 'shinde7archana@gmail.com', href: 'mailto:shinde7archana@gmail.com' },
  { icon: MapPin, label: 'Address', value: 'Rupa Mangal Karyalaya Road, Mini Shopping Complex, Akluj, 413101' },
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
                href="https://wa.me/919226173399?text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment"
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3796.8928727052667!2d75.01707947433663!3d17.890462088119584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc47455d30171c5%3A0xef9dd9090e54ac92!2sAakar%20Art%20Creation!5e0!3m2!1sen!2sin!4v1773080026317!5m2!1sen!2sin"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Archana Tailors Location"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}


// <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3796.8928727052667!2d75.01707947433663!3d17.890462088119584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc47455d30171c5%3A0xef9dd9090e54ac92!2sAakar%20Art%20Creation!5e0!3m2!1sen!2sin!4v1773080026317!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>