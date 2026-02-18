// Local authentication - no Firebase needed
// All auth functions are now handled by services/auth.js

export const loginWithGoogle = () => {
    console.warn('Google login not available - using local authentication');
    alert('Please use email/password login');
};

export const loginWithFacebook = () => {
    console.warn('Facebook login not available - using local authentication');
    alert('Please use email/password login');
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
};
