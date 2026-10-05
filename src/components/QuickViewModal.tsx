import React from 'react';
import { X, SlidersHorizontal, Calendar, Gauge, Shield, Zap, Check } from 'lucide-react';
import { Bike } from '../types';
import { AudioRevControl } from './AudioRevControl';

interface QuickViewModalProps {
  bike: Bike | null;
  onClose: () => void;
  onConfigure: (bike: Bike) => void;
  onTestRide: (bike: Bike) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  bike,
  onClose,
  onConfigure,
  onTestRide,
}) => {
  if (!bike) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl my-8 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Hero Image */}
          <div className="lg:col-span-6 relative bg-zinc-950 flex flex-col justify-between p-6">
            <div className="space-y-1">
              <div className="text-xs uppercase font-semibold text-amber-400 tracking-wider">
                {bike.series}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                {bike.name}
              </h2>
            </div>

            <div className="my-6">
              <img
                src={bike.image}
                alt={bike.name}
                referrerPolicy="no-referrer"
                className="w-full h-64 object-contain drop-shadow-2xl"
              />
            </div>

            <div className="bg-zinc-900/80 rounded-xl p-3 border border-zinc-800">
              <AudioRevControl engineType={bike.engineSound.type} bikeName={bike.name} />
            </div>
          </div>

          {/* Right Details Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-zinc-900">
            <div className="space-y-5">
              <div>
                <div className="text-[11px] text-zinc-500 uppercase tracking-wider">Starting MSRP</div>
                <div className="font-display text-3xl font-extrabold text-amber-400 tabular-nums">
                  ${bike.basePrice.toLocaleString()}
                  <span className="text-xs font-normal text-zinc-400 ml-1.5">USD</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {bike.description}
              </p>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                  <div className="text-zinc-500 text-[10px] uppercase">Engine Architecture</div>
                  <div className="font-semibold text-white mt-0.5">{bike.specs.engine}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                  <div className="text-zinc-500 text-[10px] uppercase">Power Output</div>
                  <div className="font-mono font-bold text-amber-400 mt-0.5 tabular-nums">{bike.specs.power}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                  <div className="text-zinc-500 text-[10px] uppercase">Acceleration (0-60)</div>
                  <div className="font-mono font-bold text-white mt-0.5 tabular-nums">{bike.specs.acceleration}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800">
                  <div className="text-zinc-500 text-[10px] uppercase">Dry Weight</div>
                  <div className="font-mono text-zinc-200 mt-0.5 tabular-nums">{bike.specs.dryWeight}</div>
                </div>
              </div>

              {/* Standard Equipment */}
              <div>
                <div className="text-xs uppercase font-semibold text-zinc-400 mb-2">
                  Factory Standard Technology
                </div>
                <ul className="space-y-1 text-xs text-zinc-300">
                  {bike.features.slice(0, 4).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-zinc-800 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onConfigure(bike);
                  }}
                  className="flex items-center justify-center gap-1.5 py-3 px-4 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Configure Machine</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onTestRide(bike);
                  }}
                  className="flex items-center justify-center gap-1.5 py-3 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 rounded-lg transition-colors"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Book Test Ride</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
