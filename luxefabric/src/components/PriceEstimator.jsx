import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../data/servicesData';
import { Calculator, ArrowRight, Sparkles, Zap } from 'lucide-react';

export default function PriceEstimator({ defaultServiceId = 'dry-cleaning' }) {
  const navigate = useNavigate();
  const [selectedServiceId, setSelectedServiceId] = useState(defaultServiceId);
  const [quantity, setQuantity] = useState(3);
  const [isExpress, setIsExpress] = useState(false);
  const [ecoSoftener, setEcoSoftener] = useState(true);

  const selectedService =
    SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  const basePrice = selectedService.pricePerKg * quantity;
  const expressFee = isExpress ? Math.round(basePrice * 0.3 * 10) / 10 : 0;
  const ecoFee = ecoSoftener ? 2.5 : 0;
  const totalEstimate = (basePrice + expressFee + ecoFee).toFixed(2);

  const handleBookNow = () => {
    navigate('/book', {
      state: {
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        quantity,
        unit: selectedService.unitLabel,
        isExpress,
        estimatedTotal: parseFloat(totalEstimate),
        pricePerUnit: selectedService.pricePerKg
      }
    });
  };

  return (
    <div className="bg-gradient-to-br from-white to-stone-50 border border-stone-200 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-900 text-amber-300 flex items-center justify-center shadow-sm">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-emerald-950">
            Instant Garment Care Estimator
          </h3>
          <p className="text-xs text-slate-500">
            Transparent pricing based on optical weight & specialized fabric technique.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Inputs */}
        <div className="space-y-5">
          {/* Service Picker */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Select Care Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SERVICES.map((serv) => (
                <button
                  key={serv.id}
                  type="button"
                  onClick={() => {
                    setSelectedServiceId(serv.id);
                    setQuantity(serv.defaultQty || 2);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-left border text-xs font-medium transition-all ${
                    selectedServiceId === serv.id
                      ? 'bg-emerald-900 border-emerald-900 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-600 hover:bg-emerald-50/50'
                  }`}
                >
                  <span className="block font-semibold truncate">{serv.name}</span>
                  <span
                    className={`block text-[10px] mt-0.5 ${
                      selectedServiceId === serv.id ? 'text-amber-300' : 'text-slate-500'
                    }`}
                  >
                    \${serv.pricePerKg.toFixed(2)} / {serv.priceUnit}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Slider */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
                Quantity / Optical Weight:
              </label>
              <span className="font-display text-lg font-bold text-emerald-950">
                {quantity} {selectedService.unitLabel}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max={selectedService.priceUnit === 'piece' ? 25 : 30}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-700"
              />
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-stone-100 flex items-center justify-center font-bold text-sm"
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-stone-100 flex items-center justify-center font-bold text-sm"
                >
                  +
                </button>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Typical turnaround for this volume: <strong>{selectedService.turnaround}</strong>
            </p>
          </div>

          {/* Add-ons Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                isExpress
                  ? 'border-amber-400 bg-amber-50/70 text-amber-950'
                  : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              <input
                type="checkbox"
                checked={isExpress}
                onChange={(e) => setIsExpress(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <div className="text-xs">
                <span className="font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-600" /> Express 12H (+30%)
                </span>
                <span className="text-[10px] text-slate-500 block">Priority queue slot</span>
              </div>
            </label>

            <label
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                ecoSoftener
                  ? 'border-emerald-400 bg-emerald-50/70 text-emerald-950'
                  : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              <input
                type="checkbox"
                checked={ecoSoftener}
                onChange={(e) => setEcoSoftener(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <div className="text-xs">
                <span className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Botanical Rinse (+\$2.50)
                </span>
                <span className="text-[10px] text-slate-500 block">Organic lavender extract</span>
              </div>
            </label>
          </div>
        </div>

        {/* Right Summary Card */}
        <div className="bg-emerald-950 text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg relative border border-emerald-800">
          <div>
            <div className="flex justify-between items-center pb-4 border-b border-emerald-800/80">
              <span className="text-xs uppercase tracking-wider text-emerald-300 font-semibold">
                Cost Breakdown
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200">
                Guaranteed Estimate
              </span>
            </div>

            <div className="py-4 space-y-2 text-xs">
              <div className="flex justify-between text-emerald-100">
                <span>{selectedService.name} ({quantity} {selectedService.unitLabel})</span>
                <span className="font-semibold">\${basePrice.toFixed(2)}</span>
              </div>
              {isExpress && (
                <div className="flex justify-between text-amber-300">
                  <span>Express 12-Hour Priority</span>
                  <span className="font-semibold">+\${expressFee.toFixed(2)}</span>
                </div>
              )}
              {ecoSoftener && (
                <div className="flex justify-between text-emerald-300">
                  <span>Organic Botanical Conditioner</span>
                  <span className="font-semibold">+\${ecoFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-emerald-100">
                <span>Doorstep Pickup & Return</span>
                <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">FREE</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-emerald-800/80">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <span className="text-xs text-emerald-300">Total Estimated Price</span>
                <p className="text-[10px] text-emerald-400">All local taxes & fees included</p>
              </div>
              <div className="text-right">
                <span className="font-display text-3xl font-bold text-amber-300">
                  \${totalEstimate}
                </span>
              </div>
            </div>

            <button
              onClick={handleBookNow}
              className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Schedule Pickup with This Estimate</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
