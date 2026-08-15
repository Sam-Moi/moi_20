/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CARS_DATA } from '../data/cars';
import { Car } from '../types';
import { soundFx } from '../utils/audio';
import { 
  Gauge, 
  Zap, 
  Flame, 
  X, 
  Layers, 
  Check, 
  Sparkles,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const GarageScreen: React.FC = () => {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [dynoRevCount, setDynoRevCount] = useState<number>(0);

  const filterTags = ['ALL', 'DREAM CAR', 'NEXT TARGET', 'CLASSIFIED', 'FUTURE ACQ.'];

  const filteredCars = activeFilter === 'ALL' 
    ? CARS_DATA 
    : CARS_DATA.filter(car => car.tag.toUpperCase() === activeFilter);

  const handleRevCar = (car: Car) => {
    soundFx.playRev(car.id === 'mclaren-p1' || car.id === 'aston-dbs' ? 1.4 : 1.1);
    setDynoRevCount(prev => prev + 1);

    if (dynoRevCount >= 2) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#f59e0b', '#3b82f6']
      });
    }
  };

  const getTagBadgeColor = (tagType?: string) => {
    switch (tagType) {
      case 'dream':
        return 'bg-red-950/80 text-red-400 border-red-800/60';
      case 'target':
        return 'bg-amber-950/80 text-amber-400 border-amber-800/60';
      case 'classified':
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
      case 'future':
        return 'bg-blue-950/80 text-blue-400 border-blue-800/60';
      case 'ultimate':
        return 'bg-purple-950/80 text-purple-400 border-purple-800/60';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header section matching Image 5 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-400 uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
            <span>01 // FLEET SPECIFICATIONS</span>
          </div>
          <h1 className="font-speed font-black text-4xl sm:text-5xl text-white tracking-tight uppercase">
            THE GARAGE
          </h1>
          <p className="text-sm font-sans text-zinc-400 mt-1 max-w-xl">
            Precision telemetry, aggressive aero, and relentless performance benchmarks. Explore target acquisitions and ultimate dream machines.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {filterTags.map(tag => (
            <button
              key={tag}
              id={`garage-filter-${tag.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => { soundFx.playClick(); setActiveFilter(tag); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all ${
                activeFilter === tag 
                  ? 'bg-white text-zinc-950 font-bold shadow-md' 
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Car Grid matching Image 5 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car, index) => (
          <motion.div
            key={car.id}
            id={`car-card-${car.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group rounded-2xl bg-zinc-900/70 border border-zinc-800/90 hover:border-zinc-700 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/50"
          >
            {/* Image Preview Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
              <img 
                src={car.image} 
                alt={car.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              
              {/* Badge top-right */}
              <div className="absolute top-3 right-3">
                <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase border backdrop-blur-md shadow-md ${getTagBadgeColor(car.tagType)}`}>
                  {car.tag}
                </span>
              </div>

              {/* Title overlay bottom-left */}
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="text-xl font-mono font-bold text-white tracking-wide drop-shadow-md">
                  {car.name}
                </h3>
                <div className="text-[11px] font-mono text-zinc-300 tracking-wider">
                  {car.subtitle}
                </div>
              </div>
            </div>

            {/* Spec readout grid */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/80">
                  <div className="text-[9px] font-mono text-zinc-400 uppercase">POWER</div>
                  <div className="text-xs font-mono font-bold text-white mt-0.5">{car.power}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/80">
                  <div className="text-[9px] font-mono text-zinc-400 uppercase">0-60 MPH</div>
                  <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">{car.zeroSixty}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-zinc-950/80 border border-zinc-800/80">
                  <div className="text-[9px] font-mono text-zinc-400 uppercase">DRIVE</div>
                  <div className="text-xs font-mono font-bold text-zinc-200 mt-0.5">{car.drive}</div>
                </div>
              </div>

              <p className="text-xs font-sans text-zinc-400 line-clamp-2 leading-relaxed">
                {car.description}
              </p>

              {/* Action buttons */}
              <div className="pt-2 flex items-center gap-2 border-t border-zinc-800/60">
                <button
                  id={`btn-inspect-${car.id}`}
                  onClick={() => { soundFx.playClick(); setSelectedCar(car); }}
                  className="flex-1 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-bold tracking-wider transition-colors flex items-center justify-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>INSPECT TELEMETRY</span>
                </button>

                <button
                  id={`btn-rev-${car.id}`}
                  onClick={() => handleRevCar(car)}
                  title="Simulate Dyno Rev Sound"
                  className="px-3 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-amber-400 hover:text-amber-300 text-xs font-mono transition-colors flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>REV</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Car Inspection Modal */}
      <AnimatePresence>
        {selectedCar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl rounded-3xl bg-zinc-950 border border-zinc-800 overflow-hidden shadow-2xl space-y-6 p-6 sm:p-8"
            >
              <button
                id="modal-close-btn"
                onClick={() => setSelectedCar(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase border ${getTagBadgeColor(selectedCar.tagType)}`}>
                    {selectedCar.tag}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">CHASSIS SPECIFICATION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-mono font-bold text-white">{selectedCar.name}</h2>
                <div className="text-xs font-mono text-zinc-400">{selectedCar.subtitle}</div>
              </div>

              <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-zinc-800">
                <img 
                  src={selectedCar.image} 
                  alt={selectedCar.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Detailed specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-center">
                  <div className="text-[10px] font-mono text-zinc-400">HORSEPOWER</div>
                  <div className="text-sm font-mono font-bold text-white mt-1">{selectedCar.power}</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-center">
                  <div className="text-[10px] font-mono text-zinc-400">0-60 MPH</div>
                  <div className="text-sm font-mono font-bold text-emerald-400 mt-1">{selectedCar.zeroSixty}</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-center">
                  <div className="text-[10px] font-mono text-zinc-400">TOP SPEED</div>
                  <div className="text-sm font-mono font-bold text-white mt-1">{selectedCar.topSpeed}</div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-center">
                  <div className="text-[10px] font-mono text-zinc-400">DRIVETRAIN</div>
                  <div className="text-sm font-mono font-bold text-zinc-300 mt-1">{selectedCar.drive}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono text-zinc-300">
                <span className="text-zinc-400 uppercase mr-2">ENGINE BLOCK:</span>
                <span className="text-white font-bold">{selectedCar.engine}</span>
              </div>

              <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                {selectedCar.description}
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  id="modal-dyno-rev-btn"
                  onClick={() => handleRevCar(selectedCar)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-mono font-bold text-xs tracking-wider flex items-center gap-2 transition-colors shadow-lg shadow-amber-500/20"
                >
                  <Zap className="w-4 h-4 fill-zinc-950" />
                  <span>SIMULATE DYNO REV</span>
                </button>
                <button
                  onClick={() => setSelectedCar(null)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs tracking-wider transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
