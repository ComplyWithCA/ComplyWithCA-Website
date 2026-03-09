import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  Calculator,
  FileCheck,
  Activity,
  FileText,
  RefreshCw,
  Edit,
  XCircle,
  AlertCircle,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  MessageCircle,
  TrendingUp,
  Search,
  Phone,
  Mail,
  Sparkles
} from 'lucide-react';
import Navbar from '../components/Navbar';
import expertImage from "../assets/image6.png"; // Imported your 3D image
import Footer from '../components/footer';
import emailjs from '@emailjs/browser';
import { FaWhatsapp } from "react-icons/fa";
// ==========================================
// 1. DATA ARRAYS
// ==========================================
const credibilityCards = [
  { title: "Registration", desc: "Accurate processing for new registrations to start right.", icon: FileText },
  { title: "Filing", desc: "Meticulous monthly and annual return filing on time.", icon: RefreshCw },
  { title: "Monitoring", desc: "Proactive audit tracking to prevent compliance gaps.", icon: Activity }
];

const ecosystemServices = [
  { title: "GST Registration", desc: "End-to-end processing of forms and document management for new or expanding firms.", icon: FileText },
  { title: "Return Filing", desc: "Automated management of GSTR-1, GSTR-3B, and GSTR-9 with 100% accurate reconciliation.", icon: RefreshCw },
  { title: "Amendment", desc: "Modify your core or non-core fields in registration seamlessly when business operations change.", icon: Edit },
  { title: "Cancellation", desc: "Proper closing procedures when winding up operations to prevent future liabilities and ensure clean exits.", icon: XCircle },
  // { title: "Notice Handling", desc: "Expert responses to ASMT-10, show cause notices, and departmental audits drafted by senior CAs.", icon: AlertCircle },
  { title: "GST Advisory", desc: "Strategic tax planning, classification guidance, and optimization of Input Tax Credit (ITC).", icon: MessageSquare }
];

const pricingPackages = [
  {
    tier: "GST Certificate",
    price: "₹499",
    subtitle: "/ one-time",
    features: [
      "GST Certificate Download",
      "GSTIN Verification",
      "Business Name Validation"
    ],
    buttonText: "Get Certificate",
    isRecommended: false
  },
  {
    tier: "GST Filing – Monthly",
    price: "₹499",
    subtitle: "/ month",
    features: [
      "GSTR-1 Filing",
      "GSTR-3B Filing",
      "Basic ITC Reconciliation"
    ],
    buttonText: "Start Monthly Plan",
    isRecommended: true
  },
  {
    tier: "GST Filing – Quarterly",
    price: "₹1399",
    subtitle: "/ quarter",
    features: [
      "Quarterly Return Filing",
      "ITC Reconciliation",
      "Compliance Monitoring"
    ],
    buttonText: "Start Quarterly Plan",
    isRecommended: false
  },
  {
    tier: "GST Filing – Yearly",
    price: "₹5699",
    subtitle: "/ year",
    features: [
      "Full Year Filing Support",
      "Annual Return Assistance",
      "Priority WhatsApp Support"
    ],
    buttonText: "Start Yearly Plan",
    isRecommended: false
  }
];

const processSteps = [
  { id: "01", title: "Consultation", desc: "Evaluation of your business model, turnover, and ITC requirements.", icon: Search },
  { id: "02", title: "Documentation", desc: "Seamless digital collection of KYC and verification of all legal documents.", icon: FileCheck },
  { id: "03", title: "Filing & Confirmation", desc: "Final submission and delivery of ARN or Acknowledgement receipts.", icon: CheckCircle2 }
];

const faqs = [
  {
    q: "How long does GST registration take?",
    a: "GST registration usually takes 3–7 working days after submitting complete and accurate documents, subject to government approval."
  },
  {
    q: "What documents are required for GST registration?",
    a: "You typically need PAN card, Aadhaar card, business address proof, bank details, and passport-size photographs of the promoters."
  },
  {
    q: "Do you provide monthly GST filing services?",
    a: "Yes, we provide monthly, quarterly, and yearly GST filing services including return filing and basic ITC reconciliation."
  },
  {
    q: "What happens if I miss GST filing?",
    a: "Late filing can result in penalties and interest charges. We help you file pending returns and minimize penalties wherever possible."
  },
  {
    q: "Can you help with GST cancellation?",
    a: "Yes, we assist with proper GST cancellation to ensure there are no future liabilities or compliance issues."
  },
  {
    q: "Are government fees included in your pricing?",
    a: "Our service charges are separate. Government fees, if applicable, are charged additionally as per official rates."
  }
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

const inputStyle =
  "w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white";
// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function GstServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const navigate = useNavigate();

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [step, setStep] = useState(1);

  const serviceName = "GST Services";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contactMode: "",
    businessName: "",
    entityType: "",
    state: "",
    serviceType: "",
    dynamicData: {},
    timeline: "",
    message: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDynamicChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      dynamicData: {
        ...prev.dynamicData,
        [field]: value
      }
    }));
  };
  const getDynamicFields = () => {
    switch (formData.serviceType) {
      case "Registration":
        return (
          <>
            <select
              className={inputStyle}
              onChange={(e) => handleDynamicChange("Turnover", e.target.value)}
            >
              <option value="">Annual Turnover</option>
              <option>&lt; 20L</option>
              <option>20L–1Cr</option>
              <option>1Cr–5Cr</option>
              <option>5Cr+</option>
            </select>
          </>
        );

      // case "Notice Handling":
      //   return (
      //     <>
      //       <select
      //         className={inputStyle}
      //         onChange={(e) => handleDynamicChange("Notice Type", e.target.value)}
      //       >
      //         <option value="">Notice Type</option>
      //         <option>ASMT-10</option>
      //         <option>DRC-01</option>
      //         <option>Show Cause</option>
      //         <option>Audit</option>
      //       </select>
      //     </>
      //   );

      case "Monthly Filing":
        return (
          <>
            <select
              className={inputStyle}
              onChange={(e) => handleDynamicChange("Invoice Volume", e.target.value)}
            >
              <option value="">Monthly Invoice Volume</option>
              <option>0–50</option>
              <option>50–200</option>
              <option>200–1000</option>
              <option>1000+</option>
            </select>
          </>
        );

      default:
        return null;
    }
  };

  const Input = ({ name, placeholder }) => (
    <input
      name={name}
      placeholder={placeholder}
      value={formData[name]}   // ✅ FIXED
      onChange={handleChange}
      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
    />
  );

  const Select = ({ name, children }) => (
    <select
      name={name}
      value={formData[name]}   // ✅ FIXED
      onChange={handleChange}
      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
    >
      {children}
    </select>
  );

  const calculateLeadScore = () => {
    let score = 30;

    // if (formData.serviceType === "Notice Handling") score += 30;
    if (formData.serviceType === "Monthly Filing") score += 20;
    if (formData.timeline === "Immediate") score += 20;

    return score;
  };

  const getDynamicFieldsString = () => {
    return Object.entries(formData.dynamicData)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const leadScore = calculateLeadScore();
      const priority = leadScore >= 70 ? "HIGH PRIORITY" : "STANDARD";

      const templateParams = {
        serviceName,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        contactMode: formData.contactMode,
        businessName: formData.businessName,
        entityType: formData.entityType,
        state: formData.state,
        serviceType: formData.serviceType,
        timeline: formData.timeline,
        message: formData.message || "-",
        dynamicFields: getDynamicFieldsString(),
        leadScore,
        priority
      };

      await emailjs.send(
        "service_ghj2doe",
        "template_qkg4m4s",
        templateParams,
        "KJ9IR47xK9gNAOEYd"
      );

      alert("Consultation submitted successfully!");

      setIsPanelOpen(false);
      setStep(1);

    } catch (error) {
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppChat = (e, context = "GST Services") => {
    if (e) e.stopPropagation();
    const phoneNumber = "919289758145";
    const message = `Hi! I would like to know more about your ${context}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const validateStep = () => {
    if (step === 1) {
      return formData.name && formData.email && formData.phone && formData.contactMode;
    }

    if (step === 2) {
      return formData.businessName && formData.entityType && formData.state;
    }

    if (step === 3) {
      return formData.serviceType;
    }

    if (step === 4) {
      return formData.timeline;
    }

    return true;
  };

  const [activeIndex, setActiveIndex] = useState(1); // Monthly default
  
  return (
    <div className="min-h-screen bg-[#fafcff] font-sans text-slate-800 selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      <Navbar />

      <main className="pt-24 pb-20">

        {/* ==========================================
            HERO SECTION
            ========================================== */}
        <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-12 md:pt-20 pb-20 md:pb-32 flex flex-col lg:flex-row items-center min-h-[85vh]">
          {/* Subtle Ambient Background */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none -z-10 translate-x-1/4 -translate-y-1/4" />

          {/* Left Content Area */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full lg:w-1/2 lg:pr-8 xl:pr-12 z-10"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/50 shadow-sm text-sm font-bold text-slate-700 mb-8 mt-8 lg:mt-0">
              <Sparkles className="w-4 h-4 text-blue-500" /> GST Specialized Advisory
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
              GST <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Services</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg xl:text-xxl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
              The Goods and Services Tax (GST) is a unified indirect tax system implemented by the Government of India to simplify the taxation structure and create a single national market. Introduced on 1 July 2017, GST replaced multiple indirect taxes such as VAT, service tax, and excise duty, making tax compliance easier for businesses.            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsPanelOpen(true)}
                className="relative group overflow-hidden bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.5)] hover:-translate-y-0.5"
              >
                <span className="relative z-10">Book GST Consultation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={(e) => handleWhatsAppChat(e, "GST Services")}
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
            className="w-full lg:w-1/2 mt-16 lg:mt-0 relative flex items-center justify-center z-20 overflow-visible perspective-[1200px]"
          >

            {/* Premium Rotating Glow Background */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute w-[100%] h-[100%] 
               max-w-[800px] max-h-[800px]
               bg-gradient-to-tr 
               from-blue-600 via-indigo-500 to-cyan-400
               rounded-full blur-[130px] opacity-40 -z-10"
            />

            {/* Floating Image Wrapper */}
            <motion.div
              animate={{ y: [-20, 20, -20] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex justify-center items-center w-full overflow-visible"
            >
              <img
                src={expertImage}
                alt="ComplyWithCA GST Expert"
                className="relative z-30 
                 w-[110%] 
                 lg:w-[135%] 
                 xl:w-[125%]
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
            CORNERSTONE SECTION (ASYMMETRIC)
            ========================================== */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:w-5/12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                  The Cornerstone of Business Credibility
                </h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed font-medium">
                  In the modern Indian ecosystem, strict adherence to tax frameworks isn't just a legal necessity—it's a reflection of your enterprise's financial integrity. Our data-driven workflows provide the oversight required to transform compliance into a competitive advantage.
                </p>
                <div className="pl-6 border-l-4 border-blue-600 py-2">
                  <p className="text-sm font-bold text-slate-500 italic">"Compliance is not the end goal, it is the baseline for intelligent business scaling."</p>
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="lg:w-7/12 grid sm:grid-cols-3 gap-6">
                {credibilityCards.map((card, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="bg-[#fafcff] p-6 rounded-2xl border border-slate-100 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-12 h-12 bg-white shadow-sm text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <card.icon size={22} strokeWidth={2} />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{card.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>

        {/* ==========================================
            PRICING & PACKAGES
            ========================================== */}
        <section className="py-32 bg-gradient-to-b from-white to-slate-50 border-t border-slate-100">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">

    {/* Heading */}
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
        GST Packages
      </h2>
      <p className="text-slate-500 text-lg font-medium">
        Simple pricing. Transparent compliance.
      </p>
    </div>

    {/* Cards Wrapper */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

  {pricingPackages.map((pkg, idx) => {
    const isActive = activeIndex === idx;

    return (
      <motion.div
        key={idx}
        onMouseEnter={() => setActiveIndex(idx)}
        initial={false}
        animate={{
          y: isActive ? -12 : 0,
          scale: isActive ? 1.03 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 18 }}
        className={`
          relative rounded-3xl p-8 bg-white
          transition-all duration-300
          ${isActive
            ? "border-2 border-green-500 shadow-2xl shadow-green-500/10"
            : "border border-slate-200 shadow-lg"}
        `}
      >

        {/* Subtle Glow */}
        {isActive && (
          <div className="absolute -inset-2 bg-green-500/10 blur-2xl rounded-3xl -z-10" />
        )}

        {/* Title */}
        <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-5">
          {pkg.tier}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-8">
          <span className="text-5xl font-black text-slate-900">
            {pkg.price}
          </span>
          <span className="text-sm text-slate-400">
            {pkg.subtitle}
          </span>
        </div>

        <div className="h-px bg-slate-100 mb-8" />

        {/* Features */}
        <ul className="space-y-4 mb-10">
          {pkg.features.map((feat, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <CheckCircle2 size={18} className="text-green-500 mt-0.5" />
              {feat}
            </li>
          ))}
        </ul>

        {/* Button */}
        <button
          onClick={(e) => handleWhatsAppChat(e, pkg.tier)}
          className={`
            w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all
            ${isActive
              ? "bg-green-500 text-white shadow-lg shadow-green-500/30 hover:bg-green-600"
              : "bg-slate-100 text-slate-800 hover:bg-green-50 hover:text-green-600"}
          `}
        >
          <FaWhatsapp />
          {pkg.buttonText}
        </button>

        <div className="text-center mt-5 text-xs text-slate-400 uppercase tracking-widest">
          Taxes Applicable Extra
        </div>

      </motion.div>
    );
  })}

</div>
  </div>
</section>
        {/* ==========================================
            COMPREHENSIVE ECOSYSTEM GRID
            ========================================== */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Comprehensive Service Ecosystem</h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full" />
            </div>

            <motion.div
              initial="hidden" whileInView="visible" variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {ecosystemServices.map((service, idx) => (
                <motion.div
                  key={idx} variants={fadeUp}
                  className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.06)] hover:-translate-y-1 hover:border-blue-100 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-3 h-3 rounded-full bg-blue-600" />
                    <h3 className="text-lg font-bold text-slate-900">{service.title}</h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed pl-7 font-medium">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>



        {/* ==========================================
            METHODICAL PROCESS (TIMELINE)
            ========================================== */}
        <section className="py-24 bg-[#fafcff] border-t border-slate-100 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Our Methodical Process</h2>
              <p className="text-slate-500 text-lg font-medium">Precision execution at every phase.</p>
            </div>

            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-blue-200 -translate-x-1/2" />

              <div className="flex flex-col gap-12 md:gap-16">
                {processSteps.map((step, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div key={step.id} className={`relative flex flex-col md:flex-row items-center w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}>

                      <div className="hidden md:block md:w-1/2" />

                      {/* Animated Center Dot */}
                      <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                          <span className="font-bold text-sm">{step.id}</span>
                        </div>
                      </div>

                      {/* Content Card */}
                      <motion.div
                        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
                        className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}
                      >
                        <div className="relative bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                          {/* Giant Background Number Graphic */}
                          <div className={`absolute top-1/2 -translate-y-1/2 text-[80px] font-black text-slate-50 select-none pointer-events-none -z-10 ${isEven ? 'right-4' : 'left-4'}`}>
                            {step.id}
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed font-medium">{step.desc}</p>
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12 text-center">Common Inquiries</h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-slate-200 rounded-[1.5rem] overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-lg pr-8">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
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
            BOTTOM CTA
            ========================================== */}
        <section className="py-24 px-6 lg:px-8 bg-slate-900 text-center relative overflow-hidden">

          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-3xl mx-auto relative z-10">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >

              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                Stay GST Compliant the Right Way.
              </h2>

              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-medium">
                Join 500+ Delhi NCR startups who trust ComplyWithCA for their high-stakes
                tax compliance and advisory needs.
              </p>

              {/* WhatsApp CTA Button */}
              <button
                onClick={(e) => handleWhatsAppChat(e, "GST Corporate Packages")}
                className="group bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-xl shadow-green-500/30 hover:-translate-y-1 text-lg flex items-center gap-3 mx-auto"
              >
                <FaWhatsapp className="text-2xl group-hover:scale-110 transition-transform" />
                Book GST Consultation on WhatsApp
              </button>

            </motion.div>

          </div>
        </section>

      </main>

      {/* ================================
   ENTERPRISE GST SLIDE PANEL
================================ */}

      <AnimatePresence>
        {isPanelOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9998]"
              onClick={() => setIsPanelOpen(false)}
            />

            {/* Slide Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 90, damping: 20 }}
              className="fixed inset-y-0 right-0 w-full sm:w-[520px] bg-gradient-to-b from-white to-slate-50 z-[9999] shadow-[0_20px_80px_rgba(0,0,0,0.25)] border-l border-slate-200 flex flex-col"
            >
              {/* ================= HEADER ================= */}
              <div className="sticky top-0 bg-white/80 backdrop-blur-md z-20 px-8 pt-8 pb-6 border-b border-slate-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {serviceName} Intake
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Secure • Structured • Priority Scored
                    </p>
                  </div>

                  <button
                    onClick={() => setIsPanelOpen(false)}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition text-slate-600"
                  >
                    ✕
                  </button>
                </div>

                {/* Progress */}
                <div className="flex gap-2 mt-6">
                  {[1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= s
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                        : "bg-slate-200"
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* ================= BODY ================= */}
              <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">

                {/* Step Title */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {step === 1 && "Contact Information"}
                    {step === 2 && "Business Details"}
                    {step === 3 && "Service Requirement"}
                    {step === 4 && "Final Confirmation"}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Step {step} of 4
                  </p>
                </div>

                {/* ================= STEP 1 ================= */}
                {step === 1 && (
                  <div className="space-y-4">
                    <Input name="name" placeholder="Full Name" />
                    <Input name="email" placeholder="Work Email" />
                    <Input name="phone" placeholder="Phone Number" />

                    <Select name="contactMode">
                      <option value="">Preferred Contact Mode</option>
                      <option>Call</option>
                      <option>WhatsApp</option>
                      <option>Email</option>
                    </Select>
                  </div>
                )}

                {/* ================= STEP 2 ================= */}
                {step === 2 && (
                  <div className="space-y-4">
                    <Input name="businessName" placeholder="Business Name" />

                    <Select name="entityType">
                      <option value="">Business Structure</option>
                      <option>Proprietorship</option>
                      <option>Partnership</option>
                      <option>LLP</option>
                      <option>Pvt Ltd</option>
                      <option>OPC</option>
                    </Select>

                    <Input name="state" placeholder="State of Registration" />
                  </div>
                )}

                {/* ================= STEP 3 ================= */}
                {step === 3 && (
                  <div className="space-y-4">
                    <Select name="serviceType">
                      <option value="">GST Service Required</option>
                      <option>Registration</option>
                      <option>Monthly Filing</option>
                      {/* <option>Notice Handling</option> */}
                      <option>Advisory</option>
                      <option>Cancellation</option>
                    </Select>

                    {/* Dynamic Fields Based On Service */}
                    {getDynamicFields()}
                  </div>
                )}

                {/* ================= STEP 4 ================= */}
                {step === 4 && (
                  <div className="space-y-4">
                    <Select name="timeline">
                      <option value="">Expected Timeline</option>
                      <option>Immediate</option>
                      <option>This Week</option>
                      <option>This Month</option>
                    </Select>

                    <textarea
                      name="message"
                      placeholder="Describe your requirement"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                    />
                  </div>
                )}
              </div>

              {/* ================= FOOTER ================= */}
              <div className="px-8 py-6 border-t border-slate-200 bg-white sticky bottom-0">
                <div className="flex justify-between items-center">

                  {step > 1 ? (
                    <button
                      onClick={() => setStep(step - 1)}
                      className="px-5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 4 ? (
                    <button
                      onClick={() => setStep(step + 1)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg transition"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg disabled:opacity-60 transition"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Consultation"}
                    </button>
                  )}

                </div>
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