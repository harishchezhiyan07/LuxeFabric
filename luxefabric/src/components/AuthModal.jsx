import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Sparkles, Mail, Lock, User, Phone, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AuthModal({ onToast }) {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, login, signup, loading } = useAuth();
  const [emailOrName, setEmailOrName] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const modalRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  const handleSwitchMode = (mode) => {
    setErrorMessage('');
    setSuccessMessage('');
    setAuthMode(mode);
  };

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (authMode === 'login') {
        if (!emailOrName.trim() || !password.trim()) {
          setErrorMessage('Please fill in all required login fields.');
          return;
        }
        await login(emailOrName, password);
        setSuccessMessage('Welcome back! You are now logged in.');
        if (onToast) onToast({ type: 'success', title: 'Login Successful', message: `Welcome back, ${emailOrName}!` });
      } else {
        if (!name.trim() || !emailOrName.trim() || !password.trim()) {
          setErrorMessage('Please fill in your name, email, and password.');
          return;
        }
        await signup({
          name: name.trim(),
          email: emailOrName.trim(),
          password,
          phone,
          address
        });
        setSuccessMessage('Your LuxeFabric account has been created!');
        if (onToast) onToast({ type: 'success', title: 'Account Created', message: `Welcome to LuxeFabric, ${name}!` });
      }
    } catch (err) {
      setErrorMessage(err.message || 'Authentication error. Please check your details.');
    }
  };

  const handleQuickDemoFill = () => {
    setEmailOrName('Alexander Wright');
    setPassword('secret123');
    setName('Alexander Wright');
    setPhone('+1 (555) 789-1029');
    setAddress('840 Fifth Avenue, Suite 12B, New York');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div
        ref={modalRef}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-stone-200 transition-all duration-300"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 p-6 text-white relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 text-emerald-300/80 hover:text-white p-1 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-lg bg-emerald-700/80 flex items-center justify-center text-emerald-200">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase tracking-widest text-emerald-300 font-semibold">
              LuxeFabric Concierge
            </span>
          </div>

          <h3 className="font-display text-2xl font-bold tracking-tight">
            {authMode === 'login' ? 'Client Access' : 'Join LuxeFabric'}
          </h3>
          <p className="text-emerald-100/80 text-xs mt-1">
            {authMode === 'login'
              ? 'Access scheduled pickups, garment care history, and VIP perks.'
              : 'Create an account to book doorstep garment & textile care.'}
          </p>

          {/* Tab Selector */}
          <div className="flex bg-emerald-950/60 p-1 rounded-xl mt-4 border border-emerald-800/60">
            <button
              type="button"
              onClick={() => handleSwitchMode('login')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                authMode === 'login'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleSwitchMode('signup')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                authMode === 'signup'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-200 hover:text-white'
              }`}
            >
              New Client
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              {successMessage}
            </div>
          )}

          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              {authMode === 'login' ? 'Username or Email' : 'Email Address'}{' '}
              <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type={authMode === 'login' ? 'text' : 'email'}
                value={emailOrName}
                onChange={(e) => setEmailOrName(e.target.value)}
                placeholder={authMode === 'login' ? 'Enter username or email' : 'client@domain.com'}
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Password <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>
          </div>

          {authMode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Default Pickup Address
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, Suite or Apartment"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] text-white text-sm font-semibold rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing Secure Login...</span>
              </>
            ) : (
              <>
                <span>{authMode === 'login' ? 'Sign In to Account' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Quick Demo Fill Helper */}
          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
            <span>Testing the interface?</span>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-emerald-700 font-medium hover:underline hover:text-emerald-900"
            >
              Fill Demo Credentials
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
