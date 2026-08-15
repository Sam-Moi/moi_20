/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ScreenId } from '../types';
import { soundFx } from '../utils/audio';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950 py-10 mt-20 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-speed font-bold text-lg text-white">MOI <span className="text-zinc-500">/</span> 20</span>
            </div>
            <p className="text-xs font-mono text-zinc-400 leading-relaxed max-w-xs">
              20 years of relentless drive, precision engineering, and zero speed limiters.
            </p>
            <div className="text-[11px] font-mono text-zinc-400">
              CHASSIS NO. <span className="text-zinc-300">2006-2026-M20</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-300 uppercase mb-3">TELEMETRY</h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button 
                  onClick={() => { soundFx.playClick(); onNavigate('home'); }} 
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Live Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { soundFx.playClick(); onNavigate('garage'); }} 
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  The Garage (M4, AMG, RS7)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { soundFx.playClick(); onNavigate('journey'); }} 
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  20 Years Timeline
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-300 uppercase mb-3">SPECIFICATIONS</h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button 
                  onClick={() => { soundFx.playClick(); onNavigate('questions'); }} 
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  20 Milestones Questions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { soundFx.playClick(); onNavigate('profile'); }} 
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Driver Profile Telemetry
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { soundFx.playClick(); onNavigate('mobile-dash'); }} 
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  7,300+ Days Diagnostics
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-300 uppercase mb-3">CALIBRATION</h4>
            <ul className="space-y-2 text-xs font-mono">
              <li>
                <button 
                  onClick={() => { soundFx.playClick(); onNavigate('achievements'); }} 
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Achievements (#001 - #999)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { soundFx.playClick(); onNavigate('quiz'); }} 
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Birthday Quiz Challenge
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { soundFx.playClick(); onNavigate('countdown'); }} 
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  MOI 2.0 Launch Gate
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-400">
          <div>
            MOI / 20 — BIRTHDAY EDITION 2026. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-zinc-400">ODOMETER: 20 YEARS (STILL ACCELERATING)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
