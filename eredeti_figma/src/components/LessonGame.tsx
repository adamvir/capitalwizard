import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getGameConfig } from '../utils/gameConfig';
import type { Lesson } from '../data/penzugyiAlapismeretkLessons';

interface Pair {
  id: number;
  left: string;
  right: string;
}

interface BoxItem {
  pairId: number;
  text: string;
  side: 'left' | 'right';
  id: string;
}

interface LessonGameProps {
  onBackToHome?: () => void;
  onWin?: () => void;
  lessonNumber?: number;
  lessonData?: Lesson;
}

export function LessonGame({ onBackToHome, onWin, lessonNumber = 1, lessonData }: LessonGameProps) {
  console.log('🔗 LessonGame mounted/updated:', { lessonNumber, hasLessonData: !!lessonData });
  
  const config = getGameConfig();
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [timeLeft, setTimeLeft] = useState(config.matchingTimeLimit);
  const [remainingPairs, setRemainingPairs] = useState<Pair[]>([]);
  const [leftBoxes, setLeftBoxes] = useState<BoxItem[]>([]);
  const [rightBoxes, setRightBoxes] = useState<BoxItem[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<BoxItem | null>(null);
  const [selectedRight, setSelectedRight] = useState<BoxItem | null>(null);
  const [flashingBox, setFlashingBox] = useState<string | null>(null);
  const [matchedCount, setMatchedCount] = useState(0);
  const [totalPairs, setTotalPairs] = useState(0);

  // Initialize game with maximum 5 pairs visible at once
  useEffect(() => {
    // Only works with lessonData from penzugyiAlapismeretkLessons
    if (!lessonData?.matching) return;
    
    const sourcePairs = lessonData.matching;
    setTotalPairs(sourcePairs.length);
    
    // Shuffle all pairs
    const shuffled = [...sourcePairs].sort(() => Math.random() - 0.5);
    
    // Show maximum 5 pairs at once
    const maxVisiblePairs = 5;
    const initialPairs = shuffled.slice(0, maxVisiblePairs);
    const remaining = shuffled.slice(maxVisiblePairs);
    setRemainingPairs(remaining);
    
    const leftItems: BoxItem[] = initialPairs.map((pair, idx) => ({
      pairId: pair.id,
      text: pair.left,
      side: 'left' as const,
      id: `left-${pair.id}-${idx}`
    }));
    
    const rightItems: BoxItem[] = initialPairs.map((pair, idx) => ({
      pairId: pair.id,
      text: pair.right,
      side: 'right' as const,
      id: `right-${pair.id}-${idx}`
    }));
    
    // Shuffle left and right separately
    setLeftBoxes(leftItems.sort(() => Math.random() - 0.5));
    setRightBoxes(rightItems.sort(() => Math.random() - 0.5));
  }, [lessonData]);

  // Timer countdown
  useEffect(() => {
    if (gameStatus !== 'playing') return;
    
    if (timeLeft <= 0) {
      setGameStatus('lost');
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, gameStatus]);

  // Check for win condition
  useEffect(() => {
    if (gameStatus === 'playing' && matchedCount === config.matchingPairsCount) {
      setGameStatus('won');
    }
  }, [matchedCount, gameStatus, config.matchingPairsCount]);

  const handleLeftClick = (box: BoxItem) => {
    if (selectedLeft?.id === box.id) {
      setSelectedLeft(null);
      return;
    }
    setSelectedLeft(box);
    
    // Check if we already have a right selection
    if (selectedRight) {
      checkMatch(box, selectedRight);
    }
  };

  const handleRightClick = (box: BoxItem) => {
    if (selectedRight?.id === box.id) {
      setSelectedRight(null);
      return;
    }
    setSelectedRight(box);
    
    // Check if we already have a left selection
    if (selectedLeft) {
      checkMatch(selectedLeft, box);
    }
  };

  const checkMatch = (left: BoxItem, right: BoxItem) => {
    if (left.pairId === right.pairId) {
      // Correct match!
      setFlashingBox(right.id);
      
      setTimeout(() => {
        // Remove matched boxes
        setLeftBoxes(prev => prev.filter(b => b.id !== left.id));
        setRightBoxes(prev => prev.filter(b => b.id !== right.id));
        setSelectedLeft(null);
        setSelectedRight(null);
        setFlashingBox(null);
        setMatchedCount(prev => prev + 1);
        
        // Add new pair if available
        if (remainingPairs.length > 0) {
          const newPair = remainingPairs[0];
          setRemainingPairs(prev => prev.slice(1));
          
          const newLeft: BoxItem = {
            pairId: newPair.id,
            text: newPair.left,
            side: 'left',
            id: `left-${newPair.id}-${Date.now()}`
          };
          
          const newRight: BoxItem = {
            pairId: newPair.id,
            text: newPair.right,
            side: 'right',
            id: `right-${newPair.id}-${Date.now()}`
          };
          
          // Add to existing boxes and reshuffle
          setLeftBoxes(prev => [...prev, newLeft].sort(() => Math.random() - 0.5));
          setRightBoxes(prev => [...prev, newRight].sort(() => Math.random() - 0.5));
        }
      }, 500);
    } else {
      // Wrong match - deselect after brief delay
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 500);
    }
  };

  if (gameStatus === 'won') {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-6">
          {/* Animated finger pointing up */}
          <motion.div
            className="text-8xl mb-12"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            👆
          </motion.div>
          <h1 className="text-white text-6xl mb-4" style={{ fontFamily: 'Georgia, serif' }}>GYŐZTÉL!</h1>
          <p className="text-green-400 text-2xl mb-8">Minden párt sikeresen megtaláltál!</p>
          <button
            onClick={() => {
              console.log('🔗 LessonGame TOVÁBB button clicked, calling onWin');
              if (onWin) {
                onWin();
              } else {
                console.log('⚠️ LessonGame: onWin is not defined!');
              }
            }}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 px-12 rounded-xl shadow-lg shadow-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 active:scale-95"
          >
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem', fontWeight: '700', letterSpacing: '0.1em' }}>TOVÁBB</span>
          </button>
        </div>
      </div>
    );
  }

  if (gameStatus === 'lost') {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-6">
          {/* Animated finger pointing down */}
          <motion.div
            className="text-8xl mb-12"
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            👇
          </motion.div>
          <h1 className="text-white text-6xl mb-4" style={{ fontFamily: 'Georgia, serif' }}>VESZTETTÉL!</h1>
          <p className="text-red-400 text-2xl mb-8">Lejárt az idő!</p>
          <button
            onClick={onBackToHome}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 px-12 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95"
          >
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem', fontWeight: '700', letterSpacing: '0.1em' }}>TOVÁBB</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Lesson Title and Timer */}
      <div className="px-6 pt-4 pb-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-white text-2xl">{lessonNumber}. Lecke</h1>
          <div className="flex items-center gap-4">
            <div className="text-white text-xl">
              {matchedCount}/{totalPairs}
            </div>
            <div className={`text-xl px-4 py-2 rounded-lg ${
              timeLeft <= 10 ? 'bg-red-500/30 text-red-300' : 'bg-blue-500/30 text-blue-300'
            }`}>
              {timeLeft}s
            </div>
          </div>
        </div>
      </div>

      {/* Game content area */}
      <div className="flex-1 px-4 pb-32">
        <div className="grid grid-cols-2 gap-4 h-full">
          {/* Left side */}
          <div className="flex flex-col gap-3">
            {leftBoxes.map((box) => (
              <button
                key={box.id}
                onClick={() => handleLeftClick(box)}
                className={`
                  p-4 rounded-xl transition-all duration-300 min-h-[80px] flex items-center justify-center
                  ${selectedLeft?.id === box.id 
                    ? 'bg-blue-500/50 border-2 border-blue-400 scale-105' 
                    : 'bg-purple-500/30 border-2 border-purple-400/50 hover:bg-purple-500/40'
                  }
                `}
              >
                <span className="text-white text-center text-sm">{box.text}</span>
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex flex-col gap-3">
            {rightBoxes.map((box) => (
              <button
                key={box.id}
                onClick={() => handleRightClick(box)}
                className={`
                  p-4 rounded-xl transition-all duration-300 min-h-[80px] flex items-center justify-center
                  ${flashingBox === box.id
                    ? 'bg-green-500 border-2 border-green-400 animate-pulse'
                    : selectedRight?.id === box.id 
                      ? 'bg-blue-500/50 border-2 border-blue-400 scale-105' 
                      : 'bg-pink-500/30 border-2 border-pink-400/50 hover:bg-pink-500/40'
                  }
                `}
              >
                <span className="text-white text-center text-sm">{box.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}