import React from 'react';
import { ArrowUpRight, ShieldCheck, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenTestRide: () => void;
  onOpenConfigurator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTestRide, onOpenConfigurator }) => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 text-xs">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-3.5 w-3.5 bg-amber-500 rounded-sm rotate-45"></span>
              <span className="font-display text-xl font-bold uppercase tracking-tight text-white">
                Apex Motowerks
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Premier motorcycle dealership and factory engineering showroom. Delivering elite superbikes, hypernakeds, continental tourers, and electric propulsion machines across North America and Europe.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Authorized Factory Dealership & Dyno Service Center</span>
            </div>
          </div>

          {/* Showroom Fleet Links */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Motorcycles
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#fleet" className="hover:text-amber-400 transition-colors">
                  Apex Corsa 1199 RR
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-amber-400 transition-colors">
                  Apex Nemesis 1200 Hypernaked
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-amber-400 transition-colors">
                  Apex Trans-Atlas 1250 Adventure
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-amber-400 transition-colors">
                  Apex Volt 1000 EV Hyperbike
                </a>
              </li>
            </ul>
          </div>

          {/* Experience & Studio */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Showroom Services
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenConfigurator}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  3D Custom Studio
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTestRide}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Book VIP Demonstration
                </button>
              </li>
              <li>
                <a href="#financing" className="hover:text-amber-400 transition-colors">
                  Financing & Payment Plans
                </a>
              </li>
              <li>
                <a href="#heritage" className="hover:text-amber-400 transition-colors">
                  Dyno Calibration & Testing
                </a>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Locations & Hubs
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-500 mt-0.5 shrink-0" />
                <span>Downtown San Francisco Flagship</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-500 mt-0.5 shrink-0" />
                <span>Monterey Trackside Center</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-500 mt-0.5 shrink-0" />
                <span>Newport Beach Coastline Hub</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} Apex Motowerks Inc. All rights reserved. Always wear approved helmet and protective gear while riding.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Sale</a>
            <span>·</span>
            <a href="#" className="hover:text-zinc-400 transition-colors">Licensing & Regulatory</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
