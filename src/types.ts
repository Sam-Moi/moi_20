/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ScreenId = 
  | 'splash'
  | 'countdown'
  | 'home'
  | 'garage'
  | 'journey'
  | 'questions'
  | 'profile'
  | 'next-chapter'
  | 'mobile-dash'
  | 'achievements'
  | 'quiz';

export interface Car {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  tagType?: 'dream' | 'target' | 'classified' | 'future' | 'ultimate';
  power: string;
  drive: string;
  zeroSixty: string;
  topSpeed: string;
  engine: string;
  image: string;
  description: string;
  revSoundType?: 'v8' | 'v10' | 'turbo6' | 'v12';
}

export interface JourneyMilestone {
  id: string;
  number: string; // e.g. "01", "05", "10", "15", "18", "20"
  title: string;
  ageLabel: string;
  mileage?: string;
  status: string;
  destination?: string;
  description: string;
  year: number;
}

export interface QuestionData {
  id: number;
  question: string;
  placeholder?: string;
  suggestedPlaceholder?: string;
  category: string;
}

export interface DriverStats {
  ambition: number;
  discipline: number;
  adventure: number;
  curiosity: number;
  risk: number;
}

export interface DriverProfileData {
  age: number;
  mindset: string;
  dreamCar: string;
  biggestAmbition: string;
  fiveYearDestination: string;
  stats: DriverStats;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  unlocked: boolean;
  iconName: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
