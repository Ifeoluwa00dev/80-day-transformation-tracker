
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, AppState, DailyData, Category } from './types';
import { ALL_TASKS } from './constants.tsx';

interface AppContextType {
  state: AppState;
  currentDay: number;
  currentPhase: number;
  saveUser: (user: User) => void;
  updateDailyTask: (date: string, taskId: string, updates: any) => void;
  updateDailyMeta: (date: string, meta: { income?: number; dmsSent?: number; reflection?: string }) => void;
  resetProgress: () => void;
  getTasksForDay: (date: string) => any[];
  getDayProgress: (date: string) => number;
  getStreak: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = '80_DAY_EVOLUTION_STATE';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : { user: null, dailyHistory: {}, badges: [] };
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const currentDay = state.user 
    ? Math.max(1, Math.min(80, Math.floor((new Date().getTime() - new Date(state.user.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1))
    : 1;

  const currentPhase = Math.ceil(currentDay / 20);

  const saveUser = (user: User) => setState(prev => ({ ...prev, user }));

  const updateDailyTask = (date: string, taskId: string, updates: any) => {
    setState(prev => {
      const history = { ...prev.dailyHistory };
      if (!history[date]) {
        history[date] = { tasks: {}, income: 0, dmsSent: 0, completionPercentage: 0 };
      }
      history[date].tasks[taskId] = { ...history[date].tasks[taskId], ...updates };
      
      // Recalculate percentage
      const dayTasks = getTasksForDayInternal(date, state.user?.startDate || '');
      const completedCount = dayTasks.filter(t => history[date].tasks[t.id]?.completed).length;
      history[date].completionPercentage = dayTasks.length > 0 ? (completedCount / dayTasks.length) * 100 : 0;

      return { ...prev, dailyHistory: history };
    });
  };

  const updateDailyMeta = (date: string, meta: { income?: number; dmsSent?: number; reflection?: string }) => {
    setState(prev => {
      const history = { ...prev.dailyHistory };
      if (!history[date]) {
        history[date] = { tasks: {}, income: 0, dmsSent: 0, completionPercentage: 0 };
      }
      history[date] = { ...history[date], ...meta };
      return { ...prev, dailyHistory: history };
    });
  };

  const resetProgress = () => {
    setState({ user: null, dailyHistory: {}, badges: [] });
  };

  const getDayNumber = (dateStr: string, startDateStr: string) => {
    return Math.floor((new Date(dateStr).getTime() - new Date(startDateStr).getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  const getTasksForDayInternal = (date: string, startDate: string) => {
    if (!startDate) return [];
    const day = getDayNumber(date, startDate);
    const dayOfWeek = new Date(date).getDay();
    return ALL_TASKS.filter(task => {
      const inPhase = day >= task.phaseRange[0] && day <= task.phaseRange[1];
      if (!inPhase) return false;
      if (task.isWeekly && task.weeklyDays) {
        return task.weeklyDays.includes(dayOfWeek);
      }
      return true;
    });
  };

  const getTasksForDay = useCallback((date: string) => {
    return getTasksForDayInternal(date, state.user?.startDate || '');
  }, [state.user?.startDate]);

  const getDayProgress = useCallback((date: string) => {
    return state.dailyHistory[date]?.completionPercentage || 0;
  }, [state.dailyHistory]);

  const getStreak = useCallback(() => {
    if (!state.user) return 0;
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 80; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      const progress = state.dailyHistory[dateKey]?.completionPercentage || 0;
      
      if (progress >= 70) {
        streak++;
      } else if (i === 0) {
        // Today doesn't count against streak until day is over, but let's check yesterday
        continue;
      } else {
        break;
      }
    }
    return streak;
  }, [state.user, state.dailyHistory]);

  return (
    <AppContext.Provider value={{
      state,
      currentDay,
      currentPhase,
      saveUser,
      updateDailyTask,
      updateDailyMeta,
      resetProgress,
      getTasksForDay,
      getDayProgress,
      getStreak
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
