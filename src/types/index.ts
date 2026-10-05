export type BikeCategory = 'all' | 'superbike' | 'hypernaked' | 'adventure' | 'electric';

export interface BikeSpec {
  engine: string;
  displacement: string;
  power: string; // e.g. "221 HP @ 15,250 rpm"
  powerHp: number;
  torque: string; // e.g. "112 Nm"
  acceleration: string; // "2.7s (0-60 mph)"
  accelerationSec: number;
  topSpeed: string; // "198 mph / 318 km/h"
  topSpeedMph: number;
  dryWeight: string; // "168 kg"
  seatHeight: string; // "835 mm"
  fuelOrBattery: string; // "16 L" or "22.5 kWh"
  transmission: string;
}

export interface ColorOption {
  name: string;
  hex: string;
  accentHex: string;
  extraCost: number;
}

export interface AccessoryOption {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'exhaust' | 'wheels' | 'electronics' | 'touring' | 'protection';
}

export interface Bike {
  id: string;
  name: string;
  series: string;
  category: 'superbike' | 'hypernaked' | 'adventure' | 'electric';
  tagline: string;
  description: string;
  basePrice: number;
  image: string;
  specs: BikeSpec;
  features: string[];
  colors: ColorOption[];
  accessories: AccessoryOption[];
  engineSound: {
    basePitch: number;
    maxPitch: number;
    cylinders: number;
    type: 'v4' | 'v-twin' | 'boxer' | 'electric';
  };
  inStock: boolean;
  featured?: boolean;
}

export interface TestRideBooking {
  id: string;
  bikeId: string;
  bikeName: string;
  location: string;
  date: string;
  timeSlot: string;
  riderName: string;
  email: string;
  phone: string;
  licenseTier: string;
  gearOption: 'provided' | 'own';
  experienceYears: string;
  confirmedAt: string;
}

export interface ConfiguredOrder {
  bikeId: string;
  bikeName: string;
  selectedColor: ColorOption;
  selectedAccessories: AccessoryOption[];
  basePrice: number;
  accessoriesTotal: number;
  colorExtra: number;
  totalPrice: number;
  depositAmount: number;
}
