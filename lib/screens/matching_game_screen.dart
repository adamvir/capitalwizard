import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:math';
import '../providers/game_provider.dart';
import '../data/penzugyi_alapismeretek_lessons.dart';
import '../utils/game_config.dart';
import 'home_screen.dart';

class MatchingGameScreen extends StatefulWidget {
  final VoidCallback? onWin;
  final VoidCallback? onBackToHome;

  const MatchingGameScreen({
    super.key,
    this.onWin,
    this.onBackToHome,
  });

  @override
  State<MatchingGameScreen> createState() => _MatchingGameScreenState();
}

class _MatchingGameScreenState extends State<MatchingGameScreen> {
  List<_MatchingItem> _leftItems = [];
  List<_MatchingItem> _rightItems = [];
  final Set<int> _matchedPairs = {};
  int? _selectedLeftId;
  int _timeRemaining = GameConfig.defaultConfig.matchingTimeLimit;
  bool _isGameOver = false;

  @override
  void initState() {
    super.initState();
    _initializeGame();
    _startTimer();
  }

  void _initializeGame() {
    final gameProvider = Provider.of<GameProvider>(context, listen: false);
    final lessonIndex = gameProvider.gameState.currentBookLessonIndex;
    final lesson = penzugyiAlapismeretkLessons[lessonIndex];

    // Get pairs and shuffle
    final pairs = lesson.matching.take(GameConfig.defaultConfig.matchingPairsCount).toList();
    final random = Random();

    _leftItems = pairs.map((pair) => _MatchingItem(id: pair.id, text: pair.left)).toList()
      ..shuffle(random);

    _rightItems = pairs.map((pair) => _MatchingItem(id: pair.id, text: pair.right)).toList()
      ..shuffle(random);
  }

  void _startTimer() {
    Future.delayed(const Duration(seconds: 1), () {
      if (!mounted || _isGameOver) return;

      setState(() {
        _timeRemaining--;
      });

      if (_timeRemaining <= 0) {
        _endGame(false);
      } else {
        _startTimer();
      }
    });
  }

  void _onLeftItemTap(int id) {
    if (_matchedPairs.contains(id)) return;

    setState(() {
      _selectedLeftId = id;
    });
  }

  void _onRightItemTap(int id) {
    if (_matchedPairs.contains(id) || _selectedLeftId == null) return;

    if (_selectedLeftId == id) {
      // Correct match!
      setState(() {
        _matchedPairs.add(id);
        _selectedLeftId = null;
      });

      // Check if all pairs are matched
      if (_matchedPairs.length == _leftItems.length) {
        _endGame(true);
      }
    } else {
      // Wrong match - shake animation
      setState(() {
        _selectedLeftId = null;
      });
    }
  }

  void _endGame(bool won) {
    setState(() {
      _isGameOver = true;
    });

    if (won) {
      _showWinDialog();
    } else {
      _showLoseDialog();
    }
  }

  void _showWinDialog() {
    final gameProvider = Provider.of<GameProvider>(context, listen: false);

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF1E293B),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        title: const Text(
          '🎉 Gratulálok!',
          style: TextStyle(color: Colors.white),
          textAlign: TextAlign.center,
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              'Minden párt helyesen párosítottál!',
              style: TextStyle(color: Colors.white70),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 16),
            Text(
              '+${GameConfig.defaultConfig.xpPerLesson} XP\n+150 Arany',
              style: GoogleFonts.inter(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: const Color(0xFFFBBF24),
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();

              // Call onWin callback if provided
              if (widget.onWin != null) {
                widget.onWin!();
              } else {
                // Fallback to old behavior
                gameProvider.updateXp(GameConfig.defaultConfig.xpPerLesson);
                gameProvider.updateCoins(150);
                gameProvider.advanceStage();
                gameProvider.advanceLesson();
                Navigator.of(context).pushAndRemoveUntil(
                  MaterialPageRoute(builder: (context) => const HomeScreen()),
                  (route) => false,
                );
              }
            },
            child: const Text('Folytatás'),
          ),
        ],
      ),
    );
  }

  void _showLoseDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        backgroundColor: const Color(0xFF1E293B),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        title: const Text(
          '⏱️ Lejárt az idő!',
          style: TextStyle(color: Colors.white),
          textAlign: TextAlign.center,
        ),
        content: const Text(
          'Próbáld újra!',
          style: TextStyle(color: Colors.white70),
          textAlign: TextAlign.center,
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              setState(() {
                _matchedPairs.clear();
                _selectedLeftId = null;
                _timeRemaining = GameConfig.defaultConfig.matchingTimeLimit;
                _isGameOver = false;
              });
              _initializeGame();
              _startTimer();
            },
            child: const Text('Újra'),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();

              // Call onBackToHome callback if provided
              if (widget.onBackToHome != null) {
                widget.onBackToHome!();
              } else {
                // Fallback to old behavior
                Navigator.of(context).pushAndRemoveUntil(
                  MaterialPageRoute(builder: (context) => const HomeScreen()),
                  (route) => false,
                );
              }
            },
            child: const Text('Vissza'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF0F172A), Color(0xFF581C87), Color(0xFF0F172A)],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              // Header
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    IconButton(
                      onPressed: () => Navigator.of(context).pop(),
                      icon: const Icon(Icons.arrow_back, color: Colors.white),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      decoration: BoxDecoration(
                        color: _timeRemaining <= 10
                            ? Colors.red.withOpacity(0.3)
                            : const Color(0xFF1E293B),
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.timer, color: Colors.white, size: 20),
                          const SizedBox(width: 8),
                          Text(
                            '$_timeRemaining mp',
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              // Instructions
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Text(
                  'Párosítsd össze a fogalmakat!',
                  style: GoogleFonts.inter(
                    fontSize: 18,
                    color: Colors.white,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),

              const SizedBox(height: 16),

              // Matching area
              Expanded(
                child: Row(
                  children: [
                    // Left column
                    Expanded(
                      child: ListView.builder(
                        padding: const EdgeInsets.all(8),
                        itemCount: _leftItems.length,
                        itemBuilder: (context, index) {
                          final item = _leftItems[index];
                          final isMatched = _matchedPairs.contains(item.id);
                          final isSelected = _selectedLeftId == item.id;

                          return _buildMatchingCard(
                            text: item.text,
                            isMatched: isMatched,
                            isSelected: isSelected,
                            onTap: () => _onLeftItemTap(item.id),
                            alignment: Alignment.centerLeft,
                          );
                        },
                      ),
                    ),

                    // Right column
                    Expanded(
                      child: ListView.builder(
                        padding: const EdgeInsets.all(8),
                        itemCount: _rightItems.length,
                        itemBuilder: (context, index) {
                          final item = _rightItems[index];
                          final isMatched = _matchedPairs.contains(item.id);

                          return _buildMatchingCard(
                            text: item.text,
                            isMatched: isMatched,
                            isSelected: false,
                            onTap: () => _onRightItemTap(item.id),
                            alignment: Alignment.centerRight,
                          );
                        },
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMatchingCard({
    required String text,
    required bool isMatched,
    required bool isSelected,
    required VoidCallback onTap,
    required Alignment alignment,
  }) {
    return Opacity(
      opacity: isMatched ? 0.3 : 1.0,
      child: GestureDetector(
        onTap: isMatched ? null : onTap,
        child: Container(
          margin: const EdgeInsets.only(bottom: 8),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            gradient: isSelected
                ? const LinearGradient(
                    colors: [Color(0xFF9333EA), Color(0xFF7C3AED)],
                  )
                : LinearGradient(
                    colors: [
                      const Color(0xFF1E293B).withOpacity(0.8),
                      const Color(0xFF334155).withOpacity(0.8),
                    ],
                  ),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isSelected
                  ? Colors.white
                  : isMatched
                      ? Colors.green
                      : const Color(0xFF475569),
              width: isSelected ? 2 : 1,
            ),
          ),
          child: Text(
            text,
            style: GoogleFonts.inter(
              fontSize: 14,
              color: Colors.white,
            ),
            textAlign: alignment == Alignment.centerLeft
                ? TextAlign.left
                : TextAlign.right,
          ),
        ),
      ),
    );
  }
}

class _MatchingItem {
  final int id;
  final String text;

  _MatchingItem({required this.id, required this.text});
}
