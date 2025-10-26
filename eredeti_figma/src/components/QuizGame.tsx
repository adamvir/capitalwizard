import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Trophy, ThumbsDown } from 'lucide-react';
import { getGameConfig } from '../utils/gameConfig';
import type { Lesson } from '../data/penzugyiAlapismeretkLessons';

interface QuizGameProps {
  onBackToHome?: () => void;
  onWin?: () => void;
  lessonNumber?: number;
  lessonData?: Lesson;
}

interface Question {
  question: string;
  answers: string[];
  correctAnswer: number; // 0-based index
}

export function QuizGame({ onBackToHome, onWin, lessonNumber = 1, lessonData }: QuizGameProps) {
  console.log('❓ QuizGame mounted/updated:', { lessonNumber, hasLessonData: !!lessonData });
  
  const config = getGameConfig();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);

  // Initialize with ALL questions from the lesson
  useEffect(() => {
    // Only works with lessonData from penzugyiAlapismeretkLessons
    if (lessonData) {
      const allQuestions: Question[] = lessonData.quiz.map(q => ({
        question: q.question,
        answers: q.options,
        correctAnswer: q.correctAnswer
      }));
      
      // Use ALL questions from the lesson (shuffle for variety but include all)
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
      
      setSelectedQuestions(shuffled);
    }
  }, [lessonData]);

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  const handleAnswerClick = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections

    setSelectedAnswer(answerIndex);

    // Check if answer is correct
    if (currentQuestion && answerIndex === currentQuestion.correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }

    // Wait a moment to show feedback, then move to next question or finish
    setTimeout(() => {
      if (currentQuestionIndex < selectedQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setGameFinished(true);
      }
    }, 1000);
  };

  useEffect(() => {
    if (gameFinished && !showResult) {
      setTimeout(() => {
        setShowResult(true);
      }, 500);
    }
  }, [gameFinished, showResult]);

  // Calculate minimum required answers as 80% of total questions
  const minRequired = Math.ceil(selectedQuestions.length * 0.8); // 80% of questions
  const isWin = correctAnswers >= minRequired;

  // Wait for questions to load (AFTER all hooks)
  if (!currentQuestion && !gameFinished) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white">Betöltés...</div>
      </div>
    );
  }

  const handleContinue = () => {
    console.log('❓ QuizGame handleContinue:', {
      isWin,
      correctAnswers,
      totalQuestions: selectedQuestions.length,
      minRequired,
      hasOnWin: !!onWin
    });
    
    if (isWin && onWin) {
      console.log('✅ QuizGame calling onWin!');
      onWin();
    } else if (onBackToHome) {
      console.log('⬅️ QuizGame calling onBackToHome');
      onBackToHome();
    }
  };

  if (gameFinished && showResult) {
    return (
      <div className="flex-1 flex flex-col">
        {/* Result screen */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {isWin ? (
            <>
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-yellow-500/50 animate-pulse">
                <Trophy className="w-16 h-16 text-yellow-900" />
              </div>
              <h2 className="text-white text-3xl mb-2">Győzelem!</h2>
              <p className="text-slate-300 text-center mb-8">
                {correctAnswers}/{selectedQuestions.length} helyes válasz
              </p>
            </>
          ) : (
            <>
              <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-red-500/50">
                <ThumbsDown className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-white text-3xl mb-2">Vereség</h2>
              <p className="text-slate-300 text-center mb-8">
                {correctAnswers}/{selectedQuestions.length} helyes válasz<br />
                <span className="text-sm">Minimum {Math.ceil(selectedQuestions.length * 0.8)} helyes válasz szükséges</span>
              </p>
            </>
          )}

          <button
            onClick={handleContinue}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-4 px-12 rounded-xl shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 active:scale-95"
          >
            Folytatás
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="px-6 pt-4 pb-4">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={onBackToHome}
            className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-lg flex items-center justify-center shadow-lg">
              <ArrowLeft className="w-5 h-5" />
            </div>
          </button>
          
          <h1 className="text-white text-2xl">{lessonNumber}. Lecke</h1>
          
          <div className="w-8 h-8"></div> {/* Spacer for centering */}
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {selectedQuestions.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentQuestionIndex
                  ? 'w-8 bg-purple-500'
                  : index < currentQuestionIndex
                  ? 'w-2 bg-green-500'
                  : 'w-2 bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question and answers */}
      <div className="flex-1 px-6 pb-6 flex flex-col">
        {/* Question */}
        <div className="bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-xl p-6 mb-6 shadow-lg">
          <div className="flex items-start justify-between mb-2">
            <div className="text-slate-300 text-sm">Kérdés {currentQuestionIndex + 1}/10</div>
            <div className="text-slate-400 text-sm">
              Helyes: <span className="text-green-400">{correctAnswers}</span>/{currentQuestionIndex + (selectedAnswer !== null ? 1 : 0)}
            </div>
          </div>
          <h2 className="text-white text-xl">{currentQuestion.question}</h2>
        </div>

        {/* Answers */}
        <div className="space-y-3 flex-1">
          {currentQuestion.answers.map((answer, index) => {
            if (!answer) return null; // Skip empty answers
            
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            const showFeedback = selectedAnswer !== null;

            let buttonClasses = 'w-full bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-xl p-4 shadow-lg transition-all duration-300 text-left';
            
            if (showFeedback) {
              if (isSelected && isCorrect) {
                buttonClasses = 'w-full bg-green-600/80 border border-green-400 rounded-xl p-4 shadow-lg shadow-green-500/30 text-left';
              } else if (isSelected && !isCorrect) {
                buttonClasses = 'w-full bg-red-600/80 border border-red-400 rounded-xl p-4 shadow-lg shadow-red-500/30 text-left';
              } else if (isCorrect) {
                buttonClasses = 'w-full bg-green-600/60 border border-green-400/50 rounded-xl p-4 shadow-lg text-left';
              }
            } else {
              buttonClasses += ' hover:bg-slate-700/60 hover:border-slate-500 active:scale-98';
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
                className={buttonClasses}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-700/60 rounded-lg flex items-center justify-center text-white">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-white">{answer}</span>
                  </div>
                  {showFeedback && (
                    <>
                      {isSelected && isCorrect && (
                        <CheckCircle2 className="w-6 h-6 text-green-300" />
                      )}
                      {isSelected && !isCorrect && (
                        <XCircle className="w-6 h-6 text-red-300" />
                      )}
                      {!isSelected && isCorrect && (
                        <CheckCircle2 className="w-6 h-6 text-green-300" />
                      )}
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}