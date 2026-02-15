import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Calendar } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import AppointmentBooking from '../components/medical/AppointmentBooking';

const FindDoctors = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    
    const [filters, setFilters] = useState({
        specialty: searchParams.get('specialty') || '',
        city: searchParams.get('city') || '',
        search: ''
    });

    const specialties = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'Ophthalmology', 'Dental', 'General'];
    const cities = ['Hyderabad', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata'];

    useEffect(() => {
        fetchDoctors();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, doctors]);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/doctors');
            setDoctors(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = doctors;

        if (filters.specialty) {
            filtered = filtered.filter(doc => doc.specialization?.toLowerCase().includes(filters.specialty.toLowerCase()));
        }
        if (filters.city) {
            filtered = filtered.filter(doc => doc.location?.toLowerCase().includes(filters.city.toLowerCase()));
        }
        if (filters.search) {
            filtered = filtered.filter(doc => 
                doc.userId?.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
                doc.specialization?.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        setFilteredDoctors(filtered);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent mb-8">Find Doctors</h1>

                {/* Filters */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-purple-100">
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search doctors..."
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <select
                            value={filters.specialty}
                            onChange={(e) => handleFilterChange('specialty', e.target.value)}
                            className="px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">All Specialties</option>
                            {specialties.map(spec => <option key={spec} value={spec}>{spec}</option>)}
                        </select>
                        <select
                            value={filters.city}
                            onChange={(e) => handleFilterChange('city', e.target.value)}
                            className="px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">All Cities</option>
                            {cities.map(city => <option key={city} value={city}>{city}</option>)}
                        </select>
                        <button
                            onClick={() => setFilters({ specialty: '', city: '', search: '' })}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold hover:scale-105 transition-transform"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>

                {/* Results */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredDoctors.map(doctor => (
                            <div key={doctor._id} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                        {doctor.userId?.name?.charAt(0) || 'D'}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-slate-800">{doctor.userId?.name || 'Doctor'}</h3>
                                        <p className="text-purple-600 font-medium">{doctor.specialization}</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{doctor.bio || 'Experienced medical professional'}</p>
                                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                                    <MapPin size={16} />
                                    <span>{doctor.location || 'Location not specified'}</span>
                                </div>
                                <button
                                    onClick={() => setSelectedDoctor({
                                        title: doctor.userId?.name || 'Doctor',
                                        specialty: doctor.specialization,
                                        location: doctor.location,
                                        expertise: doctor.specialization,
                                        description: doctor.bio,
                                        availability: 'Available',
                                        doctorId: doctor._id
                                    })}
                                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                                >
                                    Book Appointment
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filteredDoctors.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-600 text-lg">No doctors found matching your criteria</p>
                    </div>
                )}
            </div>

            {selectedDoctor && (
                <AppointmentBooking
                    specialist={selectedDoctor}
                    onClose={() => setSelectedDoctor(null)}
                />
            )}
        </div>
    );
};

export default FindDoctors;
