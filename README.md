# ApexFit 🏋️‍♂️🥗🏃‍♂️

ApexFit is a premium, full-stack, AI-powered health and fitness portal that consolidates workout scheduling, precise calorie tracking, GPS running history, live coach chat, and motivational achievements into a single, cohesive dashboard.

Powered by modern **React 19** on the client side and an **Express.js** backend coupled with **Google Gemini AI**, ApexFit creates personalized routines and meal plans tailored to your specific fitness goals, dietary restrictions, and available ingredients.

---

## 🚀 Key Features

*   **Interactive Workout Generator**: Instantly generate structured, hyper-personalized training routines. Click steps to view instructions, jump to verified YouTube video tutorials, and log individual sets dynamically.
*   **Custom Meal Planner with Waste Reduction**: Plan your meals according to dietary goals (Vegan, Keto, High Protein). Input whatever ingredients are in your fridge, and Gemini will prioritize utilizing them to generate delicious, custom recipes!
*   **Form Coach Voice Synthesizer**: Get custom vocal audio reminders on proper lifting form and workout motivation directly from the coach.
*   **Precision Workout & Nutrition Trackers**: Easily record daily calories, macronutrients (Protein, Carbs, Fats), and workouts to maintain your physical momentum.
*   **Activity History with GPS Trace Visuals**: Record and review running sessions with custom plotted map routes and fitness pacing metrics.
*   **AI Coach Chat Integration**: Have an interactive conversation with a state-of-the-art virtual coach for wellness queries, form correction, and healthy lifestyle planning (backed by real-time Google GenAI models).
*   **Gamified Milestones & Badges**: Unlock persistent accomplishment achievements as you complete workouts, break personal records, and maintain login streaks.

---

## 🛠️ Technology Stack

*   **Frontend**:
    *   **React 19** + **Vite 6** (Single Page Application architecture)
    *   **Tailwind CSS v4** (Utility-first styling with modern native styling engine integration)
    *   **Motion** (Framed animations & fluid interactive page transitions)
    *   **Recharts** (Custom visual graphs & fitness dashboards)
    *   **Lucide Icons** (Polished and consistent iconography)
*   **Backend**:
    *   **Express.js** + **TypeScript** server
    *   **tsx** (TypeScript Execution tool for sub-second, hot-reloading native development)
    *   **Google GenAI SDK** (`@google/genai`) to power intelligent agentic context streams
    *   **esbuild** (Bundles server-side code into single, high-efficiency production bundles)
    *   **In-Memory Local File Database** synced to disk for low-latency durability

---

## 📦 Local Setup & Installation

Follow these quick steps to set up and run ApexFit on your local computer after downloading the source ZIP file:

### 📋 Prerequisites

Make sure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (Version **18.x or above** is recommended)
*   [npm](https://www.npmjs.com/) (usually comes bundled with Node.js)

---

### Step 1: Extract the Codebase
Extract the downloaded ZIP file to a target folder of your choice on your system.

### Step 2: Install Dependencies
Open your command terminal, navigate to the extracted project directory, and run the following command to download all necessary npm packages:

```bash
npm install
```

### Step 3: Configure Environment Variables
1. At the root of the project, look for the `.env.example` file.
2. Create standard copies or rename them to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Open the `.env` file in a text editor.
4. Replace the placeholders with your actual API keys. To utilize the AI generation features fully, obtain a Gemini API Key from Google AI Studio and configure it:
   ```env
   GEMINI_API_KEY="AIzaSyYourActualGeminiApiKey..."
   APP_URL="http://localhost:3000"
   ```

### Step 4: Run the Development Server
Get the backend Express API and the Vite frontend running concurrently with a single command:

```bash
npm run dev
```

Your application is now hosted and ready!
*   Open your web browser and go to: **`http://localhost:3000`**
*   The dev server automatically hot-reloads when you make changes to files.

---

## 🏗️ Production Build & Run

If you want to bundle, compile, and run the applet in a high-performance production mode locally:

1.  **Build Code base**: Packages and optimizes client assets, compiles backend TS server code, and generates CommonJS server distribution components under `/dist`:
    ```bash
    npm run build
    ```
2.  **Start Production Server**:
    ```bash
    npm run start
    ```
3.  Navigate to `http://localhost:3000` to interact with your compiled application!

---

## 📂 Project Directory Structure

```text
├── .data/                  # Persistent JSON storage tables
├── assets/                 # Graphics assets
├── server/                 # Express backend directory
│   ├── db.ts               # Local in-memoriam data adapter configuration
│   └── gemini.ts           # Google GenAI model interaction bindings
├── src/                    # Client application directory
│   ├── components/         # Extracted modular React views
│   │   ├── CoachChat.tsx   # AI Coach Chat interface
│   │   ├── Header.tsx      # Main application navigation bar
│   │   ├── MealPlanner.tsx # Dynamic calories & recipes engine
│   │   └── WorkoutManager.tsx # Structured training loops
│   ├── utils/              # Client utility code (workouts links, helpers)
│   ├── App.tsx             # Root React configuration
│   ├── main.tsx            # Main DOM orchestrator entrypoint
│   └── index.css           # Global Tailwind and font setups
├── server.ts               # Core full-stack Express server controller
├── package.json            # Scripts & App dependencies list
└── README.md               # User guide (This File)
```

---

## 💡 Troubleshooting

*   **Error: `Cannot find module ...`**: Make sure you ran `npm install` inside the project root folder.
*   **AI generation fails**: Double-check your `.env` file to ensure `GEMINI_API_KEY` is spelled correctly and contains a valid key starting with `AIzaSy`.
*   **State Reset on Page Refresh**: The app persists active tabs via `localStorage`. Make sure your cookies/local storage permissions are enabled for localhost.
