import { Crown, Flame, Star, Sparkles, Zap } from 'lucide-react';

interface PlayerStatusBarProps {
  playerName: string;
  subscriptionTier: 'free' | 'pro' | 'master';
  streak?: number;
  currentXp?: number;
  xpForNextLevel?: number;
}

export function PlayerStatusBar({ playerName, subscriptionTier, streak = 0, currentXp = 0, xpForNextLevel = 0 }: PlayerStatusBarProps) {
  const xpProgress = xpForNextLevel > 0 ? (currentXp / xpForNextLevel) * 100 : 0;

  return (
    <div className="absolute bottom-3 left-0 right-0 z-10 px-4">
      <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-md rounded-2xl px-3 py-2.5 border-2 border-slate-600/30 shadow-2xl">
        {/* Top Row: Avatar, Name, Badges */}
        <div className="flex items-center justify-between mb-1.5">
          {/* Left: Avatar and Name */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-full flex items-center justify-center border-2 border-cyan-400/50 shadow-lg">
              <span className="text-white font-bold text-sm">
                {playerName ? playerName.charAt(0).toUpperCase() : '?'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold">
                {playerName || 'Vendég'}
              </span>
            </div>
          </div>

          {/* Right: Badges */}
          <div className="flex items-center gap-2">
            {/* Streak Badge */}
            {streak > 0 && (
              <div className="flex items-center gap-1 bg-gradient-to-r from-orange-600 to-red-600 px-2.5 py-1 rounded-full shadow-lg border border-orange-400/30">
                <Flame className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-bold text-white">
                  {streak}
                </span>
              </div>
            )}
            
            {/* Subscription Badge */}
            {subscriptionTier === 'master' ? (
              <div className="flex items-center gap-1 bg-gradient-to-r from-purple-600 to-pink-600 px-2.5 py-1 rounded-full shadow-lg border border-purple-400/30">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-bold text-white">Master</span>
              </div>
            ) : subscriptionTier === 'pro' ? (
              <div className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-cyan-600 px-2.5 py-1 rounded-full shadow-lg border border-blue-400/30">
                <Star className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-bold text-white">Pro</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-slate-700/80 px-2.5 py-1 rounded-full border border-slate-600/30">
                <span className="text-xs font-semibold text-slate-300">Free</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Row: XP Progress */}
        {xpForNextLevel > 0 && (
          <div className="space-y-1">
            {/* XP Label */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-xs font-semibold text-cyan-300">
                  {currentXp.toLocaleString('hu-HU')} XP
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {xpForNextLevel.toLocaleString('hu-HU')} XP
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/30">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out shadow-lg"
                style={{ width: `${Math.min(xpProgress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
