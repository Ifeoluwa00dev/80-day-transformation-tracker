
export enum Category {
  CAREER = 'Career',
  FINANCE = 'Finance',
  HEALTH = 'Health',
  HYGIENE = 'Hygiene'
}

export interface Task {
  id: string;
  name: string;
  description?: string;
  isWeekly?: boolean;
  weeklyDays?: number[]; // 0 for Sunday, 1 for Monday, etc.
  phaseRange: [number, number]; // [minDay, maxDay]
  category: Category;
}

export interface TaskStatus {
  completed: boolean;
  skipped: boolean;
  timestamp?: number;
  notes?: string;
  timeSpent?: number; // In seconds
}

export interface DailyData {
  tasks: Record<string, TaskStatus>;
  income: number;
  dmsSent: number;
  reflection?: string;
  completionPercentage: number;
}

export interface User {
  name: string;
  startDate: string; // ISO String
  goalStatement: string;
  notificationsEnabled: boolean;
  theme: 'light' | 'dark';
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  earnedDate: string;
}

export interface AppState {
  user: User | null;
  dailyHistory: Record<string, DailyData>; // Key: YYYY-MM-DD
  badges: Badge[];
}
