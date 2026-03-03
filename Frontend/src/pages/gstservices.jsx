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
  { title: "Notice Handling", desc: "Expert responses to ASMT-10, show cause notices, and departmental audits drafted by senior CAs.", icon: AlertCircle },
  { title: "GST Advisory", desc: "Strategic tax planning, classification guidance, and optimization of Input Tax Credit (ITC).", icon: MessageSquare }
];

const pricingPackages = [
  {
    tier: "Registration",
    price: "₹2,499",
    features: ["Professional Document & Form Support", "Government Fee Extra", "Trackable Application Status"],
    buttonText: "Get Started",
    isPopular: false
  },
  {
    tier: "Monthly Plan",
    badge: "POPULAR CHOICE",
    price: "₹4,999",
    period: "/ month",
    features: ["GSTR-1 & GSTR-3B Management", "ITC Reconciliation (Zero Error)", "24/7 Priority CA Consultation Support"],
    buttonText: "Start Monthly",
    isPopular: true
  },
  {
    tier: "Corporate Package",
    price: "₹9,999",
    period: "/ month",
    features: ["Full Audit & Representation Support", "Dedicated Tax Consultant", "Quarterly Performance Syncs"],
    buttonText: "Go Corporate",
    isPopular: false
  }
];

const processSteps = [
  { id: "01", title: "Consultation", desc: "Evaluation of your business model, turnover, and ITC requirements.", icon: Search },
  { id: "02", title: "Documentation", desc: "Seamless digital collection of KYC and verification of all legal documents.", icon: FileCheck },
  { id: "03", title: "Filing & Confirmation", desc: "Final submission and delivery of ARN or Acknowledgement receipts.", icon: CheckCircle2 }
];

const faqs = [
  { q: "How long does a new GST registration take?", a: "Typically, a new GST registration takes 3-7 working days from the date of submission, provided all documents are accurate and no departmental queries are raised." },
  { q: "What files need to be submitted?", a: "Standard requirements include the PAN of the business/applicant, Aadhaar of promoters, proof of business registration, identity/address proofs, and a canceled cheque or bank statement." },
  { q: "Can you help with GST notices from previous years?", a: "Yes, our senior advisory team specializes in historical notice handling, preparing robust replies to ASMT-10 or show-cause notices for previous financial years." }
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
export default function GstServices() {
  const [openFaq, setOpenFaq] = useState(0);
  const navigate = useNavigate();

  const handleWhatsAppChat = (e, context = "GST Services") => {
    if (e) e.stopPropagation();
    const phoneNumber = "9311702025";
    const message = `Hi! I would like to know more about your ${context}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

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
            
            <motion.p variants={fadeUp} className="text-lg xl:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
              Impact-driven tax strategy, reconciliation, and 100% compliant filings tailored for complex business architectures to ensure you retain your competitive advantage.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <button 
                onClick={(e) => handleWhatsAppChat(e, "GST Consultation")}
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
            COMPREHENSIVE ECOSYSTEM GRID
            ========================================== */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Comprehensive Service Ecosystem</h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full" />
            </div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
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
            PRICING & PACKAGES
            ========================================== */}
        <section className="py-32 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">GST Pricing & Packages</h2>
              <p className="text-slate-500 text-lg font-medium">Transparent billing logic tailored to your operational scale.</p>
            </div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center"
            >
              {pricingPackages.map((pkg, idx) => (
                <motion.div 
                  key={idx} variants={fadeUp}
                  className={`relative bg-white rounded-[2rem] p-10 border transition-all duration-300 ${pkg.isPopular ? 'border-blue-500 shadow-[0_20px_60px_-15px_rgba(37,99,235,0.2)] md:scale-105 z-10' : 'border-slate-200 shadow-sm hover:border-blue-200'}`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-4 right-8 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md">
                      {pkg.badge}
                    </div>
                  )}
                  
                  <h3 className="text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-4">{pkg.tier}</h3>
                  <div className="flex items-baseline gap-1 mb-8 pb-8 border-b border-slate-100">
                    <span className="text-4xl font-black text-slate-900">{pkg.price}</span>
                    {pkg.period && <span className="text-slate-500 text-sm font-medium">{pkg.period}</span>}
                  </div>

                  <ul className="space-y-4 mb-10">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                        <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={(e) => handleWhatsAppChat(e, `${pkg.tier} Package`)}
                    className={`w-full py-4 rounded-xl font-bold transition-all ${pkg.isPopular ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 hover:-translate-y-1' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                  >
                    {pkg.buttonText}
                  </button>
                  <div className="text-center mt-4 text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Taxes Applicable Extra</div>
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
          {/* Subtle Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-3xl mx-auto relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Stay GST Compliant the Right Way.</h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto font-medium">
                Join 500+ Delhi NCR startups who trust ComplyWithCA for their high-stakes tax compliance and advisory needs.
              </p>
              <button 
                onClick={(e) => handleWhatsAppChat(e, "GST Corporate Packages")}
                className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-1 text-lg"
              >
                Book GST Consultation Now
              </button>
            </motion.div>
          </div>
        </section>

      </main>

      {/* ==========================================
          FOOTER
          ========================================== */}
 <Footer/>
    </div>
  );
}