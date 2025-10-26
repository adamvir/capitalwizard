import { BookViewTerm } from '../components/StandaloneBookView';

export const portfolioKezelesData: BookViewTerm[] = [
  {
    id: '1',
    term: 'Mi a Portfolió?',
    definition: 'A portfolió különböző befektetési eszközök összessége, amelyeket egy befektető vagy intézmény birtokol. Célja a kockázat csökkentése és a hozam optimalizálása diverzifikáció révén.',
    category: 'Alapok'
  },
  {
    id: '2',
    term: 'Portfolió Kezelés Definíciója',
    definition: 'A portfolió kezelés a befektetési eszközök kiválasztásának és felügyeletének művészete és tudománya. Magában foglalja az eszközallokációt, kockázatkezelést és a teljesítmény mérését.',
    category: 'Alapok'
  },
  {
    id: '3',
    term: 'Aktív vs Passzív Kezelés',
    definition: 'Az aktív kezelés célja a piac felülteljesítése aktív kereskedéssel. A passzív kezelés indexeket követ alacsony költséggel. Mindkét megközelítésnek megvannak az előnyei.',
    category: 'Alapok'
  },
  {
    id: '4',
    term: 'Befektetési Célok',
    definition: 'A portfolió kialakítása előtt tisztázni kell a célokat: tőkenövekedés, jövedelemszerzés, megőrzés vagy kombinációjuk. A célok határozzák meg a stratégiát.',
    category: 'Tervezés'
  },
  {
    id: '5',
    term: 'Kockázati Profil',
    definition: 'A befektető kockázattűrő képessége meghatározza a portfolió összetételét. Három fő típus: konzervatív, mérsékelt és agresszív befektető.',
    category: 'Tervezés'
  },
  {
    id: '6',
    term: 'Időhorizont',
    definition: 'A befektetési időtáv kritikus tényező. Rövid távon (1-3 év) alacsonyabb kockázat javasolt. Hosszú távon (10+ év) nagyobb kockázat vállalható.',
    category: 'Tervezés'
  },
  {
    id: '7',
    term: 'Likviditási Igények',
    definition: 'Fontos felmérni, mikor lesz szükség a befektetett pénzre. A likviditási igények befolyásolják az eszközválasztást és a portfolió szerkezetét.',
    category: 'Tervezés'
  },
  {
    id: '8',
    term: 'Eszközallokáció',
    definition: 'A befektetések különböző eszközosztályok közötti felosztása: részvények, kötvények, ingatlanok, készpénz. Ez a legfontosabb döntés a portfolió teljesítménye szempontjából.',
    category: 'Stratégia'
  },
  {
    id: '9',
    term: 'Stratégiai Allokáció',
    definition: 'Hosszú távú eszközallokációs terv, amely a befektető céljai és kockázati profilja alapján kerül meghatározásra. Évente felülvizsgálják, de ritkán változtatják.',
    category: 'Stratégia'
  },
  {
    id: '10',
    term: 'Taktikai Allokáció',
    definition: 'Rövid távú eltérések a stratégiai allokációtól a piaci lehetőségek kihasználására. Rugalmasabb megközelítés, amely reagál a piaci változásokra.',
    category: 'Stratégia'
  },
  {
    id: '11',
    term: 'Rebalancing (Újrasúlyozás)',
    definition: 'A portfolió eredeti allokációjának helyreállítása eladások és vásárlások révén. Rendszeresen (pl. évente) szükséges, hogy fenntartsuk a kívánt kockázati szintet.',
    category: 'Stratégia'
  },
  {
    id: '12',
    term: 'Core-Satellite Stratégia',
    definition: 'A portfolió nagy része (core) passzív indexkövetésből áll, kisebb része (satellite) aktív befektetésekből. Költséghatékony és rugalmas megközelítés.',
    category: 'Stratégia'
  },
  {
    id: '13',
    term: 'Modern Portfolió Elmélet (MPT)',
    definition: 'Harry Markowitz Nobel-díjas elmélete, amely matematikai alapon optimalizálja a portfoliót. A cél: maximális hozam adott kockázati szinten.',
    category: 'Elméletek'
  },
  {
    id: '14',
    term: 'Hatékony Frontier',
    definition: 'A Modern Portfolió Elmélet alapfogalma. Az összes optimális portfolió halmaza, amelyek a legjobb kockázat-hozam arányt kínálják.',
    category: 'Elméletek'
  },
  {
    id: '15',
    term: 'Sharpe Ráta',
    definition: 'A portfolió kockázattal korrigált hozamát méri. Képlet: (Portfolió hozam - Kockázatmentes hozam) / Volatilitás. Minél magasabb, annál jobb.',
    category: 'Teljesítménymérés'
  },
  {
    id: '16',
    term: 'Alfa (Alpha)',
    definition: 'A portfolió benchmarkhoz viszonyított többlethozama kockázat-kiigazítás után. Pozitív alfa az aktív kezelés sikerét mutatja.',
    category: 'Teljesítménymérés'
  },
  {
    id: '17',
    term: 'Béta (Beta)',
    definition: 'A portfolió piaci volatilitáshoz viszonyított érzékenysége. Béta = 1: a piaccal mozog. Béta > 1: volatilisebb. Béta < 1: stabilabb.',
    category: 'Teljesítménymérés'
  },
  {
    id: '18',
    term: 'Treynor Ráta',
    definition: 'Hasonló a Sharpe rátához, de a teljes volatilitás helyett csak a szisztematikus kockázatot (béta) veszi figyelembe. Diverzifikált portfoliókhoz használják.',
    category: 'Teljesítménymérés'
  },
  {
    id: '19',
    term: 'Information Ratio',
    definition: 'Az aktív kezelés hatékonyságát méri. A benchmarkhoz képesti többlethozamot osztja a tracking errorral. Segít értékelni az aktív kezelők teljesítményét.',
    category: 'Teljesítménymérés'
  },
  {
    id: '20',
    term: 'Maximum Drawdown',
    definition: 'A portfolió értékének legnagyobb csökkenése csúcsról mélypont között. Fontos kockázati mutató, amely megmutatja a legrosszabb időszakot.',
    category: 'Kockázatmérés'
  },
  {
    id: '21',
    term: 'Volatilitás',
    definition: 'A portfolió hozamának szórása, amely a kockázat mérésére szolgál. Magasabb volatilitás nagyobb kockázatot jelent, de nagyobb hozampotenciált is.',
    category: 'Kockázatmérés'
  },
  {
    id: '22',
    term: 'Value at Risk (VaR)',
    definition: 'Statisztikai módszer a potenciális veszteség becslésére meghatározott időtávon és konfidenciaszinten. Például: 95% valószínűséggel nem veszítünk többet 5%-nál egy hónapon.',
    category: 'Kockázatmérés'
  },
  {
    id: '23',
    term: 'Korrelációs Mátrix',
    definition: 'Megmutatja, hogyan mozognak együtt a portfolió eszközei. Alacsony korreláció jobb diverzifikációt eredményez. Ideális esetben negatívan korrelált eszközöket keresünk.',
    category: 'Kockázatmérés'
  },
  {
    id: '24',
    term: 'Részvény Allokáció',
    definition: 'A portfolió részvényben tartott része. Magasabb növekedési potenciál, de nagyobb volatilitás. Fiatalabb befektetőknél általában magasabb arányú.',
    category: 'Eszközosztályok'
  },
  {
    id: '25',
    term: 'Kötvény Allokáció',
    definition: 'Fix kamatozású értékpapírok aránya. Stabilabb jövedelem, alacsonyabb kockázat. Idősebb befektetőknél vagy konzervatív portfoliókban magasabb.',
    category: 'Eszközosztályok'
  },
  {
    id: '26',
    term: 'Alternatív Befektetések',
    definition: 'Hagyományos eszközosztályokon kívüli befektetések: ingatlan, nyersanyagok, hedge fundok, private equity. Diverzifikációt és egyedi lehetőségeket kínálnak.',
    category: 'Eszközosztályok'
  },
  {
    id: '27',
    term: 'Készpénz Pozíció',
    definition: 'Likvidálandó eszközök a portfolióban. Biztonságot nyújt és lehetőséget ad új befektetésekre. Általában a portfolió 5-10%-a.',
    category: 'Eszközosztályok'
  },
  {
    id: '28',
    term: 'Földrajzi Diverzifikáció',
    definition: 'Befektetések szétosztása különböző országok és régiók között. Csökkenti az ország-specifikus kockázatokat és új növekedési lehetőségeket kínál.',
    category: 'Diverzifikáció'
  },
  {
    id: '29',
    term: 'Szektoriális Diverzifikáció',
    definition: 'Befektetések szétosztása különböző iparágak között: technológia, egészségügy, pénzügy stb. Csökkenti a szektorspecifikus kockázatokat.',
    category: 'Diverzifikáció'
  },
  {
    id: '30',
    term: 'Méret Szerinti Diverzifikáció',
    definition: 'Nagy-, közepes és kisvállalati részvények kombinálása. Mindegyik méretkategória más-más kockázat-hozam profilt kínál.',
    category: 'Diverzifikáció'
  },
  {
    id: '31',
    term: '100 Mínusz Életkor Szabály',
    definition: 'Egyszerű hüvelykujj szabály: részvény allokáció = 100 - életkor. 30 éves: 70% részvény, 60 éves: 40% részvény. Konzervatív, de jó kiindulópont.',
    category: 'Gyakorlati Szabályok'
  },
  {
    id: '32',
    term: '4% Szabály',
    definition: 'Nyugdíjas portfolióknál: évente a portfolió 4%-át lehet felhasználni anélkül, hogy kifogyjon 30 év alatt. Fontos tervezési eszköz.',
    category: 'Gyakorlati Szabályok'
  },
  {
    id: '33',
    term: 'Dollar Cost Averaging',
    definition: 'Rendszeres, fix összegű befektetés időszakonként. Csökkenti a piaci időzítés kockázatát és átlagáron vásárol. Passzív, fegyelmezett stratégia.',
    category: 'Befektetési Technikák'
  },
  {
    id: '34',
    term: 'Lump Sum Befektetés',
    definition: 'Egyszeri, nagy összegű befektetés. Történelmi adatok szerint hosszú távon jobban teljesít, mint a fokozatos befektetés, de pszichológiailag nehezebb.',
    category: 'Befektetési Technikák'
  },
  {
    id: '35',
    term: 'Tax Loss Harvesting',
    definition: 'Veszteséges pozíciók értékesítése adózási előnyökért. A veszteségekkel ellensúlyozható a nyereség, csökkentve az adóterhet.',
    category: 'Adóoptimalizálás'
  },
  {
    id: '36',
    term: 'Asset Location',
    definition: 'Különböző eszközök elhelyezése adózási szempontból optimális számlákra. Pl. kötvények adókedvezményes számlára, részvények normál számlára.',
    category: 'Adóoptimalizálás'
  },
  {
    id: '37',
    term: 'Címzetes Költség',
    definition: 'A befektetési alapok és ETF-ek éves költsége (expense ratio). Hosszú távon jelentősen befolyásolja a hozamot, ezért alacsony költségű termékeket keressünk.',
    category: 'Költségek'
  },
  {
    id: '38',
    term: 'Tranzakciós Költségek',
    definition: 'Vételi és eladási jutalékok. Csökkenthetők online brókerek használatával és ritkább kereskedéssel. Aktív stratégiáknál jelentősek lehetnek.',
    category: 'Költségek'
  },
  {
    id: '39',
    term: 'Spread Költség',
    definition: 'A vételi és eladási ár közötti különbség. Likvid eszközöknél kisebb, illékony eszközöknél nagyobb. Implicit költség, amit gyakran figyelmen kívül hagynak.',
    category: 'Költségek'
  },
  {
    id: '40',
    term: 'Benchmarking',
    definition: 'A portfolió teljesítményének összehasonlítása egy referenciaindexszel (pl. S&P 500). Segít értékelni a kezelés hatékonyságát.',
    category: 'Teljesítmény Értékelés'
  },
  {
    id: '41',
    term: 'Tracking Error',
    definition: 'A portfolió hozamának eltérése a benchmarktól. Alacsony tracking error passzív kezelést, magas aktív kezelést jelez.',
    category: 'Teljesítmény Értékelés'
  },
  {
    id: '42',
    term: 'Attribution Analysis',
    definition: 'Elemzési módszer annak meghatározására, hogy a hozam mely döntésekből származik: eszközallokáció, értékpapír-kiválasztás vagy időzítés.',
    category: 'Teljesítmény Értékelés'
  },
  {
    id: '43',
    term: 'Risk Parity',
    definition: 'Portfolió stratégia, amely egyenlően osztja el a kockázatot (nem az értéket) az eszközosztályok között. Fejlettebb megközelítés, mint a hagyományos allokáció.',
    category: 'Fejlett Stratégiák'
  },
  {
    id: '44',
    term: 'Black-Litterman Modell',
    definition: 'Fejlett optimalizációs módszer, amely a piaci egyensúlyt kombinálja a befektető nézeteivel. A Modern Portfolió Elmélet továbbfejlesztése.',
    category: 'Fejlett Stratégiák'
  },
  {
    id: '45',
    term: 'Momentumstratégia',
    definition: 'A jól teljesítő eszközök túlsúlyozása és a gyengék alulsúlyozása. Rövid-középtávon hatékony lehet, de ellentétes a mean reversion elmélettel.',
    category: 'Fejlett Stratégiák'
  },
  {
    id: '46',
    term: 'Mean Reversion',
    definition: 'Az elmélet szerint az árak hosszú távon visszatérnek az átlagukhoz. Túlzott kilengések után ellentétes pozíciók nyithatók.',
    category: 'Fejlett Stratégiák'
  },
  {
    id: '47',
    term: 'Factor Investing',
    definition: 'Bizonyos tényezők (faktorok) alapján történő befektetés: érték, méret, momentum, minőség, volatilitás. Tudományosan alátámasztott megközelítés.',
    category: 'Fejlett Stratégiák'
  },
  {
    id: '48',
    term: 'Smart Beta',
    definition: 'Passzív és aktív kezelés közötti hibrid. Szabályalapú módszerekkel próbál többlethozamot elérni, de alacsonyabb költséggel, mint az aktív kezelés.',
    category: 'Fejlett Stratégiák'
  },
  {
    id: '49',
    term: 'ESG Befektetés',
    definition: 'Környezeti, társadalmi és vállalatirányítási szempontok integrálása a befektetési döntésekbe. Egyre népszerűbb a fenntartható befektetés iránti igény miatt.',
    category: 'Fenntarthatóság'
  },
  {
    id: '50',
    term: 'Impact Investing',
    definition: 'Olyan befektetések, amelyek pozitív társadalmi vagy környezeti hatást céloznak meg pénzügyi hozam mellett. Az ESG következő szintje.',
    category: 'Fenntarthatóság'
  },
  {
    id: '51',
    term: 'Viselkedési Torzítások',
    definition: 'Pszichológiai hibák, amelyek rossz befektetési döntésekhez vezetnek: túlzott önbizalom, veszteség averziója, csoportgondolkodás. Tudatában lenni fontos.',
    category: 'Viselkedési Pénzügyek'
  },
  {
    id: '52',
    term: 'Confirmation Bias',
    definition: 'Csak olyan információkat keresünk, amelyek megerősítik előzetes véleményünket. Veszélyes torzítás a befektetésekben.',
    category: 'Viselkedési Pénzügyek'
  },
  {
    id: '53',
    term: 'Anchoring',
    definition: 'Túlzott támaszkodás egy információra (horgony). Pl. vásárlási ár mint referenciaérték eladáskor. Racionális döntéseket akadályozza.',
    category: 'Viselkedési Pénzügyek'
  },
  {
    id: '54',
    term: 'Recency Bias',
    definition: 'A közelmúltbeli események túlértékelése. Pl. közelmúltbeli piacváltozások alapján döntések hozatala hosszú távú trendek helyett.',
    category: 'Viselkedési Pénzügyek'
  },
  {
    id: '55',
    term: 'Herding Behavior',
    definition: 'Csoportgondolkodás, amikor mások döntéseit követjük. Buborékok és pánik kialakulásához vezet. Önálló elemzés fontos.',
    category: 'Viselkedési Pénzügyek'
  },
  {
    id: '56',
    term: 'Optimális Portfolió Méret',
    definition: 'Kutatások szerint 15-30 részvény már jó diverzifikációt biztosít. Túl sok pozíció nehezen kezelhető, túl kevés kockázatos.',
    category: 'Portfolió Konstrukció'
  },
  {
    id: '57',
    term: 'Koncentrált vs Diverzifikált',
    definition: 'Koncentrált portfolió: 5-10 pozíció, nagyobb potenciális hozam és kockázat. Diverzifikált: 20+ pozíció, kiegyensúlyozottabb.',
    category: 'Portfolió Konstrukció'
  },
  {
    id: '58',
    term: 'Top-Down Megközelítés',
    definition: 'Először makrogazdasági elemzés (gazdasági kilátások, régiók), majd szektorok és végül egyedi részvények kiválasztása.',
    category: 'Portfolió Konstrukció'
  },
  {
    id: '59',
    term: 'Bottom-Up Megközelítés',
    definition: 'Egyedi vállalatok fundamentális elemzése makrogazdasági környezet figyelmen kívül hagyásával. Értékbefektetők kedvelt módszere.',
    category: 'Portfolió Konstrukció'
  },
  {
    id: '60',
    term: 'Likviditás Menedzsment',
    definition: 'A portfolió likvid eszközeinek kezelése. Fontos, hogy legyen készpénz vagy könnyen értékesíthető eszköz váratlan kiadásokra.',
    category: 'Kockázatkezelés'
  },
  {
    id: '61',
    term: 'Hedging Stratégiák',
    definition: 'Fedezeti ügyletek a kockázat csökkentésére. Opciók, futures, short pozíciók használata a portfolió védelmére piaci visszaesés ellen.',
    category: 'Kockázatkezelés'
  },
  {
    id: '62',
    term: 'Stop-Loss Stratégia',
    definition: 'Automatikus eladási megbízás adott árnál. Védi a portfoliót nagy veszteségektől, de korai kiszálláshoz is vezethet volatilis piacokon.',
    category: 'Kockázatkezelés'
  },
  {
    id: '63',
    term: 'Pozíció Sizing',
    definition: 'Annak meghatározása, hogy egy pozícióba mennyi tőkét fektessünk. Általában a portfolió 2-5%-a pozíciónként ajánlott.',
    category: 'Kockázatkezelés'
  },
  {
    id: '64',
    term: 'Kelly Kritérium',
    definition: 'Matematikai képlet az optimális pozícióméret meghatározására. Agresszív stratégia, gyakorlatban csak fele vagy harmada alkalmazandó.',
    category: 'Kockázatkezelés'
  },
  {
    id: '65',
    term: 'Portfolió Review Gyakoriság',
    definition: 'Negyedévente alapos felülvizsgálat, évente stratégiai újraértékelés ajánlott. Túl gyakori ellenőrzés érzelmi döntésekhez vezethet.',
    category: 'Monitoring'
  },
  {
    id: '66',
    term: 'Dashboard és Reporting',
    definition: 'Vizuális eszközök a portfolió nyomon követésére. Fontos mutatók: teljesítmény, allokáció, kockázati metrikák. Egyszerű, érthető formátum kulcsfontosságú.',
    category: 'Monitoring'
  },
  {
    id: '67',
    term: 'Teljesítmény Benchmarkok',
    definition: 'Releváns összehasonlítási indexek kiválasztása. Globális portfolióhoz MSCI World, amerikai részvényekhez S&P 500, kötvényekhez Bloomberg Aggregate.',
    category: 'Monitoring'
  },
  {
    id: '68',
    term: 'Makrogazdasági Monitoring',
    definition: 'GDP növekedés, infláció, munkanélküliség, kamatlábak figyelése. Ezek a faktorok befolyásolják a piacokat és az eszközallokációt.',
    category: 'Monitoring'
  },
  {
    id: '69',
    term: 'Jegybanki Politika Hatása',
    definition: 'A központi bankok kamatlábpolitikája jelentősen befolyásolja a piacokat. Kamatemelés általában negatív részvényekre, kamatcsökkentés pozitív.',
    category: 'Makroökonómia'
  },
  {
    id: '70',
    term: 'Inflációs Védelem',
    definition: 'Eszközök, amelyek védnek az infláció ellen: részvények, ingatlanok, nyersanyagok, inflációhoz kötött kötvények (TIPS). Fontos hosszú távú portfoliókban.',
    category: 'Makroökonómia'
  },
  {
    id: '71',
    term: 'Recessziós Stratégia',
    definition: 'Gazdasági visszaesés idején: növelni a kötvények és készpénz arányát, defenzív szektorokba fektetni (egészségügy, alapvető fogyasztási cikkek).',
    category: 'Ciklikus Stratégiák'
  },
  {
    id: '72',
    term: 'Fellendülési Stratégia',
    definition: 'Gazdasági növekedés idején: növelni a részvények arányát, ciklikus szektorok (technológia, fogyasztási cikkek, pénzügyek) túlsúlyozása.',
    category: 'Ciklikus Stratégiák'
  },
  {
    id: '73',
    term: 'Defenzív Eszközök',
    definition: 'Visszaesés idején stabil eszközök: kormány kötvények, védettséget nyújtó szektorok részvényei, arany. Alacsonyabb hozam, de stabilitás.',
    category: 'Eszközosztályok'
  },
  {
    id: '74',
    term: 'Ciklikus Eszközök',
    definition: 'Gazdasági ciklussal együtt mozgó eszközök: technológia, autóipar, építőipar. Magasabb potenciális hozam, de nagyobb volatilitás.',
    category: 'Eszközosztályok'
  },
  {
    id: '75',
    term: 'Arany mint Portfolió Elem',
    definition: 'Hagyományosan a portfolió 5-10%-a aranyban. Infláció és válság elleni védelem, alacsony korreláció részvényekkel. Önmagában nem termel hozamot.',
    category: 'Alternatív Eszközök'
  },
  {
    id: '76',
    term: 'Ingatlan Befektetés',
    definition: 'Fizikai ingatlan vagy REIT-ek. Diverzifikáció, infláció védelem, passzív jövedelem. Illékony, kezdőtőke igényes, de értékes portfolió elem.',
    category: 'Alternatív Eszközök'
  },
  {
    id: '77',
    term: 'Nyersanyagok',
    definition: 'Olaj, gáz, mezőgazdasági termékek befektetési eszközként. Magas volatilitás, inflációs védelem. Futures, ETF-ek vagy részvények révén elérhető.',
    category: 'Alternatív Eszközök'
  },
  {
    id: '78',
    term: 'Kriptovaluták Szerepe',
    definition: 'Spekulatív eszközosztály, extrém volatilitás. Ha szerepel a portfolióban, maximum 1-5%. Csak felesleges tőkéből, amit megengedhetünk elveszíteni.',
    category: 'Alternatív Eszközök'
  },
  {
    id: '79',
    term: 'Currency Hedging',
    definition: 'Deviza kockázat fedezése nemzetközi befektetéseknél. Csökkenti a volatilitást, de költséges és korlátozza a potenciális nyereséget is.',
    category: 'Nemzetközi Befektetés'
  },
  {
    id: '80',
    term: 'Feltörekvő Piacok',
    definition: 'Fejlődő országok piacai (Kína, India, Brazília). Magasabb növekedési potenciál, de nagyobb politikai és gazdasági kockázat.',
    category: 'Nemzetközi Befektetés'
  },
  {
    id: '81',
    term: 'Fejlett Piacok',
    definition: 'Stabil, érett gazdaságok (USA, EU, Japán). Alacsonyabb növekedés, de nagyobb stabilitás és likviditás. A portfolió gerincét képezik.',
    category: 'Nemzetközi Befektetés'
  },
  {
    id: '82',
    term: 'Home Bias',
    definition: 'Túlzott hazai befektetések aránya. Sok befektető túlsúlyozza saját országát, ami csökkenti a diverzifikációt. Tudatos nemzetközi kitettség fontos.',
    category: 'Nemzetközi Befektetés'
  },
  {
    id: '83',
    term: 'Családi Iroda (Family Office)',
    definition: 'Magánvagyonkezelő szervezet nagyon tehetős családok számára. Teljes körű szolgáltatás: befektetés, adó, jogi, életstílus tanácsadás.',
    category: 'Professzionális Kezelés'
  },
  {
    id: '84',
    term: 'Robo-Advisor',
    definition: 'Automatizált portfolió kezelés algoritmusok alapján. Alacsony költségű, egyszerű, kezdők számára ideális. Emberi tanácsadás nélkül.',
    category: 'Professzionális Kezelés'
  },
  {
    id: '85',
    term: 'Pénzügyi Tanácsadó',
    definition: 'Emberi szakértő, aki személyre szabott tanácsot ad. Magasabb költség, de komplex helyzetekben és nagy vagyonoknál értékes.',
    category: 'Professzionális Kezelés'
  },
  {
    id: '86',
    term: 'Fiduciary Standard',
    definition: 'Jogi kötelezettség, hogy a tanácsadó a kliens legjobb érdekében járjon el. Mindig kérdezzük meg, hogy tanácsadónk fiduciary-e.',
    category: 'Professzionális Kezelés'
  },
  {
    id: '87',
    term: 'Fee-Only vs Commission',
    definition: 'Fee-only tanácsadók csak díjat számítanak fel, nincs érdekellentét. Commission-based tanácsadók jutalékot kapnak, ami befolyásolhatja ajánlásaikat.',
    category: 'Professzionális Kezelés'
  },
  {
    id: '88',
    term: 'Nyugdíj Portfolió',
    definition: 'Konzervatív megközelítés jövedelemre és stabilitásra fókuszálva. Magas kötvény arány, osztalékfizető részvények, alacsony volatilitás.',
    category: 'Életszakasz Portfoliók'
  },
  {
    id: '89',
    term: 'Akkumulációs Portfolió',
    definition: 'Fiatal befektetők számára, hosszú időhorizont. Magas részvény arány (80-100%), növekedési részvények, kis osztalék.',
    category: 'Életszakasz Portfoliók'
  },
  {
    id: '90',
    term: 'Glide Path',
    definition: 'Automatikus allokáció változás az idő előrehaladtával. Fiatal korban agresszív, nyugdíj közeledtével egyre konzervatívabb.',
    category: 'Életszakasz Portfoliók'
  },
  {
    id: '91',
    term: 'Target Date Funds',
    definition: 'Befektetési alapok, amelyek automatikusan módosítják az allokációt egy célév felé (pl. nyugdíj éve). Egyszerű, kéz nélküli megoldás.',
    category: 'Életszakasz Portfoliók'
  },
  {
    id: '92',
    term: 'Örökség Tervezés',
    definition: 'Vagyon átadása következő generációknak. Portfolió része hosszú távon illékony, növekedési orientált marad. Adóhatékonyság fontos.',
    category: 'Speciális Célok'
  },
  {
    id: '93',
    term: 'Jótékonysági Portfolió',
    definition: 'Adományozási célú eszközök elkülönített kezelése. Donor-Advised Fund vagy alapítvány. Adókedvezmények kihasználása.',
    category: 'Speciális Célok'
  },
  {
    id: '94',
    term: 'Oktatási Megtakarítás',
    definition: '529 Plan (USA) vagy hasonló adókedvezményes számlák. Glide path stratégia: agresszív kezdetben, konzervatív a felhasználás közeledtével.',
    category: 'Speciális Célok'
  },
  {
    id: '95',
    term: 'Vészhelyzeti Alap',
    definition: 'Nem a befektetési portfolió része, de fontos! 3-6 havi kiadás könnyen elérhető helyen. Védelem váratlan események ellen.',
    category: 'Speciális Célok'
  },
  {
    id: '96',
    term: 'Portfolio Stressz Teszt',
    definition: 'A portfolió tesztelése extrém piaci forgatókönyvekben. Mit tenne 2008-as válság vagy 2020-as összeomlás? Készülés a legrosszabbra.',
    category: 'Kockázatkezelés'
  },
  {
    id: '97',
    term: 'Scenario Analysis',
    definition: 'Különböző gazdasági forgatókönyvek hatásának elemzése: infláció, recesszió, stagfláció. Segít felkészülni különböző kimenetelekre.',
    category: 'Kockázatkezelés'
  },
  {
    id: '98',
    term: 'Monte Carlo Szimuláció',
    definition: 'Statisztikai módszer a portfolió jövőbeli lehetséges kimeneteleinek szimulálására. Több ezer forgatókönyv futtatása valószínűségi eloszlásokkal.',
    category: 'Kockázatkezelés'
  },
  {
    id: '99',
    term: 'Tail Risk',
    definition: 'Extrém, ritka események kockázata (fekete hattyú események). Kis valószínűség, de hatalmas hatás. Black swan események elleni védelem nehéz, de fontos.',
    category: 'Kockázatkezelés'
  },
  {
    id: '100',
    term: 'Összefoglalás: Sikeres Portfolió',
    definition: 'Tiszta célok, megfelelő allokáció, diverzifikáció, alacsony költségek, fegyelem, türelem, rendszeres felülvizsgálat, érzelemmentes döntéshozatal. A hosszú távú siker kulcsa!',
    category: 'Összefoglalás'
  }
];
