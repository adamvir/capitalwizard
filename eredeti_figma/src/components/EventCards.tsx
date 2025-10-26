import { Clock, Crown, Infinity } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getGameConfig } from '../utils/gameConfig';

interface EventCardsProps {
  onArenaClick?: () => void;
  subscriptionTier?: 'free' | 'pro' | 'master';
}

export function EventCards({ onArenaClick, subscriptionTier = 'free' }: EventCardsProps) {
  // Get remaining games for today
  const getRemainingGames = () => {
    if (subscriptionTier !== 'free') {
      return 'unlimited';
    }
    
    // For free users, track daily games (from config)
    const config = getGameConfig();
    const maxGames = config.freeDailyArenaGames;
    const today = new Date().toDateString();
    const savedData = localStorage.getItem('arena_daily_games');
    
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.date === today) {
        return Math.max(0, maxGames - data.gamesPlayed);
      }
    }
    
    return maxGames;
  };

  const [remainingGames, setRemainingGames] = useState<number | 'unlimited'>(getRemainingGames());

  // Update remaining games when subscription tier changes or on mount
  useEffect(() => {
    setRemainingGames(getRemainingGames());
  }, [subscriptionTier]);

  // Listen for storage changes and game completions
  useEffect(() => {
    const handleStorageChange = () => {
      setRemainingGames(getRemainingGames());
    };

    // Listen for custom arena game completion event
    const handleArenaUpdate = () => {
      setRemainingGames(getRemainingGames());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('arenaGameCompleted', handleArenaUpdate);
    
    // Also refresh periodically to check for day change
    const interval = setInterval(() => {
      setRemainingGames(getRemainingGames());
    }, 60000); // Check every minute

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('arenaGameCompleted', handleArenaUpdate);
      clearInterval(interval);
    };
  }, [subscriptionTier]);

  return (
    <div className="absolute right-2 top-28 space-y-2 z-10">
      {/* Küzdőtér */}
      <div 
        className="relative w-40 h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg border-2 border-yellow-400 shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform active:scale-95"
        onClick={onArenaClick}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative p-2 h-full flex flex-col justify-between">
          <div className="flex items-center gap-1">
            <Crown className="w-5 h-5 text-yellow-300" />
            <span className="text-white drop-shadow-md">Küzdőtér</span>
          </div>
          <div className="flex items-center gap-1 text-white text-sm">
            {remainingGames === 'unlimited' ? (
              <>
                <Infinity className="w-4 h-4" />
                <span className="drop-shadow-md">Korlátlan</span>
              </>
            ) : (
              <>
                <Crown className="w-3 h-3" />
                <span className="drop-shadow-md">{remainingGames} játék</span>
              </>
            )}
          </div>
        </div>
        {/* Character illustration */}
        <div className="absolute right-0 bottom-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-tl-full"></div>
      </div>

      {/* Templomos */}
      <div className="relative w-40 h-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg border-2 border-cyan-400 shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative p-2 h-full flex flex-col justify-between">
          <span className="text-white drop-shadow-md">Templomos</span>
          <div className="flex items-center gap-1 text-white text-sm">
            <Clock className="w-3 h-3" />
            <span className="drop-shadow-md">9h 6m</span>
          </div>
        </div>
        {/* Dragon illustration */}
        <div className="absolute right-0 bottom-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-tl-full"></div>
      </div>
    </div>
  );
}