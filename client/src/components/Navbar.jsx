import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { Globe, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const changeLanguage = (e) => {
        i18n.changeLanguage(e.target.value).then(() => {
            window.location.reload();
        });
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 py-4 px-6 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-xl">⚕️</span>
                    </div>
                    MedLink
                </Link>

                <div className="hidden md:flex items-center gap-8 text-slate-700 font-medium">
                    <Link to="/" className="hover:text-purple-600 transition-colors">Home</Link>
                    <Link to="/doctors" className="hover:text-purple-600 transition-colors">Find Doctors</Link>
                    <Link to="/departments" className="hover:text-purple-600 transition-colors">{t('departments')}</Link>
                    <Link to="/medical-explorer" className="hover:text-purple-600 transition-colors">Medical Explorer</Link>
                    <Link to="/emergency" className="hover:text-purple-600 transition-colors flex items-center gap-1">
                        <span className="animate-pulse">🚨</span> Emergency
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {user && (
                        <Link 
                            to="/appointments" 
                            className="relative bg-gradient-to-br from-blue-500 to-purple-600 text-white px-5 py-2.5 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            Appointments
                            <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
                        </Link>
                    )}
                    
                    <div className="flex items-center gap-2 bg-gradient-to-r from-purple-50 to-teal-50 border border-purple-200 rounded-full px-3 py-1 text-sm">
                        <Globe size={16} className="text-purple-500" />
                        <select
                            onChange={changeLanguage}
                            defaultValue={i18n.language}
                            className="bg-transparent focus:outline-none cursor-pointer text-slate-700"
                        >
                            <option value="en">English</option>
                            <option value="hi">हिंदी (Hindi)</option>
                            <option value="te">తెలుగు (Telugu)</option>
                        </select>
                    </div>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-blue-50 px-3 py-1.5 rounded-2xl border border-purple-200">
                                {user.photoURL ? (
                                    <img src={user.photoURL} className="w-6 h-6 rounded-lg object-cover" alt="Profile" />
                                ) : (
                                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-[10px]">
                                        {user.displayName?.charAt(0) || 'U'}
                                    </div>
                                )}
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-900 leading-none truncate max-w-[80px]">
                                        {user.displayName || 'User'}
                                    </span>
                                    <span className="text-[8px] font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-wider">
                                        {user.role}
                                    </span>
                                </div>
                            </div>
                            <Link to={user.role === 'patient' ? '/patient-dashboard' : '/doctor-dashboard'} className="flex items-center gap-2 text-purple-600 font-medium hover:scale-105 transition-transform">
                                <UserIcon size={18} />
                                Portal
                            </Link>
                            <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95">
                                Login to Portal
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
