/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ScreenId } from '../types';
import { Volume2, VolumeX, Gauge, Zap, Flame, Shield, Trophy, HelpCircle, User, Compass } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  answeredCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  isMuted,
  onToggleMute,
  answeredCount
}) => {
  const navItems: { id: ScreenId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'HOME', icon: <Flame className="w-3.5 h-3.5" /> },
    { id: 'garage', label: 'GARAGE', icon: <Gauge className="w-3.5 h-3.5" /> },
    { id: 'journey', label: 'JOURNEY', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'questions', label: '20 QUESTIONS', icon: <HelpCircle className="w-3.5 h-3.5" />, badge: `${answeredCount}/20` },
    { id: 'profile', label: 'PROFILE', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'achievements', label: 'ACHIEVEMENTS', icon: <Trophy className="w-3.5 h-3.5" /> },
    { id: 'quiz', label: 'QUIZ', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'countdown', label: 'MOI 2.0', icon: <Shield className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left Branding */}
        <div 
          onClick={() => { soundFx.playClick(); onNavigate('home'); }}
          className="flex items-center gap-3 cursor-pointer group select-none"
          id="nav-logo"
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/80 flex items-center justify-center text-white font-mono font-bold text-xs tracking-wider shadow-inner group-hover:border-zinc-500 transition-colors">
            20
          </div>
          <div>
            <span className="font-speed font-bold tracking-wider text-base text-white">MOI <span className="text-zinc-500">/</span> 20</span>
            <div className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">BIRTHDAY EDITION 2026</div>
          </div>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => {
                  soundFx.playClick();
                  onNavigate(item.id);
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-mono tracking-wider flex items-center gap-1.5 transition-all relative ${
                  isActive 
                    ? 'bg-zinc-800 text-white border border-zinc-700 shadow-sm font-semibold' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-zinc-700 text-white' : 'bg-zinc-800/80 text-zinc-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Audio Synthesizer Mute Button */}
          <button
            id="nav-audio-toggle"
            onClick={onToggleMute}
            title={isMuted ? "Unmute Engine Audio FX" : "Mute Engine Audio FX"}
            className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-zinc-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Quick Launch Button */}
          <button
            id="nav-ignite-btn"
            onClick={() => {
              soundFx.playIgnition();
              onNavigate('next-chapter');
            }}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-mono font-bold tracking-wider transition-transform active:scale-95 shadow-md shadow-white/5"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span>LAUNCH 2.0</span>
          </button>
        </div>
      </div>
    </header>
  );
};
