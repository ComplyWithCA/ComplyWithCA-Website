import React, { useState, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Scroll Background Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth Scroll Function
  const scrollToSection = (id) => {
    setIsOpen(false);

    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 300);
    } else {
      scroll();
    }
  };

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
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
              CA
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              ComplyWith<span className="text-blue-600">CA</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2 text-sm font-medium text-slate-700">

            <button onClick={() => navigate("/")} className="px-4 py-2 rounded-lg hover:text-blue-600 transition">
              Home
            </button>

            <button onClick={() => navigate('/about')} className="px-4 py-2 rounded-lg hover:text-blue-600 transition">
              About
            </button>

            {/* Services Dropdown */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg flex items-center gap-1 hover:text-blue-600 transition">
                Services
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
              </button>

              <div className="absolute left-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[220px]">
                <button onClick={() => scrollToSection("services")} className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50">
                  GST Services
                </button>
                <button onClick={() => scrollToSection("services")} className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50">
                  Business Registration
                </button>
                <button onClick={() => scrollToSection("services")} className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50">
                  Income Tax Filing
                </button>
              </div>
            </div>

            <button onClick={() => scrollToSection("pricing")} className="px-4 py-2 rounded-lg hover:text-blue-600 transition">
              Pricing
            </button>

            <button onClick={() => scrollToSection("contact")} className="px-4 py-2 rounded-lg hover:text-blue-600 transition">
              Contact
            </button>

            {/* CTA */}
            <button className="ml-3 bg-slate-900 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-blue-500/20">
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
          isOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-2 px-6 text-slate-700 text-sm">

          <button onClick={() => scrollToSection("home")} className="py-2 text-left hover:text-blue-600">
            Home
          </button>

          <button onClick={() => scrollToSection("about")} className="py-2 text-left hover:text-blue-600">
            About
          </button>

          <button onClick={() => scrollToSection("services")} className="py-2 text-left hover:text-blue-600">
            Services
          </button>

          <button onClick={() => scrollToSection("pricing")} className="py-2 text-left hover:text-blue-600">
            Pricing
          </button>

          <button onClick={() => scrollToSection("contact")} className="py-2 text-left hover:text-blue-600">
            Contact
          </button>

          <button className="mt-3 bg-slate-900 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}