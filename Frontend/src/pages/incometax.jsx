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
  Phone,
  Mail,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import expertImage from "../assets/image9.png"; // IMPORTANT: Update with your transparent PNG image path
import Footer from '../components/footer';
import emailjs from "@emailjs/browser";

const serviceName = "Income Tax Filing";

const inputStyle =
  "w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition";

// ==========================================
// 1. DATA ARRAYS
// ==========================================
const targetAudience = [
  { icon: Briefcase, title: "Salaried Individuals", desc: "Maximize your take-home pay with expert deductions and exact Form 16 mapping." },
  { icon: PieChart, title: "Freelancers", desc: "Section 44ADA presumptive taxation to minimize complex bookkeeping." },
  { icon: Building2, title: "Businesses", desc: "Comprehensive ITR filing for proprietorships, partnerships, and private limited firms." },
  { icon: Globe, title: "NRIs", desc: "Seamless handling of DTAA, foreign income, and Indian asset liquidations." }
];

const includedServices = [
  { icon: FileText, title: "ITR Filing", desc: "End-to-end preparation and e-filing of ITR-1 through ITR-7 based on your exact profile." },
  { title: "Capital Gains", desc: "Detailed calculation for mutual funds, stocks, and real estate transactions.", icon: TrendingUp },
  { title: "Business Income", desc: "P&L generation and balance sheet alignment for meticulous professional reporting.", icon: Landmark },
  { title: "Crypto Tax Handling", desc: "Precise navigation of the 30% VDA tax and 1% TDS requirements.", icon: Coins },
  { title: "Notice Resolution", desc: "Expert response drafting for income tax notices or defective returns.", icon: ShieldCheck },
  { title: "Tax Refund Tracking", desc: "Continuous monitoring and follow-ups for expedited tax refunds.", icon: BadgePercent }
];

// NEW KNOWLEDGE SECTION DATA
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
    subtitle: "Basic Salary & Other Income",
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
    subtitle: "Salary + Stock + Mutual Fund Gain",
    features: [
      "Capital Gains (Shares & Mutual Funds)",
      "Multiple House Properties",
      "Foreign Assets (if applicable)",
      "Comprehensive Tax Computation"
    ],
    popular: false,
  },
  {
    name: "ITR 3",
    price: "₹2,999",
    subtitle: "Salary + F&O + Intraday Income",
    features: [
      "F&O / Intraday Trading",
      "Business & Professional Income",
      "Balance Sheet & P&L Preparation",
      "Advance Tax Computation"
    ],
    popular: true,
    badge: "MOST POPULAR"
  },
  {
    name: "ITR 4",
    price: "₹999",
    subtitle: "Only Business Income (Presumptive)",
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
  { id: "01", title: "Document Upload", desc: "Securely upload your Form 16, bank statements, and investment proofs via our encrypted portal.", icon: FileCheck },
  { id: "02", title: "Tax Computation", desc: "Our team calculates your liabilities, optimizes deductions, and shares a detailed draft.", icon: Calculator },
  { id: "03", title: "Filing & Confirmation", desc: "Upon your approval, we file the ITR securely and share the official acknowledgement (ITR-V).", icon: CheckCircle2 }
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
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
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

  const [activeIndex, setActiveIndex] = useState(1); // middle active by default

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
    <div className="min-h-screen bg-[#fafcff] font-sans text-slate-800 selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      <Navbar />

      <main className="pt-24 pb-20">

        {/* ==========================================
            HERO SECTION
            ========================================== */}
        <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-12 md:pt-20 pb-20 md:pb-32 grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
          {/* Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[100px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/4" />

          {/* Left Content */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 lg:pr-8">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-wider uppercase mb-8">
              <ShieldCheck className="w-4 h-4" /> Proactive Tax Planning
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
              Income Tax <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Filing Services</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
              Accurate, optimized, and stress-free ITR filing guided by senior Professionals. We protect your wealth while ensuring 100% compliance.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              {/* Form Trigger */}
              <button
                onClick={() => setIsPanelOpen(true)}
                className="relative group inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 bg-blue-600 shadow-[0_10px_40px_rgba(37,99,235,0.35)] hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(37,99,235,0.45)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  File Your ITR Now
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>

              {/* WhatsApp Action */}
              <button
                onClick={(e) => handleWhatsAppChat(e, "ITR Services")}
                className="bg-white border border-[#25D366]/30 hover:border-[#25D366] hover:bg-[#25D366]/5 text-[#128C7E] px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-sm"
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
            className="w-full mt-16 lg:mt-0 relative flex items-center justify-center z-20 overflow-visible perspective-[1200px]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute w-[100%] h-[100%] max-w-[700px] max-h-[700px] bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 rounded-full blur-[140px] opacity-40 -z-10"
            />
            <div className="absolute inset-0 w-full h-full flex justify-center items-center pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
              <div className="w-[90%] h-[90%] bg-white/30 blur-[120px] rounded-full" />
            </div>

            <motion.div
              animate={{ y: [-20, 20, -20] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex justify-center items-center w-full overflow-visible"
            >
              <img
                src={expertImage}
                alt="ComplyWithCA Tax Expert"
                className="relative z-30 w-[115%] lg:w-[140%] xl:w-[125%] max-w-none h-auto object-contain drop-shadow-[0_40px_80px_rgba(15,23,42,0.3)] transition-all duration-700 ease-out hover:scale-[1.08] hover:-rotate-1 origin-bottom"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ==========================================
            WHO WE HELP
            ========================================== */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h4 className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase mb-4">Targeted Expertise</h4>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Who We Help</h2>
            </div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {targetAudience.map((item, idx) => (
                <motion.div key={idx} variants={fadeUp} className="group flex flex-col items-center text-center p-6">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm border border-blue-100/50">
                    <item.icon size={28} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==========================================
            PRICING TIER CARDS (WHATSAPP INTEGRATED)
            ========================================== */}
        <section className="py-36 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Heading */}
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-5">
                Income Tax Filing (ITR)
              </h2>
              <p className="text-slate-500 text-lg font-medium">
                Transparent filing solutions based on your income profile.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-12">

              {pricingTiers.map((tier, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <motion.div
                    key={idx}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onMouseLeave={() => setActiveIndex(1)}
                    initial={false}
                    animate={{
                      y: isActive ? -18 : 0,
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className={`
              relative rounded-3xl p-10 bg-white
              transition-all duration-300
              ${isActive
                        ? "border-2 border-[#25D366] shadow-2xl shadow-[#25D366]/15"
                        : "border border-slate-200 shadow-md hover:shadow-lg"}
            `}
                  >

                    {/* Soft Glow (Reduced) */}
                    {isActive && (
                      <div className="absolute -inset-2 bg-[#25D366]/10 blur-xl rounded-3xl -z-10" />
                    )}

                    {/* Title */}
                    <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-4">
                      {tier.name}
                    </h3>

                    {/* Subtitle */}
                    {tier.subtitle && (
                      <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                        {tier.subtitle}
                      </p>
                    )}

                    {/* Price */}
                    <div className="mb-10">
                      <span className="text-5xl font-black text-slate-900">
                        {tier.price}
                      </span>
                    </div>

                    <div className="h-px bg-slate-100 mb-10" />

                    {/* Features */}
                    <ul className="space-y-4 mb-12">
                      {tier.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <CheckCircle2
                            size={18}
                            className={`mt-0.5 shrink-0 transition-colors ${isActive ? "text-[#25D366]" : "text-slate-400"
                              }`}
                          />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    {/* Button */}
                    <button
                      onClick={(e) => handleWhatsAppChat(e, tier.name)}
                      className={`
                w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2
                ${isActive
                          ? "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 hover:bg-[#1ebe5d]"
                          : "bg-slate-100 text-slate-800 hover:bg-green-50 hover:text-[#25D366]"
                        }
              `}
                    >
                      <MessageCircle size={18} />
                      Start Filing
                    </button>

                    <div className="text-center mt-6 text-xs text-slate-400 tracking-widest">
                      TAXES AS PER APPLICABLE LAW
                    </div>

                  </motion.div>
                );
              })}

            </div>
          </div>
        </section>

        {/* ==========================================
            WHAT'S INCLUDED
            ========================================== */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">What's Included</h2>
              <p className="text-slate-500 text-lg">Comprehensive advisory wrapped into every filing.</p>
            </div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="grid md:grid-cols-2 gap-6"
            >
              {includedServices.map((service, idx) => (
                <motion.div
                  key={idx} variants={fadeUp}
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 hover:border-blue-100 transition-all duration-300 flex items-start gap-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-blue-600">
                    <service.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==========================================
            EXPERT KNOWLEDGE SECTION (Why ITR Matters)
            ========================================== */}
        <section className="py-28 bg-[#0b1120] text-white border-y border-slate-800 relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase mb-6">
                  Expert Insight
                </div>
                <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                  Why ITR is More Than Just Compliance.
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  Filing your Income Tax Return isn't just about avoiding penalties. It is the ultimate financial document that acts as a passport to capital, global travel, and reclaiming your own money.
                </p>
              </motion.div> 
            </div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {knowledgeCards.map((card, idx) => (
                <motion.div
                  key={idx} variants={fadeUp}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">
                    <card.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3">{card.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Warning Note */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-12 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 flex items-start sm:items-center gap-4 max-w-4xl mx-auto">
              <div className="text-rose-400 shrink-0"><AlertTriangle size={24} /></div>
              <p className="text-sm text-rose-200/90 font-medium leading-relaxed">
                <strong className="text-rose-400">Important Note:</strong> The Income Tax Department is leveraging AI to track high-value transactions (credit cards, mutual funds, property). Failing to file an ITR when your transactions cross certain thresholds triggers automatic compliance notices.
              </p>
            </motion.div>

          </div>
        </section>

        {/* ==========================================
            FEATURE SPLIT (Sticky Architecture)
            ========================================== */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-20 items-start">

              {/* Sticky Left Content */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                className="lg:w-5/12 lg:sticky lg:top-32"
              >
                <h2 className="text-5xl lg:text-6xl font-black leading-[1.1] mb-8 tracking-tight text-slate-900">
                  Plan Smart.<br />
                  File Accurate.<br />
                  <span className="text-blue-600">Stay Compliant.</span>
                </h2>

                <ul className="space-y-6 mb-10">
                  <li className="flex items-center gap-4 text-slate-700 font-bold text-lg"><CheckCircle2 className="text-green-500" /> 100% Secure Data Encryption</li>
                  <li className="flex items-center gap-4 text-slate-700 font-bold text-lg"><ShieldCheck className="text-blue-500" /> Professional Representation Guarantee</li>
                  <li className="flex items-center gap-4 text-slate-700 font-bold text-lg"><Lock className="text-indigo-500" /> No Hidden Fee Architecture</li>
                </ul>
              </motion.div>

              {/* Right List Content */}
              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
                className="lg:w-7/12 flex flex-col gap-6"
              >
                {splitFeatures.map((feature, idx) => (
                  <motion.div
                    key={idx} variants={fadeUp}
                    className="bg-slate-50 p-8 rounded-3xl border border-slate-100 border-l-4 hover:border-l-blue-600 transition-colors"
                  >
                    <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                    <p className="text-slate-600 text-base leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>


        {/* ==========================================
            HOW IT WORKS (Vertical Timeline)
            ========================================== */}
        <section className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">How It Works</h2>
              <p className="text-slate-500">A seamless 3-step digital process.</p>
            </div>

            <div className="relative">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />

              <div className="flex flex-col gap-12">
                {processSteps.map((step, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div key={step.id} className={`relative flex flex-col md:flex-row items-center w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}>
                      <div className="hidden md:block md:w-1/2" />
                      <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                        <div className="w-16 h-16 bg-white rounded-full border-4 border-slate-50 flex items-center justify-center shadow-lg group-hover:border-blue-100 group-hover:scale-110 transition-all">
                          <step.icon size={24} className="text-blue-600" />
                        </div>
                      </div>
                      <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}
                        className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}
                      >
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                      </motion.div>
                    </div>
                  );
                })}
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
                <div key={idx} className="border border-slate-200 rounded-[1.5rem] overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 pr-8 text-lg">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="p-6 pt-0 text-slate-600 text-base leading-relaxed border-t border-slate-50 font-medium">
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
            BOTTOM CTA (WhatsApp Integrated)
            ========================================== */}
        <section className="py-24 px-6 lg:px-8 bg-slate-900 text-center relative overflow-hidden">
          {/* Subtle Green Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#25D366]/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Stay Tax Compliant the Right Way.</h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-medium">
                Connect with our dedicated Professionals via WhatsApp to file your income tax returns efficiently and accurately.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={(e) => handleWhatsAppChat(e, "Tax Filing Package")}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-3 text-lg hover:-translate-y-1"
                >
                  <MessageCircle size={24} />
                  Chat on WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ==========================================
          SLIDE PANEL FORM (Intact)
          ========================================== */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              onClick={() => setIsPanelOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 100, damping: 22 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[520px] bg-white z-[9999] shadow-2xl border-l border-slate-200 flex flex-col"
            >
              <div className="sticky top-0 bg-white z-20 px-8 pt-8 pb-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{serviceName} Intake</h2>
                    <p className="text-sm text-slate-500">Structured onboarding for tax filing</p>
                  </div>
                  <button onClick={() => setIsPanelOpen(false)}>✕</button>
                </div>
                <div className="flex gap-2 mt-6">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className={`h-2 flex-1 rounded-full ${step >= s ? "bg-blue-600" : "bg-slate-200"}`} />
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-8 space-y-5">
                {step === 1 && (
                  <>
                    <input name="name" placeholder="Full Name" value={itrForm.name} onChange={handleChange} className={inputStyle} />
                    <input name="email" placeholder="Email" value={itrForm.email} onChange={handleChange} className={inputStyle} />
                    <input name="phone" placeholder="Phone" value={itrForm.phone} onChange={handleChange} className={inputStyle} />
                    <select name="contactMode" value={itrForm.contactMode} onChange={handleChange} className={inputStyle}>
                      <option value="">Preferred Contact</option>
                      <option>Phone Call</option>
                      <option>WhatsApp</option>
                      <option>Email</option>
                    </select>
                  </>
                )}

                {step === 2 && (
                  <>
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
                  </>
                )}

                {step === 3 && (
                  <>
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
                      <option value="">Timeline</option>
                      <option>Immediate</option>
                      <option>This Week</option>
                      <option>This Month</option>
                    </select>
                    <textarea name="message" placeholder="Additional Notes" value={itrForm.message} onChange={handleChange} className={inputStyle} />
                  </>
                )}
              </div>

              <div className="px-8 py-6 border-t flex justify-between">
                {step > 1 ? (
                  <button onClick={() => setStep(step - 1)}>Back</button>
                ) : <div />}

                {step < 3 ? (
                  <button onClick={() => validateStep() ? setStep(step + 1) : alert("Complete required fields")} className="px-6 py-3 bg-blue-600 text-white rounded-xl">
                    Next →
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={isSubmitting} className="px-6 py-3 bg-blue-600 text-white rounded-xl disabled:opacity-60">
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