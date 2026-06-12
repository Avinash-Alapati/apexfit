/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: 'Chest' | 'Back' | 'Shoulders' | 'Arms' | 'Core' | 'Legs';
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  instructions: string[];
  commonMistakes: string[];
  sets: number;
  reps: number;
  restTime: number; // in seconds
  youtubeUrl?: string;
}

export interface UserProfile {
  age?: number;
  height?: number; // in cm
  weight?: number; // in kg
  gender?: string;
  fitnessGoal?: 'Fat Loss' | 'Muscle Gain' | 'Strength' | 'Endurance' | 'General Fitness';
  activityLevel?: 'Sedentary' | 'Lightly Active' | 'Moderately Active' | 'Very Active';
  workoutExperience?: 'Beginner' | 'Intermediate' | 'Advanced';
  availableEquipment?: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  profile?: UserProfile;
  xp: number;
  level: number;
  streak: number;
  lastActiveDate?: string;
}

export interface WorkoutSet {
  setNumber: number;
  reps: number;
  weight?: number; // in kg
  completed: boolean;
}

export interface LoggedExercise {
  exerciseId: string;
  name: string;
  muscleGroup: string;
  sets: WorkoutSet[];
}

export interface WorkoutSession {
  id: string;
  userId: string;
  name: string;
  date: string;
  duration: number; // in minutes
  caloriesBurned: number;
  xpEarned: number;
  exercises: LoggedExercise[];
  isCompleted: boolean;
}

export interface WorkoutPlan {
  id: string;
  userId: string;
  name: string;
  goal: string;
  equipment: string[];
  daysPerWeek: number;
  durationWeeks: number;
  createdAt: string;
  exercises: Exercise[];
}

export interface GPSCoordinate {
  lat: number;
  lng: number;
  timestamp: number;
}

export interface GPSRun {
  id: string;
  userId: string;
  userName: string;
  date: string;
  duration: number; // in seconds
  distance: number; // in kilometers
  pace: number; // in min/km
  calories: number;
  route: GPSCoordinate[];
  name: string;
}

export interface SocialActivity {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  type: 'workout' | 'run' | 'achievement';
  title: string;
  subtitle: string;
  date: string;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  comments: Comment[];
  details?: {
    distance?: number;
    duration?: number;
    calories?: number;
    exercisesCount?: number;
    achievementTitle?: string;
    achievementText?: string;
  };
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

export interface NutritionLog {
  id: string;
  userId: string;
  date: string;
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  name: string;
  calories: number;
  protein: number; // g
  carbs: number; // g
  fats: number; // g
}

export interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
}

export interface MealPlan {
  id: string;
  userId: string;
  date: string;
  goal: string;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snacks: Meal;
  };
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  unit: string;
  type: 'run' | 'calories' | 'workouts';
  startDate: string;
  endDate: string;
  participantsCount: number;
  isJoinedByCurrentUser: boolean;
  leaderboard: {
    userId: string;
    userName: string;
    value: number;
    rank: number;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  badgeCode: string; // e.g., 'first_workout', 'streak_7', 'run_100k'
  unlockedAt?: string;
  requirements: string;
  xpReward: number;
}

export type AchievementBadge = Achievement & { unlocked: boolean };
export type ChallengeSpec = Challenge;
export type ActivityFeedPost = SocialActivity;

export interface Message {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
}
