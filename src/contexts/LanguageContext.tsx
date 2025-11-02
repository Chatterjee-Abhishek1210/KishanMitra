import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi' | 'bn' | 'te' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: 'Home',
    aboutUs: 'About Us',
    schemes: 'Schemes',
    sectors: 'Sectors',
    beneficiary: 'Beneficiary Corner',
    media: 'Media Corner',
    investment: 'Investment Opportunities',
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    logout: 'Logout',
    
    // Hero
    heroTitle: 'KisanMitra',
    heroSubtitle: 'AI-Powered Agricultural Assistant',
    heroDescription: 'Empowering farmers with AI-driven crop recommendations, disease detection, market insights, and government scheme guidance.',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    
    // Stats
    totalMinistries: 'Total Ministries',
    totalSchemes: 'Total Schemes',
    financialInstitutions: 'Financial Institutions',
    totalProjects: 'Total Projects',
    totalCost: 'Total Projects Cost (₹ Cr.)',
    viewMore: 'View More',
    
    // Schemes
    topSchemes: 'Top Schemes',
    agriSchemes: 'Agriculture Schemes',
    schemesDescription: 'Indian Government announces Welfare Schemes for farmers from time to time. These schemes could be either Central, State specific or a joint collaboration.',
    
    // Features
    cropRecommendation: 'Crop Recommendation',
    cropRecommendationDesc: 'Get AI-powered suggestions for optimal crops based on soil and climate',
    diseaseDetection: 'Disease Detection',
    diseaseDetectionDesc: 'Identify plant diseases instantly using image recognition',
    cropDiseaseDetection: 'Crop Disease Detection',
    cropDiseaseDetectionDesc: 'Upload a crop image to detect diseases using AI',
    marketPrices: 'Market Prices',
    marketPricesDesc: 'Real-time market price predictions and trends',
    govSchemes: 'Government Schemes',
    govSchemesDesc: 'Personalized government scheme recommendations',
    fertilizerRecommendation: 'Fertilizer Recommendation',
    fertilizerRecommendationDesc: 'Optimize your fertilizer usage with AI-powered suggestions',
    weatherForecast: 'Weather Forecast',
    weatherForecastDesc: 'Get accurate weather predictions for better farm planning',
    chatbot: 'AI Chatbot Assistant',
    chatbotDesc: 'Ask me anything about farming in your language',
    
    // Soil Analysis
    soilAnalysis: 'Soil Analysis',
    soilAnalysisDesc: 'Upload soil image or enter parameters manually',
    soilCropInfo: 'Soil & Crop Information',
    soilCropInfoDesc: 'Upload soil image or enter parameters manually',
    uploadCropImage: 'Upload Crop Image',
    uploadCropImageDesc: 'Take a clear photo of the affected plant part',
    todayMandiRates: "Today's Mandi Rates",
    todayMandiRatesDesc: 'Live prices from nearest markets',
    
    // Auth
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    signInWithGoogle: 'Sign in with Google',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    createAccount: 'Create Account',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    
    // Footer
    contactUs: 'Contact Us',
    address: 'Address',
    footerEmail: 'Email',
    footerPhone: 'Phone',
    followUs: 'Follow Us',
    quickLinks: 'Quick Links',
    
    // Dashboard
    welcomeBack: 'Welcome Back',
    myDashboard: 'My Dashboard',
    cropAdvisory: 'Crop Advisory',
    myFarm: 'My Farm',
    recommendations: 'Recommendations',
    alerts: 'Alerts',
  },
  hi: {
    // Navigation
    home: 'होम',
    aboutUs: 'हमारे बारे में',
    schemes: 'योजनाएं',
    sectors: 'क्षेत्र',
    beneficiary: 'लाभार्थी कॉर्नर',
    media: 'मीडिया कॉर्नर',
    investment: 'निवेश के अवसर',
    login: 'लॉगिन',
    register: 'रजिस्टर',
    dashboard: 'डैशबोर्ड',
    logout: 'लॉगआउट',
    
    // Hero
    heroTitle: 'एआई-किसान',
    heroSubtitle: 'बुद्धिमान कृषि मंच',
    heroDescription: 'एआई-संचालित फसल सिफारिशों, रोग पहचान, बाजार अंतर्दृष्टि और सरकारी योजना मार्गदर्शन के साथ किसानों को सशक्त बनाना।',
    getStarted: 'शुरू करें',
    learnMore: 'और जानें',
    
    // Stats
    totalMinistries: 'कुल मंत्रालय',
    totalSchemes: 'कुल योजनाएं',
    financialInstitutions: 'वित्तीय संस्थान',
    totalProjects: 'कुल परियोजनाएं',
    totalCost: 'कुल परियोजना लागत (₹ करोड़)',
    viewMore: 'और देखें',
    
    // Schemes
    topSchemes: 'शीर्ष योजनाएं',
    agriSchemes: 'कृषि योजनाएं',
    schemesDescription: 'भारत सरकार समय-समय पर किसानों के लिए कल्याणकारी योजनाओं की घोषणा करती है। ये योजनाएं केंद्रीय, राज्य विशिष्ट या संयुक्त सहयोग हो सकती हैं।',
    
    // Features
    cropRecommendation: 'फसल सिफारिश',
    cropRecommendationDesc: 'मिट्टी और जलवायु के आधार पर इष्टतम फसलों के लिए एआई-संचालित सुझाव प्राप्त करें',
    diseaseDetection: 'रोग पहचान',
    diseaseDetectionDesc: 'छवि पहचान का उपयोग करके तुरंत पौधों की बीमारियों की पहचान करें',
    marketPrices: 'बाजार मूल्य',
    marketPricesDesc: 'वास्तविक समय बाजार मूल्य पूर्वानुमान और रुझान',
    govSchemes: 'सरकारी योजनाएं',
    govSchemesDesc: 'व्यक्तिगत सरकारी योजना सिफारिशें',
    
    // Auth
    signIn: 'साइन इन करें',
    signUp: 'साइन अप करें',
    email: 'ईमेल',
    password: 'पासवर्ड',
    forgotPassword: 'पासवर्ड भूल गए?',
    signInWithGoogle: 'Google से साइन इन करें',
    dontHaveAccount: 'खाता नहीं है?',
    alreadyHaveAccount: 'पहले से खाता है?',
    createAccount: 'खाता बनाएं',
    fullName: 'पूरा नाम',
    phoneNumber: 'फोन नंबर',
    
    // Footer
    contactUs: 'संपर्क करें',
    address: 'पता',
    footerEmail: 'ईमेल',
    footerPhone: 'फोन',
    followUs: 'फॉलो करें',
    quickLinks: 'त्वरित लिंक',
    
    // Dashboard
    welcomeBack: 'वापसी पर स्वागत है',
    myDashboard: 'मेरा डैशबोर्ड',
    cropAdvisory: 'फसल सलाह',
    myFarm: 'मेरा खेत',
    recommendations: 'सिफारिशें',
    alerts: 'अलर्ट',
  },
  bn: {
    // Navigation
    home: 'হোম',
    aboutUs: 'আমাদের সম্পর্কে',
    schemes: 'প্রকল্প',
    sectors: 'সেক্টর',
    beneficiary: 'সুবিধাভোগী কর্নার',
    media: 'মিডিয়া কর্নার',
    investment: 'বিনিয়োগের সুযোগ',
    login: 'লগইন',
    register: 'নিবন্ধন',
    dashboard: 'ড্যাশবোর্ড',
    logout: 'লগআউট',
    
    // Hero
    heroTitle: 'এআই-কিষাণ',
    heroSubtitle: 'বুদ্ধিমান কৃষি প্ল্যাটফর্ম',
    heroDescription: 'এআই-চালিত ফসল সুপারিশ, রোগ সনাক্তকরণ, বাজার অন্তর্দৃষ্টি এবং সরকারি প্রকল্প নির্দেশিকা দিয়ে কৃষকদের ক্ষমতায়ন।',
    getStarted: 'শুরু করুন',
    learnMore: 'আরও জানুন',
    
    // Stats
    totalMinistries: 'মোট মন্ত্রণালয়',
    totalSchemes: 'মোট প্রকল্প',
    financialInstitutions: 'আর্থিক প্রতিষ্ঠান',
    totalProjects: 'মোট প্রকল্প',
    totalCost: 'মোট প্রকল্প খরচ (₹ কোটি)',
    viewMore: 'আরও দেখুন',
    
    // Schemes
    topSchemes: 'শীর্ষ প্রকল্প',
    agriSchemes: 'কৃষি প্রকল্প',
    schemesDescription: 'ভারত সরকার সময়ে সময়ে কৃষকদের জন্য কল্যাণমূলক প্রকল্প ঘোষণা করে। এই প্রকল্পগুলি কেন্দ্রীয়, রাজ্য নির্দিষ্ট বা যৌথ সহযোগিতা হতে পারে।',
    
    // Features
    cropRecommendation: 'ফসল সুপারিশ',
    cropRecommendationDesc: 'মাটি এবং জলবায়ুর উপর ভিত্তি করে সর্বোত্তম ফসলের জন্য এআই-চালিত পরামর্শ পান',
    diseaseDetection: 'রোগ সনাক্তকরণ',
    diseaseDetectionDesc: 'ছবি স্বীকৃতি ব্যবহার করে তাৎক্ষণিকভাবে উদ্ভিদ রোগ চিহ্নিত করুন',
    marketPrices: 'বাজার মূল্য',
    marketPricesDesc: 'রিয়েল-টাইম বাজার মূল্য পূর্বাভাস এবং প্রবণতা',
    govSchemes: 'সরকারি প্রকল্প',
    govSchemesDesc: 'ব্যক্তিগত সরকারি প্রকল্প সুপারিশ',
    
    // Auth
    signIn: 'সাইন ইন',
    signUp: 'সাইন আপ',
    email: 'ইমেল',
    password: 'পাসওয়ার্ড',
    forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
    signInWithGoogle: 'Google দিয়ে সাইন ইন করুন',
    dontHaveAccount: 'অ্যাকাউন্ট নেই?',
    alreadyHaveAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    createAccount: 'অ্যাকাউন্ট তৈরি করুন',
    fullName: 'পুরো নাম',
    phoneNumber: 'ফোন নম্বর',
    
    // Footer
    contactUs: 'যোগাযোগ করুন',
    address: 'ঠিকানা',
    footerEmail: 'ইমেল',
    footerPhone: 'ফোন',
    followUs: 'ফলো করুন',
    quickLinks: 'দ্রুত লিঙ্ক',
    
    // Dashboard
    welcomeBack: 'স্বাগতম',
    myDashboard: 'আমার ড্যাশবোর্ড',
    cropAdvisory: 'ফসল পরামর্শ',
    myFarm: 'আমার খামার',
    recommendations: 'সুপারিশ',
    alerts: 'সতর্কতা',
  },
  te: {
    // Navigation
    home: 'హోమ్',
    aboutUs: 'మా గురించి',
    schemes: 'పథకాలు',
    sectors: 'రంగాలు',
    beneficiary: 'లబ్ధిదారుల మూల',
    media: 'మీడియా మూల',
    investment: 'పెట్టుబడి అవకాశాలు',
    login: 'లాగిన్',
    register: 'నమోదు',
    dashboard: 'డాష్‌బోర్డ్',
    logout: 'లాగౌట్',
    
    // Hero
    heroTitle: 'ఏఐ-కిసాన్',
    heroSubtitle: 'తెలివైన వ్యవసాయ వేదిక',
    heroDescription: 'ఏఐ-ఆధారిత పంట సిఫార్సులు, వ్యాధి గుర్తింపు, మార్కెట్ అంతర్దృష్టులు మరియు ప్రభుత్వ పథక మార్గదర్శకత్వంతో రైతులకు శక్తినిచ్చడం.',
    getStarted: 'ప్రారంభించండి',
    learnMore: 'మరింత తెలుసుకోండి',
    
    // Stats
    totalMinistries: 'మొత్తం మంత్రిత్వ శాఖలు',
    totalSchemes: 'మొత్తం పథకాలు',
    financialInstitutions: 'ఆర్థిక సంస్థలు',
    totalProjects: 'మొత్తం ప్రాజెక్టులు',
    totalCost: 'మొత్తం ప్రాజెక్ట్ ఖర్చు (₹ కోట్లు)',
    viewMore: 'మరిన్ని చూడండి',
    
    // Schemes
    topSchemes: 'ముఖ్య పథకాలు',
    agriSchemes: 'వ్యవసాయ పథకాలు',
    schemesDescription: 'భారత ప్రభుత్వం ఎప్పటికప్పుడు రైతుల కోసం సంక్షేమ పథకాలను ప్రకటిస్తుంది. ఈ పథకాలు కేంద్ర, రాష్ట్ర నిర్దిష్ట లేదా ఉమ్మడి సహకారం కావచ్చు.',
    
    // Features
    cropRecommendation: 'పంట సిఫార్సు',
    cropRecommendationDesc: 'నేల మరియు వాతావరణం ఆధారంగా సరైన పంటల కోసం ఏఐ-ఆధారిత సూచనలు పొందండి',
    diseaseDetection: 'వ్యాధి గుర్తింపు',
    diseaseDetectionDesc: 'చిత్ర గుర్తింపును ఉపయోగించి తక్షణమే మొక్క వ్యాధులను గుర్తించండి',
    marketPrices: 'మార్కెట్ ధరలు',
    marketPricesDesc: 'నిజ-సమయ మార్కెట్ ధర అంచనాలు మరియు ధోరణులు',
    govSchemes: 'ప్రభుత్వ పథకాలు',
    govSchemesDesc: 'వ్యక్తిగత ప్రభుత్వ పథక సిఫార్సులు',
    
    // Auth
    signIn: 'సైన్ ఇన్',
    signUp: 'సైన్ అప్',
    email: 'ఇమెయిల్',
    password: 'పాస్‌వర్డ్',
    forgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
    signInWithGoogle: 'Google తో సైన్ ఇన్ చేయండి',
    dontHaveAccount: 'ఖాతా లేదా?',
    alreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    createAccount: 'ఖాతా సృష్టించండి',
    fullName: 'పూర్తి పేరు',
    phoneNumber: 'ఫోన్ నంబర్',
    
    // Footer
    contactUs: 'మమ్మల్ని సంప్రదించండి',
    address: 'చిరునామా',
    footerEmail: 'ఇమెయిల్',
    footerPhone: 'ఫోన్',
    followUs: 'ఫాలో అవ్వండి',
    quickLinks: 'త్వరిత లింకులు',
    
    // Dashboard
    welcomeBack: 'తిరిగి స్వాగతం',
    myDashboard: 'నా డాష్‌బోర్డ్',
    cropAdvisory: 'పంట సలహా',
    myFarm: 'నా వ్యవసాయం',
    recommendations: 'సిఫార్సులు',
    alerts: 'హెచ్చరికలు',
  },
  ta: {
    // Navigation
    home: 'முகப்பு',
    aboutUs: 'எங்களை பற்றி',
    schemes: 'திட்டங்கள்',
    sectors: 'துறைகள்',
    beneficiary: 'பயனாளர் மூலை',
    media: 'ஊடக மூலை',
    investment: 'முதலீட்டு வாய்ப்புகள்',
    login: 'உள்நுழை',
    register: 'பதிவு',
    dashboard: 'டாஷ்போர்டு',
    logout: 'வெளியேறு',
    
    // Hero
    heroTitle: 'ஏஐ-கிசான்',
    heroSubtitle: 'புத்திசாலித்தனமான வேளாண் தளம்',
    heroDescription: 'ஏஐ-இயக்கப்படும் பயிர் பரிந்துரைகள், நோய் கண்டறிதல், சந்தை நுண்ணறிவுகள் மற்றும் அரசு திட்ட வழிகாட்டுதலுடன் விவசாயிகளுக்கு அதிகாரம் அளித்தல்.',
    getStarted: 'தொடங்குங்கள்',
    learnMore: 'மேலும் அறிக',
    
    // Stats
    totalMinistries: 'மொத்த அமைச்சகங்கள்',
    totalSchemes: 'மொத்த திட்டங்கள்',
    financialInstitutions: 'நிதி நிறுவனங்கள்',
    totalProjects: 'மொத்த திட்டங்கள்',
    totalCost: 'மொத்த திட்ட செலவு (₹ கோடி)',
    viewMore: 'மேலும் பார்க்க',
    
    // Schemes
    topSchemes: 'முதன்மை திட்டங்கள்',
    agriSchemes: 'வேளாண் திட்டங்கள்',
    schemesDescription: 'இந்திய அரசு அவ்வப்போது விவசாயிகளுக்கான நலத் திட்டங்களை அறிவிக்கிறது. இந்த திட்டங்கள் மத்திய, மாநில குறிப்பிட்ட அல்லது கூட்டு ஒத்துழைப்பாக இருக்கலாம்.',
    
    // Features
    cropRecommendation: 'பயிர் பரிந்துரை',
    cropRecommendationDesc: 'மண் மற்றும் காலநிலை அடிப்படையில் சிறந்த பயிர்களுக்கான ஏஐ-இயக்கப்படும் பரிந்துரைகளைப் பெறுங்கள்',
    diseaseDetection: 'நோய் கண்டறிதல்',
    diseaseDetectionDesc: 'பட அங்கீகாரத்தைப் பயன்படுத்தி உடனடியாக தாவர நோய்களை அடையாளம் காணுங்கள்',
    marketPrices: 'சந்தை விலைகள்',
    marketPricesDesc: 'நிகழ்நேர சந்தை விலை கணிப்புகள் மற்றும் போக்குகள்',
    govSchemes: 'அரசு திட்டங்கள்',
    govSchemesDesc: 'தனிப்பயனாக்கப்பட்ட அரசு திட்ட பரிந்துரைகள்',
    
    // Auth
    signIn: 'உள்நுழை',
    signUp: 'பதிவு செய்',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    forgotPassword: 'கடவுச்சொல்லை மறந்துவிட்டீர்களா?',
    signInWithGoogle: 'Google உடன் உள்நுழைக',
    dontHaveAccount: 'கணக்கு இல்லையா?',
    alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
    createAccount: 'கணக்கை உருவாக்கு',
    fullName: 'முழு பெயர்',
    phoneNumber: 'தொலைபேசி எண்',
    
    // Footer
    contactUs: 'எங்களை தொடர்பு கொள்ளுங்கள்',
    address: 'முகவரி',
    footerEmail: 'மின்னஞ்சல்',
    footerPhone: 'தொலைபேசி',
    followUs: 'எங்களை பின்தொடருங்கள்',
    quickLinks: 'விரைவு இணைப்புகள்',
    
    // Dashboard
    welcomeBack: 'மீண்டும் வரவேற்கிறோம்',
    myDashboard: 'எனது டாஷ்போர்டு',
    cropAdvisory: 'பயிர் ஆலோசனை',
    myFarm: 'எனது பண்ணை',
    recommendations: 'பரிந்துரைகள்',
    alerts: 'எச்சரிக்கைகள்',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('language');
    return (stored as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};