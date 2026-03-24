import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  Calculator,
  Briefcase,
  Building2,
  FileText,
  Globe,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  PieChart,
  TrendingUp,
  FileCheck,
  ChevronDown,
  Lock,
  Landmark,
  Coins,
  BadgePercent,
  TrendingDown,
  AlertTriangle,
  Sparkles,
  Clock,
  Search
} from 'lucide-react';
import Navbar from '../components/Navbar';
import expertImage from "../assets/image9.png";
import Footer from '../components/footer';
import emailjs from "@emailjs/browser";
import { FaWhatsapp } from "react-icons/fa";

const serviceName = "Income Tax Filing";

const inputStyle =
  "w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-white text-sm";

// ==========================================
// 1. DATA ARRAYS
// ==========================================
const targetAudience = [
  {
    icon: Briefcase,
    title: "Salaried Individuals",
    desc: "Maximize your take-home pay with expert deductions and exact Form 16 mapping.",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80&auto=format&fit=crop"
  },
  {
    icon: PieChart,
    title: "Freelancers",
    desc: "Section 44ADA presumptive taxation to minimize complex bookkeeping.",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80&auto=format&fit=crop"
  },
  {
    icon: Building2,
    title: "Businesses",
    desc: "Comprehensive ITR filing for proprietorships, partnerships, and private limited firms.",
    img: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=400&q=80&auto=format&fit=crop"
  },
  {
    icon: Globe,
    title: "NRIs",
    desc: "Seamless handling of DTAA, foreign income, and Indian asset liquidations.",
    img: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=400&q=80&auto=format&fit=crop"
  }
];

const includedServices = [
  { icon: FileText, title: "ITR Filing", desc: "End-to-end preparation and e-filing of ITR-1 through ITR-7 based on your exact profile." },
  { icon: TrendingUp, title: "Capital Gains", desc: "Detailed calculation for mutual funds, stocks, and real estate transactions." },
  { icon: Landmark, title: "Business Income", desc: "P&L generation and balance sheet alignment for meticulous professional reporting." },
  { icon: Coins, title: "Crypto Tax Handling", desc: "Precise navigation of the 30% VDA tax and 1% TDS requirements." },
  { icon: ShieldCheck, title: "Notice Resolution", desc: "Expert response drafting for income tax notices or defective returns." },
  { icon: BadgePercent, title: "Tax Refund Tracking", desc: "Continuous monitoring and follow-ups for expedited tax refunds." }
];

const knowledgeCards = [
  { icon: Landmark, title: "Loan & Credit Approvals", desc: "Banks mandate the last 3 years of ITR receipts to process home, auto, or business loans. It acts as your ultimate income proof." },
  { icon: Globe, title: "Smooth Visa Processing", desc: "Foreign embassies (US, UK, Schengen) strictly require ITR proofs to establish your financial stability for travel or work visas." },
  { icon: TrendingDown, title: "Carry Forward Losses", desc: "Filing on time allows you to carry forward business or capital losses for up to 8 years to offset future tax liabilities." },
  { icon: BadgePercent, title: "Claim TDS Refunds", desc: "If TDS was deducted from your salary, FDs, or freelance payments, filing your ITR is the only legal way to claim that money back." }
];

const splitFeatures = [
  { title: "Tax Optimization", desc: "We don't just file; we analyze your investments to ensure you claim every legal deduction available under Chapter VI-A." },
  { title: "Capital Gains Handling", desc: "Intelligent offset of short-term and long-term capital losses to minimize your overall tax burden." },
  { title: "Error-Free Execution", desc: "Multi-tier professional verification process ensures your return is flawless, avoiding departmental notices." }
];

const pricingTiers = [
  {
    name: "ITR 1",
    price: "₹999",
    subtitle: "/ one-time",
    desc: "Basic Salary & Other Income",
    features: [
      "Salary Income (Form 16)",
      "One House Property",
      "Other Income (Interest etc.)",
      "Basic Deductions (80C, 80D)"
    ],
    popular: false,
  },
  {
    name: "ITR 2",
    price: "₹1,999",
    subtitle: "/ one-time",
    desc: "Salary + Stock + Mutual Fund Gain",
    features: [
      "Capital Gains (Shares & Mutual Funds)",
      "Multiple House Properties",
      "Foreign Assets (if applicable)",
      "Comprehensive Tax Computation"
    ],
    popular: true,
    badge: "Most Popular"
  },
  {
    name: "ITR 3",
    price: "₹2,999",
    subtitle: "/ one-time",
    desc: "Salary + F&O + Intraday Income",
    features: [
      "F&O / Intraday Trading",
      "Business & Professional Income",
      "Balance Sheet & P&L Preparation",
      "Advance Tax Computation"
    ],
    popular: false,
  },
  {
    name: "ITR 4",
    price: "₹999",
    subtitle: "/ one-time",
    desc: "Only Business Income (Presumptive)",
    features: [
      "Presumptive Taxation (44AD/44ADA)",
      "Small Business Filing",
      "Turnover Declaration",
      "Basic Compliance Review"
    ],
    popular: false,
  }
];

const processSteps = [
  {
    id: "01",
    title: "Document Upload",
    desc: "Securely upload your Form 16, bank statements, and investment proofs via our encrypted portal.",
    icon: FileCheck,
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Tax Computation",
    desc: "Our team calculates your liabilities, optimizes deductions, and shares a detailed draft.",
    icon: Calculator,
    img: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Filing & Confirmation",
    desc: "Upon your approval, we file the ITR securely and share the official acknowledgement (ITR-V).",
    icon: CheckCircle2,
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80&auto=format&fit=crop"
  }
];

const faqs = [
  { q: "What is the deadline for filing Income Tax Returns?", a: "For individuals and non-audit cases, the deadline is generally July 31st of the assessment year. For audit cases, it is October 31st." },
  { q: "What documents do I need to provide?", a: "Typically, you need your PAN, Aadhaar, Form 16 (for salaried), bank statements, investment proofs (LIC, PPF, etc.), and details of any property or capital gains." },
  { q: "Do I have to pay taxes on Crypto assets?", a: "Yes. Virtual Digital Assets (VDAs) including cryptocurrencies are taxed at a flat 30%, plus applicable surcharge and cess, without any deduction for expenses other than the cost of acquisition." },
  { q: "What if I missed the deadline?", a: "You can file a belated return until December 31st of the assessment year, but it may attract a late fee of up to ₹5,000 and interest on taxes owed." }
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
export default function IncomeTaxFiling() {
  const [openFaq, setOpenFaq] = useState(0);
  const navigate = useNavigate();

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    document.body.style.overflow = isPanelOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isPanelOpen]);

  const [itrForm, setItrForm] = useState({
    name: "", email: "", phone: "", contactMode: "", itrType: "",
    incomeSource: "", incomeRange: "", capitalGains: "", foreignAssets: "",
    noticeReceived: "", timeline: "", message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItrForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppChat = (e, context = "Income Tax Filing") => {
    if (e) e.stopPropagation();
    const phoneNumber = "919289758145";
    const message = `Hi! I want to consult regarding ${context}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const calculateLeadScore = () => {
    let score = 30;
    if (itrForm.itrType === "Business") score += 25;
    if (itrForm.capitalGains === "Yes") score += 15;
    if (itrForm.foreignAssets === "Yes") score += 20;
    if (itrForm.noticeReceived === "Yes") score += 25;
    if (itrForm.incomeRange === "Above 25L") score += 20;
    if (itrForm.timeline === "Immediate") score += 10;
    return score;
  };

  const validateStep = () => {
    if (step === 1) return itrForm.name && itrForm.email && itrForm.phone && itrForm.contactMode;
    if (step === 2) return itrForm.itrType && itrForm.incomeSource;
    if (step === 3) return itrForm.incomeRange && itrForm.timeline;
    return true;
  };

  const getDynamicFields = () => {
    return `ITR Type: ${itrForm.itrType || "-"} \nIncome Source: ${itrForm.incomeSource || "-"} \nIncome Range: ${itrForm.incomeRange || "-"} \nCapital Gains: ${itrForm.capitalGains || "-"} \nForeign Assets: ${itrForm.foreignAssets || "-"} \nNotice Received: ${itrForm.noticeReceived || "-"}`;
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      alert("Please complete required fields.");
      return;
    }
    try {
      setIsSubmitting(true);
      const leadScore = calculateLeadScore();
      const priority = leadScore >= 70 ? "HIGH PRIORITY" : "STANDARD";
      const templateParams = {
        serviceName, name: itrForm.name, email: itrForm.email, phone: itrForm.phone,
        contactMode: itrForm.contactMode, timeline: itrForm.timeline, message: itrForm.message || "-",
        dynamicFields: getDynamicFields(), leadScore, priority
      };
      await emailjs.send("service_ghj2doe", "template_qkg4m4s", templateParams, "KJ9IR47xK9gNAOEYd");
      alert("Income Tax request submitted successfully!");
      setItrForm({
        name: "", email: "", phone: "", contactMode: "", itrType: "", incomeSource: "",
        incomeRange: "", capitalGains: "", foreignAssets: "", noticeReceived: "", timeline: "", message: ""
      });
      setStep(1);
      setIsPanelOpen(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      <Navbar />

      <main className="pt-24 pb-12 sm:pb-20">

        {/* ==========================================
            HERO SECTION
            ========================================== */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
          pt-8 sm:pt-12 md:pt-16
          pb-10 sm:pb-16 md:pb-24
          flex flex-col lg:flex-row items-center
          min-h-[auto] lg:min-h-[70vh]">

          {/* Background glow */}
          <div className="hidden sm:block absolute top-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-[60px] -z-10 -translate-x-1/3 -translate-y-1/4" />

          {/* LEFT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full lg:w-1/2 lg:pr-8 xl:pr-12 z-10 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs sm:text-sm font-bold text-slate-700 mb-4 sm:mb-6 mt-4 sm:mt-6 lg:mt-0"
            >
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-blue-500" />
              <span>Proactive Tax Planning</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.08] mb-4 sm:mb-6 tracking-tight"
            >
              Income Tax{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Filing Services
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base xl:text-lg text-slate-600 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Accurate, optimized, and stress-free ITR filing guided by senior Professionals. We protect your wealth while ensuring 100% compliance.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col xs:flex-row flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <button
                onClick={() => setIsPanelOpen(true)}
                className="relative group overflow-hidden bg-slate-900 text-white w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgb(15,23,42,0.18)] hover:shadow-[0_6px_20px_rgb(37,99,235,0.28)] hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <span className="relative z-10">File Your ITR Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={(e) => handleWhatsAppChat(e, "ITR Services")}
                className="bg-white border border-slate-200 hover:border-green-300 hover:bg-green-50 text-slate-800 hover:text-green-700 w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeUp}
              className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> 100% Secure
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> Expert Reviewed
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> Fast Turnaround
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 mt-8 sm:mt-12 lg:mt-0 relative flex items-center justify-center perspective-[1200px] z-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute w-[60%] sm:w-[70%] h-[60%] sm:h-[70%] max-w-[300px] sm:max-w-[400px] max-h-[300px] sm:max-h-[400px] bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 rounded-full blur-[50px] sm:blur-[60px] opacity-20 sm:opacity-25 -z-10"
            />
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex justify-center items-center w-full"
            >
              <div className="absolute w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] lg:w-[380px] lg:h-[380px] xl:w-[480px] xl:h-[480px] bg-[#1E90FF]/20 blur-[60px] rounded-full" />
              <img
                src={expertImage}
                alt="ComplyWithCA Tax Expert"
                className="relative z-30 w-[340px] sm:w-[500px] md:w-[620px] lg:w-[900px] xl:w-[1050px] object-contain transition-all duration-700 ease-out hover:scale-[1.04] hover:-rotate-1 origin-bottom max-w-full"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ==========================================
            WHO WE HELP — Photo Card Style
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-200 p-6 sm:p-8 md:p-12">

              <div className="flex flex-col lg:flex-row gap-10 sm:gap-14 lg:gap-16 items-center">

                {/* Left text */}
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="lg:w-5/12 text-center lg:text-left"
                >
                  <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">Targeted Expertise</h4>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4 sm:mb-6 leading-tight tracking-tight">
                    Who We Help
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base mb-5 sm:mb-8 leading-relaxed font-medium">
                    Whether you're a salaried professional, a freelancer navigating presumptive taxation, or an NRI with complex cross-border assets — our senior professionals tailor every filing to your exact situation.
                  </p>
                  <div className="pl-4 sm:pl-6 border-l-4 border-blue-600 py-2">
                    <p className="text-xs sm:text-sm font-bold text-slate-500 italic">"Every rupee saved in taxes is a rupee earned for your future."</p>
                  </div>
                </motion.div>

                {/* Right: photo cards */}
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                  className="lg:w-7/12 grid grid-cols-2 gap-3 sm:gap-4"
                >
                  {targetAudience.map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeUp}
                      className="group bg-slate-50 border-2 border-slate-200 hover:border-blue-500 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgb(37,99,235,0.1)] hover:-translate-y-1"
                    >
                      {/* Photo */}
                      <div className="relative h-28 sm:h-32 overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent" />
                        <div className="absolute top-2 left-2 w-8 h-8 bg-white/95 rounded-lg flex items-center justify-center shadow-md">
                          <item.icon size={14} className="text-blue-600" strokeWidth={1.5} />
                        </div>
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-700 transition-colors">{item.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            PRICING TIERS
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">Simple Pricing</h4>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-2 sm:mb-3">
                ITR Filing Packages
              </h2>
              <p className="text-slate-500 text-sm sm:text-base font-medium">Transparent filing solutions based on your income profile.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {pricingTiers.map((tier, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <motion.div
                    key={idx}
                    onMouseEnter={() => setActiveIndex(idx)}
                    initial={false}
                    animate={{ y: isActive ? -8 : 0, scale: isActive ? 1.02 : 1 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                    className={`relative rounded-2xl p-6 sm:p-7 bg-white transition-all duration-300 ${
                      isActive
                        ? "border-2 border-green-500 shadow-[0_12px_40px_rgba(34,197,94,0.15)]"
                        : "border border-slate-200 shadow-md"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute -inset-1.5 bg-green-500/8 blur-xl rounded-2xl -z-10" />
                    )}
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase whitespace-nowrap">
                        {tier.badge}
                      </div>
                    )}

                    <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                      {tier.name}
                    </h3>

                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      {tier.desc}
                    </p>

                    <div className="flex items-baseline gap-1.5 mb-5 sm:mb-6">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900">{tier.price}</span>
                      <span className="text-xs sm:text-sm text-slate-400">{tier.subtitle}</span>
                    </div>

                    <div className="h-px bg-slate-100 mb-5 sm:mb-6" />

                    <ul className="space-y-3 mb-6 sm:mb-8">
                      {tier.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                          <CheckCircle2
                            size={15}
                            className={`mt-0.5 shrink-0 transition-colors ${isActive ? "text-green-500" : "text-slate-400"}`}
                          />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={(e) => handleWhatsAppChat(e, tier.name)}
                      className={`w-full py-3 sm:py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                        isActive
                          ? "bg-green-500 text-white shadow-lg shadow-green-500/25 hover:bg-green-600"
                          : "bg-slate-100 text-slate-800 hover:bg-green-50 hover:text-green-600"
                      }`}
                    >
                      <FaWhatsapp className="text-base shrink-0" />
                      Start Filing
                    </button>

                    <p className="text-center mt-3 sm:mt-4 text-[10px] text-slate-400 uppercase tracking-widest">
                      Taxes As Per Applicable Law
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==========================================
            WHAT'S INCLUDED
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600 blur-[100px] sm:blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600 blur-[100px] sm:blur-[120px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-400 uppercase mb-2 sm:mb-3">Full Spectrum</h4>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 tracking-tight">
                What's Included in Every Filing
              </h2>
              <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full" />
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
            >
              {includedServices.map((service, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="group bg-white/5 border border-white/10 p-5 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(37,99,235,0.15)]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 sm:w-10 h-9 sm:h-10 bg-blue-500/15 text-blue-400 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
                      <service.icon size={16} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white">{service.title}</h3>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==========================================
            WHY ITR MATTERS — Knowledge Section
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-200 p-6 sm:p-8 md:p-12">

              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="mb-8 sm:mb-12"
              >
                <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">Expert Insight</h4>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-3 sm:mb-4 leading-tight tracking-tight max-w-2xl">
                  Why ITR is More Than Just Compliance.
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium max-w-2xl">
                  Filing your Income Tax Return isn't just about avoiding penalties. It is the ultimate financial document that acts as a passport to capital, global travel, and reclaiming your own money.
                </p>
              </motion.div>

              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8"
              >
                {knowledgeCards.map((card, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUp}
                    className="group bg-slate-50 border-2 border-slate-200 hover:border-blue-500 rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_8px_24px_rgb(37,99,235,0.1)] hover:-translate-y-1"
                  >
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <card.icon size={18} strokeWidth={1.5} />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-2 group-hover:text-blue-700 transition-colors">{card.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{card.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Warning Note */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="bg-rose-50 border border-rose-200 rounded-2xl p-5 sm:p-6 flex items-start gap-4"
              >
                <div className="text-rose-500 shrink-0 mt-0.5"><AlertTriangle size={20} /></div>
                <p className="text-sm text-rose-700 font-medium leading-relaxed">
                  <strong className="text-rose-600">Important Note:</strong> The Income Tax Department is leveraging AI to track high-value transactions (credit cards, mutual funds, property). Failing to file an ITR when your transactions cross certain thresholds triggers automatic compliance notices.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==========================================
            FEATURE SPLIT — Plan Smart
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-200 p-6 sm:p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-10 sm:gap-14 lg:gap-16 items-start">

                {/* Sticky Left */}
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="lg:w-5/12 lg:sticky lg:top-32 text-center lg:text-left"
                >
                  <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">Our Advantage</h4>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-5 sm:mb-6 leading-tight tracking-tight">
                    Plan Smart.<br />
                    File Accurate.<br />
                    <span className="text-blue-600">Stay Compliant.</span>
                  </h2>

                  <ul className="space-y-4 mb-8">
                    <li className="flex items-center gap-3 text-slate-700 font-bold text-sm sm:text-base">
                      <CheckCircle2 className="text-green-500 shrink-0" size={18} /> 100% Secure Data Encryption
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-bold text-sm sm:text-base">
                      <ShieldCheck className="text-blue-500 shrink-0" size={18} /> Professional Representation Guarantee
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-bold text-sm sm:text-base">
                      <Lock className="text-indigo-500 shrink-0" size={18} /> No Hidden Fee Architecture
                    </li>
                  </ul>
                </motion.div>

                {/* Right Cards */}
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                  className="lg:w-7/12 flex flex-col gap-4 sm:gap-5"
                >
                  {splitFeatures.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      variants={fadeUp}
                      className="bg-slate-50 border-2 border-slate-200 hover:border-blue-400 p-6 sm:p-7 rounded-xl sm:rounded-2xl transition-all duration-300 hover:shadow-[0_8px_24px_rgb(37,99,235,0.08)]"
                    >
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            HOW IT WORKS — Timeline with Photos
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-200 p-6 sm:p-8 md:p-12">

              <motion.div
                className="text-center mb-8 sm:mb-12"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              >
                <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">How It Works</h4>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-2 sm:mb-3 tracking-tight">Our Seamless Process</h2>
                <p className="text-slate-500 text-sm sm:text-base font-medium">A simple 3-step digital process.</p>
              </motion.div>

              {/* Timeline */}
              <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-5 sm:left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 md:-translate-x-1/2" />

                <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
                  {processSteps.map((step, index) => {
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
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                                  <step.icon size={14} className="text-blue-600" />
                                </div>
                                <h3 className="text-sm sm:text-base font-bold text-slate-900">{step.title}</h3>
                              </div>
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
                    className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left bg-white hover:bg-slate-50 transition-colors"
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

              {/* Glow */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] bg-blue-600/25 blur-[100px] sm:blur-[120px] rounded-full" />
              </div>

              <div className="relative z-10 p-7 sm:p-10 md:p-16 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                  Stay Tax Compliant the Right Way.
                </h2>
                <p className="text-slate-300 text-sm sm:text-base lg:text-lg mb-7 sm:mb-10 max-w-xl mx-auto font-medium leading-relaxed">
                  Connect with our dedicated Professionals via WhatsApp to file your income tax returns efficiently and accurately.
                </p>
                <button
                  onClick={(e) => handleWhatsAppChat(e, "Tax Filing Package")}
                  className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-7 sm:px-10 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all shadow-[0_0_30px_rgba(37,211,102,0.35)] flex items-center justify-center gap-2 sm:gap-3 mx-auto hover:scale-105 active:scale-95 animate-pulse"
                >
                  <FaWhatsapp className="text-lg sm:text-2xl shrink-0" />
                  Chat on WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ==========================================
          SLIDE PANEL FORM
          ========================================== */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
              onClick={() => setIsPanelOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[520px] bg-gradient-to-b from-white to-slate-50 z-[9999] shadow-[0_20px_80px_rgba(0,0,0,0.25)] border-l border-slate-200 flex flex-col"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/80 backdrop-blur-md z-20 px-5 sm:px-8 pt-5 sm:pt-8 pb-4 sm:pb-6 border-b border-slate-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-slate-900">{serviceName} Intake</h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">Secure • Structured • Priority Scored</p>
                  </div>
                  <button
                    onClick={() => setIsPanelOpen(false)}
                    className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition text-slate-600 text-sm"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-6">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 sm:h-2 flex-1 rounded-full transition-all duration-300 ${step >= s ? "bg-gradient-to-r from-blue-600 to-indigo-600" : "bg-slate-200"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 sm:py-8 space-y-4 sm:space-y-5">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                    {step === 1 && "Contact Information"}
                    {step === 2 && "Income Details"}
                    {step === 3 && "Final Confirmation"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Step {step} of 3</p>
                </div>

                {step === 1 && (
                  <div className="space-y-3 sm:space-y-4">
                    <input name="name" placeholder="Full Name" value={itrForm.name} onChange={handleChange} className={inputStyle} />
                    <input name="email" placeholder="Email" value={itrForm.email} onChange={handleChange} className={inputStyle} />
                    <input name="phone" placeholder="Phone" value={itrForm.phone} onChange={handleChange} className={inputStyle} />
                    <select name="contactMode" value={itrForm.contactMode} onChange={handleChange} className={inputStyle}>
                      <option value="">Preferred Contact Mode</option>
                      <option>Phone Call</option>
                      <option>WhatsApp</option>
                      <option>Email</option>
                    </select>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-3 sm:space-y-4">
                    <select name="itrType" value={itrForm.itrType} onChange={handleChange} className={inputStyle}>
                      <option value="">ITR Type</option>
                      <option>Salaried</option>
                      <option>Business</option>
                      <option>Freelancer</option>
                      <option>NRI</option>
                    </select>
                    <input name="incomeSource" placeholder="Primary Income Source" value={itrForm.incomeSource} onChange={handleChange} className={inputStyle} />
                    <select name="capitalGains" value={itrForm.capitalGains} onChange={handleChange} className={inputStyle}>
                      <option value="">Capital Gains?</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                    <select name="foreignAssets" value={itrForm.foreignAssets} onChange={handleChange} className={inputStyle}>
                      <option value="">Foreign Assets?</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-3 sm:space-y-4">
                    <select name="incomeRange" value={itrForm.incomeRange} onChange={handleChange} className={inputStyle}>
                      <option value="">Annual Income Range</option>
                      <option>Below 5L</option>
                      <option>5L - 10L</option>
                      <option>10L - 25L</option>
                      <option>Above 25L</option>
                    </select>
                    <select name="noticeReceived" value={itrForm.noticeReceived} onChange={handleChange} className={inputStyle}>
                      <option value="">Any Tax Notice?</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                    <select name="timeline" value={itrForm.timeline} onChange={handleChange} className={inputStyle}>
                      <option value="">Expected Timeline</option>
                      <option>Immediate</option>
                      <option>This Week</option>
                      <option>This Month</option>
                    </select>
                    <textarea
                      name="message"
                      placeholder="Additional Notes"
                      rows="4"
                      value={itrForm.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none text-sm bg-white"
                    />
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 sm:px-8 py-4 sm:py-6 border-t border-slate-200 bg-white sticky bottom-0">
                <div className="flex justify-between items-center">
                  {step > 1 ? (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="px-4 sm:px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition text-sm"
                    >
                      Back
                    </button>
                  ) : <div />}

                  {step < 3 ? (
                    <button
                      onClick={() => validateStep() ? setStep(step + 1) : alert("Please complete required fields")}
                      className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg transition text-sm"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg disabled:opacity-60 transition text-sm"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}