import React from 'react';
import { useApp } from '../AppContext';
import { LogOut, Trash2, Download, User as UserIcon, Bell, Target, Calendar, Shield, Sparkles, Database } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { state, saveUser, resetProgress } = useApp();

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "evolution_tracker_backup.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const confirmReset = () => {
    if (window.confirm("Are you absolutely sure? This will erase ALL your progress and start data. This cannot be undone.")) {
      resetProgress();
    }
  };

  if (!state.user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/40 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Premium Header */}
        <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl border border-white/60">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-400/10 to-pink-400/10 rounded-full -ml-20 -mb-20 blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-3xl shadow-2xl">
                <Shield className="text-white" size={32} />
              </div>
              <div className="flex-1">
                <h1 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                  Settings
                </h1>
                <p className="text-gray-600 font-semibold text-lg mt-1">Manage your profile and preferences</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/80 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-lg">
                  <UserIcon className="text-white" size={20} />
                </div>
                <h3 className="font-black text-sm uppercase tracking-widest text-gray-700">Profile Information</h3>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              {/* Name Field */}
              <div className="relative group/item">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-indigo-400/5 rounded-2xl blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-5 p-5 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-100 hover:border-blue-200 transition-all shadow-lg">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                    <UserIcon size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-1">Display Name</p>
                    <p className="font-black text-xl text-gray-900">{state.user.name}</p>
                  </div>
                </div>
              </div>

              {/* Goal Statement */}
              <div className="relative group/item">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-2xl blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity" />
                <div className="relative flex items-start gap-5 p-5 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-100 hover:border-purple-200 transition-all shadow-lg">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white shadow-xl flex-shrink-0">
                    <Target size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-2">Core Goal</p>
                    <p className="font-bold text-base text-gray-800 leading-relaxed">{state.user.goalStatement}</p>
                  </div>
                </div>
              </div>

              {/* Start Date */}
              <div className="relative group/item">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-emerald-400/5 rounded-2xl blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-5 p-5 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-100 hover:border-green-200 transition-all shadow-lg">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                    <Calendar size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-black text-gray-500 uppercase tracking-wider mb-1">Journey Started</p>
                    <p className="font-black text-xl text-gray-900">
                      {new Date(state.user.startDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-yellow-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/80 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-50/50 via-amber-50/50 to-yellow-50/50 p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2.5 rounded-xl shadow-lg">
                  <Bell className="text-white" size={20} />
                </div>
                <h3 className="font-black text-sm uppercase tracking-widest text-gray-700">Preferences</h3>
              </div>
            </div>
            
            <div className="p-8">
              <div className="relative group/toggle">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-indigo-400/5 rounded-2xl blur-sm opacity-0 group-hover/toggle:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-between p-6 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-100 hover:border-blue-200 transition-all shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                      <Bell size={20} />
                    </div>
                    <div>
                      <span className="font-black text-lg text-gray-900 block">Daily Notifications</span>
                      <span className="text-sm text-gray-500 font-semibold">Get reminded to log your progress</span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={state.user.notificationsEnabled}
                      onChange={(e) => saveUser({ ...state.user!, notificationsEnabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className={`w-16 h-9 rounded-full transition-all duration-300 ${
                      state.user.notificationsEnabled 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-200' 
                        : 'bg-gray-300'
                    }`}>
                      <div className={`absolute top-1 left-1 w-7 h-7 bg-white rounded-full shadow-md transition-transform duration-300 ${
                        state.user.notificationsEnabled ? 'translate-x-7' : ''
                      }`} />
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Management Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/80 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-50/50 via-pink-50/50 to-red-50/50 p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2.5 rounded-xl shadow-lg">
                  <Database className="text-white" size={20} />
                </div>
                <h3 className="font-black text-sm uppercase tracking-widest text-gray-700">Data Management</h3>
              </div>
            </div>
            
            <div className="p-8 space-y-5">
              {/* Export Button */}
              <button 
                onClick={handleExport}
                className="group/btn relative w-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-2xl blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 hover:border-blue-300 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl transform group-hover/btn:scale-110 transition-transform">
                    <Download size={24} />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-black text-lg text-gray-900 block">Export Your Data</span>
                    <span className="text-sm text-gray-600 font-semibold">Download complete backup (JSON)</span>
                  </div>
                </div>
              </button>

              {/* Reset Button */}
              <button 
                onClick={confirmReset}
                className="group/btn relative w-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-pink-400/10 rounded-2xl blur-md opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-4 p-6 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border-2 border-red-200 hover:border-red-300 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02]">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center text-white shadow-xl transform group-hover/btn:scale-110 transition-transform">
                    <Trash2 size={24} />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-black text-lg text-red-700 block">Reset Journey</span>
                    <span className="text-sm text-red-600 font-semibold">Erase all progress and start fresh</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Premium Footer */}
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl border border-gray-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-500/10 to-pink-500/10 rounded-full -ml-20 -mb-20 blur-3xl" />
          
          <div className="relative z-10 text-center space-y-3">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="text-yellow-400" size={20} />
              <p className="text-xs text-gray-400 font-black uppercase tracking-widest">Evolution Tracker v1.0</p>
              <Sparkles className="text-yellow-400" size={20} />
            </div>
            <p className="text-lg font-bold text-gray-300">Built for champions</p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gray-400">System running smoothly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;