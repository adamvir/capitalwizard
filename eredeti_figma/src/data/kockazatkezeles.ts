import { BookViewTerm } from '../components/StandaloneBookView';

export const kockazatkezelesData: BookViewTerm[] = [
  {
    id: '1',
    term: 'Mi a Kockázatkezelés?',
    definition: 'A befektetési veszteségek mértékének korlátozása és kontrollálása. Nem a profit maximalizálás, hanem a túlélés a cél! "Manage risk, not returns."',
    category: 'Alapok'
  },
  {
    id: '2',
    term: 'A Legfontosabb Szabály',
    definition: 'Ne veszíts pénzt! Warren Buffett: "Rule #1: Don\'t lose money. Rule #2: Don\'t forget rule #1." Ezt mindenki idézi, de kevesen követik.',
    category: 'Alapok'
  },
  {
    id: '3',
    term: 'Miért Buknak el a Kereskedők?',
    definition: '90% oka: rossz kockázatkezelés! Nem azért, mert nem tudnak jó belépést találni. Hanem mert egyetlen trade-del túl sokat kockáztatnak.',
    category: 'Alapok'
  },
  {
    id: '4',
    term: '2% Szabály',
    definition: 'Egy trade-en max 2% számlád! $10,000 → max $200 loss. Így 50 rossz trade-et tudsz túlélni. Fegyelem!',
    category: 'Pozícióméret'
  },
  {
    id: '5',
    term: 'Pozícióméret Számítás',
    definition: 'Position size = (Account × Risk%) / (Entry - Stop Loss). Példa: ($10k × 2%) / ($50 - $48) = $200 / $2 = 100 shares.',
    category: 'Pozícióméret'
  },
  {
    id: '6',
    term: 'Túl Nagy Pozíció Veszélyei',
    definition: 'Érzelmi döntések, korai exit félelemből, margin call pánik. Egy 20% veszteség → 25% profit kell visszajutni! Egy 50% veszteség → 100% kell!',
    category: 'Pozícióméret'
  },
  {
    id: '7',
    term: 'Kelly Criterion',
    definition: 'Matematikai optimum pozíciómérethez. f = (bp - q) / b. b=odds, p=win rate, q=loss rate. Túl agresszív a gyakorlatban, használd fele Kelly-t!',
    category: 'Pozícióméret'
  },
  {
    id: '8',
    term: 'Stop Loss - Életed Megmentője',
    definition: 'Előre meghatározott kiszállási pont veszteség korlátozására. MINDIG legyen! "Hope is not a strategy."',
    category: 'Stop Loss'
  },
  {
    id: '9',
    term: 'Hol Helyezzük a Stop Loss-t?',
    definition: 'Technikai szintek: support alatt, swing low alatt, ATR alapú távolság. Ne pszichológiai számok ($50)! A piac nem törődik számlád méretével.',
    category: 'Stop Loss'
  },
  {
    id: '10',
    term: 'ATR-alapú Stop Loss',
    definition: 'Average True Range = volatilitás mérő. Stop = Entry - (2 × ATR). Adaptálódik a piac volatilitásához. Volatilis részvény → szélesebb stop.',
    category: 'Stop Loss'
  },
  {
    id: '11',
    term: 'Trailing Stop Loss',
    definition: 'Mozgó stop profit védésére. Részvény emelkedik → stop is emelkedik, de soha nem csökken. Profitot lock-ol, felfelé fut.',
    category: 'Stop Loss'
  },
  {
    id: '12',
    term: 'Mental Stop vs Hard Stop',
    definition: 'Mental: fejben van, te exit-elsz. Hard: broker automatikusan. MINDIG hard stop-ot használj! Mental stop-ot mindenki mozgatja "csak még egy picit".',
    category: 'Stop Loss'
  },
  {
    id: '13',
    term: 'Stop Loss Pszichológia',
    definition: 'Fáj elengedni veszteséges pozíciót. "Majd visszajön." De nem garantált! Stop hit = fegyelem, nem kudarc. Részed a játéknak.',
    category: 'Stop Loss'
  },
  {
    id: '14',
    term: 'Risk-Reward Ratio',
    definition: 'Potenciális profit / Potenciális veszteség. Minimum 1:2! Kockáztatsz $100 → target $200 profit. Rossz R:R → hosszú távon vesztesz.',
    category: 'Risk-Reward'
  },
  {
    id: '15',
    term: 'Miért Fontos az R:R?',
    definition: 'Nem kell 50% win rate sem! 40% win rate, 1:3 R:R: 40% × 3 - 60% × 1 = 0.6 = profit! Matematika játszma.',
    category: 'Risk-Reward'
  },
  {
    id: '16',
    term: 'R:R Számítás Példa',
    definition: 'Entry $50, Stop $48, Target $56. Risk = $2, Reward = $6. R:R = 1:3. Jó trade setup! Ha 1:1 vagy rosszabb → skip!',
    category: 'Risk-Reward'
  },
  {
    id: '17',
    term: 'Diverzifikáció',
    definition: 'Ne tedd minden tojást egy kosárba! Több részvény, szektor, eszközosztály. Csökkenti portfólió volatilitást.',
    category: 'Diverzifikáció'
  },
  {
    id: '18',
    term: 'Túl Sok Diverzifikáció',
    definition: '50+ részvény = nem tudsz követni mindent. "Diworsification" - Peter Lynch. Koncentráció + fegyelem vs túldiverzifikáció.',
    category: 'Diverzifikáció'
  },
  {
    id: '19',
    term: 'Optimális Diverzifikáció',
    definition: '10-20 részvény különböző szektorokban. Ismerd mindegyiket! Követhető méret, csökkent korreláció.',
    category: 'Diverzifikáció'
  },
  {
    id: '20',
    term: 'Korreláció és Diverzifikáció',
    definition: 'Tech részvények korrelálnak egymással! Tesla + NVDA + AMD = egy szektor. Diverzifikálj: tech + healthcare + consumer + energy.',
    category: 'Diverzifikáció'
  },
  {
    id: '21',
    term: 'Maximum Drawdown',
    definition: 'Legnagyobb csúcsról mélypontra esés. Peak to trough. Számládon: $10k → $7k = 30% drawdown. Fájdalmas!',
    category: 'Teljesítmény Mérők'
  },
  {
    id: '22',
    term: 'Drawdown Túlélés',
    definition: '30% drawdown → 43% profit kell visszajutni. 50% drawdown → 100% kell! Ezért fontos a kis veszteségek: könnyebb visszajönni.',
    category: 'Teljesítmény Mérők'
  },
  {
    id: '23',
    term: 'Sharpe Ratio',
    definition: 'Hozam / Volatilitás. Kockázat-korrigált teljesítmény. 1+ jó, 2+ nagyon jó, 3+ kiváló. Magasabb = jobb risk-adjusted return.',
    category: 'Teljesítmény Mérők'
  },
  {
    id: '24',
    term: 'Win Rate vs Profit Factor',
    definition: 'Win rate = % nyerő trade-ek. Profit factor = összes nyereség / összes veszteség. 50% win rate + profit factor 2 = jó rendszer!',
    category: 'Teljesítmény Mérők'
  },
  {
    id: '25',
    term: 'Expectancy',
    definition: 'Átlagos profit trade-enként. (Win% × Avg Win) - (Loss% × Avg Loss). Pozitív expectancy = hosszú távon profitálsz.',
    category: 'Teljesítmény Mérők'
  },
  {
    id: '26',
    term: 'Leverage - Kétélű Kard',
    definition: 'Tőkeáttét. 2x leverage: 10% mozgás = 20% számládon. Nagy nyereség vagy gyors csőd. Kezdőknek: KERÜLD!',
    category: 'Tőkeáttét'
  },
  {
    id: '27',
    term: 'Margin Call Horror',
    definition: 'Számla érték < margin requirement → broker likvidál. Nem kérdezel! A legrosszabb áron. Margin = veszélyes játék.',
    category: 'Tőkeáttét'
  },
  {
    id: '28',
    term: 'Sustainable Leverage',
    definition: 'Ha használsz leverage-t, max 2x long-term portfolióban. Day trading max 3-4x konzervatívan. 10x+ leverage = szerencsejáték.',
    category: 'Tőkeáttét'
  },
  {
    id: '29',
    term: 'Portfólió Heat',
    definition: 'Összes open pozíciók kockázata együtt. Max 6% egyszerre! Ha 3 trade-ed van, mindegyik 2% risk → 6% heat. Ne nyiss többet!',
    category: 'Portfólió Kockázat'
  },
  {
    id: '30',
    term: 'Correlation Risk',
    definition: 'Ha minden pozíciód tech: mind egyszerre eshet! Diverzifikálj szektorok között. 2008, 2022: correlation → 1, minden esett.',
    category: 'Portfólió Kockázat'
  },
  {
    id: '31',
    term: 'Concentration Risk',
    definition: 'Egy pozíció > 20% portfólió = veszélyes! Ha elbukik: nagy csapás. Max 10-15% egy részvényre, még ha nagyon szereted is.',
    category: 'Portfólió Kockázat'
  },
  {
    id: '32',
    term: 'Black Swan Events',
    definition: 'Váratlan, ritka, hatalmas hatású események. COVID, 2008 crisis. Nem előre jelezhetőek! Védekezés: diverzifikáció, stop loss-ok, cash tartalék.',
    category: 'Rendkívüli Kockázatok'
  },
  {
    id: '33',
    term: 'Tail Risk Hedging',
    definition: 'Védekezés extrém események ellen. Opciók (put-ok), inverse ETF-ek, arany. Drága biztosítás, de menthet válságban.',
    category: 'Rendkívüli Kockázatok'
  },
  {
    id: '34',
    term: 'Liquidity Risk',
    definition: 'Nem tudsz eladni gyorsan, nincs vevő. Penny stocks, exotikus opciók. Krízisben illiquid eszközök → pánikeladás mélyáron.',
    category: 'Rendkívüli Kockázatok'
  },
  {
    id: '35',
    term: 'Érzelmi Kockázatkezelés',
    definition: 'A legnehezebb rész! Félelmed és mohóságod ellen küzdesz. Veszteség → bosszúkereskedés. Profit → túlbizalom. Fegyelem!',
    category: 'Pszichológia'
  },
  {
    id: '36',
    term: 'Loss Aversion',
    definition: 'Veszteség fájdalma > profit öröme (2x). Ezért tartunk veszteséges pozíciókat ("majd visszajön") de nyerőket korán eladunk. Tudatosítsd!',
    category: 'Pszichológia'
  },
  {
    id: '37',
    term: 'Revenge Trading',
    definition: 'Vesztesz → azonnal újra trade-elsz nagyobb pozícióval visszanyerni. GYILKOS! Legjobb: szünet után újra értékelni.',
    category: 'Pszichológia'
  },
  {
    id: '38',
    term: 'FOMO - Fear of Missing Out',
    definition: 'Részvény rakétázik, beugrok csúcson. Aztán korrekció. FOMO kereskedés = veszteség. Trade a tervhez, ne érzelemhez!',
    category: 'Pszichológia'
  },
  {
    id: '39',
    term: 'Overconfidence Bias',
    definition: '3 nyerő trade után halhatatlan vagy? Nem! Túlbizalom → nagyobb pozíciók → egy bukás leradírozza nyereséget. Stay humble!',
    category: 'Pszichológia'
  },
  {
    id: '40',
    term: 'Trading Journal - Szuperhatalom',
    definition: 'Minden trade: setup, belépés, kilépés, érzelmek, tanulság. Hónapok múlva látod mintákat. Mi működik, mi nem. Fegyelem erősítő!',
    category: 'Eszközök'
  },
  {
    id: '41',
    term: 'Mit Írj a Journal-ba?',
    definition: 'Dátum, ticker, pozícióméret, entry/exit ár, stop/target, R:R, eredmény ($, %), stratégia, chart screenshot, érzelmek, hibák, tanulság.',
    category: 'Eszközök'
  },
  {
    id: '42',
    term: 'Havi Review Ritual',
    definition: 'Hónap végén elemezd journal-t: win rate, profit factor, gyakori hibák, best/worst trade-ek. Tanulás és fejlődés forrása!',
    category: 'Eszközök'
  },
  {
    id: '43',
    term: 'Pre-Market Checklist',
    definition: 'Kereskedés előtt: piaci környezet (bull/bear?), gazdasági hírek, napi max loss limit, stratégia terv. Strukturált kezdés!',
    category: 'Rutinok'
  },
  {
    id: '44',
    term: 'Daily Loss Limit',
    definition: 'Napi max veszteség limit! Pl. -2% számlán → stop trading a napra. Megóv rossz napokon spirálozástól. Nincs harag, csak szünet.',
    category: 'Rutinok'
  },
  {
    id: '45',
    term: 'Weekly Loss Limit',
    definition: 'Heti max veszteség (pl. -5%) → szünet a hétre. Újra értékelés. Valószínű stratégia nem működik ebben a piaci környezetben.',
    category: 'Rutinok'
  },
  {
    id: '46',
    term: 'Recovery Protocol',
    definition: 'Nagy veszteség után: 1) Stop trading. 2) Elemzés (mi történt?). 3) Paper trading. 4) Kis pozíciókkal újra kezd. Nem rohanni!',
    category: 'Rutinok'
  },
  {
    id: '47',
    term: 'Position Sizing Ladder',
    definition: 'Winning streak: nem emeled pozíciókat azonnal! Lassan növeld. Losing streak: csökkentsd pozíciókat vagy paper trade. Dinamikus adaptáció.',
    category: 'Speciális Technikák'
  },
  {
    id: '48',
    term: 'Scaling In',
    definition: 'Nem teljes pozíció egyszerre! 1/3 initial, ha működik → másik 1/3, stb. Csökkent kockázat, de el is vesztheted részben a mozgást.',
    category: 'Speciális Technikák'
  },
  {
    id: '49',
    term: 'Scaling Out',
    definition: 'Profit-taking részletekben. 1/3 eladás első targetnél, 1/3 második targetnél, trailing stop a maradékra. Profitot lock-olsz, de hagy futni is.',
    category: 'Speciális Technikák'
  },
  {
    id: '50',
    term: 'Pyramiding',
    definition: 'Nyerő pozícióhoz adsz (kisebb) méretben. Trend folytatódik → profitálsz még többet. Veszély: reversál → add-ok mind veszteség.',
    category: 'Speciális Technikák'
  },
  {
    id: '51',
    term: 'Anti-Pyramiding HIBA!',
    definition: 'Veszteséges pozícióhoz adsz "averaging down". VESZÉLYES! Rossz setup még rosszabb lesz. Dupláznál veszteséget. Cut losses, don\'t add!',
    category: 'Speciális Technikák'
  },
  {
    id: '52',
    term: 'Hedging Strategies',
    definition: 'Pozíciók védése: long részvények + put opciók, vagy short futures. Csökkent kockázat, de költséges. Portfolio insurance.',
    category: 'Hedging'
  },
  {
    id: '53',
    term: 'Pair Trading',
    definition: 'Long erős részvény, short gyenge ugyanabban a szektorban. Piaci mozgás közömbös, csak relativ teljesítmény számít. Market neutral.',
    category: 'Hedging'
  },
  {
    id: '54',
    term: 'Options for Risk Management',
    definition: 'Protective puts (biztosítás), covered calls (income), collars (védett range). Nem csak spekuláció, hanem kockázatkezelés!',
    category: 'Hedging'
  },
  {
    id: '55',
    term: 'VIX Hedge',
    definition: 'Volatility index emelkedik krízisben. VIX call-ok vagy UVXY → hedge portfólió ellen. Drága, de fizethet pánikban.',
    category: 'Hedging'
  },
  {
    id: '56',
    term: 'Cash is a Position',
    definition: 'Nincs jó setup? Maradj cashben! Cash = 0% hozam, de 0% veszteség is. Jobb mint kényszerült rossz trade. Türelem!',
    category: 'Filozófia'
  },
  {
    id: '57',
    term: 'Process Over Outcome',
    definition: 'Jó trade veszhet, rossz trade nyerhet. Fókuszálj processre (helyes elemzés, sizing, stops), ne egy trade eredményére! Hosszú távú játék.',
    category: 'Filozófia'
  },
  {
    id: '58',
    term: 'Probabilities, Not Certainties',
    definition: 'Semmilyen trade nem 100%. 70% edge = 30%-ban vesztesz. Ez normális! Trade sokszor, ne egy trade-re épülj.',
    category: 'Filozófia'
  },
  {
    id: '59',
    term: 'Market Cycle Awareness',
    definition: 'Bull market: long bias. Bear market: careful/short. Sideways: range strategies. Ne küzd trend ellen! "Trend is your friend."',
    category: 'Piaci Adaptáció'
  },
  {
    id: '60',
    term: 'Volatility Regime Changes',
    definition: 'Low VIX: szűkebb stop-ok, kisebb mozgások. High VIX: szélesebb stop-ok, nagyobb pozíció mozgások. Adaptálj!',
    category: 'Piaci Adaptáció'
  },
  {
    id: '61',
    term: 'Risk On / Risk Off',
    definition: 'Risk-on: részvények, crypto, emerging markets felfelé. Risk-off: bonds, USD, arany felfelé. Ismerd a környezetet!',
    category: 'Piaci Adaptáció'
  },
  {
    id: '62',
    term: 'News-Driven Volatility',
    definition: 'Fed announcement, earnings, geopolitical → spike volatility. Ha nincs pozíció → ne kereskedj news-ra. Ha van → szűkebb stop vagy exit.',
    category: 'Esemény Kockázat'
  },
  {
    id: '63',
    term: 'Earnings Risk',
    definition: 'Részvény earnings előtt: extrém mozgás lehetséges. Tartod át? Risk/reward. Általában exit before earnings = biztonság.',
    category: 'Esemény Kockázat'
  },
  {
    id: '64',
    term: 'Gap Risk',
    definition: 'Overnight gap lehet stop loss-on túl. Futures, news. Hard stop-ok nem védnek gaps ellen! Pozícióméret = valódi védelem.',
    category: 'Esemény Kockázat'
  },
  {
    id: '65',
    term: 'Weekend Risk',
    definition: 'Péntek zárás → hétfő nyitás: sok történhet. Crypto, geopolitika. Tartasz pozíciót hétvégére? Risk toleranciád függvénye.',
    category: 'Esemény Kockázat'
  },
  {
    id: '66',
    term: 'Position Duration',
    definition: 'Day trade < intraday, swing trade = napok-hetek, position = hónapok. Hosszabb hold = több overnight risk. Risk/reward függ időtávtól.',
    category: 'Időtáv Kockázat'
  },
  {
    id: '67',
    term: 'Overnight Hold Decision',
    definition: 'Profitable trade nap végén: van nyereség buffer? Trend folytatódhat? R:R még jó? Yes → tartsd trailing stop-pal. Uncertain → exit.',
    category: 'Időtáv Kockázat'
  },
  {
    id: '68',
    term: 'Time Stop',
    definition: 'Pozíció X idő után nem mozdult → exit. "Setup nem játszódott ki." Ne várd örökké. Time = pénz.',
    category: 'Időtáv Kockázat'
  },
  {
    id: '69',
    term: 'Backtesting Your Risk Rules',
    definition: 'Teszteld stratégiád történelmi adaton. Win rate, drawdown, Sharpe? Működött volna? Nem garancia jövőre, de insight!',
    category: 'Fejlesztés'
  },
  {
    id: '70',
    term: 'Forward Testing / Paper Trading',
    definition: 'Új stratégia? Ne azonnal live! Paper trade hetekig. Működik real-time? Emocionálisan bírod? Akkor kis pozíciókkal élő.',
    category: 'Fejlesztés'
  },
  {
    id: '71',
    term: 'Continuous Improvement',
    definition: 'Havi journal review → azonosítsd gyenge pontokat. Lehet: korai exit, késői entry, túl nagy pozíció stressznél. Javítsd darabonként!',
    category: 'Fejlesztés'
  },
  {
    id: '72',
    term: 'Learning From Losses',
    definition: 'Minden veszteség lecke. Mi volt a hiba? FOMO? Nincs stop? Túl nagy méret? Írdd le, emlékezz, ne ismételd!',
    category: 'Fejlesztés'
  },
  {
    id: '73',
    term: 'Mentor vagy Közösség',
    definition: 'Kereskedés magányos. Mentor vagy trading csopp: accountability, tanulás, perspektívák. De vigyázz: sok scam! Check credibility.',
    category: 'Támogatás'
  },
  {
    id: '74',
    term: 'Mental Health és Trading',
    definition: 'Stresszes napok → ne kereskedj! Fáradt, beteg, érzelmileg zavart → receipt for disaster. Trading kell tiszta fej.',
    category: 'Pszichológiai Egészség'
  },
  {
    id: '75',
    term: 'Taking Breaks',
    definition: 'Több veszteség sora? Vegyél szünetet: napok vagy hét. Reset mentálisan. Ne burnt out! Trading maratoni, nem sprint.',
    category: 'Pszichológiai Egészség'
  },
  {
    id: '76',
    term: 'Work-Life Balance',
    definition: 'Trading ≠ életcél. Család, hobbik, egészség fontosak! Kiégett trader = rossz döntések. Egyensúly hosszú karrier.',
    category: 'Pszichológiai Egészség'
  },
  {
    id: '77',
    term: 'Meditation és Mindfulness',
    definition: 'Nyugodt elme = jobb döntések. 10 perc meditáció naponta csökkentheti impulzív kereskedést. Jelenben lenni, nem múlton rágódni.',
    category: 'Pszichológiai Egészség'
  },
  {
    id: '78',
    term: 'Exercise és Sleep',
    definition: 'Fizikai egészség = mentális egészség. Rendszeres edzés, 7-8 óra alvás. Fáradt trader = lassú reakció, rossz ítélet.',
    category: 'Pszichológiai Egészség'
  },
  {
    id: '79',
    term: 'Az Ego Veszélyei',
    definition: 'Piacnak nincs egyezt se vagy. Tévedhetsz! "Market can stay irrational longer than you solvent." Alázat és rugalmasság.',
    category: 'Filozófia'
  },
  {
    id: '80',
    term: 'Szerencse vs Skill',
    definition: 'Egy nyerő trade ≠ skill. Lehet szerencse! Csak 100+ trade után látod valódi edge-edet. Ne hidd azonnal sikeres vagy!',
    category: 'Filozófia'
  },
  {
    id: '81',
    term: 'Összefoglalás: Risk Management Arany Szabályok',
    definition: '1) 2% max risk/trade. 2) Mindig stop loss. 3) Min 1:2 R:R. 4) Journal vezet. 5) Daily loss limit. 6) Diverzifikáció. 7) Kis pozíció leverage-nél. 8) Érzelem kontroll. 9) Process > outcome. 10) Türelem! Ezek menthetik meg számládat és karrieredet. Trading 90% kockázatkezelés, 10% entry timing!',
    category: 'Összefoglalás'
  }
];
