import React, { useState } from 'react';
import { Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage({ onToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Concierge Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onToast) {
        onToast({
          type: 'success',
          title: 'Inquiry Sent',
          message: 'Our concierge desk will respond within 2 business hours.'
        });
      }
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-bold text-emerald-800 block mb-1">
          Concierge Support
        </span>
        <h1 className="font-display text-4xl font-bold text-slate-900">
          We Are Here to Assist You
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          Questions regarding specialized vintage garment restoration, bespoke alterations, or recurring corporate pickups?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Concierge Phone</h3>
            <p className="text-xs text-slate-500">Toll Free: (800) LUXE-CARE / (800) 589-3227</p>
            <p className="text-xs text-slate-500">Local NYC: +1 (212) 555-0199</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Direct Email</h3>
            <p className="text-xs text-slate-500">care@luxefabric.com</p>
            <p className="text-xs text-slate-500">concierge@luxefabric.com</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Operating Hours</h3>
            <p className="text-xs text-slate-500">Monday - Friday: 07:00 AM – 09:00 PM</p>
            <p className="text-xs text-slate-500">Saturday - Sunday: 08:00 AM – 06:00 PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900">Message Received</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
                Thank you for reaching out, {formData.name}. Our master garment care director will contact you promptly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option>General Concierge Inquiry</option>
                    <option>Vintage & Wedding Gown Restoration</option>
                    <option>Commercial / Corporate Volume Pickup</option>
                    <option>Special Fabric Stain Consultation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can our garment specialists assist you today?"
                  className="w-full p-3 text-xs sm:text-sm bg-stone-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-emerald-950 hover:bg-emerald-900 active:scale-[0.99] text-amber-300 font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry to Concierge Desk</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
