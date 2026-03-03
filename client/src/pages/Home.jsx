import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Heart, Activity, Eye, Bone, Scissors, Sparkles, AlertCircle, ShoppingCart, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AppointmentBooking from '../components/medical/AppointmentBooking';

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
        <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-green-100/50 via-white to-emerald-100/30 py-20 px-6 overflow-hidden relative">
                {/* Animated Heartbeat Grid Background */}
                <div className="absolute inset-0 opacity-50 pointer-events-none">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <defs>
                            {/* Darker Green Grid Pattern */}
                            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(22, 163, 74, 0.6)" strokeWidth="1"/>
                            </pattern>
                        </defs>
                        
                        {/* Grid Background */}
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        
                        {/* Continuous Realistic ECG Heartbeat Pattern */}
                        <g>
                            {/* First continuous line with varied spike heights */}
                            <path d="M-500,250 Q-450,250 -400,250 L-380,250 L-370,243 L-360,257 L-350,250 Q-340,250 -330,250 L-310,250 L-300,170 L-290,330 L-280,250 Q-270,250 -200,250 Q-150,250 -100,250 L-80,250 L-70,240 L-60,260 L-50,250 Q-40,250 -30,250 L-10,250 L0,200 L10,300 L20,250 Q30,250 100,250 Q150,250 200,250 L220,250 L230,246 L240,254 L250,250 Q260,250 270,250 L290,250 L300,160 L310,340 L320,250 Q330,250 400,250 Q450,250 500,250 L520,250 L530,242 L540,258 L550,250 Q560,250 570,250 L590,250 L600,190 L610,310 L620,250 Q630,250 700,250 Q750,250 800,250 L820,250 L830,244 L840,256 L850,250 Q860,250 870,250 L890,250 L900,175 L910,325 L920,250 Q930,250 1000,250 Q1050,250 1100,250 L1120,250 L1130,241 L1140,259 L1150,250 Q1160,250 1170,250 L1190,250 L1200,185 L1210,315 L1220,250 Q1230,250 1300,250 Q1350,250 1400,250 L1420,250 L1430,247 L1440,253 L1450,250 Q1460,250 1470,250 L1490,250 L1500,165 L1510,335 L1520,250 Q1530,250 1600,250 Q1650,250 1700,250 L1720,250 L1730,245 L1740,255 L1750,250 Q1760,250 1770,250 L1790,250 L1800,195 L1810,305 L1820,250 Q1830,250 1900,250 Q1950,250 2000,250" 
                                  fill="none" 
                                  stroke="rgba(4, 120, 87, 1)" 
                                  strokeWidth="3.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round">
                                <animateTransform
                                    attributeName="transform"
                                    type="translate"
                                    from="0 0"
                                    to="600 0"
                                    dur="4s"
                                    repeatCount="indefinite"/>
                            </path>
                            
                            {/* Second continuous line for seamless loop with varied spike heights */}
                            <path d="M-500,250 Q-450,250 -400,250 L-380,250 L-370,243 L-360,257 L-350,250 Q-340,250 -330,250 L-310,250 L-300,170 L-290,330 L-280,250 Q-270,250 -200,250 Q-150,250 -100,250 L-80,250 L-70,240 L-60,260 L-50,250 Q-40,250 -30,250 L-10,250 L0,200 L10,300 L20,250 Q30,250 100,250 Q150,250 200,250 L220,250 L230,246 L240,254 L250,250 Q260,250 270,250 L290,250 L300,160 L310,340 L320,250 Q330,250 400,250 Q450,250 500,250 L520,250 L530,242 L540,258 L550,250 Q560,250 570,250 L590,250 L600,190 L610,310 L620,250 Q630,250 700,250 Q750,250 800,250 L820,250 L830,244 L840,256 L850,250 Q860,250 870,250 L890,250 L900,175 L910,325 L920,250 Q930,250 1000,250 Q1050,250 1100,250 L1120,250 L1130,241 L1140,259 L1150,250 Q1160,250 1170,250 L1190,250 L1200,185 L1210,315 L1220,250 Q1230,250 1300,250 Q1350,250 1400,250 L1420,250 L1430,247 L1440,253 L1450,250 Q1460,250 1470,250 L1490,250 L1500,165 L1510,335 L1520,250 Q1530,250 1600,250 Q1650,250 1700,250 L1720,250 L1730,245 L1740,255 L1750,250 Q1760,250 1770,250 L1790,250 L1800,195 L1810,305 L1820,250 Q1830,250 1900,250 Q1950,250 2000,250" 
                                  fill="none" 
                                  stroke="rgba(4, 120, 87, 1)" 
                                  strokeWidth="3.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round">
                                <animateTransform
                                    attributeName="transform"
                                    type="translate"
                                    from="-600 0"
                                    to="0 0"
                                    dur="4s"
                                    repeatCount="indefinite"/>
                            </path>
                        </g>
                    </svg>
                </div>
                
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-300/20 to-emerald-300/20 rounded-full blur-3xl -z-0"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-green-300/20 to-teal-300/20 rounded-full blur-3xl -z-0"></div>
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight mb-6">
                            {t('welcome')} <span className="italic">Better.</span>
                        </h1>
                        <p className="text-xl text-slate-700 mb-8 max-w-lg leading-relaxed">
                            {t('slogan')}. Manage your health appointments and discover medical resources in one place.
                        </p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/doctors')}
                                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-green-500/30 hover:shadow-2xl hover:scale-105 transition-all"
                            >
                                {t('book_now')}
                            </button>
                            <button
                                onClick={() => navigate('/departments')}
                                className="bg-white/80 backdrop-blur-sm border-2 border-green-200 text-green-700 px-8 py-4 rounded-2xl font-bold hover:bg-green-50 transition-all"
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
                            <div className="w-80 h-80 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rounded-full blur-3xl absolute -top-10 -left-10 animate-pulse"></div>
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
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">{t('departments')}</h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {departments.map((dept, idx) => (
                        <div
                            key={idx}
                            onClick={() => handleBookDepartment(dept)}
                            className="premium-card p-8 flex flex-col items-center text-center group cursor-pointer hover:border-green-300 transition-all hover:-translate-y-2 hover:shadow-green-200/50"
                        >
                            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {dept.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">{dept.title}</h3>
                            <p className="text-slate-600 mb-6">{dept.desc}</p>
                            <div className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-bold text-sm">
                                Book Now <ArrowRight size={16} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Emergency Resources */}
            <section id="emergency" className="py-24 px-6 bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900 text-white rounded-[3rem] mx-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center gap-3 mb-12">
                        <AlertCircle className="text-green-400" size={32} />
                        <h2 className="text-4xl font-bold">{t('emergency_care')}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {emergencyResources.map((res, idx) => (
                            <div key={idx} className="bg-white/10 border border-white/20 p-8 rounded-3xl backdrop-blur-md hover:bg-white/15 transition-all">
                                <span className="text-green-400 text-sm font-bold uppercase tracking-widest block mb-4">{res.emergency}</span>
                                <h3 className="text-2xl font-bold mb-4">{res.title}</h3>
                                <p className="text-green-100 leading-relaxed mb-6 h-24">{res.content}</p>
                                <button className="text-emerald-300 font-bold hover:text-emerald-200 flex items-center gap-2 transition-colors">
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
                    <div 
                        onClick={() => navigate('/insurance')}
                        className="bg-gradient-to-br from-[#F9F9C1] via-[#FEFEA9] to-[#FEFEA9] p-12 rounded-[2rem] border border-[#ECDFC0] shadow-xl backdrop-blur-sm cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all group"
                    >
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform">
                            <ShieldCheck className="text-[#ECDFC0]" />
                        </div>
                        <h2 className="text-3xl font-bold text-[#7A7A7A] mb-6">{t('insurance')}</h2>
                        <p className="text-slate-700 mb-8 leading-relaxed">
                            {t('insurance_rec')}
                        </p>
                        <div className="space-y-4">
                            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl flex justify-between items-center border border-[#FEFEA9]/50">
                                <span className="font-medium text-slate-700">Contact Panel:</span>
                                <span className="text-[#7A7A7A] font-bold text-lg">+1 (800) MED-LINK</span>
                            </div>
                            <button className="w-full bg-gradient-to-r from-[#FEFEA9] to-[#ECDFC0] text-[#7A7A7A] py-3 rounded-xl font-bold hover:from-[#FEFEA9] hover:to-[#F9F9C1] transition-all shadow-lg flex items-center justify-center gap-2">
                                View Insurance Plans
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="bg-white/90 backdrop-blur-sm p-12 rounded-[2rem] border border-green-100 shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/40 to-emerald-200/40 rounded-full -mr-16 -mt-16"></div>
                        <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-8 relative z-10">
                            <ShoppingCart className="text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent mb-6">{t('medical_gear')}</h2>
                        <p className="text-slate-600 mb-8">Get basic support equipment directly from our trusted partners.</p>
                        <ul className="space-y-6">
                            <li className="flex items-center gap-4 group cursor-pointer hover:translate-x-2 transition-transform">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg shrink-0 flex items-center justify-center text-green-600">🦽</div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{t('wheelchair')}</h4>
                                    <p className="text-sm text-slate-500">Ergonomic support for mobility.</p>
                                </div>
                            </li>
                            <li className="flex items-center gap-4 group cursor-pointer hover:translate-x-2 transition-transform">
                                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg shrink-0 flex items-center justify-center text-emerald-600">🩹</div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{t('neckband')}</h4>
                                    <p className="text-sm text-slate-500">Pain relief for neck and back strain.</p>
                                </div>
                            </li>
                        </ul>
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
