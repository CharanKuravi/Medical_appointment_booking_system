import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Award, GraduationCap, MapPin, DollarSign, Languages, Clock, X } from 'lucide-react';
import { useState } from 'react';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State for appointment booking
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 7)); // March 7, 2026
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  // State for callback modal
  const [showCallbackModal, setShowCallbackModal] = useState(false);
  const [callbackForm, setCallbackForm] = useState({
    mobile: '',
    firstName: '',
    lastName: '',
    email: '',
    comments: ''
  });
  
  // Generate available time slots (5 slots with 1.5 hour gap)
  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '12:00 PM',
    '01:30 PM',
    '03:00 PM'
  ];
  
  // Handle date navigation
  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 1);
    setSelectedDate(newDate);
    setSelectedSlot(null);
  };
  
  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    setSelectedDate(newDate);
    setSelectedSlot(null);
  };
  
  // Format date for display
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    const suffix = day === 1 || day === 21 || day === 31 ? 'st' : 
                   day === 2 || day === 22 ? 'nd' : 
                   day === 3 || day === 23 ? 'rd' : 'th';
    return `${day}${suffix} ${month}, ${year}`;
  };
  
  // Handle appointment booking
  const handleBookAppointment = () => {
    if (selectedSlot) {
      alert(`Appointment booked for ${formatDate(selectedDate)} at ${selectedSlot}`);
      // Here you would typically make an API call to save the appointment
    }
  };
  
  // Handle callback form input
  const handleCallbackInputChange = (e) => {
    setCallbackForm({
      ...callbackForm,
      [e.target.name]: e.target.value
    });
  };
  
  // Handle callback request submission
  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    alert(`Callback request submitted!\nName: ${callbackForm.firstName} ${callbackForm.lastName}\nMobile: ${callbackForm.mobile}\nEmail: ${callbackForm.email}`);
    // Here you would typically make an API call to save the callback request
    setShowCallbackModal(false);
    setCallbackForm({
      mobile: '',
      firstName: '',
      lastName: '',
      email: '',
      comments: ''
    });
  };

  // Mock doctor data - will be replaced with actual data
  const doctor = {
    id: id,
    name: "Dr. Ethan Walker",
    designation: "Consultant Cardiologist",
    speciality: "Cardiology",
    subSpeciality: "Interventional Cardiology, Preventive Cardiology",
    experience: 18,
    consultationFee: 121,
    languages: ["English"],
    hospital: "MedLink Cardiology Center",
    about: "Experienced cardiologist specializing in heart disease management, cardiac diagnostics, and preventive heart care. With over 18 years of clinical experience, Dr. Walker has successfully treated thousands of patients with various cardiac conditions. His expertise includes interventional procedures, preventive cardiology, and comprehensive cardiac care.",
    education: ["MBBS", "MD Internal Medicine", "DM Cardiology"],
    awards: ["Clinical Excellence Award", "Patient Care Recognition"]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
          <button onClick={() => navigate('/')} className="hover:text-green-600">Home</button>
          <span>›</span>
          <button onClick={() => navigate('/doctors')} className="hover:text-green-600">Doctors</button>
          <span>›</span>
          <span className="text-slate-800 font-medium">{doctor.name}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Doctor Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Header Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8">
              <div className="flex items-start gap-6 mb-6">
                {/* Doctor Image */}
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shrink-0">
                  {doctor.name.split(' ')[1].charAt(0)}
                </div>

                {/* Doctor Info */}
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-slate-800 mb-2">{doctor.name}</h1>
                  <p className="text-green-600 font-semibold text-lg mb-4">{doctor.designation}</p>
                  
                  <div className="grid md:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar size={16} className="text-green-500" />
                      <span className="text-sm">{doctor.experience} Years Experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <DollarSign size={16} className="text-green-500" />
                      <span className="text-sm">${doctor.consultationFee} Consultation Fee</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <MapPin size={16} className="text-green-500" />
                      <span className="text-sm">{doctor.hospital}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Languages size={16} className="text-green-500" />
                      <span className="text-sm">{doctor.languages.join(', ')}</span>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 inline-block">
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold text-green-700">Specialization:</span> {doctor.subSpeciality}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-xl">📋</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800">About</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                {doctor.about}
              </p>
            </div>

            {/* Education & Awards Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Education Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <GraduationCap size={20} className="text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Education</h2>
                </div>
                <ul className="space-y-2">
                  {doctor.education.map((edu, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                      <span className="text-slate-700">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Awards Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Award size={20} className="text-yellow-600" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-800">Awards & Accolades</h2>
                </div>
                <ul className="space-y-2">
                  {doctor.awards.map((award, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2"></div>
                      <span className="text-slate-700">{award}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Appointment Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-xl p-8 text-white sticky top-8">
              <h3 className="text-2xl font-bold mb-6">Book Appointment</h3>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                <p className="text-green-100 text-sm mb-3">Select Date</p>
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={handlePrevDay}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <span className="font-semibold text-center">{formatDate(selectedDate)}</span>
                  <button 
                    onClick={handleNextDay}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <ArrowLeft size={20} className="rotate-180" />
                  </button>
                </div>
                
                {/* Time Slots */}
                <div className="mt-4">
                  <p className="text-green-100 text-sm mb-3">Available Time Slots</p>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                          selectedSlot === slot
                            ? 'bg-white text-green-600 shadow-lg'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {selectedSlot && (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4">
                  <div className="flex items-center gap-2 text-white">
                    <Clock size={16} />
                    <span className="text-sm">Selected: {selectedSlot}</span>
                  </div>
                </div>
              )}
              
              <button 
                onClick={handleBookAppointment}
                disabled={!selectedSlot}
                className={`w-full py-3 rounded-xl font-bold transition-colors shadow-lg mb-3 ${
                  selectedSlot
                    ? 'bg-white text-green-600 hover:bg-green-50'
                    : 'bg-white/30 text-white/50 cursor-not-allowed'
                }`}
              >
                {selectedSlot ? 'Confirm Appointment' : 'Select a Time Slot'}
              </button>
              
              <button 
                onClick={() => setShowCallbackModal(true)}
                className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors shadow-lg"
              >
                Request A Call Back
              </button>

              <div className="mt-6 pt-6 border-t border-white/20">
                <button 
                  onClick={() => navigate('/doctors')}
                  className="w-full bg-white/10 backdrop-blur-sm text-white py-3 rounded-xl font-bold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={18} />
                  Back to Doctors
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Callback Modal */}
      {showCallbackModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-800">Callback</h2>
              <button 
                onClick={() => setShowCallbackModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCallbackSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-slate-600 text-sm mb-2">
                  Mobile Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={callbackForm.mobile}
                  onChange={handleCallbackInputChange}
                  required
                  className="w-full border-b-2 border-slate-300 focus:border-green-500 outline-none py-2 text-slate-800 transition-colors"
                  placeholder="Enter your mobile number"
                />
              </div>
              
              <div>
                <label className="block text-slate-600 text-sm mb-2">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={callbackForm.firstName}
                  onChange={handleCallbackInputChange}
                  required
                  className="w-full border-b-2 border-slate-300 focus:border-green-500 outline-none py-2 text-slate-800 transition-colors"
                  placeholder="Enter your first name"
                />
              </div>
              
              <div>
                <label className="block text-slate-600 text-sm mb-2">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={callbackForm.lastName}
                  onChange={handleCallbackInputChange}
                  required
                  className="w-full border-b-2 border-slate-300 focus:border-green-500 outline-none py-2 text-slate-800 transition-colors"
                  placeholder="Enter your last name"
                />
              </div>
              
              <div>
                <label className="block text-slate-600 text-sm mb-2">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={callbackForm.email}
                  onChange={handleCallbackInputChange}
                  required
                  className="w-full border-b-2 border-slate-300 focus:border-green-500 outline-none py-2 text-slate-800 transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="block text-slate-600 text-sm mb-2">
                  Comments<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="comments"
                  value={callbackForm.comments}
                  onChange={handleCallbackInputChange}
                  required
                  className="w-full border-b-2 border-slate-300 focus:border-green-500 outline-none py-2 text-slate-800 transition-colors"
                  placeholder="Add any comments"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
              >
                Request Callback
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
