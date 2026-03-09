import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services, categories } from '@/lib/services-data';
import { api } from '@/lib/api';

export default function Gallery() {
  const [active, setActive] = useState('All');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/gallery')
      .then((data) => setUploadedPhotos(data.photos || []))
      .catch(() => setUploadedPhotos([]))
      .finally(() => setLoading(false));
  }, []);

  // Merge static service images with admin-uploaded ones
  const allItems = [
    ...services.map((s) => ({ id: s.id, title: s.title, price: s.price, image: s.image, category: s.category, isStatic: true })),
...uploadedPhotos.map((p) => ({ id: p._id, title: p.title, price: '', image: `http://localhost:5000${p.url}`, category: p.category, isStatic: false })),  ];

  const filtered = active === 'All' ? allItems : allItems.filter((s) => s.category === active);

  const allCats = ['All', ...Array.from(new Set(allItems.map((s) => s.category)))];

  return (
    <div className="pt-20 sm:pt-24">
      <section className="section-padding gradient-lavender">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-3">
            Our Gallery
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-muted-foreground max-w-lg mx-auto">
            Browse our collection of beautifully crafted garments.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {allCats.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  active === cat ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-accent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group relative aspect-[4/5] rounded-xl overflow-hidden"
                  >
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-white">{item.title}</h3>
                        {item.price && <p className="text-white/80 text-sm">{item.price}</p>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-12">No photos in this category yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
