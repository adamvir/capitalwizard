import 'package:flutter/material.dart';
import 'dart:math' as math;

/// Animated popup widget shown when player reaches a streak milestone
class StreakCelebration extends StatefulWidget {
  final int streakCount;
  final VoidCallback onContinue;

  const StreakCelebration({
    super.key,
    required this.streakCount,
    required this.onContinue,
  });

  @override
  State<StreakCelebration> createState() => _StreakCelebrationState();
}

class _StreakCelebrationState extends State<StreakCelebration>
    with TickerProviderStateMixin {
  late AnimationController _scaleController;
  late AnimationController _flameController;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();

    _scaleController = AnimationController(
      duration: const Duration(milliseconds: 800),
      vsync: this,
    );

    _flameController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _scaleAnimation = CurvedAnimation(
      parent: _scaleController,
      curve: Curves.elasticOut,
    );

    // Start animations
    _scaleController.forward();
    _flameController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _scaleController.dispose();
    _flameController.dispose();
    super.dispose();
  }

  String _getStreakMessage() {
    if (widget.streakCount >= 365) {
      return 'Hihetetlen! Egy teljes év!';
    } else if (widget.streakCount >= 200) {
      return 'Fantasztikus! Elképesztő kitartás!';
    } else if (widget.streakCount >= 100) {
      return 'Csodálatos! 100+ nap!';
    } else if (widget.streakCount >= 50) {
      return 'Kiváló! 50+ nap sorozat!';
    } else if (widget.streakCount >= 30) {
      return 'Nagyszerű! Egy teljes hónap!';
    } else if (widget.streakCount >= 14) {
      return 'Szuper! Két hét kitartás!';
    } else if (widget.streakCount >= 7) {
      return 'Brávó! Egy teljes hét!';
    } else {
      return 'Kitartás! Folytatod!';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.black.withValues(alpha: 0.85),
      child: Stack(
        children: [
          // Animated flames in background
          AnimatedBuilder(
            animation: _flameController,
            builder: (context, child) {
              return CustomPaint(
                painter: FlamePainter(_flameController.value),
                size: Size.infinite,
              );
            },
          ),
          // Main content
          Center(
            child: ScaleTransition(
              scale: _scaleAnimation,
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 32),
                padding: const EdgeInsets.all(32),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      Color(0xFFDC2626), // red
                      Color(0xFFF59E0B), // amber
                      Color(0xFFFBBF24), // yellow
                    ],
                  ),
                  borderRadius: BorderRadius.circular(24),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFFF59E0B).withValues(alpha: 0.6),
                      blurRadius: 30,
                      spreadRadius: 10,
                    ),
                  ],
                  border: Border.all(
                    color: Colors.white.withValues(alpha: 0.3),
                    width: 2,
                  ),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Flame icon with pulsing animation
                    AnimatedBuilder(
                      animation: _flameController,
                      builder: (context, child) {
                        return Transform.scale(
                          scale: 1.0 + (_flameController.value * 0.1),
                          child: Container(
                            width: 80,
                            height: 80,
                            decoration: BoxDecoration(
                              color: Colors.white.withValues(alpha: 0.2),
                              shape: BoxShape.circle,
                            ),
                            child: const Center(
                              child: Text(
                                '🔥',
                                style: TextStyle(fontSize: 50),
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                    const SizedBox(height: 24),
                    // Title
                    const Text(
                      'SOROZAT MÉRFÖLDKŐ!',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 2,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 16),
                    // Streak count
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 24,
                        vertical: 12,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.white.withValues(alpha: 0.2),
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Text(
                            '🔥',
                            style: TextStyle(fontSize: 32),
                          ),
                          const SizedBox(width: 12),
                          Text(
                            '${widget.streakCount} NAP',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 32,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),
                    // Message
                    Text(
                      _getStreakMessage(),
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 8),
                    const Text(
                      'Folytasd a sorozatot és érj el újabb csúcsokat!',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 14,
                        height: 1.5,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 32),
                    // Continue button
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: widget.onContinue,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.white,
                          foregroundColor: const Color(0xFFDC2626),
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          elevation: 0,
                        ),
                        child: const Text(
                          'Folytatás',
                          style: TextStyle(
                            fontSize: 18,
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
      ),
    );
  }
}

/// Custom painter for animated flame effect in background
class FlamePainter extends CustomPainter {
  final double progress;
  final List<FlameParticle> particles;

  FlamePainter(this.progress) : particles = _generateFlames();

  static List<FlameParticle> _generateFlames() {
    final random = math.Random(123); // Fixed seed
    return List.generate(20, (index) {
      return FlameParticle(
        x: random.nextDouble(),
        y: 0.8 + random.nextDouble() * 0.2,
        size: 20 + random.nextDouble() * 40,
        speed: 0.3 + random.nextDouble() * 0.4,
        phase: random.nextDouble() * math.pi * 2,
      );
    });
  }

  @override
  void paint(Canvas canvas, Size size) {
    for (final particle in particles) {
      final opacity = (1.0 - (progress * particle.speed % 1.0)) * 0.3;

      final paint = Paint()
        ..shader = RadialGradient(
          colors: [
            Color.lerp(
              const Color(0xFFFBBF24),
              const Color(0xFFDC2626),
              progress,
            )!.withValues(alpha: opacity),
            Colors.transparent,
          ],
        ).createShader(Rect.fromCircle(
          center: Offset(
            particle.x * size.width,
            size.height -
                (progress * particle.speed % 1.0) * size.height * 0.5 -
                particle.y * size.height,
          ),
          radius: particle.size,
        ))
        ..style = PaintingStyle.fill;

      final x = particle.x * size.width +
          math.sin(particle.phase + progress * math.pi * 4) * 20;
      final y = size.height -
          (progress * particle.speed % 1.0) * size.height * 0.5 -
          particle.y * size.height;

      canvas.drawCircle(
        Offset(x, y),
        particle.size,
        paint,
      );
    }
  }

  @override
  bool shouldRepaint(FlamePainter oldDelegate) => true;
}

class FlameParticle {
  final double x;
  final double y;
  final double size;
  final double speed;
  final double phase;

  FlameParticle({
    required this.x,
    required this.y,
    required this.size,
    required this.speed,
    required this.phase,
  });
}
