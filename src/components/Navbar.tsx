import React, { useState } from 'react';
import { Menu, X, SlidersHorizontal, Calendar, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onOpenTestRide: () => void;
  onOpenConfigurator: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTestRide,
  onOpenConfigurator,
  onOpenCart,
  cartCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="h-4 w-4 bg-amber-500 rounded-sm rotate-45 transform transition-transform group-hover:rotate-90"></span>
          <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-white uppercase">
            Apex Motowerks
          </span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <a
            href="#fleet"
            className="hover:text-amber-400 transition-colors py-1"
          >
            Showroom Fleet
          </a>
          <button
            onClick={onOpenConfigurator}
            className="hover:text-amber-400 transition-colors py-1 text-left"
          >
            Studio Configurator
          </button>
          <a
            href="#financing"
            className="hover:text-amber-400 transition-colors py-1"
          >
            Financing & EMI
          </a>
          <a
            href="#locations"
            className="hover:text-amber-400 transition-colors py-1"
          >
            Showroom Hubs
          </a>
          <a
            href="#heritage"
            className="hover:text-amber-400 transition-colors py-1"
          >
            Heritage & Dyno
          </a>
        </nav>

        {/* Zone 3: Primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            aria-label="View Saved Builds and Cart"
            className="relative p-2.5 text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors border border-transparent hover:border-zinc-800"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-black tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenTestRide}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 rounded-lg hover:bg-amber-300 active:scale-95 transition-all shadow-sm shadow-amber-500/20 whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Test Ride</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-zinc-950 px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-zinc-200">
            <a
              href="#fleet"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              Showroom Fleet
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConfigurator();
              }}
              className="py-1 text-left hover:text-amber-400 transition-colors flex items-center justify-between"
            >
              <span>Studio Configurator</span>
              <SlidersHorizontal className="w-4 h-4 text-zinc-500" />
            </button>
            <a
              href="#financing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              Financing & EMI
            </a>
            <a
              href="#locations"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              Showroom Hubs
            </a>
            <a
              href="#heritage"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-amber-400 transition-colors"
            >
              Heritage & Dyno
            </a>
          </nav>
          <div className="pt-3 border-t border-zinc-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTestRide();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Book VIP Test Ride</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
