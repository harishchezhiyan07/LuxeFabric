import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroSlider from '../components/HeroSlider';
import ServiceCard from '../components/ServiceCard';
import PriceEstimator from '../components/PriceEstimator';
import { SERVICES, TESTIMONIALS, FAQS } from '../data/servicesData';
import {
  Sparkles,
  Truck,
  Leaf,
  Star,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  Calendar
} from 'lucide-react';

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState(0);

  const stats = [
    { value: '45,000+', label: 'Garments Restored' },
    { value: '99.8%', label: 'On-Time Doorstep Delivery' },
    { value: '100%', label: 'Non-Toxic Eco Solvents' },
    { value: '4.9 ★', label: 'Over 2,400 Client Reviews' }
  ];

  const steps = [
    {
      step: '01',
      title: 'Schedule in Seconds',
      description: 'Select your preferred laundry or dry-cleaning services and select a convenient 2-hour doorstep pickup slot.',
      icon: <Calendar className="w-6 h-6 text-emerald-800" />
    },
    {
      step: '02',
      title: 'Concierge Pickup',
      description: 'Our uniformed concierge collects your garments in custom reusable fabric hampers right from your door.',
      icon: <Truck className="w-6 h-6 text-emerald-800" />
    },
    {
      step: '03',
      title: 'Artisan Cleaning & Press',
      description: 'Master cleaners examine fabric fibers, pretreat spots, and gently steam press each item to perfection.',
      icon: <Sparkles className="w-6 h-6 text-emerald-800" />
    },
    {
      step: '04',
      title: 'Fresh Doorstep Return',
      description: 'Your closet-ready garments arrive crisply hung, protected in breathable covers, ready to wear.',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-800" />
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section with Interactive Slider */}
      <section className="px-4 sm:px-6 lg:px-8 pt-4">
        <HeroSlider />
      </section>

      {/* Floating Trust Metrics Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-100">
          {stats.map((stat, i) => (
            <div key={i} className="pt-4 md:pt-0">
              <span className="block font-display text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-950">
                {stat.value}
              </span>
              <span className="block text-xs sm:text-sm text-slate-500 font-medium mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-12 bg-gradient-to-br from-emerald-50 via-stone-50 to-amber-50/40 rounded-3xl mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              Fabric-First Philosophy
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-950">
              Our Signature Services
            </h2>
            <p className="text-emerald-900/75 mt-3 text-sm sm:text-base leading-relaxed">
              Every textile tells a story. From delicate silk gowns to everyday linens, we provide specialized care calibrated to every individual fiber.
            </p>
          </div>

          {/* Alternating Split Cards Grid */}
          <div className="space-y-8">
            {SERVICES.slice(0, 4).map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                layout="split"
                reverse={index % 2 === 1}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-950 text-amber-300 font-bold text-sm uppercase tracking-wider shadow-xl hover:bg-emerald-900 transition-all hover:gap-3"
            >
              <span>Explore All 6 Artisanal Care Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works 4-Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-600 block mb-2">
            Seamless Experience
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            How LuxeFabric Works
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Premium laundry and garment revitalization without ever leaving your home.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {st.icon}
                  </div>
                  <span className="font-display text-3xl font-bold text-stone-300 group-hover:text-emerald-300 transition-colors">
                    {st.step}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  {st.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {st.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero hassle guarantee</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Interactive Price Estimator Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <PriceEstimator />
      </section>

      {/* Client Testimonials */}
      <section className="bg-stone-100 py-16 px-4 sm:px-6 lg:px-8 rounded-3xl max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-emerald-800 block mb-2">
            Client Accolades
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            Trusted by Connoisseurs & Designers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-stone-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-emerald-800"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{t.name}</h4>
                  <p className="text-xs text-slate-500">{t.role}</p>
                  <p className="text-[11px] text-emerald-700">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Everything you need to know about our eco solvents, turnarounds, and doorstep pickup.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                className="w-full p-5 text-left flex items-center justify-between font-semibold text-sm sm:text-base text-slate-900 hover:text-emerald-800 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                    activeFaq === index ? 'rotate-180 text-emerald-700' : ''
                  }`}
                />
              </button>
              {activeFaq === index && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-stone-100 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Final Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block mb-2">
              Ready for the Ultimate Clean?
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
              Schedule Your Complimentary Doorstep Pickup Today
            </h2>
            <p className="text-emerald-100/80 text-sm sm:text-base mb-8 max-w-lg leading-relaxed">
              Experience the difference of non-toxic botanical solvents, optical weight transparency, and crisp hand finishing.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/book"
                className="px-8 py-4 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-slate-950 font-bold text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/20 transition-all"
              >
                Book Doorstep Pickup Now
              </Link>
              <Link
                to="/contact"
                className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-2xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Speak with a Concierge</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
