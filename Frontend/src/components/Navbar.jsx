import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Scroll Background Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active Check Function
  const isActive = (path) => location.pathname === path;

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
            onClick={() => navigate("/")}
          >
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
              CA
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              ComplyWith<span className="text-blue-600">CA</span>
            </span>
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

            <button
              onClick={() => navigate("/services")}
              className={`px-4 py-2 rounded-lg flex items-center gap-1 transition ${
                isActive("/services") ? "text-blue-600 font-semibold" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Services
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* <button
              onClick={() => navigate("/pricing")}
              className={`px-4 py-2 rounded-lg transition ${
                isActive("/pricing") ? "text-blue-600 font-semibold" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Pricing
            </button> */} 

            <button
              onClick={() => navigate("/contact")}
              className={`px-4 py-2 rounded-lg transition ${
                isActive("/contact") ? "text-blue-600 font-semibold" : "text-slate-700 hover:text-blue-600"
              }`}
            >
              Contact
            </button>

            {/* CTA */}
            <button
              onClick={() => navigate("/services")}
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
          isOpen ? "max-h-screen py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-2 px-6 text-sm">

          <button
            onClick={() => { setIsOpen(false); navigate("/"); }}
            className={`py-2 text-left ${
              isActive("/") ? "text-blue-600 font-semibold" : "text-slate-700"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => { setIsOpen(false); navigate("/about"); }}
            className={`py-2 text-left ${
              isActive("/about") ? "text-blue-600 font-semibold" : "text-slate-700"
            }`}
          >
            About
          </button>

          <button
            onClick={() => { setIsOpen(false); navigate("/services"); }}
            className={`py-2 text-left ${
              isActive("/services") ? "text-blue-600 font-semibold" : "text-slate-700"
            }`}
          >
            Services
          </button>

          {/* <button
            onClick={() => { setIsOpen(false); navigate("/pricing"); }}
            className={`py-2 text-left ${
              isActive("/pricing") ? "text-blue-600 font-semibold" : "text-slate-700"
            }`}
          >
            Pricing
          </button> */}

          <button
            onClick={() => { setIsOpen(false); navigate("/contact"); }}
            className={`py-2 text-left ${
              isActive("/contact") ? "text-blue-600 font-semibold" : "text-slate-700"
            }`}
          >
            Contact
          </button>

          <button
            onClick={() => { setIsOpen(false); navigate("/services"); }}
            className="mt-3 bg-slate-900 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Get Started
          </button>

        </div>
      </div>
    </header>
  );
}