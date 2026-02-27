import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  MessageCircle, 
  X, 
  Globe, 
  Mail, 
  FileText 
} from 'lucide-react';
import Navbar from '../components/Navbar';

// ==========================================
// 1. DATA ARRAYS
// ==========================================
const processSteps = [
  { 
    id: "01", 
    title: "Consultation", 
    desc: "Understanding your business structure and compliance requirements through in-depth analysis." 
  },
  { 
    id: "02", 
    title: "Documentation", 
    desc: "Meticulous collection and multi-stage verification of all required regulatory documents." 
  },
  { 
    id: "03", 
    title: "Filing & Processing", 
    desc: "Accurate submission through secure channels and timely execution of all filing procedures." 
  },
  { 
    id: "04", 
    title: "Confirmation & Support", 
    desc: "Final confirmation of compliance status and continuous proactive advisory assistance." 
  }
];

const highlights = [
  { title: "Startup-Focused Advisory", desc: "Tailored strategies for emerging ventures." },
  { title: "Transparent Compliance Process", desc: "Clear visibility into every regulatory step." },
  { title: "Reliable & Timely Execution", desc: "Zero-lag delivery on critical filings." }
];

// ==========================================
// 2. ANIMATION VARIANTS
// ==========================================
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function About() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasTriggeredPopup, setHasTriggeredPopup] = useState(false);

  // Auto-hide popup after 12 seconds to not annoy the user
  useEffect(() => {
    let timer;
    if (showPopup) {
      timer = setTimeout(() => setShowPopup(false), 12000);
    }
    return () => clearTimeout(timer);
  }, [showPopup]);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      
      {/* --- NAVBAR --- */}
      <Navbar />

      <main className="pt-24 pb-20">
        
        {/* ==========================================
            HERO / INTRO SECTION 
            ========================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column */}
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={fadeUp}
              className="max-w-xl"
            >
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.05] mb-8 tracking-tight">
                Right <br />Compliance. <br />
                <span className="text-blue-600">Right Way.</span>
              </h1>
              <p className="text-base md:text-lg text-slate-600 mb-8 leading-relaxed font-medium">
                ComplyWithCA is a Delhi-based Chartered Accountant firm dedicated to delivering structured GST, tax filing, registration, and advisory solutions for startups and growing businesses. We focus on clarity, accuracy, and long-term compliance support.
              </p>
            </motion.div>

            {/* Right Column (Highlights) */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
              }}
              className="flex flex-col gap-8 lg:pl-16 border-l border-slate-100"
            >
              <div className="flex flex-col gap-8">
                {highlights.map((item, idx) => (
                  <motion.div key={idx} variants={fadeRight} className="relative pl-6 group">
                    {/* Animated Blue vertical line */}
                    <div className="absolute left-[-1px] top-1 bottom-1 w-[3px] bg-blue-600 rounded-full scale-y-75 group-hover:scale-y-100 transition-transform origin-top"></div>
                    <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div variants={fadeUp} className="pt-6 pl-6">
                <button className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-xl shadow-slate-900/10 hover:shadow-blue-500/20 text-sm tracking-wide">
                  Explore Our Services
                </button>
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* Subtle separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>


        {/* ==========================================
            PROCESS TIMELINE SECTION 
            ========================================== */}
        <section className="py-24 bg-slate-50/50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Section Header */}
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }} 
              variants={fadeUp}
              className="text-center mb-24"
            >
              <h4 className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-blue-500 uppercase mb-4">Workflow Architecture</h4>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Our <span className="underline decoration-slate-900 decoration-[3px] underline-offset-8">Pro</span>cess
              </h2>
              <p className="text-slate-600 font-medium text-lg">A Structured Approach to Compliance & Advisory</p>
            </motion.div>

            {/* Timeline Container */}
            <div className="relative max-w-4xl mx-auto">
              
              {/* Central Vertical Line (Animated on scroll) */}
              <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-blue-100 -translate-x-1/2 rounded-full"
              ></motion.div>

              {/* Process Steps */}
              <div className="flex flex-col gap-12 md:gap-20">
                {processSteps.map((step, index) => {
                  const isEven = index % 2 === 0;

                  return (
                    <div 
                      key={step.id} 
                      className={`relative flex flex-col md:flex-row items-center justify-between w-full group ${isEven ? 'md:flex-row-reverse' : ''}`}
                    >
                      
                      {/* Empty space for alternating layout on desktop */}
                      <div className="hidden md:block md:w-[45%]"></div>

                      {/* Center Animated Dot */}
                      <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                        <motion.div 
                          initial={{ scale: 0 }} 
                          whileInView={{ scale: 1 }} 
                          viewport={{ once: true, margin: "-100px" }} 
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                          className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_0_6px_rgba(255,255,255,1),_0_0_0_8px_rgba(219,234,254,1)] group-hover:scale-150 group-hover:bg-blue-600 transition-all duration-300"
                        />
                      </div>

                      {/* Content Card */}
                      <motion.div 
                        initial="hidden" 
                        whileInView="visible" 
                        viewport={{ once: true, margin: "-100px" }} 
                        variants={isEven ? fadeLeft : fadeRight} // Slides from the respective side
                        className="w-full md:w-[45%] pl-20 md:pl-0"
                      >
                        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                          
                          {/* Accent Line */}
                          <div className="absolute top-10 left-8 w-1 h-8 bg-blue-500 rounded-full"></div>
                          
                          {/* Giant Background Number */}
                          <div className="absolute -right-4 -top-8 text-[120px] font-black text-slate-50 select-none pointer-events-none transition-transform group-hover:scale-110 duration-500">
                            {step.id}
                          </div>
                          
                          <div className="relative z-10 pl-6">
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-600 text-sm md:text-base leading-relaxed">{step.desc}</p>
                          </div>
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
            CTA SECTION & POPUP TRIGGER
            ========================================== */}
        
        {/* Invisible target to trigger the popup when user reaches the bottom CTA */}
        <motion.div 
          onViewportEnter={() => {
            if (!hasTriggeredPopup) {
              setShowPopup(true);
              setHasTriggeredPopup(true);
            }
          }} 
          className="h-1 w-full" 
        />

        <section className="py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeUp}
            className="bg-[#0f172a] rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden"
          >
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 max-w-xl text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">Ready to streamline your compliance?</h2>
              <p className="text-slate-400 text-base md:text-lg">Connect with our chartered accountants for a professional consultation tailored to your business.</p>
            </div>
            
            <div className="relative z-10 shrink-0">
              <button className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap border border-blue-400/50 hover:scale-105 active:scale-95">
                Book a Consultation
              </button>
            </div>
          </motion.div>
        </section>

      </main>

      {/* ==========================================
          FOOTER
          ========================================== */}
      <footer className="w-full bg-white border-t border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-2 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
            <div className="w-6 h-6 bg-slate-200 text-slate-600 rounded flex items-center justify-center font-bold text-[10px]">CA</div>
            <span className="font-bold text-sm tracking-tight text-slate-800">ComplyWith<span className="text-blue-600">CA</span></span>
          </div>

          <p className="text-xs text-slate-400 font-medium text-center">
            © 2026 ComplyWithCA. All rights reserved. Professional Chartered Accountants.
          </p>

          <div className="flex items-center gap-5 text-slate-400">
            <Globe className="w-4 h-4 cursor-pointer hover:text-blue-600 transition-colors" />
            <Mail className="w-4 h-4 cursor-pointer hover:text-blue-600 transition-colors" />
            <FileText className="w-4 h-4 cursor-pointer hover:text-blue-600 transition-colors" />
          </div>

        </div>
      </footer>


      {/* ==========================================
          INNOVATIVE END-OF-PAGE POPUP
          ========================================== */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] max-w-[340px] w-[calc(100%-3rem)] bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50 ring-1 ring-slate-100"
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 hover:bg-slate-100 p-1.5 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                <MessageCircle className="w-6 h-6" />
              </div>
              
              <div>
                <h4 className="text-slate-900 font-extrabold text-lg mb-2">Need Expert Clarity?</h4>
                <p className="text-slate-600 text-sm mb-5 leading-relaxed font-medium">
                  Compliance can be complex. Let our CA team map out the exact workflow for your startup's needs.
                </p>
                <button className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-blue-600 text-white text-sm font-bold py-3 rounded-xl transition-colors group">
                  Chat with an Expert 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}