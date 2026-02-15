import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import { Search, Calendar, Clock, CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PatientDashboard = () => {
    const { user } = useAuth();
    const [doctors, setDoctors] = useState([]);
    const [history, setHistory] = useState([]);
    const [search, setSearch] = useState(new URLSearchParams(window.location.search).get('specialization') || '');
    const [bookingDoctor, setBookingDoctor] = useState(null);
    const [bookingDetails, setBookingDetails] = useState({
        date: '',
        timeSlot: '',
        patientName: user?.name || '',
        patientAge: '',
        problemDescription: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const [dateScrollOffset, setDateScrollOffset] = useState(0);

    const generateDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push({
                full: date.toISOString().split('T')[0],
                dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
                dayNum: date.getDate(),
                month: date.toLocaleDateString('en-US', { month: 'short' })
            });
        }
        return dates;
    };

    const dates = generateDates();
    const visibleDates = dates.slice(dateScrollOffset, dateScrollOffset + 7);

    const scrollDates = (direction) => {
        if (direction === 'left' && dateScrollOffset > 0) {
            setDateScrollOffset(dateScrollOffset - 1);
        } else if (direction === 'right' && dateScrollOffset < dates.length - 7) {
            setDateScrollOffset(dateScrollOffset + 1);
        }
    };

    // Sync search state with URL parameter if it changes
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const spec = queryParams.get('specialization');
        if (spec) setSearch(spec);
    }, [window.location.search]);

    // Update patientName when user data is available
    useEffect(() => {
        if (user?.name && !bookingDetails.patientName) {
            setBookingDetails(prev => ({ ...prev, patientName: user.name }));
        }
    }, [user]);

    useEffect(() => {
        fetchDoctors();
        fetchHistory();
    }, []);

    const fetchDoctors = async () => {
        try {
            const res = await API.get('/doctors');
            setDoctors(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchHistory = async () => {
        try {
            const res = await API.get(`/appointments/history/patient/${user?.id}`);
            setHistory(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleBook = async () => {
        try {
            await API.post('/appointments/book', {
                patientId: user?.id,
                doctorId: bookingDoctor._id,
                patientName: bookingDetails.patientName,
                specialist_name: `Dr. ${bookingDoctor.userId?.name}`,
                specialty: bookingDoctor.specialization,
                location: "Main Hospital Center",
                appointment_date: bookingDetails.date,
                appointment_time: bookingDetails.timeSlot.split(' - ')[0],
                patient_notes: bookingDetails.problemDescription
            });
            setShowSuccess(true);
            fetchHistory();
        } catch (err) {
            alert(err.response?.data?.message || 'Booking failed');
        }
    };

    const handleCancel = async (id) => {
        try {
            await API.put(`/appointments/cancel/${id}`);
            fetchHistory();
        } catch (err) {
            alert('Failed to cancel');
        }
    };

    const filteredDoctors = doctors.filter(doc =>
        doc.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialization?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto p-6 lg:p-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Hello, {user?.name}</h1>
                    <p className="text-slate-500 text-lg">Manage your health and appointments here.</p>
                </div>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search doctors or specializations..."
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Doctor List */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800">Available Doctors</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredDoctors.map(doc => (
                            <div key={doc._id} className="premium-card p-6 border-l-4 border-l-primary group">
                                <h3 className="text-xl font-bold text-slate-900 mb-1">Dr. {doc.userId.name}</h3>
                                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full mb-4">
                                    {doc.specialization}
                                </span>
                                <p className="text-slate-500 text-sm mb-6 line-clamp-2">{doc.bio || 'General medicine and healthcare specialist.'}</p>
                                <button
                                    onClick={() => setBookingDoctor(doc)}
                                    className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-[1.02]"
                                >
                                    Book Appointment
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Bookings */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800">Upcoming Bookings</h2>
                    <div className="space-y-4">
                        {history.filter(a => a.status === 'confirmed').map(app => (
                            <div key={app._id} className="bg-white rounded-2xl p-6 border-2 border-primary/10 shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                    <CheckCircle size={40} className="text-primary" />
                                </div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-bold text-slate-900">{app.specialist_name}</h4>
                                        <p className="text-sm text-slate-500 font-medium">{app.specialty}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-bold uppercase text-slate-400">
                                    <div className="flex items-center gap-1 bg-slate-50 p-2 rounded-lg">
                                        <Calendar size={14} className="text-primary" /> {app.appointment_date}
                                    </div>
                                    <div className="flex items-center gap-1 bg-slate-50 p-2 rounded-lg">
                                        <Clock size={14} className="text-primary" /> {app.appointment_time}
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-xl mb-4">
                                    <p className="text-xs text-slate-500"><strong>Patient:</strong> {app.patientName}</p>
                                    {app.patient_notes && (
                                        <p className="text-xs text-slate-500 italic mt-1">"{app.patient_notes}"</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleCancel(app._id)}
                                    className="w-full py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-lg transition-colors border border-rose-100"
                                >
                                    Cancel Booking
                                </button>
                            </div>
                        ))}
                        {history.filter(a => a.status === 'confirmed').length === 0 && (
                            <p className="text-slate-400 italic">No upcoming appointments scheduled.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Booking Modal (Calendar & Slots) */}
            {bookingDoctor && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[1100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white rounded-[2.5rem] p-10 w-full max-w-2xl shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        {showSuccess ? (
                            <div className="py-20 text-center space-y-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-200"
                                >
                                    <CheckCircle size={50} className="text-white" />
                                </motion.div>
                                <h2 className="text-3xl font-bold text-slate-900">Appointment Booked! ✅</h2>
                                <div className="space-y-2">
                                    <p className="text-slate-500">Your slot with Dr. {bookingDoctor.userId?.name} is confirmed.</p>
                                    <p className="text-primary font-bold">Patient Name: {bookingDetails.patientName} | Age: {bookingDetails.patientAge}</p>
                                </div>
                                <button
                                    onClick={() => { setShowSuccess(false); setBookingDoctor(null); }}
                                    className="bg-primary text-white px-8 py-3 rounded-xl font-bold"
                                >
                                    Return to Dashboard
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h2 className="text-3xl font-bold text-slate-900 mb-1">Schedule Appointment</h2>
                                        <p className="text-primary font-bold">{bookingDoctor.specialization} • Dr. {bookingDoctor.userId?.name}</p>
                                    </div>
                                    <button onClick={() => setBookingDoctor(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                        <XCircle size={24} className="text-slate-400" />
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-10">
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between items-center mb-4">
                                                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">1. Select Date</label>
                                                <div className="flex gap-2">
                                                    <button onClick={() => scrollDates('left')} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"><ChevronLeft size={20} /></button>
                                                    <button onClick={() => scrollDates('right')} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"><ChevronRight size={20} /></button>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-7 gap-2">
                                                {visibleDates.map((d) => (
                                                    <button
                                                        key={d.full}
                                                        onClick={() => setBookingDetails({ ...bookingDetails, date: d.full })}
                                                        className={`p-2 rounded-xl text-center transition-all ${bookingDetails.date === d.full
                                                            ? 'bg-primary text-white shadow-lg'
                                                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                                            }`}
                                                    >
                                                        <div className="text-[10px] uppercase font-bold opacity-60">{d.dayName}</div>
                                                        <div className="text-lg font-black">{d.dayNum}</div>
                                                        <div className="text-[10px] uppercase font-bold opacity-60">{d.month}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="block text-sm font-bold text-slate-700 mb-1 uppercase tracking-wider">2. Patient Info</label>
                                            <input
                                                type="text"
                                                placeholder="Patient Full Name"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                                value={bookingDetails.patientName}
                                                onChange={(e) => setBookingDetails({ ...bookingDetails, patientName: e.target.value })}
                                            />
                                            <div className="flex gap-4">
                                                <input
                                                    type="number"
                                                    placeholder="Age"
                                                    className="w-1/3 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                                    value={bookingDetails.patientAge}
                                                    onChange={(e) => setBookingDetails({ ...bookingDetails, patientAge: e.target.value })}
                                                />
                                                <div className="flex-grow flex items-center text-xs text-slate-400 italic">
                                                    (Years)
                                                </div>
                                            </div>
                                            <textarea
                                                placeholder="Problem description..."
                                                rows="2"
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
                                                value={bookingDetails.problemDescription}
                                                onChange={(e) => setBookingDetails({ ...bookingDetails, problemDescription: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* Right Col: Time Slots */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider text-center">3. Available Slots</label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {['9:00 AM - 11:00 AM', '3:00 PM - 4:00 PM', '5:00 PM - 6:00 PM', '7:00 PM - 8:00 PM'].map((slot) => (
                                                <button
                                                    key={slot}
                                                    onClick={() => setBookingDetails({ ...bookingDetails, timeSlot: slot })}
                                                    className={`w-full py-4 rounded-2xl font-bold transition-all border-2 text-center flex items-center justify-center gap-3 ${bookingDetails.timeSlot === slot
                                                        ? 'bg-primary text-white border-primary shadow-xl'
                                                        : 'bg-white text-slate-600 border-slate-100 hover:border-primary/30'
                                                        }`}
                                                >
                                                    <Clock size={16} />
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            onClick={handleBook}
                                            disabled={!bookingDetails.date || !bookingDetails.timeSlot || !bookingDetails.patientAge || !bookingDetails.patientName}
                                            className="w-full mt-8 bg-slate-900 text-white py-5 rounded-[1.5rem] font-bold shadow-2xl hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            Confirm Appointment
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default PatientDashboard;
