import { BookViewTerm } from '../components/StandaloneBookView';

export const penzugyimatematikaData: BookViewTerm[] = [
  {
    id: '1',
    term: 'Pénzügyi Matematika Alapjai',
    definition: 'A pénzügyi matematika a pénz időértékének, kockázat-hozam kapcsolatának és értékpapír árazásának tudománya. Alapja minden pénzügyi döntésnek.',
    category: 'Bevezetés'
  },
  {
    id: '2',
    term: 'Pénz Időértéke (Time Value of Money)',
    definition: 'A mai 1 forint többet ér, mint a jövőbeli 1 forint. Okok: infláció, befektetési lehetőség, bizonytalanság. Minden pénzügyi számítás alapja!',
    category: 'TVM'
  },
  {
    id: '3',
    term: 'Jelenérték (Present Value)',
    definition: 'Jövőbeli pénzösszeg mai értéke. Képlet: PV = FV / (1+r)^n. ahol FV=jövőérték, r=kamatláb, n=periódusok száma.',
    category: 'TVM'
  },
  {
    id: '4',
    term: 'Jövőérték (Future Value)',
    definition: 'Mai pénzösszeg értéke a jövőben kamatozással. Képlet: FV = PV × (1+r)^n. Kamatos kamat hatalom!',
    category: 'TVM'
  },
  {
    id: '5',
    term: 'Kamatos Kamat',
    definition: 'Kamat kamatot terem. Albert Einstein: "A világ 8. csodája". 72-es szabály: 72/kamatláb = évek megduplázódásig.',
    category: 'TVM'
  },
  {
    id: '6',
    term: '72-es Szabály',
    definition: '72 osztva kamatlábbal = megduplázódási idő. 8% kamaton: 72/8 = 9 év. Egyszerű, gyors becslés.',
    category: 'TVM'
  },
  {
    id: '7',
    term: 'Diszkontálás',
    definition: 'Jövőbeli cash flow-k jelenértékre hozása. Minél távolabbi a cash flow, annál kisebb a jelenértéke. DCF alapja.',
    category: 'TVM'
  },
  {
    id: '8',
    term: 'Diszkontrát Megválasztása',
    definition: 'Kockázatmentes ráta + kockázati prémium. CAPM szerint: rf + β(rm - rf). Kritikus paraméter, nagy hatással az értékelésre!',
    category: 'TVM'
  },
  {
    id: '9',
    term: 'Annuitás',
    definition: 'Egyenlő összegű, rendszeres pénzáramlások sorozata. Lehet rendes (periódus végén) vagy esedékes (periódus elején).',
    category: 'Cash Flow-k'
  },
  {
    id: '10',
    term: 'Rendes Annuitás Jelenértéke',
    definition: 'PV = PMT × [(1 - (1+r)^-n) / r]. ahol PMT=fizetés, r=kamatláb, n=periódusok. Jelzálogkölcsön számításához.',
    category: 'Cash Flow-k'
  },
  {
    id: '11',
    term: 'Örökjáradék (Perpetuity)',
    definition: 'Végtelen időre szóló, egyenletes pénzáramlás. PV = PMT / r. Egyszerű, de erős képlet!',
    category: 'Cash Flow-k'
  },
  {
    id: '12',
    term: 'Növekvő Örökjáradék',
    definition: 'Gordon Growth Model. PV = D / (r - g). ahol D=osztalék, r=hozamelvárás, g=növekedési ütem. Részvényértékeléshez.',
    category: 'Cash Flow-k'
  },
  {
    id: '13',
    term: 'Nettó Jelenérték (NPV)',
    definition: 'Beruházási projekt értékelése. NPV = Σ [CF_t / (1+r)^t] - Kezdőbefektetés. NPV > 0 → elfogadás.',
    category: 'Beruházás Értékelés'
  },
  {
    id: '14',
    term: 'Belső Megtérülési Ráta (IRR)',
    definition: 'Az a kamatláb, amelyen NPV = 0. Ha IRR > hurdle rate → elfogadás. Vigyázat: többszörös IRR lehetséges!',
    category: 'Beruházás Értékelés'
  },
  {
    id: '15',
    term: 'Megtérülési Idő (Payback Period)',
    definition: 'Hány év alatt térül meg a befektetés. Egyszerű, de figyelmen kívül hagyja a pénz időértékét és utána lévő cash flow-kat.',
    category: 'Beruházás Értékelés'
  },
  {
    id: '16',
    term: 'Diskontált Payback',
    definition: 'Payback period figyelembe véve a pénz időértékét. Reálisabb, mint az egyszerű payback.',
    category: 'Beruházás Értékelés'
  },
  {
    id: '17',
    term: 'Profitability Index',
    definition: 'PI = PV(jövőbeli CF) / Kezdőbefektetés. PI > 1 → elfogadás. Hasznos tőkekorlát esetén projektrangsoroláshoz.',
    category: 'Beruházás Értékelés'
  },
  {
    id: '18',
    term: 'Kötvény Árazás',
    definition: 'Kötvény = kamatfizetések jelenértéke + névérték jelenértéke. PV = Σ[Kamat/(1+r)^t] + [Névérték/(1+r)^n].',
    category: 'Kötvények'
  },
  {
    id: '19',
    term: 'Yield to Maturity (YTM)',
    definition: 'A kötvény belső megtérülési rátája. Az a hozam, ha lejáratig tartjuk. Iteratív számítással vagy approximációval.',
    category: 'Kötvények'
  },
  {
    id: '20',
    term: 'Current Yield',
    definition: 'Éves kamat / Jelenlegi ár. Egyszerűbb, mint YTM, de nem veszi figyelembe a tőkenyereséget/veszteséget lejáratkor.',
    category: 'Kötvények'
  },
  {
    id: '21',
    term: 'Kötvény Árak és Kamatlábak',
    definition: 'Inverz kapcsolat! Kamatok emelkednek → kötvény árak esnek. Kamatok csökkennek → árak emelkednek. Kulcsfontosságú összefüggés!',
    category: 'Kötvények'
  },
  {
    id: '22',
    term: 'Duration (Macaulay)',
    definition: 'Súlyozott átlagos idő a cash flow-k visszanyerésére. Méri a kamatláb érzékenységet. Minél hosszabb, annál volatilisebb.',
    category: 'Kötvény Kockázat'
  },
  {
    id: '23',
    term: 'Modified Duration',
    definition: 'Árváltozás becslése kamatváltozásra. ΔP/P ≈ -D_mod × Δy. ahol D_mod = Duration / (1+y). Kötvény "bétája".',
    category: 'Kötvény Kockázat'
  },
  {
    id: '24',
    term: 'Convexity (Konvexitás)',
    definition: 'Duration pontosítása. Kötvény árváltozás nem lineáris. Pozitív konvexitás = előnyös (ár nő jobban esik kevésbé).',
    category: 'Kötvény Kockázat'
  },
  {
    id: '25',
    term: 'Spot Rate és Forward Rate',
    definition: 'Spot: jelenlegi ráta adott futamidőre. Forward: jövőbeli kamatláb ma lekötve. Hozamgörbe ezekből épül fel.',
    category: 'Kamatláb Struktúra'
  },
  {
    id: '26',
    term: 'Hozamgörbe (Yield Curve)',
    definition: 'Különböző futamidejű kötvények hozamának grafikonja. Normál: felfelé ívelő. Inverz: lefelé (recesszió jele). Lapos: átmeneti.',
    category: 'Kamatláb Struktúra'
  },
  {
    id: '27',
    term: 'Inverz Hozamgörbe',
    definition: 'Rövid lejáratú hozamok > hosszú lejáratúak. Történelmileg recesszió előjele (12-18 hónappal). Piaci aggodalom jele.',
    category: 'Kamatláb Struktúra'
  },
  {
    id: '28',
    term: 'Részvény Értékelés - DDM',
    definition: 'Dividend Discount Model. Részvény értéke = jelenértéke az összes jövőbeli osztaléknak. Elméleti alapmodell.',
    category: 'Részvények'
  },
  {
    id: '29',
    term: 'Gordon Growth Model',
    definition: 'Állandó osztalék növekedés feltételezése. P = D1 / (r - g). Egyszerű, de érzékeny a paraméterekre. Érett vállalatokhoz.',
    category: 'Részvények'
  },
  {
    id: '30',
    term: 'Többlépcsős DDM',
    definition: 'Különböző növekedési fázisok. Pl. gyors növekedés 5 év, majd stabil. Realisztikusabb, mint Gordon.',
    category: 'Részvények'
  },
  {
    id: '31',
    term: 'Free Cash Flow to Equity (FCFE)',
    definition: 'Részvényesek rendelkezésére álló cash flow. FCFE = Nettó jövedelem + Értékcsökkenés - Capex - ΔNet Working Capital + Nettó hitelfelvétel.',
    category: 'Részvények'
  },
  {
    id: '32',
    term: 'FCFE Diszkontálás',
    definition: 'Hasonló DDM-hez, de FCFE-t használ osztalék helyett. Rugalmasabb, nem-osztalékfizető vállalatokra is.',
    category: 'Részvények'
  },
  {
    id: '33',
    term: 'CAPM (Capital Asset Pricing Model)',
    definition: 'Részvény hozamelvárása. E(R) = Rf + β[E(Rm) - Rf]. Rf=kockázatmentes, β=szisztematikus kockázat, Rm=piaci hozam.',
    category: 'Kockázat és Hozam'
  },
  {
    id: '34',
    term: 'Béta (β) Számítása',
    definition: 'β = Cov(Ri, Rm) / Var(Rm). Részvény és piac közös mozgása / piaci variancia. Regresszióval becsülhető.',
    category: 'Kockázat és Hozam'
  },
  {
    id: '35',
    term: 'Kockázatmentes Ráta',
    definition: 'Elméleti hozam kockázat nélkül. Gyakorlatban: állampapír hozam (US Treasury). Időhorizonthoz illeszkedő futamidő.',
    category: 'Kockázat és Hozam'
  },
  {
    id: '36',
    term: 'Piaci Kockázati Prémium',
    definition: 'E(Rm) - Rf. Történelmileg ~6-8% USA-ban. Országonként és időszakonként változik.',
    category: 'Kockázat és Hozam'
  },
  {
    id: '37',
    term: 'Szórás és Variancia',
    definition: 'Hozamok változékonyságának mérőszámai. Variancia = σ². Szórás = σ. Magasabb = kockázatosabb.',
    category: 'Kockázat Mérés'
  },
  {
    id: '38',
    term: 'Sharpe Ráta Képlete',
    definition: 'Sharpe = (Rp - Rf) / σp. Többlethozam / volatilitás. Minél magasabb, annál jobb kockázat-korrigált hozam.',
    category: 'Kockázat Mérés'
  },
  {
    id: '39',
    term: 'Kovariancia',
    definition: 'Két eszköz közös mozgásának mértéke. Cov(A,B) > 0: együtt mozognak, < 0: ellentétes, = 0: független.',
    category: 'Portfólió Elmélet'
  },
  {
    id: '40',
    term: 'Korreláció',
    definition: 'Standardizált kovariancia, -1 és +1 között. ρ = Cov(A,B) / (σA × σB). Diverzifikációhoz alacsony korreláció kell!',
    category: 'Portfólió Elmélet'
  },
  {
    id: '41',
    term: 'Portfólió Hozam',
    definition: 'Súlyozott átlag. E(Rp) = Σ[wi × E(Ri)]. ahol wi = súly i eszköznél. Lineáris!',
    category: 'Portfólió Elmélet'
  },
  {
    id: '42',
    term: 'Portfólió Volatilitás',
    definition: 'σp² = ΣΣ[wi × wj × Cov(i,j)]. Nem lineáris! Diverzifikáció csökkenti. Kulcs a kovariancia.',
    category: 'Portfólió Elmélet'
  },
  {
    id: '43',
    term: 'Optimális Portfólió',
    definition: 'Markowitz optimalizáció. Minimize: σp². Constraint: E(Rp) = célhozam. Kvadratikus programozás.',
    category: 'Portfólió Elmélet'
  },
  {
    id: '44',
    term: 'Hatékony Frontier',
    definition: 'Minden legjobb kockázat-hozam kombináció. Bármely pont rajta = hatékony portfólió. Alatta = szuboptimális.',
    category: 'Portfólió Elmélet'
  },
  {
    id: '45',
    term: 'Tőkepiaci Egyenes (CML)',
    definition: 'Capital Market Line. Rf-től a piaci portfólión át. Slope = Sharpe ratio. Hatékony portfóliók kockázatmentes befektetéssel.',
    category: 'Portfólió Elmélet'
  },
  {
    id: '46',
    term: 'Értékpapír Piaci Egyenes (SML)',
    definition: 'Security Market Line. CAPM grafikus ábrázolása. X tengely: β, Y: E(R). Minden eszköznek rajta kell lennie!',
    category: 'CAPM'
  },
  {
    id: '47',
    term: 'Alfa Kiszámítása',
    definition: 'α = Tényleges hozam - CAPM által várt hozam. α > 0 = alulértékelt / kiváló menedzsment. α < 0 = túlértékelt.',
    category: 'CAPM'
  },
  {
    id: '48',
    term: 'Szisztematikus vs Unsystematic',
    definition: 'Szisztematikus (piaci) kockázat: nem diverzifikálható. Unsystematic (specifikus): diverzifikálható. CAPM csak szisztematikust díjazza!',
    category: 'Kockázat Felbontás'
  },
  {
    id: '49',
    term: 'R² (R-Squared)',
    definition: 'Hozamváltozás hány %-a magyarázható a piaccal. R²=1: tökéletes kapcsolat. R²=0: független. Diverzifikáció mértéke.',
    category: 'Regresszió'
  },
  {
    id: '50',
    term: 'Opció Alapok',
    definition: 'Call opció: jog vásárlásra. Put opció: jog eladásra. Nem kötelezettség! Prémiumot fizetünk a jogért.',
    category: 'Opciók'
  },
  {
    id: '51',
    term: 'Opció Belső Értéke',
    definition: 'Call: Max(0, S-K). Put: Max(0, K-S). S=árfolyam, K=strike. Belső érték ≥ 0.',
    category: 'Opciók'
  },
  {
    id: '52',
    term: 'Időérték (Time Value)',
    definition: 'Opció ár - Belső érték. Volatilitásból és hátralévő időből származik. Lejáratkor = 0.',
    category: 'Opciók'
  },
  {
    id: '53',
    term: 'Opció Moneyness',
    definition: 'ITM (In-the-Money): gyakorolható profittal. ATM (At-the-Money): S=K. OTM (Out-of-the-Money): nincs belső érték.',
    category: 'Opciók'
  },
  {
    id: '54',
    term: 'Black-Scholes Modell',
    definition: 'Nobel-díjas opciós árazási modell. Feltételek: európai opció, nincs osztalék, állandó volatilitás és kamatláb.',
    category: 'Opció Árazás'
  },
  {
    id: '55',
    term: 'Black-Scholes Képlet',
    definition: 'C = S×N(d1) - K×e^(-rT)×N(d2). Komplex képlet 5 inputtal: S, K, T, r, σ. Gyakorlatban számológép vagy Excel.',
    category: 'Opció Árazás'
  },
  {
    id: '56',
    term: 'Implied Volatility',
    definition: 'A volatilitás, amely B-S-ben az opció piaci árát adja. "Piac várja" a volatilitást. VIX index ezt méri.',
    category: 'Opció Árazás'
  },
  {
    id: '57',
    term: 'Delta (Δ)',
    definition: 'Opció árának változása részvényár 1 egység változására. Call: 0 és 1 között. Put: 0 és -1 között. Hedge rátio.',
    category: 'Option Greeks'
  },
  {
    id: '58',
    term: 'Gamma (Γ)',
    definition: 'Delta változásának mértéke. Második derivált. ATM opcióknál legnagyobb. Convexity opciókban.',
    category: 'Option Greeks'
  },
  {
    id: '59',
    term: 'Theta (Θ)',
    definition: 'Időérték csökkenése naponta. Mindig negatív (opció vevőre). ATM legnagyobb. "Time decay".',
    category: 'Option Greeks'
  },
  {
    id: '60',
    term: 'Vega (ν)',
    definition: 'Opció ár érzékenysége volatilitásra. Hosszú futamidejű és ATM opciók legérzékenyebbek. Nem görög betű!',
    category: 'Option Greeks'
  },
  {
    id: '61',
    term: 'Rho (ρ)',
    definition: 'Kamatláb érzékenység. Gyakorlatban kevésbé fontos (kamatok stabilak). Hosszú futamidejű opciókban nagyobb.',
    category: 'Option Greeks'
  },
  {
    id: '62',
    term: 'Put-Call Parity',
    definition: 'C - P = S - K×e^(-rT). Arbitrázs mentes összefüggés európai opciókra. Ha sérül, arbitrázs lehetőség!',
    category: 'Opció Paritás'
  },
  {
    id: '63',
    term: 'Binomiális Opció Modell',
    definition: 'Diszkrét idejű modell. Ár felfelé (u) vagy lefelé (d) mozoghat. Rekurzív diszkontálás. Amerikai opciókra is használható.',
    category: 'Opció Árazás'
  },
  {
    id: '64',
    term: 'Kockázat-Semleges Értékelés',
    definition: 'Opció árazás kockázat-semleges valószínűségekkel. q = (e^(rΔt) - d) / (u - d). Matematikai trükk, nem tényleges valószínűségek!',
    category: 'Opció Árazás'
  },
  {
    id: '65',
    term: 'Monte Carlo Szimuláció',
    definition: 'Árfolyam-utak szimulálása véletlenszámokkal. Opció kifizetés átlaga diszkontálva. Komplex opciókhoz (exotics).',
    category: 'Opció Árazás'
  },
  {
    id: '66',
    term: 'Brownian Motion',
    definition: 'dS = μS×dt + σS×dW. Részvényár sztochasztikus differenciálegyenlete. Black-Scholes feltételezése.',
    category: 'Sztochasztikus Kalkulus'
  },
  {
    id: '67',
    term: 'Ito Lemma',
    definition: 'Sztochasztikus folyamatok függvényeinek differenciálása. Black-Scholes levezetésének kulcsa. Haladó matematika!',
    category: 'Sztochasztikus Kalkulus'
  },
  {
    id: '68',
    term: 'Value at Risk (VaR)',
    definition: 'Maximális veszteség meghatározott konfidenciaszinten és időtávon. Pl: 95% VaR = $1M egy napon. Kockázat menedzsment eszköz.',
    category: 'Kockázat Menedzsment'
  },
  {
    id: '69',
    term: 'VaR Számítási Módszerek',
    definition: 'Historikus: múltbeli adatok. Variancia-kovariancia: normál eloszlás feltételezés. Monte Carlo: szimulációk. Mindnek vannak korlátai!',
    category: 'Kockázat Menedzsment'
  },
  {
    id: '70',
    term: 'Conditional VaR (CVaR)',
    definition: 'Expected Shortfall. Várható veszteség VaR túllépése esetén. "Tail risk" mérése. Jobbkoherens kockázati mérőszám.',
    category: 'Kockázat Menedzsment'
  },
  {
    id: '71',
    term: 'Normál Eloszlás',
    definition: 'Haranggörbe. μ (átlag) és σ (szórás) jellemzi. Sok pénzügyi modell feltételezi. Valójában fat tails a piacokon!',
    category: 'Statisztika'
  },
  {
    id: '72',
    term: 'Lognormális Eloszlás',
    definition: 'Részvényárak feltételezett eloszlása. Log(S) normális. Biztosítja S > 0. Black-Scholes feltételezése.',
    category: 'Statisztika'
  },
  {
    id: '73',
    term: 'Fat Tails',
    definition: 'Extrém események gyakoribbak, mint normál eloszlás sugallná. Piaci összeomlások. VaR alábecsüli a kockázatot!',
    category: 'Statisztika'
  },
  {
    id: '74',
    term: 'Kurtosis és Skewness',
    definition: 'Kurtosis: eloszlás csúcsossága, fat tails. Skewness: aszimmetria. Normál: mindkettő 0. Piacok: pozitív kurtosis, negatív skew.',
    category: 'Statisztika'
  },
  {
    id: '75',
    term: 'Központi Határeloszlás Tétel',
    definition: 'Sok független változó összege normális eloszlású. Portfólió diverzifikáció matematikai alapja.',
    category: 'Statisztika'
  },
  {
    id: '76',
    term: 'Regresszió Analízis',
    definition: 'Y = α + βX + ε. Kapcsolat két változó között. Béta számításhoz: részvény hozam vs piaci hozam.',
    category: 'Statisztika'
  },
  {
    id: '77',
    term: 'Multifaktor Modellek',
    definition: 'Fama-French: piac, méret (SMB), érték (HML). Később momentum, minőség. CAPM kiterjesztése.',
    category: 'Faktor Modellek'
  },
  {
    id: '78',
    term: 'APT (Arbitrage Pricing Theory)',
    definition: 'Stephen Ross modellje. Többfaktoros alternativája CAPM-nek. E(R) = Rf + Σ[βi × λi]. Rugalmasabb, de faktorok nem egyértelműek.',
    category: 'Faktor Modellek'
  },
  {
    id: '79',
    term: 'Hatékony Piac Hipotézis',
    definition: 'Gyenge: technika nem működik. Félerős: fundamental nem működik. Erős: insider info beárazódik. Vitatott!',
    category: 'Piaci Hatékonyság'
  },
  {
    id: '80',
    term: 'Random Walk',
    definition: 'Árfolyamok véletlen bolyongás. Múltbeli árak nem jelzik jövőt. EMH implikációja. De: anomáliák léteznek!',
    category: 'Piaci Hatékonyság'
  },
  {
    id: '81',
    term: 'Martingale',
    definition: 'E[St+1 | St] = St. Jövőbeli ár várható értéke = mai ár. Tisztességes játék. Kockázat-semleges árazásban kulcsfogalom.',
    category: 'Sztochasztikus Folyamatok'
  },
  {
    id: '82',
    term: 'Mean Reversion',
    definition: 'Árak visszatérnek átlaghoz. Ellentéte a random walk-nak. Ornstein-Uhlenbeck folyamat. Kamatlábmodellekben.',
    category: 'Sztochasztikus Folyamatok'
  },
  {
    id: '83',
    term: 'GARCH Modell',
    definition: 'Generalized Autoregressive Conditional Heteroscedasticity. Volatilitás klaszterezés modellezése. "Magas vol után magas vol".',
    category: 'Volatilitás Modellek'
  },
  {
    id: '84',
    term: 'Stochastic Volatility',
    definition: 'Volatilitás is sztochasztikus folyamat (nem állandó). Heston modell. Reálisabb, de bonyolultabb.',
    category: 'Volatilitás Modellek'
  },
  {
    id: '85',
    term: 'Copula',
    definition: 'Többváltozós eloszlások modellezése. Marginális eloszlások és függőségi struktúra szétválasztása. CDO árazásban használták (2008).',
    category: 'Fejlett Témák'
  },
  {
    id: '86',
    term: 'Jump Diffusion',
    definition: 'Folyamatos diffúzió + véletlenszerű ugrások. Robert Merton modellje. Realisztikusabb, mint puszta Brownian motion.',
    category: 'Fejlett Témák'
  },
  {
    id: '87',
    term: 'Lévy Process',
    definition: 'Általánosítása Brownian motion-nek. Stabil eloszlás, végtelen variancia lehetséges. Fat tails modellezése.',
    category: 'Fejlett Témák'
  },
  {
    id: '88',
    term: 'Kamatláb Modellek',
    definition: 'Vasicek, Cox-Ingersoll-Ross (CIR), Hull-White. Kamatláb dinamikáját modellezik. Kötvény derivatives árazásához.',
    category: 'Kamat Modellek'
  },
  {
    id: '89',
    term: 'HJM Framework',
    definition: 'Heath-Jarrow-Morton. Forward rate modellek általános kerete. Arbitrázsmentes feltétel. Gyakorlati implementáció nehéz.',
    category: 'Kamat Modellek'
  },
  {
    id: '90',
    term: 'Credit Default Swap (CDS)',
    definition: 'Hitelkockázat biztosítása. Prémium fizetése csőd elleni védelemért. CDS spread = hitelkockázat piaci ára.',
    category: 'Hitel Kockázat'
  },
  {
    id: '91',
    term: 'Credit Rating Migration',
    definition: 'Besorolás változásának valószínűsége. Átmeneti mátrix. Kockázat: downgrade. Credit VaR számításához.',
    category: 'Hitel Kockázat'
  },
  {
    id: '92',
    term: 'Merton Strukturális Modell',
    definition: 'Vállalat eszközei opcióként. Csőd: eszközök < adósság. Equity = call opció az eszközökön.',
    category: 'Hitel Kockázat'
  },
  {
    id: '93',
    term: 'Reduced Form Modellek',
    definition: 'Csőd intenzitási folyamat. Jarrow-Turnbull. Nem magyarázza miért, csak modellezi mikor.',
    category: 'Hitel Kockázat'
  },
  {
    id: '94',
    term: 'Kelly Kritérium',
    definition: 'Optimális fogadási méret. f* = (p×b - q) / b. ahol p=nyerési esély, b=odds, q=1-p. Túl agresszív gyakorlatban!',
    category: 'Portfólió Optimalizáció'
  },
  {
    id: '95',
    term: 'Black-Litterman',
    definition: 'Markowitz optimalizáció fejlesztése. Piaci egyensúly + befektetői nézetek. Stabilabb súlyok. Goldman Sachs fejlesztette.',
    category: 'Portfólió Optimalizáció'
  },
  {
    id: '96',
    term: 'Risk Parity',
    definition: 'Kockázat-hozzájárulás alapú allokáció. Minden eszköz azonos kockázatot visz a portfólióba. Σ[wi × σi × ρi,p] = konstans.',
    category: 'Portfólió Optimalizáció'
  },
  {
    id: '97',
    term: 'Maximum Sharpe Ratio',
    definition: 'Portfólió optimalizálása Sharpe ratio maximalizálására. Tangencia portfólió a hatékony frontieron. CML érintője.',
    category: 'Portfólió Optimalizáció'
  },
  {
    id: '98',
    term: 'Minimum Variance',
    definition: 'Legkisebb volatilitású portfólió hatékony frontieron. Nincs hozamcél, csak kockázatminimalizálás.',
    category: 'Portfólió Optimalizáció'
  },
  {
    id: '99',
    term: 'Robust Optimalizáció',
    definition: 'Becslési bizonytalanság figyelembevétele. Worst-case optimalizálás. Stabilabb megoldás, kevésbé extrém súlyok.',
    category: 'Portfólió Optimalizáció'
  },
  {
    id: '100',
    term: 'Összefoglalás: Pénzügyi Matematika',
    definition: 'A pénzügyi matematika eszközöket ad pontos árazáshoz, kockázatméréshez, optimális döntésekhez. Kulcsfogalmak: pénz időértéke, kockázat-hozam, opció árazás, portfólió optimalizáció. Megértés előny, de ne felejtsük: "minden modell téved, néhány hasznos"!',
    category: 'Összefoglalás'
  }
];
