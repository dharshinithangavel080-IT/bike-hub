import React, { useState, useMemo } from 'react';
import { Check, Flame, SlidersHorizontal, Calendar, ArrowRight, Shield, Download, Copy } from 'lucide-react';
import { Bike, ColorOption, AccessoryOption, ConfiguredOrder } from '../types';
import { AudioRevControl } from './AudioRevControl';

interface BikeConfiguratorProps {
  bikes: Bike[];
  initialBike?: Bike;
  onClose?: () => void;
  onSaveToCart: (order: ConfiguredOrder) => void;
  onBookTestRide: (bike: Bike) => void;
}

export const BikeConfigurator: React.FC<BikeConfiguratorProps> = ({
  bikes,
  initialBike,
  onClose,
  onSaveToCart,
  onBookTestRide,
}) => {
  const [selectedBike, setSelectedBike] = useState<Bike>(initialBike || bikes[0]);
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    selectedBike.colors[0] || { name: 'Standard Trim', hex: '#18181b', accentHex: '#27272a', extraCost: 0 }
  );
  const [selectedAccessories, setSelectedAccessories] = useState<AccessoryOption[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);

  // When bike changes, reset color & accessories
  const handleSelectBike = (bike: Bike) => {
    setSelectedBike(bike);
    setSelectedColor(bike.colors[0]);
    setSelectedAccessories([]);
  };

  const toggleAccessory = (acc: AccessoryOption) => {
    setSelectedAccessories((prev) => {
      const exists = prev.some((a) => a.id === acc.id);
      if (exists) {
        return prev.filter((a) => a.id !== acc.id);
      }
      return [...prev, acc];
    });
  };

  const accessoriesTotal = useMemo(() => {
    return selectedAccessories.reduce((sum, item) => sum + item.price, 0);
  }, [selectedAccessories]);

  const totalPrice = selectedBike.basePrice + (selectedColor?.extraCost || 0) + accessoriesTotal;
  const depositAmount = 500;

  const handleReserve = () => {
    const order: ConfiguredOrder = {
      bikeId: selectedBike.id,
      bikeName: selectedBike.name,
      selectedColor,
      selectedAccessories,
      basePrice: selectedBike.basePrice,
      accessoriesTotal,
      colorExtra: selectedColor?.extraCost || 0,
      totalPrice,
      depositAmount,
    };
    onSaveToCart(order);
  };

  const copyBuildCode = () => {
    const buildCode = `APX-${selectedBike.id.slice(0, 4).toUpperCase()}-${selectedColor.name.slice(0, 3).toUpperCase()}-${selectedAccessories.length}ACC`;
    navigator.clipboard?.writeText?.(buildCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Interactive 3D Studio</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Apex Custom Studio
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Tailor fairing liveries, performance exhausts, forged carbon components, and race telemetry for factory delivery.
            </p>
          </div>

          {/* Model Switcher Dropdown / Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {bikes.map((b) => (
              <button
                key={b.id}
                onClick={() => handleSelectBike(b)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors whitespace-nowrap ${
                  selectedBike.id === b.id
                    ? 'bg-amber-400 text-black shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Configurator Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Canvas: Visual Stage & Audio Rev */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 p-6 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px]">
              {/* Dynamic ambient color glow matching selected color */}
              <div
                className="absolute inset-0 opacity-20 blur-3xl pointer-events-none transition-colors duration-700"
                style={{ backgroundColor: selectedColor.hex }}
              />

              <img
                src={selectedBike.image}
                alt={`${selectedBike.name} - ${selectedColor.name}`}
                referrerPolicy="no-referrer"
                className="relative z-10 w-full max-h-[360px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] transition-all duration-500"
              />

              {/* Color Accent Badge Overlay */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-zinc-900/90 border border-zinc-700/80 px-3 py-1.5 rounded-lg backdrop-blur-md text-xs">
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <span className="font-medium text-white">{selectedColor.name}</span>
                {selectedColor.extraCost > 0 && (
                  <span className="text-amber-400 font-mono tabular-nums">+${selectedColor.extraCost}</span>
                )}
              </div>

              {/* Specs Quick Banner */}
              <div className="absolute bottom-4 left-4 right-4 z-20 grid grid-cols-3 gap-2 bg-zinc-950/80 border border-zinc-800/80 rounded-xl p-3 backdrop-blur-md text-center">
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Engine Power</div>
                  <div className="font-display text-sm font-bold text-white tabular-nums">{selectedBike.specs.powerHp} HP</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider">0–60 MPH</div>
                  <div className="font-display text-sm font-bold text-white tabular-nums">{selectedBike.specs.acceleration}</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Dry Weight</div>
                  <div className="font-display text-sm font-bold text-white tabular-nums">{selectedBike.specs.dryWeight}</div>
                </div>
              </div>
            </div>

            {/* Interactive Audio Rev Controller */}
            <div>
              <AudioRevControl
                engineType={selectedBike.engineSound.type}
                bikeName={selectedBike.name}
              />
            </div>
          </div>

          {/* Right Column: Customization Controls & Pricing Summary */}
          <div className="lg:col-span-5 space-y-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-amber-400 mb-1">
                Step 01. Factory Livery & Color
              </div>
              <h3 className="text-sm font-medium text-zinc-300 mb-3">
                Select bespoke tank & fairing paint finish
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {selectedBike.colors.map((color) => {
                  const isSelected = selectedColor.name === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`flex flex-col items-center p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-zinc-800 border-amber-400 ring-1 ring-amber-400'
                          : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <span
                        className="w-7 h-7 rounded-full border border-white/20 mb-2 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs font-medium text-white truncate w-full">
                        {color.name}
                      </span>
                      <span className="text-[11px] text-zinc-400 font-mono mt-0.5 tabular-nums">
                        {color.extraCost === 0 ? 'Included' : `+$${color.extraCost}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 02: Performance Packages */}
            <div className="pt-4 border-t border-zinc-800">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-amber-400 mb-0.5">
                    Step 02. Factory Accessories & Upgrades
                  </div>
                  <div className="text-xs text-zinc-400">
                    Precision bolt-on performance packages
                  </div>
                </div>
                <div className="text-xs text-zinc-400 tabular-nums">
                  {selectedAccessories.length} Selected
                </div>
              </div>

              <div className="space-y-2.5">
                {selectedBike.accessories.map((acc) => {
                  const isSelected = selectedAccessories.some((a) => a.id === acc.id);
                  return (
                    <div
                      key={acc.id}
                      onClick={() => toggleAccessory(acc)}
                      className={`cursor-pointer flex items-center justify-between p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-400/80 text-white'
                          : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1 pr-2">
                        <div
                          className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isSelected
                              ? 'bg-amber-400 border-amber-400 text-black'
                              : 'border-zinc-700 bg-zinc-900'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white leading-tight">
                            {acc.name}
                          </div>
                          <div className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                            {acc.description}
                          </div>
                        </div>
                      </div>

                      <div className="font-mono text-xs font-semibold text-amber-400 whitespace-nowrap tabular-nums">
                        +${acc.price.toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price Ledger & Action Module */}
            <div className="pt-5 border-t border-zinc-800 space-y-3">
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Base MSRP ({selectedBike.name}):</span>
                  <span className="font-mono text-zinc-200 tabular-nums">
                    ${selectedBike.basePrice.toLocaleString()}
                  </span>
                </div>
                {selectedColor.extraCost > 0 && (
                  <div className="flex justify-between">
                    <span>Paint Finish ({selectedColor.name}):</span>
                    <span className="font-mono text-zinc-200 tabular-nums">
                      +${selectedColor.extraCost.toLocaleString()}
                    </span>
                  </div>
                )}
                {accessoriesTotal > 0 && (
                  <div className="flex justify-between">
                    <span>Selected Packages ({selectedAccessories.length}):</span>
                    <span className="font-mono text-zinc-200 tabular-nums">
                      +${accessoriesTotal.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-zinc-800 text-base font-bold text-white">
                  <span>Total Vehicle Price:</span>
                  <span className="font-display text-amber-400 tabular-nums">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-emerald-400 font-medium">
                  <span>Refundable Reservation Deposit:</span>
                  <span className="font-mono tabular-nums">${depositAmount} USD</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleReserve}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 active:scale-98 rounded-lg shadow-md transition-all"
                >
                  <span>Reserve Build (${depositAmount} Deposit)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onBookTestRide(selectedBike)}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-zinc-300 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:text-white rounded-lg transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Test Ride Spec</span>
                  </button>

                  <button
                    onClick={copyBuildCode}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-zinc-300 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 hover:text-white rounded-lg transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{copiedCode ? 'Code Copied!' : 'Share Build Code'}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 pt-1">
                <Shield className="w-3.5 h-3.5 text-zinc-400" />
                <span>100% Fully Refundable Deposit · Priority Delivery Queue</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
