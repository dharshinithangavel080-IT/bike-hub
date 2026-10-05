import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle, ShieldCheck, Download, Check } from 'lucide-react';
import { Bike, TestRideBooking } from '../types';
import { SHOWROOM_LOCATIONS } from '../data/bikes';

interface TestRideModalProps {
  bikes: Bike[];
  selectedBike?: Bike;
  onClose: () => void;
  onBookingSuccess: (booking: TestRideBooking) => void;
}

export const TestRideModal: React.FC<TestRideModalProps> = ({
  bikes,
  selectedBike,
  onClose,
  onBookingSuccess,
}) => {
  const [bikeId, setBikeId] = useState(selectedBike?.id || bikes[0]?.id || '');
  const [locationId, setLocationId] = useState(SHOWROOM_LOCATIONS[0].id);
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:30 AM');
  const [riderName, setRiderName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [licenseTier, setLicenseTier] = useState('Class M / Full Unrestricted');
  const [experienceYears, setExperienceYears] = useState('5+ Years Experienced');
  const [gearOption, setGearOption] = useState<'provided' | 'own'>('provided');
  const [confirmedBooking, setConfirmedBooking] = useState<TestRideBooking | null>(null);

  const activeBike = bikes.find((b) => b.id === bikeId) || bikes[0];
  const activeLocation = SHOWROOM_LOCATIONS.find((l) => l.id === locationId) || SHOWROOM_LOCATIONS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riderName || !email || !phone) return;

    const booking: TestRideBooking = {
      id: `APX-TR-${Math.floor(1000 + Math.random() * 9000)}`,
      bikeId,
      bikeName: activeBike.name,
      location: activeLocation.name,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      riderName,
      email,
      phone,
      licenseTier,
      gearOption,
      experienceYears,
      confirmedAt: new Date().toLocaleDateString(),
    };

    setConfirmedBooking(booking);
    onBookingSuccess(booking);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl my-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmedBooking ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>VIP Test Ride Experience</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                Schedule Your Demonstration Ride
              </h2>
              <p className="mt-1 text-xs text-zinc-400">
                Experience full open-road performance or private track sessions with dedicated Apex factory technicians.
              </p>
            </div>

            {/* Step 1: Select Bike */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                1. Select Machine
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {bikes.map((b) => (
                  <button
                    type="button"
                    key={b.id}
                    onClick={() => setBikeId(b.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      bikeId === b.id
                        ? 'bg-zinc-800 border-amber-400 text-white ring-1 ring-amber-400'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-semibold truncate">{b.name}</div>
                    <div className="text-[10px] text-amber-400 font-mono mt-0.5 tabular-nums">
                      {b.specs.powerHp} HP · {b.specs.displacement}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Location */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                2. Showroom Location
              </label>
              <div className="space-y-2">
                {SHOWROOM_LOCATIONS.map((loc) => (
                  <div
                    key={loc.id}
                    onClick={() => setLocationId(loc.id)}
                    className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${
                      locationId === loc.id
                        ? 'bg-zinc-800/90 border-amber-400 text-white'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className={`w-4 h-4 ${locationId === loc.id ? 'text-amber-400' : 'text-zinc-500'}`} />
                      <div>
                        <div className="text-xs font-semibold text-white">{loc.name}</div>
                        <div className="text-[11px] text-zinc-400">{loc.address}</div>
                      </div>
                    </div>
                    {loc.hasDyno && (
                      <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-300">
                        Dyno Lab
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  3. Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                  4. Time Session
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {activeLocation.availableSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`px-2.5 py-1.5 text-xs rounded-lg border font-mono transition-colors ${
                        selectedTimeSlot === slot
                          ? 'bg-amber-400 text-black border-amber-400 font-semibold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 4: Rider Information & Gear */}
            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <div className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                5. Rider Credentials
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Liam Sterling"
                    value={riderName}
                    onChange={(e) => setRiderName(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="liam@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 012-3456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">License Tier</label>
                  <select
                    value={licenseTier}
                    onChange={(e) => setLicenseTier(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option>Class M / Full Unrestricted Motorcycle</option>
                    <option>International Riding Permit (Category A)</option>
                    <option>Pro Track Race License / FIM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">Riding Gear</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGearOption('provided')}
                      className={`p-2 rounded-lg text-xs border text-center transition-colors ${
                        gearOption === 'provided'
                          ? 'bg-zinc-800 border-amber-400 text-white'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      Loaner Gear (Apex Helmet & Jacket)
                    </button>
                    <button
                      type="button"
                      onClick={() => setGearOption('own')}
                      className={`p-2 rounded-lg text-xs border text-center transition-colors ${
                        gearOption === 'own'
                          ? 'bg-zinc-800 border-amber-400 text-white'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                      }`}
                    >
                      Bringing Own DOT/ECE Gear
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-lg shadow-lg shadow-amber-500/10 transition-colors"
              >
                Confirm VIP Test Ride Booking
              </button>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-500 mt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Complimentary test ride · Full comprehensive insurance coverage included</span>
              </div>
            </div>
          </form>
        ) : (
          /* Confirmation Ticket Card */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7 stroke-[3]" />
            </div>

            <div>
              <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
                VIP Pass Confirmed
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                See You On The Throttle!
              </h3>
              <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">
                A confirmation has been sent to <span className="text-white font-medium">{confirmedBooking.email}</span>. Your motorcycle and personal product specialist are scheduled.
              </p>
            </div>

            {/* Boarding-Pass Style Ticket */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-left space-y-4 max-w-lg mx-auto relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none" />

              <div className="flex justify-between items-baseline border-b border-zinc-800/80 pb-3">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Booking Reference</div>
                  <div className="font-mono text-base font-bold text-amber-400 tabular-nums">
                    {confirmedBooking.id}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Date & Time</div>
                  <div className="text-xs font-semibold text-white">
                    {confirmedBooking.date} @ {confirmedBooking.timeSlot}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">Assigned Machine</div>
                  <div className="font-semibold text-white mt-0.5">{confirmedBooking.bikeName}</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">Rider</div>
                  <div className="font-semibold text-white mt-0.5">{confirmedBooking.riderName}</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">Showroom Bay</div>
                  <div className="font-semibold text-white mt-0.5">{confirmedBooking.location}</div>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase">Equipment</div>
                  <div className="font-semibold text-amber-400 mt-0.5 capitalize">
                    {confirmedBooking.gearOption === 'provided' ? 'Apex Pro Loaner Kit' : 'Bringing Own Gear'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
              >
                Back to Showroom
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
