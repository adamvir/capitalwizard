import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/game_state.dart';
import '../utils/game_config.dart';

class GameProvider with ChangeNotifier {
  GameState _gameState = GameState.initial();
  String _playerName = '';
  int _currentStreak = 0;

  GameState get gameState => _gameState;
  String get playerName => _playerName;
  int get currentStreak => _currentStreak;

  GameProvider() {
    _loadGameState();
  }

  Future<void> _loadGameState() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final stateJson = prefs.getString('rpg_game_state');

      if (stateJson != null) {
        _gameState = GameState.fromJson(jsonDecode(stateJson));
      } else {
        _gameState = GameState.initial();
      }

      _playerName = prefs.getString('player_name') ?? '';
      _currentStreak = prefs.getInt('current_streak') ?? 0;

      notifyListeners();
    } catch (e) {
      debugPrint('Error loading game state: $e');
    }
  }

  Future<void> _saveGameState() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('rpg_game_state', jsonEncode(_gameState.toJson()));
    } catch (e) {
      debugPrint('Error saving game state: $e');
    }
  }

  void updateCoins(int amount) {
    _gameState = _gameState.copyWith(coins: _gameState.coins + amount);
    _saveGameState();
    notifyListeners();
  }

  void updateGems(int amount) {
    _gameState = _gameState.copyWith(gems: _gameState.gems + amount);
    _saveGameState();
    notifyListeners();
  }

  void updateXp(int amount) {
    final newTotalXp = _gameState.totalXp + amount;
    final levelInfo = XpCalculator.getLevelFromXp(newTotalXp);
    final newLevel = levelInfo['level']!;

    _gameState = _gameState.copyWith(
      totalXp: newTotalXp,
      playerLevel: newLevel,
    );

    _saveGameState();
    notifyListeners();

    // Check if leveled up
    if (newLevel > _gameState.playerLevel) {
      _showLevelUpCelebration(newLevel);
    }
  }

  void _showLevelUpCelebration(int newLevel) {
    // This would trigger a celebration UI
    debugPrint('🎉 Level Up! New level: $newLevel');
  }

  void advanceStage() {
    const config = GameConfig.defaultConfig;
    final newStageInSection = _gameState.currentStageInSection + 1;
    final newTotalStages = _gameState.totalStagesCompleted + 1;

    if (newStageInSection > config.stagesPerMilestone) {
      // Reset to stage 1 and award diamonds
      _gameState = _gameState.copyWith(
        currentStageInSection: 1,
        progressPosition: 0,
        totalStagesCompleted: newTotalStages,
        gems: _gameState.gems + config.diamondsPerMilestone,
      );
    } else {
      _gameState = _gameState.copyWith(
        currentStageInSection: newStageInSection,
        progressPosition: newStageInSection - 1,
        totalStagesCompleted: newTotalStages,
      );
    }

    _saveGameState();
    notifyListeners();
  }

  void setCurrentPage(String page) {
    _gameState = _gameState.copyWith(currentPage: page);
    _saveGameState();
    notifyListeners();
  }

  void setSelectedBook(String bookTitle) {
    _gameState = _gameState.copyWith(selectedBookTitle: bookTitle);
    _saveGameState();
    notifyListeners();
  }

  void completeWelcome() {
    _gameState = _gameState.copyWith(hasSeenWelcome: true);
    _saveGameState();
    notifyListeners();
  }

  void setGameType(GameType gameType) {
    _gameState = _gameState.copyWith(currentGameType: gameType);
    _saveGameState();
    notifyListeners();
  }

  void advanceToNextGame() {
    final currentType = _gameState.currentGameType;
    final isFirstRound = _gameState.isFirstRound;

    if (isFirstRound) {
      // First round: Reading -> Matching -> Quiz
      if (currentType == GameType.reading) {
        _gameState = _gameState.copyWith(currentGameType: GameType.matching);
      } else if (currentType == GameType.matching) {
        _gameState = _gameState.copyWith(currentGameType: GameType.quiz);
      } else {
        // Completed quiz - advance stage and move to next lesson
        advanceStage();

        // Loop back to first lesson if we've completed all lessons
        final nextLessonIndex = (_gameState.currentBookLessonIndex + 1) % 2; // Only 2 lessons available
        _gameState = _gameState.copyWith(
          currentBookLessonIndex: nextLessonIndex,
          currentGameType: GameType.reading,
        );
      }
    } else {
      // Second round: only reading - advance lesson
      final nextLessonIndex = (_gameState.currentBookLessonIndex + 1) % 2; // Only 2 lessons available
      _gameState = _gameState.copyWith(
        currentBookLessonIndex: nextLessonIndex,
      );
    }

    _saveGameState();
    notifyListeners();
  }

  void advanceLesson() {
    final currentIndex = _gameState.currentBookLessonIndex;
    final currentType = _gameState.currentGameType;
    final isFirstRound = _gameState.isFirstRound;

    if (isFirstRound) {
      // First round: Reading -> Matching -> Quiz
      if (currentType == GameType.reading) {
        _gameState = _gameState.copyWith(currentGameType: GameType.matching);
      } else if (currentType == GameType.matching) {
        _gameState = _gameState.copyWith(currentGameType: GameType.quiz);
      } else {
        // Completed quiz - move to next page or complete round
        _gameState = _gameState.copyWith(
          currentBookLessonIndex: currentIndex + 1,
          currentGameType: GameType.reading,
        );
      }
    } else {
      // Second round: only reading
      _gameState = _gameState.copyWith(
        currentBookLessonIndex: currentIndex + 1,
      );
    }

    _saveGameState();
    notifyListeners();
  }

  void setPlayerName(String name) async {
    _playerName = name;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('player_name', name);
    notifyListeners();
  }

  void updateStreak(int streak) async {
    _currentStreak = streak;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('current_streak', streak);
    notifyListeners();
  }

  void setSubscriptionTier(SubscriptionTier tier) {
    _gameState = _gameState.copyWith(subscriptionTier: tier);
    _saveGameState();
    notifyListeners();
  }

  Future<void> resetGame() async {
    _gameState = GameState.initial();
    _playerName = '';
    _currentStreak = 0;

    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();

    notifyListeners();
  }

  // Rented Books Management
  void addRentedBook(RentedBook book) {
    final updatedBooks = List<RentedBook>.from(_gameState.rentedBooks);

    // Remove existing rental of same book if exists
    updatedBooks.removeWhere((b) => b.title == book.title);

    // Add new rental
    updatedBooks.add(book);

    _gameState = _gameState.copyWith(rentedBooks: updatedBooks);
    _saveGameState();
    notifyListeners();
  }

  void removeRentedBook(String title) {
    final updatedBooks = List<RentedBook>.from(_gameState.rentedBooks);
    updatedBooks.removeWhere((b) => b.title == title);

    _gameState = _gameState.copyWith(rentedBooks: updatedBooks);
    _saveGameState();
    notifyListeners();
  }

  List<RentedBook> getActiveRentedBooks() {
    final now = DateTime.now().millisecondsSinceEpoch;
    return _gameState.rentedBooks
        .where((book) => book.rentedUntil > now)
        .toList();
  }

  bool isBookRented(String title) {
    final now = DateTime.now().millisecondsSinceEpoch;
    return _gameState.rentedBooks.any(
      (book) => book.title == title && book.rentedUntil > now,
    );
  }
}
