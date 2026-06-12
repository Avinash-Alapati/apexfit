/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AchievementBadge, User } from '../types';
import { Trophy, Star, Award, ShieldAlert, Sparkles, CheckCircle, Lock } from 'lucide-react';

interface AchievementsPanelProps {
  user: User | null;
  achievements: AchievementBadge[];
}

export default function AchievementsPanel({ user, achievements }: AchievementsPanelProps) {
  if (!user) return null;

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="space-y-8 animate-fade-in" id="gamified-achievements-page">
      {/* Level Banner */}
      <section className="bg-gradient-to-r from-orange to-amber-600 rounded-3xl p-6 text-white relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl shadow-orange/15">
        <div className="space-y-2 relative z-10">
          <span className="text-[10px] font-mono bg-black/25 text-white uppercase tracking-widest px-3 py-1 rounded-full font-bold">
            GAMIFIED DUOLINGO ROADMAP
          </span>
          <h3 className="font-display text-2xl font-black uppercase tracking-wider">Level {user.level} Champion</h3>
          <p className="text-xs text-white/80 max-w-lg leading-relaxed">
            Every workout checked and GPS run tracked awards Experience Points (XP). Level up to access premier workouts and unlock elite profile icons.
          </p>
        </div>

        <div className="bg-black/35 border border-white/10 p-4 rounded-2xl text-center min-w-[150px] relative z-10">
          <span className="text-[10px] font-mono text-zinc-300 uppercase block">Total Earned</span>
          <span className="font-display text-3xl font-black font-mono text-white">{user.xp} <span className="text-sm font-normal">XP</span></span>
          <div className="w-full h-1.5 bg-white/20 rounded-full mt-2.5 overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: `${(user.xp % 1000) / 10}%` }} />
          </div>
          <span className="text-[8px] font-mono text-zinc-300 block mt-1">{(1000 - (user.xp % 1000))} XP TO LEVEL {user.level + 1}</span>
        </div>
      </section>

      {/* Badges list */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
          <div>
            <h3 className="font-display text-xl font-bold text-white">Elite Milestone Badges</h3>
            <p className="text-xs text-zinc-400">Locked and unlocked badges showing discipline achievements</p>
          </div>
          <span className="text-xs font-mono bg-zinc-90 w-fit text-zinc-400 border border-white/5 px-3 py-1 rounded-lg">
            UNLOCKED: {unlockedCount} / {achievements.length} Badges
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map(ach => {
            return (
              <div 
                key={ach.id} 
                className={`glass-panel p-5 rounded-2xl flex gap-4 transition-all relative overflow-hidden ${
                  ach.unlocked 
                    ? 'border-l-4 border-l-orange bg-zinc-900/80 glow-orange' 
                    : 'border-zinc-805 opacity-60 bg-zinc-950/40'
                }`}
              >
                {/* Accent particles */}
                {ach.unlocked && (
                  <Sparkles className="w-4 h-4 text-orange/30 absolute top-3 right-3 animate-pulse" />
                )}

                {/* Badge Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                  ach.unlocked 
                    ? 'bg-orange/10 border-orange text-orange shadow-md' 
                    : 'bg-zinc-900 border-zinc-800 text-zinc-650'
                }`}>
                  {ach.unlocked ? <Trophy className="w-6 h-6 text-orange" /> : <Lock className="w-5 h-5 text-zinc-600" />}
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <div className="flex gap-2 items-center">
                    <h4 className="text-sm font-bold text-white uppercase">{ach.title}</h4>
                    {ach.unlocked && (
                      <span className="text-[8px] font-mono bg-orange text-white px-1.5 py-0.2 rounded font-bold uppercase tracking-widest leading-normal">
                        UNLOCKED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 leading-normal">{ach.description}</p>
                  
                  {ach.unlocked ? (
                    <span className="text-[10px] font-mono text-orange font-bold uppercase block mt-1.5 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-orange" /> Earned +{ach.xpReward} XP!
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block mt-1.5">
                      Reward: +{ach.xpReward} XP upon completion
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
