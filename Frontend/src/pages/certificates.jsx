import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  FileSignature,
  Award,
  ShieldCheck,
  Building,
  Fingerprint,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  MessageCircle,
  Landmark,
  Scale,
  Briefcase,
  Layers,
  Sparkles,
  Stamp,
  Phone,
  Globe,
  CreditCard,
  Shield,
  ArrowUpRight,
  Rocket,
  Eye,
  Clock,
  Building2,
  X
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import expertImage from "../assets/image11.png";
import Footer from '../components/footer';
import emailjs from '@emailjs/browser';

// ==========================================
// 1. DATA ARRAYS
// ==========================================
const registrations = [
  {
    icon: Fingerprint,
    badge: "MANDATORY FOR FILING",
    title: "Digital Signature (DSC)",
    desc: "Class 3 DSC with secure USB token, legally mandated for MCA filings, GST, and Income Tax returns.",
    price: "₹1,799",
    color: "blue",
    img: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80&auto=format&fit=crop"
  },
  {
    icon: Building,
    badge: "GOVT BENEFITS",
    title: "MSME / Udyam Registration",
    desc: "Unlock collateral-free loans, tender eligibility, and significant government subsidies for your enterprise.",
    price: "₹499",
    color: "indigo",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80&auto=format&fit=crop"
  },
  {
    icon: Landmark,
    badge: "FOOD COMPLIANCE",
    title: "FSSAI Registration",
    desc: "Mandatory safety licensing for restaurants, cloud kitchens, FMCG manufacturers, and food distributors.",
    price: "₹1,000",
    color: "orange",
    img: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80&auto=format&fit=crop"
  },
  {
    icon: Globe,
    badge: "GLOBAL TRADE",
    title: "Import Export Code (IEC)",
    desc: "DGFT-issued Import Export Code required for businesses engaged in international trade and cross-border transactions.",
    price: "₹999",
    color: "teal",
    img: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=600&q=80&auto=format&fit=crop"
  },
  {
    icon: CreditCard,
    badge: "ESSENTIAL ID",
    title: "PAN Card Application",
    desc: "New PAN application or correction service for individuals, proprietors, and businesses with fast processing.",
    price: "₹399",
    color: "green",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80&auto=format&fit=crop"
  },
  {
    icon: Stamp,
    badge: "BRAND PROTECTION",
    title: "Trademark Registration",
    desc: "Legally secure your brand name, logo, or slogan from intellectual property theft and competitors.",
    price: "₹1,499",
    color: "violet",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80&auto=format&fit=crop"
  }
];

const benefits = [
  { icon: Scale, title: "Legal Validity", desc: "Ensure your operations are backed by official, verifiable government documentation." },
  { icon: Briefcase, title: "Tender Eligibility", desc: "Unlock massive B2B and government contracts that strictly require MSME or ISO compliance." },
  { icon: ShieldCheck, title: "Brand Authority", desc: "Displaying official certificates dramatically increases trust among consumers and investors." },
  { icon: FileCheck, title: "Regulatory Defense", desc: "Shield your business from hefty compliance penalties and operational shutdowns." }
];

const processSteps = [
  { id: "01", title: "Document Submission", desc: "Share basic KYC and business details securely via our encrypted portal or WhatsApp. Our team reviews everything instantly." },
  { id: "02", title: "Application Processing", desc: "We handle all complex drafting, form submissions, and direct liaisons with government departments on your behalf." },
  { id: "03", title: "Certificate Issuance", desc: "Your official certificate is issued digitally, and physical copies (like USB tokens) are dispatched directly to your address." }
];

const faqs = [
  { q: "What documents do I need for a Class 3 DSC?", a: "You'll need a PAN card, Aadhaar card, a passport-sized photo, and a short video verification. The entire process is paperless and completed online." },
  { q: "How long does MSME/Udyam registration take?", a: "Once all accurate documents are submitted, MSME certificates are typically generated and issued within 1-2 working days." },
  { q: "Is Trademark registration permanent?", a: "A trademark is valid for 10 years from the date of application. It can be renewed indefinitely for subsequent 10-year periods." },
  { q: "Do I need FSSAI if I only sell packaged food?", a: "Yes. Any entity involved in the manufacturing, processing, storage, distribution, or sale of food products requires an active FSSAI license/registration." }
];

const startupBenefits = [
  { title: "80IAC Tax Exemption", desc: "Enjoy a tax holiday for 3 consecutive years out of 10." },
  { title: "Angel Tax Exemption", desc: "Issue shares at a premium without hefty tax hurdles." },
  { title: "Self-Certification", desc: "Simplified compliance for labor and environmental laws." },
  { title: "Seed Fund Access", desc: "Priority matching via the Startup India portal." }
];


// ==========================================
// 2. ANIMATION VARIANTS
// ==========================================
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40, damping: 15 } }
};

// ==========================================
// 3. COLOR MAP (Tailwind safe-list workaround)
// ==========================================
const colorMap = {
  blue:   { bg: "bg-blue-50",   text: "text-blue-600",   border: "border-blue-200",   badge: "bg-blue-50 text-blue-600" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200", badge: "bg-indigo-50 text-indigo-600" },
  orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", badge: "bg-orange-50 text-orange-600" },
  teal:   { bg: "bg-teal-50",   text: "text-teal-600",   border: "border-teal-200",   badge: "bg-teal-50 text-teal-600" },
  green:  { bg: "bg-green-50",  text: "text-green-600",  border: "border-green-200",  badge: "bg-green-50 text-green-600" },
  violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200", badge: "bg-violet-50 text-violet-600" },
};

// ==========================================
// 4. MAIN COMPONENT
// ==========================================
export default function CertificatesAndRegistrations() {
  const [openFaq, setOpenFaq] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const serviceName = "Certificates & Registrations";

  const inputStyle =
    "w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-sm";

  const [certForm, setCertForm] = useState({
    name: "", email: "", phone: "", contactMode: "",
    certificateType: "", businessName: "", entityType: "",
    state: "", dynamicData: {}, timeline: "", urgent: "", message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDynamicChange = (field, value) => {
    setCertForm((prev) => ({ ...prev, dynamicData: { ...prev.dynamicData, [field]: value } }));
  };

  const getCertificateFields = () => {
    switch (certForm.certificateType) {
      case "Digital Signature (DSC)":
        return (<>
          <select className={inputStyle} onChange={(e) => handleDynamicChange("Validity", e.target.value)}>
            <option value="">Select Validity</option>
            <option>1 Year</option><option>2 Years</option><option>3 Years</option>
          </select>
          <input placeholder="Number of DSC Required" className={inputStyle} onChange={(e) => handleDynamicChange("DSC Count", e.target.value)} />
        </>);
      case "Trademark Registration":
        return (<>
          <input placeholder="Brand Name" className={inputStyle} onChange={(e) => handleDynamicChange("Brand Name", e.target.value)} />
          <select className={inputStyle} onChange={(e) => handleDynamicChange("Logo Available", e.target.value)}>
            <option value="">Logo Available?</option><option>Yes</option><option>No</option>
          </select>
        </>);
      case "FSSAI Registration":
        return (<>
          <input placeholder="Food Business Type" className={inputStyle} onChange={(e) => handleDynamicChange("Food Type", e.target.value)} />
          <select className={inputStyle} onChange={(e) => handleDynamicChange("License Type", e.target.value)}>
            <option value="">License Type</option><option>Basic</option><option>State</option><option>Central</option>
          </select>
        </>);
      default: return null;
    }
  };

  const calculateLeadScore = () => {
    let score = 25;
    if (certForm.certificateType === "Trademark Registration") score += 25;
    if (certForm.urgent === "Yes") score += 20;
    if (certForm.entityType === "Pvt Ltd") score += 15;
    if (certForm.timeline === "Immediate") score += 15;
    return score;
  };

  const getDynamicFieldsString = () =>
    Object.entries(certForm.dynamicData).map(([k, v]) => `${k}: ${v}`).join("\n");

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const leadScore = calculateLeadScore();
      const priority = leadScore >= 70 ? "HIGH PRIORITY" : "STANDARD";
      const templateParams = {
        serviceName, name: certForm.name, email: certForm.email, phone: certForm.phone,
        certificateType: certForm.certificateType, businessName: certForm.businessName,
        entityType: certForm.entityType, state: certForm.state, timeline: certForm.timeline,
        urgent: certForm.urgent, message: certForm.message || "-",
        dynamicFields: getDynamicFieldsString(), leadScore, priority
      };
      await emailjs.send("service_ghj2doe", "template_qkg4m4s", templateParams, "KJ9IR47xK9gNAOEYd");
      alert("Request submitted successfully!");
      setIsPanelOpen(false);
      setStep(1);
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppChat = (e, context = "Certificates & Registrations") => {
    if (e) e.stopPropagation();
    const phoneNumber = "919289758145";
    const message = `Hi! I need assistance with ${context}.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 overflow-x-hidden w-full max-w-[100vw] selection:bg-blue-200 selection:text-blue-900">
      <Navbar />

      <main className="pt-20 sm:pt-24 overflow-x-hidden">

        {/* ==========================================
            HERO SECTION — matches Home layout exactly
            ========================================== */}
        <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-10 md:pt-16 pb-10 sm:pb-16 md:pb-24 flex flex-col lg:flex-row items-center overflow-hidden">

          <div className="hidden sm:block absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-[60px] opacity-40 -z-10 pointer-events-none" />

          {/* Left Content */}
          <motion.div
            className="w-full lg:w-1/2 lg:pr-8 xl:pr-12 z-10 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs sm:text-sm font-bold text-slate-700 mb-4 sm:mb-6 mt-4 sm:mt-6 lg:mt-0"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500 shrink-0" />
              <span>Official Business Documentation</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.08] mb-4 sm:mb-6 tracking-tight"
            >
              Certificates &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Registrations.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base xl:text-lg text-slate-600 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Fast, completely compliant processing of essential business certificates and legal registrations — so you can operate and scale without interruption.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col xs:flex-row flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <button
                onClick={() => setIsPanelOpen(true)}
                className="relative group overflow-hidden bg-slate-900 text-white w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgb(15,23,42,0.18)] hover:shadow-[0_6px_20px_rgb(37,99,235,0.28)] hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <span className="relative z-10">Apply Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
              <button
                onClick={(e) => handleWhatsAppChat(e, "Checking Document Requirements")}
                className="bg-white border border-slate-200 hover:border-green-300 hover:bg-green-50 text-slate-800 hover:text-green-700 w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold transition-all shadow-sm inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 shrink-0" /> Chat on WhatsApp
              </button>
            </motion.div>

            {/* Trust badges — same row style as Home */}
            <motion.div
              variants={fadeUp}
              className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest"
            >
              <div className="flex items-center gap-1.5"><Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> Govt Approved</div>
              <div className="flex items-center gap-1.5"><Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> 100% Compliant</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> 500+ Clients</div>
            </motion.div>
          </motion.div>

          {/* Hero Image — same treatment as Home */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="w-full lg:w-1/2 mt-6 sm:mt-8 lg:mt-0 relative flex items-center justify-center z-10 overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 rounded-full blur-[50px] opacity-20 -z-10 pointer-events-none"
            />
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex justify-center items-center w-full"
            >
              <div className="absolute w-[150px] h-[150px] sm:w-[220px] sm:h-[220px] lg:w-[320px] lg:h-[320px] bg-[#1E90FF]/20 blur-[50px] rounded-full pointer-events-none" />
              <img
                src={expertImage}
                alt="ComplyWithCA Certificates Expert"
                className="relative z-10 w-full max-w-[240px] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[580px] xl:max-w-[720px] h-auto object-contain mx-auto"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ==========================================
            AVAILABLE REGISTRATIONS — matches Home services grid
            ========================================== */}
        <section id="registrations" className="relative bg-slate-100 py-12 sm:py-16 md:py-20 overflow-hidden w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-200 p-5 sm:p-8 md:p-12">

              <motion.div
                className="text-center mb-8 sm:mb-12"
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
              >
                <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">Everything You Need</h4>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-3 sm:mb-4 tracking-tight">
                  Available Registrations
                </h2>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={staggerContainer}
              >
                {registrations.map((reg, idx) => {
                  const c = colorMap[reg.color];
                  return (
                    <motion.div key={idx} variants={fadeUp} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                      <div className="group relative bg-slate-50 border-2 border-slate-200 hover:border-blue-500 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-250 hover:shadow-[0_8px_32px_rgb(37,99,235,0.13)]">

                        {/* Image area — same as Home service cards */}
                        <div className="relative h-28 sm:h-36 overflow-hidden">
                          <img
                            src={reg.img}
                            alt={reg.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent" />
                          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-8 sm:w-9 h-8 sm:h-9 bg-white/95 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
                            <reg.icon className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${c.text}`} strokeWidth={1.5} />
                          </div>
                          {/* Badge */}
                          <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                            <span className="text-[9px] font-bold text-white bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {reg.badge}
                            </span>
                          </div>
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </div>

                        <div className="p-4 sm:p-5 flex flex-col flex-1">
                          <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                            <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors duration-200 leading-tight">{reg.title}</h3>
                            <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-250 shrink-0 ml-2 mt-0.5">
                              <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                            </div>
                          </div>
                          <p className="text-slate-500 text-xs sm:text-sm leading-relaxed flex-grow mb-3 sm:mb-4">{reg.desc}</p>

                          <div className="mt-auto pt-3 border-t border-slate-100">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Starting from</div>
                                <div className="text-lg font-black text-slate-900">{reg.price}</div>
                              </div>
                              <div className="text-[10px] text-slate-400 font-semibold text-right">
                                {reg.title === "Trademark Registration" ? "Govt fees excl." : "Govt fees incl."}
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                setCertForm((prev) => ({ ...prev, certificateType: reg.title }));
                                setIsPanelOpen(true);
                              }}
                              className="w-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white border-2 border-slate-200 text-slate-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all"
                            >
                              Apply Now <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Custom Registration Card */}
                <motion.div variants={fadeUp} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                  <div className="group relative bg-slate-900 border-2 border-slate-700 hover:border-blue-500 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-250 hover:shadow-[0_8px_32px_rgb(37,99,235,0.25)]">
                    <div className="relative h-28 sm:h-36 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80&auto=format&fit=crop"
                        alt="Custom Registration"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-40"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-8 sm:w-9 h-8 sm:h-9 bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl flex items-center justify-center border border-white/20">
                        <Layers className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white" strokeWidth={1.5} />
                      </div>
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </div>
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-white mb-1.5">Need a Custom Registration?</h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed flex-grow mb-4">
                        EPFO, ESIC, RERA, IEC, or specific state-level licenses? Our expert CA team handles complex bespoke requirements.
                      </p>
                      <button
                        onClick={(e) => handleWhatsAppChat(e, "Custom License/Registration")}
                        className="w-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all"
                      >
                        <FaWhatsapp size={14} /> Consult an Expert
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <div className="mt-6 sm:mt-8 flex justify-center">
                <button
                  onClick={(e) => handleWhatsAppChat(e, "Certificate & Registration Services")}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-slate-200 hover:border-blue-500 text-slate-700 hover:text-blue-600 font-bold text-xs sm:text-sm transition-all duration-200 hover:shadow-[0_4px_16px_rgb(37,99,235,0.1)] bg-white"
                >
                  Talk to an Expert <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
                </button>
              </div>

              <div className="mt-5 pt-5 border-t border-slate-100 text-center">
                <p className="text-[10px] sm:text-xs text-slate-400 leading-relaxed max-w-3xl mx-auto">
                  *Approval timelines and final certification are subject to verification by the respective Government authorities. We act as a professional service provider facilitating documentation and filing and are not responsible for decisions made by regulatory bodies.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-4 sm:mx-6 lg:mx-16" />

        {/* ==========================================
            WHY STAY LEGALLY RECOGNIZED — matches Home "Why Choose Us" dark section
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-900 text-white border-t border-slate-800 relative overflow-hidden w-full">
          <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600 blur-[100px] sm:blur-[120px]" />
            <div className="absolute bottom-0 right-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600 blur-[100px] sm:blur-[120px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-start">

              {/* LEFT — sticky anchor */}
              <motion.div
                className="w-full lg:w-5/12 lg:sticky lg:top-28"
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
              >
                <div className="w-10 h-1 bg-blue-500 mb-5 sm:mb-6 rounded-full" />
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black leading-[1.1] mb-4 sm:mb-5 tracking-tight">
                  Stay Legally{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    Recognized.
                  </span>
                  <br />
                  Business{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    Ready.
                  </span>
                </h2>
                <p className="text-slate-400 mb-5 sm:mb-6 text-sm leading-relaxed max-w-md">
                  In a strictly regulated environment, proper documentation is the invisible shield protecting your operations, unlocking capital, and earning institutional trust.
                </p>
                <button
                  onClick={(e) => handleWhatsAppChat(e, "Legal Compliance Assistance")}
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-semibold text-sm mb-5 sm:mb-6 shadow-lg transition-all"
                >
                  <FaWhatsapp className="text-base" /> Chat with Expert
                </button>

                <div className="relative rounded-lg sm:rounded-xl overflow-hidden mb-4 sm:mb-5 border border-white/10 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&q=80&auto=format&fit=crop"
                    alt="Certificate experts"
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-2 sm:bottom-3 left-3 right-3">
                    <p className="text-white font-semibold text-xs">Expert Team — Delhi</p>
                    <p className="text-slate-300 text-[11px] mt-0.5">Processing registrations pan-India</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 sm:p-4 rounded-xl backdrop-blur-md">
                  <div className="w-9 sm:w-10 h-9 sm:h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center shrink-0">
                    <Shield className="w-4 sm:w-5 h-4 sm:h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">100% Compliance Rate</div>
                    <div className="text-xs text-slate-400">Trusted by 500+ businesses</div>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT — benefit cards */}
              <motion.div
                className="w-full lg:w-7/12 flex flex-col gap-4 sm:gap-5"
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                  {benefits.map((b, idx) => (
                    <motion.div
                      key={idx} variants={fadeUp}
                      className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(37,99,235,0.15)]"
                    >
                      <div className="text-blue-400 mb-3 sm:mb-4 bg-blue-500/10 w-9 sm:w-10 h-9 sm:h-10 rounded-lg flex items-center justify-center">
                        <b.icon className="w-4 sm:w-5 h-4 sm:h-5" strokeWidth={1.5} />
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">{b.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{b.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Photo strip */}
                <motion.div variants={fadeUp} className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80&auto=format&fit=crop", label: "Tax Filings" },
                    { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80&auto=format&fit=crop", label: "Brand Safety" },
                    { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80&auto=format&fit=crop", label: "Compliance" },
                  ].map((photo, i) => (
                    <div key={i} className="relative rounded-lg overflow-hidden group">
                      <img src={photo.src} alt={photo.label} className="w-full h-20 sm:h-24 object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                      <span className="absolute bottom-1 left-1.5 sm:left-2 text-white text-[9px] sm:text-[10px] font-semibold leading-tight">{photo.label}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ==========================================
            STARTUP INDIA SECTION
            ========================================== */}
        <section className="relative bg-slate-100 py-12 sm:py-16 md:py-20 overflow-hidden w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-200 p-5 sm:p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:w-1/2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wider uppercase mb-5">
                    <Award className="w-3.5 h-3.5 shrink-0" /> Exclusive Recognition
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-tight tracking-tight">
                    Startup India<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">DPIIT Registration</span>
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base mb-7 leading-relaxed max-w-md">
                    Unlock government benefits and investor trust through official DPIIT recognition. Position your startup for rapid scaling with elite compliance status.
                  </p>
                  <button
                    onClick={(e) => handleWhatsAppChat(e, "Startup India DPIIT Registration")}
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md text-sm"
                  >
                    Check Eligibility <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                  className="lg:w-1/2 w-full"
                >
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    {startupBenefits.map((sb, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 p-4 sm:p-5 rounded-xl hover:border-blue-300 hover:shadow-sm transition-all">
                        <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-3">
                          <CheckCircle2 size={18} />
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">{sb.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{sb.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            STREAMLINED PROCESS
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-900 text-white border-t border-slate-800 relative overflow-hidden w-full">
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600 blur-[100px]" />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10 sm:mb-16">
              <div className="w-10 h-1 bg-blue-500 mb-5 rounded-full mx-auto" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">Our Streamlined Process</h2>
              <p className="text-slate-400 text-sm">Rapid processing with zero administrative headaches.</p>
            </motion.div>

            <div className="relative">
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-white/10 rounded-full" />
              <div className="flex flex-col gap-10 sm:gap-14 relative z-10">
                {processSteps.map((ps, index) => (
                  <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}
                    key={ps.id} className="relative flex items-start gap-6 sm:gap-10 group"
                  >
                    <div className="w-12 sm:w-14 h-12 sm:h-14 shrink-0 bg-white/5 border border-white/10 text-white rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 relative z-20">
                      <span className="font-black text-base sm:text-lg">{ps.id}</span>
                    </div>
                    <div className="pt-2">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{ps.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{ps.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            FAQ SECTION
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100 w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-200 p-5 sm:p-8 md:p-12">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-8 sm:mb-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
              </motion.div>
              <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-sm">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-4 sm:p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                    >
                      <span className="font-bold text-slate-900 pr-6 sm:pr-8 text-sm sm:text-base">{faq.q}</span>
                      <ChevronDown className={`w-4 sm:w-5 h-4 sm:h-5 shrink-0 text-slate-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="p-4 sm:p-6 pt-0 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-50">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            BOTTOM CTA — matches Home's dark CTA card
            ========================================== */}
        <section className="bg-slate-100 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&q=80&auto=format&fit=crop"
                  alt="Legal compliance office"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/92 via-slate-900/80 to-blue-900/70" />
              </div>

              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600 rounded-full blur-[100px] opacity-30" />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-600 rounded-full blur-[100px] opacity-30" />
              </div>

              <div className="relative z-10 p-7 sm:p-10 md:p-16 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">
                  Get Your Registrations<br className="hidden sm:block" /> Done the Right Way.
                </h2>
                <p className="text-slate-300 mb-7 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
                  Join 500+ businesses who rely on ComplyWithCA for precise, fast, and 100% compliant licensing and legal validation. Connect directly with our experts.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button
                    onClick={(e) => handleWhatsAppChat(e, "Certificate/Registration Assistance")}
                    className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-7 sm:px-10 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 sm:gap-3 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(37,211,102,0.35)] animate-pulse"
                  >
                    <FaWhatsapp className="text-lg sm:text-xl shrink-0" />
                    Chat on WhatsApp
                  </button>
                  <button
                    onClick={() => setIsPanelOpen(true)}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-7 sm:px-10 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all"
                  >
                    Apply Online <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ==========================================
          FLOATING ACTION BUTTONS — identical to Home
          ========================================== */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3 sm:gap-4">
        <a
          href="tel:+919289758145"
          className="group relative flex items-center justify-center"
        >
          <span className="absolute w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-blue-500/30 blur-xl" />
          <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white p-2.5 sm:p-3.5 rounded-full shadow-[0_8px_30px_rgba(37,99,235,0.4)] transition-all duration-300 group-hover:scale-110">
            <Phone className="w-4 sm:w-5 h-4 sm:h-5" />
          </div>
          <span className="hidden sm:block absolute right-14 sm:right-16 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg">
            Call Now
          </span>
        </a>

        <a
          href="https://wa.me/919289758145?text=Hi%20ComplyWithCA,%20I%20need%20help%20with%20a%20Certificate%20or%20Registration."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center"
        >
          <span className="absolute w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-green-500/30 blur-xl" />
          <span className="absolute inline-flex h-12 sm:h-14 w-12 sm:w-14 rounded-full bg-green-400 opacity-20 animate-ping" />
          <div className="relative bg-gradient-to-br from-[#25D366] to-[#1ebe5d] hover:from-[#1ebe5d] hover:to-[#17a74a] text-white p-3.5 sm:p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.5)] transition-all duration-300 group-hover:scale-110">
            <FaWhatsapp className="text-lg sm:text-xl" />
          </div>
          <span className="hidden sm:block absolute right-14 sm:right-16 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg">
            Chat on WhatsApp
          </span>
        </a>
      </div>

      {/* ==========================================
          SLIDE-OVER PANEL (preserved fully)
          ========================================== */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              onClick={() => setIsPanelOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 22 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[520px] bg-white z-[9999] shadow-2xl border-l border-slate-200 flex flex-col"
            >
              <div className="sticky top-0 bg-white z-20 px-6 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 border-b border-slate-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {certForm.certificateType || "New Registration"} Intake
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">Structured onboarding for certification services</p>
                  </div>
                  <button
                    onClick={() => setIsPanelOpen(false)}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center text-slate-600"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="flex gap-2 mt-5 sm:mt-6">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= s ? "bg-blue-600" : "bg-slate-200"}`} />
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 sm:py-8 space-y-4 sm:space-y-6">
                {step === 1 && (<>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">Contact Details</h3>
                  <input name="name" placeholder="Full Name" value={certForm.name} onChange={handleChange} className={inputStyle} />
                  <input name="email" placeholder="Email Address" value={certForm.email} onChange={handleChange} className={inputStyle} />
                  <input name="phone" placeholder="Phone Number" value={certForm.phone} onChange={handleChange} className={inputStyle} />
                  <select name="certificateType" value={certForm.certificateType} onChange={handleChange} className={inputStyle}>
                    <option value="">Select Certificate Type</option>
                    {registrations.map((reg) => (<option key={reg.title}>{reg.title}</option>))}
                    <option>Other / Custom</option>
                  </select>
                </>)}
                {step === 2 && (<>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">Business Information</h3>
                  <input name="businessName" placeholder="Business Name" value={certForm.businessName} onChange={handleChange} className={inputStyle} />
                  <select name="entityType" value={certForm.entityType} onChange={handleChange} className={inputStyle}>
                    <option value="">Entity Type</option>
                    <option>Proprietorship</option><option>Partnership</option><option>LLP</option><option>Pvt Ltd</option>
                  </select>
                  <input name="state" placeholder="Registered State" value={certForm.state} onChange={handleChange} className={inputStyle} />
                </>)}
                {step === 3 && (<>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">Registration Details</h3>
                  {getCertificateFields()}
                  <select name="timeline" value={certForm.timeline} onChange={handleChange} className={inputStyle}>
                    <option value="">Expected Timeline</option>
                    <option>Immediate</option><option>This Week</option><option>This Month</option>
                  </select>
                  <select name="urgent" value={certForm.urgent} onChange={handleChange} className={inputStyle}>
                    <option value="">Urgent Processing?</option><option>Yes</option><option>No</option>
                  </select>
                  <textarea name="message" placeholder="Additional Notes" rows="4" value={certForm.message} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-sm" />
                </>)}
              </div>

              <div className="px-6 sm:px-8 py-4 sm:py-6 border-t border-slate-100 bg-white flex justify-between items-center">
                {step > 1 ? (
                  <button onClick={() => setStep(step - 1)} className="px-4 sm:px-5 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition text-sm font-medium">Back</button>
                ) : <div />}
                {step < 3 ? (
                  <button onClick={() => setStep(step + 1)} className="px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition shadow-md hover:shadow-lg text-sm">
                    Next →
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={isSubmitting} className="px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed text-sm">
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}