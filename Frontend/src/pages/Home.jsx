import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Building2, 
  Briefcase, 
  Wallet, 
  BookOpen, 
  Award, 
  Rocket, 
  Eye, 
  Clock, 
  Shield,
  ChevronDown,
  Mail,
  Phone,
  Compass
} from 'lucide-react';
import Navbar from '../components/Navbar';

// ==========================================
// 1. DATA ARRAYS
// ==========================================
const services = [
  { icon: <FileText className="w-6 h-6" />, title: "GST Services", desc: "Comprehensive GST registration, monthly filing, reconciliation, and audit representation." },
  { icon: <Building2 className="w-6 h-6" />, title: "Business Registration", desc: "Fast-track Private Limited, OPC, and LLP incorporation with complete ROC compliance." },
  { icon: <Briefcase className="w-6 h-6" />, title: "Firm Registration", desc: "Partnership deed drafting and registration services tailored for professional firms." },
  { icon: <Wallet className="w-6 h-6" />, title: "Income Tax Filing", desc: "Strategic tax planning and timely filing of ITR for individuals, startups, and corporations." },
  { icon: <BookOpen className="w-6 h-6" />, title: "Book Consultancy", desc: "End-to-end bookkeeping and financial advisory to keep your records audit-ready." },
  { icon: <Award className="w-6 h-6" />, title: "Certificates", desc: "CA Certification services including Net Worth, turnover certificates, and audit reports." }
];

const features = [
  { icon: <Rocket className="w-8 h-8" />, title: "Dedicated Startup Support", desc: "Tailored compliance frameworks designed specifically for early-stage ventures to navigate growth stages." },
  { icon: <Eye className="w-8 h-8" />, title: "Transparent Process", desc: "Clear communication and step-by-step visibility into your financial workflows and reporting cycles." },
  { icon: <Clock className="w-8 h-8" />, title: "Timely Filing & Accuracy", desc: "Never miss a deadline with our precision-driven automated filing and reporting system." },
  { icon: <Award className="w-8 h-8" />, title: "Professional Advisory", desc: "Strategic insights and expert guidance to navigate complex regulatory landscapes and tax planning." }
];

const testimonials = [
  { quote: "ComplyWithCA streamlined our entire tax filing process seamlessly. Their attention to detail saved us months of paperwork.", name: "Ankit Sharma", role: "Founder, Fintech Startup" },
  { quote: "Their advisory-driven approach gave us the confidence to scale rapidly. They are not just accountants; they are strategic partners.", name: "Priya Mehta", role: "CEO, Tech Solutions" },
  { quote: "Professional, structured, and highly reliable. They've managed our complex corporate audits with a rare level of precision.", name: "Vikram Singh", role: "Director, Logistics Corp" },
  { quote: "The best compliance partners we could ask for. Fast, responsive, and deeply knowledgeable about startup regulations.", name: "Neha Gupta", role: "CFO, E-commerce Plus" }
];

// ==========================================
// 2. ANIMATION VARIANTS
// ==========================================
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};


// ==========================================
// 4. MAIN COMPONENT: APP
// ==========================================
export default function App() {
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      
      <Navbar />

      <main className="pt-20">
        
        {/* --- HERO SECTION --- */}
        <section id="home" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-20 md:pb-32 flex flex-col lg:flex-row items-center min-h-[85vh]">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/4"></div>

          <motion.div 
            className="lg:w-1/2 lg:pr-12 z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-8 border border-blue-100">
              <CheckCircle2 className="w-4 h-4 text-blue-600" /> Trusted Advisory Delhi
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6">
              Right <br />Compliance. <br />
              <span className="text-blue-600 underline decoration-blue-200 underline-offset-8">Right Way.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-base sm:text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
              Professional GST Registration, Tax Filing & Advisory Services for Startups and Growing Businesses in Delhi.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg group">
                Book Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white border border-slate-300 hover:border-slate-400 text-slate-800 px-8 py-3.5 rounded-xl font-bold transition-all shadow-sm">
                View Services
              </button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12 md:mt-16 pt-8 border-t border-slate-200 flex flex-wrap items-center gap-x-6 gap-y-4 text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="flex items-center gap-2"><Building2 className="w-4 h-4 text-slate-400" /> Corporate Grade</div>
              <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-slate-400" /> Legal Compliance</div>
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-slate-400" /> Secure Audit</div>
            </motion.div>
          </motion.div>

          {/* --- MOBILE FALLBACK (Premium Static Layout) --- */}
          <motion.div 
            className="flex lg:hidden w-full relative h-[450px] mt-16 items-center justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Background Decorative Rings */}
            <div className="absolute w-[300px] h-[300px] bg-white rounded-full border border-slate-100 shadow-sm z-0"></div>
            <div className="absolute w-[200px] h-[200px] border border-blue-100 border-dashed rounded-full z-0"></div>
            
            {/* Central Core */}
            <div className="absolute w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center z-20 shadow-xl border-4 border-white">
              <Compass className="w-10 h-10 text-white" />
            </div>

            {/* Static Card 1 */}
            <div className="absolute top-4 right-0 sm:right-10 z-30 bg-white px-5 py-3 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><FileText className="w-5 h-5"/></div>
              <div>
                <div className="font-bold text-slate-800 text-sm">GST Services</div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Filing & Audit</div>
              </div>
            </div>

            {/* Static Card 2 */}
            <div className="absolute bottom-10 left-0 sm:left-10 z-30 bg-white px-5 py-3 rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><Wallet className="w-5 h-5"/></div>
              <div>
                <div className="font-bold text-slate-800 text-sm">Income Tax</div>
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Strategic Planning</div>
              </div>
            </div>
          </motion.div>

          {/* --- HERO CIRCULAR ORBITAL ANIMATION (DESKTOP ONLY) --- */}
          <motion.div 
            className="hidden lg:flex lg:w-1/2 mt-0 relative items-center justify-center min-h-[600px] xl:min-h-[700px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          >
            {/* Expanded Premium Wrapper */}
            <div className="relative w-[500px] h-[500px] xl:w-[600px] xl:h-[600px] flex items-center justify-center">
              
              {/* Outer Subtle Ring Background */}
              <div className="absolute w-full h-full rounded-full bg-slate-50/50 border border-slate-200/50 shadow-inner z-0"></div>
              
              {/* Central Core (Larger, more premium) */}
              <div className="absolute w-32 h-32 xl:w-40 xl:h-40 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center z-20 shadow-[0_0_40px_rgba(59,130,246,0.4)] border-[6px] border-white">
                 <div className="w-full h-full rounded-full border border-white/20 flex items-center justify-center">
                   <Compass className="w-12 h-12 xl:w-16 xl:h-16 text-white" />
                 </div>
              </div>

              {/* Orbital Ring 1 (Inner) */}
              <motion.div 
                className="absolute w-[320px] h-[320px] xl:w-[380px] xl:h-[380px] rounded-full border-2 border-slate-200 border-dashed z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                {/* Premium Pill 1 - GST */}
                <motion.div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-xl shadow-slate-200 border border-slate-100"
                  animate={{ rotate: -360 }} // Counter-rotate to keep upright
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-800 text-sm whitespace-nowrap pr-2">
                    GST Services
                  </span>
                </motion.div>
                
                {/* Premium Pill 2 - Firm Reg */}
                <motion.div 
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-xl shadow-slate-200 border border-slate-100"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-800 text-sm whitespace-nowrap pr-2">
                    Firm Registration
                  </span>
                </motion.div>
              </motion.div>

              {/* Orbital Ring 2 (Outer) */}
              <motion.div 
                className="absolute w-full h-full rounded-full border border-blue-100/80 z-10"
                animate={{ rotate: -360 }} // Rotates opposite direction
                transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
              >
                {/* Premium Pill 3 - Income Tax */}
                <motion.div 
                  className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-xl shadow-slate-200 border border-slate-100"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-800 text-sm whitespace-nowrap pr-2">
                    Income Tax
                  </span>
                </motion.div>
                
                {/* Premium Pill 4 - Certificates */}
                <motion.div 
                  className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-xl shadow-slate-200 border border-slate-100"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-800 text-sm whitespace-nowrap pr-2">
                    Certificates
                  </span>
                </motion.div>
              </motion.div>

            </div>
          </motion.div>
        </section>

        {/* --- CORE SERVICES SECTION (CLEAN & LIGHT) --- */}
        <section id="services" className="bg-white py-24 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Our <span className="underline decoration-blue-500 decoration-4 underline-offset-8">Core Services</span>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Structured Compliance & Advisory Solutions for Startups and Growing Businesses in Delhi.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {services.map((service, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  className="bg-white border border-slate-200 p-8 rounded-2xl hover:shadow-xl hover:border-slate-300 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-8 text-sm leading-relaxed">{service.desc}</p>
                  <a href="#" className="text-blue-600 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    LEARN MORE <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- WHY CHOOSE US SECTION --- */}
        <section className="py-24 bg-slate-50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <motion.div 
                className="lg:w-1/3 lg:sticky lg:top-32"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
              >
                <div className="w-12 h-1.5 bg-blue-600 mb-8 rounded-full"></div>
                <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.15] mb-6">
                  Built for <span className="text-blue-600">Startups.</span><br />
                  Structured for <span className="text-blue-600">Growth.</span>
                </h2>
                <p className="text-slate-600 mb-10 text-lg">
                  We bridge the gap between complex regulatory requirements and your business vision with precision-engineered financial solutions.
                </p>
                <div className="inline-flex items-center gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-base">100% Compliance Rate</div>
                    <div className="text-sm font-medium text-slate-500">Across 500+ active startups</div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                {features.map((feature, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-blue-600 mb-6 bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center">{feature.icon}</div>
                    <h4 className="text-lg font-bold text-slate-900 mb-3">{feature.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- HORIZONTAL MARQUEE TESTIMONIALS --- */}
        <section className="py-24 bg-white border-y border-slate-100 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Trusted by Visionaries.</h2>
            <p className="text-slate-600 text-lg">Empowering enterprises across Delhi with reliable advisory.</p>
          </div>

          {/* Marquee Container */}
          <div className="relative w-full flex overflow-hidden py-4">
            {/* Gradient masks for smooth fading on the edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <motion.div 
              className="flex gap-6 w-max px-4"
              animate={{ x: ["0%", "-33.333%"] }} 
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 40 // Scroll speed
              }}
            >
              {duplicatedTestimonials.map((t, idx) => (
                <div key={idx} className="bg-slate-50 p-8 md:p-10 rounded-2xl border border-slate-100 w-[320px] md:w-[420px] flex-shrink-0 relative flex flex-col justify-between">
                  <div className="text-6xl text-blue-100 absolute top-4 left-6 font-serif leading-none">"</div>
                  <p className="text-slate-700 relative z-10 mb-8 font-medium leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name}`} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">{t.name}</div>
                      <div className="text-slate-500 text-sm font-medium">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- BOTTOM CTA (CLEAN BLUE) --- */}
        <section className="bg-slate-50 py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="bg-blue-600 rounded-3xl p-10 md:p-16 text-center text-white shadow-xl shadow-blue-500/10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">Ready to secure your <br className="hidden md:block" /> startup's future?</h2>
              <p className="text-blue-100 mb-10 max-w-xl mx-auto text-lg font-medium">
                Join 500+ founders who trust ComplyWithCA for their regulatory excellence and strategic financial growth.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-md">
                  Book a Consultation
                </button>
                <button className="bg-transparent border-2 border-blue-400 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 hover:border-blue-700 transition-all">
                  View Pricing Plans
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            <div className="lg:col-span-2 pr-8">
              <div className="flex items-center gap-2 mb-6 cursor-pointer">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">CA</div>
                <span className="font-bold text-xl text-slate-900">ComplyWithCA</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-sm">
                Leading chartered accountancy firm specializing in startup compliance, ROC filings, and strategic financial advisory in Delhi NCR.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-5">Quick Links</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Tax Filing</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Incorporation</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Audit Support</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Payroll Processing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-5">Company</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-5">Contact</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-slate-400"/> info@complywithca.com</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-slate-400"/> +91 (800) 000-1234</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between text-sm font-medium text-slate-400">
            <p>© 2026 ComplyWithCA. All rights reserved.</p>
            <div className="flex gap-3 mt-4 md:mt-0">
               <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 cursor-pointer transition-all">in</div>
               <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 cursor-pointer transition-all">tw</div>
               <div className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 cursor-pointer transition-all">fb</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}