import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import MyBookingsPage from './pages/MyBookingsPage';
import TrackOrderPage from './pages/TrackOrderPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [toast, setToast] = useState(null);

  const showToast = ({ type = 'info', title, message }) => {
    setToast({ type, title, message });
    setTimeout(() => {
      setToast((current) => (current && current.message === message ? null : current));
    }, 4500);
  };

  const closeToast = () => setToast(null);

  return (
    <BrowserRouter>
      <AuthProvider>
        <BookingProvider>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-stone-50 text-slate-800 antialiased selection:bg-emerald-800 selection:text-amber-200">
            {/* Global Sticky Navigation */}
            <Navbar />

            {/* Main Application Route Content */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/book" element={<BookingPage onToast={showToast} />} />
                <Route path="/my-bookings" element={<MyBookingsPage onToast={showToast} />} />
                <Route path="/track" element={<TrackOrderPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage onToast={showToast} />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Interactive Auth Modal (Login / Sign Up) */}
            <AuthModal onToast={showToast} />

            {/* Toast Feedback Notification */}
            <Toast toast={toast} onClose={closeToast} />
          </div>
        </BookingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
