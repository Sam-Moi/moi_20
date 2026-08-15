/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { JOURNEY_MILESTONES } from '../data/journey';
import { soundFx } from '../utils/audio';
import { Compass, CheckCircle2, Clock, Zap, Flag, Milestone } from 'lucide-react';

export const JourneyScreen: React.FC = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<string>('mile-20');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'MAXIMUM VELOCITY':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60';
      case 'APEX REACHED':
        return 'bg-blue-950/80 text-blue-400 border-blue-800/60';
      case 'SPORT MODE':
        return 'bg-amber-950/80 text-amber-400 border-amber-800/60';
      case 'IGNITION':
        return 'bg-red-950/80 text-red-400 border-red-800/60';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header section matching Image 7 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-400 uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>02 // TIMELINE TELEMETRY</span>
          </div>
          <h1 className="font-speed font-black text-4xl sm:text-5xl text-white tracking-tight uppercase">
            THE JOURNEY
          </h1>
          <p className="text-sm font-sans text-zinc-400 mt-1 max-w-xl">
            20 years recorded across 6 major milestones. From first engine crank to maximum velocity overdrive.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-right">
            <div className="text-[10px] font-mono text-zinc-400 uppercase">TOTAL DISTANCE</div>
            <div className="text-sm font-mono font-bold text-white">7,305 DAYS (175,200+ HRS)</div>
          </div>
        </div>
      </div>

      {/* Interactive Timeline Grid matching Image 7 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {JOURNEY_MILESTONES.map((item, index) => {
          const isSelected = selectedMilestone === item.id;
          return (
            <motion.div
              key={item.id}
              id={`journey-milestone-${item.number}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => {
                soundFx.playClick();
                setSelectedMilestone(item.id);
              }}
              className={`cursor-pointer rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                isSelected 
                  ? 'bg-zinc-900 border-zinc-600 shadow-2xl shadow-zinc-900/50' 
                  : 'bg-zinc-900/50 hover:bg-zinc-900/80 border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              {/* Background index watermark */}
              <span className="absolute -top-4 -right-2 font-speed font-black text-7xl text-zinc-800/20 select-none pointer-events-none group-hover:text-zinc-800/30 transition-colors">
                {item.number}
              </span>

              <div className="space-y-4 relative z-10">
                {/* Milestone Top Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-speed font-bold text-xl text-white group-hover:text-emerald-400 transition-colors">
                      {item.number}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                      {item.ageLabel}
                    </span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase border ${getStatusBadge(item.status)}`}>
                    {item.status}
                  </span>
                </div>

                {/* Milestone Title */}
                <div>
                  <h3 className="text-lg font-mono font-bold text-white tracking-wide">
                    {item.title}
                  </h3>
                  <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                    YEAR: {item.year}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs font-sans text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom Specs */}
              <div className="pt-4 mt-4 border-t border-zinc-800/70 flex items-center justify-between text-[11px] font-mono text-zinc-400 relative z-10">
                <div>
                  MILEAGE: <span className="text-zinc-200 font-bold">{item.mileage || '000000'}</span>
                </div>
                {item.destination ? (
                  <div className="text-amber-400 font-bold">DEST: {item.destination}</div>
                ) : (
                  <div className="text-emerald-400 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>LOGGED</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Summary Banner */}
      <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-400">
            <Milestone className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-mono font-bold text-white">THE NEXT 20 YEARS BEGINS</h4>
            <p className="text-xs font-sans text-zinc-400">
              Chassis is primed. The engine is tuned. No speed limiters on the next chapter of life.
            </p>
          </div>
        </div>

        <div className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-xs font-mono text-white font-bold whitespace-nowrap">
          STATUS: HYPERDRIVE READY
        </div>
      </div>
    </div>
  );
};
