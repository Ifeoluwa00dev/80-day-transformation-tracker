import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { Category } from '../types';
import { ChevronDown, Check, X, FileText, DollarSign, MessageSquare, Calendar, Sparkles } from 'lucide-react';
import { PHASE_COLORS } from '../constants';

const DailyTasks: React.FC = () => {
  const { currentPhase, getTasksForDay, state, updateDailyTask, updateDailyMeta } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    [Category.CAREER]: true,
    [Category.FINANCE]: true,
    [Category.HEALTH]: true,
    [Category.HYGIENE]: true,
  });

  const tasks = getTasksForDay(selectedDate);
  const dailyData = state.dailyHistory[selectedDate] || { tasks: {}, income: 0, dmsSent: 0 };
  const phaseColor = PHASE_COLORS[currentPhase as keyof typeof PHASE_COLORS];

  const toggleExpand = (cat: Category) => setExpanded(prev => ({ ...prev, [cat]: !prev[cat] }));

  const categories = [Category.CAREER, Category.FINANCE, Category.HEALTH, Category.HYGIENE];

  const categoryData = {
    [Category.CAREER]: { 
      icon: '💼', 
      gradient: 'from-blue-500 via-indigo-500 to-purple-600',
      lightBg: 'from-blue-50 to-indigo-50',
      accentColor: '#3B82F6'
    },
    [Category.FINANCE]: { 
      icon: '💰', 
      gradient: 'from-emerald-500 via-green-500 to-teal-600',
      lightBg: 'from-emerald-50 to-green-50',
      accentColor: '#10B981'
    },
    [Category.HEALTH]: { 
      icon: '💪', 
      gradient: 'from-orange-500 via-red-500 to-pink-600',
      lightBg: 'from-orange-50 to-red-50',
      accentColor: '#F59E0B'
    },
    [Category.HYGIENE]: { 
      icon: '✨', 
      gradient: 'from-purple-500 via-pink-500 to-rose-600',
      lightBg: 'from-purple-50 to-pink-50',
      accentColor: '#A855F7'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/40 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Premium Header */}
        <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/60">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-400/10 to-pink-400/10 rounded-full -ml-20 -mb-20 blur-3xl" />
          
          <div className="relative z-10 flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-3xl shadow-2xl">
              <Calendar className="text-white" size={32} />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-1">
                Daily Tasks
              </h1>
              <p className="text-gray-600 font-semibold">Complete your evolution checklist</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Phase {currentPhase}</div>
              <div className="text-2xl font-black" style={{ color: phaseColor }}>
                {Object.keys(dailyData.tasks).filter(id => dailyData.tasks[id]?.completed).length}/{tasks.length}
              </div>
            </div>
          </div>
        </div>

        {/* Premium Date Selector */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-[2rem] blur-xl" />
          <div className="relative bg-white/90 backdrop-blur-xl p-4 rounded-[2rem] border border-white/80 shadow-2xl">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
              {[...Array(7)].map((_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - (6 - i));
                const key = d.toISOString().split('T')[0];
                const isSelected = selectedDate === key;
                const isToday = new Date().toISOString().split('T')[0] === key;
                const dayProgress = state.dailyHistory[key] ? 
                  (Object.values(state.dailyHistory[key].tasks).filter((t: any) => t.completed).length / 
                   getTasksForDay(key).length * 100) : 0;
                
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedDate(key)}
                    className={`relative flex-shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 group ${
                      isSelected 
                        ? 'text-white shadow-2xl scale-110 z-10' 
                        : 'text-gray-400 hover:scale-105 hover:bg-gray-50'
                    }`}
                    style={{ 
                      background: isSelected 
                        ? `linear-gradient(135deg, ${phaseColor} 0%, ${phaseColor}dd 100%)` 
                        : undefined 
                    }}
                  >
                    {isSelected && (
                      <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse" />
                    )}
                    <span className="text-xs font-bold uppercase tracking-wider mb-1 relative z-10">
                      {d.toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                    <span className="text-3xl font-black relative z-10">{d.getDate()}</span>
                    {!isSelected && dayProgress > 0 && (
                      <div className="absolute bottom-2 w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all"
                          style={{ width: `${dayProgress}%` }}
                        />
                      </div>
                    )}
                    {isToday && !isSelected && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full shadow-lg animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Premium Tasks List */}
        {categories.map(cat => {
          const catTasks = tasks.filter(t => t.category === cat);
          const isOpen = expanded[cat];
          const completedCount = catTasks.filter(t => dailyData.tasks[t.id]?.completed).length;
          const progress = (completedCount / catTasks.length) * 100;
          const catData = categoryData[cat];

          return (
            <div key={cat} className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r ${catData.gradient} opacity-0 group-hover:opacity-10 rounded-[2rem] transition-opacity duration-500 blur-xl`} />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-[2rem] border border-white/80 overflow-hidden shadow-2xl">
                <button
                  onClick={() => toggleExpand(cat)}
                  className={`w-full p-6 flex justify-between items-center transition-all duration-300 bg-gradient-to-r ${catData.lightBg}`}
                >
                  <div className="flex items-center gap-5">
                    <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${catData.gradient} flex items-center justify-center text-3xl shadow-2xl transform group-hover:scale-110 transition-transform`}>
                      <div className="absolute inset-0 bg-white/20 rounded-2xl animate-pulse" />
                      <span className="relative z-10">{catData.icon}</span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-black text-gray-900 uppercase tracking-wider text-lg mb-2">{cat}</h3>
                      <div className="flex items-center gap-3">
                        <div className="relative w-32 h-2 bg-white/80 rounded-full overflow-hidden shadow-inner">
                          <div 
                            className={`absolute inset-0 h-full rounded-full bg-gradient-to-r ${catData.gradient} transition-all duration-700`}
                            style={{ width: `${progress}%` }}
                          >
                            <div className="absolute inset-0 bg-white/30 animate-pulse" />
                          </div>
                        </div>
                        <span className="text-sm font-black text-gray-700">
                          {completedCount}/{catTasks.length}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={`transform transition-transform duration-300 p-2 rounded-xl bg-white/50 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={24} className="text-gray-600" strokeWidth={3} />
                  </div>
                </button>

                {isOpen && (
                  <div className="divide-y divide-gray-100/50">
                    {catTasks.map((task, index) => {
                      const status = dailyData.tasks[task.id] || { completed: false, skipped: false };
                      return (
                        <div 
                          key={task.id} 
                          className={`p-6 transition-all duration-300 ${
                            status.completed 
                              ? 'bg-gradient-to-r from-green-50/50 to-emerald-50/50' 
                              : status.skipped 
                              ? 'bg-gradient-to-r from-red-50/30 to-pink-50/30' 
                              : 'hover:bg-gray-50/50'
                          }`}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex items-center gap-5">
                            <button
                              onClick={() => updateDailyTask(selectedDate, task.id, { completed: !status.completed, skipped: false, timestamp: Date.now() })}
                              className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 ${
                                status.completed 
                                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-2 border-green-400 text-white shadow-green-200' 
                                  : 'bg-white border-2 border-gray-300 text-transparent hover:border-gray-400 hover:shadow-xl'
                              }`}
                            >
                              <Check size={24} strokeWidth={4} />
                              {status.completed && (
                                <div className="absolute inset-0 bg-white/30 rounded-2xl animate-pulse" />
                              )}
                            </button>
                            
                            <div className="flex-1">
                              <p className={`text-base font-bold transition-all ${
                                status.completed 
                                  ? 'text-gray-400 line-through' 
                                  : status.skipped
                                  ? 'text-red-400'
                                  : 'text-gray-900'
                              }`}>
                                {task.name}
                              </p>
                            </div>

                            <div className="flex gap-3">
                               <button 
                                 onClick={() => {
                                   const note = prompt("Add a note:", status.notes || "");
                                   if (note !== null) updateDailyTask(selectedDate, task.id, { notes: note });
                                 }}
                                 className={`p-3 rounded-xl transition-all hover:scale-110 shadow-md ${
                                   status.notes 
                                     ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-200' 
                                     : 'bg-white border-2 border-gray-200 text-gray-400 hover:border-gray-300'
                                 }`}
                               >
                                 <FileText size={20} />
                               </button>
                               <button 
                                 onClick={() => updateDailyTask(selectedDate, task.id, { skipped: !status.skipped, completed: false })}
                                 className={`p-3 rounded-xl transition-all hover:scale-110 shadow-md ${
                                   status.skipped 
                                     ? 'bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-red-200' 
                                     : 'bg-white border-2 border-gray-200 text-gray-400 hover:border-gray-300'
                                 }`}
                               >
                                 <X size={20} />
                               </button>
                            </div>
                          </div>
                          {status.notes && (
                            <div className="ml-17 mt-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border-2 border-blue-100 shadow-lg">
                              <div className="flex items-start gap-2">
                                <Sparkles size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-gray-700 italic leading-relaxed">{status.notes}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {cat === Category.FINANCE && (
                       <div className="p-6 bg-gradient-to-r from-gray-50/50 to-white/50 flex flex-col gap-4">
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative flex items-center gap-4 bg-white/90 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-green-300 transition-all shadow-lg">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center shadow-xl">
                                <DollarSign size={24} />
                              </div>
                              <input 
                                type="number"
                                placeholder="Earnings today..."
                                value={dailyData.income || ''}
                                onChange={(e) => updateDailyMeta(selectedDate, { income: Number(e.target.value) })}
                                className="flex-1 bg-transparent border-none focus:ring-0 text-base font-bold placeholder-gray-400 outline-none"
                              />
                            </div>
                          </div>
                          <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative flex items-center gap-4 bg-white/90 backdrop-blur-sm p-5 rounded-2xl border-2 border-gray-100 hover:border-blue-300 transition-all shadow-lg">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-xl">
                                <MessageSquare size={24} />
                              </div>
                              <input 
                                type="number"
                                placeholder="DMs sent today..."
                                value={dailyData.dmsSent || ''}
                                onChange={(e) => updateDailyMeta(selectedDate, { dmsSent: Number(e.target.value) })}
                                className="flex-1 bg-transparent border-none focus:ring-0 text-base font-bold placeholder-gray-400 outline-none"
                              />
                            </div>
                          </div>
                       </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Premium Reflection Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-70 transition-opacity" />
          <div className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 rounded-[2.5rem] p-8 text-white overflow-hidden shadow-2xl border border-gray-800">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-full -ml-20 -mb-20 blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <h3 className="font-black text-xl uppercase tracking-wider text-gray-200">Day Reflection</h3>
              </div>
              <textarea
                placeholder="How did today feel? What's your focus for tomorrow?"
                value={dailyData.reflection || ''}
                onChange={(e) => updateDailyMeta(selectedDate, { reflection: e.target.value })}
                className="w-full bg-gray-800/50 backdrop-blur-sm border-2 border-gray-700/50 rounded-2xl p-6 text-base leading-relaxed focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[140px] placeholder-gray-500 transition-all outline-none resize-none shadow-inner"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyTasks;