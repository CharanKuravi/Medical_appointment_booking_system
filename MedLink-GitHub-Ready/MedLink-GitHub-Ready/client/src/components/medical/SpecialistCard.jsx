import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, Clock, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SpecialistCard({ specialist, index, onBookAppointment }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-lg hover:border-teal-100 transition-all duration-300 group"
        >
            <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-100 group-hover:scale-105 transition-transform">
                    <User className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">
                        {specialist.title}
                    </h4>
                    <p className="text-teal-600 text-sm font-medium">
                        {specialist.specialty}
                    </p>
                </div>
            </div>

            <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>{specialist.expertise}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>{specialist.availability}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span>{specialist.location}</span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-50">
                <p className="text-xs text-slate-400 mb-3">
                    {specialist.description}
                </p>
                <Button
                    onClick={() => onBookAppointment(specialist)}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white"
                >
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Appointment
                </Button>
            </div>
        </motion.div>
    );
}
