import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/game_provider.dart';
import '../models/game_state.dart';
import '../services/storage_service.dart';

class AvatarSelectorPage extends StatefulWidget {
  const AvatarSelectorPage({super.key});

  @override
  State<AvatarSelectorPage> createState() => _AvatarSelectorPageState();
}

class _AvatarSelectorPageState extends State<AvatarSelectorPage> {
  final StorageService _storage = StorageService();
  String _selectedAvatar = '🧙‍♂️';

  @override
  void initState() {
    super.initState();
    _loadSavedAvatar();
  }

  Future<void> _loadSavedAvatar() async {
    final saved = await _storage.getString('player_avatar');
    if (saved != null) {
      setState(() {
        _selectedAvatar = saved;
      });
    }
  }

  Future<void> _selectAvatar(String emoji) async {
    setState(() {
      _selectedAvatar = emoji;
    });
    await _storage.saveString('player_avatar', emoji);
    // Don't pop! Let the user close with back button
  }

  bool _isAvatarLocked(AvatarData avatar, SubscriptionTier tier) {
    if (!avatar.isLocked) return false;

    if (tier == SubscriptionTier.master) return false;
    if (tier == SubscriptionTier.pro && avatar.rarity != AvatarRarity.legendary) {
      return false;
    }
    return true;
  }

  Color _getRarityColor(AvatarRarity rarity) {
    switch (rarity) {
      case AvatarRarity.common:
        return const Color(0xFF475569);
      case AvatarRarity.rare:
        return const Color(0xFF3B82F6);
      case AvatarRarity.legendary:
        return const Color(0xFF9333EA);
    }
  }

  Color _getRarityTextColor(AvatarRarity rarity) {
    switch (rarity) {
      case AvatarRarity.common:
        return const Color(0xFFCBD5E1);
      case AvatarRarity.rare:
        return const Color(0xFF93C5FD);
      case AvatarRarity.legendary:
        return const Color(0xFFC084FC);
    }
  }

  String _getRarityName(AvatarRarity rarity) {
    switch (rarity) {
      case AvatarRarity.common:
        return 'Közönséges';
      case AvatarRarity.rare:
        return 'Ritka';
      case AvatarRarity.legendary:
        return 'Legendás';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<GameProvider>(
      builder: (context, gameProvider, child) {
        final tier = gameProvider.gameState.subscriptionTier;

        return Container(
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
          child: Scaffold(
            backgroundColor: Colors.transparent,
            appBar: AppBar(
              backgroundColor: const Color(0xFF6D28D9).withValues(alpha: 0.9),
              title: Row(
                children: const [
                  Icon(Icons.auto_awesome, color: Colors.white),
                  SizedBox(width: 8),
                  Text('Avatar Választó'),
                ],
              ),
            ),
            body: Column(
              children: [
                // Current Avatar Display
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: [
                        const Color(0xFF6D28D9).withValues(alpha: 0.9),
                        const Color(0xFF7C3AED).withValues(alpha: 0.9),
                      ],
                    ),
                    border: Border(
                      bottom: BorderSide(
                        color: const Color(0xFF9333EA),
                        width: 2,
                      ),
                    ),
                  ),
                  child: Column(
                    children: [
                      Container(
                        width: 80,
                        height: 80,
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                            colors: [Color(0xFF9333EA), Color(0xFFEC4899)],
                          ),
                          shape: BoxShape.circle,
                          border: Border.all(
                            color: const Color(0xFF581C87),
                            width: 4,
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: const Color(0xFF9333EA).withValues(alpha: 0.5),
                              blurRadius: 20,
                              spreadRadius: 5,
                            ),
                          ],
                        ),
                        child: Center(
                          child: Text(
                            _selectedAvatar,
                            style: const TextStyle(fontSize: 50),
                          ),
                        ),
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        'Kiválasztott Avatar',
                        style: TextStyle(
                          color: Color(0xFFC084FC),
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                ),
                // Avatar Grid
                Expanded(
                  child: SingleChildScrollView(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildAvatarSection(
                          title: 'Ingyenes Avatarok',
                          avatars: _freeAvatars,
                          tier: tier,
                          count: _freeAvatars.length,
                        ),
                        const SizedBox(height: 24),
                        _buildAvatarSection(
                          title: 'Pro Avatarok',
                          avatars: _proAvatars,
                          tier: tier,
                          count: _proAvatars.length,
                          icon: Icons.workspace_premium,
                          iconColor: const Color(0xFF3B82F6),
                        ),
                        const SizedBox(height: 24),
                        _buildAvatarSection(
                          title: 'Master Avatarok',
                          avatars: _masterAvatars,
                          tier: tier,
                          count: _masterAvatars.length,
                          icon: Icons.workspace_premium,
                          iconColor: const Color(0xFF9333EA),
                        ),
                        const SizedBox(height: 24),
                        // Info Card
                        Container(
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              begin: Alignment.topLeft,
                              end: Alignment.bottomRight,
                              colors: [
                                const Color(0xFF1E3A8A).withValues(alpha: 0.4),
                                const Color(0xFF1E293B).withValues(alpha: 0.4),
                              ],
                            ),
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(
                              color: const Color(0xFF3B82F6).withValues(alpha: 0.3),
                            ),
                          ),
                          padding: const EdgeInsets.all(16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: const [
                                  Icon(Icons.auto_awesome,
                                      color: Color(0xFF60A5FA), size: 20),
                                  SizedBox(width: 8),
                                  Text(
                                    'Avatar Tier-ek',
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 12),
                              _buildInfoRow(
                                'Közönséges',
                                'Mindenki számára elérhető',
                                const Color(0xFF64748B),
                              ),
                              const SizedBox(height: 8),
                              _buildInfoRow(
                                'Ritka',
                                'Pro előfizetés szükséges',
                                const Color(0xFF3B82F6),
                              ),
                              const SizedBox(height: 8),
                              _buildInfoRow(
                                'Legendás',
                                'Master előfizetés szükséges',
                                const Color(0xFF9333EA),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 24),
                      ],
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

  Widget _buildAvatarSection({
    required String title,
    required List<AvatarData> avatars,
    required SubscriptionTier tier,
    required int count,
    IconData? icon,
    Color? iconColor,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text(
              title,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(width: 8),
            if (icon != null) Icon(icon, color: iconColor, size: 20),
            const SizedBox(width: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              decoration: BoxDecoration(
                color: iconColor?.withValues(alpha: 0.5) ?? const Color(0xFF334155),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                '$count db',
                style: TextStyle(
                  color: iconColor != null
                      ? Colors.white
                      : const Color(0xFFCBD5E1),
                  fontSize: 12,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            childAspectRatio: 0.85,
            crossAxisSpacing: 12,
            mainAxisSpacing: 12,
          ),
          itemCount: avatars.length,
          itemBuilder: (context, index) {
            final avatar = avatars[index];
            final isLocked = _isAvatarLocked(avatar, tier);
            final isSelected = _selectedAvatar == avatar.emoji;

            return GestureDetector(
              onTap: isLocked ? null : () => _selectAvatar(avatar.emoji),
              child: Stack(
                children: [
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [
                          _getRarityColor(avatar.rarity),
                          _getRarityColor(avatar.rarity).withValues(alpha: 0.7),
                        ],
                      ),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(
                        color: isSelected
                            ? Colors.white
                            : _getRarityColor(avatar.rarity).withValues(alpha: 0.3),
                        width: isSelected ? 2 : 1,
                      ),
                      boxShadow: isSelected
                          ? [
                              BoxShadow(
                                color: Colors.white.withValues(alpha: 0.3),
                                blurRadius: 10,
                                spreadRadius: 2,
                              ),
                            ]
                          : null,
                    ),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Stack(
                          children: [
                            Text(
                              avatar.emoji,
                              style: const TextStyle(fontSize: 36),
                            ),
                            if (isLocked)
                              Positioned.fill(
                                child: Container(
                                  decoration: BoxDecoration(
                                    color: Colors.black.withValues(alpha: 0.6),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child: const Icon(
                                    Icons.lock,
                                    color: Colors.white,
                                    size: 24,
                                  ),
                                ),
                              ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text(
                          avatar.name,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 10,
                            fontWeight: FontWeight.w600,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        Text(
                          _getRarityName(avatar.rarity),
                          style: TextStyle(
                            color: _getRarityTextColor(avatar.rarity),
                            fontSize: 8,
                          ),
                        ),
                      ],
                    ),
                  ),
                  if (isSelected && !isLocked)
                    Positioned(
                      top: -4,
                      right: -4,
                      child: Container(
                        width: 24,
                        height: 24,
                        decoration: BoxDecoration(
                          color: Colors.green,
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.white, width: 2),
                        ),
                        child: const Icon(
                          Icons.check,
                          color: Colors.white,
                          size: 12,
                        ),
                      ),
                    ),
                ],
              ),
            );
          },
        ),
      ],
    );
  }

  Widget _buildInfoRow(String title, String description, Color color) {
    return Row(
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            color: color,
            shape: BoxShape.circle,
          ),
        ),
        const SizedBox(width: 8),
        Expanded(
          child: Text(
            '$title - $description',
            style: const TextStyle(
              color: Color(0xFF93C5FD),
              fontSize: 12,
            ),
          ),
        ),
      ],
    );
  }
}

// Avatar data models
enum AvatarRarity { common, rare, legendary }

class AvatarData {
  final String emoji;
  final String name;
  final AvatarRarity rarity;
  final bool isLocked;

  const AvatarData({
    required this.emoji,
    required this.name,
    required this.rarity,
    this.isLocked = false,
  });
}

// Free avatars
const _freeAvatars = [
  AvatarData(emoji: '🧙‍♂️', name: 'Varázsló', rarity: AvatarRarity.common),
  AvatarData(emoji: '⚔️', name: 'Harcos', rarity: AvatarRarity.common),
  AvatarData(emoji: '🏹', name: 'Íjász', rarity: AvatarRarity.common),
  AvatarData(emoji: '🛡️', name: 'Védő', rarity: AvatarRarity.common),
  AvatarData(emoji: '🗡️', name: 'Lovag', rarity: AvatarRarity.common),
  AvatarData(emoji: '🎯', name: 'Célzó', rarity: AvatarRarity.common),
];

// Pro avatars
const _proAvatars = [
  AvatarData(emoji: '🐉', name: 'Sárkány', rarity: AvatarRarity.rare, isLocked: true),
  AvatarData(emoji: '🦅', name: 'Sas', rarity: AvatarRarity.rare, isLocked: true),
  AvatarData(emoji: '🦁', name: 'Oroszlán', rarity: AvatarRarity.rare, isLocked: true),
  AvatarData(emoji: '🔮', name: 'Látnok', rarity: AvatarRarity.rare, isLocked: true),
  AvatarData(emoji: '⚡', name: 'Villám', rarity: AvatarRarity.rare, isLocked: true),
  AvatarData(emoji: '🌟', name: 'Csillag', rarity: AvatarRarity.rare, isLocked: true),
  AvatarData(emoji: '🔥', name: 'Láng', rarity: AvatarRarity.rare, isLocked: true),
  AvatarData(emoji: '💎', name: 'Gyémánt', rarity: AvatarRarity.rare, isLocked: true),
];

// Master avatars
const _masterAvatars = [
  AvatarData(emoji: '👑', name: 'Király', rarity: AvatarRarity.legendary, isLocked: true),
  AvatarData(emoji: '🌌', name: 'Galaxis', rarity: AvatarRarity.legendary, isLocked: true),
  AvatarData(emoji: '🦄', name: 'Egyszarvú', rarity: AvatarRarity.legendary, isLocked: true),
  AvatarData(emoji: '🎭', name: 'Maszk', rarity: AvatarRarity.legendary, isLocked: true),
  AvatarData(emoji: '🏆', name: 'Bajnok', rarity: AvatarRarity.legendary, isLocked: true),
  AvatarData(emoji: '💫', name: 'Csillaghullás', rarity: AvatarRarity.legendary, isLocked: true),
];
