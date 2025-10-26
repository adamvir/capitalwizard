import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../config/app_theme.dart';
import '../providers/game_provider.dart';
import '../models/game_state.dart';

class TopBar extends StatelessWidget {
  final VoidCallback? onAvatarClick;

  const TopBar({
    Key? key,
    this.onAvatarClick,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Consumer<GameProvider>(
      builder: (context, gameProvider, child) {
        final state = gameProvider.gameState;

        return Padding(
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              // Left: Player Info Card
              Expanded(
                child: _buildPlayerInfo(context, state),
              ),
              const SizedBox(width: 12),
              // Right: Stage Progress Card
              _buildStageProgress(context, state),
            ],
          ),
        );
      },
    );
  }

  Widget _buildPlayerInfo(BuildContext context, GameState state) {
    return Container(
      padding: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppTheme.darkCard.withOpacity(0.95),
            AppTheme.darkBg.withOpacity(0.95),
          ],
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.shade700.withOpacity(0.5)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            blurRadius: 12,
            spreadRadius: 2,
          ),
        ],
      ),
      child: Row(
        children: [
          // Avatar
          GestureDetector(
            onTap: onAvatarClick,
            child: Container(
              width: 56,
              height: 56,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: Colors.cyanAccent.withOpacity(0.8),
                  width: 2,
                ),
                gradient: const LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [AppTheme.primaryPurple, Colors.pinkAccent],
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.cyan.withOpacity(0.3),
                    blurRadius: 8,
                  ),
                ],
              ),
              child: const Center(
                child: Icon(Icons.add, size: 32, color: Colors.white),
              ),
            ),
          ),
          const SizedBox(width: 10),
          // Info Section
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                // Level Progress
                Row(
                  children: [
                    ShaderMask(
                      shaderCallback: (bounds) => const LinearGradient(
                        colors: [Colors.cyanAccent, Colors.blueAccent],
                      ).createShader(bounds),
                      child: Text(
                        'Szint ${state.playerLevel}.',
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: Colors.white,
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Container(
                        height: 8,
                        decoration: BoxDecoration(
                          color: Colors.grey.shade800.withOpacity(0.5),
                          borderRadius: BorderRadius.circular(4),
                          border: Border.all(
                            color: Colors.grey.shade700.withOpacity(0.3),
                          ),
                        ),
                        child: FractionallySizedBox(
                          widthFactor: state.playerLevel == 0 ? 0 : 0.3,
                          alignment: Alignment.centerLeft,
                          child: Container(
                            decoration: BoxDecoration(
                              gradient: const LinearGradient(
                                colors: [
                                  Color(0xFFFBBF24),
                                  Color(0xFFFB923C),
                                  Color(0xFFF97316),
                                ],
                              ),
                              borderRadius: BorderRadius.circular(4),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.orange.withOpacity(0.5),
                                  blurRadius: 4,
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                // Currency
                Row(
                  children: [
                    _buildCurrencyChip(
                      icon: Icons.monetization_on,
                      value: state.coins.toString(),
                      color: AppTheme.goldCoin,
                    ),
                    const SizedBox(width: 12),
                    _buildCurrencyChip(
                      icon: Icons.diamond,
                      value: state.gems.toString(),
                      color: AppTheme.diamondGem,
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCurrencyChip({
    required IconData icon,
    required String value,
    required Color color,
  }) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 20,
          height: 20,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                color,
                color.withOpacity(0.7),
              ],
            ),
            shape: BoxShape.circle,
            border: Border.all(
              color: color.withOpacity(0.4),
              width: 1,
            ),
            boxShadow: [
              BoxShadow(
                color: color.withOpacity(0.3),
                blurRadius: 4,
              ),
            ],
          ),
          child: Icon(icon, size: 12, color: Colors.white),
        ),
        const SizedBox(width: 4),
        Text(
          value,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 12,
            fontWeight: FontWeight.w500,
            shadows: [
              Shadow(
                blurRadius: 2,
                color: Colors.black45,
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildStageProgress(BuildContext context, GameState state) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            AppTheme.darkCard.withOpacity(0.8),
            AppTheme.darkBg.withOpacity(0.8),
          ],
        ),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.grey.shade700.withOpacity(0.3)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Stage Path - Zigzag pattern
          SizedBox(
            width: 160,
            height: 55,
            child: Stack(
              children: [
                // Draw path dots
                for (int i = 0; i < 6; i++) _buildPathNode(i, state.progressPosition),
              ],
            ),
          ),
          const SizedBox(height: 8),
          // Stage Info
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: Colors.cyanAccent.withOpacity(0.2),
                  border: Border.all(color: Colors.cyanAccent.withOpacity(0.3)),
                  borderRadius: BorderRadius.circular(4),
                ),
                child: const Text(
                  'Nehézség',
                  style: TextStyle(
                    color: Colors.cyanAccent,
                    fontSize: 10,
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Text(
                'Szakasz ${state.currentStageInSection}/6',
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 10,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildPathNode(int index, int currentPosition) {
    final positions = [
      const Offset(10, 35),
      const Offset(40, 15),
      const Offset(70, 35),
      const Offset(100, 15),
      const Offset(130, 35),
      const Offset(150, 10),
    ];

    final isActive = index < currentPosition;
    final isCurrent = index == currentPosition;
    final isGem = index == 5;

    return Positioned(
      left: positions[index].dx,
      top: positions[index].dy,
      child: Container(
        width: isGem ? 20 : (isCurrent ? 12 : 10),
        height: isGem ? 20 : (isCurrent ? 12 : 10),
        decoration: BoxDecoration(
          shape: isGem ? BoxShape.circle : BoxShape.rectangle,
          gradient: isGem
              ? const LinearGradient(
                  colors: [AppTheme.diamondGem, Colors.purple],
                )
              : (isCurrent
                  ? const LinearGradient(
                      colors: [Colors.white, Colors.white70],
                    )
                  : (isActive
                      ? const LinearGradient(
                          colors: [Colors.red, Colors.redAccent],
                        )
                      : null)),
          color: !isGem && !isCurrent && !isActive
              ? Colors.grey.shade700.withOpacity(0.7)
              : null,
          boxShadow: isCurrent
              ? [
                  BoxShadow(
                    color: Colors.white.withOpacity(0.5),
                    blurRadius: 8,
                  ),
                ]
              : null,
        ),
        child: isGem
            ? const Icon(Icons.diamond, size: 12, color: Colors.white)
            : null,
      ),
    );
  }
}
