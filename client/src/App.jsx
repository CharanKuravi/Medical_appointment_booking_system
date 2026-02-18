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
import Departments from './pages/Departments';
import Appointments from './pages/Appointments';
import Emergency from './pages/Emergency';

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
              <Route path="/departments" element={<Departments />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/emergency" element={<Emergency />} />
            </Routes>
          </main>
          <footer className="bg-gradient-to-r from-purple-900 via-blue-900 to-teal-900 text-white py-8 text-center mt-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-teal-500/10"></div>
            <p className="relative z-10">&copy; 2026 MedLink. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
