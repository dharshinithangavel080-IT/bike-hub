import React, { useState } from 'react';
import { BIKES } from './data/bikes';
import { Bike, ConfiguredOrder, TestRideBooking } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FleetCatalog } from './components/FleetCatalog';
import { BikeConfigurator } from './components/BikeConfigurator';
import { FinanceCalculator } from './components/FinanceCalculator';
import { ShowroomLocations } from './components/ShowroomLocations';
import { TestRideModal } from './components/TestRideModal';
import { CompareModal } from './components/CompareModal';
import { QuickViewModal } from './components/QuickViewModal';
import { ReserveDrawer } from './components/ReserveDrawer';
import { Footer } from './components/Footer';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [testRideOpen, setTestRideOpen] = useState(false);
  const [selectedBikeForTestRide, setSelectedBikeForTestRide] = useState<Bike | undefined>(undefined);

  const [configuratorBike, setConfiguratorBike] = useState<Bike | undefined>(undefined);
  const [showConfiguratorSection, setShowConfiguratorSection] = useState(true);

  const [quickViewBike, setQuickViewBike] = useState<Bike | null>(null);

  const [compareBikes, setCompareBikes] = useState<Bike[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const [cartOrders, setCartOrders] = useState<ConfiguredOrder[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  const [financeSelectedBikeId, setFinanceSelectedBikeId] = useState<string>(BIKES[0].id);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleOpenTestRide = (bike?: Bike) => {
    setSelectedBikeForTestRide(bike || BIKES[0]);
    setTestRideOpen(true);
  };

  const handleSelectConfigure = (bike: Bike) => {
    setConfiguratorBike(bike);
    setShowConfiguratorSection(true);
    // Smooth scroll to configurator section
    const elem = document.getElementById('configurator-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCompare = (bikesList: Bike[]) => {
    setCompareBikes(bikesList);
    setCompareModalOpen(true);
  };

  const handleSaveToCart = (order: ConfiguredOrder) => {
    setCartOrders((prev) => [...prev, order]);
    setCartDrawerOpen(true);
    showToast(`Added ${order.bikeName} build reservation to cart`);
  };

  const handleRemoveOrder = (idx: number) => {
    setCartOrders((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleClearCart = () => {
    setCartOrders([]);
  };

  const handleBookingSuccess = (booking: TestRideBooking) => {
    showToast(`VIP demonstration confirmed for ${booking.bikeName} on ${booking.date}`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Banner Notice */}
      <div className="bg-zinc-900 border-b border-zinc-800 text-[11px] py-1.5 px-4 text-center text-zinc-400">
        <span className="text-amber-400 font-semibold uppercase tracking-wider">Spring 2026 Fleet Allocation Now Open</span>
        <span className="mx-2 text-zinc-600">·</span>
        <span>Complimentary Track Delivery on all V-Series Superbikes</span>
        <span className="mx-2 text-zinc-600">·</span>
        <a href="#fleet" className="text-zinc-200 hover:text-amber-400 underline font-medium">Explore All 4 Flagship Models</a>
      </div>

      {/* Top Bar Navigation */}
      <Navbar
        onOpenTestRide={() => handleOpenTestRide()}
        onOpenConfigurator={() => {
          const elem = document.getElementById('configurator-section');
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenCart={() => setCartDrawerOpen(true)}
        cartCount={cartOrders.length}
      />

      <main className="flex-1">
        {/* Hero Showcase with live sound demo */}
        <Hero
          onOpenTestRide={() => handleOpenTestRide(BIKES[0])}
          onOpenConfigurator={() => handleSelectConfigure(BIKES[0])}
        />

        {/* Fleet Catalog & Model Matrix */}
        <FleetCatalog
          bikes={BIKES}
          onSelectConfigure={handleSelectConfigure}
          onSelectTestRide={handleOpenTestRide}
          onOpenQuickView={(b) => setQuickViewBike(b)}
          onOpenCompare={handleOpenCompare}
        />

        {/* 3D Custom Configurator Studio */}
        <div id="configurator-section">
          <BikeConfigurator
            bikes={BIKES}
            initialBike={configuratorBike || BIKES[0]}
            onSaveToCart={handleSaveToCart}
            onBookTestRide={(bike) => handleOpenTestRide(bike)}
          />
        </div>

        {/* Financing & Payment Calculator */}
        <FinanceCalculator
          bikes={BIKES}
          selectedBikeId={financeSelectedBikeId}
          onSelectBike={(b) => setFinanceSelectedBikeId(b.id)}
        />

        {/* Showroom Hubs & Dyno Testing Bay */}
        <ShowroomLocations
          onScheduleVisit={(locName) => {
            handleOpenTestRide(BIKES[0]);
          }}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenTestRide={() => handleOpenTestRide()}
        onOpenConfigurator={() => {
          const elem = document.getElementById('configurator-section');
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* Test Ride Booking Wizard Modal */}
      {testRideOpen && (
        <TestRideModal
          bikes={BIKES}
          selectedBike={selectedBikeForTestRide}
          onClose={() => setTestRideOpen(false)}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Side-by-Side Compare Modal */}
      {compareModalOpen && (
        <CompareModal
          bikes={compareBikes.length > 0 ? compareBikes : BIKES.slice(0, 2)}
          onClose={() => setCompareModalOpen(false)}
          onSelectConfigure={(b) => {
            setCompareModalOpen(false);
            handleSelectConfigure(b);
          }}
          onSelectTestRide={(b) => {
            setCompareModalOpen(false);
            handleOpenTestRide(b);
          }}
        />
      )}

      {/* Quick Specs Modal */}
      {quickViewBike && (
        <QuickViewModal
          bike={quickViewBike}
          onClose={() => setQuickViewBike(null)}
          onConfigure={(b) => {
            setQuickViewBike(null);
            handleSelectConfigure(b);
          }}
          onTestRide={(b) => {
            setQuickViewBike(null);
            handleOpenTestRide(b);
          }}
        />
      )}

      {/* Reservation & Cart Drawer */}
      <ReserveDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        orders={cartOrders}
        onRemoveOrder={handleRemoveOrder}
        onClearCart={handleClearCart}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-amber-500/50 text-white text-xs px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
