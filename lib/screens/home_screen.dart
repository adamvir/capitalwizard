import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/game_provider.dart';
import '../widgets/top_bar.dart';
import '../widgets/player_status_bar.dart';
import '../widgets/side_menu.dart';
import '../widgets/event_cards.dart';
import '../widgets/bottom_navigation.dart';
import '../models/game_state.dart';
import 'lesson_page.dart';
import 'university_page.dart';
import 'profile_page.dart';
import 'arena_page.dart';
import 'leaderboard_page.dart';
import 'news_page.dart';
import 'subscription_page.dart';
import 'avatar_selector_page.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _bottomNavIndex = 0;

  void _onBottomNavTap(int index) {
    setState(() {
      _bottomNavIndex = index;
    });

    // Navigate to the appropriate page based on bottom nav index
    // Bottom nav tabs: 0=Egyetem, 1=Diák, 2=Küzdőtér, 3=Helyezés, 4=Hírek, 5=Premium
    Widget page;
    switch (index) {
      case 0:
        page = const UniversityPage();
        break;
      case 1:
        page = const ProfilePage();
        break;
      case 2:
        page = const ArenaPage();
        break;
      case 3:
        page = const LeaderboardPage();
        break;
      case 4:
        page = const NewsPage();
        break;
      case 5:
        page = const SubscriptionPage();
        break;
      default:
        return; // Exit early if invalid index
    }

    Navigator.of(context).push(
      MaterialPageRoute(builder: (context) => page),
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
              Color(0xFF0F172A), // slate-900
              Color(0xFF581C87), // purple-900/40
              Color(0xFF0F172A), // slate-900
            ],
          ),
        ),
        child: Stack(
          children: [
            // Background decorative elements (crystals)
            _buildBackgroundDecorations(),

            // Main content
            SafeArea(
              child: Consumer<GameProvider>(
                builder: (context, gameProvider, child) {
                  final gameState = gameProvider.gameState;

                  return Stack(
                    children: [
                      Column(
                        children: [
                          // Top Bar with coins, gems, avatar, level
                          TopBar(
                            onAvatarClick: () {
                              // Navigate to avatar selector
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) => const AvatarSelectorPage(),
                                ),
                              );
                            },
                          ),

                          // Middle section - Game world
                          Expanded(
                            child: Stack(
                              children: [
                                // Left side menu
                                const SideMenu(),

                                // Right side event cards
                                EventCards(
                                  onArenaClick: () {
                                    Navigator.of(context).push(
                                      MaterialPageRoute(
                                        builder: (context) => const ArenaPage(),
                                      ),
                                    );
                                  },
                                ),

                                // Center message when no books rented
                                if (gameProvider.getActiveRentedBooks().isEmpty)
                                  Center(
                                    child: GestureDetector(
                                      onTap: () {
                                        Navigator.of(context).push(
                                          MaterialPageRoute(
                                            builder: (context) => const UniversityPage(),
                                          ),
                                        );
                                      },
                                      child: Container(
                                        padding: const EdgeInsets.symmetric(
                                          horizontal: 32,
                                          vertical: 48,
                                        ),
                                        child: Column(
                                          mainAxisSize: MainAxisSize.min,
                                          children: [
                                            // Book icon with glow
                                            Container(
                                              padding: const EdgeInsets.all(20),
                                              decoration: BoxDecoration(
                                                shape: BoxShape.circle,
                                                boxShadow: [
                                                  BoxShadow(
                                                    color: const Color(0xFFFBBF24).withOpacity(0.3),
                                                    blurRadius: 40,
                                                    spreadRadius: 10,
                                                  ),
                                                ],
                                              ),
                                              child: const Icon(
                                                Icons.menu_book_rounded,
                                                size: 64,
                                                color: Color(0xFFFBBF24),
                                              ),
                                            ),
                                            const SizedBox(height: 24),
                                            // Message text
                                            Text(
                                              'Nincs kölcsönzött',
                                              style: TextStyle(
                                                color: Colors.white.withOpacity(0.9),
                                                fontSize: 18,
                                                fontWeight: FontWeight.w400,
                                              ),
                                            ),
                                            const SizedBox(height: 8),
                                            Container(
                                              decoration: BoxDecoration(
                                                gradient: const LinearGradient(
                                                  colors: [
                                                    Color(0xFFFBBF24),
                                                    Color(0xFFF59E0B),
                                                    Color(0xFFDC2626),
                                                  ],
                                                ),
                                                borderRadius: BorderRadius.circular(8),
                                              ),
                                              padding: const EdgeInsets.symmetric(
                                                horizontal: 16,
                                                vertical: 4,
                                              ),
                                              child: const Text(
                                                'tankönyv',
                                                style: TextStyle(
                                                  color: Colors.white,
                                                  fontSize: 24,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                            ),
                                            const SizedBox(height: 12),
                                            Text(
                                              'Kölcsönözz ki könyvet a könyvtárból!',
                                              style: TextStyle(
                                                color: Colors.white.withOpacity(0.75),
                                                fontSize: 14,
                                              ),
                                              textAlign: TextAlign.center,
                                            ),
                                          ],
                                        ),
                                      ),
                                    ),
                                  ),
                              ],
                            ),
                          ),

                          // Tip Bar (optional)
                          Container(
                            margin: const EdgeInsets.symmetric(
                              horizontal: 16,
                              vertical: 8,
                            ),
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              gradient: LinearGradient(
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                                colors: [
                                  const Color(0xFF7C3AED).withOpacity(0.3),
                                  const Color(0xFF581C87).withOpacity(0.3),
                                ],
                              ),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(
                                color: const Color(0xFF9333EA).withOpacity(0.3),
                                width: 1,
                              ),
                            ),
                            child: const Row(
                              children: [
                                Icon(
                                  Icons.lightbulb_outline,
                                  color: Color(0xFFFBBF24),
                                  size: 20,
                                ),
                                SizedBox(width: 12),
                                Expanded(
                                  child: Text(
                                    'Tipp: befektetési időhorizont: Minél hosszabb, annál több kockázatot vállalhatsz.',
                                    style: TextStyle(
                                      color: Colors.white70,
                                      fontSize: 12,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),

                          // Player Status Bar at bottom
                          PlayerStatusBar(
                            playerName: gameProvider.playerName.isEmpty
                                ? 'Vendég'
                                : gameProvider.playerName,
                            subscriptionTier: gameState.subscriptionTier,
                            streak: gameProvider.currentStreak,
                            currentXp: gameState.totalXp,
                            xpForNextLevel: 1000, // TODO: Calculate from config
                          ),

                          // Bottom Navigation
                          BottomNavigation(
                            currentIndex: _bottomNavIndex,
                            onTap: _onBottomNavTap,
                          ),
                        ],
                      ),
                    ],
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBackgroundDecorations() {
    return Stack(
      children: [
        // Crystal decorations matching original design
        Positioned(
          bottom: 0,
          left: 0,
          child: Container(
            width: 120,
            height: 150,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topRight,
                end: Alignment.bottomLeft,
                colors: [
                  const Color(0xFF9333EA).withOpacity(0.4),
                  Colors.transparent,
                ],
              ),
              borderRadius: const BorderRadius.only(
                topRight: Radius.circular(100),
              ),
            ),
          ),
        ),

        Positioned(
          bottom: 0,
          right: 0,
          child: Container(
            width: 150,
            height: 120,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  const Color(0xFF3B82F6).withOpacity(0.3),
                  Colors.transparent,
                ],
              ),
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(100),
              ),
            ),
          ),
        ),

        Positioned(
          top: 200,
          left: 100,
          child: Container(
            width: 90,
            height: 120,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topRight,
                end: Alignment.bottomLeft,
                colors: [
                  const Color(0xFF9333EA).withOpacity(0.2),
                  Colors.transparent,
                ],
              ),
              borderRadius: BorderRadius.circular(8),
            ),
          ),
        ),

        // Scattered crystal elements
        Positioned(
          bottom: 200,
          left: 32,
          child: _buildCrystal(60, 75, const Color(0xFF9333EA)),
        ),

        Positioned(
          bottom: 210,
          left: 80,
          child: _buildCrystal(48, 60, const Color(0xFF3B82F6)),
        ),

        Positioned(
          bottom: 200,
          right: 48,
          child: _buildCrystal(75, 90, const Color(0xFFEC4899)),
        ),
      ],
    );
  }

  Widget _buildCrystal(double width, double height, Color color) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            color.withOpacity(0.5),
            color.withOpacity(0.3),
            color.withOpacity(0.2),
          ],
        ),
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(8),
          topRight: Radius.circular(8),
        ),
      ),
    );
  }
}
