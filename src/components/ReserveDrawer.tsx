import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, CheckCircle2, ShoppingBag, Truck } from 'lucide-react';
import { ConfiguredOrder } from '../types';

interface ReserveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: ConfiguredOrder[];
  onRemoveOrder: (index: number) => void;
  onClearCart: () => void;
}

export const ReserveDrawer: React.FC<ReserveDrawerProps> = ({
  isOpen,
  onClose,
  orders,
  onRemoveOrder,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'showroom' | 'enclosed-home' | 'trackday'>('showroom');
  const [lastOrderNumber, setLastOrderNumber] = useState('');

  if (!isOpen) return null;

  const totalDeposit = orders.reduce((sum, o) => sum + o.depositAmount, 0);
  const totalVehicleValue = orders.reduce((sum, o) => sum + o.totalPrice, 0);

  const handlePlaceReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNum = `APX-RES-${Math.floor(100000 + Math.random() * 900000)}`;
    setLastOrderNumber(orderNum);
    setCheckoutStep('success');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-900 border-l border-zinc-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-display text-lg font-bold text-white">
                {checkoutStep === 'success' ? 'Reservation Confirmed' : 'Saved Builds & Reservation'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto flex-1">
            {checkoutStep === 'cart' && (
              <>
                {orders.length === 0 ? (
                  <div className="py-16 text-center text-zinc-500 space-y-3">
                    <ShoppingBag className="w-12 h-12 mx-auto stroke-1 text-zinc-600" />
                    <div className="text-sm font-medium text-zinc-300">Your reservation cart is empty</div>
                    <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                      Configure your dream motorcycle in our 3D Studio and reserve your build allocation with a refundable $500 deposit.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 rounded-lg hover:bg-amber-300"
                    >
                      Browse Fleet
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order, idx) => (
                      <div
                        key={idx}
                        className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 space-y-3 relative group"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-xs font-semibold text-white">
                              {order.bikeName}
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-0.5">
                              <span
                                className="w-2.5 h-2.5 rounded-full inline-block"
                                style={{ backgroundColor: order.selectedColor.hex }}
                              />
                              <span>{order.selectedColor.name}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => onRemoveOrder(idx)}
                            className="text-zinc-500 hover:text-red-400 p-1"
                            title="Remove build"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Accessories list */}
                        {order.selectedAccessories.length > 0 && (
                          <div className="text-[11px] text-zinc-400 bg-zinc-900/60 rounded-lg p-2 space-y-1">
                            <div className="font-semibold text-zinc-300">Installed Packages:</div>
                            {order.selectedAccessories.map((acc) => (
                              <div key={acc.id} className="flex justify-between text-zinc-400">
                                <span className="truncate pr-2">· {acc.name}</span>
                                <span className="font-mono tabular-nums">+${acc.price}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex justify-between items-center text-xs pt-2 border-t border-zinc-900">
                          <div>
                            <div className="text-[10px] text-zinc-500 uppercase">Total Vehicle Price</div>
                            <div className="font-mono text-white font-bold tabular-nums">
                              ${order.totalPrice.toLocaleString()}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-[10px] text-zinc-500 uppercase">Deposit Today</div>
                            <div className="font-mono text-amber-400 font-bold tabular-nums">
                              ${order.depositAmount}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {checkoutStep === 'checkout' && (
              <form id="reservation-form" onSubmit={handlePlaceReservation} className="space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  Rider & Allocation Details
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Marcus Sterling"
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="marcus@apex.com"
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+1 (415) 555-0199"
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Handover Method</label>
                  <div className="space-y-2 text-xs">
                    <label
                      className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                        deliveryMethod === 'showroom' ? 'bg-zinc-800 border-amber-400 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'showroom'}
                        onChange={() => setDeliveryMethod('showroom')}
                        className="accent-amber-400"
                      />
                      <span>Flagship Showroom VIP Handover (Free)</span>
                    </label>

                    <label
                      className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                        deliveryMethod === 'enclosed-home' ? 'bg-zinc-800 border-amber-400 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'enclosed-home'}
                        onChange={() => setDeliveryMethod('enclosed-home')}
                        className="accent-amber-400"
                      />
                      <span>White-Glove Enclosed Carrier to Doorstep</span>
                    </label>

                    <label
                      className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                        deliveryMethod === 'trackday' ? 'bg-zinc-800 border-amber-400 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'trackday'}
                        onChange={() => setDeliveryMethod('trackday')}
                        className="accent-amber-400"
                      />
                      <span>Laguna Seca Trackday Delivery with Race Tech</span>
                    </label>
                  </div>
                </div>

                <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between text-zinc-400">
                    <span>Due Now (100% Refundable Deposit):</span>
                    <span className="font-mono text-amber-400 font-bold tabular-nums">${totalDeposit} USD</span>
                  </div>
                  <div className="text-[11px] text-zinc-500">
                    Remaining balance ($ {(totalVehicleValue - totalDeposit).toLocaleString()}) due upon vehicle delivery inspection.
                  </div>
                </div>
              </form>
            )}

            {checkoutStep === 'success' && (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold text-amber-400 tracking-wider">
                    Allocation Secured
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mt-1">
                    Your Machine is in Queue
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Order Ref: <span className="font-mono font-bold text-white">{lastOrderNumber}</span>
                  </p>
                </div>
                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-left text-xs space-y-2">
                  <div className="text-zinc-300 font-medium">Next Steps:</div>
                  <div className="text-zinc-400">1. Dedicated production concierge assigns your chassis VIN.</div>
                  <div className="text-zinc-400">2. Dyno run video and build certificates delivered via portal.</div>
                  <div className="text-zinc-400">3. Scheduled handover delivery confirmation.</div>
                </div>
                <button
                  onClick={() => {
                    setCheckoutStep('cart');
                    onClose();
                  }}
                  className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
                >
                  Return to Showroom
                </button>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {checkoutStep !== 'success' && orders.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-950 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-zinc-400">Total Refundable Deposit:</span>
                <span className="font-display text-xl font-bold text-amber-400 tabular-nums">
                  ${totalDeposit} USD
                </span>
              </div>

              {checkoutStep === 'cart' ? (
                <button
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
                >
                  <span>Proceed to Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="py-2.5 px-3 text-xs font-semibold uppercase text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-white"
                  >
                    Back to Builds
                  </button>
                  <button
                    type="submit"
                    form="reservation-form"
                    className="py-2.5 px-3 text-xs font-bold uppercase text-black bg-amber-400 hover:bg-amber-300 rounded-lg"
                  >
                    Confirm ($ {totalDeposit})
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>Zero Risk · Cancel anytime prior to delivery for 100% refund</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
