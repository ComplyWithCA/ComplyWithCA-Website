import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { ChevronDown, ChevronRight } from "lucide-react"; // Changed ChevronRight to ChevronDown for desktop
import logo from "../assets/image15.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // State to handle the mobile dropdown toggle
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Your Service Routes
  const serviceLinks = [
    { name: "GST Services", path: "/services/gst-services" },
    { name: "Business Registration", path: "/services/business-registration" },
    { name: "Income Tax Filing", path: "/services/income-tax-filing" },
    { name: "Certificates & Registrations", path: "/services/certificates" },
    { name: "Book Consultancy", path: "/services/book-consultancy" },
    { name: "Firm Registration", path: "/services/firm-registration" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;
  // Check if any service sub-route is active
  const isServiceActive = location.pathname.startsWith("/services");

  return (
    <header
      className={`fixed top-0 w-full z-[999] transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-md border-b border-slate-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="ComplyWithCA Logo"
              className="h-[150px] ml-[-20px] sm:h-[180px] sm:ml-[-30px] md:h-[210px] md:ml-[-35px] lg:h-[320px] lg:ml-[-90px] xl:h-[350px] xl:ml-[-120px] w-auto object-contain mt-7 mb-2"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2 text-sm font-medium">
            <button
              onClick={() => navigate("/")}
              className={`px-4 py-2 rounded-lg transition ${
                isActive("/") ? "text-blue-600 font-semibold" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => navigate("/about")}
              className={`px-4 py-2 rounded-lg transition ${
                isActive("/about") ? "text-blue-600 font-semibold" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              About
            </button>

            {/* Desktop Services Dropdown */}
            <div className="relative group">
              <button
                onClick={() => navigate("/services")}
                className={`px-4 py-2 rounded-lg flex items-center gap-1 transition ${
                  isServiceActive ? "text-blue-600 font-semibold" : "text-slate-700 hover:text-blue-600"
                }`}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform group-hover:rotate-180`} />
              </button>

              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden py-2">
                  {serviceLinks.map((service) => (
                    <button
                      key={service.path}
                      onClick={() => navigate(service.path)}
                      className={`w-full text-left px-5 py-2.5 hover:bg-blue-50 hover:text-blue-600 transition ${
                        isActive(service.path) ? "text-blue-600 bg-blue-50/50" : "text-slate-600"
                      }`}
                    >
                      {service.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/contact")}
              className={`px-4 py-2 rounded-lg transition ${
                isActive("/contact") ? "text-blue-600 font-semibold" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Contact
            </button>

            <button
              onClick={() => navigate("/services/book-consultancy")}
              className="ml-3 bg-slate-900 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-blue-500/20"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-slate-900 text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white shadow-md transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[100vh] py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 text-sm">
          <button
            onClick={() => { setIsOpen(false); navigate("/"); }}
            className={`py-2 text-left ${isActive("/") ? "text-blue-600 font-semibold" : "text-slate-700"}`}
          >
            Home
          </button>

          <button
            onClick={() => { setIsOpen(false); navigate("/about"); }}
            className={`py-2 text-left ${isActive("/about") ? "text-blue-600 font-semibold" : "text-slate-700"}`}
          >
            About
          </button>

          {/* Mobile Services Accordion */}
          <div>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className={`w-full py-2 flex items-center justify-between text-left ${
                isServiceActive ? "text-blue-600 font-semibold" : "text-slate-700"
              }`}
            >
              Services
              <ChevronRight className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-90" : ""}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 flex flex-col pl-4 border-l border-slate-100 ${
              mobileServicesOpen ? "max-h-96 py-2 gap-2" : "max-h-0"
            }`}>
              {serviceLinks.map((service) => (
                <button
                  key={service.path}
                  onClick={() => { setIsOpen(false); navigate(service.path); }}
                  className={`py-1.5 text-left ${isActive(service.path) ? "text-blue-600 font-medium" : "text-slate-500"}`}
                >
                  {service.name}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setIsOpen(false); navigate("/contact"); }}
            className={`py-2 text-left ${isActive("/contact") ? "text-blue-600 font-semibold" : "text-slate-700"}`}
          >
            Contact
          </button>

          <button
            onClick={() => { setIsOpen(false); navigate("/services/book-consultancy"); }}
            className="mt-3 bg-slate-900 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold text-center"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}