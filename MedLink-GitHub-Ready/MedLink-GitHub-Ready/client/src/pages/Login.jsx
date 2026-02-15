import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const { loginWithGoogle, loginWithFacebook } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = React.useState(null);

    const handleAuth = async (provider) => {
        setError(null);
        try {
            if (provider === 'google') await loginWithGoogle();
            else await loginWithFacebook();
            navigate('/patient-dashboard');
        } catch (err) {
            // Error alert is handled inside auth.js, we just stop navigation
            console.log("Auth failed, error alert shown by utility");
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center p-6 bg-slate-50 min-h-[80vh]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-100"
            >
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-black text-slate-900 mb-2">Welcome</h2>
                    <p className="text-slate-500 font-medium">Log in to your healthcare portal</p>
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

                <div className="space-y-4">
                    <button
                        onClick={() => handleAuth('google')}
                        className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 py-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-primary/20 transition-all group"
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
                        Continue with Google
                    </button>

                    <button
                        onClick={() => handleAuth('facebook')}
                        className="w-full flex items-center justify-center gap-3 bg-[#1877F2] py-4 rounded-2xl font-bold text-white hover:bg-[#166fe5] shadow-lg shadow-blue-500/20 transition-all"
                    >
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Continue with Facebook
                    </button>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-50 text-center">
                    <p className="text-slate-400 text-sm">
                        Securely authenticated via Firebase
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
