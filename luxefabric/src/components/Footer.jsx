import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shirt, Mail, Phone, MapPin, Sparkles, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

const CURRENT_YEAR = 2026;

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-950 text-stone-300 pt-16 pb-12 border-t border-slate-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-800/80 mb-12">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">100% Eco-Hydrocarbon</h4>
              <p className="text-xs text-slate-400">Zero harsh chemicals, safe for baby & fine silk fibers.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Garment Care Guarantee</h4>
              <p className="text-xs text-slate-400">Total peace of mind with our \$5,000 couture care warranty.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-teal-950 text-teal-400 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Doorstep Concierge</h4>
              <p className="text-xs text-slate-400">Flexible 2-hour pickup windows directly from your doorstep.</p>
            </div>
          </div>
        </div>

        {/* 4 Column Main Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-300">
                <Shirt className="w-6 h-6" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                LuxeFabric<span className="text-amber-400">.</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Artisanal garment care, dry cleaning, and fabric rejuvenation. Engineered for connoisseurs of couture, bespoke tailoring, and luxury textiles.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>450 Lexington Ave, Suites 14-16, New York, NY 10017</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Concierge hotline: (800) 589-3227</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>care@luxefabric.com</span>
              </p>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
              Care Services
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/services" className="hover:text-amber-300 transition-colors">Artisan Dry Cleaning</Link></li>
              <li><Link to="/services" className="hover:text-amber-300 transition-colors">Steam Pressing & Ironing</Link></li>
              <li><Link to="/services" className="hover:text-amber-300 transition-colors">Everyday Wash & Fold</Link></li>
              <li><Link to="/services" className="hover:text-amber-300 transition-colors">Curtain & Drapery Care</Link></li>
              <li><Link to="/services" className="hover:text-amber-300 transition-colors">Duvet & Blanket Wash</Link></li>
              <li><Link to="/services" className="hover:text-amber-300 transition-colors">Sneaker & Shoe Restoration</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
              Client Portal
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/book" className="hover:text-amber-300 transition-colors">Schedule New Pickup</Link></li>
              <li><Link to="/my-bookings" className="hover:text-amber-300 transition-colors">My Booking History</Link></li>
              <li><Link to="/track" className="hover:text-amber-300 transition-colors">Live Order Tracker</Link></li>
              <li><Link to="/about" className="hover:text-amber-300 transition-colors">Our Eco Philosophy</Link></li>
              <li><Link to="/contact" className="hover:text-amber-300 transition-colors">Customer Concierge</Link></li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div>
            <h5 className="font-semibold text-white text-xs uppercase tracking-wider mb-4">
              Fabric Journal
            </h5>
            <p className="text-xs text-slate-400 mb-3">
              Receive seasonal fabric maintenance tips & exclusive VIP privileges.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                required
              />
              <button
                type="submit"
                className="w-full py-2 px-3 bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-colors"
              >
                Join Newsletter
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-400 flex items-center gap-1 mt-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> Subscribed successfully!
              </p>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {CURRENT_YEAR} LuxeFabric Garment Care Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Couture Warranty</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
