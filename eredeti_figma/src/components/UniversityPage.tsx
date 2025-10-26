import { ArrowLeft, ChevronUp, Map } from 'lucide-react';
import campusMap from 'figma:asset/c558539c9d306455dfd5af15f072594f408ff9a0.png';
import { Building2, BookOpen, Users, FileCheck, GraduationCap, Home } from 'lucide-react';
import { useState } from 'react';
import { LibraryPage } from './LibraryPage';

interface UniversityPageProps {
  onBack: () => void;
  onOpenBookView: (bookTitle: string) => void;
  coins: number;
  onCoinsChange: (newCoins: number) => void;
}

export function UniversityPage({ onBack, onOpenBookView, coins, onCoinsChange }: UniversityPageProps) {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);

  const buildings = [
    { 
      id: 'reception', 
      name: 'Recepció', 
      icon: Building2, 
      color: 'from-purple-500 to-purple-700',
      number: 1
    },
    { 
      id: 'library', 
      name: 'Könyvtár', 
      icon: BookOpen, 
      color: 'from-blue-500 to-blue-700',
      number: 2
    },
    { 
      id: 'lecture', 
      name: 'Előadó', 
      icon: Users, 
      color: 'from-indigo-500 to-indigo-700',
      number: 3
    },
    { 
      id: 'exam', 
      name: 'Vizsgáztató', 
      icon: FileCheck, 
      color: 'from-red-500 to-red-700',
      number: 4
    },
    { 
      id: 'office', 
      name: 'Tanulmányi osztály', 
      icon: GraduationCap, 
      color: 'from-green-500 to-green-700',
      number: 5
    },
    { 
      id: 'dorm', 
      name: 'Kollégium', 
      icon: Home, 
      color: 'from-orange-500 to-orange-700',
      number: 6
    },
  ];

  return (
    <div className="relative h-full flex flex-col">
      {/* Header with back button */}
      <div className="relative z-30 px-4 pt-2 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Vissza</span>
        </button>
      </div>

      {/* University Campus */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img 
            src={campusMap}
            alt="University Campus Map"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better contrast with fantasy theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-purple-900/30 to-slate-900/50"></div>
          
          {/* Fantasy crystal effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-20 h-28 bg-gradient-to-t from-purple-600/30 to-purple-400/15 transform rotate-12 rounded-t-lg blur-sm animate-pulse"></div>
            <div className="absolute top-20 right-16 w-16 h-24 bg-gradient-to-t from-blue-600/25 to-blue-400/10 transform -rotate-6 rounded-t-lg blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-32 left-20 w-12 h-20 bg-gradient-to-t from-pink-600/30 to-pink-400/15 transform rotate-6 rounded-t-lg blur-sm animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        {/* Title */}
        <div className="relative z-10 text-center pt-2 pb-4">
          <h1 className="text-white text-3xl mb-1 drop-shadow-lg">Egyetemi Város</h1>
          <p className="text-purple-200 drop-shadow-md">Válassz egy épületet a listából!</p>
        </div>

        {/* Map Image - No interactive elements on map */}
        <div className="relative z-10 flex-1"></div>

        {/* Bottom Slide-Up Menu */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          {/* Backdrop */}
          {menuOpen && (
            <div 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
              style={{ bottom: 'auto', top: '-100vh' }}
              onClick={() => setMenuOpen(false)}
            />
          )}

          {/* Slide-up panel */}
          <div 
            className={`relative transition-transform duration-500 ease-out ${
              menuOpen ? 'translate-y-0' : 'translate-y-[calc(100%-56px)]'
            }`}
          >
            {/* Tab/Handle to open menu */}
            <div className="px-4">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-full bg-gradient-to-r from-purple-600/90 to-blue-600/90 backdrop-blur-lg border-t-2 border-x-2 border-purple-500/40 rounded-t-2xl shadow-2xl shadow-purple-500/30 px-4 py-3 flex items-center justify-between transition-all duration-300 hover:from-purple-600 hover:to-blue-600"
              >
                <div className="flex items-center gap-2">
                  <Map className="w-5 h-5 text-white" />
                  <span className="text-white">Épületek Térképe</span>
                </div>
                <ChevronUp 
                  className={`w-5 h-5 text-white transition-transform duration-500 ${
                    menuOpen ? 'rotate-180' : 'rotate-0'
                  }`} 
                />
              </button>
            </div>

            {/* Menu content */}
            <div className="bg-gradient-to-r from-slate-900/95 to-purple-900/95 backdrop-blur-lg border-t border-purple-500/30 shadow-2xl shadow-purple-500/20">
              {/* Building Grid */}
              <div className="grid grid-cols-2 gap-2 p-4">
                {buildings.map((building) => (
                  <button
                    key={building.id}
                    onClick={() => {
                      setSelectedBuilding(building.id);
                      setMenuOpen(false);
                      if (building.id === 'library') {
                        setShowLibrary(true);
                      }
                    }}
                    className={`relative flex items-center gap-2 bg-gradient-to-br ${building.color} rounded-lg p-2.5 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg ${
                      selectedBuilding === building.id ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''
                    }`}
                  >
                    {/* Number badge */}
                    <div className="flex-shrink-0 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-slate-900">{building.number}</span>
                    </div>
                    
                    {/* Building icon */}
                    <building.icon className="w-5 h-5 text-white flex-shrink-0" strokeWidth={2.5} />
                    
                    {/* Building name */}
                    <span className="text-white text-sm flex-1 text-left leading-tight">{building.name}</span>

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-lg bg-white/0 hover:bg-white/10 transition-all duration-300 pointer-events-none"></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected building detailed info */}
        {selectedBuilding && selectedBuilding !== 'library' && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 w-[85%] max-w-sm">
            <div className="bg-gradient-to-r from-slate-900/98 to-purple-900/98 backdrop-blur-xl border-2 border-purple-500/50 rounded-xl p-5 shadow-2xl shadow-purple-500/30 animate-in zoom-in-95">
              <div className="flex items-start gap-4">
                {buildings.find(b => b.id === selectedBuilding)?.icon && (
                  <div className={`bg-gradient-to-br ${buildings.find(b => b.id === selectedBuilding)?.color} p-4 rounded-xl shadow-lg flex-shrink-0`}>
                    {(() => {
                      const Icon = buildings.find(b => b.id === selectedBuilding)!.icon;
                      return <Icon className="w-8 h-8 text-white" strokeWidth={2.5} />;
                    })()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center">
                      <span className="text-slate-900 text-sm">{buildings.find(b => b.id === selectedBuilding)?.number}</span>
                    </div>
                    <h3 className="text-white text-xl truncate">{buildings.find(b => b.id === selectedBuilding)?.name}</h3>
                  </div>
                  <p className="text-purple-300">Hamarosan elérhető...</p>
                  <p className="text-purple-200/70 text-sm mt-2">
                    Itt tudsz majd különböző tevékenységeket végezni az egyetemen.
                  </p>
                </div>
              </div>
              
              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBuilding(null);
                }}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Library Page */}
      {showLibrary && (
        <div className="absolute inset-0 z-50">
          <LibraryPage 
            onBack={() => {
              setShowLibrary(false);
              setSelectedBuilding(null);
            }} 
            onOpenBookView={onOpenBookView}
            coins={coins}
            onCoinsChange={onCoinsChange}
          />
        </div>
      )}
    </div>
  );
}