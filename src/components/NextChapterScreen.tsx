/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ScreenId } from '../types';
import { soundFx } from '../utils/audio';
import { Zap, ArrowRight, Flame, Shield, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NextChapterScreenProps {
  onNavigate: (screen: ScreenId) => void;
}

export const NextChapterScreen: React.FC<NextChapterScreenProps> = ({ onNavigate }) => {
  const handleIgniteLaunch = () => {
    soundFx.playIgnition();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#ffffff']
    });
    onNavigate('countdown');
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 py-8 overflow-hidden">
      {/* Background Cinematic Hypercar in the Rain matching Image 11 */}
      <div className="relative w-full rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-950 aspect-[16/9] sm:aspect-[21/9] min-h-[480px] flex items-center justify-center p-6 sm:p-12 shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1800&q=85"
          alt="Night Hypercar in Rain"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.38] contrast-125 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950/80" />

        {/* Content Container */}
        <div className="relative z-10 max-w-3xl text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/80 text-[11px] font-mono tracking-widest text-red-300 uppercase shadow-lg shadow-red-950/50"
          >
            <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
            <span>MOI 2.0 // DEPLOYMENT VERIFIED</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-speed font-black text-4xl sm:text-7xl text-white tracking-tight uppercase leading-none drop-shadow-lg"
          >
            START THE <br />
            <span className="text-zinc-400 font-light">NEXT CHAPTER.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl font-sans text-zinc-300 font-normal leading-relaxed max-w-xl"
          >
            "The road doesn't end at 20. It just gets faster, sharper, and filled with bigger horizons. Happy 20th Birthday, Moi."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              id="btn-launch-2-0"
              onClick={handleIgniteLaunch}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-950 font-mono font-bold text-sm tracking-wider flex items-center gap-3 transition-transform active:scale-95 shadow-xl shadow-white/10"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>ENTER MOI 2.0 GATE</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="btn-view-profile"
              onClick={() => { soundFx.playClick(); onNavigate('profile'); }}
              className="px-6 py-4 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 font-mono font-bold text-xs tracking-wider flex items-center gap-2 transition-colors"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>VIEW DRIVER PROFILE</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
