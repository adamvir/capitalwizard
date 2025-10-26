// Pénzügyi Alapismeretek - Lecke rendszer
// Minden lecke 3 játékot tartalmaz: Olvasás, Párosítás, Kvíz

export interface ReadingQuestion {
  question: string;
  answer: string;
  keywords: string[];
}

export interface ReadingContent {
  title: string;
  content: string;
  questions: ReadingQuestion[];
}

export interface MatchingPair {
  id: number;
  left: string;
  right: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Lesson {
  id: number;
  pageNumber: number;
  reading: ReadingContent;
  matching: MatchingPair[];
  quiz: QuizQuestion[];
}

export const penzugyiAlapismeretkLessons: Lesson[] = [
  // 1. oldal - Bevezetés
  {
    id: 1,
    pageNumber: 1,
    reading: {
      title: "Bevezetés",
      content: `Ez a könyv azért készült, hogy általános ismereteket nyújtson a gazdaság működésének alapvető folyamatairól, azon belül is leginkább a tőkepiacokkal ismertesse meg az érdeklődőket, tanulókat. Segítségével nem feltétlenül válhatunk azonnal tapasztalt befektetési szakemberekké, de a tartalom elsajátításával széleskörű ismereteket szerezhetünk, ami egy kezdő lépés lehet, hogy elindulhassunk a tőkepiacok varázslatos világában.

El kell fogadnunk azt a tényt, hogy a mai világ legalapvetőbb emberi szükséglete a pénz, ebben fejezzük ki a legtöbb igényünket, elégítjük ki szükségleteink jelentős részét. Az út, ami a pénzügyek működésének megértéséhez vezet rendkívül hosszú és bonyolult.`,
      questions: [
        {
          question: "Milyen ismereteket nyújt a könyv?",
          answer: "általános pénzügyi és tőkepiaci ismereteket",
          keywords: ["általános", "pénzügy", "tőkepiac", "ismeret", "gazdaság"]
        },
        {
          question: "Mi a mai világ legalapvetőbb emberi szükséglete?",
          answer: "pénz",
          keywords: ["pénz"]
        },
        {
          question: "Mivel ismerteti meg ez a könyv az olvasókat?",
          answer: "a tőkepiacokkal",
          keywords: ["tőkepiac", "piac"]
        },
        {
          question: "Mivé nem válhatunk azonnal a könyv segítségével?",
          answer: "tapasztalt befektetési szakemberré",
          keywords: ["szakember", "befektető", "befektetési"]
        },
        {
          question: "Milyen út vezet a pénzügyek működésének megértéséhez?",
          answer: "rendkívül hosszú és bonyolult",
          keywords: ["hosszú", "bonyolult", "nehéz", "összetett"]
        }
      ]
    },
    matching: [
      { id: 1, left: "Tőkepiac", right: "Pénzügyi világ" },
      { id: 2, left: "Befektetés", right: "Pénzügyi döntés" },
      { id: 3, left: "Ismeretek", right: "Tudás" },
      { id: 4, left: "Szükséglet", right: "Igény" },
      { id: 5, left: "Folyamat", right: "Működés" },
      { id: 6, left: "Varázslatos", right: "Csodálatos" },
      { id: 7, left: "Könyv", right: "Tananyag" },
      { id: 8, left: "Gazdasági", right: "Pénzügyi" },
      { id: 9, left: "Alapfolyamat", right: "Alapvető működés" },
      { id: 10, left: "Megértés", right: "Felfogás" },
      { id: 11, left: "Szakember", right: "Hozzáértő" },
      { id: 12, left: "Út", right: "Folyamat" },
      { id: 13, left: "Tartalom", right: "Anyag" },
      { id: 14, left: "Elsajátítás", right: "Megtanulás" },
      { id: 15, left: "Cél", right: "Szándék" }
    ],
    quiz: [
      {
        question: "Mi a könyv fő célja?",
        options: [
          "Szakemberré képezni azonnal",
          "Általános pénzügyi ismereteket nyújtani",
          "Tőzsdei kereskedést tanítani",
          "Számviteli tudást adni"
        ],
        correctAnswer: 1
      },
      {
        question: "Mi a mai világ legalapvetőbb emberi szükséglete a könyv szerint?",
        options: [
          "Egészség",
          "Szeretet",
          "Pénz",
          "Szabadság"
        ],
        correctAnswer: 2
      },
      {
        question: "Mivel ismerteti meg a könyv az olvasókat?",
        options: [
          "Számvitellel",
          "Tőkepiacokkal",
          "Ingatlanokkal",
          "Biztosítással"
        ],
        correctAnswer: 1
      },
      {
        question: "Milyen az út a pénzügyek megértéséhez?",
        options: [
          "Rövid és egyszerű",
          "Közepes nehézségű",
          "Hosszú és bonyolult",
          "Lehetetlen"
        ],
        correctAnswer: 2
      },
      {
        question: "Mit nyerhetünk a könyv tartalmának elsajátításával?",
        options: [
          "Azonnali gazdagságot",
          "Szakértői címet",
          "Széleskörű ismereteket",
          "Befektetési garanciát"
        ],
        correctAnswer: 2
      },
      {
        question: "Miért nem válhatunk azonnal szakemberré a könyv segítségével?",
        options: [
          "Mert túl rövid a könyv",
          "Mert csak alapismereteket ad",
          "Mert nincs gyakorlat benne",
          "Mert rossz a könyv"
        ],
        correctAnswer: 1
      },
      {
        question: "Miben fejezzük ki igényeink jelentős részét?",
        options: [
          "Időben",
          "Pénzben",
          "Szavakban",
          "Érzésekben"
        ],
        correctAnswer: 1
      },
      {
        question: "Milyen útról beszél a könyv?",
        options: [
          "Autópályáról",
          "Tanulási útról",
          "Pénzügyek megértésének útjáról",
          "Utazásról"
        ],
        correctAnswer: 2
      },
      {
        question: "Mi a könyv tartalma?",
        options: [
          "Történelmi események",
          "Gazdasági alapfolyamatok",
          "Sport eredmények",
          "Receptek"
        ],
        correctAnswer: 1
      },
      {
        question: "Mi a tőkepiacok világa a könyv szerint?",
        options: [
          "Unalmas",
          "Veszélyes",
          "Varázslatos",
          "Egyszerű"
        ],
        correctAnswer: 2
      }
    ]
  },
  
  // 2. oldal - Megtakarítások fontossága
  {
    id: 2,
    pageNumber: 2,
    reading: {
      title: "Megtakarítások fontossága",
      content: `A magyar lakosság általánosságban nagyon keveset foglalkozik a pénzügyeivel. Az alapvető cél az lenne, hogy pontosan ismerjük pénzügyi bevételeinket, kiadásainkat, rendszerezni és értékelni tudjuk azt a folyamatot, aminek alapján megtakarítással rendelkezhetünk, amely megtakarítás gondosan felügyelt, megalapozott döntések útján történő befektetéssel tovább gyarapodhat.

A lakossági megtakarítások növekedése nem csak egyéni, hanem társadalmi érdek is egyaránt. A magasabb életszínvonal kialakulásának egyik legfontosabb pillére a lakossági megtakarítások növekedése.`,
      questions: [
        {
          question: "Mit kellene jobban ismernünk pénzügyeink kezeléséhez?",
          answer: "bevételeinket és kiadásainkat",
          keywords: ["bevétel", "kiadás", "pénzügy", "ismerni"]
        },
        {
          question: "Kinek az érdeke a megtakarítások növekedése?",
          answer: "egyéni és társadalmi is",
          keywords: ["egyéni", "társadalmi", "mindkettő", "egyaránt"]
        },
        {
          question: "Mivel foglalkozik keveset a magyar lakosság?",
          answer: "a pénzügyeivel",
          keywords: ["pénzügy", "pénz"]
        },
        {
          question: "Hogyan gyarapodhat a megtakarítás?",
          answer: "befektetéssel",
          keywords: ["befektetés", "befektet", "gyarapít"]
        },
        {
          question: "Minek a pillére a lakossági megtakarítások növekedése?",
          answer: "a magasabb életszínvonal kialakulásának",
          keywords: ["életszínvonal", "jólét", "magasabb"]
        }
      ]
    },
    matching: [
      { id: 1, left: "Megtakarítás", right: "Félretett pénz" },
      { id: 2, left: "Bevétel", right: "Jövedelem" },
      { id: 3, left: "Kiadás", right: "Költés" },
      { id: 4, left: "Befektetés", right: "Gyarapítás" },
      { id: 5, left: "Életszínvonal", right: "Jólét" },
      { id: 6, left: "Lakosság", right: "Emberek" },
      { id: 7, left: "Rendszerezés", right: "Szervezés" },
      { id: 8, left: "Értékelés", right: "Elemzés" },
      { id: 9, left: "Gondos", right: "Alapos" },
      { id: 10, left: "Megalapozott", right: "Indokolt" },
      { id: 11, left: "Döntés", right: "Választás" },
      { id: 12, left: "Gyarapodás", right: "Növekedés" },
      { id: 13, left: "Felügyelet", right: "Ellenőrzés" },
      { id: 14, left: "Társadalmi", right: "Közösségi" },
      { id: 15, left: "Érdek", right: "Haszon" }
    ],
    quiz: [
      {
        question: "Mivel kellene többet foglalkoznia a magyar lakosságnak?",
        options: [
          "Sporttal",
          "Pénzügyeivel",
          "Tanulással",
          "Utazással"
        ],
        correctAnswer: 1
      },
      {
        question: "Kinek az érdeke a lakossági megtakarítások növekedése?",
        options: [
          "Csak egyéni",
          "Csak társadalmi",
          "Egyéni és társadalmi is",
          "Egyik sem"
        ],
        correctAnswer: 2
      },
      {
        question: "Mit kellene ismernünk pénzügyeink kezeléséhez?",
        options: [
          "Csak bevételeinket",
          "Csak kiadásainkat",
          "Bevételeinket és kiadásainkat",
          "Csak befektetéseinket"
        ],
        correctAnswer: 2
      },
      {
        question: "Hogyan gyarapodhat a megtakarítás?",
        options: [
          "Magától",
          "Befektetéssel",
          "Rejtve",
          "Sehogy"
        ],
        correctAnswer: 1
      },
      {
        question: "Minek a pillére a lakossági megtakarítások növekedése?",
        options: [
          "Gazdasági válságnak",
          "Politikai stabilitásnak",
          "Magasabb életszínvonalnak",
          "Infláció csökkenésének"
        ],
        correctAnswer: 2
      },
      {
        question: "Mit jelent rendszerezni a pénzügyeket?",
        options: [
          "Elrejteni a pénzt",
          "Értékelni a folyamatokat",
          "Elkölteni mindent",
          "Kölcsön kérni"
        ],
        correctAnswer: 1
      },
      {
        question: "Milyennek kell lennie a befektetési döntéseknek?",
        options: [
          "Gyorsnak",
          "Megalapozottnak",
          "Véletlenszerűnek",
          "Impulzívnak"
        ],
        correctAnswer: 1
      },
      {
        question: "Mi a megtakarítás alapja?",
        options: [
          "Szerencse",
          "Bevételek és kiadások ismerete",
          "Lottó",
          "Örökség"
        ],
        correctAnswer: 1
      },
      {
        question: "Mit kellene rendszerezni?",
        options: [
          "Könyveket",
          "Pénzügyi folyamatokat",
          "Ruhákat",
          "Ételeket"
        ],
        correctAnswer: 1
      },
      {
        question: "Milyen megtakarításról beszél a szöveg?",
        options: [
          "Időmegtakarításról",
          "Pénzügyi megtakarításról",
          "Energiamegtakarításról",
          "Helymegatakarításról"
        ],
        correctAnswer: 1
      }
    ]
  },

  // 3. oldal - Pénzügyi tudás hiánya
  {
    id: 3,
    pageNumber: 3,
    reading: {
      title: "Pénzügyi tudás hiánya",
      content: `Az elmúlt években határozott emelkedésnek indultak a magyar bérek, nőttek a megtakarítások, de a pénzügyekkel kapcsolatos időráfordítás nagyon minimálisan emelkedett. Tanulás, tapasztalat és folyamatos odafigyelésre lenne szükség abban a témakörben, ami gyakorlatilag mindenkit érint a háztartások napi pénzügyi teendői révén.

A magyar pénzügyi ismeretek hiánya azonban nem csak a lakossági szegmensben, nem csak a háztartások esetében probléma. Az intézmények pénzügyi irányításának felkészültsége is rendkívül alacsony színvonalú. A KKV és mikró vállalkozások esetében szinte nem is létezik a gondos vállalati pénzügyi irányítás megléte.`,
      questions: [
        {
          question: "Mi történt a bérekkel az elmúlt években?",
          answer: "emelkedtek",
          keywords: ["emelked", "nőtt", "növeked"]
        },
        {
          question: "Hol még probléma a pénzügyi ismeretek hiánya?",
          answer: "intézményeknél és vállalkozásoknál is",
          keywords: ["intézmény", "vállalkozás", "KKV", "vállalat"]
        },
        {
          question: "Mennyire emelkedett a pénzügyekkel kapcsolatos időráfordítás?",
          answer: "nagyon minimálisan",
          keywords: ["minimális", "kevés", "alig"]
        },
        {
          question: "Mire lenne szükség a pénzügyek területén?",
          answer: "tanulásra, tapasztalatra és folyamatos odafigyelésre",
          keywords: ["tanulás", "tapasztalat", "odafigyelés"]
        },
        {
          question: "Milyen vállalkozásoknál szinte nem létezik gondos pénzügyi irányítás?",
          answer: "KKV és mikró vállalkozásoknál",
          keywords: ["KKV", "mikró", "kisvállalkozás"]
        }
      ]
    },
    matching: [
      { id: 1, left: "Bér", right: "Fizetés" },
      { id: 2, left: "KKV", right: "Kis- és középvállalkozás" },
      { id: 3, left: "Háztartás", right: "Család gazdasága" },
      { id: 4, left: "Irányítás", right: "Menedzsment" },
      { id: 5, left: "Tapasztalat", right: "Gyakorlat" },
      { id: 6, left: "Odafigyelés", right: "Figyelem" },
      { id: 7, left: "Tanulás", right: "Oktatás" },
      { id: 8, left: "Elmúlt", right: "Korábbi" },
      { id: 9, left: "Emelkedés", right: "Növekedés" },
      { id: 10, left: "Időráfordítás", right: "Időbefektetés" },
      { id: 11, left: "Minimális", right: "Csekély" },
      { id: 12, left: "Témakör", right: "Terület" },
      { id: 13, left: "Intézmény", right: "Szervezet" },
      { id: 14, left: "Felkészültség", right: "Tudás szint" },
      { id: 15, left: "Mikró", right: "Nagyon kicsi" }
    ],
    quiz: [
      {
        question: "Mi történt az elmúlt években a magyar bérekkel?",
        options: [
          "Csökkentek",
          "Stagnáltak",
          "Emelkedtek",
          "Megszűntek"
        ],
        correctAnswer: 2
      },
      {
        question: "Hol is probléma a pénzügyi ismeretek hiánya?",
        options: [
          "Csak a háztartásokban",
          "Csak a vállalatokban",
          "Háztartásokban és vállalatokban is",
          "Sehol"
        ],
        correctAnswer: 2
      },
      {
        question: "Mennyire emelkedett a pénzügyekkel kapcsolatos időráfordítás?",
        options: [
          "Nagyon sokat",
          "Minimálisan",
          "Közepesen",
          "Egyáltalán nem"
        ],
        correctAnswer: 1
      },
      {
        question: "Mi jellemezte a megtakarításokat az elmúlt években?",
        options: [
          "Csökkentek",
          "Stagnáltak",
          "Nőttek",
          "Megszűntek"
        ],
        correctAnswer: 2
      },
      {
        question: "Milyen vállalkozásoknál szinte nem létezik gondos pénzügyi irányítás?",
        options: [
          "Multinacionális cégeknél",
          "KKV és mikró vállalkozásoknál",
          "Állami cégeknél",
          "Nagyvállalatoknál"
        ],
        correctAnswer: 1
      },
      {
        question: "Mire lenne szükség a pénzügyek területén?",
        options: [
          "Szerencsére",
          "Tanulásra és odafigyelésre",
          "Több pénzre",
          "Kevesebb munkára"
        ],
        correctAnswer: 1
      },
      {
        question: "Kit érint a pénzügyi témakör?",
        options: [
          "Senkit",
          "Csak a gazdagokat",
          "Gyakorlatilag mindenkit",
          "Csak a bankárokat"
        ],
        correctAnswer: 2
      },
      {
        question: "Milyen a pénzügyi irányítás felkészültsége az intézményeknél?",
        options: [
          "Magas színvonalú",
          "Kiváló",
          "Alacsony színvonalú",
          "Tökéletes"
        ],
        correctAnswer: 2
      },
      {
        question: "Milyen szegmensben probléma a pénzügyi ismeretek hiánya?",
        options: [
          "Csak lakossági",
          "Csak vállalati",
          "Lakossági és vállalati is",
          "Egyik sem"
        ],
        correctAnswer: 2
      },
      {
        question: "Mit jelent a KKV rövidítés?",
        options: [
          "Közös Kereskedelmi Vállalat",
          "Kis- és középvállalkozás",
          "Kormányzati Költségvetési Válasz",
          "Kereskedelmi Központi Végrehajtás"
        ],
        correctAnswer: 1
      }
    ]
  },

  // 4. oldal - A pénz bevezetése
  {
    id: 4,
    pageNumber: 4,
    reading: {
      title: "A pénz - Bevezetés",
      content: `Kezünkbe fogunk értékes papírokat, érméket. Súlyuk, anyaguk lényegtelen az értékük tekintetében? Hogy milyen értékkel bírnak leginkább attól függ, hogy milyen szám van rájuk írva? Persze, ha ez ilyen egyszerű lenne, akkor fognánk egy papírt, ráírnánk egy számot és könnyedén gazdagok lehetnénk.

Színes, képes papírok, dombornyomott érmék. Lehetnek szépek, ritkák, lényegesen értékesebbek, mint amit az \"előállításuk\", anyaguk képvisel. Ezek a papírok, fémek közel sem szolgálnak mindenképpen fizetési eszközként.`,
      questions: [
        {
          question: "Mitől függ a pénz értéke?",
          answer: "a rá írt számtól",
          keywords: ["szám", "címlet", "érték"]
        },
        {
          question: "Miért nem lehet egyszerűen pénzt készíteni?",
          answer: "mert elfogadottnak kell lennie",
          keywords: ["elfogad", "érvény", "társadalom", "törvény"]
        },
        {
          question: "Mire nem feltétlenül szolgálnak a színes, képes papírok és érmék?",
          answer: "fizetési eszközként",
          keywords: ["fizetési eszköz", "fizetés", "pénz"]
        },
        {
          question: "Mi lényegtelen a pénz értékének tekintetében?",
          answer: "a súlya és anyaga",
          keywords: ["súly", "anyag"]
        },
        {
          question: "Lehetnek-e a pénzek értékesebbek, mint amit az előállításuk képvisel?",
          answer: "igen",
          keywords: ["igen", "lehet", "értékesebb"]
        }
      ]
    },
    matching: [
      { id: 1, left: "Pénz", right: "Fizetőeszköz" },
      { id: 2, left: "Érme", right: "Fém pénz" },
      { id: 3, left: "Bankjegy", right: "Papírpénz" },
      { id: 4, left: "Érték", right: "Címlet" },
      { id: 5, left: "Ritkaság", right: "Gyűjtői darab" },
      { id: 6, left: "Súly", right: "Tömeg" },
      { id: 7, left: "Anyag", right: "Összetétel" },
      { id: 8, left: "Szám", right: "Számjegy" },
      { id: 9, left: "Képes", right: "Illusztrált" },
      { id: 10, left: "Színes", right: "Tarka" },
      { id: 11, left: "Dombornyomott", right: "Domború" },
      { id: 12, left: "Előállítás", right: "Gyártás" },
      { id: 13, left: "Lényegtelen", right: "Nem fontos" },
      { id: 14, left: "Gazdag", right: "Tehetős" },
      { id: 15, left: "Szolgálat", right: "Funkció" }
    ],
    quiz: [
      {
        question: "Mitől függ elsősorban a pénz értéke?",
        options: [
          "A súlyától",
          "Az anyagától",
          "A rá írt számtól",
          "A színétől"
        ],
        correctAnswer: 2
      },
      {
        question: "Miért nem lehet egyszerűen pénzt készíteni?",
        options: [
          "Mert drága az anyag",
          "Mert bonyolult",
          "Mert elfogadottnak kell lennie",
          "Mert nehéz papírt találni"
        ],
        correctAnswer: 2
      },
      {
        question: "Mi lényegtelen a pénz értéke szempontjából?",
        options: [
          "A rá írt szám",
          "A súlya és anyaga",
          "Az elfogadottsága",
          "A címlete"
        ],
        correctAnswer: 1
      },
      {
        question: "Lehetnek-e a pénzek értékesebbek az előállításuknál?",
        options: [
          "Nem, soha",
          "Igen, lehetnek",
          "Csak ritkán",
          "Csak régen"
        ],
        correctAnswer: 1
      },
      {
        question: "Mit képviselnek a színes, képes papírok és érmék?",
        options: [
          "Mindig fizetési eszközt",
          "Csak díszítést",
          "Nem feltétlenül fizetési eszközt",
          "Műtárgyakat"
        ],
        correctAnswer: 2
      },
      {
        question: "Mit fogunk kézbe értékesként?",
        options: [
          "Köveket",
          "Papírokat és érméket",
          "Gyümölcsöket",
          "Könyveket"
        ],
        correctAnswer: 1
      },
      {
        question: "Milyen lehetnek a pénzek?",
        options: [
          "Szépek és ritkák",
          "Mindig olcsók",
          "Értéktelenek",
          "Egyformák"
        ],
        correctAnswer: 0
      },
      {
        question: "Mi van rá írva a pénzre?",
        options: [
          "Történetek",
          "Szám",
          "Képek",
          "Nevek"
        ],
        correctAnswer: 1
      },
      {
        question: "Miért nem lehetnénk gazdagok egy papír és egy szám írásával?",
        options: [
          "Mert túl könnyű lenne",
          "Mert a pénznek elfogadottnak kell lennie",
          "Mert nincs papír",
          "Mert rossz az írásunk"
        ],
        correctAnswer: 1
      },
      {
        question: "Milyen érmékről beszél a szöveg?",
        options: [
          "Játékérmékről",
          "Dombornyomott érmékről",
          "Csokoládé érmékről",
          "Sport érmékről"
        ],
        correctAnswer: 1
      }
    ]
  },

  // 5. oldal - A pénz mint fizetőeszköz
  {
    id: 5,
    pageNumber: 5,
    reading: {
      title: "A pénz mint fizetőeszköz",
      content: `Ahhoz, hogy a pénz valójában pénz lehessen, forgalmi értékkel rendelkezzen, ahhoz az szükséges, hogy a piac, a társadalom, a törvényi és prudenciális szabályozás is fizetési eszköznek ismerje, fogadja el.

A pénz egy \"áru\", ami elfogadott értékkel bír és ezáltal elcserélhetjük olyan árucikkekre, amiknek az értékét pénzben is ki tudjuk fejezni. Ugyanakkor a mai világban sem minden árucikk és nem is fejezhető ki minden értékben, pénzben.`,
      questions: [
        {
          question: "Mi szükséges ahhoz, hogy a pénz fizetőeszköz legyen?",
          answer: "a piac, társadalom és szabályozás elfogadása",
          keywords: ["piac", "társadalom", "szabályozás", "elfogad"]
        },
        {
          question: "Mi a pénz a gazdaságban?",
          answer: "egy elfogadott értékkel bíró áru",
          keywords: ["áru", "elfogad", "érték"]
        },
        {
          question: "Mivel kell rendelkeznie a pénznek?",
          answer: "forgalmi értékkel",
          keywords: ["forgalmi", "érték"]
        },
        {
          question: "Mire cserélhetjük el a pénzt?",
          answer: "árucikkekre",
          keywords: ["áru", "cikk", "csere"]
        },
        {
          question: "Fejezhető-e ki minden érték pénzben?",
          answer: "nem",
          keywords: ["nem", "nem minden"]
        }
      ]
    },
    matching: [
      { id: 1, left: "Forgalom", right: "Kereskedelem" },
      { id: 2, left: "Társadalom", right: "Közösség" },
      { id: 3, left: "Szabályozás", right: "Törvény" },
      { id: 4, left: "Elfogadás", right: "Érvényesség" },
      { id: 5, left: "Csere", right: "Vásárlás" },
      { id: 6, left: "Piac", right: "Kereskedési hely" },
      { id: 7, left: "Törvényi", right: "Jogi" },
      { id: 8, left: "Prudenciális", right: "Óvatos" },
      { id: 9, left: "Áru", right: "Termék" },
      { id: 10, left: "Árucikk", right: "Portéka" },
      { id: 11, left: "Kifejezés", right: "Megjelenítés" },
      { id: 12, left: "Mai világ", right: "Jelenkor" },
      { id: 13, left: "Forgalmi", right: "Kereskedelmi" },
      { id: 14, left: "Rendelkezik", right: "Birtokol" },
      { id: 15, left: "Valójában", right: "Ténylegesen" }
    ],
    quiz: [
      {
        question: "Mi kell ahhoz, hogy a pénz fizetőeszköz legyen?",
        options: [
          "Csak a társadalom elfogadása",
          "Csak a törvényi szabályozás",
          "A piac, társadalom és szabályozás elfogadása",
          "Csak a kormány döntése"
        ],
        correctAnswer: 2
      },
      {
        question: "Mi a pénz a gazdaságban?",
        options: [
          "Egy áru elfogadott értékkel",
          "Csak papír",
          "Értéktelen dolog",
          "Csak fém"
        ],
        correctAnswer: 0
      },
      {
        question: "Mivel kell rendelkeznie a pénznek?",
        options: [
          "Nehéz súllyal",
          "Forgalmi értékkel",
          "Színes megjelenéssel",
          "Nagy mérettel"
        ],
        correctAnswer: 1
      },
      {
        question: "Mire cserélhetjük a pénzt?",
        options: [
          "Semmi másra",
          "Csak szolgáltatásokra",
          "Árucikkekre",
          "Csak ingatlanokra"
        ],
        correctAnswer: 2
      },
      {
        question: "Fejezhető-e ki minden érték pénzben?",
        options: [
          "Igen, minden",
          "Nem, nem minden",
          "Csak néhány",
          "Soha semmi"
        ],
        correctAnswer: 1
      },
      {
        question: "Ki kell hogy fogadja el a pénzt fizetőeszközként?",
        options: [
          "Senki",
          "Csak a bank",
          "A piac, társadalom és szabályozás",
          "Csak a kormány"
        ],
        correctAnswer: 2
      },
      {
        question: "Minek egy fajtája a pénz?",
        options: [
          "Fémnek",
          "Árunak",
          "Papírnak",
          "Játéknak"
        ],
        correctAnswer: 1
      },
      {
        question: "Mit jelent a prudenciális szabályozás?",
        options: [
          "Politikai döntést",
          "Pénzügyi biztonságot szolgáló szabályozást",
          "Környezetvédelmet",
          "Közlekedési szabályt"
        ],
        correctAnswer: 1
      },
      {
        question: "Milyen értékkel rendelkezik a pénz?",
        options: [
          "Csak érzelmi értékkel",
          "Forgalmi értékkel",
          "Művészeti értékkel",
          "Történelmi értékkel"
        ],
        correctAnswer: 1
      },
      {
        question: "Mi történik a pénzzel a gazdaságban?",
        options: [
          "Csak gyűjtik",
          "Elcserélhető árucikkekre",
          "Elégetik",
          "Elrejtik"
        ],
        correctAnswer: 1
      }
    ]
  },

  // 6. oldal - Ősközösség
  {
    id: 6,
    pageNumber: 6,
    reading: {
      title: "Ősközösség - Önellátó társadalom",
      content: `Ahhoz, hogy megérthessük a pénz, mint forgalmi értékkel bíró fizetőeszköz kialakulásának az okát, nagyon messzire kell visszautaznunk az emberiség történelmében. Az \"önellátó társadalom\" kifejezés inkább az ősközösségi társadalom életmódjára utal, amit tanulmányainkból így ismerhetünk: vadászás, halászás, gyűjtögetés.

Az ősközösségek történelmi fejlődése erősen korlátozott volt, pontosan az önellátó életmód miatt. Alacsony népsűrűség, változó sikerű önellátás, alacsony népszaporulat jellemezték ezeket a társadalmakat.`,
      questions: [
        {
          question: "Mi jellemezte az ősközösségek életmódját?",
          answer: "vadászás, halászás, gyűjtögetés",
          keywords: ["vadász", "halász", "gyűjtöget", "önellát"]
        },
        {
          question: "Miért volt korlátozott az ősközösségek fejlődése?",
          answer: "az önellátó életmód miatt",
          keywords: ["önellát", "életmód"]
        },
        {
          question: "Milyen népsűrűség jellemezte az ősközösségeket?",
          answer: "alacsony",
          keywords: ["alacsony", "kevés"]
        },
        {
          question: "Milyen volt a népszaporulat az ősközösségekben?",
          answer: "alacsony",
          keywords: ["alacsony", "kevés", "lassú"]
        },
        {
          question: "Milyen volt az önellátás sikeressége?",
          answer: "változó",
          keywords: ["változó", "bizonytalan"]
        }
      ]
    },
    matching: [
      { id: 1, left: "Ősközösség", right: "Ősi társadalom" },
      { id: 2, left: "Önellátás", right: "Saját termelés" },
      { id: 3, left: "Vadászat", right: "Táplálékszerzés" },
      { id: 4, left: "Gyűjtögetés", right: "Élelem keresés" },
      { id: 5, left: "Fejlődés", right: "Haladás" },
      { id: 6, left: "Halászat", right: "Halfogás" },
      { id: 7, left: "Történelmi", right: "Múltbéli" },
      { id: 8, left: "Korlátozott", right: "Beszűkült" },
      { id: 9, left: "Életmód", right: "Életforma" },
      { id: 10, left: "Népsűrűség", right: "Lakossűrűség" },
      { id: 11, left: "Változó", right: "Ingadozó" },
      { id: 12, left: "Sikeres", right: "Eredményes" },
      { id: 13, left: "Népszaporulat", right: "Népesedés" },
      { id: 14, left: "Jellemez", right: "Jelöl" },
      { id: 15, left: "Kifejezés", right: "Szóhasználat" }
    ],
    quiz: [
      {
        question: "Mi jellemezte az ősközösségek életmódját?",
        options: [
          "Kereskedelem",
          "Vadászás, halászás, gyűjtögetés",
          "Iparosodás",
          "Pénzgazdálkodás"
        ],
        correctAnswer: 1
      },
      {
        question: "Miért volt korlátozott az ősközösségek fejlődése?",
        options: [
          "A háborúk miatt",
          "Az önellátó életmód miatt",
          "A betegségek miatt",
          "A hideg miatt"
        ],
        correctAnswer: 1
      },
      {
        question: "Milyen volt a népsűrűség az ősközösségekben?",
        options: [
          "Magas",
          "Alacsony",
          "Közepes",
          "Változó"
        ],
        correctAnswer: 1
      },
      {
        question: "Milyen volt a népszaporulat?",
        options: [
          "Gyors",
          "Alacsony",
          "Közepes",
          "Magas"
        ],
        correctAnswer: 1
      },
      {
        question: "Milyen volt az önellátás sikeressége?",
        options: [
          "Mindig sikeres",
          "Változó",
          "Mindig sikertelen",
          "Garantált"
        ],
        correctAnswer: 1
      },
      {
        question: "Milyen társadalmi formáról beszél a szöveg?",
        options: [
          "Modern társadalomról",
          "Önellátó társadalomról",
          "Ipari társadalomról",
          "Digitális társadalomról"
        ],
        correctAnswer: 1
      },
      {
        question: "Meddig kell visszautaznunk a történelemben a pénz kialakulásának megértéséhez?",
        options: [
          "10 évet",
          "100 évet",
          "Nagyon messzire",
          "Néhány évet"
        ],
        correctAnswer: 2
      },
      {
        question: "Mit jellemez az ősközösségi társadalom?",
        options: [
          "Gyárak",
          "Vadászat, halászat, gyűjtögetés",
          "Gépek",
          "Írás"
        ],
        correctAnswer: 1
      },
      {
        question: "Mi jellemezte a társadalmakat?",
        options: [
          "Magas népsűrűség",
          "Gyors fejlődés",
          "Alacsony népsűrűség és népszaporulat",
          "Technológiai haladás"
        ],
        correctAnswer: 2
      },
      {
        question: "Milyen fizetőeszközről beszél a szöveg?",
        options: [
          "Bankkártyáról",
          "Forgalmi értékkel bíró pénzről",
          "Mobilfizetésről",
          "Kriptovalutáról"
        ],
        correctAnswer: 1
      }
    ]
  },

  // 7. oldal - Cserekereskedelem kezdete
  {
    id: 7,
    pageNumber: 7,
    reading: {
      title: "Cserekereskedelem",
      content: `Az idő múlt és a világ fejlődött. A fejlődéssel pedig jelentkeztek az igények. Elkezdődött a magasabb színvonalú munka elvégzése, ami a hozzáértőket a szakosodás útjára vezette. A szakosodás mind aktívabban tette lehetővé a sokrétű árukészlet felhalmozását, ahol a helyileg kialakult többlet, más helyek hiányának betöltését tette lehetővé.

Elkezdődött a cserekereskedelem. Az elkezdődött szakosodás körülbelül az Őskor végére és az Ókor elejére tehető. Az árucikkekből megtermelt többlet \"útnak indult\", hogy keresse a helyét olyan helyeken, ahol nem volt elég belőle.`,
      questions: [
        {
          question: "Mi tette lehetővé a cserekereskedelem kialakulását?",
          answer: "a szakosodás és a többlet",
          keywords: ["szakosodás", "többlet", "fejlődés"]
        },
        {
          question: "Mikor kezdődött a szakosodás?",
          answer: "az Őskor végén és az Ókor elején",
          keywords: ["őskor", "ókor", "végén", "elején"]
        },
        {
          question: "Milyen színvonalú munka kezdődött?",
          answer: "magasabb színvonalú",
          keywords: ["magasabb", "jobb", "fejlettebb"]
        },
        {
          question: "Hová indult el a megtermelt többlet?",
          answer: "olyan helyekre, ahol hiány volt",
          keywords: ["hiány", "kevés", "szükség"]
        },
        {
          question: "Mit tett lehetővé a szakosodás?",
          answer: "sokrétű árukészlet felhalmozását",
          keywords: ["árukészlet", "felhalmozás", "termék"]
        }
      ]
    },
    matching: [
      { id: 1, left: "Szakosodás", right: "Specializáció" },
      { id: 2, left: "Többlet", right: "Felesleg" },
      { id: 3, left: "Hiány", right: "Szűkösség" },
      { id: 4, left: "Csere", right: "Kereskedelem" },
      { id: 5, left: "Árukészlet", right: "Termékek" },
      { id: 6, left: "Fejlődés", right: "Előrelépés" },
      { id: 7, left: "Igény", right: "Szükséglet" },
      { id: 8, left: "Magasabb", right: "Fejlettebb" },
      { id: 9, left: "Színvonal", right: "Minőség" },
      { id: 10, left: "Munka", right: "Tevékenység" },
      { id: 11, left: "Hozzáértő", right: "Szakember" },
      { id: 12, left: "Sokrétű", right: "Változatos" },
      { id: 13, left: "Felhalmozás", right: "Gyűjtés" },
      { id: 14, left: "Helyileg", right: "Lokálisan" },
      { id: 15, left: "Betöltés", right: "Kielégítés" }
    ],
    quiz: [
      {
        question: "Mi tette lehetővé a cserekereskedelem kialakulását?",
        options: [
          "A pénz",
          "A szakosodás és a többlet",
          "A bankok",
          "A szabályozás"
        ],
        correctAnswer: 1
      },
      {
        question: "Mikor kezdődött a szakosodás?",
        options: [
          "Az újkorban",
          "A középkorban",
          "Az Őskor végén és Ókor elején",
          "A jelenkorban"
        ],
        correctAnswer: 2
      },
      {
        question: "Milyen munka kezdődött a fejlődéssel?",
        options: [
          "Egyszerűbb munka",
          "Magasabb színvonalú munka",
          "Gépi munka",
          "Monoton munka"
        ],
        correctAnswer: 1
      },
      {
        question: "Hová ment a megtermelt többlet?",
        options: [
          "Megsemmisült",
          "Otthon maradt",
          "Hiányos helyekre",
          "Exportra"
        ],
        correctAnswer: 2
      },
      {
        question: "Mit tett lehetővé a szakosodás?",
        options: [
          "Háborút",
          "Árukészlet felhalmozását",
          "Munkanélküliséget",
          "Stagnálást"
        ],
        correctAnswer: 1
      },
      {
        question: "Mi történt az idővel?",
        options: [
          "Megállt",
          "Múlt és a világ fejlődött",
          "Visszafelé ment",
          "Lassult"
        ],
        correctAnswer: 1
      },
      {
        question: "Mi jelentkezett a fejlődéssel?",
        options: [
          "Problémák",
          "Igények",
          "Háborúk",
          "Betegségek"
        ],
        correctAnswer: 1
      },
      {
        question: "Kik indultak a szakosodás útjára?",
        options: [
          "Mindenki",
          "A gyerekek",
          "A hozzáértők",
          "A kormány"
        ],
        correctAnswer: 2
      },
      {
        question: "Mit töltött be a helyileg kialakult többlet?",
        options: [
          "Semmit",
          "Más helyek hiányát",
          "Tárolókat",
          "Raktárakat"
        ],
        correctAnswer: 1
      },
      {
        question: "Mi indult útnak?",
        options: [
          "Az emberek",
          "Az árucikkekből megtermelt többlet",
          "A pénz",
          "A király"
        ],
        correctAnswer: 1
      }
    ]
  },

  // 8. oldal - Cserekereskedelem problémái
  {
    id: 8,
    pageNumber: 8,
    reading: {
      title: "Cserekereskedelem nehézségei",
      content: `A többlet árut kínálót eladónak, az áruhiányban szenvedőt vevőnek nevezzük. Az áru cserekereskedelmének kezdeteként az árukat közvetlenül cserélték más árukra, adott helyenként a kereslet-kínálat együtthatójából következő cserearány szerint. Ennek a közvetlen cserekereskedelemnek azonban az volt a feltétele, hogy a kínált áru helyébe olyan árut kapjunk, amire nekünk is szükségünk van.

Ha halam volt és sóért akartam elcserélni, akkor bizony olyan vevőt kellett találnom a halamra, aki sót akart adni érte. Ha ez a két igény nem jelentkezett egyszerre, akkor a csere nem tudott létrejönni.`,
      questions: [
        {
          question: "Mi volt a közvetlen cserekereskedelem feltétele?",
          answer: "hogy mindkét fél akarjon cserélni",
          keywords: ["mindkét", "fél", "akarat", "szükség", "igény"]
        },
        {
          question: "Mi a probléma, ha halamat sóért akarom cserélni?",
          answer: "olyan vevőt kell találni, akinek van sója",
          keywords: ["vevő", "találni", "só", "egyezés"]
        }
      ]
    },
    matching: [
      { id: 1, left: "Eladó", right: "Áru kínáló" },
      { id: 2, left: "Vevő", right: "Áru kereső" },
      { id: 3, left: "Kereslet", right: "Igény" },
      { id: 4, left: "Kínálat", right: "Ajánlat" },
      { id: 5, left: "Cserearány", right: "Értékarány" }
    ],
    quiz: [
      {
        question: "Mi volt a közvetlen cserekereskedelem feltétele?",
        options: [
          "Pénz megléte",
          "Hogy mindkét fél akarjon cserélni",
          "Bank jelenléte",
          "Szabályozás"
        ],
        correctAnswer: 1
      },
      {
        question: "Mi a probléma, ha halamat sóért akarom cserélni?",
        options: [
          "Nincs probléma",
          "Olyan vevőt kell találni, akinek van sója",
          "A hal drága",
          "A só drága"
        ],
        correctAnswer: 1
      }
    ]
  },

  // 9. oldal - Árupénz kialakulása
  {
    id: 9,
    pageNumber: 9,
    reading: {
      title: "Árupénz",
      content: `Az \"áruért áruval fizetek\" cserekereskedelem számtalan problémát hordozott és hamarosan igény jelentkezett arra, hogy a zökkenőmentesebb cserekereskedelem bonyolításához valamilyen árupénzzel lehessen fizetni.

Az árupénz egy olyan köztes áru az áruk cserekereskedelmében, amit a legkönnyebben volt lehetséges más árukra cserélni és amely áru értéke könnyen meghatározható volt más áruk viszonylatában. Viszonylagosan tartani kellett az értékét, kis- és nagyobb mértékkel is rendelkeznie kellett az oszthatóság végett és már itt jelentkezett az, a mai világban is alapvető feltétel, hogy általánosan elfogadottnak kellett lennie.`,
      questions: [
        {
          question: "Mi az árupénz?",
          answer: "köztes áru a cserekereskedelemben",
          keywords: ["köztes", "áru", "csere", "kereskedelem"]
        },
        {
          question: "Milyen tulajdonsággal kellett rendelkeznie az árupénznek?",
          answer: "értékálló, osztható és elfogadott",
          keywords: ["értékálló", "oszthat", "elfogad"]
        }
      ]
    },
    matching: [
      { id: 1, left: "Árupénz", right: "Köztes áru" },
      { id: 2, left: "Értékállóság", right: "Stabil érték" },
      { id: 3, left: "Oszthatóság", right: "Méretezhetőség" },
      { id: 4, left: "Elfogadottság", right: "Érvényesség" },
      { id: 5, left: "Só", right: "Árupénz példa" }
    ],
    quiz: [
      {
        question: "Mi az árupénz?",
        options: [
          "Papírpénz",
          "Köztes áru a cserekereskedelemben",
          "Banki termék",
          "Modern pénz"
        ],
        correctAnswer: 1
      },
      {
        question: "Milyen tulajdonsággal kellett rendelkeznie az árupénznek?",
        options: [
          "Csak értékállónak",
          "Csak oszthatónak",
          "Értékálló, osztható és elfogadott",
          "Csak elfogadottnak"
        ],
        correctAnswer: 2
      }
    ]
  },

  // 10. oldal - Nemesfémek
  {
    id: 10,
    pageNumber: 10,
    reading: {
      title: "Nemesfémek - Árupénz vagy pénzhelyettesítő?",
      content: `Az emberiség fejlődése során, valószínűleg a 6.-7. század környékén jelentek meg az első nemesfém alapú fizetőeszközök, amiket már joggal nevezhetünk pénznek, fizető-eszköznek. Érméket öntöttek arany és ezüst anyagból és ezeket az akkori \"gazdasági\" szereplők elfogadták, ismerték a nemesfémek ritkaságát, értékét.

Bimetalizmus: az arany és az ezüst együtt töltötték be a pénz funkcióját. Monometalizmus: amikor egyetlen nemesfém (alapvetően az arany) töltötte be a pénz funkcióját.`,
      questions: [
        {
          question: "Mikor jelentek meg az első nemesfém alapú fizetőeszközök?",
          answer: "a 6-7. század környékén",
          keywords: ["6", "7", "század"]
        },
        {
          question: "Mi a bimetalizmus?",
          answer: "arany és ezüst együtt töltik be a pénz funkcióját",
          keywords: ["arany", "ezüst", "együtt", "két"]
        }
      ]
    },
    matching: [
      { id: 1, left: "Nemesfém", right: "Arany, ezüst" },
      { id: 2, left: "Érme", right: "Öntött pénz" },
      { id: 3, left: "Bimetalizmus", right: "Két fém alapú" },
      { id: 4, left: "Monometalizmus", right: "Egy fém alapú" },
      { id: 5, left: "Ritkaság", right: "Értékalapítás" }
    ],
    quiz: [
      {
        question: "Mikor jelentek meg az első nemesfém alapú fizetőeszközök?",
        options: [
          "Az újkorban",
          "A 6-7. század környékén",
          "A múlt században",
          "Az ókorban"
        ],
        correctAnswer: 1
      },
      {
        question: "Mi a bimetalizmus?",
        options: [
          "Egy fém alapú pénz",
          "Papír alapú pénz",
          "Arany és ezüst együtt töltik be a pénz funkcióját",
          "Modern pénz"
        ],
        correctAnswer: 2
      }
    ]
  },

  // 11. oldal - Pénzhelyettesítő elméletek
  {
    id: 11,
    pageNumber: 11,
    reading: {
      title: "Pénzhelyettesítő elméletek",
      content: `Sajnos az aranyból és ezüstből önthető \"pénzérmék\" mennyisége sem végtelen. A fejlődés és leginkább az iparosodás, óriási mértékű árukészletek, eszközök, ingatlanok, ingóságok cseréjének lebonyolítását tette szükségessé, amihez nem lehetett elégséges arany, ezüst pénzhelyettesítőt alkalmazni.

Currency elmélet: annyi pénzhelyettesítőt lehet, szabad forgalomba hozni, amennyi a mögöttes aranyfedezet. Banking elmélet: a pénzhelyettesítők kibocsátását nem a meglévő aranyfedezethez, hanem árufedezethez kell kötni.`,
      questions: [
        {
          question: "Miért volt szükség az aranyon túlmutató megoldásra?",
          answer: "az iparosodás óriási csereigényt teremtett",
          keywords: ["iparosodás", "csere", "óriási", "fejlődés"]
        },
        {
          question: "Mi a Currency elmélet lényege?",
          answer: "aranyfedezetű pénz",
          keywords: ["arany", "fedezet"]
        }
      ]
    },
    matching: [
      { id: 1, left: "Currency", right: "Aranyfedezetű" },
      { id: 2, left: "Banking", right: "Árufedezetű" },
      { id: 3, left: "Fedezet", right: "Mögöttes érték" },
      { id: 4, left: "Iparosodás", right: "Gazdasági fejlődés" },
      { id: 5, left: "Kibocsátás", right: "Forgalomba hozás" }
    ],
    quiz: [
      {
        question: "Miért volt szükség az aranyon túlmutató megoldásra?",
        options: [
          "Mert elfogyott az arany",
          "Mert az iparosodás óriási csereigényt teremtett",
          "Mert drága volt",
          "Mert nehéz volt"
        ],
        correctAnswer: 1
      },
      {
        question: "Mi a Currency elmélet lényege?",
        options: [
          "Árufedezetű pénz",
          "Aranyfedezetű pénz",
          "Szabadon kibocsátható pénz",
          "Papírpénz"
        ],
        correctAnswer: 1
      }
    ]
  },

  // 12. oldal - Rendeleti pénz
  {
    id: 12,
    pageNumber: 12,
    reading: {
      title: "Rendeleti pénz",
      content: `Meg is érkeztünk a modern pénz, fizetőeszköz fogalmához. A rendeleti pénz olyan pénz, amit valaki kötelezően forgalomba helyező, tartó és onnan kivonható, átalakítható jelleggel bocsát a gazdaságba, nyilvánvalóan erre jogosultsága az állami szabályozásnak lehet.

A rendeleti pénz mögöttes értéke egyéb áruban, de akár nemesfémben is kifejezhető, amint azt az \"Elrendelő\" a gazdaságba vezeti, de meghatározás nélkül is forgalomba bocsájthatja. A rendeleti jelleggel forgalomba helyezett rendeleti pénz elfogadásának kötelező a jellege.`,
      questions: [
        {
          question: "Ki bocsáthat ki rendeleti pénzt?",
          answer: "állami szabályozás jogosultja",
          keywords: ["állam", "szabályozás", "jogosult"]
        },
        {
          question: "Milyen a rendeleti pénz elfogadása?",
          answer: "kötelező",
          keywords: ["kötelező"]
        }
      ]
    },
    matching: [
      { id: 1, left: "Rendeleti pénz", right: "Modern pénz" },
      { id: 2, left: "Állami szabályozás", right: "Jogosultság" },
      { id: 3, left: "Forgalomba helyezés", right: "Kibocsátás" },
      { id: 4, left: "Kötelező elfogadás", right: "Törvényes fizetőeszköz" },
      { id: 5, left: "Nemzeti valuta", right: "Ország pénze" }
    ],
    quiz: [
      {
        question: "Ki bocsáthat ki rendeleti pénzt?",
        options: [
          "Bárki",
          "Bankok",
          "Állami szabályozás jogosultja",
          "Vállalatok"
        ],
        correctAnswer: 2
      },
      {
        question: "Milyen a rendeleti pénz elfogadása?",
        options: [
          "Önkéntes",
          "Kötelező",
          "Nem kötelező",
          "Opcionális"
        ],
        correctAnswer: 1
      }
    ]
  }
];

export const getTotalPages = () => penzugyiAlapismeretkLessons.length;

export const getTotalLessonsInFirstRound = () => penzugyiAlapismeretkLessons.length * 3; // 3 játék típus per oldal

export const getTotalLessonsInSecondRound = () => penzugyiAlapismeretkLessons.length; // Csak olvasás

export const getTotalLessons = () => getTotalLessonsInFirstRound() + getTotalLessonsInSecondRound();
