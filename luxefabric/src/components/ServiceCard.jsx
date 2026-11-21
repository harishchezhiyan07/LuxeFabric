import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Clock, ArrowRight, Star, Sparkles } from 'lucide-react';

export default function ServiceCard({ service, layout = 'split', reverse = false }) {
  const navigate = useNavigate();

  const handleBook = () => {
    navigate('/book', {
      state: {
        serviceId: service.id,
        serviceName: service.name,
        pricePerUnit: service.pricePerKg,
        unit: service.unitLabel,
        quantity: service.defaultQty || 2
      }
    });
  };

  if (layout === 'grid') {
    return (
      <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group">
        <div className="relative h-52 overflow-hidden">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md text-amber-300 text-xs px-3 py-1 rounded-full font-semibold">
            {service.category}
          </div>
          {service.popular && (
            <div className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[11px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3" /> Popular Choice
            </div>
          )}
        </div>

        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-xl font-bold text-emerald-950 group-hover:text-emerald-800 transition-colors">
                {service.name}
              </h3>
              <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{service.rating}</span>
                <span className="text-slate-400 font-normal">({service.reviewsCount})</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4 line-clamp-2">
              {service.tagline}
            </p>

            <div className="space-y-1.5 mb-5">
              {service.features.slice(0, 3).map((feat, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block">Starting at</span>
              <span className="font-display text-xl font-bold text-emerald-950">
                \${service.pricePerKg.toFixed(2)}{' '}
                <span className="text-xs font-sans font-normal text-slate-500">
                  / {service.priceUnit}
                </span>
              </span>
            </div>

            <button
              onClick={handleBook}
              className="px-4 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 group-hover:bg-amber-500 group-hover:text-slate-950"
            >
              <span>Book</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Alternating Split Banner Layout (matching the exact aesthetic of user's snippet with modern upgrades)
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 items-stretch bg-white rounded-3xl shadow-lg border border-stone-200/80 overflow-hidden hover:shadow-2xl transition-all duration-300 group`}
    >
      {/* Image Panel */}
      <div
        className={`h-56 md:h-auto min-h-[220px] relative overflow-hidden ${
          reverse ? 'md:order-2' : 'md:order-1'
        }`}
      >
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
        <div className="absolute top-4 left-4 bg-emerald-950/80 backdrop-blur-md text-amber-300 text-xs px-3 py-1 rounded-full font-semibold">
          {service.category}
        </div>
      </div>

      {/* Content Panel */}
      <div
        className={`p-6 sm:p-8 flex flex-col justify-between ${
          reverse ? 'md:order-1' : 'md:order-2'
        }`}
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-emerald-800 text-white text-xs">
              <Check className="w-4 h-4 stroke-[3]" />
            </span>
            <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
              Artisan Care
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-700" />
              {service.turnaround}
            </span>
          </div>

          <h3 className="font-display text-2xl font-bold text-emerald-950 mb-2">
            {service.name}
          </h3>

          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            {service.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {service.features.map((feat, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 block font-normal">Pricing</span>
            <span className="font-display text-2xl font-bold text-emerald-950">
              \${service.pricePerKg.toFixed(2)}{' '}
              <span className="text-xs font-sans font-normal text-slate-500">
                / {service.priceUnit}
              </span>
            </span>
          </div>

          <button
            onClick={handleBook}
            className="px-6 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-950 active:scale-[0.98] text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <span>Book Service</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
