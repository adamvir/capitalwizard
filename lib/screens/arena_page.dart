import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:math';
import '../providers/game_provider.dart';
import '../config/app_theme.dart';
import '../utils/game_config.dart';
import '../services/streak_manager.dart';
import '../models/game_state.dart';

// Question model for numerical arena questions
class ArenaQuestion {
  final String question;
  final int correctAnswer;
  final String source;

  ArenaQuestion({
    required this.question,
    required this.correctAnswer,
    required this.source,
  });
}

class ArenaPage extends StatefulWidget {
  const ArenaPage({super.key});

  @override
  State<ArenaPage> createState() => _ArenaPageState();
}

class _ArenaPageState extends State<ArenaPage> with TickerProviderStateMixin {
  // Game state
  String _gameState = 'betting'; // betting, playing, result
  String _activeTab = 'numbers'; // numbers, patterns, stocks
  int _betAmount = 50;

  // Questions and answers
  List<ArenaQuestion> _questions = [];
  int _currentQuestionIndex = 0;
  String _playerAnswer = '';
  int _opponentAnswer = 0;
  int _playerScore = 0;
  int _opponentScore = 0;
  List<Map<String, int>> _roundResults = [];
  bool _showRoundResult = false;

  // Timer
  int _timeLeft = 10;
  AnimationController? _timerController;

  // Books
  List<String> _selectedBooks = [];

  @override
  void initState() {
    super.initState();
    _initializeSelectedBooks();
  }

  @override
  void dispose() {
    _timerController?.dispose();
    super.dispose();
  }

  void _initializeSelectedBooks() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final gameProvider = Provider.of<GameProvider>(context, listen: false);
      final rentedBooks = gameProvider.getActiveRentedBooks();

      if (rentedBooks.isNotEmpty && _selectedBooks.isEmpty) {
        setState(() {
          final maxBooks = min(rentedBooks.length, GameConfig.defaultConfig.maxBooksForArena);
          _selectedBooks = rentedBooks.take(maxBooks).map((b) => b.title).toList();
        });
      }
    });
  }

  List<ArenaQuestion> _generateQuestions() {
    // Sample numerical questions - in production, load from all book data
    final allQuestions = [
      // Tőkepiaci Szótár
      ArenaQuestion(
        question: 'Hány kereskedési nap van egy évben átlagosan?',
        correctAnswer: 252,
        source: 'Tőkepiaci Szótár',
      ),
      ArenaQuestion(
        question: 'Mennyi a maximális napközbeni árfolyamváltozás az OTC piacon (%)?',
        correctAnswer: 10,
        source: 'Tőkepiaci Szótár',
      ),
      ArenaQuestion(
        question: 'Hány másodperc alatt kell teljesíteni egy high-frequency trading megbízást?',
        correctAnswer: 1,
        source: 'Tőkepiaci Szótár',
      ),
      // Befektetés Alapjai
      ArenaQuestion(
        question: 'Mennyi a maximális adólevonás részvény értékesítésnél Magyarországon (%)?',
        correctAnswer: 15,
        source: 'Befektetés Alapjai',
      ),
      ArenaQuestion(
        question: 'Hány éves időtávra ajánlott részvényekbe fektetni minimum?',
        correctAnswer: 5,
        source: 'Befektetés Alapjai',
      ),
      ArenaQuestion(
        question: 'Hány hónapos vészhelyzeti tartalékot javasolnak?',
        correctAnswer: 6,
        source: 'Befektetés Alapjai',
      ),
      // Részvények
      ArenaQuestion(
        question: 'Hány százalékos hozamot hozott átlagosan az S&P 500 index hosszú távon évente?',
        correctAnswer: 10,
        source: 'Részvények',
      ),
      ArenaQuestion(
        question: 'Hány vállalat részvényét tartalmazza az S&P 500 index?',
        correctAnswer: 500,
        source: 'Részvények',
      ),
      ArenaQuestion(
        question: 'Hány legnagyobb amerikai vállalatot tartalmaz a Dow Jones index?',
        correctAnswer: 30,
        source: 'Részvények',
      ),
      ArenaQuestion(
        question: 'Hány cég van a BUX indexben (Budapesti Értéktőzsde)?',
        correctAnswer: 13,
        source: 'Részvények',
      ),
      // Kötvények
      ArenaQuestion(
        question: 'Mekkora a magyar állampapír átlagos éves hozama (%)?',
        correctAnswer: 5,
        source: 'Kötvények',
      ),
      ArenaQuestion(
        question: 'Hány éves államkötvényt tartanak a leglikvidebb benchmarknak?',
        correctAnswer: 10,
        source: 'Kötvények',
      ),
      // Kockázatkezelés
      ArenaQuestion(
        question: 'Mekkora veszteségnél zárjuk általában az pozíciót a stop loss stratégiában (%)?',
        correctAnswer: 5,
        source: 'Kockázatkezelés',
      ),
      ArenaQuestion(
        question: 'Hány százalékát ajánlják maximum egy tradehez kockáztatni a portfólióból?',
        correctAnswer: 2,
        source: 'Kockázatkezelés',
      ),
      // Makrogazdaság
      ArenaQuestion(
        question: 'Mekkora inflációt tekintünk egészségesnek a gazdaságban (%)?',
        correctAnswer: 2,
        source: 'Makrogazdaság',
      ),
      ArenaQuestion(
        question: 'Hány százalékos GDP növekedést tekintünk egészségesnek?',
        correctAnswer: 3,
        source: 'Makrogazdaság',
      ),
      // Portfóliókezelés
      ArenaQuestion(
        question: 'Hány részvényt ajánlanak minimum egy diverzifikált portfólióhoz?',
        correctAnswer: 15,
        source: 'Portfóliókezelés',
      ),
      ArenaQuestion(
        question: 'Mekkora likviditási tartalékot ajánlanak készpénzben (%)?',
        correctAnswer: 10,
        source: 'Portfóliókezelés',
      ),
      // Kripto
      ArenaQuestion(
        question: 'Hány Bitcoin létezhet összesen (millió)?',
        correctAnswer: 21,
        source: 'Kripto és Blockchain',
      ),
      ArenaQuestion(
        question: 'Hány percenként bányásznak egy új Bitcoin blokkot?',
        correctAnswer: 10,
        source: 'Kripto és Blockchain',
      ),
      // Technikai Elemzés
      ArenaQuestion(
        question: 'Hány napos mozgóátlagot használnak gyakran rövid távú elemzéshez?',
        correctAnswer: 50,
        source: 'Technikai Elemzés',
      ),
      ArenaQuestion(
        question: 'Mekkora RSI érték felett tekintjük túlvettnek a piacot?',
        correctAnswer: 70,
        source: 'Technikai Elemzés',
      ),
      // Fundamentális Elemzés
      ArenaQuestion(
        question: 'Mekkora P/E rátió felett tekintjük túlértékeltnek egy részvényt?',
        correctAnswer: 25,
        source: 'Fundamentális Elemzés',
      ),
      ArenaQuestion(
        question: 'Hány százalékos ROE feletti értéket tartanak kiválónak?',
        correctAnswer: 15,
        source: 'Fundamentális Elemzés',
      ),
      // Opciók
      ArenaQuestion(
        question: 'Hány napig él egy standard részvényopció?',
        correctAnswer: 90,
        source: 'Opciók',
      ),
      ArenaQuestion(
        question: 'Hány részvényt tartalmaz egy standard opciós kontraktus?',
        correctAnswer: 100,
        source: 'Opciók',
      ),
    ];

    // Filter by selected books
    final filteredQuestions = allQuestions
        .where((q) => _selectedBooks.contains(q.source))
        .toList();

    // Shuffle and take 10 questions
    filteredQuestions.shuffle();
    return filteredQuestions.take(10).toList();
  }

  void _startGame() {
    final gameProvider = Provider.of<GameProvider>(context, listen: false);

    if (_betAmount > gameProvider.gameState.coins) {
      _showMessage('Nincs elég aranyad!', Colors.red);
      return;
    }

    if (_selectedBooks.isEmpty) {
      _showMessage('Válassz legalább egy tankönyvet!', Colors.orange);
      return;
    }

    final questions = _generateQuestions();
    if (questions.length < 10) {
      _showMessage('Nincs elég kérdés a kiválasztott tankönyvekből!', Colors.orange);
      return;
    }

    // Deduct bet amount
    gameProvider.updateCoins(-_betAmount);

    setState(() {
      _questions = questions;
      _currentQuestionIndex = 0;
      _playerScore = 0;
      _opponentScore = 0;
      _roundResults = [];
      _playerAnswer = '';
      _gameState = 'playing';
      _timeLeft = 10;
    });

    _startTimer();
  }

  void _startTimer() {
    _timerController?.dispose();
    _timerController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 10),
    );

    _timerController!.addListener(() {
      setState(() {
        _timeLeft = (10 - (_timerController!.value * 10)).ceil();
      });
    });

    _timerController!.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        _submitAnswer(autoSubmit: true);
      }
    });

    _timerController!.forward();
  }

  int _generateOpponentAnswer(int correctAnswer) {
    final random = Random();
    final difficulty = random.nextDouble();

    if (difficulty < 0.1) {
      // 10% - Very close (within 5%)
      final variance = correctAnswer * 0.05;
      return (correctAnswer + (random.nextDouble() * variance * 2 - variance)).round();
    } else if (difficulty < 0.4) {
      // 30% - Close (within 20%)
      final variance = correctAnswer * 0.2;
      return (correctAnswer + (random.nextDouble() * variance * 2 - variance)).round();
    } else if (difficulty < 0.7) {
      // 30% - Medium (within 50%)
      final variance = correctAnswer * 0.5;
      return (correctAnswer + (random.nextDouble() * variance * 2 - variance)).round();
    } else {
      // 30% - Far (within 100%)
      final variance = correctAnswer * 1.0;
      return (correctAnswer + (random.nextDouble() * variance * 2 - variance)).round();
    }
  }

  void _submitAnswer({bool autoSubmit = false}) {
    _timerController?.stop();

    final currentQuestion = _questions[_currentQuestionIndex];
    final playerNum = autoSubmit ? 0 : int.tryParse(_playerAnswer) ?? 0;
    final opponentNum = _generateOpponentAnswer(currentQuestion.correctAnswer);

    final playerDiff = (playerNum - currentQuestion.correctAnswer).abs();
    final opponentDiff = (opponentNum - currentQuestion.correctAnswer).abs();

    setState(() {
      _opponentAnswer = opponentNum;
      _showRoundResult = true;

      // Update scores
      if (playerDiff < opponentDiff) {
        _playerScore++;
      } else if (opponentDiff < playerDiff) {
        _opponentScore++;
      }

      _roundResults.add({
        'player': playerNum,
        'opponent': opponentNum,
        'correct': currentQuestion.correctAnswer,
      });
    });

    // Move to next question or show results
    Future.delayed(const Duration(seconds: 3), () {
      if (_currentQuestionIndex < 9) {
        setState(() {
          _currentQuestionIndex++;
          _playerAnswer = '';
          _showRoundResult = false;
          _timeLeft = 10;
        });
        _startTimer();
      } else {
        _finishGame();
      }
    });
  }

  void _finishGame() {
    final gameProvider = Provider.of<GameProvider>(context, listen: false);
    final config = GameConfig.defaultConfig;

    setState(() {
      _gameState = 'result';
    });

    // Calculate rewards
    if (_playerScore > _opponentScore) {
      // Win - get bet back + bet amount
      gameProvider.updateCoins(_betAmount * 2);
      gameProvider.updateXp(config.xpPerArenaWin * _selectedBooks.length);

      // Update streak
      StreakManager().recordTaskCompletion();
    } else if (_opponentScore > _playerScore) {
      // Loss - already deducted bet
      // Still update streak
      StreakManager().recordTaskCompletion();
    }
  }

  void _handleNumberClick(String num) {
    if (_showRoundResult) return;
    setState(() {
      _playerAnswer = _playerAnswer + num;
    });
  }

  void _handleBackspace() {
    if (_playerAnswer.isNotEmpty) {
      setState(() {
        _playerAnswer = _playerAnswer.substring(0, _playerAnswer.length - 1);
      });
    }
  }

  void _handleClear() {
    setState(() {
      _playerAnswer = '';
    });
  }

  void _showMessage(String message, Color color) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: color,
        duration: const Duration(seconds: 2),
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
            colors: [
              Color(0xFF0F172A),
              Color(0xFF581C87),
              Color(0xFF0F172A),
            ],
          ),
        ),
        child: SafeArea(
          child: _gameState == 'betting'
              ? _buildBettingView()
              : _gameState == 'playing'
                  ? _buildPlayingView()
                  : _buildResultView(),
        ),
      ),
    );
  }

  Widget _buildBettingView() {
    return Consumer<GameProvider>(
      builder: (context, gameProvider, child) {
        final config = GameConfig.defaultConfig;
        final maxBet = min(gameProvider.gameState.coins, config.arenaMaxBet);

        return Column(
          children: [
            // Header
            _buildHeader(gameProvider.gameState.coins),

            // Content
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    // Game Mode Tabs
                    _buildGameModeTabs(),
                    const SizedBox(height: 16),

                    // Betting Interface
                    _buildBettingCard(maxBet),
                    const SizedBox(height: 16),

                    // Rules Card
                    _buildRulesCard(),
                    const SizedBox(height: 16),

                    // Rented Books
                    _buildRentedBooksCard(),
                  ],
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  Widget _buildHeader(int coins) {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            const Color(0xFF0F172A).withOpacity(0.95),
            const Color(0xFF581C87).withOpacity(0.8),
            const Color(0xFF0F172A).withOpacity(0.95),
          ],
        ),
        border: Border(
          bottom: BorderSide(
            color: AppTheme.primaryPurple.withOpacity(0.3),
            width: 1,
          ),
        ),
      ),
      padding: const EdgeInsets.all(12),
      child: Row(
        children: [
          IconButton(
            onPressed: () => Navigator.of(context).pop(),
            icon: const Icon(Icons.chevron_left, color: Colors.white),
            style: IconButton.styleFrom(
              backgroundColor: const Color(0xFF1E293B),
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Icon(Icons.emoji_events, color: Color(0xFFFBBF24), size: 18),
                    const SizedBox(width: 6),
                    Text(
                      'Küzdőtér',
                      style: GoogleFonts.inter(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        foreground: Paint()
                          ..shader = const LinearGradient(
                            colors: [Color(0xFFFBBF24), Color(0xFFF59E0B), Color(0xFFDC2626)],
                          ).createShader(const Rect.fromLTWH(0, 0, 200, 70)),
                      ),
                    ),
                  ],
                ),
                Row(
                  children: [
                    const Icon(Icons.bolt, color: Color(0xFFFBBF24), size: 14),
                    const SizedBox(width: 4),
                    Text(
                      '$coins',
                      style: const TextStyle(
                        color: Color(0xFFFCD34D),
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Icon(Icons.flash_on, color: Color(0xFFEF4444), size: 24),
        ],
      ),
    );
  }

  Widget _buildGameModeTabs() {
    return Row(
      children: [
        Expanded(
          child: _buildTab(
            icon: Icons.local_fire_department,
            label: 'Számok',
            isActive: _activeTab == 'numbers',
            onTap: () => setState(() => _activeTab = 'numbers'),
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: _buildTab(
            icon: Icons.trending_up,
            label: 'Hamarosan',
            isActive: false,
            isDisabled: true,
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: _buildTab(
            icon: Icons.bar_chart,
            label: 'Hamarosan',
            isActive: false,
            isDisabled: true,
          ),
        ),
      ],
    );
  }

  Widget _buildTab({
    required IconData icon,
    required String label,
    required bool isActive,
    bool isDisabled = false,
    VoidCallback? onTap,
  }) {
    return GestureDetector(
      onTap: isDisabled ? null : onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
        decoration: BoxDecoration(
          gradient: isActive
              ? const LinearGradient(
                  colors: [Color(0xFF7C3AED), Color(0xFF581C87), Color(0xFFDB2777)],
                )
              : null,
          color: isDisabled ? const Color(0xFF1E293B).withOpacity(0.2) : const Color(0xFF1E293B).withOpacity(0.5),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isActive
                ? AppTheme.primaryPurple.withOpacity(0.3)
                : const Color(0xFF334155).withOpacity(0.3),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              icon,
              size: 16,
              color: isDisabled
                  ? const Color(0xFF475569)
                  : isActive
                      ? Colors.white
                      : const Color(0xFF94A3B8),
            ),
            const SizedBox(width: 6),
            Text(
              label,
              style: TextStyle(
                fontSize: 12,
                color: isDisabled
                    ? const Color(0xFF475569)
                    : isActive
                        ? Colors.white
                        : const Color(0xFF94A3B8),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBettingCard(int maxBet) {
    final config = GameConfig.defaultConfig;
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            const Color(0xFF1E293B).withOpacity(0.8),
            const Color(0xFF581C87).withOpacity(0.3),
            const Color(0xFF1E293B).withOpacity(0.8),
          ],
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.primaryPurple.withOpacity(0.3),
        ),
      ),
      child: Column(
        children: [
          Row(
            children: [
              const Icon(Icons.emoji_events, color: Color(0xFFFBBF24), size: 18),
              const SizedBox(width: 8),
              const Text(
                'Válassz tétet',
                style: TextStyle(color: Colors.white, fontSize: 14),
              ),
            ],
          ),
          const SizedBox(height: 16),

          // Slider
          SliderTheme(
            data: SliderThemeData(
              trackHeight: 8,
              thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 8),
              overlayShape: const RoundSliderOverlayShape(overlayRadius: 16),
              activeTrackColor: const Color(0xFFFBBF24),
              inactiveTrackColor: const Color(0xFF334155).withOpacity(0.5),
              thumbColor: const Color(0xFFF59E0B),
            ),
            child: Slider(
              value: _betAmount.toDouble(),
              min: config.arenaMinBet.toDouble(),
              max: maxBet.toDouble(),
              divisions: (maxBet - config.arenaMinBet) ~/ 10,
              onChanged: (value) {
                setState(() {
                  _betAmount = value.round();
                });
              },
            ),
          ),

          // Slider labels
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '${config.arenaMinBet}',
                  style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 12),
                ),
                Text(
                  '$_betAmount',
                  style: GoogleFonts.inter(
                    fontSize: 14,
                    fontWeight: FontWeight.bold,
                    color: const Color(0xFFFBBF24),
                  ),
                ),
                Text(
                  '$maxBet',
                  style: const TextStyle(color: Color(0xFF94A3B8), fontSize: 12),
                ),
              ],
            ),
          ),

          const SizedBox(height: 16),

          // Quick bet buttons
          Row(
            children: [50, 100, 200, 500].map((amount) {
              final effectiveAmount = min(amount, maxBet);
              return Expanded(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: ElevatedButton(
                    onPressed: () {
                      setState(() {
                        _betAmount = effectiveAmount;
                      });
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF334155),
                      padding: const EdgeInsets.symmetric(vertical: 8),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                    ),
                    child: Text(
                      '$amount',
                      style: const TextStyle(fontSize: 12, color: Colors.white),
                    ),
                  ),
                ),
              );
            }).toList(),
          ),

          const SizedBox(height: 16),

          // Start battle button
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: _startGame,
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                backgroundColor: const Color(0xFFDC2626),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.flash_on, size: 18),
                  const SizedBox(width: 8),
                  Text(
                    'Küzdelem kezdése',
                    style: GoogleFonts.inter(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRulesCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            const Color(0xFF0F172A).withOpacity(0.8),
            const Color(0xFF581C87).withOpacity(0.4),
          ],
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: AppTheme.primaryPurple.withOpacity(0.2),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.star, color: Color(0xFFA78BFA), size: 16),
              const SizedBox(width: 8),
              const Text(
                'Szabályok',
                style: TextStyle(color: Color(0xFFA78BFA), fontSize: 12),
              ),
            ],
          ),
          const SizedBox(height: 12),
          _buildRuleItem('10 kérdés • Tippeld a számot', const Color(0xFFA78BFA)),
          _buildRuleItem('Közelebb = nyersz', const Color(0xFFA78BFA)),
          _buildRuleItem('Győzelem: +$_betAmount', const Color(0xFF34D399)),
          _buildRuleItem('Vereség: -$_betAmount', const Color(0xFFEF4444)),
        ],
      ),
    );
  }

  Widget _buildRuleItem(String text, Color dotColor) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 6),
      child: Row(
        children: [
          Container(
            width: 4,
            height: 4,
            decoration: BoxDecoration(
              color: dotColor,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              text,
              style: const TextStyle(
                color: Color(0xFFCBD5E1),
                fontSize: 12,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildRentedBooksCard() {
    return Consumer<GameProvider>(
      builder: (context, gameProvider, child) {
        final rentedBooks = gameProvider.getActiveRentedBooks();

        return Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                const Color(0xFF1E293B).withOpacity(0.8),
                const Color(0xFF4338CA).withOpacity(0.3),
                const Color(0xFF1E293B).withOpacity(0.8),
              ],
            ),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: const Color(0xFF4338CA).withOpacity(0.3),
            ),
          ),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        width: 24,
                        height: 24,
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [Color(0xFF4338CA), Color(0xFF7C3AED)],
                          ),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Center(
                          child: Text('📚', style: TextStyle(fontSize: 12)),
                        ),
                      ),
                      const SizedBox(width: 8),
                      const Text(
                        'Kölcsönzött könyvek',
                        style: TextStyle(color: Colors.white, fontSize: 14),
                      ),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: const Color(0xFF4338CA).withOpacity(0.5),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: const Color(0xFF818CF8).withOpacity(0.3),
                      ),
                    ),
                    child: Text(
                      '${_selectedBooks.length}/${min(rentedBooks.length, GameConfig.defaultConfig.maxBooksForArena)}',
                      style: const TextStyle(color: Color(0xFF818CF8), fontSize: 12),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),

              if (rentedBooks.isEmpty)
            Column(
              children: [
                const Text(
                  'Nincs kölcsönzött könyv',
                  style: TextStyle(color: Color(0xFF94A3B8), fontSize: 14),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Küzdőtérben csak a kölcsönzött könyvek kérdéseit kapod',
                  style: TextStyle(color: Color(0xFF64748B), fontSize: 12),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: () {
                    // Navigate to library
                    Navigator.of(context).pop();
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF2563EB),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  ),
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text('📚'),
                      SizedBox(width: 8),
                      Text('Ugrás a Könyvtárba'),
                    ],
                  ),
                ),
              ],
            )
              else
                Column(
                  children: [
                    Wrap(
                      spacing: 8,
                      runSpacing: 8,
                      children: rentedBooks.map((book) {
                        final isSelected = _selectedBooks.contains(book.title);
                        final shortName = _getShortBookName(book.title);

                        return GestureDetector(
                          onTap: () {
                            setState(() {
                              if (isSelected) {
                                if (_selectedBooks.length > 1) {
                                  _selectedBooks.remove(book.title);
                                }
                              } else {
                                if (_selectedBooks.length < GameConfig.defaultConfig.maxBooksForArena) {
                                  _selectedBooks.add(book.title);
                                }
                              }
                            });
                          },
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                            decoration: BoxDecoration(
                              gradient: isSelected
                                  ? const LinearGradient(
                                      colors: [Color(0xFF4338CA), Color(0xFF7C3AED)],
                                    )
                                  : null,
                              color: isSelected ? null : const Color(0xFF1E293B).withOpacity(0.5),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(
                                color: isSelected
                                    ? const Color(0xFF818CF8).withOpacity(0.5)
                                    : const Color(0xFF334155).withOpacity(0.5),
                              ),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Container(
                                  width: 8,
                                  height: 8,
                                  decoration: BoxDecoration(
                                    color: isSelected ? const Color(0xFF34D399) : const Color(0xFF475569),
                                    shape: BoxShape.circle,
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Text(
                                  shortName,
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: isSelected ? Colors.white : const Color(0xFF94A3B8),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      }).toList(),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(
                          child: ElevatedButton(
                            onPressed: () {
                              setState(() {
                                final maxBooks = min(rentedBooks.length, GameConfig.defaultConfig.maxBooksForArena);
                                _selectedBooks = rentedBooks.take(maxBooks).map((b) => b.title).toList();
                              });
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF059669).withOpacity(0.6),
                              padding: const EdgeInsets.symmetric(vertical: 10),
                            ),
                            child: const Text('Max kiválasztása', style: TextStyle(fontSize: 12)),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: ElevatedButton(
                            onPressed: _selectedBooks.isEmpty
                                ? null
                                : () {
                                    setState(() {
                                      _selectedBooks.clear();
                                    });
                                  },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFFDC2626).withOpacity(0.6),
                              padding: const EdgeInsets.symmetric(vertical: 10),
                            ),
                            child: const Text('Összes törlése', style: TextStyle(fontSize: 12)),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
            ],
          ),
        );
      },
    );
  }

  String _getShortBookName(String title) {
    return title
        .replaceAll('Tőkepiaci Szótár', 'Tőkepiaci')
        .replaceAll('Pénzügyi Alapismeretek', 'Alapok')
        .replaceAll('Befektetés Alapjai', 'Befektetés')
        .replaceAll('Portfóliókezelés', 'Portfólió')
        .replaceAll('Technikai Elemzés', 'Technikai')
        .replaceAll('Fundamentális Elemzés', 'Fundamentális')
        .replaceAll('Pénzügyi Matematika', 'Matematika')
        .replaceAll('Határidős ügyletek', 'Határidős')
        .replaceAll('Kockázatkezelés', 'Kockázat')
        .replaceAll('Kripto és Blockchain', 'Kripto')
        .replaceAll('Pszichológia és Trading', 'Pszichológia')
        .replaceAll('Ingatlan Befektetés', 'Ingatlan');
  }

  Widget _buildPlayingView() {
    final currentQuestion = _questions[_currentQuestionIndex];

    return Column(
      children: [
        // Header with score
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                const Color(0xFF0F172A).withOpacity(0.95),
                const Color(0xFF581C87).withOpacity(0.8),
              ],
            ),
            border: Border(
              bottom: BorderSide(
                color: AppTheme.primaryPurple.withOpacity(0.3),
              ),
            ),
          ),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Player score
                  _buildScoreCard('Te', _playerScore, const Color(0xFF3B82F6)),

                  // Question counter
                  Column(
                    children: [
                      Text(
                        'Kérdés ${_currentQuestionIndex + 1}/10',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [Color(0xFFDC2626), Color(0xFFF59E0B)],
                          ),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.monetization_on, color: Colors.white, size: 14),
                            const SizedBox(width: 4),
                            Text(
                              '$_betAmount',
                              style: const TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),

                  // Opponent score
                  _buildScoreCard('Ellenfél', _opponentScore, const Color(0xFFEF4444)),
                ],
              ),
              const SizedBox(height: 12),

              // Timer
              Column(
                children: [
                  LinearProgressIndicator(
                    value: _timeLeft / 10,
                    backgroundColor: Colors.white.withOpacity(0.2),
                    valueColor: AlwaysStoppedAnimation<Color>(
                      _timeLeft > 5 ? const Color(0xFF34D399) : const Color(0xFFEF4444),
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    '${_timeLeft}s',
                    style: TextStyle(
                      color: _timeLeft > 5 ? const Color(0xFF34D399) : const Color(0xFFEF4444),
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),

        // Question
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                // Question card
                Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: const Color(0xFF1E293B),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(
                      color: AppTheme.primaryPurple.withOpacity(0.3),
                    ),
                  ),
                  child: Text(
                    currentQuestion.question,
                    style: GoogleFonts.inter(
                      fontSize: 16,
                      color: Colors.white,
                      fontWeight: FontWeight.w500,
                      height: 1.5,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),

                const SizedBox(height: 24),

                // Answer display
                if (_showRoundResult)
                  _buildRoundResult(currentQuestion)
                else
                  Column(
                    children: [
                      // Answer input
                      Container(
                        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 24),
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [Color(0xFF1E293B), Color(0xFF334155)],
                          ),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(
                            color: const Color(0xFF3B82F6).withOpacity(0.5),
                            width: 2,
                          ),
                        ),
                        child: Text(
                          _playerAnswer.isEmpty ? '?' : _playerAnswer,
                          style: GoogleFonts.inter(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                            color: const Color(0xFFFBBF24),
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),

                      const SizedBox(height: 24),

                      // Number pad
                      _buildNumberPad(),

                      const SizedBox(height: 16),

                      // Submit button
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: _playerAnswer.isNotEmpty
                              ? () => _submitAnswer()
                              : null,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFF10B981),
                            padding: const EdgeInsets.symmetric(vertical: 16),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(12),
                            ),
                          ),
                          child: const Text(
                            'Beküldés',
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildScoreCard(String label, int score, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: color.withOpacity(0.2),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: color.withOpacity(0.5),
        ),
      ),
      child: Column(
        children: [
          Text(
            label,
            style: TextStyle(
              color: color.withOpacity(0.8),
              fontSize: 12,
            ),
          ),
          Text(
            '$score',
            style: TextStyle(
              color: color,
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildNumberPad() {
    return Column(
      children: [
        for (int row = 0; row < 3; row++)
          Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Row(
              children: [
                for (int col = 1; col <= 3; col++)
                  Expanded(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 4),
                      child: _buildNumberButton('${row * 3 + col}'),
                    ),
                  ),
              ],
            ),
          ),
        Row(
          children: [
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                child: _buildNumberButton('C', isSpecial: true),
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                child: _buildNumberButton('0'),
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                child: _buildNumberButton('⌫', isSpecial: true),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildNumberButton(String value, {bool isSpecial = false}) {
    return ElevatedButton(
      onPressed: () {
        if (value == 'C') {
          _handleClear();
        } else if (value == '⌫') {
          _handleBackspace();
        } else {
          _handleNumberClick(value);
        }
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: isSpecial
            ? const Color(0xFFDC2626).withOpacity(0.8)
            : const Color(0xFF334155),
        padding: const EdgeInsets.symmetric(vertical: 16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      child: Text(
        value,
        style: const TextStyle(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: Colors.white,
        ),
      ),
    );
  }

  Widget _buildRoundResult(ArenaQuestion question) {
    final playerNum = int.tryParse(_playerAnswer) ?? 0;
    final playerDiff = (playerNum - question.correctAnswer).abs();
    final opponentDiff = (_opponentAnswer - question.correctAnswer).abs();
    final playerWon = playerDiff < opponentDiff;

    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: playerWon
              ? [const Color(0xFF10B981).withOpacity(0.2), const Color(0xFF059669).withOpacity(0.3)]
              : [const Color(0xFFEF4444).withOpacity(0.2), const Color(0xFFDC2626).withOpacity(0.3)],
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: playerWon ? const Color(0xFF10B981) : const Color(0xFFEF4444),
        ),
      ),
      child: Column(
        children: [
          Icon(
            playerWon ? Icons.check_circle : Icons.cancel,
            size: 48,
            color: playerWon ? const Color(0xFF10B981) : const Color(0xFFEF4444),
          ),
          const SizedBox(height: 16),
          Text(
            playerWon ? 'Nyertél!' : 'Vesztettél!',
            style: GoogleFonts.inter(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 24),
          _buildResultRow('Helyes válasz:', '${question.correctAnswer}', const Color(0xFFFBBF24)),
          const SizedBox(height: 8),
          _buildResultRow('Te:', '$playerNum (±$playerDiff)', const Color(0xFF3B82F6)),
          const SizedBox(height: 8),
          _buildResultRow('Ellenfél:', '$_opponentAnswer (±$opponentDiff)', const Color(0xFFEF4444)),
        ],
      ),
    );
  }

  Widget _buildResultRow(String label, String value, Color color) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: const TextStyle(
            color: Color(0xFF94A3B8),
            fontSize: 14,
          ),
        ),
        Text(
          value,
          style: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: color,
          ),
        ),
      ],
    );
  }

  Widget _buildResultView() {
    final won = _playerScore > _opponentScore;
    final draw = _playerScore == _opponentScore;

    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Result icon
          Container(
            padding: const EdgeInsets.all(32),
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              gradient: LinearGradient(
                colors: won
                    ? [const Color(0xFF10B981), const Color(0xFF059669)]
                    : draw
                        ? [const Color(0xFFFBBF24), const Color(0xFFF59E0B)]
                        : [const Color(0xFFEF4444), const Color(0xFFDC2626)],
              ),
            ),
            child: Icon(
              won ? Icons.emoji_events : draw ? Icons.handshake : Icons.sentiment_dissatisfied,
              size: 64,
              color: Colors.white,
            ),
          ),

          const SizedBox(height: 24),

          // Result title
          Text(
            won ? 'Győzelem!' : draw ? 'Döntetlen!' : 'Vereség!',
            style: GoogleFonts.inter(
              fontSize: 32,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),

          const SizedBox(height: 16),

          // Score
          Text(
            '$_playerScore - $_opponentScore',
            style: GoogleFonts.inter(
              fontSize: 48,
              fontWeight: FontWeight.bold,
              color: won ? const Color(0xFF10B981) : draw ? const Color(0xFFFBBF24) : const Color(0xFFEF4444),
            ),
          ),

          const SizedBox(height: 32),

          // Rewards
          if (won) ...[
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: const Color(0xFF1E293B),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.monetization_on, color: Color(0xFFFBBF24), size: 24),
                      const SizedBox(width: 8),
                      Text(
                        '+$_betAmount arany',
                        style: GoogleFonts.inter(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: const Color(0xFFFBBF24),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '+${GameConfig.defaultConfig.xpPerArenaWin * _selectedBooks.length} XP',
                    style: GoogleFonts.inter(
                      fontSize: 16,
                      color: const Color(0xFF3B82F6),
                    ),
                  ),
                ],
              ),
            ),
          ],

          const SizedBox(height: 32),

          // Back button
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {
                setState(() {
                  _gameState = 'betting';
                  _playerScore = 0;
                  _opponentScore = 0;
                  _roundResults = [];
                });
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF7C3AED),
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: const Text(
                'Vissza a Küzdőtérbe',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
