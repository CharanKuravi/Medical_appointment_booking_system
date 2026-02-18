import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MapPin, FileText, X } from 'lucide-react';

const Appointments = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchAppointments();
    }, [user, navigate]);

    const fetchAppointments = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/appointments/history/${user.role}/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            setAppointments(data.appointments || []);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    const cancelAppointment = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/appointments/cancel/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Appointment cancelled successfully');
                fetchAppointments();
            }
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            alert('Failed to cancel appointment');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 p-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        My Appointments
                    </h1>
                    <p className="text-slate-600">View and manage your appointments</p>
                </motion.div>

                {appointments.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center border border-slate-100"
                    >
                        <Calendar className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                        <h3 className="text-2xl font-bold text-slate-700 mb-2">No Appointments Yet</h3>
                        <p className="text-slate-500 mb-6">Book your first appointment with a doctor</p>
                        <button
                            onClick={() => navigate('/doctors')}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg hover:scale-105 transition-all"
                        >
                            Find Doctors
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid gap-6">
                        {appointments.map((appointment, index) => (
                            <motion.div
                                key={appointment.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-slate-100 hover:shadow-2xl transition-all"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                                                {appointment.specialist_name?.charAt(0) || 'D'}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800">
                                                    {appointment.specialist_name || appointment.doctor_name}
                                                </h3>
                                                <p className="text-purple-600 font-medium">{appointment.specialty}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Calendar className="w-5 h-5 text-purple-500" />
                                                <span>{appointment.appointment_date}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Clock className="w-5 h-5 text-blue-500" />
                                                <span>{appointment.appointment_time}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <User className="w-5 h-5 text-teal-500" />
                                                <span>{appointment.patient_name || appointment.patientName}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <MapPin className="w-5 h-5 text-rose-500" />
                                                <span>{appointment.location || 'Not specified'}</span>
                                            </div>
                                        </div>

                                        {appointment.patient_notes && (
                                            <div className="flex items-start gap-2 text-slate-600 bg-slate-50 p-3 rounded-xl">
                                                <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-medium text-slate-700">Notes:</p>
                                                    <p className="text-sm">{appointment.patient_notes}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col items-end gap-3">
                                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                                            appointment.status === 'confirmed' 
                                                ? 'bg-green-100 text-green-700'
                                                : appointment.status === 'cancelled'
                                                ? 'bg-red-100 text-red-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {appointment.status?.toUpperCase() || 'PENDING'}
                                        </span>

                                        {appointment.status !== 'cancelled' && (
                                            <button
                                                onClick={() => cancelAppointment(appointment.id)}
                                                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all font-medium"
                                            >
                                                <X className="w-4 h-4" />
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appointments;
