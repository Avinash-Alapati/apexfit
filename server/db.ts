/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import fs from 'fs';
import path from 'path';
import mongoose, { Schema } from 'mongoose';
import { 
  User, 
  WorkoutSession, 
  WorkoutPlan, 
  GPSRun, 
  SocialActivity, 
  NutritionLog, 
  MealPlan, 
  Challenge, 
  Achievement,
  Comment,
  Exercise
} from '../src/types';

const DB_DIR = path.join(process.cwd(), '.data');
const DB_FILE = path.join(DB_DIR, 'apex_db.json');

// MONGODB CONNECTION STRING
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/apexfit";

// Schema Definitions
const MongoUserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  avatarUrl: String,
  createdAt: String,
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  streak: { type: Number, default: 1 },
  lastActiveDate: String,
  profile: Schema.Types.Mixed
}, { timestamps: true });

const MongoWorkoutSessionSchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  name: String,
  date: String,
  duration: Number,
  caloriesBurned: Number,
  xpEarned: Number,
  isCompleted: Boolean,
  exercises: [{
    exerciseId: String,
    name: String,
    muscleGroup: String,
    sets: [{
      setNumber: Number,
      reps: Number,
      weight: Number,
      completed: Boolean
    }]
  }]
}, { timestamps: true });

const MongoWorkoutPlanSchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  name: String,
  goal: String,
  equipment: [String],
  daysPerWeek: Number,
  durationWeeks: Number,
  createdAt: String,
  exercises: [{
    id: String,
    name: String,
    muscleGroup: String,
    sets: Number,
    reps: String,
    instruction: String,
    videoUrl: String
  }]
}, { timestamps: true });

const MongoGPSRunSchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  userName: String,
  date: String,
  duration: Number,
  distance: Number,
  pace: Number,
  calories: Number,
  name: String,
  route: [{
    lat: Number,
    lng: Number,
    timestamp: Number
  }]
}, { timestamps: true });

const MongoSocialActivitySchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  userName: String,
  userAvatar: String,
  type: { type: String, required: true },
  title: String,
  subtitle: String,
  date: String,
  likesCount: { type: Number, default: 0 },
  isLikedByCurrentUser: { type: Boolean, default: false },
  comments: [{
    id: String,
    userId: String,
    userName: String,
    text: String,
    createdAt: String
  }],
  details: Schema.Types.Mixed
}, { timestamps: true });

const MongoFollowerSchema = new Schema({
  id: { type: String },
  followerId: { type: String, required: true },
  followingId: { type: String, required: true }
}, { timestamps: true });

const MongoNutritionLogSchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  date: String,
  mealType: String,
  foodName: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number
}, { timestamps: true });

const MongoMealPlanSchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  date: String,
  breakfast: Schema.Types.Mixed,
  lunch: Schema.Types.Mixed,
  dinner: Schema.Types.Mixed,
  snacks: Schema.Types.Mixed,
  dailyTotal: Schema.Types.Mixed
}, { timestamps: true });

const MongoXPHistorySchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  amount: Number,
  description: String,
  date: String
}, { timestamps: true });

const MongoNotificationSchema = new Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  text: String,
  date: String,
  read: { type: Boolean, default: false }
}, { timestamps: true });

const MongoChallengeSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  description: String,
  targetValue: Number,
  unit: String,
  type: String,
  startDate: String,
  endDate: String,
  participantsCount: Number,
  isJoinedByCurrentUser: { type: Boolean, default: false },
  leaderboard: [{
    userId: String,
    userName: String,
    value: Number,
    rank: Number
  }]
}, { timestamps: true });

const MongoAchievementSchema = new Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  description: String,
  badgeCode: String,
  requirements: String,
  xpReward: Number
}, { timestamps: true });

// Declare Models cleanly, preventing double compilation errors
const UserMod = mongoose.models.User || mongoose.model('User', MongoUserSchema);
const WorkoutSessionMod = mongoose.models.WorkoutSession || mongoose.model('WorkoutSession', MongoWorkoutSessionSchema);
const WorkoutPlanMod = mongoose.models.WorkoutPlan || mongoose.model('WorkoutPlan', MongoWorkoutPlanSchema);
const GPSRunMod = mongoose.models.GPSRun || mongoose.model('GPSRun', MongoGPSRunSchema);
const SocialActivityMod = mongoose.models.SocialActivity || mongoose.model('SocialActivity', MongoSocialActivitySchema);
const FollowerMod = mongoose.models.Follower || mongoose.model('Follower', MongoFollowerSchema);
const NutritionLogMod = mongoose.models.NutritionLog || mongoose.model('NutritionLog', MongoNutritionLogSchema);
const MealPlanMod = mongoose.models.MealPlan || mongoose.model('MealPlan', MongoMealPlanSchema);
const XPHistoryMod = mongoose.models.XPHistory || mongoose.model('XPHistory', MongoXPHistorySchema);
const NotificationMod = mongoose.models.Notification || mongoose.model('Notification', MongoNotificationSchema);
const ChallengeMod = mongoose.models.Challenge || mongoose.model('Challenge', MongoChallengeSchema);
const AchievementMod = mongoose.models.Achievement || mongoose.model('Achievement', MongoAchievementSchema);

interface SchemaDB {
  users: User[];
  workouts: WorkoutSession[];
  workoutPlans: WorkoutPlan[];
  runs: GPSRun[];
  activities: SocialActivity[];
  followers: { followerId: string; followingId: string }[];
  nutritionLogs: NutritionLog[];
  mealPlans: MealPlan[];
  xpHistory: { id: string; userId: string; amount: number; description: string; date: string }[];
  notifications: { id: string; userId: string; text: string; date: string; read: boolean }[];
  challenges: Challenge[];
  achievements: Achievement[];
}

const DEFAULT_CHALLENGES: Challenge[] = [
  {
    id: "challenge_1",
    title: "Summer Cardio Blitz",
    description: "Amass a grand total of 30,00 KM of running or walking to claim the Apex Gold Heart badge.",
    targetValue: 30.0,
    unit: "KM",
    type: "run",
    startDate: "2026-06-01",
    endDate: "2026-06-30",
    participantsCount: 842,
    isJoinedByCurrentUser: false,
    leaderboard: [
      { userId: "u_seed1", userName: "Marcus Vance (Pro)", value: 28.5, rank: 1 },
      { userId: "u_seed2", userName: "Sarah Jenkins", value: 24.1, rank: 2 },
      { userId: "u_seed3", userName: "Aisha Keita", value: 21.0, rank: 3 },
      { userId: "u_seed4", userName: "Yuji Tanaka", value: 18.2, rank: 4 }
    ]
  },
  {
    id: "challenge_2",
    title: "Pec Crusher Champion",
    description: "Squeeze, push, and row to burn 5,000 active calories in direct lifting and chest workouts.",
    targetValue: 5000,
    unit: "kcal",
    type: "calories",
    startDate: "2026-06-05",
    endDate: "2026-06-25",
    participantsCount: 1520,
    isJoinedByCurrentUser: false,
    leaderboard: [
      { userId: "u_seed5", userName: "Coach Brody", value: 4850, rank: 1 },
      { userId: "u_seed6", userName: "Eliza Smith", value: 4200, rank: 2 },
      { userId: "u_seed7", userName: "Dave Miller", value: 3950, rank: 3 }
    ]
  },
  {
    id: "challenge_3",
    title: "Consistency Cadet",
    description: "Log at least 5 complete workouts to build a solid habit and unlock Level 2 speed.",
    targetValue: 5,
    unit: " workouts",
    type: "workouts",
    startDate: "2026-06-01",
    endDate: "2026-06-15",
    participantsCount: 2351,
    isJoinedByCurrentUser: false,
    leaderboard: [
      { userId: "u_seed3", userName: "Aisha Keita", value: 4, rank: 1 },
      { userId: "u_seed2", userName: "Sarah Jenkins", value: 3, rank: 2 },
      { userId: "u_seed4", userName: "Yuji Tanaka", value: 3, rank: 3 }
    ]
  }
];

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: "ach_1", title: "Genesis Lift", description: "Record your very first complete gym workout or custom planned routine.", badgeCode: "first_workout", requirements: "1 complete workout", xpReward: 250 },
  { id: "ach_2", title: "Apex Nomad", description: "Log your first GPS run tracking outdoor distance.", badgeCode: "first_run", requirements: "1 GPS run", xpReward: 250 },
  { id: "ach_3", title: "Perfect Flame", description: "Burn more than 500 calories in a single, high-intensity exercise session.", badgeCode: "fire_500", requirements: "500 kcal burned", xpReward: 500 },
  { id: "ach_4", title: "Stamina Titan", description: "Cover a distance of 10.0 KM or more in a single tracked run.", badgeCode: "run_10k", requirements: "10 KM distance", xpReward: 600 },
  { id: "ach_5", title: "Habitual Beast", description: "Achieve a solid 5-day custom active calendar workout streak.", badgeCode: "streak_5", requirements: "5-day workout log streak", xpReward: 750 }
];

const SEED_ACTIVITIES: SocialActivity[] = [
  {
    id: "act_seed_1",
    userId: "u_seed1",
    userName: "Marcus Vance (Pro)",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&fit=crop",
    type: "run",
    title: "Early Morning Forest Shred 🌲",
    subtitle: "Nike Run Club pacing • Felt amazing",
    date: new Date(Date.now() - 4 * 3600000).toISOString(),
    likesCount: 14,
    isLikedByCurrentUser: false,
    comments: [
      { id: "c_s1", userId: "u_seed2", userName: "Sarah Jenkins", text: "Absolute speed demon! Awesome pace.", createdAt: new Date(Date.now() - 3 * 3600000).toISOString() }
    ],
    details: {
      distance: 12.4,
      duration: 3120, // 52 min
      calories: 840
    }
  },
  {
    id: "act_seed_2",
    userId: "u_seed3",
    userName: "Aisha Keita",
    userAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&fit=crop",
    type: "workout",
    title: "Hypertrophy Push Day complete! 🔥",
    subtitle: "45 mins of high-tension chest & triceps",
    date: new Date(Date.now() - 10 * 3600000).toISOString(),
    likesCount: 8,
    isLikedByCurrentUser: false,
    comments: [],
    details: {
      exercisesCount: 5,
      duration: 45,
      calories: 380
    }
  }
];

class DatabaseEngine {
  private isMongo = false;
  private data: SchemaDB = {
    users: [],
    workouts: [],
    workoutPlans: [],
    runs: [],
    activities: SEED_ACTIVITIES,
    followers: [],
    nutritionLogs: [],
    mealPlans: [],
    xpHistory: [],
    notifications: [],
    challenges: DEFAULT_CHALLENGES,
    achievements: DEFAULT_ACHIEVEMENTS
  };

  constructor() {
    this.init();
  }

  private async init() {
    // Attempt connecting to MongoDB asynchronously to keep server launch instantaneous and responsive
    console.log(`[DatabaseEngine] Connecting to database...`);
    try {
      mongoose.set('strictQuery', false);
      
      // Register background connection stream error handlers to prevent uncaught EventEmitter crashes in Node.js
      mongoose.connection.on('error', (err) => {
        console.warn(`[DatabaseEngine] Background Mongoose connection error:`, err.message || err);
      });

      await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 2000,
        connectTimeoutMS: 2000,
      });
      this.isMongo = true;
      console.log(`[DatabaseEngine] Successfully connected to MongoDB production database at ${MONGODB_URI}`);
      await this.preloadFromMongo();
    } catch (err) {
      console.warn(`[DatabaseEngine] MongoDB connection failed or offline. Falling back to high-performance local JSON engine.`, err);
      this.isMongo = false;
      this.loadLocal();
    }
  }

  private async preloadFromMongo() {
    try {
      const users = await UserMod.find().lean();
      const workouts = await WorkoutSessionMod.find().lean();
      const workoutPlans = await WorkoutPlanMod.find().lean();
      const runs = await GPSRunMod.find().lean();
      const activities = await SocialActivityMod.find().lean();
      const followers = await FollowerMod.find().lean();
      const nutritionLogs = await NutritionLogMod.find().lean();
      const mealPlans = await MealPlanMod.find().lean();
      const xpHistory = await XPHistoryMod.find().lean();
      const notifications = await NotificationMod.find().lean();
      const challenges = await ChallengeMod.find().lean();
      const achievements = await AchievementMod.find().lean();

      if (users && users.length > 0) {
        console.log(`[DatabaseEngine] Loaded existing user database from remote MongoDB!`);
        this.data.users = (users as any[]) || [];
        this.data.workouts = (workouts as any[]) || [];
        this.data.workoutPlans = (workoutPlans as any[]) || [];
        this.data.runs = (runs as any[]) || [];
        this.data.activities = (activities.length > 0 ? (activities as any[]) : SEED_ACTIVITIES);
        this.data.followers = (followers as any[]) || [];
        this.data.nutritionLogs = (nutritionLogs as any[]) || [];
        this.data.mealPlans = (mealPlans as any[]) || [];
        this.data.xpHistory = (xpHistory as any[]) || [];
        this.data.notifications = (notifications as any[]) || [];
        this.data.challenges = (challenges.length > 0 ? (challenges as any[]) : DEFAULT_CHALLENGES);
        this.data.achievements = (achievements.length > 0 ? (achievements as any[]) : DEFAULT_ACHIEVEMENTS);
      } else {
        console.log(`[DatabaseEngine] Remote MongoDB is empty. Replicating/Seeding current local memory dataset into MongoDB...`);
        
        // Write the current local dataset (which already contains users/work-out sessions generated synchronously by server.ts) to Mongo
        if (this.data.users.length > 0) {
          await UserMod.insertMany(this.data.users as any);
        }
        if (this.data.workouts.length > 0) {
          await WorkoutSessionMod.insertMany(this.data.workouts as any);
        }
        if (this.data.workoutPlans.length > 0) {
          await WorkoutPlanMod.insertMany(this.data.workoutPlans as any);
        }
        if (this.data.runs.length > 0) {
          await GPSRunMod.insertMany(this.data.runs as any);
        }
        if (this.data.activities.length > 0) {
          await SocialActivityMod.insertMany(this.data.activities as any);
        }
        if (this.data.challenges.length > 0) {
          await ChallengeMod.insertMany(this.data.challenges as any);
        }
        if (this.data.achievements.length > 0) {
          await AchievementMod.insertMany(this.data.achievements as any);
        }
        
        this.saveLocal();
      }
    } catch (e) {
      console.error("[DatabaseEngine] Error occurred preloading data from MongoDB, preserving fallbacks", e);
    }
  }

  private loadLocal() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        this.data = {
          users: parsed.users || [],
          workouts: parsed.workouts || [],
          workoutPlans: parsed.workoutPlans || [],
          runs: parsed.runs || [],
          activities: parsed.activities || SEED_ACTIVITIES,
          followers: parsed.followers || [],
          nutritionLogs: parsed.nutritionLogs || [],
          mealPlans: parsed.mealPlans || [],
          xpHistory: parsed.xpHistory || [],
          notifications: parsed.notifications || [],
          challenges: parsed.challenges || DEFAULT_CHALLENGES,
          achievements: parsed.achievements || DEFAULT_ACHIEVEMENTS
        };
      } else {
        this.saveLocal();
      }
    } catch (e) {
      console.error("Failed to load local database, resetting", e);
    }
  }

  private saveLocal() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (e) {
      console.error("Failed to write to local database", e);
    }
  }

  // Double write / background replication to MongoDB
  private async syncToMongo(collectionName: string, action: 'save' | 'update' | 'delete', recordId: string, recordData?: any) {
    if (!this.isMongo) return;
    try {
      let model: any;
      switch (collectionName) {
        case 'users': model = UserMod; break;
        case 'workouts': model = WorkoutSessionMod; break;
        case 'workoutPlans': model = WorkoutPlanMod; break;
        case 'runs': model = GPSRunMod; break;
        case 'activities': model = SocialActivityMod; break;
        case 'followers': model = FollowerMod; break;
        case 'nutritionLogs': model = NutritionLogMod; break;
        case 'mealPlans': model = MealPlanMod; break;
        case 'xpHistory': model = XPHistoryMod; break;
        case 'notifications': model = NotificationMod; break;
        case 'challenges': model = ChallengeMod; break;
        case 'achievements': model = AchievementMod; break;
      }

      if (!model) return;

      if (action === 'save') {
        const doc = new model(recordData);
        await model.findOneAndUpdate({ id: recordId }, recordData, { upsert: true, new: true });
      } else if (action === 'update') {
        await model.findOneAndUpdate({ id: recordId }, { $set: recordData }, { upsert: true, new: true });
      } else if (action === 'delete') {
        await model.deleteOne({ id: recordId });
      }
    } catch (err) {
      console.error(`[DatabaseEngine] Failure replicating ${collectionName} ${action} to MongoDB:`, err);
    }
  }

  public saveAll() {
    this.saveLocal();
  }

  // Collection Accessors mapped synchronously
  get users() {
    return {
      find: () => this.data.users,
      findById: (id: string) => this.data.users.find(u => u && u.id === id),
      findByEmail: (email: string) => this.data.users.find(u => u && u.email && u.email.toLowerCase() === (email || '').toLowerCase()),
      create: (user: User) => {
        this.data.users.push(user);
        this.saveLocal();
        this.syncToMongo('users', 'save', user.id, user);
        return user;
      },
      update: (id: string, updates: Partial<User>) => {
        const idx = this.data.users.findIndex(u => u.id === id);
        if (idx !== -1) {
          this.data.users[idx] = { ...this.data.users[idx], ...updates };
          this.saveLocal();
          this.syncToMongo('users', 'update', id, updates);
          return this.data.users[idx];
        }
        return null;
      }
    };
  }

  get workouts() {
    return {
      find: (filter?: { userId?: string }) => {
        if (filter?.userId) {
          return this.data.workouts.filter(w => w.userId === filter.userId);
        }
        return this.data.workouts;
      },
      create: (s: WorkoutSession) => {
        this.data.workouts.push(s);
        this.saveLocal();
        this.syncToMongo('workouts', 'save', s.id, s);
        return s;
      }
    };
  }

  get workoutPlans() {
    return {
      find: (filter?: { userId?: string }) => {
        if (filter?.userId) {
          return this.data.workoutPlans.filter(p => p.userId === filter.userId);
        }
        return this.data.workoutPlans;
      },
      create: (p: WorkoutPlan) => {
        this.data.workoutPlans.push(p);
        this.saveLocal();
        this.syncToMongo('workoutPlans', 'save', p.id, p);
        return p;
      }
    };
  }

  get runs() {
    return {
      find: (filter?: { userId?: string }) => {
        if (filter?.userId) {
          return this.data.runs.filter(r => r.userId === filter.userId);
        }
        return this.data.runs;
      },
      create: (r: GPSRun) => {
        this.data.runs.push(r);
        this.saveLocal();
        this.syncToMongo('runs', 'save', r.id, r);
        return r;
      }
    };
  }

  get activities() {
    return {
      find: () => this.data.activities,
      create: (a: SocialActivity) => {
        this.data.activities.unshift(a);
        this.saveLocal();
        this.syncToMongo('activities', 'save', a.id, a);
        return a;
      },
      like: (actId: string, currentUserId: string) => {
        const act = this.data.activities.find(a => a.id === actId);
        if (act) {
          if (act.isLikedByCurrentUser) {
            act.likesCount = Math.max(0, act.likesCount - 1);
            act.isLikedByCurrentUser = false;
          } else {
            act.likesCount++;
            act.isLikedByCurrentUser = true;
          }
          this.saveLocal();
          this.syncToMongo('activities', 'save', actId, act);
        }
        return act;
      },
      addComment: (actId: string, comment: Comment) => {
        const act = this.data.activities.find(a => a.id === actId);
        if (act) {
          act.comments.push(comment);
          this.saveLocal();
          this.syncToMongo('activities', 'save', actId, act);
        }
        return act;
      }
    };
  }

  get followers() {
    return {
      find: () => this.data.followers,
      isFollowing: (followerId: string, followingId: string) => {
        return this.data.followers.some(f => f.followerId === followerId && f.followingId === followingId);
      },
      toggleFollow: (followerId: string, followingId: string) => {
        const matchIdx = this.data.followers.findIndex(f => f.followerId === followerId && f.followingId === followingId);
        let following = false;
        if (matchIdx !== -1) {
          this.data.followers.splice(matchIdx, 1);
          // Delete operation
          if (this.isMongo) {
            FollowerMod.deleteOne({ followerId, followingId }).catch(e => console.error(e));
          }
        } else {
          this.data.followers.push({ followerId, followingId });
          following = true;
          // Create operation
          if (this.isMongo) {
            FollowerMod.create({ followerId, followingId }).catch(e => console.error(e));
          }
        }
        this.saveLocal();
        return { following };
      }
    };
  }

  get nutritionLogs() {
    return {
      find: (filter?: { userId?: string, date?: string }) => {
        let list = this.data.nutritionLogs;
        if (filter?.userId) {
          list = list.filter(n => n.userId === filter.userId);
        }
        if (filter?.date) {
          list = list.filter(n => n.date === filter.date);
        }
        return list;
      },
      create: (n: NutritionLog) => {
        this.data.nutritionLogs.push(n);
        this.saveLocal();
        this.syncToMongo('nutritionLogs', 'save', n.id, n);
        return n;
      },
      delete: (id: string) => {
        const idx = this.data.nutritionLogs.findIndex(n => n.id === id);
        if (idx !== -1) {
          this.data.nutritionLogs.splice(idx, 1);
          this.saveLocal();
          this.syncToMongo('nutritionLogs', 'delete', id);
          return true;
        }
        return false;
      }
    };
  }

  get mealPlans() {
    return {
      find: (filter?: { userId?: string, date?: string }) => {
        let list = this.data.mealPlans;
        if (filter?.userId) {
          list = list.filter(m => m.userId === filter.userId);
        }
        if (filter?.date) {
          list = list.filter(m => m.date === filter.date);
        }
        return list;
      },
      create: (m: MealPlan) => {
        this.data.mealPlans.push(m);
        this.saveLocal();
        this.syncToMongo('mealPlans', 'save', m.id, m);
        return m;
      }
    };
  }

  get challenges() {
    return {
      find: () => this.data.challenges,
      findById: (id: string) => this.data.challenges.find(c => c.id === id),
      join: (chalId: string, userId: string, userName: string) => {
        const chal = this.data.challenges.find(c => c.id === chalId);
        if (chal) {
          chal.isJoinedByCurrentUser = true;
          chal.participantsCount++;
          const hasUser = chal.leaderboard.some(l => l.userId === userId);
          if (!hasUser) {
            chal.leaderboard.push({
              userId,
              userName,
              value: 0,
              rank: chal.leaderboard.length + 1
            });
          }
          this.saveLocal();
          this.syncToMongo('challenges', 'save', chalId, chal);
        }
        return chal;
      },
      updateUserProgress: (userId: string, type: 'run' | 'calories' | 'workouts', valueToAdd: number) => {
        let updatedAny = false;
        this.data.challenges.forEach(chal => {
          if (chal.isJoinedByCurrentUser && chal.type === type) {
            const entry = chal.leaderboard.find(l => l.userId === userId);
            if (entry) {
              entry.value = Number((entry.value + valueToAdd).toFixed(2));
              updatedAny = true;
            }
          }
        });
        if (updatedAny) {
          this.data.challenges.forEach(chal => {
            chal.leaderboard.sort((a, b) => b.value - a.value);
            chal.leaderboard.forEach((item, index) => {
              item.rank = index + 1;
            });
          });
          this.saveLocal();
          // Update MongoDB in bulk
          if (this.isMongo) {
            this.data.challenges.forEach(c => {
              this.syncToMongo('challenges', 'save', c.id, c);
            });
          }
        }
      }
    };
  }

  get xpHistory() {
    return {
      find: (filter?: { userId?: string }) => {
        if (filter?.userId) {
          return this.data.xpHistory.filter(x => x.userId === filter.userId);
        }
        return this.data.xpHistory;
      },
      add: (userId: string, amount: number, description: string) => {
        const id = "xp_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
        const item = {
          id,
          userId,
          amount,
          description,
          date: new Date().toISOString()
        };
        this.data.xpHistory.push(item);
        
        const user = this.data.users.find(u => u.id === userId);
        if (user) {
          user.xp += amount;
          const oldLevel = user.level;
          const newLevel = Math.max(1, Math.floor(user.xp / 1000) + 1);
          if (newLevel > oldLevel) {
            user.level = newLevel;
            this.notifications.add(userId, `Level Up! 🎉 You are now Level ${newLevel}. Maintain your momentum!`);
          }
        }
        this.saveLocal();
        this.syncToMongo('xpHistory', 'save', id, item);
        if (user) {
          this.syncToMongo('users', 'save', user.id, user); // Update level and XP
        }
        return item;
      }
    };
  }

  get notifications() {
    return {
      find: (filter?: { userId?: string }) => {
        if (filter?.userId) {
          return this.data.notifications.filter(n => n.userId === filter.userId);
        }
        return this.data.notifications;
      },
      add: (userId: string, text: string) => {
        const id = "notif_" + Date.now() + "_" + Math.floor(Math.random() * 1000);
        const item = {
          id,
          userId,
          text,
          date: new Date().toISOString(),
          read: false
        };
        this.data.notifications.unshift(item);
        this.saveLocal();
        this.syncToMongo('notifications', 'save', id, item);
        return item;
      },
      markRead: (userId: string) => {
        this.data.notifications
          .filter(n => n.userId === userId)
          .forEach(n => {
            n.read = true;
            this.syncToMongo('notifications', 'save', n.id, n);
          });
        this.saveLocal();
        return true;
      }
    };
  }

  public checkAchievements(userId: string) {
    const user = this.data.users.find(u => u.id === userId);
    if (!user) return [];

    const userWorkouts = this.data.workouts.filter(w => w.userId === userId);
    const userRuns = this.data.runs.filter(r => r.userId === userId);
    const earnedBadges = new Set(this.data.activities
      .filter(a => a.userId === userId && a.type === 'achievement')
      .map(a => a.details?.achievementTitle)
    );

    const newlyUnlocked: string[] = [];

    if (userWorkouts.length >= 1 && !earnedBadges.has("Genesis Lift")) {
      newlyUnlocked.push("ach_1");
    }

    if (userRuns.length >= 1 && !earnedBadges.has("Apex Nomad")) {
      newlyUnlocked.push("ach_2");
    }

    const hasBigBurn = userWorkouts.some(w => w.caloriesBurned >= 500) || userRuns.some(r => r.calories >= 500);
    if (hasBigBurn && !earnedBadges.has("Perfect Flame")) {
      newlyUnlocked.push("ach_3");
    }

    const hasLongRun = userRuns.some(r => r.distance >= 10.0);
    if (hasLongRun && !earnedBadges.has("Stamina Titan")) {
      newlyUnlocked.push("ach_4");
    }

    if (user.streak >= 5 && !earnedBadges.has("Habitual Beast")) {
      newlyUnlocked.push("ach_5");
    }

    newlyUnlocked.forEach(id => {
      const ach = this.data.achievements.find(a => a.id === id);
      if (ach) {
        this.xpHistory.add(userId, ach.xpReward, `Unlocked Achievement: ${ach.title}`);
        
        this.activities.create({
          id: "act_ach_" + Date.now(),
          userId: user.id,
          userName: user.name,
          userAvatar: user.avatarUrl,
          type: "achievement",
          title: `Unlocked: ${ach.title} 🏆`,
          subtitle: ach.description,
          date: new Date().toISOString(),
          likesCount: 5,
          isLikedByCurrentUser: false,
          comments: [],
          details: {
            achievementTitle: ach.title,
            achievementText: ach.description
          }
        });

        this.notifications.add(userId, `🏆 ACHIEVEMENT UNLOCKED: "${ach.title}" - Recieved +${ach.xpReward} XP!`);
      }
    });

    return newlyUnlocked;
  }
}

export const db = new DatabaseEngine();
