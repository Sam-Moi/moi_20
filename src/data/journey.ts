/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JourneyMilestone } from '../types';

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    id: 'mile-01',
    number: '01',
    title: 'FIRST MILE',
    ageLabel: 'Age 01',
    mileage: '000001',
    status: 'IGNITION',
    year: 2006,
    description: 'Chassis created. System boots up. The journey begins with clean odometer telemetry and infinite road ahead.'
  },
  {
    id: 'mile-05',
    number: '05',
    title: 'DISCOVERY',
    ageLabel: 'Age 05',
    mileage: '004380',
    status: 'ACCELERATING',
    year: 2010,
    description: 'First explorations into how things work. Building blocks, curiosity, and finding raw mechanical drive.'
  },
  {
    id: 'mile-10',
    number: '10',
    title: 'CURIOUS',
    ageLabel: 'Age 10',
    mileage: '008760',
    status: 'CALIBRATING',
    destination: 'UNKNOWN',
    year: 2015,
    description: 'Tuning systems. Entering digital worlds, coding logic, and mapping out the coordinates of personal passion.'
  },
  {
    id: 'mile-15',
    number: '15',
    title: 'HIGH RPM',
    ageLabel: 'Age 15',
    mileage: '013140',
    status: 'SPORT MODE',
    year: 2020,
    description: 'Shifting gears into relentless focus. High school sprints, deep technical problem solving, and sharpening skills.'
  },
  {
    id: 'mile-18',
    number: '18',
    title: 'THE OVERTAKE',
    ageLabel: 'Age 18',
    mileage: '015768',
    status: 'APEX REACHED',
    year: 2023,
    description: 'Crossing into adulthood with pedal to the metal. Major independence, big decisions, and high-velocity ambition.'
  },
  {
    id: 'mile-20',
    number: '20',
    title: 'MOI 2.0',
    ageLabel: 'Age 20',
    mileage: '017520',
    status: 'MAXIMUM VELOCITY',
    year: 2026,
    description: '20 years completed. Odometer calibrated. Next chapter initialized with full torque and zero speed limiters.'
  }
];
