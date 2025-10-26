import 'dart:math' as math;

class GameConfig {
  final int initialGold;
  final int bookRental1Day;
  final int bookRental30Days;
  final int arenaMinBet;
  final int arenaMaxBet;
  final int freeDailyArenaGames;
  final int dailyLessonLimit;
  final int subscriptionProPrice;
  final int subscriptionMasterPrice;
  final int xpPerLesson;
  final int goldEasy;
  final int goldMedium;
  final int goldHard;
  final int maxLevel;
  final int baseXpPerLevel;
  final int xpGrowthPercentage;
  final int xpPerArenaWin;
  final int maxBooksForArena;
  final int matchingPairsCount;
  final int matchingTimeLimit;
  final int quizQuestionsCount;
  final int quizAnswersPerQuestion;
  final int quizMinCorrectAnswers;
  final int readingQuestionsCount;
  final int readingMinCorrectAnswers;
  final int stagesPerMilestone;
  final int diamondsPerMilestone;

  const GameConfig({
    this.initialGold = 1000,
    this.bookRental1Day = 50,
    this.bookRental30Days = 1000,
    this.arenaMinBet = 50,
    this.arenaMaxBet = 500,
    this.freeDailyArenaGames = 3,
    this.dailyLessonLimit = 10,
    this.subscriptionProPrice = 4990,
    this.subscriptionMasterPrice = 9990,
    this.xpPerLesson = 100,
    this.goldEasy = 50,
    this.goldMedium = 100,
    this.goldHard = 150,
    this.maxLevel = 100,
    this.baseXpPerLevel = 1000,
    this.xpGrowthPercentage = 10,
    this.xpPerArenaWin = 50,
    this.maxBooksForArena = 5,
    this.matchingPairsCount = 15,
    this.matchingTimeLimit = 60,
    this.quizQuestionsCount = 10,
    this.quizAnswersPerQuestion = 4,
    this.quizMinCorrectAnswers = 8,
    this.readingQuestionsCount = 5,
    this.readingMinCorrectAnswers = 4,
    this.stagesPerMilestone = 6,
    this.diamondsPerMilestone = 5,
  });

  static const defaultConfig = GameConfig();
}

class XpCalculator {
  static int getXpRequiredForLevel(int level) {
    const config = GameConfig.defaultConfig;
    if (level <= 0) return 0;
    if (level == 1) return config.baseXpPerLevel;

    // Calculate XP required for a specific level using compound growth
    final growthMultiplier = 1 + (config.xpGrowthPercentage / 100);
    return (config.baseXpPerLevel * math.pow(growthMultiplier, level - 1)).floor();
  }

  static int getTotalXpForLevel(int level) {
    int totalXp = 0;
    for (int i = 1; i <= level; i++) {
      totalXp += getXpRequiredForLevel(i);
    }
    return totalXp;
  }

  static Map<String, int> getLevelFromXp(int totalXp) {
    const config = GameConfig.defaultConfig;
    int level = 0;
    int xpAccumulated = 0;

    while (level < config.maxLevel) {
      final xpNeeded = getXpRequiredForLevel(level + 1);
      if (xpAccumulated + xpNeeded > totalXp) {
        break;
      }
      xpAccumulated += xpNeeded;
      level++;
    }

    final currentXp = totalXp - xpAccumulated;
    final xpForNextLevel = level < config.maxLevel ? getXpRequiredForLevel(level + 1) : 0;

    return {
      'level': level,
      'currentXp': currentXp,
      'xpForNextLevel': xpForNextLevel,
    };
  }
}
