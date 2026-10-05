import { Bike } from '../types';

export const BIKES: Bike[] = [
  {
    id: 'apex-corsa-1199',
    name: 'Apex Corsa 1199 RR',
    series: 'V-Series Track Flagship',
    category: 'superbike',
    tagline: 'Pure aerodynamic velocity and race-bred Desmo engineering',
    description: 'Developed in wind tunnels and refined on championship circuits. The Apex Corsa 1199 RR combines a 998cc Stradale V4 powerplant with bi-plane carbon winglets producing 38 kg of downforce at 160 mph. Fitted with Öhlins Smart EC 2.0 semi-active suspension and Brembo Stylema R monobloc calipers.',
    basePrice: 26400,
    image: '/src/assets/images/hero_superbike_flagship_1791195636041.jpg',
    inStock: true,
    featured: true,
    specs: {
      engine: '998cc 16V 90° V4 Desmo',
      displacement: '998 cc',
      power: '221 HP @ 15,250 rpm',
      powerHp: 221,
      torque: '112 Nm @ 11,500 rpm',
      acceleration: '2.7s (0-60 mph)',
      accelerationSec: 2.7,
      topSpeed: '198 mph (318 km/h)',
      topSpeedMph: 198,
      dryWeight: '168 kg',
      seatHeight: '835 mm',
      fuelOrBattery: '16 L Titanium Tank',
      transmission: '6-Speed with Bi-Directional EVO Quickshifter',
    },
    features: [
      'Carbon Aerodynamic Bi-Plane Winglets (38kg downforce)',
      'Öhlins Smart EC 2.0 Electronic Semi-Active Suspension',
      'Brembo Stylema R Radial 4-Piston Monobloc Calipers',
      'Bosch 6-Axis Inertial Measurement Unit (IMU)',
      'TFT 5-inch Full Color Cockpit with Track Lap Timer',
      'Engine Brake Control EVO 2 and Slide Slip Angle Control'
    ],
    colors: [
      { name: 'Racing Rosso Red', hex: '#dc2626', accentHex: '#991b1b', extraCost: 0 },
      { name: 'Carbon Stealth Obsidian', hex: '#18181b', accentHex: '#27272a', extraCost: 850 },
      { name: 'Alpine Frost White', hex: '#f4f4f5', accentHex: '#e4e4e7', extraCost: 450 }
    ],
    accessories: [
      { id: 'acc-exhaust-akra', name: 'Akrapovič Full Titanium Race Exhaust', description: 'Reduces 5.5 kg weight, adds +9 HP, track DB killer included', price: 2850, category: 'exhaust' },
      { id: 'acc-wheels-carbon', name: 'BST Carbon Fiber 5-Spoke Forged Wheels', description: 'Reduces unsprung rotational inertia by 32% for lightning turn-in', price: 3400, category: 'wheels' },
      { id: 'acc-aero-pro', name: 'High-Downforce Aero Winglet Extension Kit', description: 'Autoclaved dry carbon fiber wing extensions', price: 920, category: 'protection' },
      { id: 'acc-track-telemetry', name: 'Apex GPS Data Logger & Telemetry Hub', description: 'Sector time mapping, lean angle sensor, brake pressure logger', price: 780, category: 'electronics' }
    ],
    engineSound: {
      basePitch: 110,
      maxPitch: 480,
      cylinders: 4,
      type: 'v4'
    }
  },
  {
    id: 'apex-nemesis-1200',
    name: 'Apex Nemesis 1200 Hypernaked',
    series: 'Streetfighter Aggressor',
    category: 'hypernaked',
    tagline: 'Raw visceral street presence and torque on tap from 2,500 RPM',
    description: 'Stripped of fairings and unapologetic in its stance. The Nemesis 1200 exposes its bronze trellis frame and massive twin cylinder power unit. Wide tapered aluminum handlebars and upright ergonomics deliver precision control whether cutting through metropolitan canyons or carving alpine passes.',
    basePrice: 19800,
    image: '/src/assets/images/bike_hypernaked_street_1791195654112.jpg',
    inStock: true,
    featured: true,
    specs: {
      engine: '1,190cc High-Torque 75° V-Twin',
      displacement: '1,190 cc',
      power: '180 HP @ 9,750 rpm',
      powerHp: 180,
      torque: '128 Nm @ 6,800 rpm',
      acceleration: '2.9s (0-60 mph)',
      accelerationSec: 2.9,
      topSpeed: '174 mph (280 km/h)',
      topSpeedMph: 174,
      dryWeight: '178 kg',
      seatHeight: '825 mm',
      fuelOrBattery: '17 L Sculpted Steel Tank',
      transmission: '6-Speed Slipper Clutch with Auto-Blipper',
    },
    features: [
      'Exposed Bronze Tubular Trellis Chassis Architecture',
      'Dual Projector LED Mask with Integrated Daytime Running Light',
      'WP APEX Pro 48mm Fully Adjustable USD Forks',
      'Cornering ABS EVO with Supermoto Drift Slip Mode',
      'Ride-by-Wire with 4 Ride Modes (Rain, Street, Sport, Track)',
      'Brembo M50 Calipers with Twin 320mm Floating Discs'
    ],
    colors: [
      { name: 'Matte Carbon Bronze', hex: '#27272a', accentHex: '#d97706', extraCost: 0 },
      { name: 'Acid Cyber Yellow', hex: '#ca8a04', accentHex: '#a16207', extraCost: 550 },
      { name: 'Liquid Gunmetal Grey', hex: '#4b5563', accentHex: '#374151', extraCost: 350 }
    ],
    accessories: [
      { id: 'acc-nem-slipon', name: 'SC-Project Dual High-Exit Carbon Silencer', description: 'Deep bass acoustic signature with titanium mesh end-cap', price: 1450, category: 'exhaust' },
      { id: 'acc-nem-bar-mirrors', name: 'Billet Aluminum Bar-End Mirror & Lever Guard Kit', description: 'CNC machined from aircraft 7075-T6 aluminum billet', price: 380, category: 'protection' },
      { id: 'acc-nem-quickshift', name: 'Apex Factory Quickshifter+ Auto Blipper', description: 'Seamless clutchless up and downshifts', price: 620, category: 'electronics' },
      { id: 'acc-nem-crash-cage', name: 'Street Frame Sliders & Engine Stator Guard', description: 'High-density Delrin pucks with steel reinforcements', price: 420, category: 'protection' }
    ],
    engineSound: {
      basePitch: 85,
      maxPitch: 360,
      cylinders: 2,
      type: 'v-twin'
    }
  },
  {
    id: 'apex-trans-atlas-1250',
    name: 'Apex Trans-Atlas 1250',
    series: 'Continental Rally Tourer',
    category: 'adventure',
    tagline: 'Cross continents, conquer gravel trails, and ride without limits',
    description: 'Engineered for the long overland route. Featuring dynamic electronic damping that continually recalculates surface conditions 100 times per second. Equipped with an ergonomic heated comfort saddle, electric touring windscreen, and high-tensile spoke tubeless wheels ready for rough backcountry expeditions.',
    basePrice: 22500,
    image: '/src/assets/images/bike_adventure_tourer_1791195668231.jpg',
    inStock: true,
    featured: true,
    specs: {
      engine: '1,254cc ShiftCam Twin Boxer',
      displacement: '1,254 cc',
      power: '152 HP @ 7,750 rpm',
      powerHp: 152,
      torque: '143 Nm @ 6,250 rpm',
      acceleration: '3.3s (0-60 mph)',
      accelerationSec: 3.3,
      topSpeed: '145 mph (233 km/h)',
      topSpeedMph: 145,
      dryWeight: '232 kg',
      seatHeight: '850 - 870 mm (Adjustable)',
      fuelOrBattery: '30 L Long-Range Adventure Tank',
      transmission: '6-Speed Shaft Drive Maintenance-Free',
    },
    features: [
      '30-Liter Long-Range Fuel Tank (Over 380 Miles Range)',
      'Shaft-Drive Enclosed Maintenance-Free Powertrain',
      'Electronic Dynamic ESA Suspension with Auto Load Leveling',
      'Dual 7-inch TFT Navigation & Smartphone Connectivity',
      'Heated Grips, Heated Dual Seats & Heated Rider Backrest',
      'Tubeless Cross-Spoke Rims with Anodized Gold Flanges'
    ],
    colors: [
      { name: 'Alpine Glacier White', hex: '#e4e4e7', accentHex: '#2563eb', extraCost: 0 },
      { name: 'Kalahari Desert Sand', hex: '#d4b996', accentHex: '#78350f', extraCost: 600 },
      { name: 'Nordic Slate Black', hex: '#18181b', accentHex: '#52525b', extraCost: 400 }
    ],
    accessories: [
      { id: 'acc-tour-panniers', name: 'Touratech Aluminum Dual Pannier & Top Box Set (112L)', description: 'Waterproof lockable cases with quick-release mounting racks', price: 2100, category: 'touring' },
      { id: 'acc-tour-lights', name: 'High-Lumen Fog & Auxiliary LED Spotlights', description: '4,800 Lumens wide-beam with cockpit illuminated toggle', price: 540, category: 'protection' },
      { id: 'acc-tour-skid', name: 'Heavy-Duty 5mm Billet Sump & Skid Plate', description: 'Protects engine casing and exhaust headers over rocky obstacles', price: 480, category: 'protection' },
      { id: 'acc-tour-seat', name: 'Ergonomic Low-Profile Gel Comfort Touring Saddle', description: 'Medical grade polymer gel inserts for all-day vibration reduction', price: 590, category: 'touring' }
    ],
    engineSound: {
      basePitch: 75,
      maxPitch: 320,
      cylinders: 2,
      type: 'boxer'
    }
  },
  {
    id: 'apex-volt-1000-ev',
    name: 'Apex Volt 1000 EV Hyperbike',
    series: 'Next-Gen Electric Velocity',
    category: 'electric',
    tagline: 'Instant 170 Nm torque, zero emissions, and near-silent hypersonic pull',
    description: 'The future of high-performance two-wheel propulsion. The Apex Volt 1000 utilizes liquid-cooled axial flux motors delivering instantaneous peak torque from zero RPM with no gearbox shifting required. Integrated DC Fast Charging delivers 20% to 80% state of charge in just 15 minutes at standard CCS2 stations.',
    basePrice: 28900,
    image: '/src/assets/images/bike_electric_superbike_1791195685961.jpg',
    inStock: true,
    featured: true,
    specs: {
      engine: 'Liquid-Cooled Dual Axial Flux Motor',
      displacement: '22.5 kWh Solid-State Pack',
      power: '195 HP (145 kW continuous)',
      powerHp: 195,
      torque: '170 Nm Instant Torque',
      acceleration: '2.4s (0-60 mph)',
      accelerationSec: 2.4,
      topSpeed: '185 mph (298 km/h)',
      topSpeedMph: 185,
      dryWeight: '208 kg',
      seatHeight: '820 mm',
      fuelOrBattery: '22.5 kWh Battery (220 mi / 354 km range)',
      transmission: 'Direct Drive Single-Speed High-Efficiency Belt',
    },
    features: [
      '22.5 kWh Solid-State Battery with 220-Mile Combined Range',
      'DC Ultra-Fast CCS2 Charging: 20% to 80% in 15 Minutes',
      'Adjustable 4-Stage Regenerative Braking with Thumb Paddle',
      'Over-the-Air (OTA) Firmware & Performance Tuning Updates',
      'Haptic Warning Feedback Handlebars with Radar Proximity',
      'Forged Monocoque Carbon Frame with Integrated Battery Casing'
    ],
    colors: [
      { name: 'Cyber Ion Cyan', hex: '#06b6d4', accentHex: '#0891b2', extraCost: 0 },
      { name: 'Satin Stealth Onyx', hex: '#09090b', accentHex: '#14b8a6', extraCost: 650 },
      { name: 'Liquid Platinum Silver', hex: '#cbd5e1', accentHex: '#64748b', extraCost: 500 }
    ],
    accessories: [
      { id: 'acc-volt-wallbox', name: 'Apex Home Level 2 11kW Smart Charger', description: 'Wall-mounted intelligent charger with Wi-Fi power schedule', price: 950, category: 'electronics' },
      { id: 'acc-volt-carbon-fairing', name: 'Aerodynamic Race Bellypan & Fairing Duct Kit', description: 'Aero cooling tunnels optimized for track battery thermal load', price: 1250, category: 'protection' },
      { id: 'acc-volt-rims', name: 'Aero Disc Magnesium Forged Lightweight Rims', description: 'Reduces wind turbulence and improves highway range by 7%', price: 2200, category: 'wheels' },
      { id: 'acc-volt-gps-tracker', name: '24/7 Satellite Telematics & Geofence Alarm System', description: 'Real-time anti-theft GPS tracking and remote immobilizer', price: 490, category: 'electronics' }
    ],
    engineSound: {
      basePitch: 160,
      maxPitch: 850,
      cylinders: 1,
      type: 'electric'
    }
  }
];

export const SHOWROOM_LOCATIONS = [
  {
    id: 'loc-flagship',
    name: 'Apex Flagship Metro Hub',
    address: '400 Grand Avenue, Downtown Metro District',
    city: 'San Francisco, CA 94107',
    phone: '+1 (415) 890-2739',
    hours: 'Mon – Sat: 9:00 AM – 7:30 PM | Sun: 10:00 AM – 5:00 PM',
    facilities: ['Dyno Power Testing Lab', 'Rider Apparel Boutique', 'VIP Delivery Lounge', 'Direct Track Shuttle'],
    hasDyno: true,
    availableSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM']
  },
  {
    id: 'loc-silverstone',
    name: 'Circuit Trackside Experience Center',
    address: '120 Raceway Boulevard, Sector 4',
    city: 'Monterey / Laguna, CA 93940',
    phone: '+1 (831) 540-1199',
    hours: 'Tue – Sun: 8:30 AM – 6:00 PM | Mon: Private Track Days',
    facilities: ['Dedicated 2.4-Mile Closed Proving Track', 'Professional Race Instructors', 'Tire Support Pit', 'Telemetry Teleconferencing'],
    hasDyno: true,
    availableSlots: ['09:00 AM', '11:00 AM', '01:30 PM', '03:30 PM', '05:00 PM']
  },
  {
    id: 'loc-coastal',
    name: 'Apex Coastline Lifestyle Showroom',
    address: '880 Ocean Highway, Suite 100',
    city: 'Newport Beach, CA 92660',
    phone: '+1 (949) 720-4411',
    hours: 'Mon – Sun: 10:00 AM – 7:00 PM',
    facilities: ['Scenic Coastal Demo Route', 'Custom Paint & Tailoring Bay', 'Espresso & Member Club Lounge', 'Electric Fast Charging Depot'],
    hasDyno: false,
    availableSlots: ['10:30 AM', '01:00 PM', '03:00 PM', '05:30 PM']
  }
];
