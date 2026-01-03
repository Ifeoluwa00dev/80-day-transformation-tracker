
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

export const ALL_TASKS: Task[] = [
  // CAREER
  { id: 'c1', category: Category.CAREER, name: 'Learn No-Code Tools', phaseRange: [1, 20] },
  { id: 'c2', category: Category.CAREER, name: 'Learn Prompt Engineering', phaseRange: [1, 20] },
  { id: 'c3', category: Category.CAREER, name: 'Start AI App Thinking', phaseRange: [1, 20] },
  { id: 'c4', category: Category.CAREER, name: 'Pick Agrotech Focus', phaseRange: [1, 20] },
  
  { id: 'c5', category: Category.CAREER, name: 'Build Real MVP', phaseRange: [21, 40] },
  { id: 'c6', category: Category.CAREER, name: 'Go Deeper in AI', phaseRange: [21, 40] },
  { id: 'c7', category: Category.CAREER, name: 'Share Builds Publicly', phaseRange: [21, 40] },

  { id: 'c8', category: Category.CAREER, name: 'Work on 2nd MVP', phaseRange: [41, 60] },
  { id: 'c9', category: Category.CAREER, name: 'Share Case Studies', phaseRange: [41, 60] },
  { id: 'c10', category: Category.CAREER, name: 'Attend Online Tech Events', phaseRange: [41, 60] },

  { id: 'c11', category: Category.CAREER, name: 'Position as Expert', phaseRange: [61, 80] },
  { id: 'c12', category: Category.CAREER, name: 'Teach Publicly', phaseRange: [61, 80] },
  { id: 'c13', category: Category.CAREER, name: 'Build in Public', phaseRange: [61, 80] },

  // FINANCE
  { id: 'f1', category: Category.FINANCE, name: 'Define Value Creation', phaseRange: [1, 20] },
  { id: 'f2', category: Category.FINANCE, name: 'Research MVP Ideas', phaseRange: [1, 20] },
  { id: 'f3', category: Category.FINANCE, name: 'Setup Profiles', phaseRange: [1, 20] },
  { id: 'f4', category: Category.FINANCE, name: 'Daily 5-10 DMs', phaseRange: [1, 20] },

  { id: 'f5', category: Category.FINANCE, name: 'Launch MVP', phaseRange: [21, 40] },
  { id: 'f6', category: Category.FINANCE, name: '20 Cold DMs Daily', phaseRange: [21, 40] },
  { id: 'f7', category: Category.FINANCE, name: 'Apply for Gigs', phaseRange: [21, 40] },
  { id: 'f8', category: Category.FINANCE, name: 'YouTube Automation Setup', phaseRange: [21, 40] },

  { id: 'f9', category: Category.FINANCE, name: 'Increase Pricing', phaseRange: [41, 60] },
  { id: 'f10', category: Category.FINANCE, name: 'Strategic Outreach', phaseRange: [41, 60] },
  { id: 'f11', category: Category.FINANCE, name: 'More YouTube Channels', phaseRange: [41, 60] },

  { id: 'f12', category: Category.FINANCE, name: 'Daily Outreach + Follow-ups', phaseRange: [61, 80] },
  { id: 'f13', category: Category.FINANCE, name: 'Attend Physical Events', phaseRange: [61, 80] },
  { id: 'f14', category: Category.FINANCE, name: 'Stack Income Sources', phaseRange: [61, 80] },

  // HEALTH (Universal 1-80 unless marked)
  { id: 'h1', category: Category.HEALTH, name: 'Hair grooming', phaseRange: [1, 80] },
  { id: 'h2', category: Category.HEALTH, name: 'Teeth whitening (baking powder)', phaseRange: [1, 80] },
  { id: 'h3', category: Category.HEALTH, name: '2 litres water', phaseRange: [1, 80] },
  { id: 'h4', category: Category.HEALTH, name: '30 mins meditation', phaseRange: [1, 80] },
  { id: 'h5', category: Category.HEALTH, name: '10 mins with God', phaseRange: [1, 80] },
  { id: 'h6', category: Category.HEALTH, name: 'Brush before & after meals', phaseRange: [1, 80] },
  { id: 'h7', category: Category.HEALTH, name: 'Face care + body care', phaseRange: [1, 80] },
  { id: 'h8', category: Category.HEALTH, name: 'Perfume applied', phaseRange: [1, 80] },
  { id: 'h9', category: Category.HEALTH, name: 'Eat healthy', phaseRange: [1, 80] },
  { id: 'h10', category: Category.HEALTH, name: 'More proteins', phaseRange: [1, 80] },
  { id: 'h11', category: Category.HEALTH, name: 'Communicate feelings', phaseRange: [1, 80] },
  // Weekly Health
  { id: 'hw1', category: Category.HEALTH, name: 'Workout', phaseRange: [1, 20], isWeekly: true, weeklyDays: [1, 3, 5] },
  { id: 'hw2', category: Category.HEALTH, name: 'Workout', phaseRange: [21, 80], isWeekly: true, weeklyDays: [1, 2, 3, 4, 5] },
  { id: 'hg1', category: Category.HEALTH, name: 'Gym', phaseRange: [1, 20], isWeekly: true, weeklyDays: [2, 4] },
  { id: 'hg2', category: Category.HEALTH, name: 'Gym', phaseRange: [21, 80], isWeekly: true, weeklyDays: [1, 3, 5] },

  // HYGIENE
  { id: 'hy1', category: Category.HYGIENE, name: 'Shower twice', phaseRange: [1, 80] },
  { id: 'hy2', category: Category.HYGIENE, name: 'Clean clothes', phaseRange: [1, 80] },
  { id: 'hy3', category: Category.HYGIENE, name: 'Oral hygiene checklist', phaseRange: [1, 80] },
  // Weekly Hygiene
  { id: 'hyw1', category: Category.HYGIENE, name: 'Nails trimmed', phaseRange: [1, 80], isWeekly: true, weeklyDays: [0] },
  { id: 'hyw2', category: Category.HYGIENE, name: 'Room cleaned', phaseRange: [1, 80], isWeekly: true, weeklyDays: [6] },
];
