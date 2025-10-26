import { BookViewTerm } from '../components/StandaloneBookView';

export const makrogazdasagData: BookViewTerm[] = [
  {
    id: '1',
    term: 'Mi a Makrogazdaságtan?',
    definition: 'Gazdaság nagy képe: GDP, infláció, munkanélküliség, kamat. Hatással van minden részvényre! Nem ignorálhatod.',
    category: 'Alapok'
  },
  {
    id: '2',
    term: 'GDP - Gross Domestic Product',
    definition: 'Ország összes termelése. Növekedés = jó gazdaság = bull market általában. Csökkenés = recesszió = bear market.',
    category: 'GDP'
  },
  {
    id: '3',
    term: 'GDP Növekedési Ráta',
    definition: 'QoQ (negyedév/negyedév) vagy YoY (év/év). US tipikusan 2-3% YoY. >4% = erős, <0% = recesszió.',
    category: 'GDP'
  },
  {
    id: '4',
    term: 'GDP és Részvénypiacok',
    definition: 'Erős GDP → corporate earnings nő → részvények felfelé. De! Túl erős GDP → Fed emel kamatot → részvények eshetnek!',
    category: 'GDP'
  },
  {
    id: '5',
    term: 'Infláció - Árszint Emelkedés',
    definition: 'Pénz vásárlóerő csökken. CPI (Consumer Price Index) méri. 2% = Fed target. >5% = probléma!',
    category: 'Infláció'
  },
  {
    id: '6',
    term: 'CPI - Consumer Price Index',
    definition: 'Fogyasztói árindex. Havonta publikált. Élelmiszer, energia, lakhatás, stb. High CPI → Fed hawk → részvények ehetnek.',
    category: 'Infláció'
  },
  {
    id: '7',
    term: 'Core CPI',
    definition: 'CPI minus élelmiszer és energia (volatilisak). Fed inkább ezt nézi. Stabilitás jobb inflációs trend látáshoz.',
    category: 'Infláció'
  },
  {
    id: '8',
    term: 'PPI - Producer Price Index',
    definition: 'Termelői árak. CPI előfutára! PPI emelkedik → később CPI is. Figyelj rá!',
    category: 'Infláció'
  },
  {
    id: '9',
    term: 'Stagfláció',
    definition: 'Magas infláció + alacsony növekedés. Worst case! 1970s. Részvények és kötvények is szenvednek. Gold shine-ol.',
    category: 'Infláció'
  },
  {
    id: '10',
    term: 'Defláció',
    definition: 'Árak csökkennek. Úgy hangzik jól? NEM! Fogyasztók halasztják vásárlásokat → kereslet csökken → recesszió. Japan 1990s.',
    category: 'Infláció'
  },
  {
    id: '11',
    term: 'Kamatláb - Gazdaság Gázpedálja',
    definition: 'Federal Reserve (Fed) állítja. Magas kamat = lassítja gazdaságot. Alacsony kamat = stimulálja. Legnagyobb driver!',
    category: 'Kamatok'
  },
  {
    id: '12',
    term: 'Federal Funds Rate',
    definition: 'Bankok közötti overnight lending rate. Fed állítja. 0-5% tartományban általában. Minden más kamat ezen alapszik.',
    category: 'Kamatok'
  },
  {
    id: '13',
    term: 'FOMC - Federal Open Market Committee',
    definition: 'Fed kamatdöntő szerve. Évente 8 meeting. Minden meeting: piaci volatilitás! Powell beszédek mozgatják piacot.',
    category: 'Kamatok'
  },
  {
    id: '14',
    term: 'Kamat Emelés Hatása',
    definition: 'Hitel drágább → vállalatok kevesebb bővítés → earnings csökken → részvények esnek. Bond yields emelkednek.',
    category: 'Kamatok'
  },
  {
    id: '15',
    term: 'Kamat Csökkentés Hatása',
    definition: 'Hitel olcsó → vállalatok bővítenek → earnings nő → részvények emelkednek. "Fed put" = piac vár rate cuts válság esetén.',
    category: 'Kamatok'
  },
  {
    id: '16',
    term: 'Yield Curve',
    definition: 'Különböző lejáratú kötvények yieldjeinek görbéje. Normál: hosszabb lejárat = magasabb yield. Invertált = recessziós figyelmeztetés!',
    category: 'Kamatok'
  },
  {
    id: '17',
    term: 'Invertált Yield Curve',
    definition: '2-year yield > 10-year yield. Történelmileg recessziót előzött meg (~12-18 hó). 2022-2023: invertált!',
    category: 'Kamatok'
  },
  {
    id: '18',
    term: 'Munkanélküliség',
    definition: 'Unemployment Rate. Low = erős gazdaság, de túl alacsony → wage inflation → Fed emel. Goldilocks: ~4%.',
    category: 'Munkaerőpiac'
  },
  {
    id: '19',
    term: 'NFP - Non-Farm Payrolls',
    definition: 'Havi munkahelyteremtés (US). Első péntek havonta. Nagy piaci mozgás! >250k = erős, <100k = gyenge.',
    category: 'Munkaerőpiac'
  },
  {
    id: '20',
    term: 'JOLTS - Job Openings',
    definition: 'Betöltetlen állások száma. Magas JOLTS = munkaerőhiány = wage pressure = infláció. Fed figyeli!',
    category: 'Munkaerőpiac'
  },
  {
    id: '21',
    term: 'Wage Growth',
    definition: 'Átlagfizetések növekedése. Túl gyors növekedés → infláció spirál. Fed ideális: ~3% YoY.',
    category: 'Munkaerőpiac'
  },
  {
    id: '22',
    term: 'Quantitative Easing (QE)',
    definition: 'Fed vásárol kötvényeket → pénz pump gazdaságba. 2008, 2020. Asset prices emelkednek (részvények, ingatlanboom).',
    category: 'Monetáris Politika'
  },
  {
    id: '23',
    term: 'Quantitative Tightening (QT)',
    definition: 'Fed csökkenti mérleget, pénz kivonás. QE fordítottja. Bear market katalizátor lehet. 2022: QT kezdés.',
    category: 'Monetáris Politika'
  },
  {
    id: '24',
    term: 'Hawkish vs Dovish Fed',
    definition: 'Hawkish = infláció ellen, kamat emelésre hajló. Dovish = növekedés támogatás, kamat csökkentésre hajló. Powell nyelve fontos!',
    category: 'Monetáris Politika'
  },
  {
    id: '25',
    term: 'Fed Dot Plot',
    definition: 'FOMC tagok várakozása jövőbeli kamatokról. Dots = pontok grafikon. Hawk vagy dove trendek láthatóak.',
    category: 'Monetáris Politika'
  },
  {
    id: '26',
    term: 'Fiskális Politika',
    definition: 'Kormány költekezése és adózása. Stimulus csomagok, deficit spending. Különböző Fed-től (monetáris).',
    category: 'Fiskális Politika'
  },
  {
    id: '27',
    term: 'Government Deficit',
    definition: 'Költekezés > bevétel. US deficit trillions. Magas deficit → jövőbeli adók vagy infláció. Long-term kockázat.',
    category: 'Fiskális Politika'
  },
  {
    id: '28',
    term: 'Debt Ceiling',
    definition: 'US kormány hitelfelvételi limit. Rendszeresen politikai csata. Ha nem emelik → default risk → piac pánik.',
    category: 'Fiskális Politika'
  },
  {
    id: '29',
    term: 'Stimulus Csomagok',
    definition: '2020 COVID: $trillions. Pénz gazdaságba → asset inflation. Részvények, crypto, housing boom.',
    category: 'Fiskális Politika'
  },
  {
    id: '30',
    term: 'Business Cycles',
    definition: 'Expansion → Peak → Contraction → Trough → Expansion. Ciklikus. Átlag ciklus 5-10 év. Ismerd a fázist!',
    category: 'Gazdasági Ciklusok'
  },
  {
    id: '31',
    term: 'Expansion Fázis',
    definition: 'GDP növekedés, alacsony munkanélküliség, rising corporate profits. Bull market. Legtöbb idő itt!',
    category: 'Gazdasági Ciklusok'
  },
  {
    id: '32',
    term: 'Peak',
    definition: 'Gazdaság csúcson. Növekedés lassul, infláció emelkedik, Fed emel kamatot. Topping patterns részvényekben.',
    category: 'Gazdasági Ciklusok'
  },
  {
    id: '33',
    term: 'Contraction / Recesszió',
    definition: '2+ negyedév negatív GDP. Munkanélküliség emelkedik, earnings csökken. Bear market. Vedd! bonds, gold.',
    category: 'Gazdasági Ciklusok'
  },
  {
    id: '34',
    term: 'Trough - Mélypon',
    definition: 'Gazdaság alja. Pesszimizmus max. De! Best time to buy stocks. "Be greedy when others fearful" - Buffett.',
    category: 'Gazdasági Ciklusok'
  },
  {
    id: '35',
    term: 'Leading Indicators',
    definition: 'Előrejelzik gazdaságot: stock market, building permits, consumer expectations, yield curve. Watch these!',
    category: 'Indikátorok'
  },
  {
    id: '36',
    term: 'Lagging Indicators',
    definition: 'Követik gazdaságot: unemployment, corporate profits, interest rates. Megerősítik trendet, de nem előrejelzik.',
    category: 'Indikátorok'
  },
  {
    id: '37',
    term: 'Coincident Indicators',
    definition: 'Real-time gazdaság: GDP, industrial production, personal income. Current státusz.',
    category: 'Indikátorok'
  },
  {
    id: '38',
    term: 'Consumer Confidence Index',
    definition: 'Fogyasztók optimizmusa. Magas = költenek → GDP növekedés. Alacsony = spórolnak → GDP lassul.',
    category: 'Sentiment Indikátorok'
  },
  {
    id: '39',
    term: 'PMI - Purchasing Managers Index',
    definition: 'Manufacturing aktivitás. >50 = expansion, <50 = contraction. ISM és Markit verziók. Leading indicator!',
    category: 'Indikátorok'
  },
  {
    id: '40',
    term: 'Retail Sales',
    definition: 'Fogyasztói költekezés. US GDP 70%-a consumer! Erős retail sales = gazdaság egészséges.',
    category: 'Indikátorok'
  },
  {
    id: '41',
    term: 'Housing Market Indikátorok',
    definition: 'Housing starts, building permits, existing home sales. Housing = economic engine. Gyenge housing → recessziós signal.',
    category: 'Indikátorok'
  },
  {
    id: '42',
    term: 'Trade Balance',
    definition: 'Export - Import. Deficit (US): több import. Hatás USD-re és multinacionális vállalatokra.',
    category: 'Nemzetközi'
  },
  {
    id: '43',
    term: 'Currency Fluctuations',
    definition: 'Erős USD = US exportok csökkennek, multinationals earnings csökken. Gyenge USD = ellenkező.',
    category: 'Nemzetközi'
  },
  {
    id: '44',
    term: 'Emerging Markets',
    definition: 'Gyorsan növekvő gazdaságok: China, India, Brazil. Magasabb growth, de magasabb risk. Commodity dependence.',
    category: 'Nemzetközi'
  },
  {
    id: '45',
    term: 'Globalizáció',
    definition: 'Gazdaságok összekapcsoltak. China probléma → US probléma. Supply chains globally. Diverzifikáció fontosabb!',
    category: 'Nemzetközi'
  },
  {
    id: '46',
    term: 'Commodity Prices',
    definition: 'Oil, gold, copper = gazdasági health barometer. High oil = infláció pressure. Copper = "Dr. Copper" gazdasági előrejelző.',
    category: 'Commodities'
  },
  {
    id: '47',
    term: 'Oil és Gazdaság',
    definition: 'Olajár emelkedés = transportation és production costs nő → infláció. Túl magas oil = gazdaság brake.',
    category: 'Commodities'
  },
  {
    id: '48',
    term: 'Gold mint Safe Haven',
    definition: 'Válság, infláció → gold emelkedik. Negatív real rates (infláció > kamat) = bullish gold.',
    category: 'Commodities'
  },
  {
    id: '49',
    term: 'Recessziós Jelzések',
    definition: 'Invertált yield curve, declining PMI, rising unemployment, negative earnings revisions, VIX spike. Combo = watch out!',
    category: 'Recesszió'
  },
  {
    id: '50',
    term: 'Hogyan Trade-elj Recesszióban?',
    definition: 'Defensive stocks (utilities, healthcare), bonds, gold. Short vagy cash. Nem growth stocks! Survive first.',
    category: 'Recesszió'
  },
  {
    id: '51',
    term: 'Post-Recesszió Recovery',
    definition: 'Fed vág kamatokat, fiscal stimulus. Mélypontról részvények emelkednek gyorsan! Don\'t miss recovery.',
    category: 'Recesszió'
  },
  {
    id: '52',
    term: 'Infláció Hedging',
    definition: 'TIPS (inflation-protected bonds), commodities, real estate, certain stocks (energy, materials). Portfolio diverzifikáció.',
    category: 'Stratégiák'
  },
  {
    id: '53',
    term: 'Sector Rotation',
    definition: 'Early cycle: financials, industrials. Mid: tech, consumer. Late: energy, materials. Recession: utilities, healthcare. Rotate!',
    category: 'Stratégiák'
  },
  {
    id: '54',
    term: 'Makro és Stock Picking',
    definition: 'Bull market: growth works. Bear market: value, dividends. High rates: avoid debt-heavy companies. Macro context!',
    category: 'Stratégiák'
  },
  {
    id: '55',
    term: 'Economic Calendar',
    definition: 'Nyomd naptárdba: NFP (1. péntek), CPI (mid-month), FOMC (8x/év), GDP releases. Trade around these!',
    category: 'Eszközök'
  },
  {
    id: '56',
    term: 'Makro Források',
    definition: 'Fed website, BLS (Labor stats), BEA (GDP), tradingeconomics.com, FRED database. Ingyen, official data.',
    category: 'Eszközök'
  },
  {
    id: '57',
    term: 'Összefoglalás: Makro és Piac',
    definition: 'Makro drives piacot! GDP, infláció, kamat, munkanélküliség = big picture. Fed a legerősebb játékos. Yield curve, PMI = leading indicators. Business cycle-t ismerdemd. Defensive vs growth stratégiák cycle szerint. Nem ignorálhatod makrot, még ha stock picker vagy is!',
    category: 'Összefoglalás'
  }
];
