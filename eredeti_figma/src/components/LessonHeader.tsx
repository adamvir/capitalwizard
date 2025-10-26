import { Coins, ArrowLeft } from 'lucide-react';

interface LessonHeaderProps {
  onBack?: () => void;
  onStart?: () => void;
  lessonNumber?: number;
  gameType?: 'reading' | 'matching' | 'quiz';
  isFirstRound?: boolean;
}

export function LessonHeader({ onBack, onStart, lessonNumber = 1, gameType = 'reading', isFirstRound = true }: LessonHeaderProps) {
  // Determine game details based on type
  const getGameDetails = () => {
    switch (gameType) {
      case 'reading':
        return {
          theme: 'Pénzügyi Alapismeretek',
          difficulty: 'Könnyű',
          name: 'Olvasás',
          difficultyColor: 'text-green-400'
        };
      case 'matching':
        return {
          theme: 'Pénzügyi Alapismeretek',
          difficulty: 'Közepes',
          name: 'Párosítás',
          difficultyColor: 'text-cyan-400'
        };
      case 'quiz':
        return {
          theme: 'Pénzügyi Alapismeretek',
          difficulty: 'Nehéz',
          name: 'Kvíz',
          difficultyColor: 'text-red-400'
        };
      default:
        return {
          theme: 'Pénzügyi Alapismeretek',
          difficulty: 'Könnyű',
          name: 'Olvasás',
          difficultyColor: 'text-green-400'
        };
    }
  };

  const lesson = getGameDetails();
  const roundText = isFirstRound ? '1. kör' : '2. kör';
  

  
  return (
    <div className="px-6 pt-4 pb-6">
      {/* Back button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-white mb-4 hover:opacity-80 transition-opacity"
      >
        <div className="w-8 h-8 bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-lg flex items-center justify-center shadow-lg">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span>Vissza</span>
      </button>

      {/* Lesson Title */}
      <div className="text-center mb-6">
        <h1 className="text-white text-3xl mb-2">{lessonNumber}. Lecke</h1>
      </div>

      {/* Lesson Info Cards */}
      <div className="space-y-3">
        {/* Theme */}
        <div className="bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Téma:</span>
            <span className="text-white">{lesson.theme}</span>
          </div>
        </div>

        {/* Round */}
        <div className="bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Kör:</span>
            <span className="text-white">{roundText}</span>
          </div>
        </div>

        {/* Difficulty */}
        <div className="bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Nehézség:</span>
            <span className={lesson.difficultyColor}>{lesson.difficulty}</span>
          </div>
        </div>

        {/* Name */}
        <div className="bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Neve:</span>
            <span className="text-white">{lesson.name}</span>
          </div>
        </div>

        {/* Reward */}
        <div className="bg-slate-800/60 backdrop-blur-md border border-slate-600/50 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Jutalom:</span>
            <div className="flex items-center gap-2">
              <span className="text-white">150</span>
              <div className="w-6 h-6 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-md shadow-yellow-500/30 border border-yellow-600/20">
                <Coins className="w-4 h-4 text-yellow-900" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <button className="w-1/2 mx-auto block mt-11 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 px-8 rounded-xl shadow-lg shadow-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 active:scale-95 animate-pulse hover:animate-none" onClick={onStart}>
        <span className="block text-center" style={{ fontFamily: 'Georgia, serif', fontSize: '1.25rem', fontWeight: '700', letterSpacing: '0.1em' }}>KEZDÉS!</span>
      </button>
    </div>
  );
}