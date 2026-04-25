import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scissors } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-peach">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center p-8">
        <Scissors className="h-16 w-16 text-primary mx-auto mb-4 opacity-50" />
        <h1 className="font-display text-6xl font-bold text-foreground mb-2">404</h1>
        <p className="text-muted-foreground mb-6">Oops! This page doesn't exist.</p>
        <Link to="/" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
