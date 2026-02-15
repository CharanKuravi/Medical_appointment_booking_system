import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Brain, Eye, Bone, Scissors, Sparkles, Baby, Stethoscope } from 'lucide-react';

const Departments = () => {
    const navigate = useNavigate();

    const departments = [
        { name: 'Cardiology', icon: <Heart size={40} />, color: 'from-rose-500 to-pink-500', specialty: 'Cardiology', description: 'Heart and cardiovascular care' },
        { name: 'Neurology', icon: <Brain size={40} />, color: 'from-blue-500 to-indigo-500', specialty: 'Neurology', description: 'Brain and nervous system' },
        { name: 'Ophthalmology', icon: <Eye size={40} />, color: 'from-emerald-500 to-teal-500', specialty: 'Ophthalmology', description: 'Eye care and vision' },
        { name: 'Orthopedics', icon: <Bone size={40} />, color: 'from-orange-500 to-amber-500', specialty: 'Orthopedics', description: 'Bones, joints, and muscles' },
        { name: 'Dental', icon: <Scissors size={40} />, color: 'from-sky-500 to-cyan-500', specialty: 'Dental', description: 'Oral health and dentistry' },
        { name: 'Dermatology', icon: <Sparkles size={40} />, color: 'from-purple-500 to-violet-500', specialty: 'Dermatology', description: 'Skin, hair, and nails' },
        { name: 'Pediatrics', icon: <Baby size={40} />, color: 'from-pink-500 to-rose-500', specialty: 'Pediatrics', description: 'Child healthcare' },
        { name: 'General Medicine', icon: <Stethoscope size={40} />, color: 'from-slate-500 to-gray-500', specialty: 'General', description: 'General health consultation' },
    ];

    const handleDepartmentClick = (specialty) => {
        navigate(`/doctors?specialty=${specialty}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent mb-4">
                        Medical Departments
                    </h1>
                    <p className="text-slate-600 text-lg">Choose a department to find specialized doctors</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {departments.map((dept, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleDepartmentClick(dept.specialty)}
                            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-purple-100 hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer group"
                        >
                            <div className={`w-20 h-20 bg-gradient-to-br ${dept.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform mx-auto`}>
                                {dept.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 text-center mb-2">{dept.name}</h3>
                            <p className="text-slate-600 text-sm text-center">{dept.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Departments;
