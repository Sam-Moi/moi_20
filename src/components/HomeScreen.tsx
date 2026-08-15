/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ScreenId } from '../types';
import { soundFx } from '../utils/audio';
import { 
  Gauge, 
  Flame, 
  Compass, 
  HelpCircle, 
  User, 
  Trophy, 
  Zap, 
  Activity, 
  ArrowUpRight, 
  ShieldCheck,
  Disc
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface HomeScreenProps {
  onNavigate: (screen: ScreenId) => void;
  answeredCount: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, answeredCount }) => {
  const [rpm, setRpm] = useState(2400);
  const [isRevving, setIsRevving] = useState(false);
  const [ignited, setIgnited] = useState(false);

  // Slight idle needle vibration
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRevving) {
        setRpm(2200 + Math.floor(Math.random() * 200));
      }
    }, 600);
    return () => clearInterval(interval);
  }, [isRevving]);

  const handleIgniteButton = () => {
    setIsRevving(true);
    setIgnited(true);
    soundFx.playIgnition();

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ef4444', '#f59e0b', '#ffffff', '#3b82f6']
    });

    let current = 2400;
    const revInterval = setInterval(() => {
      current += 600;
      if (current >= 8200) {
        clearInterval(revInterval);
        setTimeout(() => {
          setIsRevving(false);
        }, 800);
      }
      setRpm(Math.min(current, 8200));
    }, 60);
  };

  const handleManualRev = () => {
    setIsRevving(true);
    soundFx.playRev(1.2);
    setRpm(7800);
    setTimeout(() => {
      setIsRevving(false);
    }, 900);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      {/* Top Banner Header matching Image 3 */}
      <div className="relative rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950 p-6 sm:p-12 overflow-hidden carbon-grid">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/80 border border-zinc-700/70 text-[11px] font-mono tracking-widest text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>BIRTHDAY EDITION 2026 // MOI 2.0</span>
            </div>

            <h1 className="font-speed font-black text-4xl sm:text-6xl text-white tracking-tight leading-none uppercase">
              20 YEARS <br />
              <span className="text-zinc-400 font-light">STILL ACCELERATING.</span>
            </h1>

            <p className="text-sm sm:text-base font-sans text-zinc-300 font-normal leading-relaxed">
              Welcome to the official 2026 telemetry dashboard. 20 laps around the sun, thousands of miles driven, infinite ambition loaded into the chamber.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="home-ignite-engine-btn"
                onClick={handleIgniteButton}
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs tracking-wider flex items-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-red-600/25"
              >
                <Flame className="w-4 h-4 fill-white" />
                <span>{ignited ? 'RE-IGNITE ENGINE' : 'IGNITE ENGINE'}</span>
              </button>

              <button
                id="home-rev-engine-btn"
                onClick={handleManualRev}
                className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 font-mono font-bold text-xs tracking-wider flex items-center gap-2 transition-colors active:scale-95"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>REV ENGINE (DYNO)</span>
              </button>

              <button
                id="home-view-garage-btn"
                onClick={() => { soundFx.playClick(); onNavigate('garage'); }}
                className="px-5 py-3 rounded-xl bg-transparent hover:bg-zinc-800/60 border border-zinc-800 text-zinc-400 hover:text-white font-mono text-xs tracking-wider flex items-center gap-2 transition-colors"
              >
                <span>EXPLORE GARAGE</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Live Telemetry Instrument Gauge Card */}
          <div className="w-full md:w-80 rounded-2xl bg-zinc-950/90 border border-zinc-800 p-5 space-y-4 shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-red-500" />
                <span className="text-xs font-mono font-bold text-white tracking-wider">LIVE TELEMETRY</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">ONLINE</span>
            </div>

            {/* RPM Dial representation */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">RPM MONITOR</span>
                <span className={`font-bold transition-colors ${rpm > 7000 ? 'text-red-500' : 'text-white'}`}>
                  {rpm.toLocaleString()} RPM
                </span>
              </div>
              <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                <motion.div 
                  className={`h-full transition-all duration-150 ${
                    rpm > 7000 
                      ? 'bg-gradient-to-r from-amber-500 to-red-600' 
                      : 'bg-gradient-to-r from-blue-500 to-emerald-400'
                  }`}
                  style={{ width: `${(rpm / 9000) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-zinc-400">
                <span>0</span>
                <span>3K</span>
                <span>6K</span>
                <span className="text-red-400 font-bold">9K REDLINE</span>
              </div>
            </div>

            {/* Telemetry readouts */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2">
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800/60">
                <div className="text-[10px] text-zinc-400">CURRENT GEAR</div>
                <div className="font-bold text-white">6TH (OVERDRIVE)</div>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800/60">
                <div className="text-[10px] text-zinc-400">CHASSIS AGE</div>
                <div className="font-bold text-white">20.00 YRS</div>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800/60">
                <div className="text-[10px] text-zinc-400">TOTAL DAYS</div>
                <div className="font-bold text-emerald-400">7,305+ DAYS</div>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-900/80 border border-zinc-800/60">
                <div className="text-[10px] text-zinc-400">SPEED LIMITER</div>
                <div className="font-bold text-red-400">DISABLED</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Navigation Cards matching Screenshot styles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-zinc-400" />
            <h2 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">TELEMETRY MODULES</h2>
          </div>
          <span className="text-xs font-mono text-zinc-400">ALL SYSTEMS CALIBRATED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: The Garage */}
          <div 
            id="home-card-garage"
            onClick={() => { soundFx.playClick(); onNavigate('garage'); }}
            className="group cursor-pointer rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 p-6 space-y-4 transition-all duration-300 hover:shadow-xl hover:shadow-black/40 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 group-hover:text-white transition-colors">
                <Gauge className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-300">01 // FLEET</span>
            </div>
            <div>
              <h3 className="text-lg font-mono font-bold text-white group-hover:text-red-400 transition-colors flex items-center justify-between">
                <span>THE GARAGE</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </h3>
              <p className="text-xs font-sans text-zinc-400 mt-1.5 leading-relaxed">
                BMW M4 Competition, AMG GT 63 S, Audi RS7, and Porsche 911 Turbo S telemetry specifications.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">6 VEHICLES</span>
              <span>500+ TO 900+ HP</span>
            </div>
          </div>

          {/* Card 2: The Journey */}
          <div 
            id="home-card-journey"
            onClick={() => { soundFx.playClick(); onNavigate('journey'); }}
            className="group cursor-pointer rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 p-6 space-y-4 transition-all duration-300 hover:shadow-xl hover:shadow-black/40"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 group-hover:text-white transition-colors">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-300">02 // TIMELINE</span>
            </div>
            <div>
              <h3 className="text-lg font-mono font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                <span>20 YEARS JOURNEY</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </h3>
              <p className="text-xs font-sans text-zinc-400 mt-1.5 leading-relaxed">
                From First Mile ignition in 2006 to Maximum Velocity in 2026. Interactive life timeline.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">6 MILESTONES</span>
              <span>2006 — 2026</span>
            </div>
          </div>

          {/* Card 3: 20 Questions */}
          <div 
            id="home-card-questions"
            onClick={() => { soundFx.playClick(); onNavigate('questions'); }}
            className="group cursor-pointer rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-zinc-700 p-6 space-y-4 transition-all duration-300 hover:shadow-xl hover:shadow-black/40"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200 group-hover:text-white transition-colors">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-zinc-400 group-hover:text-zinc-300">03 // REFLECTIONS</span>
            </div>
            <div>
              <h3 className="text-lg font-mono font-bold text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
                <span>20 QUESTIONS</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </h3>
              <p className="text-xs font-sans text-zinc-400 mt-1.5 leading-relaxed">
                20 questions to answer before the night ends. No skips. Track and save your reflections.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-zinc-400">
              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">{answeredCount}/20 COMPLETED</span>
              <span>AUTO-PERSISTED</span>
            </div>
          </div>
        </div>

        {/* Secondary Row: Profile & Achievements & Launch */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {/* Driver Profile */}
          <div
            id="home-card-profile"
            onClick={() => { soundFx.playClick(); onNavigate('profile'); }}
            className="group cursor-pointer rounded-2xl bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/70 p-5 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 group-hover:text-white">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-mono font-bold text-white">DRIVER PROFILE</div>
                <div className="text-xs font-mono text-zinc-400">Mindset: LIMITLESS // Age: 20</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
          </div>

          {/* Achievements */}
          <div
            id="home-card-achievements"
            onClick={() => { soundFx.playClick(); onNavigate('achievements'); }}
            className="group cursor-pointer rounded-2xl bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/70 p-5 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 group-hover:text-white">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-mono font-bold text-white">ACHIEVEMENTS</div>
                <div className="text-xs font-mono text-zinc-400">8 Badges // Telemetry Unlocked</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
          </div>

          {/* MOI 2.0 Launch Gate */}
          <div
            id="home-card-countdown"
            onClick={() => { soundFx.playClick(); onNavigate('countdown'); }}
            className="group cursor-pointer rounded-2xl bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/70 p-5 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-zinc-800 text-zinc-300 group-hover:text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-mono font-bold text-white">MOI 2.0 GATE</div>
                <div className="text-xs font-mono text-zinc-400">Version 20.0 // Deployed</div>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
};
