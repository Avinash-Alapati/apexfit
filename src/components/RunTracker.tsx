/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { GPSRun, GPSCoordinate } from '../types';
import { MapPin, Play, Pause, Square, Timer, Compass, Activity, Volume2, ShieldAlert } from 'lucide-react';

interface RunTrackerProps {
  history: GPSRun[];
  onSaveRun: (run: { duration: number; distance: number; pace: number; calories: number; route: GPSCoordinate[]; name: string }) => Promise<any>;
  onSaveCompleted: () => void;
}

export default function RunTracker({ history, onSaveRun, onSaveCompleted }: RunTrackerProps) {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0); // in seconds
  const [distance, setDistance] = useState<number>(0); // in kilometers
  const [route, setRoute] = useState<GPSCoordinate[]>([]);
  const [isVoiceOn, setIsVoiceOn] = useState<boolean>(true);
  
  const timerInterval = useRef<any>(null);
  const watchId = useRef<number | null>(null);

  // Path constants for premium SVG route mapping simulation
  const SIMULATED_PATH = [
    { lat: 37.7749, lng: -122.4194 },
    { lat: 37.7758, lng: -122.4180 },
    { lat: 37.7765, lng: -122.4162 },
    { lat: 37.7770, lng: -122.4140 },
    { lat: 37.7785, lng: -122.4125 },
    { lat: 37.7799, lng: -122.4110 },
    { lat: 37.7812, lng: -122.4132 },
    { lat: 37.7801, lng: -122.4150 },
    { lat: 37.7780, lng: -122.4172 }
  ];

  const speakVoice = (text: string) => {
    if (!isVoiceOn) return;
    try {
      const synth = window.speechSynthesis;
      if (synth) {
        synth.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.voice = synth.getVoices().find(v => v.lang.startsWith('en')) || null;
        utter.rate = 1.05;
        synth.speak(utter);
      }
    } catch (e) {
      console.warn("Speech Synthesis error", e);
    }
  };

  // Run timing ticking
  useEffect(() => {
    if (isRunning && !isPaused) {
      timerInterval.current = setInterval(() => {
        setDuration(prev => {
          const nextSec = prev + 1;
          
          // Every 15 seconds, simulate GPS movement & calculate distance increments
          if (nextSec % 10 === 0) {
            setRoute(prevRoute => {
              const nextIndex = Math.min(prevRoute.length, SIMULATED_PATH.length - 1);
              const nextSegment = SIMULATED_PATH[nextIndex];
              const nextCoords = {
                lat: nextSegment.lat + (Math.random() - 0.5) * 0.0001,
                lng: nextSegment.lng + (Math.random() - 0.5) * 0.0001,
                timestamp: Date.now()
              };

              // Distance increment
              setDistance(d => {
                const nextDist = Number((d + 0.15).toFixed(2));
                // Speak progress
                const mins = Math.floor(nextSec / 60);
                const currentPace = nextDist > 0 ? (mins / nextDist).toFixed(1) : "0.0";
                speakVoice(`Running update. Distance covered: ${nextDist} kilometers. Average pace is ${currentPace} minutes per kilometer.`);
                return nextDist;
              });

              return [...prevRoute, nextCoords];
            });
          }
          return nextSec;
        });
      }, 1000);
    } else {
      if (timerInterval.current) clearInterval(timerInterval.current);
    }
    return () => { if (timerInterval.current) clearInterval(timerInterval.current); };
  }, [isRunning, isPaused]);

  // Geolocation trigger fallback
  const startGPSTracking = () => {
    if (navigator.geolocation) {
      const watch = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setRoute(prev => [...prev, { lat: latitude, lng: longitude, timestamp: Date.now() }]);
        },
        (err) => console.warn("GPS tracking error: falling back to premium simulation mapping", err),
        { enableHighAccuracy: true }
      );
      watchId.current = watch;
    }
  };

  const handleStartRun = () => {
    setIsRunning(true);
    setIsPaused(false);
    setDuration(0);
    setDistance(0);
    // Setup initial coordinates
    setRoute([{ lat: SIMULATED_PATH[0].lat, lng: SIMULATED_PATH[0].lng, timestamp: Date.now() }]);
    
    startGPSTracking();
    speakVoice("GPS tracking active. Apex Run commenced. Keep an dynamic steady pacing.");
  };

  const handlePauseToggle = () => {
    const nextPaused = !isPaused;
    setIsPaused(nextPaused);
    if (nextPaused) {
      speakVoice("Run suspended.");
    } else {
      speakVoice("Run resumed.");
    }
  };

  const handleEndRun = async () => {
    if (watchId.current) {
      navigator.geolocation.clearWatch(watchId.current);
    }
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
    }

    setIsRunning(false);

    const calculatedPace = distance > 0 ? Number((duration / 60 / distance).toFixed(2)) : 5.5;
    const caloriesBurned = Math.round(distance * 68);

    try {
      await onSaveRun({
        duration,
        distance: distance || 1.2, // Provide min distance fallback
        pace: calculatedPace,
        calories: caloriesBurned || 80,
        route,
        name: "Sunset Trail Dash"
      });
      speakVoice(`Excellent run completed. Track logged. Calories burned: ${caloriesBurned || 80} calories.`);
      onSaveCompleted();
    } catch (err) {
      console.error(err);
    }
  };

  const formatMins = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8" id="run-tracking-page">
      {/* 1. Track panel active HUD */}
      <section className="bg-zinc-950 border-2 border-orange/40 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Active stats metrics */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-orange text-[10px] font-mono font-bold uppercase tracking-widest bg-orange/10 px-2.5 py-1 rounded-full inline-block">
                {isRunning ? "AEROBIC ACTIVITY ACTIVE" : "OUTDOOR RUN LOGGER"}
              </span>
              <h3 className="font-display text-2xl font-black text-white mt-1">Strava Pacing Engine</h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-zinc-900 border border-white/5 rounded-xl">
                <span className="text-[9px] font-mono text-zinc-500 uppercase block">Distance</span>
                <span className="font-display text-lg font-bold text-white font-mono">{distance} <span className="text-[10px] text-zinc-400">KM</span></span>
              </div>
              <div className="p-3 bg-zinc-900 border border-white/5 rounded-xl">
                <span className="text-[9px] font-mono text-zinc-500 uppercase block">Pace</span>
                <span className="font-display text-lg font-bold text-white font-mono">
                  {distance > 0 ? (duration / 60 / distance).toFixed(1) : "0.0"} <span className="text-[10px] text-zinc-400">min/km</span>
                </span>
              </div>
              <div className="p-3 bg-zinc-900 border border-white/5 rounded-xl">
                <span className="text-[9px] font-mono text-zinc-500 uppercase block">Timer</span>
                <span className="font-display text-lg font-bold text-white font-mono">{formatMins(duration)}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Voice toggle */}
              <button 
                onClick={() => setIsVoiceOn(!isVoiceOn)}
                className={`w-11 h-11 border rounded-xl flex items-center justify-center transition-all cursor-pointer ${isVoiceOn ? 'bg-orange/15 border-orange text-orange' : 'bg-zinc-900 border-zinc-805 text-zinc-400'}`}
              >
                <Volume2 className="w-5 h-5" />
              </button>

              {/* Start Stop controller */}
              {!isRunning ? (
                <button
                  onClick={handleStartRun}
                  className="flex-1 bg-orange hover:bg-orange/90 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange/30 glow-orange"
                >
                  <Play className="w-4 h-4 fill-white" /> Start Run Session
                </button>
              ) : (
                <div className="flex-1 flex gap-2">
                  <button
                    onClick={handlePauseToggle}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Pause className="w-4 h-4 fill-white animate-pulse" /> {isPaused ? "Resume" : "Pause"}
                  </button>
                  <button
                    onClick={handleEndRun}
                    className="bg-red-650 hover:bg-red-700 text-white font-bold py-3 px-5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-red-500/15"
                  >
                    <Square className="w-4 h-4 fill-white text-white" /> Stop
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Simulated route SVG plotting illustration map */}
          <div className="lg:col-span-8 bg-zinc-900 border border-white/5 rounded-2xl h-[300px] relative overflow-hidden flex items-center justify-center">
            {/* Background grids */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b1b1b_1px,transparent_1px),linear-gradient(to_bottom,#1b1b1b_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />
            
            <svg viewBox="0 0 400 200" className="w-full h-full p-4 relative z-10">
              {/* Draw Route Polyline */}
              <path
                d="M 40 160 L 100 120 L 160 140 L 220 80 L 280 60 L 320 120 L 360 100"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M 40 160 L 100 120 L 160 140 L 220 80 L 280 60 L 320 120 L 360 100"
                fill="none"
                stroke="#FC4C02"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="transition-all duration-500"
                strokeDasharray={`${route.length * 45} 1000`}
              />

              {/* Start Marker */}
              <circle cx="40" cy="160" r="6" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
              <text x="35" y="175" fill="#10b981" fontSize="9" fontWeight="bold" fontFamily="monospace">START</text>

              {/* End Marker */}
              <circle cx="360" cy="100" r="6" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
              <text x="355" y="115" fill="#ef4444" fontSize="9" fontWeight="bold" fontFamily="monospace">END</text>

              {/* Live Position Avatar Marker along path */}
              {isRunning && route.length > 0 && (
                <g transform={`translate(${Math.min(40 + route.length * 35, 360)}, ${Math.max(160 - route.length * 6, 100)})`} className="animate-bounce">
                  <path d="M 0 0 C -5 -15 5 -15 0 0" fill="none" stroke="#FC4C02" strokeWidth="4" />
                  <circle cx="0" cy="-15" r="5" fill="#FC4C02" stroke="#fff" strokeWidth="1.5" />
                  <circle cx="0" cy="-15" r="1.5" fill="#fff" />
                </g>
              )}
            </svg>

            {/* Simulated Map coordinates labels */}
            <div className="absolute bottom-3 right-3 text-[9px] font-mono text-zinc-500 bg-zinc-950/80 px-2 py-1 rounded border border-white/5 select-none uppercase">
              GRID SCALE: 37.7749&deg; N , 122.4194&deg; W
            </div>
          </div>
        </div>
      </section>

      {/* 2. Run Logs list */}
      <section className="space-y-6">
        <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
          <Compass className="w-5 h-5 text-orange" />
          Historic Outdoor Activities Log
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.length > 0 ? (
            history.map(run => (
              <div key={run.id} className="glass-panel p-5 rounded-2xl flex justify-between items-center gap-4 hover:border-orange/20 transition-all">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-orange uppercase tracking-wider font-bold">{new Date(run.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <h4 className="text-sm font-bold text-white uppercase">{run.name}</h4>
                  <div className="flex gap-4 pt-1 text-[10px] font-mono text-zinc-400 uppercase">
                    <span>Dis: <strong className="text-white font-mono">{run.distance} KM</strong></span>
                    <span>Pacing: <strong className="text-white font-mono">{run.pace} min/km</strong></span>
                    <span>Burn: <strong className="text-white font-mono">{run.calories} kcal</strong></span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center border border-orange/15 font-mono text-xs text-orange font-bold font-display">
                  🏃
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-16 border-2 border-dashed border-zinc-800 rounded-3xl p-6">
              <MapPin className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <h4 className="font-display text-lg font-bold text-white mb-1">No tracked GPS runs registered</h4>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">Click 'Start Run Session' above to begin an indoor pacing trial and populate running mileage variables.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
