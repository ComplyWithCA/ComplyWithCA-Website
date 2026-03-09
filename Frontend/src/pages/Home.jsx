import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  Mail,
  Phone,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import expertImage from "../assets/image3.png";
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Footer from '../components/footer';
// ==========================================
// 1. DATA ARRAYS
// ==========================================
const services = [
  { 
    icon: FileText, 
    title: "GST Services", 
    desc: "Comprehensive GST registration, monthly filing, reconciliation, and audit representation.",
    path: "/services/gst-services"
  },
  { 
    icon: Building2, 
    title: "Business Registration", 
    desc: "Fast-track Private Limited, OPC, and LLP incorporation with complete ROC compliance.",
    path: "/services/business-registration"
  },
  { 
    icon: Briefcase, 
    title: "Firm Registration", 
    desc: "Partnership deed drafting and registration services tailored for professional firms.",
    path: "/services/firm-registration"
  },
  { 
    icon: Wallet, 
    title: "Income Tax Filing", 
    desc: "Strategic tax planning and timely filing of ITR for individuals, startups, and corporations.",
    path: "/services/income-tax-filing"
  },
  { 
    icon: BookOpen, 
    title: "Book Consultancy", 
    desc: "End-to-end bookkeeping and financial advisory to keep your records audit-ready.",
    path: "/services/book-consultancy"
  },
  { 
    icon: Award, 
    title: "Certificates", 
    desc: "CA Certification services including Net Worth, turnover certificates, and audit reports.",
    path: "/services/certificates"
  }
];

const features = [
  { icon: Rocket, title: "Dedicated Startup Support", desc: "Tailored compliance frameworks designed specifically for early-stage ventures to navigate growth stages." },
  { icon: Eye, title: "Transparent Process", desc: "Clear communication and step-by-step visibility into your financial workflows and reporting cycles." },
  { icon: Clock, title: "Timely Filing & Accuracy", desc: "Never miss a deadline with our precision-driven automated filing and reporting system." },
  { icon: Award, title: "Professional Advisory", desc: "Strategic insights and expert guidance to navigate complex regulatory landscapes and tax planning." }
];

const testimonials = [
  {
    quote: "ComplyWithCA made our compliance and documentation process extremely smooth. Their team handled everything professionally and saved us significant time.",
    name: "SetYourWay",
    role: "Management Team"
  },
  {
    quote: "Very reliable and responsive team. They guided us through registrations and compliance with complete clarity.",
    name: "Balaji Garments",
    role: "Operations Team"
  },
  {
    quote: "Professional service and quick turnaround. ComplyWithCA ensured our documentation and filings were handled accurately.",
    name: "O.P. Goyal Traders",
    role: "Business Team"
  },
  {
    quote: "Great experience working with their team. Their structured approach made the entire compliance process stress-free.",
    name: "Satyam Gupta",
    role: "Verified Client"
  }
];

// ==========================================
// 2. ANIMATION VARIANTS
// ==========================================
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40, damping: 15 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function Home() {
  const duplicatedTestimonials = [...testimonials, ...testimonials];
  
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-[#fafcff] font-sans text-slate-800 overflow-x-hidden selection:bg-blue-200 selection:text-blue-900">
      
      <Navbar />

      <main className="pt-24">
        
        {/* ==========================================
            HERO SECTION
            ========================================== */}
        <section id="home" className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-12 md:pt-20 pb-20 md:pb-32 flex flex-col lg:flex-row items-center min-h-[90vh]">
          {/* Spatial Background Elements */}
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-[100px] -z-10 -translate-x-1/3 -translate-y-1/4" />
          
          {/* Left Content Area */}
          <motion.div 
            style={{ y: heroY, opacity: heroOpacity }}
            className="w-full lg:w-1/2 lg:pr-8 xl:pr-12 z-10"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-slate-200/50 shadow-sm text-sm font-bold text-slate-700 mb-8 mt-8 lg:mt-0">
              <Sparkles className="w-4 h-4 text-blue-500" /> Premium Professionals in Delhi
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl xl:text-7xl font-black text-slate-900 leading-[1.05] mb-8 tracking-tight">
              Right Compliance.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Right Way.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg xl:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed font-medium">
Your Trusted Partner for Business Registration, Compliance, and Corporate Advisory in India
            </motion.p>
            
           <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">

  {/* Book Consultation */}
  <Link
    to="/services/book-consultancy"
    className="relative group overflow-hidden bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-[0_8px_30px_rgb(15,23,42,0.2)] hover:shadow-[0_8px_30px_rgb(37,99,235,0.3)] hover:-translate-y-0.5"
  >
    <span className="relative z-10">Book Consultation</span>
    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
  </Link>

  {/* View Services */}
  <Link
    to="/services"
    className="bg-white/50 backdrop-blur-sm border border-slate-200 hover:border-slate-300 hover:bg-white text-slate-800 px-8 py-4 rounded-2xl font-bold transition-all shadow-sm inline-flex items-center justify-center"
  >
    View Services
  </Link>

</motion.div>

            <motion.div variants={fadeInUp} className="mt-16 pt-8 border-t border-slate-200/60 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <div className="flex items-center gap-2"><Building2 className="w-4 h-4" /> Corporate Grade</div>
              <div className="flex items-center gap-2"><Shield className="w-4 h-4" /> Secure Audit</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 100% Compliant</div>
            </motion.div>
          </motion.div>

          {/* ==========================================
              HERO IMAGE
              ========================================== */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 mt-16 lg:mt-0 relative flex items-center justify-center perspective-[1200px] z-20"
          >
            {/* Animated Background Aurora */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute w-[80%] h-[80%] max-w-[500px] max-h-[500px] bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 rounded-full blur-[80px] opacity-30 -z-10"
            />

            {/* Floating Image Wrapper */}
            <motion.div
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex justify-center items-center w-full"
            >
              <div className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[600px] xl:h-[600px] bg-[#1E90FF]/25 blur-[100px] rounded-full"></div>

              <img
                src={expertImage}
                alt="ComplyWithCA 3D Expert"
                className="relative z-30 
                           w-[800px] lg:w-[1000px] xl:w-[1200px]
                           h-auto object-contain
                           transition-all duration-700 ease-out
                           hover:scale-[1.1] hover:-rotate-1 origin-bottom"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* ==========================================
            CORE SERVICES SECTION
            ========================================== */}
        <section id="services" className="relative bg-white py-32 border-t border-slate-100 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            
            <motion.div 
              className="text-center mb-20"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <h4 className="text-sm font-bold tracking-[0.2em] text-blue-600 uppercase mb-4">Architecture of Compliance</h4>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                Our Core Services
              </h2>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {services.map((service, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  {/* ✅ Entire card wrapped in Link for navigation */}
                  <Link
                    to={service.path}
                    className="group relative bg-[#fafcff] p-8 lg:p-10 rounded-[2rem] border border-slate-100 hover:border-blue-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(37,99,235,0.06)] overflow-hidden flex flex-col h-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-16 h-16 bg-white shadow-sm border border-slate-100 text-slate-700 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:border-blue-500 transition-all duration-500">
                        <service.icon className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                      <p className="text-slate-500 mb-10 text-base leading-relaxed flex-grow">{service.desc}</p>
                      
                      {/* Changed from <a> to <span> since the whole card is the link */}
                      <span className="inline-flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wide group-hover:text-blue-600 transition-colors mt-auto">
                        Explore Service 
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==========================================
            WHY CHOOSE US SECTION (STICKY SCROLL)
            ========================================== */}
        <section className="py-32 bg-slate-900 text-white border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-20 items-start">
              
              {/* Sticky Left Content */}
              <motion.div 
                className="lg:w-5/12 lg:sticky lg:top-32"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
              >
                <div className="w-16 h-1 bg-blue-500 mb-10 rounded-full" />
                <h2 className="text-4xl lg:text-6xl font-black leading-[1.1] mb-8 tracking-tight">
                  Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Startups.</span><br />
                  Structured for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Growth.</span>
                </h2>
                <p className="text-slate-400 mb-12 text-lg leading-relaxed">
                  We bridge the gap between complex regulatory requirements and your business vision with precision-engineered financial solutions.
                </p>
                
                <div className="inline-flex items-center gap-5 bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-2xl">
                  <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center">
                    <Shield className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-lg">100% Compliance Rate</div>
                    <div className="text-sm text-slate-400">Across 500+ active startups</div>
                  </div>
                </div>
              </motion.div>

              {/* Scrolling Right Content */}
              <motion.div 
                className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                {features.map((feature, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={fadeInUp} 
                    className="bg-white/5 backdrop-blur-lg p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors duration-300"
                  >
                    <div className="text-blue-400 mb-8 bg-blue-500/10 w-16 h-16 rounded-2xl flex items-center justify-center">
                      <feature.icon className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-4">{feature.title}</h4>
                    <p className="text-slate-400 text-base leading-relaxed">{feature.desc}</p>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>

        {/* ==========================================
            SEAMLESS INFINITE MARQUEE
            ========================================== */}
        <section className="py-32 bg-slate-50 border-y border-slate-200 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-16 text-center">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4 tracking-tight">Trusted by Visionaries.</h2>
            <p className="text-slate-500 text-lg font-medium">Empowering enterprises across Delhi with reliable advisory.</p>
          </div>

          <div className="relative w-full flex overflow-hidden group">
            {/* Fade masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

            {/* Seamless track */}
            <motion.div 
              className="flex gap-8 w-max px-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            >
              {duplicatedTestimonials.map((t, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] w-[360px] md:w-[460px] shrink-0 flex flex-col justify-between hover:shadow-[0_10px_40px_rgb(0,0,0,0.06)] transition-shadow duration-300"
                >
                  <div className="text-7xl text-blue-100 absolute top-6 left-8 font-serif leading-none select-none">"</div>
                  <p className="text-slate-700 relative z-10 mb-10 text-lg leading-relaxed font-medium">"{t.quote}"</p>
                  <div className="flex items-center gap-5 mt-auto">
                    <div className="w-14 h-14 bg-slate-100 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.name.replace(" ", "")}`} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-lg">{t.name}</div>
                      <div className="text-slate-500 text-sm font-semibold">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ==========================================
            BOTTOM CTA
            ========================================== */}
<section className="bg-white py-32 px-6 lg:px-8">
  <div className="max-w-6xl mx-auto">
    <motion.div 
      className="relative bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center shadow-2xl overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
          Ready to secure your <br className="hidden md:block" /> startup's infrastructure?
        </h2>

        <p className="text-slate-300 mb-12 max-w-2xl mx-auto text-xl">
          Join 500+ tech founders who trust ComplyWithCA for their regulatory excellence and strategic financial growth.
        </p>

        {/* Premium WhatsApp CTA Button */}
        <div className="flex justify-center">
          <a
            href="https://wa.me/919289758145?text=Hi%20ComplyWithCA,%20I%20would%20like%20to%20book%20a%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-12 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(37,211,102,0.4)] animate-pulse"
          >
            <FaWhatsapp className="text-2xl" />
            Book a Consultation
          </a>
        </div>

      </div>
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