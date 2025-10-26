import { Menu, GraduationCap, User, Trophy, Medal, Newspaper, Crown, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface CharacterLineupProps {
  onJumpToLesson?: (lesson: number) => void;
  onUniversityClick?: () => void;
  onProfileClick?: () => void;
  onSubscriptionClick?: () => void;
  onManagerClick?: () => void;
}

export function CharacterLineup({ onJumpToLesson, onUniversityClick, onProfileClick, onSubscriptionClick, onManagerClick }: CharacterLineupProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const characters = [
    { color: 'from-purple-600 to-purple-800', name: 'Shadow', icon: GraduationCap, label: 'Egyetem', onClick: onUniversityClick },
    { color: 'from-blue-500 to-blue-700', name: 'Frost', icon: User, label: 'Diák', onClick: onProfileClick },
    { color: 'from-gray-500 to-gray-700', name: 'Steel', icon: Trophy, label: 'Eredmények' },
    { color: 'from-pink-500 to-pink-700', name: 'Sakura', icon: Medal, label: 'Helyezés' },
    { color: 'from-orange-500 to-orange-700', name: 'Fire', icon: Newspaper, label: 'Hírek' },
    { color: 'from-yellow-500 to-orange-700', name: 'Wave', icon: Crown, label: 'Előfizetés', onClick: onSubscriptionClick },
  ];

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const handleLessonSelect = (lesson: number) => {
    if (onJumpToLesson) {
      onJumpToLesson(lesson);
    }
    setMenuOpen(false);
  };

  const handleManagerOpen = () => {
    if (onManagerClick) {
      onManagerClick();
    }
    setMenuOpen(false);
  };

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : characters.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < characters.length - 1 ? prev + 1 : 0));
  };

  const handleIconClick = (index: number, onClick?: () => void) => {
    setActiveIndex(index);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="absolute bottom-[98px] left-0 right-0 z-20">
      {/* Character lineup */}
      <div className="relative h-24 mx-2">
        {/* Slider background indicator */}
        <div
          className="absolute bottom-0 h-[88px] bg-gradient-to-b from-slate-700/40 to-slate-800/40 rounded-xl border-2 border-slate-600/40 shadow-xl transition-all duration-300 ease-out"
          style={{
            left: `calc(${activeIndex * (100 / characters.length)}% + 8px)`,
            width: `calc(${(100 / characters.length) * 2.5}% - 4px)`,
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-0.5 px-2">
          {characters.map((char, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                className={`relative flex justify-center transition-all duration-300 ease-out ${
                  isActive ? 'flex-[2.5]' : 'flex-1'
                }`}
              >
                <button
                  onClick={() => handleIconClick(index, char.onClick)}
                  className={`
                    bg-gradient-to-b ${char.color} rounded-lg border-2 border-slate-800 shadow-lg
                    transition-all duration-300 ease-out
                    relative
                    ${isActive ? 'w-full h-[88px] scale-100' : 'w-full h-16 scale-90 opacity-70'}
                    hover:opacity-100
                  `}
                >
                  <div className="absolute inset-0 bg-black/30 rounded-lg"></div>

                  {/* Left Arrow - only on active */}
                  {isActive && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevious();
                      }}
                      className="absolute left-1.5 top-1/2 -translate-y-1/2 z-20 bg-slate-900/90 rounded-full p-1.5 hover:bg-slate-800 transition-colors shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" strokeWidth={3} />
                    </button>
                  )}

                  {/* Icon and Label Container - Absolutely Centered */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-1.5">
                    {/* Icon */}
                    {char.icon && (
                      <char.icon
                        className={`text-white transition-all duration-300 ${
                          isActive ? 'w-12 h-12' : 'w-7 h-7'
                        }`}
                        strokeWidth={2.5}
                      />
                    )}

                    {/* Label */}
                    {char.label && (
                      <span
                        className={`text-white text-center leading-tight font-semibold transition-all duration-300 ${
                          isActive ? 'text-[12px] opacity-100' : 'text-[8px] opacity-90'
                        }`}
                      >
                        {char.label}
                      </span>
                    )}
                  </div>

                  {/* Right Arrow - only on active */}
                  {isActive && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 z-20 bg-slate-900/90 rounded-full p-1.5 hover:bg-slate-800 transition-colors shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5 text-white" strokeWidth={3} />
                    </button>
                  )}
                </button>
              </div>
            );
          })}
          
          {/* Developer Menu Button */}
          <div className="relative ml-2">
            <button 
              onClick={handleMenuToggle}
              className="w-7 h-9 bg-gradient-to-b from-indigo-600 to-indigo-800 rounded-lg border border-slate-800 shadow-lg hover:scale-105 transition-transform flex flex-col items-center justify-center p-0.5"
            >
              <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
              <Menu className="w-3.5 h-3.5 text-white relative z-10 mb-0.5" strokeWidth={2} />
              <span className="text-white text-[6px] relative z-10 text-center leading-tight">Dev</span>
            </button>

            {/* Developer Menu Popup */}
            {menuOpen && (onJumpToLesson || onManagerClick) && (
              <>
                {/* Backdrop to close menu */}
                <div 
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />
                
                {/* Menu content */}
                <div className="absolute bottom-full right-0 mb-2 w-64 bg-gradient-to-b from-slate-900/98 via-purple-900/40 to-slate-900/98 backdrop-blur-lg border border-slate-700/50 shadow-2xl shadow-purple-500/30 rounded-xl p-4 z-50">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-white text-center mb-2 pb-2 border-b border-slate-700/50">Fejlesztői Menü</h3>
                    
                    {onManagerClick && (
                      <button
                        onClick={handleManagerOpen}
                        className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white py-3 px-4 rounded-lg shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-95 flex items-center justify-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        Menedzser Panel
                      </button>
                    )}
                    
                    {onJumpToLesson && (
                      <>
                        <div className="border-t border-slate-700/50 my-1"></div>
                        
                        <button
                          onClick={() => handleLessonSelect(7)}
                          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-4 rounded-lg shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 active:scale-95"
                        >
                          1. Vissza az elejére
                        </button>
                        
                        <button
                          onClick={() => handleLessonSelect(8)}
                          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95"
                        >
                          2. Menj a 8. lecke utánra
                        </button>
                        
                        <button
                          onClick={() => handleLessonSelect(9)}
                          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-4 rounded-lg shadow-lg shadow-green-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40 active:scale-95"
                        >
                          3. Menj a 9. lecke utánra
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}