import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#fafcff] border-t border-slate-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-16">

          {/* Company Info */}
          <div className="lg:col-span-2 flex flex-col justify-start">

            {/* Logo */}
            <div
              onClick={() => navigate("/")}
              className="cursor-pointer mb-8"
            >
              <img
                src={logo}
                alt="ComplyWithCA Logo"
                className="w-full max-w-[280px] h-auto"
              />
            </div>

            {/* Description */}
            <p className="text-slate-500 text-base leading-relaxed max-w-lg font-medium">
  We provide professional compliance and business advisory services for startups and enterprises in Delhi NCR. We are not a chartered accountancy firm, and all certification-related services are handled through qualified professionals where applicable.
            </p>

          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-lg">
              Services
            </h4>
            <ul className="space-y-4 text-sm font-semibold text-slate-500">
              <li>
                <Link
                  to="/services/income-tax-filing"
                  className="hover:text-blue-600 transition-colors"
                >
                  Income Tax Filing
                </Link>
              </li>
              <li>
                <Link
                  to="/services/business-registration"
                  className="hover:text-blue-600 transition-colors"
                >
                  Business Registration
                </Link>
              </li>
              <li>
                <Link
                  to="/services/certificates"
                  className="hover:text-blue-600 transition-colors"
                >
                  Certificates
                </Link>
              </li>
              <li>
                <Link
                  to="/services/book-consultancy"
                  className="hover:text-blue-600 transition-colors"
                >
                  Book Consultancy
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-lg">
              Company
            </h4>
            <ul className="space-y-4 text-sm font-semibold text-slate-500">
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-slate-900 mb-6 text-lg">
              Contact
            </h4>
            <ul className="space-y-4 text-sm font-semibold text-slate-500">

              <li>
                <a
                  href="mailto:info@complywithca.com"
                  className="flex items-center gap-3 hover:text-blue-600 transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-400" />
                  info@complywithca.com
                </a>
              </li>

              <li>
                <a
                  href="tel:+919311702025"
                  className="flex items-center gap-3 hover:text-blue-600 transition-colors"
                >
                  <Phone className="w-4 h-4 text-slate-400" />
                  +91 93117 02025
                </a>
              </li>

            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between text-sm font-semibold text-slate-400">

          <p className="text-center md:text-left">
            © {new Date().getFullYear()} ComplyWithCA. Designed for modern enterprises.
          </p>

          <div className="flex gap-4 mt-6 md:mt-0">

            <a
              href="https://www.facebook.com/share/14YRGPq14DK/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all"
            >
              <FaFacebookF size={16} />
            </a>

            <a
              href="https://www.instagram.com/complywithca?igsh=MTU1dWd2NWQxYnVueA=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 hover:text-white hover:border-transparent transition-all"
            >
              <FaInstagram size={16} />
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}