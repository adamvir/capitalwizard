import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/game_provider.dart';
import '../config/app_theme.dart';
import '../services/storage_service.dart';
import '../models/game_state.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final StorageService _storage = StorageService();
  final _formKey = GlobalKey<FormState>();

  bool _isEditing = false;
  late TextEditingController _nameController;
  late TextEditingController _emailController;
  late TextEditingController _birthDateController;
  late TextEditingController _locationController;
  late TextEditingController _bioController;

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController();
    _emailController = TextEditingController();
    _birthDateController = TextEditingController();
    _locationController = TextEditingController();
    _bioController = TextEditingController();
    _loadProfileData();
  }

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _birthDateController.dispose();
    _locationController.dispose();
    _bioController.dispose();
    super.dispose();
  }

  Future<void> _loadProfileData() async {
    final name = await _storage.getString('profile_name') ?? '';
    final email = await _storage.getString('profile_email') ?? '';
    final birthDate = await _storage.getString('profile_birth_date') ?? '';
    final location = await _storage.getString('profile_location') ?? '';
    final bio = await _storage.getString('profile_bio') ?? '';

    setState(() {
      _nameController.text = name;
      _emailController.text = email;
      _birthDateController.text = birthDate;
      _locationController.text = location;
      _bioController.text = bio;
    });
  }

  Future<void> _saveProfileData() async {
    await _storage.saveString('profile_name', _nameController.text);
    await _storage.saveString('profile_email', _emailController.text);
    await _storage.saveString('profile_birth_date', _birthDateController.text);
    await _storage.saveString('profile_location', _locationController.text);
    await _storage.saveString('profile_bio', _bioController.text);
  }

  void _toggleEditing() async {
    if (_isEditing) {
      // Save changes
      await _saveProfileData();
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Profil mentve'),
            backgroundColor: Colors.green,
            duration: Duration(seconds: 2),
          ),
        );
      }
    }
    setState(() {
      _isEditing = !_isEditing;
    });
  }

  void _cancelEditing() {
    _loadProfileData();
    setState(() {
      _isEditing = false;
    });
  }

  String _getSubscriptionBadge(SubscriptionTier tier) {
    switch (tier) {
      case SubscriptionTier.free:
        return 'Free';
      case SubscriptionTier.pro:
        return 'Pro';
      case SubscriptionTier.master:
        return 'Master';
    }
  }

  Color _getSubscriptionColor(SubscriptionTier tier) {
    switch (tier) {
      case SubscriptionTier.free:
        return Colors.grey;
      case SubscriptionTier.pro:
        return Colors.blue;
      case SubscriptionTier.master:
        return const Color(0xFFB45309);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<GameProvider>(
      builder: (context, gameProvider, child) {
        final gameState = gameProvider.gameState;
        final level = gameState.playerLevel;
        final coins = gameState.coins;
        final gems = gameState.gems;
        final tier = gameState.subscriptionTier;
        final xpForCurrentLevel = level * 1000;
        final currentXp = gameState.totalXp - ((level - 1) * 1000);
        final xpProgress = (currentXp / xpForCurrentLevel).clamp(0.0, 1.0);

        return Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                Color(0xFF0F172A), // slate-900
                Color(0xFF1E3A8A), // blue-900
                Color(0xFF0F172A), // slate-900
              ],
            ),
          ),
          child: Scaffold(
            backgroundColor: Colors.transparent,
            appBar: AppBar(
              backgroundColor: const Color(0xFF1E40AF).withOpacity(0.9),
              elevation: 0,
              title: Row(
                children: [
                  const Icon(Icons.person, color: Colors.white),
                  const SizedBox(width: 8),
                  const Text('Diák Profil', style: TextStyle(color: Colors.white)),
                ],
              ),
              actions: [
                if (_isEditing)
                  IconButton(
                    icon: const Icon(Icons.close, color: Colors.white),
                    onPressed: _cancelEditing,
                  ),
                IconButton(
                  icon: Icon(
                    _isEditing ? Icons.save : Icons.edit,
                    color: Colors.white,
                  ),
                  onPressed: _toggleEditing,
                ),
              ],
            ),
            body: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  // Stats Card
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [
                          const Color(0xFF1E3A8A).withOpacity(0.4),
                          const Color(0xFF1E293B).withOpacity(0.4),
                        ],
                      ),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(
                        color: const Color(0xFF3B82F6).withOpacity(0.3),
                        width: 1,
                      ),
                    ),
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text(
                              'Statisztikák',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 6,
                              ),
                              decoration: BoxDecoration(
                                gradient: LinearGradient(
                                  colors: tier == SubscriptionTier.master
                                      ? [const Color(0xFF9333EA), const Color(0xFFEC4899)]
                                      : tier == SubscriptionTier.pro
                                          ? [const Color(0xFF3B82F6), const Color(0xFF06B6D4)]
                                          : [Colors.grey, Colors.grey],
                                ),
                                borderRadius: BorderRadius.circular(20),
                              ),
                              child: Row(
                                children: [
                                  if (tier != SubscriptionTier.free)
                                    const Icon(Icons.workspace_premium,
                                        size: 16, color: Colors.white),
                                  if (tier != SubscriptionTier.free)
                                    const SizedBox(width: 4),
                                  Text(
                                    _getSubscriptionBadge(tier),
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 12,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        // Level Progress
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                const Icon(Icons.trending_up,
                                    color: Color(0xFF60A5FA), size: 20),
                                const SizedBox(width: 8),
                                Text(
                                  'Szint $level',
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                            Text(
                              '${currentXp.toInt()} / $xpForCurrentLevel XP',
                              style: const TextStyle(
                                color: Color(0xFF93C5FD),
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: LinearProgressIndicator(
                            value: xpProgress,
                            backgroundColor: const Color(0xFF334155),
                            valueColor: const AlwaysStoppedAnimation<Color>(
                              Color(0xFF3B82F6),
                            ),
                            minHeight: 12,
                          ),
                        ),
                        const SizedBox(height: 16),
                        // Resources
                        Row(
                          children: [
                            Expanded(
                              child: Container(
                                decoration: BoxDecoration(
                                  color: const Color(0xFF1E293B).withOpacity(0.5),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                padding: const EdgeInsets.all(12),
                                child: Row(
                                  children: [
                                    Container(
                                      width: 40,
                                      height: 40,
                                      decoration: const BoxDecoration(
                                        color: Color(0xFFF59E0B),
                                        shape: BoxShape.circle,
                                      ),
                                      child: const Icon(
                                        Icons.monetization_on,
                                        color: Colors.white,
                                        size: 24,
                                      ),
                                    ),
                                    const SizedBox(width: 12),
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        const Text(
                                          'Arany',
                                          style: TextStyle(
                                            color: Color(0xFF94A3B8),
                                            fontSize: 12,
                                          ),
                                        ),
                                        Text(
                                          '$coins',
                                          style: const TextStyle(
                                            color: Color(0xFFFBBF24),
                                            fontSize: 18,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Container(
                                decoration: BoxDecoration(
                                  color: const Color(0xFF1E293B).withOpacity(0.5),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                padding: const EdgeInsets.all(12),
                                child: Row(
                                  children: [
                                    Container(
                                      width: 40,
                                      height: 40,
                                      decoration: const BoxDecoration(
                                        color: Color(0xFF06B6D4),
                                        shape: BoxShape.circle,
                                      ),
                                      child: const Icon(
                                        Icons.diamond,
                                        color: Colors.white,
                                        size: 24,
                                      ),
                                    ),
                                    const SizedBox(width: 12),
                                    Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        const Text(
                                          'Gyémánt',
                                          style: TextStyle(
                                            color: Color(0xFF94A3B8),
                                            fontSize: 12,
                                          ),
                                        ),
                                        Text(
                                          '$gems',
                                          style: const TextStyle(
                                            color: Color(0xFF22D3EE),
                                            fontSize: 18,
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  // Profile Info Card
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [
                          const Color(0xFF1E3A8A).withOpacity(0.4),
                          const Color(0xFF1E293B).withOpacity(0.4),
                        ],
                      ),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(
                        color: const Color(0xFF3B82F6).withOpacity(0.3),
                        width: 1,
                      ),
                    ),
                    padding: const EdgeInsets.all(16),
                    child: Form(
                      key: _formKey,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Személyes Adatok',
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 16),
                          _buildProfileField(
                            label: 'Név',
                            icon: Icons.person,
                            controller: _nameController,
                            enabled: _isEditing,
                          ),
                          const SizedBox(height: 12),
                          _buildProfileField(
                            label: 'Email',
                            icon: Icons.email,
                            controller: _emailController,
                            enabled: _isEditing,
                            keyboardType: TextInputType.emailAddress,
                          ),
                          const SizedBox(height: 12),
                          _buildProfileField(
                            label: 'Születési dátum',
                            icon: Icons.calendar_today,
                            controller: _birthDateController,
                            enabled: _isEditing,
                          ),
                          const SizedBox(height: 12),
                          _buildProfileField(
                            label: 'Helyszín',
                            icon: Icons.location_on,
                            controller: _locationController,
                            enabled: _isEditing,
                          ),
                          const SizedBox(height: 12),
                          _buildProfileField(
                            label: 'Bemutatkozás',
                            icon: Icons.description,
                            controller: _bioController,
                            enabled: _isEditing,
                            maxLines: 3,
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  // Save Button
                  if (_isEditing)
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton.icon(
                        onPressed: _toggleEditing,
                        icon: const Icon(Icons.save),
                        label: const Text('Változások mentése'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Colors.green,
                          padding: const EdgeInsets.symmetric(vertical: 16),
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildProfileField({
    required String label,
    required IconData icon,
    required TextEditingController controller,
    required bool enabled,
    TextInputType? keyboardType,
    int maxLines = 1,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(icon, color: const Color(0xFF93C5FD), size: 16),
            const SizedBox(width: 8),
            Text(
              label,
              style: const TextStyle(
                color: Color(0xFF93C5FD),
                fontSize: 14,
              ),
            ),
          ],
        ),
        const SizedBox(height: 8),
        Container(
          decoration: BoxDecoration(
            color: const Color(0xFF1E293B).withOpacity(0.5),
            borderRadius: BorderRadius.circular(12),
            border: enabled
                ? Border.all(color: const Color(0xFF3B82F6).withOpacity(0.3))
                : null,
          ),
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          child: enabled
              ? TextFormField(
                  controller: controller,
                  style: const TextStyle(color: Colors.white),
                  keyboardType: keyboardType,
                  maxLines: maxLines,
                  decoration: const InputDecoration(
                    border: InputBorder.none,
                    isDense: true,
                    hintStyle: TextStyle(color: Color(0xFF64748B)),
                  ),
                )
              : Text(
                  controller.text.isEmpty ? 'Nem megadva' : controller.text,
                  style: TextStyle(
                    color: controller.text.isEmpty
                        ? const Color(0xFF64748B)
                        : Colors.white,
                  ),
                ),
        ),
      ],
    );
  }
}
