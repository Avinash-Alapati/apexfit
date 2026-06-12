/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MealPlan, NutritionLog } from '../types';
import { Sparkles, Loader, PieChart, Apple, AlertCircle, Plus, Trash2, ShieldCheck, HeartPulse } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface MealPlannerProps {
  logs: NutritionLog[];
  dietPreference: string;
  setDietPreference: (pref: string) => void;
  onGeneratePlan: (ingredients: string) => Promise<Partial<MealPlan>>;
  onAddNutritionItem: (item: { mealType: string; name: string; calories: number; protein: number; carbs: number; fats: number }) => Promise<any>;
  onDeleteNutritionItem: (id: string) => Promise<any>;
}

export default function MealPlanner({
  logs,
  dietPreference,
  setDietPreference,
  onGeneratePlan,
  onAddNutritionItem,
  onDeleteNutritionItem
}: MealPlannerProps) {
  const [loading, setLoading] = useState(false);
  const [activePlan, setActivePlan] = useState<Partial<MealPlan> | null>(null);
  const [availableIngredients, setAvailableIngredients] = useState<string>("");

  // Manual Logger form states
  const [mealType, setMealType] = useState<string>("Lunch");
  const [foodName, setFoodName] = useState<string>("");
  const [cals, setCals] = useState<number>(350);
  const [prot, setProt] = useState<number>(30);
  const [carbs, setCarbs] = useState<number>(40);
  const [fats, setFats] = useState<number>(10);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const plan = await onGeneratePlan(availableIngredients);
      setActivePlan(plan);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoggedItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName) return;
    setLoading(true);
    try {
      await onAddNutritionItem({
        mealType,
        name: foodName,
        calories: cals,
        protein: prot,
        carbs,
        fats
      });
      setFoodName("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Aggregated totals
  const totalCalories = logs.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = logs.reduce((sum, item) => sum + item.protein, 0);
  const totalCarbs = logs.reduce((sum, item) => sum + item.carbs, 0);
  const totalFats = logs.reduce((sum, item) => sum + item.fats, 0);

  const dailyBurnTarget = activePlan?.targetCalories || 2200;

  // Recharts Chart Layout
  const macroBarData = [
    { name: "Protein (g)", Consumed: totalProtein, Target: activePlan?.targetProtein || 140 },
    { name: "Carbs (g)", Consumed: totalCarbs, Target: activePlan?.targetCarbs || 220 },
    { name: "Fats (g)", Consumed: totalFats, Target: activePlan?.targetFats || 65 }
  ];

  return (
    <div className="space-y-8" id="nutrition-mealplan-tab">
      {/* 1. Header & Quick settings */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Meal settings setup & Generator trigger */}
        <div className="glass-panel p-6 rounded-3xl glow-orange h-fit space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange/10 rounded-xl flex items-center justify-center border border-orange/15 animate-spin-slow">
              <Apple className="w-5 h-5 text-orange" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white">AI Diet Architect</h3>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wide">GEMINI meal structure</p>
            </div>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed">
            Select your preferred dietary profile. The model calculates BMR multipliers, offsets for your goal, and compiles detailed macro-split meal plans.
          </p>

          <div className="space-y-4 pt-1">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Dietary Category</label>
              <div className="grid grid-cols-2 gap-2">
                {["Vegetarian", "Vegan", "High Protein", "Keto"].map(pref => (
                  <button
                    key={pref}
                    onClick={() => setDietPreference(pref)}
                    className={`py-2 px-1 text-[11px] font-bold uppercase rounded-lg border text-center transition-all cursor-pointer ${
                      dietPreference === pref
                        ? 'bg-orange/15 border-orange text-orange font-bold'
                        : 'bg-zinc-900 border-zinc-850 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <span>Ingredients You Have 🥦</span>
              </label>
              <input
                type="text"
                value={availableIngredients}
                onChange={e => setAvailableIngredients(e.target.value)}
                placeholder="e.g. eggs, salmon, chicken, tofu, oats"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-orange placeholder-zinc-600 font-sans"
              />
              <span className="text-[10px] text-zinc-500 block mt-1 leading-normal">
                Ask Gemini to build custom meal plans utilizing these specific items first.
              </span>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-orange hover:bg-orange/95 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-orange/20"
            >
              <Sparkles className="w-4 h-4 text-white" />
              {loading ? "Calculating energy targets..." : "Generate AI Diet Plans"}
            </button>
          </div>
        </div>

        {/* Dynamic Recharts Target Charts overlay */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="font-display text-lg font-bold text-white">Caloric Energy & Macronutrients Balance</h4>
              <p className="text-xs text-zinc-400">Total daily fuel target: {dailyBurnTarget} kcal</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Energy Input status</span>
              <p className="text-xl font-mono font-bold text-emerald-400">{totalCalories} / {dailyBurnTarget} kcal</p>
            </div>
          </div>

          {/* Calorie Progress Ring simulation */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-4 flex justify-center py-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="50" fill="none" stroke="#222" strokeWidth="8" />
                  <circle
                    cx="64"
                    cy="64"
                    r="50"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray="314"
                    strokeDashoffset={Math.max(0, 314 - (totalCalories / dailyBurnTarget) * 314)}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-mono font-bold text-white">{Math.min(100, Math.round((totalCalories / dailyBurnTarget) * 100))}%</span>
                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">MET TARGET</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-8 h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={macroBarData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#555" fontSize={11} tickLine={false} />
                  <YAxis stroke="#555" fontSize={11} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }} />
                  <Bar dataKey="Consumed" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Target" fill="#333" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Manual logs adder & log items lists */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Logger form */}
        <div className="lg:col-span-4 bg-zinc-950 border border-white/5 p-6 rounded-2xl h-fit space-y-4">
          <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
            <Plus className="w-4 h-4 text-orange" />
            Quick Food Logger
          </h4>

          <form onSubmit={handleLoggedItemSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1">Meal Designation</label>
              <select
                value={mealType}
                onChange={e => setMealType(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-xs py-2 px-3 rounded-lg text-white font-mono"
              >
                <option value="Breakfast">Breakfast Selection</option>
                <option value="Lunch">Lunch selection</option>
                <option value="Dinner">Dinner Selection</option>
                <option value="Snacks">Snacks / Supplements</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1">Meal / Ingredient Name</label>
              <input
                type="text"
                placeholder="e.g. Scrambled Egg White scrambled"
                value={foodName}
                onChange={e => setFoodName(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-xs py-2.5 px-3 rounded-lg text-white focus:outline-none focus:border-orange"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] font-mono text-zinc-500 uppercase">Calories (kcal)</label>
                <input
                  type="number"
                  value={cals}
                  onChange={e => setCals(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-805 text-center text-xs text-white py-1.5 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[9px] font-mono text-zinc-500 uppercase">Protein (g)</label>
                <input
                  type="number"
                  value={prot}
                  onChange={e => setProt(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-805 text-center text-xs text-white py-1.5 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[9px] font-mono text-zinc-500 uppercase">Carbohydrates (g)</label>
                <input
                  type="number"
                  value={carbs}
                  onChange={e => setCarbs(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-805 text-center text-xs text-white py-1.5 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[9px] font-mono text-zinc-500 uppercase">Fats (g)</label>
                <input
                  type="number"
                  value={fats}
                  onChange={e => setFats(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-zinc-805 text-center text-xs text-white py-1.5 rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-zinc-900 hover:bg-zinc-850 text-white font-bold py-2 px-4 rounded-lg text-xs uppercase border border-white/5 transition-all text-center cursor-pointer"
            >
              Add logged item
            </button>
          </form>
        </div>

        {/* Logs table list */}
        <div className="lg:col-span-8 space-y-4">
          <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-emerald-400" />
            Active Food Ledger (Today)
          </h4>

          <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
            {logs.length > 0 ? (
              logs.map(log => (
                <div key={log.id} className="p-3 bg-zinc-90d border border-zinc-850 rounded-xl flex justify-between items-center hover:border-zinc-700 transition-all">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{log.mealType}</span>
                    <h5 className="text-xs font-bold text-white uppercase">{log.name}</h5>
                    <div className="flex gap-4 text-[9px] font-mono text-zinc-500 uppercase mt-0.5">
                      <span>Cals: <strong className="text-white font-mono">{log.calories}</strong></span>
                      <span>P: <strong className="text-white font-mono">{log.protein}g</strong></span>
                      <span>C: <strong className="text-white font-mono">{log.carbs}g</strong></span>
                      <span>F: <strong className="text-white font-mono">{log.fats}g</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteNutritionItem(log.id)}
                    className="w-8 h-8 rounded-lg bg-red-900/10 hover:bg-red-900/40 text-red-400 border border-red-500/10 flex items-center justify-center cursor-pointer transition-all"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 border border-zinc-800 rounded-xl bg-zinc-950/20">
                <p className="text-xs text-zinc-500">No active food intakes logged for today yet. Use the quick logger on the side.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Generated Plan detailed list (dynamic rendering) */}
      {activePlan && (
        <section className="bg-zinc-950/80 border border-orange/20 rounded-3xl p-6 relative z-10 animate-fade-in">
          <div className="mb-6">
            <span className="text-orange text-[10px] font-mono font-bold uppercase tracking-widest bg-orange/10 px-2.5 py-1 rounded-full">
              AI COMPILED DIET PROTOCOL
            </span>
            <h3 className="font-display text-xl font-bold text-white mt-1.5">Diet Plan: {activePlan.goal}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Breakfast */}
            <div className="p-4 bg-zinc-900 border border-white/5 rounded-2xl space-y-3">
              <span className="text-[9px] font-mono bg-orange/10 text-orange font-bold uppercase tracking-wider px-2 py-0.5 rounded">BREAKFAST</span>
              <h4 className="text-sm font-bold text-white leading-snug">{activePlan.meals?.breakfast.name}</h4>
              <p className="text-[10px] font-mono text-zinc-400 uppercase">Cals: {activePlan.meals?.breakfast.calories} | Protein: {activePlan.meals?.breakfast.protein}g | Carbs: {activePlan.meals?.breakfast.carbs}g | Fats: {activePlan.meals?.breakfast.fats}g</p>
              <ul className="text-[10px] text-zinc-400 list-disc list-inside space-y-1">
                {activePlan.meals?.breakfast.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
            </div>

            {/* Lunch */}
            <div className="p-4 bg-zinc-900 border border-white/5 rounded-2xl space-y-3">
              <span className="text-[9px] font-mono bg-orange/10 text-orange font-bold uppercase tracking-wider px-2 py-0.5 rounded">LUNCH</span>
              <h4 className="text-sm font-bold text-white leading-snug">{activePlan.meals?.lunch.name}</h4>
              <p className="text-[10px] font-mono text-zinc-400 uppercase">Cals: {activePlan.meals?.lunch.calories} | Protein: {activePlan.meals?.lunch.protein}g | Carbs: {activePlan.meals?.lunch.carbs}g | Fats: {activePlan.meals?.lunch.fats}g</p>
              <ul className="text-[10px] text-zinc-400 list-disc list-inside space-y-1">
                {activePlan.meals?.lunch.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
            </div>

            {/* Dinner */}
            <div className="p-4 bg-zinc-900 border border-white/5 rounded-2xl space-y-3">
              <span className="text-[9px] font-mono bg-orange/10 text-orange font-bold uppercase tracking-wider px-2 py-0.5 rounded">DINNER</span>
              <h4 className="text-sm font-bold text-white leading-snug">{activePlan.meals?.dinner.name}</h4>
              <p className="text-[10px] font-mono text-zinc-400 uppercase">Cals: {activePlan.meals?.dinner.calories} | Protein: {activePlan.meals?.dinner.protein}g | Carbs: {activePlan.meals?.dinner.carbs}g | Fats: {activePlan.meals?.dinner.fats}g</p>
              <ul className="text-[10px] text-zinc-400 list-disc list-inside space-y-1">
                {activePlan.meals?.dinner.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
            </div>

            {/* Snacks */}
            <div className="p-4 bg-zinc-900 border border-white/5 rounded-2xl space-y-3">
              <span className="text-[9px] font-mono bg-orange/10 text-orange font-bold uppercase tracking-wider px-2 py-0.5 rounded">SNACKS / SUPPLEMENTS</span>
              <h4 className="text-sm font-bold text-white leading-snug">{activePlan.meals?.snacks.name}</h4>
              <p className="text-[10px] font-mono text-zinc-400 uppercase">Cals: {activePlan.meals?.snacks.calories} | Protein: {activePlan.meals?.snacks.protein}g | Carbs: {activePlan.meals?.snacks.carbs}g | Fats: {activePlan.meals?.snacks.fats}g</p>
              <ul className="text-[10px] text-zinc-400 list-disc list-inside space-y-1">
                {activePlan.meals?.snacks.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
