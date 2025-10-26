import 'package:equatable/equatable.dart';

class ReadingQuestion extends Equatable {
  final String question;
  final String answer;
  final List<String> keywords;

  const ReadingQuestion({
    required this.question,
    required this.answer,
    required this.keywords,
  });

  @override
  List<Object?> get props => [question, answer, keywords];
}

class ReadingContent extends Equatable {
  final String title;
  final String content;
  final List<ReadingQuestion> questions;

  const ReadingContent({
    required this.title,
    required this.content,
    required this.questions,
  });

  @override
  List<Object?> get props => [title, content, questions];
}

class MatchingPair extends Equatable {
  final int id;
  final String left;
  final String right;

  const MatchingPair({
    required this.id,
    required this.left,
    required this.right,
  });

  @override
  List<Object?> get props => [id, left, right];
}

class QuizQuestion extends Equatable {
  final String question;
  final List<String> options;
  final int correctAnswer;

  const QuizQuestion({
    required this.question,
    required this.options,
    required this.correctAnswer,
  });

  @override
  List<Object?> get props => [question, options, correctAnswer];
}

class Lesson extends Equatable {
  final int id;
  final int pageNumber;
  final ReadingContent reading;
  final List<MatchingPair> matching;
  final List<QuizQuestion> quiz;

  const Lesson({
    required this.id,
    required this.pageNumber,
    required this.reading,
    required this.matching,
    required this.quiz,
  });

  @override
  List<Object?> get props => [id, pageNumber, reading, matching, quiz];
}
