import { useState, useEffect } from 'react';
import { ArrowLeft, Crown, Lock, Sparkles } from 'lucide-react';

interface AvatarSelectorPageProps {
  onBack: () => void;
  subscriptionTier: 'free' | 'pro' | 'master';
}

// Avatar tiers with emojis
const avatars = {
  free: [
    { emoji: '🧙‍♂️', name: 'Varázsló', rarity: 'Közönséges' },
    { emoji: '⚔️', name: 'Harcos', rarity: 'Közönséges' },
    { emoji: '🏹', name: 'Íjász', rarity: 'Közönséges' },
    { emoji: '🛡️', name: 'Védő', rarity: 'Közönséges' },
    { emoji: '🗡️', name: 'Lovag', rarity: 'Közönséges' },
    { emoji: '🎯', name: 'Célzó', rarity: 'Közönséges' }
  ],
  pro: [
    { emoji: '🐉', name: 'Sárkány', rarity: 'Ritka', locked: true },
    { emoji: '🦅', name: 'Sas', rarity: 'Ritka', locked: true },
    { emoji: '🦁', name: 'Oroszlán', rarity: 'Ritka', locked: true },
    { emoji: '🔮', name: 'Látnok', rarity: 'Ritka', locked: true },
    { emoji: '⚡', name: 'Villám', rarity: 'Ritka', locked: true },
    { emoji: '🌟', name: 'Csillag', rarity: 'Ritka', locked: true },
    { emoji: '🔥', name: 'Láng', rarity: 'Ritka', locked: true },
    { emoji: '💎', name: 'Gyémánt', rarity: 'Ritka', locked: true }
  ],
  master: [
    { emoji: '👑', name: 'Király', rarity: 'Legendás', locked: true },
    { emoji: '🌌', name: 'Galaxis', rarity: 'Legendás', locked: true },
    { emoji: '🦄', name: 'Egyszarvú', rarity: 'Legendás', locked: true },
    { emoji: '🎭', name: 'Maszk', rarity: 'Legendás', locked: true },
    { emoji: '🏆', name: 'Bajnok', rarity: 'Legendás', locked: true },
    { emoji: '💫', name: 'Csillaghullás', rarity: 'Legendás', locked: true }
  ]
};

export function AvatarSelectorPage({ onBack, subscriptionTier }: AvatarSelectorPageProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<string>('🧙‍♂️');

  // Load saved avatar from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('player_avatar');
    if (saved) {
      setSelectedAvatar(saved);
    }
  }, []);

  const handleSelectAvatar = (emoji: string, isLocked: boolean) => {
    if (!isLocked) {
      setSelectedAvatar(emoji);
      localStorage.setItem('player_avatar', emoji);
      
      // Trigger storage event for TopBar to update
      window.dispatchEvent(new Event('storage'));
    }
  };

  const isAvatarLocked = (avatar: any) => {
    if (!avatar.locked) return false;
    
    // Check if user has required subscription
    if (subscriptionTier === 'master') return false;
    if (subscriptionTier === 'pro' && avatar.rarity !== 'Legendás') return false;
    return true;
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Közönséges':
        return 'from-slate-600 to-slate-700 border-slate-500';
      case 'Ritka':
        return 'from-blue-600 to-blue-700 border-blue-500';
      case 'Legendás':
        return 'from-purple-600 to-pink-600 border-purple-500';
      default:
        return 'from-slate-600 to-slate-700 border-slate-500';
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity) {
      case 'Közönséges':
        return 'text-slate-300';
      case 'Ritka':
        return 'text-blue-300';
      case 'Legendás':
        return 'text-purple-300';
      default:
        return 'text-slate-300';
    }
  };

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700/90 to-purple-800/90 backdrop-blur-sm px-4 py-4 border-b-2 border-purple-500">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-purple-600/60 hover:bg-purple-500/60 rounded-lg flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-xl text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Avatar Választó
          </h1>
          <div className="w-10 h-10"></div>
        </div>

        {/* Current Avatar Display */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center border-4 border-purple-800 shadow-xl">
            <span className="text-5xl">{selectedAvatar}</span>
          </div>
          <p className="text-sm text-purple-200">Kiválasztott Avatar</p>
        </div>
      </div>

      {/* Avatar Grid */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Free Avatars */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-lg text-white">Ingyenes Avatarok</h2>
            <span className="px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded">
              {avatars.free.length} db
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {avatars.free.map((avatar, index) => {
              const isSelected = selectedAvatar === avatar.emoji;
              return (
                <button
                  key={index}
                  onClick={() => handleSelectAvatar(avatar.emoji, false)}
                  className={`relative bg-gradient-to-br ${getRarityColor(avatar.rarity)} rounded-xl p-4 border-2 transition-all ${
                    isSelected 
                      ? 'scale-105 shadow-xl ring-2 ring-white' 
                      : 'hover:scale-105 shadow-lg'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-4xl">{avatar.emoji}</div>
                    <div className="text-xs text-white text-center">{avatar.name}</div>
                    <div className={`text-[10px] ${getRarityTextColor(avatar.rarity)}`}>
                      {avatar.rarity}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pro Avatars */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-lg text-white">Pro Avatarok</h2>
            <Crown className="w-5 h-5 text-blue-400" />
            <span className="px-2 py-1 bg-blue-700/50 text-blue-300 text-xs rounded">
              {avatars.pro.length} db
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {avatars.pro.map((avatar, index) => {
              const isLocked = isAvatarLocked(avatar);
              const isSelected = selectedAvatar === avatar.emoji;
              return (
                <button
                  key={index}
                  onClick={() => handleSelectAvatar(avatar.emoji, isLocked)}
                  className={`relative bg-gradient-to-br ${getRarityColor(avatar.rarity)} rounded-xl p-4 border-2 transition-all ${
                    isLocked
                      ? 'opacity-50 cursor-not-allowed'
                      : isSelected 
                        ? 'scale-105 shadow-xl ring-2 ring-white' 
                        : 'hover:scale-105 shadow-lg'
                  }`}
                  disabled={isLocked}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-4xl relative">
                      {avatar.emoji}
                      {isLocked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded">
                          <Lock className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-white text-center">{avatar.name}</div>
                    <div className={`text-[10px] ${getRarityTextColor(avatar.rarity)}`}>
                      {avatar.rarity}
                    </div>
                  </div>
                  {isSelected && !isLocked && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Master Avatars */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-lg text-white">Master Avatarok</h2>
            <Crown className="w-5 h-5 text-purple-400" />
            <span className="px-2 py-1 bg-purple-700/50 text-purple-300 text-xs rounded">
              {avatars.master.length} db
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {avatars.master.map((avatar, index) => {
              const isLocked = isAvatarLocked(avatar);
              const isSelected = selectedAvatar === avatar.emoji;
              return (
                <button
                  key={index}
                  onClick={() => handleSelectAvatar(avatar.emoji, isLocked)}
                  className={`relative bg-gradient-to-br ${getRarityColor(avatar.rarity)} rounded-xl p-4 border-2 transition-all ${
                    isLocked
                      ? 'opacity-50 cursor-not-allowed'
                      : isSelected 
                        ? 'scale-105 shadow-xl ring-2 ring-white' 
                        : 'hover:scale-105 shadow-lg'
                  }`}
                  disabled={isLocked}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-4xl relative">
                      {avatar.emoji}
                      {isLocked && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded">
                          <Lock className="w-6 h-6 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-white text-center">{avatar.name}</div>
                    <div className={`text-[10px] ${getRarityTextColor(avatar.rarity)}`}>
                      {avatar.rarity}
                    </div>
                  </div>
                  {isSelected && !isLocked && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-br from-blue-800/40 to-blue-900/40 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30 mb-4">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-white mb-1">Avatar Tier-ek</h3>
              <div className="space-y-1 text-sm text-blue-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
                  <span>Közönséges - Mindenki számára elérhető</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span>Ritka - Pro előfizetés szükséges</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <span>Legendás - Master előfizetés szükséges</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
