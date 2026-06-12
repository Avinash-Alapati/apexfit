/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import WorkoutManager from './components/WorkoutManager';
import RunTracker from './components/RunTracker';
import MealPlanner from './components/MealPlanner';
import SocialPlatform from './components/SocialPlatform';
import ChallengesPanel from './components/ChallengesPanel';
import AchievementsPanel from './components/AchievementsPanel';
import CoachChat from './components/CoachChat';
import { User, WorkoutPlan, AchievementBadge, ChallengeSpec, NutritionLog, ActivityFeedPost, GPSRun, Exercise } from './types';
import { Sparkles, Award, Dumbbell, ShieldAlert, HeartPulse, Brain, AlertTriangle, Youtube } from 'lucide-react';
import { getYoutubeUrl } from './utils/youtube';

export default function App() {
  // Authentication status states
  const [token, setToken] = useState<string | null>(localStorage.getItem('apex_token'));
  const [user, setUser] = useState<User | null>(null);
  const [isSignup, setIsSignup] = useState<boolean>(true);
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [authError, setAuthError] = useState("");

  // System navigation triggers
  const [activeTab, setActiveTab] = useState<string>(() => localStorage.getItem('apex_active_tab') || 'dashboard');
  const [coachLauncherPrompt, setCoachLauncherPrompt] = useState<string>("");

  // Dashboard calculations stats
  const [dashboardStats, setDashboardStats] = useState<any | null>(null);
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [runHistory, setRunHistory] = useState<GPSRun[]>([]);
  const [nutritionLogs, setNutritionLogs] = useState<NutritionLog[]>([]);
  const [challenges, setChallenges] = useState<ChallengeSpec[]>([]);
  const [achievements, setAchievements] = useState<AchievementBadge[]>([]);
  const [socialFeed, setSocialFeed] = useState<ActivityFeedPost[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Interactive Single Exercise detail modal overlay
  const [selectedExDetail, setSelectedExDetail] = useState<Exercise | null>(null);
  
  // Diet Preferences state
  const [dietPreference, setDietPreference] = useState<string>("Vegan");

  // Global loading
  const [globalLoading, setGlobalLoading] = useState(false);

  // Authorization Bearer Header generator
  const getAuthHeaders = () => {
    return {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // Profile data fetch
  const fetchUserProfile = async (authToken: string) => {
    try {
      const res = await fetch('/api/user/profile', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      }
    } catch (err) {
      console.error("Profile retrieval error:", err);
    }
  };

  // Core metrics & stats logs fetch
  const fetchDashboardData = async () => {
    if (!token) return;
    try {
      // 1. Fetch Stats
      const statsRes = await fetch('/api/dashboard/stats', { headers: getAuthHeaders() });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setDashboardStats(statsData);
      }
      
      // 2. Fetch Run History
      const runRes = await fetch('/api/runs/history', { headers: getAuthHeaders() });
      if (runRes.ok) {
        const runs = await runRes.json();
        setRunHistory(runs);
      }

      // 3. Fetch Nutrition logs
      const nutrRes = await fetch('/api/nutrition/log', { headers: getAuthHeaders() });
      if (nutrRes.ok) {
        const nutr = await nutrRes.json();
        setNutritionLogs(nutr);
      }

      // 4. Fetch Challenges
      const chalRes = await fetch('/api/challenges', { headers: getAuthHeaders() });
      if (chalRes.ok) {
        const ch = await chalRes.json();
        setChallenges(ch);
      }

      // 5. Fetch Feed logs
      const feedRes = await fetch('/api/social/feed', { headers: getAuthHeaders() });
      if (feedRes.ok) {
        const feed = await feedRes.json();
        setSocialFeed(feed);
      }

      // 6. Fetch Notifications
      const notifRes = await fetch('/api/notifications', { headers: getAuthHeaders() });
      if (notifRes.ok) {
        const notif = await notifRes.json();
        setNotifications(notif);
      }

      // 7. Fetch Workout Plans
      const plansRes = await fetch('/api/workouts/plans', { headers: getAuthHeaders() });
      if (plansRes.ok) {
        const plans = await plansRes.json();
        setWorkoutPlans(plans);
      }
    } catch (err) {
      console.error("Sync telemetry metrics failed:", err);
    }
  };

  // Sync details on load or trigger
  useEffect(() => {
    if (token) {
      fetchUserProfile(token);
      fetchDashboardData();
    }
  }, [token]);

  // Persist active tab selection to prevent unexpected page-reload resets
  useEffect(() => {
    localStorage.setItem('apex_active_tab', activeTab);
  }, [activeTab]);

  // Auth form submissions
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setGlobalLoading(true);

    const url = isSignup ? '/api/auth/signup' : '/api/auth/login';
    const body = isSignup 
      ? { email: emailInput, name: nameInput }
      : { email: emailInput };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.error || "Authentication failed");
      } else {
        localStorage.setItem('apex_token', data.token);
        setToken(data.token);
        setUser(data.user);
        setNameInput("");
        setEmailInput("");
      }
    } catch (err) {
      setAuthError("Network server synchronization failed. Let's retry.");
    } finally {
      setGlobalLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('apex_token');
    setToken(null);
    setUser(null);
  };

  // Complete Biometrics onboarding variables
  const handleOnboardingComplete = async (profile: any) => {
    setGlobalLoading(true);
    try {
      const res = await fetch('/api/auth/onboarding', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(profile)
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        fetchDashboardData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGlobalLoading(false);
    }
  };

  // AI Workouts controllers
  const handleGenerateWorkoutPlan = async (daysPerWeek: number) => {
    const res = await fetch('/api/workouts/generate', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ daysPerWeek })
    });
    const data = await res.json();
    setWorkoutPlans([data, ...workoutPlans]);
    fetchDashboardData(); // Synchronization update for stats, logs, and notification tallies
    return data;
  };

  const handleLogWorkout = async (session: any) => {
    const res = await fetch('/api/workouts/log', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(session)
    });
    const data = await res.json();
    fetchUserProfile(token!);
    fetchDashboardData();
    return data;
  };

  // GPS Running Save tracker
  const handleSaveCompletedRun = async (run: any) => {
    const res = await fetch('/api/runs/save', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(run)
    });
    const data = await res.json();
    fetchUserProfile(token!);
    fetchDashboardData();
    return data;
  };

  // Social interactions likes & comments
  const handleLikeActivity = async (postId: string) => {
    const res = await fetch('/api/social/like', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ activityId: postId })
    });
    return res.json();
  };

  const handleCommentActivity = async (postId: string, commentText: string) => {
    const res = await fetch('/api/social/comment', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ activityId: postId, text: commentText })
    });
    return res.json();
  };

  // Challenges panel join
  const handleJoinChallenge = async (id: string) => {
    const res = await fetch('/api/challenges/join', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ challengeId: id })
    });
    const data = await res.json();
    fetchDashboardData();
    return data;
  };

  // Nutrition trackers
  const handleAddNutritionItem = async (food: any) => {
    const res = await fetch('/api/nutrition/log', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(food)
    });
    const data = await res.json();
    fetchDashboardData();
    return data;
  };

  const handleDeleteNutritionItem = async (id: string) => {
    const res = await fetch(`/api/nutrition/log/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    fetchDashboardData();
    return data;
  };

  const handleGenerateAIMealPlan = async (ingredients: string) => {
    const res = await fetch('/api/nutrition/mealplan', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ dietPreference, availableIngredients: ingredients })
    });
    return res.json();
  };

  // Conversational coach message sender
  const handleSendMessageToCoach = async (history: any[]) => {
    const res = await fetch('/api/coach/chat', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ messageHistory: history })
    });
    const data = await res.json();
    return data.text;
  };

  // Notifications clearer
  const handleMarkNotificationsRead = async () => {
    await fetch('/api/notifications/read', { method: 'POST', headers: getAuthHeaders() });
    fetchDashboardData();
  };

  // Quick prompt launcher navigates instantly
  const handleDashCoachTrigger = (msg: string) => {
    setCoachLauncherPrompt(msg);
    setActiveTab('coach-chat');
  };

  // Fallback default mock achievements badging list (Duolingo visual level milestones)
  const defaultAchievements: AchievementBadge[] = [
    { id: "ach_1", title: "Apex Beginner Spark", description: "Complete your first resistance split or GPS run session.", unlocked: dashboardStats?.totalWorkouts > 0 || dashboardStats?.totalRuns > 0, xpReward: 250, badgeCode: "first_workout", requirements: "1 workout or run logged" },
    { id: "ach_2", title: "Consistent Pacer", description: "Maintain a verified 3-day active streak score.", unlocked: (dashboardStats?.streak >= 3), xpReward: 500, badgeCode: "streak_3", requirements: "3 day active streak" },
    { id: "ach_3", title: "Heavy Weight Crusher", description: "Log completed workouts spanning more than 2,000 lifting kcal.", unlocked: dashboardStats?.totalCalories >= 2000, xpReward: 1000, badgeCode: "heavy_crush", requirements: "Burn over 2000 lifting calories" }
  ];

  if (!token || !user) {
    // Elegant Cinematic Auth Template UI
    return (
      <main className="min-h-screen flex flex-col justify-center items-center px-4 relative bg-[#080808]" id="apex-landing-auth-container">
        {/* Background visual geometric design cards */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-15 w-80 h-80 bg-orange/5 rounded-full blur-3xl pointer-events-none animate-pulse" />

        <div className="w-full max-w-md select-none text-center mb-8">
          <div className="w-14 h-14 bg-[#FC4C02] rounded-2xl mx-auto flex items-center justify-center glow-orange mb-4 shadow-xl shadow-orange/20">
            <Dumbbell className="w-7 h-7 text-white transform -rotate-45" />
          </div>
          <h2 className="font-display text-4xl font-black text-white tracking-widest uppercase">
            APEX<span className="text-[#FC4C02]">FIT</span>
          </h2>
          <p className="text-zinc-500 font-mono text-xs uppercase tracking-wider mt-1.5">Elite AI Performance Ecosystem</p>
        </div>

        {/* Auth form panels */}
        <div className="w-full max-w-md bg-[#1B1B1B] border border-white/5 p-8 rounded-3xl glow-orange space-y-6 shadow-2xl relative z-10 transition-all">
          <div className="flex gap-4 border-b border-zinc-800 pb-4">
            <button
              onClick={() => { setIsSignup(true); setAuthError(""); }}
              className={`flex-1 pb-2 text-xs font-bold uppercase tracking-wider text-center transition-all cursor-pointer ${
                isSignup ? 'text-orange border-b-2 border-orange font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Athlete Register
            </button>
            <button
              onClick={() => { setIsSignup(false); setAuthError(""); }}
              className={`flex-1 pb-2 text-xs font-bold uppercase tracking-wider text-center transition-all cursor-pointer ${
                !isSignup ? 'text-orange border-b-2 border-orange font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Athlete Entry
            </button>
          </div>

          {authError && (
            <div className="p-3 bg-red-900/10 border border-red-500/15 text-red-400 text-xs rounded-lg flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {isSignup && (
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-850 px-4 py-3 text-xs text-white rounded-xl focus:outline-none focus:border-orange placeholder-zinc-650"
                  required
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Email Address</label>
              <input
                type="email"
                placeholder="athlete@apexfit.com"
                value={emailInput}
                onChange={e => setEmailInput(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-850 px-4 py-3 text-xs text-white rounded-xl focus:outline-none focus:border-orange placeholder-zinc-650"
                required
              />
            </div>

            <button
              type="submit"
              disabled={globalLoading}
              className="w-full bg-[#FC4C02] hover:bg-orange/95 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all pointer-events-auto cursor-pointer shadow-lg shadow-orange/30 glow-orange"
            >
              {globalLoading ? 'Conducting telemetry validations...' : (isSignup ? 'Unlock Performance Platform' : 'Sign In Now &rarr;')}
            </button>
          </form>

          {/* Value propositions bullet overlays */}
          <div className="border-t border-zinc-850 pt-4 space-y-2.5">
            <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase">Ecosystem Capabilities:</h4>
            <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-400">
              <div className="flex items-center gap-1.5">⚡ AI Workout Generators</div>
              <div className="flex items-center gap-1.5">🏃 GPS Split Pacing Map</div>
              <div className="flex items-center gap-1.5">🥦 Personalized Meal Planner</div>
              <div className="flex items-center gap-1.5">💬 Speak Voice Coaching</div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Is onboarding complete?
  const hasOnboarded = user.profile !== undefined;

  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-[#eeeeee]">
      
      {/* Top Header Controls bar */}
      <Header
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notifications={notifications}
        onMarkNotificationsRead={handleMarkNotificationsRead}
        onLogout={handleLogout}
      />

      {/* Main active body grids container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 relative">
        
        {/* Onboarding block triggers if account Profile details is empty */}
        {!hasOnboarded ? (
          <Onboarding onComplete={handleOnboardingComplete} />
        ) : (
          <section className="space-y-8 animate-fade-in">
            {/* Dashboard active metrics */}
            {activeTab === 'dashboard' && dashboardStats && (
              <Dashboard
                stats={dashboardStats}
                onNavigate={setActiveTab}
                onSelectExercise={setSelectedExDetail}
                onSetCoachPrompt={handleDashCoachTrigger}
              />
            )}

            {/* AI Workouts block */}
            {activeTab === 'workouts' && (
              <WorkoutManager
                plans={workoutPlans}
                onGeneratePlan={handleGenerateWorkoutPlan}
                onLogWorkout={handleLogWorkout}
                onSaveCompleted={fetchDashboardData}
              />
            )}

            {/* GPS Run trackers */}
            {activeTab === 'run' && (
              <RunTracker
                history={runHistory}
                onSaveRun={handleSaveCompletedRun}
                onSaveCompleted={fetchDashboardData}
              />
            )}

            {/* AI Meal diet architect */}
            {activeTab === 'nutrition' && (
              <MealPlanner
                logs={nutritionLogs}
                dietPreference={dietPreference}
                setDietPreference={setDietPreference}
                onGeneratePlan={handleGenerateAIMealPlan}
                onAddNutritionItem={handleAddNutritionItem}
                onDeleteNutritionItem={handleDeleteNutritionItem}
              />
            )}

            {/* Social athlet feed */}
            {activeTab === 'social' && (
              <SocialPlatform
                feed={socialFeed}
                onToggleLike={handleLikeActivity}
                onAddComment={handleCommentActivity}
                onRefreshFeed={fetchDashboardData}
              />
            )}

            {/* Live global leaderboards */}
            {activeTab === 'challenges' && (
              <ChallengesPanel
                challenges={challenges}
                onJoinChallenge={handleJoinChallenge}
                userId={user.id}
              />
            )}

            {/* Achievements badging board */}
            {activeTab === 'achievements' && (
              <AchievementsPanel
                user={user}
                achievements={defaultAchievements}
              />
            )}

            {/* Coach interactive talk module */}
            {activeTab === 'coach-chat' && (
              <CoachChat
                initialPrompt={coachLauncherPrompt}
                onClearInitialPrompt={() => setCoachLauncherPrompt("")}
                onSendMessage={handleSendMessageToCoach}
              />
            )}
          </section>
        )}
      </main>

      {/* FOOTER credit bounds */}
      <footer className="py-8 border-t border-white/5 text-center text-[10px] font-mono text-zinc-650 opacity-40 uppercase">
        APEXFIT &copy; 2026 &bull; SECURED CLOUD EXECUTION NETWORK ENVIRONMENT &bull; TRACE: {user?.id || 'ANONYMOUS'}
      </footer>

      {/* 4. Single Exercise Form Details popup drawer */}
      {selectedExDetail && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-[#181818] border border-orange/40 rounded-3xl p-6 max-w-lg w-full space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-orange text-[9px] font-mono font-bold uppercase tracking-wider bg-orange/10 px-2 py-0.5 rounded">
                  {selectedExDetail.muscleGroup} ISOLATOR
                </span>
                <h3 className="font-display text-xl font-bold text-white mt-1 uppercase">{selectedExDetail.name}</h3>
              </div>
              <button
                onClick={() => setSelectedExDetail(null)}
                className="text-xs text-zinc-500 hover:text-white uppercase font-bold tracking-wider hover:bg-zinc-800 p-2 rounded-lg cursor-pointer transition-all"
              >
                Close (x)
              </button>
            </div>

            {/* YouTube Video Tutorial Button */}
            <a
              href={getYoutubeUrl(selectedExDetail.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-red-650 hover:bg-red-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-950/30 cursor-pointer"
            >
              <Youtube className="w-4 h-4 fill-white" />
              Watch Video Tutorial
            </a>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-zinc-950 rounded-xl">
                <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-wider text-orange mb-1">Detailed Execution steps</p>
                <ol className="list-decimal list-inside space-y-1 text-zinc-300">
                  {selectedExDetail.instructions.map((inst, index) => <li key={index} className="leading-relaxed font-sans">{inst}</li>)}
                </ol>
              </div>

              <div className="p-3 bg-zinc-950 border border-amber-500/10 rounded-xl">
                <p className="text-amber-500 font-bold uppercase text-[10px] tracking-wider flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Core posture mistakes to avoid
                </p>
                <ul className="list-disc list-inside space-y-1 text-zinc-400">
                  {selectedExDetail.commonMistakes.map((mist, index) => <li key={index} className="leading-relaxed font-sans text-amber-500/90">{mist}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
