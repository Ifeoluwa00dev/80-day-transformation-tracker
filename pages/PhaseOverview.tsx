import React from 'react';
import { useApp } from '../AppContext';
import { PHASE_COLORS, PHASE_THEMES, ALL_TASKS } from '../constants';
import { CheckCircle2, Lock, Sparkles, TrendingUp, Zap, Crown } from 'lucide-react';

const PhaseOverview: React.FC = () => {
  const { currentPhase, state } = useApp();

  const phaseIcons = ['🎯', '🚀', '⚡', '👑'];
  const phaseEmojis = {
    1: '🌱',
    2: '💪',
    3: '🔥',
    4: '💎'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/40 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Premium Header */}
        <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/60">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-400/10 to-indigo-400/10 rounded-full -ml-20 -mb-20 blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-3xl shadow-2xl">
                <Crown className="text-white" size={32} />
              </div>
              <div className="flex-1">
                <h1 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
                  Journey Phases
                </h1>
                <p className="text-gray-600 font-semibold text-lg mt-1">Track your long-term evolution path</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-bold text-gray-500">Currently in Phase {currentPhase}</span>
            </div>
          </div>
        </div>

        {/* Premium Phase Cards */}
        {[1, 2, 3, 4].map((phaseNum, index) => {
          const info = PHASE_THEMES[phaseNum as keyof typeof PHASE_THEMES];
          const color = PHASE_COLORS[phaseNum as keyof typeof PHASE_COLORS];
          const isActive = currentPhase === phaseNum;
          const isLocked = currentPhase < phaseNum;
          const isCompleted = currentPhase > phaseNum;
          
          const phaseTasks = ALL_TASKS.filter(t => t.phaseRange[0] === (phaseNum - 1) * 20 + 1);
          
          return (
            <div 
              key={phaseNum}
              className="relative group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow Effect */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r opacity-30 rounded-[2.5rem] blur-2xl transition-opacity"
                  style={{ 
                    backgroundImage: `linear-gradient(135deg, ${color}40, ${color}20)` 
                  }} 
                />
              )}
              
              <div 
                className={`relative rounded-[2.5rem] overflow-hidden transition-all duration-500 border ${
                  isActive 
                    ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-white scale-[1.02] z-10' 
                    : isCompleted
                    ? 'bg-white/90 backdrop-blur-xl shadow-xl border-white/80 hover:shadow-2xl hover:scale-[1.01]'
                    : 'bg-white/70 backdrop-blur-sm border-white/60 shadow-lg'
                }`}
              >
                {/* Gradient Background Overlay */}
                {isActive && (
                  <div className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{ 
                      background: `linear-gradient(135deg, ${color}30, transparent)` 
                    }}
                  />
                )}
                
                {isCompleted && (
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/20 pointer-events-none" />
                )}

                {/* Lock Overlay for Future Phases */}
                {isLocked && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-[2.5rem] z-20 flex items-center justify-center">
                    <div className="bg-white shadow-2xl p-6 rounded-3xl border-2 border-gray-200 transform hover:scale-110 transition-transform">
                       <Lock size={40} className="text-gray-400" strokeWidth={2.5} />
                    </div>
                  </div>
                )}

                <div className="relative z-10 p-8">
                  {/* Phase Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <p className="text-xs font-black uppercase tracking-widest text-gray-400">
                          Days {(phaseNum - 1) * 20 + 1}-{phaseNum * 20}
                        </p>
                        {isActive && (
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full border border-blue-200">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                            <span className="text-xs font-black text-blue-700 uppercase tracking-wide">Active Now</span>
                          </div>
                        )}
                        {isCompleted && (
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-200">
                            <CheckCircle2 size={14} className="text-green-600" />
                            <span className="text-xs font-black text-green-700 uppercase tracking-wide">Completed</span>
                          </div>
                        )}
                      </div>
                      <h2 className="text-4xl font-black text-gray-900 flex items-center gap-3">
                        <span className="text-5xl">{phaseEmojis[phaseNum as keyof typeof phaseEmojis]}</span>
                        {info.name}
                      </h2>
                    </div>
                    <div 
                      className="relative w-20 h-20 rounded-3xl flex items-center justify-center text-white font-black text-3xl shadow-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-300"
                      style={{ 
                        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse" />
                      <span className="relative z-10">{phaseNum}</span>
                    </div>
                  </div>

                  {/* Phase Description */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-transparent rounded-2xl blur-sm opacity-50" />
                    <div className="relative bg-gradient-to-r from-gray-50/80 to-white/50 backdrop-blur-sm p-5 rounded-2xl border border-gray-100">
                      <div className="flex items-start gap-3">
                        <Sparkles size={20} className="text-gray-400 flex-shrink-0 mt-1" strokeWidth={2.5} />
                        <p className="text-gray-700 font-bold text-lg italic leading-relaxed">
                          "{info.description}"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Deliverables */}
                  <div className="space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-2 rounded-xl shadow-lg">
                        <TrendingUp size={18} className="text-white" />
                      </div>
                      <h4 className="text-sm font-black uppercase tracking-widest text-gray-700">Key Deliverables</h4>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {phaseTasks.slice(0, 4).map((task, idx) => (
                        <div 
                          key={task.id} 
                          className="group/item relative"
                        >
                          <div className="absolute inset-0 opacity-0 group-hover/item:opacity-100 rounded-2xl blur-md transition-opacity"
                            style={{ 
                              background: `linear-gradient(90deg, ${color}20, transparent)` 
                            }}
                          />
                          <div className="relative flex items-center gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all hover:shadow-lg">
                            <div 
                              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-xl transform group-hover/item:scale-110 group-hover/item:rotate-3 transition-all"
                              style={{ 
                                background: `linear-gradient(135deg, ${color}, ${color}dd)`
                              }}
                            >
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <span className="text-base font-bold text-gray-800 leading-relaxed">{task.name}</span>
                            </div>
                            {isCompleted && (
                              <CheckCircle2 size={20} className="text-green-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Phase Progress */}
                  {isActive && (
                    <div className="mt-8 pt-8 border-t-2 border-gray-100">
                       <div className="flex justify-between items-center text-sm font-bold mb-4">
                          <div className="flex items-center gap-2">
                            <Zap size={18} style={{ color }} />
                            <span className="text-gray-600 uppercase tracking-wide">Phase Progress</span>
                          </div>
                          <span className="text-2xl font-black" style={{ color }}>
                            {Math.floor(((state.user ? Math.max(0, (currentPhase - 1) * 20) : 0) / 20) * 100)}%
                          </span>
                       </div>
                       <div className="relative w-full h-4 bg-gradient-to-r from-gray-100 to-gray-50 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className="absolute inset-0 h-full rounded-full shadow-lg transition-all duration-1000"
                            style={{ 
                              width: `${((Math.min(20, (currentPhase - 1) * 20)) / 20) * 100}%`,
                              background: `linear-gradient(90deg, ${color} 0%, ${color}dd 100%)`
                            }}
                          >
                            <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer rounded-full" />
                          </div>
                       </div>
                    </div>
                  )}

                  {/* Completion Badge */}
                  {isCompleted && (
                    <div className="mt-8 pt-8 border-t-2 border-green-100">
                      <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                        <CheckCircle2 size={24} className="text-green-600" />
                        <span className="text-lg font-black text-green-700 uppercase tracking-wide">Phase Mastered</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Motivational Footer */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl border border-gray-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-full -ml-20 -mb-20 blur-3xl" />
          
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="text-yellow-400" size={24} />
              <h3 className="text-2xl font-black uppercase tracking-wider">Your Evolution Journey</h3>
              <Sparkles className="text-yellow-400" size={24} />
            </div>
            <p className="text-gray-300 text-lg font-semibold leading-relaxed max-w-2xl mx-auto">
              Each phase builds upon the last, transforming you into the person you're destined to become. Stay committed, trust the process.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default PhaseOverview;