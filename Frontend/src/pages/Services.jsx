import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Briefcase, 
  Building2, 
  FileText, 
  BookOpen, 
  ShieldCheck,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Activity,
  Phone,
  Mail,
  Sparkles // Added Sparkles for the hero badge
} from 'lucide-react';
import expertImage from "../assets/image5.png"; // Imported your image
import Footer from '../components/footer';
// Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
};

export default function ServicesPage() {
  const navigate = useNavigate();

  // Helper function to handle WhatsApp redirects dynamically
  const handleWhatsAppChat = (e, serviceName = null) => {
    // Prevent the click from bubbling up to the card's onClick
    if (e) e.stopPropagation(); 
    
    // Using 91 (India country code) + the number provided
    const phoneNumber = "9311702025"; 
    
    // Dynamic message based on where they clicked
    const message = serviceName 
      ? `Hi! I would like to know more about your ${serviceName} service.`
      : `Hi! I would like to book a consultation and explore your CA services.`;
      
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const services = [
    {
      id: 1,
      slug: "gst-services",
      title: "GST Services",
      desc: "End-to-end GST filing, reconciliation, and audit representation for scaling startups.",
      price: "₹2,999",
      icon: Calculator,
    },
    {
      id: 2,
      slug: "business-registration",
      title: "Business Registration",
      desc: "Get your Private Limited Company or One Person Company (OPC) registered in as little as 10 days.",
      price: "₹4,999",
      icon: Briefcase,
    },
    {
      id: 3,
      slug: "firm-registration",
      title: "Firm Registration",
      desc: "Structured LLP and Partnership registrations with comprehensive agreement drafting.",
      price: "₹3,499",
      icon: Building2,
    },
    {
      id: 4,
      slug: "income-tax-filing",
      title: "Income Tax Filing",
      desc: "Proactive tax planning for individuals, professionals, and corporate entities with top optimization.",
      price: "₹999",
      icon: FileText,
    },
    {
      id: 5,
      slug: "book-consultancy",
      title: "Book Consultancy",
      desc: "Full-stack bookkeeping and virtual CFO services for data-driven business decisions.",
      price: "₹1,499",
      icon: BookOpen,
    },
    {
      id: 6,
      slug: "certificates",
      title: "Certificates",
      desc: "Quick processing of digital signature (DSC), MSME, and Startup India certificates.",
      price: "₹1,999",
      icon: ShieldCheck,
    }
  ];

  const features = [
    {
      title: "Zero Error Guarantee",
      desc: "Every filing passes through a 3-layer verification system to ensure 100% compliance.",
      icon: CheckCircle2
    },
    {
      title: "Lightning Fast TAT",
      desc: "Industry-leading turnaround times for registrations and certificate issuances.",
      icon: Clock
    },
    {
      title: "Real-Time Tracking",
      desc: "Monitor your application status in real-time right on our dedicated client dashboard.",
      icon: Activity
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafcff] font-sans text-slate-900 overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center min-h-[85vh]">
        
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-[100px] -z-10 -translate-x-1/3 -translate-y-1/4" />

        <div className="w-full lg:w-1/2 lg:pr-8 xl:pr-12 z-10">
          <motion.div 
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/50 shadow-sm text-sm font-bold text-slate-700 mb-8 mt-8 lg:mt-0">
              <Sparkles className="w-4 h-4 text-blue-500" /> Premium Advisory
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight text-slate-900 leading-[1.05]">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Services</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg xl:text-xl text-slate-600 leading-relaxed max-w-lg font-medium">
              Comprehensive Compliance & Advisory Solutions for Startups and Growing Businesses. Partner with experts who understand your scale.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 pt-4">
              <button 
                onClick={(e) => handleWhatsAppChat(e)}
                className="relative group overflow-hidden bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.5)] hover:-translate-y-0.5"
              >
                <span className="relative z-10">Book Consultation</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={(e) => handleWhatsAppChat(e)}
                className="bg-white/50 backdrop-blur-sm border border-green-200 hover:bg-green-50 text-green-700 px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-sm"
              >
                <MessageCircle size={20} />
                Chat on WhatsApp
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* ==========================================
            2026 PREMIUM 3D RESPONSIVE IMAGE RENDER
            ========================================== */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.85, rotateY: 10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="w-full lg:w-1/2 mt-16 lg:mt-0 relative flex items-center justify-center perspective-[1200px] z-20"
        >
          {/* Animated Background Aurora that dynamically fits behind the image */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute w-[80%] h-[80%] max-w-[500px] max-h-[500px] bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 rounded-full blur-[80px] opacity-30 -z-10"
          />

          {/* PURE FLOATING IMAGE WRAPPER */}
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex justify-center items-center w-full"
          >
            {/* Responsive Soft Premium Blue Glow */}
            <div className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[600px] xl:h-[600px] bg-[#1E90FF]/25 blur-[100px] rounded-full"></div>

            {/* Main Floating Image */}
            <img
              src={expertImage}
              alt="ComplyWithCA 3D Expert"
              className="relative z-30 
                         w-[1000px] lg:w-[1200px] xl:w-[1800px]
                         h-auto object-contain
                         drop-shadow-[0_25px_45px_rgba(30,144,255,0.2)]
                         transition-all duration-700 ease-out
                         hover:scale-[1.05] hover:-rotate-1 origin-bottom"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Specialized Tax & Compliance Pillars</h2>
            <p className="text-slate-500 text-lg font-medium">Industry-leading solutions tailored for modern enterprises, ensuring your business stays compliant while you focus on growth.</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {services.map((service) => (
              <motion.div 
                key={service.id}
                variants={fadeUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                onClick={() => navigate(`/services/${service.slug}`)}
                className="group relative p-8 rounded-[2rem] border border-slate-100 bg-[#fafcff] shadow-[0_2px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.08)] hover:border-blue-100 transition-all duration-500 flex flex-col h-full cursor-pointer overflow-hidden"
              >
                {/* Subtle hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-500">
                    <service.icon size={26} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-500 mb-8 flex-grow leading-relaxed">{service.desc}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-200/60 mt-auto">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Starting from</span>
                      <span className="text-blue-600 font-black text-lg">{service.price}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/services/${service.slug}`);
                        }}
                        className="text-sm font-bold text-slate-700 group-hover:text-blue-600 flex items-center gap-1 transition-colors uppercase tracking-wide"
                      >
                        View <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                      
                      {/* WhatsApp Button inside Card */}
                      <button 
                        onClick={(e) => handleWhatsAppChat(e, service.title)}
                        className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors shadow-sm"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Split Section */}
      <section className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="w-16 h-1 bg-blue-500 mb-6 rounded-full" />
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-slate-900">
              Structured Compliance.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Transparent Process.</span><br/>
              Reliable Execution.
            </h2>
            <p className="text-lg text-slate-600 max-w-md leading-relaxed font-medium">
              We've redefined CA services for the digital age. No hidden fees, no complex jargon—just professional excellence delivered with modern speed.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUp}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-5 items-start hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-1">
                  <feature.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{feature.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Need Help Choosing the Right Service?</h2>
          <p className="text-slate-300 text-lg mb-10 font-medium">
            Speak with our senior partners for a personalized roadmap of your business's legal and financial requirements.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleWhatsAppChat(e)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-colors shadow-lg shadow-blue-600/30"
          >
            Book Free Consultation
          </motion.button>
        </div>
      </section>

      {/* Simplified Footer */}
<Footer/>
    </div>
  );
}