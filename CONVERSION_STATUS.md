# Flutter Conversion Status - CapitalWizard

## Completed Files

### 1. Configuration & Models
- ✅ `/lib/config/app_theme.dart` - Theme configuration with colors and styles
- ✅ `/lib/models/game_state.dart` - Game state model with all properties
- ✅ `/lib/models/lesson_model.dart` - Lesson data models (ReadingQuestion, MatchingPair, QuizQuestion, Lesson)
- ✅ `/lib/utils/game_config.dart` - Game configuration constants
- ✅ `/lib/providers/game_provider.dart` - State management with Provider

### 2. Data Files
- ✅ `/lib/data/penzugyi_alapismeretek_lessons.dart` - First 2 lessons converted (12 total needed)
  - Note: Contains Lesson 1 (Bevezetés) and Lesson 2 (Megtakarítások)
  - **TODO**: Add remaining 10 lessons from the React source

### 3. Widgets
- ✅ `/lib/widgets/top_bar.dart` - Top status bar with coins/gems and avatar
- ✅ `/lib/widgets/player_status_bar.dart` - Bottom player info with XP and badges

### 4. Screens
- ✅ `/lib/screens/splash_screen.dart` - Splash screen
- ✅ `/lib/screens/welcome_screen.dart` - Welcome screen for new users
- ✅ `/lib/main.dart` - Basic app entry point

## Files Still Needed

### Core Widgets (High Priority)
1. **`/lib/widgets/side_menu.dart`** - Left side menu with Bolt, Messages, Gift, Special buttons
   - Reference: `src/components/SideMenu.tsx`
   - 4 menu items with icons and labels

2. **`/lib/widgets/event_cards.dart`** - Challenge cards (Arena, Templomos)
   - Reference: `src/components/EventCards.tsx`
   - Arena card with remaining games counter
   - Templomos card with timer

3. **`/lib/widgets/progress_animation.dart`** - Center progress button
   - Reference: `src/components/ProgressAnimation.tsx`
   - Animated sparkles and floating particles
   - Shows current lesson number
   - Uses `framer-motion` animations (convert to Flutter Animated/AnimationController)

4. **`/lib/widgets/tip_bar.dart`** - Tip display bar
   - Reference: `src/components/TipBar.tsx`
   - Shows helpful tips to users

5. **`/lib/widgets/level_up_celebration.dart`** - Level up popup
   - Reference: `src/components/LevelUpCelebration.tsx`
   - Animated celebration overlay

6. **`/lib/widgets/streak_celebration.dart`** - Streak popup
   - Reference: `src/components/StreakCelebration.tsx`
   - Shows streak milestone achievements

7. **`/lib/widgets/bottom_navigation.dart`** - Bottom navigation bar
   - Reference: `src/components/CharacterLineup.tsx`
   - Character lineup with navigation buttons

### Game Screens (High Priority)
1. **`/lib/screens/lesson_page.dart`** - Lesson intro screen
   - Reference: `src/components/LessonHeader.tsx`
   - Shows lesson number, difficulty, start button

2. **`/lib/screens/reading_game_screen.dart`** - Reading comprehension game
   - Reference: `src/components/ReadingGame.tsx`
   - Three states: reading, questions, results
   - Text input for answers with keyword matching
   - 80% passing threshold

3. **`/lib/screens/matching_game_screen.dart`** - Matching pairs game
   - Reference: `src/components/LessonGame.tsx`
   - Drag-and-drop or tap-to-match pairs
   - Timer countdown
   - Shows 5 pairs at a time, replenishes as matched

4. **`/lib/screens/quiz_game_screen.dart`** - Multiple choice quiz
   - Reference: `src/components/QuizGame.tsx`
   - Multiple choice questions
   - Immediate feedback on selection

### Navigation Screens (Medium Priority)
1. **`/lib/screens/home_screen.dart`** - Main game view
   - Reference: `src/App.tsx` (main page layout)
   - Integrates all widgets: TopBar, SideMenu, EventCards, PlayerStatusBar, ProgressAnimation
   - Background with crystal decorations

2. **`/lib/screens/university_page.dart`** - Library/book rental view
   - Reference: `src/components/UniversityPage.tsx`
   - Shows available books
   - Rental system with coins
   - Books unlock lessons

3. **`/lib/screens/arena_page.dart`** - Quiz battle arena
   - Reference: `src/components/ArenaPage.tsx`
   - Battle mode with quiz questions
   - Daily game limits for free users
   - Rewards and streak tracking

4. **`/lib/screens/profile_page.dart`** - User profile
   - Reference: `src/components/ProfilePage.tsx`
   - Player name, level, stats
   - Achievement display

5. **`/lib/screens/subscription_page.dart`** - Subscription tiers
   - Reference: `src/components/SubscriptionPage.tsx`
   - Free, Pro, Master tiers
   - Feature comparison

6. **`/lib/screens/avatar_selector_page.dart`** - Avatar selection
   - Reference: `src/components/AvatarSelectorPage.tsx`
   - Emoji avatar picker
   - Premium avatars for paid tiers

### Additional Utilities Needed
1. **`/lib/services/storage_service.dart`** - Local storage wrapper
   - SharedPreferences helper for saving/loading game state
   - Rental book tracking
   - Profile data

2. **`/lib/services/streak_manager.dart`** - Streak tracking
   - Reference: `src/utils/streakManager.ts`
   - Daily streak calculation
   - Last completion tracking

## Critical Implementation Notes

### State Management
- The app uses **Provider** for state management
- `GameProvider` is the central state manager
- All screens should consume GameProvider for state

### Navigation
- Use **Navigator 2.0** or named routes
- Pages: main, lesson, game, university, arena, profile, subscription, avatar, manager
- GameState.currentPage tracks navigation

### Lesson Flow
The app has a complex lesson progression system:

1. **First Round**: Each lesson page has 3 games (Reading → Matching → Quiz)
   - 12 pages × 3 games = 36 lessons total in first round

2. **Second Round**: Each lesson page has 1 game (Reading only)
   - 12 pages × 1 game = 12 lessons in second round

3. **Total**: 48 lessons per book

Current lesson calculation:
```dart
final lessonNumber = isFirstRound
    ? (currentBookLessonIndex * 3) + (currentGameType == 'reading' ? 1 : currentGameType == 'matching' ? 2 : 3)
    : penzugyiAlapismeretkLessons.length * 3 + currentBookLessonIndex + 1;
```

### Animations
- Use `AnimatedContainer`, `AnimatedOpacity`, `TweenAnimationBuilder`
- The React version uses `framer-motion` - convert to Flutter's animation system
- Sparkles, floating particles, and glow effects need custom painters

### Data Migration
- Still need to convert ALL 12 lessons from `penzugyiAlapismeretkLessons.ts`
- Currently only 2 lessons are converted
- Each lesson has: reading content, 15 matching pairs, 10 quiz questions

### Visual Design
- Match the exact visual design from React app
- Dark theme with purple/cyan accents
- Glass-morphism effects (backdrop blur)
- Gradient backgrounds
- Crystal decorations

## Next Steps (Priority Order)

1. **Complete lesson data migration** (10 more lessons)
2. **Create game screens** (reading, matching, quiz) - These are essential for gameplay
3. **Create home_screen.dart** - Integrate all widgets for main view
4. **Create remaining widgets** (side_menu, event_cards, progress_animation, etc.)
5. **Create navigation screens** (university, arena, profile, etc.)
6. **Implement routing in main.dart**
7. **Test full game flow**

## React to Flutter Key Conversions

| React Concept | Flutter Equivalent |
|---------------|-------------------|
| `useState` | `StatefulWidget` with `setState` or `Provider` |
| `useEffect` | `initState`, `didChangeDependencies`, `dispose` |
| `framer-motion` | `AnimationController`, `Tween`, `AnimatedBuilder` |
| `localStorage` | `SharedPreferences` |
| `className` + Tailwind | `Container` with `BoxDecoration`, `TextStyle` |
| `onClick` | `onTap`, `onPressed` |
| CSS gradients | `LinearGradient`, `RadialGradient` |
| `map()` | `List.map()` with `toList()` |
| `&&` conditional | `if` or ternary in widget tree |

## File Size Warning
This is a massive conversion project. The React app has:
- 1 main App.tsx (~965 lines)
- 27+ component files
- Multiple data files
- Complex state management

Estimated total Flutter files needed: **30-35 files**
