/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User } from '../types';
import { Flame, Trophy, Bell, User as UserIcon, Dumbbell } from 'lucide-react';

interface HeaderProps {
  user: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: { id: string; text: string; date: string; read: boolean }[];
  onMarkNotificationsRead: () => void;
  onLogout: () => void;
}

export default function Header({ 
  user, 
  activeTab, 
  setActiveTab, 
  notifications, 
  onMarkNotificationsRead,
  onLogout
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'workouts', label: 'AI Workouts' },
    { id: 'run', label: 'Run Tracker' },
    { id: 'nutrition', label: 'Meal Planner' },
    { id: 'social', label: 'Social Feed' },
    { id: 'challenges', label: 'Music Hub' },
    { id: 'achievements', label: 'Achievements' }
  ];

  return (
    <header className="glass-panel sticky top-0 z-40 border-b border-white/5 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
      {/* Brand logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
        <div className="w-10 h-10 bg-orange rounded-xl flex items-center justify-center glow-orange overflow-hidden shadow-lg shadow-orange/20">
          <Dumbbell className="w-5 h-5 text-white transform -rotate-45" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-black text-white tracking-widest flex items-center gap-1.5">
            APEX<span className="text-orange">FIT</span>
          </h1>
          <span className="text-[9px] font-mono tracking-wider uppercase text-orange font-bold">AI PERFORMANCE PLATFORM</span>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="flex items-center gap-1 bg-zinc-900/80 p-1.5 rounded-xl border border-white/5 overflow-x-auto max-w-full no-scrollbar">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all uppercase cursor-pointer whitespace-nowrap ${
              activeTab === item.id
                ? 'bg-orange text-white glow-orange font-bold shadow-md shadow-orange/30'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* User profile & interactive notification status */}
      <div className="flex items-center gap-4 relative">
        {/* Streak Indicator */}
        {user && (
          <div className="flex items-center gap-1.5 bg-orange/10 border border-orange/20 px-3 py-1.5 rounded-xl alive-glow">
            <Flame className="w-4 h-4 text-orange fill-orange" />
            <span className="text-xs font-bold font-mono text-orange">{user.streak} DAY STREAK</span>
          </div>
        )}

        {/* Level and XP indicator */}
        {user && (
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-xs font-mono font-bold text-white flex items-center gap-1">
              LEVEL {user.level} {user.level >= 3 && <Trophy className="w-3.5 h-3.5 text-orange" />}
            </span>
            <div className="w-24 h-1.5 bg-zinc-800 rounded-full mt-1 overflow-hidden border border-white/5">
              <div 
                className="h-full bg-orange rounded-full transition-all duration-500"
                style={{ width: `${(user.xp % 1000) / 10}%` }}
              />
            </div>
            <span className="text-[9px] font-mono text-zinc-400 mt-1">{(user.xp % 1000)}/1000 XP TO LEVEL UP</span>
          </div>
        )}

        {/* Notification dropdown icon */}
        <div className="relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (!showNotifications) {
                onMarkNotificationsRead();
              }
            }}
            className="w-10 h-10 bg-zinc-900 hover:bg-zinc-800 rounded-xl flex items-center justify-center border border-white/5 transition-all relative"
            id="notifications-bell-btn"
          >
            <Bell className="w-4 h-4 text-zinc-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange text-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center border-2 border-zinc-950">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-zinc-900 border border-white/10 rounded-2xl p-4 shadow-2xl z-50 overflow-hidden">
              <div className="flex justify-between items-center mb-3 border-b border-white/5 pb-2">
                <span className="text-xs font-bold text-white font-display">Activity Alerts</span>
                <span className="text-[10px] text-zinc-500 font-mono">{notifications.length} logged</span>
              </div>
              <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                {notifications.length > 0 ? (
                  notifications.map(notif => (
                    <div key={notif.id} className={`p-2.5 rounded-lg text-xs leading-relaxed border transition-all ${notif.read ? 'bg-zinc-950/20 border-zinc-800 text-zinc-400' : 'bg-orange/5 border-orange/15 text-zinc-200'}`}>
                      <p>{notif.text}</p>
                      <span className="text-[9px] font-mono text-zinc-500 mt-1 block">
                        {new Date(notif.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-6 text-zinc-500 text-xs">No pending notification logs.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User profile actions */}
        {user && (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-orange bg-zinc-800 flex items-center justify-center">
              <img 
                src={user.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.name || 'ApexUser')}`} 
                alt={user.name} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            <button 
              onClick={onLogout}
              className="text-[10px] font-mono hover:text-orange text-zinc-400 border border-white/10 px-2 py-1 rounded hover:bg-zinc-805 transition-all cursor-pointer"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
