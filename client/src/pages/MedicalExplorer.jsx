import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, Sparkles, Users, ArrowLeft } from 'lucide-react';
import AlphabetPicker from '@/components/medical/AlphabetPicker';
import DiseaseCard from '@/components/medical/DiseaseCard';
import SpecialistCard from '@/components/medical/SpecialistCard';
import AppointmentBooking from '@/components/medical/AppointmentBooking';
import { diseasesData, specialistsInfo } from '@/components/medical/medicalData';

export default function MedicalExplorer() {
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [selectedDisease, setSelectedDisease] = useState(null);
    const [bookingSpecialist, setBookingSpecialist] = useState(null);

    const diseases = selectedLetter ? diseasesData[selectedLetter] || [] : [];

    const specialists = selectedDisease?.specialists?.map(name => ({
        title: name,
        specialty: specialistsInfo[name]?.expertise || 'Medical Specialist',
        expertise: specialistsInfo[name]?.expertise || 'Healthcare',
        availability: specialistsInfo[name]?.availability || 'Contact for availability',
        location: specialistsInfo[name]?.location || 'Medical Center',
        description: specialistsInfo[name]?.description || 'Qualified healthcare professional.'
    })) || [];

    const handleLetterSelect = (letter) => {
        setSelectedLetter(letter);
        setSelectedDisease(null);
    };

    const handleBack = () => {
        if (selectedDisease) {
            setSelectedDisease(null);
        } else {
            setSelectedLetter(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/20">
            {/* Hero Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 text-white">
                <div className="absolute inset-0 opacity-30 bg-white/5" />
                <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm font-medium">Medical Conditions Explorer</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">
                            Find Your Health Answers
                        </h1>
                        <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                            Browse medical conditions alphabetically and discover the right specialists for your healthcare needs
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
                {/* Alphabet Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 mb-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-800">Choose a Letter</h2>
                            <p className="text-slate-500 text-sm mt-1">Select to explore conditions starting with that letter</p>
                        </div>
                        {selectedLetter && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                onClick={handleBack}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </motion.button>
                        )}
                    </div>
                    <AlphabetPicker
                        selectedLetter={selectedLetter}
                        onSelectLetter={handleLetterSelect}
                    />
                </motion.div>

                {/* Content Grid */}
                <AnimatePresence mode="wait">
                    {selectedLetter && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        >
                            {/* Diseases List */}
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-100">
                                        <Heart className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-slate-800">
                                            Conditions Starting with "{selectedLetter}"
                                        </h2>
                                        <p className="text-slate-500 text-sm">
                                            {diseases.length} condition{diseases.length !== 1 ? 's' : ''} found
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                                    <AnimatePresence>
                                        {diseases.length > 0 ? (
                                            diseases.map((disease, index) => (
                                                <DiseaseCard
                                                    key={disease.name}
                                                    disease={disease}
                                                    isSelected={selectedDisease?.name === disease.name}
                                                    onClick={() => setSelectedDisease(disease)}
                                                />
                                            ))
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-center py-12"
                                            >
                                                <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                                <p className="text-slate-500">No conditions found for this letter</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Specialists Panel */}
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-100">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-slate-800">
                                            {selectedDisease ? 'Recommended Specialists' : 'Select a Condition'}
                                        </h2>
                                        <p className="text-slate-500 text-sm">
                                            {selectedDisease
                                                ? `For ${selectedDisease.name}`
                                                : 'Click on a condition to see specialists'}
                                        </p>
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {selectedDisease ? (
                                        <motion.div
                                            key={selectedDisease.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-4"
                                        >
                                            {/* Disease Info Card */}
                                            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-5 border border-blue-100/50 mb-6">
                                                <h3 className="font-semibold text-slate-800 mb-2">{selectedDisease.name}</h3>
                                                <p className="text-slate-600 text-sm">{selectedDisease.description}</p>
                                            </div>

                                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                                                {specialists.map((specialist, index) => (
                                                    <SpecialistCard
                                                        key={specialist.title}
                                                        specialist={specialist}
                                                        index={index}
                                                        onBookAppointment={setBookingSpecialist}
                                                    />
                                                ))}
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="empty"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center justify-center py-16 text-center"
                                        >
                                            <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-4">
                                                <Users className="w-10 h-10 text-slate-300" />
                                            </div>
                                            <p className="text-slate-500 max-w-xs">
                                                Select a medical condition from the list to view recommended specialists
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Empty State */}
                {!selectedLetter && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-16"
                    >
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center mx-auto mb-6">
                            <Search className="w-12 h-12 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">
                            Start Exploring
                        </h3>
                        <p className="text-slate-500 max-w-md mx-auto">
                            Choose a letter from the alphabet above to discover medical conditions and find the right specialists for your healthcare needs
                        </p>
                    </motion.div>
                )}
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-slate-100 mt-12">
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <p className="text-center text-slate-400 text-sm">
                        This information is for educational purposes only. Always consult with a healthcare professional for medical advice.
                    </p>
                </div>
            </div>

            {/* Appointment Booking Modal */}
            <AnimatePresence>
                {bookingSpecialist && (
                    <AppointmentBooking
                        specialist={bookingSpecialist}
                        onClose={() => setBookingSpecialist(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
