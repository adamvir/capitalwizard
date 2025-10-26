import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, BookOpen, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookPage {
  id: number;
  chapter: string;
  section: string;
  content: string[];
}

interface PenzugyiAlapismeretkBookViewProps {
  onBack: () => void;
}

// A könyv teljes tartalma oldalakra bontva
const bookPages: BookPage[] = [
  // Címlap
  {
    id: 0,
    chapter: '',
    section: '',
    content: [
      'PÉNZÜGYI ALAPISMERETEK',
      '',
      '',
      '',
      '',
      'Átfogó útmutató',
      'a pénzügyi tudatossághoz',
      '',
      '',
      '',
      '',
      '',
      'Budapest, 2025'
    ]
  },
  // BEVEZETÉS
  {
    id: 1,
    chapter: 'BEVEZETÉS',
    section: '',
    content: [
      'Ez a könyv azért készült, hogy általános ismereteket nyújtson a gazdaság működésének alapvető folyamatairól, azon belül is leginkább a tőkepiacokkal ismertesse meg az érdeklődőket, tanulókat. Segítségével nem feltétlenül válhatunk azonnal tapasztalt befektetési szakemberekké, de a tartalom elsajátításával széleskörű ismereteket szerezhetünk, ami egy kezdő lépés lehet, hogy elindulhassunk a tőkepiacok varázslatos világában.',
      '',
      'El kell fogadnunk azt a tényt, hogy a mai világ legalapvetőbb emberi szükséglete a pénz, ebben fejezzük ki a legtöbb igényünket, elégítjük ki szükségleteink jelentős részét. Az út, ami a pénzügyek működésének megértéséhez vezet rendkívül hosszú és bonyolult.'
    ]
  },
  {
    id: 2,
    chapter: 'BEVEZETÉS',
    section: '',
    content: [
      'A magyar lakosság általánosságban nagyon keveset foglalkozik a pénzügyeivel. Az alapvető cél az lenne, hogy pontosan ismerjük pénzügyi bevételeinket, kiadásainkat, rendszerezni és értékelni tudjuk azt a folyamatot, aminek alapján megtakarítással rendelkezhetünk, amely megtakarítás gondosan felügyelt, megalapozott döntések útján történő befektetéssel tovább gyarapodhat.',
      '',
      'A lakossági megtakarítások növekedése nem csak egyéni, hanem társadalmi érdek is egyaránt. A magasabb életszínvonal kialakulásának egyik legfontosabb pillére a lakossági megtakarítások növekedése.'
    ]
  },
  {
    id: 3,
    chapter: 'BEVEZETÉS',
    section: '',
    content: [
      'Az elmúlt években határozott emelkedésnek indultak a magyar bérek, nőttek a megtakarítások, de a pénzügyekkel kapcsolatos időráfordítás nagyon minimálisan emelkedett. Tanulás, tapasztalat és folyamatos odafigyelésre lenne szükség abban a témakörben, ami gyakorlatilag mindenkit érint a háztartások napi pénzügyi teendői révén.',
      '',
      'A magyar pénzügyi ismeretek hiánya azonban nem csak a lakossági szegmensben, nem csak a háztartások esetében probléma. Az intézmények pénzügyi irányításának felkészültsége is rendkívül alacsony színvonalú.'
    ]
  },
  {
    id: 4,
    chapter: 'BEVEZETÉS',
    section: '',
    content: [
      'A KKV és mikró vállalkozások esetében szinte nem is létezik a gondos vállalati pénzügyi irányítás megléte. Ezzel a könyvvel és egyben tanítási modellel igyekszünk felkészíteni azokat a már gyakorló vagy későbbiekben vezetőkké váló vállalatvezetőket, akik mélyebb tudást igényelnek a gazdasági ismeretekben, a tőkepiac folyamataiban.',
      '',
      'Hogyan juthatunk tőkéhez? Miért nem csak a bankbetét az egyetlen befektetési lehetőség? Mire jó a vállalat tőzsdei jelenléte?'
    ]
  },
  {
    id: 5,
    chapter: 'BEVEZETÉS',
    section: '',
    content: [
      'A magyar gazdaság szereplőinek tudása, ismereteik magasabb színvonala az alapvető kelléke a sikeresebb magyar gazdaság folytatólagos fenntarthatóságának. Egy minimális szintű követelményrendszer elsajátítása kötelező eleme lehet a jelen és a jövő nemzedékének a pénzügyek napi gyakorlatában.',
      '',
      'A könyv szerzői nem csupán egy könyvet írtak sok-sok gazdasági, tőkepiaci ismerettel, hanem egy tanulási folyamatot is modelleztek, ami e-learning formájában válik elérhetővé az érdeklődők számára.',
      '',
      'Ezúton kívánunk minden Olvasónknak sikeres tanulást és felkészült, pénzügyekben gondos és tudatos jövőt!'
    ]
  },
  // A PÉNZ
  {
    id: 6,
    chapter: 'A PÉNZ',
    section: 'BEVEZETÉS',
    content: [
      'Kezünkbe fogunk értékes papírokat, érméket. Súlyuk, anyaguk lényegtelen az értékük tekintetében? Hogy milyen értékkel bírnak leginkább attól függ, hogy milyen szám van rájuk írva? Persze, ha ez ilyen egyszerű lenne, akkor fognánk egy papírt, ráírnánk egy számot és könnyedén gazdagok lehetnénk.',
      '',
      'Színes, képes papírok, dombornyomott érmék. Lehetnek szépek, ritkák, lényegesen értékesebbek, mint amit az "előállításuk", anyaguk képvisel. Ezek a papírok, fémek közel sem szolgálnak mindenképpen fizetési eszközként.'
    ]
  },
  {
    id: 7,
    chapter: 'A PÉNZ',
    section: 'BEVEZETÉS',
    content: [
      'Ahhoz, hogy a pénz valójában pénz lehessen, forgalmi értékkel rendelkezzen, ahhoz az szükséges, hogy a piac, a társadalom, a törvényi és prudenciális szabályozás is fizetési eszköznek ismerje, fogadja el.',
      '',
      'A pénz egy "áru", ami elfogadott értékkel bír és ezáltal elcserélhetjük olyan árucikkekre, amiknek az értékét pénzben is ki tudjuk fejezni.',
      '',
      'Ugyanakkor a mai világban sem minden árucikk és nem is fejezhető ki minden értékben, pénzben. Ha valaki abban hisz és bízik, hogy pénzért cserébe bármit megkaphat, nyilvánvalóan téved.'
    ]
  },
  {
    id: 8,
    chapter: 'A PÉNZ',
    section: 'BEVEZETÉS',
    content: [
      'Szeretetet, családot, minden formájú egészséget és még számtalan dolgot nem lehet pénzért venni, cserélni. Ugyanakkor az is óriásit téved, aki azt gondolja, hogy nem számít a pénz. A mai világ legtöbb szükségletét, anyagi, tárgyi, szellemi jószágát pénzben fejezzük ki.',
      '',
      'Valamit vásárolni, megszerezni pénzért cserébe, rendkívül egyszerű folyamat. Odamegyünk a kasszához és készpénzben fizetünk, a bankszámlánkról utalással egyenlítjük ki az ellenértéket.'
    ]
  },
  {
    id: 9,
    chapter: 'A PÉNZ',
    section: 'BEVEZETÉS',
    content: [
      'A pénz formái is különbözőek, nem csak kinézetükben, de alkalmazásuk szerint is. Ami olyan egyszerű és egyértelmű a mai ember számára, az sok évszázadon keresztül ivódott az emberi cselekvések szokványaként.',
      '',
      'Pénzt keresni, pénzt költeni mindenki tud és szokott. Pénzt kezelni, tudatosan megtakarítani már a társadalom csak kisebb szegmense.',
      '',
      'A pénzügyi folyamatok bonyolultak. Ami nekünk csak vásárlás, mint cselekedet, a pénzforgalom szempontjából rendkívül összetett szabályozási, működtetési probléma-halmaz.'
    ]
  },
  {
    id: 10,
    chapter: 'A PÉNZ',
    section: 'BEVEZETÉS',
    content: [
      'Nem mindegy, hogy mennyi pénz van forgalomban. Nem mindegy, hogy milyen címletek és belőlük mennyi van kibocsájtva. Nem mindegy a pénz romlása, annak üteme és a gazdaságra gyakorolt hatása.',
      '',
      'Az emberek általában azt gondolják, hogy sokat tudnak a pénzről. Az emberek valóban viszonylag sokat tudnak a pénzről, de a lakosság legnagyobb része mégsem tud felelősen gondolkodni, gondoskodni pénzügyeiről pénzügyi tudatosságaként.',
      '',
      '"A pénz sosem alszik." A pénz tartása, a vagyontárgyak léte nem csak hozadékkal, kamattal, hozammal járhat, hanem költségekkel, terhekkel, időráfordítással és rengeteg kockázati tényezővel is.'
    ]
  },
  // A PÉNZ KIALAKULÁSA
  {
    id: 11,
    chapter: 'A PÉNZ KIALAKULÁSA',
    section: 'ŐSKÖZÖSSÉG (ÖNELLÁTÓ TÁRSADALOM)',
    content: [
      'Ahhoz, hogy megérthessük a pénz, mint forgalmi értékkel bíró fizetőeszköz kialakulásának az okát, nagyon messzire kell visszautaznunk az emberiség történelmében.',
      '',
      'Az "önellátó társadalom" kifejezés inkább az ősközösségi társadalom életmódjára utal, amit tanulmányainkból így ismerhetünk: vadászás, halászás, gyűjtögetés.',
      '',
      'Az ősközösségek történelmi fejlődése erősen korlátozott volt, pontosan az önellátó életmód miatt. Alacsony népsűrűség, változó sikerű önellátás, alacsony népszaporulat jellemezte ezeket a társadalmakat.'
    ]
  },
  {
    id: 12,
    chapter: 'A PÉNZ KIALAKULÁSA',
    section: 'ŐSKÖZÖSSÉG (ÖNELLÁTÓ TÁRSADALOM)',
    content: [
      'Az idő múlt és a világ fejlődött. A fejlődéssel pedig jelentkeztek az igények. Elkezdődött a magasabb színvonalú munka elvégzése, ami a hozzáértőket a szakosodás útjára vezette.',
      '',
      'A szakosodás mind aktívabban tette lehetővé a sokrétű árukészlet felhalmozását, ahol a helyileg kialakult többlet, más helyek hiányának betöltését tette lehetővé.',
      '',
      'Elkezdődött a cserekereskedelem.'
    ]
  },
  {
    id: 13,
    chapter: 'A PÉNZ KIALAKULÁSA',
    section: 'CSEREKERESKEDELEM',
    content: [
      'Az elkezdődött szakosodás körülbelül az Őskor végére és az Ókor elejére tehető. Az árucikkekből megtermelt többlet "útnak indult", hogy keresse a helyét olyan helyeken, ahol nem volt elég belőle.',
      '',
      'A többlet árut kínálót eladónak, az áruhiányban szenvedőt vevőnek nevezzük. Az áru cserekereskedelmének kezdeteként az árukat közvetlenül cserélték más árukra, adott helyenként a kereslet-kínálat együtthatójából következő cserearány szerint.'
    ]
  },
  {
    id: 14,
    chapter: 'A PÉNZ KIALAKULÁSA',
    section: 'CSEREKERESKEDELEM',
    content: [
      'Röviden kifejezve ami a vevőnek hiány, az az eladónak többlet. Ha halam volt és sóért akartam elcserélni, akkor bizony olyan vevőt kellett találnom a halamra, aki sót akart adni érte.',
      '',
      'Ha ez a két igény nem jelentkezett egyszerre, akkor a csere nem tudott létrejönni. Ha a halamért nem sóval, hanem gyümölccsel akartak fizetni, akkor nem volt üzlet, mert nekem nem kellett a halamért cserébe a gyümölcs.'
    ]
  },
  {
    id: 15,
    chapter: 'A PÉNZ KIALAKULÁSA',
    section: 'CSEREKERESKEDELEM',
    content: [
      'A probléma a cserekereskedelem esetében azonban nem csak a kínált és cserébe elvárt áruk találkozásának problémája volt. Gondot jelentett az is, hogy azonos helyen és időben kellett lebonyolítani az üzletet, ami igencsak nehézkes volt.',
      '',
      'Az "áruért áruval fizetek" cserekereskedelem számtalan problémát hordozott és hamarosan igény jelentkezett arra, hogy a zökkenőmentesebb cserekereskedelem bonyolításához valamilyen árupénzzel lehessen fizetni.'
    ]
  },
  {
    id: 16,
    chapter: 'A PÉNZ KIALAKULÁSA',
    section: 'ÁRUPÉNZ',
    content: [
      'Az árupénz egy olyan köztes áru az áruk cserekereskedelmében, amit a legkönnyebben volt lehetséges más árukra cserélni és amely áru értéke könnyen meghatározható volt más áruk viszonylatában.',
      '',
      'Természetesen ez sem lett volna elég, sok egyéb elvárt tulajdonsággal is rendelkeznie kellett az árupénznek: viszonylagosan tartani kellett az értékét, kis- és nagyobb mértékkel is rendelkeznie kellett az oszthatóság végett és általánosan elfogadottnak kellett lennie.'
    ]
  },
  {
    id: 17,
    chapter: 'A PÉNZ KIALAKULÁSA',
    section: 'ÁRUPÉNZ',
    content: [
      'Ha gyorsan kell ilyen árut keresni, akkor leginkább a só és a cukor jut az eszünkbe. Marad a só.',
      '',
      'A só rendelkezett minden szükséges kellékkel, amivel az árupénznek rendelkeznie kell. Könnyen lehetett szállítani, bármit ki lehetett vele fizetni, mindig szükség volt rá és a legtöbb helyen idővel ismerték és el is fogadták.',
      '',
      'A cserekereskedelem során használatos árupénz azonban még mindig nem volt teljesen problémamentes fizetőeszköz.'
    ]
  },
  {
    id: 18,
    chapter: 'A PÉNZ KIALAKULÁSA',
    section: 'ÁRUPÉNZ VAGY PÉNZHELYETTESÍTŐK? (NEMESFÉMEK)',
    content: [
      'Az emberiség fejlődése során, valószínűleg a 6.-7. század környékén jelentek meg az első nemesfém alapú fizetőeszközök, amiket már joggal nevezhetünk pénznek.',
      '',
      'Érméket öntöttek arany és ezüst anyagból és ezeket az akkori "gazdasági" szereplők elfogadták, ismerték a nemesfémek ritkaságát, értékét.',
      '',
      'Az arany magasabb értékével, az ezüst alacsonyabb értékű váltópénzként funkcionált.'
    ]
  },
  {
    id: 19,
    chapter: 'A PÉNZ KIALAKULÁSA',
    section: 'ÁRUPÉNZ VAGY PÉNZHELYETTESÍTŐK? (NEMESFÉMEK)',
    content: [
      'Bimetalizmus: az arany és az ezüst együtt töltötték be a pénz funkcióját.',
      '',
      'Monometalizmus: amikor egyetlen nemesfém (alapvetően az arany) töltötte be a pénz funkcióját.',
      '',
      'A nemesfém bázisú pénzkibocsátás mögöttes értéke évszázadokon keresztül, a modern pénz kialakulásáig az aranyhoz, aranytartalékhoz volt kötve.'
    ]
  },
  {
    id: 20,
    chapter: 'A PÉNZ KIALAKULÁSA',
    section: 'ÁRUPÉNZ VAGY PÉNZHELYETTESÍTŐK? (NEMESFÉMEK)',
    content: [
      'Sajnos az aranyból és ezüstből önthető "pénzérmék" mennyisége sem végtelen. A fejlődés és leginkább az iparosodás, óriási mértékű árukészletek, eszközök, ingatlanok, ingóságok cseréjének lebonyolítását tette szükségessé.',
      '',
      'Currency elmélet: annyi pénzhelyettesítőt lehet, szabad forgalomba hozni, amennyi a mögöttes aranyfedezet.',
      '',
      'Banking elmélet: a pénzhelyettesítők kibocsátását nem a meglévő aranyfedezethez, hanem árufedezethez kell kötni.'
    ]
  },
  {
    id: 21,
    chapter: 'A PÉNZ KIALAKULÁSA',
    section: 'SZABAD PÉNZ (BANK) KORA',
    content: [
      'Az Egyesült Államokban a szabályozás hiánya, vagy megengedő mivolta miatt, gyakorlatilag bárki "bocsáthatott ki" saját pénzt. Magánbankok, boltok, éttermek, de akár magánszemélyek is.',
      '',
      'Ékes példája mindez annak, hogy a piac pénzelfogadó mechanizmusa képes arra, hogy bármilyen "eszközből" fizetőeszközt tudjon létrehozni.',
      '',
      'Kijelenthető, hogy napjainkban nem létezhet határtalanul (szabályozatlanul) a "szabad pénz" fogalma.'
    ]
  },
  {
    id: 22,
    chapter: 'A PÉNZ KIALAKULÁSA',
    section: 'RENDELETI PÉNZ',
    content: [
      'Meg is érkeztünk a modern pénz, fizetőeszköz fogalmához. A rendeleti pénz olyan pénz, amit valaki kötelezően forgalomba helyező, tartó és onnan kivonható, átalakítható jelleggel bocsát a gazdaságba.',
      '',
      'A rendeleti pénz mögöttes értéke egyéb áruban, de akár nemesfémben is kifejezhető, de meghatározás nélkül is forgalomba bocsájthatja.',
      '',
      'A legmegfelelőbb kifejezés: nemzeti valutaként kibocsájtott, állami garanciával bíró, nemzeti fizetési eszköz.'
    ]
  },
  {
    id: 23,
    chapter: 'A PÉNZ KIALAKULÁSA',
    section: 'RENDELETI PÉNZ',
    content: [
      'A gazdaság ismeri és elismeri a fizetőeszköz árukereskedelemben, szolgáltatásban résztvevő közvetítő szerepét, fizetési eszköz mivoltát.',
      '',
      'A társadalmi szabályrendszer, a törvények szigorúan büntetik a fizetőeszköz hamisítását, eltulajdonítását, a pénzzel való visszaéléseket.',
      '',
      'A modern pénz, a rendeleti pénz a közgazdaságtan alapvető fogalma. Nélküle nem létezik a mai modern közgazdaságtan, tudomány.'
    ]
  },
  // A MODERN PÉNZ FAJTÁI
  {
    id: 24,
    chapter: 'A MODERN PÉNZ FAJTÁI',
    section: '',
    content: [
      'A modern pénz alapvetően egyrészről többféle fizikálisan megjelenő papírpénzformában (bankjegyben) és érmében jelentkezik, másrészről számlapénzben, ami gyakorlatilag virtuális, a bankszámlák közötti forgalom lebonyolítását szolgáló eszköz.',
      '',
      'A modern pénznek tehát két alapvető formáját különböztetjük meg: a készpénzt és a számlapénzt.'
    ]
  },
  {
    id: 25,
    chapter: 'A MODERN PÉNZ FAJTÁI',
    section: '',
    content: [
      'A ma forgalomban lévő, leginkább a váltást elősegítő készpénzérmék:',
      '',
      '5 forintos, 10 forintos, 20 forintos, 50 forintos, 100 forintos, 200 forintos.',
      '',
      'A jelenben készpénzként létező papírpénzek, bankjegyek:',
      '',
      '500 forintos, 1000 forintos, 2000 forintos, 5000 forintos, 10000 forintos, 20000 forintos.'
    ]
  },
  {
    id: 26,
    chapter: 'A MODERN PÉNZ FAJTÁI',
    section: '',
    content: [
      'A pénzhamisítást a törvény szigorúan bünteti, az a társadalomra kiemelten káros, megzavarja a gazdaság szereplőinek bizalmát, ami tömeges méretekben akár válsághelyzetet is indukálhat!',
      '',
      'Ebben a fejezetben azt ismerhettük, tanulhattuk meg, hogy a pénz, mint fizetési eszköz miként alakult ki és milyen árucsere lebonyolítási funkcióval bír. A modern pénzhez vezető út megértése az alapja a fizetőeszköz fontosságának értékelhetőségéhez.'
    ]
  },
  // A PÉNZ TULAJDONSÁGAI
  {
    id: 27,
    chapter: 'A PÉNZ TULAJDONSÁGAI',
    section: 'A PÉNZ ÉRTÉKET KÉPVISEL, KIFEJEZ',
    content: [
      'A pénz szerepe és egyben a tőle elvárható alapvető feladata, hogy értéket fejezzen ki, benne számítottan meghatározható legyen egy áru, termék, szolgáltatás ára.',
      '',
      'Minden értéket képviselő jószág általában kifejezhető pénz alapú értékként. Mégis fontos megjegyezni, hogy azonos vagy egymásra jelentős mértékben hasonlító áruk ára is különbözhet.'
    ]
  },
  {
    id: 28,
    chapter: 'A PÉNZ TULAJDONSÁGAI',
    section: 'A PÉNZ ÉRTÉKET KÉPVISEL, KIFEJEZ',
    content: [
      'Egy kiló fehér kenyér ára különböző lehet a sok-sok pékségben, áruházban, ahol árulják őket. Nincsen rögzített ár és nem is lehet, mivel a piacgazdaság alapja, hogy az áruk, termékek, szolgáltatások értékének meghatározása versenyhelyzetet teremtsen a termelők, szolgáltatók között.',
      '',
      'A javak árának versenye a piacgazdaság meghatározó alapfeltétele. Az árazás, piacfelosztás előre eltervezett versenytársak közötti kölcsönös rögzítését kartellezésnek nevezzük, amit a hatályos törvények szigorúan büntetnek.'
    ]
  },
  {
    id: 29,
    chapter: 'A PÉNZ TULAJDONSÁGAI',
    section: 'A PÉNZ ÉRTÉKET KÉPVISEL, KIFEJEZ',
    content: [
      'Az érték: egy anyagi, szellemi tulajdonsággal bíró dolog minősége, hasznossága, ami miatt az adott dolgot megszerezni, tartani, birtokolni érdemes, valamint az adott dolog meghatározható ára.',
      '',
      'Ez az a két dolog, ami összessége értéket képvisel és amely értéket pénzben fejezhetünk ki.',
      '',
      'Az életben nem minden érték fejezhető ki pénzben. Az anyagi javakon túlmenően, léteznek eszmei értékkel, pénzben nem kifejezhetően létező értékek is.'
    ]
  },
  {
    id: 30,
    chapter: 'A PÉNZ TULAJDONSÁGAI',
    section: 'A PÉNZ, MINT FIZETÉSI-, ÉS FORGALMI ESZKÖZ',
    content: [
      'Sokszor válik eggyé a fizetési eszköz és a forgalmi eszköz kifejezés. A mai korban a számtalan láncolatú vásárlási és eladási igény teljesen összemosta e két funkció megkülönböztetését.',
      '',
      'Fizetési eszköz: a pénz és az áru eltérő időben, ellentétes irányban mozog.',
      '',
      'Forgalmi eszköz: az áruforgalomban a tranzakciók a pénz segítségével bonyolódnak le, a pénz és az áru azonos időben, de ellentétesen mozog.'
    ]
  },
  {
    id: 31,
    chapter: 'A PÉNZ TULAJDONSÁGAI',
    section: 'A PÉNZ, MINT FELHALMOZÁSI ESZKÖZ',
    content: [
      'A pénz szerepe nem csak abban merül ki, hogy azonnali vásárlásra fordíthatjuk. A pénz felhalmozási eszköz is, ráadásul a leglikvidebb vagyontárgy.',
      '',
      'A pénz feletti rendelkezés érték, a rendelkezési jog átadása pedig egy jövőbeni visszavárt, megtérüléssel, haszonnal gyarapodó pénz reménye miatt indokolt.',
      '',
      'A pénzt a lakosság jelentős része, nem csak befektetési célból tartja, hanem a biztonság megléte miatt is.'
    ]
  },
  {
    id: 32,
    chapter: 'A PÉNZ TULAJDONSÁGAI',
    section: 'A PÉNZ, MINT FELHALMOZÁSI ESZKÖZ',
    content: [
      'A "gazdag halottak" teória. A szerző véleménye az, hogy a jelenkor tehetős emberének többsége egy életen át vagyont halmozó, de a halmozott vagyon csak kisebb részét a szükségleteinek kielégítésére fordító ember.',
      '',
      'A teória lényege az, hogy becsületes, jól fizető munkabérből is teljesíthető a legtöbb valós és általánosan elvárható szükséglet kielégítése, azok meglétéhez nem feltétlenül szükséges a vagyonhalmozás.'
    ]
  },
  // MIRE VALÓ A PÉNZ?
  {
    id: 33,
    chapter: 'MIRE VALÓ A PÉNZ?',
    section: '',
    content: [
      'A pénz rengeteg mindenre való. Az egyén szempontjából azt mondjuk, hogy a pénz, a szükségleteink kielégítésére szolgál.',
      '',
      'A "szükséglet" szó azonban rengeteg mindent jelent és értelmezésekor a legfontosabb tisztázni, hogy minden ember szükséglete - az alapszükségleteken kívül - változó és eltérő lehet.',
      '',
      'Az emberiség fejlődésének nagyon fontos velejárója a szükségletek, igények változása.'
    ]
  },
  {
    id: 34,
    chapter: 'MIRE VALÓ A PÉNZ?',
    section: 'ALAPVETŐ SZÜKSÉGLETEK',
    content: [
      'De mit is takar az a kifejezés, hogy alapvető szükséglet? A szükséglet hiány, amely hiány megszüntetésére törekszik az ember.',
      '',
      'Érdemes megismerni a Maslow piramist, ami megfelelően csoportosítja azokat a szükségleteket, amik az embert általánosan motiválják.',
      '',
      'Étel, víz (ital) olyan szükségletek, amiért fizetünk, ráadásul nem is keveset. Nem beszélve a "menedék" szóhasználatban megfogalmazott lakás, ház értékéről.'
    ]
  },
  {
    id: 35,
    chapter: 'MIRE VALÓ A PÉNZ?',
    section: 'ÉLETMINŐSÉG',
    content: [
      'Az alapvető szükségleteink kielégítése emberi minimum. Nem jelenti azt, hogy egy teljes, boldog életet le lehetne élni csupán azzal, hogy biztosítjuk az alapvető szükségleteink kielégítését.',
      '',
      'Az életminőség közvetlen kapcsolatban állhat az életszínvonallal, de közel sem rokonértelmű szavak. Az életszínvonal meghatározója az anyagi jólét, míg az életminőség alapja szintén lehet az anyagi jólét, de szélesebb fogalomkört ötvöz.'
    ]
  },
  {
    id: 36,
    chapter: 'MIRE VALÓ A PÉNZ?',
    section: 'ÉLETSZÍNVONAL',
    content: [
      'Az életszínvonal viszont alapvetően a pénz függvénye. Csakhogy nem kizárólag az egyén "jólététől" függ, hanem együttesen érvényesül az egyén és az adott közösség általános, átlagos színvonala.',
      '',
      'A nemzetközi összehasonlításban gyakran használják az életszínvonal mérésére az egy főre jutó GDP-t.',
      '',
      'Függetlenül azonban az egy főre bontástól, vannak területek, ahol a fejlettség és színvonal kérdése csak összességében mérhető.'
    ]
  },
  {
    id: 37,
    chapter: 'MIRE VALÓ A PÉNZ?',
    section: 'MIÉRT KELL AZ EGYÉNNEK A PÉNZ?',
    content: [
      'Alapvetően azért kell az egyénnek a pénz, mert az életünket, életszínvonalunkat meghatározó javak elérése, megszerzése és az ezeken alapuló szükségleteink, igényeink kielégítése pénzben mérhető és pénzben megszerezhető.',
      '',
      'A jelenkor embere és igénye ezen lényegesen túlmutat, legalábbis erősen kategorizálja vagy meghaladja az alapvető szükségletek fogalmának körét.'
    ]
  },
  // A PÉNZ ROMLÁSA, INFLÁCIÓ
  {
    id: 38,
    chapter: 'A PÉNZ ROMLÁSA, INFLÁCIÓ',
    section: '',
    content: [
      'A pénznek, vagyis a fizetőeszköznek sincs egyértelmű értékállósága. A pénz értékének meghatározása a vásárlóerejében rejlik.',
      '',
      'Amikor pénzzel fizetünk, az áru értékét az adott fizetőeszköz értékében fejezzük ki, ez az érték azonban nem állandó.',
      '',
      'Az infláció nem feltétlenül negatív folyamat. Az alacsony mértékű infláció serkenti a gazdaságot, ösztönzi a gazdaság szereplőit az aktivitásra.'
    ]
  },
  {
    id: 39,
    chapter: 'A PÉNZ ROMLÁSA, INFLÁCIÓ',
    section: 'INFLÁCIÓS ELMÉLET',
    content: [
      'Neoklasszikus elmélet: Egy adott gazdaságban a pénzmennyiség növekedése okozza az inflációt. Ez az elmélet az alapja a mai általánosan használatos szabályozói elveknek is.',
      '',
      'Keynesi elmélet: John Maynard Keynes szerint a pénzmennyiség növekedéséből adódó kereslet növekedés nem feltétlenül okoz inflációt.',
      '',
      'Az osztrák közgazdaságtani iskola: a gazdaságba bocsájtott pénzmennyiség közvetlenül alakítja az inflációt függetlenül a kereslet növekedésétől.'
    ]
  },
  {
    id: 40,
    chapter: 'A PÉNZ ROMLÁSA, INFLÁCIÓ',
    section: 'AZ INFLÁCIÓ ÜTEME',
    content: [
      'Lassú infláció: "kúszó" infláció. A gazdaság szempontjából kívánatos, éves néhány százalékos ütemű pénzromlás. Támogatja a szereplők aktivitását.',
      '',
      'Vágtató infláció: a pénzromlás ütemének néhány százalék feletti értéke. A gazdaság képes lehet megőrizni stabilitását, de a folyamat könnyen fordulhat a kezelhetetlenség irányába.',
      '',
      'Hiper infláció: akár több száz százalékot is meghaladó mértékű, megfékezése már csak kormányzati beavatkozással lehetséges.'
    ]
  },
  {
    id: 41,
    chapter: 'A PÉNZ ROMLÁSA, INFLÁCIÓ',
    section: 'AZ INFLÁCIÓ OKAI ÉS FAJTÁI',
    content: [
      'Keresleti infláció: az árszínvonal emelkedését a keresleti oldal okozza. A kereslet lehet belső és külső is.',
      '',
      'Kínálati infláció: másik elterjedt nevén költséginfláció. A jószág előállításának költségei növekednek.',
      '',
      'Pénz-és tőkepiaci infláció: a szolgáltatótól és ügyfelétől függetlenül bekövetkező szabályozói változások hatásai.'
    ]
  },
  {
    id: 42,
    chapter: 'A PÉNZ ROMLÁSA, INFLÁCIÓ',
    section: 'HOGYAN LEHET MÉRNI AZ INFLÁCIÓT',
    content: [
      'Az inflációt sok szempont alapján lehet és szokták mérni. Általában egy kosarat hoznak létre, amibe belepakolják azokat az árukat, termékeket, szolgáltatásokat, amiknek az árváltozását akarják kimutatni.',
      '',
      'Magyarországon a lakosság és a jogi személyek pénzét és pénzügyi eszközeit két fajta alap védi: OBA és BEVA.',
      '',
      'A kosár összetételét hazánkban jelenleg mintegy 1000 reprezentáns alkotja, amiket 140 csoportba sorolnak.'
    ]
  },
  // A MEGTAKARÍTÁS
  {
    id: 43,
    chapter: 'A MEGTAKARÍTÁS',
    section: 'BEVEZETÉS',
    content: [
      'Megtakarítás: A bevételeink és kiadásaink egyenlegeként jelentkező pozitív többlet.',
      '',
      'A megtakarítás az a jövedelemrész, amit nem fordítunk azonnal szükségleteink kielégítésére, nem költjük el. A megtakarítás egy későbbi időpontra halasztott szükségletkielégítést jelent.',
      '',
      'Ha valaki képes megtakarítani, úgy dönteni, hogy az azonnali pénzköltését elhalasztja, akkor már elindult a tudatosság útján.'
    ]
  },
  {
    id: 44,
    chapter: 'A MEGTAKARÍTÁS',
    section: 'BEVÉTELEK',
    content: [
      'Rendszeres bevétel (munka): A munkának nevezzük az ember által a saját fizikai és szellemi képességeit használva kifejtett erőfeszítést.',
      '',
      'Munkabér: a munkánkért cserébe juttatást várunk, ami az esetek túlnyomó többségében pénz vagy pénzben kifejezhető egyéb juttatás.',
      '',
      'A munka nélkülözhetetlen eleme az emberi létnek és fogalomként a közgazdaságtannak is.'
    ]
  },
  {
    id: 45,
    chapter: 'A MEGTAKARÍTÁS',
    section: 'KIADÁSOK',
    content: [
      'Állandó kiadások: azokat a kiadásainkat tartjuk számon, amik rendszeresen jelentkeznek és az életünk, életvitelünk szerves, elengedhetetlen részét képezik.',
      '',
      'Egyéb kiadások: azokat a kiadásainkat, amikre úgy költünk el pénzt, hogy azt a havi állandó költségvetésünkbe nem illesztettük.',
      '',
      'Luxus kiadások: olyan kiadás, amit azért engedhetünk meg magunknak, mert rendelkezünk egy egyszeri vagy folyamatos pénzügyi többlettel.'
    ]
  },
  {
    id: 46,
    chapter: 'A MEGTAKARÍTÁS',
    section: 'KIADÁSOK TERVEZÉSE, RENDSZEREZÉSE',
    content: [
      'Ahhoz, hogy értelmezni, átlátni, kezelni, tervezni, rendszerezni tudjuk a bevételeinket, valami többletre van szükség.',
      '',
      'A tudatosság két csoport meghatározását teszi lehetővé: egyrészt a kötelező és nem kötelező kiadások halmazait, másrészről a "sok kicsi sokra megy" mondását.',
      '',
      'Ha minden nap 1000 forinttal többet engedünk meg magunknak, az havi szinten átlagosan 30.500 forintot, éves szinten 366.000 forint többletkiadást jelent.'
    ]
  },
  {
    id: 47,
    chapter: 'A MEGTAKARÍTÁS',
    section: 'MEGTAKARÍTÁS',
    content: [
      'Miért fontos megtakarítani? A kiadásaink mérete és időbeni jelentkezése sok esetben nem tervezhető, a kiadások szempontjából a jövő nem mindig látható.',
      '',
      'A megtakarítás folyamata nem csak a "létfontosságú" kiadások anyagi biztonsága miatt lényeges.',
      '',
      'A rendszeres megtakarítás képessége már önmagában tudatosságot feltételez.'
    ]
  },
  // BEFEKTETÉS
  {
    id: 48,
    chapter: 'BEFEKTETÉS',
    section: '',
    content: [
      'Befektetés: A befektetés egy olyan művelet, ahol a jelenben rendelkezésünkre álló szabad pénzünket, tőkénket egy jövőbeni pénzre cseréljük a nagyobb jövedelem, hozam reményében.',
      '',
      'A befektetés azonban kockázattal is jár, amit mindenkor mérlegelnünk kell és a lehető legkörültekintőbben értékelni a befektetéseink során.',
      '',
      'A legalapvetőbb kérdések: Mennyit? Meddig? Mibe?'
    ]
  },
  {
    id: 49,
    chapter: 'BEFEKTETÉS',
    section: 'BEFEKTETÉS ÉS AZ IDŐ',
    content: [
      'Meghatározó szempont a befektetéseknél az idő. Egyrészt a hozamot időben fejezzük ki.',
      '',
      'A befektetéseket a következő időtávokban határozzuk meg: rövid-, közép- és hosszútávú befektetések.',
      '',
      'A rövidtávú befektetéseknek a 0 és 3 év közötti, középtávúnak a 3-5 év közötti és hosszútávúnak az 5 évet meghaladó időtávú befektetéseket nevezzük.',
      '',
      'A pénznek időértéke van.'
    ]
  },
  {
    id: 50,
    chapter: 'BEFEKTETÉS',
    section: 'SAJÁTKEZELÉS ÉS VAGYONKEZELÉS',
    content: [
      'A megtakarításunk, vagyonunk értékének megőrzése és a gyarapodásának biztosítása a saját felelősségünk.',
      '',
      'Függetlenül attól, hogy mi végezzük a saját vagyonunk kezelését vagy más végzi azt helyettünk, a felelősség a legtöbb esetben minket terhel.',
      '',
      'A vagyonkezelés azt jelenti, hogy a pénzünkkel kapcsolatos befektetési döntéseink meghozatalában tanácsot kapunk, vagy a befektetési döntéseket is mások hozzák meg helyettünk.'
    ]
  },
  // PÉNZÜGYI KOCKÁZAT
  {
    id: 51,
    chapter: 'PÉNZÜGYI KOCKÁZAT',
    section: 'BEVEZETÉS',
    content: [
      'Kockázat: A kockázat egy olyan veszély, ami ha bekövetkezik, annak negatív hatása van a kockázat viselőjére.',
      '',
      'A kockázatok egy jelentős részénél sikerrel lehet törekedni a megelőzésre (prevenció).',
      '',
      'A pénzügyi kockázatok rendkívül sokrétűek, ráadásul mátrixszerűen következhetnek egymásból is.'
    ]
  },
  {
    id: 52,
    chapter: 'PÉNZÜGYI KOCKÁZAT',
    section: 'KÖZVETETT KOCKÁZATOK',
    content: [
      'Országkockázat: országkockázatnak nevezzük a befektetési és hitelezési tevékenység folytatásának kockázatát egy országban.',
      '',
      'Szektorkockázat: A gazdasági élet különböző működési területeit szektorokra szokták osztani.',
      '',
      'Vállalati kockázat: A vállalkozás kockázata minden olyan lehetséges veszély, amelynek bekövetkezte negatívan befolyásolja a vállalkozás tevékenységét.'
    ]
  },
  {
    id: 53,
    chapter: 'PÉNZÜGYI KOCKÁZAT',
    section: 'A PÉNZÜGYI TERMÉK KOCKÁZATA',
    content: [
      'Likviditási kockázat: A pénzügyi termék likviditásának fogalma egy olyan mérőszám, ami azt vizsgálja, hogy egy adott termék egy bizonyos időszakon belül mennyire forgalmas.',
      '',
      'Árfolyamkockázat: A pénzügyi termékekkel alapvetően kétféle módon tudunk árfolyamnyereséget elérni: Long ügyletek és Short ügyletek.',
      '',
      'Hozamkockázat: A befektetések tőkenövekménye.'
    ]
  },
  {
    id: 54,
    chapter: 'PÉNZÜGYI KOCKÁZAT',
    section: 'SZOLGÁLTATÓI KOCKÁZAT',
    content: [
      'A pénzügyi termékek közvetítése engedélyhez kötött, ellenőrzött és felügyelt szolgáltatások összessége.',
      '',
      'A legfontosabb kockázatok: A szolgáltató csődjének kockázata, szerződéses jogviszonyból eredő kockázat, ügyletek végrehajtásának kockázata.',
      '',
      'OBA - Országos Betétbiztosítási Alap: maximum 100 ezer euró forintban kifejezve.',
      '',
      'BEVA - Befektető Védelmi Alap: maximum 100 ezer euró forintban kifejezve.'
    ]
  },
  {
    id: 55,
    chapter: 'PÉNZÜGYI KOCKÁZAT',
    section: 'ÉLET A PÉNZÜGYI KOCKÁZATOKKAL',
    content: [
      'A kockázatokkal együtt kell élnünk, de minél professzionálisabban igyekszünk mérlegelni és kezelni a kockázatainkat, annál nagyobb valószínűséggel érhetünk el eredményeket.',
      '',
      'Kockázatelemzés szakaszai: 1. Kockázatok kutatása 2. Kockázatok azonosítása 3. Kockázatok csoportosítása 4. Valószínűség meghatározása 5. Hatásfok meghatározása 6. Döntés előkészítése.',
      '',
      'Kockázatkezelés: Vállalt kockázatok nyomon követése, érvényesülés esetén alkalmazott folyamatok, kockázatok felülvizsgálata.'
    ]
  },
  {
    id: 56,
    chapter: 'PÉNZÜGYI KOCKÁZAT',
    section: 'RISK-REWARD',
    content: [
      'Kockázat - Megtérülés: arányszám, ami azt jelöli, hogy egységnyi kockázathoz képest mekkora a megtérülésünk, mint elvárt hozam.',
      '',
      'A kockázat mindig 1-es értékű és hozzá számítandó, a kockázati értékként meghatározott mutató többszöröse. Például 1:2, 1:3, 1:4.',
      '',
      'Az általánosan elfogadott minimum érték az 1:2 arány.'
    ]
  },
  // KOCKÁZATMEGOSZTÁS
  {
    id: 57,
    chapter: 'KOCKÁZATMEGOSZTÁS',
    section: 'MI A DIVERZIFIKÁCIÓ?',
    content: [
      'Diverzifikáció: alapvetően a kockázatok megosztását jelenti, a befektetések változatosságával.',
      '',
      'A diverzifikáció célja a vagyon megőrzése, míg a befektetések koncentrációja a vagyon aktívabb növelését szolgálja.',
      '',
      'A leggyakrabban használt osztályozás a "3-as megosztás": 1. Pénz-, és pénzügyi eszköz 2. Ingatlan 3. Vállalkozás'
    ]
  },
  {
    id: 58,
    chapter: 'KOCKÁZATMEGOSZTÁS',
    section: 'BEFEKTETÉSI FORMÁK SZERINTI ALLOKÁCIÓ',
    content: [
      'A befektetési formák szerinti diverzifikálás a kockázatmegosztás csúcsa és általában a már nagyobb méretű megtakarítással rendelkezők számára egy követendő út.',
      '',
      'A helyes diverzifikálás azt jelenti, hogy a befektetett összeget megosztjuk osztályonként és az osztályokba soroltan különböző befektetési csoportok szerint is diverzifikálunk.',
      '',
      'Minél sokrétűbb, szerteágazóbb a befektetések összessége, az annál több időt, figyelmet, körültekintést igényel.'
    ]
  },
  {
    id: 59,
    chapter: 'KOCKÁZATMEGOSZTÁS',
    section: 'KOCKÁZATI FELÜLVIZSGÁLÁS',
    content: [
      'A kockázatok folyamatosan velünk vannak, de nem csak azonosított jelenlétük okozhat veszélyt, hanem kiszámíthatóságuk is.',
      '',
      'A kockázatok és felvállalásuk értékelése mindenkinek egy folyamatos feladat.',
      '',
      'A pénzünk gondos befektetésével kapcsolatos eljárásunk hatékonyságának csökkenése a kockázatok csökkentésének irányába kell, hogy tereljen bennünket.',
      '',
      'Pénzünk, megtakarításunk, vagyonunk megőrzése sokkal fontosabb feladat, mint a befektetési hozam maximalizálásának igénye!'
    ]
  },
  {
    id: 60,
    chapter: 'ZÁRÓ GONDOLATOK',
    section: '',
    content: [
      'Ebben a könyvben megismerhettük a pénzügyi alapismeretek legfontosabb elemeit: a pénz kialakulását, tulajdonságait, az infláció jelenségét, a megtakarítás fontosságát, a befektetések alapjait és a pénzügyi kockázatok kezelését.',
      '',
      'A pénzügyi tudatosság nem egy célállapot, hanem folyamatos tanulás és fejlődés. A megszerzett ismeretek alkalmazása a mindennapi életben segít abban, hogy felelős döntéseket hozzunk pénzügyeinkkel kapcsolatban.',
      '',
      'Kívánunk minden Olvasónknak sikeres befektetéseket, gondos pénzkezelést és pénzügyileg tudatos, boldog jövőt!'
    ]
  }
];

export function PenzugyiAlapismeretkBookView({ onBack }: PenzugyiAlapismeretkBookViewProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextPage = () => {
    if (currentPage < bookPages.length - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  const goToStart = () => {
    setDirection(-1);
    setCurrentPage(0);
  };

  const pageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const currentPageData = bookPages[currentPage];

  return (
    <div className="absolute inset-0 pt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Book Container */}
      <div className="w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 flex items-center justify-between border-b-2 border-amber-600">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h1 className="text-base text-white font-serif">Pénzügyi Alapismeretek</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-200 text-xs">
              {currentPage + 1} / {bookPages.length}
            </span>
            {currentPage > 0 && (
              <button
                onClick={goToStart}
                className="w-8 h-8 bg-slate-700/60 hover:bg-slate-600/60 rounded-lg flex items-center justify-center transition-colors"
                title="Vissza az elejére"
              >
                <Home className="w-4 h-4 text-white" />
              </button>
            )}
            <button
              onClick={onBack}
              className="w-8 h-8 bg-slate-700/60 hover:bg-slate-600/60 rounded-lg flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-amber-50">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0 overflow-y-auto p-4"
            >
              <div className="max-w-full mx-auto">
                {/* Chapter header */}
                {currentPageData.chapter && (
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-slate-800 text-center border-b-2 border-amber-600 pb-2 font-serif tracking-wide">
                      {currentPageData.chapter}
                    </h2>
                  </div>
                )}

                {/* Section header */}
                {currentPageData.section && (
                  <div className="mb-3">
                    <h3 className="text-base font-semibold text-slate-700 font-serif">
                      {currentPageData.section}
                    </h3>
                  </div>
                )}

                {/* Content */}
                <div className="space-y-4">
                  {currentPageData.content.map((paragraph, idx) => {
                    if (paragraph === '') {
                      return <div key={idx} className="h-2" />;
                    }

                    // Címlap speciális stílus
                    if (currentPage === 0) {
                      return (
                        <p 
                          key={idx} 
                          className="text-slate-800 text-center font-serif"
                          style={{
                            fontSize: paragraph.includes('PÉNZÜGYI') ? '1.5rem' : 
                                     paragraph.includes('Átfogó') || paragraph.includes('Budapest') ? '0.9rem' : '0.85rem',
                            fontWeight: paragraph.includes('PÉNZÜGYI') ? 'bold' : 'normal',
                            letterSpacing: paragraph.includes('PÉNZÜGYI') ? '0.1em' : 'normal'
                          }}
                        >
                          {paragraph}
                        </p>
                      );
                    }

                    // Normál bekezdések - könyv stílus
                    return (
                      <p 
                        key={idx} 
                        className="text-slate-800 leading-relaxed text-justify font-serif"
                        style={{
                          textIndent: '1.5em',
                          lineHeight: '1.6',
                          fontSize: '0.85rem'
                        }}
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Page number at bottom */}
                <div className="text-center mt-8 text-slate-500 text-xs font-serif">
                  — {currentPage + 1} —
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 flex items-center justify-between border-t-2 border-amber-600">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="flex items-center gap-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors shadow-lg font-serif text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Előző</span>
          </button>

          <div className="text-amber-200 font-serif text-xs max-w-[120px] text-center truncate">
            {currentPageData.chapter && (
              <span>{currentPageData.chapter}</span>
            )}
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === bookPages.length - 1}
            className="flex items-center gap-1 px-4 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors shadow-lg font-serif text-sm"
          >
            <span>Következő</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
