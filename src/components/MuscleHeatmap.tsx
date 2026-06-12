/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Exercise } from '../types';
import { EXERCISE_DATABASE } from '../exercises';

interface MuscleHeatmapProps {
  muscleVolume: Record<string, number>;
  onSelectExercise?: (ex: Exercise) => void;
}

export default function MuscleHeatmap({ muscleVolume, onSelectExercise }: MuscleHeatmapProps) {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [isFront, setIsFront] = useState<boolean>(true);

  // Helper to compute muscle colors based on completed sets/reps volume
  const getMuscleColor = (muscle: string) => {
    const volume = muscleVolume[muscle] || 0;
    if (volume === 0) return 'rgba(255, 255, 255, 0.1)';
    if (volume < 20) return 'rgba(252, 76, 2, 0.3)'; // Weak orange glow
    if (volume < 50) return 'rgba(252, 76, 2, 0.6)'; // Medium orange glow
    return 'rgba(252, 76, 2, 0.95)'; // Intense heat
  };

  // Get matching exercises for a muscle group
  const getMuscleExercises = (muscle: string) => {
    return EXERCISE_DATABASE.filter(ex => ex.muscleGroup.toLowerCase() === muscle.toLowerCase()).slice(0, 5);
  };

  return (
    <div className="glass-panel p-6 rounded-2xl glow-orange" id="advanced-muscle-heatmap-container">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-display text-xl font-bold text-white">Advanced Muscle Activation</h3>
          <p className="text-xs text-zinc-400">Color depth shows real-time intensity from recorded workouts</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsFront(true)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              isFront ? 'bg-orange text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            Anterior (Front)
          </button>
          <button
            onClick={() => setIsFront(false)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              !isFront ? 'bg-orange text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
            }`}
          >
            Posterior (Back)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Interactive Human Body Illustration using CSS Grid & SVGs */}
        <div className="flex justify-center relative bg-zinc-950 p-4 rounded-xl min-h-[350px]">
          {isFront ? (
            /* --- ANTERIOR FRONT BODY VIEW --- */
            <svg viewBox="0 0 100 200" className="w-48 h-auto" id="anterior-body-map">
              {/* Head */}
              <circle cx="50" cy="20" r="10" fill="#333" className="transition-all" />
              <rect x="47" y="30" width="6" height="6" fill="#444" />

              {/* Shoulders */}
              <path
                d="M 32 38 L 45 42 L 45 48 L 30 46 Z"
                fill={getMuscleColor('Shoulders')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Shoulders')}
              />
              <path
                d="M 68 38 L 55 42 L 55 48 L 70 46 Z"
                fill={getMuscleColor('Shoulders')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Shoulders')}
              />

              {/* Chest */}
              <path
                d="M 36 46 L 50 48 L 50 64 L 34 60 Z"
                fill={getMuscleColor('Chest')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Chest')}
              />
              <path
                d="M 64 46 L 50 48 L 50 64 L 66 60 Z"
                fill={getMuscleColor('Chest')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Chest')}
              />

              {/* Arms (Biceps/Forearms Anterior) */}
              <path
                d="M 28 47 L 34 47 L 30 70 L 25 70 Z"
                fill={getMuscleColor('Arms')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Arms')}
              />
              <path
                d="M 72 47 L 66 47 L 70 70 L 75 70 Z"
                fill={getMuscleColor('Arms')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Arms')}
              />

              {/* Core (Abs) */}
              <rect
                x="40"
                y="65"
                width="20"
                height="32"
                fill={getMuscleColor('Core')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                rx="2"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Core')}
              />

              {/* Legs (Quads / Anterior Thighs) */}
              <path
                d="M 35 102 L 48 102 L 45 150 L 33 150 Z"
                fill={getMuscleColor('Legs')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Legs')}
              />
              <path
                d="M 65 102 L 52 102 L 55 150 L 67 150 Z"
                fill={getMuscleColor('Legs')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Legs')}
              />

              {/* Calves Front */}
              <rect x="34" y="154" width="9" height="30" rx="3" fill="#333" />
              <rect x="57" y="154" width="9" height="30" rx="3" fill="#333" />
            </svg>
          ) : (
            /* --- POSTERIOR BACK BODY VIEW --- */
            <svg viewBox="0 0 100 200" className="w-48 h-auto" id="posterior-body-map">
              {/* Head */}
              <circle cx="50" cy="20" r="10" fill="#333" />
              <rect x="47" y="30" width="6" height="6" fill="#444" />

              {/* Rear Shoulders / Traps */}
              <path
                d="M 33 38 L 50 34 L 67 38 L 50 48 Z"
                fill={getMuscleColor('Shoulders')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Shoulders')}
              />

              {/* Upper & Middle Back */}
              <path
                d="M 35 48 L 50 50 L 65 48 L 60 75 L 40 75 Z"
                fill={getMuscleColor('Back')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Back')}
              />

              {/* Lower Back */}
              <rect
                x="41"
                y="76"
                width="18"
                height="16"
                fill={getMuscleColor('Back')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                rx="1"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Back')}
              />

              {/* Triceps / Back Arms */}
              <path
                d="M 27 49 L 33 49 L 29 72 L 25 72 Z"
                fill={getMuscleColor('Arms')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Arms')}
              />
              <path
                d="M 73 49 L 67 49 L 71 72 L 75 72 Z"
                fill={getMuscleColor('Arms')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Arms')}
              />

              {/* Glutes & Hamstrings */}
              <path
                d="M 34 94 L 49 94 L 45 145 L 32 145 Z"
                fill={getMuscleColor('Legs')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Legs')}
              />
              <path
                d="M 66 94 L 51 94 L 55 145 L 68 145 Z"
                fill={getMuscleColor('Legs')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Legs')}
              />

              {/* Calves Posterior */}
              <path
                d="M 34 150 L 43 150 L 41 182 L 35 182 Z"
                fill={getMuscleColor('Legs')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Legs')}
              />
              <path
                d="M 66 150 L 57 150 L 59 182 L 65 182 Z"
                fill={getMuscleColor('Legs')}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.5"
                className="cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setSelectedMuscle('Legs')}
              />
            </svg>
          )}

          {/* Core Labels helper overlay */}
          <div className="absolute top-2 left-2 text-[10px] text-zinc-500 font-mono">
            *Click target area to view specific exercises
          </div>
        </div>

        {/* Selected Muscle detail panels */}
        <div className="flex flex-col justify-center">
          {selectedMuscle ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                <h4 className="font-display text-lg font-bold text-orange flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                  {selectedMuscle} Group
                </h4>
                <span className="text-xs font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                  Log Vol: {muscleVolume[selectedMuscle] || 0} reps
                </span>
              </div>

              <p className="text-xs text-zinc-300">
                Exercises in the database targeting the <strong className="text-white">{selectedMuscle}</strong> group:
              </p>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2">
                {getMuscleExercises(selectedMuscle).map(ex => (
                  <div
                    key={ex.id}
                    onClick={() => onSelectExercise?.(ex)}
                    className="p-2.5 bg-zinc-900 border border-zinc-800 hover:border-orange rounded-lg transition-all cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <h5 className="text-sm font-semibold text-white">{ex.name}</h5>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {ex.equipment} • {ex.difficulty}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-orange hover:underline">
                      View Form &rarr;
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-xl p-4">
              <p className="text-zinc-400 text-sm">Select a muscle group on the human vector blueprint to isolate and explore tailored gym movements.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
