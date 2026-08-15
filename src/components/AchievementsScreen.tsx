/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Achievement } from '../types';
import { soundFx } from '../utils/audio';
import { 
  Trophy, 
  ShieldCheck, 
  Terminal, 
  TrendingUp, 
  Compass, 
  Cpu, 
  Target, 
  Zap, 
  Flame, 
  Lock, 
  Unlock,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AchievementsScreenProps {
  achievements: Achievement[];
  onToggleUnlock: (id: string) => void;
}

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({
  achievements,
  onToggleUnlock
}) => {
  const getIcon = (iconName: string, unlocked: boolean) => {
    const props = { className: `w-5 h-5 ${unlocked ? 'text-amber-400' : 'text-zinc-600'}` };
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Terminal': return <Terminal {...props} />;
      case 'TrendingUp': return <TrendingUp {...props} />;
      case 'Compass': return <Compass {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Target': return <Target {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Flame': return <Flame {...props} />;
      default: return <Trophy {...props} />;
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  const handleUnlockClick = (ach: Achievement) => {
    if (!ach.unlocked) {
      soundFx.playUnlock();
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#ef4444', '#3b82f6', '#10b981']
      });
    } else {
      soundFx.playClick();
    }
    onToggleUnlock(ach.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header section matching Image 20 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-400 uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span>05 // TELEMETRY BADGES</span>
          </div>
          <h1 className="font-speed font-black text-4xl sm:text-5xl text-white tracking-tight uppercase">
            ACHIEVEMENTS
          </h1>
          <p className="text-sm font-sans text-zinc-400 mt-1 max-w-xl">
            Logged milestone badges throughout 20 years of relentless building, learning, and high-RPM focus.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-4">
          <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-800/50 text-amber-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase">UNLOCKED BADGES</div>
            <div className="text-sm font-mono font-bold text-white">
              {unlockedCount} OF {achievements.length} UNLOCKED
            </div>
          </div>
        </div>
      </div>

      {/* Grid of achievement cards matching Image 20 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {achievements.map((ach, index) => (
          <motion.div
            key={ach.id}
            id={`achievement-${ach.code.replace('#', '')}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 ${
              ach.unlocked 
                ? 'bg-zinc-900/80 border-zinc-700 shadow-xl' 
                : 'bg-zinc-950/60 border-zinc-800/80 opacity-75'
            }`}
          >
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl border ${
                  ach.unlocked 
                    ? 'bg-amber-950/40 border-amber-800/50' 
                    : 'bg-zinc-900 border-zinc-800'
                }`}>
                  {getIcon(ach.iconName, ach.unlocked)}
                </div>

                <span className="text-xs font-mono font-bold text-zinc-400">
                  {ach.code}
                </span>
              </div>

              <div>
                <h3 className={`text-sm font-mono font-bold tracking-wide uppercase ${
                  ach.unlocked ? 'text-white' : 'text-zinc-400'
                }`}>
                  {ach.title}
                </h3>
                <p className="text-xs font-sans text-zinc-400 mt-1 leading-relaxed">
                  {ach.description}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between">
              {ach.unlocked ? (
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/50">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>UNLOCKED</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
                  <Lock className="w-3 h-3 text-zinc-400" />
                  <span>LOCKED</span>
                </span>
              )}

              <button
                id={`btn-unlock-${ach.id}`}
                onClick={() => handleUnlockClick(ach)}
                className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
              >
                {ach.unlocked ? 'RELOCK' : 'UNLOCK'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
