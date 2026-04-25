import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Scissors, ShieldCheck, LogOut, CalendarCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/booking', label: 'Book Now' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2">
            <Scissors className="h-6 w-6 text-primary" />
            <span className="font-display text-xl sm:text-2xl font-semibold text-foreground">Archana Tailors</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className={`text-sm font-medium transition-colors duration-200 ${location.pathname === link.to ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                <ShieldCheck className="h-4 w-4" /> Admin
              </Link>
            )}
            {user && !isAdmin && (
              <Link to="/my-appointments" className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                <CalendarCheck className="h-4 w-4" /> My Appointments
              </Link>
            )}
            {user ? (
              <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors">
                <LogOut className="h-4 w-4" /> Logout
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Login</Link>
                <Link to="/register" className="text-sm font-medium px-4 py-1.5 rounded-full bg-primary text-white hover:bg-primary/90 transition-all">Register</Link>
              </div>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-foreground" aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden glass-card border-t border-border/30">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setIsOpen(false)} className={`block py-2 text-base font-medium ${location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'}`}>
                  {link.label}
                </Link>
              ))}
              {isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-primary">Admin Dashboard</Link>}
              {user && !isAdmin && <Link to="/my-appointments" onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-primary">My Appointments</Link>}
              {user ? (
                <button onClick={handleLogout} className="block py-2 text-base font-medium text-muted-foreground">Logout</button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-muted-foreground">Login</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="block py-2 text-base font-medium text-primary">Register</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
