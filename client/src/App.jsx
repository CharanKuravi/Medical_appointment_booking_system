import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './i18n';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import MedicalExplorer from './pages/MedicalExplorer';
import FindDoctors from './pages/FindDoctors';
import DoctorProfile from './pages/DoctorProfile';
import Departments from './pages/Departments';
import Appointments from './pages/Appointments';
import Emergency from './pages/Emergency';
import LiveAssistant from './pages/LiveAssistant';
import ChatBotPage from './pages/ChatBotPage';
import Insurance from './pages/Insurance';
import FaceAnalysis from './pages/FaceAnalysis';
import Careers from './pages/Careers';

// Components
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/patient-dashboard" element={<PatientDashboard />} />
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/medical-explorer" element={<MedicalExplorer />} />
              <Route path="/doctors" element={<FindDoctors />} />
              <Route path="/doctor/:id" element={<DoctorProfile />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/live-assistant" element={<LiveAssistant />} />
              <Route path="/chatbot" element={<ChatBotPage />} />
              <Route path="/insurance" element={<Insurance />} />
              <Route path="/face-analysis" element={<FaceAnalysis />} />
              <Route path="/careers" element={<Careers />} />
            </Routes>
          </main>
          <footer className="bg-gradient-to-r from-green-900 via-emerald-900 to-teal-900 text-white py-8 text-center mt-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
            <p className="relative z-10">&copy; 2026 MedLink. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
