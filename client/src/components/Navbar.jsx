import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { Globe, LogOut, User as UserIcon, ChevronDown, Video, MessageCircle } from 'lucide-react';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [servicesOpen, setServicesOpen] = useState(false);

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value).then(() => {
            window.location.reload();
        });
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleLiveAssistant = () => {
        setServicesOpen(false);
        navigate('/live-assistant');
    };

    const handleChatBot = () => {
        setServicesOpen(false);
        navigate('/chatbot');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-green-100 py-4 px-6 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Left Section - Logo */}
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                        {/* Simple Doctor Outline */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            {/* Head */}
                            <circle cx="12" cy="7" r="3" />
                            {/* Body */}
                            <path d="M12 10 L12 18" />
                            {/* Arms */}
                            <path d="M8 13 L12 11 L16 13" />
                            {/* Medical Cross on chest */}
                            <path d="M12 13 L12 15" strokeWidth="1.5" />
                            <path d="M11 14 L13 14" strokeWidth="1.5" />
                        </svg>
                    </div>
                    MedLink
                </Link>

                {/* Center Section - Main Navigation Links */}
                <div className="hidden md:flex items-center gap-6 text-slate-700 font-medium">
                    <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
                    <Link to="/medical-explorer" className="hover:text-green-600 transition-colors">Medical Explorer</Link>
                    <Link to="/appointments" className="hover:text-green-600 transition-colors">Appointments</Link>
                    <Link to="/emergency" className="hover:text-green-600 transition-colors flex items-center gap-1">
                        <span className="animate-pulse">🚨</span> Emergency
                    </Link>
                    
                    {/* Services Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setServicesOpen(!servicesOpen)}
                            onMouseEnter={() => setServicesOpen(true)}
                            className="hover:text-green-600 transition-colors flex items-center gap-1"
                        >
                            Services
                            <ChevronDown size={16} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {servicesOpen && (
                            <div 
                                className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-green-100 py-2 z-50"
                                onMouseLeave={() => setServicesOpen(false)}
                            >
                                <div className="px-3 py-2">
                                    <p className="text-xs font-bold text-green-600 uppercase tracking-wider">Medical Services</p>
                                </div>
                                <Link 
                                    to="/doctors" 
                                    className="block px-4 py-3 hover:bg-green-50 transition-colors text-slate-700 hover:text-green-600"
                                    onClick={() => setServicesOpen(false)}
                                >
                                    Find Doctors
                                </Link>
                                <Link 
                                    to="/departments" 
                                    className="block px-4 py-3 hover:bg-green-50 transition-colors text-slate-700 hover:text-green-600"
                                    onClick={() => setServicesOpen(false)}
                                >
                                    {t('departments')}
                                </Link>
                                
                                <div className="border-t border-green-100 my-2"></div>
                                
                                <div className="px-3 py-2">
                                    <p className="text-xs font-bold text-green-600 uppercase tracking-wider">Our Features</p>
                                </div>
                                <button
                                    onClick={handleLiveAssistant}
                                    className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors text-slate-700 hover:text-green-600 flex items-center gap-2"
                                >
                                    <Video size={16} className="text-green-500" />
                                    <span>Live Assistant</span>
                                </button>
                                <button
                                    onClick={handleChatBot}
                                    className="w-full text-left px-4 py-3 hover:bg-green-50 transition-colors text-slate-700 hover:text-green-600 flex items-center gap-2"
                                >
                                    <MessageCircle size={16} className="text-green-500" />
                                    <span>AI ChatBot</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Section - User Actions */}
                <div className="flex items-center gap-3">
                    {/* Language Selector */}
                    <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full px-3 py-1.5 text-sm">
                        <Globe size={16} className="text-green-500" aria-hidden="true" />
                        <select
                            onChange={changeLanguage}
                            defaultValue={i18n.language}
                            className="bg-transparent focus:outline-none cursor-pointer text-slate-700"
                            aria-label="Select language"
                        >
                            <option value="en">English</option>
                            <option value="hi">हिंदी</option>
                            <option value="te">తెలుగు</option>
                        </select>
                    </div>

                    {/* User Profile Section */}
                    {user ? (
                        <div className="flex items-center gap-3">
                            {/* User Info Badge */}
                            <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1.5 rounded-2xl border border-green-200">
                                {user.photoURL ? (
                                    <img src={user.photoURL} className="w-6 h-6 rounded-lg object-cover" alt={`${user.displayName || 'User'} profile`} />
                                ) : (
                                    <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-[10px]" aria-hidden="true">
                                        {(user.name || user.displayName || 'U').charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-900 leading-none truncate max-w-[80px]">
                                        {user.name || user.displayName || 'User'}
                                    </span>
                                    <span className="text-[8px] font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent uppercase tracking-wider">
                                        {user.role || 'patient'}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Portal Link */}
                            <Link 
                                to={user.role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard'} 
                                className="hidden md:flex items-center gap-2 text-green-600 font-medium hover:scale-105 transition-transform"
                                aria-label="Go to dashboard"
                            >
                                <UserIcon size={18} aria-hidden="true" />
                                <span>Portal</span>
                            </Link>
                            
                            {/* Logout Button */}
                            <button 
                                onClick={handleLogout} 
                                className="hidden md:block p-2 text-slate-400 hover:text-rose-500 transition-colors"
                                aria-label="Logout"
                            >
                                <LogOut size={18} aria-hidden="true" />
                            </button>
                        </div>
                    ) : (
                        <Link 
                            to="/login" 
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-green-500/30 hover:scale-105 active:scale-95"
                        >
                            Login to Portal
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
