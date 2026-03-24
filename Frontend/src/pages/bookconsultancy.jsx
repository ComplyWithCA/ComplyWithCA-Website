import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  LineChart,
  PieChart,
  FileSpreadsheet,
  Wallet,
  Calculator,
  ShieldCheck,
  Target,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  Landmark,
  Layers,
  BarChart3,
  Search,
  Phone,
  Mail,
  Sparkles,
  Rocket,
  FileCheck,
  Building2,
  Clock,
  Users,
  ArrowUpRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import expertImage from "../assets/image10.png";
import Footer from '../components/footer';
import emailjs from "@emailjs/browser";
import ConsultationForm from "../components/ConsultationForm";

// Reusable SVG icon
const Building2CustomIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" />
    <path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" />
    <path d="M8 10h.01" /><path d="M8 14h.01" />
  </svg>
);

// ==========================================
// 1. DATA ARRAYS
// ==========================================
const whatIsCards = [
  {
    icon: Landmark,
    title: "GST Compliance Services",
    desc: "Complete GST registration, return filing, reconciliation, and notice handling for businesses of all sizes.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80&auto=format&fit=crop"
  },
  {
    icon: Calculator,
    title: "Income Tax Filing (ITR)",
    desc: "Accurate filing for salaried individuals, business owners, traders, NRIs, and capital gains cases.",
    img: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400&q=80&auto=format&fit=crop"
  },
  {
    icon: Building2CustomIcon,
    title: "Business Registration",
    desc: "Private Limited, LLP, OPC and other structures with end-to-end incorporation support.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80&auto=format&fit=crop"
  }
];

const servicesIncluded = [
  {
    icon: Landmark,
    title: "GST Registration & Filing",
    desc: "New GST registration, monthly/quarterly return filing, ITC reconciliation, and compliance monitoring.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80&auto=format&fit=crop"
  },
  {
    icon: Calculator,
    title: "Income Tax Return (ITR) Filing",
    desc: "Accurate ITR filing for salaried individuals, businesses, traders, NRIs, and capital gains cases.",
    img: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400&q=80&auto=format&fit=crop"
  },
  {
    icon: Building2CustomIcon,
    title: "Business Incorporation",
    desc: "Private Limited, LLP, OPC registration with complete MCA documentation and compliance support.",
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80&auto=format&fit=crop"
  },
  {
    icon: Rocket,
    title: "Startup India & MSME Registration",
    desc: "DPIIT recognition, Startup India benefits, MSME/Udyam registration, and funding-ready structuring.",
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80&auto=format&fit=crop"
  },
  {
    icon: ShieldCheck,
    title: "Ongoing Compliance Support",
    desc: "ROC filings, annual returns, GST annual filing, and structured advisory for long-term compliance.",
    img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80&auto=format&fit=crop"
  },
  {
    icon: FileCheck,
    title: "Notice & Advisory Support",
    desc: "Professional assistance for GST notices, income tax queries, and departmental clarifications.",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80&auto=format&fit=crop"
  }
];

const beyondBenefits = [
  {
    icon: ShieldCheck,
    title: "Complete Regulatory Compliance",
    desc: "Stay fully compliant with GST, Income Tax, ROC, and MCA regulations without last-minute stress or penalties."
  },
  {
    icon: Landmark,
    title: "Structured Legal Foundation",
    desc: "Build your business on the right legal structure — Private Limited, LLP, OPC, or Startup India recognition."
  },
  {
    icon: TrendingUp,
    title: "Growth-Ready Compliance Systems",
    desc: "From GST filings to annual returns, we set up scalable compliance frameworks for long-term business growth."
  },
  {
    icon: Search,
    title: "Notice & Risk Management",
    desc: "Professional handling of GST notices, income tax queries, and departmental communications with clarity and precision."
  }
];

const roadmapSteps = [
  {
    id: "01",
    title: "Initial Assessment",
    desc: "We conduct a deep dive into your current financial systems, identifying gaps and structural inefficiencies.",
    img: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Onboarding & System Setup",
    desc: "Seamless migration of your data to our cloud accounting infrastructure (Tally, Zoho, or QuickBooks).",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Monthly Reporting & Review",
    desc: "Continuous ledger management followed by strategic monthly syncs with your dedicated financial advisor.",
    img: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=500&q=80&auto=format&fit=crop"
  }
];

const faqs = [
  {
    q: "How does virtual book consultancy work?",
    a: "We integrate with your business digitally. You upload your invoices and statements to our secure portal, and our CA team manages your books remotely, providing you with a real-time dashboard of your financials."
  },
  {
    q: "Do you help with past unstructured data?",
    a: "Yes. We offer a 'Cleanup Service' where we retroactively organize, reconcile, and digitize months or years of messy financial records to bring you up to date."
  },
  {
    q: "Is my financial data secure with you?",
    a: "Absolutely. We use bank-level, 256-bit encryption for all document transfers and cloud accounting software, ensuring total confidentiality and data security."
  }
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
// 3. MAIN COMPONENT
// ==========================================
export default function BookConsultancy() {
  const [openFaq, setOpenFaq] = useState(0);
  const navigate = useNavigate();

  const handleWhatsAppChat = (e, context = "Book Consultancy & Financial Advisory") => {
    if (e) e.stopPropagation();
    const phoneNumber = "919289758145";
    const message = `Hi! I want to discuss ${context} for my business.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      <Navbar />

      <main className="pt-24 pb-12 sm:pb-20">

        {/* ==========================================
            HERO SECTION — matches Home/About/Services/GST
            ========================================== */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-8 pb-16 md:pb-24 flex flex-col lg:flex-row items-center min-h-[70vh]">

          {/* Background glow */}
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-[60px] -z-10 -translate-x-1/3 -translate-y-1/4" />

          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full lg:w-1/2 lg:pr-8 xl:pr-12 z-10 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs sm:text-sm font-bold text-slate-700 mb-4 sm:mb-6 mt-4 sm:mt-6 lg:mt-0"
            >
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-blue-500 shrink-0" /> Corporate Financial Systems
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.08] mb-4 sm:mb-6 tracking-tight"
            >
              Book Consultancy &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Financial Advisory
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base xl:text-lg text-slate-600 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Structured accounting, compliance tracking, and strategic financial modeling led by senior CAs to engineer your enterprise's growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col xs:flex-row flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <button
                onClick={() => document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth" })}
                className="relative group overflow-hidden bg-slate-900 text-white w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgb(15,23,42,0.18)] hover:shadow-[0_6px_20px_rgb(37,99,235,0.28)] hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <span className="relative z-10">Book Free Consultation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>
              <button
                onClick={(e) => handleWhatsAppChat(e, "Financial Advisory Services")}
                className="bg-white border border-slate-200 hover:border-green-300 hover:bg-green-50 text-slate-800 hover:text-green-700 w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4 shrink-0" /> Chat on WhatsApp
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={fadeUp}
              className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest"
            >
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" /> Govt Registered</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" /> 100% Compliant</div>
              <div className="flex items-center gap-1.5"><Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5 shrink-0" /> Fast Turnaround</div>
            </motion.div>
          </motion.div>

          {/* Right: 3D Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="w-full lg:w-1/2 mt-8 sm:mt-12 lg:mt-0 relative flex items-center justify-center perspective-[1200px] z-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute w-[70%] h-[70%] max-w-[400px] max-h-[400px] bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 rounded-full blur-[60px] opacity-25 -z-10"
            />
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex justify-center items-center w-full"
            >
              <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] xl:w-[480px] xl:h-[480px] bg-[#1E90FF]/20 blur-[70px] rounded-full" />
              <img
                src={expertImage}
                alt="ComplyWithCA Financial Expert"
                className="relative z-30 w-[700px] lg:w-[900px] xl:w-[1050px] h-auto object-contain transition-all duration-700 ease-out hover:scale-[1.06] hover:-rotate-1 origin-bottom max-w-full"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ==========================================
            WHAT IS BOOK CONSULTANCY?
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-200 p-6 sm:p-8 md:p-12">

              <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-center">

                {/* Left text */}
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="text-center lg:text-left"
                >
                  <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">About This Service</h4>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight leading-tight">
                    Complete Compliance & Registration Solutions
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5 font-medium">
                    We provide structured GST, Income Tax, and business registration services designed to keep your enterprise legally secure and growth-ready. From new registrations to ongoing filings, we ensure clarity at every step.
                  </p>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 font-medium">
                    Whether you are launching a startup, filing your ITR, or managing monthly GST compliance, our team builds systems that protect your business and support long-term expansion.
                  </p>
                  <button
                    onClick={() => navigate('/services')}
                    className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm sm:text-base hover:gap-3 transition-all"
                  >
                    Explore our services <ArrowRight size={16} />
                  </button>
                </motion.div>

                {/* Right: cards with photos */}
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                  className="flex flex-col gap-3 sm:gap-4"
                >
                  {whatIsCards.map((card, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeUp}
                      className="group bg-slate-50 border-2 border-slate-200 hover:border-blue-500 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgb(37,99,235,0.1)] hover:-translate-y-0.5"
                    >
                      <div className="flex items-stretch gap-0">
                        {/* Photo strip */}
                        <div className="relative w-20 sm:w-24 shrink-0 overflow-hidden">
                          <img
                            src={card.img}
                            alt={card.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-50/60" />
                        </div>
                        {/* Content */}
                        <div className="flex items-center gap-3 p-4 sm:p-5 flex-1">
                          <div className="w-9 sm:w-10 h-9 sm:h-10 bg-blue-50 text-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                            <card.icon size={16} strokeWidth={1.5} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-0.5 group-hover:text-blue-700 transition-colors">{card.title}</h4>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{card.desc}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            FREE CONSULTATION FORM
            ========================================== */}
        <section id="consultation-form" className="py-12 sm:py-16 md:py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section header */}
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-400 uppercase mb-2 sm:mb-3">Free Consultation</h4>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-2 sm:mb-3">
                Book Your Free Financial Consultation
              </h2>
              <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Speak directly with our senior CA advisory team. We will review your financial structure, compliance gaps, and growth strategy.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">

              {/* Left: benefits + photo collage */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              >
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  {[
                    "Personalized Financial Roadmap",
                    "Compliance Gap Review",
                    "Tax Optimization Strategy",
                    "Cashflow & Growth Planning"
                  ].map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                      <CheckCircle2 className="text-blue-400 shrink-0" size={16} />
                      <span className="text-slate-300 font-medium text-sm sm:text-base">{point}</span>
                    </div>
                  ))}
                </div>

                {/* Photo collage */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80&auto=format&fit=crop", label: "Our Team" },
                    { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80&auto=format&fit=crop", label: "Strategy" },
                    { src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80&auto=format&fit=crop", label: "Advisory" },
                  ].map((photo, i) => (
                    <div key={i} className="relative rounded-lg sm:rounded-xl overflow-hidden group/photo">
                      <img src={photo.src} alt={photo.label} className="w-full h-20 sm:h-24 object-cover transition-transform duration-500 group-hover/photo:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                      <span className="absolute bottom-1.5 left-2 text-white text-[9px] sm:text-[10px] font-semibold">{photo.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Form Component */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              >
                <ConsultationForm defaultService="Book Consultancy" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==========================================
            BEYOND BOOKKEEPING — Trust Partners
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-200 p-6 sm:p-8 md:p-12">

              <div className="flex flex-col lg:flex-row gap-10 sm:gap-14 lg:gap-16 items-center">

                {/* Left */}
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="lg:w-1/3 text-center lg:text-left"
                >
                  <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">Why Choose Us</h4>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4 sm:mb-5 leading-[1.1] tracking-tight">
                    Your <br className="hidden lg:block" />Trust.<br />
                    <span className="text-blue-600">Partners.</span>
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 font-medium">
                    We don't just handle compliance. We design scalable legal and tax frameworks that support sustainable business growth.
                  </p>
                  <div className="w-10 sm:w-12 h-1 sm:h-1.5 bg-blue-600 rounded-full mx-auto lg:mx-0" />

                  {/* Office photo */}
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden mt-6 border border-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80&auto=format&fit=crop"
                      alt="Our team"
                      className="w-full h-36 sm:h-44 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-bold text-xs">Expert Team — Delhi, India</p>
                      <p className="text-slate-300 text-[11px] mt-0.5">Trusted by 500+ businesses</p>
                    </div>
                  </div>
                </motion.div>

                {/* Right: benefit cards */}
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                  className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
                >
                  {beyondBenefits.map((b, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeUp}
                      className="group bg-slate-50 border-2 border-slate-200 hover:border-blue-400 p-5 sm:p-6 rounded-xl sm:rounded-2xl hover:shadow-[0_8px_24px_rgb(37,99,235,0.08)] transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 sm:w-10 h-9 sm:h-10 bg-indigo-50 text-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                          <b.icon size={16} strokeWidth={2} />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">{b.title}</h4>
                      </div>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{b.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            ₹299 CONSULTATION PACKAGE
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">Pricing</h4>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-2 sm:mb-3">Expert Consultation</h2>
              <p className="text-slate-500 text-sm sm:text-base font-medium">Structured guidance for GST, ITR & Business Registration.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 60, damping: 15 }}
              className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[#25D366] shadow-[0_12px_48px_rgba(37,211,102,0.15)]"
            >
              {/* Background photo */}
              <div className="absolute inset-0 opacity-5">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop"
                  alt="Office"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="relative z-10 p-7 sm:p-10 md:p-14 text-center">
                {/* Badge */}
                <div className="inline-block mb-5 sm:mb-6 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-[10px] sm:text-xs font-bold tracking-widest px-5 sm:px-6 py-1.5 sm:py-2 rounded-full shadow-md">
                  LIMITED TIME OFFER
                </div>

                {/* Price */}
                <div className="mb-6 sm:mb-8">
                  <span className="text-5xl sm:text-6xl font-black text-slate-900">₹299</span>
                  <p className="text-slate-400 text-xs sm:text-sm mt-2">One-Time Professional Consultation</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-12 max-w-md mx-auto text-left">
                  {[
                    "Personalized GST / ITR Guidance",
                    "Business Structure Recommendation",
                    "Compliance & Risk Assessment",
                    "Startup & Registration Advisory",
                    "Direct Expert Support"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 sm:gap-3 text-slate-600 font-medium text-sm sm:text-base">
                      <CheckCircle2 size={17} className="text-[#25D366] shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={(e) => handleWhatsAppChat(e, "₹299 Consultation Package")}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 sm:px-12 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-2 sm:gap-3 mx-auto hover:-translate-y-1 active:scale-95"
                >
                  <MessageCircle size={18} className="shrink-0" />
                  Book Consultation Now
                </button>

                <p className="text-center mt-4 sm:mt-6 text-[10px] sm:text-xs text-slate-400 tracking-widest font-semibold uppercase">
                  No Hidden Charges
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==========================================
            ROADMAP TIMELINE — with photos
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-200 p-6 sm:p-8 md:p-12">

              <motion.div
                className="text-center mb-8 sm:mb-12"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              >
                <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">How We Work</h4>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-2 sm:mb-3 tracking-tight">The Consultancy Roadmap</h2>
                <p className="text-slate-500 text-sm sm:text-base font-medium">How we integrate with your business.</p>
              </motion.div>

              <div className="relative max-w-4xl mx-auto">
                {/* Center line */}
                <div className="absolute left-5 sm:left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 md:-translate-x-1/2" />

                <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
                  {roadmapSteps.map((step, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <div
                        key={step.id}
                        className={`relative flex flex-col md:flex-row items-start md:items-center justify-between w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}
                      >
                        <div className="hidden md:block md:w-[45%]" />

                        {/* Node */}
                        <div className="absolute left-5 sm:left-6 md:left-1/2 transform -translate-x-1/2 z-20 mt-5 md:mt-0">
                          <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                            <span className="font-bold text-xs sm:text-sm">{step.id}</span>
                          </div>
                        </div>

                        {/* Card with photo */}
                        <motion.div
                          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                          className="w-full md:w-[45%] pl-14 sm:pl-16 md:pl-0"
                        >
                          <div className="bg-slate-50 border-2 border-slate-200 group-hover:border-blue-400 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-[0_8px_24px_rgb(37,99,235,0.1)]">
                            <div className="relative h-24 sm:h-28 overflow-hidden">
                              <img
                                src={step.img}
                                alt={step.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-transparent" />
                            </div>
                            <div className="p-4 sm:p-5">
                              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 sm:mb-2">{step.title}</h3>
                              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            FAQ SECTION
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">FAQ</h4>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            </motion.div>

            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:border-blue-200 transition-colors">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base pr-4 sm:pr-8 leading-snug">{faq.q}</span>
                    <ChevronDown className={`w-4 sm:w-5 h-4 sm:h-5 shrink-0 text-slate-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3 sm:pt-4 font-medium">
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
            BOTTOM CTA — with background photo
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-100">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="relative rounded-2xl overflow-hidden"
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

              {/* Green ambient glows */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#25D366]/15 rounded-full blur-[100px] -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#25D366]/15 rounded-full blur-[100px] translate-y-1/2" />
              </div>

              <div className="relative z-10 p-7 sm:p-10 md:p-16 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                  Build Strong Financial Foundations.
                </h2>
                <p className="text-slate-300 text-sm sm:text-base lg:text-lg mb-7 sm:mb-10 max-w-xl mx-auto font-medium leading-relaxed">
                  Join high-growth startups and established enterprises that trust ComplyWithCA with their day-to-day financial operations.
                </p>
                <button
                  onClick={(e) => handleWhatsAppChat(e, "Book Consultancy & Financial Advisory")}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-7 sm:px-10 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all shadow-[0_0_30px_rgba(37,211,102,0.35)] flex items-center justify-center gap-2 sm:gap-3 mx-auto hover:scale-105 active:scale-95"
                >
                  <MessageCircle size={18} className="shrink-0" />
                  Chat on WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}