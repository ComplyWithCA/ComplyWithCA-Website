import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  MessageCircle,
  X,
  Globe,
  Mail,
  FileText,
  Search,
  FileCheck,
  Send,
  ShieldCheck,
  Sparkles,
  Phone
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/footer';
// ==========================================
// 1. DATA ARRAYS
// ==========================================
const processSteps = [
  {
    id: "01",
    title: "Deep-Dive Consultation",
    desc: "Understanding your business structure and compliance requirements through an in-depth, tailored analysis.",
    icon: Search,
    color: "from-blue-400 to-blue-600"
  },
  {
    id: "02",
    title: "Document Verification",
    desc: "Meticulous collection and multi-stage verification of all required regulatory documents to ensure zero-error submissions.",
    icon: FileCheck,
    color: "from-indigo-400 to-indigo-600"
  },
  {
    id: "03",
    title: "Filing & Processing",
    desc: "Accurate submission through secure government channels and swift execution of all statutory filing procedures.",
    icon: Send,
    color: "from-sky-400 to-sky-600"
  },
  {
    id: "04",
    title: "Confirmation & Support",
    desc: "Final confirmation of your compliance status backed by our continuous, proactive advisory assistance.",
    icon: ShieldCheck,
    color: "from-teal-400 to-teal-600"
  }
];

const highlights = [
  { title: "Startup-Focused Advisory", desc: "Tailored financial strategies for emerging ventures." },
  { title: "Transparent Process", desc: "Real-time visibility into every regulatory step." },
  { title: "Timely Execution", desc: "Zero-lag delivery on critical, time-sensitive filings." }
];

// ==========================================
// 2. ANIMATION VARIANTS
// ==========================================
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40, damping: 15 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function About() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [hasTriggeredPopup, setHasTriggeredPopup] = useState(false);

  // For the timeline line animation
  const { scrollYProgress } = useScroll();
  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  // ==========================================
  // ADVANCED IDLE TRACKER LOGIC
  // ==========================================
  useEffect(() => {
    // If we already showed it once, stop tracking to avoid annoying the user
    if (hasTriggeredPopup) return;

    let idleTimer;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      // If the user stops scrolling/moving for 4 seconds, show the popup
      idleTimer = setTimeout(() => {
        if (!hasTriggeredPopup) {
          setShowPopup(true);
          setHasTriggeredPopup(true);
        }
      }, 4000); // 4000ms = 4 seconds of idle time
    };

    // Start the timer when the component mounts
    resetIdleTimer();

    // Listeners: If the user scrolls, moves mouse, or clicks, reset the 4-second delay.
    window.addEventListener('scroll', resetIdleTimer);
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('mousedown', resetIdleTimer);
    window.addEventListener('touchstart', resetIdleTimer);

    // Cleanup listeners when component unmounts
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('scroll', resetIdleTimer);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('mousedown', resetIdleTimer);
      window.removeEventListener('touchstart', resetIdleTimer);
    };
  }, [hasTriggeredPopup]);

  // Auto-close popup logic (closes 12 seconds AFTER it appears)
  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setTimeout(() => setShowPopup(false), 12000);
    }
    return () => clearTimeout(timer);
  }, [showPopup]);

  // WhatsApp click handler
  const handlePopupWhatsAppClick = () => {
    const phoneNumber = "919289758145";
    const message = "Hi! I would like to chat with an expert regarding compliance and advisory services for my business.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setShowPopup(false);
  };

  const [copied, setCopied] = useState(false);
  return (
    <div className="min-h-screen bg-[#fafcff] font-sans text-slate-800 overflow-x-hidden selection:bg-blue-200 selection:text-blue-900 relative">
      <Navbar />

      <main className="pt-24 pb-20">

        {/* ==========================================
            HERO / INTRO SECTION 
            ========================================== */}
        <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-24 md:pt-28 md:pb-32 overflow-hidden">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">

            {/* Left Column */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-semibold text-slate-700 mb-6">
                <Sparkles size={16} className="text-blue-500" />
                <span>Best Compliance Partner</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8 tracking-tight">
                Right Compliance.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Right Way.
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
                ComplyWithCA is a Delhi-based professional compliance and advisory platform dedicated to delivering structured GST, tax filing, registration, and business support solutions. We focus on absolute clarity and long-term compliance assistance.              </motion.p>
            </motion.div>

            {/* Right Column (Highlights) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col gap-8 lg:pl-16 relative"
            >
              {/* Vertical connecting line */}
              <div className="absolute left-0 lg:left-8 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden lg:block" />

              {highlights.map((item, idx) => (
                <motion.div key={idx} variants={fadeUp} className="relative pl-6 lg:pl-10 group">
                  <div className="absolute left-0 top-2 w-1.5 h-1.5 bg-blue-600 rounded-full ring-4 ring-blue-50 group-hover:scale-150 group-hover:ring-blue-100 transition-all duration-300" />
                  <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}

              <motion.div variants={fadeUp} className="pt-6 pl-6 lg:pl-10">
                <button
                  onClick={() => navigate("/services")}
                  className="group relative inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold transition-all overflow-hidden shadow-[0_8px_30px_rgb(15,23,42,0.2)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Explore Our Services</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <ArrowRight
                    size={18}
                    className="relative z-10 group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ==========================================
    GOVERNMENT REGISTRATION INFO (Enhanced UI)
========================================== */}
        <section className="py-24 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="relative bg-white rounded-[2.5rem] p-10 md:p-14 border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden"
            >

              {/* Subtle Background Glow */}
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="text-center mb-12 relative z-10">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-widest uppercase mb-6">
                  <ShieldCheck size={16} />
                  MCA Registered
                </div>

                <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  Government Recognized Entity
                </h3>

                <p className="text-slate-500 mt-4 max-w-xl mx-auto leading-relaxed">
                  Incorporated under the Ministry of Corporate Affairs, Government of India.
                  Official registration details are transparently displayed below.
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid md:grid-cols-2 gap-8 relative z-10">

                {/* Legal Name Card */}
                <div className="group bg-slate-50 hover:bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                    Legal Entity Name
                  </p>
                  <p className="text-lg font-bold text-slate-900">
                    COMPLYWITHCA ADVISORS LLP
                  </p>
                </div>

                {/* LLPIN Card */}
                {/* LLPIN Card */}
                <div className="group bg-slate-50 hover:bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                    LLP Identification Number
                  </p>

                  <div className="flex items-center justify-between gap-4">
                    <p className="text-lg font-bold text-slate-900 tracking-wider">
                      ACW-0080
                    </p>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("ACW-0080");
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className={`text-xs font-semibold px-3 py-1 rounded-full transition-all duration-300
        ${copied
                          ? "bg-green-100 text-green-700"
                          : "text-blue-600 hover:text-blue-800"
                        }`}
                    >
                      {copied ? "Copied ✓" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer Line */}
              <div className="mt-12 pt-6 border-t border-slate-100 text-center text-sm text-slate-400">
                Central Registration Centre · Registrar of Companies · Government of India
              </div>

            </motion.div>

          </div>
        </section>

        {/* ==========================================
            PROCESS TIMELINE SECTION 
            ========================================== */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

            {/* Section Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="text-center mb-24 lg:mb-32"
            >
              <h4 className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase mb-4">Workflow Architecture</h4>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                How We Operate
              </h2>
            </motion.div>

            {/* Timeline Container */}
            <div className="relative max-w-5xl mx-auto">

              {/* Dynamic Center Line (Draws on Scroll) */}
              <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 rounded-full overflow-hidden">
                <motion.div
                  style={{ height: lineHeight }}
                  className="w-full bg-gradient-to-b from-blue-500 via-indigo-500 to-teal-500 rounded-full"
                />
              </div>

              {/* Process Steps */}
              <div className="flex flex-col gap-16 lg:gap-24">
                {processSteps.map((step, index) => {
                  const isEven = index % 2 === 0;

                  return (
                    <div
                      key={step.id}
                      className={`relative flex flex-col lg:flex-row items-center justify-between w-full group ${isEven ? 'lg:flex-row-reverse' : ''}`}
                    >
                      {/* Empty space for alternating layout on desktop */}
                      <div className="hidden lg:block lg:w-[45%]" />

                      {/* Center Animated Node */}
                      <div className="absolute left-8 lg:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                          className="w-12 h-12 bg-white rounded-full border-4 border-slate-100 flex items-center justify-center shadow-lg group-hover:border-blue-100 transition-colors duration-300"
                        >
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${step.color} group-hover:scale-150 transition-transform duration-500`} />
                        </motion.div>
                      </div>

                      {/* Content Card */}
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                        className="w-full lg:w-[45%] pl-24 lg:pl-0"
                      >
                        <div className="relative bg-white/60 backdrop-blur-xl p-8 lg:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:border-blue-100 hover:shadow-[0_20px_40px_rgb(37,99,235,0.08)] hover:-translate-y-2 transition-all duration-500 overflow-hidden group/card">

                          {/* Card Hover Glow */}
                          <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${step.color} opacity-0 group-hover/card:opacity-10 rounded-full blur-3xl transition-opacity duration-500`} />

                          <div className="flex items-center gap-6 mb-6">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 shadow-md`}>
                              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                                <step.icon size={24} className="text-slate-800" />
                              </div>
                            </div>
                            <span className="text-5xl font-black text-slate-100 tracking-tighter select-none">
                              {step.id}
                            </span>
                          </div>

                          <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                          <p className="text-slate-600 text-base leading-relaxed">{step.desc}</p>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            CTA SECTION
            ========================================== */}
        <section className="py-24 max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-slate-900 rounded-[3rem] p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden"
          >
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[100px]" />
              <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-2xl text-center lg:text-left">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                Ready to streamline your compliance?
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Connect with professionals for consultation tailored specifically to your business architecture.
              </p>
            </div>

            <div className="relative z-10 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => navigate("/contact")}
                className="w-full lg:w-auto bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-[0_0_40px_rgb(255,255,255,0.2)] hover:shadow-[0_0_60px_rgb(255,255,255,0.4)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Book a Consultation
              </button>
            </div>
          </motion.div>
        </section>

      </main>

      {/* ==========================================
          FOOTER
          ========================================== */}
      <Footer />

      {/* ==========================================
          CENTERED WHATSAPP GREEN POPUP
          ========================================== */}
      <AnimatePresence>
        {showPopup && (
          <>
            {/* Background Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPopup(false)}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-[90]"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: "-50%", y: "-50%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%", filter: "blur(8px)" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ top: "50%", left: "50%" }}
              className="fixed z-[100] max-w-[420px] w-[calc(100%-2rem)] bg-white p-10 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(37,211,102,0.3)] border border-[#25D366]/20 ring-1 ring-slate-900/5 overflow-hidden"
            >
              {/* Animated Green Timer Bar at Top */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 12, ease: "linear" }}
                className="absolute top-0 left-0 h-1.5 bg-[#25D366]"
              />

              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 p-2.5 rounded-full transition-colors z-10"
              >
                <X size={18} strokeWidth={3} />
              </button>

              <div className="flex flex-col items-center text-center gap-6 relative z-0">
                <div className="w-20 h-20 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-[#25D366]/40 mb-2">
                  <MessageCircle size={36} strokeWidth={2} />
                </div>

                <div>
                  <h4 className="text-slate-900 font-black text-3xl mb-4 tracking-tight">Need Expert Clarity?</h4>
                  <p className="text-slate-600 text-base mb-8 leading-relaxed font-medium">
                    Compliance architecture can be complex. Let our CA team map out the exact workflow for your startup's technical and financial needs.
                  </p>

                  <button
                    onClick={handlePopupWhatsAppClick}
                    className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white text-lg font-bold py-4 rounded-2xl transition-all shadow-lg shadow-[#25D366]/30 group active:scale-[0.98]"
                  >
                    Chat on WhatsApp
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}