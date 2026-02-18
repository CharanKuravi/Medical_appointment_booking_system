# 🚀 Quick Start Guide - MedLink

## ✅ All Errors Fixed!

All import errors and missing files have been resolved. Your application is ready to run.

---

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

---

## 🏃 Start the Application

### Option 1: Using Two Terminals (Recommended)

**Terminal 1 - Start Backend:**
```bash
cd server
npm install
npm start
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm install
npm run dev
```

### Option 2: Using One Terminal (Windows)

```bash
# Start backend in background
cd server
start cmd /k "npm start"

# Start frontend
cd ../client
npm run dev
```

---

## 🌐 Access the Application

Once both servers are running:

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

---

## 🔐 Test Authentication

### Create a New Account

1. Go to http://localhost:5173
2. Click "Sign Up" or navigate to `/login`
3. Fill in the form:
   - **Name:** John Doe
   - **Email:** john@example.com
   - **Password:** password123
   - **Role:** Patient (or Doctor)
4. Click "Sign Up"
5. You'll be automatically logged in and redirected

### Login with Existing Account

1. Go to http://localhost:5173/login
2. Enter your email and password
3. Click "Sign In"

---

## 📱 Test Features

### For Patients:

1. **Find Doctors**
   - Navigate to "Find Doctors"
   - Use filters (specialty, city, search)
   - Click "Book Appointment" on any doctor

2. **Book Appointment**
   - Select date and time
   - Add notes (optional)
   - Submit booking

3. **View Appointments**
   - Go to "Appointments" page
   - See all your bookings
   - Cancel if needed

4. **Emergency Services**
   - Navigate to "Emergency"
   - View nearby hospitals
   - Access emergency hotlines

### For Doctors:

1. **Doctor Dashboard**
   - View patient appointments
   - Manage availability
   - Update profile

---

## 🗄️ Database

The application uses **SQLite** (local file-based database):

- **Location:** `server/database/medlink.db`
- **Tables:** users, appointments, doctors
- **No setup required** - automatically created on first run

---

## 🔧 Environment Variables (Optional)

### Server (.env)

Create `server/.env` file:

```env
PORT=5000
JWT_SECRET=your-super-secret-key-change-in-production
```

### Client (.env)

Create `client/.env` file (if needed):

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### Port Already in Use

**Backend (Port 5000):**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Then restart: npm start
```

**Frontend (Port 5173):**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Then restart: npm run dev
```

### Module Not Found

```bash
# Backend
cd server
rm -rf node_modules package-lock.json
npm install

# Frontend
cd client
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

Make sure backend is running on port 5000 and frontend on 5173. The CORS is already configured.

### Database Errors

Delete the database file and restart:
```bash
cd server/database
del medlink.db  # Windows
rm medlink.db   # Mac/Linux

# Restart server - database will be recreated
cd ..
npm start
```

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments/book` - Book appointment
- `GET /api/appointments/history/:role/:userId` - Get user appointments
- `PUT /api/appointments/cancel/:id` - Cancel appointment

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `POST /api/doctors/profile` - Create doctor profile

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:specialty/doctors` - Get doctors by specialty

### Emergency
- `GET /api/emergency/hospitals` - Get nearby hospitals
- `POST /api/emergency/request` - Request ambulance

---

## ✅ What Was Fixed

1. ✅ Created missing `Appointments.jsx` page
2. ✅ Added missing appointment endpoints (`/book`, `/history`, `/cancel`)
3. ✅ Registered all routes in `server.js`
4. ✅ Fixed all import errors
5. ✅ Verified all components exist
6. ✅ Configured path aliases (`@/components`)
7. ✅ All diagnostics passing

---

## 🎉 You're Ready!

Your application is now fully functional with:
- ✅ Local JWT authentication
- ✅ SQLite database
- ✅ All pages working
- ✅ All routes configured
- ✅ No errors

**Start coding and enjoy! 🚀**
