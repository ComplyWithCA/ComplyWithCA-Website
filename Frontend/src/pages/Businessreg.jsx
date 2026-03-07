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
  Award,
  ArrowRight,
  MessageCircle,
  ChevronDown,
  Search,
  FileText,
  BadgeCheck,
  Phone,
  Mail,
  Sparkles,
  X
} from 'lucide-react';
import Navbar from '../components/Navbar';
import expertImage from "../assets/image8.png"; // Imported your 3D image
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import emailjs from "@emailjs/browser";

// ==========================================
// 1. DATA ARRAYS (Enhanced with Details)
// ==========================================
const structures = [
  {
    tag: "HIGH GROWTH", title: "Private Limited", desc: "Ideal for startups planning VC funding and equity scaling.", price: "₹6,499", icon: Building2,
    details: {
      who: "Tech startups, businesses seeking venture capital, and founders wanting a completely separate legal identity.",
      why: "It offers the highest level of limited liability protection, makes fundraising significantly easier by issuing shares, and provides unmatched credibility among suppliers and institutional clients.",
      features: ["Minimum 2 Directors required", "No minimum paid-up capital", "Distinct legal entity status", "Easy transfer of ownership"]
    }
  },
  {
    tag: "PROFESSIONAL FIRMS", title: "LLP Registration", desc: "Low compliance burden for service and professional firms.", price: "₹4,999", icon: Briefcase,
    details: {
      who: "Consultants, creative agencies, real estate professionals, and family-owned or closely-held businesses.",
      why: "Combines the limited liability protection of a corporate company with the operational flexibility of a traditional partnership. It has significantly lower annual compliance requirements compared to a Private Limited company.",
      features: ["Minimum 2 Partners required", "Lower registration cost", "No dividend distribution tax", "No requirement for mandatory board meetings"]
    }
  },
  {
    tag: "SOLO FOUNDERS", title: "One Person (OPC)", desc: "Full control with limited liability protection for solo ventures.", price: "₹5,999", icon: User,
    details: {
      who: "Solo entrepreneurs, freelancers, e-commerce sellers, and independent consultants looking to scale securely.",
      why: "Provides the exact same legal protection as a Private Limited company, but allows a single individual to own 100% of the business without needing a co-founder.",
      features: ["Only 1 Director/Shareholder needed", "Requires a nominee designation", "Limited liability protection", "Seamless conversion to Pvt Ltd later"]
    }
  },
  {
    tag: "GOVT BENEFITS", title: "Startup India", desc: "Unlock tax exemptions and DPIIT recognition for innovators.", price: "₹2,999", icon: Rocket,
    details: {
      who: "Innovative startups working towards development, improvement of products/services with high potential for wealth and employment generation.",
      why: "Unlocks massive government benefits and positions your company for accelerated growth through official state backing.",
      features: ["DPIIT Official Recognition", "80IAC Tax Holiday for 3 years", "Angel Tax Exemption (Section 56)", "Priority patent and trademark filing"]
    }
  }
];

const benefits = [
  { title: "Legal Recognition", desc: "Establish your business as a legal distinct entity to mitigate personal liability.", icon: Scale },
  { title: "Investor Readiness", desc: "Structure your corporate governance to seamlessly receive funding.", icon: TrendingUp },
  { title: "Liability Protection", desc: "Separate personal assets from business obligations effectively.", icon: ShieldCheck },
  { title: "Compliance Confidence", desc: "Automated reminders and expert oversight for all MCA filings.", icon: FileCheck }
];

const packages = [
  {
    tier: "Basic Incorporation",
    price: "₹4,999",
    features: ["2 DIN & 1 DSC (Class-3)", "Name Reservation (RUN)", "Drafting of MOA & AOA"],
    isPopular: false
  },
  {
    tier: "Standard Compliance",
    price: "₹12,499",
    features: ["Everything in Basic", "GST Registration", "MSME/Udyam Certificate", "Bank Account Assistance"],
    isPopular: true
  },
  {
    tier: "Complete Startup",
    price: "₹24,999",
    features: ["Everything in Standard", "Startup India Recognition", "Trademark Filing (1 Class)", "1 Year Compliance Calendar"],
    isPopular: false
  }
];

const processSteps = [
  { id: "01", title: "Consultation", desc: "Expert analysis of your business model to recommend the best entity structure and shareholding pattern.", icon: Search },
  { id: "02", title: "Documentation & Filing", desc: "Seamless collection of KYC and digital signatures, followed by precise filing with the Ministry of Corporate Affairs (MCA).", icon: FileText },
  { id: "03", title: "Incorporation & Support", desc: "Receive your Certificate of Incorporation, PAN, and TAN. We then assist with post-registration compliance and bank setup.", icon: BadgeCheck }
];

const faqs = [
  { q: "What documents are required for directors?", a: "Each director needs a PAN card, Aadhar card, passport-size photograph, and address proof such as a bank statement or utility bill." },
  { q: "Can I register if I am a solo founder?", a: "Yes. You can register as a One Person Company (OPC), which allows a single founder to enjoy the benefits of limited liability and corporate status." },
  { q: "Is GST registration mandatory for my business?", a: "GST registration is mandatory if your annual turnover exceeds ₹40 lakh for goods or ₹20 lakh for services (limits may vary by state and category). It is also required for certain businesses like e-commerce sellers." },
  { q: "How often do I need to file GST returns?", a: "Most businesses need to file monthly returns such as GSTR-1 and GSTR-3B. Some small taxpayers can opt for quarterly filing under the QRMP scheme." },
  { q: "What happens if GST returns are filed late?", a: "Late filing attracts penalties and interest charges. The late fee is ₹50 per day (₹25 CGST + ₹25 SGST), subject to maximum limits depending on the return type." },
  { q: "Do you provide ongoing GST compliance support?", a: "Yes. Our monthly compliance plans include GST return filing, ITC reconciliation, compliance monitoring, and expert CA consultation." }
];

// ==========================================
// 2. ANIMATION VARIANTS
// ==========================================
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40, damping: 15 } }
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function BusinessRegistration() {
  const [openFaq, setOpenFaq] = useState(0);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [activeIndex, setActiveIndex] = useState(1);

  // New State for Details Modal
  const [selectedDetail, setSelectedDetail] = useState(null);

  const calculateLeadScore = () => {
    let score = 30; // base score
    if (regForm.structure === "Private Limited") score += 20;
    if (regForm.structure === "Startup India") score += 25;
    if (regForm.directors === "3+") score += 15;
    if (regForm.gstRequired === "Yes") score += 15;
    if (regForm.capital && Number(regForm.capital) > 1000000) score += 25;
    if (regForm.timeline === "Immediate") score += 10;
    return score;
  };

  useEffect(() => {
    if (isPanelOpen || selectedDetail) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPanelOpen, selectedDetail]);

  const [regForm, setRegForm] = useState({
    name: "", email: "", phone: "", contactMode: "", directors: "", structure: "",
    proposedName: "", businessActivity: "", state: "", capital: "", gstRequired: "", timeline: "", message: ""
  });

  const validateStep = () => {
    if (step === 1) return regForm.name && regForm.email && regForm.phone && regForm.contactMode;
    if (step === 2) return regForm.structure && regForm.proposedName && regForm.state;
    if (step === 3) return regForm.directors && regForm.capital;
    if (step === 4) return regForm.timeline;
    return true;
  };

  const getServiceDynamicFields = () => {
    return `
Structure: ${regForm.structure || "-"}
Proposed Name: ${regForm.proposedName || "-"}
State: ${regForm.state || "-"}
Directors: ${regForm.directors || "-"}
Authorized Capital: ₹${regForm.capital || "-"}
Business Activity: ${regForm.businessActivity || "-"}
`;
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      alert("Please complete required fields.");
      return;
    }
    try {
      setIsSubmitting(true);
      const leadScore = calculateLeadScore();
      const priority = leadScore >= 60 ? "HIGH PRIORITY" : "STANDARD";
      const dynamicFields = getServiceDynamicFields();

      const templateParams = {
        serviceName: "Business Registration",
        name: regForm.name, email: regForm.email, phone: regForm.phone, contactMode: regForm.contactMode,
        timeline: regForm.timeline, message: regForm.message || "-", dynamicFields, leadScore, priority
      };

      await emailjs.send("service_ghj2doe", "template_qkg4m4s", templateParams, "KJ9IR47xK9gNAOEYd");
      alert("Registration request submitted successfully!");

      setRegForm({
        name: "", email: "", phone: "", contactMode: "", directors: "", structure: "",
        proposedName: "", businessActivity: "", state: "", capital: "", gstRequired: "", timeline: "", message: ""
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

  const handleWhatsAppChat = (e, serviceName = "Business Registration") => {
    if (e) e.stopPropagation();
    const phoneNumber = "9311702025";
    const message = `Hi! I would like to know more about the ${serviceName} process.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const stepsConfig = [
    {
      title: "Founder Details",
      fields: [
        { name: "name", placeholder: "Full Name" }, { name: "email", placeholder: "Email Address" }, { name: "phone", placeholder: "Phone Number" },
        { name: "contactMode", type: "select", placeholder: "Preferred Contact Mode", options: ["Phone Call", "WhatsApp", "Email"] }
      ]
    },
    {
      title: "Business Structure",
      fields: [
        { name: "structure", type: "select", placeholder: "Select Structure", options: ["Private Limited", "LLP", "OPC", "Startup India"] },
        { name: "proposedName", placeholder: "Proposed Company Name" }, { name: "state", placeholder: "Registered State" }
      ]
    },
    {
      title: "Directors & Capital",
      fields: [
        { name: "directors", type: "select", placeholder: "Number of Directors", options: ["1", "2", "3+"] },
        { name: "capital", placeholder: "Authorized Capital (₹)" }, { name: "businessActivity", placeholder: "Nature of Business Activity" }
      ]
    },
    {
      title: "Final Details",
      fields: [
        { name: "timeline", type: "select", placeholder: "Expected Timeline", options: ["Immediate", "Within 7 Days", "This Month"] },
        { name: "message", type: "textarea", placeholder: "Additional notes (optional)" }
      ]
    }
  ];

  const serviceName = "Business Registration";
  
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      <Navbar />

      <main className="pt-24 pb-20">

        {/* ==========================================
            HERO SECTION
            ========================================== */}
        <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-12 pb-24 grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-orange-100/40 to-blue-100/40 rounded-full blur-[100px] -z-10 -translate-x-1/3 -translate-y-1/4" />

          {/* Left Content */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10 lg:pr-8">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-orange-200/50 shadow-sm text-orange-600 text-xs font-bold tracking-wider uppercase mb-6">
              <Sparkles className="w-4 h-4 text-orange-500" /> Chartered Accountant Advisory
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] mb-6 tracking-tight">
              Business <br />Registration
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg xl:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
              Complete business incorporation support for startups and growing enterprises in Delhi. We provide the structural foundation for your vision.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsPanelOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.5)] hover:-translate-y-0.5 group"
              >
                Start Your Registration <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={(e) => handleWhatsAppChat(e)}
                className="bg-white/50 backdrop-blur-sm border border-green-200 hover:bg-green-50 text-green-700 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-sm"
              >
                <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
              </button>
            </motion.div>
          </motion.div>

          {/* Right 3D Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full mt-16 lg:mt-0 relative flex items-center justify-center perspective-[1200px] z-20 overflow-visible"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute w-[100%] h-[100%] max-w-[900px] max-h-[900px] bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 rounded-full blur-[140px] opacity-40 -z-10"
            />
            <motion.div
              animate={{ y: [-20, 20, -20] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex justify-center items-center w-full"
            >
              <img
                src={expertImage}
                alt="ComplyWithCA Registration Expert"
                className="relative z-30 w-[110%] lg:w-[135%] xl:w-[122%] max-w-none h-auto object-contain drop-shadow-[0_35px_70px_rgba(15,23,42,0.3)] transition-all duration-700 ease-out hover:scale-[1.08] hover:-rotate-1 origin-bottom"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ==========================================
            STRUCTURES GRID
            ========================================== */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Choose the Right Business Structure</h2>
              <p className="text-slate-500">Expert-led frameworks for every stage of your growth.</p>
            </div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {structures.slice(0, 3).map((s, idx) => (
                <motion.div key={idx} variants={fadeUp} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-full group">
                  <div className="text-[10px] font-bold text-orange-500 tracking-wider uppercase mb-4">{s.tag}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
                  <p className="text-slate-500 text-sm mb-8 leading-relaxed flex-grow">{s.desc}</p>

                  <div className="pt-6 border-t border-slate-200/80 mt-auto">
                    <div className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Starting from</div>
                    <div className="text-lg font-bold text-slate-900 mb-4">{s.price}</div>

                    {/* CHANGED TO OPEN MODAL INSTEAD OF WHATSAPP */}
                    <button
                      onClick={() => setSelectedDetail(s)}
                      className="w-full bg-white border border-slate-200 text-slate-700 py-3 rounded-xl text-sm font-bold group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Keeping the 4th one (Startup India) consistent with the loop logic */}
              <motion.div variants={fadeUp} className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col h-full group">
                <div className="text-[10px] font-bold text-orange-500 tracking-wider uppercase mb-4">{structures[3].tag}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{structures[3].title}</h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed flex-grow">{structures[3].desc}</p>

                <div className="pt-6 border-t border-slate-200/80 mt-auto">
                  <div className="text-xs text-slate-400 font-medium mb-1 uppercase tracking-wider">Starting from</div>
                  <div className="text-lg font-bold text-slate-900 mb-4">{structures[3].price}</div>
                  <button
                    onClick={() => setSelectedDetail(structures[3])}
                    className="w-full bg-white border border-slate-200 text-slate-700 py-3 rounded-xl text-sm font-bold group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* ==========================================
            REGISTRATION PACKAGES (PREMIUM CLEAN THEME)
            ========================================== */}
        <section className="py-32 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Heading */}
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                Registration Packages
              </h2>
              <p className="text-slate-500 text-lg font-medium">
                Transparent pricing. Structured execution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

              {packages.map((pkg, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <motion.div
                    key={idx}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onMouseLeave={() => setActiveIndex(1)} // return to middle card
                    initial={false}
                    animate={{
                      y: isActive ? -16 : 0,
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

                    {/* GREEN GLOW BACKGROUND */}
                    {isActive && (
                      <div className="absolute -inset-3 bg-[#25D366]/15 blur-2xl rounded-[2rem] -z-10 transition-all duration-500" />
                    )}

                    {/* Badge
                    {pkg.isPopular && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#25D366] text-white text-[11px] font-bold tracking-widest px-5 py-2 rounded-full shadow-md">
                        MOST POPULAR
                      </div>
                    )} */}

                    {/* Title */}
                    <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-6">
                      {pkg.tier}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-slate-100">
                      <span className="text-5xl font-black text-slate-900">
                        {pkg.price}
                      </span>
                      <span className="text-slate-400 text-sm font-medium">
                        / Govt. Fees Extra
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-10">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <CheckCircle2
                            size={18}
                            className={`shrink-0 mt-0.5 transition-colors ${isActive ? "text-[#25D366]" : "text-slate-400"
                              }`}
                          />
                          {feat}
                        </li>
                      ))}
                    </ul>

                    {/* Button */}
                    <button
                      onClick={(e) => handleWhatsAppChat(e, `${pkg.tier} Package`)}
                      className={`
                w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2
                ${isActive
                          ? "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:bg-[#128C7E] hover:-translate-y-1"
                          : "bg-slate-100 text-slate-900 hover:bg-green-50 hover:text-[#25D366]"
                        }
              `}
                    >
                      <MessageCircle size={18} />
                      {pkg.isPopular ? "Start Plan" : "Get Quote"}
                    </button>

                    <div className="text-center mt-6 text-[11px] text-slate-400 tracking-widest font-semibold">
                      NO HIDDEN CHARGES
                    </div>

                  </motion.div>
                );
              })}

            </div>
          </div>
        </section>

        {/* ==========================================
            BENEFITS SPLIT SECTION
            ========================================== */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-lg">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                  Build on a Structured Legal Foundation
                </h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  We don't just file papers; we architect your corporate identity to ensure long-term compliance and investor readiness from Day 1.
                </p>
                <div className="w-16 h-1.5 bg-orange-400 rounded-full" />
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid sm:grid-cols-2 gap-6">
                {benefits.map((b, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                      <b.icon size={24} strokeWidth={1.5} />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-3">{b.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>



        {/* ==========================================
            PROCESS TIMELINE
            ========================================== */}
        <section className="py-24 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Registration Process</h2>
              <p className="text-slate-500">4-in-one structured path to your legal incorporation.</p>
            </div>

            <div className="relative">
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />
              <div className="flex flex-col gap-16">
                {processSteps.map((step, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div key={step.id} className={`relative flex flex-col md:flex-row items-center w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}>
                      <div className="hidden md:block md:w-1/2" />
                      <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                        <div className="w-12 h-12 bg-white rounded-full border-2 border-slate-200 flex items-center justify-center shadow-sm group-hover:border-blue-500 transition-colors">
                          <step.icon size={20} className="text-blue-600" />
                        </div>
                      </div>
                      <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
                        className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}
                      >
                        <div className="relative">
                          <div className={`absolute top-1/2 -translate-y-1/2 text-[100px] font-black text-slate-200/50 select-none pointer-events-none -z-10 ${isEven ? '-left-8 md:auto md:-right-8' : '-left-8 md:auto md:-left-8'}`}>
                            {step.id}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
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
            BOTTOM CTA (Directs to WhatsApp)
            ========================================== */}
        <section className="py-24 px-6 lg:px-8 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden"
            >
              {/* WhatsApp background accent */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#25D366]/20 blur-[100px] pointer-events-none rounded-full" />

              <div className="text-center md:text-left max-w-xl relative z-10">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Start Your Business the Right Way.</h2>
                <p className="text-slate-400 text-lg">Connect with our senior partners via WhatsApp for a zero-cost initial consultation.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0 relative z-10">
                <button
                  onClick={(e) => handleWhatsAppChat(e, "Starting my business registration")}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-2 hover:-translate-y-1"
                >
                  <MessageCircle size={20} />
                  Get Started on WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ==========================================
          DETAILS MODAL (Glassmorphism Info Card)
          ========================================== */}
      <AnimatePresence>
        {selectedDetail && (
          <>
            {/* Dark Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9998]"
              onClick={() => setSelectedDetail(null)}
            />

            {/* Centered Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
              exit={{ opacity: 0, scale: 0.95, y: 20, x: "-50%" }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed top-1/2 left-1/2 w-[90%] max-w-2xl bg-white rounded-[2rem] shadow-2xl z-[9999] overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex justify-between items-start shrink-0 relative">
                {/* Subtle top color bar based on type */}
                <div className={`absolute top-0 left-0 w-full h-1 ${selectedDetail.title === 'Startup India' ? 'bg-orange-500' : 'bg-blue-600'}`} />

                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${selectedDetail.title === 'Startup India' ? 'bg-orange-500' : 'bg-blue-600'}`}>
                    <selectedDetail.icon size={24} />
                  </div>
                  <div>
                    <div className={`text-[10px] font-bold tracking-wider uppercase mb-1 ${selectedDetail.title === 'Startup India' ? 'text-orange-500' : 'text-blue-600'}`}>
                      {selectedDetail.tag}
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">{selectedDetail.title}</h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDetail(null)}
                  className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors flex items-center justify-center text-slate-600"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="px-8 py-8 overflow-y-auto">
                <p className="text-slate-600 text-lg font-medium mb-8 leading-relaxed">
                  {selectedDetail.desc}
                </p>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Who Should Choose This?</h4>
                    <p className="text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-100 leading-relaxed font-medium">
                      {selectedDetail.details.who}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Why Choose This Structure?</h4>
                    <p className="text-slate-800 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 leading-relaxed">
                      {selectedDetail.details.why}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Key Features & Requirements</h4>
                    <ul className="space-y-3">
                      {selectedDetail.details.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                          <CheckCircle2 size={20} className={selectedDetail.title === 'Startup India' ? "text-orange-500 shrink-0" : "text-blue-500 shrink-0"} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-6 bg-white border-t border-slate-100 shrink-0">
                <button
                  onClick={(e) => {
                    setSelectedDetail(null); // Close modal
                    handleWhatsAppChat(e, `Registering a ${selectedDetail.title}`); // Open WA
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#25D366]/20"
                >
                  <MessageCircle size={22} />
                  Chat with Expert to Register
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Slide Panel Form (Kept intact from your original code) */}
      <AnimatePresence>
        {isPanelOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]"
              onClick={() => setIsPanelOpen(false)}
            />

            {/* Slide Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 22 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[520px] bg-white z-[9999] shadow-2xl border-l border-slate-200 flex flex-col"
            >

              {/* Sticky Header */}
              <div className="sticky top-0 bg-white z-20 px-8 pt-8 pb-6 border-b border-slate-100">

                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {serviceName} Intake
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Structured onboarding for {serviceName}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsPanelOpen(false)}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center text-slate-600"
                  >
                    ✕
                  </button>
                </div>

                {/* Dynamic Progress Bar */}
                <div className="flex gap-2 mt-6">
                  {stepsConfig.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= index + 1 ? "bg-orange-500" : "bg-slate-200"
                        }`}
                    />
                  ))}
                </div>

              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-8 py-8">

                <div className="space-y-5">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {stepsConfig[step - 1].title}
                  </h3>

                  {stepsConfig[step - 1].fields.map((field) => {

                    // Select Field
                    if (field.type === "select") {
                      return (
                        <select
                          key={field.name}
                          name={field.name}
                          value={regForm[field.name] || ""}
                          onChange={(e) =>
                            setRegForm(prev => ({
                              ...prev,
                              [field.name]: e.target.value
                            }))
                          }
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                        >
                          <option value="">{field.placeholder}</option>
                          {field.options.map((opt, i) => (
                            <option key={i} value={opt}>{opt}</option>
                          ))}
                        </select>
                      );
                    }

                    // Textarea Field
                    if (field.type === "textarea") {
                      return (
                        <textarea
                          key={field.name}
                          name={field.name}
                          placeholder={field.placeholder}
                          rows="4"
                          value={regForm[field.name] || ""}
                          onChange={(e) =>
                            setRegForm(prev => ({
                              ...prev,
                              [field.name]: e.target.value
                            }))
                          }
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                      );
                    }

                    // Default Input Field
                    return (
                      <input
                        key={field.name}
                        name={field.name}
                        type="text"
                        placeholder={field.placeholder}
                        value={regForm[field.name] || ""}
                        onChange={(e) =>
                          setRegForm(prev => ({
                            ...prev,
                            [field.name]: e.target.value
                          }))
                        }
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                      />
                    );
                  })}

                </div>
              </div>

              {/* Footer Navigation */}
              <div className="px-8 py-6 border-t border-slate-100 bg-white flex justify-between items-center">

                {step > 1 ? (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-5 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < stepsConfig.length ? (
                  <button
                    onClick={() => {
                      if (validateStep()) setStep(step + 1);
                      else alert("Please complete required fields.");
                    }}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition shadow-md"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition shadow-md disabled:opacity-60"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                )}

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* ==========================================
          FOOTER
          ========================================== */}
      <Footer />
    </div>
  );
}