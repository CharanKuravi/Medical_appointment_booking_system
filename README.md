[README.md](https://github.com/user-attachments/files/25327837/README.md)
# 🏥 MedLink - Medical Appointment Booking System

A modern, full-stack medical appointment booking platform with real-time doctor search, department browsing, emergency services, and multi-language support.

![MedLink Banner](https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=1200&h=300)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Components](#components)
- [Workflows](#workflows)
- [Screenshots](#screenshots)

---

## 🎯 Overview

MedLink is a comprehensive healthcare platform that connects patients with doctors, enabling seamless appointment booking, emergency services access, and medical information discovery. Built with modern web technologies, it features a beautiful purple-teal gradient design with glass morphism effects.

### Key Highlights

- 🔍 **Smart Doctor Search** - Filter by specialty, location, and availability
- 🏥 **Department Navigation** - Browse 8 medical specialties
- 📅 **Appointment Management** - Book, view, and cancel appointments
- 🚨 **24/7 Emergency Services** - Quick access to hospitals and ambulances
- 🌍 **Multi-language Support** - English, Hindi, Telugu
- 🎨 **Modern UI/UX** - Gradient design with smooth animations
- 🔐 **Role-based Access** - Separate portals for patients and doctors
- 📱 **Responsive Design** - Works on all devices

---

## ✨ Features

### For Patients
- ✅ Register and login with secure authentication
- ✅ Search doctors by name, specialty, or location
- ✅ Browse medical departments
- ✅ Book appointments with preferred doctors
- ✅ View appointment history
- ✅ Cancel appointments
- ✅ Access emergency services 24/7
- ✅ Multi-language interface

### For Doctors
- ✅ Doctor registration and profile creation
- ✅ Manage availability and time slots
- ✅ View patient bookings
- ✅ Update specialization and bio
- ✅ Dashboard for appointment management

### Emergency Services
- ✅ Nearby hospital locator
- ✅ One-click ambulance calling (108)
- ✅ Emergency hotlines (Police, Fire, Women Helpline)
- ✅ Hospital availability status
- ✅ First aid tips

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 19.2.0 |
| **Vite** | Build Tool | 7.2.4 |
| **React Router** | Navigation | 7.12.0 |
| **TailwindCSS** | Styling | 4.1.18 |
| **Framer Motion** | Animations | 12.24.12 |
| **Axios** | HTTP Client | 1.13.2 |
| **i18next** | Internationalization | 25.7.4 |
| **Firebase** | Authentication | 12.7.0 |
| **Lucide React** | Icons | 0.562.0 |
| **React Markdown** | Markdown Rendering | 10.1.0 |
| **Leaflet** | Maps | 1.9.4 |

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime | - |
| **Express** | Web Framework | 5.2.1 |
| **MongoDB** | Database | - |
| **Mongoose** | ODM | 9.1.2 |
| **JWT** | Authentication | 9.0.3 |
| **bcryptjs** | Password Hashing | 3.0.3 |
| **CORS** | Cross-Origin | 2.8.5 |
| **dotenv** | Environment Variables | 17.2.3 |
| **Morgan** | HTTP Logger | 1.10.1 |
| **Nodemon** | Dev Server | 3.1.11 |

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

---

## 📁 Project Structure

```
MedLink/
├── client/                          # Frontend React Application
│   ├── public/
│   │   └── vite.svg                # Favicon
│   ├── src/
│   │   ├── assets/                 # Static assets
│   │   ├── components/             # Reusable components
│   │   │   ├── booking/
│   │   │   │   ├── AntiGravityBooking.jsx
│   │   │   │   └── AppointmentPanel.jsx
│   │   │   ├── chat/
│   │   │   │   ├── ChatBubble.jsx
│   │   │   │   ├── MedicalChatbot.jsx
│   │   │   │   └── QuickActions.jsx
│   │   │   ├── medical/
│   │   │   │   ├── AlphabetPicker.jsx
│   │   │   │   ├── AppointmentBooking.jsx
│   │   │   │   ├── DiseaseCard.jsx
│   │   │   │   ├── medicalData.js
│   │   │   │   └── SpecialistCard.jsx
│   │   │   ├── ui/
│   │   │   │   └── button.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── UserNotRegisteredError.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Authentication context
│   │   ├── lib/
│   │   │   └── utils.js           # Utility functions
│   │   ├── pages/                 # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── FindDoctors.jsx
│   │   │   ├── Departments.jsx
│   │   │   ├── Appointments.jsx
│   │   │   ├── Emergency.jsx
│   │   │   ├── PatientDashboard.jsx
│   │   │   ├── DoctorDashboard.jsx
│   │   │   └── MedicalExplorer.jsx
│   │   ├── services/              # API services
│   │   │   ├── api.js
│   │   │   ├── authReady.js
│   │   │   └── bookingService.js
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # Entry point
│   │   ├── index.css              # Global styles
│   │   ├── i18n.js                # Internationalization config
│   │   └── firebase.js            # Firebase configuration
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── eslint.config.js
│
├── server/                         # Backend Express Application
│   ├── models/                    # Mongoose models
│   │   ├── User.js
│   │   ├── Doctor.js
│   │   └── Appointment.js
│   ├── routes/                    # API routes
│   │   ├── auth.js               # Authentication routes
│   │   ├── doctors.js            # Doctor routes
│   │   ├── appointments.js       # Appointment routes
│   │   ├── departments.js        # Department routes
│   │   └── emergency.js          # Emergency routes
│   ├── server.js                 # Entry point
│   ├── .env                      # Environment variables
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd MedLink
```

### Step 2: Install Dependencies

**Frontend:**
```bash
cd client
npm install
```

**Backend:**
```bash
cd server
npm install
```

### Step 3: Configure Environment

Create `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/medlink_db
JWT_SECRET=your_secret_key_here
PORT=5000
```

### Step 4: Start Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
# App runs on http://localhost:5173
```

### Step 5: Access Application
Open browser and navigate to: **http://localhost:5173**

---

## 📖 Usage

### Patient Workflow

1. **Register/Login**
   - Navigate to `/register`
   - Fill form with role: "patient"
   - Login at `/login`

2. **Find Doctors**
   - Go to `/doctors`
   - Use filters: specialty, city, search
   - Click "Book Appointment"

3. **Book Appointment**
   - Select date and time
   - Add patient notes
   - Submit booking

4. **Manage Appointments**
   - Go to `/appointments`
   - View all bookings
   - Cancel if needed

5. **Emergency Services**
   - Go to `/emergency`
   - View nearby hospitals
   - Call ambulance (108)

### Doctor Workflow

1. **Register as Doctor**
   - Register with role: "doctor"
   - Create doctor profile via API

2. **Manage Availability**
   - Update time slots
   - Set specialization

3. **View Bookings**
   - Access `/doctor-dashboard`
   - See patient appointments

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "patient"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "patient"
  }
}
```

### Doctor Endpoints

#### Get All Doctors (with filters)
```http
GET /doctors?specialty=Cardiology&city=Hyderabad&search=john
```

#### Get Doctor by ID
```http
GET /doctors/:id
```

#### Create Doctor Profile
```http
POST /doctors/profile
Content-Type: application/json

{
  "userId": "user_id",
  "specialization": "Cardiology",
  "bio": "Experienced cardiologist...",
  "location": "Hyderabad",
  "availability": ["Monday 9AM-5PM"]
}
```

### Appointment Endpoints

#### Book Appointment
```http
POST /appointments/book
Content-Type: application/json

{
  "patientId": "patient_id",
  "doctorId": "doctor_id",
  "patientName": "John Doe",
  "specialist_name": "Dr. Smith",
  "specialty": "Cardiology",
  "location": "City Hospital",
  "appointment_date": "2026-03-15",
  "appointment_time": "10:00 AM",
  "patient_notes": "Chest pain"
}
```

#### Get Appointment History
```http
GET /appointments/history/:role/:userId
```

#### Cancel Appointment
```http
PUT /appointments/cancel/:id
```

### Department Endpoints

#### Get All Departments
```http
GET /departments
```

#### Get Doctors by Department
```http
GET /departments/:specialty/doctors
```

### Emergency Endpoints

#### Get Nearby Hospitals
```http
GET /emergency/hospitals?lat=17.4239&lng=78.4738
```

#### Request Ambulance
```http
POST /emergency/request
Content-Type: application/json

{
  "location": "Banjara Hills, Hyderabad",
  "phone": "+91-9876543210",
  "emergency_type": "Heart Attack"
}
```

---

## 🧩 Components

### Core Components

#### 1. Navbar (`Navbar.jsx`)
- **Purpose:** Main navigation bar
- **Features:**
  - Logo with home redirect
  - Navigation links (Home, Find Doctors, Departments, Appointments, Emergency)
  - Language selector (EN/HI/TE)
  - User profile display
  - Login/Logout buttons
- **State:** Uses AuthContext for user state

#### 2. AppointmentBooking (`AppointmentBooking.jsx`)
- **Purpose:** Modal for booking appointments
- **Features:**
  - Date picker
  - Time slot selection
  - Patient notes input
  - Form validation
  - API integration
- **Props:** `specialist`, `onClose`

#### 3. MedicalChatbot (`MedicalChatbot.jsx`)
- **Purpose:** AI-powered medical assistant
- **Features:**
  - Chat interface
  - Quick action buttons
  - Medical information
  - Symptom checker
- **State:** Chat history, messages

#### 4. AppointmentPanel (`AppointmentPanel.jsx`)
- **Purpose:** Floating appointment widget
- **Features:**
  - Quick booking access
  - Upcoming appointments
  - Notification badge
- **State:** Appointment count

### Page Components

#### 1. Home (`Home.jsx`)
- **Sections:**
  - Hero with gradient background
  - Department cards
  - Emergency resources
  - Insurance information
  - Medical gear products
- **Navigation:** Links to doctors, departments, emergency

#### 2. FindDoctors (`FindDoctors.jsx`)
- **Features:**
  - Search bar
  - Specialty filter (8 options)
  - City filter (6 cities)
  - Doctor cards with booking
  - Real-time filtering
- **State:** doctors, filters, selectedDoctor

#### 3. Departments (`Departments.jsx`)
- **Features:**
  - 8 department cards with icons
  - Gradient backgrounds
  - Click to filter doctors
- **Navigation:** Redirects to `/doctors?specialty=X`

#### 4. Appointments (`Appointments.jsx`)
- **Features:**
  - Appointment list
  - Status badges (confirmed/cancelled)
  - Cancel functionality
  - Empty state with CTA
- **Auth:** Requires login

#### 5. Emergency (`Emergency.jsx`)
- **Features:**
  - Emergency hotlines (4 cards)
  - Nearby hospitals (4 listings)
  - One-click calling
  - First aid tips
  - Ambulance request
- **State:** nearbyHospitals

#### 6. Login/Register (`Login.jsx`, `Register.jsx`)
- **Features:**
  - Form validation
  - Role selection (patient/doctor)
  - Firebase integration
  - JWT authentication
  - Error handling

#### 7. PatientDashboard (`PatientDashboard.jsx`)
- **Features:**
  - Appointment overview
  - Medical history
  - Quick actions
  - Profile management
- **Auth:** Patient role required

#### 8. DoctorDashboard (`DoctorDashboard.jsx`)
- **Features:**
  - Patient bookings
  - Availability management
  - Profile editing
  - Statistics
- **Auth:** Doctor role required

### Utility Components

#### 1. AuthContext (`AuthContext.jsx`)
- **Purpose:** Global authentication state
- **Provides:**
  - user object
  - loginWithGoogle()
  - loginWithFacebook()
  - logout()
  - loading state

#### 2. Button (`button.jsx`)
- **Purpose:** Reusable button component
- **Variants:** primary, secondary, outline
- **Props:** variant, size, onClick, children

---

## 🔄 Workflows

### 1. User Registration Flow
```
User → /register → Fill Form → Select Role → Submit
  ↓
Backend → Validate → Hash Password → Save to DB
  ↓
Response → Success → Redirect to /login
```

### 2. Doctor Search Flow
```
User → /doctors → Enter Filters (specialty, city, search)
  ↓
Frontend → Apply Filters → Filter Array
  ↓
Display → Doctor Cards → Click "Book Appointment"
  ↓
Modal → AppointmentBooking Component → Fill Form → Submit
  ↓
Backend → Validate → Check Slot → Save Appointment
  ↓
Response → Success → Show Confirmation
```

### 3. Appointment Booking Flow
```
Patient → Select Doctor → Click "Book Appointment"
  ↓
Modal Opens → Select Date → Select Time → Add Notes
  ↓
Submit → POST /api/appointments/book
  ↓
Backend → Check Availability → Create Appointment
  ↓
Response → Success → Update UI → Close Modal
```

### 4. Emergency Service Flow
```
User → /emergency → View Hospitals
  ↓
Click "Call Now" → Confirm Dialog → Dial Number
  ↓
OR
  ↓
Click Emergency Hotline → Direct Call (108, 100, 101, 1091)
```

### 5. Authentication Flow
```
User → /login → Enter Credentials → Submit
  ↓
Backend → Validate → Check Password → Generate JWT
  ↓
Response → Token + User Data
  ↓
Frontend → Save Token → Update AuthContext → Redirect
  ↓
If Patient → /patient-dashboard
If Doctor → /doctor-dashboard
```

### 6. Language Switch Flow
```
User → Navbar → Language Dropdown → Select Language
  ↓
i18n → Change Language → Update Translations
  ↓
localStorage → Save Preference
  ↓
Page → Reload with New Language
```

---

## 🎨 Design System

### Color Palette
```css
Primary: #8b5cf6 (Purple)
Secondary: #06b6d4 (Cyan/Teal)
Accent: #ec4899 (Pink)
Background: Gradient from purple-50 via blue-50 to teal-50
Text: #1e293b (Slate-800)
```

### Typography
- **Font Family:** System fonts (sans-serif)
- **Headings:** Bold, gradient text
- **Body:** Regular, slate-700

### Components Style
- **Cards:** White/90 opacity, backdrop blur, rounded-2xl
- **Buttons:** Gradient backgrounds, hover scale effects
- **Inputs:** Border-purple-200, rounded-xl, focus ring
- **Badges:** Rounded-full, colored backgrounds

### Animations
- **Hover:** Scale, translate, shadow effects
- **Page Transitions:** Fade in, slide up
- **Loading:** Spinning border animation

---

## 📸 Screenshots

### Home Page
- Hero section with gradient background
- Department cards with icons
- Emergency resources section

### Find Doctors
- Search and filter interface
- Doctor cards with profiles
- Booking modal

### Appointments
- List of bookings
- Status indicators
- Cancel functionality

### Emergency
- Emergency hotlines
- Nearby hospitals
- First aid tips

---

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token authentication
- ✅ Protected API routes
- ✅ Role-based access control
- ✅ Input validation
- ✅ CORS configuration
- ✅ Environment variable protection

---

## 🌍 Internationalization

### Supported Languages
- **English (EN)** - Default
- **Hindi (HI)** - हिंदी
- **Telugu (TE)** - తెలుగు

### Implementation
- Uses `i18next` and `react-i18next`
- Language files in `i18n.js`
- Browser language detection
- localStorage persistence

---

## 📱 Responsive Design

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Breakpoints
```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration (patient/doctor)
- [ ] User login
- [ ] Doctor search with filters
- [ ] Appointment booking
- [ ] Appointment cancellation
- [ ] Emergency page functionality
- [ ] Language switching
- [ ] Responsive design on mobile

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Set environment variables
# Deploy with git push
```

### Environment Variables
```env
# Production
MONGODB_URI=<your_mongodb_atlas_uri>
JWT_SECRET=<strong_secret_key>
PORT=5000
NODE_ENV=production
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Authors

- **Your Name** - Initial work

---

## 🙏 Acknowledgments

- React team for amazing framework
- TailwindCSS for utility-first CSS
- Unsplash for images
- Lucide for beautiful icons
- Firebase for authentication

---

## 📞 Support

For support, email support@medlink.com or create an issue in the repository.

---

## 🎯 Future Enhancements

- [ ] Video consultation integration
- [ ] Payment gateway
- [ ] Prescription management
- [ ] Medical records upload
- [ ] Email/SMS notifications
- [ ] Doctor ratings and reviews
- [ ] Insurance claim processing
- [ ] Admin analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI symptom checker

---

**Made with ❤️ for better healthcare access**

---

## 📊 Project Statistics

- **Total Files:** 50+
- **Lines of Code:** 5000+
- **Components:** 20+
- **API Endpoints:** 15+
- **Pages:** 10
- **Languages:** 3
- **Dependencies:** 40+

---

**Status:** ✅ Production Ready | 🚀 Fully Functional | 🎨 Modern Design
