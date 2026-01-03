import React from 'react';
import { useApp } from '../AppContext';
import { PHASE_COLORS, PHASE_THEMES } from '../constants';
import { Trophy, Flame, CheckCircle, Clock, Zap, TrendingUp, Target } from 'lucide-react';
import { TaskStatus } from '../types';

const Dashboard: React.FC = () => {
  const { currentDay, currentPhase, state, getStreak, getDayProgress } = useApp();
  
  const todayKey = new Date().toISOString().split('T')[0];
  const progress = getDayProgress(todayKey);
  const streak = getStreak();
  const phaseInfo = PHASE_THEMES[currentPhase as keyof typeof PHASE_THEMES];
  const phaseColor = PHASE_COLORS[currentPhase as keyof typeof PHASE_COLORS];

  const daysRemainingInPhase = 20 - ((currentDay - 1) % 20);

  return (
    <div className="p-5 flex flex-col gap-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 min-h-screen">
      {/* Header Card with Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50/50 p-8 rounded-[2rem] shadow-lg border border-white backdrop-blur-sm">
        <div className="absolute top-0 right-0 w-64 h-64 -mr-20 -mt-20 rounded-full blur-3xl opacity-20" 
          style={{ backgroundColor: phaseColor }} 
        />
        <div className="absolute bottom-0 left-0 w-48 h-48 -ml-16 -mb-16 rounded-full blur-2xl opacity-10"
          style={{ backgroundColor: phaseColor }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Current Journey</p>
          </div>
          <h1 className="text-6xl font-black mb-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent flex items-baseline gap-3">
            Day {currentDay} 
            <span className="text-xl text-gray-400 font-normal">/ 80</span>
          </h1>
          <div className="flex items-center gap-3 mt-6 flex-wrap">
             <span 
               className="px-4 py-2 rounded-2xl text-sm font-bold text-white shadow-lg hover:scale-105 transition-transform cursor-default" 
               style={{ backgroundColor: phaseColor }}
             >
               Phase {currentPhase}: {phaseInfo.name}
             </span>
             <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm">
               <Clock size={14} className="text-gray-400" />
               <span className="text-gray-700 text-sm font-bold">
                 {daysRemainingInPhase} days left
               </span>
             </div>
          </div>
        </div>
      </div>

      {/* Progress Card with Animations */}
      <div className="bg-white/80 backdrop-blur-sm p-7 rounded-[2rem] shadow-lg border border-white">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-lg">
              <TrendingUp className="text-white" size={20} />
            </div>
            <h2 className="font-black text-lg">Today's Progress</h2>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-blue-600 font-black text-3xl">{Math.round(progress)}</span>
            <span className="text-gray-400 font-bold text-sm">%</span>
          </div>
        </div>
        <div className="relative w-full h-5 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full overflow-hidden shadow-inner">
          <div 
            className="absolute inset-0 h-full transition-all duration-1000 ease-out rounded-full shadow-lg"
            style={{ 
              width: `${progress}%`,
              background: progress > 80 
                ? 'linear-gradient(90deg, #10B981 0%, #059669 100%)' 
                : `linear-gradient(90deg, ${phaseColor} 0%, ${phaseColor}dd 100%)`
            }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
          </div>
        </div>
        <div className="flex items-start gap-2 mt-4">
          <Zap size={16} className={`flex-shrink-0 mt-0.5 ${progress >= 80 ? 'text-green-500' : progress > 50 ? 'text-blue-500' : 'text-gray-400'}`} />
          <p className={`text-sm font-semibold ${progress >= 80 ? 'text-green-600' : progress > 50 ? 'text-blue-600' : 'text-gray-500'}`}>
            {progress >= 80 ? "Amazing work! You've crushed today's goals." : progress > 50 ? "Over halfway there, keep pushing!" : "Let's start ticking those boxes."}
          </p>
        </div>
      </div>

      {/* Enhanced Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-5">
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-3xl shadow-lg border border-orange-100/50 hover:scale-105 transition-transform">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-full -mr-10 -mt-10 blur-2xl" />
          <div className="relative flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Flame size={28} fill="currentColor" />
            </div>
            <p className="text-3xl font-black text-gray-900 mb-1">{streak}</p>
            <p className="text-xs text-gray-600 font-bold uppercase tracking-wider">Day Streak</p>
          </div>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-3xl shadow-lg border border-blue-100/50 hover:scale-105 transition-transform">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full -mr-10 -mt-10 blur-2xl" />
          <div className="relative flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <CheckCircle size={28} />
            </div>
            <p className="text-3xl font-black text-gray-900 mb-1">
              {Object.values(state.dailyHistory[todayKey]?.tasks || {}).filter((t: any) => (t as TaskStatus).completed).length}
            </p>
            <p className="text-xs text-gray-600 font-bold uppercase tracking-wider">Tasks Done</p>
          </div>
        </div>
      </div>

      {/* Enhanced Motivational Goal Card */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8 rounded-[2rem] overflow-hidden shadow-2xl border border-gray-700">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 rounded-full blur-2xl -ml-16 -mb-16" />
        <div className="absolute top-6 right-6 opacity-10">
          <Trophy size={100} strokeWidth={1.5} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Target size={16} className="text-blue-400" />
            <h3 className="text-blue-400 font-bold uppercase tracking-widest text-xs">My Why</h3>
          </div>
          <p className="text-xl font-semibold leading-relaxed">
            "{state.user?.goalStatement}"
          </p>
        </div>
      </div>

      {/* Phase Theme Section */}
      <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-gray-200/50 shadow-sm">
        <div className="text-center">
          <p className="text-gray-400 text-xs uppercase font-black tracking-widest mb-2">Phase {currentPhase} Theme</p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: phaseColor }} />
            <p className="text-gray-700 font-bold text-lg italic">"{phaseInfo.description}"</p>
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: phaseColor }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;