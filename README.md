# 🧵 Archana Ladies Tailor — Full Stack Website

A beautiful ladies tailor website built with **React + Vite** (frontend) and **Node.js + Express + MongoDB** (backend).

---

## 📁 Project Structure

```
archana-ladies-tailor/
├── frontend/          ← React + Vite (JavaScript, no TypeScript!)
│   ├── src/
│   │   ├── assets/           ← Images
│   │   ├── components/       ← Navbar, Footer, Hero, ServiceCard, ProtectedRoute
│   │   ├── context/          ← AuthContext (JWT auth state)
│   │   ├── lib/              ← utils.js, api.js, services-data.js
│   │   └── pages/
│   │       ├── Home.jsx
│   │       ├── Services.jsx
│   │       ├── Gallery.jsx   ← Shows static + admin-uploaded photos
│   │       ├── Booking.jsx   ← Saves appointments to MongoDB
│   │       ├── Contact.jsx
│   │       ├── Login.jsx     ← JWT login, credentials in MongoDB
│   │       ├── AdminDashboard.jsx ← Full admin panel
│   │       └── NotFound.jsx
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── backend/           ← Node.js + Express + MongoDB
    ├── models/
    │   ├── User.js           ← bcrypt-hashed passwords
    │   ├── Appointment.js
    │   └── GalleryPhoto.js
    ├── routes/
    │   ├── auth.js           ← /api/auth/login, /setup, /register, /me
    │   ├── appointments.js   ← /api/appointments
    │   └── gallery.js        ← /api/gallery (with multer upload)
    ├── middleware/
    │   └── auth.js           ← JWT protect + adminOnly
    ├── uploads/              ← Admin-uploaded photos stored here
    ├── server.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### 1. Setup Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm run dev
```

Backend runs on **http://localhost:5000**

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

---

## 🔐 Authentication Setup

### Create the first Admin account

Since no users exist on first run, call the setup endpoint once:

```bash
curl -X POST http://localhost:5000/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "your_password"}'
```

Or use a REST client (Postman / Thunder Client). This only works when the database is empty.

After setup, go to **http://localhost:5173/login** and log in with your admin credentials.

### Admin Features
- **View all appointments** — filter by status, paginate
- **Update appointment status** — Pending → Confirmed → Completed / Cancelled
- **Delete appointments**
- **Upload photos** to gallery by category (Blouses, Bridal, Suits, etc.)
- **Delete gallery photos**
- **Create new users** (admin or regular)

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/setup` | Create first admin (only if DB empty) |
| POST | `/api/auth/login` | Login → returns JWT token |
| GET | `/api/auth/me` | Get current user (requires token) |
| POST | `/api/auth/register` | Create user (admin only) |

### Appointments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/appointments` | Book appointment (public) |
| GET | `/api/appointments` | List all appointments (admin only) |
| PATCH | `/api/appointments/:id/status` | Update status (admin only) |
| DELETE | `/api/appointments/:id` | Delete (admin only) |

### Gallery
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gallery` | List photos (public) |
| POST | `/api/gallery` | Upload photo with multer (admin only) |
| DELETE | `/api/gallery/:id` | Delete photo (admin only) |

---

## ⚙️ Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ladies_tailor
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

---

## 🎨 Tech Stack

**Frontend:**
- React 18 (JavaScript — no TypeScript)
- Vite
- React Router v6
- Tailwind CSS
- Framer Motion
- Lucide React icons

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- bcryptjs password hashing
- Multer (file uploads)

---

## 📸 Gallery

The gallery page shows:
1. **Static service images** (bundled in the frontend)
2. **Admin-uploaded photos** (fetched from the backend API)

Admin can upload photos per category from the Admin Dashboard → Gallery Upload tab.

---

## 🔒 Security Notes

- Passwords are hashed with bcrypt (12 rounds) before storing in MongoDB
- JWT tokens expire in 7 days
- File uploads are limited to 5MB, images only
- Admin routes are protected with JWT middleware + role check
