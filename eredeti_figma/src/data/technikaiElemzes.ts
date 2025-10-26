import { BookViewTerm } from '../components/StandaloneBookView';

export const technikaiElemzesData: BookViewTerm[] = [
  {
    id: '1',
    term: 'Mi a Technikai Elemzés?',
    definition: 'A technikai elemzés a múltbeli árfolyamok és volumen adatok tanulmányozása jövőbeli ármozgások előrejelzésére. "A múlt ismétli önmagát" elven alapul.',
    category: 'Alapok'
  },
  {
    id: '2',
    term: 'Dow Elmélet',
    definition: 'Charles Dow 6 alapelve: a piac mindent tükröz, három trend létezik, trendek három fázisúak, indexek megerősítik egymást, volumen megerősíti a trendet, trend érvényes amíg ellenkező jel.',
    category: 'Alapelvek'
  },
  {
    id: '3',
    term: 'Hatékony Piac vs Technika',
    definition: 'Az Efficient Market Hypothesis szerint a technikázás haszontalan. A gyakorlat viszont mutatja: piaci inefficienciák és viselkedési torzítások miatt működhet.',
    category: 'Alapelvek'
  },
  {
    id: '4',
    term: 'Chart Típusok',
    definition: 'Fő típusok: vonalgrafikon (záróárak), oszlopgrafikon (OHLC - Open, High, Low, Close), gyertyagrafikon (candlestick). A gyertyagrafikon a legnépszerűbb.',
    category: 'Grafikonok'
  },
  {
    id: '5',
    term: 'Időkeretek',
    definition: 'Különböző időkeretek eltérő képet adnak. Intraday: 1-15 perc, swing: napok, pozíciós: hetek/hónapok. Több időkeret együttes elemzése ajánlott.',
    category: 'Grafikonok'
  },
  {
    id: '6',
    term: 'Gyertyák Anatómiája',
    definition: 'Test: nyitó és záró közötti rész. Kanóc: szélsőségek. Zöld/fehér: emelkedő, piros/fekete: eső. A test és kanóc mérete fontos információ.',
    category: 'Candlestick'
  },
  {
    id: '7',
    term: 'Doji',
    definition: 'Gyertya, ahol nyitó és záró majdnem egyenlő (kicsi vagy nincs test). Bizonytalanságot jelez. Fontos fordulópont lehet trend végén.',
    category: 'Candlestick'
  },
  {
    id: '8',
    term: 'Hammer és Hanging Man',
    definition: 'Hosszú alsó kanóc, kicsi test felül. Hammer: emelkedő trend elején bullish. Hanging Man: emelkedő trend tetején bearish. Megerősítés kell!',
    category: 'Candlestick'
  },
  {
    id: '9',
    term: 'Engulfing Pattern',
    definition: 'Kétgyertyás minta. Bullish: kis piros után nagy zöld, amely "elnyeli" az előzőt. Bearish: fordítva. Erős fordulópontot jelez.',
    category: 'Candlestick'
  },
  {
    id: '10',
    term: 'Morning Star / Evening Star',
    definition: 'Háromgyertyás minta. Morning Star (bullish): hosszú piros, kis test (doji), hosszú zöld. Evening Star: fordítva. Erős fordulójel.',
    category: 'Candlestick'
  },
  {
    id: '11',
    term: 'Támasz (Support)',
    definition: 'Árszint, ahol vételi nyomás megállítja az esést. Korábbi mélypontok, round numbers, mozgóátlagok. Minél többször tesztelve, annál erősebb.',
    category: 'Támasz-Ellenállás'
  },
  {
    id: '12',
    term: 'Ellenállás (Resistance)',
    definition: 'Árszint, ahol eladási nyomás megállítja az emelkedést. Korábbi csúcsok, round numbers. Áttörés után támasz lesz (role reversal).',
    category: 'Támasz-Ellenállás'
  },
  {
    id: '13',
    term: 'Pszicho Szintek',
    definition: 'Kerek számok (10, 50, 100, 1000), ahol gyakran van támasz/ellenállás. Pszichológiai jelentőségük van, self-fulfilling prophecy.',
    category: 'Támasz-Ellenállás'
  },
  {
    id: '14',
    term: 'Fibonacci Retracement',
    definition: '23.6%, 38.2%, 50%, 61.8%, 78.6% szintek. Korrekciók gyakran ezeken állnak meg. 61.8% (arany metszés) a legfontosabb.',
    category: 'Fibonacci'
  },
  {
    id: '15',
    term: 'Fibonacci Extension',
    definition: '127.2%, 161.8%, 261.8% szintek. Trendfolytatásnál célok meghatározására. Ár hol állhat meg az új csúcsokon.',
    category: 'Fibonacci'
  },
  {
    id: '16',
    term: 'Emelkedő Trend',
    definition: 'Magasabb csúcsok és magasabb mélypontok sorozata. Trendvonal a mélypontokat köti össze. Vételi pozíciók keresése.',
    category: 'Trendek'
  },
  {
    id: '17',
    term: 'Eső Trend',
    definition: 'Alacsonyabb csúcsok és alacsonyabb mélypontok sorozata. Trendvonal a csúcsokat köti össze. Eladási vagy short pozíciók.',
    category: 'Trendek'
  },
  {
    id: '18',
    term: 'Oldalazó Piac (Range)',
    definition: 'Nincs egyértelmű trend, támasz és ellenállás között oszcillál. Range trading: vásárlás támaszonnál, eladás ellenállásnál.',
    category: 'Trendek'
  },
  {
    id: '19',
    term: 'Trendvonal Rajzolás',
    definition: 'Legalább két pont kell, de három vagy több erősíti. Nem kell minden pontra ráfeküdjön. Törés volumennel = trend vég.',
    category: 'Trendek'
  },
  {
    id: '20',
    term: 'Csatorna (Channel)',
    definition: 'Két párhuzamos trendvonal. Emelkedő csatorna: alsó vonal támasz, felső ellenállás. Kereskedés a csatornán belül.',
    category: 'Trendek'
  },
  {
    id: '21',
    term: 'Mozgóátlag (Moving Average)',
    definition: 'Árfolyamok átlaga adott időszakra. Simítja a volatilitást, mutatja a trendet. SMA (egyszerű) vs EMA (exponenciális).',
    category: 'Indikátorok'
  },
  {
    id: '22',
    term: 'Golden Cross',
    definition: '50 napos MA felülről keresztezi a 200 napos MA-t. Erős bullish jel. Hosszú távú trend változás.',
    category: 'Indikátorok'
  },
  {
    id: '23',
    term: 'Death Cross',
    definition: '50 napos MA alulról keresztezi a 200 napos MA-t. Erős bearish jel. Trend megfordulás.',
    category: 'Indikátorok'
  },
  {
    id: '24',
    term: 'Bollinger Bands',
    definition: 'Középső vonal: 20 napos MA. Külső sávok: 2 szórásnyi távolság. Volatilitást mér. Szűk sáv = kitörés közeli.',
    category: 'Indikátorok'
  },
  {
    id: '25',
    term: 'Bollinger Squeeze',
    definition: 'Amikor a sávok szűkülnek = alacsony volatilitás. Általában nagy mozgás előzi meg. Kitörés irányára nincs előrejelzés.',
    category: 'Indikátorok'
  },
  {
    id: '26',
    term: 'RSI (Relative Strength Index)',
    definition: '0-100 skálán méri a momentum. 70 felett túlvett, 30 alatt túladott. 14 periódus a standard. Divergencia fontos jel.',
    category: 'Oszcillátorok'
  },
  {
    id: '27',
    term: 'RSI Divergencia',
    definition: 'Bullish: ár új mélypontot ér el, RSI nem. Bearish: ár új csúcsot ér el, RSI nem. Erős fordulójel.',
    category: 'Oszcillátorok'
  },
  {
    id: '28',
    term: 'MACD',
    definition: 'Moving Average Convergence Divergence. 12 és 26 periódus EMA különbsége. Jelvonal: 9 periódus EMA. Kereszteződés = jel.',
    category: 'Oszcillátorok'
  },
  {
    id: '29',
    term: 'MACD Hisztogram',
    definition: 'MACD és jelvonal különbsége. Növekvő hisztogram = momentum erősödik. Csökkenő = gyengül. Nullvonal keresztezés fontos.',
    category: 'Oszcillátorok'
  },
  {
    id: '30',
    term: 'Stochastic Oscillator',
    definition: 'Jelenlegi záróár pozíciója a high-low tartományban. %K (gyors) és %D (lassú). Túlvett/túladott zónák és kereszteződések.',
    category: 'Oszcillátorok'
  },
  {
    id: '31',
    term: 'Volume (Volumen)',
    definition: 'Kereskedett mennyiség. Megerősíti a trendeket és mintákat. Emelkedő volume emelkedő árral = erős trend.',
    category: 'Volumen'
  },
  {
    id: '32',
    term: 'Volume Price Analysis',
    definition: 'Ár és volumen együttes elemzése. Nagy volume + kis ármozgás = akkumuláció vagy distribúció.',
    category: 'Volumen'
  },
  {
    id: '33',
    term: 'On-Balance Volume (OBV)',
    definition: 'Kumulatív volumen indikátor. Emelkedő nap: +volume, eső nap: -volume. Divergencia az árral fontos jel.',
    category: 'Volumen'
  },
  {
    id: '34',
    term: 'Climax Volume',
    definition: 'Rendkívül magas volumen, gyakran trend végén. Exhaustion (kimerülés) jele. Fordulópont közelében.',
    category: 'Volumen'
  },
  {
    id: '35',
    term: 'Fej-Váll (Head and Shoulders)',
    definition: 'Bearish fordulóminta. Bal váll, fej (magasabb), jobb váll. Nyakvonal törése = eladás. Célár: nyakvonaltól fej magassága.',
    category: 'Chart Minták'
  },
  {
    id: '36',
    term: 'Inverz Fej-Váll',
    definition: 'Bullish fordulóminta. Alul fordított. Nyakvonal felfelé törése = vétel. Erős fordulójel eső trend végén.',
    category: 'Chart Minták'
  },
  {
    id: '37',
    term: 'Dupla Csúcs (Double Top)',
    definition: 'Bearish fordulóminta. Két csúcs hasonló magasságban, közötte völgy. Völgy árának törése = eladás.',
    category: 'Chart Minták'
  },
  {
    id: '38',
    term: 'Dupla Fenék (Double Bottom)',
    definition: 'Bullish fordulóminta. Két mélypontot hasonló szinten, közötte csúcs. Csúcs árának törése = vétel.',
    category: 'Chart Minták'
  },
  {
    id: '39',
    term: 'Háromszög Minták',
    definition: 'Konszolidációs minták. Szimmetrikus: bizonytalan. Emelkedő: bullish. Eső: bearish. Kitörés iránya kulcsfontosságú.',
    category: 'Chart Minták'
  },
  {
    id: '40',
    term: 'Zászló és Lobogó (Flag & Pennant)',
    definition: 'Rövid konszolidáció erős mozgás után. Zászló: párhuzamos csatorna. Lobogó: kis szimmetrikus háromszög. Folytatási minták.',
    category: 'Chart Minták'
  },
  {
    id: '41',
    term: 'Csésze és Fül (Cup and Handle)',
    definition: 'Bullish folytatási minta. U alakú csésze, majd kisebb korrekcíó (fül). Fül törése = vétel. Hosszú távú minta.',
    category: 'Chart Minták'
  },
  {
    id: '42',
    term: 'Meglepő Kitörések',
    definition: 'Breakout volumennel megerősítve. False breakout: visszatér a mintába. Várakozás a megerősítésre fontos.',
    category: 'Kitörések'
  },
  {
    id: '43',
    term: 'Kitörés Kereskedés',
    definition: 'Belépés: törés után. Stop: minta másik oldala. Cél: minta magassága. Volume és momentum fontos.',
    category: 'Kereskedési Stratégiák'
  },
  {
    id: '44',
    term: 'Pullback Kereskedés',
    definition: 'Kitörés után visszatesztelés várása. Biztonságosabb belépés. Korábbi ellenállás most támasz.',
    category: 'Kereskedési Stratégiák'
  },
  {
    id: '45',
    term: 'Trend Following',
    definition: 'A trend barátod. Vásárlás emelkedő trendben korrekciókban. Eladás eső trendben rally-ken. Egyszerű, de nehéz fegyelem.',
    category: 'Kereskedési Stratégiák'
  },
  {
    id: '46',
    term: 'Mean Reversion',
    definition: 'Túlzott kilengések visszatérnek az átlaghoz. Vásárlás túladottságnál, eladás túlvettségnél. Range piacoknál hatékony.',
    category: 'Kereskedési Stratégiák'
  },
  {
    id: '47',
    term: 'Scalping',
    definition: 'Nagyon rövid távú kereskedés (percek). Sok kis profit. Nagy tőkeáttét, szoros stopok. Stresszes, időigényes.',
    category: 'Kereskedési Stílusok'
  },
  {
    id: '48',
    term: 'Day Trading',
    definition: 'Napon belüli kereskedés, nincs overnight pozíció. Technikai elemzés dominál. Teljes idejű figyelem szükséges.',
    category: 'Kereskedési Stílusok'
  },
  {
    id: '49',
    term: 'Swing Trading',
    definition: 'Néhány naptól hetekig tartó pozíciók. Trend és momentum alapú. Mellékállásban is végezhető.',
    category: 'Kereskedési Stílusok'
  },
  {
    id: '50',
    term: 'Position Trading',
    definition: 'Hónapoktól évekig. Technikai és fundamentális elemzés kombinációja. Türelem szükséges.',
    category: 'Kereskedési Stílusok'
  },
  {
    id: '51',
    term: 'Risk-Reward Ratio',
    definition: 'Potenciális nyereség és veszteség aránya. Minimum 1:2, ideális 1:3. Jó kereskedők kis veszteséggel és nagy nyereségekkel dolgoznak.',
    category: 'Kockázatkezelés'
  },
  {
    id: '52',
    term: 'Stop Loss',
    definition: 'Automatikus exit árszint veszteségek korlátozására. Támasz/ellenállás alatt/felett, vagy fix %-on. MINDIG használd!',
    category: 'Kockázatkezelés'
  },
  {
    id: '53',
    term: 'Take Profit',
    definition: 'Profit realizálás célára. Fibonacci szinteken, ellenállásoknál, vagy trailing stop-pal. Kapzsiság kezelése.',
    category: 'Kockázatkezelés'
  },
  {
    id: '54',
    term: 'Pozíció Méret',
    definition: 'Ne kockáztass 1-2%-nál többet kereskedésenként. Képlet: kockázat = (belépés - stop) × pozícióméret.',
    category: 'Kockázatkezelés'
  },
  {
    id: '55',
    term: 'Trailing Stop',
    definition: 'Dinamikus stop, ami követi az árat profit esetén. Védi a nyereséget, miközben fut hagyja a pozíciót.',
    category: 'Kockázatkezelés'
  },
  {
    id: '56',
    term: 'Ichimoku Cloud',
    definition: 'Komplex japán rendszer. 5 vonal: Tenkan, Kijun, Senkou A/B (felhő), Chikou. Támasz/ellenállás, trend, momentum egyben.',
    category: 'Fejlett Indikátorok'
  },
  {
    id: '57',
    term: 'Pivot Points',
    definition: 'Napi támasz és ellenállás szintek számítása. PP = (High + Low + Close) / 3. R1, R2, S1, S2 számítások. Intraday kereskedéshez.',
    category: 'Fejlett Indikátorok'
  },
  {
    id: '58',
    term: 'Average True Range (ATR)',
    definition: 'Volatilitás mérő. Nem irányt mutat, csak mozgás nagyságát. Stop loss elhelyezéshez használják (2-3x ATR).',
    category: 'Fejlett Indikátorok'
  },
  {
    id: '59',
    term: 'Parabolic SAR',
    definition: 'Stop And Reverse rendszer. Pontok az ár alatt (bullish) vagy felett (bearish). Trend követő, gyakori jelek.',
    category: 'Fejlett Indikátorok'
  },
  {
    id: '60',
    term: 'ADX (Average Directional Index)',
    definition: 'Trend erősségét méri 0-100 skálán. 25 felett erős trend, 20 alatt gyenge. NEM mutatja az irányt!',
    category: 'Fejlett Indikátorok'
  },
  {
    id: '61',
    term: 'Elliott Wave Theory',
    definition: 'Ralph Elliott elmélete. Piac 5 impulzus hullám (1-5) és 3 korrekciós hullám (A-C) mintában mozog. Komplex, szubjektív.',
    category: 'Elméletek'
  },
  {
    id: '62',
    term: 'Gann Theory',
    definition: 'W.D. Gann geometrikus és időalapú elemzése. Gann szögek, négyzetek, időciklusok. Misztikus elemek, vitatott hatékonyság.',
    category: 'Elméletek'
  },
  {
    id: '63',
    term: 'Market Profile',
    definition: 'Volume alapú elemzés különböző árszinteken. Value Area, POC (Point of Control). Intézményi kereskedők eszköze.',
    category: 'Volumen Elemzés'
  },
  {
    id: '64',
    term: 'Volume Weighted Average Price',
    definition: 'VWAP: átlagár volumennel súlyozva. Intézményi benchmark. Ár VWAP felett = erős, alatt = gyenge.',
    category: 'Volumen Elemzés'
  },
  {
    id: '65',
    term: 'Accumulation/Distribution',
    definition: 'Marc Chaikin indikatora. Nagy pénz áramlik be (akk) vagy ki (dist). Divergencia árral fontos jel.',
    category: 'Volumen Elemzés'
  },
  {
    id: '66',
    term: 'Multi-Timeframe Analysis',
    definition: 'Több időkeret együttes elemzése. Hosszabb: trend, közepes: szerkezet, rövidebb: belépés. Konzisztencia keresése.',
    category: 'Fejlett Technikák'
  },
  {
    id: '67',
    term: 'Correlation Analysis',
    definition: 'Különböző eszközök mozgásának összehasonlítása. Pl. részvény és szektor. Divergencia figyelmeztetés lehet.',
    category: 'Fejlett Technikák'
  },
  {
    id: '68',
    term: 'Intermarket Analysis',
    definition: 'Különböző piacok kapcsolatai. Részvény-kötvény, arany-dollár, olaj-devizák. Holisztikus szemlélet.',
    category: 'Fejlett Technikák'
  },
  {
    id: '69',
    term: 'Seasonal Patterns',
    definition: '"Sell in May and go away", Santa Rally, January Effect. Statisztikai minták. Nem garantáltak, de figyelmet érdemelnek.',
    category: 'Időbeli Minták'
  },
  {
    id: '70',
    term: 'Cycle Analysis',
    definition: 'Piaci ciklusok azonosítása. Kitchin (40 hó), Juglar (7-11 év), Kondratieff (50 év). Hosszú távú perspektíva.',
    category: 'Időbeli Minták'
  },
  {
    id: '71',
    term: 'Backtesting',
    definition: 'Stratégia tesztelése múltbeli adatokon. Fontos: overfitting elkerülése, out-of-sample tesztelés. Múltbeli siker nem garancia!',
    category: 'Stratégia Tesztelés'
  },
  {
    id: '72',
    term: 'Forward Testing',
    definition: 'Stratégia tesztelése papírkereskedéssel (demo számlán). Valós piaci feltételek érzelmi hatás nélkül.',
    category: 'Stratégia Tesztelés'
  },
  {
    id: '73',
    term: 'Win Rate vs Payoff Ratio',
    definition: 'Nyerési arány és átlagnyereség/veszteség aránya. 40% win rate is profitábilis lehet jó payoff mellett (>2:1).',
    category: 'Statisztikák'
  },
  {
    id: '74',
    term: 'Expectancy',
    definition: 'Kereskedésenként várható profit. Képlet: (Win% × Avg Win) - (Loss% × Avg Loss). Pozitív = nyerő rendszer.',
    category: 'Statisztikák'
  },
  {
    id: '75',
    term: 'Maximum Drawdown',
    definition: 'Legnagyobb tőkeveszteség csúcsról völgyig. Pszichológiailag nehéz időszak. Kockázatkezelés kulcs a túléléshez.',
    category: 'Statisztikák'
  },
  {
    id: '76',
    term: 'False Signals',
    definition: 'Téves jelek elkerülhetetlenek. Kockázatkezelés és megerősítés várakozás csökkenti hatásukat. Fegyelem fontos.',
    category: 'Hibák'
  },
  {
    id: '77',
    term: 'Túlkereskedés',
    definition: 'Túl gyakori kereskedés erózió költségekkel és rossz döntésekkel. Minőség mennyiség felett. Türelem erény.',
    category: 'Hibák'
  },
  {
    id: '78',
    term: 'Bosszúkereskedés',
    definition: 'Veszteség után érzelmi kereskedés a pénz visszanyeréséért. Katasztrofális lehet. Szünet veszteség után!',
    category: 'Hibák'
  },
  {
    id: '79',
    term: 'FOMO Trading',
    definition: 'Fear Of Missing Out - félelem lemaradásról. Késői belépés csúcsok közelében. Fegyelem és terv betartása.',
    category: 'Hibák'
  },
  {
    id: '80',
    term: 'Analysis Paralysis',
    definition: 'Túl sok indikátor, túl sok elemzés = döntésképtelenség. Egyszerűség hatalma. Kevesebb több lehet.',
    category: 'Hibák'
  },
  {
    id: '81',
    term: 'Trading Journal',
    definition: 'Minden kereskedés dokumentálása: belépés, kilépés, ok, érzések. Tanulás hibákból. Fejlődés nyomon követése.',
    category: 'Pszichológia'
  },
  {
    id: '82',
    term: 'Trading Plan',
    definition: 'Írott terv: stratégia, kockázatkezelés, célok. Érzelemmentes döntéshozatal. "Plan your trade, trade your plan."',
    category: 'Pszichológia'
  },
  {
    id: '83',
    term: 'Discipline',
    definition: 'Legfontosabb tulajdonság. Szabályok követése veszteségek és nyereségek idején. Konzisztencia hosszú távon.',
    category: 'Pszichológia'
  },
  {
    id: '84',
    term: 'Patience',
    definition: 'Várakozás a megfelelő szettupokra. Nem minden nap van jó kereskedés. Unalom kezelése nehéz, de szükséges.',
    category: 'Pszichológia'
  },
  {
    id: '85',
    term: 'Confidence vs Arrogance',
    definition: 'Bizalom jó, arrogancia veszélyes. Piac mindig taníthat. Alázat és folyamatos tanulás.',
    category: 'Pszichológia'
  },
  {
    id: '86',
    term: 'Algorithmic Trading',
    definition: 'Számítógépes rendszerek technikai jelek alapján. Gyors, érzelemmentes. Fejlesztés és felügyelet kell.',
    category: 'Modern Technikák'
  },
  {
    id: '87',
    term: 'Machine Learning',
    definition: 'AI mintafelismerés chartokban. Neurális hálók, random forest. Vigyázat: overfitting, fekete doboz.',
    category: 'Modern Technikák'
  },
  {
    id: '88',
    term: 'High Frequency Trading',
    definition: 'Milliszekundum szintű kereskedés. Intézményi terep. Retail kereskedőknek nem elérhető/nem ajánlott.',
    category: 'Modern Technikák'
  },
  {
    id: '89',
    term: 'Crypto Chart Analysis',
    definition: 'Technikai elemzés működik crypto-n is. Magasabb volatilitás, 24/7 piac. Több false signal.',
    category: 'Speciális Piacok'
  },
  {
    id: '90',
    term: 'Forex Chart Patterns',
    definition: 'Deviza pároknál hasonló minták. Carry trade, central bank events figyelése. 24 órás piac.',
    category: 'Speciális Piacok'
  },
  {
    id: '91',
    term: 'Commodity Charts',
    definition: 'Nyersanyagok: szezonalitás fontos, supply-demand. Contango és backwardation futures-nél.',
    category: 'Speciális Piacok'
  },
  {
    id: '92',
    term: 'News Impact',
    definition: 'Fundamentális hírek átrajzolhatják a technikai képet. Earning előtt óvatosság. Volatilitás spike-ok.',
    category: 'Fundamental vs Technical'
  },
  {
    id: '93',
    term: 'Technikai + Fundamental',
    definition: 'Kombinált megközelítés. Fundamental: mit vásároljunk, Technikai: mikor vásároljunk. Legjobb mindkét világból.',
    category: 'Fundamental vs Technical'
  },
  {
    id: '94',
    term: 'Scanner és Screener',
    definition: 'Eszközök lehetőségek szűrésére. Technikai kritériumok (RSI < 30, fölötte MA). Időmegtakarítás.',
    category: 'Eszközök'
  },
  {
    id: '95',
    term: 'Charting Software',
    definition: 'TradingView, MetaTrader, Thinkorswim. Indikátorok, rajzolóeszközök, alertek. Válassz felhasználóbarátot.',
    category: 'Eszközök'
  },
  {
    id: '96',
    term: 'Alert System',
    definition: 'Automatikus értesítések technikai szinteken. Ár, indikátor crossover. Nem kell folyamatosan nézni chartokat.',
    category: 'Eszközök'
  },
  {
    id: '97',
    term: 'Practice Makes Perfect',
    definition: 'Demo számla gyakorlásra. 100+ kereskedés előtt live pénz. Képzés befektetés, nem költség.',
    category: 'Tanulás'
  },
  {
    id: '98',
    term: 'Folyamatos Tanulás',
    definition: 'Piac változik, technológia fejlődik. Könyvek, kurzusok, mentorálás. Soha nem vagy "kész".',
    category: 'Tanulás'
  },
  {
    id: '99',
    term: 'Community Learning',
    definition: 'Trading közösségek, fórumok. Tapasztalatcsere. Vigyázat: ne vakon kövess másokat.',
    category: 'Tanulás'
  },
  {
    id: '100',
    term: 'Összefoglalás: Siker Technikai Elemzésben',
    definition: 'Egyszerű stratégia, kockázatkezelés, fegyelem, türelem, folyamatos tanulás, érzelmi kontroll. Technikai elemzés eszköz, nem kristálygömb. Használd bölcsen!',
    category: 'Összefoglalás'
  }
];
