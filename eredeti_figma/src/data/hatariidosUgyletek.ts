import { BookViewTerm } from '../components/StandaloneBookView';

export const hatariidosUgyletekData: BookViewTerm[] = [
  {
    id: '1',
    term: 'Mi a Határidős Ügylet?',
    definition: 'Futures - standardizált szerződés egy eszköz jövőbeli vásárlására vagy eladására előre meghatározott áron és időpontban. Tőzsdén kereskedett, napi elszámolású.',
    category: 'Alapok'
  },
  {
    id: '2',
    term: 'Futures vs Forward',
    definition: 'Futures: tőzsdei, standardizált, napi margin, clearinghouse. Forward: OTC, customizálható, lejáratkor elszámolt, partnerkockázat.',
    category: 'Alapok'
  },
  {
    id: '3',
    term: 'Futures Kontraktus Specifikációk',
    definition: 'Mögöttes eszköz, kontraktus méret, lejárat, ár notálás, tick size, szállítási feltételek. Standardizált = likviditás.',
    category: 'Alapok'
  },
  {
    id: '4',
    term: 'Long Futures Pozíció',
    definition: 'Vásárlási kötelezettség. Profitál ár emelkedésből. Unlimited upside, unlimited downside. Magas tőkeáttét!',
    category: 'Pozíciók'
  },
  {
    id: '5',
    term: 'Short Futures Pozíció',
    definition: 'Eladási kötelezettség. Profitál ár csökkenésből. Hedging vagy spekuláció. Unlimited risk upside!',
    category: 'Pozíciók'
  },
  {
    id: '6',
    term: 'Initial Margin',
    definition: 'Kezdő letét a pozíció nyitásához. Jóhiszemű biztosíték. Általában 3-12% kontraktus értékének. Tőkeáttét 8-33x!',
    category: 'Margin Rendszer'
  },
  {
    id: '7',
    term: 'Maintenance Margin',
    definition: 'Minimum margin szint. Ha alá esik → margin call. Általában 75-80% initial margin-nek.',
    category: 'Margin Rendszer'
  },
  {
    id: '8',
    term: 'Margin Call',
    definition: 'Felszólítás margin feltöltésére. Ha nem teljesül → pozíció likvidálás. Gyors piaci mozgások veszélyesek!',
    category: 'Margin Rendszer'
  },
  {
    id: '9',
    term: 'Mark-to-Market',
    definition: 'Napi elszámolás. Profit/veszteség naponta jóváírva/terhelve. Veszteség → margin csökken. Nyereség → kivehető.',
    category: 'Margin Rendszer'
  },
  {
    id: '10',
    term: 'Contango',
    definition: 'Futures ár > spot ár. Normális piac. Tárolási költség, kamat. Farther maturities magasabb árak.',
    category: 'Árstruktúra'
  },
  {
    id: '11',
    term: 'Backwardation',
    definition: 'Futures ár < spot ár. Inverted piac. Kínálat szűkösség, azonnali igény magas. Convenience yield.',
    category: 'Árstruktúra'
  },
  {
    id: '12',
    term: 'Basis',
    definition: 'Spot ár - Futures ár. Idővel szűkül (convergence). Lejáratkor = 0. Basis risk hedging-nél.',
    category: 'Árstruktúra'
  },
  {
    id: '13',
    term: 'Roll Yield',
    definition: 'Profit/veszteség futures rolling-ból. Contango: negatív roll yield (veszteség). Backwardation: pozitív (profit).',
    category: 'Árstruktúra'
  },
  {
    id: '14',
    term: 'Fizikai Szállítás',
    definition: 'Lejáratkor mögöttes eszköz átvétele/szállítása. Commodities-nél gyakori. Spekulánsok elkerülik (roll előtte).',
    category: 'Szállítás'
  },
  {
    id: '15',
    term: 'Cash Settlement',
    definition: 'Pénzbeli elszámolás lejáratkor. Index futures (S&P, Nasdaq). Nincs fizikai szállítás.',
    category: 'Szállítás'
  },
  {
    id: '16',
    term: 'Contract Rolling',
    definition: 'Közeli lejáratú kontraktus zárása + távolabbi nyitása. Folyamatos kitettség fenntartása. Roll cost = spread + commissions.',
    category: 'Kereskedés'
  },
  {
    id: '17',
    term: 'E-mini Futures',
    definition: 'Elektronikusan kereskedett mini kontraktusok. ES (S&P 500), NQ (Nasdaq). Kisebb méret = retail friendly.',
    category: 'Típusok'
  },
  {
    id: '18',
    term: 'Micro Futures',
    definition: 'Még kisebb kontraktusok. 1/10 E-mini méret. MES, MNQ. Kezdőknek, kis számláknak.',
    category: 'Típusok'
  },
  {
    id: '19',
    term: 'Commodity Futures',
    definition: 'Nyersanyagok: olaj, arany, búza, kávé. Fizikai szállítás lehetséges. Szezonalitás fontos!',
    category: 'Típusok'
  },
  {
    id: '20',
    term: 'Currency Futures',
    definition: 'Deviza párok: EUR/USD, JPY/USD. IMM dátumok. Alternatíva Forex spot-nak, centralizált.',
    category: 'Típusok'
  },
  {
    id: '21',
    term: 'Interest Rate Futures',
    definition: 'Eurodollar, Treasury futures. Kamatláb kockázat kezelés. Bankok, befektetési alapok használják.',
    category: 'Típusok'
  },
  {
    id: '22',
    term: 'Equity Index Futures',
    definition: 'S&P 500, Nasdaq, Dow, Russell. Cash settled. Portfólió hedging, spekuláció. Nagy likviditás.',
    category: 'Típusok'
  },
  {
    id: '23',
    term: 'VIX Futures',
    definition: 'Volatilitás kereskedés. Contango általában. Nehéz direktíven hosszú távon. Portfolio hedge.',
    category: 'Típusok'
  },
  {
    id: '24',
    term: 'Single Stock Futures',
    definition: 'Egyedi részvények futures-a. Kisebb likviditás. Tőkehatékony alternatíva részvény vásárlásnak.',
    category: 'Típusok'
  },
  {
    id: '25',
    term: 'Hedging Futures-zal',
    definition: 'Meglévő pozíció védése futures-zal. Farmer: short búza futures (ár védelem). Befektető: short index futures (portfólió védelem).',
    category: 'Hedging'
  },
  {
    id: '26',
    term: 'Short Hedge',
    definition: 'Short futures pozíció eszköz birtoklása mellett. Ár esés ellen véd. Farmer, producer használja.',
    category: 'Hedging'
  },
  {
    id: '27',
    term: 'Long Hedge',
    definition: 'Long futures pozíció jövőbeli vásárlás előtt. Ár emelkedés ellen véd. Vásárló, processor használja.',
    category: 'Hedging'
  },
  {
    id: '28',
    term: 'Cross Hedge',
    definition: 'Nincs futures a védeni kívánt eszközre. Korrelált eszköz futures-át használja. Basis risk nagyobb!',
    category: 'Hedging'
  },
  {
    id: '29',
    term: 'Hedge Ratio',
    definition: 'Futures kontraktusok száma / védendő pozíció. Optimális: minimalizálja portfólió varianciát. Béta alapú equity hedge-nél.',
    category: 'Hedging'
  },
  {
    id: '30',
    term: 'Spekuláció Futures-zal',
    definition: 'Profit ár irányából tőkeáttéttel. Magas kockázat, magas potenciális hozam. Gyors pénz vagy gyors veszteség!',
    category: 'Spekuláció'
  },
  {
    id: '31',
    term: 'Trend Following',
    definition: 'Momentum stratégia futures-on. CTA (Commodity Trading Advisors) használják. Moving averages, breakouts.',
    category: 'Spekuláció'
  },
  {
    id: '32',
    term: 'Mean Reversion',
    definition: 'Túlvett/túladott szintekről visszatérés. Range trading. Futures volatilitása jó lehetőségeket ad.',
    category: 'Spekuláció'
  },
  {
    id: '33',
    term: 'Spread Trading',
    definition: 'Long egy kontraktus, short másik. Csökkentett kockázat. Calendar spread, inter-commodity spread.',
    category: 'Spread Stratégiák'
  },
  {
    id: '34',
    term: 'Calendar Spread',
    definition: 'Long távolabbi, short közelebbi lejárat (vagy fordítva). Roll yield-re játszik. Alacsonyabb margin.',
    category: 'Spread Stratégiák'
  },
  {
    id: '35',
    term: 'Inter-Commodity Spread',
    definition: 'Kapcsolódó commodities: crack spread (olaj-benzin), crush spread (szója-olaj-liszt). Profitál árkülönbség változásából.',
    category: 'Spread Stratégiák'
  },
  {
    id: '36',
    term: 'Butterfly Spread',
    definition: 'Long 2 szélső lejárat, short 2x középső. Volatilitás play. Alacsony kockázat, profit ha stabil ár.',
    category: 'Spread Stratégiák'
  },
  {
    id: '37',
    term: 'Arbitrázs',
    definition: 'Kockázatmentes profit áreltérésekből. Cash-and-carry, reverse cash-and-carry. Intézményi szereplők.',
    category: 'Arbitrázs'
  },
  {
    id: '38',
    term: 'Cash-and-Carry Arbitrage',
    definition: 'Ha futures túl drága vs spot: long spot, short futures. Lejáratkor konvergencia → profit.',
    category: 'Arbitrázs'
  },
  {
    id: '39',
    term: 'Index Arbitrage',
    definition: 'Futures vs ETF vagy kosár részvény. Program trading. Milliszekundum gyorsaság kell.',
    category: 'Arbitrázs'
  },
  {
    id: '40',
    term: 'Tick Size és Value',
    definition: 'Minimális ár változás. ES: 0.25 pont = $12.50. CL (oil): $0.01 = $10. Fontos profit/veszteség számításhoz!',
    category: 'Kontraktus Specifikációk'
  },
  {
    id: '41',
    term: 'Notional Value',
    definition: 'Kontraktus névleges értéke. ES: 50 × S&P index. 4000 index: $200,000 notional. Leverage!',
    category: 'Kontraktus Specifikációk'
  },
  {
    id: '42',
    term: 'Contract Months',
    definition: 'Lejárati hónapok kódjai: H(Már), M(Máj), U(Szept), Z(Dec). ESH4 = E-mini S&P Március 2024.',
    category: 'Kontraktus Specifikációk'
  },
  {
    id: '43',
    term: 'First Notice Day',
    definition: 'Első nap, amikor szállítási értesítést lehet kapni. Spekulánsok általában előtte roll-olnak. Physicals only.',
    category: 'Lejárat'
  },
  {
    id: '44',
    term: 'Last Trading Day',
    definition: 'Utolsó kereskedési nap. Lejárat napja. Cash settled futures esetén final settlement ár meghatározás.',
    category: 'Lejárat'
  },
  {
    id: '45',
    term: 'Limit Up / Limit Down',
    definition: 'Maximális napi ármozgás. Circuit breaker. Kereskedés leállhat. Védelem extrém volatilitás ellen.',
    category: 'Szabályozás'
  },
  {
    id: '46',
    term: 'Position Limits',
    definition: 'Maximális kontraktus szám egy szereplőnek. Manipuláció megakadályozása. Spekulánsokra szigorúbb.',
    category: 'Szabályozás'
  },
  {
    id: '47',
    term: 'Clearinghouse',
    definition: 'Központi partnered minden ügyletnél. Eliminálja partnerkockázatot. CME Clearing, ICE Clear.',
    category: 'Piaci Struktúra'
  },
  {
    id: '48',
    term: 'Open Outcry vs Electronic',
    definition: 'Open outcry: trading pit, kézjelek. Electronic: 24/5 kereskedés, gyorsabb. Elektronikus dominál ma.',
    category: 'Piaci Struktúra'
  },
  {
    id: '49',
    term: 'CME Globex',
    definition: 'CME elektronikus platform. 23 óra kereskedés naponta. Global likviditás. Legtöbb futures itt.',
    category: 'Piaci Struktúra'
  },
  {
    id: '50',
    term: 'Fair Value',
    definition: 'Futures elméleti ára spot alapján. FV = Spot × (1 + r - d)^T. r=kamat, d=osztalék yield, T=idő.',
    category: 'Árazás'
  },
  {
    id: '51',
    term: 'Cost of Carry',
    definition: 'Költségek spot pozíció tartásához: tárolás, biztosítás, kamat. Minus: convenience yield. Meghatározza futures árát.',
    category: 'Árazás'
  },
  {
    id: '52',
    term: 'Convenience Yield',
    definition: 'Benefit fizikai commodity birtoklásából. Kínálat disruption esetén értékes. Csökkenti futures árát (backwardation).',
    category: 'Árazás'
  },
  {
    id: '53',
    term: 'Implied Repo Rate',
    definition: 'Implicit kamatláb futures és spot árkülönbségből. Arbitrázs szempontból fontos. Ha > riskfree rate → carry opportunity.',
    category: 'Árazás'
  },
  {
    id: '54',
    term: 'Futures Equivalent',
    definition: 'Opció pozíció delta-val súlyozott futures expozíciója. Portfolio hedging számításokhoz.',
    category: 'Opciók és Futures'
  },
  {
    id: '55',
    term: 'Options on Futures',
    definition: 'Opciók futures kontraktusokra. Népszerű commodities-ben. Amerikai stílus általában.',
    category: 'Opciók és Futures'
  },
  {
    id: '56',
    term: 'Crude Oil Futures (CL)',
    definition: 'WTI crude oil, 1000 barrel/kontraktus. Nymex. Legkereskedettebb commodity. Geopolitika, OPEC.',
    category: 'Népszerű Kontraktusok'
  },
  {
    id: '57',
    term: 'Gold Futures (GC)',
    definition: '100 troy ounce. Safe haven asset. Negatív korreláció USD-vel. Infláció hedge.',
    category: 'Népszerű Kontraktusok'
  },
  {
    id: '58',
    term: 'E-mini S&P 500 (ES)',
    definition: 'Legnépszerűbb equity index futures. 50 × index. 23/5 kereskedés. Benchmark.',
    category: 'Népszerű Kontraktusok'
  },
  {
    id: '59',
    term: 'E-mini Nasdaq (NQ)',
    definition: '20 × Nasdaq-100. Tech heavy. Magasabb volatilitás, mint ES. Napi kereskedők kedvelik.',
    category: 'Népszerű Kontraktusok'
  },
  {
    id: '60',
    term: 'Treasury Futures (ZB, ZN, ZF)',
    definition: 'US Treasury bonds, notes. Kamatláb hedging. ZB=30yr, ZN=10yr, ZF=5yr. Inverz kapcsolat kamatokkal.',
    category: 'Népszerű Kontraktusok'
  },
  {
    id: '61',
    term: 'Eurodollar Futures (GE)',
    definition: 'Short-term interest rate (LIBOR/SOFR). Fed policy hatás. Yield curve építése.',
    category: 'Népszerű Kontraktusok'
  },
  {
    id: '62',
    term: 'Bitcoin Futures (BTC)',
    definition: 'CME és Bakkt. Cash settled. Regulated exposure crypto-ra. Premiummal vs spot.',
    category: 'Népszerű Kontraktusok'
  },
  {
    id: '63',
    term: 'Agricultural Futures',
    definition: 'Corn, wheat, soybeans, cattle. CBOT. Szezonalitás, időjárás, export/import. Ősi futures piacok.',
    category: 'Szektor Specifikus'
  },
  {
    id: '64',
    term: 'Energy Futures',
    definition: 'Crude, natural gas, gasoline, heating oil. OPEC, geopolitika, weather. Magas volatilitás.',
    category: 'Szektor Specifikus'
  },
  {
    id: '65',
    term: 'Metal Futures',
    definition: 'Gold, silver, copper, platinum. Industrial (copper) vs precious (gold). Infláció, USD, manufacturing.',
    category: 'Szektor Specifikus'
  },
  {
    id: '66',
    term: 'Seasonality',
    definition: 'Ismétlődő áru minták évszakonként. Ag futures: planting/harvest. Natural gas: heating season. Statistical edge.',
    category: 'Kereskedési Faktorok'
  },
  {
    id: '67',
    term: 'COT Report',
    definition: 'Commitment of Traders. CFTC hetente. Commercials vs speculánsok pozíciói. Sentiment indikátor.',
    category: 'Kereskedési Faktorok'
  },
  {
    id: '68',
    term: 'Open Interest Analysis',
    definition: 'Összes nyitott kontraktus. Növekvő OI + növekvő ár = új bullish pozíciók. Csökkenő OI = pozíció zárás.',
    category: 'Kereskedési Faktorok'
  },
  {
    id: '69',
    term: 'Overnight Risk',
    definition: 'Gaps lejárat közelében vagy hírekre. Futures 24/5 → ázsiai session mozgások. Stop-ok nem garantáltak.',
    category: 'Kockázatok'
  },
  {
    id: '70',
    term: 'Leverage Risk',
    definition: '10-20x tőkeáttét = kis mozgás nagy hatás. $5000 margin, $100,000 notional. 1% mozgás = 20% számla.',
    category: 'Kockázatok'
  },
  {
    id: '71',
    term: 'Liquidity Risk',
    definition: 'Távolabbi lejáratok, egzotikus kontraktusok. Széles spreads. Exit nehéz lehet. Stick to líquids!',
    category: 'Kockázatok'
  },
  {
    id: '72',
    term: 'Delivery Risk',
    definition: 'Physicals: nem roll-olsz időben → átvétel kötelezettség! Tárolás, logisztika problémák.',
    category: 'Kockázatok'
  },
  {
    id: '73',
    term: 'Managed Futures',
    definition: 'CTA-k által kezelt futures alapok. Trend following általában. Alternatív befektetés. Alacsony korreláció részvényekkel.',
    category: 'Befektetési Eszközök'
  },
  {
    id: '74',
    term: 'Commodity ETFs',
    definition: 'Futures-alapú ETF-ek (USO, GLD). Contango drag probléma! Nem = commodity possession.',
    category: 'Befektetési Eszközök'
  },
  {
    id: '75',
    term: 'Összefoglalás: Futures Kereskedés',
    definition: 'Futures hatékony eszköz hedging-re és spekulációra. Magas tőkeáttét = magas kockázat! Margin management kritikus. Érts contango/backwardation-t. Roll költségek fontosak ETF-eknél. Demo számlával gyakorolj! Fegyelem és kockázatkezelés nélkül ne kereskedj futures-zal.',
    category: 'Összefoglalás'
  }
];
