import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookings } from '../context/BookingContext';
import {
  Calendar,
  Shirt,
  Search,
  AlertTriangle,
  X,
  FileText,
  Printer,
  ArrowRight,
  Sparkles,
  MapPin
} from 'lucide-react';

export default function MyBookingsPage({ onToast }) {
  const { bookings, cancelBooking } = useBookings();

  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [cancelModalId, setCancelModalId] = useState(null);

  const filteredBookings = bookings.filter((b) => {
    if (activeFilter === 'Active') {
      return b.status !== 'Delivered' && b.status !== 'Cancelled';
    }
    if (activeFilter === 'Completed') {
      return b.status === 'Delivered';
    }
    if (activeFilter === 'Cancelled') {
      return b.status === 'Cancelled';
    }
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'In Cleaning':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Quality Check':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'Out for Delivery':
        return 'bg-teal-50 text-teal-800 border-teal-200';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Cancelled':
        return 'bg-stone-100 text-stone-600 border-stone-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const handleConfirmCancel = () => {
    if (cancelModalId) {
      cancelBooking(cancelModalId);
      setCancelModalId(null);
      if (onToast) {
        onToast({
          type: 'info',
          title: 'Order Cancelled',
          message: `Booking #${cancelModalId} has been cancelled.`
        });
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-emerald-800 block mb-1">
            Garment Portfolio
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            My Laundry & Care Bookings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time status tracking, digital receipts, and pickup schedule history.
          </p>
        </div>

        <Link
          to="/book"
          className="self-start sm:self-auto px-5 py-2.5 bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>New Pickup Request</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-3">
        {['All', 'Active', 'Completed', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeFilter === tab
                ? 'bg-emerald-900 text-amber-300 shadow-xs'
                : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
            }`}
          >
            {tab}
          </button>
        ))}
        <span className="text-xs text-slate-400 ml-auto hidden sm:block">
          Showing {filteredBookings.length} orders
        </span>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-4">
            <Shirt className="w-8 h-8" />
          </div>
          <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
            No Bookings Found
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            You don't have any {activeFilter.toLowerCase()} garment care requests recorded in your history.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-900 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-xl shadow hover:bg-emerald-950"
          >
            <span>Schedule Your First Pickup</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left Order Info */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono font-bold text-sm text-emerald-950 px-2.5 py-1 bg-stone-100 rounded-lg">
                    {b.id}
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold border ${getStatusBadge(
                      b.status
                    )}`}
                  >
                    {b.status}
                  </span>
                  {b.express && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold">
                      Express 12H Rush
                    </span>
                  )}
                </div>

                <h3 className="font-display text-lg font-bold text-slate-900">
                  {b.service} — {b.quantity} {b.unit || 'Kg'}
                </h3>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Pickup: {b.pickupDate} ({b.pickupTime})
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate max-w-[200px]">{b.address}</span>
                  </span>
                </div>

                {b.instruction && (
                  <p className="text-xs text-amber-900/90 bg-amber-50/60 p-2 rounded-xl inline-block">
                    <strong>Note:</strong> {b.instruction}
                  </p>
                )}
              </div>

              {/* Middle Price */}
              <div className="text-left md:text-right border-t md:border-t-0 pt-4 md:pt-0 border-stone-100">
                <span className="text-xs text-slate-400 block">Total Invoiced</span>
                <span className="font-display text-2xl font-bold text-emerald-950">
                  \${(b.estimatedTotal || 0).toFixed(2)}
                </span>
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-wrap md:flex-col items-center gap-2">
                <Link
                  to={`/track?id=${b.id}`}
                  className="px-4 py-2 bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Track Status</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setSelectedReceipt(b)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-slate-700 text-xs font-medium rounded-xl transition-all flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>Digital Receipt</span>
                </button>

                {b.status !== 'Delivered' && b.status !== 'Cancelled' && (
                  <button
                    type="button"
                    onClick={() => setCancelModalId(b.id)}
                    className="px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {cancelModalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center border border-stone-200">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
              Cancel Pickup Request?
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Are you sure you want to cancel booking #{cancelModalId}? You can reschedule anytime.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelModalId(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-stone-50"
              >
                Keep Order
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Digital Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-200">
            {/* Header */}
            <div className="bg-emerald-950 text-white p-6 relative">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="absolute top-4 right-4 text-emerald-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300">
                LuxeFabric Artisanal Care
              </span>
              <h3 className="font-display text-2xl font-bold mt-1">Official Digital Receipt</h3>
              <p className="text-xs text-emerald-200 mt-1 font-mono">#{selectedReceipt.id}</p>
            </div>

            {/* Receipt Body */}
            <div className="p-6 space-y-4 text-xs">
              <div className="flex justify-between border-b border-stone-100 pb-3">
                <span className="text-slate-500">Client:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.customer}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-3">
                <span className="text-slate-500">Service:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.service}</span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-3">
                <span className="text-slate-500">Quantity / Weight:</span>
                <span className="font-semibold text-slate-900">
                  {selectedReceipt.quantity} {selectedReceipt.unit || 'Kg'}
                </span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-3">
                <span className="text-slate-500">Pickup Window:</span>
                <span className="font-semibold text-slate-900">
                  {selectedReceipt.pickupDate} ({selectedReceipt.pickupTime})
                </span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-3">
                <span className="text-slate-500">Pickup Address:</span>
                <span className="font-semibold text-slate-900 text-right truncate max-w-[200px]">
                  {selectedReceipt.address}
                </span>
              </div>
              <div className="flex justify-between border-b border-stone-100 pb-3">
                <span className="text-slate-500">Current Status:</span>
                <span className="font-bold text-emerald-800">{selectedReceipt.status}</span>
              </div>

              <div className="pt-2 flex justify-between items-baseline text-sm">
                <span className="font-bold text-slate-800">Total Billed:</span>
                <span className="font-display text-2xl font-bold text-emerald-950">
                  \${(selectedReceipt.estimatedTotal || 0).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="p-6 bg-stone-50 border-t border-stone-200 flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-stone-100 flex items-center justify-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-900 text-white text-xs font-semibold hover:bg-emerald-950"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
