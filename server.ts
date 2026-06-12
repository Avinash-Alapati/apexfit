/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { db } from "./server/db";
import { generateAIWorkoutPlan, generateAIMealPlan, generateCoachingResponse } from "./server/gemini";
import { EXERCISE_DATABASE } from "./src/exercises";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Security Headers Configured for Iframe Presentation and Embedding
app.use((req, res, next) => {
  // Set to SAMEORIGIN/allow frames to allow seamless presentations in AI Studio iframe views!
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "no-referrer-when-downgrade");
  next();
});

// Seed some initial accounts if none exist to make it immediately operational
if (db.users.find().length === 0) {
  // Let's create a premium test user
  const adminId = "u_admin";
  const user = db.users.create({
    id: adminId,
    email: "avinashalapati11@gmail.com",
    name: "Avinash Alapati",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&fit=crop",
    createdAt: new Date().toISOString(),
    xp: 2450, // Starts at Level 3
    level: 3,
    streak: 4, // 4-day streak
    lastActiveDate: new Date().toISOString(),
    profile: {
      age: 28,
      height: 182,
      weight: 79,
      gender: "Male",
      fitnessGoal: "Muscle Gain",
      activityLevel: "Very Active",
      workoutExperience: "Intermediate",
      availableEquipment: ["Barbell", "Dumbbells", "Cables", "Bodyweight"]
    }
  });

  // Add a seed completed workout
  db.workouts.create({
    id: "w_seed_1",
    userId: adminId,
    name: "Apex Golden Chest Shred",
    date: new Date(Date.now() - 24 * 3600000).toISOString(),
    duration: 45,
    caloriesBurned: 420,
    xpEarned: 150,
    isCompleted: true,
    exercises: [
      {
        exerciseId: "chest_1",
        name: "Barbell Bench Press",
        muscleGroup: "Chest",
        sets: [
          { setNumber: 1, reps: 8, weight: 80, completed: true },
          { setNumber: 2, reps: 8, weight: 85, completed: true },
          { setNumber: 3, reps: 8, weight: 85, completed: true }
        ]
      },
      {
        exerciseId: "arms_2",
        name: "Tricep Pushdown",
        muscleGroup: "Arms",
        sets: [
          { setNumber: 1, reps: 12, weight: 30, completed: true },
          { setNumber: 2, reps: 12, weight: 35, completed: true }
        ]
      }
    ]
  });

  // Add a seed GPS Run
  db.runs.create({
    id: "run_seed_1",
    userId: adminId,
    userName: "Avinash Alapati",
    date: new Date(Date.now() - 48 * 3600000).toISOString(),
    duration: 1840, // ~30 mins
    distance: 5.2,
    pace: 5.8, // ~5:48 / km
    calories: 390,
    name: "Waterfront Pacing",
    route: [
      { lat: 37.7749, lng: -122.4194, timestamp: Date.now() - 1800000 },
      { lat: 37.7752, lng: -122.4178, timestamp: Date.now() - 1500000 },
      { lat: 37.7761, lng: -122.4162, timestamp: Date.now() - 1200000 },
      { lat: 37.7772, lng: -122.4158, timestamp: Date.now() - 900000 },
      { lat: 37.7785, lng: -122.4170, timestamp: Date.now() - 600000 }
    ]
  });

  // Seed default goals in challenges
  db.challenges.join("challenge_1", adminId, "Avinash Alapati");
  db.challenges.join("challenge_3", adminId, "Avinash Alapati");
  
  // Seed initial notification
  db.notifications.add(adminId, "Welcome to ApexFit! Select 'AI Workouts' to generate your customized training block.");
}

// REST API MIDDLEWARE - SIMPLE MOCK AUTHENTICATION CHECK
const getAuthUserId = (req: express.Request): string => {
  // For sandbox testing, we default to the first user or 'u_admin'
  const userHeader = req.headers["authorization"];
  if (userHeader && userHeader.startsWith("Bearer u_")) {
    return userHeader.split(" ")[1];
  }
  const users = db.users.find();
  return users.length > 0 ? users[0].id : "u_admin";
};

// ==========================================
const ATHLETE_AVATARS = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
];

// AUTHENTICATION & ONBOARDING ENDPOINTS
// ==========================================

app.post("/api/auth/signup", (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name) {
    return res.status(400).json({ error: "Email and Name are required" });
  }

  const existing = db.users.findByEmail(email);
  if (existing) {
    return res.status(400).json({ error: "An account with this email already exists" });
  }

  const userId = "u_" + Date.now();
  const randomAvatar = ATHLETE_AVATARS[Math.floor(Math.random() * ATHLETE_AVATARS.length)];
  
  const newUser = db.users.create({
    id: userId,
    email,
    name,
    avatarUrl: randomAvatar,
    createdAt: new Date().toISOString(),
    xp: 0,
    level: 1,
    streak: 1
  });

  db.notifications.add(userId, `🏆 Welcome brand new user ${name}! ApexFit tracking and AI modules are fully loaded. Let's get fit!`);
  res.json({ token: userId, user: newUser });
});

app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const user = db.users.findByEmail(email);
  if (!user) {
    return res.status(404).json({ error: "Account not found. Please Sign Up to get started." });
  }

  res.json({ token: user.id, user });
});

app.post("/api/auth/onboarding", (req, res) => {
  const userId = getAuthUserId(req);
  const profile = req.body; // age, height, weight, gender, fitnessGoal, activityLevel, workoutExperience, availableEquipment

  const user = db.users.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const updated = db.users.update(userId, { profile });
  db.notifications.add(userId, `Onboarding complete. Goal aligned to: "${profile.fitnessGoal}"`);
  res.json({ success: true, user: updated });
});

app.get("/api/user/profile", (req, res) => {
  const userId = getAuthUserId(req);
  const user = db.users.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

// ==========================================
// WORKOUT EXERCISES & PLANS
// ==========================================

app.get("/api/exercises", (req, res) => {
  res.json(EXERCISE_DATABASE);
});

app.post("/api/workouts/generate", async (req, res) => {
  const userId = getAuthUserId(req);
  const user = db.users.findById(userId);
  if (!user || !user.profile) {
    return res.status(400).json({ error: "Please complete onboarding before generating workout plan" });
  }

  try {
    const workoutsCount = req.body.daysPerWeek || 3;
    const exercises = await generateAIWorkoutPlan({
      goal: user.profile.fitnessGoal || "General Fitness",
      equipment: user.profile.availableEquipment || ["Bodyweight"],
      experience: user.profile.workoutExperience || "Beginner",
      daysPerWeek: workoutsCount
    });

    const plan = db.workoutPlans.create({
      id: "plan_" + Date.now(),
      userId,
      name: `AI Tailored Block: ${user.profile.fitnessGoal}`,
      goal: user.profile.fitnessGoal || "General Fitness",
      equipment: user.profile.availableEquipment || ["Bodyweight"],
      daysPerWeek: workoutsCount,
      durationWeeks: 4,
      createdAt: new Date().toISOString(),
      exercises
    });

    db.notifications.add(userId, `💪 Complete training block successfully generated. Block focuses strictly on ${plan.goal}.`);
    res.json(plan);
  } catch (error) {
    console.error("Failed to generate AI plan:", error);
    res.status(500).json({ error: "AI generation failed" });
  }
});

app.post("/api/workouts/log", (req, res) => {
  const userId = getAuthUserId(req);
  const user = db.users.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { name, duration, caloriesBurned, exercises } = req.body;

  const xpEarned = 100 + (exercises.length * 20) + Math.round(duration * 2);

  const session = db.workouts.create({
    id: "w_log_" + Date.now(),
    userId,
    name: name || "Custom Active Weight-Training",
    date: new Date().toISOString(),
    duration: duration || 30,
    caloriesBurned: caloriesBurned || 250,
    xpEarned,
    exercises,
    isCompleted: true
  });

  // Log global XP
  db.xpHistory.add(userId, xpEarned, `Completed Weight Workout: ${name}`);

  // Update challenge leaderboard progression
  db.challenges.updateUserProgress(userId, "workouts", 1);
  db.challenges.updateUserProgress(userId, "calories", caloriesBurned || 250);

  // Broadcast workout event to feeds!
  db.activities.create({
    id: "act_w_" + Date.now(),
    userId,
    userName: user.name,
    userAvatar: user.avatarUrl,
    type: "workout",
    title: `${user.name} smashed a chest & core lift! 💥`,
    subtitle: `${name} • ${duration} mins active duration`,
    date: new Date().toISOString(),
    likesCount: 1,
    isLikedByCurrentUser: false,
    comments: [],
    details: {
      exercisesCount: exercises.length,
      duration,
      calories: caloriesBurned
    }
  });

  // Evaluate achievement logs
  const unlocked = db.checkAchievements(userId);

  res.json({ session, xpEarned, unlocked });
});

app.get("/api/workouts/history", (req, res) => {
  const userId = getAuthUserId(req);
  res.json(db.workouts.find({ userId }));
});

app.get("/api/workouts/plans", (req, res) => {
  const userId = getAuthUserId(req);
  res.json(db.workoutPlans.find({ userId }));
});

// ==========================================
// GPS RUN TRACKING INFRASTRUCTURE
// ==========================================

app.post("/api/runs/save", (req, res) => {
  const userId = getAuthUserId(req);
  const user = db.users.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { duration, distance, pace, calories, route, name } = req.body;

  const xpEarned = 150 + Math.round(distance * 30);

  const run = db.runs.create({
    id: "run_" + Date.now(),
    userId,
    userName: user.name,
    date: new Date().toISOString(),
    duration,
    distance,
    pace,
    calories,
    route,
    name: name || "Trail Run"
  });

  db.xpHistory.add(userId, xpEarned, `Tracked GPS run outdoors: ${distance} KM`);

  // Challenge values update
  db.challenges.updateUserProgress(userId, "run", distance);
  db.challenges.updateUserProgress(userId, "calories", calories);

  // Feed update
  db.activities.create({
    id: "act_r_" + Date.now(),
    userId,
    userName: user.name,
    userAvatar: user.avatarUrl,
    type: "run",
    title: `${user.name} logged an outdoor GPS run! 🏃💨`,
    subtitle: `${name || "Cardio Loop"} • Finished with pace of ${pace} min/km`,
    date: new Date().toISOString(),
    likesCount: 2,
    isLikedByCurrentUser: false,
    comments: [],
    details: {
      distance,
      duration,
      calories
    }
  });

  const unlocked = db.checkAchievements(userId);

  res.json({ run, xpEarned, unlocked });
});

app.get("/api/runs/history", (req, res) => {
  const userId = getAuthUserId(req);
  res.json(db.runs.find({ userId }));
});

// ==========================================
// METRICS & ADVANCED MUSCLE HEATMAP ANALYTICS
// ==========================================

app.get("/api/dashboard/stats", (req, res) => {
  const userId = getAuthUserId(req);
  const user = db.users.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const workouts = db.workouts.find({ userId });
  const runs = db.runs.find({ userId });

  // Calculate total workouts and runs
  const totalCompletedWorkouts = workouts.length;
  const totalCompletedRuns = runs.length;

  const totalCaloriesBurnedFromWorkouts = workouts.reduce((acc, w) => acc + w.caloriesBurned, 0);
  const totalCaloriesBurnedFromRuns = runs.reduce((acc, r) => acc + r.calories, 0);
  const totalDistanceRunning = parseFloat(runs.reduce((acc, r) => acc + r.distance, 0).toFixed(2));

  // Compute muscular volume log based on completed compound lifts
  const muscleGroupsVolume: Record<string, number> = {
    Chest: 0,
    Back: 0,
    Shoulders: 0,
    Arms: 0,
    Core: 0,
    Legs: 0
  };

  workouts.forEach(session => {
    session.exercises.forEach(ex => {
      const originalExc = EXERCISE_DATABASE.find(e => e.id === ex.exerciseId);
      if (originalExc) {
        // volume = sets * reps
        const setsDone = (ex.sets || []).filter(s => s && s.completed).length;
        const totalReps = (ex.sets || []).reduce((sum, s) => sum + (s && s.completed ? (s.reps || 0) : 0), 0);
        muscleGroupsVolume[originalExc.muscleGroup] += (setsDone * totalReps);
      }
    });
  });

  res.json({
    totalWorkouts: totalCompletedWorkouts,
    totalRuns: totalCompletedRuns,
    totalCalories: totalCaloriesBurnedFromWorkouts + totalCaloriesBurnedFromRuns,
    totalDistance: totalDistanceRunning,
    streak: user.streak,
    level: user.level,
    xp: user.xp,
    muscleVolume: muscleGroupsVolume,
    history: {
      workouts,
      runs
    }
  });
});

// ==========================================
// NUTRITION AND MEAL PLANS
// ==========================================

app.get("/api/nutrition/log", (req, res) => {
  const userId = getAuthUserId(req);
  const date = (req.query.date as string) || new Date().toISOString().split('T')[0];
  res.json(db.nutritionLogs.find({ userId, date }));
});

app.post("/api/nutrition/log", (req, res) => {
  const userId = getAuthUserId(req);
  const { mealType, name, calories, protein, carbs, fats, date } = req.body;

  const entry = db.nutritionLogs.create({
    id: "nut_" + Date.now(),
    userId,
    date: date || new Date().toISOString().split('T')[0],
    mealType: mealType || "Lunch",
    name: name || "Meal Intake",
    calories: Number(calories) || 0,
    protein: Number(protein) || 0,
    carbs: Number(carbs) || 0,
    fats: Number(fats) || 0
  });

  res.json(entry);
});

app.delete("/api/nutrition/log/:id", (req, res) => {
  const success = db.nutritionLogs.delete(req.params.id);
  res.json({ success });
});

app.post("/api/nutrition/mealplan", async (req, res) => {
  const userId = getAuthUserId(req);
  const user = db.users.findById(userId);
  if (!user || !user.profile) {
    return res.status(400).json({ error: "Onboarding is required first" });
  }

  // Calculate resting burn (BMR simulation using Harris-Benedict)
  const weight = user.profile.weight || 75;
  const height = user.profile.height || 175;
  const age = user.profile.age || 27;
  let bmr = 10 * weight + 6.25 * height - 5 * age + 5; // Male layout
  if (user.profile.gender === "Female") bmr = 10 * weight + 6.25 * height - 5 * age - 161;

  // Activity Factor multiplier
  let multiplier = 1.2;
  const activity = user.profile.activityLevel;
  if (activity === "Lightly Active") multiplier = 1.375;
  else if (activity === "Moderately Active") multiplier = 1.55;
  else if (activity === "Very Active") multiplier = 1.725;

  let targetCalories = Math.round(bmr * multiplier);
  
  // Apply objective offset
  const goal = user.profile.fitnessGoal;
  if (goal === "Fat Loss") targetCalories -= 450;
  else if (goal === "Muscle Gain" || goal === "Strength") targetCalories += 300;

  try {
    const preference = req.body.dietPreference || "Vegan"; // Vegan, Vegetarian, Keto, High Protein
    const availableIngredients = req.body.availableIngredients || "";
    const mealPlan = await generateAIMealPlan({
      userId,
      goal: goal || "General Fitness",
      preference,
      targetCalories,
      availableIngredients
    });

    res.json(mealPlan);
  } catch (err) {
    console.error("Meal planning failed:", err);
    res.status(500).json({ error: "AI Meal Plan failed" });
  }
});

// ==========================================
// COACHING DIALOG CONVERSATION
// ==========================================

app.post("/api/coach/chat", async (req, res) => {
  const userId = getAuthUserId(req);
  const user = db.users.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { messageHistory } = req.body; // Array of { sender, text }

  const workouts = db.workouts.find({ userId });
  const runs = db.runs.find({ userId });
  const totalWorkouts = workouts.length;
  const totalRuns = runs.length;
  const totalCalories = workouts.reduce((s, w) => s + w.caloriesBurned, 0) + runs.reduce((s, r) => s + r.calories, 0);
  const totalDistance = runs.reduce((s, r) => s + r.distance, 0);

  try {
    const coachResponse = await generateCoachingResponse({
      workoutsCount: totalWorkouts,
      runsCount: totalRuns,
      totalCalories,
      totalDistance,
      streak: user.streak,
      userName: user.name
    }, messageHistory);

    res.json({ text: coachResponse });
  } catch (error) {
    console.error("Coaching failed:", error);
    res.status(500).json({ error: "Coaching response failed" });
  }
});

// ==========================================
// CHALLENGES AND SOCIAL SYSTEM
// ==========================================

app.get("/api/challenges", (req, res) => {
  res.json(db.challenges.find());
});

app.post("/api/challenges/join", (req, res) => {
  const userId = getAuthUserId(req);
  const user = db.users.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { challengeId } = req.body;
  const challenge = db.challenges.join(challengeId, userId, user.name);

  db.notifications.add(userId, `Joined Challenge: "${challenge?.title}". Run hard, climb the leaderboard!`);
  res.json(challenge);
});

app.get("/api/social/feed", (req, res) => {
  res.json(db.activities.find());
});

app.post("/api/social/like", (req, res) => {
  const userId = getAuthUserId(req);
  const { activityId } = req.body;
  const act = db.activities.like(activityId, userId);
  res.json(act);
});

app.post("/api/social/comment", (req, res) => {
  const userId = getAuthUserId(req);
  const user = db.users.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { activityId, text } = req.body;
  const comment = {
    id: "c_" + Date.now(),
    userId,
    userName: user.name,
    text,
    createdAt: new Date().toISOString()
  };

  const act = db.activities.addComment(activityId, comment);
  res.json(act);
});

app.get("/api/notifications", (req, res) => {
  const userId = getAuthUserId(req);
  res.json(db.notifications.find({ userId }));
});

app.post("/api/notifications/read", (req, res) => {
  const userId = getAuthUserId(req);
  db.notifications.markRead(userId);
  res.json({ success: true });
});

// ==========================================
// VITE DEV SERVER AND PRODUCTION INDEXING
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ApexFit] Server running fully loaded on port ${PORT}`);
  });
}

startServer();
