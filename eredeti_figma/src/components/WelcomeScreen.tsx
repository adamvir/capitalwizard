import { motion } from 'motion/react';
import { Sparkles, Coins } from 'lucide-react';
import { getGameConfig } from '../utils/gameConfig';
import { useState, useEffect } from 'react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const [initialGold, setInitialGold] = useState(1000);

  useEffect(() => {
    const config = getGameConfig();
    setInitialGold(config.initialGold);
  }, []);
  return (
    <div className="absolute inset-0 z-50 bg-gradient-to-b from-purple-900 via-indigo-900 to-slate-900 flex items-center justify-center p-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Crystals */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.3,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
        
        {/* Sparkle Effects */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 text-center max-w-md"
      >
        {/* Logo/Title Area */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl shadow-2xl shadow-purple-500/50 mb-6">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-5xl text-white mb-2 tracking-wide">
            CapitalWizard
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto" />
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 shadow-2xl mb-8"
        >
          <h2 className="text-2xl text-white mb-4">
            A CapitalWizard üdvözöl!
          </h2>
          
          {/* Gift Box Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.9, duration: 0.6, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full p-6 shadow-2xl shadow-yellow-400/50">
              <Coins className="w-12 h-12 text-amber-900" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <p className="text-cyan-300 text-xl mb-2">
              Kezdésnek adunk
            </p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5, type: 'spring', stiffness: 300 }}
                className="text-5xl text-yellow-400"
              >
                {initialGold.toLocaleString('hu-HU')}
              </motion.span>
              <Coins className="w-8 h-8 text-yellow-400" />
            </div>
            <p className="text-cyan-300 text-xl">
              arany ajándékot!
            </p>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="text-slate-300 mt-6 text-lg"
          >
            Jó szórakozást!
          </motion.p>
        </motion.div>

        {/* Start Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.6 }}
          onClick={onGetStarted}
          className="group relative px-12 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xl rounded-full shadow-2xl shadow-purple-500/50 transition-all overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Kezdjük!</span>
          
          {/* Button Shine Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'linear',
              repeatDelay: 1,
            }}
          />
        </motion.button>
        
        {/* Hint Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.6 }}
          className="text-slate-400 text-sm mt-6"
        >
          Tapasztalj meg egy izgalmas pénzügyi kalandot
        </motion.p>
      </motion.div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" />
    </div>
  );
}
