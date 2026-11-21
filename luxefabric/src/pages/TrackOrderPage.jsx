import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useBookings } from '../context/BookingContext';
import {
  Search,
  CheckCircle2,
  Truck,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export default function TrackOrderPage() {
  const [searchParams] = useSearchParams();
  const { bookings, findBooking } = useBookings();

  const queryId = searchParams.get('id') || '';

  // Initialize directly from query or first booking
  const [searchInput, setSearchInput] = useState(() => {
    if (queryId) return queryId;
    return bookings.length > 0 ? bookings[0].id : '';
  });

  const [currentOrder, setCurrentOrder] = useState(() => {
    if (queryId) {
      const match = findBooking(queryId);
      if (match) return match;
    }
    return bookings.length > 0 ? bookings[0] : null;
  });

  const [searched, setSearched] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const match = findBooking(searchInput);
    setCurrentOrder(match || null);
    setSearched(true);
  };

  const stages = [
    { title: 'Booking Confirmed', desc: 'Concierge slot reserved in system' },
    { title: 'Garments Collected', desc: 'Driver collected items from doorstep' },
    { title: 'Artisan Textile Wash', desc: 'Eco hydrocarbon solvent immersion' },
    { title: 'Steam Press & QC', desc: 'Individual hand-finish & crease check' },
    { title: 'Doorstep Delivered', desc: 'Returned fresh in breathable covers' }
  ];

  const getStageIndex = (status) => {
    switch (status) {
      case 'Scheduled':
        return 0;
      case 'Picked Up':
        return 1;
      case 'In Cleaning':
        return 2;
      case 'Quality Check':
        return 3;
      case 'Out for Delivery':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 0;
    }
  };

  const activeStage = currentOrder ? getStageIndex(currentOrder.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Search Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-bold text-emerald-800 block mb-1">
          Live Status Telemetry
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
          Track Your Garments
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2">
          Monitor pickup dispatches, eco solvent cleaning phases, and doorstep returns in real time.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-6 flex gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter Order ID (e.g. LUX-8492) or Phone"
              className="w-full pl-10 pr-3 py-3 text-xs sm:text-sm bg-white border border-stone-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-700 shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-2xl shadow-md transition-all"
          >
            Track
          </button>
        </form>

        {/* Quick Demo Order Links */}
        {bookings.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
            <span>Quick test:</span>
            {bookings.slice(0, 3).map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  setSearchInput(b.id);
                  setCurrentOrder(b);
                  setSearched(true);
                }}
                className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-emerald-950 font-mono font-medium"
              >
                {b.id} ({b.status})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Result Display */}
      {searched && !currentOrder ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-8 text-center max-w-md mx-auto shadow-sm">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h3 className="font-display text-lg font-bold text-slate-900">Order Not Found</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            We couldn't locate any active booking matching "{searchInput}". Please double check your order reference.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:underline"
          >
            <span>Schedule a new pickup instead</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : currentOrder ? (
        <div className="space-y-6">
          {/* Order Details Banner */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-4">
              <div>
                <span className="text-xs text-slate-400 block">Tracking Reference</span>
                <span className="font-mono text-2xl font-bold text-emerald-950">
                  {currentOrder.id}
                </span>
                <span className="text-xs text-slate-500 ml-2 font-medium">
                  • {currentOrder.service} ({currentOrder.quantity} {currentOrder.unit || 'Kg'})
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs px-3.5 py-1.5 rounded-full font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  Current Status: {currentOrder.status}
                </span>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="py-8">
              <div className="relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-stone-200 -translate-y-1/2 z-0">
                  <div
                    className="h-full bg-emerald-700 transition-all duration-700"
                    style={{ width: `${(activeStage / (stages.length - 1)) * 100}%` }}
                  />
                </div>

                {/* Steps Nodes */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-2 relative z-10">
                  {stages.map((stage, idx) => {
                    const isCompleted = idx <= activeStage;
                    const isCurrent = idx === activeStage;

                    return (
                      <div
                        key={idx}
                        className="flex md:flex-col items-center md:text-center gap-4 md:gap-3"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                            isCompleted
                              ? 'bg-emerald-800 text-amber-300 shadow-md ring-4 ring-emerald-100'
                              : 'bg-stone-100 text-slate-400 border border-stone-300'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            idx + 1
                          )}
                        </div>

                        <div>
                          <h4
                            className={`text-xs font-bold ${
                              isCurrent
                                ? 'text-emerald-950 underline decoration-amber-400 decoration-2'
                                : isCompleted
                                ? 'text-slate-900'
                                : 'text-slate-400'
                            }`}
                          >
                            {stage.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5 max-w-[140px] md:mx-auto">
                            {stage.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-stone-100 text-xs">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-1.5">
                <span className="font-bold text-slate-700 block">Pickup & Location</span>
                <p className="text-slate-600 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Scheduled: {currentOrder.pickupDate} ({currentOrder.pickupTime})</span>
                </p>
                <p className="text-slate-600 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                  <span>{currentOrder.address}</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5">
                <span className="font-bold text-emerald-950 block">Concierge Vehicle</span>
                <p className="text-emerald-900 flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Assigned Driver: Julian Morales (Eco-Van #4)</span>
                </p>
                <p className="text-emerald-900 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Driver Contact: +1 (555) 912-3847</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
