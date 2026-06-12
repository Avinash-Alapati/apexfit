/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Exercise } from './types';

export const EXERCISE_DATABASE: Exercise[] = [
  // --- CHEST (17 exercises) ---
  {
    id: "chest_1",
    name: "Barbell Bench Press",
    muscleGroup: "Chest",
    equipment: "Barbell",
    difficulty: "Intermediate",
    description: "The classic flat bench press to build chest mass, strength, and power.",
    instructions: [
      "Lie flat on a bench, grip the barbell slightly wider than shoulder-width.",
      "Unrack the bar and hold it straight over your chest.",
      "Lower the bar slowly to your mid-chest level.",
      "Push the bar back up powerfully to the starting position."
    ],
    commonMistakes: [
      "Flaring elbows excessively (keep them at 45 degrees).",
      "Bouncing the bar off the chest.",
      "Arching the lower back off the bench too much."
    ],
    sets: 4,
    reps: 8,
    restTime: 90
  },
  {
    id: "chest_2",
    name: "Dumbbell Incline Press",
    muscleGroup: "Chest",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    description: "Incline press with dumbbells targeting upper chest fibers.",
    instructions: [
      "Set bench to 30-45 degree incline.",
      "Hold dumbbells at chest height with palms facing forward.",
      "Press dumbbells straight up until arms are extended.",
      "Lower slowly back to standard position."
    ],
    commonMistakes: [
      "Clipping dumbbells together at the top.",
      "Too steep bench angle (shifting effort to front delts)."
    ],
    sets: 4,
    reps: 10,
    restTime: 90
  },
  {
    id: "chest_3",
    name: "Push-Up",
    muscleGroup: "Chest",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    description: "Standard bodyweight push-up targeting the chest, shoulders, and triceps.",
    instructions: [
      "Start in plank position, hands slightly wider than shoulders.",
      "Lower your body until your chest almost touches the floor.",
      "Push flatly away from the floor back to starter push position."
    ],
    commonMistakes: [
      "Sagging hips or high butt.",
      "Half reps (not going deep enough)."
    ],
    sets: 3,
    reps: 15,
    restTime: 60
  },
  {
    id: "chest_4",
    name: "Decline Dumbbell Press",
    muscleGroup: "Chest",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    description: "Decline-positioned dumbbell press targeting the lower pectoral fibers.",
    instructions: [
      "Secure legs on a decline bench. Secure dumbbells at chest level.",
      "Press dumbbells up in a unified trajectory.",
      "Lower comfortably toward your lower chest pectorals."
    ],
    commonMistakes: [
      "Improper footing safety.",
      "Using heavy dumbbells without a spotter."
    ],
    sets: 4,
    reps: 10,
    restTime: 90
  },
  {
    id: "chest_5",
    name: "Chest Fly",
    muscleGroup: "Chest",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    description: "Spacious fly movement targeting inner and outer chest definition.",
    instructions: [
      "Lie on flat bench with dumbbells held straight over chest, slight elbow bend.",
      "Lower arms out wide in an arc-like path.",
      "Squeeze pectorals together to bring weights back to top."
    ],
    commonMistakes: [
      "Bending elbows too much (making it a press).",
      "Lowering past shoulder level causing shoulder strain."
    ],
    sets: 3,
    reps: 12,
    restTime: 75
  },
  {
    id: "chest_6",
    name: "Cable Crossover",
    muscleGroup: "Chest",
    equipment: "Cables",
    difficulty: "Intermediate",
    description: "Isolation movement using cable pulleys for constant pectoral tension.",
    instructions: [
      "Set pulleys to high level, grab handles, step forward with one foot.",
      "Bring hands together down in front of your waist with a slight elbow bend.",
      "Return slowly to wide stretch."
    ],
    commonMistakes: [
      "Leaning too far forward.",
      "Allowing shoulders to roll forward."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "chest_7",
    name: "Dumbbell Pullover",
    muscleGroup: "Chest",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    description: "Stretches chest muscles and serratus anterior using a single dumbbell.",
    instructions: [
      "Lie perpendicular across a flat bench, holding a dumbbell over your face.",
      "Lower dumbbell backward behind your head until arms align with torso.",
      "Pull dumbbell back to chest level using chest muscles."
    ],
    commonMistakes: [
      "Bending elbows too much.",
      "Hips lifting up too high."
    ],
    sets: 3,
    reps: 12,
    restTime: 75
  },
  {
    id: "chest_8",
    name: "Pec Deck Machine",
    muscleGroup: "Chest",
    equipment: "Machine",
    difficulty: "Beginner",
    description: "Easy chest-fly motion isolation on machine.",
    instructions: [
      "Adjust seat height so handles are at chest level.",
      "Press pads or handles together, squeezing center chest.",
      "Slowly return to starting stretch position."
    ],
    commonMistakes: [
      "Letting the stack crash.",
      "Shrugging shoulders up."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "chest_9",
    name: "Incline Barbell Press",
    muscleGroup: "Chest",
    equipment: "Barbell",
    difficulty: "Intermediate",
    description: "Upper chest powerhouse targeting strength.",
    instructions: [
      "Lie on 30-45 degree incline bench under barbell.",
      "Lower barbell to upper chest under control.",
      "Press barbell straight up until arms lock."
    ],
    commonMistakes: [
      "Touching the bar too low on the stomach.",
      "Bouncing off upper chest."
    ],
    sets: 4,
    reps: 8,
    restTime: 90
  },
  {
    id: "chest_10",
    name: "Svend Press",
    muscleGroup: "Chest",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    description: "Isometric chest squeeze utilizing a weight plate or light dumbbells.",
    instructions: [
      "Stand tall, squeeze a plate or dumbbell flat between your palms in front of chest.",
      "Extend your arms straight out, keeping extreme squeeze on the plate.",
      "Bring back inward to your chest."
    ],
    commonMistakes: [
      "Not squeezing hard enough horizontally."
    ],
    sets: 3,
    reps: 15,
    restTime: 60
  },
  {
    id: "chest_11",
    name: "Weighted Dips",
    muscleGroup: "Chest",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    description: "Lower chest and tricep developer using standard dip bars.",
    instructions: [
      "Grip dip bars, lift body up. Lean torso slightly forward.",
      "Lower your body by bending elbows until upper arms are parallel to floor.",
      "Press back up to lock out."
    ],
    commonMistakes: [
      "Staying too upright (shifts focus to triceps).",
      "Dropping down too low too fast."
    ],
    sets: 3,
    reps: 8,
    restTime: 90
  },
  {
    id: "chest_12",
    name: "Wide Grip Push-Up",
    muscleGroup: "Chest",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    description: "Push-up variation emphasizing outer chest stretching.",
    instructions: [
      "Set hand placement wider than normal push-up.",
      "Lower chest carefully with elbows out.",
      "Push back to starting stance."
    ],
    commonMistakes: [
      "Shoulder flare straining joints."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "chest_13",
    name: "Decline Barbell Press",
    muscleGroup: "Chest",
    equipment: "Barbell",
    difficulty: "Advanced",
    description: "Barbell compound press on decline bench targeting lower chest.",
    instructions: [
      "Secure feet on decline bench, unrack barbell.",
      "Lower barbell carefully to lower ribs/sternum.",
      "Press bar straight up with shoulder engagement."
    ],
    commonMistakes: [
      "Insecure foot locking."
    ],
    sets: 4,
    reps: 8,
    restTime: 90
  },
  {
    id: "chest_14",
    name: "Incline Cable Fly",
    muscleGroup: "Chest",
    equipment: "Cables",
    difficulty: "Intermediate",
    description: "Upper chest fly using high dynamic cable tension.",
    instructions: [
      "Place incline bench in center of cable crossover station.",
      "Strap under-grip pulleys, lift in flight trajectory overhead.",
      "Return wide under deep loaded stretch."
    ],
    commonMistakes: [
      "Overextending shoulders at bottom."
    ],
    sets: 3,
    reps: 12,
    restTime: 75
  },
  {
    id: "chest_15",
    name: "Floor Press",
    muscleGroup: "Chest",
    equipment: "Barbell",
    difficulty: "Intermediate",
    description: "Tricep and chest compound press on the floor.",
    instructions: [
      "Lie on the floor under a barbell rack.",
      "Lower barbell until upper arms touch the floor flat.",
      "Press barbell straight up again."
    ],
    commonMistakes: [
      "Slamming triceps directly into the floor."
    ],
    sets: 4,
    reps: 8,
    restTime: 90
  },
  {
    id: "chest_16",
    name: "Single-Arm Cable Press",
    muscleGroup: "Chest",
    equipment: "Cables",
    difficulty: "Intermediate",
    description: "Unilateral cable press targeting isolation and stabilizer strength.",
    instructions: [
      "Set cable pulley to chest height.",
      "Stand facing away from cable, hold handle and press forward.",
      "Control resistance back to chest."
    ],
    commonMistakes: [
      "Torso rotating too much."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "chest_17",
    name: "Landmine Chest Press",
    muscleGroup: "Chest",
    equipment: "Barbell",
    difficulty: "Intermediate",
    description: "Standing incline squeeze action on barbell landmine setup.",
    instructions: [
      "Grip end of weighted barbell with both hands, held at upper chest.",
      "Press barbell upward and forward together.",
      "Squeeze pectorals aggressively at extension."
    ],
    commonMistakes: [
      "Not gripping end securely."
    ],
    sets: 3,
    reps: 12,
    restTime: 75
  },

  // --- BACK (17 exercises) ---
  {
    id: "back_1",
    name: "Deadlift",
    muscleGroup: "Back",
    equipment: "Barbell",
    difficulty: "Advanced",
    description: "The ultimate compound back, structural posterior chain and hamstring movement.",
    instructions: [
      "Stand with mid-foot under barbell. Bend over, flat back, grip bar shoulder-width.",
      "Lower hips slightly, engage core, look straight down/ahead.",
      "Drive through heels, pulling bar up along shins to full upright lock.",
      "Hinge hips backward and lower bar under solid tension."
    ],
    commonMistakes: [
      "Rounding the lower back (danger of disc injury).",
      "Pulling strictly with arms."
    ],
    sets: 4,
    reps: 5,
    restTime: 120
  },
  {
    id: "back_2",
    name: "Pull-Up",
    muscleGroup: "Back",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    description: "Upper back and lat developer utilizing a wide-overhand grip over head.",
    instructions: [
      "Hang from pull-up bar, grip wider than shoulders.",
      "Pull chest toward bar by squeezing shoulder blades downward and back.",
      "Lower body slowly to full dead hang."
    ],
    commonMistakes: [
      "Using momentum (kicking/kipping).",
      "Not using full range of motion."
    ],
    sets: 4,
    reps: 8,
    restTime: 90
  },
  {
    id: "back_3",
    name: "Bent-Over Row",
    muscleGroup: "Back",
    equipment: "Barbell",
    difficulty: "Intermediate",
    description: "Thick back builder drawing barbells to stomach waist.",
    instructions: [
      "Hold barbell overhand, bend hips forward to 45 degrees, flat back status.",
      "Pull bar upward to lower chest/navel, keeping elbows in.",
      "Lower bar slowly back downward."
    ],
    commonMistakes: [
      "Shrugging upright to row (making it a shrug).",
      "Losing flat spinal alignment."
    ],
    sets: 4,
    reps: 8,
    restTime: 90
  },
  {
    id: "back_4",
    name: "Lat Pulldown",
    muscleGroup: "Back",
    equipment: "Machine",
    difficulty: "Beginner",
    description: "Standard vertical pull machine targeting latissimus dorsi.",
    instructions: [
      "Grip wide bar, sit down under pads securely.",
      "Pull bar down to upper collarbone, leading with elbows.",
      "Slowly extend arms up."
    ],
    commonMistakes: [
      "Leaning back excessively.",
      "Pulling bar behind the neck."
    ],
    sets: 4,
    reps: 10,
    restTime: 75
  },
  {
    id: "back_5",
    name: "Seated Cable Row",
    muscleGroup: "Back",
    equipment: "Cables",
    difficulty: "Beginner",
    description: "Horizontal rowing pulling attachment to midsection.",
    instructions: [
      "Sit upright feet on pads, knees slightly bent, hold double-D row attachment.",
      "Pull handles toward stomach, squeezing scapulae back.",
      "Slowly let weights glide back."
    ],
    commonMistakes: [
      "Leaning forward/back too much.",
      "Shrugging shoulder blades."
    ],
    sets: 3,
    reps: 10,
    restTime: 75
  },
  {
    id: "back_6",
    name: "Single-Arm Dumbbell Row",
    muscleGroup: "Back",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    description: "Unilateral back pull isolating lat and mid-back fibers.",
    instructions: [
      "Support knee/hand on flat bench, holding dumbbell in free hand.",
      "Pull dumbbell up to hip level under control.",
      "Lower dumbbell back down flat."
    ],
    commonMistakes: [
      "Twisting torso excessively to yank weight."
    ],
    sets: 3,
    reps: 10,
    restTime: 60
  },
  {
    id: "back_7",
    name: "T-Bar Row",
    muscleGroup: "Back",
    equipment: "Machine",
    difficulty: "Intermediate",
    description: "Lever row building thickness in the mid-back and rhomboids.",
    instructions: [
      "Stand on platform, grip handles, bend knees, flat back.",
      "Pull bar cleanly to chest with elbows near ribs.",
      "Lower weight back to control stretch."
    ],
    commonMistakes: [
      "Rounding spine.",
      "Using too much waist drive."
    ],
    sets: 4,
    reps: 8,
    restTime: 90
  },
  {
    id: "back_8",
    name: "Hyperextension",
    muscleGroup: "Back",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    description: "Lower back builder targeting spinal erectors.",
    instructions: [
      "Secure hips on hyperextension bench, fold arms over chest.",
      "Hinge forward slowly down from waist.",
      "Engage lower back to raise torso back in line with body."
    ],
    commonMistakes: [
      "Overextending/arching neck and back excessively at top."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "back_9",
    name: "Chin-Up",
    muscleGroup: "Back",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    description: "Underhand pull-up targeting lats and bicep builders.",
    instructions: [
      "Hang from pull bar with underhand/supinated grip.",
      "Pull body up until chin clears bar.",
      "Lower gently to dead hang."
    ],
    commonMistakes: [
      "Swaying excessively."
    ],
    sets: 3,
    reps: 8,
    restTime: 90
  },
  {
    id: "back_10",
    name: "Face Pull",
    muscleGroup: "Back",
    equipment: "Cables",
    difficulty: "Beginner",
    description: "Rear delt and upper back posture correction.",
    instructions: [
      "Set cable to face height, hold rope with thumbs facing away.",
      "Pull rope straight to ears, spreading rope handles apart.",
      "Slowly return to stretch."
    ],
    commonMistakes: [
      "Pulling bar to mouth instead of nose/ears."
    ],
    sets: 3,
    reps: 15,
    restTime: 60
  },
  {
    id: "back_11",
    name: "Straight-Arm Pulldown",
    muscleGroup: "Back",
    equipment: "Cables",
    difficulty: "Intermediate",
    description: "Lat isolation movement using straight arms pulling downwards.",
    instructions: [
      "Hold high cable bar, step back slightly, lean forward.",
      "With straight arms, pull bar down to upper thighs in arc sweep.",
      "Slowly raise back overhead under tension."
    ],
    commonMistakes: [
      "Bending elbows (making as tricep press)."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "back_12",
    name: "Inverted Row",
    muscleGroup: "Back",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    description: "Horizontal body weight pulling under low barbell.",
    instructions: [
      "Position under low barbell (Smith machine or rack). Grip overhand.",
      "Keep body tight in straight line. Pull chest up to touch bar.",
      "Lower back down under full control."
    ],
    commonMistakes: [
      "Sagging hips or incomplete chest touch."
    ],
    sets: 3,
    reps: 10,
    restTime: 60
  },
  {
    id: "back_13",
    name: "Chest Supported Dumbbell Row",
    muscleGroup: "Back",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    description: "Incline bench-supported dumbbells row avoiding lower back tension.",
    instructions: [
      "Lie face down on incline bench holding dumbbells down.",
      "Pull dumbbells up to hips with elbow retraction.",
      "Return down long under control."
    ],
    commonMistakes: [
      "Lifting chest completely off the bench."
    ],
    sets: 4,
    reps: 10,
    restTime: 75
  },
  {
    id: "back_14",
    name: "Rack Pull",
    muscleGroup: "Back",
    equipment: "Barbell",
    difficulty: "Intermediate",
    description: "Upper back strength deadlift cut short at knee height.",
    instructions: [
      "Set bar on safety pins at knee height.",
      "Engage hamstrings, spine flat. Pull bar up to hips, locking out.",
      "Secure lowered trip back to pins."
    ],
    commonMistakes: [
      "Leveraging back too early."
    ],
    sets: 3,
    reps: 6,
    restTime: 120
  },
  {
    id: "back_15",
    name: "Renegade Row",
    muscleGroup: "Back",
    equipment: "Dumbbells",
    difficulty: "Advanced",
    description: "Rowing dumbbells while holding a push-up plank position.",
    instructions: [
      "Assume push-up plank resting on two dumbbells.",
      "Unilaterally row one dumbbell up while balancing on other.",
      "Alt values and maintain flat hips."
    ],
    commonMistakes: [
      "Rotating hips out of alignment."
    ],
    sets: 3,
    reps: 10,
    restTime: 75
  },
  {
    id: "back_16",
    name: "Kettlebell Swing",
    muscleGroup: "Back",
    equipment: "Kettlebell",
    difficulty: "Intermediate",
    description: "Dynamic hamstrings, glute and lower back explosive movement.",
    instructions: [
      "Hinge hips backward, hold kettlebell in front with flat spine.",
      "Snap hips forward explosively, swinging kettlebell swing to shoulder level.",
      "Hinge hips and let weight fall secure backward."
    ],
    commonMistakes: [
      "Squatting the weight up (use hip hinge!)."
    ],
    sets: 3,
    reps: 15,
    restTime: 75
  },
  {
    id: "back_17",
    name: "Lat Pullover Machine",
    muscleGroup: "Back",
    equipment: "Machine",
    difficulty: "Beginner",
    description: "Ultimate lat builder on machine with complete range.",
    instructions: [
      "Sit securely, lock seat. Place elbows on pads, hold bar.",
      "Drive elbows downward in smooth arc to hips.",
      "Lower slowly to massive stretch."
    ],
    commonMistakes: [
      "Using hands to pull (drive with elbows!)."
    ],
    sets: 3,
    reps: 10,
    restTime: 75
  },

  // --- SHOULDERS (17 exercises) ---
  {
    id: "shoulders_1",
    name: "Overhead Barbell Press",
    muscleGroup: "Shoulders",
    equipment: "Barbell",
    difficulty: "Intermediate",
    description: "Classic standing military press for total shoulder power.",
    instructions: [
      "Stand with bar at collarbone, grip slightly wider than shoulders.",
      "Core engaged, press bar straight up overhead, moving head slightly back to clear path.",
      "Lower under control back to shoulders."
    ],
    commonMistakes: [
      "Arching the lower back excessively.",
      "Bouncing the weight using legs."
    ],
    sets: 4,
    reps: 6,
    restTime: 90
  },
  {
    id: "shoulders_2",
    name: "Dumbbell Lateral Raise",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    description: "Isolates the lateral deltoid for shoulder width and aesthetic shape.",
    instructions: [
      "Hold dumbbells at sides with slight elbow bent.",
      "Raise weights out wide to side until arms parallel with floor.",
      "Lower slowly."
    ],
    commonMistakes: [
      "Swinging body to throw weight.",
      "Leading with knuckles instead of elbows."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "shoulders_3",
    name: "Arnold Press",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    description: "Classic rotating shoulder press developed by Arnold Schwarzenegger.",
    instructions: [
      "Sit upright, hold dumbbells at chest height with palms facing in.",
      "Press weights up while rotating wristed palms to face forward at top.",
      "Reverse rotation while lowering back."
    ],
    commonMistakes: [
      "Shortening the range of motion."
    ],
    sets: 3,
    reps: 10,
    restTime: 75
  },
  {
    id: "shoulders_4",
    name: "Seated Dumbbell Press",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    description: "Dumbbell press with high vertical bench support.",
    instructions: [
      "Hold dumbbells at shoulder height, palms forward.",
      "Press straight upwards without touching weights together.",
      "Lower slow to ear height."
    ],
    commonMistakes: [
      "Weights colliding at top.",
      "Half reps."
    ],
    sets: 4,
    reps: 8,
    restTime: 90
  },
  {
    id: "shoulders_5",
    name: "Rear Delt Fly",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    description: "Isolates rear deltoids to prevent rounded shoulder posture.",
    instructions: [
      "Hinge at hips, flat back. Hold dumbbells hanging straight down.",
      "Raise arms out wide, keeping elbows bent slightly.",
      "Lower back down under tension."
    ],
    commonMistakes: [
      "Using neck or upper back shrug instead of rear delts."
    ],
    sets: 3,
    reps: 15,
    restTime: 60
  },
  {
    id: "shoulders_6",
    name: "Cable Lateral Raise",
    muscleGroup: "Shoulders",
    equipment: "Cables",
    difficulty: "Intermediate",
    description: "Cable-tensioned lateral raise keeping constant deltoid load.",
    instructions: [
      "Standing sideways to cable machine, pull pulley across front of body.",
      "Raise arm horizontally up to shoulder height.",
      "Slowly let cable resistance pull back."
    ],
    commonMistakes: [
      "Leaning heavily into weight load."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "shoulders_7",
    name: "Front Dumbbell Raise",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    description: "Isolates the anterior (front) deltoids.",
    instructions: [
      "Stand tall, hold dumbbells in front of thighs.",
      "Raise weights forward to eye level with straight arms.",
      "Return slowly."
    ],
    commonMistakes: [
      "Swinging or arching back."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "shoulders_8",
    name: "Barbell Upright Row",
    muscleGroup: "Shoulders",
    equipment: "Barbell",
    difficulty: "Intermediate",
    description: "Compound builder for traps and lateral shoulder heads.",
    instructions: [
      "Hold barbell in front of hips with narrow overhand grip.",
      "Pull bar straight up near torso to chest level, pointing elbows high.",
      "Lower smoothly."
    ],
    commonMistakes: [
      "Gripping too narrow risking wrist pain.",
      "Heaving with hips."
    ],
    sets: 3,
    reps: 10,
    restTime: 75
  },
  {
    id: "shoulders_9",
    name: "Barbell Shrug",
    muscleGroup: "Shoulders",
    equipment: "Barbell",
    difficulty: "Beginner",
    description: "Targeting upper trapezius muscles for back thickness.",
    instructions: [
      "Grip heavy barbell in front of thighs.",
      "Raise shoulders straight up to ears without bending arms.",
      "Hold peak squeeze, then lower."
    ],
    commonMistakes: [
      "Rolling shoulder joints (shrug straight up/down!)."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "shoulders_10",
    name: "Pike Push-Up",
    muscleGroup: "Shoulders",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    description: "Excellent body weight shoulder press build.",
    instructions: [
      "Start in push-up stance but elevate hips to form dynamic V-shape.",
      "Lower head slowly down toward hands between elbows.",
      "Push flatly away to lock out."
    ],
    commonMistakes: [
      "Flattening out into normal push-up."
    ],
    sets: 3,
    reps: 10,
    restTime: 75
  },
  {
    id: "shoulders_11",
    name: "Smith Machine Shoulder Press",
    muscleGroup: "Shoulders",
    equipment: "Machine",
    difficulty: "Beginner",
    description: "Guided upright press targeting anterior deltoid strength.",
    instructions: [
      "Sit on vertical bench in Smith machine framework.",
      "Lower bar straight to chin under safety guide.",
      "Press bar directly upwards."
    ],
    commonMistakes: [
      "Tuck elbows too far back."
    ],
    sets: 4,
    reps: 10,
    restTime: 90
  },
  {
    id: "shoulders_12",
    name: "Incline Rear Delt Row",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    description: "Rear delt row lying face-down on incline bench.",
    instructions: [
      "Lie face down on incline bench holding dumbbells down.",
      "Fly weights out wide with elbows bent at 90 degrees.",
      "Decline slowly."
    ],
    commonMistakes: [
      "Lifting chest."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "shoulders_13",
    name: "Bus Driver Press",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    description: "Front raise rotation with weight plate or dumbbell.",
    instructions: [
      "Raise a flat plate forward to shoulder height.",
      "Rotate plate left and right like driving a steering wheel.",
      "Lower slowly."
    ],
    commonMistakes: [
      "Losing level shoulder alignment."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "shoulders_14",
    name: "Y-Raise",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    description: "Upper back and lower trap mobility builder using dynamic Y paths.",
    instructions: [
      "Lie flat down on bench, hold light dumbbells.",
      "Raise weights upward and outward at 45 degrees forming Y shape.",
      "Return slow."
    ],
    commonMistakes: [
      "Going too heavy."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "shoulders_15",
    name: "Push Press",
    muscleGroup: "Shoulders",
    equipment: "Barbell",
    difficulty: "Advanced",
    description: "Explosive overhead press using leg drive for maximum power.",
    instructions: [
      "Rack barbell at chest height. Take shoulder-width stance.",
      "Dip knees slightly, then drive explosively upward while pressing the bar.",
      "Lock out overhead and lower controlled back to chest."
    ],
    commonMistakes: [
      "Excessive arching of lower back."
    ],
    sets: 4,
    reps: 5,
    restTime: 120
  },
  {
    id: "shoulders_16",
    name: "Single-Arm Dumbbell Press",
    muscleGroup: "Shoulders",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    description: "Standing single-side press for core stabilizers and deltoids.",
    instructions: [
      "Hold one dumbbell at shoulder height, standing upright.",
      "Drive dumbbell overhead without leaning to the side.",
      "Return to start."
    ],
    commonMistakes: [
      "Leaning sideways."
    ],
    sets: 3,
    reps: 10,
    restTime: 75
  },
  {
    id: "shoulders_17",
    name: "Hanging Clean and Press",
    muscleGroup: "Shoulders",
    equipment: "Barbell",
    difficulty: "Advanced",
    description: "Highly athletic Olympic lift variant builder.",
    instructions: [
      "Hold barbell at hips. Explode hips forward to catch bar at shoulders.",
      "Immediately press bar forcefully overhead to lock out.",
      "Decline safely down."
    ],
    commonMistakes: [
      "Improper catch catch."
    ],
    sets: 3,
    reps: 6,
    restTime: 120
  },

  // --- ARMS (17 exercises) ---
  {
    id: "arms_1",
    name: "Barbell Bicep Curl",
    muscleGroup: "Arms",
    equipment: "Barbell",
    difficulty: "Beginner",
    description: "Classic standing curl to build massive bicep thickness.",
    instructions: [
      "Stand tall, grip barbell underhand at shoulder-width.",
      "Curl bar upward to shoulders, keeping elbows locked at your ribs.",
      "Lower bar slowly back downward to full extension."
    ],
    commonMistakes: [
      "Swinging torso or moving elbows forward.",
      "Not extending fully at bottom."
    ],
    sets: 4,
    reps: 10,
    restTime: 60
  },
  {
    id: "arms_2",
    name: "Tricep Pushdown",
    muscleGroup: "Arms",
    equipment: "Cables",
    difficulty: "Beginner",
    description: "Isolates lateral tricep head on cable attachments.",
    instructions: [
      "Attach rope or straight bar to high cable, grip securely.",
      "Keep elbows tucked at sides, press weight down to hips.",
      "Let pull weight glide slowly back up to chest height."
    ],
    commonMistakes: [
      "Elbows flaring out.",
      "Leaning too heavily onto attachment."
    ],
    sets: 4,
    reps: 12,
    restTime: 60
  },
  {
    id: "arms_3",
    name: "Dumbbell Hammer Curl",
    muscleGroup: "Arms",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    description: "Curls with neutral grip targeting brachialis and forearm width.",
    instructions: [
      "Stand tall holding dumbbells with palms facing each other (neutral grip).",
      "Curl weigths to shoulders under control.",
      "Lower fully down."
    ],
    commonMistakes: [
      "Using swing momentum."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "arms_4",
    name: "Skull Crusher",
    muscleGroup: "Arms",
    equipment: "Barbell",
    difficulty: "Intermediate",
    description: "Lying EZ bar extension targeting long head tricep stretch.",
    instructions: [
      "Lie on flat bench holding EZ bar straight over chest.",
      "Bend elbows slowly to lower bar toward forehead.",
      "Press bar back straight up utilizing triceps."
    ],
    commonMistakes: [
      "Letting elbows flare outwards.",
      "Dropping bar too quickly toward head."
    ],
    sets: 4,
    reps: 10,
    restTime: 75
  },
  {
    id: "arms_5",
    name: "Concentration Curl",
    muscleGroup: "Arms",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    description: "Strict isolation bicep peak builder sitting on bench.",
    instructions: [
      "Sit on edge of bench, press tricep/elbow against inner thigh.",
      "Curl dumbbell upward to chest with pure bicep engagement.",
      "Return down full range."
    ],
    commonMistakes: [
      "Resting elbow on top of thigh instead of inner side."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "arms_6",
    name: "Overhead Dumbbell Extension",
    muscleGroup: "Arms",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    description: "Deep overhead stretch targeting tricep mass building.",
    instructions: [
      "Sit upright, hold heavy dumbbell overhead with two hands around end.",
      "Lower dumbbell backward behind your neck by folding elbows.",
      "Extend dumbbell back upwards vertically."
    ],
    commonMistakes: [
      "Elbows flaring out too wide."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "arms_7",
    name: "Incline Dumbbell Curl",
    muscleGroup: "Arms",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    description: "Superb bicep long-head builder holding deep arm stretch.",
    instructions: [
      "Lie on 45 degree incline bench letting dumbbells hang straight down.",
      "Curl dumbbells upwards keeping elbows firmly static.",
      "Extend slow back to floor hang."
    ],
    commonMistakes: [
      "Lifting elbows forward to compensate."
    ],
    sets: 3,
    reps: 10,
    restTime: 75
  },
  {
    id: "arms_8",
    name: "Cable Overhead Tricep Extension",
    muscleGroup: "Arms",
    equipment: "Cables",
    difficulty: "Intermediate",
    description: "Rope attachment overhead pulling tricep developer.",
    instructions: [
      "Grip rope from low pulley, face away, hold rope over neck.",
      "Extend dynamic arms forward overhead.",
      "Let under tension bend elbows back behind head stretch."
    ],
    commonMistakes: [
      "Shortening movement path."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "arms_9",
    name: "Spider Curl",
    muscleGroup: "Arms",
    equipment: "Barbell",
    difficulty: "Intermediate",
    description: "Squeezes biceps peak lying face-down on incline bench.",
    instructions: [
      "Lie face down on incline bench holding EZ bar hanging down forward.",
      "Curl bar straight upwards to chin.",
      "Lower bar fully."
    ],
    commonMistakes: [
      "Swinging elbows out."
    ],
    sets: 3,
    reps: 10,
    restTime: 75
  },
  {
    id: "arms_10",
    name: "Preacher Curl",
    muscleGroup: "Arms",
    equipment: "Machine",
    difficulty: "Beginner",
    description: "Strict preacher bench supported curling action.",
    instructions: [
      "Sit at preacher chair, rest arms completely on chest pad.",
      "With EZ bar, curl upward fully under pure biceps isolation.",
      "Lower bar slowly down."
    ],
    commonMistakes: [
      "Hyperextending elbows at bottom."
    ],
    sets: 3,
    reps: 10,
    restTime: 75
  },
  {
    id: "arms_11",
    name: "Dips for Triceps",
    muscleGroup: "Arms",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    description: "Bench/bar dips emphasizing tricep lockdown extension.",
    instructions: [
      "Rest hands on edge of bench, feet forward, hips off bench.",
      "Bend elbows to lower hips downwards.",
      "Push flatly straight up to lock triceps hard."
    ],
    commonMistakes: [
      "Rounding chest shoulders inward."
    ],
    sets: 3,
    reps: 15,
    restTime: 60
  },
  {
    id: "arms_12",
    name: "Zottman Curl",
    muscleGroup: "Arms",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    description: "Bicep curl with palm twisting highlighting forearm build.",
    instructions: [
      "Curl dumbbells overhand/upward normally.",
      "At top, rotate wrists so palms face DOWN.",
      "Lower downward slowly holding pronated grip."
    ],
    commonMistakes: [
      "Rushing the reverse lowering."
    ],
    sets: 3,
    reps: 10,
    restTime: 60
  },
  {
    id: "arms_13",
    name: "Cable Kickback",
    muscleGroup: "Arms",
    equipment: "Cables",
    difficulty: "Intermediate",
    description: "Unilateral tricep cables workout targeting exact locking.",
    instructions: [
      "Hold cable without handle, lean torso flat parallel, elbow static.",
      "Extend arm straight back in locking line.",
      "Decline slowly forward."
    ],
    commonMistakes: [
      "Letting elbow swing up/down."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "arms_14",
    name: "Reverse Grip Barbell Curl",
    muscleGroup: "Arms",
    equipment: "Barbell",
    difficulty: "Beginner",
    description: "Overhand curl targeting forearm brachioradialis structure.",
    instructions: [
      "Stand, grip bar OVERHAND (palms facing down).",
      "Curl bar Upward maintaining strict elbow alignment.",
      "Lower slow."
    ],
    commonMistakes: [
      "Excessive wrist bending."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "arms_15",
    name: "Close Grip Bench Press",
    muscleGroup: "Arms",
    equipment: "Barbell",
    difficulty: "Intermediate",
    description: "Flats compound press targeting massive tricep loading.",
    instructions: [
      "Lie on bench, grip barbell shoulder-width or slightly narrower.",
      "Lower bar straight to lower chest, keeping elbows tucked close.",
      "Press powerfully straight up."
    ],
    commonMistakes: [
      "Gripping too close (hurts wrists; shoulder width is ideal)."
    ],
    sets: 4,
    reps: 8,
    restTime: 90
  },
  {
    id: "arms_16",
    name: "Plate Curl",
    muscleGroup: "Arms",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    description: "Grip and forearm isometric curling utilizing a heavy plate.",
    instructions: [
      "Grip heavy plate securely on its sides.",
      "Curl upward keeping elbows close.",
      "Decline slowly."
    ],
    commonMistakes: [
      "Dropping plate on toes."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "arms_17",
    name: "Diamond Push-Up",
    muscleGroup: "Arms",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    description: "Push-up variation placing thumbs and index fingers together in a diamond shape.",
    instructions: [
      "Form push-up stance with hands directly under chest, forming diamond.",
      "Lower chest slowly to touch hands.",
      "Press upright strongly using triceps."
    ],
    commonMistakes: [
      "Hands placed too high up near face."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },

  // --- CORE (16 exercises) ---
  {
    id: "core_1",
    name: "Plank",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    description: "Isometric core hold to build deep static belly endurance.",
    instructions: [
      "Place forearms flat on floor, elbows under shoulders.",
      "Lift hips up, forming straight rigid line from heels to head.",
      "Hold stance while breathing deeply and bracing core."
    ],
    commonMistakes: [
      "Hips sagging or high butt elevation.",
      "Holding breath."
    ],
    sets: 3,
    reps: 60, // in seconds
    restTime: 60
  },
  {
    id: "core_2",
    name: "Hanging Leg Raise",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    description: "Lower abdominal muscle powerhouse hanging from pull bar.",
    instructions: [
      "Hang from pull-up bar, arms fully locked.",
      "Raise straight legs up to 90 degrees using lower abs.",
      "Lower legs slowly without swinging."
    ],
    commonMistakes: [
      "Using swing momentum to lift legs.",
      "Letting body drop quickly down."
    ],
    sets: 3,
    reps: 10,
    restTime: 60
  },
  {
    id: "core_3",
    name: "Ab Wheel Rollout",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    description: "Ultimate deep abdominal eccentric load rollout.",
    instructions: [
      "Kneel on floor, grasp ab wheel on sides.",
      "Roll wheel slowly forward, extending torso straight.",
      "Pull wheels back to knees wrapping abs tightly."
    ],
    commonMistakes: [
      "Arching lower back (sink hips forward; keep spine hollow!)."
    ],
    sets: 3,
    reps: 8,
    restTime: 75
  },
  {
    id: "core_4",
    name: "Russian Twist",
    muscleGroup: "Core",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    description: "Bending twisting motion targeting oblique stabilization.",
    instructions: [
      "Sit on floor, knees bent, feet slightly off ground.",
      "Hold dumbbell in hands, twist torso completely side to side touching dumbbell to floor."
    ],
    commonMistakes: [
      "Twisting only arms (twist the entire upper torso!)."
    ],
    sets: 3,
    reps: 20,
    restTime: 60
  },
  {
    id: "core_5",
    name: "Ab Crunch",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    description: "Standard top-half abdominal crunching.",
    instructions: [
      "Lie on back knees bent, hold fingertips behind ears.",
      "Contract upper trunk lifting shoulder blades slightly off floor.",
      "Decline slowly."
    ],
    commonMistakes: [
      "Yanking neck up with hands."
    ],
    sets: 3,
    reps: 15,
    restTime: 45
  },
  {
    id: "core_6",
    name: "Cable Woodchopper",
    muscleGroup: "Core",
    equipment: "Cables",
    difficulty: "Beginner",
    description: "Rotational oblique slash pulling cable diagonally.",
    instructions: [
      "Stand sideways to cable stack, grasp pulley handle up high.",
      "Pull cable diagonally downward across hips rotating feet and waist.",
      "Slowly return up sideways."
    ],
    commonMistakes: [
      "Bending elbows (keep arms locked; use obliques/waist!)."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "core_7",
    name: "Windshield Wiper",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    description: "High-flying leg swings targeting obliques and midsection control.",
    instructions: [
      "Hang from pull-up bar or lie flat, raise feet vertically.",
      "Swing legs side to side in slow 180 degrees arc.",
      "Hold solid waist control."
    ],
    commonMistakes: [
      "Dropping legs too fast."
    ],
    sets: 3,
    reps: 10,
    restTime: 75
  },
  {
    id: "core_8",
    name: "Pallof Press",
    muscleGroup: "Core",
    equipment: "Cables",
    difficulty: "Beginner",
    description: "Anti-rotation hold maintaining strong core lateral alignment.",
    instructions: [
      "Sideways stance to cable, pull single pulley directly to chest.",
      "Press cable straight out from chest without letting pull rotate your torso.",
      "Return slow to chest."
    ],
    commonMistakes: [
      "Leaning into the machine."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "core_9",
    name: "Bicycle Crunch",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    description: "Rapid, dynamic double-action crunch.",
    instructions: [
      "Lie flat, hands on head. Bring right elbow to left knee, twisting torso.",
      "Alt values continuously like pedaling a bicycle."
    ],
    commonMistakes: [
      "Overly fast pacing without squeeze."
    ],
    sets: 3,
    reps: 20,
    restTime: 45
  },
  {
    id: "core_10",
    name: "Dead Bug",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    description: "Superb lower spine bracing and core coordination.",
    instructions: [
      "Lie flat, arms extended overhead, knees bent at 90 degrees.",
      "Extend left arm and right leg out straight just above floor.",
      "Return both, alternate opposite diagonal sides."
    ],
    commonMistakes: [
      "Letting lower back arch off the floor."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "core_11",
    name: "L-Sit",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    description: "Vast isometric hold on floor or push-up bars.",
    instructions: [
      "Sit on floor flat, hands next to hips.",
      "Press through floor and lock elbows, lifting hips and straight legs off ground.",
      "Hold legs parallel to floor."
    ],
    commonMistakes: [
      "Dropping shoulders down."
    ],
    sets: 3,
    reps: 15, // in seconds
    restTime: 90
  },
  {
    id: "core_12",
    name: "Reverse Crunch",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    description: "Tilts pelvis upward targeting lower abdominal fibers.",
    instructions: [
      "Lie flat down, arms at sides. Elevate legs bent at 90 degrees.",
      "Roll hips upward curling knees back toward chest.",
      "Lower slowly down."
    ],
    commonMistakes: [
      "Yanking thighs back with kick momentum."
    ],
    sets: 3,
    reps: 15,
    restTime: 45
  },
  {
    id: "core_13",
    name: "Toes-to-Bar",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    description: "Ultimate hanging core exercise pulling toes all the way to touch bar.",
    instructions: [
      "Hang from chin bar securely.",
      "Fold body and whip legs all the way up to tap toes to the bar.",
      "Descend under absolute control."
    ],
    commonMistakes: [
      "Excessive wild swinging."
    ],
    sets: 3,
    reps: 8,
    restTime: 75
  },
  {
    id: "core_14",
    name: "Bird Dog Plank",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    description: "Extreme balance and ab bracing plank variation.",
    instructions: [
      "Assume standard push-up plank position.",
      "Lift one arm straight and raise opposite diagonal leg flat behind.",
      "Maintain level hips and hold."
    ],
    commonMistakes: [
      "Twisting hips sideways."
    ],
    sets: 3,
    reps: 8,
    restTime: 60
  },
  {
    id: "core_15",
    name: "Mountain Climber",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    description: "Rapid cardiovascular core exercise in push-up stance.",
    instructions: [
      "Stance in push-up plank.",
      "Drive knees to chest rapidly alternating in running motion."
    ],
    commonMistakes: [
      "Slapping feet too hard on floor."
    ],
    sets: 3,
    reps: 30,
    restTime: 45
  },
  {
    id: "core_16",
    name: "Seated Leg Tuck",
    muscleGroup: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    description: "In-and-out knee tucks on edge of flat bench.",
    instructions: [
      "Sit on edge of bench holding edge behind hips.",
      "Extend legs forward leaning torso slightly backward.",
      "Pull knees to chest and squeeze core."
    ],
    commonMistakes: [
      "Shortening movement."
    ],
    sets: 3,
    reps: 15,
    restTime: 45
  },

  // --- LEGS (16 exercises) ---
  {
    id: "legs_1",
    name: "Barbell Back Squat",
    muscleGroup: "Legs",
    equipment: "Barbell",
    difficulty: "Advanced",
    description: "The absolute king of lower body compounds targeting quads, glutes, and hamstrings.",
    instructions: [
      "Rest barbell comfortably on upper back/traps, standing chest upright.",
      "Hinge hips and bend knees downward, as if sitting in a low chair.",
      "Lower until thighs are parallel to floor (or deeper).",
      "Drive straight back up pushing up through heels."
    ],
    commonMistakes: [
      "Knees caving inwards (valgus collapse).",
      "Butt wink or rounding lower spine."
    ],
    sets: 4,
    reps: 8,
    restTime: 120
  },
  {
    id: "legs_2",
    name: "Dumbbell Bulgarian Split Squat",
    muscleGroup: "Legs",
    equipment: "Dumbbells",
    difficulty: "Intermediate",
    description: "Unilateral leg focus targeting quads and glutes intensely.",
    instructions: [
      "Stand 2 feet from bench holding dumbbells. Rest one rear foot flat on bench.",
      "Lower front thigh down until parallel to floor.",
      "Press back up using front heel."
    ],
    commonMistakes: [
      "Torso collapsing forward.",
      "Front knee tracking too far over toes."
    ],
    sets: 3,
    reps: 10,
    restTime: 90
  },
  {
    id: "legs_3",
    name: "Leg Press Machine",
    muscleGroup: "Legs",
    equipment: "Machine",
    difficulty: "Beginner",
    description: "Secure, heavy machine pressing quad developer.",
    instructions: [
      "Sit flat inside leg press, place feet shoulder-width on platform.",
      "Lower platform slowly by folding knees to 90 degrees.",
      "Press platform back up keeping knees unlocked."
    ],
    commonMistakes: [
      "Locking out knees sharply at top.",
      "Lifting hips/lower back off pad at bottom."
    ],
    sets: 4,
    reps: 10,
    restTime: 90
  },
  {
    id: "legs_4",
    name: "Romanian Deadlift",
    muscleGroup: "Legs",
    equipment: "Barbell",
    difficulty: "Intermediate",
    description: "Posterior chain hinging focusing on hamstrings and glutes.",
    instructions: [
      "Hold barbell at hips, standing upright.",
      "Push hips far backward letting bar slide down thighs, light knee bend.",
      "Lower bar to level shin stretch, pull back up snaping glutes."
    ],
    commonMistakes: [
      "Squatting the weight.",
      "Rounding lower back."
    ],
    sets: 4,
    reps: 8,
    restTime: 90
  },
  {
    id: "legs_5",
    name: "Leg Curl",
    muscleGroup: "Legs",
    equipment: "Machine",
    difficulty: "Beginner",
    description: "Seated/lying hamstring isolate machine.",
    instructions: [
      "Sit securely, lock leg pad. Rest ankles on curl handle.",
      "Pull legs all the way back beneath thighs squeezing hamstrings.",
      "Control return."
    ],
    commonMistakes: [
      "Using hips to swing the pad."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "legs_6",
    name: "Leg Extension",
    muscleGroup: "Legs",
    equipment: "Machine",
    difficulty: "Beginner",
    description: "Quadriceps isolate extension on machine.",
    instructions: [
      "Adjust lever to sit comfortably. Rest shins below pad.",
      "Raise feet vertically, extending quads fully.",
      "Decline slowly under control."
    ],
    commonMistakes: [
      "Kicking weight too quickly."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "legs_7",
    name: "Dumbbell Lunge",
    muscleGroup: "Legs",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    description: "Stepping single leg motion targeting quads and glutes.",
    instructions: [
      "Step forward holding dumbbells at sides.",
      "Lower rear knee to ground parallel.",
      "Push off front foot returning standing."
    ],
    commonMistakes: [
      "Short strides losing balance."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "legs_8",
    name: "Goblet Squat",
    muscleGroup: "Legs",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    description: "Front-loaded upright squat perfect for posture and beginners.",
    instructions: [
      "Grip heavy dumbbell upright in front of chest.",
      "Keep chest high, squat deep parallel or lower.",
      "Stand straight."
    ],
    commonMistakes: [
      "Letting torso cave forward."
    ],
    sets: 3,
    reps: 12,
    restTime: 60
  },
  {
    id: "legs_9",
    name: "Calf Raise",
    muscleGroup: "Legs",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    description: "Builds calves gastrocnemius muscles on edge of step.",
    instructions: [
      "Stand on edge of step with heels hanging down.",
      "Rise up high as possible on toes, squeezing calves.",
      "Lower heels fully down."
    ],
    commonMistakes: [
      "Bouncing fast."
    ],
    sets: 4,
    reps: 15,
    restTime: 45
  },
  {
    id: "legs_10",
    name: "Box Jump",
    muscleGroup: "Legs",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    description: "Explosive target training jumping up to elevated platform.",
    instructions: [
      "Assume half squat stance. Swings arms and launch upward.",
      "Land soft on box surface absorbing shock.",
      "Step down carefully."
    ],
    commonMistakes: [
      "Jumping down backward (hard on joints!)."
    ],
    sets: 3,
    reps: 8,
    restTime: 75
  },
  {
    id: "legs_11",
    name: "Barbell Hip Thrust",
    muscleGroup: "Legs",
    equipment: "Barbell",
    difficulty: "Intermediate",
    description: "The absolute best glute isolation building exercise.",
    instructions: [
      "Rest upper back on flat bench, place loaded barbell over hips (with pad).",
      "Drive feet down and thrust hips upward, squeezing glutes tightly at top.",
      "Lower back down slowly."
    ],
    commonMistakes: [
      "Hyperextending the lower back at top."
    ],
    sets: 4,
    reps: 10,
    restTime: 90
  },
  {
    id: "legs_12",
    name: "Hack Squat",
    muscleGroup: "Legs",
    equipment: "Machine",
    difficulty: "Intermediate",
    description: "Angle-guided heavy leg squat machine targeting quad tear.",
    instructions: [
      "Position shoulders inside pads on Hack slide.",
      "Release safety and squat deep under locked trajectory.",
      "Raise powerfully back."
    ],
    commonMistakes: [
      "Lifting heels off plate."
    ],
    sets: 4,
    reps: 10,
    restTime: 90
  },
  {
    id: "legs_13",
    name: "Glute Ham Raise",
    muscleGroup: "Legs",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    description: "Ultimate posterior hamstring development load.",
    instructions: [
      "Lock ankles, rest knees on curve pad.",
      "Lower torso straight forward with hamstring loading.",
      "Pull torso upright curling legs back."
    ],
    commonMistakes: [
      "Bending hips."
    ],
    sets: 3,
    reps: 8,
    restTime: 120
  },
  {
    id: "legs_14",
    name: "Sumo Deadlift",
    muscleGroup: "Legs",
    equipment: "Barbell",
    difficulty: "Advanced",
    description: "Wide posture deadlift emphasizing glute and adductor strength.",
    instructions: [
      "Take extremely wide foot placement out near plates.",
      "Hinge hips and grasp bar inside knees.",
      "Drive hips up locking spine tall."
    ],
    commonMistakes: [
      "Curving mid-spine."
    ],
    sets: 4,
    reps: 5,
    restTime: 120
  },
  {
    id: "legs_15",
    name: "Pistol Squat",
    muscleGroup: "Legs",
    equipment: "Bodyweight",
    difficulty: "Advanced",
    description: "Extreme single leg strength and balance mastery.",
    instructions: [
      "Stand on one leg, extending other foot completely forward.",
      "Squat deep on single leg until thigh is below parallel.",
      "Press single balance back up tall."
    ],
    commonMistakes: [
      "Heel lifting off ground."
    ],
    sets: 3,
    reps: 5,
    restTime: 90
  },
  {
    id: "legs_16",
    name: "Step-Up",
    muscleGroup: "Legs",
    equipment: "Dumbbells",
    difficulty: "Beginner",
    description: "High stepping single leg drive building quad balance.",
    instructions: [
      "Hold dumbbells, place one foot fully flat on sturdy plyo box.",
      "Drive through box foot and raise body tall onto surface.",
      "Lower single control leg down."
    ],
    commonMistakes: [
      "Pushing off rear foot."
    ],
    sets: 3,
    reps: 10,
    restTime: 60
  }
];
