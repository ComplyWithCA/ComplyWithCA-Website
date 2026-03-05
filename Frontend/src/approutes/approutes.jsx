import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Contact from "../pages/contact";

// Lazy Imports
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About.jsx"));
const ServicesPage = lazy(() => import("../pages/Services"));
const BusinessRegistration = lazy(() => import("../pages/Businessreg"));
const GstServices = lazy(() => import("../pages/gstservices"));
const IncomeTaxFiling = lazy(() => import("../pages/incometax"));
const CertificatesAndRegistrations = lazy(() => import("../pages/certificates"));
const BookConsultancy = lazy(() => import("../pages/bookconsultancy"));
const FirmRegistration = lazy(() => import("../pages/firmregiseteration"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/gst-services" element={<GstServices />} />
        <Route path="/services/business-registration" element={<BusinessRegistration />} />
        <Route path="/services/income-tax-filing" element={<IncomeTaxFiling />} />
        <Route path="/services/certificates" element={<CertificatesAndRegistrations />} />
        <Route path="/services/book-consultancy" element={<BookConsultancy />} />
        <Route path="/services/firm-registration" element={<FirmRegistration />} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;