# 🏥 MedLink - Healthcare Platform

A modern, accessible healthcare platform with video calling, appointment booking, and medical resources.

## ✨ Features

- 📅 **Appointment Booking** - Schedule appointments with doctors
- 🎥 **Video Calling** - WebRTC-powered video consultations with accessibility features
- 🗣️ **Speech Recognition** - Real-time speech-to-text for accessibility
- 🤟 **Sign Language Support** - Sign language detection (simulated, ready for ML integration)
- 🏥 **Department Browser** - Explore medical departments and specialists
- 🚨 **Emergency Resources** - Quick access to emergency care information
- 🌍 **Multi-language** - Support for English, Hindi, and Telugu
- ♿ **Accessibility First** - Built with accessibility in mind

## 🎨 Design

- **Skeuomorphic UI** - Realistic, tactile design with depth and shadows
- **Green Theme** - Clean white and light green color palette
- **Responsive** - Works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd MedLink-GitHub-Ready
```

2. **Install dependencies**
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. **Start the application**

**Windows:**
```bash
START.bat
```

**Manual (all platforms):**
```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend
cd client
npm run dev
```

4. **Access the application**
```
Frontend: http://localhost:5173
Backend:  http://localhost:5000
```

### 🧹 Clean Reinstall (if needed)

If you encounter dependency issues:

```bash
# Stop all servers first, then:

# Clean server
cd server
rm -rf node_modules package-lock.json
npm install

# Clean client
cd ../client
rm -rf node_modules package-lock.json
npm install
```

## 📁 Project Structure

```
MedLink-GitHub-Ready/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   ├── context/       # React context
│   │   └── lib/           # Utilities
│   └── public/            # Static assets
│
├── server/                # Node.js backend
│   ├── database/          # SQLite database
│   ├── models/            # Data models
│   ├── routes/            # API routes
│   └── socket/            # WebRTC signaling
│
└── START.bat              # Quick start script
```

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Socket.io Client
- React Router
- i18next (internationalization)
- Framer Motion (animations)

### Backend
- Node.js
- Express
- SQLite3
- Socket.io (WebRTC signaling)
- JWT (authentication)
- bcryptjs (password hashing)

## 🔐 Authentication

The platform uses JWT-based authentication with:
- Email/password registration and login
- Secure password hashing with bcryptjs
- 7-day token expiration
- Role-based access (patient/doctor)

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Appointments
- `POST /api/appointments/book` - Book appointment
- `GET /api/appointments/history/:role/:userId` - Get user appointments
- `PUT /api/appointments/cancel/:id` - Cancel appointment

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID

### Departments
- `GET /api/departments` - Get all departments

### Emergency
- `GET /api/emergency/hospitals` - Get nearby hospitals

## 🎥 Video Calling

The video calling feature uses:
- Native WebRTC API (no external dependencies)
- Socket.io for signaling
- STUN servers for NAT traversal
- Peer-to-peer encrypted connections

### Features:
- Real-time video and audio
- Screen controls (mute, video toggle)
- Role selection (sign language / voice)
- Speech recognition for voice users
- Sign language detection for deaf users
- Subtitle overlays

## 🌐 Internationalization

Supported languages:
- English (en)
- Hindi (hi)
- Telugu (te)

Language files are located in `client/public/locales/`

## 🔧 Configuration

### Environment Variables

**Server (.env):**
```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
CLIENT_URL=http://localhost:5173
```

**Client (.env):**
```env
VITE_API_URL=http://localhost:5000
```

## 📝 Database

The application uses SQLite for data storage. The database file is automatically created at `server/database/medlink.db`

### Tables:
- `users` - User accounts
- `doctors` - Doctor profiles
- `appointments` - Appointment bookings

## 🐛 Troubleshooting

### Port already in use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Camera/Microphone not working
- Grant browser permissions
- Check if another app is using the camera
- Try a different browser (Chrome recommended)

### Database locked
```bash
cd server/database
del medlink.db
cd ..
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons from Lucide React
- Images from Unsplash
- UI inspiration from modern healthcare platforms

## 📧 Support

For support, please open an issue in the GitHub repository.

---

**Built with ❤️ for accessible healthcare**
