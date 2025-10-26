import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Colors matching the original design
  static const primaryPurple = Color(0xFF7C3AED);
  static const deepPurple = Color(0xFF581C87);
  static const darkBg = Color(0xFF0F172A);
  static const darkCard = Color(0xFF1E293B);

  static const goldCoin = Color(0xFFF59E0B);
  static const diamondGem = Color(0xFFA855F7);

  static const freeTag = Color(0xFF6B7280);
  static const proTag = Color(0xFF3B82F6);
  static const masterTag = Color(0xFFF59E0B);

  // Gradients
  static const backgroundGradient = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [
      Color(0xFF0F172A), // slate-900
      Color(0xFF581C87), // purple-900/40
      Color(0xFF0F172A), // slate-900
    ],
  );

  static LinearGradient cardGradient(Color baseColor) {
    return LinearGradient(
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
      colors: [
        baseColor.withOpacity(0.8),
        baseColor.withOpacity(0.6),
      ],
    );
  }

  // Theme Data
  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      primaryColor: primaryPurple,
      scaffoldBackgroundColor: darkBg,

      textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme),

      colorScheme: const ColorScheme.dark(
        primary: primaryPurple,
        secondary: deepPurple,
        surface: darkCard,
        background: darkBg,
      ),

      cardTheme: CardThemeData(
        color: darkCard,
        elevation: 4,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
      ),

      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryPurple,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
      ),

      appBarTheme: AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        titleTextStyle: GoogleFonts.inter(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: Colors.white,
        ),
        iconTheme: const IconThemeData(color: Colors.white),
      ),
    );
  }

  // Book Colors (matching original design)
  static const Map<String, Color> bookColors = {
    'Tőkepiaci Szótár': Color(0xFFB45309), // amber-700
    'Befektetés Alapjai': Color(0xFF1D4ED8), // blue-700
    'Pénzügyi Alapismeretek': Color(0xFF334155), // slate-700
    'Részvények': Color(0xFF15803D), // green-700
    'Kötvények': Color(0xFF7E22CE), // purple-700
    'Portfolió Kezelés': Color(0xFFB91C1C), // red-700
    'Technikai Elemzés': Color(0xFF4338CA), // indigo-700
    'Fundamentális Elemzés': Color(0xFF0F766E), // teal-700
    'Pénzügyi Matematika': Color(0xFFC2410C), // orange-700
    'Opciók': Color(0xFFBE185D), // pink-700
    'Határidős Ügyletek': Color(0xFF0E7490), // cyan-700
    'Kockázatkezelés': Color(0xFF374151), // gray-700
    'Makrogazdaság': Color(0xFFA16207), // yellow-700
    'Kripto és Blockchain': Color(0xFF15803D), // green-700
    'Pszichológia és Trading': Color(0xFF1D4ED8), // blue-700
    'Ingatlan Befektetés': Color(0xFFB91C1C), // red-700
  };
}
