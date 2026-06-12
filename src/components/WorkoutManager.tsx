/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { WorkoutPlan, Exercise, WorkoutSession, WorkoutSet } from '../types';
import { Sparkles, Brain, Dumbbell, Play, CheckCircle, Volume2, ShieldAlert, Timer, RotateCcw, AlertTriangle, HelpCircle, Youtube, Trophy, Flame, Award } from 'lucide-react';
import { getYoutubeUrl } from '../utils/youtube';

interface WorkoutManagerProps {
  plans: WorkoutPlan[];
  onGeneratePlan: (daysPerWeek: number) => Promise<WorkoutPlan>;
  onLogWorkout: (session: { name: string; duration: number; caloriesBurned: number; exercises: any[] }) => Promise<any>;
  onSaveCompleted: () => void;
}

export default function WorkoutManager({ plans, onGeneratePlan, onLogWorkout, onSaveCompleted }: WorkoutManagerProps) {
  const [loading, setLoading] = useState(false);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3);
  const [activeSession, setActiveSession] = useState<{
    isRunning: boolean;
    plan: WorkoutPlan;
    duration: number; // seconds
    completedSets: Record<string, boolean[]>; // exId_setIdx -> completed
    weights: Record<string, number[]>; // exId_setIdx -> weight value
  } | null>(null);

  // Active rest timer hooks
  const [restSeconds, setRestSeconds] = useState<number>(0);
  const [isVoiceOn, setIsVoiceOn] = useState<boolean>(true);
  const timerInterval = useRef<any>(null);
  const restInterval = useRef<any>(null);

  const [explainExercise, setExplainExercise] = useState<Exercise | null>(null);

  // New dopamine celebration states
  const [targetMuscleCeleb, setTargetMuscleCeleb] = useState<{ exerciseName: string; muscleGroup: string; setsCount: number; reps: number } | null>(null);
  const [victoryCelebSummary, setVictoryCelebSummary] = useState<{
    name: string;
    duration: number;
    calories: number;
    setsLogged: number;
    xpGained: number;
    exercises: any[];
  } | null>(null);

  // Audio Voice Coach synthesizer
  const speakVoice = (text: string) => {
    if (!isVoiceOn) return;
    try {
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel(); // Cancel current read lines
        const utter = new SpeechSynthesisUtterance(text);
        utter.voice = synth.getVoices().find(v => v.lang.startsWith('en')) || null;
        utter.rate = 1.05;
        synth.speak(utter);
      }
    } catch (e) {
      console.warn("Speech synthesis error", e);
    }
  };

  // Duration ticking
  useEffect(() => {
    if (activeSession?.isRunning) {
      timerInterval.current = setInterval(() => {
        setActiveSession(prev => {
          if (!prev) return null;
          return { ...prev, duration: prev.duration + 1 };
        });
      }, 1000);
    } else {
      if (timerInterval.current) clearInterval(timerInterval.current);
    }
    return () => { if (timerInterval.current) clearInterval(timerInterval.current); };
  }, [activeSession?.isRunning]);

  // Rest timer ticking
  useEffect(() => {
    if (restSeconds > 0) {
      if (restInterval.current) clearInterval(restInterval.current);
      restInterval.current = setInterval(() => {
        setRestSeconds(prev => {
          if (prev <= 1) {
            speakVoice("Rest completed. Next set, lets push!");
            clearInterval(restInterval.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (restInterval.current) clearInterval(restInterval.current); };
  }, [restSeconds]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await onGeneratePlan(daysPerWeek);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartSession = (plan: WorkoutPlan) => {
    // Initial sets mapping
    const completedSets: Record<string, boolean[]> = {};
    const weights: Record<string, number[]> = {};

    plan.exercises.forEach(ex => {
      completedSets[ex.id] = Array(ex.sets).fill(false);
      weights[ex.id] = Array(ex.sets).fill(50); // Default weight in kg
    });

    setActiveSession({
      isRunning: true,
      plan,
      duration: 0,
      completedSets,
      weights
    });

    speakVoice(`Starting Apex workout: ${plan.name}. First exercise up is ${plan.exercises[0].name}. Target weight is 50 kilograms.`);
  };

  const handleCellClick = (ex: Exercise, setIdx: number) => {
    if (!activeSession) return;

    const key = ex.id;
    const currentSets = [...activeSession.completedSets[key]];
    const nextVal = !currentSets[setIdx];
    currentSets[setIdx] = nextVal;

    setActiveSession({
      ...activeSession,
      completedSets: {
        ...activeSession.completedSets,
        [key]: currentSets
      }
    });

    if (nextVal) {
      // Start rest timer & speak!
      setRestSeconds(ex.restTime);
      speakVoice(`Set completed. Take a break. Starting rest for ${ex.restTime} seconds.`);

      const allDone = currentSets.every(v => v === true);
      if (allDone) {
        setTimeout(() => {
          setTargetMuscleCeleb({
            exerciseName: ex.name,
            muscleGroup: ex.muscleGroup,
            setsCount: ex.sets,
            reps: ex.reps
          });
          speakVoice(`Fantastic! You fully cleared ${ex.name}. Target muscle group ${ex.muscleGroup} is fully activated and glowing!`);
        }, 1200);
      }
    }
  };

  const handleWeightChange = (exId: string, setIdx: number, val: number) => {
    if (!activeSession) return;
    const currentWeights = [...activeSession.weights[exId]];
    currentWeights[setIdx] = val;
    setActiveSession({
      ...activeSession,
      weights: {
        ...activeSession.weights,
        [exId]: currentWeights
      }
    });
  };

  // Trigger form reminders voice
  const handleVocalFormReminder = (ex: Exercise) => {
    setExplainExercise(ex);
    
    const mistakesText = ex.commonMistakes.join(". ");
    const verbalMessage = `Form briefing for ${ex.name}. Instructions: ${ex.instructions[0]}. Do avoid key errors like: ${mistakesText}`;
    speakVoice(verbalMessage);
  };

  const handleEndSession = async () => {
    if (!activeSession) return;

    // Compile active exercises
    const exercisesLogged = activeSession.plan.exercises.map(ex => {
      const setsMap = activeSession.completedSets[ex.id].map((comp, idx) => ({
        setNumber: idx + 1,
        reps: ex.reps,
        weight: activeSession.weights[ex.id][idx],
        completed: comp
      }));
      return {
        exerciseId: ex.id,
        name: ex.name,
        muscleGroup: ex.muscleGroup,
        sets: setsMap
      };
    });

    // Check count completed
    const totalDurationMins = Math.round(activeSession.duration / 60) || 1;
    const activeSetsChecked = exercisesLogged.reduce((sum, ex) => sum + ex.sets.filter(s => s.completed).length, 0);
    const caloriesCalculated = activeSetsChecked * 18 + totalDurationMins * 4;

    const totalXP = 120 + activeSetsChecked * 25;
    
    // Set victory summary to open the dopamine reward overlay!
    setVictoryCelebSummary({
      name: activeSession.plan.name,
      duration: totalDurationMins,
      calories: caloriesCalculated,
      setsLogged: activeSetsChecked,
      xpGained: totalXP,
      exercises: exercisesLogged
    });

    speakVoice(`Victory! Workout completed successfully! Absolute domination! You earned plus ${totalXP} experience points! Prepare to claim your rewards.`);
  };

  const handleClaimAndSubmitWorkout = async () => {
    if (!victoryCelebSummary) return;

    setLoading(true);
    try {
      await onLogWorkout({
        name: victoryCelebSummary.name,
        duration: victoryCelebSummary.duration,
        caloriesBurned: victoryCelebSummary.calories,
        exercises: victoryCelebSummary.exercises
      });
      setVictoryCelebSummary(null);
      setActiveSession(null);
      onSaveCompleted();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const formatSecs = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8" id="workouts-mngt-tab">
      {/* 1. Target Muscle Activation Popover */}
      {targetMuscleCeleb && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-md animate-fade-in" id="target-muscle-popup">
          <div className="w-full max-w-sm bg-zinc-900 border-2 border-orange/50 p-6 rounded-3xl shadow-2xl text-center space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange/10 rounded-full blur-2xl pointer-events-none" />
            <div className="w-14 h-14 bg-orange/10 rounded-full flex items-center justify-center mx-auto border border-orange/20 animate-bounce">
              <Award className="w-7 h-7 text-orange" />
            </div>
            
            <div className="space-y-0.5">
              <span className="text-orange text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 bg-orange/10 rounded-full inline-block">EXERCISE CLEARED! 🎉</span>
              <h3 className="font-display text-lg font-black text-white uppercase pt-1">{targetMuscleCeleb.exerciseName}</h3>
              <p className="text-[10px] text-zinc-400">Completed All {targetMuscleCeleb.setsCount} sets &bull; {targetMuscleCeleb.reps} reps</p>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-white/5 space-y-2.5 flex flex-col items-center">
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Target Muscle Activated</span>
              <h4 className="text-xs font-bold text-white uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-orange animate-ping" />
                {targetMuscleCeleb.muscleGroup} Group
              </h4>
              
              {/* Beautiful micro SVG outline highlighting the targeted muscle group */}
              <svg viewBox="0 0 100 120" className="w-20 h-auto pt-1.5" id="muscle-pop-vector">
                <circle cx="50" cy="15" r="7" fill="#333" />
                {/* Chest Highlight */}
                <path d="M 38 35 L 50 37 L 50 50 L 36 48 Z" fill={targetMuscleCeleb.muscleGroup.toLowerCase() === 'chest' ? '#FC4C02' : '#222'} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <path d="M 62 35 L 50 37 L 50 50 L 64 48 Z" fill={targetMuscleCeleb.muscleGroup.toLowerCase() === 'chest' ? '#FC4C02' : '#222'} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                {/* Shoulders Highlight */}
                <path d="M 33 28 L 45 32 L 45 38 L 31 36 Z" fill={targetMuscleCeleb.muscleGroup.toLowerCase() === 'shoulders' ? '#FC4C02' : '#222'} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <path d="M 67 28 L 55 32 L 55 38 L 69 36 Z" fill={targetMuscleCeleb.muscleGroup.toLowerCase() === 'shoulders' ? '#FC4C02' : '#222'} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                {/* Back Highlight */}
                <path d="M 38 52 L 50 54 L 62 52 L 58 75 L 42 75 Z" fill={targetMuscleCeleb.muscleGroup.toLowerCase() === 'back' ? '#FC4C02' : '#222'} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                {/* Arms Highlight */}
                <path d="M 29 36 L 34 36 L 31 55 L 27 55 Z" fill={targetMuscleCeleb.muscleGroup.toLowerCase() === 'arms' ? '#FC4C02' : '#222'} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <path d="M 71 36 L 66 36 L 69 55 L 73 55 Z" fill={targetMuscleCeleb.muscleGroup.toLowerCase() === 'arms' ? '#FC4C02' : '#222'} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                {/* Core Highlight */}
                <rect x="42" y="52" width="16" height="24" rx="1" fill={targetMuscleCeleb.muscleGroup.toLowerCase() === 'core' ? '#FC4C02' : '#222'} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                {/* Legs Highlight */}
                <path d="M 36 80 L 48 80 L 45 115 L 34 115 Z" fill={targetMuscleCeleb.muscleGroup.toLowerCase() === 'legs' ? '#FC4C02' : '#222'} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                <path d="M 64 80 L 52 80 L 55 115 L 66 115 Z" fill={targetMuscleCeleb.muscleGroup.toLowerCase() === 'legs' ? '#FC4C02' : '#222'} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              </svg>
            </div>

            <p className="text-[10px] text-zinc-500 italic">Target fibers recruitment optimized.</p>

            <button
              onClick={() => setTargetMuscleCeleb(null)}
              className="w-full bg-orange hover:bg-orange/90 text-white font-bold py-2 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              Keep Grinding &rarr;
            </button>
          </div>
        </div>
      )}

      {/* 2. Fullscreen Dopamine Victory Celebration Overlay */}
      {victoryCelebSummary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-xl animate-fade-in" id="victory-celebration-stage">
          <div className="absolute top-10 left-10 w-80 h-80 bg-orange/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" />

          <div className="w-full max-w-md bg-[#121212] border border-orange/40 rounded-3xl p-6 shadow-2xl text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange to-amber-500" />
            
            <div className="relative pt-2">
              <div className="absolute inset-0 bg-orange/20 rounded-full blur-xl scale-75 animate-pulse" />
              <div className="w-20 h-20 bg-orange/10 border border-orange/25 rounded-full flex items-center justify-center mx-auto relative z-10 animate-bounce">
                <Trophy className="w-10 h-10 text-orange" />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-orange text-[10px] font-mono font-black uppercase tracking-widest px-3 py-1 bg-orange/10 rounded-full inline-block">
                TRIUMPH PROTOCOL CLEARED
              </span>
              <h2 className="font-display text-2xl font-black text-white uppercase tracking-wide">
                Absolute Domination!
              </h2>
              <p className="text-[11px] text-zinc-400 max-w-xs mx-auto">
                Outstanding willpower, athlete! You conquered and finished this customized resistance session with perfect tracking!
              </p>
            </div>

            {/* Premium details block */}
            <div className="grid grid-cols-2 gap-3 bg-zinc-950 p-4 rounded-xl border border-white/5 text-center">
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono text-zinc-500 uppercase block">Duration</span>
                <span className="text-xs font-black text-white font-mono block">{victoryCelebSummary.duration} mins</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-mono text-zinc-500 uppercase block">Burned</span>
                <span className="text-xs font-black text-orange font-mono block flex items-center justify-center gap-0.5">
                  <Flame className="w-3.5 h-3.5 fill-orange text-orange" /> {victoryCelebSummary.calories} kcal
                </span>
              </div>
            </div>

            {/* Dopamine loading bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                <span className="text-zinc-550">REWARD ACCRUED:</span>
                <span className="text-orange animate-pulse">+{victoryCelebSummary.xpGained} XP</span>
              </div>
              <div className="w-full h-2.5 bg-zinc-950 rounded-full border border-white/5 p-0.5 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange to-amber-500 rounded-full w-full animate-pulse"
                />
              </div>
              <span className="text-[9px] font-mono text-zinc-550 block">Synchronizing with global standings leaderboard...</span>
            </div>

            {/* Core buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleClaimAndSubmitWorkout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange to-amber-500 hover:from-orange/95 hover:to-amber-500/95 text-white font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs transition-all pointer-events-auto cursor-pointer shadow-lg shadow-orange/20"
              >
                {loading ? 'Transmitting logs...' : 'Claim Gold + Sync Hub ✓'}
              </button>
              <button
                onClick={() => setVictoryCelebSummary(null)}
                className="text-[10px] font-mono text-zinc-500 hover:text-white transition-all cursor-pointer font-bold block mx-auto underline"
              >
                Sync (No Reward Claim)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Active Workout Session Overlay Panel */}
      {activeSession && (
        <section className="bg-zinc-950 border-2 border-orange/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden animate-fade-in">
          {/* Status bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-4 mb-6">
            <div>
              <span className="text-orange text-[10px] font-mono font-bold uppercase tracking-widest bg-orange/10 px-2.5 py-1 rounded-full inline-block">
                LIVE STRENGTH WORKOUT SESSION ACTIVE
              </span>
              <h3 className="font-display text-2xl font-black text-white mt-2 uppercase">{activeSession.plan.name}</h3>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-zinc-900 border border-white/5 py-1.5 px-3.5 rounded-xl text-xs font-mono font-bold text-white">
                <Timer className="w-4 h-4 text-orange" />
                DUR: {formatSecs(activeSession.duration)}
              </div>

              {/* Voice toggle */}
              <button
                onClick={() => setIsVoiceOn(!isVoiceOn)}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                  isVoiceOn ? 'bg-orange/10 border-orange text-orange' : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                }`}
                title="Toggle Voice Coaching"
              >
                <Volume2 className="w-5 h-5" />
              </button>

              <button
                onClick={handleEndSession}
                className="bg-orange hover:bg-orange/90 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Finish Session &rarr;
              </button>
            </div>
          </div>

          {/* Rest timer banner (if active) */}
          {restSeconds > 0 && (
            <div className="bg-indigo-950/40 border border-indigo-500/20 p-4 rounded-xl mb-6 flex justify-between items-center animate-pulse">
              <div className="flex items-center gap-3">
                <Timer className="w-5 h-5 text-indigo-400" />
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Rest Timer Active</p>
                  <p className="text-[10px] text-zinc-400">Rest, hydrate and capture your next breath</p>
                </div>
              </div>
              <span className="text-2xl font-mono font-bold text-indigo-400">{restSeconds}s</span>
            </div>
          )}

          {/* Active Workouts Table list */}
          <div className="space-y-6">
            {activeSession.plan.exercises.map((ex, index) => (
              <div key={ex.id} className="p-4 bg-zinc-900/60 border border-white/5 rounded-2xl space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-display text-lg font-bold text-white flex items-center gap-1.5">
                      <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded font-mono">#{index + 1}</span>
                      {ex.name}
                    </h4>
                    <p className="text-[10px] text-zinc-400 font-mono mt-0.5 uppercase tracking-wide">
                      Target Group: {ex.muscleGroup} &bull; Apparatus: {ex.equipment}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={getYoutubeUrl(ex.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1 bg-red-650/15 hover:bg-red-650/30 text-red-400 text-[10px] font-bold uppercase rounded-lg border border-red-500/20 cursor-pointer transition-all"
                    >
                      <Youtube className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                      Video Class
                    </a>

                    <button
                      onClick={() => handleVocalFormReminder(ex)}
                      className="flex items-center gap-1.5 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] font-bold uppercase rounded-lg border border-white/5 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-orange" />
                      Form Coach Voice
                    </button>
                  </div>
                </div>

                {/* Sets Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {Array.from({ length: ex.sets }).map((_, setIdx) => {
                    const isChecked = activeSession.completedSets[ex.id][setIdx];
                    const weightVal = activeSession.weights[ex.id][setIdx];
                    return (
                      <div
                        key={setIdx}
                        className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                          isChecked ? 'bg-orange/5 border-orange/40' : 'bg-zinc-950 border-zinc-850'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono text-zinc-500 block uppercase">SET {setIdx + 1}</span>
                          <span className="text-xs font-bold text-white">{ex.reps} reps</span>
                        </div>

                        {/* Weight Changer */}
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={weightVal}
                            onChange={e => handleWeightChange(ex.id, setIdx, Number(e.target.value))}
                            className="w-12 bg-zinc-900 border border-zinc-850 text-center text-xs font-mono font-bold text-white py-1 rounded"
                          />
                          <span className="text-[10px] text-zinc-500 font-mono">KG</span>
                          <button
                            onClick={() => handleCellClick(ex, setIdx)}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                              isChecked ? 'bg-orange text-white' : 'bg-zinc-850 text-zinc-400 hover:bg-zinc-800'
                            }`}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Form Briefing Explanation Overlay Panel */}
          {explainExercise && (
            <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl mt-6 animate-fade-in">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                  <Play className="w-4 h-4 text-orange" /> Form details: {explainExercise.name}
                </h4>
                <button onClick={() => setExplainExercise(null)} className="text-xs text-zinc-500 hover:text-white">Close X</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-300">
                <div>
                  <p className="font-bold text-white mb-1">Key instructions:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    {explainExercise.instructions.map((inst, idx) => <li key={idx}>{inst}</li>)}
                  </ol>
                </div>
                <div>
                  <p className="font-bold text-orange mb-1 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> Prevent injuries:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-zinc-400">
                    {explainExercise.commonMistakes.map((mist, idx) => <li key={idx} className="text-amber-500/90">{mist}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* --- AI WORKOUT BLOCK GENERATOR BLOCK --- */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Planner Settings */}
        <div className="glass-panel p-6 rounded-3xl glow-orange h-fit space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange/10 rounded-xl flex items-center justify-center border border-orange/15">
              <Brain className="w-5 h-5 text-orange" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">Generate with AI</h3>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">GEMINI neural planning</p>
            </div>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">
            Specify the number of sessions for your weekly workout cycle. The neural engine analyzes your target experience, biomechanics profile, and selects exercises strictly from local library records.
          </p>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Workout Days / Week</label>
              <div className="grid grid-cols-4 gap-2">
                {[2, 3, 4, 5].map(d => (
                  <button
                    key={d}
                    onClick={() => setDaysPerWeek(d)}
                    className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      daysPerWeek === d 
                        ? 'bg-orange text-white glow-orange border-orange'
                        : 'bg-zinc-900 border border-zinc-805 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {d} DAYS
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || activeSession !== null}
              className={`w-full bg-orange hover:bg-orange/90 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                loading ? 'opacity-55 cursor-not-allowed' : ''
              }`}
            >
              <Sparkles className="className w-4 h-4 text-white hover:rotate-12 transition-all-default" />
              {loading ? "Aligning muscles schemas..." : "Generate Gym Block"}
            </button>
          </div>
        </div>

        {/* Existing plans list */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-orange" />
            Active Workout Protocols
          </h3>

          <div className="space-y-4">
            {plans.length > 0 ? (
              plans.map(plan => (
                <div key={plan.id} className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">{plan.name}</h4>
                    <p className="text-xs text-zinc-400">Target frequency: {plan.daysPerWeek} dynamic training sessions/week</p>
                    {plan.createdAt && (
                      <p className="text-[10px] font-mono text-zinc-500 flex items-center gap-1.5 mt-0.5">
                        <Timer className="w-3 px-0 h-3 text-orange inline" />
                        <span>Session Created: {new Date(plan.createdAt).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 pt-1.5 grid-cols-2">
                      {plan.exercises.map(ex => (
                        <span key={ex.id} className="text-[10px] font-mono bg-zinc-900 border border-white/5 text-zinc-400 px-2 py-0.5 rounded">
                          {ex.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartSession(plan)}
                    disabled={activeSession !== null}
                    className={`px-4 py-2.5 bg-orange hover:bg-orange/90 text-white rounded-xl text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer shadow-md shadow-orange/20 ${activeSession ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    <Play className="w-4 h-4 fill-white" />
                    Start Lift
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-zinc-800 rounded-3xl p-6">
                <Brain className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
                <h4 className="font-display text-lg font-bold text-white mb-1">No custom training blocks listed</h4>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">Use the AI planning widget to instantly compile a multi week block of exercises matching your target parameters.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
