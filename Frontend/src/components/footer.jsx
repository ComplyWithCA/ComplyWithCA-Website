import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import logo from "../assets/logo-removedbg.png";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-800 overflow-hidden">

      {/* ===== Ambient Glow ===== */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-600 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* ================= TOP ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* COMPANY */}
          <div className="lg:col-span-2">

            <div
              onClick={() => navigate("/")}
              className="cursor-pointer mb-6"
            >
              <img
                src={logo}
                alt="ComplyWithCA Logo"
                className="w-[200px] hover:opacity-90 transition"
              />
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-6">
              We provide professional compliance and business advisory services
              for startups and enterprises in Delhi NCR.
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919289758145"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-5 py-3 rounded-lg font-semibold text-sm transition-all shadow-md"
            >
              <FaWhatsapp /> Chat on WhatsApp
            </a>

          </div>

          {/* SERVICES */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Services
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/services/income-tax-filing" className="hover:text-white transition">Income Tax Filing</Link></li>
              <li><Link to="/services/business-registration" className="hover:text-white transition">Business Registration</Link></li>
              <li><Link to="/services/certificates" className="hover:text-white transition">Certificates</Link></li>
              <li><Link to="/services/book-consultancy" className="hover:text-white transition">Book Consultancy</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
              Contact
            </h4>

            <ul className="space-y-4 text-sm text-slate-400">

              <li>
                <a
                  href="mailto:info@complywithca.com"
                  className="flex items-center gap-3 hover:text-white transition"
                >
                  <Mail className="w-4 h-4" />
                  info@complywithca.com
                </a>
              </li>

              <li>
                <a
                  href="tel:+919289758145"
                  className="flex items-center gap-3 hover:text-white transition"
                >
                  <Phone className="w-4 h-4" />
                  +91 9289758145
                </a>
              </li>

              <li>
                <a
                  href="https://maps.google.com/?q=Rz-35, Second Floor, Uttam Nagar, New Delhi-110059"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white transition"
                >
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    RZ-35, Second Floor,<br />
                    Uttam Nagar, New Delhi - 110059
                  </span>
                </a>
              </li>

            </ul>
          </div>

        </div>

        {/* ================= DIVIDER ================= */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent mb-6" />

        {/* ================= BOTTOM ================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">

          {/* LEFT SIDE */}
          <div className="text-center md:text-left space-y-2">

            <p>
              © {new Date().getFullYear()} ComplyWithCA. All rights reserved.
            </p>

            {/* ===== AGENCY BADGE ===== */}
           <a
  href="https://www.setyourway.com/"
  target="_blank"
  rel="noopener noreferrer"
  className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E3553]/80 border border-[#1E3553] hover:border-[#F28C28] transition-all duration-300"
>
  <span className="text-xs text-gray-300">
    Crafted by
  </span>

  {/* BRAND TEXT */}
  <span className="relative text-xs font-semibold flex items-center">

    {/* SetYour (WHITE) */}
    <span className="text-white">
      SetYour
    </span>

    {/* Way (ORANGE) */}
    <span className="relative text-[#F28C28]">
      Way

      {/* underline animation */}
      <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-[#F28C28] transition-all duration-300 group-hover:w-full"></span>
    </span>

  </span>
</a>
          </div>

          {/* RIGHT SIDE (SOCIALS) */}
          <div className="flex gap-4">

            <a
              href="https://www.facebook.com/share/14YRGPq14DK/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white hover:scale-110 transition"
            >
              <FaFacebookF size={14} />
            </a>

            <a
              href="https://www.instagram.com/complywithca"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:scale-110 transition"
            >
              <FaInstagram size={14} />
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}