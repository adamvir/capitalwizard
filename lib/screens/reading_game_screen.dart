import 'package:flutter/material.dart';
import '../models/lesson_model.dart';
import '../config/app_theme.dart';

enum ReadingGameState { reading, questions, result }

class ReadingGameScreen extends StatefulWidget {
  final int lessonNumber;
  final Lesson lessonData;
  final VoidCallback? onBackToHome;
  final VoidCallback? onWin;

  const ReadingGameScreen({
    Key? key,
    required this.lessonNumber,
    required this.lessonData,
    this.onBackToHome,
    this.onWin,
  }) : super(key: key);

  @override
  State<ReadingGameScreen> createState() => _ReadingGameScreenState();
}

class _ReadingGameScreenState extends State<ReadingGameScreen> {
  ReadingGameState _gameState = ReadingGameState.reading;
  List<TextEditingController> _controllers = [];
  List<bool> _results = [];
  double _score = 0;

  @override
  void initState() {
    super.initState();
    _controllers = List.generate(
      widget.lessonData.reading.questions.length,
      (_) => TextEditingController(),
    );
  }

  @override
  void dispose() {
    for (var controller in _controllers) {
      controller.dispose();
    }
    super.dispose();
  }

  bool _checkAnswer(String userAnswer, ReadingQuestion question) {
    final normalized = userAnswer.toLowerCase().trim();
    return question.keywords.any(
      (keyword) => normalized.contains(keyword.toLowerCase()),
    );
  }

  void _handleReadComplete() {
    setState(() {
      _gameState = ReadingGameState.questions;
    });
  }

  void _handleSubmitAnswers() {
    final results = <bool>[];
    for (int i = 0; i < widget.lessonData.reading.questions.length; i++) {
      final isCorrect = _checkAnswer(
        _controllers[i].text,
        widget.lessonData.reading.questions[i],
      );
      results.add(isCorrect);
    }

    final correctCount = results.where((r) => r).length;
    final percentage = (correctCount / results.length) * 100;

    setState(() {
      _results = results;
      _score = percentage;
      _gameState = ReadingGameState.result;
    });
  }

  void _handleRetry() {
    setState(() {
      _results = [];
      _score = 0;
      _gameState = ReadingGameState.questions;
      for (var controller in _controllers) {
        controller.clear();
      }
    });
  }

  void _handleFinish() {
    final correctCount = _results.where((r) => r).length;
    final minRequired = (widget.lessonData.reading.questions.length * 0.8).ceil();

    if (correctCount >= minRequired) {
      // Win case
      if (widget.onWin != null) {
        widget.onWin!();
      } else {
        // Fallback: just go back
        Navigator.of(context).pop();
      }
    } else {
      // Lose case
      if (widget.onBackToHome != null) {
        widget.onBackToHome!();
      } else {
        // Fallback: just go back
        Navigator.of(context).pop();
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: AppTheme.backgroundGradient,
        ),
        child: SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              children: [
                _buildHeader(),
                const SizedBox(height: 16),
                Expanded(
                  child: _buildContent(),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        GestureDetector(
          onTap: widget.onBackToHome,
          child: Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: AppTheme.darkCard.withOpacity(0.6),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(
                color: Colors.grey.shade700.withOpacity(0.5),
              ),
            ),
            child: const Icon(
              Icons.arrow_back,
              color: Colors.white,
              size: 20,
            ),
          ),
        ),
        Row(
          children: [
            const Icon(Icons.book, color: Colors.white, size: 20),
            const SizedBox(width: 8),
            Text(
              '${widget.lessonNumber}. Lecke - Szövegértés',
              style: const TextStyle(
                color: Colors.white,
                fontSize: 14,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildContent() {
    switch (_gameState) {
      case ReadingGameState.reading:
        return _buildReadingView();
      case ReadingGameState.questions:
        return _buildQuestionsView();
      case ReadingGameState.result:
        return _buildResultView();
    }
  }

  Widget _buildReadingView() {
    return Column(
      children: [
        Expanded(
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppTheme.darkCard.withOpacity(0.6),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: Colors.grey.shade700.withOpacity(0.5),
              ),
            ),
            child: SingleChildScrollView(
              child: Column(
                children: [
                  Text(
                    widget.lessonData.reading.title,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      color: Color(0xFFD8B4FE), // purple-300
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 16),
                  ...widget.lessonData.reading.content
                      .split('\n\n')
                      .map((paragraph) => Padding(
                            padding: const EdgeInsets.only(bottom: 16),
                            child: Text(
                              paragraph,
                              style: TextStyle(
                                color: Colors.grey.shade300,
                                fontSize: 14,
                                height: 1.6,
                              ),
                            ),
                          ))
                      .toList(),
                ],
              ),
            ),
          ),
        ),
        const SizedBox(height: 16),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: _handleReadComplete,
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF3B82F6), // blue-500
              padding: const EdgeInsets.symmetric(vertical: 16),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            child: const Text(
              'Elolvastam',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildQuestionsView() {
    return Column(
      children: [
        Expanded(
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppTheme.darkCard.withOpacity(0.6),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: Colors.grey.shade700.withOpacity(0.5),
              ),
            ),
            child: SingleChildScrollView(
              child: Column(
                children: [
                  const Text(
                    'Válaszolj a kérdésekre!',
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Color(0xFFD8B4FE), // purple-300
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 20),
                  ...List.generate(
                    widget.lessonData.reading.questions.length,
                    (index) {
                      final question = widget.lessonData.reading.questions[index];
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              '${index + 1}. ${question.question}',
                              style: TextStyle(
                                color: Colors.grey.shade300,
                                fontSize: 14,
                              ),
                            ),
                            const SizedBox(height: 8),
                            TextField(
                              controller: _controllers[index],
                              style: const TextStyle(color: Colors.white),
                              decoration: InputDecoration(
                                hintText: 'Válaszod...',
                                hintStyle: TextStyle(color: Colors.grey.shade500),
                                filled: true,
                                fillColor: Colors.grey.shade800.withOpacity(0.6),
                                border: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(8),
                                  borderSide: BorderSide(
                                    color: Colors.grey.shade700.withOpacity(0.5),
                                  ),
                                ),
                                enabledBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(8),
                                  borderSide: BorderSide(
                                    color: Colors.grey.shade700.withOpacity(0.5),
                                  ),
                                ),
                                focusedBorder: OutlineInputBorder(
                                  borderRadius: BorderRadius.circular(8),
                                  borderSide: const BorderSide(
                                    color: AppTheme.primaryPurple,
                                    width: 2,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
        const SizedBox(height: 16),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: _handleSubmitAnswers,
            style: ElevatedButton.styleFrom(
              backgroundColor: AppTheme.primaryPurple,
              padding: const EdgeInsets.symmetric(vertical: 16),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12),
              ),
            ),
            child: const Text(
              'Ellenőrzés',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildResultView() {
    final passed = _score >= 80;

    return Column(
      children: [
        Expanded(
          child: Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppTheme.darkCard.withOpacity(0.6),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                color: Colors.grey.shade700.withOpacity(0.5),
              ),
            ),
            child: SingleChildScrollView(
              child: Column(
                children: [
                  Text(
                    passed ? '🎉 Gratulálunk!' : '😔 Próbáld újra!',
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    '${_score.toStringAsFixed(0)}%',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 48,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '${_results.where((r) => r).length} helyes válasz ${_results.length}-ből',
                    style: TextStyle(
                      color: Colors.grey.shade300,
                      fontSize: 14,
                    ),
                  ),
                  const SizedBox(height: 20),
                  // Results for each question
                  ...List.generate(
                    widget.lessonData.reading.questions.length,
                    (index) {
                      final question = widget.lessonData.reading.questions[index];
                      final isCorrect = _results[index];
                      return Container(
                        margin: const EdgeInsets.only(bottom: 12),
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: isCorrect
                              ? Colors.green.withOpacity(0.2)
                              : Colors.red.withOpacity(0.2),
                          borderRadius: BorderRadius.circular(8),
                          border: Border.all(
                            color: isCorrect
                                ? Colors.green.withOpacity(0.5)
                                : Colors.red.withOpacity(0.5),
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Icon(
                                  isCorrect ? Icons.check_circle : Icons.cancel,
                                  color: isCorrect ? Colors.green : Colors.red,
                                  size: 20,
                                ),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: Text(
                                    question.question,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 12,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Válaszod: ${_controllers[index].text}',
                              style: TextStyle(
                                color: Colors.grey.shade300,
                                fontSize: 12,
                              ),
                            ),
                            if (!isCorrect) ...[
                              const SizedBox(height: 4),
                              Text(
                                'Helyes válasz: ${question.answer}',
                                style: const TextStyle(
                                  color: Colors.green,
                                  fontSize: 12,
                                ),
                              ),
                            ],
                          ],
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            if (!passed)
              Expanded(
                child: ElevatedButton(
                  onPressed: _handleRetry,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.grey.shade700,
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: const Text(
                    'Újra',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            if (!passed) const SizedBox(width: 12),
            Expanded(
              child: ElevatedButton(
                onPressed: _handleFinish,
                style: ElevatedButton.styleFrom(
                  backgroundColor:
                      passed ? Colors.green : AppTheme.primaryPurple,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                ),
                child: Text(
                  passed ? 'Tovább' : 'Vissza',
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
