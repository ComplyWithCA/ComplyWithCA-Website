import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  MessageCircle,
  X,
  FileText,
  Search,
  FileCheck,
  Send,
  ShieldCheck,
  Sparkles,
  Phone,
  Building2,
  Users,
  TrendingUp,
  Clock
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../components/footer';
import { FaWhatsapp } from 'react-icons/fa';
// ==========================================
// 1. DATA ARRAYS
// ==========================================
const processSteps = [
  {
    id: "01",
    title: "Deep-Dive Consultation",
    desc: "Understanding your business structure and compliance requirements through an in-depth, tailored analysis.",
    icon: Search,
    color: "from-blue-400 to-blue-600",
    img: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Document Verification",
    desc: "Meticulous collection and multi-stage verification of all required regulatory documents to ensure zero-error submissions.",
    icon: FileCheck,
    color: "from-indigo-400 to-indigo-600",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Filing & Processing",
    desc: "Accurate submission through secure government channels and swift execution of all statutory filing procedures.",
    icon: Send,
    color: "from-sky-400 to-sky-600",
    img: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: "04",
    title: "Confirmation & Support",
    desc: "Final confirmation of your compliance status backed by our continuous, proactive advisory assistance.",
    icon: ShieldCheck,
    color: "from-teal-400 to-teal-600",
    img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&q=80&auto=format&fit=crop"
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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40, damping: 15 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function About() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [hasTriggeredPopup, setHasTriggeredPopup] = useState(false);

  const { scrollYProgress } = useScroll();
  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  // ==========================================
  // ADVANCED IDLE TRACKER LOGIC
  // ==========================================
  useEffect(() => {
    if (hasTriggeredPopup) return;
    let idleTimer;
    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (!hasTriggeredPopup) {
          setShowPopup(true);
          setHasTriggeredPopup(true);
        }
      }, 4000);
    };
    resetIdleTimer();
    window.addEventListener('scroll', resetIdleTimer);
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('mousedown', resetIdleTimer);
    window.addEventListener('touchstart', resetIdleTimer);
    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('scroll', resetIdleTimer);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('mousedown', resetIdleTimer);
      window.removeEventListener('touchstart', resetIdleTimer);
    };
  }, [hasTriggeredPopup]);

  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setTimeout(() => setShowPopup(false), 12000);
    }
    return () => clearTimeout(timer);
  }, [showPopup]);

  const handlePopupWhatsAppClick = () => {
    const phoneNumber = "919289758145";
    const message = "Hi! I would like to chat with an expert regarding compliance and advisory services for my business.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    setShowPopup(false);
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 overflow-x-hidden selection:bg-blue-200 selection:text-blue-900 relative">
      <Navbar />

      <main className="pt-20 sm:pt-24 pb-12 sm:pb-20">

        {/* ==========================================
            HERO / INTRO SECTION
            ========================================== */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 md:pt-20 pb-10 sm:pb-16 md:pb-20 overflow-hidden">

          {/* Background glows */}
          <div className="hidden sm:block absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-400/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
          <div className="hidden sm:block absolute bottom-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-400/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center relative z-10">

            {/* Left Column */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs sm:text-sm font-semibold text-slate-700 mb-4 sm:mb-6"
              >
                <Sparkles size={14} className="text-blue-500 shrink-0" />
                <span>Best Compliance Partner</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 leading-[1.08] mb-4 sm:mb-6 tracking-tight"
              >
                Right Compliance.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Right Way.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-sm sm:text-base lg:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
              >
                ComplyWithCA is a Delhi-based professional compliance and advisory platform dedicated to delivering structured GST, tax filing, registration, and business support solutions. We focus on absolute clarity and long-term compliance assistance.
              </motion.p>

              {/* Hero photo — mobile only, sits below text before the highlights column */}
              <motion.div variants={fadeUp} className="block lg:hidden mb-6 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop"
                  alt="ComplyWithCA team at work"
                  className="w-full h-44 sm:h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent rounded-2xl" />
              </motion.div>
            </motion.div>

            {/* Right Column (Highlights) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col gap-5 sm:gap-8 lg:pl-16 relative"
            >
              {/* Vertical connecting line — desktop only */}
              <div className="absolute left-0 lg:left-8 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent hidden lg:block" />

              {highlights.map((item, idx) => (
                <motion.div key={idx} variants={fadeUp} className="relative pl-5 sm:pl-6 lg:pl-10 group">
                  <div className="absolute left-0 top-2 w-1.5 h-1.5 bg-blue-600 rounded-full ring-4 ring-blue-50 group-hover:scale-150 group-hover:ring-blue-100 transition-all duration-300" />
                  <h3 className="text-base sm:text-xl font-bold text-slate-900">{item.title}</h3>
                  <p className="text-slate-500 mt-1 sm:mt-2 text-sm sm:text-base leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}

              <motion.div variants={fadeUp} className="pt-4 sm:pt-6 pl-5 sm:pl-6 lg:pl-10">
                <button
                  onClick={() => navigate("/services")}
                  className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 bg-slate-900 text-white w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-bold transition-all overflow-hidden shadow-[0_8px_30px_rgb(15,23,42,0.2)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:-translate-y-0.5 text-sm sm:text-base"
                >
                  <span className="relative z-10">Explore Our Services</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ==========================================
            GOVERNMENT REGISTRATION INFO
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 border border-slate-200 shadow-md overflow-hidden relative"
            >
              {/* Subtle background glow */}
              <div className="absolute -top-20 -right-20 w-56 sm:w-72 h-56 sm:h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Two-column layout on md+ */}
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center relative z-10">

                {/* Left — photo */}
                <div className="w-full md:w-2/5 shrink-0">
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&q=80&auto=format&fit=crop"
                      alt="Government registration office"
                      className="w-full h-44 sm:h-56 md:h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-xs sm:text-sm">MCA Recognized Entity</p>
                      <p className="text-slate-300 text-[11px] sm:text-xs mt-0.5">Ministry of Corporate Affairs, Govt. of India</p>
                    </div>
                  </div>
                </div>

                {/* Right — info */}
                <div className="w-full md:w-3/5">
                  <div className="text-center md:text-left mb-6 sm:mb-8">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 text-blue-700 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4 sm:mb-5">
                      <ShieldCheck size={13} className="shrink-0" />
                      MCA Registered
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2 sm:mb-3">
                      Government Recognized Entity
                    </h3>
                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                      Incorporated under the Ministry of Corporate Affairs, Government of India. Official registration details are transparently displayed below.
                    </p>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Legal Name Card */}
                    <div className="bg-slate-50 hover:bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-md">
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                        Legal Entity Name
                      </p>
                      <p className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        COMPLYWITHCA ADVISORS LLP
                      </p>
                    </div>

                    {/* LLPIN Card */}
                    <div className="bg-slate-50 hover:bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:shadow-md">
                      <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                        LLP Identification Number
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm sm:text-base font-bold text-slate-900 tracking-wider">
                          ACW-0080
                        </p>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText("ACW-0080");
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full transition-all duration-300 shrink-0 ${
                            copied ? "bg-green-100 text-green-700" : "text-blue-600 hover:text-blue-800"
                          }`}
                        >
                          {copied ? "Copied ✓" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 sm:mt-5 text-center md:text-left text-xs text-slate-400">
                    Central Registration Centre · Registrar of Companies · Government of India
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==========================================
            PROCESS TIMELINE SECTION
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 relative bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Section Header */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="text-center mb-10 sm:mb-16 lg:mb-20"
            >
              <h4 className="text-[10px] sm:text-sm font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-4">Workflow Architecture</h4>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 mb-3 sm:mb-5 tracking-tight">
                How We Operate
              </h2>
            </motion.div>

            {/* Timeline Container */}
            <div className="relative max-w-5xl mx-auto">

              {/* Center line — offset left on mobile, centered on desktop */}
              <div className="absolute left-5 sm:left-8 lg:left-1/2 top-0 bottom-0 w-0.5 sm:w-1 bg-slate-200 lg:-translate-x-1/2 rounded-full overflow-hidden">
                <motion.div
                  style={{ height: lineHeight }}
                  className="w-full bg-gradient-to-b from-blue-500 via-indigo-500 to-teal-500 rounded-full"
                />
              </div>

              {/* Process Steps */}
              <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16">
                {processSteps.map((step, index) => {
                  const isEven = index % 2 === 0;

                  return (
                    <div
                      key={step.id}
                      className={`relative flex flex-col lg:flex-row items-start lg:items-center justify-between w-full group ${isEven ? 'lg:flex-row-reverse' : ''}`}
                    >
                      {/* Empty spacer for alternating layout */}
                      <div className="hidden lg:block lg:w-[45%]" />

                      {/* Center Animated Node */}
                      <div className="absolute left-5 sm:left-8 lg:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20 mt-6 lg:mt-0">
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true, margin: "-80px" }}
                          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                          className="w-9 sm:w-11 lg:w-12 h-9 sm:h-11 lg:h-12 bg-white rounded-full border-4 border-slate-100 flex items-center justify-center shadow-lg group-hover:border-blue-100 transition-colors duration-300"
                        >
                          <div className={`w-3 sm:w-3.5 lg:w-4 h-3 sm:h-3.5 lg:h-4 rounded-full bg-gradient-to-br ${step.color} group-hover:scale-150 transition-transform duration-500`} />
                        </motion.div>
                      </div>

                      {/* Content Card */}
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}
                        className="w-full lg:w-[45%] pl-14 sm:pl-20 lg:pl-0"
                      >
                        <div className="relative bg-white p-5 sm:p-7 lg:p-8 rounded-xl sm:rounded-2xl lg:rounded-[2rem] shadow-md border border-slate-200 hover:border-blue-200 hover:shadow-[0_12px_32px_rgb(37,99,235,0.08)] hover:-translate-y-1 transition-all duration-400 overflow-hidden group/card">

                          {/* Photo strip at top of card */}
                          <div className="relative h-28 sm:h-36 -mx-5 sm:-mx-7 lg:-mx-8 -mt-5 sm:-mt-7 lg:-mt-8 mb-4 sm:mb-6 overflow-hidden rounded-t-xl sm:rounded-t-2xl lg:rounded-t-[2rem]">
                            <img
                              src={step.img}
                              alt={step.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
                          </div>

                          {/* Card Hover Glow */}
                          <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${step.color} opacity-0 group-hover/card:opacity-10 rounded-full blur-3xl transition-opacity duration-500`} />

                          <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-5 relative z-10">
                            <div className={`w-10 sm:w-12 lg:w-14 h-10 sm:h-12 lg:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${step.color} p-0.5 shadow-md shrink-0`}>
                              <div className="w-full h-full bg-white rounded-[11px] sm:rounded-[14px] flex items-center justify-center">
                                <step.icon size={18} className="text-slate-800 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                              </div>
                            </div>
                            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-100 tracking-tighter select-none">
                              {step.id}
                            </span>
                          </div>

                          <h3 className="text-base sm:text-lg lg:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 relative z-10">{step.title}</h3>
                          <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed relative z-10">{step.desc}</p>
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
        <section className="py-12 sm:py-16 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
          >
            {/* Background photo */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&auto=format&fit=crop"
                alt="Modern office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/93 via-slate-900/82 to-blue-900/70" />
            </div>

            {/* Glow blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600 rounded-full blur-[100px] opacity-30" />
              <div className="absolute top-1/2 right-0 w-72 h-72 bg-indigo-600 rounded-full blur-[100px] opacity-30" />
            </div>

            <div className="relative z-10 p-7 sm:p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-12">
              <div className="max-w-2xl text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-5 leading-tight tracking-tight">
                  Ready to streamline your compliance?
                </h2>
                <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                  Connect with professionals for consultation tailored specifically to your business architecture.
                </p>
              </div>

              <div className="relative z-10 shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => navigate("/contact")}
                  className="w-full sm:w-auto bg-white text-slate-900 px-7 sm:px-10 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all shadow-[0_0_40px_rgb(255,255,255,0.15)] hover:shadow-[0_0_60px_rgb(255,255,255,0.3)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  Book a Consultation
                </button>
              </div>
            </div>
          </motion.div>
        </section>


      </main>

{/* ==========================================
          FLOATING ACTION BUTTONS
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
          href="https://wa.me/919289758145?text=Hi%20ComplyWithCA,%20I%20would%20like%20to%20book%20a%20consultation."
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
              className="fixed z-[100] max-w-[420px] w-[calc(100%-2rem)] bg-white p-7 sm:p-10 rounded-2xl sm:rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(37,211,102,0.3)] border border-[#25D366]/20 ring-1 ring-slate-900/5 overflow-hidden"
            >
              {/* Green Timer Bar */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 12, ease: "linear" }}
                className="absolute top-0 left-0 h-1.5 bg-[#25D366]"
              />

              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 text-slate-400 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 p-2 sm:p-2.5 rounded-full transition-colors z-10"
              >
                <X size={16} strokeWidth={3} />
              </button>

              <div className="flex flex-col items-center text-center gap-4 sm:gap-6 relative z-0">
                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-2xl sm:rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-[#25D366]/40">
                  <MessageCircle size={28} strokeWidth={2} className="sm:w-9 sm:h-9" />
                </div>

                <div>
                  <h4 className="text-slate-900 font-black text-2xl sm:text-3xl mb-3 sm:mb-4 tracking-tight">Need Expert Clarity?</h4>
                  <p className="text-slate-600 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed font-medium">
                    Compliance architecture can be complex. Let our CA team map out the exact workflow for your startup's technical and financial needs.
                  </p>

                  <button
                    onClick={handlePopupWhatsAppClick}
                    className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white text-base sm:text-lg font-bold py-3.5 sm:py-4 rounded-xl sm:rounded-2xl transition-all shadow-lg shadow-[#25D366]/30 group active:scale-[0.98]"
                  >
                    Chat on WhatsApp
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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