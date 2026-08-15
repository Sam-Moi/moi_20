/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ScreenId } from '../types';
import { soundFx } from '../utils/audio';
import { Flame, Gauge, Compass, HelpCircle, Trophy, User } from 'lucide-react';

interface MobileBottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  answeredCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentScreen,
  onNavigate,
  answeredCount
}) => {
  const items: { id: ScreenId; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <Flame className="w-4 h-4" /> },
    { id: 'garage', label: 'Garage', icon: <Gauge className="w-4 h-4" /> },
    { id: 'journey', label: 'Journey', icon: <Compass className="w-4 h-4" /> },
    { id: 'questions', label: 'Questions', icon: <HelpCircle className="w-4 h-4" />, badge: `${answeredCount}` },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'achievements', label: 'Badges', icon: <Trophy className="w-4 h-4" /> },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-lg border-t border-zinc-800/80 px-2 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundFx.playClick();
                onNavigate(item.id);
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl transition-all ${
                isActive 
                  ? 'text-white font-bold' 
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && Number(item.badge) > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full bg-red-600 text-[8px] font-mono text-white flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-mono mt-1 tracking-tight">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-white mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
