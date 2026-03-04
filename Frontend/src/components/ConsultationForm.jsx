import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Send, Lock, ChevronDown } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ConsultationForm({ defaultService = "" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: defaultService,
    business: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        "service_ghj2doe",
        "template_uwkmjxr",
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          service: formData.service,
          business: formData.business,
          message: formData.message,
        },
        "KJ9IR47xK9gNAOEYd"
      )
      .then(
        () => {
          setIsSubmitting(false);
          setIsSubmitted(true);

          setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              service: defaultService,
              business: "",
              message: "",
            });
          }, 4000);
        },
        () => {
          setIsSubmitting(false);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="relative">
      <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl relative">

        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center rounded-3xl text-center"
            >
              <CheckCircle2 size={50} className="text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-slate-900">
                Request Sent Successfully!
              </h3>
              <p className="text-slate-500 mt-2">
                Our CA team will contact you shortly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            name="name"
            required
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="email"
            name="email"
            required
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <input
            type="tel"
            name="phone"
            required
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="relative">
            <select
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl border border-slate-200 appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select Service</option>
              <option value="Book Consultancy">Book Consultancy</option>
              <option value="GST Registration">GST Registration</option>
              <option value="Income Tax Filing">Income Tax Filing</option>
              <option value="Company Registration">Company Registration</option>
              <option value="Other">Other</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          </div>

          <input
            type="text"
            name="business"
            placeholder="Business Type"
            value={formData.business}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <textarea
            name="message"
            rows="4"
            placeholder="Describe your requirement"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
          >
            {isSubmitting ? "Submitting..." : "Submit Consultation Request"}
            {!isSubmitting && <Send size={18} />}
          </button>

          <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1">
            <Lock size={12} /> 256-bit Secure & Encrypted
          </p>

        </form>
      </div>
    </div>
  );
}