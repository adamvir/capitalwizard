import { ImageWithFallback } from './figma/ImageWithFallback';
import { Coins, Gem, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TopBarProps {
  coins?: number;
  gems?: number;
  progressPosition?: number;
  playerLevel?: number;
  currentLesson?: number;
  onAvatarClick?: () => void;
  currentStageInSection?: number;
}

// Lesson difficulty data - synchronized with LessonHeader
const lessonDifficulties: Record<number, 'Könnyű' | 'Közepes' | 'Nehéz'> = {
  7: 'Közepes',
  8: 'Nehéz',
  9: 'Könnyű',
  10: 'Nehéz',
  11: 'Nehéz',
  12: 'Nehéz',
  13: 'Nehéz',
  14: 'Nehéz',
  15: 'Nehéz'
};

export function TopBar({ coins = 680, gems = 0, progressPosition = 3, playerLevel = 2, currentLesson = 7, onAvatarClick, currentStageInSection = 1 }: TopBarProps) {
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);

  // Debug: Log progress position
  useEffect(() => {
    console.log('🔝 TopBar received props:', {
      progressPosition,
      currentStageInSection,
      expectedProgressPosition: currentStageInSection - 1
    });
  }, [progressPosition, currentStageInSection]);

  // Load avatar from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('player_avatar');
    if (saved) {
      setCurrentAvatar(saved);
    } else {
      setCurrentAvatar(null);
    }
  }, []);

  // Reload avatar when coming back to page
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('player_avatar');
      if (saved) {
        setCurrentAvatar(saved);
      } else {
        setCurrentAvatar(null);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Also check on focus
    window.addEventListener('focus', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  // Get the NEXT lesson's difficulty to show on main page
  const getNextLessonDifficulty = () => {
    const nextLesson = currentLesson;
    const difficulty = lessonDifficulties[nextLesson] || 'Közepes';
    
    switch (difficulty) {
      case 'Könnyű':
        return 'easy';
      case 'Nehéz':
        return 'hard';
      default: // Közepes
        return 'medium';
    }
  };

  const difficulty = getNextLessonDifficulty();

  // Get difficulty box styles
  const getDifficultyStyles = () => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-500/20 border-green-400/30 text-green-300';
      case 'hard':
        return 'bg-red-500/20 border-red-400/30 text-red-300';
      default: // medium
        return 'bg-cyan-500/20 border-cyan-400/30 text-cyan-300';
    }
  };

  return (
    <div className="relative px-4 pt-3 pb-2 z-[100]">
      {/* Player Info Card */}
      <div className="absolute left-2 top-[14px] flex items-center gap-3 z-[100]">
        <div className="flex items-center bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-md rounded-xl border border-slate-600/50 shadow-xl p-2 gap-2.5">
          {/* Avatar */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log('Avatar clicked!', onAvatarClick);
              onAvatarClick?.();
            }}
            className="relative group cursor-pointer transition-transform hover:scale-105 active:scale-95 z-[100]"
            type="button"
          >
            <div className={`w-14 h-14 rounded-xl border-2 shadow-xl backdrop-blur-sm flex items-center justify-center transition-colors ${
              currentAvatar 
                ? 'border-cyan-400/80 shadow-cyan-400/30 bg-gradient-to-br from-purple-600 to-pink-600 group-hover:border-cyan-300' 
                : 'border-slate-500/50 shadow-slate-500/20 bg-slate-800/50 group-hover:border-slate-400'
            }`}>
              {currentAvatar ? (
                <span className="text-3xl pointer-events-none">{currentAvatar}</span>
              ) : (
                <span className="text-3xl text-slate-400 pointer-events-none">+</span>
              )}
            </div>
            {/* Glow effect */}
            <div className={`absolute -inset-1 rounded-xl opacity-20 blur-md -z-10 group-hover:opacity-30 transition-opacity pointer-events-none ${
              currentAvatar 
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500' 
                : 'bg-slate-500'
            }`}></div>
          </button>

          {/* Info Section */}
          <div className="flex-1 space-y-1.5 min-w-[140px]">
            {/* Level Progress */}
            <div className="flex items-center gap-2">
              <span className="text-white text-sm bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Szint {playerLevel}.</span>
              <div className="flex-1 h-2 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/30 shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 shadow-lg shadow-orange-500/50 transition-all duration-300"
                  style={{ width: playerLevel === 1 ? '0%' : '1%' }}
                ></div>
              </div>
            </div>
            
            {/* Currency */}
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-md shadow-yellow-500/30 border border-yellow-600/20">
                  <Coins className="w-3 h-3 text-yellow-900" />
                </div>
                <span className="text-white drop-shadow-sm">{coins}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-md shadow-purple-500/30 border border-purple-700/20">
                  <Gem className="w-3 h-3 text-white" />
                </div>
                <span className="text-white drop-shadow-sm">{gems}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Progress Card */}
      <div className="absolute right-2 top-[14px] z-40">
        <div className="p-3">
          {/* Stage Path - Zigzag pattern */}
          <div className="relative w-[160px] h-[55px] mb-2">
            {/* Stage nodes with zigzag path */}
            {[
              { x: 10, y: 35, type: 'square' },
              { x: 40, y: 15, type: 'square' },
              { x: 70, y: 35, type: 'square' },
              { x: 100, y: 15, type: 'circle' },
              { x: 130, y: 35, type: 'square' },
              { x: 150, y: 10, type: 'gem' }
            ].map((node, index, arr) => {
              const isActive = index < progressPosition;
              const isCurrent = index === progressPosition;
              
              return (
              <div key={index}>
                {/* Connection line to next node */}
                {index < arr.length - 1 && (
                  <div
                    className={`absolute border-2 border-dashed ${
                      isActive ? 'border-red-600/70' : 'border-slate-600/40'
                    }`}
                    style={{
                      left: `${node.x + (node.type === 'circle' ? 6 : 4)}px`,
                      top: `${node.y + (node.type === 'circle' ? 6 : 4)}px`,
                      width: `${Math.sqrt(Math.pow(arr[index + 1].x - node.x, 2) + Math.pow(arr[index + 1].y - node.y, 2))}px`,
                      transformOrigin: 'left center',
                      transform: `rotate(${Math.atan2(arr[index + 1].y - node.y, arr[index + 1].x - node.x) * 180 / Math.PI}deg)`
                    }}
                  />
                )}
                
                {/* Node */}
                {node.type === 'gem' ? (
                  <div 
                    className="absolute w-5 h-5 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-md shadow-purple-500/30 border border-purple-700/20"
                    style={{
                      left: `${node.x - 2}px`,
                      top: `${node.y - 2}px`
                    }}
                  >
                    <Gem className="w-3 h-3 text-white" />
                  </div>
                ) : isCurrent ? (
                  <div
                    className="absolute w-3 h-3 bg-white rounded-full shadow-lg shadow-white/50 border-2 border-white"
                    style={{
                      left: `${node.x}px`,
                      top: `${node.y}px`
                    }}
                  >
                    <div className="absolute inset-0 bg-white rounded-full animate-pulse"></div>
                  </div>
                ) : (
                  <div
                    className={`absolute w-2.5 h-2.5 ${
                      isActive 
                        ? 'bg-gradient-to-br from-red-600 to-red-800 border border-red-900/50 shadow-md shadow-red-600/40' 
                        : 'bg-slate-700/70 border border-slate-600/50'
                    }`}
                    style={{
                      left: `${node.x}px`,
                      top: `${node.y}px`
                    }}
                  />
                )}
              </div>
            );})}
          </div>
          
          {/* Stage Info */}
          <div className="flex items-center justify-between gap-3 text-xs">
            <div className={`px-2 py-0.5 ${getDifficultyStyles()} rounded border`}>
              Nehézség
            </div>
            <div className="text-white">
              Szakasz {currentStageInSection}/6
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}