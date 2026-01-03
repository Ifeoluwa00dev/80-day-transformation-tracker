
import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './AppContext';
import { Home, ClipboardList, BarChart2, Layers, Settings, ChevronRight } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import DailyTasks from './pages/DailyTasks';
import PhaseOverview from './pages/PhaseOverview';
import Analytics from './pages/Analytics';
import SettingsPage from './pages/Settings';
import Onboarding from './pages/Onboarding';
import { PHASE_COLORS } from './constants';

const BottomNav = () => {
  const { currentPhase } = useApp();
  const location = useLocation();
  const color = PHASE_COLORS[currentPhase as keyof typeof PHASE_COLORS] || '#3B82F6';

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/tasks', icon: ClipboardList, label: 'Tasks' },
    { path: '/phases', icon: Layers, label: 'Phases' },
    { path: '/analytics', icon: BarChart2, label: 'Stats' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 px-2 z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
              isActive ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            <item.icon size={22} color={isActive ? color : undefined} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

const AppRoutes = () => {
  const { state } = useApp();
  
  if (!state.user) {
    return <Onboarding />;
  }

  return (
    <div className="pb-20 max-w-lg mx-auto min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<DailyTasks />} />
        <Route path="/phases" element={<PhaseOverview />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <BottomNav />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
};

export default App;
