import { BookViewTerm } from '../components/StandaloneBookView';

export const kotvenyekData: BookViewTerm[] = [
  {
    id: '1',
    term: 'Kötvény',
    definition: 'Hitelviszonyt megtestesítő értékpapír. A kibocsátó kölcsönt vesz fel, a befektető rendszeres kamatot kap.',
    category: 'Alapfogalmak'
  },
  {
    id: '2',
    term: 'Névérték',
    definition: 'Face value - a kötvény eredeti kibocsátási értéke, amit lejáratkor visszafizetnek.',
    category: 'Alapfogalmak'
  },
  {
    id: '3',
    term: 'Kuponráta',
    definition: 'Az éves kamat mértéke a névértékhez viszonyítva százalékban.',
    category: 'Kamat'
  },
  {
    id: '4',
    term: 'Kupon',
    definition: 'A rendszeresen kifizetett kamat. Lehet féléves, negyedéves vagy éves.',
    category: 'Kamat'
  },
  {
    id: '5',
    term: 'Zéró kuponos kötvény',
    definition: 'Nem fizet rendszeres kamatot, diszkontált áron bocsátják ki.',
    category: 'Kötvénytípusok'
  },
  {
    id: '6',
    term: 'Állampapír',
    definition: 'Government bond - állam által kibocsátott kötvény. Általában alacsony kockázatú.',
    category: 'Kötvénytípusok'
  },
  {
    id: '7',
    term: 'Vállalati kötvény',
    definition: 'Corporate bond - vállalat által kibocsátott. Magasabb hozam, magasabb kockázat.',
    category: 'Kötvénytípusok'
  },
  {
    id: '8',
    term: 'Hitelminősítés',
    definition: 'Rating - kibocsátó hitelképességének értékelése (AAA, AA, A, BBB, stb.).',
    category: 'Minősítés'
  },
  {
    id: '9',
    term: 'Lejárat',
    definition: 'Maturity - amikor a kibocsátó visszafizeti a névértéket.',
    category: 'Időbeliség'
  },
  {
    id: '10',
    term: 'Duration',
    definition: 'A kötvény kamatlábérzékenységének mértéke években. Kockázati mutató.',
    category: 'Kockázat'
  },
  {
    id: '11',
    term: 'Yield to maturity (YTM)',
    definition: 'Lejáratig tartott kötvény várható éves hozama.',
    category: 'Hozam'
  },
  {
    id: '12',
    term: 'Hozamgörbe',
    definition: 'Yield curve - különböző lejáratú kötvények hozamait ábrázoló grafikon.',
    category: 'Hozamgörbe'
  },
  {
    id: '13',
    term: 'Inverz hozamgörbe',
    definition: 'Rövid hozamok > hosszú hozamok. Recesszió előjele.',
    category: 'Hozamgörbe típusok'
  },
  {
    id: '14',
    term: 'Kamatláb kockázat',
    definition: 'Interest rate risk - a kötvényár változása kamatváltozás miatt.',
    category: 'Kockázatok'
  },
  {
    id: '15',
    term: 'Hitelkockázat',
    definition: 'Credit risk - a kibocsátó nem tudja törleszteni a kötvényt.',
    category: 'Kockázatok'
  },
  {
    id: '16',
    term: 'Konvertibilis kötvény',
    definition: 'Részvényre átváltható kötvény. Hibrid értékpapír.',
    category: 'Kötvénytípusok'
  },
  {
    id: '17',
    term: 'Callable kötvény',
    definition: 'Visszahívható kötvény - a kibocsátó lejárat előtt visszavásárolhatja.',
    category: 'Kötvénytípusok'
  },
  {
    id: '18',
    term: 'Inflációkövető kötvény',
    definition: 'Inflation-linked bond - tőke és kamat inflációhoz kötött.',
    category: 'Kötvénytípusok'
  },
  {
    id: '19',
    term: 'Szemét kötvény',
    definition: 'Junk bond - befektetési kategórián aluli, magas hozamú kötvény.',
    category: 'Minősítés'
  },
  {
    id: '20',
    term: 'Magyar Állampapír Plusz (MÁP+)',
    definition: 'Lakossági állampapír Magyarországon, növekvő kamatozással.',
    category: 'Magyar állampapírok'
  },
  {
    id: '21',
    term: 'T-Bond',
    definition: 'US Treasury Bond - amerikai államkötvény. Világpénzügyi benchmark.',
    category: 'Nemzetközi állampapírok'
  },
  {
    id: '22',
    term: 'Bund',
    definition: 'Német államkötvény. Az eurózóna benchmarkja.',
    category: 'Nemzetközi állampapírok'
  },
  {
    id: '23',
    term: 'Current yield',
    definition: 'Aktuális hozam = Éves kupon / Aktuális ár.',
    category: 'Hozam'
  },
  {
    id: '24',
    term: 'Yield spread',
    definition: 'Két kötvény hozamának különbsége. Kockázati prémium mérője.',
    category: 'Hozam'
  },
  {
    id: '25',
    term: 'Normál hozamgörbe',
    definition: 'Felfelé ívelő - hosszabb lejárat = magasabb hozam.',
    category: 'Hozamgörbe típusok'
  },
  {
    id: '26',
    term: 'Prémiumos ár',
    definition: 'Névérték felett kereskedő kötvény. Kuponráta > piaci hozam.',
    category: 'Árazás'
  },
  {
    id: '27',
    term: 'Diszkont ár',
    definition: 'Névérték alatt kereskedő kötvény. Kuponráta < piaci hozam.',
    category: 'Árazás'
  },
  {
    id: '28',
    term: 'Felhalmozott kamat',
    definition: 'Accrued interest - utolsó kuponfizetés óta felgyülemlett kamat.',
    category: 'Árazás'
  },
  {
    id: '29',
    term: 'Clean price',
    definition: 'Kötvény ára felhalmozott kamat nélkül.',
    category: 'Árazás'
  },
  {
    id: '30',
    term: 'Dirty price',
    definition: 'Kötvény ára + felhalmozott kamat. Ez a tényleges fizetendő összeg.',
    category: 'Árazás'
  },
  {
    id: '31',
    term: 'Macaulay duration',
    definition: 'Átlagos időtartam, amíg a cash flow-k megérkeznek.',
    category: 'Duration típusok'
  },
  {
    id: '32',
    term: 'Modified duration',
    definition: 'Ár változása 1%-os hozamváltozásra. Gyakorlati kockázati mérő.',
    category: 'Duration típusok'
  },
  {
    id: '33',
    term: 'Konvexitás',
    definition: 'Convexity - a duration változásának mértéke. Másodrendű kockázat.',
    category: 'Kockázat'
  },
  {
    id: '34',
    term: 'Újrabefektetési kockázat',
    definition: 'A kuponokat nem lehet ugyanilyen hozamon újrabefektetni.',
    category: 'Kockázatok'
  },
  {
    id: '35',
    term: 'Inflációs kockázat',
    definition: 'Az infláció csökkenti a fix kamat reálértékét.',
    category: 'Kockázatok'
  },
  {
    id: '36',
    term: 'Visszahívási kockázat',
    definition: 'Call risk - callable kötvényt visszahívhatják, amikor előnytelen.',
    category: 'Kockázatok'
  },
  {
    id: '37',
    term: 'Default',
    definition: 'Fizetésképtelenség - a kibocsátó nem tudja teljesíteni kötelezettségeit.',
    category: 'Eseménykockázat'
  },
  {
    id: '38',
    term: 'Covenant',
    definition: 'Kötvényszerződésben rögzített feltétel, kötelezettség.',
    category: 'Szerződési feltételek'
  },
  {
    id: '39',
    term: 'Seniority',
    definition: 'Törlesztési sorrend csőd esetén. Senior > Subordinated.',
    category: 'Szerződési feltételek'
  },
  {
    id: '40',
    term: 'Collateral',
    definition: 'Fedezet, biztosíték a kötvény mögött.',
    category: 'Szerződési feltételek'
  },
  {
    id: '41',
    term: 'Kötvénylétra',
    definition: 'Bond ladder - különböző lejáratú kötvények portfóliója.',
    category: 'Stratégiák'
  },
  {
    id: '42',
    term: 'Barbell stratégia',
    definition: 'Rövid és hosszú kötvények, közepes nélkül.',
    category: 'Stratégiák'
  },
  {
    id: '43',
    term: 'Bullet stratégia',
    definition: 'Csak hasonló lejáratú kötvények.',
    category: 'Stratégiák'
  },
  {
    id: '44',
    term: 'Immunizálás',
    definition: 'Immunization - portfólió védése kamatlábváltozás ellen duration-nel.',
    category: 'Stratégiák'
  },
  {
    id: '45',
    term: 'Total return',
    definition: 'Összes hozam: kuponok + árfolyamváltozás.',
    category: 'Hozam számítás'
  },
  {
    id: '46',
    term: 'Eurobond',
    definition: 'Külföldi devizában kibocsátott nemzetközi kötvény.',
    category: 'Nemzetközi kötvények'
  },
  {
    id: '47',
    term: 'Emerging market bond',
    definition: 'Feltörekvő piaci kötvény. Magasabb hozam, magasabb kockázat.',
    category: 'Nemzetközi kötvények'
  },
  {
    id: '48',
    term: 'CDS',
    definition: 'Credit Default Swap - hitelkockázat elleni biztosítás.',
    category: 'Derivatívák'
  },
  {
    id: '49',
    term: 'Kötvényalapú ETF',
    definition: 'Kötvényeket tartalmazó tőzsdén kereskedhető alap.',
    category: 'Befektetési termékek'
  },
  {
    id: '50',
    term: 'Kötvényalap',
    definition: 'Mutual fund kötvényekbe fektetve. Diverzifikáció kis összegből.',
    category: 'Befektetési termékek'
  },
  {
    id: '51',
    term: 'Alárendelt kötvény',
    definition: 'Subordinated bond - csődkor utoljára fizetik vissza, magasabb hozam.',
    category: 'Kötvénytípusok'
  },
  {
    id: '52',
    term: 'Fedezett kötvény',
    definition: 'Eszközfedezettel (általában ingatlannal) biztosított kötvény.',
    category: 'Kötvénytípusok'
  },
  {
    id: '53',
    term: 'Önkormányzati kötvény',
    definition: 'Municipal bond - helyi önkormányzat által kibocsátott.',
    category: 'Kötvénytípusok'
  },
  {
    id: '54',
    term: 'Putable kötvény',
    definition: 'A befektető eladhatja vissza a kibocsátónak lejárat előtt.',
    category: 'Kötvénytípusok'
  },
  {
    id: '55',
    term: 'Változó kamatozású kötvény',
    definition: 'Floating rate bond - kuponráta követi a piaci kamatokat.',
    category: 'Kötvénytípusok'
  },
  {
    id: '56',
    term: 'Örökjáradék kötvény',
    definition: 'Perpetual bond - nincs lejárat, örökké fizet kamatot.',
    category: 'Kötvénytípusok'
  },
  {
    id: '57',
    term: 'Befektetési kategória',
    definition: 'Investment grade - BBB-/Baa3 vagy jobb minősítésű kötvény.',
    category: 'Minősítés'
  },
  {
    id: '58',
    term: 'Moody\'s',
    definition: 'Egyik három nagy hitelminősítő cég. Aaa a legmagasabb minősítés.',
    category: 'Minősítők'
  },
  {
    id: '59',
    term: 'Standard & Poor\'s',
    definition: 'Hitelminősítő cég, AAA a legmagasabb minősítés.',
    category: 'Minősítők'
  },
  {
    id: '60',
    term: 'Fitch',
    definition: 'Harmadik nagy hitelminősítő. AAA a legmagasabb minősítés.',
    category: 'Minősítők'
  },
  {
    id: '61',
    term: 'Downgrade',
    definition: 'Hitelminősítés leminősítése. Árfolyamesést okoz.',
    category: 'Minősítés változás'
  },
  {
    id: '62',
    term: 'Upgrade',
    definition: 'Hitelminősítés javítása. Árfolyamemelkedést okoz.',
    category: 'Minősítés változás'
  },
  {
    id: '63',
    term: 'Rövid lejáratú kötvény',
    definition: '1-3 év lejárat. Alacsonyabb hozam, kisebb kamatlábkockázat.',
    category: 'Lejárat szerinti'
  },
  {
    id: '64',
    term: 'Közepes lejáratú kötvény',
    definition: '3-10 év lejárat. Kiegyensúlyozott kockázat-hozam.',
    category: 'Lejárat szerinti'
  },
  {
    id: '65',
    term: 'Hosszú lejáratú kötvény',
    definition: '10+ év lejárat. Magasabb hozam, nagyobb kamatlábkockázat.',
    category: 'Lejárat szerinti'
  },
  {
    id: '66',
    term: 'Kincstárjegy',
    definition: 'Treasury bill - rövid távú (max 1 év) állampapír.',
    category: 'Állampapírok'
  },
  {
    id: '67',
    term: 'Államkötvény',
    definition: 'Treasury note (2-10 év) és Treasury bond (10+ év).',
    category: 'Állampapírok'
  },
  {
    id: '68',
    term: 'Prémium Magyar Államkötvény (PMÁK)',
    definition: 'Előre meghatározott kamatozású magyar állampapír.',
    category: 'Magyar állampapírok'
  },
  {
    id: '69',
    term: 'Gilt',
    definition: 'Brit államkötvény (UK government bond).',
    category: 'Nemzetközi állampapírok'
  },
  {
    id: '70',
    term: 'JGB',
    definition: 'Japanese Government Bond - japán államkötvény.',
    category: 'Nemzetközi állampapírok'
  },
  {
    id: '71',
    term: 'Yield to call (YTC)',
    definition: 'Visszahívásig tartott kötvény várható hozama.',
    category: 'Hozam'
  },
  {
    id: '72',
    term: 'Lapos hozamgörbe',
    definition: 'Minden lejárat hasonló hozamot kínál. Bizonytalanság jele.',
    category: 'Hozamgörbe típusok'
  },
  {
    id: '73',
    term: 'Par érték',
    definition: 'Névértéken kereskedő kötvény. Kuponráta = piaci hozam.',
    category: 'Árazás'
  },
  {
    id: '74',
    term: 'Effective duration',
    definition: 'Duration callable/putable kötvényeknél, opciót figyelembe véve.',
    category: 'Duration típusok'
  },
  {
    id: '75',
    term: 'Likviditási kockázat',
    definition: 'Nem lehet eladni a kötvényt megfelelő áron és időben.',
    category: 'Kockázatok'
  },
  {
    id: '76',
    term: 'Deviza kockázat',
    definition: 'Külföldi devizában kibocsátott kötvény árfolyamkockázata.',
    category: 'Kockázatok'
  },
  {
    id: '77',
    term: 'Szuverén kockázat',
    definition: 'Országkockázat - állam nem tudja vagy nem akarja törleszteni.',
    category: 'Kockázatok'
  },
  {
    id: '78',
    term: 'Restructuring',
    definition: 'Adósság-átstrukturálás. Lejárat meghosszabbítása vagy névérték csökkentése.',
    category: 'Eseménykockázat'
  },
  {
    id: '79',
    term: 'Recovery rate',
    definition: 'Megtérülési ráta csőd esetén. Általában 30-60%.',
    category: 'Hitelkockázat'
  },
  {
    id: '80',
    term: 'Indenture',
    definition: 'Kötvényszerződés - részletes jogi dokumentum.',
    category: 'Szerződési feltételek'
  },
  {
    id: '81',
    term: 'Trustee',
    definition: 'Kötvénybirtokosok érdekeinek képviselője.',
    category: 'Szereplők'
  },
  {
    id: '82',
    term: 'Underwriter',
    definition: 'Jegyző - felvásárolja és értékesíti a kötvénykibocsátást.',
    category: 'Szereplők'
  },
  {
    id: '83',
    term: 'Kötvénypiac',
    definition: 'Fixed income market - általában nagyobb, mint a részvénypiac.',
    category: 'Piacok'
  },
  {
    id: '84',
    term: 'Elsődleges piac',
    definition: 'Új kötvénykibocsátások piaca.',
    category: 'Piacok'
  },
  {
    id: '85',
    term: 'Másodlagos piac',
    definition: 'Meglévő kötvények kereskedése befektetők között.',
    category: 'Piacok'
  },
  {
    id: '86',
    term: 'OTC piac',
    definition: 'Over-the-counter - tőzsdén kívüli, dealer-eken keresztüli kereskedés.',
    category: 'Piacok'
  },
  {
    id: '87',
    term: 'Bid-ask spread',
    definition: 'Vételi és eladási ár különbsége. Likviditás mutatója.',
    category: 'Kereskedés'
  },
  {
    id: '88',
    term: 'Aggregált kötvényindex',
    definition: 'Aggregate bond index - széles kötvénypiaci benchmark.',
    category: 'Indexek'
  },
  {
    id: '89',
    term: 'Aktív kötvény-kezelés',
    definition: 'Piaci mozgások kihasználása, duration és szektor változtatásával.',
    category: 'Kezelési stílusok'
  },
  {
    id: '90',
    term: 'Passzív kötvény-kezelés',
    definition: 'Buy and hold vagy indexkövetés. Alacsony költség.',
    category: 'Kezelési stílusok'
  },
  {
    id: '91',
    term: 'Tőkenyereség',
    definition: 'Capital gain - árfolyam emelkedésből származó nyereség.',
    category: 'Hozam forrásai'
  },
  {
    id: '92',
    term: 'Jövedelemhozam',
    definition: 'Income yield - kuponfizetésekből származó hozam.',
    category: 'Hozam forrásai'
  },
  {
    id: '93',
    term: 'Kamatos kamat hozam',
    definition: 'Kuponok újrabefektetéséből származó hozam.',
    category: 'Hozam forrásai'
  },
  {
    id: '94',
    term: 'Adózás',
    definition: 'Kamatjövedelem és tőkenyereség után fizetendő adó.',
    category: 'Adózás'
  },
  {
    id: '95',
    term: 'Adómentes kötvény',
    definition: 'Tax-exempt bond - önkormányzati kötvények USA-ban.',
    category: 'Adózás'
  },
  {
    id: '96',
    term: 'Yankee bond',
    definition: 'Külföldi kibocsátó USD-ben denominált USA kötvénye.',
    category: 'Nemzetközi kötvények'
  },
  {
    id: '97',
    term: 'Samurai bond',
    definition: 'Külföldi kibocsátó JPY-ben denominált japán kötvénye.',
    category: 'Nemzetközi kötvények'
  },
  {
    id: '98',
    term: 'Dim sum bond',
    definition: 'Offshore RMB kötvény (Hong Kong).',
    category: 'Nemzetközi kötvények'
  }
];
