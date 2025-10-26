import { BookViewTerm } from '../components/StandaloneBookView';

export const opciokData: BookViewTerm[] = [
  {
    id: '1',
    term: 'Mi az Opció?',
    definition: 'Az opció egy származtatott pénzügyi eszköz, amely jogot (de nem kötelezettséget!) ad az eszköz vásárlására (call) vagy eladására (put) előre meghatározott áron és időpontban.',
    category: 'Alapok'
  },
  {
    id: '2',
    term: 'Call Opció',
    definition: 'Vételi jog. A tulajdonos jogot szerez egy eszköz megvásárlására a strike (kötési) áron a lejáratig. Bull stratégia - ár emelkedésre számít.',
    category: 'Alapok'
  },
  {
    id: '3',
    term: 'Put Opció',
    definition: 'Eladási jog. A tulajdonos jogot szerez egy eszköz eladására a strike áron a lejáratig. Bear stratégia - ár csökkenésre számít.',
    category: 'Alapok'
  },
  {
    id: '4',
    term: 'Strike Ár (Kötési Ár)',
    definition: 'Az előre meghatározott ár, amelyen az opciót gyakorolni lehet. Kritikus paraméter - meghatározza a nyereség/veszteség pontokat.',
    category: 'Alapok'
  },
  {
    id: '5',
    term: 'Expiry (Lejárat)',
    definition: 'Az időpont, amikor az opció elévül. Amerikai opció: bármikor gyakorolható lejáratig. Európai opció: csak lejáratkor.',
    category: 'Alapok'
  },
  {
    id: '6',
    term: 'Prémium',
    definition: 'Az opció ára. Amit a vevő fizet az eladónak a jogért. Ez a maximum veszteség a vevő számára. Belső érték + időérték.',
    category: 'Alapok'
  },
  {
    id: '7',
    term: 'Long Call',
    definition: 'Call opció vásárlása. Korlátozott veszteség (prémium), korlátlan profit potenciál. Bullish pozíció. Breakeven = Strike + Prémium.',
    category: 'Alapstratégiák'
  },
  {
    id: '8',
    term: 'Long Put',
    definition: 'Put opció vásárlása. Korlátozott veszteség (prémium), nagy profit potenciál ár eséskor. Bearish pozíció. Breakeven = Strike - Prémium.',
    category: 'Alapstratégiák'
  },
  {
    id: '9',
    term: 'Short Call (Fedezetlen)',
    definition: 'Call opció eladása fedezet nélkül. Korlátozott profit (prémium), korlátlan veszteség potenciál! Nagyon kockázatos. Bearish/Neutral.',
    category: 'Alapstratégiák'
  },
  {
    id: '10',
    term: 'Short Put',
    definition: 'Put opció eladása. Korlátozott profit (prémium), nagy veszteség potenciál. Bullish/Neutral. Kötelezettség: vásárlás strike áron.',
    category: 'Alapstratégiák'
  },
  {
    id: '11',
    term: 'Covered Call',
    definition: 'Részvény birtoklása + call eladás. Konzervatív jövedelem stratégia. Profit: prémium + osztalék. Kockázat: felső határ a nyereségnek.',
    category: 'Jövedelem Stratégiák'
  },
  {
    id: '12',
    term: 'Cash-Secured Put',
    definition: 'Put eladás készpénz fedezéssel (strike × 100). Ha assigned, vásárol alacsonyabb áron. Bullish stratégia prémium bevételért.',
    category: 'Jövedelem Stratégiák'
  },
  {
    id: '13',
    term: 'The Wheel Strategy',
    definition: 'Cash-secured put → assigned → részvény birtoklás → covered call. Ciklikus stratégia folyamatos prémium bevételért. Stabil részvényeknél hatékony.',
    category: 'Jövedelem Stratégiák'
  },
  {
    id: '14',
    term: 'ITM (In-The-Money)',
    definition: 'Call: részvényár > strike. Put: részvényár < strike. Pozitív belső érték. Magasabb prémium, magasabb delta.',
    category: 'Moneyness'
  },
  {
    id: '15',
    term: 'ATM (At-The-Money)',
    definition: 'Részvényár ≈ strike. Legnagyobb időérték. Legnagyobb gamma. Legnépszerűbb kereskedési zóna.',
    category: 'Moneyness'
  },
  {
    id: '16',
    term: 'OTM (Out-of-The-Money)',
    definition: 'Call: részvényár < strike. Put: részvényár > strike. Nincs belső érték, csak időérték. Olcsóbb, nagyobb tőkeáttét.',
    category: 'Moneyness'
  },
  {
    id: '17',
    term: 'Belső Érték (Intrinsic Value)',
    definition: 'Az opció azonnali gyakorlási értéke. Call: max(0, S-K). Put: max(0, K-S). S=részvényár, K=strike.',
    category: 'Értékelés'
  },
  {
    id: '18',
    term: 'Időérték (Time Value)',
    definition: 'Prémium - Belső érték. A lehetőség értéke, hogy az opció még profitábilissá váljon. Idővel csökken (time decay).',
    category: 'Értékelés'
  },
  {
    id: '19',
    term: 'Extrinsic Value',
    definition: 'Másik neve az időértéknek. Volatilitásból és hátralévő időből származik. Lejáratkor = 0.',
    category: 'Értékelés'
  },
  {
    id: '20',
    term: 'Delta (Δ)',
    definition: 'Opció árának változása $1 részvényár változásra. Call: 0 - 1. Put: 0 - (-1). Hedge ratio. ATM ≈ 0.5.',
    category: 'Greeks'
  },
  {
    id: '21',
    term: 'Gamma (Γ)',
    definition: 'Delta változásának mértéke. Második derivált. ATM legnagyobb. Dinamikus hedging szükségessége. Long opciók: pozitív gamma.',
    category: 'Greeks'
  },
  {
    id: '22',
    term: 'Theta (Θ)',
    definition: 'Időérték erodálódása naponta. Mindig negatív opció vevőkre, pozitív eladókra. ATM legnagyobb. "Time is money, literally!"',
    category: 'Greeks'
  },
  {
    id: '23',
    term: 'Vega (ν)',
    definition: 'Volatilitás érzékenység. 1% implied volatility változásra. Long opciók: pozitív vega. Earnings előtt magas.',
    category: 'Greeks'
  },
  {
    id: '24',
    term: 'Rho (ρ)',
    definition: 'Kamatláb érzékenység. Általában elhanyagolható, kivéve hosszú futamidejű opciók (LEAPS). Kamat emelés: call +, put -.',
    category: 'Greeks'
  },
  {
    id: '25',
    term: 'Implied Volatility (IV)',
    definition: 'Piaci ár-ból visszaszámolt volatilitás. Piac "várja" a jövőbeli volatilitást. Magas IV = drága opciók.',
    category: 'Volatilitás'
  },
  {
    id: '26',
    term: 'IV Rank',
    definition: 'Jelenlegi IV pozíciója az 52 hetes tartományban (%). 100% = 52 hetes csúcs. Segít értékelni, az opció "drága" vagy "olcsó".',
    category: 'Volatilitás'
  },
  {
    id: '27',
    term: 'IV Percentile',
    definition: 'Hány %-ban volt az IV alacsonyabb az elmúlt évben. IVR-hez hasonló, de robusztusabb (outlier-ekre).',
    category: 'Volatilitás'
  },
  {
    id: '28',
    term: 'IV Crush',
    definition: 'IV drámai esése esemény után (earnings). Opció vevők vesztesége, eladók nyeresége. "Buy the rumor, sell the news."',
    category: 'Volatilitás'
  },
  {
    id: '29',
    term: 'VIX Index',
    definition: 'S&P 500 opciók 30 napos IV-je. "Félelem index". 10-20: alacsony, 20-30: normál, 30+: magas. Inverz korreláció piacal.',
    category: 'Volatilitás'
  },
  {
    id: '30',
    term: 'Volatility Smile',
    definition: 'OTM opciók magasabb IV-je. Fat tails a valóságban. Különösen put-oknál (crash protection).',
    category: 'Volatilitás'
  },
  {
    id: '31',
    term: 'Bull Call Spread',
    definition: 'Long call (alacsonyabb strike) + Short call (magasabb strike). Korlátozott profit és kockázat. Alacsonyabb költség, mint long call.',
    category: 'Spread Stratégiák'
  },
  {
    id: '32',
    term: 'Bear Put Spread',
    definition: 'Long put (magasabb strike) + Short put (alacsonyabb strike). Bearish spread. Korlátozott kockázat-hozam.',
    category: 'Spread Stratégiák'
  },
  {
    id: '33',
    term: 'Bull Put Spread',
    definition: 'Short put (magasabb strike) + Long put (alacsonyabb strike). Credit spread. Bullish/neutral. Max profit = beérkezett prémium.',
    category: 'Spread Stratégiák'
  },
  {
    id: '34',
    term: 'Bear Call Spread',
    definition: 'Short call (alacsonyabb strike) + Long call (magasabb strike). Credit spread. Bearish/neutral. Korlátozott veszteség.',
    category: 'Spread Stratégiák'
  },
  {
    id: '35',
    term: 'Iron Condor',
    definition: 'Bull put spread + Bear call spread. Neutral stratégia. Range-bound piacra. 4 láb. Max profit: nettó prémium.',
    category: 'Neutral Stratégiák'
  },
  {
    id: '36',
    term: 'Iron Butterfly',
    definition: 'ATM short call + put, OTM long call + put. Hasonló Iron Condor-hoz, de szűkebb profit zóna. Magasabb max profit.',
    category: 'Neutral Stratégiák'
  },
  {
    id: '37',
    term: 'Short Straddle',
    definition: 'ATM short call + put. Neutral stratégia. Magas prémium bevétel. Kockázat: nagy ármozgás mindkét irányban.',
    category: 'Neutral Stratégiák'
  },
  {
    id: '38',
    term: 'Short Strangle',
    definition: 'OTM short call + put. Szélesebb profit zóna, mint straddle. Alacsonyabb prémium. IV eladás stratégia.',
    category: 'Neutral Stratégiák'
  },
  {
    id: '39',
    term: 'Long Straddle',
    definition: 'ATM long call + put. Volatilitás vásárlás. Nagy ármozgásra számít (bármelyik irányban). Earnings play.',
    category: 'Volatilitás Stratégiák'
  },
  {
    id: '40',
    term: 'Long Strangle',
    definition: 'OTM long call + put. Olcsóbb, mint straddle. Nagyobb ármozgás kell a profithoz. Risk/reward trade-off.',
    category: 'Volatilitás Stratégiák'
  },
  {
    id: '41',
    term: 'Calendar Spread (Time Spread)',
    definition: 'Short rövid lejáratú + Long hosszú lejáratú (azonos strike). Theta stratégia. Profitál time decay különbségből.',
    category: 'Időalapú Stratégiák'
  },
  {
    id: '42',
    term: 'Diagonal Spread',
    definition: 'Különböző strike-ok és lejáratok. Pl. Short közeli lejárat alacsonyabb strike, Long távoli magasabb strike.',
    category: 'Időalapú Stratégiák'
  },
  {
    id: '43',
    term: 'PMCC (Poor Man\'s Covered Call)',
    definition: 'Deep ITM LEAPS call + Short OTM call. Fedezett call kisebb tőkével. Pozitív delta, theta bevétel.',
    category: 'Időalapú Stratégiák'
  },
  {
    id: '44',
    term: 'Butterfly Spread',
    definition: '1 ITM long, 2 ATM short, 1 OTM long (mind call vagy mind put). Alacsony költség, korlátozott profit. Precíz ár előrejelzéshez.',
    category: 'Speciális Spreadek'
  },
  {
    id: '45',
    term: 'Condor Spread',
    definition: 'Hasonló butterfly-hoz, de 4 különböző strike. Szélesebb profit plató. Kevésbé précíz kell legyen az ár előrejelzés.',
    category: 'Speciális Spreadek'
  },
  {
    id: '46',
    term: 'Ratio Spread',
    definition: 'Aszimmetrikus spread. Pl. 1 long call, 2 short call. Végtelen kockázat egy irányban! Haladó stratégia.',
    category: 'Speciális Spreadek'
  },
  {
    id: '47',
    term: 'Collar Strategy',
    definition: 'Részvény + Protective put + Covered call. Lefelé védelem, felfelé korlátozás. Alacsony költségű biztosítás.',
    category: 'Védelem Stratégiák'
  },
  {
    id: '48',
    term: 'Protective Put',
    definition: 'Részvény + Long put. Portfólió biztosítás. Korlátlan felső potenciál, korlátozott lefelé veszteség. Költség: prémium.',
    category: 'Védelem Stratégiák'
  },
  {
    id: '49',
    term: 'Married Put',
    definition: 'Részvény vásárlás egyidőben put vásárlással. Hasonló protective put-hoz. Pszichológiailag könnyebb tartani.',
    category: 'Védelem Stratégiák'
  },
  {
    id: '50',
    term: 'Synthetic Long Stock',
    definition: 'Long call + Short put (azonos strike és lejárat). Szintetikusan replikálja a részvény pozíciót. Tőkehatékony.',
    category: 'Szintetikus Pozíciók'
  },
  {
    id: '51',
    term: 'Synthetic Short Stock',
    definition: 'Short call + Long put. Szintetikus short pozíció. Nincs short borrow költség. Hasznos nehezen shortolható részvényeknél.',
    category: 'Szintetikus Pozíciók'
  },
  {
    id: '52',
    term: 'Conversion',
    definition: 'Long stock + Long put + Short call. Arbitrázs stratégia. Kockázatmentes profit, ha put-call parity sérül.',
    category: 'Arbitrázs'
  },
  {
    id: '53',
    term: 'Reversal',
    definition: 'Short stock + Short put + Long call. Conversion ellentéte. Szintén arbitrázs lehetőség.',
    category: 'Arbitrázs'
  },
  {
    id: '54',
    term: 'Box Spread',
    definition: 'Bull call spread + Bear put spread. Szintetikus kockázatmentes pozíció. Csak ha mispricing van.',
    category: 'Arbitrázs'
  },
  {
    id: '55',
    term: 'Assignment',
    definition: 'Amikor short opció gyakoroltatik. Call: kötelezettség eladni. Put: kötelezettség vásárolni. Általában lejáratkor vagy dividendnál.',
    category: 'Gyakorlás és Assignment'
  },
  {
    id: '56',
    term: 'Early Assignment',
    definition: 'Lejárat előtti gyakoroltatás. Deep ITM és dividendnál gyakori. Short opció kockázat. PIN risk lejáratkor.',
    category: 'Gyakorlás és Assignment'
  },
  {
    id: '57',
    term: 'PIN Risk',
    definition: 'Bizonytalan, hogy short opció assigned lesz-e, ha ár ≈ strike lejáratkor. Hétvégi gap kockázat.',
    category: 'Gyakorlás és Assignment'
  },
  {
    id: '58',
    term: 'Ex-Dividend Date',
    definition: 'Nap, amikor részvény osztalék nélkül kereskedik. ITM call-ok gyakran gyakoroltatnak előtte. Dividend capture kísérlet.',
    category: 'Osztalék Hatások'
  },
  {
    id: '59',
    term: 'Dividend Impact on Pricing',
    definition: 'Osztalék csökkenti call értékét, növeli put értékét. Diszkontált osztalék beépül az árazásba.',
    category: 'Osztalék Hatások'
  },
  {
    id: '60',
    term: 'LEAPS (Long-term Equity AnticiPation Securities)',
    definition: 'Hosszú távú opciók (>9 hónap lejárat). Tőkehatékony részvény kitettség. Alacsonyabb gamma és theta.',
    category: 'Speciális Opció Típusok'
  },
  {
    id: '61',
    term: 'Weekly Options',
    definition: 'Heti lejáratú opciók. Magas theta. Rövid távú kereskedőknek. Earning week-en népszerű.',
    category: 'Speciális Opció Típusok'
  },
  {
    id: '62',
    term: '0DTE (Zero Days To Expiration)',
    definition: 'Aznapi lejáratú opciók. Extrém gamma, theta. Nagyon spekulatív. Magas volatilitás.',
    category: 'Speciális Opció Típusok'
  },
  {
    id: '63',
    term: 'Index Options',
    definition: 'SPX, NDX, RUT. Cash settled, európai stílus. Portfólió hedge. Kedvező adózás (1256 contract).',
    category: 'Speciális Opció Típusok'
  },
  {
    id: '64',
    term: 'ETF Options',
    definition: 'SPY, QQQ, IWM. Amerikai stílus, fizikai leszállítás. Likvidebb, mint index. Kisebb kontraktus méret.',
    category: 'Speciális Opció Típusok'
  },
  {
    id: '65',
    term: 'VIX Options',
    definition: 'Opciók a VIX index-re. Volatilitás kereskedés. Európai stílus. Komplex árazás (VIX futures alapon).',
    category: 'Speciális Opció Típusok'
  },
  {
    id: '66',
    term: 'Binary Options',
    definition: 'Fix kifizetés vagy semmi. Egész vagy semmi opció. Kaszinószerű. Sok scam, kerülendő retail kereskedőknek.',
    category: 'Exotikus Opciók'
  },
  {
    id: '67',
    term: 'Barrier Options',
    definition: 'Knock-in vagy knock-out szintek. Aktiválódik vagy deaktiválódik, ha ár eléri a barrier-t. OTC piacokon.',
    category: 'Exotikus Opciók'
  },
  {
    id: '68',
    term: 'Asian Options',
    definition: 'Kifizetés átlagár alapján. Alacsonyabb volatilitás, mint standard. Commodities-ben népszerű.',
    category: 'Exotikus Opciók'
  },
  {
    id: '69',
    term: 'Bid-Ask Spread',
    definition: 'Eladási és vételi ár különbsége. Tranzakciós költség. Likvid opciók: szűk spread. OTM, távoli lejárat: széles.',
    category: 'Kereskedés Mechanika'
  },
  {
    id: '70',
    term: 'Market Maker',
    definition: 'Likviditást biztosító intézmény. Bid-ask spread-ből profitál. Delta hedging-el kezelnek kockázatot.',
    category: 'Kereskedés Mechanika'
  },
  {
    id: '71',
    term: 'Order Types',
    definition: 'Market: azonnali. Limit: megadott vagy jobb áron. Stop: aktiválódik megadott árnál. GTC: Good Till Cancelled.',
    category: 'Kereskedés Mechanika'
  },
  {
    id: '72',
    term: 'Liquidity',
    definition: 'Open interest és volume. Magas likviditás = könnyű be/kilépés, szűk spread. ATM strike-ok leglikvidebb.',
    category: 'Kereskedés Mechanika'
  },
  {
    id: '73',
    term: 'Open Interest',
    definition: 'Nyitott kontraktusok száma. Piaci érdeklődés mérő. Növekvő OI + növekvő ár = bullish. Csökkenő OI = pozíció zárás.',
    category: 'Kereskedés Mechanika'
  },
  {
    id: '74',
    term: 'Max Pain Theory',
    definition: 'Ár, ahol a legtöbb opció értéktelenül jár le. Állítólag market maker-ek felé tolják. Vitatott elmélet.',
    category: 'Piaci Dinamika'
  },
  {
    id: '75',
    term: 'Gamma Squeeze',
    definition: 'Market maker-ek delta hedging-e nagy gamma pozíciók mellett. Önmagát erősítő ármozgás. GME 2021.',
    category: 'Piaci Dinamika'
  },
  {
    id: '76',
    term: 'Short Squeeze',
    definition: 'Heavy short interest + ár emelkedés → short-ok fedezése → további emelkedés. Opciók felgyorsíthatják (call buying).',
    category: 'Piaci Dinamika'
  },
  {
    id: '77',
    term: 'Skew',
    definition: 'IV különbség különböző strike-ok között. Put skew: downside protection drágább. Smile: OTM mindkét oldalon drágább.',
    category: 'Fejlett Koncepciók'
  },
  {
    id: '78',
    term: 'Term Structure',
    definition: 'IV különböző lejáratok között. Contango: hosszabb lejárat magasabb IV. Backwardation: fordítva (ritkább).',
    category: 'Fejlett Koncepciók'
  },
  {
    id: '79',
    term: 'Volatility Surface',
    definition: '3D reprezentáció: IV function of strike and time. Kereskedők ezt nézik árazáshoz.',
    category: 'Fejlett Koncepciók'
  },
  {
    id: '80',
    term: 'Delta Hedging',
    definition: 'Részvény pozíció fenntartása delta neutral állapothoz. Dinamikus rebalancing. Market maker stratégia.',
    category: 'Hedging'
  },
  {
    id: '81',
    term: 'Gamma Scalping',
    definition: 'Profitálás gamma-ból folyamatos delta hedge-eléssel. Vásárolj alacsony, eladj magas. Magas gamma és volatilitás kell.',
    category: 'Fejlett Kereskedés'
  },
  {
    id: '82',
    term: 'Vega Neutral',
    definition: 'Portfólió immunizálása IV változásra. Ellentétes vega pozíciók. Spread kereskedés gyakran vega neutral.',
    category: 'Fejlett Kereskedés'
  },
  {
    id: '83',
    term: 'Portfolio Margin',
    definition: 'Kockázatalapú margin követelmény. Alacsonyabb, mint Reg T. Spread-ekre hatékony. $125K minimum.',
    category: 'Margin és Tőkeáttét'
  },
  {
    id: '84',
    term: 'Reg T Margin',
    definition: 'Standard margin szabályok. Konzervatívabb. Nem veszi figyelembe risk offsetting-et.',
    category: 'Margin és Tőkeáttét'
  },
  {
    id: '85',
    term: 'Buying Power Reduction (BPR)',
    definition: 'Margin követelmény egy pozícióra. Mennyit "eszik meg" a buying power-ből. Spread-ek: max veszteség.',
    category: 'Margin és Tőkeáttét'
  },
  {
    id: '86',
    term: 'PDT Rule (Pattern Day Trader)',
    definition: '$25K minimum margin számlára 4+ day trade 5 napon. USA szabály. Circumvent: cash account vagy csak 3 day trade.',
    category: 'Szabályozás'
  },
  {
    id: '87',
    term: 'Section 1256 Contracts',
    definition: 'Index options, futures. Kedvező adózás: 60% long-term, 40% short-term. Tartási időtől független!',
    category: 'Adózás'
  },
  {
    id: '88',
    term: 'Wash Sale Rule',
    definition: 'Veszteség nem levonható, ha 30 napon belül veszesz hasonlót. Opciókra is vonatkozik!',
    category: 'Adózás'
  },
  {
    id: '89',
    term: 'Mark-to-Market Election',
    definition: 'Aktív kereskedők választhatják. Minden pozíció év végén értékesítve számít. Kerüli wash sale-t.',
    category: 'Adózás'
  },
  {
    id: '90',
    term: 'Backtesting',
    definition: 'Stratégia tesztelése historikus adatokon. Fontos, de múltbeli siker ≠ jövőbeli garancia. Overfitting veszély!',
    category: 'Stratégia Fejlesztés'
  },
  {
    id: '91',
    term: 'Paper Trading',
    definition: 'Szimulált kereskedés valós adatokkal. Kockázatmentes gyakorlás. De: nincs érzelmi hatás!',
    category: 'Stratégia Fejlesztés'
  },
  {
    id: '92',
    term: 'Position Sizing',
    definition: 'Ne kockáztass túl sokat egy trade-re. 1-5% portfolio érték. Kisebb volatilis stratégiákra.',
    category: 'Kockázatkezelés'
  },
  {
    id: '93',
    term: 'Stop Loss Opciókkal',
    definition: 'Nehezebb, mint részvényekkel. Prémium % vagy delta alapon. Vagy: GTC order a pozíció bezárásához.',
    category: 'Kockázatkezelés'
  },
  {
    id: '94',
    term: 'Earnings Plays',
    definition: 'Volatilitás kereskedés earnings körül. Long straddle: nagy mozgásra számít. Short strangle: IV crush-ra játszik.',
    category: 'Eseményalapú Kereskedés'
  },
  {
    id: '95',
    term: 'Dividend Plays',
    definition: 'Covered call rolling ex-dividend előtt. Vagy: dividend capture ITM call-al. Assignment kockázat!',
    category: 'Eseményalapú Kereskedés'
  },
  {
    id: '96',
    term: 'FOMC Plays',
    definition: 'Fed ülések: magas volatilitás. Long opciók Fed előtt, eladás announcement után (IV crush).',
    category: 'Eseményalapú Kereskedés'
  },
  {
    id: '97',
    term: 'Options Flow',
    definition: 'Nagy intézményi opció vásárlások követése. Unusual activity. Lehet előrejelző, de gyakran hedging.',
    category: 'Piaci Adatok'
  },
  {
    id: '98',
    term: 'Put/Call Ratio',
    definition: 'Put volume / Call volume. > 1: bearish sentiment. < 1: bullish. Contrarian indikátor lehet.',
    category: 'Piaci Adatok'
  },
  {
    id: '99',
    term: 'Common Mistakes',
    definition: 'Túl OTM opciók, theta figyelmen kívül hagyása, spread lábak separate order-ként, túl nagy pozíciók, no plan. Tanulj hibákból!',
    category: 'Hibák Elkerülése'
  },
  {
    id: '100',
    term: 'Összefoglalás: Sikeres Opció Kereskedés',
    definition: 'Értsd a Greek-eket, IV szerepét. Kockázatkezelés kritikus. Kis pozíciókkal kezdj. Paper trade először. Speciális stratégia speciális célhoz. Fegyelem és türelem. Opciók erős eszközök, de kettős pengéjű kard. Használd felelősen!',
    category: 'Összefoglalás'
  }
];
