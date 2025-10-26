import { ArrowLeft, Settings, Coins, BookOpen, Swords, Calendar, Crown, Trophy, RotateCcw, Save, AlertCircle, Info, Download, Upload, HardDrive, TrendingUp, Shuffle, Brain, BookOpenCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getGameConfig, saveGameConfig, resetGameConfig, DEFAULT_CONFIG, GameConfig } from '../utils/gameConfig';
import { toast } from 'sonner@2.0.3';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface ManagerPageProps {
  onBack: () => void;
}

export function ManagerPage({ onBack }: ManagerPageProps) {
  const [config, setConfig] = useState<GameConfig>(getGameConfig());
  const [hasChanges, setHasChanges] = useState(false);
  const [storageSize, setStorageSize] = useState(0);

  // Calculate localStorage size
  useEffect(() => {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    // Convert to MB (bytes to MB)
    setStorageSize(total / 1024 / 1024);
  }, []);

  useEffect(() => {
    const currentConfig = getGameConfig();
    const isDifferent = JSON.stringify(currentConfig) !== JSON.stringify(config);
    setHasChanges(isDifferent);
  }, [config]);

  const handleSave = () => {
    saveGameConfig(config);
    setHasChanges(false);
    toast.success('Beállítások mentve!');
  };

  const handleReset = () => {
    if (confirm('Biztosan visszaállítod az alapértelmezett beállításokat?')) {
      resetGameConfig();
      setConfig(DEFAULT_CONFIG);
      setHasChanges(false);
      toast.success('Alapértelmezett beállítások visszaállítva!');
    }
  };

  const updateConfig = (key: keyof GameConfig, value: number) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = () => {
    try {
      const allData: Record<string, string> = {};
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          allData[key] = localStorage[key];
        }
      }
      
      const dataStr = JSON.stringify(allData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `rpg-game-backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast.success('Játékadatok exportálva!');
    } catch (error) {
      toast.error('Export hiba történt!');
    }
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          
          if (confirm('Biztosan felülírod a jelenlegi játékadatokat? Ez a művelet nem vonható vissza!')) {
            localStorage.clear();
            for (let key in data) {
              localStorage.setItem(key, data[key]);
            }
            
            // Reload config
            const newConfig = getGameConfig();
            setConfig(newConfig);
            
            toast.success('Játékadatok importálva! Újratöltés...');
            setTimeout(() => window.location.reload(), 1500);
          }
        } catch (error) {
          toast.error('Érvénytelen fájl formátum!');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="h-full bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 flex-1">
            <Settings className="w-7 h-7" />
            <div>
              <h1 className="text-xl">Menedzser Panel</h1>
              <p className="text-purple-200 text-xs">Játék beállítások kezelése</p>
            </div>
          </div>
          {hasChanges && (
            <div className="flex items-center gap-2 bg-amber-500/20 px-3 py-1 rounded-full">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">Nem mentett változások</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6 pb-24">
        {/* App Info Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-5 border-2 border-indigo-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-indigo-900">App Info</h3>
              <p className="text-xs text-indigo-600">Alkalmazás információk</p>
            </div>
          </div>

          {/* Storage Size */}
          <div className="bg-white/60 rounded-lg p-3 mb-3 border border-indigo-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-indigo-600" />
                <span className="text-sm text-indigo-900">Adatméret</span>
              </div>
              <span className="text-indigo-700">{storageSize.toFixed(3)} MB</span>
            </div>
          </div>

          {/* Import/Export Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button
              onClick={handleExportData}
              variant="outline"
              className="border-2 border-green-300 hover:bg-green-50 text-green-700 gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button
              onClick={handleImportData}
              variant="outline"
              className="border-2 border-blue-300 hover:bg-blue-50 text-blue-700 gap-2"
            >
              <Upload className="w-4 h-4" />
              Import
            </Button>
          </div>

          {/* User Guide */}
          <div className="bg-white/80 rounded-lg p-4 border border-indigo-200">
            <h4 className="text-sm text-indigo-900 mb-2">📖 Felhasználói útmutató</h4>
            <div className="text-xs text-indigo-800 space-y-2">
              <p><strong>v1.0 - Alapfunkciók:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Játékos profil és szintrendszer (max 100 szint)</li>
                <li>Arany és gyémánt valuta rendszer</li>
                <li>Napi sorozat számláló és ünneplés</li>
                <li>Freemium előfizetési modell (Free, Pro, Master)</li>
              </ul>
              
              <p className="mt-3"><strong>Egyetem (University):</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Izometrikus campus térkép 6 épülettel</li>
                <li>3 különböző játéktípus (Párosító, Kvíz, Olvasó)</li>
                <li>XP és arany jutalmak teljesítés után</li>
                <li>Napi limitek Free felhasználóknak</li>
              </ul>
              
              <p className="mt-3"><strong>Könyvtár (Library):</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>6 könyvespolc 15 pénzügyi témájú könyvvel</li>
                <li>1 napos és 30 napos kölcsönzési opciók</li>
                <li>Teljes könyv tartalom olvasó nézet</li>
                <li>Kölcsönzési státusz és lejárat követés</li>
              </ul>
              
              <p className="mt-3"><strong>Küzdőtér (Arena):</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Pénzügyi kvíz kérdések arany kockáztatással</li>
                <li>Minimum és maximum fogadási limitek</li>
                <li>Győzelem esetén dupla arany jutalom</li>
                <li>Napi limit Free felhasználóknak</li>
              </ul>
              
              <p className="mt-3"><strong>Diák Profil:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Személyes adatok szerkesztése</li>
                <li>Statisztikák (szint, XP, arany, gyémánt)</li>
                <li>Előfizetési státusz megjelenítés</li>
                <li>localStorage alapú adatmentés</li>
              </ul>
              
              <p className="mt-3"><strong>XP és Szintrendszer:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Leckék és Küzdőtér győzelmek XP-t adnak</li>
                <li>Küzdőtérben az XP a kiválasztott könyvek számával szorzódik</li>
                <li>Lineáris XP növekedés szintenként (állítható %)</li>
                <li>Maximális szint állítható (alapértelmezett: 100)</li>
                <li>Automatikus szintlépés és ünneplés</li>
              </ul>
              
              <p className="mt-3"><strong>Menedzser Panel:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Kezdő arany beállítása</li>
                <li>Könyvtári árak testreszabása</li>
                <li>Küzdőtér limitek és XP beállítások</li>
                <li>Küzdőtérhez választható könyvek max száma</li>
                <li>XP rendszer konfigurálása (alap XP, növekedés, max szint)</li>
                <li>Napi limitek konfigurálása</li>
                <li>Előfizetési árak beállítása</li>
                <li>Lecke jutalmak (XP és arany) testreszabása</li>
                <li>Játékmódok beállításai (Párosító, Kvíz, Olvasó)</li>
                <li>Játékadatok export/import funkció</li>
                <li>Adatméret monitorozás</li>
              </ul>
              
              <p className="mt-3"><strong>Technikai jellemzők:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>React + TypeScript + Tailwind CSS</li>
                <li>iPhone 16 Pro Max méretű design</li>
                <li>localStorage alapú perzisztencia</li>
                <li>Valósághű iPhone keret Dynamic Island-del</li>
                <li>Responsív és optimalizált animációk</li>
                <li>Fantasy kristály-barlang design téma</li>
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white gap-2"
          >
            <Save className="w-5 h-5" />
            Mentés
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex-1 border-2 border-purple-300 hover:bg-purple-50 gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Alapértelmezett
          </Button>
        </div>

        {/* Starting Gold */}
        <div className="bg-white rounded-xl shadow-md p-4 border-2 border-amber-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center">
              <Coins className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-amber-900">Kezdő arany</h3>
              <p className="text-xs text-amber-700">Reset után kapott arany</p>
            </div>
          </div>
          <Input
            type="number"
            value={config.initialGold}
            onChange={(e) => updateConfig('initialGold', parseInt(e.target.value) || 0)}
            className="text-lg border-2 border-amber-300 focus:border-amber-500"
          />
        </div>

        <Separator />

        {/* Library Settings */}
        <div className="bg-white rounded-xl shadow-md p-4 border-2 border-blue-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-blue-900">Könyvtár</h3>
              <p className="text-xs text-blue-700">Kölcsönzési díjak</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-blue-800 mb-1 block">1 napos kölcsönzés (arany)</label>
              <Input
                type="number"
                value={config.bookRental1Day}
                onChange={(e) => updateConfig('bookRental1Day', parseInt(e.target.value) || 0)}
                className="border-2 border-blue-300 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-sm text-blue-800 mb-1 block">30 napos kölcsönzés (arany)</label>
              <Input
                type="number"
                value={config.bookRental30Days}
                onChange={(e) => updateConfig('bookRental30Days', parseInt(e.target.value) || 0)}
                className="border-2 border-blue-300 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Arena Settings */}
        <div className="bg-white rounded-xl shadow-md p-4 border-2 border-red-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Swords className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-red-900">Küzdőtér</h3>
              <p className="text-xs text-red-700">Fogadás limitek</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-red-800 mb-1 block">Minimum fogadás (arany)</label>
              <Input
                type="number"
                value={config.arenaMinBet}
                onChange={(e) => updateConfig('arenaMinBet', parseInt(e.target.value) || 0)}
                className="border-2 border-red-300 focus:border-red-500"
              />
            </div>
            <div>
              <label className="text-sm text-red-800 mb-1 block">Maximum fogadás (arany)</label>
              <Input
                type="number"
                value={config.arenaMaxBet}
                onChange={(e) => updateConfig('arenaMaxBet', parseInt(e.target.value) || 0)}
                className="border-2 border-red-300 focus:border-red-500"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Daily Limits */}
        <div className="bg-white rounded-xl shadow-md p-4 border-2 border-green-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-green-900">Napi limitek</h3>
              <p className="text-xs text-green-700">Free felhasználók limitjei</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-green-800 mb-1 block">Küzdőtér játékok naponta</label>
              <Input
                type="number"
                value={config.freeDailyArenaGames}
                onChange={(e) => updateConfig('freeDailyArenaGames', parseInt(e.target.value) || 0)}
                className="border-2 border-green-300 focus:border-green-500"
              />
            </div>
            <div>
              <label className="text-sm text-green-800 mb-1 block">Leckék naponta</label>
              <Input
                type="number"
                value={config.dailyLessonLimit}
                onChange={(e) => updateConfig('dailyLessonLimit', parseInt(e.target.value) || 0)}
                className="border-2 border-green-300 focus:border-green-500"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Subscription Prices */}
        <div className="bg-white rounded-xl shadow-md p-4 border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-purple-900">Előfizetési árak</h3>
              <p className="text-xs text-purple-700">Havi díjak Ft-ban</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-purple-800 mb-1 block">Professzionális (Ft/hó)</label>
              <Input
                type="number"
                value={config.subscriptionProPrice}
                onChange={(e) => updateConfig('subscriptionProPrice', parseInt(e.target.value) || 0)}
                className="border-2 border-purple-300 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="text-sm text-purple-800 mb-1 block">Mester (Ft/hó)</label>
              <Input
                type="number"
                value={config.subscriptionMasterPrice}
                onChange={(e) => updateConfig('subscriptionMasterPrice', parseInt(e.target.value) || 0)}
                className="border-2 border-purple-300 focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Lesson Rewards */}
        <div className="bg-white rounded-xl shadow-md p-4 border-2 border-indigo-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-indigo-900">Lecke jutalmak</h3>
              <p className="text-xs text-indigo-700">XP és arany jutalmazás</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-indigo-800 mb-1 block">XP pont / lecke</label>
              <Input
                type="number"
                value={config.xpPerLesson}
                onChange={(e) => updateConfig('xpPerLesson', parseInt(e.target.value) || 0)}
                className="border-2 border-indigo-300 focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-green-700 mb-1 block">Könnyű</label>
                <Input
                  type="number"
                  value={config.goldEasy}
                  onChange={(e) => updateConfig('goldEasy', parseInt(e.target.value) || 0)}
                  className="border-2 border-green-300 focus:border-green-500"
                />
              </div>
              <div>
                <label className="text-xs text-yellow-700 mb-1 block">Közepes</label>
                <Input
                  type="number"
                  value={config.goldMedium}
                  onChange={(e) => updateConfig('goldMedium', parseInt(e.target.value) || 0)}
                  className="border-2 border-yellow-300 focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="text-xs text-red-700 mb-1 block">Nehéz</label>
                <Input
                  type="number"
                  value={config.goldHard}
                  onChange={(e) => updateConfig('goldHard', parseInt(e.target.value) || 0)}
                  className="border-2 border-red-300 focus:border-red-500"
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* XP System Settings */}
        <div className="bg-white rounded-xl shadow-md p-4 border-2 border-cyan-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-cyan-900">XP rendszer</h3>
              <p className="text-xs text-cyan-700">Szintrendszer beállítások</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-cyan-800 mb-1 block">Maximális szint</label>
              <Input
                type="number"
                value={config.maxLevel}
                onChange={(e) => updateConfig('maxLevel', parseInt(e.target.value) || 1)}
                className="border-2 border-cyan-300 focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-sm text-cyan-800 mb-1 block">Alap XP / szint</label>
              <Input
                type="number"
                value={config.baseXpPerLevel}
                onChange={(e) => updateConfig('baseXpPerLevel', parseInt(e.target.value) || 0)}
                className="border-2 border-cyan-300 focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-sm text-cyan-800 mb-1 block">XP növekedés / szint (%)</label>
              <Input
                type="number"
                value={config.xpGrowthPercentage}
                onChange={(e) => updateConfig('xpGrowthPercentage', parseInt(e.target.value) || 0)}
                className="border-2 border-cyan-300 focus:border-cyan-500"
              />
              <p className="text-xs text-cyan-600 mt-1">Minden szint után ennyi %-kal nő a szükséges XP</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Arena XP Settings */}
        <div className="bg-white rounded-xl shadow-md p-4 border-2 border-orange-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-orange-900">Küzdőtér XP</h3>
              <p className="text-xs text-orange-700">Arena tapasztalati pontok</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-orange-800 mb-1 block">Alap XP / győzelem</label>
              <Input
                type="number"
                value={config.xpPerArenaWin}
                onChange={(e) => updateConfig('xpPerArenaWin', parseInt(e.target.value) || 0)}
                className="border-2 border-orange-300 focus:border-orange-500"
              />
              <p className="text-xs text-orange-600 mt-1">Ez szorozva lesz a kiválasztott könyvek számával</p>
            </div>
            <div>
              <label className="text-sm text-orange-800 mb-1 block">Max kiválasztható könyvek</label>
              <Input
                type="number"
                value={config.maxBooksForArena}
                onChange={(e) => updateConfig('maxBooksForArena', parseInt(e.target.value) || 1)}
                className="border-2 border-orange-300 focus:border-orange-500"
              />
              <p className="text-xs text-orange-600 mt-1">Maximális könyvek száma arenában egyszerre</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Matching Game (Párosító) Settings */}
        <div className="bg-white rounded-xl shadow-md p-4 border-2 border-pink-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center">
              <Shuffle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-pink-900">Párosító játék</h3>
              <p className="text-xs text-pink-700">Fogalom párosítás beállítások</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-pink-800 mb-1 block">Párosítandó fogalmak száma</label>
              <Input
                type="number"
                value={config.matchingPairsCount}
                onChange={(e) => updateConfig('matchingPairsCount', parseInt(e.target.value) || 1)}
                className="border-2 border-pink-300 focus:border-pink-500"
              />
              <p className="text-xs text-pink-600 mt-1">Hány párt kell párosítani a játék során</p>
            </div>
            <div>
              <label className="text-sm text-pink-800 mb-1 block">Rendelkezésre álló idő (mp)</label>
              <Input
                type="number"
                value={config.matchingTimeLimit}
                onChange={(e) => updateConfig('matchingTimeLimit', parseInt(e.target.value) || 1)}
                className="border-2 border-pink-300 focus:border-pink-500"
              />
              <p className="text-xs text-pink-600 mt-1">Másodpercben megadva</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Quiz Game (Kvíz) Settings */}
        <div className="bg-white rounded-xl shadow-md p-4 border-2 border-teal-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-teal-900">Kvíz játék</h3>
              <p className="text-xs text-teal-700">Kvíz kérdések beállítások</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-teal-800 mb-1 block">Kvíz kérdések száma</label>
              <Input
                type="number"
                value={config.quizQuestionsCount}
                onChange={(e) => updateConfig('quizQuestionsCount', parseInt(e.target.value) || 1)}
                className="border-2 border-teal-300 focus:border-teal-500"
              />
              <p className="text-xs text-teal-600 mt-1">Összesen hány kérdés legyen a kvízben</p>
            </div>
            <div>
              <label className="text-sm text-teal-800 mb-1 block">Válaszok száma / kérdés</label>
              <Input
                type="number"
                value={config.quizAnswersPerQuestion}
                onChange={(e) => updateConfig('quizAnswersPerQuestion', parseInt(e.target.value) || 2)}
                className="border-2 border-teal-300 focus:border-teal-500"
              />
              <p className="text-xs text-teal-600 mt-1">Hány válaszlehetőség jelenjen meg kérdésenként</p>
            </div>
            <div>
              <label className="text-sm text-teal-800 mb-1 block">Minimális helyes válaszok (sikerhez)</label>
              <Input
                type="number"
                value={config.quizMinCorrectAnswers}
                onChange={(e) => updateConfig('quizMinCorrectAnswers', parseInt(e.target.value) || 1)}
                className="border-2 border-teal-300 focus:border-teal-500"
              />
              <p className="text-xs text-teal-600 mt-1">Ennyi helyes válasz kell a győzelemhez</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Reading Game (Olvasó) Settings */}
        <div className="bg-white rounded-xl shadow-md p-4 border-2 border-violet-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpenCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-violet-900">Olvasó játék</h3>
              <p className="text-xs text-violet-700">Olvasás utáni kérdések beállítások</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-violet-800 mb-1 block">Kérdések száma</label>
              <Input
                type="number"
                value={config.readingQuestionsCount}
                onChange={(e) => updateConfig('readingQuestionsCount', parseInt(e.target.value) || 1)}
                className="border-2 border-violet-300 focus:border-violet-500"
              />
              <p className="text-xs text-violet-600 mt-1">Hány kérdést kell megválaszolni az olvasás után</p>
            </div>
            <div>
              <label className="text-sm text-violet-800 mb-1 block">Minimális helyes válaszok (sikerhez)</label>
              <Input
                type="number"
                value={config.readingMinCorrectAnswers}
                onChange={(e) => updateConfig('readingMinCorrectAnswers', parseInt(e.target.value) || 1)}
                className="border-2 border-violet-300 focus:border-violet-500"
              />
              <p className="text-xs text-violet-600 mt-1">Ennyi helyes válasz kell a győzelemhez</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Stage/Milestone System Settings */}
        <div className="bg-white rounded-xl shadow-md p-4 border-2 border-amber-200">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-amber-900">Szakasz rendszer</h3>
              <p className="text-xs text-amber-700">Mérföldkő jutalmak beállítása</p>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-amber-800 mb-1 block">Gyémántok mérföldkőnként</label>
              <Input
                type="number"
                value={config.diamondsPerMilestone}
                onChange={(e) => updateConfig('diamondsPerMilestone', parseInt(e.target.value) || 1)}
                className="border-2 border-amber-300 focus:border-amber-500"
              />
              <p className="text-xs text-amber-600 mt-1">Ennyi gyémántot kap a játékos minden 6 szakasz teljesítése után</p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="mb-2">A módosítások azonnal érvénybe lépnek mentés után.</p>
              <p>Az alapértelmezett beállítások visszaállítása törli az összes egyéni beállítást.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
