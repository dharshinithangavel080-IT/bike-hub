import React, { useState } from 'react';
import { MapPin, Phone, Clock, Gauge, Award, ChevronRight, Check } from 'lucide-react';
import { SHOWROOM_LOCATIONS } from '../data/bikes';

interface ShowroomLocationsProps {
  onScheduleVisit: (locationName: string) => void;
}

export const ShowroomLocations: React.FC<ShowroomLocationsProps> = ({ onScheduleVisit }) => {
  const [selectedHubIndex, setSelectedHubIndex] = useState(0);

  return (
    <section id="locations" className="py-16 bg-zinc-950 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>Showroom Network</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Flagship Experience Hubs
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-lg">
              Visit our architectural showrooms to inspect machinery in person, experience dyno tuning runs, or test on closed circuit tracks.
            </p>
          </div>

          <div className="text-xs text-zinc-400">
            White-Glove Nationwide Enclosed Transport Available
          </div>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {SHOWROOM_LOCATIONS.map((loc, idx) => (
            <div
              key={loc.id}
              onClick={() => setSelectedHubIndex(idx)}
              className={`cursor-pointer rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                selectedHubIndex === idx
                  ? 'bg-zinc-900 border-amber-400/90 ring-1 ring-amber-400/50 shadow-xl shadow-amber-500/5'
                  : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                    Hub 0{idx + 1}
                  </span>
                  {loc.hasDyno && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-emerald-400 flex items-center gap-1">
                      <Gauge className="w-3 h-3" />
                      <span>Dyno Lab</span>
                    </span>
                  )}
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {loc.name}
                </h3>

                <div className="space-y-2 text-xs text-zinc-400">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                    <span>
                      {loc.address}
                      <br />
                      <span className="text-zinc-500">{loc.city}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-zinc-500 shrink-0" />
                    <span className="font-mono text-zinc-300">{loc.phone}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
                    <span>{loc.hours}</span>
                  </div>
                </div>

                {/* Facilities List */}
                <div className="mt-4 pt-4 border-t border-zinc-800/80">
                  <div className="text-[10px] uppercase font-semibold text-zinc-500 mb-2">
                    Hub Highlights
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {loc.facilities.map((fac, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{fac}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onScheduleVisit(loc.name);
                  }}
                  className="w-full py-2.5 px-3 text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Schedule Private Appointment</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Showroom Heritage & Dyno Bay Feature Banner */}
        <div id="heritage" className="rounded-2xl bg-zinc-900 border border-zinc-800 p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="text-xs uppercase font-semibold tracking-widest text-amber-400">
              The Apex Standard
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Every Machine Calibrated on Our In-House Dyno
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
              Before handover, each motorcycle undergoes an electronic 85-point inspection, air-fuel mapping check, and dyno run certifying horsepower and torque against factory spec sheets. Riders receive a laminated dyno certificate with their delivery folder.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-zinc-800 text-xs">
              <div>
                <div className="font-bold text-white font-mono text-base tabular-nums">100%</div>
                <div className="text-zinc-500 mt-0.5">Dyno Run Verified</div>
              </div>
              <div>
                <div className="font-bold text-white font-mono text-base tabular-nums">5 Years</div>
                <div className="text-zinc-500 mt-0.5">Factory Powertrain Warranty</div>
              </div>
              <div>
                <div className="font-bold text-white font-mono text-base tabular-nums">24 / 7</div>
                <div className="text-zinc-500 mt-0.5">Apex Roadside Assistance</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center bg-zinc-950 border border-zinc-800 rounded-xl p-6 text-center space-y-3">
            <div className="p-3 bg-amber-400/10 text-amber-400 rounded-full w-12 h-12 flex items-center justify-center mx-auto border border-amber-400/20">
              <Award className="w-6 h-6" />
            </div>
            <div className="font-display text-base font-bold text-white">
              Certified Master Technicians
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Factory trained in Bologna, Munich, and Tokyo. We offer precision valve adjustments, suspension tailoring, and race ecu flashing.
            </p>
            <div className="text-xs font-mono text-amber-400 font-semibold pt-1">
              Apex Concierge: +1 (800) 555-APEX
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
