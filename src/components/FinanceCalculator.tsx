import React, { useState, useMemo } from 'react';
import { Calculator, ShieldCheck, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { Bike } from '../types';

interface FinanceCalculatorProps {
  bikes: Bike[];
  selectedBikeId?: string;
  onSelectBike: (bike: Bike) => void;
}

export const FinanceCalculator: React.FC<FinanceCalculatorProps> = ({
  bikes,
  selectedBikeId,
  onSelectBike,
}) => {
  const currentBike = bikes.find((b) => b.id === selectedBikeId) || bikes[0];
  const [vehiclePrice, setVehiclePrice] = useState<number>(currentBike.basePrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(36);
  const [interestRateApr, setInterestRateApr] = useState<number>(5.9);
  const [showPreApprovalModal, setShowPreApprovalModal] = useState(false);
  const [preApprovalSuccess, setPreApprovalSuccess] = useState(false);

  // When model changes, update vehiclePrice
  const handleModelChange = (bikeId: string) => {
    const found = bikes.find((b) => b.id === bikeId);
    if (found) {
      onSelectBike(found);
      setVehiclePrice(found.basePrice);
    }
  };

  const downPaymentAmount = Math.round((vehiclePrice * downPaymentPercent) / 100);
  const loanPrincipal = Math.max(0, vehiclePrice - downPaymentAmount);

  // Monthly EMI Calculation
  const { monthlyPayment, totalPayment, totalInterest } = useMemo(() => {
    if (loanPrincipal <= 0) {
      return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
    }
    const monthlyRate = interestRateApr / 100 / 12;
    if (monthlyRate === 0) {
      const emi = loanPrincipal / loanTermMonths;
      return { monthlyPayment: Math.round(emi), totalPayment: loanPrincipal, totalInterest: 0 };
    }
    const factor = Math.pow(1 + monthlyRate, loanTermMonths);
    const emi = (loanPrincipal * monthlyRate * factor) / (factor - 1);
    const total = emi * loanTermMonths;
    const interest = total - loanPrincipal;

    return {
      monthlyPayment: Math.round(emi),
      totalPayment: Math.round(total),
      totalInterest: Math.round(interest),
    };
  }, [loanPrincipal, interestRateApr, loanTermMonths]);

  return (
    <section id="financing" className="py-16 bg-zinc-900 border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1 flex items-center gap-1.5">
              <Calculator className="w-4 h-4" />
              <span>Transparent Motor Financing</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Payment & Loan Calculator
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-lg">
              Tailor your down payment, interest rate, and term length with transparent APR financing through Apex Financial Services.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Competitive Tier-1 Bank Rates from 3.9% APR</span>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls */}
          <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6">
            {/* Bike Selection */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">
                Select Model to Price
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {bikes.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleModelChange(b.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      currentBike.id === b.id
                        ? 'bg-zinc-800 border-amber-400 text-white'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-semibold truncate">{b.name}</div>
                    <div className="text-[11px] font-mono text-amber-400/90 mt-0.5 tabular-nums">
                      ${b.basePrice.toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Vehicle Value Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-zinc-300">Vehicle Base Price</span>
                <span className="font-mono text-sm font-bold text-white tabular-nums">
                  ${vehiclePrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="45000"
                step="500"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
              />
            </div>

            {/* Down Payment Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-zinc-300">
                  Down Payment ({downPaymentPercent}%)
                </span>
                <span className="font-mono text-sm font-bold text-amber-400 tabular-nums">
                  ${downPaymentAmount.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span>10% ($ {((vehiclePrice * 0.1)).toLocaleString()})</span>
                <span>30%</span>
                <span>60% ($ {((vehiclePrice * 0.6)).toLocaleString()})</span>
              </div>
            </div>

            {/* Loan Tenure Selector */}
            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-2">
                Financing Tenure (Months)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[12, 24, 36, 48, 60].map((months) => (
                  <button
                    key={months}
                    onClick={() => setLoanTermMonths(months)}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all tabular-nums ${
                      loanTermMonths === months
                        ? 'bg-amber-400 text-black border-amber-400 font-bold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                    }`}
                  >
                    {months} mo
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-zinc-300">Estimated Annual Percentage Rate (APR)</span>
                <span className="font-mono text-sm font-bold text-white tabular-nums">
                  {interestRateApr.toFixed(1)}% APR
                </span>
              </div>
              <input
                type="range"
                min="3.9"
                max="11.9"
                step="0.1"
                value={interestRateApr}
                onChange={(e) => setInterestRateApr(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
              />
            </div>
          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-zinc-500 font-medium mb-1">
                Estimated Monthly Obligation
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl sm:text-5xl font-extrabold text-amber-400 tabular-nums">
                  ${monthlyPayment.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-zinc-400">/ month</span>
              </div>
              <div className="text-xs text-zinc-500 mt-1">
                Based on {loanTermMonths}-month term at {interestRateApr.toFixed(1)}% APR
              </div>

              {/* Breakdown Bars */}
              <div className="mt-6 pt-6 border-t border-zinc-800 space-y-3">
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Financed Amount (Principal):</span>
                  <span className="font-mono text-white tabular-nums">
                    ${loanPrincipal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Down Payment Paid Today:</span>
                  <span className="font-mono text-white tabular-nums">
                    ${downPaymentAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-zinc-400">
                  <span>Estimated Total Interest:</span>
                  <span className="font-mono text-zinc-300 tabular-nums">
                    ${totalInterest.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-semibold text-zinc-200 pt-2 border-t border-zinc-800">
                  <span>Total Payments Over Life of Loan:</span>
                  <span className="font-mono text-amber-400 tabular-nums">
                    ${(totalPayment + downPaymentAmount).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Visual Proportion Bar */}
              <div className="mt-4 h-2 w-full bg-zinc-800 rounded-full overflow-hidden flex">
                <div
                  className="bg-amber-400 h-full"
                  style={{ width: `${Math.round((loanPrincipal / (totalPayment || 1)) * 100)}%` }}
                  title="Principal"
                />
                <div
                  className="bg-red-500 h-full"
                  style={{ width: `${Math.round((totalInterest / (totalPayment || 1)) * 100)}%` }}
                  title="Interest"
                />
              </div>
              <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Principal
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Total Interest
                </span>
              </div>
            </div>

            {/* CTA Pre-approval */}
            <div className="pt-6 space-y-3">
              <button
                onClick={() => {
                  setShowPreApprovalModal(true);
                  setPreApprovalSuccess(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-lg shadow transition-colors"
              >
                <span>Apply for Instant Pre-Approval</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-zinc-500 text-center leading-tight">
                No impact to credit score for soft eligibility check. Financing provided via Apex Capital Partners.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Instant Pre-Approval Modal */}
      {showPreApprovalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowPreApprovalModal(false)}
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            {!preApprovalSuccess ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPreApprovalSuccess(true);
                }}
                className="space-y-4"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-amber-400 mb-1">
                    Pre-Approval Application
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Get Qualified in 60 Seconds
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Applying for: <span className="text-white font-medium">{currentBike.name}</span> (${monthlyPayment}/mo estimate)
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Legal Full Name</label>
                    <input
                      required
                      type="text"
                      defaultValue="Marcus Vance"
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Email Address</label>
                      <input
                        required
                        type="email"
                        defaultValue="marcus.vance@example.com"
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-300 mb-1">Phone Number</label>
                      <input
                        required
                        type="tel"
                        defaultValue="+1 (415) 555-0192"
                        className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Estimated Annual Income</label>
                    <select className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400">
                      <option>$75,000 - $100,000</option>
                      <option>$100,000 - $150,000</option>
                      <option>$150,000 - $250,000+</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors mt-2"
                >
                  Submit Soft Inquiry
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Conditionally Pre-Approved!
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1.5 leading-relaxed">
                    Congratulations. Your preliminary tier rating qualifies for <span className="text-amber-400 font-semibold">{interestRateApr.toFixed(1)}% APR</span> on the {currentBike.name}.
                  </p>
                </div>
                <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-left text-xs space-y-1">
                  <div className="text-zinc-400">Pre-Approval Code: <span className="font-mono text-white font-semibold">APX-FIN-7740-TIER1</span></div>
                  <div className="text-zinc-400">Monthly Target: <span className="font-mono text-amber-400 font-semibold">${monthlyPayment}/month</span></div>
                  <div className="text-zinc-400">Valid Through: <span className="text-zinc-300">30 Days from today</span></div>
                </div>
                <button
                  onClick={() => setShowPreApprovalModal(false)}
                  className="w-full py-2 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
