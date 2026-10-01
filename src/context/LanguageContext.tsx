import React, { createContext, useContext, useState } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    appTitle: 'CareFlow AI',
    appTagline: 'From Patient Information to Coordinated Care',
    dashboard: 'Dashboard',
    timeline: 'Patient Timeline',
    documents: 'Documents',
    tasks: 'Care Tasks',
    appointments: 'Appointments',
    insights: 'AI Insights & Evidence',
    doctorBrief: 'Doctor Brief',
    settings: 'Settings',
    humanInTheLoop: 'Human-in-the-loop enabled',
    humanTooltip: 'CareFlow AI provides administrative suggestions only. Clinical actions require human confirmation.',
    greeting: 'Good morning, Dr. Mehta',
    greetingSubtitle: "Here's what needs attention today.",
    activePatients: 'Active Patients',
    pendingTasks: 'Pending Care Tasks',
    upcomingAppointments: 'Upcoming Appointments',
    documentsAwaiting: 'Documents Awaiting Review',
    careJourneyOverview: 'CARE JOURNEY OVERVIEW',
    aiDetectedItems: 'AI DETECTED ITEMS',
    verifiedFacts: 'Verified Facts',
    needsConfirmation: 'Needs Confirmation',
    referencedMissing: 'Referenced Documents Missing',
    uploadTitle: 'Upload Patient Documents',
    uploadSubtitle: 'Supported formats: PDF, JPG, PNG (HIPAA & Encrypted)',
    uploadBtn: 'Upload Document',
    scanBtn: 'Scan Document',
    dragDropText: 'Drag and drop medical records here, or browse files',
    tellCareflow: 'Tell CareFlow',
    voicePrompt: 'Click to dictate patient notes or administrative instructions',
    runCareflowPipeline: 'Run CareFlow Multi-Agent Pipeline',
    comparePrevious: 'Compare with Previous Visit',
    filterBy: 'Filter by',
    searchPlaceholder: 'Search patients, records, care tasks...',
    showEvidence: 'Show Evidence',
    sourceDocument: 'Source Document',
    confirm: 'Confirm',
    edit: 'Edit',
    reject: 'Reject',
    exportPdf: 'Export PDF',
    shareTeam: 'Share with Care Team',
    doctorBriefDisclaimer: 'AI-generated administrative summary. Verify information before clinical use.',
  },
  hi: {
    appTitle: 'केयरफ्लो एआई (CareFlow AI)',
    appTagline: 'रोगी जानकारी से समन्वित देखभाल तक',
    dashboard: 'डैशबोर्ड',
    timeline: 'रोगी समयरेखा (टाइमलाइन)',
    documents: 'दस्तावेज़',
    tasks: 'लंबित कार्य',
    appointments: 'नियुक्तियाँ (Appointments)',
    insights: 'एआई अंतर्दृष्टि व साक्ष्य',
    doctorBrief: 'डॉक्टर सारांश (Brief)',
    settings: 'सेटिंग्स',
    humanInTheLoop: 'मानवीय निगरानी सक्रिय (Human-in-the-loop)',
    humanTooltip: 'केयरफ्लो एआई केवल प्रशासनिक समन्वय सुझाव देता है। नैदानिक निर्णयों हेतु मानव अनुमोदन आवश्यक है।',
    greeting: 'शुभ प्रभात, डॉ. मेहता',
    greetingSubtitle: 'आज जिन विषयों पर ध्यान देने की आवश्यकता है:',
    activePatients: 'सक्रिय मरीज़',
    pendingTasks: 'लंबित कार्य',
    upcomingAppointments: 'आगामी नियुक्तियाँ',
    documentsAwaiting: 'समीक्षा हेतु प्रतीक्षारत दस्तावेज़',
    careJourneyOverview: 'देखभाल यात्रा अवलोकन',
    aiDetectedItems: 'एआई द्वारा पहचाने गए विवरण',
    verifiedFacts: 'सत्यापित तथ्य',
    needsConfirmation: 'पुष्टि की आवश्यकता',
    referencedMissing: 'संदर्भित अनुपलब्ध दस्तावेज़',
    uploadTitle: 'मरीज़ के दस्तावेज़ अपलोड करें',
    uploadSubtitle: 'समर्थित प्रारूप: PDF, JPG, PNG (सुरक्षित एवं एन्क्रिप्टेड)',
    uploadBtn: 'दस्तावेज़ जोड़ें',
    scanBtn: 'स्कैन दस्तावेज़',
    dragDropText: 'यहाँ मेडिकल रिकॉर्ड खींचें और छोड़ें, या फ़ाइलें चुनें',
    tellCareflow: 'केयरफ्लो से बोलें (Voice)',
    voicePrompt: 'प्रशासनिक निर्देश या फॉलो-अप नोट बोलकर दर्ज करें',
    runCareflowPipeline: 'केयरफ्लो मल्टी-एजेंट प्रक्रिया प्रारंभ करें',
    comparePrevious: 'पिछली विज़िट से तुलना करें',
    filterBy: 'फ़िल्टर करें',
    searchPlaceholder: 'मरीज़, रिकॉर्ड, कार्य खोजें...',
    showEvidence: 'साक्ष्य देखें (Evidence)',
    sourceDocument: 'मूल दस्तावेज़',
    confirm: 'पुष्टि करें',
    edit: 'संशोधन करें',
    reject: 'अस्वीकार करें',
    exportPdf: 'पीडीएफ निर्यात करें',
    shareTeam: 'केयर टीम को साझा करें',
    doctorBriefDisclaimer: 'एआई-जनरेटेड प्रशासनिक सारांश। नैदानिक उपयोग से पूर्व जानकारी अवश्य सत्यापित करें।',
  },
  mr: {
    appTitle: 'केअरफ्लो एआय (CareFlow AI)',
    appTagline: 'रुग्ण माहितीपासून ते समन्वित उपचारांपर्यंत',
    dashboard: 'डॅशबोर्ड',
    timeline: 'रुग्ण प्रवास (टाइमलाइन)',
    documents: 'कागदपत्रे (Documents)',
    tasks: 'प्रलंबित कार्य',
    appointments: 'भेटीच्या वेळा (Appointments)',
    insights: 'एआय विश्लेषण व पुरावे',
    doctorBrief: 'डॉक्टर संक्षिप्त अहवाल',
    settings: 'सेटिंग्ज',
    humanInTheLoop: 'मानवी नियंत्रण सक्रिय (Human-in-the-loop)',
    humanTooltip: 'केअरफ्लो एआय केवळ प्रशासकीय समन्वयासाठी आहे. वैद्यकीय कृतींसाठी मानवी संमती आवश्यक आहे.',
    greeting: 'शुभ प्रभात, डॉ. मेहता',
    greetingSubtitle: 'आज ज्या बाबींवर लक्ष देणे आवश्यक आहे:',
    activePatients: 'सक्रिय रुग्ण',
    pendingTasks: 'प्रलंबित कार्य',
    upcomingAppointments: 'आगामी भेटी',
    documentsAwaiting: 'तपासणीसाठी प्रलंबित कागदपत्रे',
    careJourneyOverview: 'रुग्ण सेवा प्रवास आढावा',
    aiDetectedItems: 'एआय द्वारे शोधलेल्या नोंदी',
    verifiedFacts: 'प्रमाणित तथ्ये',
    needsConfirmation: 'पुष्टीकरणाची गरज',
    referencedMissing: 'संदर्भित गहाळ कागदपत्रे',
    uploadTitle: 'रुग्णांची कागदपत्रे अपलोड करा',
    uploadSubtitle: 'समर्थित प्रकार: PDF, JPG, PNG (सुरक्षित डेटा)',
    uploadBtn: 'कागदपत्र अपलोड करा',
    scanBtn: 'स्कॅन करा',
    dragDropText: 'वैद्यकीय फाइल्स येथे ड्रॅग करा किंवा निवडा',
    tellCareflow: 'केअरफ्लोशी बोला (Voice)',
    voicePrompt: 'प्रशासकीय सूचना बोलून नोंदवण्यासाठी क्लिक करा',
    runCareflowPipeline: 'मल्टी-एजंट कार्यप्रणाली चालवा',
    comparePrevious: 'मागील भेटीशी तुलना करा',
    filterBy: 'वर्गीकरण करा',
    searchPlaceholder: 'रुग्ण, नोंदी, कार्य शोधा...',
    showEvidence: 'पुरावा पहा (Evidence)',
    sourceDocument: 'मूळ दस्तऐवज',
    confirm: 'मंजूर करा',
    edit: 'बदला',
    reject: 'नाकारा',
    exportPdf: 'पीडीएफ सेव्ह करा',
    shareTeam: 'सहकाऱ्यांशी शेअर करा',
    doctorBriefDisclaimer: 'एआय-निर्मित प्रशासकीय सारांश. वैद्यकीय वापरापूर्वी पडताळणी आवश्यक आहे.',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
