import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  CalendarCheck, ImagePlus, Users, Trash2, CheckCircle, XCircle,
  Clock, UploadCloud, X, ShieldCheck, LogOut, RefreshCw, MessageCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { useNavigate } from 'react-router-dom';

const OWNER_PHONE = '919226173399';

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const CATEGORIES = ['Blouses', 'Bridal', 'Suits', 'Kurtas', 'Finishing', 'Alterations', 'Other'];

export default function AdminDashboard() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('appointments');

  // Appointments state
  const [appointments, setAppointments] = useState([]);
  const [apptLoading, setApptLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [apptPage, setApptPage] = useState(1);
  const [apptTotal, setApptTotal] = useState(0);
  const [apptPages, setApptPages] = useState(1);

  // Gallery state
  const [photos, setPhotos] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [uploadForm, setUploadForm] = useState({ title: '', category: 'Blouses' });
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const fileInputRef = useRef(null);

  // Users state
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'user' });
  const [createUserLoading, setCreateUserLoading] = useState(false);
  const [createUserMsg, setCreateUserMsg] = useState('');
  const [createUserErr, setCreateUserErr] = useState('');

  const fetchAppointments = () => {
    setApptLoading(true);
    const query = `?${statusFilter ? `status=${statusFilter}&` : ''}page=${apptPage}&limit=10`;
    api.get(`/appointments${query}`, token)
      .then((data) => {
        setAppointments(data.appointments || []);
        setApptTotal(data.total || 0);
        setApptPages(data.pages || 1);
      })
      .catch(() => {})
      .finally(() => setApptLoading(false));
  };

  const fetchGallery = () => {
    setGalleryLoading(true);
    api.get('/gallery', token)
      .then((data) => setPhotos(data.photos || []))
      .finally(() => setGalleryLoading(false));
  };

  useEffect(() => { fetchAppointments(); }, [statusFilter, apptPage]);
  useEffect(() => { if (tab === 'gallery') fetchGallery(); }, [tab]);

  const updateStatus = async (id, status) => {
    await api.patch(`/appointments/${id}/status`, { status }, token);
    fetchAppointments();
  };

  const deleteAppointment = async (id) => {
    if (!confirm('Delete this appointment?')) return;
    await api.delete(`/appointments/${id}`, token);
    fetchAppointments();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadFile(file);
    setUploadPreview(URL.createObjectURL(file));
    setUploadError('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) { setUploadError('Please select a photo'); return; }
    if (!uploadForm.title) { setUploadError('Please enter a title'); return; }
    setUploading(true);
    setUploadError('');
    setUploadSuccess('');
    const formData = new FormData();
    formData.append('photo', uploadFile);
    formData.append('title', uploadForm.title);
    formData.append('category', uploadForm.category);
    try {
      const res = await api.upload('/gallery', formData, token);
      if (res.photo) {
        setUploadSuccess('Photo uploaded successfully!');
        setUploadFile(null);
        setUploadPreview('');
        setUploadForm({ title: '', category: 'Blouses' });
        if (fileInputRef.current) fileInputRef.current.value = '';
        fetchGallery();
      } else {
        setUploadError(res.message || 'Upload failed');
      }
    } catch {
      setUploadError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const deletePhoto = async (id) => {
    if (!confirm('Delete this photo?')) return;
    await api.delete(`/gallery/${id}`, token);
    fetchGallery();
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreateUserLoading(true);
    setCreateUserMsg('');
    setCreateUserErr('');
    try {
      const res = await api.post('/auth/register', newUser, token);
      if (res.user) {
        setCreateUserMsg(`User "${res.user.username}" created successfully!`);
        setNewUser({ username: '', password: '', role: 'user' });
      } else {
        setCreateUserErr(res.message || 'Failed to create user');
      }
    } catch {
      setCreateUserErr('Failed to create user');
    } finally {
      setCreateUserLoading(false);
    }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const tabs = [
    { id: 'appointments', label: 'Appointments', icon: CalendarCheck },
    { id: 'gallery', label: 'Gallery Upload', icon: ImagePlus },
    { id: 'users', label: 'Manage Users', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="gradient-peach border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Welcome, {user?.username}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Appointments', value: apptTotal, color: 'text-primary' },
            { label: 'Pending', value: appointments.filter((a) => a.status === 'pending').length, color: 'text-yellow-600' },
            { label: 'Confirmed', value: appointments.filter((a) => a.status === 'confirmed').length, color: 'text-blue-600' },
            { label: 'Completed', value: appointments.filter((a) => a.status === 'completed').length, color: 'text-green-600' },
          ].map((stat) => (
            <div key={stat.label} className="bg-card rounded-xl border border-border p-4">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-muted rounded-xl mb-6 w-fit">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === t.id ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <t.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Appointments Tab */}
        {tab === 'appointments' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setApptPage(1); }}
                className="px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button onClick={fetchAppointments} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">
                <RefreshCw className="h-3.5 w-3.5" />
                Refresh
              </button>
            </div>

            {apptLoading ? (
              <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
            ) : appointments.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No appointments found.</div>
            ) : (
              <div className="space-y-3">
                {appointments.map((apt) => (
                  <div key={apt._id} className="bg-card rounded-xl border border-border p-5 hover:shadow-sm transition-shadow">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-display font-semibold text-foreground">{apt.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[apt.status]}`}>
                            {apt.status}
                          </span>
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{apt.clothingType}</span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <span>📞 {apt.phone}</span>
                          {apt.email && <span>✉️ {apt.email}</span>}
                          {apt.preferredDate && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {new Date(apt.preferredDate).toLocaleDateString('en-IN')}
                            </span>
                          )}
                        </div>
                        {apt.measurements && <p className="text-xs text-muted-foreground mt-1 truncate">📏 {apt.measurements}</p>}
                        {apt.instructions && <p className="text-xs text-muted-foreground mt-0.5 truncate">📝 {apt.instructions}</p>}
                        <p className="text-xs text-muted-foreground mt-1">Booked: {new Date(apt.createdAt).toLocaleDateString('en-IN')}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 shrink-0">
                        {apt.status === 'pending' && (
                          <button onClick={() => updateStatus(apt._id, 'confirmed')} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-medium hover:bg-blue-100 transition-colors">
                            <CheckCircle className="h-3.5 w-3.5" /> Confirm
                          </button>
                        )}
                        {(apt.status === 'pending' || apt.status === 'confirmed') && (
                          <button onClick={() => updateStatus(apt._id, 'completed')} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100 transition-colors">
                            <CheckCircle className="h-3.5 w-3.5" /> Complete
                          </button>
                        )}
                        {apt.status !== 'cancelled' && (
                          <button onClick={() => updateStatus(apt._id, 'cancelled')} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium hover:bg-red-100 transition-colors">
                            <XCircle className="h-3.5 w-3.5" /> Cancel
                          </button>
                        )}
                        {/* WhatsApp notify customer */}
                        {apt.phone && (() => {
                          const customerPhone = apt.phone.replace(/\D/g, '').replace(/^0/, '91');
                          const statusMsg = apt.status === 'confirmed'
                            ? `✅ Dear ${apt.name}, your appointment at Archana Tailors for *${apt.clothingType}* has been *CONFIRMED*. We will contact you soon. Thank you! 🙏`
                            : apt.status === 'cancelled'
                            ? `❌ Dear ${apt.name}, unfortunately your appointment at Archana Tailors for *${apt.clothingType}* has been *CANCELLED*. Please contact us for more info.`
                            : apt.status === 'completed'
                            ? `🎉 Dear ${apt.name}, your order at Archana Tailors for *${apt.clothingType}* is *COMPLETED*. Thank you for choosing us! 🙏`
                            : `📋 Dear ${apt.name}, your appointment at Archana Tailors for *${apt.clothingType}* is currently *PENDING*. We will confirm shortly.`;
                          const waUrl = `https://wa.me/${customerPhone}?text=${encodeURIComponent(statusMsg)}`;
                          return (
                            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-medium hover:bg-green-600 transition-colors">
                              <MessageCircle className="h-3.5 w-3.5" /> Notify
                            </a>
                          );
                        })()}
                        <button onClick={() => deleteAppointment(apt._id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-muted text-muted-foreground text-xs font-medium hover:text-destructive hover:bg-destructive/10 transition-colors">
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {apptPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                <button disabled={apptPage === 1} onClick={() => setApptPage((p) => p - 1)} className="px-3 py-1.5 rounded-lg border border-border text-sm disabled:opacity-40 hover:bg-muted transition-colors">
                  Previous
                </button>
                <span className="text-sm text-muted-foreground">Page {apptPage} of {apptPages}</span>
                <button disabled={apptPage === apptPages} onClick={() => setApptPage((p) => p + 1)} className="px-3 py-1.5 rounded-lg border border-border text-sm disabled:opacity-40 hover:bg-muted transition-colors">
                  Next
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Gallery Upload Tab */}
        {tab === 'gallery' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Form */}
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-5 flex items-center gap-2">
                  <UploadCloud className="h-5 w-5 text-primary" />
                  Upload New Photo
                </h2>

                {uploadError && <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{uploadError}</div>}
                {uploadSuccess && <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm">{uploadSuccess}</div>}

                <form onSubmit={handleUpload} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Photo Title *</label>
                    <input
                      className="mt-1 w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="e.g., Heavy Silk Bridal Blouse"
                      value={uploadForm.title}
                      onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">Category *</label>
                    <select
                      className="mt-1 w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      value={uploadForm.category}
                      onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value })}
                    >
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground">Photo *</label>
                    <div
                      className="mt-1 border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploadPreview ? (
                        <div className="relative">
                          <img src={uploadPreview} alt="Preview" className="h-64 w-full object-cover rounded-lg" />
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setUploadFile(null); setUploadPreview(''); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <ImagePlus className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Click to select image</p>
                          <p className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP up to 5MB</p>
                        </div>
                      )}
                      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
                  >
                    {uploading ? 'Uploading...' : 'Upload Photo'}
                  </button>
                </form>
              </div>

              {/* Gallery Photos */}
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-5 flex items-center gap-2">
                  <ImagePlus className="h-5 w-5 text-primary" />
                  Uploaded Photos ({photos.length})
                </h2>

                {galleryLoading ? (
                  <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
                ) : photos.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-xl border border-border">
                    <ImagePlus className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
                    <p>No photos uploaded yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto pr-1">
                    {photos.map((photo) => (
                      <div key={photo._id} className="group relative rounded-xl overflow-hidden border border-border">
                        <img src={photo.url} alt={photo.title} className="w-full aspect-square object-cover" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                          <p className="text-white text-xs font-medium text-center line-clamp-2">{photo.title}</p>
                          <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{photo.category}</span>
                          <button
                            onClick={() => deletePhoto(photo._id)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/80 text-white text-xs hover:bg-red-600 transition-colors"
                          >
                            <Trash2 className="h-3 w-3" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {tab === 'users' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="max-w-md">
              <div className="bg-card rounded-2xl border border-border p-6">
                <h2 className="font-display text-xl font-semibold text-foreground mb-5 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Create New User
                </h2>

                {createUserErr && <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{createUserErr}</div>}
                {createUserMsg && <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 text-sm">{createUserMsg}</div>}

                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Username *</label>
                    <input
                      className="mt-1 w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Enter username"
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Password *</label>
                    <input
                      type="password"
                      className="mt-1 w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Min 6 characters"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Role</label>
                    <select
                      className="mt-1 w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={createUserLoading}
                    className="w-full py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
                  >
                    {createUserLoading ? 'Creating...' : 'Create User'}
                  </button>
                </form>

                <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Notes:</p>
                  <ul className="space-y-1 text-xs list-disc list-inside">
                    <li>Credentials are stored securely in MongoDB with bcrypt hashing</li>
                    <li>Admin users can access this dashboard</li>
                    <li>Regular users can log in but won't see the admin panel</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
