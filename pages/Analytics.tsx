import React from 'react';
import { useApp } from '../AppContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, AreaChart, Area } from 'recharts';
import { Category, DailyData, TaskStatus } from '../types';
import { ALL_TASKS } from '../constants';
import { TrendingUp, DollarSign, MessageSquare, Award, Zap, Target } from 'lucide-react';

const Analytics: React.FC = () => {
  const { state, getDayProgress, getStreak } = useApp();

  const dailyData = (Object.entries(state.dailyHistory) as [string, DailyData][])
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-7)
    .map(([date, data]) => ({
      date: date.split('-').slice(1).join('/'),
      completion: Math.round(data.completionPercentage),
    }));

  const incomeData = (Object.entries(state.dailyHistory) as [string, DailyData][])
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-14)
    .map(([date, data]) => ({
      date: date.split('-').slice(1).join('/'),
      income: data.income || 0,
    }));

  const historyValues = Object.values(state.dailyHistory) as DailyData[];
  const totalIncome = historyValues.reduce((acc, curr) => acc + (curr.income || 0), 0);
  const totalDMs = historyValues.reduce((acc, curr) => acc + (curr.dmsSent || 0), 0);
  const totalTasksDone = historyValues.reduce((acc, curr) => 
    acc + Object.values(curr.tasks).filter((t: any) => (t as TaskStatus).completed).length, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-4 shadow-2xl">
          <p className="text-xs font-bold text-gray-500 mb-1">{payload[0].payload.date}</p>
          <p className="text-lg font-black text-blue-600">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  const IncomeTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-4 shadow-2xl">
          <p className="text-xs font-bold text-gray-500 mb-1">{payload[0].payload.date}</p>
          <p className="text-lg font-black text-green-600">${payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-5 flex flex-col gap-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 min-h-screen">
      <div className="mb-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-2xl shadow-lg">
            <TrendingUp className="text-white" size={24} />
          </div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
            Performance
          </h1>
        </div>
        <p className="text-gray-600 font-medium ml-16">Visualize your growth and consistency.</p>
      </div>

      {/* Enhanced Main Stats Grid */}
      <div className="grid grid-cols-2 gap-5">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-3xl border border-green-200/50 shadow-lg hover:scale-105 transition-transform">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full -mr-10 -mt-10 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-xl shadow-lg">
                <DollarSign className="text-white" size={18} />
              </div>
              <p className="text-xs font-black uppercase text-gray-500 tracking-wider">Total Earned</p>
            </div>
            <p className="text-4xl font-black bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
              ${totalIncome}
            </p>
          </div>
        </div>
        
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-200/50 shadow-lg hover:scale-105 transition-transform">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full -mr-10 -mt-10 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-xl shadow-lg">
                <MessageSquare className="text-white" size={18} />
              </div>
              <p className="text-xs font-black uppercase text-gray-500 tracking-wider">DMs Sent</p>
            </div>
            <p className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              {totalDMs}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Completion Rate Chart */}
      <div className="bg-white/80 backdrop-blur-sm p-7 rounded-[2rem] border border-white shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-lg">
            <Target className="text-white" size={20} />
          </div>
          <h3 className="font-black text-base uppercase tracking-widest text-gray-700">7-Day Completion Rate</h3>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyData}>
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fontWeight: 'bold', fill: '#9CA3AF' }} 
              />
              <YAxis domain={[0, 100]} hide />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="completion" 
                stroke="url(#lineGradient)" 
                strokeWidth={4} 
                dot={{ r: 7, fill: '#3B82F6', strokeWidth: 3, stroke: '#fff' }} 
                activeDot={{ r: 10, stroke: '#3B82F6', strokeWidth: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Enhanced Income Evolution Chart */}
      <div className="bg-white/80 backdrop-blur-sm p-7 rounded-[2rem] border border-white shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2.5 rounded-xl shadow-lg">
            <DollarSign className="text-white" size={20} />
          </div>
          <h3 className="font-black text-base uppercase tracking-widest text-gray-700">Income Tracker</h3>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={incomeData}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fontWeight: 'bold', fill: '#9CA3AF' }} 
              />
              <YAxis hide />
              <Tooltip content={<IncomeTooltip />} />
              <Area 
                type="monotone" 
                dataKey="income" 
                stroke="#10B981" 
                fillOpacity={1} 
                fill="url(#colorIncome)" 
                strokeWidth={4}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Enhanced Summary Metrics */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[2rem] p-8 text-white overflow-hidden shadow-2xl border border-gray-700">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/10 to-indigo-500/10 rounded-full blur-2xl -ml-16 -mb-16" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-2xl shadow-lg">
              <Award className="text-white" size={24} />
            </div>
            <h3 className="font-black text-xl uppercase tracking-widest text-gray-300">Evolution Summary</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
              <div className="flex items-center gap-3">
                <Zap className="text-yellow-400" size={20} />
                <span className="text-gray-300 font-bold">Total Tasks Mastered</span>
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
                {totalTasksDone}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
              <div className="flex items-center gap-3">
                <div className="text-orange-400 text-xl">🔥</div>
                <span className="text-gray-300 font-bold">Best Streak</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  {getStreak()}
                </span>
                <span className="text-gray-500 font-bold text-sm">Days</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
               <div className="flex items-center gap-3">
                 <Award className="text-purple-400" size={20} />
                 <span className="text-gray-300 font-bold">Current Level</span>
               </div>
               <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2 rounded-2xl text-sm font-black uppercase shadow-lg">
                 Lv. {Math.ceil(totalTasksDone / 100) + 1}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;