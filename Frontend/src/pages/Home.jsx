import { motion, useScroll, useTransform } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  FileText,
  Building2,
  Briefcase,
  Wallet,
  BookOpen,
  Award,
  Rocket,
  Eye,
  Clock,
  Shield,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import expertImage from "../assets/image3.png";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Footer from '../components/footer';
import { Phone, X, MessageCircle } from "lucide-react";
import React, { useState, useEffect } from 'react';

// ==========================================
// 1. DATA ARRAYS
// ==========================================
const services = [
  {
    icon: FileText,
    title: "GST Services",
    desc: "Comprehensive GST registration, monthly filing, reconciliation, and audit representation.",
    path: "/services/gst-services",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop"
  },
  {
    icon: Building2,
    title: "Business Registration",
    desc: "Fast-track Private Limited, OPC, and LLP incorporation with complete ROC compliance.",
    path: "/services/business-registration",
    img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=800&auto=format&fit=crop"
  },
  {
    icon: Briefcase,
    title: "Firm Registration",
    desc: "Partnership deed drafting and registration services tailored for professional firms.",
    path: "/services/firm-registration",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
  },
  {
    icon: Wallet,
    title: "Income Tax Filing",
    desc: "Strategic tax planning and timely filing of ITR for individuals, startups, and corporations.",
    path: "/services/income-tax-filing",
    img: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400&q=80&auto=format&fit=crop"
  },
  {
    icon: BookOpen,
    title: "Book Consultancy",
    desc: "End-to-end bookkeeping and financial advisory to keep your records audit-ready.",
    path: "/services/book-consultancy",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop"
  },
  {
    icon: Award,
    title: "Certificates",
    desc: "CA Certification services including Net Worth, turnover certificates, and audit reports.",
    path: "/services/certificates",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop"
  }
];

const messages = [
  "Need help with GST or registration?",
  "Talk to a CA expert in minutes.",
  "Get compliance done without stress.",
  "Have questions? We're here to help.",
  "Start your business the right way."
];

const features = [
  { icon: Rocket, title: "Dedicated Startup Support", desc: "Tailored compliance frameworks designed specifically for early-stage ventures to navigate growth stages." },
  { icon: Eye, title: "Transparent Process", desc: "Clear communication and step-by-step visibility into your financial workflows and reporting cycles." },
  { icon: Clock, title: "Timely Filing & Accuracy", desc: "Never miss a deadline with our precision-driven automated filing and reporting system." },
  { icon: Award, title: "Professional Advisory", desc: "Strategic insights and expert guidance to navigate complex regulatory landscapes and tax planning." }
];

const testimonials = [
  {
    quote: "ComplyWithCA made our compliance and documentation process extremely smooth. Their team handled everything professionally and saved us significant time.",
    name: "SetYourWay",
    role: "Management Team"
  },
  {
    quote: "Very reliable and responsive team. They guided us through registrations and compliance with complete clarity.",
    name: "Balaji Garments",
    role: "Operations Team"
  },
  {
    quote: "Professional service and quick turnaround. ComplyWithCA ensured our documentation and filings were handled accurately.",
    name: "O.P. Goyal Traders",
    role: "Business Team"
  },
  {
    quote: "Great experience working with their team. Their structured approach made the entire compliance process stress-free.",
    name: "Satyam Gupta",
    role: "Verified Client"
  }
];

// ==========================================
// 2. ANIMATION VARIANTS
// ==========================================
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40, damping: 15 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

// ==========================================
// 3. CONTACT POPUP (moved outside Home to avoid re-render issues)
// ==========================================
function ContactPopup() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("popupShown")) return;
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMsg);
    const timer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem("popupShown", "true");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => setShow(false), 12000);
    return () => clearTimeout(timer);
  }, [show]);

  const handleWhatsAppClick = () => {
    window.open(
      `https://wa.me/919289758145?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[99]"
        onClick={() => setShow(false)}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: "-50%", y: "-50%" }}
        animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
        exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-50%", filter: "blur(8px)" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ top: "50%", left: "50%" }}
        className="fixed z-[100] max-w-[420px] w-[calc(100%-2rem)] bg-white p-8 sm:p-10 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(37,211,102,0.3)] border border-[#25D366]/20 ring-1 ring-slate-900/5 overflow-hidden"
      >
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 12, ease: "linear" }}
          className="absolute top-0 left-0 h-1.5 bg-[#25D366]"
        />
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition"
        >
          <X size={16} />
        </button>
        <div className="flex flex-col items-center text-center gap-5">
          <div className="w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white rounded-xl flex items-center justify-center shadow-lg shadow-[#25D366]/40">
            <MessageCircle size={28} />
          </div>
          <div>
            <h4 className="text-slate-900 font-black text-2xl mb-3">Need Expert Help?</h4>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">{message}</p>
            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-bold py-3 rounded-xl transition-all shadow-lg shadow-[#25D366]/30 group active:scale-[0.98]"
            >
              Chat on WhatsApp
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ==========================================
// 4. MAIN COMPONENT
// ==========================================
export default function Home() {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const { scrollYProgress } = useScroll();
  // FIX: Disable parallax on mobile — only apply on lg+
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    // FIX: Added overflow-x-hidden here at the very root level
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 overflow-x-hidden w-full max-w-[100vw] selection:bg-blue-200 selection:text-blue-900">

      <Navbar />

      <main className="pt-20 sm:pt-24 overflow-x-hidden">

        {/* ==========================================
            HERO SECTION
            ========================================== */}
        <section
          id="home"
          // FIX: Removed min-h constraints that caused dead space, added overflow-hidden
          className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-10 md:pt-16 pb-10 sm:pb-16 md:pb-24 flex flex-col lg:flex-row items-center overflow-hidden"
        >
          {/* FIX: Constrained background glow so it doesn't bleed right */}
          <div className="hidden sm:block absolute top-0 left-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-[60px] opacity-40 -z-10 pointer-events-none" />

          {/* Left Content */}
          <motion.div
            // FIX: Removed heroY/heroOpacity on mobile via lg: prefix approach
            className="w-full lg:w-1/2 lg:pr-8 xl:pr-12 z-10 text-center lg:text-left"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs sm:text-sm font-bold text-slate-700 mb-4 sm:mb-6 mt-4 sm:mt-6 lg:mt-0"
            >
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500 shrink-0" />
              <span>Premium Professionals in Delhi</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-2xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.08] mb-4 sm:mb-6 tracking-tight"
            >
              Right Compliance.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Right Way.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base xl:text-lg text-slate-600 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Your Trusted Partner for Business Registration, Compliance, and Corporate Advisory in India
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col xs:flex-row flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <Link
                to="/services/book-consultancy"
                className="relative group overflow-hidden bg-slate-900 text-white w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgb(15,23,42,0.18)] hover:shadow-[0_6px_20px_rgb(37,99,235,0.28)] hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <span className="relative z-10">Book Consultation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
              <Link
                to="/services"
                className="bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800 w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold transition-all shadow-sm inline-flex items-center justify-center text-sm sm:text-base"
              >
                View Services
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest"
            >
              <div className="flex items-center gap-1.5"><Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> Corporate Grade</div>
              <div className="flex items-center gap-1.5"><Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> Secure Audit</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> 100% Compliant</div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            // FIX: Removed perspective-[1200px] and rotateY which caused overflow.
            // Added overflow-hidden and strict width control.
            className="w-full lg:w-1/2 mt-6 sm:mt-8 lg:mt-0 relative flex items-center justify-center z-10 overflow-hidden"
          >
            {/* FIX: Glow blob — capped size and kept inside bounds with overflow-hidden parent */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 rounded-full blur-[50px] opacity-20 -z-10 pointer-events-none"
            />

            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              // FIX: Strict max-width on mobile to prevent overflow
              className="relative flex justify-center items-center w-full"
            >
              {/* FIX: Reduced mobile glow size to prevent bleed */}
              <div className="absolute w-[150px] h-[150px] sm:w-[220px] sm:h-[220px] lg:w-[320px] lg:h-[320px] bg-[#1E90FF]/20 blur-[50px] rounded-full pointer-events-none" />
              <img
                src={expertImage}
                alt="ComplyWithCA 3D Expert"
                // FIX: Tightened mobile max-w values to prevent overflow
                className="relative z-10 w-full max-w-[240px] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[580px] xl:max-w-[720px] h-auto object-contain mx-auto"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ==========================================
            CORE SERVICES SECTION
            ========================================== */}
        <section id="services" className="relative bg-slate-100 py-12 sm:py-16 md:py-20 overflow-hidden w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-200 p-5 sm:p-8 md:p-12">

              <motion.div
                className="text-center mb-8 sm:mb-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeInUp}
              >
                <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">Architecture of Compliance</h4>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-3 sm:mb-4 tracking-tight">
                  Our Core Services
                </h2>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={staggerContainer}
              >
                {services.map((service, index) => (
                  <motion.div key={index} variants={fadeInUp} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <Link
                      to={service.path}
                      className="group relative bg-slate-50 border-2 border-slate-200 hover:border-blue-500 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-250 hover:shadow-[0_8px_32px_rgb(37,99,235,0.13)]"
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="relative h-28 sm:h-36 overflow-hidden">
                        <img
                          src={service.img}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent" />
                        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-8 sm:w-9 h-8 sm:h-9 bg-white/95 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
                          <service.icon className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-600" strokeWidth={1.5} />
                        </div>
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </div>

                      <div className="p-4 sm:p-5 flex flex-col flex-1">
                        <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors duration-200 leading-tight">{service.title}</h3>
                          <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-250 shrink-0 ml-2 mt-0.5">
                            <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                          </div>
                        </div>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed flex-grow mb-3 sm:mb-4">{service.desc}</p>
                        <div className="flex items-center gap-2 mt-auto">
                          <span className="text-[10px] sm:text-xs font-bold text-slate-400 group-hover:text-blue-600 uppercase tracking-widest transition-colors duration-200 whitespace-nowrap">
                            Explore Service
                          </span>
                          <div className="flex-1 h-px bg-slate-200 group-hover:bg-blue-200 transition-colors duration-200" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-6 sm:mt-8 flex justify-center">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-slate-200 hover:border-blue-500 text-slate-700 hover:text-blue-600 font-bold text-xs sm:text-sm transition-all duration-200 hover:shadow-[0_4px_16px_rgb(37,99,235,0.1)] bg-white"
                >
                  View All Services <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-4 sm:mx-6 lg:mx-16" />

        {/* ==========================================
            WHY CHOOSE US
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-900 text-white border-t border-slate-800 relative overflow-hidden w-full">

          {/* FIX: Contained glows with pointer-events-none and overflow-hidden on section */}
          <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600 blur-[100px] sm:blur-[120px]" />
            <div className="absolute bottom-0 right-1/3 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600 blur-[100px] sm:blur-[120px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-start">

              {/* LEFT */}
              <motion.div
                className="w-full lg:w-5/12 lg:sticky lg:top-28"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fadeInUp}
              >
                <div className="w-10 h-1 bg-blue-500 mb-5 sm:mb-6 rounded-full" />

                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black leading-[1.1] mb-4 sm:mb-5 tracking-tight">
                  Built for{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    Startups.
                  </span>
                  <br />
                  Structured for{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                    Growth.
                  </span>
                </h2>

                <p className="text-slate-400 mb-5 sm:mb-6 text-sm leading-relaxed max-w-md">
                  We simplify complex compliance so you can focus on scaling your business with confidence.
                </p>

                <a
                  href="https://wa.me/919289758145"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-semibold text-sm mb-5 sm:mb-6 shadow-lg transition-all"
                >
                  Chat with Expert
                </a>

                <div className="relative rounded-lg sm:rounded-xl overflow-hidden mb-4 sm:mb-5 border border-white/10 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80&auto=format&fit=crop"
                    alt="Our team"
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-2 sm:bottom-3 left-3 right-3">
                    <p className="text-white font-semibold text-xs">Expert Team — Delhi</p>
                    <p className="text-slate-300 text-[11px] mt-0.5">Serving clients across India</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 sm:p-4 rounded-xl backdrop-blur-md">
                  <div className="w-9 sm:w-10 h-9 sm:h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center shrink-0">
                    <Shield className="w-4 sm:w-5 h-4 sm:h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">100% Compliance Rate</div>
                    <div className="text-xs text-slate-400">Trusted by 500+ startups</div>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT */}
              <motion.div
                className="w-full lg:w-7/12 flex flex-col gap-4 sm:gap-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={staggerContainer}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                  {features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeInUp}
                      className="bg-white/5 border border-white/10 p-4 sm:p-5 rounded-xl hover:bg-white/10 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(37,99,235,0.15)]"
                    >
                      <div className="text-blue-400 mb-3 sm:mb-4 bg-blue-500/10 w-9 sm:w-10 h-9 sm:h-10 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-4 sm:w-5 h-4 sm:h-5" strokeWidth={1.5} />
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { src: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=400&q=80&auto=format&fit=crop", label: "Tax Planning" },
                    { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80&auto=format&fit=crop", label: "Strategy" },
                    { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80&auto=format&fit=crop", label: "Meetings" },
                  ].map((photo, i) => (
                    <div key={i} className="relative rounded-lg overflow-hidden group">
                      <img
                        src={photo.src}
                        alt={photo.label}
                        className="w-full h-20 sm:h-24 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                      <span className="absolute bottom-1 left-1.5 sm:left-2 text-white text-[9px] sm:text-[10px] font-semibold leading-tight">
                        {photo.label}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ==========================================
            TESTIMONIALS MARQUEE
            ========================================== */}
        {/* FIX: Added w-full and overflow-hidden to contain marquee */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-200 border-y border-slate-300 overflow-hidden relative w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 mb-2 sm:mb-3 tracking-tight">Trusted by Visionaries.</h2>
            <p className="text-slate-500 text-sm sm:text-base font-medium">Empowering enterprises across Delhi with reliable advisory.</p>
          </div>

          <div className="relative w-full flex overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 md:w-40 bg-gradient-to-r from-slate-200 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 md:w-40 bg-gradient-to-l from-slate-200 to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex gap-3 sm:gap-5 w-max px-3 sm:px-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            >
              {duplicatedTestimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 sm:p-7 rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm w-[270px] sm:w-[340px] shrink-0 flex flex-col justify-between hover:shadow-md hover:border-blue-200 transition-all duration-300"
                >
                  <p className="text-slate-600 mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed font-medium italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shrink-0">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name.replace(" ", "")}`}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">{t.name}</div>
                      <div className="text-slate-400 text-[10px] sm:text-xs font-semibold">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==========================================
            BOTTOM CTA
            ========================================== */}
        <section className="bg-slate-100 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="absolute inset-0">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&auto=format&fit=crop"
                  alt="Modern office"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/92 via-slate-900/80 to-blue-900/70" />
              </div>

              {/* FIX: Glows contained within overflow-hidden parent — no bleed */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600 rounded-full blur-[100px] opacity-30" />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-600 rounded-full blur-[100px] opacity-30" />
              </div>

              <div className="relative z-10 p-7 sm:p-10 md:p-16 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">
                  Ready to secure your <br className="hidden sm:block" /> startup's infrastructure?
                </h2>
                <p className="text-slate-300 mb-7 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
                  Join 500+ tech founders who trust ComplyWithCA for their regulatory excellence and strategic financial growth.
                </p>
                <div className="flex justify-center">
                  <a
                    href="https://wa.me/919289758145?text=Hi%20ComplyWithCA,%20I%20would%20like%20to%20book%20a%20consultation."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-7 sm:px-10 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 sm:gap-3 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(37,211,102,0.35)] animate-pulse"
                  >
                    <FaWhatsapp className="text-lg sm:text-xl shrink-0" />
                    Book a Consultation
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
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
      <ContactPopup />
    </div>
  );
}