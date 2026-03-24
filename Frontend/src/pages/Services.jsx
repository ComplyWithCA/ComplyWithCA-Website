import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Users
} from 'lucide-react';
import expertImage from "../assets/image5.png";
import Footer from '../components/footer';
import { FaWhatsapp } from "react-icons/fa";

// ==========================================
// ANIMATION VARIANTS
// ==========================================
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
};

// ==========================================
// DATA
// ==========================================
const services = [
  {
    id: 1,
    slug: "gst-services",
    title: "GST Services",
    desc: "End-to-end GST filing, reconciliation, and audit representation for scaling startups.",
    price: "₹499",
    icon: Calculator,
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80&auto=format&fit=crop"
  },
  {
    id: 2,
    slug: "business-registration",
    title: "Business Registration",
    desc: "Get your Private Limited Company or One Person Company (OPC) registered in as little as 10 days.",
    price: "₹1,999",
    icon: Briefcase,
    img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80&auto=format&fit=crop"
  },
  {
    id: 3,
    slug: "firm-registration",
    title: "Firm Registration",
    desc: "Structured LLP and Partnership registrations with comprehensive agreement drafting.",
    price: "₹1,999",
    icon: Building2,
    img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80&auto=format&fit=crop"
  },
  {
    id: 4,
    slug: "income-tax-filing",
    title: "Income Tax Filing",
    desc: "Proactive tax planning for individuals, professionals, and corporate entities with top optimization.",
    price: "₹999",
    icon: FileText,
    img: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400&q=80&auto=format&fit=crop"
  },
  {
    id: 5,
    slug: "book-consultancy",
    title: "Book Consultancy",
    desc: "Full-stack bookkeeping and virtual CFO services for data-driven business decisions.",
    price: "₹299",
    icon: BookOpen,
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80&auto=format&fit=crop"
  },
  {
    id: 6,
    slug: "certificates",
    title: "Certificates",
    desc: "Quick processing of digital signature (DSC), MSME, and Startup India certificates.",
    price: "₹399",
    icon: ShieldCheck,
    img: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&q=80&auto=format&fit=crop"
  }
];

const features = [
  {
    title: "Zero Error Guarantee",
    desc: "Every filing passes through a 3-layer verification system to ensure 100% compliance.",
    icon: CheckCircle2,
    img: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=400&q=80&auto=format&fit=crop"
  },
  {
    title: "Lightning Fast TAT",
    desc: "Industry-leading turnaround times for registrations and certificate issuances.",
    icon: Clock,
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80&auto=format&fit=crop"
  },
  {
    title: "Real-Time Tracking",
    desc: "Monitor your application status in real-time right on our dedicated client dashboard.",
    icon: Activity,
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80&auto=format&fit=crop"
  }
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function ServicesPage() {
  const navigate = useNavigate();

  const handleWhatsAppChat = (e, serviceName = null) => {
    if (e) e.stopPropagation();
    const phoneNumber = "919289758145";
    const message = serviceName
      ? `Hi! I would like to know more about your ${serviceName} service.`
      : `Hi! I would like to book a consultation and explore your CA services.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 overflow-x-hidden selection:bg-blue-200 selection:text-blue-900">
      <Navbar />

      <main className="pt-24">

      {/* ==========================================
          HERO SECTION — matches Home exactly
          ========================================== */}
      <section
  id="services-hero"
  className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 
  pt-8 sm:pt-12 md:pt-16 
  pb-10 sm:pb-16 md:pb-24 
  flex flex-col lg:flex-row items-center 
  min-h-[auto] lg:min-h-[70vh]"
>
  {/* Background glow (controlled like Home) */}
  <div className="hidden sm:block absolute top-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-[60px] -z-10 -translate-x-1/3 -translate-y-1/4" />

  {/* LEFT CONTENT */}
  <motion.div
    initial="hidden"
    animate="show"
    variants={staggerContainer}
    className="w-full lg:w-1/2 lg:pr-8 xl:pr-12 z-10 text-center lg:text-left"
  >
    {/* Badge */}
    <motion.div
      variants={fadeUp}
      className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs sm:text-sm font-bold text-slate-700 mb-4 sm:mb-6 mt-4 sm:mt-6 lg:mt-0"
    >
      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500 shrink-0" />
      <span>Premium Advisory Services</span>
    </motion.div>

    {/* Heading */}
    <motion.h1
      variants={fadeUp}
      className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-black text-slate-900 leading-[1.08] mb-4 sm:mb-6 tracking-tight"
    >
      Compliance Services{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
        Built for Growth
      </span>
    </motion.h1>

    {/* Subtext */}
    <motion.p
      variants={fadeUp}
      className="text-sm sm:text-base xl:text-lg text-slate-600 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium"
    >
      From GST to company registration and tax filing — we simplify compliance so you can focus on scaling your business.
    </motion.p>

    {/* CTA BUTTONS */}
    <motion.div
      variants={fadeUp}
      className="flex flex-col xs:flex-row flex-wrap items-center justify-center lg:justify-start gap-3"
    >
      {/* Primary */}
      <button
        onClick={() => navigate('/services/book-consultancy')}
        className="relative group overflow-hidden bg-slate-900 text-white w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_6px_20px_rgb(15,23,42,0.18)] hover:shadow-[0_6px_20px_rgb(37,99,235,0.28)] hover:-translate-y-0.5 text-sm sm:text-base"
      >
        <span className="relative z-10">Book Consultation</span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform shrink-0" />
      </button>

      {/* Secondary */}
      <button
        onClick={(e) => handleWhatsAppChat(e)}
        className="bg-white border border-slate-200 hover:border-green-300 hover:bg-green-50 text-slate-800 hover:text-green-700 w-full xs:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm text-sm sm:text-base"
      >
        <MessageCircle size={16} className="shrink-0" />
        Chat on WhatsApp
      </button>
    </motion.div>

    {/* TRUST BADGES */}
    <motion.div
      variants={fadeUp}
      className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest"
    >
      <div className="flex items-center gap-1.5">
        <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Corporate Grade
      </div>
      <div className="flex items-center gap-1.5">
        <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Secure Filing
      </div>
      <div className="flex items-center gap-1.5">
        <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> 100% Compliant
      </div>
    </motion.div>
  </motion.div>

  {/* RIGHT IMAGE */}
  <motion.div
    initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
    transition={{ duration: 1 }}
    className="w-full lg:w-1/2 mt-8 sm:mt-12 lg:mt-0 relative flex items-center justify-center perspective-[1200px] z-20"
  >
    {/* Glow */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      className="absolute w-[60%] sm:w-[70%] h-[60%] sm:h-[70%] max-w-[300px] sm:max-w-[400px] max-h-[300px] sm:max-h-[400px] bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 rounded-full blur-[50px] sm:blur-[60px] opacity-20 sm:opacity-25 -z-10"
    />

    {/* Floating Image */}
    <motion.div
      animate={{ y: [-8, 8, -8] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="relative flex justify-center items-center w-full"
    >
      <div className="absolute w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] lg:w-[380px] lg:h-[380px] xl:w-[480px] xl:h-[480px] bg-[#1E90FF]/20 blur-[60px] rounded-full" />

      <img
        src={expertImage}
        alt="ComplyWithCA Services"
        className="relative z-30 w-[340px] sm:w-[500px] md:w-[620px] lg:w-[900px] xl:w-[1050px] h-auto object-contain transition-all duration-700 ease-out hover:scale-[1.04] hover:-rotate-1 origin-bottom max-w-full"
      />
    </motion.div>
  </motion.div>
</section>


      {/* ==========================================
          SERVICES GRID SECTION
          ========================================== */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-100 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <motion.div
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h4 className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-blue-600 uppercase mb-2 sm:mb-3">What We Offer</h4>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 tracking-tight text-slate-900">
              Specialized Tax & Compliance Pillars
            </h2>
            <p className="text-slate-500 text-sm sm:text-base lg:text-lg font-medium leading-relaxed">
              Industry-leading solutions tailored for modern enterprises, ensuring your business stays compliant while you focus on growth.
            </p>
          </motion.div>

          {/* Contained white box — matching Home/About style */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md border border-slate-200 p-5 sm:p-8 md:p-10">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
            >
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onClick={() => navigate(`/services/${service.slug}`)}
                  className="group relative bg-slate-50 border-2 border-slate-200 hover:border-blue-500 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer transition-all duration-250 hover:shadow-[0_8px_32px_rgb(37,99,235,0.12)]"
                >
                  {/* Photo thumbnail */}
                  <div className="relative h-28 sm:h-36 overflow-hidden shrink-0">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/10 to-transparent" />
                    {/* Icon badge */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3 w-8 sm:w-9 h-8 sm:h-9 bg-white/95 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md">
                      <service.icon className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-600" strokeWidth={1.5} />
                    </div>
                    {/* Price badge — top right */}
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-blue-600 text-white text-[10px] sm:text-xs font-black px-2 py-1 rounded-lg shadow-md">
                      From {service.price}
                    </div>
                    {/* Accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </div>

                  {/* Card body */}
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    {/* Title + arrow */}
                    <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors duration-200 leading-tight">{service.title}</h3>
                      <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-md sm:rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all duration-250 shrink-0 ml-2 mt-0.5">
                        <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-slate-400 group-hover:text-white transition-all duration-200" />
                      </div>
                    </div>

                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed flex-grow mb-3 sm:mb-4">{service.desc}</p>

                    {/* Footer: CTA + WhatsApp */}
                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-100 mt-auto gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/services/${service.slug}`);
                        }}
                        className="text-xs sm:text-sm font-bold text-slate-600 group-hover:text-blue-600 flex items-center gap-1 transition-colors uppercase tracking-wide"
                      >
                        View Details <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </button>

                      <button
                        onClick={(e) => handleWhatsAppChat(e, service.title)}
                        className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-green-50 border border-green-200 text-green-600 flex items-center justify-center hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-200 shadow-sm shrink-0"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==========================================
          FEATURES SPLIT SECTION
          ========================================== */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-900 px-4 sm:px-6 relative overflow-hidden">

        {/* Subtle background glows */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600 blur-[100px] sm:blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600 blur-[100px] sm:blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-center">

            {/* Left text */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 40, damping: 15 }}
              className="text-center lg:text-left"
            >
              <div className="w-12 h-1 bg-blue-500 mb-5 sm:mb-6 rounded-full mx-auto lg:mx-0" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white mb-4 sm:mb-5 tracking-tight">
                Structured Compliance.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Transparent Process.</span><br />
                Reliable Execution.
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-md leading-relaxed font-medium mx-auto lg:mx-0">
                We've redefined CA services for the digital age. No hidden fees, no complex jargon—just professional excellence delivered with modern speed.
              </p>

              {/* Photo collage */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-3 gap-2 sm:gap-3 mt-6 sm:mt-8"
              >
                {[
                  { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80&auto=format&fit=crop", label: "Our Team" },
                  { src: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=400&q=80&auto=format&fit=crop", label: "Office" },
                  { src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=80&auto=format&fit=crop", label: "Advisory" },
                ].map((photo, i) => (
                  <motion.div key={i} variants={fadeUp} className="relative rounded-lg sm:rounded-xl overflow-hidden group/photo">
                    <img
                      src={photo.src}
                      alt={photo.label}
                      className="w-full h-20 sm:h-24 object-cover transition-transform duration-500 group-hover/photo:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                    <span className="absolute bottom-1.5 left-2 text-white text-[9px] sm:text-[10px] font-semibold">{photo.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: feature cards with photo thumbnails */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col gap-3 sm:gap-4"
            >
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="group bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden hover:bg-white/8 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(37,99,235,0.15)]"
                >
                  <div className="flex items-stretch gap-0">
                    {/* Photo strip on left */}
                    <div className="relative w-20 sm:w-24 shrink-0 overflow-hidden">
                      <img
                        src={feature.img}
                        alt={feature.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/60" />
                    </div>

                    {/* Text content */}
                    <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 flex-1">
                      <div className="w-9 sm:w-10 h-9 sm:h-10 rounded-lg sm:rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                        <feature.icon size={17} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-white mb-0.5 sm:mb-1">{feature.title}</h4>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==========================================
          CTA SECTION
          ========================================== */}
      <section className="py-12 sm:py-16 md:py-20 bg-slate-100 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            className="relative rounded-2xl overflow-hidden"
          >
            {/* Background photo */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80&auto=format&fit=crop"
                alt="Modern office"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/93 via-slate-900/82 to-blue-900/70" />
            </div>

            {/* Glow blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] bg-blue-600/25 blur-[100px] sm:blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 p-7 sm:p-10 md:p-16 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-5 tracking-tight leading-tight">
                Need Help Choosing the Right Service?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base lg:text-lg mb-7 sm:mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
                Speak with our senior partners for a personalized roadmap of your business's legal and financial requirements.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleWhatsAppChat(e)}
                className="bg-[#25D366] hover:bg-[#1ebe5d] text-white px-8 sm:px-10 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-lg transition-all shadow-[0_0_30px_rgba(37,211,102,0.35)] flex items-center justify-center gap-2 sm:gap-3 mx-auto animate-pulse"
              >
                <FaWhatsapp className="text-lg sm:text-2xl shrink-0" />
                Free WhatsApp Consultation
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      </main>
{/* ==========================================
          FLOATING ACTION BUTTONS
          ========================================== */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-3 sm:gap-4">

        <a
          href="tel:+919289758145"
          className="group relative flex items-center justify-center"
        >
          <span className="absolute w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-blue-500/30 blur-xl" />
          <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white p-2.5 sm:p-3.5 rounded-full shadow-[0_8px_30px_rgba(37,99,235,0.4)] transition-all duration-300 group-hover:scale-110">
            <Phone className="w-4 sm:w-5 h-4 sm:h-5" />
          </div>
          <span className="hidden sm:block absolute right-14 sm:right-16 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg">
            Call Now
          </span>
        </a>

        <a
          href="https://wa.me/919289758145?text=Hi%20ComplyWithCA,%20I%20would%20like%20to%20book%20a%20consultation."
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center"
        >
          <span className="absolute w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-green-500/30 blur-xl" />
          <span className="absolute inline-flex h-12 sm:h-14 w-12 sm:w-14 rounded-full bg-green-400 opacity-20 animate-ping" />
          <div className="relative bg-gradient-to-br from-[#25D366] to-[#1ebe5d] hover:from-[#1ebe5d] hover:to-[#17a74a] text-white p-3.5 sm:p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.5)] transition-all duration-300 group-hover:scale-110">
            <FaWhatsapp className="text-lg sm:text-xl" />
          </div>
          <span className="hidden sm:block absolute right-14 sm:right-16 bg-slate-900 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow-lg">
            Chat on WhatsApp
          </span>
        </a>

      </div>


      <Footer />
    </div>
  );
}