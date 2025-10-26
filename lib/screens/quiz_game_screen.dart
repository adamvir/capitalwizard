import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import '../providers/game_provider.dart';
import '../data/penzugyi_alapismeretek_lessons.dart';
import '../utils/game_config.dart';
import 'home_screen.dart';

class QuizGameScreen extends StatefulWidget {
  final VoidCallback? onWin;
  final VoidCallback? onBackToHome;

  const QuizGameScreen({
    super.key,
    this.onWin,
    this.onBackToHome,
  });

  @override
  State<QuizGameScreen> createState() => _QuizGameScreenState();
}

class _QuizGameScreenState extends State<QuizGameScreen> {
  int _currentQuestionIndex = 0;
  final List<int?> _userAnswers = [];
  bool _showResults = false;

  @override
  void initState() {
    super.initState();
    final gameProvider = Provider.of<GameProvider>(context, listen: false);
    final lessonIndex = gameProvider.gameState.currentBookLessonIndex;
    final lesson = penzugyiAlapismeretkLessons[lessonIndex];

    // Initialize user answers list
    for (int i = 0; i < lesson.quiz.length; i++) {
      _userAnswers.add(null);
    }
  }

  void _selectAnswer(int answerIndex) {
    setState(() {
      _userAnswers[_currentQuestionIndex] = answerIndex;
    });
  }

  void _nextQuestion() {
    final gameProvider = Provider.of<GameProvider>(context, listen: false);
    final lessonIndex = gameProvider.gameState.currentBookLessonIndex;
    final lesson = penzugyiAlapismeretkLessons[lessonIndex];

    if (_currentQuestionIndex < lesson.quiz.length - 1) {
      setState(() {
        _currentQuestionIndex++;
      });
    } else {
      _showQuizResults();
    }
  }

  void _previousQuestion() {
    if (_currentQuestionIndex > 0) {
      setState(() {
        _currentQuestionIndex--;
      });
    }
  }

  void _showQuizResults() {
    setState(() {
      _showResults = true;
    });
  }

  int _calculateScore() {
    final gameProvider = Provider.of<GameProvider>(context, listen: false);
    final lessonIndex = gameProvider.gameState.currentBookLessonIndex;
    final lesson = penzugyiAlapismeretkLessons[lessonIndex];

    int correctCount = 0;
    for (int i = 0; i < lesson.quiz.length; i++) {
      if (_userAnswers[i] == lesson.quiz[i].correctAnswer) {
        correctCount++;
      }
    }
    return correctCount;
  }

  bool _isPassed() {
    final correctCount = _calculateScore();
    return correctCount >= GameConfig.defaultConfig.quizMinCorrectAnswers;
  }

  void _finishQuiz() {
    if (_isPassed()) {
      // Call onWin callback if provided
      if (widget.onWin != null) {
        widget.onWin!();
      } else {
        // Fallback to old behavior
        final gameProvider = Provider.of<GameProvider>(context, listen: false);
        gameProvider.updateXp(GameConfig.defaultConfig.xpPerLesson);
        gameProvider.updateCoins(150);
        gameProvider.advanceStage();
        gameProvider.advanceLesson();

        Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => const HomeScreen()),
          (route) => false,
        );
      }
    } else {
      // Retry quiz
      setState(() {
        _currentQuestionIndex = 0;
        _userAnswers.clear();

        final gameProvider = Provider.of<GameProvider>(context, listen: false);
        final lessonIndex = gameProvider.gameState.currentBookLessonIndex;
        final lesson = penzugyiAlapismeretkLessons[lessonIndex];

        for (int i = 0; i < lesson.quiz.length; i++) {
          _userAnswers.add(null);
        }

        _showResults = false;
      });
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
            colors: [Color(0xFF0F172A), Color(0xFF581C87), Color(0xFF0F172A)],
          ),
        ),
        child: SafeArea(
          child: Consumer<GameProvider>(
            builder: (context, gameProvider, child) {
              final lessonIndex = gameProvider.gameState.currentBookLessonIndex;
              final lesson = penzugyiAlapismeretkLessons[lessonIndex];

              if (_showResults) {
                return _buildResultsView(lesson);
              }

              final currentQuestion = lesson.quiz[_currentQuestionIndex];

              return Column(
                children: [
                  // Header
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        IconButton(
                          onPressed: () {
                            if (widget.onBackToHome != null) {
                              widget.onBackToHome!();
                            } else {
                              Navigator.of(context).pop();
                            }
                          },
                          icon: const Icon(Icons.arrow_back, color: Colors.white),
                        ),
                        Text(
                          'Kérdés ${_currentQuestionIndex + 1}/${lesson.quiz.length}',
                          style: GoogleFonts.inter(
                            fontSize: 18,
                            color: Colors.white,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                        const SizedBox(width: 48),
                      ],
                    ),
                  ),

                  // Progress bar
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    child: LinearProgressIndicator(
                      value: (_currentQuestionIndex + 1) / lesson.quiz.length,
                      backgroundColor: Colors.white24,
                      valueColor: const AlwaysStoppedAnimation<Color>(Color(0xFF9333EA)),
                    ),
                  ),

                  const SizedBox(height: 32),

                  // Question
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 24.0),
                    child: Container(
                      padding: const EdgeInsets.all(24),
                      decoration: BoxDecoration(
                        color: const Color(0xFF1E293B),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(
                          color: const Color(0xFF9333EA).withOpacity(0.3),
                          width: 1,
                        ),
                      ),
                      child: Text(
                        currentQuestion.question,
                        style: GoogleFonts.inter(
                          fontSize: 20,
                          color: Colors.white,
                          fontWeight: FontWeight.w500,
                          height: 1.5,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                  ),

                  const SizedBox(height: 32),

                  // Answer options
                  Expanded(
                    child: ListView.builder(
                      padding: const EdgeInsets.symmetric(horizontal: 24),
                      itemCount: currentQuestion.options.length,
                      itemBuilder: (context, index) {
                        final isSelected = _userAnswers[_currentQuestionIndex] == index;

                        return GestureDetector(
                          onTap: () => _selectAnswer(index),
                          child: Container(
                            margin: const EdgeInsets.only(bottom: 16),
                            padding: const EdgeInsets.all(20),
                            decoration: BoxDecoration(
                              gradient: isSelected
                                  ? const LinearGradient(
                                      colors: [Color(0xFF9333EA), Color(0xFF7C3AED)],
                                    )
                                  : LinearGradient(
                                      colors: [
                                        const Color(0xFF1E293B).withOpacity(0.6),
                                        const Color(0xFF334155).withOpacity(0.6),
                                      ],
                                    ),
                              borderRadius: BorderRadius.circular(16),
                              border: Border.all(
                                color: isSelected
                                    ? Colors.white
                                    : const Color(0xFF475569),
                                width: isSelected ? 2 : 1,
                              ),
                            ),
                            child: Row(
                              children: [
                                Container(
                                  width: 32,
                                  height: 32,
                                  decoration: BoxDecoration(
                                    shape: BoxShape.circle,
                                    color: isSelected
                                        ? Colors.white
                                        : Colors.white24,
                                  ),
                                  child: Center(
                                    child: Text(
                                      String.fromCharCode(65 + index), // A, B, C, D
                                      style: TextStyle(
                                        color: isSelected
                                            ? const Color(0xFF9333EA)
                                            : Colors.white,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 16),
                                Expanded(
                                  child: Text(
                                    currentQuestion.options[index],
                                    style: GoogleFonts.inter(
                                      fontSize: 16,
                                      color: Colors.white,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),

                  // Navigation buttons
                  Padding(
                    padding: const EdgeInsets.all(24.0),
                    child: Row(
                      children: [
                        if (_currentQuestionIndex > 0)
                          Expanded(
                            child: OutlinedButton(
                              onPressed: _previousQuestion,
                              style: OutlinedButton.styleFrom(
                                foregroundColor: Colors.white,
                                side: const BorderSide(color: Colors.white),
                                padding: const EdgeInsets.symmetric(vertical: 16),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                              ),
                              child: const Text('Előző'),
                            ),
                          ),
                        if (_currentQuestionIndex > 0) const SizedBox(width: 16),
                        Expanded(
                          child: ElevatedButton(
                            onPressed: _userAnswers[_currentQuestionIndex] != null
                                ? _nextQuestion
                                : null,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF9333EA),
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(vertical: 16),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                            child: Text(
                              _currentQuestionIndex < lesson.quiz.length - 1
                                  ? 'Következő'
                                  : 'Eredmények',
                            ),
                          ),
                        ),
                      ],
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

  Widget _buildResultsView(lesson) {
    final correctCount = _calculateScore();
    final totalQuestions = lesson.quiz.length;
    final passed = _isPassed();
    final percentage = (correctCount / totalQuestions * 100).round();

    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              passed ? '🎉' : '😔',
              style: const TextStyle(fontSize: 80),
            ),

            const SizedBox(height: 24),

            Text(
              passed ? 'Gratulálok!' : 'Próbáld újra!',
              style: GoogleFonts.inter(
                fontSize: 36,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),

            const SizedBox(height: 16),

            Container(
              padding: const EdgeInsets.all(32),
              decoration: BoxDecoration(
                color: const Color(0xFF1E293B),
                borderRadius: BorderRadius.circular(24),
                border: Border.all(
                  color: const Color(0xFF9333EA).withOpacity(0.3),
                  width: 1,
                ),
              ),
              child: Column(
                children: [
                  Text(
                    '$correctCount / $totalQuestions',
                    style: GoogleFonts.inter(
                      fontSize: 48,
                      fontWeight: FontWeight.bold,
                      color: passed ? Colors.green : Colors.orange,
                    ),
                  ),
                  Text(
                    '$percentage% helyes',
                    style: GoogleFonts.inter(
                      fontSize: 20,
                      color: Colors.white70,
                    ),
                  ),

                  if (passed) ...[
                    const SizedBox(height: 24),
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
                ],
              ),
            ),

            const SizedBox(height: 48),

            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _finishQuiz,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF9333EA),
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 20),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                child: Text(
                  passed ? 'Folytatás' : 'Újra',
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
    );
  }
}
