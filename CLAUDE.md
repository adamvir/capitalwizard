# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CapitalWizard egy gamifikált pénzügyi oktatási Flutter alkalmazás, amely RPG-stílusú progressziós rendszeren keresztül tanít befektetési és pénzügyi ismereteket. Az app leckék, kvízek és interaktív játékok kombinációjával építi fel a tudást, miközben jutalmakkal, szintlépésekkel és streak rendszerrel motiválja a felhasználókat.

**Eredeti Design**: Figma design alapján készült React/TypeScript webalkalmazásból konvertálva Flutter-re
**Célplatform**: iOS és Android (portrait-only mobile app)
**Nyelv**: Magyar (UI és tartalom)

## Fejlesztési Parancsok

```bash
# Függőségek telepítése
flutter pub get

# Fejlesztői szerver indítása (hot reload)
flutter run

# Release mode futtatás (gyorsabb)
flutter run --release

# Debug információkkal
flutter run -v

# Android APK build
flutter build apk --release --split-per-abi

# iOS build (csak macOS)
flutter build ios --release

# Tesztek futtatása
flutter test

# Flutter környezet ellenőrzése
flutter doctor
```

## GitHub Version Control

**FONTOS**: Minden nagyobb fejlesztés/frissítés **előtt** automatikusan mentsd a változtatásokat GitHub-ra!

### Mikor kell menteni (commit + push)?

1. **Nagy fejlesztések előtt** - Komplex feature implementálása, több fájl módosítása
2. **Architektúra változtatások előtt** - State management, navigation, service módosítások
3. **Új screen/widget hozzáadása előtt** - Jelentős UI változások
4. **Refactoring előtt** - Kód átszervezés, tisztítás
5. **Dependency frissítések előtt** - pubspec.yaml módosítások

### Git parancsok workflow

```bash
# 1. Aktuális státusz ellenőrzése
git status

# 2. Változtatások hozzáadása (minden fájl)
git add .

# 3. Commit készítése leíró üzenettel
git commit -m "Descriptive message about the changes"

# 4. Push GitHub-ra
git push origin main
```

### Commit üzenet formátum

Használj világos, leíró commit üzeneteket magyarul vagy angolul:

```bash
# Példák:
git commit -m "feat: Új subscription tier rendszer implementálása"
git commit -m "fix: Progressive position szinkronizációs hiba javítása"
git commit -m "refactor: GameProvider kód tisztítás és optimalizálás"
git commit -m "docs: CLAUDE.md frissítése új game loop mintával"
git commit -m "style: Színpaletta frissítése új purple árnyalatokkal"
```

**Prefix kategóriák:**
- `feat:` - Új funkció
- `fix:` - Bugfix
- `refactor:` - Kód refactoring
- `docs:` - Dokumentáció
- `style:` - UI/design változtatások
- `test:` - Tesztek
- `chore:` - Build, dependency updates

### Automatikus mentés szabályok

Ha Claude Code (te) látod, hogy az alábbi típusú feladatokat fogsz végezni, **automatikusan** csinálj commit-ot és push-t előtte:

1. ✅ Több mint 3 fájl módosítása várható
2. ✅ Provider/State management változtatások
3. ✅ Új screen/page implementálás
4. ✅ Game logic módosítások (XP, coins, progression)
5. ✅ Navigation flow változtatások
6. ✅ Dependency hozzáadása vagy frissítése

**Ne ments automatikusan** ezekben az esetekben:
- ❌ Egyszerű typo javítások (1-2 fájl)
- ❌ Kis UI/styling tweaks (szín, padding módosítás)
- ❌ Dokumentáció apró frissítései
- ❌ Debug/console log hozzáadása/törlése

## Architektúra

### State Management: Provider Pattern

Az alkalmazás a **Provider** package-et használja state management-re egy központi `GameProvider`-rel:
- `GameProvider` (`lib/providers/game_provider.dart`) - Központi állapotkezelő
- `GameState` model (`lib/models/game_state.dart`) - Immutable state object Equatable-lel
- `ChangeNotifier` mixin a reaktív UI frissítésekhez
- SharedPreferences perzisztencia automatikus mentéssel

**Provider használata:**
```dart
// Olvasás
Consumer<GameProvider>(
  builder: (context, gameProvider, child) {
    return Text('Coins: ${gameProvider.gameState.coins}');
  },
)

// Írás
final gameProvider = Provider.of<GameProvider>(context, listen: false);
gameProvider.updateCoins(100);
gameProvider.updateXp(50);
gameProvider.advanceStage();
```

### Adatperzisztencia

**StorageService** singleton (`lib/services/storage_service.dart`):
- SharedPreferences wrapper típusbiztos metódusokkal
- Automatikus inicializálás lazy loading-gal
- Error handling minden művelethez

**Fő storage kulcsok:**
```dart
'rpg_game_state'    // GameState JSON (főállapot)
'player_name'       // Játékos neve (String)
'current_streak'    // Napi streak szám (int)
'daily_streak'      // Streak adatok JSON
'daily_lessons'     // Napi lecke limit tracking
'arena_daily_games' // Arena napi játék tracking
'player_avatar'     // Kiválasztott avatar (String)
```

### Navigációs Struktúra

**Page-based navigation** (nem route-based):
- `currentPage` string a `GameState`-ben ('main', 'lesson', 'game', stb.)
- `Navigator.push/pop` használata screen-ek között
- Back button override-ok a konzisztens navigációhoz

**Screen flow:**
```
SplashScreen (2s)
  ↓
  ├─ hasSeenWelcome = false → WelcomeScreen (+1000 arany)
  │                             ↓
  └─ hasSeenWelcome = true  → HomeScreen
                                ↓
                                ├─ LessonPage → Game Screens
                                ├─ UniversityPage
                                ├─ ArenaPage
                                ├─ ProfilePage
                                ├─ SubscriptionPage
                                └─ AvatarSelectorPage
```

## Játékmechanika

### Lecke Rendszer (Two-Round System)

**Első kör**: Minden leckéhez 3 játékmód
1. **Reading Game** - Szövegértés kulcsszavas válaszokkal (5 kérdés, 80% passing rate)
2. **Matching Game** - 15 pár párosítása 60mp alatt (minden párnak helyesnek kell lennie)
3. **Quiz Game** - 10 feleletválasztós kérdés (min. 8 helyes válasz kell)

**Második kör**: Minden lecke csak Reading Game-mel

**Lesson state tracking:**
```dart
currentBookLessonIndex  // 0-indexed lecke (oldal) szám
currentGameType         // GameType.reading | matching | quiz
isFirstRound            // true = első kör, false = második kör
```

### Progressziós Rendszer

**XP és Leveling:**
- Base XP: 1000 XP per szint
- Growth: 10% compound növekedés szintenként
- Jutalom: 100 XP per lecke teljesítés
- XP calculation: `lib/utils/game_config.dart` → `XpCalculator`

**Stages és Milestones:**
- 6 stage = 1 milestone
- Stage előrehaladás: `progressPosition` (0-5) és `currentStageInSection` (1-6)
- **FONTOS**: `progressPosition = currentStageInSection - 1` (mindig szinkronban!)
- Milestone jutalom: +5 gyémánt

**Jutalmak:**
```dart
Lecke teljesítés:    +150 arany, +100 XP
6 Stage milestone:   +5 gyémánt
Arena győzelem:      +tét×1.8 arany, +50 XP
Welcome bonus:       +1000 arany
```

### Streak System

**StreakManager** (`lib/services/streak_manager.dart`):
- Napi feladat teljesítés tracking
- Automatikus streak törlés ha kimarad egy nap
- Milestone celebrations: 7, 14, 30, 100, 365 nap
- `recordTaskCompletion()` - Minden lecke/arena után hívni
- `getCurrentStreak()` - Aktuális streak lekérése

### Subscription Tiers

```dart
enum SubscriptionTier { free, pro, master }

Free:   3 lecke/nap, 3 arena/nap, 6 avatar
Pro:    Unlimited, 14 avatar, +20% XP boost (4990 Ft/hó)
Master: Unlimited, 20 avatar, +50% XP boost, teljes library (9990 Ft/hó)
```

## Projekt Struktúra

```
lib/
├── config/
│   └── app_theme.dart              # Színek, gradiensek, dark theme
├── models/
│   ├── game_state.dart             # Fő state model (Equatable)
│   └── lesson_model.dart           # Lesson, Reading, Matching, Quiz
├── providers/
│   └── game_provider.dart          # Központi ChangeNotifier provider
├── services/
│   ├── storage_service.dart        # SharedPreferences singleton
│   └── streak_manager.dart         # Napi streak logika
├── utils/
│   └── game_config.dart            # Game konfig, XP számítás
├── data/
│   └── penzugyi_alapismeretek_lessons.dart  # Lecke tartalom
├── screens/                        # Teljes képernyők (15 db)
│   ├── splash_screen.dart
│   ├── welcome_screen.dart
│   ├── home_screen.dart
│   ├── lesson_page.dart
│   ├── reading_game_screen.dart
│   ├── matching_game_screen.dart
│   ├── quiz_game_screen.dart
│   ├── university_page.dart
│   ├── arena_page.dart
│   ├── profile_page.dart
│   ├── subscription_page.dart
│   ├── avatar_selector_page.dart
│   ├── leaderboard_page.dart       # Placeholder
│   └── news_page.dart              # Placeholder
└── widgets/                        # Újrafelhasználható widgetek
    ├── top_bar.dart                # Coins, gems, level display
    ├── player_status_bar.dart      # XP bar, streak, subscription
    ├── side_menu.dart              # Bal oldali 4 gomb menü
    ├── event_cards.dart            # Jobb oldali challenge cards
    ├── progress_animation.dart     # Középső lebegő gomb
    ├── bottom_navigation.dart      # 6 tabes alsó navigáció
    ├── level_up_celebration.dart   # Confetti animáció
    └── streak_celebration.dart     # Tűz effekt animáció
```

## Kulcsfontosságú Fájlok

### 1. `main.dart`
- App entry point
- Provider setup (`MultiProvider`)
- Portrait-only orientation lock
- System UI styling (status bar, navigation bar)
- Dark theme alkalmazása

### 2. `providers/game_provider.dart`
- Központi state management
- Auto-save minden state változásnál
- XP tracking és level-up detection
- Stage progression és milestone jutalmak
- Coins/gems management

### 3. `models/game_state.dart`
- Immutable state model Equatable-lel
- JSON serialization (toJson/fromJson)
- `copyWith` method state frissítéshez
- Enums: `SubscriptionTier`, `GameType`

### 4. `services/storage_service.dart`
- Singleton SharedPreferences wrapper
- Típusbiztos mentés/olvasás metódusok
- Lazy initialization
- Error handling minden műveletnél

### 5. `utils/game_config.dart`
- Összes játék konfiguráció egy helyen
- `GameConfig` class konstans értékekkel
- `XpCalculator` statikus metódusokkal:
  - `getXpRequiredForLevel(level)` - Egy szinthez szükséges XP
  - `getTotalXpForLevel(level)` - Összesen szükséges XP szintig
  - `getLevelFromXp(totalXp)` - Level, currentXp, xpForNextLevel

### 6. `data/penzugyi_alapismeretek_lessons.dart`
- Lecke tartalom struktúrálva
- `Lesson` model: reading + matching + quiz
- Jelenleg 2 teljes lecke implementálva

## Gyakori Fejlesztési Minták

### Új Lecke Hozzáadása

```dart
// lib/data/penzugyi_alapismeretek_lessons.dart
Lesson(
  id: 3,
  pageNumber: 3,
  reading: ReadingContent(
    title: "Lecke Címe",
    content: "Lecke szövege...",
    questions: [
      ReadingQuestion(
        question: "Kérdés szövege?",
        answer: "helyes válasz",
        keywords: ["kulcsszó1", "kulcsszó2", "kulcsszó3"],
      ),
      // ... 4 további kérdés (összesen 5)
    ],
  ),
  matching: [
    MatchingPair(id: 1, left: "Fogalom", right: "Definíció"),
    // ... 14 további pár (összesen 15)
  ],
  quiz: [
    QuizQuestion(
      question: "Kérdés?",
      options: ["A)", "B)", "C)", "D)"],
      correctAnswer: 0, // 0-indexed
    ),
    // ... 9 további kérdés (összesen 10)
  ],
),
```

### State Frissítés Pattern

```dart
// Helytelen - ne használd
gameProvider.gameState.coins += 100;  // ❌ Nem működik (immutable)

// Helyes - használd a provider metódusokat
gameProvider.updateCoins(100);        // ✅ Jó
gameProvider.updateXp(50);            // ✅ Jó
gameProvider.updateGems(5);           // ✅ Jó
gameProvider.advanceStage();          // ✅ Jó
```

### Navigation Pattern

```dart
// Screen megnyitása
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => NewScreen()),
);

// Vissza navigálás (mindig GameProvider frissítéssel)
Navigator.pop(context);
// vagy
final gameProvider = Provider.of<GameProvider>(context, listen: false);
gameProvider.navigateToHome();  // ha van ilyen metódus
```

### Storage Használat

```dart
import '../services/storage_service.dart';

final storage = StorageService();

// Mentés
await storage.saveString('player_name', 'Játékos');
await storage.saveInt('high_score', 1000);
await storage.saveBool('tutorial_completed', true);

// Olvasás
final name = await storage.getString('player_name') ?? 'Vendég';
final score = await storage.getInt('high_score') ?? 0;
final tutorialDone = await storage.getBool('tutorial_completed') ?? false;
```

## Design System

### Színpaletta

```dart
// Fő színek (lib/config/app_theme.dart)
Primary Purple:     Color(0xFF7C3AED)
Deep Purple:        Color(0xFF581C87)
Dark Background:    Color(0xFF0F172A)
Dark Card:          Color(0xFF1E293B)

// Currency színek
Gold:               Color(0xFFF59E0B)
Diamond:            Color(0xFFA855F7)

// Subscription színek
Free:               Color(0xFF6B7280) // gray
Pro:                Color(0xFF3B82F6) // blue
Master:             Color(0xFFF59E0B) // gold
```

### Gradiensek

```dart
// Háttér gradiens
LinearGradient(
  begin: Alignment.topCenter,
  end: Alignment.bottomCenter,
  colors: [
    Color(0xFF0F172A),
    Color(0xFF581C87),
    Color(0xFF0F172A),
  ],
)

// Gomb/Kártya gradiens
LinearGradient(
  colors: [Color(0xFF9333EA), Color(0xFF7C3AED)],
)
```

### Tipográfia

- **Font**: Inter (Google Fonts)
- **Heading**: 24-32px, Bold
- **Body**: 14-16px, Regular
- **Button**: 16-20px, SemiBold

## Fontos Megjegyzések

### Progressive Position Szinkronizáció

**KRITIKUS**: `progressPosition` és `currentStageInSection` mindig szinkronban kell legyenek:
```dart
// progressPosition = 0-indexed (0, 1, 2, 3, 4, 5)
// currentStageInSection = 1-indexed (1, 2, 3, 4, 5, 6)
progressPosition = currentStageInSection - 1  // MINDIG
```

### Orientation Lock

Az app **portrait-only**. A `main.dart`-ban be van állítva:
```dart
SystemChrome.setPreferredOrientations([
  DeviceOrientation.portraitUp,
  DeviceOrientation.portraitDown,
]);
```

### Null Safety

A teljes projekt Dart 3 null safety-vel készült:
- Minden model nullable-aware
- `??` operátor használata default értékekhez
- `copyWith` pattern immutable state-hez

### Provider Context

```dart
// Olvasás (reactive, újra build amikor változik)
final gameState = context.watch<GameProvider>().gameState;

// Olvasás (non-reactive)
final gameState = context.read<GameProvider>().gameState;

// Használd Consumer-t widget buildben reactive UI-hoz
Consumer<GameProvider>(
  builder: (context, provider, child) { ... }
)
```

### Game Loop Pattern

A core gameplay loop minden lecke teljesítésnél:
```dart
1. ReadingGameScreen → win → advanceLesson()
2. MatchingGameScreen → win → advanceLesson()
3. QuizGameScreen → win → advanceStage() + jutalmak
   ├─ updateCoins(150)
   ├─ updateXp(100)
   ├─ recordTaskCompletion() (streak)
   ├─ check milestone (6 stages → +5 gems)
   ├─ check level up → show celebration
   └─ navigate to HomeScreen
```

## Dependency Versions

```yaml
# State Management
provider: ^6.1.2

# Storage
shared_preferences: ^2.3.3

# UI
google_fonts: ^6.2.1
flutter_svg: ^2.0.10+1
lottie: ^3.1.3
animations: ^2.0.11

# Charts
fl_chart: ^0.70.1

# Utilities
intl: ^0.20.1
collection: ^1.18.0
equatable: ^2.0.7
```

## Hibaelhárítás

### Provider Not Found Error
```
Could not find the correct Provider<GameProvider>
```
**Megoldás**: Ellenőrizd hogy a widget a `MultiProvider` alá van-e ágyazva (`main.dart`).

### SharedPreferences Error
```
MissingPluginException
```
**Megoldás**:
```bash
flutter pub get
flutter clean
flutter run
```

### Landscape Mode Bugs
Az app portrait-only. Ha landscape mode-ban problémák vannak, ellenőrizd a `main.dart` SystemChrome beállítást.

### Hot Reload State Loss
Ha hot reload után elvész a state, az várható - az in-memory state elveszik. A persisted state (SharedPreferences) megmarad app újraindítás után.

## Tesztelés

```bash
# Unit tesztek
flutter test

# Widget tesztek
flutter test test/widgets/

# Integration tesztek
flutter test integration_test/

# Coverage report
flutter test --coverage
```

## Build és Deploy

```bash
# Android Debug APK
flutter build apk --debug

# Android Release APK (optimalizált, split per ABI)
flutter build apk --release --split-per-abi
# Output: build/app/outputs/flutter-apk/

# Android App Bundle (Google Play Store)
flutter build appbundle --release
# Output: build/app/outputs/bundle/release/

# iOS Release (csak macOS, Apple Developer account szükséges)
flutter build ios --release
# Majd Xcode-ban archive & upload to App Store
```

## Következő Lépések (Továbbfejlesztés)

### Rövid távú
- [ ] További lecke tartalom hozzáadása (jelenleg csak 2 lecke van)
- [ ] University könyvek teljes tartalmának implementálása
- [ ] Leaderboard funkció (local ranking)
- [ ] News feed implementáció

### Közép távú
- [ ] Achievements rendszer
- [ ] Daily challenges
- [ ] Push notifications (streak emlékeztetők)
- [ ] Barát rendszer (friend system)

### Hosszú távú
- [ ] Backend integráció (Firebase/Supabase)
- [ ] Online leaderboard és multiplayer
- [ ] In-App Purchase integráció (real subscription)
- [ ] Social sharing features
- [ ] Multi-language support (EN, DE)
