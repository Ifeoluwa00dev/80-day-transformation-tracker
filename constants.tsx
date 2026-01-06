import { Category, Task } from './types';

export const PHASE_COLORS = {
  1: '#0099FF', // Blue
  2: '#FFD700', // Gold/Yellow
  3: '#FF9500', // Orange
  4: '#FF3B30', // Red
};

export const PHASE_THEMES = {
  1: { name: 'Foundation', description: 'Identity Shift & Base Skills' },
  2: { name: 'Build', description: 'Skill → Product' },
  3: { name: 'Growth', description: 'Visibility & Leverage' },
  4: { name: 'Mastery', description: 'Authority & Consistency' },
};

// Theme Day Definitions
export enum ThemeDay {
  MONDAY_BUILDER = 1,      // Creating, building, making
  TUESDAY_CONNECTOR = 2,   // Relationships, outreach, networking
  WEDNESDAY_LEARNER = 3,   // Skills, knowledge, research
  THURSDAY_MARKETER = 4,   // Visibility, sharing, promoting
  FRIDAY_STRATEGIST = 5,   // Planning, reviewing, optimizing
  SATURDAY_RECHARGE = 6,   // Deep health, rest, reflection
  SUNDAY_PREP = 0,         // Week planning, admin, organizing
}

export const THEME_DAY_INFO = {
  [ThemeDay.MONDAY_BUILDER]: {
    name: 'Builder Day',
    emoji: '🔨',
    focus: 'Creating, building, making things',
  },
  [ThemeDay.TUESDAY_CONNECTOR]: {
    name: 'Connector Day',
    emoji: '🤝',
    focus: 'Relationships, outreach, networking',
  },
  [ThemeDay.WEDNESDAY_LEARNER]: {
    name: 'Learner Day',
    emoji: '📚',
    focus: 'Skills, knowledge, research',
  },
  [ThemeDay.THURSDAY_MARKETER]: {
    name: 'Marketer Day',
    emoji: '📣',
    focus: 'Visibility, sharing, promoting',
  },
  [ThemeDay.FRIDAY_STRATEGIST]: {
    name: 'Strategist Day',
    emoji: '🎯',
    focus: 'Planning, reviewing, optimizing',
  },
  [ThemeDay.SATURDAY_RECHARGE]: {
    name: 'Recharge Day',
    emoji: '🌱',
    focus: 'Deep health, rest, reflection',
  },
  [ThemeDay.SUNDAY_PREP]: {
    name: 'Prep Day',
    emoji: '🗓️',
    focus: 'Week planning, admin, organizing',
  },
};

export const ALL_TASKS: Task[] = [
  // CAREER - BUILDER DAY (Monday)
  { 
    id: 'c1', 
    category: Category.CAREER, 
    name: 'Learn No-Code Tools', 
    phaseRange: [1, 20],
    themeDays: [ThemeDay.MONDAY_BUILDER, ThemeDay.WEDNESDAY_LEARNER]
  },
  { 
    id: 'c5', 
    category: Category.CAREER, 
    name: 'Build Real MVP', 
    phaseRange: [21, 40],
    themeDays: [ThemeDay.MONDAY_BUILDER]
  },
  { 
    id: 'c8', 
    category: Category.CAREER, 
    name: 'Work on 2nd MVP', 
    phaseRange: [41, 60],
    themeDays: [ThemeDay.MONDAY_BUILDER]
  },
  { 
    id: 'c13', 
    category: Category.CAREER, 
    name: 'Build in Public', 
    phaseRange: [61, 80],
    themeDays: [ThemeDay.MONDAY_BUILDER, ThemeDay.THURSDAY_MARKETER]
  },

  // CAREER - CONNECTOR DAY (Tuesday)
  { 
    id: 'c10', 
    category: Category.CAREER, 
    name: 'Attend Online Tech Events', 
    phaseRange: [41, 60],
    themeDays: [ThemeDay.TUESDAY_CONNECTOR]
  },

  // CAREER - LEARNER DAY (Wednesday)
  { 
    id: 'c2', 
    category: Category.CAREER, 
    name: 'Learn Prompt Engineering', 
    phaseRange: [1, 20],
    themeDays: [ThemeDay.WEDNESDAY_LEARNER]
  },
  { 
    id: 'c3', 
    category: Category.CAREER, 
    name: 'Start AI App Thinking', 
    phaseRange: [1, 20],
    themeDays: [ThemeDay.WEDNESDAY_LEARNER, ThemeDay.FRIDAY_STRATEGIST]
  },
  { 
    id: 'c6', 
    category: Category.CAREER, 
    name: 'Go Deeper in AI', 
    phaseRange: [21, 40],
    themeDays: [ThemeDay.WEDNESDAY_LEARNER]
  },

  // CAREER - MARKETER DAY (Thursday)
  { 
    id: 'c7', 
    category: Category.CAREER, 
    name: 'Share Builds Publicly', 
    phaseRange: [21, 40],
    themeDays: [ThemeDay.THURSDAY_MARKETER]
  },
  { 
    id: 'c9', 
    category: Category.CAREER, 
    name: 'Share Case Studies', 
    phaseRange: [41, 60],
    themeDays: [ThemeDay.THURSDAY_MARKETER]
  },
  { 
    id: 'c12', 
    category: Category.CAREER, 
    name: 'Teach Publicly', 
    phaseRange: [61, 80],
    themeDays: [ThemeDay.THURSDAY_MARKETER]
  },

  // CAREER - STRATEGIST DAY (Friday)
  { 
    id: 'c4', 
    category: Category.CAREER, 
    name: 'Pick Agrotech Focus', 
    phaseRange: [1, 20],
    themeDays: [ThemeDay.FRIDAY_STRATEGIST]
  },
  { 
    id: 'c11', 
    category: Category.CAREER, 
    name: 'Position as Expert', 
    phaseRange: [61, 80],
    themeDays: [ThemeDay.FRIDAY_STRATEGIST]
  },

  // FINANCE - CONNECTOR DAY (Tuesday)
  { 
    id: 'f4', 
    category: Category.FINANCE, 
    name: '5-10 DMs', 
    phaseRange: [1, 20],
    themeDays: [ThemeDay.TUESDAY_CONNECTOR]
  },
  { 
    id: 'f6', 
    category: Category.FINANCE, 
    name: '20 Cold DMs', 
    phaseRange: [21, 40],
    themeDays: [ThemeDay.TUESDAY_CONNECTOR]
  },
  { 
    id: 'f10', 
    category: Category.FINANCE, 
    name: 'Strategic Outreach', 
    phaseRange: [41, 60],
    themeDays: [ThemeDay.TUESDAY_CONNECTOR]
  },
  { 
    id: 'f12', 
    category: Category.FINANCE, 
    name: 'Outreach + Follow-ups', 
    phaseRange: [61, 80],
    themeDays: [ThemeDay.TUESDAY_CONNECTOR]
  },
  { 
    id: 'f13', 
    category: Category.FINANCE, 
    name: 'Attend Physical Events', 
    phaseRange: [61, 80],
    themeDays: [ThemeDay.TUESDAY_CONNECTOR],
    isWeekly: true,
    weeklyDays: [2] // Happens on Tuesdays when available
  },

  // FINANCE - LEARNER DAY (Wednesday)
  { 
    id: 'f1', 
    category: Category.FINANCE, 
    name: 'Define Value Creation', 
    phaseRange: [1, 20],
    themeDays: [ThemeDay.WEDNESDAY_LEARNER, ThemeDay.FRIDAY_STRATEGIST]
  },
  { 
    id: 'f2', 
    category: Category.FINANCE, 
    name: 'Research MVP Ideas', 
    phaseRange: [1, 20],
    themeDays: [ThemeDay.WEDNESDAY_LEARNER]
  },

  // FINANCE - MARKETER DAY (Thursday)
  { 
    id: 'f3', 
    category: Category.FINANCE, 
    name: 'Setup Profiles', 
    phaseRange: [1, 20],
    themeDays: [ThemeDay.THURSDAY_MARKETER]
  },
  { 
    id: 'f7', 
    category: Category.FINANCE, 
    name: 'Apply for Gigs', 
    phaseRange: [21, 40],
    themeDays: [ThemeDay.THURSDAY_MARKETER]
  },

  // FINANCE - FRIDAY/MONDAY (Strategic + Building)
  { 
    id: 'f5', 
    category: Category.FINANCE, 
    name: 'Launch MVP', 
    phaseRange: [21, 40],
    themeDays: [ThemeDay.MONDAY_BUILDER, ThemeDay.FRIDAY_STRATEGIST]
  },
  { 
    id: 'f8', 
    category: Category.FINANCE, 
    name: 'YouTube Automation Setup', 
    phaseRange: [21, 40],
    themeDays: [ThemeDay.MONDAY_BUILDER]
  },
  { 
    id: 'f11', 
    category: Category.FINANCE, 
    name: 'More YouTube Channels', 
    phaseRange: [41, 60],
    themeDays: [ThemeDay.MONDAY_BUILDER]
  },
  { 
    id: 'f9', 
    category: Category.FINANCE, 
    name: 'Increase Pricing', 
    phaseRange: [41, 60],
    themeDays: [ThemeDay.FRIDAY_STRATEGIST]
  },
  { 
    id: 'f14', 
    category: Category.FINANCE, 
    name: 'Stack Income Sources', 
    phaseRange: [61, 80],
    themeDays: [ThemeDay.FRIDAY_STRATEGIST]
  },

  // HEALTH - DAILY ESSENTIALS (All days except Saturday light)
  { 
    id: 'h3', 
    category: Category.HEALTH, 
    name: '2 litres water', 
    phaseRange: [1, 80],
    themeDays: [1, 2, 3, 4, 5, 6, 0] // Every day
  },
  { 
    id: 'h6', 
    category: Category.HEALTH, 
    name: 'Brush before & after meals', 
    phaseRange: [1, 80],
    themeDays: [1, 2, 3, 4, 5, 6, 0] // Every day
  },
  { 
    id: 'h9', 
    category: Category.HEALTH, 
    name: 'Eat healthy', 
    phaseRange: [1, 80],
    themeDays: [1, 2, 3, 4, 5, 6, 0] // Every day
  },
  { 
    id: 'h10', 
    category: Category.HEALTH, 
    name: 'More proteins', 
    phaseRange: [1, 80],
    themeDays: [1, 2, 3, 4, 5, 6, 0] // Every day
  },

  // HEALTH - MORNING ROUTINE (Weekdays + Sunday prep)
  { 
    id: 'h1', 
    category: Category.HEALTH, 
    name: 'Hair grooming', 
    phaseRange: [1, 80],
    themeDays: [1, 2, 3, 4, 5, 0] // Weekdays + Sunday
  },
  { 
    id: 'h7', 
    category: Category.HEALTH, 
    name: 'Face care + body care', 
    phaseRange: [1, 80],
    themeDays: [1, 2, 3, 4, 5, 0] // Weekdays + Sunday
  },
  { 
    id: 'h8', 
    category: Category.HEALTH, 
    name: 'Perfume applied', 
    phaseRange: [1, 80],
    themeDays: [1, 2, 3, 4, 5, 0] // Weekdays + Sunday
  },

  // HEALTH - MINDFULNESS (Alternate days)
  { 
    id: 'h4', 
    category: Category.HEALTH, 
    name: '30 mins meditation', 
    phaseRange: [1, 80],
    themeDays: [1, 3, 5, 6] // Mon, Wed, Fri, Sat
  },
  { 
    id: 'h5', 
    category: Category.HEALTH, 
    name: '10 mins with God', 
    phaseRange: [1, 80],
    themeDays: [2, 4, 0] // Tue, Thu, Sun
  },
  { 
    id: 'h11', 
    category: Category.HEALTH, 
    name: 'Communicate feelings', 
    phaseRange: [1, 80],
    themeDays: [5, 6] // Fri, Sat (reflection days)
  },

  // HEALTH - SPECIAL CARE (Saturday Recharge)
  { 
    id: 'h2', 
    category: Category.HEALTH, 
    name: 'Teeth whitening (baking powder)', 
    phaseRange: [1, 80],
    themeDays: [ThemeDay.SATURDAY_RECHARGE],
    isWeekly: true,
    weeklyDays: [6]
  },

  // HEALTH - WORKOUTS (Phase-dependent)
  { 
    id: 'hw1', 
    category: Category.HEALTH, 
    name: 'Workout', 
    phaseRange: [1, 20], 
    isWeekly: true, 
    weeklyDays: [1, 3, 5] // Mon, Wed, Fri
  },
  { 
    id: 'hw2', 
    category: Category.HEALTH, 
    name: 'Workout', 
    phaseRange: [21, 80], 
    isWeekly: true, 
    weeklyDays: [1, 2, 3, 4, 5] // Weekdays
  },
  { 
    id: 'hg1', 
    category: Category.HEALTH, 
    name: 'Gym', 
    phaseRange: [1, 20], 
    isWeekly: true, 
    weeklyDays: [2, 4] // Tue, Thu
  },
  { 
    id: 'hg2', 
    category: Category.HEALTH, 
    name: 'Gym', 
    phaseRange: [21, 80], 
    isWeekly: true, 
    weeklyDays: [1, 3, 5] // Mon, Wed, Fri
  },

  // HYGIENE - DAILY ESSENTIALS (All days)
  { 
    id: 'hy1', 
    category: Category.HYGIENE, 
    name: 'Shower twice', 
    phaseRange: [1, 80],
    themeDays: [1, 2, 3, 4, 5, 6, 0] // Every day
  },
  { 
    id: 'hy2', 
    category: Category.HYGIENE, 
    name: 'Clean clothes', 
    phaseRange: [1, 80],
    themeDays: [1, 2, 3, 4, 5, 6, 0] // Every day
  },
  { 
    id: 'hy3', 
    category: Category.HYGIENE, 
    name: 'Oral hygiene checklist', 
    phaseRange: [1, 80],
    themeDays: [1, 2, 3, 4, 5, 6, 0] // Every day
  },

  // HYGIENE - WEEKLY MAINTENANCE
  { 
    id: 'hyw1', 
    category: Category.HYGIENE, 
    name: 'Nails trimmed', 
    phaseRange: [1, 80], 
    isWeekly: true, 
    weeklyDays: [0] // Sunday Prep
  },
  { 
    id: 'hyw2', 
    category: Category.HYGIENE, 
    name: 'Room cleaned', 
    phaseRange: [1, 80], 
    isWeekly: true, 
    weeklyDays: [6] // Saturday Recharge
  },
];

// Helper function to get tasks for a specific day
export function getTasksForDay(dayOfWeek: number, currentDay: number): Task[] {
  return ALL_TASKS.filter(task => {
    // Check if task is in current phase
    if (currentDay < task.phaseRange[0] || currentDay > task.phaseRange[1]) {
      return false;
    }

    // For weekly tasks, check if it's the right day
    if (task.isWeekly && task.weeklyDays) {
      return task.weeklyDays.includes(dayOfWeek);
    }

    // For theme day tasks, check if it matches the current day
    if (task.themeDays) {
      return task.themeDays.includes(dayOfWeek);
    }

    return false;
  });
}