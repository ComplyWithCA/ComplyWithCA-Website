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
  Mail,
  Phone
} from 'lucide-react';
import Navbar from '../components/Navbar';
import expertImage from "../assets/image11.png"; // Imported your 3D image
import Footer from '../components/footer';
import emailjs from '@emailjs/browser';
// ==========================================
// 1. DATA ARRAYS (CA CONTEXTUALIZED)
// ==========================================
const registrations = [
  {
    icon: Fingerprint,
    badge: "MANDATORY FOR FILING",
    title: "Digital Signature (DSC)",
    desc: "Class 3 DSC with secure USB token, legally mandated for MCA filings, GST, and Income Tax returns.",
    price: "₹1,499",
    color: "blue"
  },
  {
    icon: Building,
    badge: "GOVT BENEFITS",
    title: "MSME / Udyam Registration",
    desc: "Unlock collateral-free loans, tender eligibility, and significant government subsidies for your enterprise.",
    price: "₹999",
    color: "indigo"
  },
  {
    icon: Award,
    badge: "GLOBAL TRUST",
    title: "ISO 9001:2015 Certification",
    desc: "Establish international quality management standards to win corporate clients and government tenders.",
    price: "₹4,999",
    color: "emerald"
  },
  {
    icon: Landmark,
    badge: "FOOD COMPLIANCE",
    title: "FSSAI Registration",
    desc: "Mandatory safety licensing for restaurants, cloud kitchens, FMCG manufacturers, and food distributors.",
    price: "₹2,499",
    color: "orange"
  },
  {
    icon: Stamp,
    badge: "BRAND PROTECTION",
    title: "Trademark Registration",
    desc: "Legally secure your brand name, logo, or slogan from intellectual property theft and competitors.",
    price: "₹6,999",
    color: "violet"
  }
];

const benefits = [
  { icon: Scale, title: "Legal Validity", desc: "Ensure your operations are backed by official, verifiable government documentation." },
  { icon: Briefcase, title: "Tender Eligibility", desc: "Unlock massive B2B and government contracts that strictly require MSME or ISO compliance." },
  { icon: ShieldCheck, title: "Brand Authority", desc: "Displaying official certificates dramatically increases trust among consumers and investors." },
  { icon: FileCheck, title: "Regulatory Defenses", desc: "Shield your business from hefty compliance penalties and operational shutdowns." }
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

// ==========================================
// 2. ANIMATION VARIANTS
// ==========================================
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40, damping: 15 } }
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function CertificatesAndRegistrations() {
  const [openFaq, setOpenFaq] = useState(0);
  const navigate = useNavigate();

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceName = "Certificates & Registrations";

  const inputStyle =
    "w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition";

  const [certForm, setCertForm] = useState({
    name: "",
    email: "",
    phone: "",
    contactMode: "",
    certificateType: "",
    businessName: "",
    entityType: "",
    state: "",
    dynamicData: {},
    timeline: "",
    urgent: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCertForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDynamicChange = (field, value) => {
    setCertForm((prev) => ({
      ...prev,
      dynamicData: {
        ...prev.dynamicData,
        [field]: value
      }
    }));
  };

  const getCertificateFields = () => {
    switch (certForm.certificateType) {
      case "Digital Signature (DSC)":
        return (
          <>
            <select
              className={inputStyle}
              onChange={(e) => handleDynamicChange("Validity", e.target.value)}
            >
              <option value="">Select Validity</option>
              <option>1 Year</option>
              <option>2 Years</option>
              <option>3 Years</option>
            </select>

            <input
              placeholder="Number of DSC Required"
              className={inputStyle}
              onChange={(e) => handleDynamicChange("DSC Count", e.target.value)}
            />
          </>
        );

      case "Trademark Registration":
        return (
          <>
            <input
              placeholder="Brand Name"
              className={inputStyle}
              onChange={(e) => handleDynamicChange("Brand Name", e.target.value)}
            />
            <select
              className={inputStyle}
              onChange={(e) => handleDynamicChange("Logo Available", e.target.value)}
            >
              <option value="">Logo Available?</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </>
        );

      case "FSSAI Registration":
        return (
          <>
            <input
              placeholder="Food Business Type"
              className={inputStyle}
              onChange={(e) => handleDynamicChange("Food Type", e.target.value)}
            />
            <select
              className={inputStyle}
              onChange={(e) => handleDynamicChange("License Type", e.target.value)}
            >
              <option value="">License Type</option>
              <option>Basic</option>
              <option>State</option>
              <option>Central</option>
            </select>
          </>
        );

      default:
        return null;
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

  const getDynamicFieldsString = () => {
    return Object.entries(certForm.dynamicData)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const leadScore = calculateLeadScore();
      const priority = leadScore >= 70 ? "HIGH PRIORITY" : "STANDARD";

      const templateParams = {
        serviceName,
        name: certForm.name,
        email: certForm.email,
        phone: certForm.phone,
        certificateType: certForm.certificateType,
        businessName: certForm.businessName,
        entityType: certForm.entityType,
        state: certForm.state,
        timeline: certForm.timeline,
        urgent: certForm.urgent,
        message: certForm.message || "-",
        dynamicFields: getDynamicFieldsString(),
        leadScore,
        priority
      };

      await emailjs.send(
        "service_ghj2doe",
        "template_qkg4m4s",
        templateParams,
        "KJ9IR47xK9gNAOEYd"
      );

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
    const phoneNumber = "9311702025";
    const message = `Hi! I need assistance with ${context}.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fafcff] font-sans text-slate-800 selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      <Navbar />

      <main className="pt-24 pb-20">

        {/* ==========================================
            HERO SECTION
            ========================================== */}
        <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-12 md:pt-20 pb-20 md:pb-32 flex flex-col lg:flex-row items-center min-h-[85vh]">
          {/* Ambient Security Glow */}
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-blue-100/50 to-emerald-100/30 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/4 -translate-y-1/4" />

          {/* Left Content Area */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full lg:w-1/2 lg:pr-8 xl:pr-12 z-10"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/50 shadow-sm text-slate-700 text-xs font-bold tracking-wider uppercase mb-8 mt-8 lg:mt-0">
              <Sparkles className="w-4 h-4 text-blue-600" /> Official Business Documentation
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
              Certificates & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Registrations</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg xl:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
              Fast, completely compliant processing of essential business certificates and legal registrations you need to unlock operations and scale securely.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setIsPanelOpen(true);
                }} className="relative group overflow-hidden bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.5)] hover:-translate-y-0.5"
              >
                <span className="relative z-10">Apply Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={(e) => handleWhatsAppChat(e, "Checking Document Requirements")}
                className="bg-white/50 backdrop-blur-sm border border-green-200 hover:bg-green-50 text-green-700 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-sm"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </button>
            </motion.div>
          </motion.div>

          {/* ==========================================
              PURE CONTAINER-LESS 3D IMAGE RENDER
              ========================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 mt-16 lg:mt-0 relative flex items-center justify-center z-20 overflow-visible perspective-[1200px]"
          >

            {/* Premium Rotating Glow */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute w-[120%] h-[120%] 
               max-w-[850px] max-h-[850px]
               bg-gradient-to-tr 
                 from-blue-600 via-indigo-500 to-cyan-400
               rounded-full blur-[140px] opacity-40 -z-10"
            />

            {/* Soft Background Blend Mask */}
            <div className="absolute inset-0 w-full h-full flex justify-center items-center pointer-events-none -z-10 
                  [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
              <div className="w-[90%] h-[90%] bg-white/30 blur-[120px] rounded-full" />
            </div>

            {/* Floating Image Wrapper */}
            <motion.div
              animate={{ y: [-20, 20, -20] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex justify-center items-center w-full overflow-visible"
            >
              <img
                src={expertImage}
                alt="ComplyWithCA Certificates Expert"
                className="relative z-30 
                 w-[110%] 
                 lg:w-[135%] 
                 xl:w-[125%]
                 max-w-none
                 h-auto object-contain
                 drop-shadow-[0_40px_80px_rgba(15,23,42,0.3)]
                 transition-all duration-700 ease-out
                 hover:scale-[1.08] hover:-rotate-1 origin-bottom"
              />
            </motion.div>

          </motion.div>
        </section>

        {/* ==========================================
            AVAILABLE REGISTRATIONS GRID
            ========================================== */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Available Registrations</h2>
              <div className="w-16 h-1 bg-blue-600 rounded-full" />
            </div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {registrations.map((reg, idx) => (
                <motion.div
                  key={idx} variants={fadeUp}
                  className="group relative bg-[#fafcff] p-8 rounded-3xl border border-slate-100 hover:border-blue-200 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.08)] transition-all duration-300 flex flex-col h-full overflow-hidden"
                >
                  {/* Subtle Top Border Glow */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-${reg.color}-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 bg-${reg.color}-50 text-${reg.color}-600 rounded-2xl flex items-center justify-center group-hover:bg-${reg.color}-600 group-hover:text-white transition-colors duration-300`}>
                      <reg.icon size={26} strokeWidth={1.5} />
                    </div>
                    <span className={`text-[10px] font-bold text-${reg.color}-600 bg-${reg.color}-50 px-3 py-1 rounded-full uppercase tracking-wider`}>
                      {reg.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">{reg.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">{reg.desc}</p>

                  <div className="pt-6 border-t border-slate-200/60 mt-auto">
                    <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-2">Starting from</div>
                    <div className="text-2xl font-black text-slate-900 mb-6">{reg.price}</div>
                    <button
                      onClick={() => {
                        setCertForm((prev) => ({
                          ...prev,
                          certificateType: reg.title
                        }));
                        setIsPanelOpen(true);
                      }} className="w-full bg-white border border-slate-200 text-slate-800 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm"
                    >
                      Apply Now <ArrowRight size={16} />
                    </button>
                    <div className="text-center mt-3 text-[10px] text-slate-400 uppercase font-semibold">Govt fees applicable extra</div>
                  </div>
                </motion.div>
              ))}

              {/* The "Custom Registration" Highlight Card */}
              <motion.div variants={fadeUp} className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-600/20 flex flex-col justify-center items-center text-center overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 mx-auto border border-white/20">
                    <Layers size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Need a Custom Registration?</h3>
                  <p className="text-blue-100 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
                    EPFO, ESIC, RERA, IEC, or specific state-level licenses? Our expert CA team handles complex bespoke requirements.
                  </p>
                  <button
                    onClick={(e) => handleWhatsAppChat(e, "Custom License/Registration")}
                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:scale-105 active:scale-95 transition-all shadow-lg w-full"
                  >
                    Consult an Expert
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ==========================================
            WHY STAY LEGALLY RECOGNIZED (Bento Grid)
            ========================================== */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:w-1/3">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                  Stay Legally <br className="hidden lg:block" />Recognized &<br /> Business Ready.
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  In a strictly regulated environment, proper documentation is the invisible shield protecting your operations, unlocking capital, and earning institutional trust.
                </p>
                <div className="w-12 h-1.5 bg-blue-600 rounded-full" />
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="lg:w-2/3 grid sm:grid-cols-2 gap-6">
                {benefits.map((b, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                      <b.icon size={24} strokeWidth={2} />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-3">{b.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>

        {/* ==========================================
            STREAMLINED PROCESS (Glowing Timeline)
            ========================================== */}
        <section className="py-32 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Our Streamlined Process</h2>
              <p className="text-slate-500">Rapid processing with zero administrative headaches.</p>
            </div>

            <div className="relative">
              {/* Timeline Track */}
              <div className="absolute left-8 md:left-12 top-0 bottom-0 w-1 bg-slate-100 rounded-full" />

              <div className="flex flex-col gap-16 relative z-10">
                {processSteps.map((step, index) => (
                  <motion.div
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
                    key={step.id} className="relative flex items-start gap-8 md:gap-12 group"
                  >
                    {/* Animated Node */}
                    <div className="w-16 h-16 shrink-0 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border-2 border-white shadow-lg shadow-blue-500/10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 relative z-20">
                      <span className="font-bold text-xl">{step.id}</span>
                    </div>

                    <div className="pt-2">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                      <p className="text-slate-600 text-base leading-relaxed">{step.desc}</p>
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
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 pr-8">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="p-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            BOTTOM CTA (Angular Deep Gradient)
            ========================================== */}
        <section className="relative py-32 bg-slate-900 text-center overflow-hidden">
          {/* Angular Geometric Cuts */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[50vw] h-[100%] bg-slate-800/50 skew-x-[-20deg] translate-x-20" />
            <div className="absolute bottom-0 left-0 w-[50vw] h-[50%] bg-blue-900/20 skew-x-[20deg] -translate-x-20 blur-3xl" />
          </div>

          <div className="max-w-3xl mx-auto relative z-10 px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Get Your Registrations Done the Right Way.
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                Join 500+ businesses who rely on ComplyWithCA for precise, fast, and 100% compliant licensing and legal validation.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <button
                  onClick={(e) => handleWhatsAppChat(e, "Starting a new Application")}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-1"
                >
                  Start Application
                </button>
                <button
                  onClick={(e) => handleWhatsAppChat(e, "Speaking to an Expert")}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-10 py-4 rounded-xl font-bold transition-all"
                >
                  Speak to an Expert
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <AnimatePresence>
        {isPanelOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              onClick={() => setIsPanelOpen(false)}
            />

            {/* Slide Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 22 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[520px] bg-white z-[9999] shadow-2xl border-l border-slate-200 flex flex-col"
            >

              {/* ================= HEADER ================= */}
              <div className="sticky top-0 bg-white z-20 px-8 pt-8 pb-6 border-b border-slate-100">

                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {certForm.certificateType || "New Registration"} Intake
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Structured onboarding for certification services
                    </p>
                  </div>

                  <button
                    onClick={() => setIsPanelOpen(false)}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center text-slate-600"
                  >
                    ✕
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="flex gap-2 mt-6">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= s ? "bg-blue-600" : "bg-slate-200"
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* ================= BODY ================= */}
              <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">

                {/* STEP 1 */}
                {step === 1 && (
                  <>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Contact Details
                    </h3>

                    <input
                      name="name"
                      placeholder="Full Name"
                      value={certForm.name}
                      onChange={handleChange}
                      className={inputStyle}
                    />

                    <input
                      name="email"
                      placeholder="Email Address"
                      value={certForm.email}
                      onChange={handleChange}
                      className={inputStyle}
                    />

                    <input
                      name="phone"
                      placeholder="Phone Number"
                      value={certForm.phone}
                      onChange={handleChange}
                      className={inputStyle}
                    />

                    <select
                      name="certificateType"
                      value={certForm.certificateType}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="">Select Certificate Type</option>
                      {registrations.map((reg) => (
                        <option key={reg.title}>{reg.title}</option>
                      ))}
                      <option>Other / Custom</option>
                    </select>
                  </>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Business Information
                    </h3>

                    <input
                      name="businessName"
                      placeholder="Business Name"
                      value={certForm.businessName}
                      onChange={handleChange}
                      className={inputStyle}
                    />

                    <select
                      name="entityType"
                      value={certForm.entityType}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="">Entity Type</option>
                      <option>Proprietorship</option>
                      <option>Partnership</option>
                      <option>LLP</option>
                      <option>Pvt Ltd</option>
                    </select>

                    <input
                      name="state"
                      placeholder="Registered State"
                      value={certForm.state}
                      onChange={handleChange}
                      className={inputStyle}
                    />
                  </>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Registration Details
                    </h3>

                    {getCertificateFields()}

                    <select
                      name="timeline"
                      value={certForm.timeline}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="">Expected Timeline</option>
                      <option>Immediate</option>
                      <option>This Week</option>
                      <option>This Month</option>
                    </select>

                    <select
                      name="urgent"
                      value={certForm.urgent}
                      onChange={handleChange}
                      className={inputStyle}
                    >
                      <option value="">Urgent Processing?</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>

                    <textarea
                      name="message"
                      placeholder="Additional Notes"
                      rows="4"
                      value={certForm.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                  </>
                )}
              </div>

              {/* ================= FOOTER ================= */}
              <div className="px-8 py-6 border-t border-slate-100 bg-white flex justify-between items-center">

                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-5 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    onClick={() => setStep(step + 1)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition shadow-md hover:shadow-lg"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                )}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==========================================
          FOOTER
          ========================================== */}
      <Footer />
    </div>
  );
}