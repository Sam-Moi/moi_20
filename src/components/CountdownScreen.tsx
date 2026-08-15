/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { soundFx } from '../utils/audio';
import { ShieldCheck, Flame, Zap, Sparkles, Clock, Compass, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CountdownScreen: React.FC = () => {
  const [celebrated, setCelebrated] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLaunchOverdrive = () => {
    setCelebrated(true);
    soundFx.playIgnition();

    const end = Date.now() + 3.5 * 1000;
    const interval: any = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#ffffff']
      });
    }, 250);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Top Banner matching Image 16/24 */}
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-6 sm:p-12 text-center carbon-grid relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-[11px] font-mono tracking-widest text-emerald-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>VERSION 20.0 // DEPLOYED & CALIBRATED</span>
          </div>

          <h1 className="font-speed font-black text-5xl sm:text-7xl text-white tracking-tight uppercase">
            MOI 2.0
          </h1>

          <p className="text-base sm:text-lg font-sans text-zinc-300 font-normal max-w-xl mx-auto leading-relaxed">
            The telemetry milestone has arrived. 20 full cycles logged into the system. All rev limits removed.
          </p>

          {/* Big Circular Counter Ring */}
          <div className="py-6 flex justify-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-zinc-800 bg-zinc-950 flex flex-col items-center justify-center p-4 shadow-2xl">
              <div className="absolute inset-2 rounded-full border border-dashed border-zinc-700 animate-spin" style={{ animationDuration: '24s' }} />
              <div className="font-speed font-black text-5xl sm:text-6xl text-white">
                20
              </div>
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest mt-1">
                YEARS LOGGED
              </div>
              <div className="text-[10px] font-mono text-emerald-400 mt-1 font-bold">
                100% ONLINE
              </div>
            </div>
          </div>

          {/* Detailed metrics row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
            <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">DAYS</div>
              <div className="text-base font-mono font-bold text-white mt-0.5">7,305+</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">HOURS</div>
              <div className="text-base font-mono font-bold text-white mt-0.5">175,200+</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">MINUTES</div>
              <div className="text-base font-mono font-bold text-white mt-0.5">10.5M+</div>
            </div>
            <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
              <div className="text-[10px] font-mono text-zinc-400 uppercase">SESSION TIME</div>
              <div className="text-base font-mono font-bold text-emerald-400 mt-0.5">+{seconds}s</div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-4 flex flex-col items-center gap-3">
            <button
              id="btn-launch-overdrive"
              onClick={handleLaunchOverdrive}
              className="px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-sm tracking-wider flex items-center gap-3 transition-transform active:scale-95 shadow-xl shadow-red-600/30"
            >
              <Flame className="w-4 h-4 fill-white" />
              <span>THE NEXT 20 STARTS NOW</span>
              <Sparkles className="w-4 h-4" />
            </button>
            <span className="text-[11px] font-mono text-zinc-400">Click to fire birthday launch telemetry celebration</span>
          </div>
        </div>
      </div>
    </div>
  );
};
