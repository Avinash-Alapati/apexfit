/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import MuscleHeatmap from './MuscleHeatmap';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Flame, Dumbbell, Activity, Calendar, Award, MessageSquare, Compass, ShieldCheck } from 'lucide-react';
import { Exercise } from '../types';

interface DashboardProps {
  stats: {
    totalWorkouts: number;
    totalRuns: number;
    totalCalories: number;
    totalDistance: number;
    streak: number;
    level: number;
    xp: number;
    muscleVolume: Record<string, number>;
    history: {
      workouts: any[];
      runs: any[];
    };
  } | null;
  onNavigate: (tab: string) => void;
  onSelectExercise: (ex: Exercise) => void;
  onSetCoachPrompt: (prompt: string) => void;
}

export default function Dashboard({ stats, onNavigate, onSelectExercise, onSetCoachPrompt }: DashboardProps) {
  if (!stats) return null;

  // Render mock data for charts based on history or defaults
  const chartData = [
    { day: "Mon", LiftCalories: 180, CardioCalories: 250 },
    { day: "Tue", LiftCalories: 340, CardioCalories: 0 },
    { day: "Wed", LiftCalories: 120, CardioCalories: 380 },
    { day: "Thu", LiftCalories: 0, CardioCalories: 150 },
    { day: "Fri", LiftCalories: 420, CardioCalories: 390 }, // Active today
    { day: "Sat", LiftCalories: 0, CardioCalories: 0 },
    { day: "Sun", LiftCalories: 0, CardioCalories: 0 }
  ];

  return (
    <div className="space-y-8" id="apex-dashboard-page">
      {/* 1. Metric Overview Rings/Cards Group */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Streak active ring/card */}
        <div className="glass-panel p-6 rounded-2xl flex items-center justify-between border-l-4 border-l-orange glow-orange relative overflow-hidden">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Discipline Score</span>
            <p className="font-display text-3xl font-black text-white">{stats.streak} DAYS</p>
            <p className="text-[10px] text-orange flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange animate-ping" />
              Consistent active streak
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center border border-orange/15">
            <Flame className="w-6 h-6 text-orange fill-orange" />
          </div>
        </div>

        {/* Lifts completed */}
        <div className="glass-panel p-6 rounded-2xl flex items-center justify-between border-l-4 border-l-indigo-500 relative overflow-hidden">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Resistance Logs</span>
            <p className="font-display text-3xl font-black text-white">{stats.totalWorkouts} LIFTS</p>
            <p className="text-[10px] text-zinc-400">Recorded sessions inside gym</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/15">
            <Dumbbell className="w-6 h-6 text-indigo-400" />
          </div>
        </div>

        {/* Total Calories */}
        <div className="glass-panel p-6 rounded-2xl flex items-center justify-between border-l-4 border-l-emerald-500 relative overflow-hidden">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Thermodynamic Exhaustion</span>
            <p className="font-display text-3xl font-black text-white">{stats.totalCalories} kcal</p>
            <p className="text-[10px] text-emerald-400">Total active calories burned</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/15">
            <Activity className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        {/* Run Distance */}
        <div className="glass-panel p-6 rounded-2xl flex items-center justify-between border-l-4 border-l-amber-500 relative overflow-hidden">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Aerobic Run Mileage</span>
            <p className="font-display text-3xl font-black text-white">{stats.totalDistance} KM</p>
            <p className="text-[10px] text-amber-400">Total verified GPS trails</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/15">
            <Compass className="w-6 h-6 text-amber-400" />
          </div>
        </div>
      </section>

      {/* 2. Interactive AI Coach Prompt Quick Launcher */}
      <section className="bg-gradient-to-r from-zinc-950 to-zinc-900 border border-orange/15 rounded-3xl p-6 relative overflow-hidden">
        {/* Subtle orange aura overlay */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <span className="text-[10px] font-mono bg-orange/20 text-orange uppercase tracking-wider px-3 py-1 rounded-full font-bold">
              AI CONVERSATIONAL ADVISOR
            </span>
            <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-orange" />
              Coach Apex Intelligence Link
            </h3>
            <p className="text-xs text-zinc-300 max-w-xl">
              Our neural coach analyzes your weekly metrics instantly: pacing, split volume, and meal macronutrients to outline posture suggestions. Select a quick starter query:
            </p>
          </div>
          <button 
            onClick={() => onNavigate('workouts')}
            className="px-5 py-3 border border-orange/30 text-xs font-bold uppercase tracking-wider text-orange hover:bg-orange hover:text-white rounded-xl transition-all cursor-pointer whitespace-nowrap"
          >
            Start coaching consult &rarr;
          </button>
        </div>

        {/* Quick select buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <button
            onClick={() => onSetCoachPrompt("Review my active stats this week and formulate a 3D biomechanics posture advice.")}
            className="p-3 bg-zinc-900 hover:bg-zinc-800 border border-white/5 rounded-xl text-left text-xs text-zinc-300 transition-all cursor-pointer"
          >
            📊 <strong className="text-white">Review weekly activity stats</strong> and biomechanics.
          </button>
          <button
            onClick={() => onSetCoachPrompt("I want to increase my running pace. How do I adjust my vertical stride split ratio?")}
            className="p-3 bg-zinc-900 hover:bg-zinc-800 border border-white/5 rounded-xl text-left text-xs text-zinc-300 transition-all cursor-pointer"
          >
            🏃💨 <strong className="text-white">How do I increase stride pace</strong> and efficiency?
          </button>
          <button
            onClick={() => onSetCoachPrompt("How does building Chest volume affect structural shoulder stability?")}
            className="p-3 bg-zinc-900 hover:bg-zinc-800 border border-white/5 rounded-xl text-left text-xs text-zinc-300 transition-all cursor-pointer"
          >
            🏋️‍♀️ <strong className="text-white">Examine chest and shoulder stability</strong> alignment.
          </button>
        </div>
      </section>

      {/* 3. Recharts Visual Chart & Muscle activation row */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recharts calories burned chart */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl relative">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-display text-lg font-bold text-white">Daily Caloric Expenditures</h4>
              <p className="text-xs text-zinc-400">Weekly thermic activity: Lifts vs. Cardio pacing</p>
            </div>
            <div className="flex gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-indigo-400">
                <span className="w-2.5 h-2.5 bg-indigo-500 rounded-sm" /> Resistance Lifts
              </span>
              <span className="flex items-center gap-1.5 text-orange">
                <span className="w-2.5 h-2.5 bg-orange rounded-sm" /> GPS Outdoors
              </span>
            </div>
          </div>

          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLifts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCardio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FC4C02" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FC4C02" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="day" stroke="#555" fontSize={11} tickLine={false} />
                <YAxis stroke="#555" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                  labelStyle={{ color: '#aaa', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="LiftCalories" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorLifts)" />
                <Area type="monotone" dataKey="CardioCalories" stroke="#FC4C02" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCardio)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side mini-widget showing active goal alignment */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-zinc-950 border border-white/5 p-6 rounded-2xl relative">
          <div className="space-y-4">
            <h4 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-orange" />
              Active Goals Roadmap
            </h4>
            
            <div className="space-y-3.5">
              <div className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl relative">
                <span className="absolute top-3.5 right-4 text-[10px] font-mono bg-orange/15 text-orange px-2 py-0.5 rounded-full font-bold">
                  80% PROGRESS
                </span>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Summer Cardio Blitz</p>
                <p className="text-[10px] text-zinc-500 font-mono mt-1">Goal: Run 30.00 KM outdoor loops</p>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-2.5 overflow-hidden">
                  <div className="h-full bg-orange rounded-full" style={{ width: '80%' }} />
                </div>
              </div>

              <div className="p-3.5 bg-zinc-900 border border-zinc-800 rounded-xl relative">
                <span className="absolute top-3.5 right-4 text-[10px] font-mono bg-indigo-500/15 text-indigo-400 px-2 py-0.5 rounded-full font-bold text-xs">
                  COMPLETED
                </span>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Pec Crusher Champion</p>
                <p className="text-[10px] text-zinc-500 font-mono mt-1">Goal: Active burn 5,000 lifting kcal</p>
                <div className="w-full h-1.5 bg-indigo-500 rounded-full mt-2.5 overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-orange/5 border border-orange/10 rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-orange shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider text-orange">Certified Ecosystem</p>
              <p className="text-[10px] text-zinc-400 leading-normal">Your activity metrics are securely processed end-to-end to update verified leaderboard standing scores.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Complete Muscle Heatmap Integration directly inside default flow */}
      <section>
        <MuscleHeatmap 
          muscleVolume={stats.muscleVolume} 
          onSelectExercise={onSelectExercise}
        />
      </section>
    </div>
  );
}
