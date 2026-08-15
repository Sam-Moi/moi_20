/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { soundFx } from '../utils/audio';
import { Power, Flame, Shield, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SplashScreenProps {
  onStartEngine: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onStartEngine }) => {
  const [isStarting, setIsStarting] = useState(false);

  const handleIgnition = () => {
    setIsStarting(true);
    soundFx.playIgnition();
    
    // Confetti celebration bursts
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#ef4444', '#f59e0b', '#3b82f6', '#10b981']
    });

    setTimeout(() => {
      onStartEngine();
    }, 900);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 text-center carbon-grid overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/90 to-zinc-900/40 pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none -top-10 -right-10" />
      <div className="absolute w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none -bottom-10 -left-10" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Top Chassis / Telemetry Tag */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-8 shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>CHASSIS NO. 2006-2026 // STABLE</span>
        </motion.div>

        {/* Main Title Typography matching Image 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-4 mb-8"
        >
          <h1 className="font-speed font-black text-6xl sm:text-8xl tracking-tight text-white uppercase drop-shadow-sm">
            MOI <span className="text-zinc-600 font-light">/</span> 20
          </h1>
          <p className="text-lg sm:text-xl font-sans text-zinc-400 font-light tracking-wide max-w-lg mx-auto">
            Another Year. Another Level. Est. 2006.
          </p>
        </motion.div>

        {/* Telemetry specs row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-lg mb-12"
        >
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-left">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">ORIGIN</div>
            <div className="text-sm font-mono font-bold text-white">EST. 2006</div>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-left">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">MILEAGE</div>
            <div className="text-sm font-mono font-bold text-white">20 YEARS</div>
          </div>
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-left">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">STATUS</div>
            <div className="text-sm font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              ACCELERATING
            </div>
          </div>
        </motion.div>

        {/* Start Engine Ignition Push Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col items-center gap-4"
        >
          <button
            id="splash-start-engine-btn"
            onClick={handleIgnition}
            disabled={isStarting}
            className={`group relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-mono text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
              isStarting 
                ? 'bg-red-600 text-white scale-95 shadow-2xl shadow-red-600/50' 
                : 'bg-white hover:bg-zinc-100 text-zinc-950 hover:scale-105 shadow-xl shadow-white/10'
            }`}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <Power className="w-5 h-5 text-red-600 transition-transform group-hover:rotate-12" />
            <span>{isStarting ? 'CRANKING ENGINE...' : 'START ENGINE'}</span>
            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
            <Flame className="w-3 h-3 text-red-500" />
            <span>Click to ignite full automotive telemetry and sound FX</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
