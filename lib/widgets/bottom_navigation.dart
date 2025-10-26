import 'package:flutter/material.dart';

/// Custom bottom navigation bar for the app
/// Features 6 tabs with smooth transitions and active state highlighting
class BottomNavigation extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;

  const BottomNavigation({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            Color(0xFF1E293B), // slate-800
            Color(0xFF0F172A), // slate-900
          ],
        ),
        border: Border(
          top: BorderSide(
            color: const Color(0xFF7C3AED).withValues(alpha: 0.3),
            width: 1,
          ),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.3),
            blurRadius: 10,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildNavItem(
                index: 0,
                icon: Icons.school,
                label: 'Egyetem',
              ),
              _buildNavItem(
                index: 1,
                icon: Icons.person,
                label: 'Diák',
              ),
              _buildNavItem(
                index: 2,
                icon: Icons.emoji_events,
                label: 'Küzdőtér',
              ),
              _buildNavItem(
                index: 3,
                icon: Icons.leaderboard,
                label: 'Helyezés',
              ),
              _buildNavItem(
                index: 4,
                icon: Icons.article,
                label: 'Hírek',
              ),
              _buildNavItem(
                index: 5,
                icon: Icons.workspace_premium,
                label: 'Premium',
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavItem({
    required int index,
    required IconData icon,
    required String label,
  }) {
    final isActive = currentIndex == index;

    return Expanded(
      child: InkWell(
        onTap: () => onTap(index),
        borderRadius: BorderRadius.circular(12),
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              // Icon with background
              AnimatedContainer(
                duration: const Duration(milliseconds: 200),
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  gradient: isActive
                      ? const LinearGradient(
                          colors: [
                            Color(0xFF7C3AED), // purple
                            Color(0xFFEC4899), // pink
                          ],
                        )
                      : null,
                  color: isActive ? null : Colors.transparent,
                  borderRadius: BorderRadius.circular(12),
                  boxShadow: isActive
                      ? [
                          BoxShadow(
                            color: const Color(0xFF7C3AED).withValues(alpha: 0.4),
                            blurRadius: 8,
                            spreadRadius: 1,
                          ),
                        ]
                      : null,
                ),
                child: Icon(
                  icon,
                  color: isActive ? Colors.white : const Color(0xFF94A3B8),
                  size: 24,
                ),
              ),
              const SizedBox(height: 4),
              // Label
              AnimatedDefaultTextStyle(
                duration: const Duration(milliseconds: 200),
                style: TextStyle(
                  color: isActive ? Colors.white : const Color(0xFF64748B),
                  fontSize: 10,
                  fontWeight: isActive ? FontWeight.w600 : FontWeight.normal,
                ),
                child: Text(
                  label,
                  textAlign: TextAlign.center,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Alternative compact bottom navigation (optional)
/// Uses icon-only design for space efficiency
class CompactBottomNavigation extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;

  const CompactBottomNavigation({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60,
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        border: Border(
          top: BorderSide(
            color: const Color(0xFF7C3AED).withValues(alpha: 0.3),
            width: 1,
          ),
        ),
      ),
      child: Row(
        children: [
          _buildCompactNavItem(0, Icons.school),
          _buildCompactNavItem(1, Icons.person),
          _buildCompactNavItem(2, Icons.emoji_events),
          _buildCompactNavItem(3, Icons.leaderboard),
          _buildCompactNavItem(4, Icons.article),
          _buildCompactNavItem(5, Icons.workspace_premium),
        ],
      ),
    );
  }

  Widget _buildCompactNavItem(int index, IconData icon) {
    final isActive = currentIndex == index;

    return Expanded(
      child: InkWell(
        onTap: () => onTap(index),
        child: Container(
          decoration: BoxDecoration(
            border: Border(
              top: BorderSide(
                color: isActive
                    ? const Color(0xFF7C3AED)
                    : Colors.transparent,
                width: 3,
              ),
            ),
          ),
          child: Center(
            child: Icon(
              icon,
              color: isActive ? const Color(0xFF7C3AED) : const Color(0xFF64748B),
              size: 24,
            ),
          ),
        ),
      ),
    );
  }
}

/// Bottom navigation with badges (for notifications/updates)
class BottomNavigationWithBadges extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;
  final Map<int, int>? badges; // Map of index to badge count

  const BottomNavigationWithBadges({
    super.key,
    required this.currentIndex,
    required this.onTap,
    this.badges,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            Color(0xFF1E293B),
            Color(0xFF0F172A),
          ],
        ),
        border: Border(
          top: BorderSide(
            color: const Color(0xFF7C3AED).withValues(alpha: 0.3),
            width: 1,
          ),
        ),
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              _buildNavItemWithBadge(0, Icons.school, 'Egyetem'),
              _buildNavItemWithBadge(1, Icons.person, 'Diák'),
              _buildNavItemWithBadge(2, Icons.emoji_events, 'Küzdőtér'),
              _buildNavItemWithBadge(3, Icons.leaderboard, 'Helyezés'),
              _buildNavItemWithBadge(4, Icons.article, 'Hírek'),
              _buildNavItemWithBadge(5, Icons.workspace_premium, 'Premium'),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildNavItemWithBadge(int index, IconData icon, String label) {
    final isActive = currentIndex == index;
    final badgeCount = badges?[index];
    final hasBadge = badgeCount != null && badgeCount > 0;

    return Expanded(
      child: InkWell(
        onTap: () => onTap(index),
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 8),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Stack(
                clipBehavior: Clip.none,
                children: [
                  AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      gradient: isActive
                          ? const LinearGradient(
                              colors: [Color(0xFF7C3AED), Color(0xFFEC4899)],
                            )
                          : null,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Icon(
                      icon,
                      color: isActive ? Colors.white : const Color(0xFF94A3B8),
                      size: 24,
                    ),
                  ),
                  if (hasBadge)
                    Positioned(
                      top: -4,
                      right: -4,
                      child: Container(
                        padding: const EdgeInsets.all(4),
                        decoration: const BoxDecoration(
                          color: Color(0xFFDC2626),
                          shape: BoxShape.circle,
                        ),
                        constraints: const BoxConstraints(
                          minWidth: 18,
                          minHeight: 18,
                        ),
                        child: Center(
                          child: Text(
                            badgeCount! > 99 ? '99+' : '$badgeCount',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 10,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ),
                ],
              ),
              const SizedBox(height: 4),
              Text(
                label,
                style: TextStyle(
                  color: isActive ? Colors.white : const Color(0xFF64748B),
                  fontSize: 10,
                  fontWeight: isActive ? FontWeight.w600 : FontWeight.normal,
                ),
                textAlign: TextAlign.center,
                maxLines: 1,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
