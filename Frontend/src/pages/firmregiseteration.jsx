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
  Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';
import expertImage from "../assets/image12.png"; // Imported your 3D image
import Footer from '../components/footer';
import emailjs from "@emailjs/browser";

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

const features = [
  { icon: FileSignature, title: "Custom Deed Drafting", desc: "Meticulously crafted partnership deeds covering profit sharing, dispute resolution, and capital contribution." },
  { icon: ShieldCheck, title: "Legal Structuring", desc: "Expert advisory on choosing between registered, unregistered, or LLP formats based on your risk profile." },
  { icon: Landmark, title: "Registrar Liaison", desc: "End-to-end handling of ROF (Registrar of Firms) or MCA (Ministry of Corporate Affairs) submissions." },
  { icon: Scale, title: "Dispute Safeguards", desc: "Ironclad legal clauses designed to protect individual partners and ensure smooth operational continuity." }
];

const pricingTiers = [
  {
    name: "Unregistered Partnership",
    price: "1,999",
    features: ["Custom Partnership Deed", "PAN & TAN Application", "MSME Registration", "Bank Account Resolution"],
    popular: false,
  },
  {
    name: "LLP Incorporation",
    // badge: "MOST SECURE",
    price: "₹1,999",
    features: ["2 DIN & 2 DSC Included", "Name Approval (RUN-LLP)", "LLP Agreement Drafting", "Complete MCA Filing"],
    popular: true,
  },
  // {
  //   name: "Registered Partnership",
  //   price: "₹4,999",
  //   features: ["Everything in Unregistered", "Notary & Stamp Paper Management", "ROF Filing & Follow-up", "Official Registration Certificate"],
  //   popular: false,
  // }
];

const processSteps = [
  {
    id: "01",
    title: "Strategy & Drafting",
    desc: "We consult with all partners to understand terms and draft a legally structured Partnership Deed or LLP Agreement aligned with regulatory requirements.",
    icon: ScrollText
  },
  {
    id: "02",
    title: "Client Execution & Stamp Duty",
    desc: "Clients are responsible for executing the documents, payment of applicable stamp duty, franking, and notarization. We provide complete guidance and document support throughout this process.",
    icon: Gavel
  },
  {
    id: "03",
    title: "Filing & Registration",
    desc: "Once executed, we handle submission to the Registrar of Firms (ROF) or Ministry of Corporate Affairs (MCA) for official registration and legal recognition.",
    icon: Landmark
  }
];

const faqs = [
  { q: "What is the difference between a registered and unregistered partnership?", a: "An unregistered partnership is formed just by signing a deed. A registered partnership is officially recorded with the Registrar of Firms (ROF). Only registered partnerships can file legal suits against third parties or co-partners." },
  { q: "Is an LLP better than a traditional Partnership?", a: "In most modern business scenarios, yes. An LLP provides 'Limited Liability', meaning your personal assets are protected if the business incurs debt. A traditional partnership carries unlimited personal liability." },
  { q: "Do all partners need a Digital Signature (DSC) for an LLP?", a: "Yes, for an LLP, all designated partners require a Class 3 Digital Signature Certificate (DSC) to digitally sign and file documents with the MCA." }
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
export default function FirmRegistration() {
  const [openFaq, setOpenFaq] = useState(0);
  const navigate = useNavigate();

  const handleWhatsAppChat = (e, context = "Firm Registration") => {
    if (e) e.stopPropagation();
    const phoneNumber = "9311702025";
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
    name: "",
    email: "",
    phone: "",
    contactMode: "",
    firmType: "",
    partners: "",
    capital: "",
    registeredState: "",
    needGST: "",
    timeline: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFirmForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateStep = () => {
    if (step === 1)
      return firmForm.name && firmForm.email && firmForm.phone;

    if (step === 2)
      return firmForm.firmType && firmForm.partners;

    if (step === 3)
      return firmForm.registeredState && firmForm.timeline;

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
    if (isPanelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPanelOpen]);

  const handleSubmit = async () => {
    if (!validateStep()) {
      alert("Please complete required fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      const dynamicFields = `
Firm Type: ${firmForm.firmType || "-"}
Number of Partners: ${firmForm.partners || "-"}
Capital Contribution: ₹${firmForm.capital || "-"}
Registered State: ${firmForm.registeredState || "-"}
GST Required: ${firmForm.needGST || "-"}
`;

      const leadScore = calculateLeadScore();
      const priority = leadScore >= 60 ? "HIGH PRIORITY" : "STANDARD";

      const templateParams = {
        serviceName: "Firm / LLP Registration",
        name: firmForm.name,
        email: firmForm.email,
        phone: firmForm.phone,
        contactMode: firmForm.contactMode || "-",
        timeline: firmForm.timeline || "-",
        message: firmForm.message || "-",
        dynamicFields,
        leadScore,
        priority
      };

      await emailjs.send(
        "service_ghj2doe",
        "template_qkg4m4s",
        templateParams,
        "KJ9IR47xK9gNAOEYd"
      );

      alert("Firm registration request submitted successfully!");

      setFirmForm({
        name: "", email: "", phone: "", contactMode: "", firmType: "", partners: "",
        capital: "", registeredState: "", needGST: "", timeline: "", message: ""
      });

      setStep(1);
      setIsPanelOpen(false);

    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="min-h-screen bg-[#fafcff] font-sans text-slate-800 selection:bg-indigo-200 selection:text-indigo-900 overflow-x-hidden">
      <Navbar />

      <main className="pt-24 pb-20">

        {/* ==========================================
            HERO SECTION 
            ========================================== */}
        <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-12 md:pt-20 pb-20 md:pb-32 grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-blue-100/50 via-indigo-100/40 to-purple-100/30 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/4 -translate-y-1/4" />

          {/* Left Content Area */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full lg:pr-8 xl:pr-12 z-10"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm text-indigo-700 text-xs font-bold tracking-wider uppercase mb-8 mt-8 lg:mt-0">
              <Handshake className="w-4 h-4 text-indigo-600" /> Co-Founder Legal Frameworks
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] mb-6 tracking-tight">
              Firm & LLP <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Registration</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg xl:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
              Build your business on a legally binding, structurally sound foundation. We draft ironclad agreements and manage end-to-end ROF & MCA compliance.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsPanelOpen(true)}
                className="relative group overflow-hidden bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-[0_8px_30px_rgb(15,23,42,0.2)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.4)] hover:-translate-y-0.5"
              >
                <span className="relative z-10">Start Incorporation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={(e) => handleWhatsAppChat(e, "Choosing between Partnership and LLP")}
                className="bg-white/50 backdrop-blur-sm border border-slate-200 hover:bg-white text-slate-800 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-sm"
              >
                <MessageCircle className="w-5 h-5 text-indigo-600" /> Consult an Expert
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
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute w-[100%] h-[100%] max-w-[850px] max-h-[850px] bg-gradient-to-tr from-indigo-600 via-purple-500 to-blue-400 rounded-full blur-[140px] opacity-40 -z-10"
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
                alt="ComplyWithCA Firm Expert"
                className="ml-30 relative z-30 w-[110%] lg:w-[185%] xl:w-[255%] max-w-none h-auto object-contain drop-shadow-[0_40px_80px_rgba(15,23,42,0.3)] transition-all duration-700 ease-out hover:scale-[1.08] hover:-rotate-1 origin-bottom"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ==========================================
            THE DECISION MATRIX
            ========================================== */}
        <section className="py-24 bg-white border-t border-slate-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h4 className="text-sm font-bold tracking-[0.2em] text-indigo-600 uppercase mb-4">Structural Comparison</h4>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Partnership vs. LLP</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">Make an informed decision based on your risk appetite and growth projections.</p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-slate-900 text-white rounded-full items-center justify-center font-black text-xl z-20 shadow-2xl border-4 border-white">
                VS
              </div>

              <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
                className="grid lg:grid-cols-2 gap-8 lg:gap-0"
              >
                {firmTypes.map((firm, idx) => (
                  <motion.div
                    key={idx} variants={fadeUp}
                    className={`relative p-8 md:p-12 ${idx === 0 ? 'bg-slate-50 lg:rounded-l-[3rem] lg:rounded-r-none rounded-[2rem] border border-slate-200' : 'bg-gradient-to-br from-indigo-600 to-blue-700 text-white lg:rounded-r-[3rem] lg:rounded-l-none rounded-[2rem] shadow-2xl z-10'}`}
                  >
                    <div className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-6 ${idx === 0 ? 'bg-blue-100 text-blue-700' : 'bg-white/20 text-indigo-50 backdrop-blur-md'}`}>
                      {firm.tag}
                    </div>
                    <h3 className={`text-3xl font-black mb-4 ${idx === 0 ? 'text-slate-900' : 'text-white'}`}>{firm.type}</h3>
                    <p className={`mb-8 leading-relaxed ${idx === 0 ? 'text-slate-600' : 'text-indigo-100'}`}>{firm.desc}</p>

                    <div className="space-y-6">
                      <div>
                        <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${idx === 0 ? 'text-green-600' : 'text-emerald-300'}`}>Advantages</h4>
                        <ul className="space-y-3">
                          {firm.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm font-medium">
                              <CheckCircle2 size={18} className={`shrink-0 ${idx === 0 ? 'text-green-500' : 'text-emerald-400'}`} />
                              <span className={idx === 0 ? 'text-slate-700' : 'text-white'}>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className={`pt-6 border-t ${idx === 0 ? 'border-slate-200' : 'border-indigo-500/50'}`}>
                        <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 ${idx === 0 ? 'text-red-500' : 'text-rose-300'}`}>Limitations</h4>
                        <ul className="space-y-3">
                          {firm.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm font-medium">
                              <XCircle size={18} className={`shrink-0 ${idx === 0 ? 'text-red-400' : 'text-rose-400'}`} />
                              <span className={idx === 0 ? 'text-slate-700' : 'text-white'}>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ==========================================
            PRICING TIER CARDS (WHATSAPP INTEGRATED)
            ========================================== */}
        <section className="py-32 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Heading */}
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Formation Packages
              </h2>
              <p className="text-slate-500 text-lg font-medium">
                Transparent pricing for premium legal structuring.
              </p>
            </div>

            {/* Centered Cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex justify-center"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl w-full">

                {pricingTiers.map((tier, idx) => {
                  const isActive = activeIndex === idx;

                  return (
                    <motion.div
                      key={idx}
                      onMouseEnter={() => setActiveIndex(idx)}
                      onMouseLeave={() => setActiveIndex(null)}
                      initial={false}
                      animate={{
                        y: isActive ? -18 : 0,
                        scale: isActive ? 1.04 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className={`
                relative rounded-[2rem] p-10 bg-white transition-all duration-300
                ${isActive
                          ? "border-2 border-[#25D366] shadow-2xl shadow-[#25D366]/20"
                          : "border border-slate-200 shadow-lg"}
              `}
                    >

                      {/* Green Glow Effect */}
                      {isActive && (
                        <div className="absolute -inset-4 bg-[#25D366]/15 blur-3xl rounded-[2rem] -z-10" />
                      )}

                      {/* Popular Badge
              {tier.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-bold tracking-widest px-5 py-2 rounded-full shadow-md whitespace-nowrap">
                  {tier.badge || "RECOMMENDED"}
                </div>
              )} */}

                      {/* Package Title */}
                      <h3 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-6 text-center">
                        {tier.name}
                      </h3>

                      {/* Price */}
                      <div className="flex justify-center items-baseline gap-2 mb-8 pb-8 border-b border-slate-100">
                        <span className="text-5xl font-black text-slate-900">
                          {tier.price}
                        </span>
                        <span className="text-slate-400 text-sm font-medium">
                          + Govt. Fees
                        </span>
                      </div>

                      {/* Features */}
                      <ul className="space-y-4 mb-10">
                        {tier.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                            <CheckCircle2
                              size={18}
                              className={`shrink-0 mt-0.5 transition-colors ${isActive ? "text-[#25D366]" : "text-slate-400"
                                }`}
                            />
                            {feat}
                          </li>
                        ))}
                      </ul>

                      {/* WhatsApp Button */}
                      <button
                        onClick={(e) => handleWhatsAppChat(e, `${tier.name} Package`)}
                        className={`
                  w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2
                  ${isActive
                            ? "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:bg-[#128C7E]"
                            : "bg-slate-100 text-slate-900 hover:bg-[#25D366]/10 hover:text-[#128C7E]"}
                `}
                      >
                        <MessageCircle size={20} />
                        {tier.popular ? "Start Plan" : "Get Quote"}
                      </button>

                      <div className="text-center mt-6 text-xs text-slate-400 tracking-widest font-semibold">
                        GOVT / STAMP DUTY EXTRA
                      </div>

                    </motion.div>
                  );
                })}

              </div>
            </motion.div>

          </div>
        </section>

        {/* ==========================================
            EXPERT FEATURES (Bento Grid)
            ========================================== */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:w-1/3">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                  Beyond <br />Paperwork.
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  A partnership deed is the constitution of your business. We engineer your documents to prevent future disputes, optimize taxation, and streamline succession.
                </p>
                <div className="w-12 h-1.5 bg-indigo-600 rounded-full" />
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="lg:w-2/3 grid sm:grid-cols-2 gap-6">
                {features.map((f, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                        <f.icon size={24} strokeWidth={1.5} />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 leading-tight">{f.title}</h4>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>


        {/* ==========================================
            REGISTRATION PROCESS TIMELINE
            ========================================== */}
        <section className="py-24 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Registration Timeline</h2>
              <p className="text-slate-500">From concept to official legal entity.</p>
            </div>

            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />

              <div className="flex flex-col gap-12 md:gap-16">
                {processSteps.map((step, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div key={step.id} className={`relative flex flex-col md:flex-row items-center w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}>
                      <div className="hidden md:block md:w-1/2" />
                      <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                        <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform">
                          <step.icon size={20} />
                        </div>
                      </div>
                      <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
                        className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}
                      >
                        <div className="relative bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                          <div className={`absolute top-1/2 -translate-y-1/2 text-[100px] font-black text-slate-50 select-none pointer-events-none -z-10 ${isEven ? '-right-4' : '-left-4'}`}>
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
        <section className="py-24 bg-white border-t border-slate-100">
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
                    <ChevronDown className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-indigo-600' : ''}`} />
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
            BOTTOM CTA (Premium WhatsApp Green Action)
            ========================================== */}
        <section className="py-28 px-6 lg:px-8 bg-slate-900 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#25D366]/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Solidify Your Partnership.</h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-medium leading-relaxed">
                Connect with our senior legal and CA team to structure an agreement that protects your interests and enables scalable growth.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={(e) => handleWhatsAppChat(e, "Firm/LLP Registration Consultation")}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-2 hover:-translate-y-1 text-lg"
                >
                  <MessageCircle size={22} />
                  Chat on WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ==========================================
          FORM SLIDE PANEL
          ========================================== */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              onClick={() => setIsPanelOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 22 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[520px] bg-white z-[9999] shadow-2xl border-l border-slate-200 flex flex-col"
            >
              {/* HEADER */}
              <div className="sticky top-0 bg-white z-20 px-8 pt-8 pb-6 border-b border-slate-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {serviceName} Intake
                    </h2>
                    <p className="text-sm text-slate-500">
                      Structured onboarding for firm formation
                    </p>
                  </div>

                  <button
                    onClick={() => setIsPanelOpen(false)}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex gap-2 mt-6">
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`h-2 flex-1 rounded-full ${step >= s ? "bg-indigo-600" : "bg-slate-200"
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* BODY */}
              <div className="flex-1 overflow-y-auto px-8 py-8 space-y-5">
                {step === 1 && (
                  <>
                    <h3 className="text-lg font-semibold">Contact Details</h3>
                    <input name="name" placeholder="Full Name" value={firmForm.name} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                    <input name="email" placeholder="Email Address" value={firmForm.email} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                    <input name="phone" placeholder="Phone Number" value={firmForm.phone} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                    <select
                      name="contactMode"
                      value={firmForm.contactMode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                    >
                      <option value="">Preferred Contact Mode</option>
                      <option>Phone Call</option>
                      <option>WhatsApp</option>
                      <option>Email</option>
                    </select>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h3 className="text-lg font-semibold">Firm Details</h3>
                    <select name="firmType" value={firmForm.firmType} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition">
                      <option value="">Select Firm Type</option>
                      <option>Partnership Firm</option>
                      <option>Registered Partnership</option>
                      <option>LLP</option>
                    </select>

                    <input name="partners" placeholder="Number of Partners" value={firmForm.partners} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                    <input name="capital" placeholder="Capital Contribution (₹)" value={firmForm.capital} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                  </>
                )}

                {step === 3 && (
                  <>
                    <h3 className="text-lg font-semibold">Registration Preferences</h3>
                    <input name="registeredState" placeholder="Registered State" value={firmForm.registeredState} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                    <select name="needGST" value={firmForm.needGST} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition">
                      <option value="">Need GST?</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                    <select name="timeline" value={firmForm.timeline} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition">
                      <option value="">Expected Timeline</option>
                      <option>Immediate</option>
                      <option>Within 7 Days</option>
                      <option>This Month</option>
                    </select>
                    <textarea name="message" placeholder="Additional Notes" value={firmForm.message} onChange={handleChange} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" />
                  </>
                )}
              </div>

              {/* FOOTER */}
              <div className="px-8 py-6 border-t border-slate-100 flex justify-between">
                {step > 1 ? (
                  <button onClick={() => setStep(step - 1)} className="px-5 py-2 bg-slate-100 rounded-lg">
                    Back
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button
                    onClick={() => validateStep() ? setStep(step + 1) : alert("Complete required fields")}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl disabled:opacity-60"
                  >
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