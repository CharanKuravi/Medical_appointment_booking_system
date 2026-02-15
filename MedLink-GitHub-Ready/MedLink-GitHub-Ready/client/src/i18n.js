import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "welcome": "Welcome to MedLink",
            "slogan": "Your Trusted Healthcare Partner",
            "portal_patient": "Patient Portal",
            "portal_doctor": "Doctor Portal",
            "book_now": "Book Appointment",
            "view_history": "View History",
            "emergency_care": "Emergency Care",
            "departments": "Our Departments",
            "dept_cardio": "Cardiology",
            "dept_cardio_desc": "Heart health and cardiovascular treatments.",
            "dept_neuro": "Neurology",
            "dept_neuro_desc": "Brain and nervous system expert care.",
            "dept_ophthal": "Ophthalmology",
            "dept_ophthal_desc": "Advanced eye care and vision correction.",
            "dept_ortho": "Orthology",
            "dept_ortho_desc": "Bone, joint, and muscle specialists.",
            "dept_dental": "Dental",
            "dept_dental_desc": "Complete oral health and aesthetics.",
            "dept_derm": "Dermatology",
            "dept_derm_desc": "Skin, hair, and nail treatments.",
            "insurance": "Insurance Panel",
            "search_doctor": "Search for Doctors",
            "cpr_guide": "CPR Guide",
            "cpr_desc": "Push hard and fast in the center of the chest. Maintain a rate of 100-120 compressions per minute.",
            "snake_bite": "Snake/Scorpion Bite",
            "snake_desc": "Keep the area immobilized and below heart level. Seek urgent medical care immediately. Don't use a tourniquet.",
            "cuts_wounds": "Cuts & Wounds",
            "cuts_desc": "Apply pressure with a clean cloth. If bleeding continues for >15 mins, see a doctor.",
            "insurance_rec": "We recommend SecureHealth Plus for full coverage of urgent care and specialized treatments.",
            "medical_gear": "Medical Support Gear",
            "wheelchair": "Amazon Basic Wheelchair Stick",
            "neckband": "Advanced Neck Band",
            "login": "Login",
            "register": "Register",
            "logout": "Logout",
            "language": "Language"
        }
    },
    hi: {
        translation: {
            "welcome": "MedLink में आपका स्वागत है",
            "slogan": "आपका विश्वसनीय स्वास्थ्य सेवा भागीदार",
            "portal_patient": "रोगी पोर्टल",
            "portal_doctor": "डॉक्टर पोर्टल",
            "book_now": "अपॉइंटमेंट बुक करें",
            "view_history": "इतिहास देखें",
            "emergency_care": "आपातकालीन देखभाल",
            "departments": "हमारे विभाग",
            "dept_cardio": "हृदय रोग विज्ञान (Cardiology)",
            "dept_cardio_desc": "हृदय स्वास्थ्य और हृदय संबंधी उपचार।",
            "dept_neuro": "तंत्रिका विज्ञान (Neurology)",
            "dept_neuro_desc": "मस्तिष्क और तंत्रिका तंत्र की विशेषज्ञ देखभाल।",
            "dept_ophthal": "नेत्र विज्ञान (Ophthalmology)",
            "dept_ophthal_desc": "उन्नत नेत्र देखभाल और दृष्टि सुधार।",
            "dept_ortho": "अस्थि रोग विज्ञान (Orthology)",
            "dept_ortho_desc": "हड्डी, जोड़ और मांसपेशियों के विशेषज्ञ।",
            "dept_dental": "दंत चिकित्सा (Dental)",
            "dept_dental_desc": "पूर्ण मौखिक स्वास्थ्य और सौंदर्यशास्त्र।",
            "dept_derm": "त्वचा विज्ञान (Dermatology)",
            "dept_derm_desc": "त्वचा, बाल और नाखून का उपचार।",
            "insurance": "बीमा पैनल",
            "search_doctor": "डॉक्टर खोजें",
            "cpr_guide": "सीपीआर गाइड",
            "cpr_desc": "छाती के बीच में जोर से और तेजी से धक्का दें। प्रति मिनट 100-120 संकुचन की दर बनाए रखें।",
            "snake_bite": "साँप/बिच्छू का काटना",
            "snake_desc": "क्षेत्र को स्थिर रखें और हृदय के स्तर से नीचे रखें। तुरंत तत्काल चिकित्सा देखभाल लें।",
            "cuts_wounds": "कट और घाव",
            "cuts_desc": "साफ कपड़े से दबाव डालें। यदि रक्तस्राव 15 मिनट से अधिक समय तक जारी रहता है, तो डॉक्टर को दिखाएं।",
            "insurance_rec": "हम तत्काल देखभाल और विशेष उपचारों के पूर्ण कवरेज के लिए सिक्योरहेल्थ प्लस की सलाह देते हैं।",
            "medical_gear": "चिकित्सा सहायता गियर",
            "wheelchair": "अमेज़न बेसिक व्हीलचेयर स्टिक",
            "neckband": "उन्नत नेक बैंड",
            "login": "लॉगिन",
            "register": "पंजीकरण",
            "logout": "लॉगआउट",
            "language": "भाषा"
        }
    },
    te: {
        translation: {
            "welcome": "మెడ్‌లింక్‌కు స్వాగతం",
            "slogan": "మీ నమ్మకమైన ఆరోగ్య సంరక్షణ భాగస్వామి",
            "portal_patient": "రోగి పోర్టల్",
            "portal_doctor": "డాక్టర్ పోర్టల్",
            "book_now": "అపాయింట్‌మెంట్ బుక్ చేయండి",
            "view_history": "చరిత్రను చూడండి",
            "emergency_care": "అత్యవసర సంరక్షణ",
            "departments": "మా విభాగాలు",
            "dept_cardio": "కార్డియాలజీ",
            "dept_cardio_desc": "గుండె ఆరోగ్యం మరియు హృదయ సంబంధ చికిత్సలు.",
            "dept_neuro": "న్యూరాలజీ",
            "dept_neuro_desc": "మెదడు మరియు నాడీ వ్యవస్థ నిపుణుల సంరక్షణ.",
            "dept_ophthal": "ఆప్తాల్మాలజీ",
            "dept_ophthal_desc": "అధునాతన కంటి సంరక్షణ మరియు దృష్టి సవరణ.",
            "dept_ortho": "ఆర్థాలజీ",
            "dept_ortho_desc": "ఎముకలు, కీళ్ళు మరియు కండరాల నిపుణులు.",
            "dept_dental": "డెంటల్",
            "dept_dental_desc": "పూర్తి నోటి ఆరోగ్యం మరియు సౌందర్యశాస్త్రం.",
            "dept_derm": "డెర్మటాలజీ",
            "dept_derm_desc": "చర్మం, జుట్టు మరియు గోళ్ల చికిత్సలు.",
            "insurance": "భీమా ప్యానెల్",
            "search_doctor": "వైద్యులను వెతకండి",
            "cpr_guide": "CPR గైడ్",
            "cpr_desc": "ఛాతి మధ్యలో బలంగా మరియు వేగంగా నొక్కండి. నిమిషానికి 100-120 సార్లు నొక్కడం కొనసాగించండి.",
            "snake_bite": "పాము/తేలు కాటు",
            "snake_desc": "కాటు వేసిన చోట కదలకుండా ఉంచండి మరియు గుండె స్థాయి కంటే తక్కువగా ఉంచండి. వెంటనే వైద్య సహాయం తీసుకోండి.",
            "cuts_wounds": "గాయాలు మరియు కోతలు",
            "cuts_desc": "శుభ్రమైన గుడ్డతో ఒత్తిడి చేయండి. 15 నిమిషాల కంటే ఎక్కువ రక్తస్రావం జరిగితే డాక్టర్ ని సంప్రదించండి.",
            "insurance_rec": "అత్యవసర సంరక్షణ మరియు ప్రత్యేక చికిత్సల కోసం మేము సౌకర్యవంతమైన భీమా ప్యాకేజీలను సిఫార్సు చేస్తాము.",
            "medical_gear": "వైద్య సహాయక పరికరాలు",
            "wheelchair": "అమెజాన్ బేసిక్ వీల్‌చైర్ స్టిక్",
            "neckband": "అడ్వాన్స్డ్ నెక్ బ్యాండ్",
            "login": "లాగిన్",
            "register": "రిజిస్టర్",
            "logout": "లాగ్ అవుట్",
            "language": "భాష"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
