import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/game_provider.dart';
import '../models/game_state.dart';

class SubscriptionPage extends StatefulWidget {
  const SubscriptionPage({super.key});

  @override
  State<SubscriptionPage> createState() => _SubscriptionPageState();
}

class _SubscriptionPageState extends State<SubscriptionPage> {
  bool _isYearly = true;

  @override
  Widget build(BuildContext context) {
    return Consumer<GameProvider>(
      builder: (context, gameProvider, child) {
        final currentTier = gameProvider.gameState.subscriptionTier;

        return Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                Color(0xFF0F172A), // slate-900
                Color(0xFF581C87), // purple-900/20
                Color(0xFF0F172A), // slate-900
              ],
            ),
          ),
          child: Scaffold(
            backgroundColor: Colors.transparent,
            appBar: AppBar(
              backgroundColor: const Color(0xFF581C87).withOpacity(0.95),
              title: Row(
                children: const [
                  Icon(Icons.workspace_premium, color: Color(0xFFFBBF24)),
                  SizedBox(width: 8),
                  Text('Előfizetési Csomagok'),
                ],
              ),
            ),
            body: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  // Hero Section
                  const Icon(
                    Icons.workspace_premium,
                    size: 64,
                    color: Color(0xFFFBBF24),
                  ),
                  const SizedBox(height: 16),
                  ShaderMask(
                    shaderCallback: (bounds) => const LinearGradient(
                      colors: [
                        Color(0xFFFBBF24),
                        Color(0xFFF59E0B),
                        Color(0xFFDC2626),
                      ],
                    ).createShader(bounds),
                    child: const Text(
                      'Fejleszd tudásod prémiummal',
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Korlátlan hozzáférés, egyéni tanulási út, és több!',
                    style: TextStyle(
                      color: Color(0xFFCBD5E1),
                      fontSize: 14,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 24),
                  // Billing Toggle
                  Container(
                    decoration: BoxDecoration(
                      color: const Color(0xFF334155),
                      borderRadius: BorderRadius.circular(25),
                      border: Border.all(
                        color: const Color(0xFF475569),
                      ),
                    ),
                    padding: const EdgeInsets.all(4),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        GestureDetector(
                          onTap: () => setState(() => _isYearly = false),
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 24,
                              vertical: 8,
                            ),
                            decoration: BoxDecoration(
                              color: !_isYearly
                                  ? const Color(0xFF7C3AED)
                                  : Colors.transparent,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Text(
                              'Havi',
                              style: TextStyle(
                                color: !_isYearly ? Colors.white : const Color(0xFF94A3B8),
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                        ),
                        GestureDetector(
                          onTap: () => setState(() => _isYearly = true),
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 24,
                              vertical: 8,
                            ),
                            decoration: BoxDecoration(
                              color: _isYearly
                                  ? const Color(0xFF7C3AED)
                                  : Colors.transparent,
                              borderRadius: BorderRadius.circular(20),
                            ),
                            child: Row(
                              children: [
                                Text(
                                  'Éves',
                                  style: TextStyle(
                                    color: _isYearly ? Colors.white : const Color(0xFF94A3B8),
                                    fontWeight: FontWeight.w600,
                                  ),
                                ),
                                if (_isYearly) ...[
                                  const SizedBox(width: 8),
                                  Container(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 8,
                                      vertical: 2,
                                    ),
                                    decoration: BoxDecoration(
                                      gradient: const LinearGradient(
                                        colors: [Color(0xFF10B981), Color(0xFF059669)],
                                      ),
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                    child: const Text(
                                      '-17%',
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 10,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ],
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  // Pricing Cards
                  _buildPricingCard(
                    tier: SubscriptionTier.free,
                    currentTier: currentTier,
                    title: 'Alapszint',
                    icon: Icons.book,
                    price: 0,
                    badge: 'Ingyenes',
                    gradientColors: const [Color(0xFF475569), Color(0xFF334155)],
                    features: const [
                      '3 lecke naponta',
                      '5 küzdőtéri játék naponta',
                      'Alapvető könyvtár hozzáférés',
                      'Napi sorozat követés',
                      'Alapvető statisztikák',
                    ],
                    onSelect: () => gameProvider.setSubscriptionTier(SubscriptionTier.free),
                  ),
                  const SizedBox(height: 16),
                  _buildPricingCard(
                    tier: SubscriptionTier.pro,
                    currentTier: currentTier,
                    title: 'Professzionális',
                    icon: Icons.bolt,
                    price: _isYearly ? 4166 : 4990,
                    originalPrice: _isYearly ? 49990 : null,
                    badge: 'Legtöbb választás',
                    isPopular: true,
                    gradientColors: const [Color(0xFF9333EA), Color(0xFFEC4899)],
                    features: const [
                      'Korlátlan leckék',
                      'Korlátlan küzdőtér játékok',
                      'Teljes könyvtár (15 könyv)',
                      'Offline mód',
                      'Részletes statisztikák',
                      '2x gyorsabb XP gyűjtés',
                      'Exkluzív jelvények',
                    ],
                    highlightedFeatures: const [0, 1],
                    onSelect: () => gameProvider.setSubscriptionTier(SubscriptionTier.pro),
                  ),
                  const SizedBox(height: 16),
                  _buildPricingCard(
                    tier: SubscriptionTier.master,
                    currentTier: currentTier,
                    title: 'Mester',
                    icon: Icons.workspace_premium,
                    price: _isYearly ? 8333 : 9990,
                    originalPrice: _isYearly ? 99990 : null,
                    badge: 'Legjobb érték',
                    gradientColors: const [Color(0xFFF59E0B), Color(0xFFDC2626)],
                    features: const [
                      'Minden Pro funkció',
                      '1-1 mentori támogatás',
                      'Személyre szabott tanulási terv',
                      'Exkluzív kihívások',
                      'Korai hozzáférés új funkciókhoz',
                      'Prioritás támogatás',
                      'Arany mester jelvény',
                      '3x gyorsabb XP gyűjtés',
                    ],
                    highlightedFeatures: const [0],
                    onSelect: () => gameProvider.setSubscriptionTier(SubscriptionTier.master),
                  ),
                  const SizedBox(height: 24),
                  // Benefits Section
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [
                          const Color(0xFF1E293B).withOpacity(0.6),
                          const Color(0xFF581C87).withOpacity(0.3),
                        ],
                      ),
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(
                        color: const Color(0xFF7C3AED).withOpacity(0.3),
                      ),
                    ),
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: const [
                            Icon(Icons.auto_awesome, color: Color(0xFFA78BFA)),
                            SizedBox(width: 8),
                            Text(
                              'Miért érdemes prémiumra váltani?',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        Wrap(
                          spacing: 12,
                          runSpacing: 12,
                          children: [
                            _buildBenefitChip('Teljes könyvtár', Icons.book),
                            _buildBenefitChip('Korlátlan tanulás', Icons.all_inclusive),
                            _buildBenefitChip('Gyorsabb fejlődés', Icons.trending_up),
                            _buildBenefitChip('Prioritás támogatás', Icons.support_agent),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  // Trust Section
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: const [
                      Icon(Icons.shield, color: Color(0xFF64748B), size: 16),
                      SizedBox(width: 8),
                      Text(
                        'Biztonságos fizetés • Bármikor lemondható',
                        style: TextStyle(
                          color: Color(0xFF64748B),
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Több mint 10,000 tanuló fejleszti pénzügyi tudását',
                    style: TextStyle(
                      color: Color(0xFF475569),
                      fontSize: 12,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 24),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildPricingCard({
    required SubscriptionTier tier,
    required SubscriptionTier currentTier,
    required String title,
    required IconData icon,
    required int price,
    int? originalPrice,
    required String badge,
    bool isPopular = false,
    required List<Color> gradientColors,
    required List<String> features,
    List<int> highlightedFeatures = const [],
    required VoidCallback onSelect,
  }) {
    final isCurrent = tier == currentTier;

    return Stack(
      clipBehavior: Clip.none,
      children: [
        if (isPopular)
          Positioned(
            top: -12,
            left: 0,
            right: 0,
            child: Center(
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                decoration: BoxDecoration(
                  gradient: LinearGradient(colors: gradientColors),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: Colors.white.withOpacity(0.3), width: 2),
                  boxShadow: [
                    BoxShadow(
                      color: gradientColors[0].withOpacity(0.5),
                      blurRadius: 10,
                      spreadRadius: 2,
                    ),
                  ],
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(Icons.star, color: Color(0xFFFDE047), size: 12),
                    const SizedBox(width: 4),
                    Text(
                      badge,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(width: 4),
                    const Icon(Icons.star, color: Color(0xFFFDE047), size: 12),
                  ],
                ),
              ),
            ),
          ),
        Container(
          margin: EdgeInsets.only(top: isPopular ? 8 : 0),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                const Color(0xFF1E293B).withOpacity(0.8),
                const Color(0xFF0F172A).withOpacity(0.6),
              ],
            ),
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: isPopular ? gradientColors[0].withOpacity(0.8) : const Color(0xFF475569).withOpacity(0.5),
              width: isPopular ? 2 : 1,
            ),
            boxShadow: isPopular
                ? [
                    BoxShadow(
                      color: gradientColors[0].withOpacity(0.3),
                      blurRadius: 20,
                      spreadRadius: 5,
                    ),
                  ]
                : null,
          ),
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(colors: gradientColors),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Icon(icon, color: Colors.white),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          title,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          tier == SubscriptionTier.free
                              ? 'Kezdőknek'
                              : tier == SubscriptionTier.pro
                                  ? 'Legtöbbeknek'
                                  : 'Elkötelezetteknek',
                          style: const TextStyle(
                            color: Color(0xFF94A3B8),
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              // Price
              Row(
                crossAxisAlignment: CrossAxisAlignment.baseline,
                textBaseline: TextBaseline.alphabetic,
                children: [
                  ShaderMask(
                    shaderCallback: (bounds) =>
                        LinearGradient(colors: gradientColors).createShader(bounds),
                    child: Text(
                      price == 0 ? 'Ingyenes' : '${price.toStringAsFixed(0)} Ft',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 36,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  if (price > 0) ...[
                    const SizedBox(width: 4),
                    const Text(
                      '/hó',
                      style: TextStyle(
                        color: Color(0xFF94A3B8),
                        fontSize: 14,
                      ),
                    ),
                  ],
                ],
              ),
              if (originalPrice != null) ...[
                const SizedBox(height: 4),
                Text(
                  '${originalPrice.toStringAsFixed(0)} Ft évente',
                  style: const TextStyle(
                    color: Color(0xFF94A3B8),
                    fontSize: 12,
                  ),
                ),
                const Text(
                  'Spórolj 17%-ot évente!',
                  style: TextStyle(
                    color: Color(0xFF10B981),
                    fontSize: 12,
                  ),
                ),
              ],
              const SizedBox(height: 20),
              // Features
              ...features.asMap().entries.map((entry) {
                final index = entry.key;
                final feature = entry.value;
                final isHighlighted = highlightedFeatures.contains(index);

                return Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: Row(
                    children: [
                      Container(
                        width: 20,
                        height: 20,
                        decoration: BoxDecoration(
                          gradient: isHighlighted
                              ? LinearGradient(colors: gradientColors)
                              : null,
                          color: isHighlighted ? null : const Color(0xFF334155),
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          Icons.check,
                          size: 12,
                          color: isHighlighted ? Colors.white : const Color(0xFF94A3B8),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          feature,
                          style: TextStyle(
                            color: isHighlighted ? Colors.white : const Color(0xFFCBD5E1),
                            fontSize: 14,
                          ),
                        ),
                      ),
                    ],
                  ),
                );
              }).toList(),
              const SizedBox(height: 16),
              // CTA Button
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: isCurrent ? null : onSelect,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: isCurrent ? const Color(0xFF334155) : null,
                    disabledBackgroundColor: const Color(0xFF334155),
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ).copyWith(
                    backgroundColor: isCurrent
                        ? null
                        : MaterialStateProperty.all(Colors.transparent),
                    elevation: MaterialStateProperty.all(0),
                  ),
                  child: Ink(
                    decoration: isCurrent
                        ? null
                        : BoxDecoration(
                            gradient: LinearGradient(colors: gradientColors),
                            borderRadius: BorderRadius.circular(12),
                          ),
                    child: Container(
                      alignment: Alignment.center,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      child: Text(
                        isCurrent ? 'Jelenlegi csomag' : 'Váltás erre a csomagra',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildBenefitChip(String label, IconData icon) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A).withOpacity(0.4),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(
          color: const Color(0xFF334155).withOpacity(0.5),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: const Color(0xFFA78BFA), size: 16),
          const SizedBox(width: 8),
          Text(
            label,
            style: const TextStyle(
              color: Color(0xFFCBD5E1),
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }
}
