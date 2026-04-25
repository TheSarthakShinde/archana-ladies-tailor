import { Link } from 'react-router-dom';
import { Scissors, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="h-5 w-5" style={{ color: 'hsl(15 70% 65%)' }} />
              <span className="font-display text-xl font-semibold">Archana Tailors</span>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Crafting perfect garments with love and precision since 2010. Your style, our expertise.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {['/', '/services', '/gallery', '/booking', '/contact'].map((to, i) => (
                <Link key={to} to={to} className="block text-sm opacity-70 hover:opacity-100 transition-opacity">
                  {['Home', 'Services', 'Gallery', 'Book Now', 'Contact'][i]}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-sm opacity-70">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 flex-shrink-0" /><span>+91 9226173399</span></div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 flex-shrink-0" /><span>shinde7archana@gmail.com</span></div>
              <div className="flex items-start gap-2"><MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" /><span>Rupa Mangal Karyalaya Road, Mini Shopping Complex, Akluj, 413101</span></div>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm opacity-50">
          © {new Date().getFullYear()} Archana Ladies Tailor. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
