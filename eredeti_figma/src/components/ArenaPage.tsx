import { useState, useEffect } from "react";
import {
  X,
  Swords,
  TrendingUp,
  BarChart3,
  ChevronLeft,
  Trophy,
  Zap,
  Star,
  Crown,
  Flame,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "motion/react";
import { recordTaskCompletion } from "../utils/streakManager";
import { getGameConfig } from "../utils/gameConfig";

// Import all book data
import { tokepiaciSzotarData } from "../data/tokepiaciSzotar";
import { penzugyiAlapismeretkData } from "../data/penzugyiAlapismeretek";
import { penzugyiAlapismeretkArenaQuestions } from "../data/penzugyiAlapismeretkArenaQuestions";
import { befektetesAlapjaiData } from "../data/befektetesAlapjai";
import { reszvenyekData } from "../data/reszvenyekData";
import { kotvenyekData } from "../data/kotvenyekData";
import { portfolioKezelesData } from "../data/portfolioKezeles";
import { technikaiElemzesData } from "../data/technikaiElemzes";
import { fundamentalisElemzesData } from "../data/fundamentalisElemzes";
import { penzugyimatematikaData } from "../data/penzugyiMatematika";
import { opciokData } from "../data/opciok";
import { hatariidosUgyletekData } from "../data/hatariidosUgyletek";
import { kockazatkezelesData } from "../data/kockazatkezeles";
import { makrogazdasagData } from "../data/makrogazdasag";
import { kriptoEsBlockchainData } from "../data/kriptoEsBlockchain";
import { pszichologiaEsTradingData } from "../data/pszichologiaEsTrading";
import { ingatlanBefektetesData } from "../data/ingatlanBefektetes";

interface ArenaPageProps {
  onClose: () => void;
  coins: number;
  onCoinsChange: (newCoins: number) => void;
  subscriptionTier?: "free" | "pro" | "master";
  onLimitReached?: () => void;
  onXpGain?: (xpAmount: number) => void;
  onNavigateToLibrary?: () => void;
  onStageAdvance?: () => void;
  onStreakUpdate?: (
    newStreak: number,
    isFirstToday: boolean,
  ) => void;
}

interface RentedBook {
  title: string;
  rentedUntil: number;
  daysRented: number;
  color: string;
  textColor: string;
}

type GameMode = "numbers" | "patterns" | "stocks";
type GameState = "menu" | "betting" | "playing" | "result";

interface Question {
  question: string;
  correctAnswer: number;
  source: string;
}

// Generate numerical questions from book data
const generateQuestions = (): Question[] => {
  const allData = [
    ...tokepiaciSzotarData,
    ...befektetesAlapjaiData,
    ...reszvenyekData,
    ...kotvenyekData,
    ...portfolioKezelesData,
    ...technikaiElemzesData,
    ...fundamentalisElemzesData,
    ...penzugyimatematikaData,
    ...opciokData,
    ...hatariidosUgyletekData,
    ...kockazatkezelesData,
    ...makrogazdasagData,
    ...kriptoEsBlockchainData,
    ...pszichologiaEsTradingData,
    ...ingatlanBefektetesData,
  ];

  const questions: Question[] = [
    // === TŐKEPIACI SZÓTÁR (20 questions) ===
    {
      question: "Hány kereskedési nap van egy évben átlagosan?",
      correctAnswer: 252,
      source: "Tőkepiaci Szótár",
    },
    {
      question:
        "Mennyi a maximális napközbeni árfolyamváltozás az OTC piacon (%)?",
      correctAnswer: 10,
      source: "Tőkepiaci Szótár",
    },
    {
      question:
        "Hány másodperc alatt kell teljesíteni egy high-frequency trading megbízást?",
      correctAnswer: 1,
      source: "Tőkepiaci Szótár",
    },
    {
      question:
        "Mekkora a bid-ask spread átlagosan likvid részvényeknél (%)?",
      correctAnswer: 1,
      source: "Tőkepiaci Szótár",
    },
    {
      question:
        "Hány kereskedési szünet van a tőzsdén naponta?",
      correctAnswer: 1,
      source: "Tőkepiaci Szótár",
    },
    {
      question:
        "Hány pénznem közül lehet választani a forex piacon?",
      correctAnswer: 180,
      source: "Tőkepiaci Szótár",
    },
    {
      question:
        "Mekkora volumen felett tekintünk egy blokkkereskedést nagynak (millió)?",
      correctAnswer: 10,
      source: "Tőkepiaci Szótár",
    },
    {
      question: "Hány órás a New York-i tőzsde nyitvatartása?",
      correctAnswer: 6,
      source: "Tőkepiaci Szótár",
    },
    {
      question: "Mekkora a minimális tick size cent-ben?",
      correctAnswer: 1,
      source: "Tőkepiaci Szótár",
    },
    {
      question:
        "Hány milliszekundumban dolgozik egy algoritmus kereskedési rendszer?",
      correctAnswer: 10,
      source: "Tőkepiaci Szótár",
    },
    {
      question:
        "Mekkora jutalékot számolnak fel átlagosan online brókerek (USD)?",
      correctAnswer: 5,
      source: "Tőkepiaci Szótár",
    },
    {
      question:
        "Hány másodperc a maximum order végrehajtási idő?",
      correctAnswer: 15,
      source: "Tőkepiaci Szótár",
    },
    {
      question:
        "Mekkora a minimális lot méret forex kereskedésben (ezer)?",
      correctAnswer: 1,
      source: "Tőkepiaci Szótár",
    },
    {
      question:
        "Hány órás időeltolódás van London és New York között?",
      correctAnswer: 5,
      source: "Tőkepiaci Szótár",
    },
    {
      question:
        "Mekkora a circuit breaker küszöb az amerikai tőzsdén (%)?",
      correctAnswer: 7,
      source: "Tőkepiaci Szótár",
    },
    {
      question: "Hány percig tart egy circuit breaker szünet?",
      correctAnswer: 15,
      source: "Tőkepiaci Szótár",
    },
    {
      question: "Mekkora a margin call szintje általában (%)?",
      correctAnswer: 25,
      source: "Tőkepiaci Szótár",
    },
    {
      question: "Hány éves a NYSE tőzsde (évtizedek)?",
      correctAnswer: 23,
      source: "Tőkepiaci Szótár",
    },
    {
      question: "Mekkora a short selling limit amerikában (%)?",
      correctAnswer: 50,
      source: "Tőkepiaci Szótár",
    },
    {
      question: "Hány tizedes jegyig árazzák a részvényeket?",
      correctAnswer: 2,
      source: "Tőkepiaci Szótár",
    },

    ...penzugyiAlapismeretkArenaQuestions,

    // === BEFEKTETÉS ALAPJAI (20 questions) ===
    {
      question:
        "Mennyi a maximális adólevonás részvény értékesítésnél Magyarországon (%)?",
      correctAnswer: 15,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Hány éves időtávra ajánlott részvényekbe fektetni minimum?",
      correctAnswer: 5,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Hány év múlva várható pozitív hozam 95% valószínűséggel részvényből?",
      correctAnswer: 10,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Mekkora összegből érdemes elkezdeni a befektetést (ezer Ft)?",
      correctAnswer: 100,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Hány hónapos vészhelyzeti tartalékot javasolnak?",
      correctAnswer: 6,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Mekkora költségráta felett drága egy befektetési alap (%)?",
      correctAnswer: 2,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Hány százalékos infláció ellen véd a befektetés?",
      correctAnswer: 5,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Mekkora hozamot vártunk indexkövető alapoktól évente (%)?",
      correctAnswer: 8,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Hány különböző eszközosztályba fektessünk minimum?",
      correctAnswer: 3,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Mekkora a minimális diverzifikációs szint (eszköz darabszám)?",
      correctAnswer: 10,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Hány éves korban érdemes elkezdeni a nyugdíjcélú megtakarítást?",
      correctAnswer: 25,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Mekkora összeg fölött érdemes tanácsadót igénybe venni (millió Ft)?",
      correctAnswer: 10,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Hány százalékot takarítsunk meg a fizetésünkből havonta?",
      correctAnswer: 20,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Mekkora a tőkevédett befektetések átlagos hozama (%)?",
      correctAnswer: 3,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Hány éves befektetési tapasztalat kell a professzionális státuszhoz?",
      correctAnswer: 2,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Mekkora likviditási prémiumot kapunk hosszabb lekötésért (%)?",
      correctAnswer: 2,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Hány százalékos adókedvezményt kapunk nyugdíjbiztosításra?",
      correctAnswer: 20,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Mekkora az államkötvények minimális vásárlási egysége (ezer Ft)?",
      correctAnswer: 10,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Hány éves futamidőt válasszunk célhoz kötött megtakarításra?",
      correctAnswer: 3,
      source: "Befektetés Alapjai",
    },
    {
      question:
        "Mekkora összeget fektessünk egy eszközbe maximum (millió Ft)?",
      correctAnswer: 5,
      source: "Befektetés Alapjai",
    },

    // === RÉSZVÉNYEK (25 questions) ===
    {
      question:
        "Hány százalékos hozamot hozott átlagosan az S&P 500 index hosszú távon évente?",
      correctAnswer: 10,
      source: "Részvények",
    },
    {
      question:
        "Hány napon belül kell teljesíteni a részvényvásárlást (T+)?",
      correctAnswer: 2,
      source: "Részvények",
    },
    {
      question:
        "Hány hónapig lehet halasztani az osztalék kifizetést?",
      correctAnswer: 6,
      source: "Részvények",
    },
    {
      question:
        "Hány vállalat részvényét tartalmazza az S&P 500 index?",
      correctAnswer: 500,
      source: "Részvények",
    },
    {
      question:
        "Hány legnagyobb amerikai vállalatot tartalmaz a Dow Jones index?",
      correctAnswer: 30,
      source: "Részvények",
    },
    {
      question:
        "Hány német blue chip részvényt tartalmaz a DAX index?",
      correctAnswer: 40,
      source: "Részvények",
    },
    {
      question: "Hány vállalatból áll a Nasdaq-100 index?",
      correctAnswer: 100,
      source: "Részvények",
    },
    {
      question:
        "Hány cég van a BUX indexben (Budapesti Értéktőzsde)?",
      correctAnswer: 13,
      source: "Részvények",
    },
    {
      question:
        "Mekkora piaci kapitalizációnál beszélünk blue chip részvényről (milliárd USD)?",
      correctAnswer: 10,
      source: "Részvények",
    },
    {
      question:
        "Hány részvény tartozik a small cap kategóriába a piaci kapitalizáció alapján (millió-milliárd USD)?",
      correctAnswer: 2,
      source: "Részvények",
    },
    {
      question:
        "Mekkora free float szükséges a tőzsdei bevezetéshez (%)?",
      correctAnswer: 25,
      source: "Részvények",
    },
    {
      question:
        "Hány éves történelemre van szükség az IPO-hoz?",
      correctAnswer: 3,
      source: "Részvények",
    },
    {
      question:
        "Mekkora osztalékfizetési rátát tartanak fenntarthatónak (%)?",
      correctAnswer: 60,
      source: "Részvények",
    },
    {
      question:
        "Hány napig tart egy átlagos roadshow IPO előtt?",
      correctAnswer: 14,
      source: "Részvények",
    },
    {
      question:
        "Mekkora a részvény árfolyam emelkedés átlaga IPO első napján (%)?",
      correctAnswer: 18,
      source: "Részvények",
    },
    {
      question: "Hány szavazati jogot ad egy törzsrészvény?",
      correctAnswer: 1,
      source: "Részvények",
    },
    {
      question:
        "Mekkora prémiumot fizetnek előrészvényért átlagosan (%)?",
      correctAnswer: 5,
      source: "Részvények",
    },
    {
      question:
        "Hány napos lock-up periódus van IPO után insidereknél?",
      correctAnswer: 180,
      source: "Részvények",
    },
    {
      question:
        "Mekkora a részvény split átlagos aránya (pl 2:1 esetén)?",
      correctAnswer: 2,
      source: "Részvények",
    },
    {
      question:
        "Hány százalékos árfolyamesés vált ki margin callt?",
      correctAnswer: 30,
      source: "Részvények",
    },
    {
      question:
        "Mekkora insider tulajdon felett kell jelenteni (%)?",
      correctAnswer: 5,
      source: "Részvények",
    },
    {
      question:
        "Hány napig tartanak a részvények ex-dividend státuszban?",
      correctAnswer: 1,
      source: "Részvények",
    },
    {
      question:
        "Mekkora market cap növekedés kell a mid capból large cap-be (%)?",
      correctAnswer: 100,
      source: "Részvények",
    },
    {
      question: "Hány részvényt tartalmaz az FTSE 100 index?",
      correctAnswer: 100,
      source: "Részvények",
    },
    {
      question: "Mekkora a penny stock maximális ára (USD)?",
      correctAnswer: 5,
      source: "Részvények",
    },

    // === KÖTVÉNYEK (20 questions) ===
    {
      question:
        "Mekkora a magyar állampapír átlagos éves hozama (%)?",
      correctAnswer: 5,
      source: "Kötvények",
    },
    {
      question:
        "Hány éves államkötvényt tartanak a leglikvidebb benchmarknak?",
      correctAnswer: 10,
      source: "Kötvények",
    },
    {
      question:
        "Mekkora hozamot várunk kötvényektől biztonságos befektetésként (%)?",
      correctAnswer: 4,
      source: "Kötvények",
    },
    {
      question:
        "Hány éves futamidejű a legtöbb vállalati kötvény?",
      correctAnswer: 5,
      source: "Kötvények",
    },
    {
      question:
        "Mekkora a kötvények és részvények ajánlott aránya 60/40 portfólióban (kötvény %)?",
      correctAnswer: 40,
      source: "Kötvények",
    },
    {
      question:
        "Hány százalékponttal magasabb a kockázatos kötvény hozama (spread)?",
      correctAnswer: 3,
      source: "Kötvények",
    },
    {
      question:
        "Hány hónapos időtávra ajánlott rövid lejáratú kötvényekbe fektetni?",
      correctAnswer: 12,
      source: "Kötvények",
    },
    {
      question:
        "Mekkora a kötvény névértéke jellemzően (ezer Ft)?",
      correctAnswer: 100,
      source: "Kötvények",
    },
    {
      question:
        "Hány százalékos kupon rátát fizetnek a magyar államkötvények?",
      correctAnswer: 6,
      source: "Kötvények",
    },
    {
      question:
        "Mekkora duration értéknél érzékeny a kötvény kamatváltozásra (év)?",
      correctAnswer: 5,
      source: "Kötvények",
    },
    {
      question: "Hány évente fizetnek kamatot a kötvények?",
      correctAnswer: 1,
      source: "Kötvények",
    },
    {
      question:
        "Mekkora a befektetési kategóriás kötvény minimális rating (BBB)?",
      correctAnswer: 3,
      source: "Kötvények",
    },
    {
      question:
        "Hány bázisponttal magasabb a junk bond hozama?",
      correctAnswer: 500,
      source: "Kötvények",
    },
    {
      question:
        "Mekkora az infláció-kövező kötvények népszerű futamideje (év)?",
      correctAnswer: 5,
      source: "Kötvények",
    },
    {
      question:
        "Hány százalékos árfolyamveszteséget okoz 1% kamatemelés 10 éves kötvénynél?",
      correctAnswer: 10,
      source: "Kötvények",
    },
    {
      question:
        "Mekkora a zéró kuponos kötvény tipikus futamideje (év)?",
      correctAnswer: 10,
      source: "Kötvények",
    },
    {
      question:
        "Hány évente értékelik újra a hitelminősítők a kötvényeket?",
      correctAnswer: 1,
      source: "Kötvények",
    },
    {
      question:
        "Mekkora konvexitás érték felett nem lineáris a kötvény ára?",
      correctAnswer: 1,
      source: "Kötvények",
    },
    {
      question:
        "Hány százalékos recovery rate-tel számolnak bedőlt vállalati kötvényeknél?",
      correctAnswer: 40,
      source: "Kötvények",
    },
    {
      question:
        "Mekkora callprémiumot fizetnek visszahívható kötvényeknél (%)?",
      correctAnswer: 3,
      source: "Kötvények",
    },

    // === KOCKÁZATKEZELÉS (25 questions) ===
    {
      question:
        "Mekkora veszteségnél zárjuk általában az pozíciót a stop loss stratégiában (%)?",
      correctAnswer: 5,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Hány százalékát ajánlják maximum egy tradehez kockáztatni a portfólióból?",
      correctAnswer: 2,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Hány százalékos volatilitás felett tekintjük kockázatosnak egy részvényt?",
      correctAnswer: 30,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Hány százalékot ne haladjon meg egy pozíció a teljes portfólióban?",
      correctAnswer: 20,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Mekkora VaR (Value at Risk) szintet tartanak elfogadhatónak (%)?",
      correctAnswer: 5,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Hány hónapos történeti adatot használnak VaR számításhoz?",
      correctAnswer: 12,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Mekkora konfidencia intervallumot használnak VaR-nál (%)?",
      correctAnswer: 95,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Hány százalékos maximum drawdown felett aggasztó a portfólió?",
      correctAnswer: 20,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Mekkora beta érték felett volatilis egy részvény?",
      correctAnswer: 1,
      source: "Kockázatkezelés",
    },
    {
      question: "Hány korrelálatlan eszközt tartsunk minimum?",
      correctAnswer: 8,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Mekkora standard deviáció felett kockázatos egy befektetés (%)?",
      correctAnswer: 20,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Hány százalékos tail risk eseménynél aktiválódik a hedge?",
      correctAnswer: 5,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Mekkora CVaR (Conditional VaR) limitet állítsunk be (%)?",
      correctAnswer: 10,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Hány napos stressz tesztet futtassunk a portfólión?",
      correctAnswer: 30,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Mekkora information ratio felett jó a kockázat-hozam arány?",
      correctAnswer: 1,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Hány különböző kockázati tényezőt monitorozzunk?",
      correctAnswer: 10,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Mekkora tracking error felett tévedünk el a benchmarktól (%)?",
      correctAnswer: 5,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Hány százalékos árfolyamesés után állítsuk át a hedget?",
      correctAnswer: 15,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Mekkora Sortino ratio felett optimális a downside védelem?",
      correctAnswer: 2,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Hány hónapig tartsunk short pozíciót fedezésként?",
      correctAnswer: 6,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Mekkora koncentrációs limit egy szektorban (%)?",
      correctAnswer: 25,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Hány különböző stop loss szintet alkalmazzunk?",
      correctAnswer: 3,
      source: "Kockázatkezelés",
    },
    {
      question: "Mekkora pénzáramlási tartalékot tartsunk (%)?",
      correctAnswer: 15,
      source: "Kockázatkezelés",
    },
    {
      question:
        "Hány éves historikus adatot elemezzünk kockázatelemzéshez?",
      correctAnswer: 5,
      source: "Kockázatkezelés",
    },
    {
      question: "Mekkora overnight risk limitet állítsunk (%)?",
      correctAnswer: 10,
      source: "Kockázatkezelés",
    },

    // === MAKROGAZDASÁG (25 questions) ===
    {
      question:
        "Mekkora inflációt tekintünk egészségesnek a gazdaságban (%)?",
      correctAnswer: 2,
      source: "Makrogazdaság",
    },
    {
      question:
        "Hány éves államkötvényt tartanak a leglikvidebb benchmarknak?",
      correctAnswer: 10,
      source: "Kötvények",
    },
    {
      question:
        "Hány év a tipikus gazdasági ciklus időtartama?",
      correctAnswer: 7,
      source: "Makrogazdaság",
    },
    {
      question:
        "Mekkora munkanélküliségi rátát tartanak természetesnek (%)?",
      correctAnswer: 5,
      source: "Makrogazdaság",
    },
    {
      question:
        "Hány százalékos GDP növekedést tekintünk egészségesnek?",
      correctAnswer: 3,
      source: "Makrogazdaság",
    },
    {
      question:
        "Mekkora jegybanki alapkamatot tartanak semlegesnek (%)?",
      correctAnswer: 3,
      source: "Makrogazdaság",
    },
    {
      question: "Hány hónapos késéssel jelenik meg a GDP adat?",
      correctAnswer: 3,
      source: "Makrogazdaság",
    },
    {
      question:
        "Mekkora költségvetési hiányt enged meg az EU (%)?",
      correctAnswer: 3,
      source: "Makrogazdaság",
    },
    {
      question:
        "Hány százalékos államadósság felett kritikus (GDP %-ban)?",
      correctAnswer: 60,
      source: "Makrogazdaság",
    },
    {
      question: "Mekkora a Fed célzott inflációja (%)?",
      correctAnswer: 2,
      source: "Makrogazdaság",
    },
    {
      question:
        "Hány hónapos recesszió után hivatalos a gazdasági visszaesés?",
      correctAnswer: 6,
      source: "Makrogazdaság",
    },
    {
      question:
        "Mekkora fizetési mérleg többlet egészséges (GDP %)?",
      correctAnswer: 3,
      source: "Makrogazdaság",
    },
    {
      question:
        "Hány bázispontos kamatlépést alkalmaz jellemzően a jegybank?",
      correctAnswer: 25,
      source: "Makrogazdaság",
    },
    {
      question: "Mekkora a PMI index határértéke növekedéshez?",
      correctAnswer: 50,
      source: "Makrogazdaság",
    },
    {
      question:
        "Hány éves kötvény hozamát használják benchmark-ként?",
      correctAnswer: 10,
      source: "Makrogazdaság",
    },
    {
      question:
        "Mekkora CPI növekedés tekinthető hiperinflációnak (% havonta)?",
      correctAnswer: 50,
      source: "Makrogazdaság",
    },
    {
      question:
        "Hány negyedéves GDP csökkenés jelent technikai recessziót?",
      correctAnswer: 2,
      source: "Makrogazdaság",
    },
    {
      question:
        "Mekkora devizatartalékot tart egy ország GDP %-ában?",
      correctAnswer: 15,
      source: "Makrogazdaság",
    },
    {
      question:
        "Hány százalékos a Taylor-szabály ajánlott kamatlépése?",
      correctAnswer: 50,
      source: "Makrogazdaság",
    },
    {
      question:
        "Mekkora fogyasztás a GDP-ből fejlett országokban (%)?",
      correctAnswer: 70,
      source: "Makrogazdaság",
    },
    {
      question:
        "Hány éves kötvény spread jelzi a recessziót (yield curve)?",
      correctAnswer: 2,
      source: "Makrogazdaság",
    },
    {
      question:
        "Mekkora a munkaerő-piaci részvételi ráta ideálisan (%)?",
      correctAnswer: 65,
      source: "Makrogazdaság",
    },
    {
      question:
        "Hány hónapos kereskedelmi mérleg adatot nézünk trendhez?",
      correctAnswer: 12,
      source: "Makrogazdaság",
    },
    {
      question:
        "Mekkora a termelékenység növekedés évente fejlett gazdaságokban (%)?",
      correctAnswer: 2,
      source: "Makrogazdaság",
    },
    {
      question:
        "Hány százalékos bérnövekedés fenntartható inflációval?",
      correctAnswer: 3,
      source: "Makrogazdaság",
    },
    {
      question:
        "Mekkora az optimális monetáris bázis a GDP %-ában?",
      correctAnswer: 20,
      source: "Makrogazdaság",
    },

    // === PORTFÓLIÓKEZELÉS (25 questions) ===
    {
      question:
        "Hány részvényt ajánlanak minimum egy diverzifikált portfólióhoz?",
      correctAnswer: 15,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Mekkora likviditási tartalékot ajánlanak készpénzben (%)?",
      correctAnswer: 10,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Mekkora a Sharpe-ráta minimális elfogadható értéke?",
      correctAnswer: 1,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Hány százalék arany allokációt javasolnak védekező portfólióba?",
      correctAnswer: 10,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Mekkora nemzetközi diverzifikációt ajánlanak (% külföldi)?",
      correctAnswer: 30,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Hány különböző szektorba érdemes fektetni minimum?",
      correctAnswer: 8,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Milyen gyakran ajánlott a portfólió újrasúlyozása (hónap)?",
      correctAnswer: 6,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Hány éves befektetési horizontot javasolnak nyugdíjcélra?",
      correctAnswer: 30,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Mekkora az optimális részvény allokáció 30 éves korban (%)?",
      correctAnswer: 80,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Hány eszközt tartalmazzon egy jól diverzifikált portfólió minimum?",
      correctAnswer: 20,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Mekkora korreláció alatt tekintjük jónak a diverzifikációt?",
      correctAnswer: 5,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Hány százalékos turnover ratio felett aktív a kezelés?",
      correctAnswer: 50,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Mekkora alpha generálás tekinthető sikeresnek évente (%)?",
      correctAnswer: 3,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Hány évenként változtassuk a stratégiai allokációt?",
      correctAnswer: 5,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Mekkora a taktikai allokáció maximum eltérése (%)?",
      correctAnswer: 10,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Hány különböző valutatípust tartsunk portfólióban?",
      correctAnswer: 3,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Mekkora az ESG portfólió tracking error-ja tipikusan (%)?",
      correctAnswer: 2,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Hány százalékos alternatív befektetést javasnak intézményi portfólióba?",
      correctAnswer: 20,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Mekkora a minimális portfólió méret professzionális kezeléshez (millió Ft)?",
      correctAnswer: 50,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Hány hónapos teljesítményt értékelünk stratégia változtatás előtt?",
      correctAnswer: 12,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Mekkora kezelési díj elfogadható aktív portfóliókezelésnél (%)?",
      correctAnswer: 1,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Hány faktor modellt használnak modern portfóliókezelésben?",
      correctAnswer: 5,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Mekkora az életkor alapú részvény allokáció 60 éves kornál (%)?",
      correctAnswer: 40,
      source: "Portfóliókezelés",
    },
    {
      question: "Hány különböző időhorizont pozíciót tartsunk?",
      correctAnswer: 4,
      source: "Portfóliókezelés",
    },
    {
      question:
        "Mekkora cash drag elfogadható egy portfólióban (%)?",
      correctAnswer: 5,
      source: "Portfóliókezelés",
    },

    // === KRIPTO ÉS BLOCKCHAIN (20 questions) ===
    {
      question:
        "Mennyi volt a Bitcoin maximális árfolyama (ezer USD)?",
      correctAnswer: 69,
      source: "Kripto és Blockchain",
    },
    {
      question: "Hány Bitcoin létezhet összesen (millió)?",
      correctAnswer: 21,
      source: "Kripto és Blockchain",
    },
    {
      question:
        "Hány percenként bányásznak egy új Bitcoin blokkot?",
      correctAnswer: 10,
      source: "Kripto és Blockchain",
    },
    {
      question:
        "Hány évenként felezik meg a Bitcoin bányászati jutalmát (halving)?",
      correctAnswer: 4,
      source: "Kripto és Blockchain",
    },
    {
      question:
        "Hány Ethereum létezik jelenleg forgalomban (millió)?",
      correctAnswer: 120,
      source: "Kripto és Blockchain",
    },
    {
      question:
        "Mekkora tranzakciós díjat számolnak fel átlagosan a kriptotőzsdék (%)?",
      correctAnswer: 1,
      source: "Kripto és Blockchain",
    },
    {
      question:
        "Hány megerősítés kell egy Bitcoin tranzakcióhoz?",
      correctAnswer: 6,
      source: "Kripto és Blockchain",
    },
    {
      question: "Mekkora a Bitcoin blokk mérete (MB)?",
      correctAnswer: 1,
      source: "Kripto és Blockchain",
    },
    {
      question: "Hány Satoshi van egy Bitcoinban (millió)?",
      correctAnswer: 100,
      source: "Kripto és Blockchain",
    },
    {
      question:
        "Mekkora a Proof of Stake validátor minimális téte Ethereumnál?",
      correctAnswer: 32,
      source: "Kripto és Blockchain",
    },
    {
      question: "Hány másodperc az Ethereum blokk idő?",
      correctAnswer: 12,
      source: "Kripto és Blockchain",
    },
    {
      question:
        "Mekkora gas limit van egy Ethereum blokkon (millió)?",
      correctAnswer: 30,
      source: "Kripto és Blockchain",
    },
    {
      question: "Hány különböző kriptovaluta létezik (ezer)?",
      correctAnswer: 20,
      source: "Kripto és Blockchain",
    },
    {
      question:
        "Mekkora a DeFi teljes zárolva lévő érték (milliárd USD)?",
      correctAnswer: 50,
      source: "Kripto és Blockchain",
    },
    {
      question:
        "Hány százalékos APY-t kínálnak staking platformok átlagosan?",
      correctAnswer: 5,
      source: "Kripto és Blockchain",
    },
    {
      question:
        "Mekkora allokációt javasolnak kripto eszközökbe portfólióból (%)?",
      correctAnswer: 5,
      source: "Kripto és Blockchain",
    },
    {
      question:
        "Hány node-ot üzemeltet a Bitcoin hálózat (ezer)?",
      correctAnswer: 15,
      source: "Kripto és Blockchain",
    },
    {
      question:
        "Mekkora a Lightning Network kapacitása (ezer BTC)?",
      correctAnswer: 5,
      source: "Kripto és Blockchain",
    },
    {
      question:
        "Hány tizedesjegyig osztható az Ethereum (wei exponense)?",
      correctAnswer: 18,
      source: "Kripto és Blockchain",
    },
    {
      question:
        "Mekkora hash rate kell a Bitcoin hálózat biztonságához (exahash)?",
      correctAnswer: 400,
      source: "Kripto és Blockchain",
    },

    // === TECHNIKAI ELEMZÉS (25 questions) ===
    {
      question:
        "Hány napos mozgóátlagot használnak gyakran rövid távú elemzéshez?",
      correctAnswer: 50,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Hány napos az EMA (exponenciális mozgóátlag) népszerű időtávja?",
      correctAnswer: 200,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Mekkora RSI érték felett tekintjük túlvettnek a piacot?",
      correctAnswer: 70,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Mekkora RSI érték alatt tekintjük túladottnak a piacot?",
      correctAnswer: 30,
      source: "Technikai Elemzés",
    },
    {
      question: "Hány napot használnak a MACD gyors vonalához?",
      correctAnswer: 12,
      source: "Technikai Elemzés",
    },
    {
      question: "Hány napot használnak a MACD lassú vonalához?",
      correctAnswer: 26,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Hány napos a Bollinger szalag standard beállítása?",
      correctAnswer: 20,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Hány standard deviációt használnak a Bollinger szalagoknál?",
      correctAnswer: 2,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Hány napos az ATR (Average True Range) alapbeállítása?",
      correctAnswer: 14,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Mekkora stochastic oszcillátor érték jelzi a túlvett állapotot?",
      correctAnswer: 80,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Hány időszakot használ a Fibonacci retracement?",
      correctAnswer: 5,
      source: "Technikai Elemzés",
    },
    {
      question: "Mekkora ADX érték felett erős a trend?",
      correctAnswer: 25,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Hány napos a CCI (Commodity Channel Index) beállítása?",
      correctAnswer: 20,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Mekkora volume növekedés jelzi az áttörést (%)?",
      correctAnswer: 50,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Hány gyertya kell egy Doji pattern megerősítéséhez?",
      correctAnswer: 3,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Mekkora Fibonacci szint a legerősebb támasz (%)?",
      correctAnswer: 62,
      source: "Technikai Elemzés",
    },
    {
      question: "Hány hullámból áll az Elliott Wave elmélet?",
      correctAnswer: 8,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Mekkora OBV (On Balance Volume) divergencia jelzi fordulót?",
      correctAnswer: 10,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Hány support/resistance szintet rajzoljunk egy chartba?",
      correctAnswer: 3,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Mekkora pip mozgás kell a breakout megerősítéséhez?",
      correctAnswer: 20,
      source: "Technikai Elemzés",
    },
    {
      question: "Hány gyertya alkotja a harmonic pattern-t?",
      correctAnswer: 5,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Mekkora Williams %R érték jelzi a túladott zónát?",
      correctAnswer: 20,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Hány napos a Parabolic SAR acceleration faktora?",
      correctAnswer: 2,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Mekkora Ichimoku cloud méret jelzi erős trendet?",
      correctAnswer: 20,
      source: "Technikai Elemzés",
    },
    {
      question: "Hány candlestick pattern van összesen?",
      correctAnswer: 35,
      source: "Technikai Elemzés",
    },
    {
      question:
        "Mekkora timeframe-n működik legjobban a swing trading (óra)?",
      correctAnswer: 4,
      source: "Technikai Elemzés",
    },

    // === FUNDAMENTÁLIS ELEMZÉS (25 questions) ===
    {
      question:
        "Mekkora P/E rátió felett tekintjük túlértékeltnek egy részvényt?",
      correctAnswer: 25,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Hány százalékos ROE feletti értéket tartanak kiválónak?",
      correctAnswer: 15,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Mekkora az ideális működési árrés (operating margin) (%)?",
      correctAnswer: 20,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Mekkora debt-to-equity rátió alatt tartunk egy vállalatot stabilan finanszírozott?",
      correctAnswer: 1,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Hány százalékos osztalékhozamot tekintünk jónak?",
      correctAnswer: 4,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Mekkora árbevétel növekedést várunk egy növekedési részvénytől (%)?",
      correctAnswer: 20,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Hány éves FCF (Free Cash Flow) kell az értékeléshez?",
      correctAnswer: 5,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Mekkora EV/EBITDA multiplikátor alatti értéket tekintünk olcsónak?",
      correctAnswer: 10,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Hány százalékos ROIC (Return on Invested Capital) kiváló?",
      correctAnswer: 20,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Mekkora price-to-book rátió alatti érték jelzi az alulértékeltséget?",
      correctAnswer: 1,
      source: "Fundamentális Elemzés",
    },
    {
      question: "Hány negyedéves earnings reportot elemezzünk?",
      correctAnswer: 8,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Mekkora insider ownership ideális egy vállalatban (%)?",
      correctAnswer: 15,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Hány százalékos gross margin kell technológiai vállalatoknak?",
      correctAnswer: 70,
      source: "Fundamentális Elemzés",
    },
    {
      question: "Mekkora current ratio kell a likviditáshoz?",
      correctAnswer: 2,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Hány éves történeti adatot elemezzünk DCF modellnél?",
      correctAnswer: 10,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Mekkora PEG ratio alatti érték jelzi a jó növekedési értéket?",
      correctAnswer: 1,
      source: "Fundamentális Elemzés",
    },
    {
      question: "Hány százalékos net margin egészséges?",
      correctAnswer: 10,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Mekkora asset turnover rátió hatékony működést jelez?",
      correctAnswer: 2,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Hány éves forward P/E-t használunk prognózishoz?",
      correctAnswer: 1,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Mekkora interest coverage ratio biztonságos (%)?",
      correctAnswer: 5,
      source: "Fundamentális Elemzés",
    },
    {
      question: "Hány százalékos buyback program pozitív jel?",
      correctAnswer: 10,
      source: "Fundamentális Elemzés",
    },
    {
      question: "Mekkora working capital ratio optimális?",
      correctAnswer: 2,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Hány negyedéves earnings beat kell a bullish trendhez?",
      correctAnswer: 4,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Mekkora price-to-sales rátió alatti érték vonzó?",
      correctAnswer: 2,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Hány százalékos R&D ráfordítás jelzi az innovációt?",
      correctAnswer: 15,
      source: "Fundamentális Elemzés",
    },
    {
      question:
        "Mekkora dividend payout ratio fenntartható hosszútávon (%)?",
      correctAnswer: 50,
      source: "Fundamentális Elemzés",
    },

    // === OPCIÓK (20 questions) ===
    {
      question: "Hány napig él egy standard részvényopció?",
      correctAnswer: 90,
      source: "Opciók",
    },
    {
      question:
        "Hány részvényt tartalmaz egy standard opciós kontraktus?",
      correctAnswer: 100,
      source: "Opciók",
    },
    {
      question:
        "Mekkora delta értéknél van az opció 'at-the-money'?",
      correctAnswer: 50,
      source: "Opciók",
    },
    {
      question: "Hány százalékos implied volatilitás magas?",
      correctAnswer: 30,
      source: "Opciók",
    },
    {
      question:
        "Mekkora gamma érték jelzi a gyors delta változást?",
      correctAnswer: 5,
      source: "Opciók",
    },
    {
      question: "Hány naponta csökken az opció theta értéke?",
      correctAnswer: 1,
      source: "Opciók",
    },
    {
      question:
        "Mekkora vega érték jelzi az volatilitás érzékenységet?",
      correctAnswer: 10,
      source: "Opciók",
    },
    {
      question:
        "Hány strike price szintet használunk egy option chain-ben?",
      correctAnswer: 10,
      source: "Opciók",
    },
    {
      question:
        "Mekkora moneyness százalék az OTM (out-of-the-money) opciónál?",
      correctAnswer: 10,
      source: "Opciók",
    },
    {
      question:
        "Hány nappal lejárat előtt zárjuk a pozíciót theta decay miatt?",
      correctAnswer: 7,
      source: "Opciók",
    },
    {
      question:
        "Mekkora prémium ROI célt tűzzünk ki option sellingnél (%)?",
      correctAnswer: 2,
      source: "Opciók",
    },
    {
      question: "Hány különböző option stratégiát használunk?",
      correctAnswer: 20,
      source: "Opciók",
    },
    {
      question:
        "Mekkora breakeven pont mozgás kell straddlenél (%)?",
      correctAnswer: 15,
      source: "Opciók",
    },
    {
      question:
        "Hány leg-et tartalmaz az iron condor stratégia?",
      correctAnswer: 4,
      source: "Opciók",
    },
    {
      question:
        "Mekkora maximum profit van credit spread-nél (prémium %)?",
      correctAnswer: 100,
      source: "Opciók",
    },
    {
      question:
        "Hány százalékos IV rank felett érdemes eladni az opciót?",
      correctAnswer: 50,
      source: "Opciók",
    },
    {
      question:
        "Mekkora rho értéknél érzékeny az opció kamatváltozásra?",
      correctAnswer: 1,
      source: "Opciók",
    },
    {
      question: "Hány hét múlva jár le a monthly opció?",
      correctAnswer: 4,
      source: "Opciók",
    },
    {
      question:
        "Mekkora win rate elég covered call stratégiánál (%)?",
      correctAnswer: 65,
      source: "Opciók",
    },
    {
      question:
        "Hány százalékos portfolio allokációt javasolnak opciókra?",
      correctAnswer: 10,
      source: "Opciók",
    },

    // === HATÁRIDŐS ÜGYLETEK (15 questions) ===
    {
      question:
        "Mekkora letétet kell adni határidős ügyletnél (% a szerződés értékéből)?",
      correctAnswer: 10,
      source: "Határidős ügyletek",
    },
    {
      question:
        "Hány százalékos tőkeáttételt lehet elérni határidős ügyletekkel?",
      correctAnswer: 10,
      source: "Határidős ügyletek",
    },
    {
      question:
        "Mi a maximális tőkeáttétel szorzó amit kezdőknek javasolnak?",
      correctAnswer: 2,
      source: "Határidős ügyletek",
    },
    {
      question:
        "Hány hónapos futures kontraktus a legnépszerűbb?",
      correctAnswer: 3,
      source: "Határidős ügyletek",
    },
    {
      question:
        "Mekkora tick méret az S&P 500 futures kontraktuson?",
      correctAnswer: 25,
      source: "Határidős ügyletek",
    },
    {
      question:
        "Hány kontraktust kötnek naponta az E-mini S&P-ben (ezer)?",
      correctAnswer: 2000,
      source: "Határidős ügyletek",
    },
    {
      question:
        "Mekkora contango százalék normális olajpiacon?",
      correctAnswer: 5,
      source: "Határidős ügyletek",
    },
    {
      question:
        "Hány nappal lejárat előtt rolloljuk a futures pozíciót?",
      correctAnswer: 5,
      source: "Határidős ügyletek",
    },
    {
      question:
        "Mekkora basis risk elfogadható hedgingnél (%)?",
      correctAnswer: 2,
      source: "Határidős ügyletek",
    },
    {
      question:
        "Hány különböző commodity futures kategória van?",
      correctAnswer: 5,
      source: "Határidős ügyletek",
    },
    {
      question:
        "Mekkora initial margin egy mini futures kontraktushoz (USD)?",
      correctAnswer: 500,
      source: "Határidős ügyletek",
    },
    {
      question:
        "Hány percentage point a maintenance margin a kezdeti margin %-ában?",
      correctAnswer: 75,
      source: "Határidős ügyletek",
    },
    {
      question:
        "Mekkora backwardation jelzi a szűkös kínálatot (%)?",
      correctAnswer: 10,
      source: "Határidős ügyletek",
    },
    {
      question:
        "Hány tick mozgás jelent $50 profitot E-mini-nél?",
      correctAnswer: 2,
      source: "Határidős ügyletek",
    },
    {
      question:
        "Mekkora spread költség van futures kereskedésnél (tick)?",
      correctAnswer: 1,
      source: "Határidős ügyletek",
    },

    // === PÉNZÜGYI MATEMATIKA (20 questions) ===
    {
      question:
        "Hány év múlva duplázódik a pénzünk 7% kamatos kamattal?",
      correctAnswer: 10,
      source: "Pénzügyi Matematika",
    },
    {
      question:
        "Mekkora kamattal duplázódik a pénzünk 10 év alatt (%)?",
      correctAnswer: 7,
      source: "Pénzügyi Matematika",
    },
    {
      question:
        "Hány év múlva duplázódik a pénzünk 72-es szabály szerint 6% kamaton?",
      correctAnswer: 12,
      source: "Pénzügyi Matematika",
    },
    {
      question:
        "Mekkora reálhozamot kapunk 8% névleges hozam és 3% infláció mellett (%)?",
      correctAnswer: 5,
      source: "Pénzügyi Matematika",
    },
    {
      question:
        "Hány százalékos éves hozam szükséges a háromszoroshoz 10 év alatt?",
      correctAnswer: 12,
      source: "Pénzügyi Matematika",
    },
    {
      question:
        "Mekkora a jelenérték 100 Ft-nak 1 év múlva 5% kamaton?",
      correctAnswer: 95,
      source: "Pénzügyi Matematika",
    },
    {
      question:
        "Hány éves annuitás kellő 1 millió Ft összegyűjtéséhez 100k/év mellett?",
      correctAnswer: 7,
      source: "Pénzügyi Matematika",
    },
    {
      question:
        "Mekkora CAGR (Compound Annual Growth Rate) 100%-os hozamnál 5 év alatt (%)?",
      correctAnswer: 15,
      source: "Pénzügyi Matematika",
    },
    {
      question:
        "Hány százalékos kamat kell a megduplázódáshoz 12 év alatt?",
      correctAnswer: 6,
      source: "Pénzügyi Matematika",
    },
    {
      question:
        "Mekkora NPV (Net Present Value) kell egy projekt elfogadásához (millió)?",
      correctAnswer: 1,
      source: "Pénzügyi Matematika",
    },
    {
      question: "Hány éves a payback periód egy jó projektnél?",
      correctAnswer: 3,
      source: "Pénzügyi Matematika",
    },
    {
      question:
        "Mekkora IRR (Internal Rate of Return) minimálisan elfogadható (%)?",
      correctAnswer: 15,
      source: "Pénzügyi Matematika",
    },
    {
      question:
        "Hány százalékos diszkont rátát használunk DCF számításnál?",
      correctAnswer: 10,
      source: "Pénzügyi Matematika",
    },
    {
      question:
        "Mekkora terminal growth rate reális hosszútávon (%)?",
      correctAnswer: 3,
      source: "Pénzügyi Matematika",
    },
    {
      question:
        "Hány éves perpetuity kellő biztos cash flow-hoz?",
      correctAnswer: 100,
      source: "Pénzügyi Matematika",
    },
    {
      question:
        "Mekkora effective annual rate 12% mellett havonkénti tőkésítésnél (%)?",
      correctAnswer: 13,
      source: "Pénzügyi Matematika",
    },
    {
      question:
        "Hány hónap alatt térül meg egy 6% hozamú befektetés?",
      correctAnswer: 12,
      source: "Pénzügyi Matematika",
    },
    {
      question: "Mekkora az annuitás faktor 5 évre 8% kamaton?",
      correctAnswer: 4,
      source: "Pénzügyi Matematika",
    },
    {
      question:
        "Hány százalékos infláció mellett veszít 50%-ot a pénz 10 év alatt?",
      correctAnswer: 7,
      source: "Pénzügyi Matematika",
    },
    {
      question:
        "Mekkora a future value 1000 Ft-nak 5 év múlva 10% kamaton?",
      correctAnswer: 1610,
      source: "Pénzügyi Matematika",
    },

    // === PSZICHOLÓGIA ÉS TRADING (20 questions) ===
    {
      question:
        "Hány perces meditációt javasolnak kereskedés előtt?",
      correctAnswer: 10,
      source: "Pszichológia és Trading",
    },
    {
      question:
        "Hány százalékos profit után ajánlott profitot realizálni?",
      correctAnswer: 20,
      source: "Pszichológia és Trading",
    },
    {
      question:
        "Hány órát kell aludni optimális döntéshozatalhoz?",
      correctAnswer: 8,
      source: "Pszichológia és Trading",
    },
    {
      question:
        "Hány egymást követő veszteség után érdemes szünetet tartani?",
      correctAnswer: 3,
      source: "Pszichológia és Trading",
    },
    {
      question:
        "Hány százaléknál húzzuk a trailing stop-losst?",
      correctAnswer: 10,
      source: "Pszichológia és Trading",
    },
    {
      question:
        "Mekkora confidence level reális sikeres traderekre (%)?",
      correctAnswer: 55,
      source: "Pszichológia és Trading",
    },
    {
      question:
        "Hány nap múlva értékeljük újra a trading stratégiánkat?",
      correctAnswer: 30,
      source: "Pszichológia és Trading",
    },
    {
      question:
        "Mekkora maximális napi veszteség limit legyen (%)?",
      correctAnswer: 2,
      source: "Pszichológia és Trading",
    },
    {
      question: "Hány perc szünet kell két trade között?",
      correctAnswer: 15,
      source: "Pszichológia és Trading",
    },
    {
      question:
        "Mekkora risk-reward rátió minimum egy trade-nél?",
      correctAnswer: 2,
      source: "Pszichológia és Trading",
    },
    {
      question: "Hány trade után elemezzük a teljesítményt?",
      correctAnswer: 20,
      source: "Pszichológia és Trading",
    },
    {
      question:
        "Mekkora az optimális trade size a portfólió %-ában?",
      correctAnswer: 5,
      source: "Pszichológia és Trading",
    },
    {
      question: "Hány órát töltsünk napi elemzéssel?",
      correctAnswer: 2,
      source: "Pszichológia és Trading",
    },
    {
      question: "Mekkora napi profit cél reális (%)?",
      correctAnswer: 1,
      source: "Pszichológia és Trading",
    },
    {
      question:
        "Hány különböző eszközt kövessünk egyszerre maximum?",
      correctAnswer: 5,
      source: "Pszichológia és Trading",
    },
    {
      question:
        "Mekkora recovery time kell nagy veszteség után (nap)?",
      correctAnswer: 7,
      source: "Pszichológia és Trading",
    },
    {
      question:
        "Hány százalékos drawdown után változtassunk stratégiát?",
      correctAnswer: 15,
      source: "Pszichológia és Trading",
    },
    {
      question:
        "Mekkora FOMO (fear of missing out) tolerancia szint?",
      correctAnswer: 5,
      source: "Pszichológia és Trading",
    },
    {
      question:
        "Hány sikeres trade kell az önbizalom helyreállításához?",
      correctAnswer: 5,
      source: "Pszichológia és Trading",
    },
    {
      question:
        "Mekkora emotional control score kell a konzisztens sikerhez (%)?",
      correctAnswer: 80,
      source: "Pszichológia és Trading",
    },

    // === INGATLAN BEFEKTETÉS (20 questions) ===
    {
      question:
        "Hány százalékos önerőt kérnek jellemzően lakáshitelnél?",
      correctAnswer: 20,
      source: "Ingatlan Befektetés",
    },
    {
      question:
        "Hány éves megtérülést várunk egy bérbeadásnál?",
      correctAnswer: 15,
      source: "Ingatlan Befektetés",
    },
    {
      question:
        "Mekkora bérleti hozamot tekintünk jónak egy évben (%)?",
      correctAnswer: 6,
      source: "Ingatlan Befektetés",
    },
    {
      question:
        "Hány százalékos értéknövekedést várunk ingatlantól évente?",
      correctAnswer: 5,
      source: "Ingatlan Befektetés",
    },
    {
      question:
        "Mekkora árrést számolnak a tőkeáttételes ingatlan befektetésnél (%)?",
      correctAnswer: 3,
      source: "Ingatlan Befektetés",
    },
    {
      question:
        "Hány hónapos tartalékot kell képezni karbantartásra?",
      correctAnswer: 6,
      source: "Ingatlan Befektetés",
    },
    {
      question:
        "Mekkora vacancy rate-tel számoljunk bérlakásnál (%)?",
      correctAnswer: 8,
      source: "Ingatlan Befektetés",
    },
    {
      question:
        "Hány százalékos LTV (Loan-to-Value) optimális ingatlan vásárlásnál?",
      correctAnswer: 70,
      source: "Ingatlan Befektetés",
    },
    {
      question: "Mekkora cap rate jelzi a jó befektetést (%)?",
      correctAnswer: 8,
      source: "Ingatlan Befektetés",
    },
    {
      question:
        "Hány éves amortizációs időszakot választunk jelzáloghitelnél?",
      correctAnswer: 20,
      source: "Ingatlan Befektetés",
    },
    {
      question:
        "Mekkora cash-on-cash return elvárt évente (%)?",
      correctAnswer: 10,
      source: "Ingatlan Befektetés",
    },
    {
      question:
        "Hány százalékos management fee-t számolunk ingatlankezelésnél?",
      correctAnswer: 10,
      source: "Ingatlan Befektetés",
    },
    {
      question:
        "Mekkora maintenance költség az ingatlan értékének %-ában évente?",
      correctAnswer: 1,
      source: "Ingatlan Befektetés",
    },
    {
      question: "Hány hónapos bérleti szerződés optimális?",
      correctAnswer: 12,
      source: "Ingatlan Befektetés",
    },
    {
      question:
        "Mekkora inflation hedge nyújt az ingatlan évente (%)?",
      correctAnswer: 3,
      source: "Ingatlan Befektetés",
    },
    {
      question:
        "Hány ingatlannal diverzifikáljunk a portfóliót?",
      correctAnswer: 5,
      source: "Ingatlan Befektetés",
    },
    {
      question:
        "Mekkora DSCR (Debt Service Coverage Ratio) szükséges?",
      correctAnswer: 1,
      source: "Ingatlan Befektetés",
    },
    {
      question:
        "Hány éves holding periódus ideális ingatlan flippingnél?",
      correctAnswer: 2,
      source: "Ingatlan Befektetés",
    },
    {
      question:
        "Mekkora appreciation várható fejlődő területeken évente (%)?",
      correctAnswer: 10,
      source: "Ingatlan Befektetés",
    },
    {
      question:
        "Hány százalékos equity build-up várható 10 év alatt?",
      correctAnswer: 30,
      source: "Ingatlan Befektetés",
    },
  ];

  return questions;
};

// Available books for selection
const availableBooks = [
  "Tőkepiaci Szótár",
  "Pénzügyi Alapismeretek",
  "Befektetés Alapjai",
  "Részvények",
  "Kötvények",
  "Portfóliókezelés",
  "Technikai Elemzés",
  "Fundamentális Elemzés",
  "Pénzügyi Matematika",
  "Opciók",
  "Határidős ügyletek",
  "Kockázatkezelés",
  "Makrogazdaság",
  "Kripto és Blockchain",
  "Pszichológia és Trading",
  "Ingatlan Befektetés",
];

export function ArenaPage({
  onClose,
  coins,
  onCoinsChange,
  subscriptionTier = "free",
  onLimitReached,
  onXpGain,
  onNavigateToLibrary,
  onStageAdvance,
  onStreakUpdate,
}: ArenaPageProps) {
  const [activeTab, setActiveTab] =
    useState<GameMode>("numbers");
  const [gameState, setGameState] =
    useState<GameState>("betting");
  const [betAmount, setBetAmount] = useState<number>(50);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);
  const [playerAnswer, setPlayerAnswer] = useState<string>("");
  const [opponentAnswer, setOpponentAnswer] =
    useState<number>(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [roundResults, setRoundResults] = useState<
    { player: number; opponent: number; correct: number }[]
  >([]);
  const [showRoundResult, setShowRoundResult] = useState(false);
  const [rentedBooks, setRentedBooks] = useState<RentedBook[]>(
    [],
  );
  const [selectedBooks, setSelectedBooks] = useState<string[]>(
    [],
  );
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds per question
  const [questionStartTime, setQuestionStartTime] =
    useState<number>(0);
  const [playerResponseTime, setPlayerResponseTime] =
    useState<number>(0);
  const [opponentResponseTime, setOpponentResponseTime] =
    useState<number>(0);

  // Load rented books from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("rentedBooks");
    if (saved) {
      const parsed: RentedBook[] = JSON.parse(saved);
      // Filter out expired rentals
      const active = parsed.filter(
        (book) => book.rentedUntil > Date.now(),
      );
      setRentedBooks(active);

      // Auto-select all rented books
      const rentedTitles = active.map((b) => b.title);
      setSelectedBooks(rentedTitles);
    }
  }, []);

  const maxBet = Math.min(coins, 500); // Max 500 gold per game

  // Check if user can play (free tier limit from config)
  const canPlay = () => {
    if (subscriptionTier !== "free") {
      return true; // Pro and Master have unlimited games
    }

    const config = getGameConfig();
    const today = new Date().toDateString();
    const savedData = localStorage.getItem("arena_daily_games");

    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.date === today) {
        return data.gamesPlayed < config.freeDailyArenaGames;
      }
    }

    return true; // New day or first time playing
  };

  const incrementGamesPlayed = () => {
    if (subscriptionTier !== "free") {
      return; // No need to track for premium users
    }

    const today = new Date().toDateString();
    const savedData = localStorage.getItem("arena_daily_games");

    let gamesPlayed = 1;
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.date === today) {
        gamesPlayed = data.gamesPlayed + 1;
      }
    }

    localStorage.setItem(
      "arena_daily_games",
      JSON.stringify({
        date: today,
        gamesPlayed: gamesPlayed,
      }),
    );

    // Dispatch event to notify other components
    window.dispatchEvent(new Event("arenaGameCompleted"));
  };

  const toggleBookSelection = (book: string) => {
    const config = getGameConfig();
    const isSelected = selectedBooks.includes(book);

    if (isSelected) {
      // Remove book (don't allow deselecting the last book)
      if (selectedBooks.length === 1) return;
      setSelectedBooks(selectedBooks.filter((b) => b !== book));
    } else {
      // Add book, but check max limit
      if (selectedBooks.length >= config.maxBooksForArena) {
        alert(
          `Maximum ${config.maxBooksForArena} tankönyvet választhatsz ki!`,
        );
        return;
      }
      setSelectedBooks([...selectedBooks, book]);
    }
  };

  const startGame = () => {
    if (!canPlay()) {
      if (onLimitReached) {
        onLimitReached();
      }
      return;
    }

    if (betAmount > coins) {
      alert("Nincs elég aranyad!");
      return;
    }

    if (selectedBooks.length === 0) {
      alert("Válassz legalább egy tankönyvet!");
      return;
    }

    // Increment games played counter
    incrementGamesPlayed();

    // Generate 10 random questions from selected books
    const allQuestions = generateQuestions().filter((q) =>
      selectedBooks.includes(q.source),
    );

    if (allQuestions.length < 10) {
      alert("Nincs elég kérdés a kiválasztott tankönyvekből!");
      return;
    }

    const selectedQuestions = [];
    const usedIndices = new Set<number>();

    while (
      selectedQuestions.length < 10 &&
      usedIndices.size < allQuestions.length
    ) {
      const randomIndex = Math.floor(
        Math.random() * allQuestions.length,
      );
      if (!usedIndices.has(randomIndex)) {
        usedIndices.add(randomIndex);
        selectedQuestions.push(allQuestions[randomIndex]);
      }
    }

    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setPlayerScore(0);
    setOpponentScore(0);
    setRoundResults([]);
    setPlayerAnswer("");
    setTimeLeft(10);
    setQuestionStartTime(Date.now());
    setGameState("playing");
  };

  const generateOpponentAnswer = (
    correctAnswer: number,
  ): number => {
    // Opponent is random but never perfect
    const difficulty = Math.random();

    if (difficulty < 0.1) {
      // 10% - Very close (within 5%)
      const variance = correctAnswer * 0.05;
      return Math.round(
        correctAnswer +
          (Math.random() * variance * 2 - variance),
      );
    } else if (difficulty < 0.4) {
      // 30% - Close (within 20%)
      const variance = correctAnswer * 0.2;
      return Math.round(
        correctAnswer +
          (Math.random() * variance * 2 - variance),
      );
    } else if (difficulty < 0.7) {
      // 30% - Medium (within 50%)
      const variance = correctAnswer * 0.5;
      return Math.round(
        correctAnswer +
          (Math.random() * variance * 2 - variance),
      );
    } else {
      // 30% - Far (within 100%)
      const variance = correctAnswer * 1.0;
      return Math.round(
        correctAnswer +
          (Math.random() * variance * 2 - variance),
      );
    }
  };

  const submitAnswer = (autoSubmit = false) => {
    const currentQuestion = questions[currentQuestionIndex];
    const playerNum = autoSubmit
      ? 0
      : parseInt(playerAnswer || "0");

    // Calculate player response time
    const playerTime = (Date.now() - questionStartTime) / 1000;
    setPlayerResponseTime(playerTime);

    // Generate opponent answer and response time (average 4 seconds)
    const opponentNum = generateOpponentAnswer(
      currentQuestion.correctAnswer,
    );
    const opponentTime = 2 + Math.random() * 4; // 2-6 seconds, average ~4
    setOpponentResponseTime(opponentTime);

    setOpponentAnswer(opponentNum);

    const playerDiff = Math.abs(
      playerNum - currentQuestion.correctAnswer,
    );
    const opponentDiff = Math.abs(
      opponentNum - currentQuestion.correctAnswer,
    );

    // Track the new scores
    let finalPlayerScore = playerScore;
    let finalOpponentScore = opponentScore;

    // Update scores based on who was closer, or if tied, who was faster
    if (playerDiff < opponentDiff) {
      finalPlayerScore = playerScore + 1;
      setPlayerScore((prev) => prev + 1);
    } else if (opponentDiff < playerDiff) {
      finalOpponentScore = opponentScore + 1;
      setOpponentScore((prev) => prev + 1);
    } else if (playerDiff === opponentDiff) {
      // Same distance - whoever was faster wins
      if (playerTime < opponentTime) {
        finalPlayerScore = playerScore + 1;
        setPlayerScore((prev) => prev + 1);
      } else {
        finalOpponentScore = opponentScore + 1;
        setOpponentScore((prev) => prev + 1);
      }
    }

    setRoundResults([
      ...roundResults,
      {
        player: playerNum,
        opponent: opponentNum,
        correct: currentQuestion.correctAnswer,
      },
    ]);
    setShowRoundResult(true);

    setTimeout(() => {
      setShowRoundResult(false);
      if (currentQuestionIndex < 9) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setPlayerAnswer("");
        setTimeLeft(10);
        setQuestionStartTime(Date.now());
      } else {
        // Game over
        setGameState("result");

        // Calculate XP gained (only on win)
        const config = getGameConfig();
        if (finalPlayerScore > finalOpponentScore && onXpGain) {
          const baseXp = config.xpPerArenaWin;
          const bookMultiplier = selectedBooks.length;
          const totalXp = baseXp * bookMultiplier;
          onXpGain(totalXp);
        }

        // Update coins based on final scores
        if (finalPlayerScore > finalOpponentScore) {
          onCoinsChange(coins + betAmount);
          // Advance stage on win
          if (onStageAdvance) {
            onStageAdvance();
          }
        } else if (finalOpponentScore > finalPlayerScore) {
          onCoinsChange(coins - betAmount);
        }
        // If finalPlayerScore === finalOpponentScore, it's a draw, no coin change

        // Record task completion for streak (counts even if you lose) - after 500ms delay
        setTimeout(() => {
          const { isFirstToday, newStreak } =
            recordTaskCompletion();

          console.log("🔥 Arena - Streak updated:", {
            isFirstToday,
            newStreak,
          });

          // Call callback to update streak in App.tsx
          if (onStreakUpdate) {
            onStreakUpdate(newStreak, isFirstToday);
          }
        }, 500);
      }
    }, 3000);
  };

  const handleNumberClick = (num: string) => {
    if (showRoundResult) return;
    setPlayerAnswer(playerAnswer + num);
  };

  const handleBackspace = () => {
    setPlayerAnswer(playerAnswer.slice(0, -1));
  };

  const handleClear = () => {
    setPlayerAnswer("");
  };

  // Timer effect - counts down from 10 seconds
  useEffect(() => {
    if (gameState !== "playing" || showRoundResult) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Time's up - auto submit with 0 or current answer
          submitAnswer(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, showRoundResult, currentQuestionIndex]);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 overflow-y-auto">
      {/* Crystal Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-8 w-20 h-24 bg-gradient-to-br from-purple-600/30 to-transparent transform rotate-12 rounded-t-lg blur-sm animate-pulse"></div>
        <div
          className="absolute top-32 left-6 w-16 h-20 bg-gradient-to-br from-blue-600/30 to-transparent transform -rotate-12 rounded-t-lg blur-sm animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 right-10 w-14 h-18 bg-gradient-to-br from-pink-600/30 to-transparent transform rotate-6 rounded-t-lg blur-sm animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-8 w-12 h-16 bg-gradient-to-br from-cyan-600/30 to-transparent transform -rotate-6 rounded-t-lg blur-sm animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-slate-900/95 via-purple-900/80 to-slate-900/95 backdrop-blur-md border-b border-purple-500/30 p-2.5 shadow-lg shadow-purple-900/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 rounded-lg flex items-center justify-center transition-all border border-slate-600/50"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </motion.button>
            <div>
              <div className="flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-yellow-400" />
                <h1 className="text-white text-sm bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Küzdőtér
                </h1>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-400" />
                <p className="text-yellow-300 text-xs">
                  {coins}
                </p>
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <Swords className="w-6 h-6 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
          </motion.div>
        </div>
      </div>

      {/* Game Mode Tabs */}
      {gameState === "betting" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 relative"
        >
          <div className="flex gap-2 mb-3">
            <motion.button
              onClick={() => setActiveTab("numbers")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                activeTab === "numbers"
                  ? "bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white shadow-lg shadow-purple-500/50 border border-purple-400/30"
                  : "bg-slate-800/50 text-slate-400 border border-slate-700/30"
              }`}
            >
              <Flame className="w-4 h-4" />
              <span className="text-xs">Számok</span>
            </motion.button>
            <button
              disabled
              className="flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 bg-slate-800/20 text-slate-600 cursor-not-allowed border border-slate-700/20"
            >
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs">Hamarosan</span>
            </button>
            <button
              disabled
              className="flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 bg-slate-800/20 text-slate-600 cursor-not-allowed border border-slate-700/20"
            >
              <BarChart3 className="w-3 h-3" />
              <span className="text-xs">Hamarosan</span>
            </button>
          </div>

          {/* Betting Interface */}
          <div className="bg-gradient-to-br from-slate-800/80 via-purple-900/30 to-slate-800/80 rounded-xl p-4 border border-purple-500/30 shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <h2 className="text-white text-sm">
                Válassz tétet
              </h2>
            </div>

            <div className="mb-4">
              <div className="relative">
                <input
                  type="range"
                  min="10"
                  max={maxBet}
                  step="10"
                  value={betAmount}
                  onChange={(e) =>
                    setBetAmount(parseInt(e.target.value))
                  }
                  className="w-full h-2 bg-slate-700/50 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-yellow-400 [&::-webkit-slider-thumb]:to-orange-500 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-yellow-500/50 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-yellow-300"
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>10</span>
                <motion.span
                  key={betAmount}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-yellow-400 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                >
                  {betAmount}
                </motion.span>
                <span>{maxBet}</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4">
              {[50, 100, 200, maxBet].map((amount) => (
                <motion.button
                  key={amount}
                  onClick={() =>
                    setBetAmount(Math.min(amount, maxBet))
                  }
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-1.5 px-2 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 rounded-lg text-white text-xs transition-all border border-slate-600/50 flex items-center justify-center"
                >
                  {amount}
                </motion.button>
              ))}
            </div>

            <motion.button
              onClick={startGame}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-red-600 via-red-700 to-orange-600 hover:from-red-700 hover:via-red-800 hover:to-orange-700 text-white rounded-lg shadow-lg shadow-red-500/50 transition-all border border-red-400/30 flex items-center justify-center gap-2"
            >
              <Swords className="w-4 h-4" />
              <span className="text-sm">Küzdelem kezdése</span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 bg-gradient-to-br from-slate-900/80 to-purple-900/40 rounded-lg p-3 border border-purple-500/20 backdrop-blur-sm"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <Star className="w-3 h-3 text-purple-400" />
                <h3 className="text-purple-300 text-xs">
                  Szabályok
                </h3>
              </div>
              <ul className="text-slate-300 text-xs space-y-1">
                <li className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                  10 kérdés • Tippeld a számot
                </li>
                <li className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                  Közelebb = nyersz
                </li>
                <li className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                  <span className="text-green-300">
                    Győzelem: +{betAmount}
                  </span>
                </li>
                <li className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                  <span className="text-red-300">
                    Vereség: -{betAmount}
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Book Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-slate-800/80 via-indigo-900/30 to-slate-800/80 rounded-xl p-4 border border-indigo-500/30 shadow-2xl backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📚</span>
                </div>
                <h2 className="text-white text-sm">
                  Kölcsönzött könyvek
                </h2>
              </div>
              <div className="flex items-center gap-1 bg-indigo-900/50 px-2 py-1 rounded-full border border-indigo-400/30">
                <span className="text-indigo-300 text-xs">
                  {selectedBooks.length}/
                  {Math.min(
                    rentedBooks.length,
                    getGameConfig().maxBooksForArena,
                  )}
                </span>
              </div>
            </div>

            {rentedBooks.length === 0 ? (
              <div className="text-center py-6">
                <div className="text-slate-400 text-sm mb-3">
                  Nincs kölcsönzött könyv
                </div>
                <p className="text-slate-500 text-xs mb-4">
                  Küzdőtérben csak a kölcsönzött könyvek
                  kérdéseit kapod
                </p>
                {onNavigateToLibrary && (
                  <motion.button
                    onClick={onNavigateToLibrary}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg text-sm shadow-lg shadow-blue-500/30 transition-all border border-blue-400/30"
                  >
                    📚 Ugrás a Könyvtárba
                  </motion.button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {rentedBooks.map((rentedBook) => {
                  const isSelected = selectedBooks.includes(
                    rentedBook.title,
                  );
                  // Create short names for display
                  const shortName = rentedBook.title
                    .replace("Tőkepiaci Szótár", "Tőkepiaci")
                    .replace("Pénzügyi Alapismeretek", "Alapok")
                    .replace("Befektetés Alapjai", "Befektetés")
                    .replace("Portfóliókezelés", "Portfólió")
                    .replace("Technikai Elemzés", "Technikai")
                    .replace(
                      "Fundamentális Elemzés",
                      "Fundamentális",
                    )
                    .replace(
                      "Pénzügyi Matematika",
                      "Matematika",
                    )
                    .replace("Határidős ügyletek", "Határidős")
                    .replace("Kockázatkezelés", "Kockázat")
                    .replace("Kripto és Blockchain", "Kripto")
                    .replace(
                      "Pszichológia és Trading",
                      "Pszichológia",
                    )
                    .replace("Ingatlan Befektetés", "Ingatlan");

                  // Can only select up to max books
                  const canSelect =
                    isSelected ||
                    selectedBooks.length <
                      getGameConfig().maxBooksForArena;

                  return (
                    <motion.button
                      key={rentedBook.title}
                      onClick={() =>
                        canSelect &&
                        toggleBookSelection(rentedBook.title)
                      }
                      whileHover={
                        canSelect ? { scale: 1.05 } : {}
                      }
                      whileTap={
                        canSelect ? { scale: 0.95 } : {}
                      }
                      disabled={!canSelect}
                      className={`
                        py-2 px-2.5 rounded-lg transition-all border backdrop-blur-sm text-left
                        ${
                          isSelected
                            ? "bg-gradient-to-br from-indigo-600/80 to-purple-600/80 text-white border-indigo-400/50 shadow-lg shadow-indigo-500/30"
                            : canSelect
                              ? "bg-slate-800/50 text-slate-400 border-slate-700/50 hover:bg-slate-700/50"
                              : "bg-slate-900/30 text-slate-600 border-slate-800/30 cursor-not-allowed"
                        }
                      `}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${isSelected ? "bg-green-400 shadow-sm shadow-green-400" : "bg-slate-600"}`}
                        ></div>
                        <span className="text-xs leading-tight">
                          {shortName}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {rentedBooks.length > 0 && (
              <div className="flex gap-2 mt-3">
                <motion.button
                  onClick={() => {
                    const config = getGameConfig();
                    const maxBooks = Math.min(
                      rentedBooks.length,
                      config.maxBooksForArena,
                    );
                    setSelectedBooks(
                      rentedBooks
                        .slice(0, maxBooks)
                        .map((b) => b.title),
                    );
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-2 bg-gradient-to-r from-green-700/60 to-emerald-700/60 hover:from-green-600/60 hover:to-emerald-600/60 text-white text-xs rounded-lg transition-all border border-green-500/30 flex items-center justify-center"
                >
                  Max kiválasztása
                </motion.button>
                <motion.button
                  onClick={() => setSelectedBooks([])}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={selectedBooks.length === 0}
                  className={`flex-1 py-2 text-xs rounded-lg transition-all border flex items-center justify-center ${
                    selectedBooks.length === 0
                      ? "bg-slate-800/30 text-slate-600 border-slate-700/30 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-700/60 to-orange-700/60 hover:from-red-600/60 hover:to-orange-600/60 text-white border-red-500/30"
                  }`}
                >
                  Összes törlése
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Playing State */}
      {gameState === "playing" && questions.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-2.5 relative"
        >
          {/* Score Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-br from-slate-800/80 via-purple-900/40 to-slate-800/80 rounded-xl p-2.5 mb-2 border border-purple-500/30 shadow-xl backdrop-blur-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs">
                    {currentQuestionIndex + 1}
                  </span>
                </div>
                <span className="text-white text-sm">/ 10</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Timer */}
                <motion.div
                  className={`flex items-center gap-1 px-2 py-1 rounded-full border transition-all ${
                    timeLeft <= 3
                      ? "bg-red-900/50 border-red-500/50 animate-pulse"
                      : timeLeft <= 5
                        ? "bg-orange-900/50 border-orange-500/30"
                        : "bg-slate-900/50 border-purple-500/30"
                  }`}
                  animate={
                    timeLeft <= 3 ? { scale: [1, 1.1, 1] } : {}
                  }
                  transition={{
                    duration: 0.5,
                    repeat: timeLeft <= 3 ? Infinity : 0,
                  }}
                >
                  <Flame
                    className={`w-3 h-3 ${timeLeft <= 3 ? "text-red-400" : timeLeft <= 5 ? "text-orange-400" : "text-purple-400"}`}
                  />
                  <span
                    className={`text-xs ${timeLeft <= 3 ? "text-red-300" : timeLeft <= 5 ? "text-orange-300" : "text-purple-300"}`}
                  >
                    {timeLeft}s
                  </span>
                </motion.div>
                {/* Bet Amount */}
                <div className="flex items-center gap-1 bg-slate-900/50 px-2 py-1 rounded-full border border-yellow-500/30">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span className="text-yellow-300 text-xs">
                    {betAmount}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <motion.div
                className="flex-1 bg-gradient-to-br from-cyan-600/30 to-cyan-800/20 rounded-lg p-2 border border-cyan-400/30"
                animate={{
                  scale:
                    showRoundResult &&
                    roundResults[roundResults.length - 1] &&
                    Math.abs(
                      roundResults[roundResults.length - 1]
                        .player -
                        questions[currentQuestionIndex]
                          .correctAnswer,
                    ) <
                      Math.abs(
                        roundResults[roundResults.length - 1]
                          .opponent -
                          questions[currentQuestionIndex]
                            .correctAnswer,
                      )
                      ? [1, 1.05, 1]
                      : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-cyan-300 text-xs mb-0.5">
                  Te
                </div>
                <div className="text-white flex items-center gap-1.5">
                  <Trophy className="w-3 h-3 text-cyan-400" />
                  <span>{playerScore}</span>
                </div>
              </motion.div>
              <motion.div
                className="flex-1 bg-gradient-to-br from-red-600/30 to-red-800/20 rounded-lg p-2 border border-red-400/30"
                animate={{
                  scale:
                    showRoundResult &&
                    roundResults[roundResults.length - 1] &&
                    Math.abs(
                      roundResults[roundResults.length - 1]
                        .opponent -
                        questions[currentQuestionIndex]
                          .correctAnswer,
                    ) <
                      Math.abs(
                        roundResults[roundResults.length - 1]
                          .player -
                          questions[currentQuestionIndex]
                            .correctAnswer,
                      )
                      ? [1, 1.05, 1]
                      : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-red-300 text-xs mb-0.5">
                  Gép
                </div>
                <div className="text-white flex items-center gap-1.5">
                  <Trophy className="w-3 h-3 text-red-400" />
                  <span>{opponentScore}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Fighters */}
          <div className="flex justify-between items-center mb-2 gap-2">
            {/* Player */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex-1 relative"
            >
              <div className="bg-gradient-to-br from-cyan-900/50 via-cyan-800/30 to-cyan-900/50 rounded-xl p-2 border border-cyan-400/50 shadow-xl shadow-cyan-500/20 backdrop-blur-sm">
                <div className="relative w-12 h-12 mx-auto mb-1">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full blur opacity-50 animate-pulse"></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cyan-300 shadow-lg">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?w=200"
                      alt="Player"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center border border-white shadow-lg">
                    <Crown className="w-2 h-2 text-white" />
                  </div>
                </div>
                <p className="text-cyan-300 text-center text-xs mb-1">
                  Te
                </p>
                <AnimatePresence mode="wait">
                  {showRoundResult && (
                    <motion.p
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="text-cyan-400 text-center bg-cyan-900/50 rounded py-1 border border-cyan-400/30 text-xs"
                    >
                      {
                        roundResults[roundResults.length - 1]
                          .player
                      }
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* VS */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 360] }}
              transition={{
                delay: 0.3,
                rotate: { duration: 0.6 },
              }}
              className="relative"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center border-2 border-yellow-400 shadow-xl shadow-red-500/50">
                <Swords className="w-5 h-5 text-white" />
              </div>
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-600 rounded-full blur-lg opacity-50"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              ></motion.div>
            </motion.div>

            {/* Opponent */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex-1 relative"
            >
              <div className="bg-gradient-to-br from-red-900/50 via-red-800/30 to-red-900/50 rounded-xl p-2 border border-red-400/50 shadow-xl shadow-red-500/20 backdrop-blur-sm">
                <div className="relative w-12 h-12 mx-auto mb-1">
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 rounded-full blur opacity-50 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-red-300 shadow-lg bg-slate-800">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=200"
                      alt="Opponent"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center border border-white shadow-lg">
                    <Flame className="w-2 h-2 text-white" />
                  </div>
                </div>
                <p className="text-red-300 text-center text-xs mb-1">
                  Gép
                </p>
                <AnimatePresence mode="wait">
                  {showRoundResult && (
                    <motion.p
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="text-red-400 text-center bg-red-900/50 rounded py-1 border border-red-400/30 text-xs"
                    >
                      {opponentAnswer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Question */}
          <motion.div
            key={currentQuestionIndex}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative mb-2"
          >
            <div className="bg-gradient-to-br from-purple-900/60 via-pink-900/40 to-blue-900/60 rounded-xl p-3 border border-purple-400/40 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
                  <Star className="w-3 h-3 text-white" />
                </div>
                <p className="text-xs text-purple-300 bg-purple-900/50 px-2 py-0.5 rounded-full border border-purple-400/30">
                  {questions[currentQuestionIndex].source}
                </p>
              </div>
              <h2 className="text-white text-sm mb-2 leading-snug">
                {questions[currentQuestionIndex].question}
              </h2>

              <AnimatePresence>
                {showRoundResult && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-gradient-to-br from-slate-900/90 to-purple-900/50 rounded-lg p-2 border border-green-400/30 mt-2">
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <Trophy className="w-3 h-3 text-green-400" />
                        <p className="text-green-400 text-xs">
                          Helyes:{" "}
                          {
                            questions[currentQuestionIndex]
                              .correctAnswer
                          }
                        </p>
                      </div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1 px-1">
                        <span>
                          Te: {playerResponseTime.toFixed(1)}s
                        </span>
                        <span>
                          Gép: {opponentResponseTime.toFixed(1)}
                          s
                        </span>
                      </div>
                      <motion.p
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-center text-xs"
                      >
                        {(() => {
                          const playerDiff = Math.abs(
                            roundResults[
                              roundResults.length - 1
                            ].player -
                              questions[currentQuestionIndex]
                                .correctAnswer,
                          );
                          const opponentDiff = Math.abs(
                            roundResults[
                              roundResults.length - 1
                            ].opponent -
                              questions[currentQuestionIndex]
                                .correctAnswer,
                          );

                          if (playerDiff < opponentDiff) {
                            return (
                              <span className="text-cyan-300 flex items-center justify-center gap-1">
                                🎉 Nyertél! (Pontosabb)
                              </span>
                            );
                          } else if (
                            opponentDiff < playerDiff
                          ) {
                            return (
                              <span className="text-red-300 flex items-center justify-center gap-1">
                                Ellenfél nyert (Pontosabb)
                              </span>
                            );
                          } else if (
                            playerResponseTime <
                            opponentResponseTime
                          ) {
                            return (
                              <span className="text-cyan-300 flex items-center justify-center gap-1">
                                🎉 Nyertél! (Gyorsabb) ⚡
                              </span>
                            );
                          } else {
                            return (
                              <span className="text-red-300 flex items-center justify-center gap-1">
                                Ellenfél nyert (Gyorsabb) ⚡
                              </span>
                            );
                          }
                        })()}
                      </motion.p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Answer Display */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-slate-800/80 via-cyan-900/20 to-slate-800/80 rounded-xl p-3 mb-2 border border-cyan-400/30 shadow-2xl backdrop-blur-sm"
          >
            <div className="text-center mb-3">
              <p className="text-cyan-300 text-xs mb-2">
                Válaszod:
              </p>
              <motion.div
                key={playerAnswer}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="bg-slate-900/50 rounded-lg py-2 px-4 border border-cyan-400/30 min-h-[40px] flex items-center justify-center"
              >
                <p className="text-white text-2xl tracking-wider">
                  {playerAnswer || "..."}
                </p>
              </motion.div>
            </div>

            {/* Number Keyboard */}
            <div className="grid grid-cols-3 gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <motion.button
                  key={num}
                  onClick={() =>
                    handleNumberClick(num.toString())
                  }
                  disabled={showRoundResult}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-3 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-800 text-white rounded-lg shadow-lg border border-slate-600/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:from-slate-700 disabled:hover:to-slate-800"
                >
                  {num}
                </motion.button>
              ))}
              <motion.button
                onClick={handleBackspace}
                disabled={showRoundResult}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-3 bg-gradient-to-br from-orange-700 to-orange-800 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg shadow-lg border border-orange-600/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm"
              >
                ←
              </motion.button>
              <motion.button
                onClick={() => handleNumberClick("0")}
                disabled={showRoundResult}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-3 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-cyan-700 hover:to-cyan-800 text-white rounded-lg shadow-lg border border-slate-600/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:from-slate-700 disabled:hover:to-slate-800"
              >
                0
              </motion.button>
              <motion.button
                onClick={handleClear}
                disabled={showRoundResult}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-3 bg-gradient-to-br from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white rounded-lg shadow-lg border border-red-600/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm"
              >
                C
              </motion.button>
            </div>
          </motion.div>

          {/* Submit Button */}
          <AnimatePresence>
            {!showRoundResult && (
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                onClick={() => submitAnswer(false)}
                disabled={!playerAnswer}
                whileHover={{ scale: playerAnswer ? 1.02 : 1 }}
                whileTap={{ scale: playerAnswer ? 0.98 : 1 }}
                className="w-full py-3 bg-gradient-to-r from-green-600 via-green-700 to-emerald-600 hover:from-green-700 hover:via-green-800 hover:to-emerald-700 disabled:from-slate-700 disabled:to-slate-800 text-white rounded-lg shadow-lg shadow-green-500/30 border border-green-400/30 transition-all disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                <span className="text-sm">Beküld</span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Result State */}
      {gameState === "result" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 relative"
        >
          <div className="bg-gradient-to-br from-slate-800/80 via-purple-900/40 to-slate-800/80 rounded-xl p-5 border border-purple-500/30 shadow-2xl backdrop-blur-sm text-center relative overflow-hidden">
            {/* Victory/Defeat Background Effect */}
            <div
              className={`absolute inset-0 ${playerScore > opponentScore ? "bg-gradient-to-br from-green-600/10 to-cyan-600/10" : playerScore < opponentScore ? "bg-gradient-to-br from-red-600/10 to-orange-600/10" : "bg-gradient-to-br from-yellow-600/10 to-purple-600/10"}`}
            ></div>

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="relative"
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${playerScore > opponentScore ? "bg-gradient-to-br from-green-500 to-cyan-500" : playerScore < opponentScore ? "bg-gradient-to-br from-red-500 to-orange-500" : "bg-gradient-to-br from-yellow-500 to-purple-500"} shadow-xl border-2 border-white/20`}
              >
                {playerScore > opponentScore ? (
                  <Trophy className="w-8 h-8 text-white" />
                ) : playerScore < opponentScore ? (
                  <Swords className="w-8 h-8 text-white" />
                ) : (
                  <Star className="w-8 h-8 text-white" />
                )}
              </div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`text-xl mb-4 ${playerScore > opponentScore ? "text-green-400" : playerScore < opponentScore ? "text-red-400" : "text-yellow-400"}`}
              >
                {playerScore > opponentScore
                  ? "🎉 Győzelem!"
                  : playerScore < opponentScore
                    ? "Vereség"
                    : "🤝 Döntetlen"}
              </motion.h2>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-5"
            >
              <p className="text-slate-300 text-xs mb-2">
                Végeredmény
              </p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-cyan-900/50 rounded-lg px-4 py-2 border border-cyan-400/30">
                  <p className="text-cyan-300 text-xs mb-0.5">
                    Te
                  </p>
                  <p className="text-white text-2xl">
                    {playerScore}
                  </p>
                </div>
                <span className="text-slate-400 text-xl">
                  :
                </span>
                <div className="bg-red-900/50 rounded-lg px-4 py-2 border border-red-400/30">
                  <p className="text-red-300 text-xs mb-0.5">
                    Gép
                  </p>
                  <p className="text-white text-2xl">
                    {opponentScore}
                  </p>
                </div>
              </div>

              <div
                className={`inline-block px-4 py-2 rounded-full ${playerScore > opponentScore ? "bg-green-900/50 border border-green-400/50" : playerScore < opponentScore ? "bg-red-900/50 border border-red-400/50" : "bg-slate-900/50 border border-slate-400/50"} mb-2`}
              >
                <p
                  className={`text-sm ${playerScore > opponentScore ? "text-green-300" : playerScore < opponentScore ? "text-red-300" : "text-slate-300"} flex items-center gap-1.5`}
                >
                  {playerScore > opponentScore && (
                    <Zap className="w-3 h-3" />
                  )}
                  {playerScore > opponentScore
                    ? `+${betAmount} arany`
                    : playerScore < opponentScore
                      ? `-${betAmount} arany`
                      : "Nincs változás"}
                </p>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-yellow-300">
                <Zap className="w-4 h-4" />
                <p className="text-sm">Jelenlegi: {coins}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 gap-2 relative"
            >
              <motion.button
                onClick={() => {
                  setGameState("betting");
                  setBetAmount(50);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-3 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 text-white rounded-lg shadow-lg shadow-purple-500/30 border border-purple-400/30 transition-all flex items-center justify-center gap-1.5 text-sm"
              >
                <Flame className="w-4 h-4" />
                Új játék
              </motion.button>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-3 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white rounded-lg shadow-lg border border-slate-600/50 transition-all flex items-center justify-center gap-1.5 text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Kilépés
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}