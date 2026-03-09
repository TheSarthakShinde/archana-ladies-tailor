import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';

import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Gallery from '@/pages/Gallery';
import Booking from '@/pages/Booking';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import AdminDashboard from '@/pages/AdminDashboard';
import NotFound from '@/pages/NotFound';

function Layout({ children, hideFooter = false }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes with Navbar + Footer */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
          <Route path="/booking" element={<Layout><Booking /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />

          {/* Login — show Navbar, no footer */}
          <Route path="/login" element={<Layout hideFooter><Login /></Layout>} />

          {/* Admin — protected, no footer */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <Layout hideFooter>
                  <AdminDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Layout><NotFound /></Layout>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
