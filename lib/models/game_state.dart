import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';

enum SubscriptionTier { free, pro, master }

enum GameType { reading, matching, quiz }

class RentedBook {
  final String title;
  final int rentedUntil;
  final int daysRented;
  final Color color;

  RentedBook({
    required this.title,
    required this.rentedUntil,
    required this.daysRented,
    required this.color,
  });

  factory RentedBook.fromJson(Map<String, dynamic> json) {
    return RentedBook(
      title: json['title'] ?? '',
      rentedUntil: json['rentedUntil'] ?? 0,
      daysRented: json['daysRented'] ?? 0,
      color: Color(json['color'] ?? 0xFF7C3AED),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'rentedUntil': rentedUntil,
      'daysRented': daysRented,
      'color': color.toARGB32(),
    };
  }
}

class GameState extends Equatable {
  final String currentPage;
  final int coins;
  final int gems;
  final int currentLesson;
  final int progressPosition;
  final int playerLevel;
  final int totalXp;
  final String selectedBookTitle;
  final SubscriptionTier subscriptionTier;
  final bool hasSeenWelcome;
  final int currentStageInSection;
  final int totalStagesCompleted;
  final int currentBookLessonIndex;
  final GameType currentGameType;
  final bool isFirstRound;
  final List<RentedBook> rentedBooks;

  const GameState({
    required this.currentPage,
    required this.coins,
    required this.gems,
    required this.currentLesson,
    required this.progressPosition,
    required this.playerLevel,
    required this.totalXp,
    required this.selectedBookTitle,
    required this.subscriptionTier,
    required this.hasSeenWelcome,
    required this.currentStageInSection,
    required this.totalStagesCompleted,
    required this.currentBookLessonIndex,
    required this.currentGameType,
    required this.isFirstRound,
    required this.rentedBooks,
  });

  factory GameState.initial() {
    return const GameState(
      currentPage: 'main',
      coins: 1000,
      gems: 0,
      currentLesson: 7,
      progressPosition: 0,
      playerLevel: 0,
      totalXp: 0,
      selectedBookTitle: 'Tőkepiaci Szótár',
      subscriptionTier: SubscriptionTier.free,
      hasSeenWelcome: false,
      currentStageInSection: 1,
      totalStagesCompleted: 0,
      currentBookLessonIndex: 0,
      currentGameType: GameType.reading,
      isFirstRound: true,
      rentedBooks: [],
    );
  }

  factory GameState.fromJson(Map<String, dynamic> json) {
    List<RentedBook> rentedBooks = [];
    if (json['rentedBooks'] != null) {
      rentedBooks = (json['rentedBooks'] as List)
          .map((bookJson) => RentedBook.fromJson(bookJson))
          .toList();
    }

    return GameState(
      currentPage: json['currentPage'] ?? 'main',
      coins: json['coins'] ?? 1000,
      gems: json['gems'] ?? 0,
      currentLesson: json['currentLesson'] ?? 7,
      progressPosition: json['progressPosition'] ?? 0,
      playerLevel: json['playerLevel'] ?? 0,
      totalXp: json['totalXp'] ?? 0,
      selectedBookTitle: json['selectedBookTitle'] ?? 'Tőkepiaci Szótár',
      subscriptionTier: SubscriptionTier.values.firstWhere(
        (e) => e.name == (json['subscriptionTier'] ?? 'free'),
        orElse: () => SubscriptionTier.free,
      ),
      hasSeenWelcome: json['hasSeenWelcome'] ?? false,
      currentStageInSection: json['currentStageInSection'] ?? 1,
      totalStagesCompleted: json['totalStagesCompleted'] ?? 0,
      currentBookLessonIndex: json['currentBookLessonIndex'] ?? 0,
      currentGameType: GameType.values.firstWhere(
        (e) => e.name == (json['currentGameType'] ?? 'reading'),
        orElse: () => GameType.reading,
      ),
      isFirstRound: json['isFirstRound'] ?? true,
      rentedBooks: rentedBooks,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'currentPage': currentPage,
      'coins': coins,
      'gems': gems,
      'currentLesson': currentLesson,
      'progressPosition': progressPosition,
      'playerLevel': playerLevel,
      'totalXp': totalXp,
      'selectedBookTitle': selectedBookTitle,
      'subscriptionTier': subscriptionTier.name,
      'hasSeenWelcome': hasSeenWelcome,
      'currentStageInSection': currentStageInSection,
      'totalStagesCompleted': totalStagesCompleted,
      'currentBookLessonIndex': currentBookLessonIndex,
      'currentGameType': currentGameType.name,
      'isFirstRound': isFirstRound,
      'rentedBooks': rentedBooks.map((book) => book.toJson()).toList(),
    };
  }

  GameState copyWith({
    String? currentPage,
    int? coins,
    int? gems,
    int? currentLesson,
    int? progressPosition,
    int? playerLevel,
    int? totalXp,
    String? selectedBookTitle,
    SubscriptionTier? subscriptionTier,
    bool? hasSeenWelcome,
    int? currentStageInSection,
    int? totalStagesCompleted,
    int? currentBookLessonIndex,
    GameType? currentGameType,
    bool? isFirstRound,
    List<RentedBook>? rentedBooks,
  }) {
    return GameState(
      currentPage: currentPage ?? this.currentPage,
      coins: coins ?? this.coins,
      gems: gems ?? this.gems,
      currentLesson: currentLesson ?? this.currentLesson,
      progressPosition: progressPosition ?? this.progressPosition,
      playerLevel: playerLevel ?? this.playerLevel,
      totalXp: totalXp ?? this.totalXp,
      selectedBookTitle: selectedBookTitle ?? this.selectedBookTitle,
      subscriptionTier: subscriptionTier ?? this.subscriptionTier,
      hasSeenWelcome: hasSeenWelcome ?? this.hasSeenWelcome,
      currentStageInSection: currentStageInSection ?? this.currentStageInSection,
      totalStagesCompleted: totalStagesCompleted ?? this.totalStagesCompleted,
      currentBookLessonIndex: currentBookLessonIndex ?? this.currentBookLessonIndex,
      currentGameType: currentGameType ?? this.currentGameType,
      isFirstRound: isFirstRound ?? this.isFirstRound,
      rentedBooks: rentedBooks ?? this.rentedBooks,
    );
  }

  @override
  List<Object?> get props => [
        currentPage,
        coins,
        gems,
        currentLesson,
        progressPosition,
        playerLevel,
        totalXp,
        selectedBookTitle,
        subscriptionTier,
        hasSeenWelcome,
        currentStageInSection,
        totalStagesCompleted,
        currentBookLessonIndex,
        currentGameType,
        isFirstRound,
        rentedBooks,
      ];
}
