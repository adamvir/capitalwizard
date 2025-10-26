import 'package:flutter/material.dart';

class SideMenu extends StatelessWidget {
  const SideMenu({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Positioned(
      left: 8,
      top: 111,
      child: Column(
        children: [
          _buildMenuItem(
            icon: Icons.shopping_bag,
            label: 'Bolt',
            color: const Color(0xFFF59E0B), // yellow-500
            onTap: () {
              // TODO: Navigate to shop
            },
          ),
          const SizedBox(height: 8),
          _buildMenuItem(
            icon: Icons.message,
            label: 'Üzenetek',
            color: const Color(0xFFD97706), // amber-600
            onTap: () {
              // TODO: Navigate to messages
            },
          ),
          const SizedBox(height: 8),
          _buildMenuItem(
            icon: Icons.card_giftcard,
            label: 'Ajándék',
            color: const Color(0xFFB45309), // amber-700
            onTap: () {
              // TODO: Navigate to gifts
            },
          ),
          const SizedBox(height: 8),
          _buildMenuItem(
            icon: Icons.auto_awesome,
            label: 'Speciális',
            color: const Color(0xFFEA580C), // orange-600
            onTap: () {
              // TODO: Navigate to special
            },
          ),
        ],
      ),
    );
  }

  Widget _buildMenuItem({
    required IconData icon,
    required String label,
    required Color color,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Container(
            width: 56,
            height: 56,
            decoration: BoxDecoration(
              color: color,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(
                color: Colors.black.withOpacity(0.2),
                width: 2,
              ),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.3),
                  blurRadius: 8,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Icon(
              icon,
              size: 28,
              color: Colors.white,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 10,
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
    );
  }
}
