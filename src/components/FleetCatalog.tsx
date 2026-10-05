import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Scale, X, ArrowRight } from 'lucide-react';
import { Bike, BikeCategory } from '../types';
import { BikeCard } from './BikeCard';

interface FleetCatalogProps {
  bikes: Bike[];
  onSelectConfigure: (bike: Bike) => void;
  onSelectTestRide: (bike: Bike) => void;
  onOpenQuickView: (bike: Bike) => void;
  onOpenCompare: (bikes: Bike[]) => void;
}

export const FleetCatalog: React.FC<FleetCatalogProps> = ({
  bikes,
  onSelectConfigure,
  onSelectTestRide,
  onOpenQuickView,
  onOpenCompare,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<BikeCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'power'>('featured');
  const [comparedBikeIds, setComparedBikeIds] = useState<string[]>([]);

  // Filter and sort bikes
  const filteredBikes = useMemo(() => {
    return bikes
      .filter((bike) => {
        const matchesCategory = selectedCategory === 'all' || bike.category === selectedCategory;
        const matchesSearch =
          bike.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bike.series.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bike.specs.engine.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
        if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
        if (sortBy === 'power') return b.specs.powerHp - a.specs.powerHp;
        return 0; // featured default
      });
  }, [bikes, selectedCategory, searchQuery, sortBy]);

  const toggleCompare = (bike: Bike) => {
    setComparedBikeIds((prev) => {
      if (prev.includes(bike.id)) {
        return prev.filter((id) => id !== bike.id);
      }
      if (prev.length >= 3) {
        // limit to 3 bikes
        return [...prev.slice(1), bike.id];
      }
      return [...prev, bike.id];
    });
  };

  const comparedBikes = useMemo(() => {
    return bikes.filter((b) => comparedBikeIds.includes(b.id));
  }, [bikes, comparedBikeIds]);

  return (
    <section id="fleet" className="py-16 bg-zinc-950 border-b border-zinc-800/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
              2026 Collection
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Showroom Fleet
            </h2>
            <p className="mt-1 text-sm text-zinc-400 max-w-lg">
              Precision-tuned road and track machinery. Each motorcycle is dyno-certified and hand-inspected before showroom delivery.
            </p>
          </div>

          <div className="text-xs text-zinc-400 tabular-nums">
            Showing <span className="font-semibold text-white">{filteredBikes.length}</span> of {bikes.length} Models
          </div>
        </div>

        {/* Filter Bar & Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
          {/* Category Tabs (Segmented control) */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              All Fleet
            </button>
            <button
              onClick={() => setSelectedCategory('superbike')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === 'superbike'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Superbike / Track
            </button>
            <button
              onClick={() => setSelectedCategory('hypernaked')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === 'hypernaked'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Hypernaked
            </button>
            <button
              onClick={() => setSelectedCategory('adventure')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === 'adventure'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Adventure & Tourer
            </button>
            <button
              onClick={() => setSelectedCategory('electric')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === 'electric'
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              Electric Hyper
            </button>
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-60">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search models, engines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'power')}
                className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="featured">Featured Order</option>
                <option value="power">Highest Output (HP)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fleet Grid */}
        {filteredBikes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredBikes.map((bike) => (
              <BikeCard
                key={bike.id}
                bike={bike}
                onSelectConfigure={onSelectConfigure}
                onSelectTestRide={onSelectTestRide}
                onOpenQuickView={onOpenQuickView}
                onToggleCompare={toggleCompare}
                isCompared={comparedBikeIds.includes(bike.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-zinc-900 rounded-xl border border-zinc-800">
            <SlidersHorizontal className="w-8 h-8 text-zinc-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">No models match your filter</h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
              Try adjusting your search keyword or reset the category selection to view all showroom motorcycles.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Sticky Comparison Bar if items selected */}
        {comparedBikes.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-2xl bg-zinc-900/95 border border-amber-500/40 rounded-xl p-3.5 shadow-2xl backdrop-blur-md flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-400/10 text-amber-400 rounded-lg border border-amber-400/20">
                <Scale className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-semibold text-white">
                  {comparedBikes.length} of 3 Models Selected for Comparison
                </span>
                <div className="text-zinc-400 truncate max-w-xs sm:max-w-md">
                  {comparedBikes.map((b) => b.name).join(' vs ')}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setComparedBikeIds([])}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
                title="Clear comparison"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={() => onOpenCompare(comparedBikes)}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 rounded-lg hover:bg-amber-300 active:scale-95 transition-all shadow-sm"
              >
                <span>Compare Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
