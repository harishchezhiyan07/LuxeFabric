import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { SERVICES } from '../data/servicesData';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  Zap,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function BookingPage({ onToast }) {
  const location = useLocation();
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const { addBooking } = useBookings();

  const passedState = location.state || {};

  // Form states initialized with user/passed values
  const [customerName, setCustomerName] = useState(
    () => passedState.customer || (user ? user.name : '')
  );
  const [phone, setPhone] = useState(
    () => passedState.phone || (user ? user.phone : '')
  );
  const [email, setEmail] = useState(
    () => passedState.email || (user ? user.email : '')
  );
  const [address, setAddress] = useState(
    () => passedState.address || (user ? user.address : '')
  );

  const [selectedServiceId, setSelectedServiceId] = useState(
    passedState.serviceId || 'dry-cleaning'
  );
  const [quantity, setQuantity] = useState(
    passedState.quantity || 3
  );

  const [pickupDate, setPickupDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [pickupTime, setPickupTime] = useState('09:00 AM - 11:00 AM');
  const [express, setExpress] = useState(!!passedState.isExpress);
  const [instruction, setInstruction] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const currentService =
    SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const basePrice = currentService.pricePerKg * quantity;
  const expressFee = express ? Math.round(basePrice * 0.3 * 10) / 10 : 0;
  const totalPrice = (basePrice + expressFee).toFixed(2);

  const handleApplyUserValues = () => {
    if (user) {
      if (user.name) setCustomerName(user.name);
      if (user.phone) setPhone(user.phone);
      if (user.email) setEmail(user.email);
      if (user.address) setAddress(user.address);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please provide a contact phone number for the driver.');
      return;
    }
    if (!address.trim()) {
      setErrorMessage('Please provide your pickup address.');
      return;
    }
    if (!pickupDate) {
      setErrorMessage('Please select a pickup date.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking = addBooking({
        customer: customerName.trim(),
        phone: phone.trim(),
        email: email.trim() || `${customerName.toLowerCase().replace(/\s+/g, '')}@client.luxefabric.com`,
        address: address.trim(),
        service: currentService.name,
        quantity: Number(quantity),
        unit: currentService.unitLabel,
        pricePerUnit: currentService.pricePerKg,
        estimatedTotal: parseFloat(totalPrice),
        pickupDate,
        pickupTime,
        express,
        instruction: instruction.trim()
      });

      setIsSubmitting(false);
      setConfirmedOrder(newBooking);

      if (onToast) {
        onToast({
          type: 'success',
          title: 'Booking Confirmed!',
          message: `Order #${newBooking.id} scheduled for pickup on ${pickupDate}.`
        });
      }
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Doorstep Concierge Booking
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
          Schedule Doorstep Garment Care
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          Complimentary pickup & delivery. Eco-certified non-toxic solvents. Guaranteed care.
        </p>

        {!isAuthenticated ? (
          <div className="mt-4 p-3 bg-stone-100 rounded-2xl inline-flex items-center gap-3 text-xs text-slate-700">
            <span>Already a client?</span>
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              className="text-emerald-800 font-bold hover:underline"
            >
              Sign in to auto-fill address & history
            </button>
          </div>
        ) : (
          <div className="mt-4 p-2.5 bg-emerald-50 rounded-2xl inline-flex items-center gap-2 text-xs text-emerald-900">
            <span>Signed in as <strong>{user.name}</strong>.</span>
            <button
              type="button"
              onClick={handleApplyUserValues}
              className="text-emerald-700 font-bold underline hover:text-emerald-900"
            >
              Re-apply profile details
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 text-center border border-stone-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs uppercase font-bold tracking-widest text-emerald-800">
              Booking Confirmed
            </span>
            <h3 className="font-display text-2xl font-bold text-slate-900 mt-1 mb-2">
              We'll See You Soon!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Your garments have been scheduled for pickup. A concierge driver will arrive during your selected window.
            </p>

            <div className="bg-stone-50 rounded-2xl p-4 text-left space-y-2 mb-6 border border-stone-200 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Tracking Reference:</span>
                <span className="font-mono font-bold text-emerald-900 text-sm">
                  {confirmedOrder.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-semibold text-slate-900">{confirmedOrder.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup Date:</span>
                <span className="font-semibold text-slate-900">{confirmedOrder.pickupDate} ({confirmedOrder.pickupTime})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Address:</span>
                <span className="font-semibold text-slate-900 truncate max-w-[200px]">{confirmedOrder.address}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200">
                <span className="text-slate-700 font-bold">Estimated Cost:</span>
                <span className="font-display font-bold text-emerald-950 text-base">
                  \${confirmedOrder.estimatedTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={`/track?id=${confirmedOrder.id}`}
                className="flex-1 py-3 bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Track Live Order
              </Link>
              <Link
                to="/my-bookings"
                className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-slate-800 font-semibold text-xs rounded-xl transition-all"
              >
                View in My Bookings
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Booking Form Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Form Inputs */}
        <div className="lg:col-span-2 space-y-8">
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-medium flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Service Selection */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Select Care Service & Volume
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Service Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SERVICES.map((serv) => (
                  <button
                    key={serv.id}
                    type="button"
                    onClick={() => {
                      setSelectedServiceId(serv.id);
                      setQuantity(serv.defaultQty || 2);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      selectedServiceId === serv.id
                        ? 'border-emerald-800 bg-emerald-50/70 shadow-sm'
                        : 'border-slate-200 bg-stone-50 hover:bg-stone-100/70'
                    }`}
                  >
                    <span className="block font-bold text-xs text-slate-900 truncate">
                      {serv.name}
                    </span>
                    <span className="block text-[11px] text-emerald-800 font-semibold mt-0.5">
                      \${serv.pricePerKg.toFixed(2)} / {serv.priceUnit}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Slider */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Approximate Quantity or Weight:
                </label>
                <span className="font-display text-base font-bold text-emerald-950">
                  {quantity} {currentService.unitLabel}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-800"
                />
                <span className="text-xs text-slate-500 w-16 text-right">
                  {quantity} {currentService.unitLabel}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                * We will weigh and inspect all pieces upon arrival at our facility to verify exact weight.
              </p>
            </div>
          </div>

          {/* Section 2: Pickup Scheduling */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Doorstep Pickup Window
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Pickup Date <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Convenient Time Window <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option>09:00 AM - 11:00 AM (Morning)</option>
                    <option>01:00 PM - 03:00 PM (Afternoon)</option>
                    <option>05:00 PM - 07:00 PM (Evening)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Express Rush Option */}
            <label
              className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                express
                  ? 'border-amber-400 bg-amber-50/70 text-amber-950'
                  : 'border-slate-200 bg-stone-50 text-slate-700 hover:bg-stone-100/70'
              }`}
            >
              <input
                type="checkbox"
                checked={express}
                onChange={(e) => setExpress(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
              />
              <div className="text-xs">
                <span className="font-bold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-600" />
                  Request Express 12-Hour Priority Turnaround (+30%)
                </span>
                <span className="text-slate-500 block text-[11px] mt-0.5">
                  Same-day rush processing with dedicated garment concierge.
                </span>
              </div>
            </label>
          </div>

          {/* Section 3: Contact & Address */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-stone-100">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Contact & Pickup Address
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Customer Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    id="customer"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full name"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address (for Receipt & Status)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@domain.com"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Doorstep Pickup Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, Apt / Suite number"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Special Fabric or Stain Instructions
              </label>
              <textarea
                id="instruction"
                rows="2"
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                placeholder="e.g., Silk shirt with red wine spot on cuff; light starch only."
                className="w-full p-3 text-xs sm:text-sm bg-stone-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Col: Summary & Confirmation Trigger */}
        <div className="space-y-6">
          <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-emerald-900 sticky top-28">
            <h3 className="font-display text-xl font-bold mb-4 pb-3 border-b border-emerald-800 text-amber-300">
              Booking Summary
            </h3>

            <div className="space-y-3 text-xs text-emerald-100 mb-6">
              <div className="flex justify-between">
                <span>Selected Service:</span>
                <span className="font-bold text-white text-right">{currentService.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity / Weight:</span>
                <span className="font-bold text-white">{quantity} {currentService.unitLabel}</span>
              </div>
              <div className="flex justify-between">
                <span>Base Rate:</span>
                <span>\${currentService.pricePerKg.toFixed(2)} / {currentService.unitLabel}</span>
              </div>
              <div className="flex justify-between">
                <span>Turnaround:</span>
                <span className="font-semibold text-emerald-300">
                  {express ? '12 Hours (Express Rush)' : currentService.turnaround}
                </span>
              </div>
              {express && (
                <div className="flex justify-between text-amber-300 font-medium">
                  <span>Priority Rush Fee:</span>
                  <span>+\${expressFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Doorstep Pickup & Return:</span>
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">COMPLIMENTARY</span>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-800/80 mb-6">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-emerald-300 font-medium">Estimated Total:</span>
                <span className="font-display text-3xl font-bold text-amber-300">
                  \${totalPrice}
                </span>
              </div>
              <p className="text-[10px] text-emerald-400 mt-1">
                Zero advance payment required. Invoiced upon inspection.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-slate-950 font-bold text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  <span>Securing Driver Slot...</span>
                </>
              ) : (
                <>
                  <span>Confirm Booking Now</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="mt-4 pt-4 border-t border-emerald-900/60 text-[11px] text-emerald-300/80 space-y-1.5">
              <p className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>\$5,000 Garment Value Guarantee</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Free cancellation up to 2h before pickup</span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
