import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      title: 'Hydrocarbon Botanical Purity',
      desc: 'We replaced petrochemical solvents with closed-circuit hydrocarbon and non-toxic botanical washes, safeguarding both delicate silk threads and urban waterways.',
      icon: <Leaf className="w-6 h-6 text-emerald-700" />
    },
    {
      title: 'Artisan Hand-Finishing',
      desc: 'No automated tunnel presses that flatten textures. Every collar, lapel, cuff, and pleat is hand-aligned and hand-steamed by seasoned pressing artisans.',
      icon: <Sparkles className="w-6 h-6 text-amber-600" />
    },
    {
      title: 'Zero Single-Use Plastic',
      desc: 'Every return arrives packaged in breathable non-woven garment carriers and recycled tissue paper, protecting fibers against mildew while eliminating single-use plastic wraps.',
      icon: <ShieldCheck className="w-6 h-6 text-teal-700" />
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> Since 2018
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15] mb-6">
            Preserving the Beauty and Longevity of Every Thread
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
            LuxeFabric was born from a simple realization: modern wardrobes are investments. Fine cashmere sweaters, bespoke wool blazers, and heritage linens deserve far more than assembly-line laundromats and noxious chemicals.
          </p>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
            We combined European heritage textile restoration with modern sustainable chemistry and seamless on-demand doorstep logistics.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-950 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-2xl shadow-lg hover:bg-emerald-900 transition-all"
          >
            <span>Explore Our Artisan Process</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
            <img
              src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=1000&auto=format&fit=crop"
              alt="Artisan fabric inspection"
              className="w-full h-[450px] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-stone-200 max-w-xs hidden sm:block">
            <span className="font-display text-3xl font-bold text-emerald-950 block">45,000+</span>
            <span className="text-xs text-slate-500">Fine couture pieces cared for without a single chemical tear.</span>
          </div>
        </div>
      </div>

      {/* Core Pillars */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            The LuxeFabric Standard
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Designed for those who care about how their clothes look, feel, and endure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center mb-6">
                  {val.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
