import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Heart, Activity, Eye, Bone, Scissors, Sparkles, AlertCircle, ShoppingCart, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AppointmentBooking from '../components/medical/AppointmentBooking';
import SpeechAssistWidget from '../components/SpeechAssistWidget';

const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    // storing full specialist object instead of just department string
    const [bookingSpecialist, setBookingSpecialist] = useState(null);

    const departments = [
        { title: t('dept_cardio'), desc: t('dept_cardio_desc'), icon: <Heart className="text-rose-500" />, type: "Cardiology" },
        { title: t('dept_neuro'), desc: t('dept_neuro_desc'), icon: <Activity className="text-blue-500" />, type: "Neurology" },
        { title: t('dept_ophthal'), desc: t('dept_ophthal_desc'), icon: <Eye className="text-emerald-500" />, type: "Ophthalmology" },
        { title: t('dept_ortho'), desc: t('dept_ortho_desc'), icon: <Bone className="text-orange-500" />, type: "Orthopedics" },
        { title: t('dept_dental'), desc: t('dept_dental_desc'), icon: <Scissors className="text-sky-500" />, type: "Dental" },
        { title: t('dept_derm'), desc: t('dept_derm_desc'), icon: <Sparkles className="text-purple-500" />, type: "Dermatology" },
    ];

    const emergencyResources = [
        {
            title: t('cpr_guide'),
            content: t('cpr_desc'),
            emergency: "Cardiology"
        },
        {
            title: t('snake_bite'),
            content: t('snake_desc'),
            emergency: "Toxicology"
        },
        {
            title: t('cuts_wounds'),
            content: t('cuts_desc'),
            emergency: "Urgent Care"
        }
    ];

    const handleBookDepartment = (dept) => {
        // Create a generic specialist object for the department
        setBookingSpecialist({
            title: `${dept.title} Specialist`,
            specialty: dept.type || dept.title,
            expertise: dept.type || dept.title,
            location: `${dept.type || dept.title} Center`,
            description: `Specialist in ${dept.desc}`,
            availability: "Available Today"
        });
    };

    return (
        <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-purple-100/50 via-white to-teal-100/30 py-20 px-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-teal-300/20 rounded-full blur-3xl -z-0"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-pink-300/20 rounded-full blur-3xl -z-0"></div>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 bg-clip-text text-transparent leading-tight mb-6">
                            {t('welcome')} <span className="italic">Better.</span>
                        </h1>
                        <p className="text-xl text-slate-700 mb-8 max-w-lg leading-relaxed">
                            {t('slogan')}. Manage your health appointments and discover medical resources in one place.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/doctors')}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-purple-500/30 hover:shadow-2xl hover:scale-105 transition-all"
                            >
                                {t('book_now')}
                            </button>
                            <button
                                onClick={() => navigate('/departments')}
                                className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 text-purple-700 px-8 py-4 rounded-2xl font-bold hover:bg-purple-50 transition-all"
                            >
                                View Departments
                            </button>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex justify-center"
                    >
                        <div className="relative">
                            <div className="w-80 h-80 bg-gradient-to-br from-purple-400/30 to-teal-400/30 rounded-full blur-3xl absolute -top-10 -left-10 animate-pulse"></div>
                            <img
                                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=1000"
                                alt="Healthcare Professional"
                                className="w-full max-w-md rounded-3xl shadow-2xl relative z-10 border-4 border-white/50"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Departments Section */}
            <section id="departments" className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent mb-4">{t('departments')}</h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-teal-500 mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {departments.map((dept, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleBookDepartment(dept)}
                            className="premium-card p-8 flex flex-col items-center text-center group cursor-pointer hover:border-purple-300 transition-all hover:-translate-y-2 hover:shadow-purple-200/50"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-teal-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {dept.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{dept.title}</h3>
                            <p className="text-slate-600 mb-6">{dept.desc}</p>
                            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold text-sm">
                                Book Now <ArrowRight size={16} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Emergency Resources */}
            <section id="emergency" className="py-24 px-6 bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 text-white rounded-[3rem] mx-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center gap-3 mb-12">
                        <AlertCircle className="text-pink-400" size={32} />
                        <h2 className="text-4xl font-bold">{t('emergency_care')}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {emergencyResources.map((res, idx) => (
                            <div key={idx} className="bg-white/10 border border-white/20 p-8 rounded-3xl backdrop-blur-md hover:bg-white/15 transition-all">
                                <span className="text-pink-400 text-sm font-bold uppercase tracking-widest block mb-4">{res.emergency}</span>
                                <h3 className="text-2xl font-bold mb-4">{res.title}</h3>
                                <p className="text-purple-100 leading-relaxed mb-6 h-24">{res.content}</p>
                                <button className="text-teal-300 font-bold hover:text-teal-200 flex items-center gap-2 transition-colors">
                                    Call Ambulance
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Resources & Products */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Insurance */}
                    <div className="bg-gradient-to-br from-purple-100/80 via-blue-100/60 to-teal-100/80 p-12 rounded-[2rem] border border-white shadow-xl backdrop-blur-sm">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                            <ShieldCheck className="text-purple-600" />
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent mb-6">{t('insurance')}</h2>
                        <p className="text-slate-700 mb-8 leading-relaxed">
                            {t('insurance_rec')}
                        </p>
                        <div className="space-y-4">
                            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl flex justify-between items-center border border-purple-200/50">
                                <span className="font-medium text-slate-700">Contact Panel:</span>
                                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold text-lg">+1 (800) MED-LINK</span>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="bg-white/90 backdrop-blur-sm p-12 rounded-[2rem] border border-purple-100 shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/40 to-teal-200/40 rounded-full -mr-16 -mt-16"></div>
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-teal-100 rounded-2xl flex items-center justify-center mb-8 relative z-10">
                            <ShoppingCart className="text-teal-600" />
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-700 to-blue-700 bg-clip-text text-transparent mb-6">{t('medical_gear')}</h2>
                        <p className="text-slate-600 mb-8">Get basic support equipment directly from our trusted partners.</p>
                        <ul className="space-y-6">
                            <li className="flex items-center gap-4 group cursor-pointer hover:translate-x-2 transition-transform">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg shrink-0 flex items-center justify-center text-purple-600">🦽</div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{t('wheelchair')}</h4>
                                    <p className="text-sm text-slate-500">Ergonomic support for mobility.</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-4 group cursor-pointer hover:translate-x-2 transition-transform">
                                <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-blue-100 rounded-lg shrink-0 flex items-center justify-center text-teal-600">🩹</div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{t('neckband')}</h4>
                                    <p className="text-sm text-slate-500">Pain relief for neck and back strain.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-6 bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 text-white rounded-[3rem] mx-6 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center gap-3 mb-12">
                        <MessageSquare className="text-pink-400" size={32} />
                        <h2 className="text-4xl font-bold">Accessibility Features</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Speech Assist Feature */}
                        <div className="bg-white/10 border border-white/20 p-8 rounded-3xl backdrop-blur-md hover:bg-white/15 transition-all">
                            <span className="text-pink-400 text-sm font-bold uppercase tracking-widest block mb-4">COMMUNICATION</span>
                            <h3 className="text-2xl font-bold mb-4">🎙️ Speech ↔ Text Assist</h3>
                            <p className="text-purple-100 leading-relaxed mb-6">
                                Real-time communication tool for speech-impaired users. Convert speech to text subtitles and type messages that play as audio.
                            </p>
                            <SpeechAssistWidget />
                        </div>

                        {/* Placeholder for future features */}
                        <div className="bg-white/10 border border-white/20 p-8 rounded-3xl backdrop-blur-md hover:bg-white/15 transition-all">
                            <span className="text-teal-400 text-sm font-bold uppercase tracking-widest block mb-4">COMING SOON</span>
                            <h3 className="text-2xl font-bold mb-4">More Features</h3>
                            <p className="text-purple-100 leading-relaxed mb-6">
                                Additional accessibility and communication features will be added here to enhance your healthcare experience.
                            </p>
                            <button className="text-teal-300 font-bold hover:text-teal-200 flex items-center gap-2 transition-colors">
                                Stay Tuned
                            </button>
                        </div>
                    </div>
                </div>
            </section>

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
};

export default Home;
