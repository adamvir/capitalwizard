import { motion } from 'motion/react';
import { Trophy, Star, Sparkles, ChevronRight } from 'lucide-react';

interface LevelUpCelebrationProps {
  newLevel: number;
  onContinue: () => void;
}

export function LevelUpCelebration({ newLevel, onContinue }: LevelUpCelebrationProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-slate-900 via-purple-900/60 to-slate-900">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(135deg, ${
                ['#fbbf24', '#a855f7', '#ec4899', '#3b82f6'][i % 4]
              }, transparent)`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Sparkles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-6 h-6 text-yellow-400" fill="currentColor" />
          </motion.div>
        ))}

        {/* Radial glow */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/30 via-transparent to-transparent"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-8">
        {/* Trophy icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }}
          className="relative"
        >
          <div className="absolute inset-0 blur-3xl bg-yellow-400/50 scale-150"></div>
          <div className="relative w-32 h-32 bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl shadow-yellow-500/50 border-4 border-yellow-200">
            <Trophy className="w-16 h-16 text-yellow-900" />
          </div>
          
          {/* Orbiting stars */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                rotate: [i * 90, i * 90 + 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div
                style={{
                  transform: `translate(-50%, -50%) translateY(-80px)`,
                }}
              >
                <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center space-y-4"
        >
          {/* Congratulations */}
          <motion.h1
            className="text-5xl text-white"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="bg-gradient-to-r from-yellow-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              Gratulálunk!
            </span>
          </motion.h1>

          {/* Level up message */}
          <div className="space-y-2">
            <p className="text-white text-xl">
              Szakaszt teljesítettél! 🎉
            </p>
            <div className="bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-xl px-6 py-4 shadow-lg">
              <p className="text-slate-300 text-sm mb-2">Új szint elérve</p>
              <div className="text-4xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Szint {newLevel}
              </div>
            </div>
          </div>

          {/* Achievement message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-purple-200 text-sm max-w-xs"
          >
            Folytatod a tanulást az új szakaszban!
          </motion.p>
        </motion.div>

        {/* Continue button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={onContinue}
          className="group relative px-10 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl shadow-xl shadow-green-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/40 hover:scale-105 active:scale-95"
        >
          <div className="flex items-center gap-3">
            <span className="text-white text-xl" style={{ fontFamily: 'Georgia, serif', fontWeight: '700', letterSpacing: '0.1em' }}>
              TOVÁBB
            </span>
            <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
          </div>
          
          {/* Button glow */}
          <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
        </motion.button>
      </div>

      {/* Confetti effect */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`confetti-${i}`}
          className="absolute w-3 h-3"
          style={{
            left: `${50}%`,
            top: `${20}%`,
            background: ['#fbbf24', '#a855f7', '#ec4899', '#3b82f6', '#10b981'][i % 5],
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
          }}
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
            rotate: 0,
          }}
          animate={{
            x: (Math.random() - 0.5) * 600,
            y: Math.random() * 800 + 200,
            opacity: 0,
            rotate: Math.random() * 720,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: i * 0.05,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
