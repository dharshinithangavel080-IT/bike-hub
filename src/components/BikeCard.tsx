import React, { useState } from 'react';
import { SlidersHorizontal, Calendar, Gauge, Zap, Check } from 'lucide-react';
import { Bike } from '../types';

interface BikeCardProps {
  bike: Bike;
  onSelectConfigure: (bike: Bike) => void;
  onSelectTestRide: (bike: Bike) => void;
  onToggleCompare: (bike: Bike) => void;
  isCompared: boolean;
  onOpenQuickView: (bike: Bike) => void;
}

export const BikeCard: React.FC<BikeCardProps> = ({
  bike,
  onSelectConfigure,
  onSelectTestRide,
  onToggleCompare,
  isCompared,
  onOpenQuickView,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex flex-col justify-between rounded-xl bg-zinc-900 border border-zinc-800/90 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-black/50 overflow-hidden">
      {/* Visual Canvas */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
        {!imgError ? (
          <img
            src={bike.image}
            alt={`${bike.name} motorcycle`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-zinc-950 text-zinc-500">
            <Zap className="w-10 h-10 text-amber-500/40 mb-2" />
            <span className="text-xs uppercase tracking-wider">{bike.name}</span>
          </div>
        )}

        {/* Measured subtle gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent pointer-events-none" />

        {/* Quick View Button overlay */}
        <button
          onClick={() => onOpenQuickView(bike)}
          className="absolute top-3 right-3 px-2.5 py-1 text-[11px] font-medium text-zinc-300 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 rounded backdrop-blur-md opacity-90 transition-opacity"
        >
          Quick Specs
        </button>

        {/* Compare Checkbox Affordance */}
        <button
          onClick={() => onToggleCompare(bike)}
          className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded backdrop-blur-md transition-colors border ${
            isCompared
              ? 'bg-amber-400 text-black border-amber-300 font-semibold'
              : 'bg-zinc-900/80 text-zinc-300 hover:text-white border-zinc-700/60'
          }`}
        >
          {isCompared && <Check className="w-3 h-3 stroke-[3]" />}
          <span>{isCompared ? 'Comparing' : 'Compare'}</span>
        </button>

        {/* Bottom image overlay specs */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-zinc-300">
          <div className="flex items-center gap-1 font-mono tabular-nums">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span>{bike.specs.powerHp} HP</span>
          </div>
          <div className="font-mono tabular-nums text-zinc-300">
            {bike.specs.acceleration}
          </div>
        </div>
      </div>

      {/* Card Body & Information */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Metadata - unboxed clean text with separators */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1.5">
            <span className="uppercase tracking-wider font-medium text-amber-400/90">{bike.series}</span>
            <span aria-hidden="true">·</span>
            <span>{bike.specs.displacement}</span>
            <span aria-hidden="true">·</span>
            <span>{bike.specs.dryWeight}</span>
          </div>

          <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
            {bike.name}
          </h3>

          <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {bike.tagline}
          </p>
        </div>

        {/* Pricing & Primary Action Controls */}
        <div className="pt-3 border-t border-zinc-800/80">
          <div className="flex items-baseline justify-between mb-3">
            <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Starting Price</div>
            <div className="font-display text-lg font-bold text-white tabular-nums">
              ${bike.basePrice.toLocaleString()}
              <span className="text-xs font-normal text-zinc-500 ml-1">MSRP</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelectConfigure(bike)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 rounded-lg hover:bg-amber-300 active:scale-95 transition-all shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Configure</span>
            </button>

            <button
              onClick={() => onSelectTestRide(bike)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-zinc-300 bg-zinc-800/90 border border-zinc-700/80 rounded-lg hover:bg-zinc-700 hover:text-white transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              <span>Test Ride</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
