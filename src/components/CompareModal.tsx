import React from 'react';
import { X, Scale, SlidersHorizontal, Calendar, Check, Minus } from 'lucide-react';
import { Bike } from '../types';

interface CompareModalProps {
  bikes: Bike[];
  onClose: () => void;
  onSelectConfigure: (bike: Bike) => void;
  onSelectTestRide: (bike: Bike) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  bikes,
  onClose,
  onSelectConfigure,
  onSelectTestRide,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl my-8 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-white">
                Technical Specification Matrix
              </h2>
              <div className="text-xs text-zinc-400">
                Direct benchmark comparison across {bikes.length} machine architectures
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="p-6 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-4 px-3 text-zinc-500 uppercase tracking-wider font-semibold w-40">
                  Model
                </th>
                {bikes.map((bike) => (
                  <th key={bike.id} className="py-4 px-4 align-top min-w-[200px]">
                    <div className="space-y-2">
                      <img
                        src={bike.image}
                        alt={bike.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-28 object-cover rounded-lg bg-zinc-950 border border-zinc-800"
                      />
                      <div className="font-display text-sm font-bold text-white">
                        {bike.name}
                      </div>
                      <div className="font-mono text-amber-400 font-bold text-base tabular-nums">
                        ${bike.basePrice.toLocaleString()}{' '}
                        <span className="text-[10px] text-zinc-500 font-normal">MSRP</span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              <tr>
                <td className="py-3 px-3 text-zinc-400 font-medium">Category</td>
                {bikes.map((b) => (
                  <td key={b.id} className="py-3 px-4 text-white capitalize font-medium">
                    {b.category}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-3 text-zinc-400 font-medium">Engine / Motor</td>
                {bikes.map((b) => (
                  <td key={b.id} className="py-3 px-4 text-zinc-200">
                    {b.specs.engine}
                  </td>
                ))}
              </tr>

              <tr className="bg-zinc-950/40">
                <td className="py-3 px-3 text-amber-400 font-semibold">Peak Power</td>
                {bikes.map((b) => (
                  <td key={b.id} className="py-3 px-4 font-mono font-bold text-amber-400 tabular-nums">
                    {b.specs.power}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-3 text-zinc-400 font-medium">Torque</td>
                {bikes.map((b) => (
                  <td key={b.id} className="py-3 px-4 font-mono text-zinc-200 tabular-nums">
                    {b.specs.torque}
                  </td>
                ))}
              </tr>

              <tr className="bg-zinc-950/40">
                <td className="py-3 px-3 text-zinc-400 font-medium">0–60 MPH Sprint</td>
                {bikes.map((b) => (
                  <td key={b.id} className="py-3 px-4 font-mono text-white font-semibold tabular-nums">
                    {b.specs.acceleration}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-3 text-zinc-400 font-medium">Top Velocity</td>
                {bikes.map((b) => (
                  <td key={b.id} className="py-3 px-4 font-mono text-zinc-200 tabular-nums">
                    {b.specs.topSpeed}
                  </td>
                ))}
              </tr>

              <tr className="bg-zinc-950/40">
                <td className="py-3 px-3 text-zinc-400 font-medium">Dry Weight</td>
                {bikes.map((b) => (
                  <td key={b.id} className="py-3 px-4 font-mono text-zinc-200 tabular-nums">
                    {b.specs.dryWeight}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-3 text-zinc-400 font-medium">Seat Height</td>
                {bikes.map((b) => (
                  <td key={b.id} className="py-3 px-4 font-mono text-zinc-300 tabular-nums">
                    {b.specs.seatHeight}
                  </td>
                ))}
              </tr>

              <tr className="bg-zinc-950/40">
                <td className="py-3 px-3 text-zinc-400 font-medium">Fuel / Battery Capacity</td>
                {bikes.map((b) => (
                  <td key={b.id} className="py-3 px-4 text-zinc-300">
                    {b.specs.fuelOrBattery}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-3 text-zinc-400 font-medium">Transmission</td>
                {bikes.map((b) => (
                  <td key={b.id} className="py-3 px-4 text-zinc-300">
                    {b.specs.transmission}
                  </td>
                ))}
              </tr>

              {/* Direct Actions row */}
              <tr className="border-t border-zinc-800">
                <td className="py-4 px-3 text-zinc-500 uppercase tracking-wider font-semibold">
                  Actions
                </td>
                {bikes.map((b) => (
                  <td key={b.id} className="py-4 px-4">
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectConfigure(b);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5" />
                        <span>Configure</span>
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          onSelectTestRide(b);
                        }}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Book Ride</span>
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
