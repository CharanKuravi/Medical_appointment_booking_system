import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    }, [user]);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/appointments/history/${user.role}/${user.uid}`);
            setAppointments(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setLoading(false);
        }
    };

    const handleCancel = async (id) => {
        if (!confirm('Are you sure you want to cancel this appointment?')) return;
        
        try {
            await axios.put(`http://localhost:5000/api/appointments/cancel/${id}`);
            alert('Appointment cancelled successfully');
            fetchAppointments();
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            alert('Failed to cancel appointment');
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent mb-8">
                    My Appointments
                </h1>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                ) : appointments.length === 0 ? (
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 text-center shadow-lg">
                        <Calendar size={64} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-2xl font-bold text-slate-700 mb-2">No Appointments Yet</h3>
                        <p className="text-slate-500 mb-6">Book your first appointment to get started</p>
                        <button
                            onClick={() => navigate('/doctors')}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                        >
                            Find Doctors
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {appointments.map(apt => (
                            <div key={apt._id} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                                {apt.specialist_name?.charAt(0) || 'D'}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-800">{apt.specialist_name}</h3>
                                                <p className="text-purple-600 font-medium">{apt.specialty}</p>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Calendar size={16} />
                                                <span>{new Date(apt.appointment_date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Clock size={16} />
                                                <span>{apt.appointment_time}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <MapPin size={16} />
                                                <span>{apt.location}</span>
                                            </div>
                                        </div>
                                        {apt.patient_notes && (
                                            <p className="mt-4 text-slate-600 text-sm bg-slate-50 p-3 rounded-lg">
                                                <strong>Notes:</strong> {apt.patient_notes}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                                            apt.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                            apt.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {apt.status}
                                        </span>
                                        {apt.status === 'confirmed' && (
                                            <button
                                                onClick={() => handleCancel(apt._id)}
                                                className="text-red-500 hover:text-red-700 font-medium text-sm flex items-center gap-1"
                                            >
                                                <X size={16} /> Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appointments;
