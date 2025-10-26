import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:math' as math;
import '../providers/game_provider.dart';
import '../models/game_state.dart';

class UniversityPage extends StatefulWidget {
  const UniversityPage({super.key});

  @override
  State<UniversityPage> createState() => _UniversityPageState();
}

class _UniversityPageState extends State<UniversityPage>
    with SingleTickerProviderStateMixin {
  String? _selectedBuilding;
  bool _menuOpen = false;
  bool _showLibrary = false;
  late AnimationController _menuAnimationController;
  late Animation<double> _menuSlideAnimation;

  final List<BuildingData> _buildings = [
    BuildingData(
      id: 'reception',
      name: 'Recepció',
      icon: Icons.business,
      colors: [Color(0xFFA855F7), Color(0xFF7C3AED)],
      number: 1,
    ),
    BuildingData(
      id: 'library',
      name: 'Könyvtár',
      icon: Icons.menu_book,
      colors: [Color(0xFF3B82F6), Color(0xFF1D4ED8)],
      number: 2,
    ),
    BuildingData(
      id: 'lecture',
      name: 'Előadó',
      icon: Icons.people,
      colors: [Color(0xFF6366F1), Color(0xFF4338CA)],
      number: 3,
    ),
    BuildingData(
      id: 'exam',
      name: 'Vizsgáztató',
      icon: Icons.fact_check,
      colors: [Color(0xFFEF4444), Color(0xFFDC2626)],
      number: 4,
    ),
    BuildingData(
      id: 'office',
      name: 'Tanulmányi osztály',
      icon: Icons.school,
      colors: [Color(0xFF10B981), Color(0xFF059669)],
      number: 5,
    ),
    BuildingData(
      id: 'dorm',
      name: 'Kollégium',
      icon: Icons.home,
      colors: [Color(0xFFF97316), Color(0xFFEA580C)],
      number: 6,
    ),
  ];

  @override
  void initState() {
    super.initState();
    _menuAnimationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    );
    _menuSlideAnimation = CurvedAnimation(
      parent: _menuAnimationController,
      curve: Curves.easeOut,
    );
  }

  @override
  void dispose() {
    _menuAnimationController.dispose();
    super.dispose();
  }

  void _toggleMenu() {
    setState(() {
      _menuOpen = !_menuOpen;
      if (_menuOpen) {
        _menuAnimationController.forward();
      } else {
        _menuAnimationController.reverse();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Main University Campus View
          Container(
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
            child: SafeArea(
              child: Column(
                children: [
                  // Header with back button
                  Padding(
                    padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
                    child: Row(
                      children: [
                        Material(
                          color: Colors.transparent,
                          child: InkWell(
                            onTap: () => Navigator.of(context).pop(),
                            borderRadius: BorderRadius.circular(8),
                            child: Padding(
                              padding: const EdgeInsets.all(8.0),
                              child: Row(
                                children: [
                                  const Icon(
                                    Icons.arrow_back,
                                    color: Colors.white,
                                    size: 24,
                                  ),
                                  const SizedBox(width: 8),
                                  Text(
                                    'Vissza',
                                    style: GoogleFonts.inter(
                                      color: Colors.white,
                                      fontSize: 16,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Campus Title
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    child: Column(
                      children: [
                        Text(
                          'Egyetemi Város',
                          style: GoogleFonts.inter(
                            color: Colors.white,
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                            shadows: [
                              Shadow(
                                offset: const Offset(0, 2),
                                blurRadius: 8,
                                color: Colors.black.withOpacity(0.5),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Válassz egy épületet a listából!',
                          style: GoogleFonts.inter(
                            color: const Color(0xFFE9D5FF),
                            fontSize: 16,
                            shadows: [
                              Shadow(
                                offset: const Offset(0, 1),
                                blurRadius: 4,
                                color: Colors.black.withOpacity(0.3),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Campus Map Area
                  Expanded(
                    child: Container(
                      margin: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(16),
                        child: Image.asset(
                          'assets/images/campus_map.png',
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                  ),

                  // Bottom Slide-Up Menu
                  _buildSlideUpMenu(),
                ],
              ),
            ),
          ),

          // Selected building info modal
          if (_selectedBuilding != null && _selectedBuilding != 'library')
            _buildBuildingInfoModal(),

          // Library Page
          if (_showLibrary)
            LibraryPage(
              onBack: () {
                setState(() {
                  _showLibrary = false;
                  _selectedBuilding = null;
                });
              },
            ),
        ],
      ),
    );
  }

  Widget _buildCrystalEffect({
    required double width,
    required double height,
    required Color color,
    required int delay,
  }) {
    return TweenAnimationBuilder<double>(
      tween: Tween(begin: 0.3, end: 1.0),
      duration: const Duration(seconds: 2),
      curve: Curves.easeInOut,
      builder: (context, value, child) {
        return Opacity(
          opacity: value,
          child: Container(
            width: width,
            height: height,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.bottomCenter,
                end: Alignment.topCenter,
                colors: [color, color.withOpacity(0.05)],
              ),
              borderRadius:
                  const BorderRadius.vertical(top: Radius.circular(8)),
            ),
          ),
        );
      },
    );
  }

  Widget _buildSlideUpMenu() {
    return Align(
      alignment: Alignment.bottomCenter,
      child: AnimatedBuilder(
        animation: _menuSlideAnimation,
        builder: (context, child) {
          return Transform.translate(
            offset: Offset(0, (1 - _menuSlideAnimation.value) * 300),
            child: child,
          );
        },
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Tab/Handle to open menu
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Material(
                color: Colors.transparent,
                child: InkWell(
                  onTap: _toggleMenu,
                  borderRadius:
                      const BorderRadius.vertical(top: Radius.circular(16)),
                  child: Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        colors: [
                          const Color(0xFF7C3AED).withOpacity(0.9),
                          const Color(0xFF3B82F6).withOpacity(0.9),
                        ],
                      ),
                      borderRadius:
                          const BorderRadius.vertical(top: Radius.circular(16)),
                      border: Border.all(
                        color: const Color(0xFFA855F7).withOpacity(0.4),
                        width: 2,
                      ),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFFA855F7).withOpacity(0.3),
                          blurRadius: 16,
                          spreadRadius: 2,
                        ),
                      ],
                    ),
                    padding:
                        const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            const Icon(Icons.map, color: Colors.white, size: 20),
                            const SizedBox(width: 8),
                            Text(
                              'Épületek Térképe',
                              style: GoogleFonts.inter(
                                color: Colors.white,
                                fontSize: 16,
                              ),
                            ),
                          ],
                        ),
                        AnimatedRotation(
                          turns: _menuOpen ? 0.5 : 0,
                          duration: const Duration(milliseconds: 500),
                          child:
                              const Icon(Icons.expand_less, color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),

            // Menu content
            Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    const Color(0xFF0F172A).withOpacity(0.95),
                    const Color(0xFF581C87).withOpacity(0.95),
                  ],
                ),
                border: const Border(
                  top: BorderSide(
                    color: Color(0xFFA855F7),
                    width: 1,
                  ),
                ),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFFA855F7).withOpacity(0.2),
                    blurRadius: 16,
                  ),
                ],
              ),
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    childAspectRatio: 2.5,
                    crossAxisSpacing: 8,
                    mainAxisSpacing: 8,
                  ),
                  itemCount: _buildings.length,
                  itemBuilder: (context, index) {
                    return _buildBuildingButton(_buildings[index]);
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBuildingButton(BuildingData building) {
    final isSelected = _selectedBuilding == building.id;

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () {
          setState(() {
            _selectedBuilding = building.id;
            _menuOpen = false;
            _menuAnimationController.reverse();
            if (building.id == 'library') {
              _showLibrary = true;
            }
          });
        },
        borderRadius: BorderRadius.circular(8),
        child: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: building.colors,
            ),
            borderRadius: BorderRadius.circular(8),
            border: isSelected
                ? Border.all(color: Colors.white, width: 2)
                : null,
            boxShadow: [
              BoxShadow(
                color: building.colors[0].withOpacity(0.3),
                blurRadius: 8,
                spreadRadius: 1,
              ),
            ],
          ),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
            child: Row(
              children: [
                // Number badge
                Container(
                  width: 28,
                  height: 28,
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.9),
                    shape: BoxShape.circle,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.2),
                        blurRadius: 4,
                      ),
                    ],
                  ),
                  child: Center(
                    child: Text(
                      '${building.number}',
                      style: GoogleFonts.inter(
                        color: const Color(0xFF0F172A),
                        fontWeight: FontWeight.bold,
                        fontSize: 14,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),

                // Icon
                Icon(
                  building.icon,
                  color: Colors.white,
                  size: 20,
                ),
                const SizedBox(width: 8),

                // Name
                Expanded(
                  child: Text(
                    building.name,
                    style: GoogleFonts.inter(
                      color: Colors.white,
                      fontSize: 13,
                      fontWeight: FontWeight.w500,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildBuildingInfoModal() {
    final building =
        _buildings.firstWhere((b) => b.id == _selectedBuilding);

    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedBuilding = null;
        });
      },
      child: Container(
        color: Colors.black.withOpacity(0.7),
        child: Center(
          child: GestureDetector(
            onTap: () {}, // Prevent closing when tapping inside
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 32),
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [
                    const Color(0xFF0F172A).withOpacity(0.98),
                    const Color(0xFF581C87).withOpacity(0.98),
                  ],
                ),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(
                  color: const Color(0xFFA855F7).withOpacity(0.5),
                  width: 2,
                ),
                boxShadow: [
                  BoxShadow(
                    color: const Color(0xFFA855F7).withOpacity(0.3),
                    blurRadius: 16,
                  ),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Icon
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                            colors: building.colors,
                          ),
                          borderRadius: BorderRadius.circular(12),
                          boxShadow: [
                            BoxShadow(
                              color: building.colors[0].withOpacity(0.3),
                              blurRadius: 8,
                            ),
                          ],
                        ),
                        child: Icon(
                          building.icon,
                          color: Colors.white,
                          size: 32,
                        ),
                      ),
                      const SizedBox(width: 16),

                      // Content
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Container(
                                  width: 24,
                                  height: 24,
                                  decoration: BoxDecoration(
                                    color: Colors.white.withOpacity(0.9),
                                    shape: BoxShape.circle,
                                  ),
                                  child: Center(
                                    child: Text(
                                      '${building.number}',
                                      style: GoogleFonts.inter(
                                        color: const Color(0xFF0F172A),
                                        fontWeight: FontWeight.bold,
                                        fontSize: 12,
                                      ),
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: Text(
                                    building.name,
                                    style: GoogleFonts.inter(
                                      color: Colors.white,
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 12),
                            Text(
                              'Hamarosan elérhető...',
                              style: GoogleFonts.inter(
                                color: const Color(0xFFE9D5FF),
                                fontSize: 16,
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              'Itt tudsz majd különböző tevékenységeket végezni az egyetemen.',
                              style: GoogleFonts.inter(
                                color: const Color(0xFFE9D5FF).withOpacity(0.7),
                                fontSize: 14,
                              ),
                            ),
                          ],
                        ),
                      ),

                      // Close button
                      Material(
                        color: Colors.white.withOpacity(0.1),
                        shape: const CircleBorder(),
                        child: InkWell(
                          onTap: () {
                            setState(() {
                              _selectedBuilding = null;
                            });
                          },
                          customBorder: const CircleBorder(),
                          child: const SizedBox(
                            width: 32,
                            height: 32,
                            child: Icon(
                              Icons.close,
                              color: Colors.white,
                              size: 20,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class BuildingData {
  final String id;
  final String name;
  final IconData icon;
  final List<Color> colors;
  final int number;

  BuildingData({
    required this.id,
    required this.name,
    required this.icon,
    required this.colors,
    required this.number,
  });
}

// Library Page Widget
class LibraryPage extends StatefulWidget {
  final VoidCallback onBack;

  const LibraryPage({super.key, required this.onBack});

  @override
  State<LibraryPage> createState() => _LibraryPageState();
}

class _LibraryPageState extends State<LibraryPage> {
  BookData? _selectedBook;
  BookData? _bookToRent;
  int _rentalDays = 7;
  bool _showRentalPanel = false;
  bool _showSuccessModal = false;
  String _successBookTitle = '';

  final List<List<BookData>> _shelves = [
    // Shelf 1
    [
      BookData(
          title: 'Tőkepiaci Szótár',
          color: const Color(0xFFB45309),
          width: 60,
          hasContent: true),
      BookData(
          title: 'Pénzügyi Alapismeretek',
          color: const Color(0xFF334155),
          width: 54,
          hasContent: true),
      BookData(
          title: 'Befektetés Alapjai',
          color: const Color(0xFF1D4ED8),
          width: 55,
          hasContent: true),
      BookData(
          title: 'Részvények',
          color: const Color(0xFF15803D),
          width: 48,
          hasContent: true),
      BookData(
          title: 'Kötvények',
          color: const Color(0xFF7E22CE),
          width: 52,
          hasContent: true),
      BookData(
          title: 'Portfolió Kezelés',
          color: const Color(0xFFB91C1C),
          width: 58,
          hasContent: true),
    ],
    // Shelf 2
    [
      BookData(
          title: 'Technikai Elemzés',
          color: const Color(0xFF4338CA),
          width: 62,
          hasContent: true),
      BookData(
          title: 'Fundamentális Elemzés',
          color: const Color(0xFF0F766E),
          width: 65,
          hasContent: true),
      BookData(
          title: 'Pénzügyi Matematika',
          color: const Color(0xFFC2410C),
          width: 56,
          hasContent: true),
      BookData(
          title: 'Opciók',
          color: const Color(0xFFBE185D),
          width: 44,
          hasContent: true),
      BookData(
          title: 'Határidős Ügyletek',
          color: const Color(0xFF0E7490),
          width: 54,
          hasContent: true),
    ],
    // Shelf 3
    [
      BookData(
          title: 'Devizapiac',
          color: const Color(0xFF059669),
          width: 50,
          hasContent: false),
      BookData(
          title: 'Kockázatkezelés',
          color: const Color(0xFFBE123C),
          width: 58,
          hasContent: true),
      BookData(
          title: 'Vállalati Pénzügyek',
          color: const Color(0xFF7C3AED),
          width: 60,
          hasContent: false),
      BookData(
          title: 'Értékpapírok',
          color: const Color(0xFF65A30D),
          width: 52,
          hasContent: false),
      BookData(
          title: 'Befektetési Alapok',
          color: const Color(0xFFC026D3),
          width: 56,
          hasContent: false),
    ],
    // Shelf 4
    [
      BookData(
          title: 'ETF-ek',
          color: const Color(0xFF0284C7),
          width: 42,
          hasContent: false),
      BookData(
          title: 'Makrogazdaság',
          color: const Color(0xFFD97706),
          width: 55,
          hasContent: true),
      BookData(
          title: 'Day Trading',
          color: const Color(0xFF2563EB),
          width: 54,
          hasContent: false),
      BookData(
          title: 'Napi Kereskedés',
          color: const Color(0xFF16A34A),
          width: 52,
          hasContent: false),
      BookData(
          title: 'Passzív Befektetés',
          color: const Color(0xFF9333EA),
          width: 58,
          hasContent: false),
    ],
    // Shelf 5
    [
      BookData(
          title: 'Pénzügyi Szabályozás',
          color: const Color(0xFFDC2626),
          width: 62,
          hasContent: false),
      BookData(
          title: 'Kripto és Blockchain',
          color: const Color(0xFF4F46E5),
          width: 57,
          hasContent: true),
      BookData(
          title: 'Pszichológia és Trading',
          color: const Color(0xFF0D9488),
          width: 56,
          hasContent: true),
      BookData(
          title: 'Ingatlan Befektetés',
          color: const Color(0xFFEA580C),
          width: 58,
          hasContent: true),
      BookData(
          title: 'Kereskedési Stratégiák',
          color: const Color(0xFFDB2777),
          width: 60,
          hasContent: false),
    ],
    // Shelf 6
    [
      BookData(
          title: 'Árfolyam Grafikonok',
          color: const Color(0xFF0891B2),
          width: 55,
          hasContent: false),
      BookData(
          title: 'Piaci Mutatók',
          color: const Color(0xFF059669),
          width: 50,
          hasContent: false),
      BookData(
          title: 'Diverzifikáció',
          color: const Color(0xFFE11D48),
          width: 54,
          hasContent: false),
      BookData(
          title: 'Eszköz Allokáció',
          color: const Color(0xFF8B5CF6),
          width: 56,
          hasContent: false),
      BookData(
          title: 'Hosszú Távú Befektetés',
          color: const Color(0xFF84CC16),
          width: 62,
          hasContent: false),
    ],
  ];

  int _calculateRentalPrice(int days) {
    if (days == 1) return 50;
    if (days == 30) return 1000;

    const basePrice = 50.0;
    const maxDiscount = 0.33;
    final discountFactor = (days - 1) / 29;
    final pricePerDay = basePrice * (1 - (maxDiscount * discountFactor));

    return (pricePerDay * days).round();
  }

  bool _isBookRented(String title) {
    final gameProvider = Provider.of<GameProvider>(context, listen: false);
    return gameProvider.isBookRented(title);
  }

  int _getRemainingDays(int rentedUntil) {
    final remaining = rentedUntil - DateTime.now().millisecondsSinceEpoch;
    return math.max(0, (remaining / (24 * 60 * 60 * 1000)).ceil());
  }

  void _handleRentBook(BuildContext context) {
    if (_bookToRent == null) return;

    final gameProvider = Provider.of<GameProvider>(context, listen: false);
    final price = _calculateRentalPrice(_rentalDays);

    if (gameProvider.gameState.coins < price) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Nincs elég aranyad a kölcsönzéshez!'),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    if (_isBookRented(_bookToRent!.title)) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Ez a könyv már ki van kölcsönözve!'),
          backgroundColor: Colors.red,
        ),
      );
      return;
    }

    gameProvider.updateCoins(-price);

    final newRental = RentedBook(
      title: _bookToRent!.title,
      rentedUntil: DateTime.now().millisecondsSinceEpoch +
          (_rentalDays * 24 * 60 * 60 * 1000),
      daysRented: _rentalDays,
      color: _bookToRent!.color,
    );

    gameProvider.addRentedBook(newRental);

    setState(() {
      _successBookTitle = _bookToRent!.title;
      _bookToRent = null;
      _showSuccessModal = true;
    });
  }

  void _handleReturnBook(BuildContext context, String bookTitle) {
    final gameProvider = Provider.of<GameProvider>(context, listen: false);
    final rentedBooks = gameProvider.getActiveRentedBooks();
    final book = rentedBooks.firstWhere((b) => b.title == bookTitle);

    final remainingTime =
        book.rentedUntil - DateTime.now().millisecondsSinceEpoch;
    final remainingDays =
        math.max(0, (remainingTime / (24 * 60 * 60 * 1000)).floor());

    if (remainingDays > 0) {
      final daysElapsed = book.daysRented - remainingDays;
      final priceForElapsedDays = _calculateRentalPrice(daysElapsed);
      final originalPrice = _calculateRentalPrice(book.daysRented);
      final refund = originalPrice - priceForElapsedDays;
      gameProvider.updateCoins(refund);

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Visszaadva! $refund arany visszatérítés'),
          backgroundColor: Colors.green,
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Könyv visszaadva!'),
          backgroundColor: Colors.green,
        ),
      );
    }

    gameProvider.removeRentedBook(bookTitle);
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                Color(0xFF451A03),
                Color(0xFF1C1917),
                Color(0xFF451A03),
              ],
            ),
          ),
          child: SafeArea(
            child: Column(
              children: [
                // Header
                Padding(
                  padding: const EdgeInsets.fromLTRB(16, 48, 16, 16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          Material(
                            color: const Color(0xFFB45309).withOpacity(0.8),
                            borderRadius: BorderRadius.circular(12),
                            child: InkWell(
                              onTap: widget.onBack,
                              borderRadius: BorderRadius.circular(12),
                              child: Container(
                                width: 40,
                                height: 40,
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(12),
                                  border: Border.all(
                                    color: const Color(0xFF78350F).withOpacity(0.5),
                                    width: 2,
                                  ),
                                ),
                                child: const Icon(
                                  Icons.arrow_back,
                                  color: Color(0xFFFEF3C7),
                                  size: 20,
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(width: 12),
                          const Icon(Icons.menu_book,
                              color: Color(0xFFFCD34D), size: 32),
                          const SizedBox(width: 8),
                          Text(
                            'Könyvtár',
                            style: GoogleFonts.inter(
                              color: const Color(0xFFFEF3C7),
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                      Material(
                        color: const Color(0xFFB45309).withOpacity(0.8),
                        borderRadius: BorderRadius.circular(12),
                        child: InkWell(
                          onTap: () {
                            setState(() {
                              _showRentalPanel = !_showRentalPanel;
                            });
                          },
                          borderRadius: BorderRadius.circular(12),
                          child: Container(
                            width: 40,
                            height: 40,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(
                                color: const Color(0xFF78350F).withOpacity(0.5),
                                width: 2,
                              ),
                            ),
                            child: Stack(
                              children: [
                                const Center(
                                  child: Icon(
                                    Icons.bookmark,
                                    color: Color(0xFFFEF3C7),
                                    size: 20,
                                  ),
                                ),
                                Consumer<GameProvider>(
                                  builder: (context, gameProvider, child) {
                                    final rentedBooks = gameProvider.getActiveRentedBooks();
                                    if (rentedBooks.isNotEmpty) {
                                      return Positioned(
                                        top: 2,
                                        right: 2,
                                        child: Container(
                                          width: 20,
                                          height: 20,
                                          decoration: BoxDecoration(
                                            color: Colors.red,
                                            shape: BoxShape.circle,
                                            border: Border.all(
                                              color: const Color(0xFF451A03),
                                              width: 2,
                                            ),
                                          ),
                                          child: Center(
                                            child: Text(
                                              '${rentedBooks.length}',
                                              style: GoogleFonts.inter(
                                                color: Colors.white,
                                                fontSize: 10,
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                          ),
                                        ),
                                      );
                                    }
                                    return const SizedBox.shrink();
                                  },
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                // Bookshelves
                Expanded(
                  child: ListView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
                    itemCount: _shelves.length,
                    itemBuilder: (context, shelfIndex) {
                      return _buildShelf(_shelves[shelfIndex], shelfIndex);
                    },
                  ),
                ),
              ],
            ),
          ),
        ),

        // Book Details Modal
        if (_selectedBook != null)
          _buildBookDetailsModal(),

        // Rental Dialog
        if (_bookToRent != null)
          _buildRentalDialog(),

        // Success Modal
        if (_showSuccessModal)
          _buildSuccessModal(),

        // Rental Panel
        if (_showRentalPanel)
          _buildRentalPanel(),
      ],
    );
  }

  Widget _buildBookDetailsModal() {
    final gameProvider = Provider.of<GameProvider>(context, listen: false);
    final isRented = _isBookRented(_selectedBook!.title);

    return GestureDetector(
      onTap: () => setState(() => _selectedBook = null),
      child: Container(
        color: Colors.black.withOpacity(0.7),
        child: Center(
          child: GestureDetector(
            onTap: () {},
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 32),
              padding: const EdgeInsets.all(32),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [Color(0xFFFEF3C7), Color(0xFFFCD34D)],
                ),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFF78350F), width: 4),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    padding: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      color: _selectedBook!.color,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      children: [
                        const Icon(Icons.menu_book, color: Colors.white, size: 48),
                        const SizedBox(height: 8),
                        Text(
                          _selectedBook!.title,
                          style: GoogleFonts.inter(
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  Text(
                    isRented
                        ? 'Ez a könyv jelenleg ki van kölcsönözve. Nyomd meg az "Olvasás" gombot a megtekintéshez.'
                        : _selectedBook!.hasContent
                            ? 'Ez egy pénzügyi és tőkepiaci oktatási könyv. Kölcsönözd ki, hogy hozzáférj a tartalmához!'
                            : 'Ez a könyv hamarosan elérhető lesz!',
                    style: GoogleFonts.inter(
                      color: const Color(0xFF78350F),
                      fontSize: 16,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 24),
                  if (_selectedBook!.hasContent && !isRented)
                    ElevatedButton.icon(
                      onPressed: () {
                        setState(() {
                          _bookToRent = _selectedBook;
                          _selectedBook = null;
                        });
                      },
                      icon: const Icon(Icons.payments),
                      label: const Text('Kölcsönzés'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.green,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                        textStyle: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                    ),
                  if (_selectedBook!.hasContent && isRented)
                    ElevatedButton.icon(
                      onPressed: () {
                        setState(() => _selectedBook = null);
                        // TODO: Open book reader
                      },
                      icon: const Icon(Icons.menu_book),
                      label: const Text('Olvasás'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
                        textStyle: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                    ),
                  const SizedBox(height: 12),
                  ElevatedButton(
                    onPressed: () => setState(() => _selectedBook = null),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFB45309),
                      foregroundColor: const Color(0xFFFEF3C7),
                      padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 12),
                    ),
                    child: const Text('Bezárás'),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildRentalDialog() {
    final gameProvider = Provider.of<GameProvider>(context);
    final price = _calculateRentalPrice(_rentalDays);

    return GestureDetector(
      onTap: () => setState(() => _bookToRent = null),
      child: Container(
        color: Colors.black.withOpacity(0.7),
        child: Center(
          child: GestureDetector(
            onTap: () {},
            child: Container(
              margin: const EdgeInsets.symmetric(horizontal: 32),
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [Color(0xFFFEF3C7), Color(0xFFFCD34D)],
                ),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFF78350F), width: 4),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Könyv Kölcsönzése',
                        style: GoogleFonts.inter(
                          color: const Color(0xFF78350F),
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Material(
                        color: const Color(0xFFB45309),
                        shape: const CircleBorder(),
                        child: InkWell(
                          onTap: () => setState(() => _bookToRent = null),
                          customBorder: const CircleBorder(),
                          child: Container(
                            width: 32,
                            height: 32,
                            alignment: Alignment.center,
                            child: const Icon(Icons.close, color: Color(0xFFFEF3C7), size: 20),
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: _bookToRent!.color,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      children: [
                        Expanded(
                          child: Text(
                            _bookToRent!.title,
                            style: GoogleFonts.inter(
                              color: Colors.white,
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Icon(Icons.calendar_today, size: 16, color: Color(0xFF78350F)),
                          const SizedBox(width: 8),
                          Text(
                            'Kölcsönzési időszak',
                            style: GoogleFonts.inter(
                              color: const Color(0xFF78350F),
                              fontSize: 14,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      SliderTheme(
                        data: SliderTheme.of(context).copyWith(
                          activeTrackColor: const Color(0xFFB45309),
                          inactiveTrackColor: const Color(0xFFFCD34D),
                          thumbColor: const Color(0xFF78350F),
                          overlayColor: const Color(0xFF78350F).withOpacity(0.2),
                          trackHeight: 8,
                        ),
                        child: Slider(
                          value: _rentalDays.toDouble(),
                          min: 1,
                          max: 30,
                          divisions: 29,
                          onChanged: (value) => setState(() => _rentalDays = value.round()),
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text('1 nap', style: GoogleFonts.inter(fontSize: 12, color: const Color(0xFF78350F))),
                          Text('$_rentalDays nap', style: GoogleFonts.inter(fontSize: 14, fontWeight: FontWeight.bold, color: const Color(0xFF78350F))),
                          Text('30 nap', style: GoogleFonts.inter(fontSize: 12, color: const Color(0xFF78350F))),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFFEAB308), Color(0xFFF59E0B)],
                      ),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            const Icon(Icons.payments, color: Color(0xFF78350F)),
                            const SizedBox(width: 8),
                            Text(
                              'Ár:',
                              style: GoogleFonts.inter(
                                color: const Color(0xFF78350F),
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text(
                              '$price',
                              style: GoogleFonts.inter(
                                color: const Color(0xFF78350F),
                                fontSize: 24,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(
                              '(~${(price / _rentalDays).round()} arany/nap)',
                              style: GoogleFonts.inter(
                                color: const Color(0xFF92400E),
                                fontSize: 12,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFCD34D).withOpacity(0.5),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Egyenleged:',
                          style: GoogleFonts.inter(
                            color: const Color(0xFF78350F),
                            fontSize: 14,
                          ),
                        ),
                        Row(
                          children: [
                            const Icon(Icons.payments, size: 20, color: Color(0xFF78350F)),
                            const SizedBox(width: 4),
                            Text(
                              '${gameProvider.gameState.coins}',
                              style: GoogleFonts.inter(
                                color: const Color(0xFF78350F),
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      onPressed: gameProvider.gameState.coins >= price
                          ? () => _handleRentBook(context)
                          : null,
                      icon: const Icon(Icons.payments),
                      label: Text('Kölcsönzés - $price arany'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.green,
                        foregroundColor: Colors.white,
                        disabledBackgroundColor: Colors.grey,
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        textStyle: GoogleFonts.inter(fontSize: 16, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),
                  const SizedBox(height: 8),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: () => setState(() => _bookToRent = null),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color(0xFFB45309),
                        foregroundColor: const Color(0xFFFEF3C7),
                        padding: const EdgeInsets.symmetric(vertical: 12),
                      ),
                      child: const Text('Mégse'),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSuccessModal() {
    return GestureDetector(
      onTap: () => setState(() => _showSuccessModal = false),
      child: Container(
        color: Colors.black.withOpacity(0.7),
        child: Center(
          child: Container(
            margin: const EdgeInsets.symmetric(horizontal: 32),
            padding: const EdgeInsets.all(32),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [Color(0xFFFEF3C7), Color(0xFFFCD34D)],
              ),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFB45309), width: 4),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      colors: [Color(0xFFB45309), Color(0xFF78350F)],
                    ),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.bookmark, color: Colors.white, size: 40),
                ),
                const SizedBox(height: 24),
                Text(
                  'Sikeres kölcsönzés!',
                  style: GoogleFonts.inter(
                    color: const Color(0xFF78350F),
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 16),
                Text(
                  _successBookTitle,
                  style: GoogleFonts.inter(
                    color: const Color(0xFF92400E),
                    fontSize: 18,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 8),
                Text(
                  'Most már hozzáférhetsz a könyv tartalmához!',
                  style: GoogleFonts.inter(
                    color: const Color(0xFF92400E).withOpacity(0.7),
                    fontSize: 14,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 24),
                ElevatedButton(
                  onPressed: () => setState(() => _showSuccessModal = false),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFB45309),
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(horizontal: 48, vertical: 16),
                    textStyle: GoogleFonts.inter(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  child: const Text('Rendben'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildRentalPanel() {
    final gameProvider = Provider.of<GameProvider>(context);

    return GestureDetector(
      onTap: () => setState(() => _showRentalPanel = false),
      child: Container(
        color: Colors.black.withOpacity(0.5),
        child: Align(
          alignment: Alignment.centerRight,
          child: GestureDetector(
            onTap: () {},
            child: Container(
              width: 320,
              height: double.infinity,
              decoration: BoxDecoration(
                gradient: const LinearGradient(
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                  colors: [Color(0xFFFEF3C7), Color(0xFFFCD34D)],
                ),
                border: const Border(
                  left: BorderSide(color: Color(0xFF78350F), width: 4),
                ),
              ),
              child: SafeArea(
                child: Column(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: const BoxDecoration(
                        gradient: LinearGradient(
                          colors: [Color(0xFFB45309), Color(0xFF78350F)],
                        ),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Row(
                            children: [
                              const Icon(Icons.bookmark, color: Color(0xFFFEF3C7)),
                              const SizedBox(width: 8),
                              Text(
                                'Kölcsönzött Könyvek',
                                style: GoogleFonts.inter(
                                  color: const Color(0xFFFEF3C7),
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                          Material(
                            color: const Color(0xFF451A03),
                            shape: const CircleBorder(),
                            child: InkWell(
                              onTap: () => setState(() => _showRentalPanel = false),
                              customBorder: const CircleBorder(),
                              child: Container(
                                width: 32,
                                height: 32,
                                alignment: Alignment.center,
                                child: const Icon(Icons.close, color: Color(0xFFFEF3C7), size: 20),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                    Expanded(
                      child: Consumer<GameProvider>(
                        builder: (context, gameProvider, child) {
                          final rentedBooks = gameProvider.getActiveRentedBooks();

                          return rentedBooks.isEmpty
                              ? Center(
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      const Icon(Icons.menu_book, size: 64, color: Color(0xFFB45309)),
                                      const SizedBox(height: 16),
                                      Text(
                                        'Még nincs kikölcsönzött könyved',
                                        style: GoogleFonts.inter(
                                          color: const Color(0xFF78350F),
                                          fontSize: 14,
                                        ),
                                        textAlign: TextAlign.center,
                                      ),
                                      const SizedBox(height: 8),
                                      Text(
                                        'Kölcsönözz ki egy könyvet a polcokról!',
                                        style: GoogleFonts.inter(
                                          color: const Color(0xFF92400E),
                                          fontSize: 12,
                                        ),
                                        textAlign: TextAlign.center,
                                      ),
                                    ],
                                  ),
                                )
                              : ListView.builder(
                                  padding: const EdgeInsets.all(16),
                                  itemCount: rentedBooks.length,
                                  itemBuilder: (context, index) {
                                    final book = rentedBooks[index];
                                final remainingDays = _getRemainingDays(book.rentedUntil);
                                final isExpiringSoon = remainingDays <= 3;

                                return Container(
                                  margin: const EdgeInsets.only(bottom: 16),
                                  padding: const EdgeInsets.all(16),
                                  decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(12),
                                    border: Border.all(color: const Color(0xFFB45309), width: 2),
                                  ),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Container(
                                        padding: const EdgeInsets.all(12),
                                        decoration: BoxDecoration(
                                          color: book.color,
                                          borderRadius: BorderRadius.circular(8),
                                        ),
                                        child: Row(
                                          children: [
                                            const Icon(Icons.menu_book, color: Colors.white, size: 20),
                                            const SizedBox(width: 8),
                                            Expanded(
                                              child: Text(
                                                book.title,
                                                style: GoogleFonts.inter(
                                                  color: Colors.white,
                                                  fontSize: 14,
                                                  fontWeight: FontWeight.bold,
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                      const SizedBox(height: 12),
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Row(
                                            children: [
                                              const Icon(Icons.calendar_today, size: 16, color: Color(0xFF78350F)),
                                              const SizedBox(width: 4),
                                              Text(
                                                'Kölcsönözve:',
                                                style: GoogleFonts.inter(
                                                  color: const Color(0xFF78350F),
                                                  fontSize: 12,
                                                ),
                                              ),
                                            ],
                                          ),
                                          Text(
                                            '${book.daysRented} napra',
                                            style: GoogleFonts.inter(
                                              color: const Color(0xFF78350F),
                                              fontSize: 12,
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                        ],
                                      ),
                                      const SizedBox(height: 8),
                                      Row(
                                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                        children: [
                                          Row(
                                            children: [
                                              Icon(
                                                Icons.access_time,
                                                size: 16,
                                                color: isExpiringSoon ? Colors.red : const Color(0xFF78350F),
                                              ),
                                              const SizedBox(width: 4),
                                              Text(
                                                'Hátralévő idő:',
                                                style: GoogleFonts.inter(
                                                  color: isExpiringSoon ? Colors.red : const Color(0xFF78350F),
                                                  fontSize: 12,
                                                ),
                                              ),
                                            ],
                                          ),
                                          Text(
                                            '$remainingDays nap',
                                            style: GoogleFonts.inter(
                                              color: isExpiringSoon ? Colors.red : const Color(0xFF78350F),
                                              fontSize: 12,
                                              fontWeight: FontWeight.bold,
                                            ),
                                          ),
                                        ],
                                      ),
                                      const SizedBox(height: 8),
                                      LinearProgressIndicator(
                                        value: remainingDays / book.daysRented,
                                        backgroundColor: const Color(0xFFFCD34D),
                                        color: isExpiringSoon ? Colors.red : Colors.green,
                                        minHeight: 8,
                                      ),
                                      const SizedBox(height: 12),
                                      Row(
                                        children: [
                                          Expanded(
                                            child: ElevatedButton.icon(
                                              onPressed: () {
                                                setState(() => _showRentalPanel = false);
                                                // TODO: Open book reader
                                              },
                                              icon: const Icon(Icons.menu_book, size: 16),
                                              label: const Text('Olvasás'),
                                              style: ElevatedButton.styleFrom(
                                                backgroundColor: Colors.blue,
                                                foregroundColor: Colors.white,
                                                padding: const EdgeInsets.symmetric(vertical: 8),
                                                textStyle: GoogleFonts.inter(fontSize: 12),
                                              ),
                                            ),
                                          ),
                                          const SizedBox(width: 8),
                                          Expanded(
                                            child: ElevatedButton(
                                              onPressed: () => _handleReturnBook(context, book.title),
                                              style: ElevatedButton.styleFrom(
                                                backgroundColor: Colors.red,
                                                foregroundColor: Colors.white,
                                                padding: const EdgeInsets.symmetric(vertical: 8),
                                                textStyle: GoogleFonts.inter(fontSize: 12),
                                              ),
                                              child: const Text('Visszaadás'),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                );
                              },
                            );
                        },
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: const Color(0xFFFCD34D).withOpacity(0.3),
                        border: const Border(
                          top: BorderSide(color: Color(0xFFB45309), width: 2),
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Tudnivalók',
                            style: GoogleFonts.inter(
                              color: const Color(0xFF78350F),
                              fontSize: 14,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            '• Min. 1 nap, max. 30 nap kölcsönzés\n'
                            '• 1 nap = 50 arany\n'
                            '• 30 nap = 1000 arany (kedvezmény!)\n'
                            '• Hosszabb időszak = jobb ár/nap arány\n'
                            '• Korai visszaadásnál időarányos visszatérítés',
                            style: GoogleFonts.inter(
                              color: const Color(0xFF92400E),
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildShelf(List<BookData> books, int shelfIndex) {
    return Container(
      margin: const EdgeInsets.only(bottom: 24),
      child: Column(
        children: [
          // Books
          SizedBox(
            height: 180,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: books.map((book) {
                final isRented = _isBookRented(book.title);
                final random = math.Random(book.title.hashCode);
                final height = 140.0 + random.nextDouble() * 40;

                return GestureDetector(
                  onTap: () {
                    setState(() {
                      _selectedBook = book;
                    });
                  },
                  child: Container(
                    width: book.width.toDouble(),
                    height: height,
                    margin: const EdgeInsets.symmetric(horizontal: 2),
                    child: Stack(
                      children: [
                        // Book spine
                        Container(
                          decoration: BoxDecoration(
                            gradient: LinearGradient(
                              begin: Alignment.topCenter,
                              end: Alignment.bottomCenter,
                              colors: [
                                book.color,
                                book.color.withOpacity(0.7),
                              ],
                            ),
                            borderRadius: BorderRadius.circular(4),
                            border: Border(
                              left: BorderSide(
                                  color: book.color.withOpacity(0.5), width: 2),
                              right: BorderSide(
                                  color: book.color.withOpacity(0.5), width: 2),
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: book.color.withOpacity(0.3),
                                blurRadius: 8,
                                spreadRadius: 2,
                              ),
                            ],
                          ),
                          child: Center(
                            child: RotatedBox(
                              quarterTurns: 3,
                              child: Padding(
                                padding: const EdgeInsets.symmetric(horizontal: 4),
                                child: Text(
                                  book.title,
                                  style: GoogleFonts.inter(
                                    color: Colors.white,
                                    fontSize: 10,
                                    fontWeight: FontWeight.w600,
                                  ),
                                  textAlign: TextAlign.center,
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                            ),
                          ),
                        ),

                        // Rented indicator
                        if (isRented)
                          Positioned(
                            top: 0,
                            left: 0,
                            right: 0,
                            child: Container(
                              padding: const EdgeInsets.symmetric(vertical: 2),
                              decoration: BoxDecoration(
                                color: Colors.green,
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: const Icon(
                                Icons.bookmark,
                                color: Colors.white,
                                size: 12,
                              ),
                            ),
                          ),
                      ],
                    ),
                  ),
                );
              }).toList(),
            ),
          ),

          // Shelf
          Container(
            height: 12,
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  Color(0xFFB45309),
                  Color(0xFF451A03),
                ],
              ),
              borderRadius: BorderRadius.circular(2),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.5),
                  blurRadius: 8,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
          ),
          Container(
            height: 4,
            decoration: BoxDecoration(
              color: const Color(0xFF451A03).withOpacity(0.8),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.3),
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

class BookData {
  final String title;
  final Color color;
  final double width;
  final bool hasContent;

  BookData({
    required this.title,
    required this.color,
    required this.width,
    this.hasContent = false,
  });
}

