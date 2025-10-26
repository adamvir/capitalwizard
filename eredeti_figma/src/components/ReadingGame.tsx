import { useState, useEffect } from 'react';
import { ArrowLeft, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { getGameConfig } from '../utils/gameConfig';
import type { Lesson } from '../data/penzugyiAlapismeretkLessons';

interface ReadingGameProps {
  onBackToHome?: () => void;
  onWin?: () => void;
  lessonNumber?: number;
  lessonData?: Lesson;
}

type GameState = 'reading' | 'questions' | 'result';

interface Question {
  question: string;
  answer: string;
  keywords: string[]; // Keywords for flexible matching
}

export function ReadingGame({ onBackToHome, onWin, lessonNumber = 1, lessonData }: ReadingGameProps) {
  console.log('📖 ReadingGame mounted/updated:', { lessonNumber, hasLessonData: !!lessonData });
  
  const config = getGameConfig();
  const [gameState, setGameState] = useState<GameState>('reading');
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<boolean[]>([]);
  const [score, setScore] = useState(0);

  // Use lessonData from penzugyiAlapismeretkLessons
  const readingContent = lessonData?.reading.content || "";
  const readingTitle = lessonData?.reading.title || "";

  // Initialize with ALL questions from the lesson
  useEffect(() => {
    // Only works with lessonData from penzugyiAlapismeretkLessons
    if (lessonData && lessonData.reading.questions) {
      const allQuestions: Question[] = lessonData.reading.questions.map(q => ({
        question: q.question,
        answer: q.answer,
        keywords: q.keywords
      }));
      
      // Use ALL questions from the lesson (shuffle for variety but include all)
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
      const selectedQs = shuffled;
      
      setSelectedQuestions(selectedQs);
      setAnswers(Array(selectedQs.length).fill(''));
    }
  }, [lessonData, config.readingQuestionsCount]);

  const handleReadComplete = () => {
    setGameState('questions');
  };

  const checkAnswer = (userAnswer: string, question: Question): boolean => {
    const normalized = userAnswer.toLowerCase().trim();
    // Check if any keyword is in the answer
    return question.keywords.some(keyword => 
      normalized.includes(keyword.toLowerCase())
    );
  };

  const handleSubmitAnswers = () => {
    const checkedResults = selectedQuestions.map((q, index) => checkAnswer(answers[index], q));
    const correctCount = checkedResults.filter(r => r).length;
    const percentage = (correctCount / selectedQuestions.length) * 100;
    
    setResults(checkedResults);
    setScore(percentage);
    setGameState('result');
  };

  const handleRetry = () => {
    setAnswers(Array(selectedQuestions.length).fill(''));
    setResults([]);
    setScore(0);
    setGameState('questions');
  };

  const handleFinish = () => {
    // Calculate minimum required answers as 80% of total questions
    const correctCount = results.filter(r => r).length;
    const minRequired = Math.ceil(selectedQuestions.length * 0.8); // 80% of questions
    console.log('📖 ReadingGame handleFinish:', {
      correctCount,
      totalQuestions: selectedQuestions.length,
      minRequired,
      willCallOnWin: correctCount >= minRequired
    });
    
    if (onWin && correctCount >= minRequired) {
      console.log('✅ ReadingGame calling onWin!');
      onWin();
    } else if (onBackToHome) {
      console.log('⬅️ ReadingGame calling onBackToHome');
      onBackToHome();
    }
  };

  return (
    <div className="flex-1 flex flex-col px-6 pt-4 pb-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={onBackToHome}
          className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-lg flex items-center justify-center shadow-lg">
            <ArrowLeft className="w-5 h-5" />
          </div>
          <span>Vissza</span>
        </button>
        
        <div className="flex items-center gap-2 text-white">
          <BookOpen className="w-5 h-5" />
          <span>{lessonNumber}. Lecke - Szövegértés</span>
        </div>
      </div>

      {/* Reading Content */}
      {gameState === 'reading' && (
        <>
          <div className="flex-1 bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-xl p-5 shadow-lg overflow-y-auto mb-4">
            <div className="text-white space-y-4 leading-relaxed">
              <h2 className="text-center text-xl mb-4 text-purple-300">{readingTitle}</h2>
              
              {readingContent.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-slate-200">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <button
            onClick={handleReadComplete}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95"
          >
            Elolvastam
          </button>
        </>
      )}

      {/* Questions */}
      {gameState === 'questions' && (
        <>
          <div className="flex-1 bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-xl p-5 shadow-lg overflow-y-auto mb-4">
            <h2 className="text-white text-center text-xl mb-5 text-purple-300">Válaszolj a kérdésekre!</h2>
            <div className="space-y-4">
              {selectedQuestions.map((q, index) => (
                <div key={index} className="space-y-2">
                  <label className="text-slate-200 block">
                    {index + 1}. {q.question}
                  </label>
                  <input
                    type="text"
                    value={answers[index]}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[index] = e.target.value;
                      setAnswers(newAnswers);
                    }}
                    className="w-full px-4 py-2 bg-slate-700/60 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                    placeholder="Válaszod..."
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmitAnswers}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 px-6 rounded-xl shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 active:scale-95"
          >
            Ellenőrzés
          </button>
        </>
      )}

      {/* Results */}
      {gameState === 'result' && (
        <>
          <div className="flex-1 bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-xl p-5 shadow-lg overflow-y-auto mb-4">
            <h2 className="text-white text-center text-xl mb-3">
              {score >= 80 ? '🎉 Gratulálunk!' : '😔 Próbáld újra!'}
            </h2>
            
            <div className="text-center mb-5">
              <div className="text-3xl text-white mb-2">{score.toFixed(0)}%</div>
              <div className="text-slate-300">
                {results.filter(r => r).length} helyes válasz {selectedQuestions.length}-ből
              </div>
            </div>

            <div className="space-y-3">
              {selectedQuestions.map((q, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg ${results[index] ? 'bg-green-900/30 border border-green-600/50' : 'bg-red-900/30 border border-red-600/50'}`}
                >
                  <div className="flex items-start gap-2">
                    {results[index] ? (
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="text-slate-200 text-sm mb-1">{q.question}</div>
                      <div className="text-xs text-slate-400">
                        A te válaszod: <span className="text-white">{answers[index] || '(üres)'}</span>
                      </div>
                      {!results[index] && (
                        <div className="text-xs text-slate-400 mt-1">
                          Helyes válasz: <span className="text-green-300">{q.answer}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {score >= 80 ? (
              <button
                onClick={handleFinish}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 px-6 rounded-xl shadow-lg shadow-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 active:scale-95 animate-pulse hover:animate-none"
              >
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', fontWeight: '700', letterSpacing: '0.1em' }}>
                  GYŐZELEM!
                </span>
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-xl shadow-lg shadow-orange-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/40 active:scale-95"
              >
                Próbáld újra
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}