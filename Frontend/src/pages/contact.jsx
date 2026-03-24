import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import ConsultationForm from '../components/ConsultationForm';

// ================= ANIMATIONS =================
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

export default function Contact() {

  const handleWhatsAppChat = () => {
    const phoneNumber = "919289758145";
    const message = "Hi! I would like to schedule a consultation with ComplyWithCA.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 overflow-x-hidden">

      <Navbar />

      <main className="pt-20 sm:pt-24 pb-20">

        {/* ================= HERO ================= */}
        <section className="relative text-center py-16 px-4 overflow-hidden">

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-blue-100/40 to-transparent blur-[100px] rounded-full -z-10" />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4 text-blue-500" />
              Let’s Talk Business
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
            >
              Connect with our <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Advisory Team
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-slate-600 text-base sm:text-lg"
            >
              Whether you're starting or scaling, our Chartered Accountants are here to guide you.
            </motion.p>
          </motion.div>
        </section>

        {/* ================= MAIN SECTION ================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-12 gap-10">

            {/* ================= LEFT SIDE ================= */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="lg:col-span-5 flex flex-col gap-6"
            >

              {/* CONTACT CARD */}
              <motion.div variants={fadeUp} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
                <h3 className="text-xl font-bold mb-6">Contact Details</h3>

                <div className="space-y-5">

                  <a href="tel:+919289758145" className="flex gap-4 group">
                    <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold">CALL</p>
                      <p className="font-bold group-hover:text-blue-600">+91 9289758145</p>
                    </div>
                  </a>

                  <a href="mailto:info@complywithca.com" className="flex gap-4 group">
                    <div className="w-11 h-11 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold">EMAIL</p>
                      <p className="font-bold group-hover:text-indigo-600">info@complywithca.com</p>
                    </div>
                  </a>

                </div>
              </motion.div>

              {/* ADDRESS CARD */}
              <motion.div variants={fadeUp} className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">

                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 blur-[50px]" />

                <div className="flex gap-4 mb-5">
                  <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center">
                    <MapPin size={18} className="text-blue-400" />
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">Our Office</h3>
                    <p className="text-sm text-slate-300 mt-1">
                      RZ-35, Second Floor,<br />
                      Uttam Nagar,<br />
                      New Delhi - 110059
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 px-3 py-2 rounded-full w-fit">
                  <Clock size={14} />
                  Mon–Sat: 9 AM – 7 PM
                </div>
              </motion.div>

              {/* WHATSAPP */}
              <motion.button
                variants={fadeUp}
                onClick={handleWhatsAppChat}
                className="bg-[#25D366]/10 border border-[#25D366]/20 p-5 rounded-2xl flex items-center justify-between hover:bg-[#25D366] transition group"
              >
                <div className="flex gap-3 items-center">
                  <div className="w-11 h-11 bg-[#25D366] text-white rounded-full flex items-center justify-center">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="font-bold group-hover:text-white">Chat on WhatsApp</p>
                    <p className="text-xs text-slate-500 group-hover:text-white/80">Fastest response</p>
                  </div>
                </div>
                <ArrowRight className="group-hover:text-white" />
              </motion.button>

            </motion.div>

            {/* ================= RIGHT SIDE ================= */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-7 relative"
            >

              <div className="absolute -inset-3 bg-gradient-to-br from-blue-100 to-indigo-50 blur-2xl rounded-3xl opacity-50 -z-10" />

              <ConsultationForm />

            </motion.div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}