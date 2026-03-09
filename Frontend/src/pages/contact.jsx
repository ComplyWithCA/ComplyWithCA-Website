import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  ArrowRight, 
  Send, 
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Lock
} from 'lucide-react';
import Navbar from '../components/Navbar'; // Update path if needed
import Footer from '../components/footer';
import ConsultationForm from '../components/ConsultationForm';
// ==========================================
// 1. ANIMATION VARIANTS
// ==========================================
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40, damping: 15 } }
};

const fadeRight = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 40, damping: 15 } }
};

// ==========================================
// 2. MAIN COMPONENT
// ==========================================
export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleWhatsAppChat = () => {
    const phoneNumber = "919289758145";
    const message = "Hi! I would like to schedule a consultation with ComplyWithCA.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call for the "2026 premium fluid UI" feel
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 4 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({ name: '', email: '', phone: '', service: '', message: '' });
      }, 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fafcff] font-sans text-slate-800 selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
      <Navbar />

      <main className="pt-24 pb-20">
        
        {/* ==========================================
            HERO HEADER
            ========================================== */}
        <section className="relative pt-12 md:pt-20 pb-16">
          {/* Ambient Top Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-blue-100/60 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/60 shadow-sm text-sm font-bold text-slate-700 mb-6">
                <Sparkles className="w-4 h-4 text-blue-500" /> Let's Talk Business
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] mb-6 tracking-tight">
                Connect with our <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Advisory Team</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg xl:text-xl text-slate-600 leading-relaxed font-medium">
                Whether you're scaling a tech startup, registering a new firm, or navigating complex tax audits, our senior Chartered Accountants are ready to structure your success.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ==========================================
            CONTACT SPLIT SECTION (Bento + Form)
            ========================================== */}
        <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pb-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT COLUMN: BENTO INFO GRID (5 Columns wide on LG) */}
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer} 
              className="lg:col-span-5 flex flex-col gap-6"
            >
              {/* Direct Contact Bento */}
              <motion.div variants={fadeRight} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Direct Contact</h3>
                
                <div className="flex flex-col gap-6">
                  <a href="tel:+918000001234" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <Phone size={20} strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Call Us</div>
                      <div className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">+91 9289758145</div>
                    </div>
                  </a>

                  <a href="mailto:info@complywithca.com" className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      <Mail size={20} strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Email Us</div>
                      <div className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">info@complywithca.com</div>
                    </div>
                  </a>
                </div>
              </motion.div>

              {/* Office Location Bento */}
              <motion.div variants={fadeRight} className="bg-slate-900 p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none" />
                
                {/* <div className="w-12 h-12 rounded-2xl bg-white/10 text-blue-400 flex items-center justify-center mb-6 backdrop-blur-md">
                  <MapPin size={20} strokeWidth={2} />
                </div> */}
                {/* <h3 className="text-xl font-bold mb-2">Delhi NCR Headquarters</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  ComplyWithCA Corporate Tower,<br />
                  Connaught Place, Block C,<br />
                  New Delhi, Delhi 110001
                </p> */}
                <div className="flex items-center gap-3 text-sm font-bold text-emerald-400 bg-emerald-400/10 w-fit px-4 py-2 rounded-full border border-emerald-400/20">
                  <Clock size={16} /> Mon-Sat: 9:00 AM - 7:00 PM
                </div>
              </motion.div>

              {/* WhatsApp Action Bento */}
              <motion.button 
                variants={fadeRight} 
                onClick={handleWhatsAppChat}
                className="w-full bg-[#25D366]/10 border border-[#25D366]/20 p-6 rounded-[2rem] flex items-center justify-between group hover:bg-[#25D366] transition-colors duration-300 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 group-hover:text-white transition-colors text-lg">Chat on WhatsApp</div>
                    <div className="text-sm text-slate-600 group-hover:text-[#e0f8e9] transition-colors font-medium">Fastest response time</div>
                  </div>
                </div>
                <ArrowRight className="text-[#25D366] group-hover:text-white group-hover:translate-x-1 transition-all" />
              </motion.button>
            </motion.div>

            {/* RIGHT COLUMN: INTERACTIVE FORM (7 Columns wide on LG) */}
            <motion.div 
              initial="hidden" animate="visible" variants={fadeUp} 
              className="lg:col-span-7 relative"
            >
              {/* Form Glow Underlay */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-[3rem] blur-2xl opacity-50 -z-10" />

              <ConsultationForm />
            </motion.div>

          </div>
        </section>

      </main>

      {/* ==========================================
          FOOTER (Matching Site-wide)
          ========================================== */}
    <Footer/>
    </div>
  );
}