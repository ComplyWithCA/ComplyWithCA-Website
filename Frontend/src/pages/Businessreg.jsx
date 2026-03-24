import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Briefcase,
  User,
  Rocket,
  Scale,
  TrendingUp,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  Search,
  FileText,
  BadgeCheck,
  Sparkles,
  X,
  Clock,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import expertImage from "../assets/image8.png";
import Footer from '../components/footer';
import emailjs from "@emailjs/browser";
import { FaWhatsapp } from "react-icons/fa";

// ==========================================
// 1. DATA ARRAYS
// ==========================================

const credibilityCards = [
  {
    title: "Incorporation",
    desc: "Seamless end-to-end company formation with MCA filing.",
    icon: Building2,
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80&auto=format&fit=crop"
  },
  {
    title: "Compliance",
    desc: "Annual filings, ROC compliance, and board resolution support.",
    icon: FileCheck,
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80&auto=format&fit=crop"
  },
  {
    title: "Advisory",
    desc: "Strategic structuring guidance for investors and growth stages.",
    icon: TrendingUp,
    img: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=400&q=80&auto=format&fit=crop"
  }
];

const ecosystemServices = [
  { title: "Private Limited Company", desc: "Full SPICe+ filing, MOA & AOA drafting, and post-incorporation bank account support.", icon: Building2 },
  { title: "LLP Registration", desc: "LLP Agreement drafting, DPIN & DSC assistance, and Certificate of Incorporation.", icon: Briefcase },
  { title: "One Person Company (OPC)", desc: "Single-founder incorporation with nominee support and seamless Pvt Ltd upgrade path.", icon: User },
  { title: "Startup India (DPIIT)", desc: "DPIIT recognition filing, 80IAC tax holiday, and angel tax exemption support.", icon: Rocket },
  { title: "Post-Registration Support", desc: "GST registration, business bank account opening, and ongoing MCA compliance management.", icon: ShieldCheck }
];

const packages = [
  {
    tier: "Private Limited Company",
    price: "₹1,999",
    subtitle: "+ Govt. Fees",
    features: ["Name Approval (RUN/SPICe+)", "MOA & AOA Drafting", "Certificate of Incorporation", "Company PAN & TAN", "2 DIN & DSC Assistance"],
    buttonText: "Get Started",
    isRecommended: true
  },
  {
    tier: "One Person Company (OPC)",
    price: "₹1,999",
    subtitle: "+ Govt. Fees",
    features: ["Name Approval", "MOA Drafting", "Certificate of Incorporation", "PAN & TAN Allotment", "1 DIN & DSC Assistance"],
    buttonText: "Get Quote",
    isRecommended: false
  },
  {
    tier: "LLP Registration",
    price: "₹1,999",
    subtitle: "+ Govt. Fees",
    features: ["LLP Name Reservation", "LLP Agreement Drafting", "Certificate of Incorporation", "PAN & TAN Allotment", "2 DPIN & DSC Assistance"],
    buttonText: "Get Quote",
    isRecommended: false
  },
];

const structures = [
  {
    tag: "HIGH GROWTH",
    title: "Private Limited",
    desc: "Best for scalable startups planning investor funding.",
    icon: Building2,
    details: {
      who: "Tech startups, funded businesses, and growth-focused founders.",
      why: "Ideal for raising venture capital and scaling aggressively.",
      features: ["Separate Legal Entity", "Limited Liability Protection", "Share Transferability", "Investor-Friendly Structure"]
    }
  },
  {
    tag: "LOW COMPLIANCE",
    title: "LLP Registration",
    desc: "Perfect for consultants & service businesses.",
    icon: Briefcase,
    details: {
      who: "Agencies, consultants, and professional firms.",
      why: "Balanced structure with lower compliance than Pvt Ltd.",
      features: ["Limited Liability", "Cost Effective", "No Dividend Tax", "Operational Flexibility"]
    }
  },
  {
    tag: "SOLO CONTROL",
    title: "One Person (OPC)",
    desc: "Single founder with full ownership & protection.",
    icon: User,
    details: {
      who: "Freelancers and solo entrepreneurs.",
      why: "Corporate benefits without needing a partner.",
      features: ["Single Ownership", "Nominee Required", "Corporate Legal Status", "Seamless Conversion Later"]
    }
  },
  {
    tag: "GOVT BENEFITS",
    title: "Startup India",
    desc: "DPIIT recognition with tax advantages.",
    icon: Rocket,
    details: {
      who: "Innovative startups seeking government support.",
      why: "Unlock tax holidays and startup ecosystem benefits.",
      features: ["DPIIT Certificate", "3-Year Tax Holiday", "Faster Patent Processing", "Access to Govt Schemes"]
    }
  }
];

const processSteps = [
  {
    id: "01",
    title: "Consultation",
    desc: "Expert analysis of your business model to recommend the best entity structure and shareholding pattern.",
    icon: Search,
    img: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Documentation & Filing",
    desc: "Seamless collection of KYC and digital signatures, followed by precise filing with the Ministry of Corporate Affairs (MCA).",
    icon: FileText,
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Incorporation & Support",
    desc: "Receive your Certificate of Incorporation, PAN, and TAN. We then assist with post-registration compliance and bank setup.",
    icon: BadgeCheck,
    img: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=500&q=80&auto=format&fit=crop"
  }
];

const faqs = [
  { q: "What documents are required for directors?", a: "Each director needs a PAN card, Aadhar card, passport-size photograph, and address proof such as a bank statement or utility bill." },
  { q: "Can I register if I am a solo founder?", a: "Yes. You can register as a One Person Company (OPC), which allows a single founder to enjoy the benefits of limited liability and corporate status." },
  { q: "Is GST registration mandatory for my business?", a: "GST registration is mandatory if your annual turnover exceeds ₹40 lakh for goods or ₹20 lakh for services. It is also required for e-commerce sellers." },
  { q: "How often do I need to file ROC returns?", a: "Private Limited Companies must file AOC-4 and MGT-7 annually. LLPs file Form 11 and Form 8. Timely filing avoids penalties and keeps your company in good standing." },
  { q: "What happens if compliance is missed?", a: "Missing ROC filing deadlines results in late fees, disqualification of directors, and potential striking off of the company by MCA." },
  { q: "Do you provide ongoing compliance support?", a: "Yes. Our monthly and annual plans include ROC filings, board resolution drafting, compliance monitoring, and expert CA consultation." }
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

const inputStyle =
  "w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white text-sm";

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function BusinessRegistration() {
  const [openFaq, setOpenFaq] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const serviceName = "Business Registration";

  const [regForm, setRegForm] = useState({
    name: "", email: "", phone: "", contactMode: "",
    businessName: "", structure: "", state: "",
    directors: "", capital: "", businessActivity: "",
    timeline: "", message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegForm((prev) => ({ ...prev, [name]: value }));
  };

  const calculateLeadScore = () => {
    let score = 30;
    if (regForm.structure === "Private Limited") score += 20;
    if (regForm.structure === "Startup India") score += 25;
    if (regForm.directors === "3+") score += 15;
    if (regForm.capital && Number(regForm.capital) > 1000000) score += 25;
    if (regForm.timeline === "Immediate") score += 10;
    return score;
  };

  useEffect(() => {
    document.body.style.overflow = (isPanelOpen || selectedDetail) ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isPanelOpen, selectedDetail]);

  const validateStep = () => {
    if (step === 1) return regForm.name && regForm.email && regForm.phone && regForm.contactMode;
    if (step === 2) return regForm.businessName && regForm.structure && regForm.state;
    if (step === 3) return regForm.directors && regForm.capital;
    if (step === 4) return regForm.timeline;
    return true;
  };

  const handleSubmit = async () => {
    if (!validateStep()) { alert("Please complete required fields."); return; }
    try {
      setIsSubmitting(true);
      const leadScore = calculateLeadScore();
      const priority = leadScore >= 60 ? "HIGH PRIORITY" : "STANDARD";
      const dynamicFields = `Structure: ${regForm.structure || "-"}\nProposed Name: ${regForm.businessName || "-"}\nState: ${regForm.state || "-"}\nDirectors: ${regForm.directors || "-"}\nAuthorized Capital: ₹${regForm.capital || "-"}\nBusiness Activity: ${regForm.businessActivity || "-"}`;
      const templateParams = {
        serviceName, name: regForm.name, email: regForm.email, phone: regForm.phone,
        contactMode: regForm.contactMode, timeline: regForm.timeline,
        message: regForm.message || "-", dynamicFields, leadScore, priority
      };
      await emailjs.send("service_ghj2doe", "template_qkg4m4s", templateParams, "KJ9IR47xK9gNAOEYd");
      alert("Registration request submitted successfully!");
      setRegForm({ name: "", email: "", phone: "", contactMode: "", businessName: "", structure: "", state: "", directors: "", capital: "", businessActivity: "", timeline: "", message: "" });
      setStep(1);
      setIsPanelOpen(false);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppChat = (e, context = "Business Registration") => {
    if (e) e.stopPropagation();
    const phoneNumber = "919289758145";
    const message = `Hi! I would like to know more about your ${context}.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const Input = ({ name, placeholder }) => (
    <input name={name} placeholder={placeholder} value={regForm[name]} onChange={handleChange} className={inputStyle} />
  );

  const SelectField = ({ name, children }) => (
    <select name={name} value={regForm[name]} onChange={handleChange} className={inputStyle}>{children}</select>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      <Navbar />

      <main className="pt-24 pb-12 sm:pb-20">

        {/* ── HERO ── */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
          pt-8 sm:pt-12 md:pt-16
          pb-10 sm:pb-16 md:pb-24
          flex flex-col lg:flex-row items-center
          min-h-[auto] lg:min-h-[70vh]"
        >
          <div className="hidden sm:block absolute top-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-orange-100/40 to-blue-100/40 rounded-full blur-[60px] -z-10 -translate-x-1/3 -translate-y-1/4" />

          {/* LEFT */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}
            className="w-full lg:w-1/2 lg:pr-8 xl:pr-12 z-10 text-center lg:text-left"
          >
            <motion.div variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs sm:text-sm font-bold text-slate-700 mb-4 sm:mb-6 mt-4 sm:mt-6 lg:mt-0"
            >
              <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-orange-500" />
              <span>Chartered Accountant Advisory</span>
            </motion.div>

            <motion.h1 variants={fadeUp}
              className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.08] mb-4 sm:mb-6 tracking-tight"
            >
              Business{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Registration
              </span>
            </motion.h1>

            <motion.p variants={fadeUp}
              className="text-sm sm:text-base xl:text-lg text-slate-600 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Complete business incorporation support for startups and growing enterprises in Delhi. We provide the structural foundation for your vision.
            </motion.p>

            <motion.div variants={fadeUp}
              className="flex flex-col xs:flex-row flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <button
                onClick={() => setIsPanelOpen(true)}
                className="relative group overflow-hidden bg-slate-900 text-white w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgb(15,23,42,0.18)] hover:shadow-[0_6px_20px_rgb(37,99,235,0.28)] hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <span className="relative z-10">Start Your Registration</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={(e) => handleWhatsAppChat(e)}
                className="bg-white border border-slate-200 hover:border-green-300 hover:bg-green-50 text-slate-800 hover:text-green-700 w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </button>
            </motion.div>

            <motion.div variants={fadeUp}
              className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest"
            >
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> MCA Registered</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> 100% Compliant</div>
              <div className="flex items-center gap-1.5"><Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> 7–10 Day Delivery</div>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
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
                alt="ComplyWithCA Registration Expert"
                className="relative z-30
                  w-[65%] max-w-[240px]
                  sm:w-[60%] sm:max-w-[340px]
                  md:w-[55%] md:max-w-[420px]
                  lg:w-full lg:max-w-[540px]
                  xl:max-w-[620px]
                  h-auto object-contain
                  transition-all duration-700 ease-out hover:scale-[1.04] hover:-rotate-1 origin-bottom"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ── CORNERSTONE ── */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-200 p-6 sm:p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-10 sm:gap-14 lg:gap-16 items-center">

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  className="lg:w-5/12 text-center lg:text-left"
                >
                  <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">Why Proper Registration Matters</h4>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4 sm:mb-6 leading-tight tracking-tight">
                    The Foundation of Business Credibility
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base mb-5 sm:mb-8 leading-relaxed font-medium">
                    In India's competitive ecosystem, correct legal structuring isn't just about compliance — it's a signal of your enterprise's integrity to investors, partners, and customers. Our experts ensure you build on the right foundation from Day 1.
                  </p>
                  <div className="pl-4 sm:pl-6 border-l-4 border-blue-600 py-2">
                    <p className="text-xs sm:text-sm font-bold text-slate-500 italic">"The structure you choose today defines the scale you can achieve tomorrow."</p>
                  </div>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                  className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
                >
                  {credibilityCards.map((card, idx) => (
                    <motion.div key={idx} variants={fadeUp}
                      className="group bg-slate-50 border-2 border-slate-200 hover:border-blue-500 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgb(37,99,235,0.1)] hover:-translate-y-1"
                    >
                      <div className="relative h-28 sm:h-32 overflow-hidden">
                        <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent" />
                        <div className="absolute top-2 left-2 w-8 h-8 bg-white/95 rounded-lg flex items-center justify-center shadow-md">
                          <card.icon size={14} className="text-blue-600" strokeWidth={1.5} />
                        </div>
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-700 transition-colors">{card.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{card.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

              </div>
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-8 sm:mb-12"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">Simple Pricing</h4>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-2 sm:mb-3">Registration Packages</h2>
              <p className="text-slate-500 text-sm sm:text-base font-medium">Transparent pricing. Structured execution.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-5xl mx-auto">
              {packages.map((pkg, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <motion.div key={idx}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onMouseLeave={() => setActiveIndex(0)}
                    initial={false}
                    animate={{ y: isActive ? -8 : 0, scale: isActive ? 1.02 : 1 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                    className={`relative rounded-2xl p-6 sm:p-7 bg-white transition-all duration-300 ${isActive
                      ? "border-2 border-green-500 shadow-[0_12px_40px_rgba(34,197,94,0.15)]"
                      : "border border-slate-200 shadow-md"}`}
                  >
                    {isActive && <div className="absolute -inset-1.5 bg-green-500/8 blur-xl rounded-2xl -z-10" />}
                    {pkg.isRecommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase whitespace-nowrap">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 sm:mb-5">{pkg.tier}</h3>
                    <div className="flex items-baseline gap-1.5 mb-5 sm:mb-6">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900">{pkg.price}</span>
                      <span className="text-xs sm:text-sm text-slate-400">{pkg.subtitle}</span>
                    </div>
                    <div className="h-px bg-slate-100 mb-5 sm:mb-6" />
                    <ul className="space-y-3 mb-6 sm:mb-8">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                          <CheckCircle2 size={15} className="text-green-500 mt-0.5 shrink-0" /> {feat}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={(e) => handleWhatsAppChat(e, `${pkg.tier} Package`)}
                      className={`w-full py-3 sm:py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${isActive
                        ? "bg-green-500 text-white shadow-lg shadow-green-500/25 hover:bg-green-600"
                        : "bg-slate-100 text-slate-800 hover:bg-green-50 hover:text-green-600"}`}
                    >
                      <FaWhatsapp className="text-base shrink-0" /> {pkg.buttonText}
                    </button>
                    <p className="text-center mt-3 sm:mt-4 text-[10px] text-slate-400 uppercase tracking-widest">No Hidden Charges</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── ECOSYSTEM ── */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600 blur-[100px] sm:blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600 blur-[100px] sm:blur-[120px]" />
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div className="text-center mb-8 sm:mb-12"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-400 uppercase mb-2 sm:mb-3">Full Spectrum</h4>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 tracking-tight">Comprehensive Service Ecosystem</h2>
              <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full" />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
            >
              {ecosystemServices.map((service, idx) => (
                <motion.div key={idx} variants={fadeUp}
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

        {/* ── PROCESS TIMELINE ── */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-200 p-6 sm:p-8 md:p-12">
              <motion.div className="text-center mb-8 sm:mb-12"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              >
                <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">How It Works</h4>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-2 sm:mb-3 tracking-tight">Registration Process</h2>
                <p className="text-slate-500 text-sm sm:text-base font-medium">Precision execution at every phase.</p>
              </motion.div>

              <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-5 sm:left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 md:-translate-x-1/2" />
                <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
                  {processSteps.map((ps, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <div key={ps.id} className={`relative flex flex-col md:flex-row items-start md:items-center justify-between w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className="hidden md:block md:w-[45%]" />
                        <div className="absolute left-5 sm:left-6 md:left-1/2 transform -translate-x-1/2 z-20 mt-5 md:mt-0">
                          <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                            <span className="font-bold text-xs sm:text-sm">{ps.id}</span>
                          </div>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-60px" }}
                          transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                          className="w-full md:w-[45%] pl-14 sm:pl-16 md:pl-0"
                        >
                          <div className="bg-slate-50 border-2 border-slate-200 group-hover:border-blue-400 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-[0_8px_24px_rgb(37,99,235,0.1)]">
                            <div className="relative h-24 sm:h-28 overflow-hidden">
                              <img src={ps.img} alt={ps.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/10 to-transparent" />
                            </div>
                            <div className="p-4 sm:p-5">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                                  <ps.icon size={14} className="text-blue-600" />
                                </div>
                                <h3 className="text-sm sm:text-base font-bold text-slate-900">{ps.title}</h3>
                              </div>
                              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{ps.desc}</p>
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

        {/* ── FAQ ── */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-8 sm:mb-12"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">FAQ</h4>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Common Inquiries</h2>
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

        {/* ── BOTTOM CTA ── */}
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-100">
          <div className="max-w-6xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="relative rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&auto=format&fit=crop" alt="Modern office" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/93 via-slate-900/82 to-blue-900/70" />
              </div>
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] bg-blue-600/25 blur-[100px] sm:blur-[120px] rounded-full" />
              </div>
              <div className="relative z-10 p-7 sm:p-10 md:p-16 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                  Start Your Business the Right Way.
                </h2>
                <p className="text-slate-300 text-sm sm:text-base lg:text-lg mb-7 sm:mb-10 max-w-xl mx-auto font-medium leading-relaxed">
                  Connect with our senior CA partners via WhatsApp for a zero-cost initial consultation on the best structure for your business.
                </p>
                <button
                  onClick={(e) => handleWhatsAppChat(e, "Business Registration")}
                  className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-7 sm:px-10 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all shadow-[0_0_30px_rgba(37,211,102,0.35)] flex items-center justify-center gap-2 sm:gap-3 mx-auto hover:scale-105 active:scale-95 animate-pulse"
                >
                  <FaWhatsapp className="text-lg sm:text-2xl shrink-0" />
                  Book Registration Consultation on WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ── DETAILS MODAL ── */}
      <AnimatePresence>
        {selectedDetail && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9998]"
              onClick={() => setSelectedDetail(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, y: 20, x: "-50%" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed top-1/2 left-1/2 w-[92%] max-w-2xl bg-white rounded-[2rem] shadow-2xl z-[9999] overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]"
            >
              <div className="bg-slate-50 px-6 sm:px-8 py-5 sm:py-6 border-b border-slate-100 flex justify-between items-start shrink-0 relative">
                <div className={`absolute top-0 left-0 w-full h-1 ${selectedDetail.title === 'Startup India' ? 'bg-orange-500' : 'bg-blue-600'}`} />
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white ${selectedDetail.title === 'Startup India' ? 'bg-orange-500' : 'bg-blue-600'}`}>
                    <selectedDetail.icon size={22} />
                  </div>
                  <div>
                    <div className={`text-[10px] font-bold tracking-wider uppercase mb-1 ${selectedDetail.title === 'Startup India' ? 'text-orange-500' : 'text-blue-600'}`}>{selectedDetail.tag}</div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">{selectedDetail.title}</h2>
                  </div>
                </div>
                <button onClick={() => setSelectedDetail(null)} className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors flex items-center justify-center text-slate-600 shrink-0">
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>
              <div className="px-6 sm:px-8 py-6 sm:py-8 overflow-y-auto">
                <p className="text-slate-600 text-base sm:text-lg font-medium mb-6 sm:mb-8 leading-relaxed">{selectedDetail.desc}</p>
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Who Should Choose This?</h4>
                    <p className="text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed font-medium">{selectedDetail.details.who}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Why Choose This Structure?</h4>
                    <p className="text-slate-800 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 leading-relaxed">{selectedDetail.details.why}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Key Features & Requirements</h4>
                    <ul className="space-y-3">
                      {selectedDetail.details.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                          <CheckCircle2 size={20} className={`shrink-0 ${selectedDetail.title === 'Startup India' ? "text-orange-500" : "text-blue-500"}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="p-5 sm:p-6 bg-white border-t border-slate-100 shrink-0">
                <button
                  onClick={(e) => { setSelectedDetail(null); handleWhatsAppChat(e, `Registering a ${selectedDetail.title}`); }}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle size={22} /> Chat with Expert to Register
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── SLIDE PANEL FORM ── */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
              onClick={() => setIsPanelOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[520px] bg-gradient-to-b from-white to-slate-50 z-[9999] shadow-[0_20px_80px_rgba(0,0,0,0.25)] border-l border-slate-200 flex flex-col"
            >
              <div className="sticky top-0 bg-white/80 backdrop-blur-md z-20 px-5 sm:px-8 pt-5 sm:pt-8 pb-4 sm:pb-6 border-b border-slate-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-slate-900">{serviceName} Intake</h2>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">Secure • Structured • Priority Scored</p>
                  </div>
                  <button onClick={() => setIsPanelOpen(false)} className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition text-slate-600 text-sm">✕</button>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-6">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className={`h-1.5 sm:h-2 flex-1 rounded-full transition-all duration-300 ${step >= s ? "bg-gradient-to-r from-blue-600 to-indigo-600" : "bg-slate-200"}`} />
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 sm:py-8 space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                    {step === 1 && "Contact Information"}
                    {step === 2 && "Business Details"}
                    {step === 3 && "Directors & Capital"}
                    {step === 4 && "Final Confirmation"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Step {step} of 4</p>
                </div>

                {step === 1 && (
                  <div className="space-y-3 sm:space-y-4">
                    <Input name="name" placeholder="Full Name" />
                    <Input name="email" placeholder="Email Address" />
                    <Input name="phone" placeholder="Phone Number" />
                    <SelectField name="contactMode">
                      <option value="">Preferred Contact Mode</option>
                      <option>Phone Call</option>
                      <option>WhatsApp</option>
                      <option>Email</option>
                    </SelectField>
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-3 sm:space-y-4">
                    <Input name="businessName" placeholder="Proposed Company Name" />
                    <SelectField name="structure">
                      <option value="">Select Business Structure</option>
                      <option>Private Limited</option>
                      <option>LLP</option>
                      <option>OPC</option>
                      <option>Startup India</option>
                    </SelectField>
                    <Input name="state" placeholder="State of Registration" />
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-3 sm:space-y-4">
                    <SelectField name="directors">
                      <option value="">Number of Directors</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3+</option>
                    </SelectField>
                    <Input name="capital" placeholder="Authorized Capital (₹)" />
                    <Input name="businessActivity" placeholder="Nature of Business Activity" />
                  </div>
                )}
                {step === 4 && (
                  <div className="space-y-3 sm:space-y-4">
                    <SelectField name="timeline">
                      <option value="">Expected Timeline</option>
                      <option>Immediate</option>
                      <option>Within 7 Days</option>
                      <option>This Month</option>
                    </SelectField>
                    <textarea
                      name="message"
                      placeholder="Additional notes (optional)"
                      rows="4"
                      value={regForm.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none text-sm"
                    />
                  </div>
                )}
              </div>

              <div className="px-5 sm:px-8 py-4 sm:py-6 border-t border-slate-200 bg-white sticky bottom-0">
                <div className="flex justify-between items-center">
                  {step > 1 ? (
                    <button onClick={() => setStep(step - 1)} className="px-4 sm:px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition text-sm">Back</button>
                  ) : <div />}
                  {step < 4 ? (
                    <button
                      onClick={() => { if (validateStep()) setStep(step + 1); else alert("Please complete required fields."); }}
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