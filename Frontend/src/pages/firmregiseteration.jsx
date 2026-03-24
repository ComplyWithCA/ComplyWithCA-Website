import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  Users,
  Handshake,
  Scale,
  FileText,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  FileSignature,
  Briefcase,
  Landmark,
  XCircle,
  Gavel,
  ScrollText,
  Phone,
  Mail,
  Sparkles,
  Clock,
  Search,
  FileCheck
} from 'lucide-react';
import Navbar from '../components/Navbar';
import expertImage from "../assets/image12.png";
import Footer from '../components/footer';
import emailjs from "@emailjs/browser";
import { FaWhatsapp } from "react-icons/fa";

// ==========================================
// 1. DATA ARRAYS
// ==========================================
const firmTypes = [
  {
    type: "Partnership Firm",
    tag: "QUICK START",
    desc: "Traditional structure governed by the Partnership Act, 1932. Ideal for small-scale, closely-knit businesses.",
    pros: ["Minimal compliance burden", "Easy & fast to set up", "Lower registration costs"],
    cons: ["Unlimited personal liability", "Not a separate legal entity"],
    color: "blue"
  },
  {
    type: "Limited Liability Partnership (LLP)",
    tag: "PREMIUM & SECURE",
    desc: "Modern corporate structure under the LLP Act, 2008. Blends the flexibility of a partnership with corporate security.",
    pros: ["Limited personal liability", "Separate legal entity", "Higher institutional trust"],
    cons: ["Higher setup cost", "Annual ROC compliance required"],
    color: "indigo"
  }
];

const credibilityCards = [
  {
    title: "Partnership Deed",
    desc: "Meticulously drafted deeds covering profit sharing, dispute resolution, and capital contribution.",
    icon: FileSignature,
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80&auto=format&fit=crop"
  },
  {
    title: "Legal Structuring",
    desc: "Expert advisory on choosing between registered, unregistered, or LLP formats based on your risk profile.",
    icon: Scale,
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80&auto=format&fit=crop"
  },
  {
    title: "ROC / MCA Filing",
    desc: "End-to-end handling of Registrar of Firms or Ministry of Corporate Affairs submissions.",
    icon: Landmark,
    img: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=400&q=80&auto=format&fit=crop"
  }
];

const ecosystemServices = [
  { title: "Partnership Deed Drafting", desc: "Custom partnership deeds covering all operational terms, profit ratios, dispute resolution, and exit clauses.", icon: FileSignature },
  { title: "LLP Incorporation", desc: "Complete MCA filing including DIN, DSC, name approval, and LLP Agreement drafting from scratch.", icon: Building2 },
  { title: "ROF Registration", desc: "Official registration with the Registrar of Firms for legal standing and the right to sue third parties.", icon: Landmark },
  { title: "Deed Amendment", desc: "Modify partnership terms, add or remove partners, and update capital structures as your business evolves.", icon: ScrollText },
  { title: "Firm Advisory", desc: "Strategic guidance on structure selection, taxation optimization, and long-term scalability planning.", icon: Briefcase }
];

const pricingTiers = [
  {
    name: "Unregistered Partnership",
    price: "₹1,999",
    subtitle: "/ one-time",
    features: ["Custom Partnership Deed", "PAN & TAN Application", "MSME Registration", "Bank Account Resolution"],
    buttonText: "Get Quote",
    isRecommended: false,
  },
  {
    name: "LLP Incorporation",
    price: "₹1,999",
    subtitle: "/ one-time",
    features: ["2 DIN & 2 DSC Included", "Name Approval (RUN-LLP)", "LLP Agreement Drafting", "Complete MCA Filing"],
    buttonText: "Start Plan",
    isRecommended: true,
  },
];

const processSteps = [
  {
    id: "01",
    title: "Strategy & Drafting",
    desc: "We consult with all partners to understand terms and draft a legally structured Partnership Deed or LLP Agreement aligned with regulatory requirements.",
    icon: ScrollText,
    img: "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Client Execution & Stamp Duty",
    desc: "Clients are responsible for executing the documents, payment of applicable stamp duty, franking, and notarization. We provide complete guidance throughout.",
    icon: Gavel,
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Filing & Registration",
    desc: "Once executed, we handle submission to the Registrar of Firms (ROF) or Ministry of Corporate Affairs (MCA) for official registration and legal recognition.",
    icon: Landmark,
    img: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=500&q=80&auto=format&fit=crop"
  }
];

const faqs = [
  { q: "What is the difference between a registered and unregistered partnership?", a: "An unregistered partnership is formed just by signing a deed. A registered partnership is officially recorded with the Registrar of Firms (ROF). Only registered partnerships can file legal suits against third parties or co-partners." },
  { q: "Is an LLP better than a traditional Partnership?", a: "In most modern business scenarios, yes. An LLP provides 'Limited Liability', meaning your personal assets are protected if the business incurs debt. A traditional partnership carries unlimited personal liability." },
  { q: "Do all partners need a Digital Signature (DSC) for an LLP?", a: "Yes, for an LLP, all designated partners require a Class 3 Digital Signature Certificate (DSC) to digitally sign and file documents with the MCA." },
  { q: "How long does firm registration take?", a: "An unregistered partnership deed can be ready in 2–3 days. LLP incorporation typically takes 10–15 working days subject to MCA processing timelines." },
  { q: "Are government fees included in your pricing?", a: "Our service charges are separate. Government fees, stamp duty, and notary charges are borne by the client as per applicable state rates." }
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
export default function FirmRegistration() {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeIndex, setActiveIndex] = useState(1);
  const navigate = useNavigate();

  const handleWhatsAppChat = (e, context = "Firm Registration") => {
    if (e) e.stopPropagation();
    const phoneNumber = "919289758145";
    const message = `Hi! I want to consult regarding ${context}.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // ===============================
  // FORM STATE
  // ===============================
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceName = "Firm / LLP Registration";

  const [firmForm, setFirmForm] = useState({
    name: "", email: "", phone: "", contactMode: "",
    firmType: "", partners: "", capital: "",
    registeredState: "", needGST: "", timeline: "", message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFirmForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep = () => {
    if (step === 1) return firmForm.name && firmForm.email && firmForm.phone && firmForm.contactMode;
    if (step === 2) return firmForm.firmType && firmForm.partners;
    if (step === 3) return firmForm.registeredState && firmForm.timeline;
    return true;
  };

  const calculateLeadScore = () => {
    let score = 20;
    if (firmForm.firmType === "LLP") score += 25;
    if (firmForm.partners && Number(firmForm.partners) >= 3) score += 15;
    if (firmForm.needGST === "Yes") score += 15;
    if (firmForm.capital && Number(firmForm.capital) > 500000) score += 25;
    return score;
  };

  useEffect(() => {
    document.body.style.overflow = isPanelOpen ? "hidden" : "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isPanelOpen]);

  const handleSubmit = async () => {
    if (!validateStep()) { alert("Please complete required fields."); return; }
    try {
      setIsSubmitting(true);
      const dynamicFields = `Firm Type: ${firmForm.firmType || "-"}\nNumber of Partners: ${firmForm.partners || "-"}\nCapital Contribution: ₹${firmForm.capital || "-"}\nRegistered State: ${firmForm.registeredState || "-"}\nGST Required: ${firmForm.needGST || "-"}`;
      const leadScore = calculateLeadScore();
      const priority = leadScore >= 60 ? "HIGH PRIORITY" : "STANDARD";
      const templateParams = {
        serviceName: "Firm / LLP Registration",
        name: firmForm.name, email: firmForm.email, phone: firmForm.phone,
        contactMode: firmForm.contactMode || "-", timeline: firmForm.timeline || "-",
        message: firmForm.message || "-", dynamicFields, leadScore, priority
      };
      await emailjs.send("service_ghj2doe", "template_qkg4m4s", templateParams, "KJ9IR47xK9gNAOEYd");
      alert("Firm registration request submitted successfully!");
      setFirmForm({ name: "", email: "", phone: "", contactMode: "", firmType: "", partners: "", capital: "", registeredState: "", needGST: "", timeline: "", message: "" });
      setStep(1);
      setIsPanelOpen(false);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const Input = ({ name, placeholder }) => (
    <input name={name} placeholder={placeholder} value={firmForm[name]} onChange={handleChange} className={inputStyle} />
  );

  const Select = ({ name, children }) => (
    <select name={name} value={firmForm[name]} onChange={handleChange} className={inputStyle}>{children}</select>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      <Navbar />

      <main className="pt-24 pb-12 sm:pb-20">

        {/* ==========================================
            HERO SECTION
            ========================================== */}
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 md:pt-16 pb-10 sm:pb-16 md:pb-24 flex flex-col lg:flex-row items-center min-h-[auto] lg:min-h-[70vh]">

          <div className="hidden sm:block absolute top-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-[60px] -z-10 -translate-x-1/3 -translate-y-1/4" />

          {/* LEFT */}
          <motion.div
            initial="hidden" animate="visible" variants={staggerContainer}
            className="w-full lg:w-1/2 lg:pr-8 xl:pr-12 z-10 text-center lg:text-left"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs sm:text-sm font-bold text-slate-700 mb-4 sm:mb-6 mt-4 sm:mt-6 lg:mt-0">
              <Handshake className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-blue-500" />
              <span>Co-Founder Legal Frameworks</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.08] mb-4 sm:mb-6 tracking-tight">
              Firm & LLP{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Registration
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-sm sm:text-base xl:text-lg text-slate-600 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
              Build your business on a legally binding, structurally sound foundation. We draft ironclad agreements and manage end-to-end ROF & MCA compliance.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col xs:flex-row flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => setIsPanelOpen(true)}
                className="relative group overflow-hidden bg-slate-900 text-white w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgb(15,23,42,0.18)] hover:shadow-[0_6px_20px_rgb(37,99,235,0.28)] hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <span className="relative z-10">Start Incorporation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={(e) => handleWhatsAppChat(e, "Choosing between Partnership and LLP")}
                className="bg-white border border-slate-200 hover:border-green-300 hover:bg-green-50 text-slate-800 hover:text-green-700 w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4" /> Consult an Expert
              </button>
            </motion.div>

            {/* TRUST BADGES */}
            <motion.div variants={fadeUp} className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
              <div className="flex items-center gap-1.5"><ShieldCheck className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> MCA Registered</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> 100% Compliant</div>
              <div className="flex items-center gap-1.5"><Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5" /> Fast Turnaround</div>
            </motion.div>
          </motion.div>

          {/* RIGHT — 3D image */}
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
                alt="ComplyWithCA Firm Expert"
                className="relative z-30 w-[340px] sm:w-[500px] md:w-[620px] lg:w-[900px] xl:w-[1050px] object-contain transition-all duration-700 ease-out hover:scale-[1.04] hover:-rotate-1 origin-bottom max-w-full"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ==========================================
            CORNERSTONE SECTION
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-200 p-6 sm:p-8 md:p-12">
              <div className="flex flex-col lg:flex-row gap-10 sm:gap-14 lg:gap-16 items-center">

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:w-5/12 text-center lg:text-left">
                  <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">Why Legal Structure Matters</h4>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4 sm:mb-6 leading-tight tracking-tight">
                    The Foundation of Business Credibility
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base mb-5 sm:mb-8 leading-relaxed font-medium">
                    A partnership deed is the constitution of your business. We engineer your documents to prevent future disputes, optimize taxation, and streamline succession planning from day one.
                  </p>
                  <div className="pl-4 sm:pl-6 border-l-4 border-blue-600 py-2">
                    <p className="text-xs sm:text-sm font-bold text-slate-500 italic">"A well-drafted deed today prevents costly litigation tomorrow."</p>
                  </div>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {credibilityCards.map((card, idx) => (
                    <motion.div key={idx} variants={fadeUp} className="group bg-slate-50 border-2 border-slate-200 hover:border-blue-500 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_24px_rgb(37,99,235,0.1)] hover:-translate-y-1">
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

        {/* ==========================================
            PRICING & PACKAGES
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="text-center mb-8 sm:mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">Simple Pricing</h4>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-2 sm:mb-3">
                Formation Packages
              </h2>
              <p className="text-slate-500 text-sm sm:text-base font-medium">Transparent pricing for premium legal structuring.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
              {pricingTiers.map((tier, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <motion.div
                    key={idx}
                    onMouseEnter={() => setActiveIndex(idx)}
                    initial={false}
                    animate={{ y: isActive ? -8 : 0, scale: isActive ? 1.02 : 1 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                    className={`relative rounded-2xl p-6 sm:p-7 bg-white transition-all duration-300 ${isActive ? "border-2 border-green-500 shadow-[0_12px_40px_rgba(34,197,94,0.15)]" : "border border-slate-200 shadow-md"}`}
                  >
                    {isActive && <div className="absolute -inset-1.5 bg-green-500/8 blur-xl rounded-2xl -z-10" />}
                    {tier.isRecommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full tracking-widest uppercase whitespace-nowrap">
                        Most Popular
                      </div>
                    )}

                    <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 sm:mb-5">{tier.name}</h3>

                    <div className="flex items-baseline gap-1.5 mb-5 sm:mb-6">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900">{tier.price}</span>
                      <span className="text-xs sm:text-sm text-slate-400">{tier.subtitle}</span>
                    </div>

                    <div className="h-px bg-slate-100 mb-5 sm:mb-6" />

                    <ul className="space-y-3 mb-6 sm:mb-8">
                      {tier.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                          <CheckCircle2 size={15} className="text-green-500 mt-0.5 shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={(e) => handleWhatsAppChat(e, `${tier.name} Package`)}
                      className={`w-full py-3 sm:py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${isActive ? "bg-green-500 text-white shadow-lg shadow-green-500/25 hover:bg-green-600" : "bg-slate-100 text-slate-800 hover:bg-green-50 hover:text-green-600"}`}
                    >
                      <FaWhatsapp className="text-base shrink-0" />
                      {tier.buttonText}
                    </button>

                    <p className="text-center mt-3 sm:mt-4 text-[10px] text-slate-400 uppercase tracking-widest">
                      GOVT / STAMP DUTY EXTRA
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==========================================
            COMPREHENSIVE ECOSYSTEM GRID (dark)
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600 blur-[100px] sm:blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600 blur-[100px] sm:blur-[120px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div className="text-center mb-8 sm:mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-400 uppercase mb-2 sm:mb-3">Full Spectrum</h4>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 tracking-tight">
                Comprehensive Service Ecosystem
              </h2>
              <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full" />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {ecosystemServices.map((service, idx) => (
                <motion.div key={idx} variants={fadeUp} className="group bg-white/5 border border-white/10 p-5 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(37,99,235,0.15)]">
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
            METHODICAL PROCESS (TIMELINE) — with photos
            ========================================== */}
        <section className="py-12 sm:py-16 md:py-20 bg-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-200 p-6 sm:p-8 md:p-12">
              <motion.div className="text-center mb-8 sm:mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">How It Works</h4>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-2 sm:mb-3 tracking-tight">Registration Timeline</h2>
                <p className="text-slate-500 text-sm sm:text-base font-medium">From concept to official legal entity.</p>
              </motion.div>

              <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-5 sm:left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 md:-translate-x-1/2" />

                <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
                  {processSteps.map((step, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <div key={step.id} className={`relative flex flex-col md:flex-row items-start md:items-center justify-between w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className="hidden md:block md:w-[45%]" />
                        <div className="absolute left-5 sm:left-6 md:left-1/2 transform -translate-x-1/2 z-20 mt-5 md:mt-0">
                          <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                            <span className="font-bold text-xs sm:text-sm">{step.id}</span>
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
                              <img src={step.img} alt={step.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
            <motion.div className="text-center mb-8 sm:mb-12" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
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
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
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
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&auto=format&fit=crop" alt="Modern office" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/93 via-slate-900/82 to-blue-900/70" />
              </div>
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] bg-blue-600/25 blur-[100px] sm:blur-[120px] rounded-full" />
              </div>

              <div className="relative z-10 p-7 sm:p-10 md:p-16 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tight leading-tight">
                  Solidify Your Partnership.
                </h2>
                <p className="text-slate-300 text-sm sm:text-base lg:text-lg mb-7 sm:mb-10 max-w-xl mx-auto font-medium leading-relaxed">
                  Connect with our senior legal and CA team to structure an agreement that protects your interests and enables scalable growth.
                </p>
                <button
                  onClick={(e) => handleWhatsAppChat(e, "Firm/LLP Registration Consultation")}
                  className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-7 sm:px-10 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all shadow-[0_0_30px_rgba(37,211,102,0.35)] flex items-center justify-center gap-2 sm:gap-3 mx-auto hover:scale-105 active:scale-95 animate-pulse"
                >
                  <FaWhatsapp className="text-lg sm:text-2xl shrink-0" />
                  Book Consultation on WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ==========================================
          FORM SLIDE PANEL — 4-step GST style
          ========================================== */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
              onClick={() => setIsPanelOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
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
                  <button onClick={() => setIsPanelOpen(false)} className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition text-slate-600 text-sm">
                    ✕
                  </button>
                </div>
                <div className="flex gap-2 mt-4 sm:mt-6">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className={`h-1.5 sm:h-2 flex-1 rounded-full transition-all duration-300 ${step >= s ? "bg-gradient-to-r from-blue-600 to-indigo-600" : "bg-slate-200"}`} />
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-5 sm:py-8 space-y-4 sm:space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                    {step === 1 && "Contact Information"}
                    {step === 2 && "Firm Details"}
                    {step === 3 && "Registration Preferences"}
                    {step === 4 && "Final Confirmation"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Step {step} of 4</p>
                </div>

                {step === 1 && (
                  <div className="space-y-3 sm:space-y-4">
                    <Input name="name" placeholder="Full Name" />
                    <Input name="email" placeholder="Work Email" />
                    <Input name="phone" placeholder="Phone Number" />
                    <Select name="contactMode">
                      <option value="">Preferred Contact Mode</option>
                      <option>Phone Call</option>
                      <option>WhatsApp</option>
                      <option>Email</option>
                    </Select>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-3 sm:space-y-4">
                    <Select name="firmType">
                      <option value="">Select Firm Type</option>
                      <option>Partnership Firm</option>
                      <option>Registered Partnership</option>
                      <option>LLP</option>
                    </Select>
                    <Input name="partners" placeholder="Number of Partners" />
                    <Input name="capital" placeholder="Capital Contribution (₹)" />
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-3 sm:space-y-4">
                    <Input name="registeredState" placeholder="State of Registration" />
                    <Select name="needGST">
                      <option value="">GST Registration Required?</option>
                      <option>Yes</option>
                      <option>No</option>
                    </Select>
                    <Select name="timeline">
                      <option value="">Expected Timeline</option>
                      <option>Immediate</option>
                      <option>Within 7 Days</option>
                      <option>This Month</option>
                    </Select>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-3 sm:space-y-4">
                    <textarea
                      name="message"
                      placeholder="Additional notes or requirements"
                      rows="4"
                      value={firmForm.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none text-sm"
                    />
                    {/* Summary */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs text-slate-600">
                      <p className="font-bold text-slate-800 text-sm mb-3">Request Summary</p>
                      <div className="flex justify-between"><span className="text-slate-400">Name</span><span className="font-medium">{firmForm.name || "—"}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Firm Type</span><span className="font-medium">{firmForm.firmType || "—"}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Partners</span><span className="font-medium">{firmForm.partners || "—"}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">State</span><span className="font-medium">{firmForm.registeredState || "—"}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Timeline</span><span className="font-medium">{firmForm.timeline || "—"}</span></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 sm:px-8 py-4 sm:py-6 border-t border-slate-200 bg-white sticky bottom-0">
                <div className="flex justify-between items-center">
                  {step > 1 ? (
                    <button onClick={() => setStep(step - 1)} className="px-4 sm:px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition text-sm">
                      Back
                    </button>
                  ) : <div />}

                  {step < 4 ? (
                    <button
                      onClick={() => validateStep() ? setStep(step + 1) : alert("Please complete all required fields.")}
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