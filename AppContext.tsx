import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { User, AppState } from "./types";
import { ALL_TASKS } from "./constants.tsx";

// 🔥 Firebase
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

interface AppContextType {
  state: AppState;
  currentDay: number;
  currentPhase: number;
  hydrated: boolean; // ✅ added
  firebaseUser: FirebaseUser | null; // ✅ added
  saveUser: (user: User) => void;
  updateDailyTask: (date: string, taskId: string, updates: any) => void;
  updateDailyMeta: (
    date: string,
    meta: { income?: number; dmsSent?: number; reflection?: string }
  ) => void;
  resetProgress: () => void;
  getTasksForDay: (date: string) => any[];
  getDayProgress: (date: string) => number;
  getStreak: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "80_DAY_EVOLUTION_STATE";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 1) Load local state first (fast startup / offline backup)
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : { user: null, dailyHistory: {}, badges: [] };
  });

  // 2) Firebase auth user + hydration flag
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Prevent cloud save from running before we finish initial cloud load
  const didInitialCloudLoad = useRef(false);
  const saveTimer = useRef<number | null>(null);

  // Keep localStorage backup always
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Helper: day number
  const getDayNumber = (dateStr: string, startDateStr: string) => {
    return (
      Math.floor(
        (new Date(dateStr).getTime() - new Date(startDateStr).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1
    );
  };

  const getTasksForDayInternal = (date: string, startDate: string) => {
    if (!startDate) return [];
    const day = getDayNumber(date, startDate);
    const dayOfWeek = new Date(date).getDay();
    return ALL_TASKS.filter((task) => {
      const inPhase = day >= task.phaseRange[0] && day <= task.phaseRange[1];
      if (!inPhase) return false;
      if (task.isWeekly && task.weeklyDays) {
        return task.weeklyDays.includes(dayOfWeek);
      }
      return true;
    });
  };

  // ✅ Current day/phase
  const currentDay = state.user
    ? Math.max(
        1,
        Math.min(
          80,
          Math.floor(
            (new Date().getTime() - new Date(state.user.startDate).getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1
        )
      )
    : 1;

  const currentPhase = Math.ceil(currentDay / 20);

  // ✅ Save user from onboarding
  const saveUser = (user: User) => setState((prev) => ({ ...prev, user }));

  // ✅ Update task completion
  const updateDailyTask = (date: string, taskId: string, updates: any) => {
    setState((prev) => {
      const history = { ...prev.dailyHistory };
      if (!history[date]) {
        history[date] = { tasks: {}, income: 0, dmsSent: 0, completionPercentage: 0 };
      }
      history[date].tasks[taskId] = { ...history[date].tasks[taskId], ...updates };

      // Recalculate percentage using the latest "prev" state (not the outer "state")
      const dayTasks = getTasksForDayInternal(date, prev.user?.startDate || "");
      const completedCount = dayTasks.filter(
        (t) => history[date].tasks[t.id]?.completed
      ).length;

      history[date].completionPercentage =
        dayTasks.length > 0 ? (completedCount / dayTasks.length) * 100 : 0;

      return { ...prev, dailyHistory: history };
    });
  };

  const updateDailyMeta = (
    date: string,
    meta: { income?: number; dmsSent?: number; reflection?: string }
  ) => {
    setState((prev) => {
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

  const getTasksForDay = useCallback(
    (date: string) => getTasksForDayInternal(date, state.user?.startDate || ""),
    [state.user?.startDate]
  );

  const getDayProgress = useCallback(
    (date: string) => state.dailyHistory[date]?.completionPercentage || 0,
    [state.dailyHistory]
  );

  const getStreak = useCallback(() => {
    if (!state.user) return 0;
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 80; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split("T")[0];
      const progress = state.dailyHistory[dateKey]?.completionPercentage || 0;

      if (progress >= 70) {
        streak++;
      } else if (i === 0) {
        continue;
      } else {
        break;
      }
    }
    return streak;
  }, [state.user, state.dailyHistory]);

  // ============================
  // 🔥 FIREBASE CLOUD SYNC
  // ============================

  // 1) Listen for auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setFirebaseUser(u);

      // If logged out, we are "hydrated" (use local state)
      if (!u) {
        didInitialCloudLoad.current = false;
        setHydrated(true);
        return;
      }

      // If logged in, load cloud state once
      try {
        const ref = doc(db, "users", u.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const cloudState = snap.data()?.appState as AppState | undefined;
          if (cloudState) {
            setState(cloudState);
          }
        } else {
          // Create initial document so future saves are clean
          await setDoc(
            doc(db, "users", u.uid),
            { appState: state, createdAt: serverTimestamp() },
            { merge: true }
          );
        }

        didInitialCloudLoad.current = true;
      } catch (e) {
        console.error("Cloud load failed:", e);
        // Even if cloud fails, allow the app to run locally
        didInitialCloudLoad.current = true;
      } finally {
        setHydrated(true);
      }
    });

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Auto-save to cloud whenever state changes (debounced)
  useEffect(() => {
    if (!firebaseUser) return;
    if (!hydrated) return;
    if (!didInitialCloudLoad.current) return;

    // Debounce saves to avoid spamming Firestore
    if (saveTimer.current) window.clearTimeout(saveTimer.current);

    saveTimer.current = window.setTimeout(async () => {
      try {
        await setDoc(
          doc(db, "users", firebaseUser.uid),
          { appState: state, updatedAt: serverTimestamp() },
          { merge: true }
        );
      } catch (e) {
        console.error("Cloud save failed:", e);
      }
    }, 800);

    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [state, firebaseUser, hydrated]);

  return (
    <AppContext.Provider
      value={{
        state,
        currentDay,
        currentPhase,
        hydrated,
        firebaseUser,
        saveUser,
        updateDailyTask,
        updateDailyMeta,
        resetProgress,
        getTasksForDay,
        getDayProgress,
        getStreak,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
