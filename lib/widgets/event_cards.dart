import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/game_state.dart';
import '../providers/game_provider.dart';

class EventCards extends StatelessWidget {
  final VoidCallback? onArenaClick;

  const EventCards({
    Key? key,
    this.onArenaClick,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Positioned(
      right: 8,
      top: 112,
      child: Column(
        children: [
          _buildArenaCard(context),
          const SizedBox(height: 8),
          _buildTemplomosCard(),
        ],
      ),
    );
  }

  Widget _buildArenaCard(BuildContext context) {
    return Consumer<GameProvider>(
      builder: (context, gameProvider, child) {
        final subscriptionTier = gameProvider.gameState.subscriptionTier;
        final remainingGames = _getRemainingGames(subscriptionTier);

        return GestureDetector(
          onTap: onArenaClick,
          child: Container(
            width: 160,
            height: 64,
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Color(0xFFD97706), Color(0xFFEA580C)], // yellow-600 to orange-600
              ),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(
                color: const Color(0xFFFBBF24), // yellow-400
                width: 2,
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.3),
                  blurRadius: 8,
                ),
              ],
            ),
            child: Stack(
              children: [
                // Dark overlay
                Container(
                  decoration: BoxDecoration(
                    color: Colors.black.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(6),
                  ),
                ),
                // Content
                Padding(
                  padding: const EdgeInsets.all(8),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Row(
                        children: [
                          Icon(
                            Icons.emoji_events,
                            size: 20,
                            color: Color(0xFFFDE047), // yellow-300
                          ),
                          SizedBox(width: 4),
                          Text(
                            'Küzdőtér',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                              shadows: [
                                Shadow(
                                  color: Colors.black54,
                                  blurRadius: 4,
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      Row(
                        children: [
                          Icon(
                            subscriptionTier == SubscriptionTier.free
                                ? Icons.emoji_events
                                : Icons.all_inclusive,
                            size: 12,
                            color: Colors.white,
                          ),
                          const SizedBox(width: 4),
                          Text(
                            subscriptionTier == SubscriptionTier.free
                                ? '$remainingGames játék'
                                : 'Korlátlan',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 12,
                              shadows: [
                                Shadow(
                                  color: Colors.black54,
                                  blurRadius: 4,
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
                // Character illustration
                Positioned(
                  right: 0,
                  bottom: 0,
                  child: Container(
                    width: 48,
                    height: 48,
                    decoration: const BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [Color(0xFF3B82F6), Color(0xFF7C3AED)], // blue-500 to purple-600
                      ),
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(48),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildTemplomosCard() {
    return Container(
      width: 160,
      height: 64,
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF2563EB), Color(0xFF06B6D4)], // blue-600 to cyan-500
        ),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: const Color(0xFF22D3EE), // cyan-400
          width: 2,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.3),
            blurRadius: 8,
          ),
        ],
      ),
      child: Stack(
        children: [
          // Dark overlay
          Container(
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.2),
              borderRadius: BorderRadius.circular(6),
            ),
          ),
          // Content
          const Padding(
            padding: EdgeInsets.all(8),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Templomos',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    shadows: [
                      Shadow(
                        color: Colors.black54,
                        blurRadius: 4,
                      ),
                    ],
                  ),
                ),
                Row(
                  children: [
                    Icon(
                      Icons.access_time,
                      size: 12,
                      color: Colors.white,
                    ),
                    SizedBox(width: 4),
                    Text(
                      '9h 6m',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 12,
                        shadows: [
                          Shadow(
                            color: Colors.black54,
                            blurRadius: 4,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          // Dragon illustration
          Positioned(
            right: 0,
            bottom: 0,
            child: Container(
              width: 48,
              height: 48,
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [Color(0xFF7C3AED), Color(0xFFEC4899)], // purple-500 to pink-600
                ),
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(48),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  int _getRemainingGames(SubscriptionTier tier) {
    // TODO: Implement actual daily game tracking
    // For now, return mock data
    if (tier != SubscriptionTier.free) {
      return -1; // -1 represents unlimited
    }
    return 3; // Mock: 3 games remaining for free tier
  }
}
