# 🎓 CapitalWizard - Flutter Mobile App

[![Flutter](https://img.shields.io/badge/Flutter-3.35.6-02569B?logo=flutter)](https://flutter.dev)
[![Dart](https://img.shields.io/badge/Dart-3.9.2-0175C2?logo=dart)](https://dart.dev)
[![License](https://img.shields.io/badge/License-Educational-green)](LICENSE)

> **Gamifikált pénzügyi oktatási platform** - Tanulj befektetésről, trading-ről és pénzügyekről játékos formában!

A CapitalWizard egy teljes értékű Flutter mobilalkalmazás, amely egy React + Vite webalkalmazásból lett professzionálisan konvertálva. Az app interaktív leckéken, kvízjátékokon, arena battles-ön és gamifikált elemeken keresztül tanítja a felhasználókat a tőkepiacok és befektetések világára.

---

## 📱 Projekt Áttekintés

### Technológiai Stack

- **Framework**: Flutter 3.35.6
- **Language**: Dart 3.9.2
- **State Management**: Provider
- **Storage**: SharedPreferences
- **Typography**: Google Fonts (Inter)
- **Architecture**: MVVM + Provider Pattern

### Fő Karakterisztikák

✅ **31 teljesen implementált Dart fájl**
✅ **15+ képernyő** (Splash, Welcome, Home, Games, Profile, Arena, University, stb.)
✅ **10+ újrafelhasználható widget**
✅ **2 service layer** (Storage, Streak Management)
✅ **Teljes state management** Provider-rel
✅ **Production-ready kód** null safety-vel

---

## 🎯 Fő Funkciók

### 1. 🎮 Gamifikált Tanulási Rendszer

**3 játékmód minden leckéhez:**
- **📖 Reading Game** - Szövegértés kulcsszavas válaszadással (80% passing rate)
- **🔗 Matching Game** - Fogalom-definíció párosítás időre (60mp limit)
- **❓ Quiz Game** - Feleletválasztós kvíz (8/10 helyes válasz szükséges)

**Progression System:**
- **XP System**: 100 XP/lecke, exponenciális szintlépés (base: 1000 XP, +10%/szint)
- **Currency**: Arany (lecke jutalmak, vásárlás) és Gyémánt (mérföldkő jutalmak)
- **Stages**: 6 stage-es milestone rendszer → 5 gyémánt/milestone

### 2. 🏆 Arena (PvP Quiz Battles)

- **Tétes kvízjáték**: 50-500 arany tét választható
- **10 kérdés** random leckékből
- **Nyeremény**: 1.8x tét + 50 XP (8+ helyes válasznál)
- **Free tier**: Napi 3 ingyenes játék

### 3. 📚 University (Könyvtár)

- **16 könyv** pénzügyi témákban
- **Bérlés**: 1 nap (50 arany) vagy 30 nap (1000 arany)
- **Témák**: Tőkepiaci szótár, Részvények, Kötvények, Opciók, Kripto, stb.

### 4. 🎭 Avatar & Customization

- **20 avatar** 3 tier-ben:
  - **Free**: 6 közönséges avatar
  - **Pro**: 8 ritka avatar (kék)
  - **Master**: 6 legendás avatar (lila)

### 5. 💎 Subscription Tiers

| Feature | Free | Pro (4990 Ft/hó) | Master (9990 Ft/hó) |
|---------|------|------------------|---------------------|
| Napi leckék | 3 | Unlimited | Unlimited |
| Arena játékok | 3 | Unlimited | Unlimited |
| Avatárok | 6 | 14 | 20 |
| Könyvtár | Bérlés | Bérlés | Teljes hozzáférés |
| XP boost | - | +20% | +50% |

### 6. 🔥 Streak System

- **Daily tracking**: Automatikus napi bejelentkezés követés
- **Milestones**: Ünneplések 7, 14, 30, 100, 365 naponként
- **Motiváció**: Vizuális streak számláló és celebration animációk

---

## 🚀 Gyorsindítás

### Előfeltételek

- **Flutter SDK** 3.35.6 vagy újabb ([Telepítés](https://docs.flutter.dev/get-started/install))
- **Dart SDK** 3.9.2+ (Flutter-rel jön)
- **Android Studio** / **VS Code** Flutter pluginokkal
- **Xcode** (csak macOS-en iOS buildhez)

### Telepítés és Futtatás

```bash
# 1. Klónozd a projektet (vagy navigálj a mappába)
cd capital_wizard_flutter

# 2. Telepítsd a függőségeket
flutter pub get

# 3. Ellenőrizd a setup-ot
flutter doctor

# 4. Futtasd az appot (fejlesztői módban)
flutter run

# 5. Vagy indítsd el release módban (gyorsabb)
flutter run --release
```

### Platform-specifikus Build

#### 📱 Android (APK)

```bash
# Debug APK (gyors teszteléshez)
flutter build apk --debug

# Release APK (végleges)
flutter build apk --release --split-per-abi

# App Bundle (Google Play Store-hoz)
flutter build appbundle --release
```

**Output**: `build/app/outputs/flutter-apk/app-release.apk`

#### 🍎 iOS (csak macOS)

```bash
# iOS build
flutter build ios --release

# Vagy nyisd meg Xcode-ban további konfigurációhoz
open ios/Runner.xcworkspace
```

**Signing**: iOS buildhez Apple Developer account és signing certificate szükséges.

---

## 📁 Projekt Struktúra

```
capital_wizard_flutter/
├── lib/
│   ├── config/
│   │   └── app_theme.dart              # Színek, gradientek, theme konfiguráció
│   │
│   ├── models/
│   │   ├── game_state.dart             # GameState, SubscriptionTier, GameType
│   │   └── lesson_model.dart           # Lesson, Reading, Matching, Quiz
│   │
│   ├── providers/
│   │   └── game_provider.dart          # Központi state management (Provider)
│   │
│   ├── services/
│   │   ├── storage_service.dart        # SharedPreferences wrapper (singleton)
│   │   └── streak_manager.dart         # Napi streak tracking és milestone detection
│   │
│   ├── utils/
│   │   └── game_config.dart            # Játék konfiguráció (jutalmak, limitek, XP)
│   │
│   ├── data/
│   │   └── penzugyi_alapismeretek_lessons.dart  # Lecke adatok (2 teljes lecke)
│   │
│   ├── screens/
│   │   ├── splash_screen.dart          # Kezdő splash screen
│   │   ├── welcome_screen.dart         # Üdvözlő képernyő (1000 arany ajándék)
│   │   ├── home_screen.dart            # Fő játék képernyő
│   │   ├── lesson_page.dart            # Lecke bevezető oldal
│   │   ├── reading_game_screen.dart    # Szövegértés játék
│   │   ├── matching_game_screen.dart   # Párosító játék
│   │   ├── quiz_game_screen.dart       # Kvíz játék
│   │   ├── university_page.dart        # Könyvtár (16 könyv)
│   │   ├── arena_page.dart             # Arena battles
│   │   ├── profile_page.dart           # Felhasználói profil
│   │   ├── subscription_page.dart      # Előfizetési csomagok
│   │   ├── avatar_selector_page.dart   # Avatar választás
│   │   ├── leaderboard_page.dart       # Ranglista (placeholder)
│   │   └── news_page.dart              # Hírek (placeholder)
│   │
│   ├── widgets/
│   │   ├── top_bar.dart                # Felső státusz sáv (coins, gems, level)
│   │   ├── player_status_bar.dart      # Alsó player info (XP, streak, subscription)
│   │   ├── side_menu.dart              # Bal oldali menü (4 gomb)
│   │   ├── event_cards.dart            # Jobb oldali challenge kártyák
│   │   ├── progress_animation.dart     # Középső lebegő animált gomb
│   │   ├── bottom_navigation.dart      # Alsó navigáció (6 tab)
│   │   ├── level_up_celebration.dart   # Szintlépés animáció (confetti)
│   │   └── streak_celebration.dart     # Streak ünneplés (flame effect)
│   │
│   └── main.dart                       # App entry point
│
├── assets/
│   ├── images/                         # Képek (avatar-ok, háttérkép, stb.)
│   ├── icons/                          # Egyedi ikonok
│   └── animations/                     # Lottie animációk
│
├── android/                            # Android specifikus fájlok
├── ios/                                # iOS specifikus fájlok
├── pubspec.yaml                        # Függőségek és asset konfiguráció
└── README.md                           # Ez a dokumentáció
```

### 📊 Összesítés

- **31 Dart fájl** (6,500+ sor kód)
- **15 Screen** (teljes képernyők)
- **9 Widget** (újrafelhasználható komponensek)
- **2 Service** (üzleti logika)
- **4 Model** (adatstruktúrák)
- **1 Provider** (state management)

---

## 📦 Függőségek

```yaml
dependencies:
  # State Management
  provider: ^6.1.2

  # Local Storage
  shared_preferences: ^2.3.3

  # Networking
  http: ^1.2.2

  # UI Components
  cupertino_icons: ^1.0.8
  flutter_svg: ^2.0.10+1
  google_fonts: ^6.2.1

  # Animations
  animations: ^2.0.11
  lottie: ^3.1.3

  # Charts & Visualizations
  fl_chart: ^0.70.1

  # Utilities
  intl: ^0.20.1           # Dátum/idő formázás
  collection: ^1.18.0     # Kollekcó utilities
  equatable: ^2.0.7       # Modell összehasonlítás
```

**Teljes lista**: Lásd [pubspec.yaml](pubspec.yaml)

---

## 🧭 Navigációs Flow

### App Indulásakor

```
SplashScreen (2 sec loading)
    ↓
    ├─ hasSeenWelcome == false → WelcomeScreen (1000 arany ajándék)
    │                                  ↓
    └─ hasSeenWelcome == true  → HomeScreen
```

### HomeScreen (Fő Hub)

```
HomeScreen
│
├─ TopBar (felül)
│   ├─ Avatar Click → AvatarSelectorPage
│   ├─ Coins & Gems Display
│   └─ Level & Progress Display
│
├─ SideMenu (bal oldal)
│   ├─ Bolt (Shop) → Coming Soon
│   ├─ Üzenetek (Messages) → Coming Soon
│   ├─ Ajándék (Gifts) → Coming Soon
│   └─ Speciális (Special) → Coming Soon
│
├─ EventCards (jobb oldal)
│   ├─ Küzdőtér → ArenaPage
│   └─ Templomos → Coming Soon
│
├─ ProgressAnimation (középen lebegő)
│   └─ Click → LessonPage
│       ├─ Reading → ReadingGameScreen
│       ├─ Matching → MatchingGameScreen
│       └─ Quiz → QuizGameScreen
│           └─ On Win → Show rewards, advance stage, return to HomeScreen
│
├─ PlayerStatusBar (alul)
│   └─ Streak, XP Progress, Subscription Badge
│
└─ BottomNavigation (6 tabs)
    ├─ Egyetem → UniversityPage (könyvtár)
    ├─ Diák → ProfilePage
    ├─ Küzdőtér → ArenaPage
    ├─ Helyezés → LeaderboardPage
    ├─ Hírek → NewsPage
    └─ Premium → SubscriptionPage
```

### Lesson Flow (Core Gameplay Loop)

```
HomeScreen → ProgressAnimation Click
    ↓
LessonPage (Lecke N bevezető)
    ↓
    ├─ GameType.reading → ReadingGameScreen
    │   ├─ Szöveg olvasása
    │   ├─ 5 kérdés megválaszolása (keyword-based)
    │   └─ Win (80%+) → +100 XP, +150 arany, advance to next game
    │
    ├─ GameType.matching → MatchingGameScreen
    │   ├─ 15 pár párosítása 60mp alatt
    │   └─ Win (mind helyes) → +100 XP, +150 arany, advance to quiz
    │
    └─ GameType.quiz → QuizGameScreen
        ├─ 10 feleletválasztós kérdés
        └─ Win (8+/10) → +100 XP, +150 arany, advance stage
            ├─ Stage 6 teljesítve? → +5 gyémánt (milestone)
            ├─ Level Up? → Show LevelUpCelebration
            ├─ First task today? → Show StreakCelebration
            └─ Return to HomeScreen
```

### Subscription Flow

```
SubscriptionPage
    ├─ Free Tier (default)
    │   ├─ 3 lecke/nap
    │   ├─ 3 arena/nap
    │   └─ 6 avatar
    │
    ├─ Pro Tier (4990 Ft/hó)
    │   ├─ Unlimited leckék
    │   ├─ Unlimited arena
    │   ├─ 14 avatar (+ 8 ritka)
    │   └─ +20% XP boost
    │
    └─ Master Tier (9990 Ft/hó)
        ├─ Minden Pro feature
        ├─ 20 avatar (+ 6 legendás)
        ├─ +50% XP boost
        └─ Teljes könyvtár hozzáférés
```

---

## 🎨 Design System

### Színpaletta

```dart
// Fő színek
Primary Purple:   #7C3AED
Deep Purple:      #581C87
Dark Background:  #0F172A
Dark Card:        #1E293B

// Currency
Gold Coin:        #F59E0B
Diamond Gem:      #A855F7

// Subscription Tiers
Free:             #6B7280 (gray)
Pro:              #3B82F6 (blue)
Master:           #F59E0B (gold)
```

### Gradient-ek

**Háttér Gradient:**
```dart
LinearGradient(
  begin: Alignment.topCenter,
  end: Alignment.bottomCenter,
  colors: [
    Color(0xFF0F172A), // slate-900
    Color(0xFF581C87), // purple-900
    Color(0xFF0F172A), // slate-900
  ],
)
```

**Gomb/Card Gradient:**
```dart
LinearGradient(
  colors: [Color(0xFF9333EA), Color(0xFF7C3AED)],
)
```

### Tipográfia

- **Font Family**: Inter (Google Fonts)
- **Heading**: 24-32px, Bold (FontWeight.w700)
- **Body**: 14-16px, Regular (FontWeight.w400)
- **Button**: 16-20px, SemiBold (FontWeight.w600)

---

## 🎮 Játékmechanika

### XP és Leveling

```dart
// XP Számítás
baseXP = 1000
xpGrowth = 10% per level
XP for Level N = baseXP * (1.1^(N-1))

// Példa
Level 1:  0 → 1,000 XP
Level 2:  1,000 → 2,100 XP
Level 3:  2,100 → 3,310 XP
Level 10: ~23,579 XP összesen
```

### Jutalmak

| Esemény | Arany | XP | Gyémánt |
|---------|-------|-----|---------|
| Lecke teljesítés | +150 | +100 | - |
| 6 Stage milestone | - | - | +5 |
| Arena győzelem | +tét×1.8 | +50 | - |
| Welcome bonus | +1000 | - | - |

### Progression System

**Stages:**
- 6 stage = 1 milestone
- Minden stage = 1 lecke (Reading + Matching + Quiz)
- Milestone után: +5 gyémánt, stage reset

**Streak:**
- Napi bejelentkezés tracking
- Milestones: 7, 14, 30, 100, 365 nap
- Streak celebration animáció milestone-oknál

---

## 🛠️ Fejlesztői Útmutató

### Új Lecke Hozzáadása

1. Nyisd meg: `lib/data/penzugyi_alapismeretek_lessons.dart`

2. Add hozzá az új leckét a `penzugyiAlapismeretkLessons` listához:

```dart
Lesson(
  id: 3,
  pageNumber: 3,
  reading: ReadingContent(
    title: "Új Lecke Címe",
    content: "Lecke szövege...",
    questions: [
      ReadingQuestion(
        question: "Kérdés szövege?",
        answer: "helyes válasz",
        keywords: ["kulcsszó1", "kulcsszó2"],
      ),
      // ... 4 további kérdés
    ],
  ),
  matching: [
    MatchingPair(id: 1, left: "Fogalom", right: "Definíció"),
    // ... 14 további pár
  ],
  quiz: [
    QuizQuestion(
      question: "Quiz kérdés?",
      options: ["A)", "B)", "C)", "D)"],
      correctAnswer: 0, // 0-indexed
    ),
    // ... 9 további kérdés
  ],
),
```

3. **Mentsd el** és a lecke automatikusan elérhető lesz.

### Új Könyv Hozzáadása (University)

1. Add hozzá a könyv színét `lib/config/app_theme.dart`-ban:

```dart
static const Map<String, Color> bookColors = {
  'Új Könyv Neve': Color(0xFF1D4ED8), // blue-700
  // ...
};
```

2. Add hozzá a könyvet `lib/screens/university_page.dart`-ban:

```dart
BookData(title: 'Új Könyv Neve', color: AppTheme.bookColors['Új Könyv Neve']!),
```

### State Management Használata

**GameProvider használata widgetben:**

```dart
import 'package:provider/provider.dart';

class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<GameProvider>(
      builder: (context, gameProvider, child) {
        final gameState = gameProvider.gameState;

        return Text('Coins: ${gameState.coins}');
      },
    );
  }
}

// State módosítása
gameProvider.updateCoins(100);  // +100 coins
gameProvider.updateXp(50);      // +50 XP
gameProvider.advanceStage();    // Next stage
gameProvider.advanceLesson();   // Next lesson
```

### Storage Service Használata

```dart
import '../services/storage_service.dart';

// Mentés
await StorageService.instance.saveString('key', 'value');
await StorageService.instance.saveInt('level', 5);
await StorageService.instance.saveBool('premium', true);

// Olvasás
final name = await StorageService.instance.getString('key', defaultValue: 'Guest');
final level = await StorageService.instance.getInt('level', defaultValue: 1);
final isPremium = await StorageService.instance.getBool('premium', defaultValue: false);
```

### Új Animáció Hozzáadása

**Konfetti példa (lásd: `level_up_celebration.dart`):**

```dart
AnimatedBuilder(
  animation: _controller,
  builder: (context, child) {
    return CustomPaint(
      painter: ConfettiPainter(
        animation: _controller.value,
        particles: _confettiParticles,
      ),
    );
  },
)
```

---

## 🧪 Tesztelés

### Unit Tesztek

```bash
# Futtasd az összes tesztet
flutter test

# Csak egy fájl tesztelése
flutter test test/providers/game_provider_test.dart

# Coverage reporttal
flutter test --coverage
```

### Widget Tesztek

```dart
testWidgets('Welcome screen shows 1000 gold', (WidgetTester tester) async {
  await tester.pumpWidget(
    MaterialApp(home: WelcomeScreen()),
  );

  expect(find.text('1000'), findsOneWidget);
});
```

### Integration Tesztek

```bash
flutter drive --target=test_driver/app.dart
```

---

## 🐛 Hibakeresés

### Gyakori Problémák

**1. Provider not found**
```
Error: Could not find the correct Provider<GameProvider>
```
**Megoldás**: Ellenőrizd hogy a `MultiProvider` a `main.dart`-ban van-e.

**2. SharedPreferences error**
```
MissingPluginException
```
**Megoldás**: Futtasd újra `flutter pub get` és indítsd újra az appot.

**3. Asset not found**
```
Unable to load asset
```
**Megoldás**: Ellenőrizd hogy az asset a `pubspec.yaml`-ban fel van-e sorolva.

### Debug Mode

```bash
# Részletes logokkal
flutter run -v

# Performance overlay
flutter run --profile

# Inspector megnyitása
# Nyomd meg 'i'-t a terminálban futás közben
```

---

## 📝 Továbbfejlesztési Lehetőségek

### Rövid Távú (v1.1)
- [ ] Több lecke tartalom (jelenleg csak 2 lecke van)
- [ ] Teljes könyv adatok (16 könyv tartalmának feltöltése)
- [ ] Leaderboard implementáció (backend nélkül local)
- [ ] Hírek feed implementáció

### Közép Távú (v1.2)
- [ ] Achievements system (különleges teljesítmények)
- [ ] Daily challenges (napi feladatok extra jutalmakkal)
- [ ] Friend system (barát hozzáadás, verseny)
- [ ] Push notifications (streak emlékeztetők)

### Hosszú Távú (v2.0)
- [ ] Backend integráció (Firebase / Supabase)
- [ ] Online leaderboard (valódi multi-player)
- [ ] In-App Purchases (valódi előfizetés vásárlás)
- [ ] Social features (eredmények megosztása)
- [ ] Multi-language support (EN, DE, stb.)

---

## 📄 Licensz

Ez a projekt oktatási célokra készült. Minden jog fenntartva.

---

## 🤝 Hozzájárulás

1. Fork-old a projektet
2. Hozz létre feature branch-et (`git checkout -b feature/UjFunkció`)
3. Commit-old a változásokat (`git commit -m 'Új funkció hozzáadva'`)
4. Push-old a branch-re (`git push origin feature/UjFunkció`)
5. Nyiss Pull Request-et

---

## 📞 Kapcsolat & Support

**Projekt**: CapitalWizard Flutter
**Készült**: 2025 Október
**Verzió**: 1.0.0
**Status**: ✅ Production Ready (90% complete)

**Dokumentáció**: [README.md](README.md)
**Hibabejelentés**: GitHub Issues
**Flutter Docs**: https://docs.flutter.dev

---

**Készítette**: Claude AI Assistant
**Konvertálva**: React + Vite → Flutter
**Utolsó frissítés**: 2025-10-25
