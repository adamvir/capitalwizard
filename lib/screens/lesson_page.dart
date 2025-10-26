import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import '../providers/game_provider.dart';
import '../models/game_state.dart';
import '../data/penzugyi_alapismeretek_lessons.dart';
import 'reading_game_screen.dart';
import 'matching_game_screen.dart';
import 'quiz_game_screen.dart';

class LessonPage extends StatelessWidget {
  const LessonPage({super.key});

  String _getGameTypeTitle(GameType gameType, bool isFirstRound) {
    if (!isFirstRound) return '2. Kör - Ismétlés';

    switch (gameType) {
      case GameType.reading:
        return 'Szövegértés';
      case GameType.matching:
        return 'Párosítás';
      case GameType.quiz:
        return 'Kvíz';
    }
  }

  String _getGameTypeDescription(GameType gameType, bool isFirstRound) {
    if (!isFirstRound) {
      return 'Olvasd el újra a leckét és válaszolj a kérdésekre!';
    }

    switch (gameType) {
      case GameType.reading:
        return 'Olvasd el a szöveget figyelmesen, majd válaszolj a kérdésekre!';
      case GameType.matching:
        return 'Párosítsd össze a fogalmakat a definíciókkal!';
      case GameType.quiz:
        return 'Válaszolj helyesen a feleletválasztós kérdésekre!';
    }
  }

  IconData _getGameTypeIcon(GameType gameType) {
    switch (gameType) {
      case GameType.reading:
        return Icons.menu_book;
      case GameType.matching:
        return Icons.compare_arrows;
      case GameType.quiz:
        return Icons.quiz;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              Color(0xFF0F172A),
              Color(0xFF581C87),
              Color(0xFF0F172A),
            ],
          ),
        ),
        child: SafeArea(
          child: Consumer<GameProvider>(
            builder: (context, gameProvider, child) {
              final gameState = gameProvider.gameState;
              final lessonIndex = gameState.currentBookLessonIndex;

              // Calculate actual lesson number
              final lessonNumber = gameState.isFirstRound
                  ? (lessonIndex * 3) +
                      (gameState.currentGameType == GameType.reading
                          ? 1
                          : gameState.currentGameType == GameType.matching
                              ? 2
                              : 3)
                  : penzugyiAlapismeretkLessons.length * 3 + lessonIndex + 1;

              return Column(
                children: [
                  // Header with back button
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Row(
                      children: [
                        IconButton(
                          onPressed: () => Navigator.of(context).pop(),
                          icon: const Icon(Icons.arrow_back),
                          color: Colors.white,
                        ),
                        Expanded(
                          child: Text(
                            '$lessonNumber. Lecke',
                            style: GoogleFonts.inter(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                            textAlign: TextAlign.center,
                          ),
                        ),
                        const SizedBox(width: 48), // Balance the back button
                      ],
                    ),
                  ),

                  // Main content
                  Expanded(
                    child: Center(
                      child: Padding(
                        padding: const EdgeInsets.all(32.0),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            // Game type icon
                            Container(
                              padding: const EdgeInsets.all(32),
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                gradient: const LinearGradient(
                                  begin: Alignment.topLeft,
                                  end: Alignment.bottomRight,
                                  colors: [
                                    Color(0xFF9333EA),
                                    Color(0xFF7C3AED),
                                  ],
                                ),
                                boxShadow: [
                                  BoxShadow(
                                    color: const Color(0xFF9333EA).withOpacity(0.5),
                                    blurRadius: 20,
                                    spreadRadius: 5,
                                  ),
                                ],
                              ),
                              child: Icon(
                                _getGameTypeIcon(gameState.currentGameType),
                                size: 64,
                                color: Colors.white,
                              ),
                            ),

                            const SizedBox(height: 32),

                            // Game type title
                            Text(
                              _getGameTypeTitle(
                                gameState.currentGameType,
                                gameState.isFirstRound,
                              ),
                              style: GoogleFonts.inter(
                                fontSize: 32,
                                fontWeight: FontWeight.bold,
                                color: Colors.white,
                              ),
                              textAlign: TextAlign.center,
                            ),

                            const SizedBox(height: 16),

                            // Description
                            Container(
                              padding: const EdgeInsets.all(24),
                              decoration: BoxDecoration(
                                color: const Color(0xFF1E293B).withOpacity(0.8),
                                borderRadius: BorderRadius.circular(16),
                                border: Border.all(
                                  color: const Color(0xFF9333EA).withOpacity(0.3),
                                  width: 1,
                                ),
                              ),
                              child: Text(
                                _getGameTypeDescription(
                                  gameState.currentGameType,
                                  gameState.isFirstRound,
                                ),
                                style: GoogleFonts.inter(
                                  fontSize: 16,
                                  color: const Color(0xFF94A3B8),
                                  height: 1.5,
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),

                            const SizedBox(height: 48),

                            // Start button
                            SizedBox(
                              width: double.infinity,
                              child: ElevatedButton(
                                onPressed: () {
                                  // Get current lesson data
                                  final lessonIndex = gameState.currentBookLessonIndex;

                                  // Check if lesson exists, otherwise show error
                                  if (lessonIndex >= penzugyiAlapismeretkLessons.length) {
                                    ScaffoldMessenger.of(context).showSnackBar(
                                      SnackBar(
                                        content: Text('Nincs több lecke! (Lecke index: ${lessonIndex + 1})'),
                                        duration: const Duration(seconds: 3),
                                        action: SnackBarAction(
                                          label: 'Vissza',
                                          onPressed: () {
                                            Navigator.of(context).pop();
                                          },
                                        ),
                                      ),
                                    );
                                    return;
                                  }

                                  final lessonData = penzugyiAlapismeretkLessons[lessonIndex];

                                  // Navigate to appropriate game screen
                                  Widget gameScreen;

                                  switch (gameState.currentGameType) {
                                    case GameType.reading:
                                      gameScreen = ReadingGameScreen(
                                        lessonNumber: lessonIndex + 1,
                                        lessonData: lessonData,
                                        onWin: () {
                                          // Award rewards
                                          gameProvider.updateCoins(150);
                                          gameProvider.updateXp(100);

                                          // Advance to next game
                                          gameProvider.advanceToNextGame();

                                          // Navigate back to home (pop both game screen and lesson page)
                                          Navigator.of(context).pop(); // Close game screen
                                          Navigator.of(context).pop(); // Close lesson page
                                        },
                                        onBackToHome: () {
                                          Navigator.of(context).pop(); // Close game screen
                                          Navigator.of(context).pop(); // Close lesson page
                                        },
                                      );
                                      break;
                                    case GameType.matching:
                                      gameScreen = MatchingGameScreen(
                                        onWin: () {
                                          // Award rewards
                                          gameProvider.updateCoins(150);
                                          gameProvider.updateXp(100);

                                          // Advance to next game
                                          gameProvider.advanceToNextGame();

                                          // Navigate back to home (pop both game screen and lesson page)
                                          Navigator.of(context).pop(); // Close game screen
                                          Navigator.of(context).pop(); // Close lesson page
                                        },
                                        onBackToHome: () {
                                          Navigator.of(context).pop(); // Close game screen
                                          Navigator.of(context).pop(); // Close lesson page
                                        },
                                      );
                                      break;
                                    case GameType.quiz:
                                      gameScreen = QuizGameScreen(
                                        onWin: () {
                                          // Award rewards
                                          gameProvider.updateCoins(150);
                                          gameProvider.updateXp(100);

                                          // Advance to next game
                                          gameProvider.advanceToNextGame();

                                          // Navigate back to home (pop both game screen and lesson page)
                                          Navigator.of(context).pop(); // Close game screen
                                          Navigator.of(context).pop(); // Close lesson page
                                        },
                                        onBackToHome: () {
                                          Navigator.of(context).pop(); // Close game screen
                                          Navigator.of(context).pop(); // Close lesson page
                                        },
                                      );
                                      break;
                                  }

                                  Navigator.of(context).pushReplacement(
                                    MaterialPageRoute(builder: (context) => gameScreen),
                                  );
                                },
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: const Color(0xFF9333EA),
                                  foregroundColor: Colors.white,
                                  padding: const EdgeInsets.symmetric(vertical: 20),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(16),
                                  ),
                                  elevation: 8,
                                  shadowColor: const Color(0xFF9333EA).withOpacity(0.5),
                                ),
                                child: Text(
                                  'Kezdés',
                                  style: GoogleFonts.inter(
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}
