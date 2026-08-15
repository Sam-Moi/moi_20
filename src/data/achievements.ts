/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Achievement } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-001',
    code: '#001',
    title: 'ANOTHER YEAR SURVIVED',
    description: 'Level up. 20 laps around the sun completed with zero mechanical breakdowns.',
    unlocked: true,
    iconName: 'ShieldCheck'
  },
  {
    id: 'ach-042',
    code: '#042',
    title: 'CODE MODE',
    description: 'Built projects instead of sleeping. Total logged deep-focus hours exceeding 5,000+ hrs.',
    unlocked: true,
    iconName: 'Terminal'
  },
  {
    id: 'ach-099',
    code: '#099',
    title: 'LEVEL UP',
    description: 'Acquired cutting-edge technical stacks, advanced toolsets, and system design mastery.',
    unlocked: true,
    iconName: 'TrendingUp'
  },
  {
    id: 'ach-101',
    code: '#101',
    title: 'SOLO MODE',
    description: 'Deep focus zone activated. Noise cancelled, tunnel vision locked on high-value goals.',
    unlocked: true,
    iconName: 'Compass'
  },
  {
    id: 'ach-256',
    code: '#256',
    title: 'THE BUILDER',
    description: 'Shipped over 42+ distinct digital architectures, tools, and creative experiments.',
    unlocked: false,
    iconName: 'Cpu'
  },
  {
    id: 'ach-777',
    code: '#777',
    title: 'APEX HUNTER',
    description: 'Answered and recorded all 20 telemetry milestone reflections for MOI 2.0.',
    unlocked: false,
    iconName: 'Target'
  },
  {
    id: 'ach-888',
    code: '#888',
    title: 'HYPERDRIVE',
    description: 'Redlined the virtual engine past 8,500 RPM on the garage dyno simulator.',
    unlocked: false,
    iconName: 'Zap'
  },
  {
    id: 'ach-999',
    code: '#999',
    title: 'THE 2026 EDITION',
    description: 'Executed complete launch sequence for MOI / 20 with full celebration confetti.',
    unlocked: false,
    iconName: 'Flame'
  }
];
