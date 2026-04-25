import serviceBlouse from '@/assets/service-blouse.jpg';
import serviceBridal from '@/assets/service-bridal.jpg';
import serviceDesigner from '@/assets/service-designer.jpg';
import serviceSalwar from '@/assets/service-salwar.jpg';
import serviceKurta from '@/assets/service-kurta.jpg';
import servicePico from '@/assets/service-pico.jpg';
import serviceAlterations from '@/assets/service-alterations.jpg';

export const services = [
  { id: 'blouse', title: 'Blouse Stitching', description: 'Perfectly fitted blouses crafted to complement your saree, with attention to every detail and measurement.', price: '', image: serviceBlouse, category: 'Blouses' },
  { id: 'designer-blouse', title: 'Designer Blouses', description: 'Trendy and modern designer blouses with unique cuts, back designs, and embellishments.', price: '', image: serviceDesigner, category: 'Blouses' },
  { id: 'bridal-blouse', title: 'Bridal Blouses', description: 'Exquisite bridal blouses with heavy embroidery, zardozi, and intricate handwork for your special day.', price: '', image: serviceBridal, category: 'Bridal' },
  { id: 'pico-fall', title: 'Pico & Fall', description: 'Professional pico and fall work for sarees, ensuring a perfect drape and finish every time.', price: '', image: servicePico, category: 'Finishing' },
  { id: 'salwar-suits', title: 'Salwar Suits', description: 'Custom-tailored salwar suits in all styles — Punjabi, Patiala, Anarkali, and more.', price: '', image: serviceSalwar, category: 'Suits' },
  { id: 'kurtas', title: 'Kurtas', description: 'Elegant and comfortable kurtas with beautiful neckline designs and perfect fits.', price: '', image: serviceKurta, category: 'Kurtas' },
  { id: 'alterations', title: 'Custom Alterations', description: 'Expert alterations to give your garments a refreshed, perfect fit — from hemming to resizing.', price: '', image: serviceAlterations, category: 'Alterations' },
];

export const categories = ['All', ...Array.from(new Set(services.map((s) => s.category)))];
