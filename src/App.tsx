/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScreenId, DriverProfileData, Achievement } from './types';
import { soundFx } from './utils/audio';
import { INITIAL_ACHIEVEMENTS } from './data/achievements';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { GarageScreen } from './components/GarageScreen';
import { JourneyScreen } from './components/JourneyScreen';
import { QuestionsScreen } from './components/QuestionsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { NextChapterScreen } from './components/NextChapterScreen';
import { CountdownScreen } from './components/CountdownScreen';
import { MobileDashScreen } from './components/MobileDashScreen';
import { AchievementsScreen } from './components/AchievementsScreen';
import { QuizScreen } from './components/QuizScreen';

const DEFAULT_PROFILE: DriverProfileData = {
  age: 20,
  mindset: "LIMITLESS // CONTINUOUS ACCELERATION",
  dreamCar: "BMW M4 Competition Coupe (Isle of Man Green)",
  biggestAmbition: "Building world-class scalable technologies, high-impact systems, and engineering autonomy.",
  fiveYearDestination: "Operating high-scale software architectures, global freedom, and full-spec hypercar garage.",
  stats: {
    ambition: 99,
    discipline: 95,
    curiosity: 98,
    adventure: 92,
    risk: 88,
  }
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [isMuted, setIsMuted] = useState(false);

  // Local persistence for 20 questions
  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    try {
      const saved = localStorage.getItem('moi20_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Local persistence for driver profile
  const [profile, setProfile] = useState<DriverProfileData>(() => {
    try {
      const saved = localStorage.getItem('moi20_profile');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Local persistence for achievements
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    try {
      const saved = localStorage.getItem('moi20_achievements');
      return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
    } catch {
      return INITIAL_ACHIEVEMENTS;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('moi20_answers', JSON.stringify(answers));
    } catch {}
  }, [answers]);

  useEffect(() => {
    try {
      localStorage.setItem('moi20_profile', JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('moi20_achievements', JSON.stringify(achievements));
    } catch {}
  }, [achievements]);

  const handleSaveAnswer = (id: number, text: string) => {
    setAnswers(prev => ({
      ...prev,
      [id]: text
    }));

    // Check if 20 questions completed
    const updated = { ...answers, [id]: text };
    const answeredCount = Object.values(updated).filter((v): v is string => typeof v === 'string' && v.trim().length > 0).length;
    if (answeredCount >= 20) {
      setAchievements(prev => prev.map(a => a.id === 'ach-777' ? { ...a, unlocked: true } : a));
    }
  };

  const handleClearAnswers = () => {
    setAnswers({});
  };

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundFx.isMuted = next;
    if (!next) {
      soundFx.playClick();
    }
  };

  const handleToggleAchievement = (id: string) => {
    setAchievements(prev => 
      prev.map(a => a.id === id ? { ...a, unlocked: !a.unlocked } : a)
    );
  };

  const answeredCount = Object.values(answers).filter((v): v is string => typeof v === 'string' && v.trim().length > 0).length;

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-[#e2e8f0] flex flex-col justify-between selection:bg-white selection:text-black">
      {/* Top Navbar */}
      <Navbar 
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        answeredCount={answeredCount}
      />

      {/* Main Screen Content with Transitions */}
      <main className="flex-1 pb-16 lg:pb-0">
        <AnimatePresence mode="wait">
          {currentScreen === 'splash' && (
            <motion.div
              key="splash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SplashScreen onStartEngine={() => setCurrentScreen('home')} />
            </motion.div>
          )}

          {currentScreen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <HomeScreen 
                onNavigate={setCurrentScreen} 
                answeredCount={answeredCount} 
              />
            </motion.div>
          )}

          {currentScreen === 'garage' && (
            <motion.div
              key="garage"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <GarageScreen />
            </motion.div>
          )}

          {currentScreen === 'journey' && (
            <motion.div
              key="journey"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <JourneyScreen />
            </motion.div>
          )}

          {currentScreen === 'questions' && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <QuestionsScreen 
                answers={answers}
                onSaveAnswer={handleSaveAnswer}
                onClearAnswers={handleClearAnswers}
              />
            </motion.div>
          )}

          {currentScreen === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ProfileScreen 
                profile={profile}
                onUpdateProfile={setProfile}
              />
            </motion.div>
          )}

          {currentScreen === 'next-chapter' && (
            <motion.div
              key="next-chapter"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <NextChapterScreen onNavigate={setCurrentScreen} />
            </motion.div>
          )}

          {currentScreen === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CountdownScreen />
            </motion.div>
          )}

          {currentScreen === 'mobile-dash' && (
            <motion.div
              key="mobile-dash"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <MobileDashScreen />
            </motion.div>
          )}

          {currentScreen === 'achievements' && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AchievementsScreen 
                achievements={achievements}
                onToggleUnlock={handleToggleAchievement}
              />
            </motion.div>
          )}

          {currentScreen === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <QuizScreen />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Bar for touch navigation */}
      <MobileBottomNav
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        answeredCount={answeredCount}
      />

      {/* Global Footer */}
      <Footer onNavigate={setCurrentScreen} />
    </div>
  );
}
