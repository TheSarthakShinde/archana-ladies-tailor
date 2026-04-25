import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarCheck, Clock, CheckCircle, XCircle, Loader } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';

const STATUS_CONFIG = {
  pending:   { color: 'bg-yellow-100 text-yellow-800', icon: Clock,         label: 'Pending' },
  confirmed: { color: 'bg-blue-100 text-blue-800',    icon: CheckCircle,    label: 'Confirmed' },
  completed: { color: 'bg-green-100 text-green-800',  icon: CheckCircle,    label: 'Completed' },
  cancelled: { color: 'bg-red-100 text-red-800',      icon: XCircle,        label: 'Cancelled' },
};

export default function MyAppointments() {
  const { token, user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/appointments/my', token)
      .then((data) => setAppointments(data.appointments || []))
      .catch(() => setError('Failed to load appointments'))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="pt-20 sm:pt-24 min-h-screen">
      <section className="section-padding gradient-peach">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
            My Appointments
          </motion.h1>
          <p className="text-muted-foreground">Welcome, {user?.username}! Track your appointment status here.</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <p className="text-center text-destructive py-12">{error}</p>
          ) : appointments.length === 0 ? (
            <div className="text-center py-16">
              <CalendarCheck className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">No appointments yet</h3>
              <p className="text-muted-foreground mb-6">Book your first appointment and track it here.</p>
              <Link to="/booking" className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
                Book Appointment
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((apt, i) => {
                const config = STATUS_CONFIG[apt.status] || STATUS_CONFIG.pending;
                const Icon = config.icon;
                return (
                  <motion.div
                    key={apt._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-card rounded-xl border border-border p-5 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`flex items-center gap-1.5 text-sm px-3 py-1 rounded-full font-medium ${config.color}`}>
                            <Icon className="h-3.5 w-3.5" />
                            {config.label}
                          </span>
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                            {apt.clothingType}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>📞 {apt.phone}</p>
                          {apt.preferredDate && (
                            <p>📅 Preferred: {new Date(apt.preferredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                          )}
                          {apt.measurements && <p>📏 {apt.measurements}</p>}
                          {apt.instructions && <p>📝 {apt.instructions}</p>}
                        </div>
                      </div>
                      <div className="text-right text-xs text-muted-foreground shrink-0">
                        <p>Booked on</p>
                        <p className="font-medium">{new Date(apt.createdAt).toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>

                    {apt.status === 'confirmed' && (
                      <div className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-100 text-sm text-blue-700">
                        ✅ Your appointment is confirmed! We'll contact you soon with details.
                      </div>
                    )}
                    {apt.status === 'completed' && (
                      <div className="mt-3 p-3 rounded-lg bg-green-50 border border-green-100 text-sm text-green-700">
                        🎉 Your order is complete! Thank you for choosing Archana Tailors.
                      </div>
                    )}
                    {apt.status === 'cancelled' && (
                      <div className="mt-3 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
                        ❌ This appointment was cancelled. Please book a new one if needed.
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}

          {appointments.length > 0 && (
            <div className="text-center mt-8">
              <Link to="/booking" className="inline-flex items-center px-6 py-3 rounded-lg border border-border text-foreground font-medium hover:bg-muted transition-colors">
                Book Another Appointment
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
