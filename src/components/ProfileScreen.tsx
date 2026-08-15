/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { DriverProfileData } from '../types';
import { soundFx } from '../utils/audio';
import { 
  User, 
  Gauge, 
  Compass, 
  Target, 
  ShieldCheck, 
  Flame, 
  Award, 
  Sliders,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProfileScreenProps {
  profile: DriverProfileData;
  onUpdateProfile: (updated: DriverProfileData) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ profile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<DriverProfileData>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    soundFx.playClick(900, 0.05);
    onUpdateProfile(formData);
    setIsEditing(false);
    setSavedSuccess(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleStatChange = (statKey: keyof typeof formData.stats, val: number) => {
    setFormData({
      ...formData,
      stats: {
        ...formData.stats,
        [statKey]: val
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Header section matching Image 13 */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-zinc-400 uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span>04 // DRIVER PROFILE TELEMETRY</span>
          </div>
          <h1 className="font-speed font-black text-4xl sm:text-5xl text-white tracking-tight uppercase">
            DRIVER PROFILE
          </h1>
          <p className="text-sm font-sans text-zinc-400 mt-1 max-w-xl">
            Cockpit diagnostics, behavioral telemetry, and calibrated performance attributes at age 20.
          </p>
        </div>

        <button
          id="btn-toggle-edit-profile"
          onClick={() => {
            soundFx.playClick();
            if (isEditing) {
              handleSave();
            } else {
              setIsEditing(true);
            }
          }}
          className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono font-bold tracking-wider transition-colors flex items-center gap-2"
        >
          {isEditing ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>SAVE ATTRIBUTES</span>
            </>
          ) : (
            <>
              <Sliders className="w-4 h-4 text-zinc-300" />
              <span>CALIBRATE ATTRIBUTES</span>
            </>
          )}
        </button>
      </div>

      {/* Main Profile Bento Grid matching Image 13 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card: Driver Identification */}
        <div className="lg:col-span-1 rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-700 flex items-center justify-center text-white font-speed font-bold text-2xl shadow-inner">
                20
              </div>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                ACTIVE STATUS
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-mono font-bold text-white tracking-wide">MOI</h2>
              <div className="text-xs font-mono text-zinc-400">CALLSIGN: MOI 2.0 // EST. 2006</div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">CHASSIS AGE</div>
                <div className="text-sm font-mono font-bold text-white mt-0.5">20.00 YEARS</div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">CORE MINDSET</div>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.mindset}
                    onChange={(e) => setFormData({ ...formData, mindset: e.target.value })}
                    className="w-full bg-zinc-900 text-white font-mono text-xs px-2 py-1 rounded border border-zinc-700 mt-1"
                  />
                ) : (
                  <div className="text-sm font-mono font-bold text-amber-400 mt-0.5">{formData.mindset}</div>
                )}
              </div>
              <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">DREAM MACHINE</div>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.dreamCar}
                    onChange={(e) => setFormData({ ...formData, dreamCar: e.target.value })}
                    className="w-full bg-zinc-900 text-white font-mono text-xs px-2 py-1 rounded border border-zinc-700 mt-1"
                  />
                ) : (
                  <div className="text-sm font-mono font-bold text-white mt-0.5">{formData.dreamCar}</div>
                )}
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-zinc-400 border-t border-zinc-800/60 pt-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Telemetry verified by Cockpit OS</span>
          </div>
        </div>

        {/* Right Card: Performance Attribute Meters & Ambition Targets */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Attributes Bars matching Screenshot */}
          <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-zinc-400" />
                <h3 className="text-xs font-mono font-bold text-white tracking-wider uppercase">PERFORMANCE ATTRIBUTES</h3>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">MAX OUTPUT: 100%</span>
            </div>

            <div className="space-y-4">
              {/* Stat 1: Ambition */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">AMBITION & DRIVE</span>
                  <span className="text-red-400 font-bold">{formData.stats.ambition}%</span>
                </div>
                {isEditing ? (
                  <input 
                    type="range" 
                    min="50" 
                    max="100" 
                    value={formData.stats.ambition} 
                    onChange={(e) => handleStatChange('ambition', Number(e.target.value))}
                    className="w-full accent-red-500"
                  />
                ) : (
                  <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${formData.stats.ambition}%` }} />
                  </div>
                )}
              </div>

              {/* Stat 2: Discipline */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">DISCIPLINE & EXECUTION</span>
                  <span className="text-emerald-400 font-bold">{formData.stats.discipline}%</span>
                </div>
                {isEditing ? (
                  <input 
                    type="range" 
                    min="50" 
                    max="100" 
                    value={formData.stats.discipline} 
                    onChange={(e) => handleStatChange('discipline', Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                ) : (
                  <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${formData.stats.discipline}%` }} />
                  </div>
                )}
              </div>

              {/* Stat 3: Curiosity */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">CURIOSITY & INGENUITY</span>
                  <span className="text-blue-400 font-bold">{formData.stats.curiosity}%</span>
                </div>
                {isEditing ? (
                  <input 
                    type="range" 
                    min="50" 
                    max="100" 
                    value={formData.stats.curiosity} 
                    onChange={(e) => handleStatChange('curiosity', Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                ) : (
                  <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${formData.stats.curiosity}%` }} />
                  </div>
                )}
              </div>

              {/* Stat 4: Adventure */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">ADVENTURE & SPONTANEITY</span>
                  <span className="text-amber-400 font-bold">{formData.stats.adventure}%</span>
                </div>
                {isEditing ? (
                  <input 
                    type="range" 
                    min="50" 
                    max="100" 
                    value={formData.stats.adventure} 
                    onChange={(e) => handleStatChange('adventure', Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                ) : (
                  <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${formData.stats.adventure}%` }} />
                  </div>
                )}
              </div>

              {/* Stat 5: Risk Tolerance */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">CALCULATED RISK TOLERANCE</span>
                  <span className="text-purple-400 font-bold">{formData.stats.risk}%</span>
                </div>
                {isEditing ? (
                  <input 
                    type="range" 
                    min="50" 
                    max="100" 
                    value={formData.stats.risk} 
                    onChange={(e) => handleStatChange('risk', Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                ) : (
                  <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${formData.stats.risk}%` }} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Long-term Destination Targets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5 space-y-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-red-400" />
                <h4 className="text-xs font-mono font-bold text-white uppercase">BIGGEST AMBITION</h4>
              </div>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={formData.biggestAmbition}
                  onChange={(e) => setFormData({ ...formData, biggestAmbition: e.target.value })}
                  className="w-full bg-zinc-950 text-xs font-mono text-white p-2 rounded border border-zinc-700 resize-none"
                />
              ) : (
                <p className="text-xs font-mono text-zinc-300 leading-relaxed">
                  {formData.biggestAmbition}
                </p>
              )}
            </div>

            <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800 p-5 space-y-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-400" />
                <h4 className="text-xs font-mono font-bold text-white uppercase">5-YEAR DESTINATION</h4>
              </div>
              {isEditing ? (
                <textarea
                  rows={2}
                  value={formData.fiveYearDestination}
                  onChange={(e) => setFormData({ ...formData, fiveYearDestination: e.target.value })}
                  className="w-full bg-zinc-950 text-xs font-mono text-white p-2 rounded border border-zinc-700 resize-none"
                />
              ) : (
                <p className="text-xs font-mono text-zinc-300 leading-relaxed">
                  {formData.fiveYearDestination}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
