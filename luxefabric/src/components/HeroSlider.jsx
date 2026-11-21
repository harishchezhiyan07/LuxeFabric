import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HERO_SLIDES } from '../data/servicesData';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Pause, Play } from 'lucide-react';

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);
  const touchStartXRef = useRef(null);
  const sliderRef = useRef(null);

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  // Auto sliding with useEffect and useRef timer
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % totalSlides);
      }, 4500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, totalSlides]);

  // Touch Swipe gestures for responsive mobile devices
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartXRef.current = null;
  };

  return (
    <div
      ref={sliderRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full overflow-hidden bg-slate-950 text-white rounded-3xl shadow-2xl mx-auto my-6 max-w-7xl px-0"
    >
      {/* Slide Container */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {HERO_SLIDES.map((slide) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 relative min-h-[500px] md:min-h-[580px] flex items-center"
          >
            {/* Background Image with Dark Vignette */}
            <div className="absolute inset-0 z-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />
            </div>

            {/* Slide Content */}
            <div className="relative z-10 max-w-3xl px-8 md:px-16 py-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>{slide.tag}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1] mb-4">
                {slide.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base md:text-lg font-light leading-relaxed mb-8 max-w-xl">
                {slide.description}
              </p>

              {/* Action Buttons & Stat Pill */}
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={slide.ctaLink}
                  className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-slate-950 font-bold rounded-2xl shadow-xl shadow-amber-500/20 text-sm transition-all flex items-center gap-2 group"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/services"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 active:scale-[0.98] border border-white/20 text-white font-medium rounded-2xl text-sm backdrop-blur-md transition-all"
                >
                  View Service Pricing
                </Link>

                {/* Micro Stat Card */}
                <div className="hidden sm:flex items-center gap-3 ml-auto px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-700/60 backdrop-blur-md">
                  <div className="text-right">
                    <span className="block font-display text-xl font-bold text-amber-300 leading-tight">
                      {slide.stat}
                    </span>
                    <span className="block text-[11px] text-slate-400 uppercase tracking-wider">
                      {slide.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="prev absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-13 md:h-13 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-105 active:scale-95 z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="next absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 md:w-13 md:h-13 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-105 active:scale-95 z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators & Auto-play Pause Control */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-black/40 px-4 py-2 rounded-full border border-white/15 backdrop-blur-md">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="text-white/70 hover:text-white transition-colors"
          title={isPaused ? 'Resume auto-slider' : 'Pause slider'}
          aria-label={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>

        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
              className={`dot h-2 transition-all rounded-full ${
                index === current
                  ? 'w-8 bg-amber-400'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
