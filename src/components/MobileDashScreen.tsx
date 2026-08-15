/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  Terminal, 
  Code2, 
  Flame, 
  Cpu, 
  Zap, 
  GitBranch, 
  Sparkles 
} from 'lucide-react';
import { soundFx } from '../utils/audio';

export const MobileDashScreen: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner matching Image 18 */}
      <div className="rounded-3xl bg-zinc-900/80 border border-zinc-800 p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-white">YEAR 20 PROGRESS</span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-800/40">
            99.9% CALIBRATED
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-zinc-400">ODOMETER LIFETIME COMPLETION</span>
            <span className="text-white font-bold">20.00 / 20.00 YRS</span>
          </div>
          <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
            <motion.div 
              className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500"
              initial={{ width: 0 }}
              animate={{ width: '99.9%' }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        {/* 4 Stats Bento */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
            <div className="text-[10px] font-mono text-zinc-400 uppercase">DAYS LIVED</div>
            <div className="text-xl font-mono font-bold text-white mt-1">7,305</div>
            <div className="text-[10px] font-mono text-emerald-400 mt-0.5">+100% active</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
            <div className="text-[10px] font-mono text-zinc-400 uppercase">HOURS LOGGED</div>
            <div className="text-xl font-mono font-bold text-white mt-1">175,200+</div>
            <div className="text-[10px] font-mono text-zinc-400 mt-0.5">non-stop runtime</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
            <div className="text-[10px] font-mono text-zinc-400 uppercase">PROJECTS BUILT</div>
            <div className="text-xl font-mono font-bold text-amber-400 mt-1">42+</div>
            <div className="text-[10px] font-mono text-zinc-400 mt-0.5">repositories</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
            <div className="text-[10px] font-mono text-zinc-400 uppercase">SPEED LIMITERS</div>
            <div className="text-xl font-mono font-bold text-red-500 mt-1">0</div>
            <div className="text-[10px] font-mono text-red-400 mt-0.5">unrestricted</div>
          </div>
        </div>
      </div>

      {/* Code telemetry block */}
      <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-6 space-y-4 font-mono text-xs text-zinc-300">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-white">MOI_TELEMETRY_SHELL.SH</span>
          </div>
          <span className="text-[10px] text-zinc-400">BASH 2026.20</span>
        </div>

        <div className="space-y-1.5 text-zinc-400">
          <p><span className="text-emerald-400">$</span> initialize_core --chassis=2006-2026 --age=20</p>
          <p className="text-zinc-400">[OK] Calibration passed. 20 laps recorded on circuit.</p>
          <p><span className="text-emerald-400">$</span> check_dyno --boost=unlimited</p>
          <p className="text-zinc-400">[OK] S58 / V8 Twin-Turbo telemetry online. 8,200 RPM available.</p>
          <p><span className="text-emerald-400">$</span> deploy_version --target="MOI 2.0"</p>
          <p className="text-emerald-400 font-bold">[SUCCESS] Launching 2026 Birthday Edition. Next chapter engaged.</p>
        </div>
      </div>
    </div>
  );
};
