import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginService, register as registerService } from '../services/auth';
import { motion } from 'framer-motion';

const Login = () => {
    const { login: setAuthUser } = useAuth();
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'patient'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            let response;
            if (isRegister) {
                response = await registerService(formData);
            } else {
                response = await loginService({
                    email: formData.email,
                    password: formData.password
                });
            }
            
            setAuthUser(response.user);
            navigate(response.user.role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard');
        } catch (err) {
            setError(err.error || err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="flex-grow flex items-center justify-center p-6 bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 min-h-[80vh]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-100"
            >
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        {isRegister ? 'Create Account' : 'Welcome Back'}
                    </h2>
                    <p className="text-slate-500 font-medium">
                        {isRegister ? 'Sign up to get started' : 'Sign in to your account'}
                    </p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-sm font-bold flex items-center gap-3"
                    >
                        <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shrink-0" />
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isRegister && (
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {isRegister && (
                        <>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Phone (Optional)</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                    placeholder="+1234567890"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">I am a</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                >
                                    <option value="patient">Patient</option>
                                    <option value="doctor">Doctor</option>
                                </select>
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50"
                    >
                        {loading ? (isRegister ? 'Creating Account...' : 'Signing In...') : (isRegister ? 'Sign Up' : 'Sign In')}
                    </button>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => {
                                setIsRegister(!isRegister);
                                setError(null);
                            }}
                            className="text-slate-600 text-sm hover:text-purple-600 font-medium"
                        >
                            {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
