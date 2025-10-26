import 'storage_service.dart';

/// Manages daily streak tracking for the application
class StreakManager {
  static final StreakManager _instance = StreakManager._internal();
  factory StreakManager() => _instance;
  StreakManager._internal();

  final StorageService _storage = StorageService();

  static const String _lastCompletionDateKey = 'last_completion_date';
  static const String _currentStreakKey = 'current_streak';
  static const String _longestStreakKey = 'longest_streak';

  /// Record a task completion and update streak
  Future<int> recordTaskCompletion() async {
    final today = _getTodayDateString();
    final lastCompletion = await _storage.getString(_lastCompletionDateKey);
    final currentStreak = await getCurrentStreak();

    int newStreak = currentStreak;

    if (lastCompletion == null) {
      // First time completion
      newStreak = 1;
    } else if (lastCompletion == today) {
      // Already completed today, no change
      return currentStreak;
    } else {
      final lastDate = DateTime.parse(lastCompletion);
      final todayDate = DateTime.parse(today);
      final difference = todayDate.difference(lastDate).inDays;

      if (difference == 1) {
        // Consecutive day
        newStreak = currentStreak + 1;
      } else {
        // Streak broken, reset to 1
        newStreak = 1;
      }
    }

    // Save the new streak
    await _storage.saveInt(_currentStreakKey, newStreak);
    await _storage.saveString(_lastCompletionDateKey, today);

    // Update longest streak if applicable
    final longestStreak = await getLongestStreak();
    if (newStreak > longestStreak) {
      await _storage.saveInt(_longestStreakKey, newStreak);
    }

    return newStreak;
  }

  /// Get the current streak count
  Future<int> getCurrentStreak() async {
    final lastCompletion = await _storage.getString(_lastCompletionDateKey);

    if (lastCompletion == null) {
      return 0;
    }

    final today = _getTodayDateString();
    final lastDate = DateTime.parse(lastCompletion);
    final todayDate = DateTime.parse(today);
    final difference = todayDate.difference(lastDate).inDays;

    // If last completion was more than 1 day ago, streak is broken
    if (difference > 1) {
      await resetStreak();
      return 0;
    }

    // Otherwise return the stored streak
    final streak = await _storage.getInt(_currentStreakKey);
    return streak ?? 0;
  }

  /// Get the longest streak ever achieved
  Future<int> getLongestStreak() async {
    final streak = await _storage.getInt(_longestStreakKey);
    return streak ?? 0;
  }

  /// Reset the streak to 0
  Future<void> resetStreak() async {
    await _storage.saveInt(_currentStreakKey, 0);
    await _storage.remove(_lastCompletionDateKey);
  }

  /// Check if user has completed a task today
  Future<bool> hasCompletedToday() async {
    final lastCompletion = await _storage.getString(_lastCompletionDateKey);
    if (lastCompletion == null) return false;

    final today = _getTodayDateString();
    return lastCompletion == today;
  }

  /// Get the last completion date
  Future<DateTime?> getLastCompletionDate() async {
    final lastCompletion = await _storage.getString(_lastCompletionDateKey);
    if (lastCompletion == null) return null;

    try {
      return DateTime.parse(lastCompletion);
    } catch (e) {
      print('Error parsing last completion date: $e');
      return null;
    }
  }

  /// Get streak statistics
  Future<Map<String, dynamic>> getStreakStats() async {
    final currentStreak = await getCurrentStreak();
    final longestStreak = await getLongestStreak();
    final hasCompletedToday = await this.hasCompletedToday();
    final lastCompletion = await getLastCompletionDate();

    return {
      'currentStreak': currentStreak,
      'longestStreak': longestStreak,
      'hasCompletedToday': hasCompletedToday,
      'lastCompletionDate': lastCompletion,
    };
  }

  /// Check if streak milestone reached (e.g., 7, 30, 100 days)
  bool isStreakMilestone(int streak) {
    const milestones = [7, 14, 30, 50, 100, 200, 365];
    return milestones.contains(streak);
  }

  /// Get today's date as string in YYYY-MM-DD format
  String _getTodayDateString() {
    final now = DateTime.now();
    return '${now.year}-${now.month.toString().padLeft(2, '0')}-${now.day.toString().padLeft(2, '0')}';
  }
}
