import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Clock, Ambulance, AlertCircle, Navigation } from 'lucide-react';

const Emergency = () => {
    const [nearbyHospitals, setNearbyHospitals] = useState([
        { id: 1, name: 'City General Hospital', distance: '2.3 km', phone: '+91-40-2345-6789', available: true, address: 'Banjara Hills, Hyderabad' },
        { id: 2, name: 'Apollo Emergency Center', distance: '3.1 km', phone: '+91-40-2345-6790', available: true, address: 'Jubilee Hills, Hyderabad' },
        { id: 3, name: 'Care Hospital Emergency', distance: '4.5 km', phone: '+91-40-2345-6791', available: false, address: 'Gachibowli, Hyderabad' },
        { id: 4, name: 'Yashoda Hospital', distance: '5.2 km', phone: '+91-40-2345-6792', available: true, address: 'Somajiguda, Hyderabad' },
    ]);

    const emergencyContacts = [
        { service: 'Ambulance', number: '108', icon: <Ambulance size={32} />, color: 'from-red-500 to-rose-500' },
        { service: 'Police', number: '100', icon: <AlertCircle size={32} />, color: 'from-blue-500 to-indigo-500' },
        { service: 'Fire', number: '101', icon: <AlertCircle size={32} />, color: 'from-orange-500 to-red-500' },
        { service: 'Women Helpline', number: '1091', icon: <Phone size={32} />, color: 'from-purple-500 to-pink-500' },
    ];

    const handleCallAmbulance = (phone) => {
        if (confirm(`Call ${phone}?`)) {
            window.location.href = `tel:${phone}`;
        }
    };

    const handleEmergencyCall = (number) => {
        if (confirm(`Call emergency number ${number}?`)) {
            window.location.href = `tel:${number}`;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Alert Banner */}
                <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl p-6 mb-8 shadow-2xl">
                    <div className="flex items-center gap-4">
                        <AlertCircle size={48} className="animate-pulse" />
                        <div>
                            <h1 className="text-3xl font-bold mb-2">24/7 Emergency Services</h1>
                            <p className="text-red-100">Immediate medical assistance available round the clock</p>
                        </div>
                    </div>
                </div>

                {/* Emergency Contacts */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Emergency Hotlines</h2>
                    <div className="grid md:grid-cols-4 gap-4">
                        {emergencyContacts.map((contact, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleEmergencyCall(contact.number)}
                                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-red-200 hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer group"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-full flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                                    {contact.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 text-center mb-2">{contact.service}</h3>
                                <p className="text-3xl font-bold text-center bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                                    {contact.number}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nearby Hospitals */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-800">Nearby Hospitals</h2>
                        <button className="flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700">
                            <Navigation size={20} />
                            Use My Location
                        </button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {nearbyHospitals.map(hospital => (
                            <div key={hospital.id} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-1">{hospital.name}</h3>
                                        <div className="flex items-center gap-2 text-slate-600 text-sm mb-2">
                                            <MapPin size={16} />
                                            <span>{hospital.address}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-600 text-sm">
                                            <Navigation size={16} />
                                            <span>{hospital.distance} away</span>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        hospital.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}>
                                        {hospital.available ? 'Available' : 'Busy'}
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleCallAmbulance(hospital.phone)}
                                        className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2"
                                    >
                                        <Phone size={18} />
                                        Call Now
                                    </button>
                                    <button className="px-6 bg-white border-2 border-purple-200 text-purple-600 py-3 rounded-xl font-bold hover:bg-purple-50 transition-all">
                                        Directions
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* First Aid Tips */}
                <div className="mt-12 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Quick First Aid Tips</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-4 bg-red-50 rounded-xl">
                            <h4 className="font-bold text-red-700 mb-2">🩸 Heavy Bleeding</h4>
                            <p className="text-sm text-slate-600">Apply direct pressure with clean cloth. Elevate the wound above heart level.</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-xl">
                            <h4 className="font-bold text-orange-700 mb-2">🔥 Burns</h4>
                            <p className="text-sm text-slate-600">Cool the burn with running water for 10-20 minutes. Do not apply ice directly.</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-xl">
                            <h4 className="font-bold text-blue-700 mb-2">💔 Heart Attack</h4>
                            <p className="text-sm text-slate-600">Call 108 immediately. Have person sit down and stay calm. Give aspirin if available.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Emergency;
