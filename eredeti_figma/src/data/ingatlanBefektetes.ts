import { BookViewTerm } from '../components/StandaloneBookView';

export const ingatlanBefektetesData: BookViewTerm[] = [
  {
    id: '1',
    term: 'Ingatlanbefektetés Alapjai',
    definition: 'Fizikai eszköz, kézzelfogható. Bérleti bevétel + értéknövekedés. Inflation hedge. "Real" estate - real value.',
    category: 'Bevezetés'
  },
  {
    id: '2',
    term: 'Miért Ingatlan?',
    definition: 'Tangible asset, passive income, tax benefits, leverage lehetőség, inflation protection. Diversification stocks-ból.',
    category: 'Bevezetés'
  },
  {
    id: '3',
    term: 'Ingatlantípusok',
    definition: 'Residential (lakás, ház), commercial (iroda, retail), industrial (raktár), földterület. Mindegyik más stratégia.',
    category: 'Típusok'
  },
  {
    id: '4',
    term: 'Residential Real Estate',
    definition: 'Lakóingatlan. Legkönyebb belépés. Single-family, multi-family, condo. Stabil bérlői piac.',
    category: 'Típusok'
  },
  {
    id: '5',
    term: 'Commercial Real Estate',
    definition: 'Üzleti ingatlan. Office, retail, hospitality. Magasabb returns, de több kockázat. Hosszabb bérletek.',
    category: 'Típusok'
  },
  {
    id: '6',
    term: 'Multi-Family Properties',
    definition: '5+ egységes épület. Jobb cash flow, diverzifikált bérlői kockázat. Legjobb kezdőknek apartments.',
    category: 'Típusok'
  },
  {
    id: '7',
    term: 'Location, Location, Location!',
    definition: '№1 szabály! Jó location rossz ház > rossz location jó ház. Neighborhood, schools, transport, fejlesztések.',
    category: 'Lokáció'
  },
  {
    id: '8',
    term: 'Emerging Markets',
    definition: 'Developing neighborhoods. Olcsóbb vásárlás, nagyobb appreciation potential. De higher risk! Gentrification watch.',
    category: 'Lokáció'
  },
  {
    id: '9',
    term: 'Walkability és Amenities',
    definition: 'Walk score magas = jobb bérelhető. Közeli: boltok, éttermek, parkok, tömegközlekedés. Bérlők értékelik!',
    category: 'Lokáció'
  },
  {
    id: '10',
    term: 'Cash Flow',
    definition: 'Bérleti bevétel - költségek (mortgage, property tax, insurance, maintenance). Pozitív cash flow = jó! Negatív = probléma.',
    category: 'Pénzügyek'
  },
  {
    id: '11',
    term: '1% Szabály',
    definition: 'Havi bérleti bevétel ≥ 1% vásárlási árnak. $200k ház → $2k/hó rent. Quick filter, nem perfect.',
    category: 'Pénzügyek'
  },
  {
    id: '12',
    term: 'Cap Rate - Capitalization Rate',
    definition: 'NOI / Property value. Magasabb cap rate = magasabb yield, de maybe magasabb risk. 5-10% commercial-nél.',
    category: 'Pénzügyek'
  },
  {
    id: '13',
    term: 'NOI - Net Operating Income',
    definition: 'Rental income - operating expenses (no mortgage). Used cap rate számításhoz. Key metric!',
    category: 'Pénzügyek'
  },
  {
    id: '14',
    term: 'Cash-on-Cash Return',
    definition: 'Éves cash flow / befektetett cash. 20% down payment, pozitív cash flow: maybe 8-12% CoC return.',
    category: 'Pénzügyek'
  },
  {
    id: '15',
    term: 'ROI - Return on Investment',
    definition: '(Profit - Költségek) / Összes befektetés. Átfogó metrika, figyelembe veszi appreciation-t is.',
    category: 'Pénzügyek'
  },
  {
    id: '16',
    term: 'Financing - Mortgage',
    definition: 'Leverage! 20% down, bank finanszírozza 80%-ot. 5x leverage. Double-edged: amplify returns ÉS losses.',
    category: 'Finanszírozás'
  },
  {
    id: '17',
    term: 'Mortgage Típusok',
    definition: 'Fixed-rate (30yr, 15yr): stabil payment. Adjustable-rate (ARM): kezdetben alacsony, később változik. Most environment: fixed jobb.',
    category: 'Finanszírozás'
  },
  {
    id: '18',
    term: 'Down Payment Stratégiák',
    definition: 'Conventional: 20%. FHA: 3.5% (owner-occupied). Investment: 20-25% minimum. Magasabb down = jobb rates.',
    category: 'Finanszírozás'
  },
  {
    id: '19',
    term: 'Debt Service Coverage Ratio',
    definition: 'DSCR = NOI / Debt payments. Lenders want >1.25. Példa: $15k NOI, $10k debt → 1.5 DSCR. Good!',
    category: 'Finanszírozás'
  },
  {
    id: '20',
    term: 'Cash Purchase vs Financing',
    definition: 'All-cash: nincs kamat, gyorsabb closing, competitív. Financing: leverage, capital efficiency több property-re.',
    category: 'Finanszírozás'
  },
  {
    id: '21',
    term: 'Rental Income Streams',
    definition: 'Long-term renters (12+ hó bérletek), short-term (Airbnb), commercial leases (multi-year). Mindegyik más management.',
    category: 'Bérleti Stratégiák'
  },
  {
    id: '22',
    term: 'Long-Term Rentals',
    definition: 'Stabil, predictable income. Kevesebb management. Bérlő screening fontos. 12 hónapos bérletek standard.',
    category: 'Bérleti Stratégiák'
  },
  {
    id: '23',
    term: 'Short-Term Rentals (Airbnb)',
    definition: 'Magasabb bevétel potenciál, de több munka. Furnishing, cleaning, marketing. Regulation check helyben!',
    category: 'Bérleti Stratégiák'
  },
  {
    id: '24',
    term: 'Tenant Screening',
    definition: 'Credit check, income verification (3x rent), references, background. Jó bérlő = peace of mind. Ne siess!',
    category: 'Bérleti Stratégiák'
  },
  {
    id: '25',
    term: 'Property Management',
    definition: 'Self-manage vagy PM company? PM: 8-12% rent, de hassle-free. Self: több profit, több munka. Scale függvénye.',
    category: 'Management'
  },
  {
    id: '26',
    term: 'Maintenance és Repairs',
    definition: 'Budget 1-2% property értékének yearly. Emergency fund: 3-6 hó expenses. AC breaks → kész $5k.',
    category: 'Management'
  },
  {
    id: '27',
    term: 'CapEx - Capital Expenditures',
    definition: 'Nagyobb felújítások: tető, fűtés, AC. Budget 5-10% rental income-ból. Elkerülhetetlen long-term!',
    category: 'Management'
  },
  {
    id: '28',
    term: 'Vacancy Rate',
    definition: 'Empty unit time. Budget 5-10% income loss vacancy-hez. Location dependent. Jó location → alacsonyabb.',
    category: 'Management'
  },
  {
    id: '29',
    term: 'Eviction Process',
    definition: 'Nightmare, de sometimes szükséges. Expensive, időigényes. State laws különböznek. Jó screening prevent!',
    category: 'Management'
  },
  {
    id: '30',
    term: 'BRRRR Stratégia',
    definition: 'Buy, Rehab, Rent, Refinance, Repeat. Fix & flip alternatívája. Build portfolio leverage-zel. Recycled capital.',
    category: 'Stratégiák'
  },
  {
    id: '31',
    term: 'House Flipping',
    definition: 'Vásárlás, felújítás, eladás profit-ért. Gyors return, de risky! Market timing, renovation budget kritikus.',
    category: 'Stratégiák'
  },
  {
    id: '32',
    term: 'Buy and Hold',
    definition: 'Long-term appreciation + rental income. Legjobb wealth building stratégia. Compound idővel. Patience!',
    category: 'Stratégiák'
  },
  {
    id: '33',
    term: 'Wholesaling',
    definition: 'Contract-ot adsál el investor-nek. Nem purchase maga. Low capital szükséges. Deal finding skill.',
    category: 'Stratégiák'
  },
  {
    id: '34',
    term: 'Value-Add Investing',
    definition: 'Vásárlás alulteljesítő property, improvements → bérleti növelés / eladás. Forced appreciation.',
    category: 'Stratégiák'
  },
  {
    id: '35',
    term: 'Tax Benefits - Depreciation',
    definition: 'Residential property: 27.5 év depreciation. Csökkent taxable income! Nem cash expense, hanem paper loss.',
    category: 'Adózás'
  },
  {
    id: '36',
    term: 'Mortgage Interest Deduction',
    definition: 'Mortgage kamat leírható. Csökkenti tax burden. Investment property-re is, de limitáltan.',
    category: 'Adózás'
  },
  {
    id: '37',
    term: '1031 Exchange',
    definition: 'Tax-deferred swap: eladsz property, veszed másikat 180 napon belül. Capital gains tax elhalasztva. Wealth building tool!',
    category: 'Adózás'
  },
  {
    id: '38',
    term: 'Property Tax',
    definition: 'Yearly tax helyi government-nek. 0.5-2% property értékének (location dependent). Bérlő nem fizeti - TE!',
    category: 'Adózás'
  },
  {
    id: '39',
    term: 'Passive Loss Limitations',
    definition: 'Rental losses offset csak passive income-ot (általában). $25k exception ha actively participate. CPA tanács!',
    category: 'Adózás'
  },
  {
    id: '40',
    term: 'Real Estate Market Cycles',
    definition: 'Recovery → Expansion → Hyper Supply → Recession. 10-15 év ciklus. Buy low (recovery/early expansion), ne csúcson!',
    category: 'Piaci Ciklusok'
  },
  {
    id: '41',
    term: 'Leading Indicators',
    definition: 'Kamatláb, employment, new construction permits, inventory levels. Watch Fed! Rate cuts = bullish real estate.',
    category: 'Piaci Ciklusok'
  },
  {
    id: '42',
    term: 'Housing Bubble Warning',
    definition: '2008 tanulság: túlzott appreciation, easy credit, speculation. Sustainable growth: ~3-5% évente, nem 20%!',
    category: 'Piaci Ciklusok'
  },
  {
    id: '43',
    term: 'Recession és Ingatlan',
    definition: 'Prices csökkenhetnek! De: good cash flow properties survive. Jó location kevésbé szenved. Cash flow > speculation!',
    category: 'Piaci Ciklusok'
  },
  {
    id: '44',
    term: 'REITs - Real Estate Investment Trusts',
    definition: 'Részvényként kereskedhető ingatlan portfoliók. Likviditás, diverzifikáció, alacsony belépés. Alternative physical property-hez.',
    category: 'Alternatívák'
  },
  {
    id: '45',
    term: 'REIT Típusok',
    definition: 'Equity REITs (own properties), Mortgage REITs (financing), Hybrid. Residential, commercial, healthcare, stb.',
    category: 'Alternatívák'
  },
  {
    id: '46',
    term: 'REIT Dividends',
    definition: 'REITs kötelesek kifizetni 90% taxable income-ot. High dividend yields (4-8%). Good passive income source.',
    category: 'Alternatívák'
  },
  {
    id: '47',
    term: 'Real Estate Crowdfunding',
    definition: 'Fundrise, RealtyMogul. Alacsony minimum ($500-$5k). Accesibility, de illiquidity és fees. Emerging space.',
    category: 'Alternatívák'
  },
  {
    id: '48',
    term: 'Syndication',
    definition: 'Pool money más investor-okkal large commercial property-re. Passive investor vagy sponsor. Magasabb minimumok ($25k+).',
    category: 'Alternatívák'
  },
  {
    id: '49',
    term: 'Due Diligence - Inspection',
    definition: 'Professional inspection! Foundation, roof, plumbing, electric, HVAC. $300-500, de megéri. Deal breaker discovery?',
    category: 'Vásárlási Folyamat'
  },
  {
    id: '50',
    term: 'Appraisal',
    definition: 'Professional értékbecslés. Lender requirement. Ha appraisal < offer → renegotiate vagy walk away.',
    category: 'Vásárlási Folyamat'
  },
  {
    id: '51',
    term: 'Title Search',
    definition: 'Ownership history check. Liens, encumbrances? Title insurance véd. Ne skip!',
    category: 'Vásárlási Folyamat'
  },
  {
    id: '52',
    term: 'Earnest Money',
    definition: 'Good faith deposit offer-kor. 1-3% purchase price. Escrow-ban. Refundable contingencies alapján.',
    category: 'Vásárlási Folyamat'
  },
  {
    id: '53',
    term: 'Closing Costs',
    definition: '2-5% purchase price. Title fees, appraisal, inspections, loan origination, stb. Budget ezeket!',
    category: 'Vásárlási Folyamat'
  },
  {
    id: '54',
    term: 'Comparative Market Analysis (CMA)',
    definition: 'Comparable sales area-ban. Realtor provides. Pricing guidance vásárláshoz vagy eladáshoz. Data-driven!',
    category: 'Értékelés'
  },
  {
    id: '55',
    term: 'Rental Comps',
    definition: 'Hasonló properties rental rates. Zillow, Rentometer. Expected income estimate. Be realistic!',
    category: 'Értékelés'
  },
  {
    id: '56',
    term: 'ARV - After Repair Value',
    definition: 'Estimated value felújítás után. Flipping-nél és BRRRR-nél kritikus. Conservative estimates!',
    category: 'Értékelés'
  },
  {
    id: '57',
    term: '70% Rule (Flipping)',
    definition: 'Max purchase price = 70% × ARV - Repair costs. Built-in profit margin. Példa: ARV $200k, repairs $30k → max buy $110k.',
    category: 'Értékelés'
  },
  {
    id: '58',
    term: 'Repair Estimation',
    definition: 'Get 3 contractor quotes! Buffer 10-20% overruns-hoz. Unexpected mindig van. Scope creep real!',
    category: 'Felújítás'
  },
  {
    id: '59',
    term: 'High-ROI Renovations',
    definition: 'Kitchen, bathrooms, curb appeal, paint. Bang for buck! Fancy upgrades nem mindig return értéket.',
    category: 'Felújítás'
  },
  {
    id: '60',
    term: 'Contractor Management',
    definition: 'Licensed, insured, references. Written contract, payment schedule (milestones). Communication fontos!',
    category: 'Felújítás'
  },
  {
    id: '61',
    term: 'Insurance - Landlord Policy',
    definition: 'Different than homeowner insurance! Liability coverage, property damage, loss of rental income. Shop around!',
    category: 'Kockázat Kezelés'
  },
  {
    id: '62',
    term: 'Umbrella Insurance',
    definition: 'Extra liability protection ($1M+). Lawsuit protection. Multiple properties? KELL!',
    category: 'Kockázat Kezelés'
  },
  {
    id: '63',
    term: 'LLC Formation',
    definition: 'Limited Liability Company. Asset protection, separates personal from business. Tax benefits. Lawyer consultation!',
    category: 'Kockázat Kezelés'
  },
  {
    id: '64',
    term: 'Emergency Fund',
    definition: '3-6 hó expenses per property. HVAC dies, roof leaks, tenant bounces. Cash reserve = peace of mind.',
    category: 'Kockázat Kezelés'
  },
  {
    id: '65',
    term: 'Networking - Real Estate Clubs',
    definition: 'Local investor meetups. Networking, deals, contractor recommendations, learning. Invaluable resource!',
    category: 'Közösség'
  },
  {
    id: '66',
    term: 'Finding Deals',
    definition: 'MLS (Zillow), off-market (direct mail, driving for dollars), foreclosures, auctions, wholesalers, pocket listings.',
    category: 'Deal Finding'
  },
  {
    id: '67',
    term: 'Direct Mail Campaigns',
    definition: 'Target distressed owners: tax liens, probate, divorces. Low response (1-3%), de quality leads. Persistence!',
    category: 'Deal Finding'
  },
  {
    id: '68',
    term: 'Foreclosures és Short Sales',
    definition: 'Discount opportunities, de complicated. Foreclosure: bank owned. Short sale: bank approval kell. Patience szükséges!',
    category: 'Deal Finding'
  },
  {
    id: '69',
    term: 'Scaling Portfolio',
    definition: 'Kezdés: 1 property. Refinance vagy cash flow → következő. Compound idővel. 10+ properties = serious income.',
    category: 'Portfolio Építés'
  },
  {
    id: '70',
    term: 'Geographic Diversification',
    definition: 'Multiple markets csökkent local economy risk. De: harder manage. Balance access vs diversification.',
    category: 'Portfolio Építés'
  },
  {
    id: '71',
    term: 'Asset Class Mix',
    definition: 'Residential + commercial. Single-family + multi-family. Diverzifikált income streams. Different cycle exposures.',
    category: 'Portfolio Építés'
  },
  {
    id: '72',
    term: 'Exit Strategies',
    definition: 'Sell (appreciation), 1031 exchange, pass to heirs (step-up basis), refinance (pull equity). Flexibility!',
    category: 'Exit Planning'
  },
  {
    id: '73',
    term: 'Seller Financing',
    definition: 'Owner carries mortgage. Eladó = bank. Flexibility terms-ben. Magasabb interest általában, de accessibility.',
    category: 'Kreatív Finanszírozás'
  },
  {
    id: '74',
    term: 'Subject-To Deals',
    definition: 'Átveszed property existing mortgage alatt (seller nevében marad). Risky legal-ly, de lehetséges creative finance.',
    category: 'Kreatív Finanszírozás'
  },
  {
    id: '75',
    term: 'Pszichológia: Patience',
    definition: 'Jó deal finding időt vesz igénybe. Ne settle rossz property-re! Wait a jó opportunity-re. "Hurry up and wait."',
    category: 'Pszichológia'
  },
  {
    id: '76',
    term: 'Pszichológia: Emotional Attachment',
    definition: 'Ez nem otthon, ez befektetés! Numbers-based döntések, ne érzelmek. Szép ≠ profitable.',
    category: 'Pszichológia'
  },
  {
    id: '77',
    term: 'Pszichológia: Analysis Paralysis',
    definition: 'Túl sok elemzés → soha nem vásárolsz. Calculate risk, de aztán action! "Done better than perfect."',
    category: 'Pszichológia'
  },
  {
    id: '78',
    term: 'Összefoglalás: Ingatlan Siker',
    definition: 'Location kritikus! Cash flow > appreciation speculation. Conservative underwriting. Financing = leverage, de ne túlzás. Tenant screening fontos. Maintenance és CapEx budget. Tax benefits maximalizálása. Market cycle awareness. Due diligence alapos! Emergency fund. Scaling türelmesen. Networking és education. Numbers-driven, nem emotional. Long-term wealth building - patience és fegyelem! Ingatlan tangible, inflation hedge, passive income. De management és capital szükséges. Diversification stocks-ból. Start small, learn, scale!',
    category: 'Összefoglalás'
  }
];
