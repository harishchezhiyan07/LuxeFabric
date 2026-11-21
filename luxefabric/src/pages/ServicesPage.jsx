import React, { useState } from 'react';
import { SERVICES } from '../data/servicesData';
import ServiceCard from '../components/ServiceCard';
import PriceEstimator from '../components/PriceEstimator';
import { Search, Sparkles, Grid, List, ShieldCheck, Feather } from 'lucide-react';

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('split'); // 'split' or 'grid'

  const categories = ['All', 'Delicates', 'Everyday', 'Home Care', 'Footwear'];

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory =
      selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.recommendedFor.some((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const fabricGuides = [
    {
      fiber: 'Silk & Satin',
      care: 'Eco-solvent cold soak, zero spin, hand steam on reverse side to prevent luster loss.',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />
    },
    {
      fiber: 'Cashmere & Fine Wool',
      care: 'Conditioning lanolin rinse, gentle horizontal block drying, anti-moth cedar packaging.',
      icon: <Feather className="w-5 h-5 text-emerald-600" />
    },
    {
      fiber: 'Crisp Linen & Egyptian Cotton',
      care: 'Controlled thermal steam pressing at 180°C to restore crisp drape without fiber scorching.',
      icon: <ShieldCheck className="w-5 h-5 text-teal-600" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto pt-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
          Comprehensive Textile Catalog
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          Artisanal Laundry & Garment Care
        </h1>
        <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
          From everyday wardrobe essentials to heirloom wedding gowns and custom home drapery, we employ calibrated solvent formulas designed to protect the integrity of every fiber.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-900 text-amber-300 shadow-sm'
                    : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar & View Mode Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services or fabrics..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div className="hidden sm:flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                onClick={() => setViewMode('split')}
                title="Split detailed view"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'split' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-400'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                title="Grid card view"
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-emerald-900 shadow-xs' : 'text-slate-400'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services List Display */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200">
          <p className="text-slate-500 font-medium">No garment care services matched your search.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-3 text-xs text-emerald-800 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} layout="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {filteredServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              layout="split"
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      )}

      {/* Fabric Knowledge Guide */}
      <section className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        <div className="max-w-3xl mb-8">
          <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block mb-2">
            The Science of Garment Care
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold">
            How We Protect Your Most Prized Fabrics
          </h2>
          <p className="text-emerald-100/75 text-xs sm:text-sm mt-2">
            Standard laundries utilize harsh industrial heat and perchloroethylene that weakens silk and pales dye. Here is how LuxeFabric treats fragile garments differently:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {fabricGuides.map((guide, i) => (
            <div key={i} className="p-5 rounded-2xl bg-emerald-900/60 border border-emerald-800 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center mb-4">
                {guide.icon}
              </div>
              <h3 className="font-bold text-sm text-white mb-1.5">{guide.fiber}</h3>
              <p className="text-xs text-emerald-200/80 leading-relaxed">{guide.care}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Calculator Anchor */}
      <section id="calculator">
        <PriceEstimator />
      </section>
    </div>
  );
}
