import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';

const generateTimeSlots = () => {
    const slots = [];
    const hours = [9, 10, 11, 14, 15, 16, 17];
    const minutes = ['00', '30'];

    hours.forEach(hour => {
        minutes.forEach(minute => {
            const time = `${hour}:${minute}`;
            const period = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour > 12 ? hour - 12 : hour;
            slots.push({
                time: `${displayHour}:${minute} ${period}`,
                available: Math.random() > 0.3 // 70% of slots available
            });
        });
    });

    return slots;
};

const generateDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push({
            date: date,
            dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
            dayNum: date.getDate(),
            month: date.toLocaleDateString('en-US', { month: 'short' })
        });
    }

    return dates;
};

const hospitalLocations = {
    "Neurology Center": { lat: 40.7589, lng: -73.9851, address: "123 Brain Ave, New York, NY" },
    "Respiratory Care Center": { lat: 40.7614, lng: -73.9776, address: "456 Lung Street, New York, NY" },
    "Cardiology Center": { lat: 40.7549, lng: -73.9840, address: "789 Heart Blvd, New York, NY" },
    "Orthopedic Surgery Center": { lat: 40.7580, lng: -73.9855, address: "321 Joint Road, New York, NY" },
    "default": { lat: 40.7580, lng: -73.9855, address: "Medical Center, New York, NY" }
};

export default function AppointmentBooking({ specialist, onClose }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [confirmed, setConfirmed] = useState(false);
    const [dateScrollOffset, setDateScrollOffset] = useState(0);

    const dates = generateDates();
    const timeSlots = generateTimeSlots();
    const visibleDates = dates.slice(dateScrollOffset, dateScrollOffset + 7);
    const location = hospitalLocations[specialist.location] || hospitalLocations.default;

    const { user } = useAuth();

    const handleConfirm = async () => {
        if (!user) {
            alert("Please log in to book");
            return;
        }

        try {
            const d = selectedDate.date;
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            const dateString = `${year}-${month}-${day}`;

            const appointmentData = {
                patientId: user.id,
                doctorId: specialist.id || null,
                patientName: user.name || user.displayName || user.email,
                specialist_name: specialist.title,
                specialty: specialist.specialty || specialist.expertise,
                location: specialist.location || 'Medical Center',
                appointment_date: dateString,
                appointment_time: selectedTime.time,
                patient_notes: ''
            };

            const response = await API.post('/appointments/book', appointmentData);
            
            if (response.data.message) {
                setConfirmed(true);
                setTimeout(() => {
                    onClose();
                }, 2500);
            }
        } catch (err) {
            console.error("Booking error:", err);
            alert(`Error: ${err.response?.data?.error || err.message}`);
        }
    };

    const scrollDates = (direction) => {
        if (direction === 'left' && dateScrollOffset > 0) {
            setDateScrollOffset(dateScrollOffset - 1);
        } else if (direction === 'right' && dateScrollOffset < dates.length - 7) {
            setDateScrollOffset(dateScrollOffset + 1);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    {!confirmed ? (
                        <motion.div key="booking" className="flex flex-col h-full">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-teal-500 text-white p-6 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10 bg-white/5" />
                                <div className="relative flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">Book Appointment</h2>
                                        <p className="text-blue-100">{specialist.title}</p>
                                        <p className="text-sm text-blue-200">{specialist.specialty}</p>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                                    {/* Left Side - Date and Time Selection */}
                                    <div className="space-y-6">
                                        {/* Date Selection */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <Calendar className="w-5 h-5 text-blue-600" />
                                                <h3 className="text-lg font-semibold text-slate-800">Select Date</h3>
                                            </div>

                                            <div className="relative">
                                                {dateScrollOffset > 0 && (
                                                    <button
                                                        onClick={() => scrollDates('left')}
                                                        className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
                                                    >
                                                        <ChevronLeft className="w-5 h-5 text-blue-600" />
                                                    </button>
                                                )}

                                                <div className="grid grid-cols-7 gap-2">
                                                    {visibleDates.map((dateObj, index) => (
                                                        <motion.button
                                                            key={index}
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => setSelectedDate(dateObj)}
                                                            className={`
                                                                p-3 rounded-xl text-center transition-all duration-300
                                                                ${selectedDate?.date.toDateString() === dateObj.date.toDateString()
                                                                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200'
                                                                    : 'bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-100'
                                                                }
                                                            `}
                                                        >
                                                            <div className="text-xs font-medium mb-1">{dateObj.dayName}</div>
                                                            <div className="text-lg font-bold">{dateObj.dayNum}</div>
                                                            <div className="text-xs opacity-80">{dateObj.month}</div>
                                                        </motion.button>
                                                    ))}
                                                </div>

                                                {dateScrollOffset < dates.length - 7 && (
                                                    <button
                                                        onClick={() => scrollDates('right')}
                                                        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors"
                                                    >
                                                        <ChevronRight className="w-5 h-5 text-blue-600" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Time Slots */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-4">
                                                <Clock className="w-5 h-5 text-blue-600" />
                                                <h3 className="text-lg font-semibold text-slate-800">Select Time</h3>
                                            </div>

                                            {selectedDate ? (
                                                <div className="grid grid-cols-4 gap-3 max-h-64 overflow-y-auto pr-2">
                                                    {timeSlots.map((slot, index) => (
                                                        <motion.button
                                                            key={index}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: index * 0.02 }}
                                                            disabled={!slot.available}
                                                            onClick={() => setSelectedTime(slot)}
                                                            className={`
                                                                relative p-3 rounded-xl text-sm font-medium transition-all duration-300
                                                                ${!slot.available
                                                                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed line-through'
                                                                    : selectedTime?.time === slot.time
                                                                        ? 'bg-gradient-to-br from-teal-400 to-teal-500 text-white shadow-lg shadow-teal-200'
                                                                        : 'bg-white border-2 border-slate-200 hover:border-teal-400 hover:bg-teal-50 text-slate-700 hover:text-teal-700'
                                                                }
                                                            `}
                                                        >
                                                            {slot.available && selectedTime?.time === slot.time && (
                                                                <motion.div
                                                                    layoutId="selected-time"
                                                                    className="absolute inset-0 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl"
                                                                    style={{ zIndex: -1 }}
                                                                />
                                                            )}
                                                            {slot.time}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-12 bg-slate-50 rounded-xl">
                                                    <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                                                    <p className="text-slate-500 text-sm">Please select a date first</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Side - Map */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-4">
                                            <MapPin className="w-5 h-5 text-blue-600" />
                                            <h3 className="text-lg font-semibold text-slate-800">Location</h3>
                                        </div>

                                        <div className="rounded-2xl overflow-hidden border-4 border-slate-100 shadow-lg">
                                            <div className="h-[400px] relative">
                                                <MapContainer
                                                    center={[location.lat, location.lng]}
                                                    zoom={15}
                                                    style={{ height: '100%', width: '100%' }}
                                                    zoomControl={true}
                                                >
                                                    <TileLayer
                                                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                                    />
                                                    <Marker position={[location.lat, location.lng]}>
                                                        <Popup>
                                                            <div className="text-center">
                                                                <p className="font-semibold">{specialist.location}</p>
                                                                <p className="text-xs text-slate-600">{location.address}</p>
                                                            </div>
                                                        </Popup>
                                                    </Marker>
                                                </MapContainer>

                                                {/* Floating Address Card */}
                                                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl z-[1000]">
                                                    <p className="font-semibold text-slate-800">{specialist.location}</p>
                                                    <p className="text-sm text-slate-600 mt-1">{location.address}</p>
                                                    <div className="flex gap-2 mt-3">
                                                        <div className="px-3 py-1 bg-blue-50 rounded-lg text-xs text-blue-700 font-medium">
                                                            {specialist.availability}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-slate-100 p-6 bg-slate-50">
                                <div className="flex justify-between items-center">
                                    <div>
                                        {selectedDate && selectedTime && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="text-sm"
                                            >
                                                <p className="text-slate-600">Selected:</p>
                                                <p className="font-semibold text-slate-800">
                                                    {selectedDate.dayName}, {selectedDate.month} {selectedDate.dayNum} at {selectedTime.time}
                                                </p>
                                            </motion.div>
                                        )}
                                    </div>
                                    <Button
                                        onClick={handleConfirm}
                                        disabled={!selectedDate || !selectedTime}
                                        className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-8 py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Confirm Appointment
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="confirmed"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center justify-center p-12 min-h-[400px]"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                                className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center mb-6 shadow-2xl shadow-green-200"
                            >
                                <CheckCircle className="w-12 h-12 text-white" />
                            </motion.div>
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-3xl font-bold text-slate-800 mb-3"
                            >
                                Appointment Confirmed!
                            </motion.h3>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-slate-600 text-center max-w-md"
                            >
                                Your appointment with {specialist.title} has been booked for{' '}
                                {selectedDate?.dayName}, {selectedDate?.month} {selectedDate?.dayNum} at {selectedTime?.time}
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-sm text-slate-400 mt-4"
                            >
                                A confirmation email will be sent shortly
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
}
