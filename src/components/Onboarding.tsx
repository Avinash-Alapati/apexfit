/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, ShieldAlert, Scale, Target, Activity } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [age, setAge] = useState<number>(25);
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(70);
  const [gender, setGender] = useState<string>("Male");
  const [fitnessGoal, setFitnessGoal] = useState<'Fat Loss' | 'Muscle Gain' | 'Strength' | 'Endurance' | 'General Fitness'>("Muscle Gain");
  const [activityLevel, setActivityLevel] = useState<'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active'>("Moderately Active");
  const [workoutExperience, setWorkoutExperience] = useState<'Beginner' | 'Intermediate' | 'Advanced'>("Intermediate");
  const [availableEquipment, setAvailableEquipment] = useState<string[]>(["Barbell", "Dumbbells", "Bodyweight"]);

  const equipmentOptions = [
    "Barbell",
    "Dumbbells",
    "Cables",
    "Machine",
    "Kettlebell",
    "Bodyweight"
  ];

  const handleEquipmentToggle = (item: string) => {
    if (availableEquipment.includes(item)) {
      setAvailableEquipment(availableEquipment.filter(eq => eq !== item));
    } else {
      setAvailableEquipment([...availableEquipment, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      age,
      height,
      weight,
      gender,
      fitnessGoal,
      activityLevel,
      workoutExperience,
      availableEquipment
    });
  };

  return (
    <div className="max-w-2xl mx-auto my-12" id="onboarding-panel">
      <div className="glass-panel p-8 rounded-3xl glow-orange">
        <div className="text-center mb-8">
          <span className="text-orange text-xs font-mono font-bold uppercase tracking-widest bg-orange/10 px-3 py-1.5 rounded-full inline-block mb-3">
            BIOMETRICS CONFIGURATION
          </span>
          <h2 className="font-display text-3xl font-black text-white">Setup Your Performance Profile</h2>
          <p className="text-zinc-400 text-xs mt-1">We adjust dynamic workloads, athletic macro balances, and exercise selections strictly based on your body limits</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Base stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Age</label>
              <div className="relative">
                <input
                  type="number"
                  min="12"
                  max="120"
                  value={age}
                  onChange={e => setAge(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Height (CM)</label>
              <input
                type="number"
                min="100"
                max="250"
                value={height}
                onChange={e => setHeight(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Weight (KG)</label>
              <input
                type="number"
                min="30"
                max="300"
                value={weight}
                onChange={e => setWeight(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Biological Sex</label>
            <div className="grid grid-cols-2 gap-4">
              {["Male", "Female"].map(sex => (
                <button
                  type="button"
                  key={sex}
                  onClick={() => setGender(sex)}
                  className={`py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    gender === sex
                      ? 'bg-orange/15 border-orange text-orange'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  {sex}
                </button>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-orange" />
              Primary Fitness Objective
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: "Fat Loss", desc: "Shred excess fat, maintain muscle definition" },
                { id: "Muscle Gain", desc: "Build mass size, optimize structural fibers" },
                { id: "Strength", desc: "Up compound power lift, low volume heavies" },
                { id: "Endurance", desc: "Improve oxygen delivery, pace, Vo2 capacity" },
                { id: "General Fitness", desc: "Improve posture, dynamic agility and longevity" }
              ].map(goal => (
                <button
                  type="button"
                  key={goal.id}
                  onClick={() => setFitnessGoal(goal.id as any)}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    fitnessGoal === goal.id
                      ? 'bg-orange/10 border-orange text-white'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <p className="text-xs font-bold text-white uppercase tracking-wider">{goal.id}</p>
                  <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{goal.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Activity Experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Experience Level</label>
              <select
                value={workoutExperience}
                onChange={e => setWorkoutExperience(e.target.value as any)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange rounded-xl px-4 py-3 text-xs text-white uppercase tracking-wider focus:outline-none"
              >
                <option value="Beginner">Beginner &bull; &lt; 6 months</option>
                <option value="Intermediate">Intermediate &bull; 1-3 years</option>
                <option value="Advanced">Advanced &bull; 3+ years active</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Life Activity Level</label>
              <select
                value={activityLevel}
                onChange={e => setActivityLevel(e.target.value as any)}
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-orange rounded-xl px-4 py-3 text-xs text-white uppercase tracking-wider focus:outline-none"
              >
                <option value="Sedentary">Sedentary &bull; Office job</option>
                <option value="Lightly Active">Lightly Active &bull; 1-3k steps day</option>
                <option value="Moderately Active">Moderately Active &bull; Gym 3-4x week</option>
                <option value="Very Active">Very Active &bull; Daily physical drills</option>
              </select>
            </div>
          </div>

          {/* Equipment Selection */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Available Equipment</label>
            <p className="text-[10px] text-zinc-500 font-mono mb-2.5">*AI Workout generators will strictly choose exercises you can perform</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {equipmentOptions.map(eq => {
                const isSelected = availableEquipment.includes(eq);
                return (
                  <button
                    type="button"
                    key={eq}
                    onClick={() => handleEquipmentToggle(eq)}
                    className={`p-2.5 rounded-lg border text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-orange text-white glow-orange border-orange'
                        : 'bg-zinc-905 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {eq}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange hover:bg-orange/90 text-white font-bold py-3.5 px-6 rounded-xl tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange/30 glow-orange"
          >
            Lock bio targets and continue &rarr;
          </button>
        </form>
      </div>
    </div>
  );
}
