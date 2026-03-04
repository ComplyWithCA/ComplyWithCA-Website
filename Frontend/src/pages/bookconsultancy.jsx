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
  Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';
import expertImage from "../assets/image10.png"; // Imported your 3D image
import Footer from '../components/footer';
import emailjs from "@emailjs/browser";
import ConsultationForm from "../components/ConsultationForm";

// Reusable SVG for aesthetics
const Building2CustomIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></svg>;

// ==========================================
// 1. DATA ARRAYS
// ==========================================
const whatIsCards = [
  { icon: FileSpreadsheet, title: "Comprehensive Bookkeeping", desc: "Digital, end-to-end recording of all financial transactions." },
  { icon: LineChart, title: "Financial Clarity", desc: "Actionable reporting that translates raw data into business intelligence." },
  { icon: ShieldCheck, title: "Tax-Ready Books", desc: "Continuous reconciliation ensures you are always audit and tax-ready." }
];

const servicesIncluded = [
  { icon: BookOpen, title: "Bookkeeping & Accounting", desc: "Meticulous day-to-day recording of your accounts payable, receivable, and ledger management." },
  { icon: PieChart, title: "Financial Statement Preparation", desc: "Accurate generation of P&L statements, balance sheets, and cash flow analysis." },
  { icon: Landmark, title: "Bank Reconciliation", desc: "Seamless matching of your internal books with bank records to prevent discrepancies." },
  { icon: Target, title: "Budgeting & Forecasting", desc: "Strategic financial modeling to help you plan capital allocation and future growth." },
  { icon: Wallet, title: "Cashflow Management", desc: "Monitoring liquidity, optimizing working capital, and projecting future cash needs." },
  { icon: Calculator, title: "Tax Compliance Planning", desc: "Structuring your books to align perfectly with GST and Income Tax frameworks." }
];

const beyondBenefits = [
  { icon: Search, title: "Accurate Financial Records", desc: "Eliminate human error with our multi-tier verification process." },
  { icon: TrendingUp, title: "Strategic Decision Making", desc: "Base your pivots and expansions on hard, verified financial data." },
  { icon: Building2CustomIcon, title: "Investor Readiness", desc: "Present institutional-grade financial reporting during due diligence." },
  { icon: ShieldCheck, title: "Peace of Mind", desc: "Focus entirely on operations while we handle the regulatory and financial backend." }
];

const pricingTiers = [
  {
    tier: "Basic Accounting Support",
    desc: "Essential bookkeeping for early-stage startups.",
    price: "Contact",
    features: ["Monthly ledger updates", "Bank reconciliation (1 bank)", "Basic P&L generation"],
    popular: false,
    buttonStyle: "bg-slate-900 text-white hover:bg-slate-800"
  },
  {
    tier: "Growth Advisory Package",
    desc: "Full-stack accounting for scaling businesses.",
    badge: "RECOMMENDED",
    price: "Contact",
    features: ["Bi-weekly book updates", "GST & TDS compliance readiness", "Cashflow forecasting", "Dedicated account manager"],
    popular: true,
    buttonStyle: "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1"
  },
  {
    tier: "Complete Financial Management",
    desc: "Virtual CFO services for established enterprises.",
    price: "Contact",
    features: ["Real-time bookkeeping", "Complex audit support", "Board-level reporting", "Custom KPI dashboards"],
    popular: false,
    buttonStyle: "bg-slate-900 text-white hover:bg-slate-800"
  }
];

const roadmapSteps = [
  { id: "01", title: "Initial Assessment", desc: "We conduct a deep dive into your current financial systems, identifying gaps and structural inefficiencies." },
  { id: "02", title: "Onboarding & System Setup", desc: "Seamless migration of your data to our cloud accounting infrastructure (Tally, Zoho, or QuickBooks)." },
  { id: "03", title: "Monthly Reporting & Review", desc: "Continuous ledger management followed by strategic monthly syncs with your dedicated financial advisor." }
];

const faqs = [
  { q: "How does virtual book consultancy work?", a: "We integrate with your business digitally. You upload your invoices and statements to our secure portal, and our CA team manages your books remotely, providing you with a real-time dashboard of your financials." },
  { q: "Do you help with past unstructured data?", a: "Yes. We offer a 'Cleanup Service' where we retroactively organize, reconcile, and digitize months or years of messy financial records to bring you up to date." },
  { q: "Is my financial data secure with you?", a: "Absolutely. We use bank-level, 256-bit encryption for all document transfers and cloud accounting software, ensuring total confidentiality and data security." }
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
export default function BookConsultancy() {
  const [openFaq, setOpenFaq] = useState(0);
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    message: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_ghj2doe",      // from EmailJS dashboard
        "template_uwkmjxr",     // your template id
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          business: formData.business,
          message: formData.message,
        },
        "KJ9IR47xK9gNAOEYd"       // EmailJS public key
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          alert("Consultation request submitted successfully!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            business: "",
            message: "",
          });
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("Something went wrong. Please try again.");
        }
      );
  };


  const handleWhatsAppChat = (e, context = "Book Consultancy & Financial Advisory") => {
    if (e) e.stopPropagation();
    const phoneNumber = "9311702025";
    const message = `Hi! I want to discuss ${context} for my business.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
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
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none -z-10 translate-x-1/4 -translate-y-1/4" />

          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full lg:pr-8 xl:pr-12 z-10"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/50 shadow-sm text-blue-700 text-xs font-bold tracking-wider uppercase mb-8 mt-8 lg:mt-0">
              <Sparkles className="w-4 h-4 text-blue-500" /> Corporate Financial Systems
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] mb-6 tracking-tight">
              Book Consultancy & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Financial Advisory</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg xl:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
              Structured accounting, compliance tracking, and strategic financial modeling led by senior CAs to engineer your enterprise's growth.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => document.getElementById("consultation-form")?.scrollIntoView({ behavior: "smooth" })} className="relative group overflow-hidden bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.5)] hover:-translate-y-0.5"
              >
                <span className="relative z-10">Book Free Consultation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={(e) => handleWhatsAppChat(e, "Financial Advisory Services")}
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
            className="w-full mt-16 lg:mt-0 relative flex items-center justify-center perspective-[1200px] z-20 overflow-visible"
          >
            {/* Large Premium Rotating Aurora Background */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute w-[90%] h-[90%] 
               max-w-[800px] max-h-[800px]
               bg-gradient-to-tr 
               from-blue-600 via-indigo-500 to-cyan-400
               rounded-full blur-[140px] opacity-40 -z-10"
            />

            {/* Floating Image Wrapper */}
            <motion.div
              animate={{ y: [-20, 20, -20] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex justify-center items-center w-full"
            >
              <img
                src={expertImage}
                alt="ComplyWithCA Financial Expert"
                className="relative z-30 
                 w-[110%] 
                 lg:w-[130%] 
                 xl:w-[120%]
                 max-w-none
                 h-auto object-contain
                 drop-shadow-[0_35px_70px_rgba(15,23,42,0.3)]
                 transition-all duration-700 ease-out
                 hover:scale-[1.08] hover:-rotate-1 origin-bottom"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ==========================================
            WHAT IS BOOK CONSULTANCY?
            ========================================== */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">What is Book Consultancy?</h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-6 font-medium">
                  Our Book Consultancy goes beyond data entry. We act as your external financial department, ensuring every transaction is structured, compliant, and mapped to strategic financial goals.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
                  From reconciling micro-transactions to preparing your enterprise for Series-A audits, we establish the financial truth of your business.
                </p>
                <button className="text-blue-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Learn about our methodology <ArrowRight size={18} />
                </button>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-4">
                {whatIsCards.map((card, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100 flex items-start gap-5 hover:bg-white hover:shadow-lg hover:border-blue-100 transition-all duration-300">
                    <div className="w-12 h-12 bg-blue-100/50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <card.icon size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">{card.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>

        {/* ==========================================
            SERVICES INCLUDED GRID
            ========================================== */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Services Included</h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full" />
            </div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {servicesIncluded.map((service, idx) => (
                <motion.div
                  key={idx} variants={fadeUp}
                  className="group relative bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.06)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <service.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==========================================
    FREE CONSULTATION FORM
========================================== */}
        <section id="consultation-form" className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-start">

            {/* Left Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                Book Your Free Financial Consultation
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
                Speak directly with our senior CA advisory team. We will review your financial structure, compliance gaps, and growth strategy.
              </p>

              <div className="space-y-4">
                {[
                  "Personalized Financial Roadmap",
                  "Compliance Gap Review",
                  "Tax Optimization Strategy",
                  "Cashflow & Growth Planning"
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-blue-600 mt-1 shrink-0" size={20} />
                    <span className="text-slate-600 font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <ConsultationForm defaultService="Book Consultancy" />
          </div>
        </section>


        {/* ==========================================
            BEYOND BOOKKEEPING (Bento Grid)
            ========================================== */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:w-1/3">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                  Beyond <br className="hidden lg:block" />Bookkeeping.<br />
                  <span className="text-blue-600">Toward Structure.</span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
                  We don't just balance ledgers. We architecture your financial operations so you have total strategic visibility and absolute regulatory confidence.
                </p>
                <div className="w-12 h-1.5 bg-blue-600 rounded-full" />
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="lg:w-2/3 grid sm:grid-cols-2 gap-6">
                {beyondBenefits.map((b, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                        <b.icon size={20} strokeWidth={2} />
                      </div>
                      <h4 className="text-base font-bold text-slate-900">{b.title}</h4>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>

        {/* ==========================================
            MONTHLY PACKAGES
            ========================================== */}
        <section className="py-32 bg-[#fafcff] border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Monthly Consultancy Packages</h2>
              <p className="text-slate-500 text-lg font-medium">Premium financial management scaled to your operations.</p>
            </div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center relative"
            >
              {pricingTiers.map((tier, idx) => (
                <motion.div
                  key={idx} variants={fadeUp}
                  className={`relative bg-white rounded-[2rem] p-10 border transition-all duration-300 ${tier.popular ? 'border-blue-500 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.2)] md:scale-105 z-10' : 'border-slate-200 shadow-sm hover:border-blue-200'}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md whitespace-nowrap">
                      {tier.badge}
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-slate-900 mb-2 text-center">{tier.tier}</h3>
                  <p className="text-sm text-slate-500 text-center mb-6">{tier.desc}</p>

                  <div className="flex justify-center items-center mb-8 border-y border-slate-100 py-6">
                    <span className="text-3xl font-black text-slate-900 tracking-tight">{tier.price}</span>
                  </div>

                  <ul className="space-y-4 mb-10">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                        <CheckCircle2 size={18} className={tier.popular ? "text-blue-500 shrink-0 mt-0.5" : "text-slate-400 shrink-0 mt-0.5"} />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={(e) => handleWhatsAppChat(e, `${tier.tier} Pricing Inquiry`)}
                    className={`w-full py-4 rounded-xl font-bold transition-all ${tier.buttonStyle}`}
                  >
                    Get a Quote
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==========================================
            ROADMAP TIMELINE
            ========================================== */}
        <section className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">The Consultancy Roadmap</h2>
              <p className="text-slate-500 text-lg font-medium">How we integrate with your business.</p>
            </div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 hidden md:block" />

              <div className="flex flex-col gap-12">
                {roadmapSteps.map((step, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div key={step.id} className={`relative flex flex-col md:flex-row items-center w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}>

                      <div className="hidden md:block md:w-1/2" />

                      {/* Animated Node */}
                      <div className="md:absolute left-1/2 transform md:-translate-x-1/2 flex items-center justify-center z-20 mb-6 md:mb-0">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform border-4 border-white">
                          <span className="font-bold text-sm">{step.id}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
                        className={`w-full md:w-1/2 text-center ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}
                      >
                        {/* Huge faded background number */}
                        <div className="relative">
                          <div className={`absolute top-1/2 -translate-y-1/2 text-[100px] font-black text-slate-50 pointer-events-none -z-10 ${isEven ? 'right-0' : 'left-0'}`}>
                            {step.id}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
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
            BOTTOM CTA (Dark Slate Architecture)
            ========================================== */}
        <section className="py-28 px-6 lg:px-8 bg-slate-900 text-center relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-800 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

          <div className="max-w-3xl mx-auto relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Build Strong Financial Foundations.</h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-medium">
                Join high-growth startups and established enterprises that trust ComplyWithCA with their day-to-day financial operations.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={(e) => handleWhatsAppChat(e, "Advisory Consultation")}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/30"
                >
                  Consult Advisory Services
                </button>
                <button
                  onClick={(e) => handleWhatsAppChat(e, "Pricing and Packages")}
                  className="bg-transparent border border-slate-600 hover:bg-slate-800 text-white px-10 py-4 rounded-xl font-bold transition-all"
                >
                  Contact on WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ==========================================
          FOOTER
          ========================================== */}
      <Footer />
    </div>
  );
}