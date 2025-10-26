import { motion } from 'motion/react';
import { Sparkles, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { penzugyiAlapismeretkLessons } from '../data/penzugyiAlapismeretkLessons';

interface ProgressAnimationProps {
  onClick?: () => void;
  currentBookLessonIndex?: number;
  currentGameType?: 'reading' | 'matching' | 'quiz';
  isFirstRound?: boolean;
}

export function ProgressAnimation({ onClick, currentBookLessonIndex = 0, currentGameType = 'reading', isFirstRound = true }: ProgressAnimationProps) {
  const [hasRentedBook, setHasRentedBook] = useState(false);

  // Check if Pénzügyi Alapismeretek is rented
  useEffect(() => {
    const checkRentedBooks = () => {
      const saved = localStorage.getItem('rentedBooks');
      if (saved) {
        const rentedBooks = JSON.parse(saved);
        const hasPenzugyiBook = rentedBooks.some((book: any) => 
          book.title === 'Pénzügyi Alapismeretek' && book.rentedUntil > Date.now()
        );
        setHasRentedBook(hasPenzugyiBook);
      } else {
        setHasRentedBook(false);
      }
    };

    checkRentedBooks();

    // Listen for storage changes
    window.addEventListener('storage', checkRentedBooks);
    
    return () => {
      window.removeEventListener('storage', checkRentedBooks);
    };
  }, []);

  // Calculate current lesson number (every game is a separate lesson)
  const lessonNumber = isFirstRound 
    ? (currentBookLessonIndex * 3) + (currentGameType === 'reading' ? 1 : currentGameType === 'matching' ? 2 : 3)
    : penzugyiAlapismeretkLessons.length * 3 + currentBookLessonIndex + 1;
  // Don't show if no book is rented
  if (!hasRentedBook) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.6,
            ease: "backOut"
          }}
          className="relative flex flex-col items-center gap-4 pointer-events-auto px-8 py-12"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 blur-2xl bg-amber-500/30 rounded-full scale-150"></div>
          
          <div className="relative text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <BookOpen className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            </motion.div>
            <div className="text-white drop-shadow-2xl">
              <div className="text-lg opacity-90 mb-2">Nincs kölcsönzött</div>
              <div className="text-2xl mb-2">
                <span className="bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  tankönyv
                </span>
              </div>
              <div className="text-sm opacity-75">
                Kölcsönözz ki könyvet a könyvtárból!
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div 
        className="relative flex flex-col items-center gap-6 cursor-pointer pointer-events-auto px-8 py-12"
        onClick={onClick}
      >
        {/* Sparkle icons around */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${50 + Math.cos((i * Math.PI * 2) / 8) * 120}px`,
              left: `${Math.sin((i * Math.PI * 2) / 8) * 120}px`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400" fill="currentColor" />
          </motion.div>
        ))}

        {/* Main text */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.6,
            ease: "backOut"
          }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            {/* Glow effect behind text */}
            <div className="absolute inset-0 blur-2xl bg-purple-500/50 rounded-full scale-150"></div>
            
            <div className="relative text-white drop-shadow-2xl">
              <div className="text-sm opacity-90 mb-2">Tovább haladás</div>
              <div className="text-4xl mb-4">
                <span className="bg-gradient-to-r from-yellow-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                  {lessonNumber}. Lecke
                </span>
              </div>
              <div className="text-sm opacity-90">következik</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 200, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm"
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="h-full bg-gradient-to-r from-yellow-300 via-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-500/50"
          />
        </motion.div>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              top: `${Math.random() * 200 - 100}px`,
              left: `${Math.random() * 300 - 150}px`,
              background: `linear-gradient(135deg, ${
                ['#fbbf24', '#a855f7', '#ec4899'][i % 3]
              }, transparent)`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}