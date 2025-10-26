import { Lightbulb } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const tips = [
  "A részvények hosszú távon általában felülmúlják a kötvények teljesítményét.",
  "Diverzifikáció: Ne tedd minden tojásodat egy kosárba!",
  "Warren Buffett: 'Az ár az, amit fizetsz. Az érték az, amit kapsz.'",
  "A kamatos kamat a világ nyolcadik csodája - Albert Einstein",
  "Befektetés előtt mindig végezz alapos kutatást!",
  "Az ETF-ek kiváló lehetőséget kínálnak a diverzifikált portfólióhoz.",
  "Soha ne fektess be olyan pénzt, amire szükséged lehet rövidtávon.",
  "A kockázat és a hozam mindig együtt járnak.",
  "Reguláris megtakarítás: A legfontosabb az első lépés!",
  "A türelem a befektető legjobb barátja.",
  "Ne hagyd, hogy az érzelmek vezéreljenek a befektetési döntéseidben.",
  "Az infláció lassan, de biztosan csökkenti a készpénz értékét.",
  "Befektetési időhorizont: Minél hosszabb, annál jobb.",
  "A tanulás soha nem áll meg - folyamatosan képezd magad!",
  "Kockázatkezelés: Soha ne kockáztass többet, mint amennyit elveszíthetsz.",
  "Osztalékbefektetés: Passzív jövedelem generálása részvényekből.",
  "A piaci volatilitás normális jelenség - ne ess pánikba!",
  "Dollar-cost averaging: Rendszeres befektetés csökkenti az időzítési kockázatot.",
  "Sürgősségi alap: Tarts fenn 3-6 havi kiadásra elegendő tartalékot.",
  "Az adók hatással vannak a befektetési hozamaidra - tervezz előre!",
  "Index alapok: Alacsony költségű befektetés a teljes piacba.",
  "Ne próbálj időzíteni a piacot - szinte senki sem képes rá következetesen.",
  "Vállalati kötvények: Magasabb hozam, magasabb kockázat.",
  "Részvény opciók nagy kockázattal járnak - csak tapasztalt befektetőknek!",
  "A diverzifikáció nemcsak eszközosztályokra, hanem földrajzilag is fontos.",
  "Befektetési célok meghatározása az első lépés minden stratégiában.",
  "A befektetési költségek évtizedek alatt milliókat emészthetnek fel.",
  "Rebalancing: Tartsd fenn a célportfóliód arányait!",
  "Ne kövess vak tippeket - végezd el a saját kutatásodat!",
  "A múltbeli teljesítmény nem garantálja a jövőbeli eredményeket.",
  "Tanulj a hibáidból, de ne hagyd, hogy megbénítsanak.",
  "Kezdd el fiatalon: Az idő a legnagyobb szövetségesed a befektetésben.",
  "Kötvények: Stabilitás és rendszeres jövedelem a portfólióban.",
  "Kriptovaluták: Magas kockázat, nagy volatilitás - csak okosan!",
  "Ingatlan befektetés: Kézzelfogható eszköz, de alacsony likviditás."
];

export function TipBar() {
  const [currentTip, setCurrentTip] = useState('');
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    // Select random tip on mount
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setCurrentTip(randomTip);

    // Change tip every 20 seconds (matching animation duration)
    const interval = setInterval(() => {
      const newTip = tips[Math.floor(Math.random() * tips.length)];
      setCurrentTip(newTip);
      setAnimationKey(prev => prev + 1);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-[196px] left-0 right-0 z-20 px-4">
      <div className="bg-gradient-to-r from-purple-800/40 to-blue-800/40 backdrop-blur-md border border-purple-500/30 rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5">
          {/* Lightbulb icon */}
          <div className="flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
          </div>
          
          {/* Tip label */}
          <span className="text-yellow-400 flex-shrink-0">Tipp:</span>
          
          {/* Tip text container */}
          <div className="flex-1 overflow-hidden relative">
            <div
              key={animationKey}
              className="text-white whitespace-nowrap animate-marquee"
            >
              {currentTip}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}