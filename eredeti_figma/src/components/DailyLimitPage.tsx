import { Crown, Clock, Zap, Star, Sparkles, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DailyLimitPageProps {
  onBack: () => void;
  onUpgrade: () => void;
  limitType: 'lessons' | 'arena';
  subscriptionTier: 'free' | 'pro' | 'master';
}

export function DailyLimitPage({ onBack, onUpgrade, limitType, subscriptionTier }: DailyLimitPageProps) {
  const [timeUntilReset, setTimeUntilReset] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeUntilReset(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const limitInfo = limitType === 'lessons' 
    ? {
        title: 'Napi lecke limit elérve',
        description: 'Elérted a napi 3 lecke limitet az ingyenes csomaggal.',
        icon: <Trophy className="w-16 h-16 text-yellow-400" />,
        emoji: '📚'
      }
    : {
        title: 'Napi küzdőtér limit elérve',
        description: 'Elérted a napi 5 játék limitet az ingyenes csomaggal.',
        icon: <Crown className="w-16 h-16 text-orange-400" />,
        emoji: '⚔️'
      };

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/40 to-slate-900 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-8 w-20 h-24 bg-gradient-to-br from-purple-600/30 to-transparent transform rotate-12 rounded-t-lg blur-sm animate-pulse"></div>
        <div className="absolute top-32 left-6 w-16 h-20 bg-gradient-to-br from-blue-600/30 to-transparent transform -rotate-12 rounded-t-lg blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 right-10 w-14 h-18 bg-gradient-to-br from-pink-600/30 to-transparent transform rotate-6 rounded-t-lg blur-sm animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-8 w-12 h-16 bg-gradient-to-br from-cyan-600/30 to-transparent transform -rotate-6 rounded-t-lg blur-sm animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center p-6 space-y-6">
        {/* Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
          <div className="relative w-32 h-32 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full flex items-center justify-center border-4 border-purple-500/50 shadow-2xl">
            <span className="text-6xl">{limitInfo.emoji}</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-white text-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            {limitInfo.title}
          </h1>
          <p className="text-slate-300 text-sm max-w-xs mx-auto">
            {limitInfo.description}
          </p>
        </div>

        {/* Timer card */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-6 border border-purple-500/30 backdrop-blur-sm shadow-2xl w-full max-w-sm">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-cyan-400" />
            <span className="text-white">Reset időpontja</span>
          </div>
          <div className="text-center">
            <div className="text-5xl text-white tabular-nums tracking-wider mb-2">
              {timeUntilReset}
            </div>
            <div className="text-slate-400 text-sm">
              Holnap éjfélkor újra tudsz játszani
            </div>
          </div>
        </div>

        {/* Upgrade options */}
        <div className="space-y-3 w-full max-w-sm">
          <div className="text-center text-slate-300 text-sm mb-2">
            Vagy válts prémium csomagra korlátlan játékért:
          </div>

          {/* Pro Plan */}
          <button
            onClick={onUpgrade}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl p-4 transition-all shadow-lg hover:shadow-cyan-500/50 border border-cyan-400/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-bold">Pro csomag</div>
                  <div className="text-xs opacity-90">Korlátlan hozzáférés</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">4,990 Ft</div>
                <div className="text-xs opacity-90">/hó</div>
              </div>
            </div>
          </button>

          {/* Master Plan */}
          <button
            onClick={onUpgrade}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl p-4 transition-all shadow-lg hover:shadow-pink-500/50 border border-pink-400/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-bold">Master csomag</div>
                  <div className="text-xs opacity-90">Minden funkció + VIP előnyök</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">9,990 Ft</div>
                <div className="text-xs opacity-90">/hó</div>
              </div>
            </div>
          </button>
        </div>

        {/* Back button */}
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white transition-colors text-sm underline"
        >
          Vissza a főoldalra
        </button>

        {/* Benefits list */}
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl p-4 border border-slate-700/50 backdrop-blur-sm w-full max-w-sm">
          <div className="text-white text-sm font-semibold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            Prémium előnyök:
          </div>
          <ul className="text-slate-300 text-xs space-y-1.5">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              Korlátlan leckék naponta
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              Korlátlan küzdőtér játékok
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              Exkluzív tartalmak
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              Gyorsabb haladás
            </li>
            {subscriptionTier === 'free' && (
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                <span className="text-purple-300">Master: VIP támogatás</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
