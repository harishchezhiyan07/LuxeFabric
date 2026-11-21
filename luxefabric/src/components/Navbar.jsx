import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import {
  Sparkles,
  User,
  LogOut,
  Calendar,
  Menu,
  X,
  Search,
  Clock,
  Shirt,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const { bookings } = useBookings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();

  const activeBookingsCount = bookings.filter(
    (b) => b.status !== 'Delivered' && b.status !== 'Cancelled'
  ).length;

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Schedule Pickup', path: '/book' },
    {
      label: 'My Bookings',
      path: '/my-bookings',
      badge: activeBookingsCount > 0 ? activeBookingsCount : null
    },
    { label: 'Track Order', path: '/track' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      {/* Top micro banner */}
      <div className="bg-emerald-950 text-emerald-200 text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center tracking-wide">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Complimentary Doorstep Pickup & Return on Orders over \$30</span>
            </span>
            <span className="text-emerald-500">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Express 12-Hour Turnaround Available</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-emerald-300">
            <Link to="/track" className="hover:text-white transition-colors flex items-center gap-1">
              <Search className="w-3 h-3" />
              <span>Quick Tracker</span>
            </Link>
            <span>•</span>
            <span className="text-emerald-400 font-medium">Concierge: (800) LUXE-CARE</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-900 to-emerald-700 flex items-center justify-center text-amber-300 shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              <Shirt className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tight text-emerald-950 flex items-center gap-1">
                LuxeFabric<span className="text-amber-500 font-serif">.</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700/80 -mt-1">
                Artisanal Garment Care
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'text-emerald-900 bg-emerald-50/80 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-emerald-900 hover:bg-stone-100/70'
                }`}
              >
                {link.label}
                {link.badge && (
                  <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-white bg-amber-500 rounded-full">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* User Auth Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200/80 border border-stone-200 text-slate-800 text-xs font-semibold transition"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center text-xs uppercase font-bold shadow-xs">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <span className="block text-[11px] text-slate-500 font-normal leading-tight">
                      Client
                    </span>
                    <span className="block max-w-[100px] truncate leading-tight font-medium">
                      {user.name}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs text-slate-500">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>

                    <Link
                      to="/my-bookings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-stone-50"
                    >
                      <Calendar className="w-4 h-4 text-emerald-700" />
                      <span>My Laundry Bookings ({bookings.length})</span>
                    </Link>

                    <Link
                      to="/track"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-stone-50"
                    >
                      <Search className="w-4 h-4 text-emerald-700" />
                      <span>Track Active Orders</span>
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 text-left border-t border-stone-100"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="loginBtn"
                onClick={() => openAuthModal('login')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:border-emerald-700 text-slate-800 hover:text-emerald-900 text-xs font-semibold transition"
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>Client Login</span>
              </button>
            )}

            {/* Book Now Button */}
            <Link
              to="/book"
              className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-semibold text-xs uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>Book Pickup</span>
              <Sparkles className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                isActive(link.path)
                  ? 'bg-emerald-50 text-emerald-900 font-semibold'
                  : 'text-slate-700 hover:bg-stone-50'
              }`}
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="px-2 py-0.5 text-xs font-bold text-white bg-amber-500 rounded-full">
                  {link.badge} active
                </span>
              )}
            </Link>
          ))}

          <div className="pt-4 border-t border-stone-200 space-y-3">
            {isAuthenticated ? (
              <div className="p-3 bg-stone-50 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Welcome,</p>
                  <p className="text-sm font-bold text-slate-900">{user.name}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 text-xs text-rose-600 border border-rose-200 rounded-lg bg-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-800 text-sm font-semibold text-center"
              >
                Client Login / Register
              </button>
            )}

            <Link
              to="/book"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block py-3 bg-emerald-900 text-amber-300 text-center font-bold text-sm uppercase tracking-wider rounded-xl shadow"
            >
              Book Doorstep Pickup Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
