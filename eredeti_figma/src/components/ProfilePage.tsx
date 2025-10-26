import { ArrowLeft, User, Mail, Calendar, MapPin, Edit2, Save, X, Crown, Coins, Gem, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProfilePageProps {
  onBack: () => void;
  playerLevel: number;
  coins: number;
  gems?: number;
  subscriptionTier?: 'free' | 'pro' | 'master';
}

interface UserProfile {
  name: string;
  email: string;
  birthDate: string;
  location: string;
  bio: string;
}

const DEFAULT_PROFILE: UserProfile = {
  name: '',
  email: '',
  birthDate: '',
  location: '',
  bio: ''
};

const loadProfile = (): UserProfile => {
  try {
    const saved = localStorage.getItem('user_profile');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading profile:', error);
  }
  return DEFAULT_PROFILE;
};

const saveProfile = (profile: UserProfile) => {
  try {
    localStorage.setItem('user_profile', JSON.stringify(profile));
  } catch (error) {
    console.error('Error saving profile:', error);
  }
};

export function ProfilePage({ onBack, playerLevel, coins, gems = 0, subscriptionTier = 'free' }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(loadProfile());
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // Trigger a custom event to notify other components
    window.dispatchEvent(new Event('profileUpdated'));
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  // Calculate XP for current level
  const xpForCurrentLevel = playerLevel * 1000;
  const currentXp = 650; // This should come from props in real implementation
  const xpProgress = (currentXp / xpForCurrentLevel) * 100;

  return (
    <div className="absolute inset-0 pt-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700/90 to-blue-800/90 backdrop-blur-sm px-4 py-3 flex items-center justify-between border-b-2 border-blue-500 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-blue-600/60 hover:bg-blue-500/60 rounded-lg flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h1 className="text-xl text-white flex items-center gap-2">
          <User className="w-6 h-6" />
          Diák Profil
        </h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            isEditing 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-blue-600/60 hover:bg-blue-500/60'
          }`}
        >
          {isEditing ? (
            <Save className="w-5 h-5 text-white" />
          ) : (
            <Edit2 className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Stats Card */}
        <div className="bg-gradient-to-br from-blue-800/40 to-blue-900/40 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-white font-semibold">Statisztikák</h2>
            {subscriptionTier === 'master' ? (
              <div className="flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full">
                <Crown className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white">Master</span>
              </div>
            ) : subscriptionTier === 'pro' ? (
              <div className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-cyan-500 px-3 py-1 rounded-full">
                <Crown className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white">Pro</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-slate-700 px-3 py-1 rounded-full">
                <span className="text-xs text-slate-300">Free</span>
              </div>
            )}
          </div>

          {/* Level Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-white font-semibold">Szint {playerLevel}</span>
              </div>
              <span className="text-sm text-blue-300">{currentXp} / {xpForCurrentLevel} XP</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Resources */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/50 rounded-lg p-3 flex items-center gap-2">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Arany</div>
                <div className="text-lg font-bold text-amber-400">{coins}</div>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 flex items-center gap-2">
              <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                <Gem className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xs text-slate-400">Gyémánt</div>
                <div className="text-lg font-bold text-cyan-400">{gems}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info Card */}
        <div className="bg-gradient-to-br from-blue-800/40 to-blue-900/40 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-white font-semibold">Személyes Adatok</h2>
            {isEditing && (
              <button
                onClick={handleCancel}
                className="w-8 h-8 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            )}
          </div>

          <div className="space-y-3">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-sm text-blue-300 mb-1">
                <User className="w-4 h-4" />
                Név
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-slate-800/50 border border-blue-500/30 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  placeholder="Teljes név"
                />
              ) : (
                <div className="bg-slate-800/50 rounded-lg px-3 py-2 text-white">
                  {profile.name || <span className="text-slate-500">Nem megadva</span>}
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm text-blue-300 mb-1">
                <Mail className="w-4 h-4" />
                Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-slate-800/50 border border-blue-500/30 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  placeholder="email@example.com"
                />
              ) : (
                <div className="bg-slate-800/50 rounded-lg px-3 py-2 text-white">
                  {profile.email || <span className="text-slate-500">Nem megadva</span>}
                </div>
              )}
            </div>

            {/* Birth Date */}
            <div>
              <label className="flex items-center gap-2 text-sm text-blue-300 mb-1">
                <Calendar className="w-4 h-4" />
                Születési dátum
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={editedProfile.birthDate}
                  onChange={(e) => handleChange('birthDate', e.target.value)}
                  className="w-full bg-slate-800/50 border border-blue-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              ) : (
                <div className="bg-slate-800/50 rounded-lg px-3 py-2 text-white">
                  {profile.birthDate || <span className="text-slate-500">Nem megadva</span>}
                </div>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="flex items-center gap-2 text-sm text-blue-300 mb-1">
                <MapPin className="w-4 h-4" />
                Helyszín
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full bg-slate-800/50 border border-blue-500/30 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  placeholder="Város, Ország"
                />
              ) : (
                <div className="bg-slate-800/50 rounded-lg px-3 py-2 text-white">
                  {profile.location || <span className="text-slate-500">Nem megadva</span>}
                </div>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm text-blue-300 mb-1 block">
                Bemutatkozás
              </label>
              {isEditing ? (
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  className="w-full bg-slate-800/50 border border-blue-500/30 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Írj magadról..."
                  rows={3}
                />
              ) : (
                <div className="bg-slate-800/50 rounded-lg px-3 py-2 text-white min-h-[80px]">
                  {profile.bio || <span className="text-slate-500">Nem megadva</span>}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Save Button (mobile friendly) */}
        {isEditing && (
          <button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <Save className="w-5 h-5" />
            Változások mentése
          </button>
        )}
      </div>
    </div>
  );
}
