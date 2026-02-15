import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// LOGIN WITH GOOGLE
export function loginWithGoogle() {
    return signInWithPopup(auth, googleProvider)
        .then((result) => {
            console.log("Logged in:", result.user);
            alert("Login successful");
            return result.user;
        })
        .catch((error) => {
            console.error("Login error:", error.message);
            if (error.code === 'auth/popup-blocked') {
                alert("Popup blocked! Please allow popups for this site.");
            } else if (error.code === 'auth/configuration-not-found') {
                alert("Firebase error: Google provider not enabled in console.");
            } else {
                alert("Login failed: " + error.message);
            }
            throw error;
        });
}

// LOGIN WITH FACEBOOK
export function loginWithFacebook() {
    return signInWithPopup(auth, facebookProvider)
        .then((result) => {
            console.log("Logged in:", result.user);
            alert("Login successful");
            return result.user;
        })
        .catch((error) => {
            console.error("Login error:", error.message);
            alert("Login failed: " + error.message);
            throw error;
        });
}

// LOGOUT
export function logoutUser() {
    return signOut(auth)
        .then(() => {
            console.log("Logged out");
        })
        .catch((error) => {
            console.error(error.message);
        });
}

// CHECK LOGIN STATE (VERY IMPORTANT)
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User already logged in:", user.email);
    } else {
        console.log("No user logged in");
    }
});

// GLOBAL EXPORTS FOR DEBUGGING
if (typeof window !== 'undefined') {
    window.loginWithGoogle = loginWithGoogle;
    window.loginWithFacebook = loginWithFacebook;
    window.logoutUser = logoutUser;
}
