import React, { useState } from 'react';
import { ArrowRight, SlidersHorizontal, Calendar, Zap, ShieldCheck } from 'lucide-react';
import { AudioRevControl } from './AudioRevControl';

interface HeroProps {
  onOpenTestRide: () => void;
  onOpenConfigurator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTestRide, onOpenConfigurator }) => {
  const [showSoundDemo, setShowSoundDemo] = useState(false);

  return (
    <section className="relative overflow-hidden bg-zinc-950 pt-6 pb-20 border-b border-zinc-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Editorial Subtitle / Kicker - unboxed text */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-4">
          <span>Official 2026 Fleet Premiere</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>Bologna & Silicon Valley R&D</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>FIA Spec Dyno Certified</span>
        </div>

        {/* Hero Grid: Typography + Showcase Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bold Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
              Precision Engineering. Pure Adrenaline.
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-xl">
              Enter the showroom of next-generation performance. From track-dominating 221 HP Desmo V4 superbikes to instant-torque electric hypermachines, experience machinery crafted without compromise.
            </p>

            {/* Spec strip with clean tabular numbers and dividers */}
            <div className="grid grid-cols-4 gap-4 py-4 border-y border-zinc-800/90 text-left">
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">221<span className="text-amber-400 text-lg font-normal">HP</span></div>
                <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider mt-0.5">Peak Output</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">2.7<span className="text-amber-400 text-lg font-normal">s</span></div>
                <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider mt-0.5">0–60 MPH</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">198<span className="text-amber-400 text-lg font-normal">mph</span></div>
                <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider mt-0.5">Top Velocity</div>
              </div>
              <div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">168<span className="text-amber-400 text-lg font-normal">kg</span></div>
                <div className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider mt-0.5">Dry Weight</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#fleet"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-black bg-amber-400 rounded-lg hover:bg-amber-300 active:scale-95 transition-all shadow-md shadow-amber-500/20 whitespace-nowrap"
              >
                <span>Explore Fleet</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenConfigurator}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wide text-white bg-zinc-900 border border-zinc-700/80 rounded-lg hover:bg-zinc-800 hover:border-zinc-600 transition-all whitespace-nowrap"
              >
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                <span>3D Configurator</span>
              </button>

              <button
                onClick={onOpenTestRide}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wide text-zinc-300 hover:text-white transition-colors"
              >
                <Calendar className="w-4 h-4 text-zinc-400" />
                <span>Book Test Ride</span>
              </button>
            </div>

            {/* Subtle trust markers */}
            <div className="flex items-center gap-6 text-xs text-zinc-400 pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>5-Year Factory Warranty</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Trackside Delivery Available</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl group">
              <img
                src="/src/assets/images/hero_superbike_flagship_1791195636041.jpg"
                alt="Apex Corsa 1199 RR Track Flagship Superbike"
                referrerPolicy="no-referrer"
                className="w-full aspect-[16/10] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700"
              />

              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent pointer-events-none" />

              {/* Overlay Model Title & Direct acoustic toggle */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
                    Featured Flagship
                  </div>
                  <div className="font-display text-xl font-bold text-white">
                    Apex Corsa 1199 RR Desmo
                  </div>
                  <div className="text-xs text-zinc-300 tabular-nums">
                    Starting at $26,400 MSRP
                  </div>
                </div>

                <button
                  onClick={() => setShowSoundDemo(!showSoundDemo)}
                  className="px-3 py-1.5 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-xs font-medium text-amber-400 rounded-lg backdrop-blur-sm transition-colors whitespace-nowrap"
                >
                  {showSoundDemo ? 'Hide Rev Control' : 'Live Rev Simulator'}
                </button>
              </div>
            </div>

            {/* Expandable Audio Rev Control */}
            {showSoundDemo && (
              <div className="mt-3">
                <AudioRevControl
                  engineType="v4"
                  bikeName="Apex Corsa 1199 RR"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
