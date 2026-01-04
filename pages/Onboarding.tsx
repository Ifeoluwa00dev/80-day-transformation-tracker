import React, { useState, useEffect } from "react";
import { useApp } from "../AppContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import {
  Sparkles,
  Calendar,
  User,
  Target,
  Bell,
  ArrowRight,
  Zap,
} from "lucide-react";

const Onboarding: React.FC = () => {
  const { saveUser } = useApp();

  const [step, setStep] = useState(1);
  const [animate, setAnimate] = useState(false);

  // Email/Password auth UI state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    startDate: new Date().toISOString().split("T")[0],
    goalStatement: "",
    notificationsEnabled: true,
  });

  useEffect(() => {
    setAnimate(true);
  }, [step]);

  const nextStep = () => {
    setAnimate(false);
    setTimeout(() => setStep((s) => s + 1), 200);
  };

  async function handleEmailAuth() {
    setAuthError(null);
    setAuthLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      // Success: Firebase auth state is now set.
      // AppContext (later) can listen and sync cloud data.
    } catch (err: any) {
      setAuthError(err?.message ?? "Authentication failed");
    } finally {
      setAuthLoading(false);
    }
  }

  const finish = () => {
    saveUser({
      ...formData,
      theme: "light",
    });
  };

  return (
    <div className="min-h-screen flex flex-col p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 max-w-lg mx-auto relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      
     

      {/* Progress indicator */}
      <div className="flex gap-2 mb-8 relative z-10">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              i <= step
                ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>

      {step === 1 && (
        <div className="relative z-10 bg-white/80 backdrop-blur-sm border border-white rounded-2xl p-4 shadow-lg mb-6">
        <div className="text-sm font-bold text-gray-800 mb-3">
          {isLogin ? "Login" : "Create Account"}
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl border-2 border-gray-200 bg-white outline-none focus:border-blue-500 mb-3"
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl border-2 border-gray-200 bg-white outline-none focus:border-blue-500 mb-3"
        />

        {authError && <div className="text-sm text-red-600 mb-3">{authError}</div>}

        <button
          onClick={handleEmailAuth}
          disabled={authLoading || !email || password.length < 6}
          className="w-full py-3 rounded-xl bg-black text-white font-semibold disabled:opacity-50"
        >
          {authLoading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
        </button>

        <button
          onClick={() => setIsLogin((v) => !v)}
          className="w-full mt-2 text-sm text-blue-700"
        >
          {isLogin ? "No account? Sign up" : "Already have an account? Login"}
        </button>
      </div>
      )}


      {step === 2 && (
        <div
          className={`flex-1 flex flex-col justify-center text-center relative z-10 transition-all duration-500 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="relative mb-8 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-3xl w-24 h-24 flex items-center justify-center shadow-2xl">
              <Sparkles className="text-white" size={48} />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            80-Day Evolution
          </h1>
          <p className="text-gray-600 mb-12 leading-relaxed text-lg max-w-md mx-auto">
            Welcome to your transformation. Over the next 80 days, we'll rebuild
            your habits, skills, and identity across 4 focused phases.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-12 max-w-sm mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                4
              </div>
              <div className="text-sm text-gray-600">Phases</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white">
              <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                80
              </div>
              <div className="text-sm text-gray-600">Days</div>
            </div>
          </div>
          <button
            onClick={nextStep}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-5 px-10 rounded-2xl shadow-2xl flex items-center justify-center gap-3 mx-auto hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 group"
          >
            Start My Journey
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      )}

      {step === 3 && (
        <div
          className={`flex-1 flex flex-col pt-12 relative z-10 transition-all duration-500 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-lg">
              <User className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Who are you?
            </h2>
          </div>
          <label className="block mb-6">
            <span className="text-gray-700 font-semibold text-sm uppercase tracking-wide mb-3 block">
              Full Name
            </span>
            <div className="relative">
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all shadow-lg"
                placeholder="Enter your name"
              />
            </div>
          </label>

          <div className="flex items-center gap-3 mb-6 mt-4">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-lg">
              <Target className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Your Main Goal
            </h2>
          </div>

          <label className="block mb-8">
            <span className="text-gray-700 font-semibold text-sm uppercase tracking-wide mb-3 block">
              Why are you doing this?
            </span>
            <div className="relative">
              <textarea
                value={formData.goalStatement}
                onChange={(e) =>
                  setFormData({ ...formData, goalStatement: e.target.value })
                }
                className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl outline-none focus:border-indigo-500 focus:bg-white transition-all h-32 resize-none shadow-lg"
                placeholder="e.g., To become a high-value tech entrepreneur"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {formData.goalStatement.length} characters
              </div>
            </div>
          </label>

          <button
            onClick={nextStep}
            disabled={!formData.name || !formData.goalStatement}
            className="mt-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-5 px-8 rounded-2xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            Continue
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      )}

      {step === 4 && (
        <div
          className={`flex-1 flex flex-col pt-12 relative z-10 transition-all duration-500 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2.5 rounded-xl shadow-lg">
              <Calendar className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              When do we start?
            </h2>
          </div>

          <label className="block mb-8">
            <span className="text-gray-700 font-semibold text-sm uppercase tracking-wide mb-3 block">
              Start Date
            </span>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              className="w-full p-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl outline-none focus:border-blue-500 focus:bg-white transition-all shadow-lg"
            />
          </label>

          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow-lg">
              <Bell className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Stay Tracked
            </h2>
          </div>

          <label className="flex items-center justify-between p-5 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-200 mb-8 cursor-pointer hover:border-indigo-400 transition-all shadow-lg group">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-7 rounded-full transition-all duration-300 relative ${
                  formData.notificationsEnabled
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                    : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    formData.notificationsEnabled ? "translate-x-5" : ""
                  }`}
                />
              </div>
              <span className="font-semibold text-gray-800">
                Enable Daily Reminders
              </span>
            </div>
            <input
              type="checkbox"
              checked={formData.notificationsEnabled}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notificationsEnabled: e.target.checked,
                })
              }
              className="sr-only"
            />
          </label>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl mb-8 border border-blue-200/50">
            <div className="flex items-start gap-3">
              <Zap className="text-blue-600 flex-shrink-0" size={20} />
              <div>
                <h3 className="font-bold text-gray-800 mb-1">You're all set!</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Your 80-day transformation begins on{" "}
                  {new Date(formData.startDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                  . Stay committed and watch yourself evolve.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={finish}
            className="mt-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold py-5 px-8 rounded-2xl shadow-2xl flex items-center justify-center gap-3 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 group"
          >
            <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
            Commit to 80 Days
          </button>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
