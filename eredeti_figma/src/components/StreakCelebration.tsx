import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame } from 'lucide-react';

interface StreakCelebrationProps {
  newStreak: number;
  onContinue: () => void;
}

export function StreakCelebration({ newStreak, onContinue }: StreakCelebrationProps) {
  const [displayedNumber, setDisplayedNumber] = useState(0);

  // Counter animation effect
  useEffect(() => {
    if (newStreak === 0) return;

    // Start counting after initial animations (0.8s delay)
    const startDelay = 800;
    
    // Calculate how long each step should take
    // For streak 1-5: 50ms per step
    // For streak 6-20: 40ms per step
    // For streak 21+: 30ms per step
    const stepDuration = newStreak <= 5 ? 50 : newStreak <= 20 ? 40 : 30;
    const totalDuration = stepDuration * newStreak;

    const timeout = setTimeout(() => {
      let currentNumber = 0;
      const interval = setInterval(() => {
        currentNumber += 1;
        setDisplayedNumber(currentNumber);

        if (currentNumber >= newStreak) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [newStreak]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-gradient-to-b from-slate-900 via-orange-900/40 to-slate-900 flex items-center justify-center z-50"
    >
      {/* Floating fire particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              opacity: 0,
            }}
            animate={{
              y: -50,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeOut',
            }}
          >
            <Flame className="text-orange-500" size={12 + Math.random() * 20} />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative text-center px-8 z-10">
        {/* Fire emoji with animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: [0, 1.2, 1],
            rotate: 0,
          }}
          transition={{
            duration: 0.6,
            times: [0, 0.6, 1],
            ease: 'easeOut',
          }}
          className="text-9xl mb-6"
        >
          🔥
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white text-5xl mb-4 tracking-wide"
        >
          Napi sorozat!
        </motion.h1>

        {/* Streak counter with counting animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          className="mb-6"
        >
          <div className="inline-block bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 rounded-2xl px-8 py-4 border-4 border-orange-400 shadow-2xl shadow-orange-500/50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3"
            >
              <Flame className="w-10 h-10 text-yellow-300" />
              <motion.span
                key={displayedNumber}
                animate={{ 
                  scale: displayedNumber === newStreak ? [1, 1.2, 1] : 1,
                }}
                transition={{ 
                  scale: { duration: 0.3, times: [0, 0.5, 1] }
                }}
                className="text-white text-6xl tracking-wider tabular-nums"
              >
                {displayedNumber}
              </motion.span>
              <span className="text-white text-3xl">nap</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: displayedNumber === newStreak ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-orange-300 text-xl mb-8 leading-relaxed"
        >
          {newStreak === 1 ? (
            <>
              Kezdted a napi sorozatodat!<br />
              Térj vissza holnap is!
            </>
          ) : (
            <>
              Gratulálunk!<br />
              Így tovább, ne hagyd abba!
            </>
          )}
        </motion.p>

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: displayedNumber === newStreak ? 1 : 0,
            y: displayedNumber === newStreak ? 0 : 20
          }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={onContinue}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 hover:from-orange-600 hover:via-red-600 hover:to-orange-600 text-white px-12 py-4 rounded-xl shadow-2xl shadow-orange-500/50 transition-all border-2 border-orange-300"
        >
          <span className="text-xl tracking-wide">Tovább</span>
        </motion.button>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 rounded-3xl blur-3xl opacity-20 -z-10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    </motion.div>
  );
}
