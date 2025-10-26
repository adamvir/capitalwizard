// Pénzügyi Alapismeretek Könyv - Teljes szöveg oldalakra bontva

export interface BookPage {
  id: number;
  chapter: string;
  title: string;
  content: string;
}

export const penzugyiAlapismeretekBook: BookPage[] = [
  // BEVEZETÉS
  {
    id: 1,
    chapter: 'BEVEZETÉS',
    title: 'Bevezetés',
    content: `Ez a könyv azért készült, hogy általános ismereteket nyújtson a gazdaság működésének alapvető folyamatairól, azon belül is leginkább a tőkepiacokkal ismertesse meg az érdeklődőket, tanulókat. Segítségével nem feltétlenül válhatunk azonnal tapasztalt befektetési szakemberekké, de a tartalom elsajátításával széleskörű ismereteket szerezhetünk, ami egy kezdő lépés lehet, hogy elindulhassunk a tőkepiacok varázslatos világában.

El kell fogadnunk azt a tényt, hogy a mai világ legalapvetőbb emberi szükséglete a pénz, ebben fejezzük ki a legtöbb igényünket, elégítjük ki szükségleteink jelentős részét. Az út, ami a pénzügyek működésének megértéséhez vezet rendkívül hosszú és bonyolult.`
  },
  {
    id: 2,
    chapter: 'BEVEZETÉS',
    title: 'A pénzügyi tudatosság hiánya',
    content: `A magyar lakosság általánosságban nagyon keveset foglalkozik a pénzügyeivel. Az alapvető cél az lenne, hogy pontosan ismerjük pénzügyi bevételeinket, kiadásainkat, rendszerezni és értékelni tudjuk azt a folyamatot, aminek alapján megtakarítással rendelkezhetünk, amely megtakarítás gondosan felügyelt, megalapozott döntések útján történő befektetéssel tovább gyarapodhat.

A lakossági megtakarítások növekedése nem csak egyéni, hanem társadalmi érdek is egyaránt. A magasabb életszínvonal kialakulásának egyik legfontosabb pillére a lakossági megtakarítások növekedése.`
  },
  {
    id: 3,
    chapter: 'BEVEZETÉS',
    title: 'A vállalati pénzügyek',
    content: `Az elmúlt években határozott emelkedésnek indultak a magyar bérek, nőttek a megtakarítások, de a pénzügyekkel kapcsolatos időráfordítás nagyon minimálisan emelkedett. Tanulás, tapasztalat és folyamatos odafigyelésre lenne szükség abban a témakörben, ami gyakorlatilag mindenkit érint a háztartások napi pénzügyi teendői révén.

A magyar pénzügyi ismeretek hiánya azonban nem csak a lakossági szegmensben, nem csak a háztartások esetében probléma. Az intézmények pénzügyi irányításának felkészültsége is rendkívül alacsony színvonalú. A KKV és mikró vállalkozások esetében szinte nem is létezik a gondos vállalati pénzügyi irányítás megléte.`
  },
  {
    id: 4,
    chapter: 'BEVEZETÉS',
    title: 'A könyv célja',
    content: `Ezzel a könyvvel és egyben tanítási modellel igyekszünk felkészíteni azokat a már gyakorló vagy későbbiekben vezetőkké váló vállalatvezetőket, akik mélyebb tudást igényelnek a gazdasági ismeretekben, a tőkepiac folyamataiban.

Hogyan juthatunk tőkéhez? Miért nem csak a bankbetét az egyetlen befektetési lehetőség? Mire jó a vállalat tőzsdei jelenléte? Transzparencia, marketing többlet, jelentési kötelezettségek és még számtalan egyéb, hasznos ismeret a vállalatok tőkepiaci jelenlétével összefüggésben.

A magyar gazdaság szereplőinek tudása, ismereteik magasabb színvonala az alapvető kelléke a sikeresebb magyar gazdaság folytatólagos fenntarthatóságának.`
  },
  {
    id: 5,
    chapter: 'BEVEZETÉS',
    title: 'Tanulási folyamat',
    content: `A könyv szerzői nem csupán egy könyvet írtak sok-sok gazdasági, tőkepiaci ismerettel, hanem egy tanulási folyamatot is modelleztek, ami e-learning formájában válik elérhetővé az érdeklődők számára.

A tanulási folyamat rengeteg ellenőrző kérdéssel tarkítottan követi a tanulni akarók tananyag elsajátítását, értékeli, elemzi a felkészültséget.

Ezúton kívánunk minden Olvasónknak sikeres tanulást és felkészült, pénzügyekben gondos és tudatos jövőt!`
  },

  // A PÉNZ
  {
    id: 6,
    chapter: 'A PÉNZ',
    title: 'Bevezetés',
    content: `Kezünkbe fogunk értékes papírokat, érméket. Súlyuk, anyaguk lényegtelen az értékük tekintetében? Hogy milyen értékkel bírnak leginkább attól függ, hogy milyen szám van rájuk írva? Persze, ha ez ilyen egyszerű lenne, akkor fognánk egy papírt, ráírnánk egy számot és könnyedén gazdagok lehetnénk.

Színes, képes papírok, dombornyomott érmék. Lehetnek szépek, ritkák, lényegesen értékesebbek, mint amit az "előállításuk", anyaguk képvisel. Ezek a papírok, fémek közel sem szolgálnak mindenképpen fizetési eszközként.`
  },
  {
    id: 7,
    chapter: 'A PÉNZ',
    title: 'Mi is a pénz?',
    content: `Ahhoz, hogy a pénz valójában pénz lehessen, forgalmi értékkel rendelkezzen, ahhoz az szükséges, hogy a piac, a társadalom, a törvényi és prudenciális szabályozás is fizetési eszköznek ismerje, fogadja el.

A pénz egy "áru", ami elfogadott értékkel bír és ezáltal elcserélhetjük olyan árucikkekre, amiknek az értékét pénzben is ki tudjuk fejezni.

Ugyanakkor a mai világban sem minden árucikk és nem is fejezhető ki minden értékben, pénzben. Ha valaki abban hisz és bízik, hogy pénzért cserébe bármit megkaphat, nyilvánvalóan téved. Szeretetet, családot, minden formájú egészséget és még számtalan dolgot nem lehet pénzért venni, cserélni.`
  },
  {
    id: 8,
    chapter: 'A PÉNZ',
    title: 'A pénz használata',
    content: `Valamit vásárolni, megszerezni pénzért cserébe, rendkívül egyszerű folyamat. Odamegyünk a kasszához és készpénzben fizetünk, a bankszámlánkról utalással egyenlítjük ki az ellenértéket.

A pénz formái is különbözőek, nem csak kinézetükben, de alkalmazásuk szerint is. Ami olyan egyszerű és egyértelmű a mai ember számára, az sok évszázadon keresztül ivódott az emberi cselekvések szokványaként és mindannyiunknak a felnőttkori lét egyik meghatározó elemét képviseli.

Pénzt keresni, pénzt költeni mindenki tud és szokott. Pénzt kezelni, tudatosan megtakarítani már a társadalom csak kisebb szegmense.`
  },
  {
    id: 9,
    chapter: 'A PÉNZ',
    title: 'A pénzügyi folyamatok',
    content: `A pénzügyi folyamatok bonyolultak. Ami nekünk csak vásárlás, mint cselekedet, a pénzforgalom szempontjából rendkívül összetett szabályozási, működtetési probléma-halmaz.

Nem mindegy, hogy mennyi pénz van forgalomban. Nem mindegy, hogy milyen címletek és belőlük mennyi van kibocsájtva. Nem mindegy a pénz romlása, annak üteme és a gazdaságra gyakorolt hatása.

Nem mindegy, hogy mennyi a pénz kamata és milyen időtávra, mint ahogy az sem mindegy, hogy ösztönzőek-e a pénzköltés feltételei vagy megtakarításra bíróak.`
  },
  {
    id: 10,
    chapter: 'A PÉNZ',
    title: 'Pénzügyi tudatosság',
    content: `Az emberek általában azt gondolják, hogy sokat tudnak a pénzről. Az emberek valóban viszonylag sokat tudnak a pénzről, de a lakosság legnagyobb része mégsem tud felelősen gondolkodni, gondoskodni pénzügyeiről pénzügyi tudatosságaként.

Nagyon nem mindegy, hogy mennyi van a pénzből a zsebünkben, tartva bankszámlákon, befektetve értékpapírokba, ingóságokba, ingatlanokba, műtárgyakba és számos egyéb befektetési, pénzügyi eszközbe, értékkel bíró vagyontárgyba.

"A pénz sosem alszik." A pénz tartása, a vagyontárgyak léte nem csak hozadékkal, kamattal, hozammal járhat, hanem költségekkel, terhekkel, időráfordítással és rengeteg kockázati tényezővel is.`
  },

  // A PÉNZ KIALAKULÁSA
  {
    id: 11,
    chapter: 'A PÉNZ KIALAKULÁSA',
    title: 'Ősközösség - Önellátó társadalom',
    content: `Ahhoz, hogy megérthessük a pénz, mint forgalmi értékkel bíró fizetőeszköz kialakulásának az okát, nagyon messzire kell visszautaznunk az emberiség történelmében.

Az "önellátó társadalom" kifejezés inkább az ősközösségi társadalom életmódjára utal, amit tanulmányainkból így ismerhetünk: vadászás, halászás, gyűjtögetés.

Az ősközösségek történelmi fejlődése erősen korlátozott volt, pontosan az önellátó életmód miatt. Alacsony népsűrűség, változó sikerű önellátás, alacsony népszaporulat jellemezte ezeket a társadalmakat.`
  },
  {
    id: 12,
    chapter: 'A PÉNZ KIALAKULÁSA',
    title: 'A szakosodás kezdete',
    content: `Az idő múlt és a világ fejlődött. A fejlődéssel pedig jelentkeztek az igények. Elkezdődött a magasabb színvonalú munka elvégzése, ami a hozzáértőket a szakosodás útjára vezette.

A szakosodás mind aktívabban tette lehetővé a sokrétű árukészlet felhalmozását, ahol a helyileg kialakult többlet, más helyek hiányának betöltését tette lehetővé.

Elkezdődött a cserekereskedelem.`
  },
  {
    id: 13,
    chapter: 'A PÉNZ KIALAKULÁSA',
    title: 'Cserekereskedelem',
    content: `Az elkezdődött szakosodás körülbelül az Őskor végére és az Ókor elejére tehető. Az árucikkekből megtermelt többlet "útnak indult", hogy keresse a helyét olyan helyeken, ahol nem volt elég belőle.

A többlet árut kínálót eladónak, az áruhiányban szenvedőt vevőnek nevezzük. Az áru cserekereskedelmének kezdeteként az árukat közvetlenül cserélték más árukra, adott helyenként a kereslet-kínálat együtthatójából következő cserearány szerint.

Ennek a közvetlen cserekereskedelemnek azonban az volt a feltétele, hogy a kínált áru helyébe olyan árut kapjunk, amire nekünk is szükségünk van.`
  },
  {
    id: 14,
    chapter: 'A PÉNZ KIALAKULÁSA',
    title: 'A cserekereskedelem problémái',
    content: `A probléma a cserekereskedelem esetében azonban nem csak a kínált és cserébe elvárt áruk találkozásának problémája volt. Gondot jelentett az is, hogy azonos helyen és időben kellett lebonyolítani az üzletet, ami igencsak nehézkes volt és nem is mindig sikeres.

Nem beszélve arról, hogy az áruhiány és a kereslet időben nem feltétlenül kiszámíthatóan jelentkezett, egy-egy helyen túl sok felesleg adódott vagy rendkívül nagy hiány.

Azt sem szabad figyelmen kívül hagyni, hogy egy értékesebb árut egy másik értékesebb áruért cserébe nem feltétlenül lehetett az áru számának többszöröseként kifejezni.`
  },
  {
    id: 15,
    chapter: 'A PÉNZ KIALAKULÁSA',
    title: 'Árupénz',
    content: `Az "áruért áruval fizetek" cserekereskedelem számtalan problémát hordozott és hamarosan igény jelentkezett arra, hogy a zökkenőmentesebb cserekereskedelem bonyolításához valamilyen árupénzzel lehessen fizetni.

Az árupénz egy olyan köztes áru az áruk cserekereskedelmében, amit a legkönnyebben volt lehetséges más árukra cserélni és amely áru értéke könnyen meghatározható volt más áruk viszonylatában.

Természetesen ez sem lett volna elég, sok egyéb elvárt tulajdonsággal is rendelkeznie kellett az árupénznek: viszonylagosan tartani kellett az értékét, kis- és nagyobb mértékkel is rendelkeznie kellett az oszthatóság végett és általánosan elfogadottnak kellett lennie.`
  },
  {
    id: 16,
    chapter: 'A PÉNZ KIALAKULÁSA',
    title: 'A só, mint árupénz',
    content: `Ha gyorsan kell ilyen árut keresni, akkor leginkább a só és a cukor jut az eszünkbe. Kevesen tudják ugyanakkor, hogy a cukor még 150 évvel ezelőtt is leginkább a nemesi udvarok "tartozéka" volt. Marad a só.

A só rendelkezett minden szükséges kellékkel, amivel az árupénznek rendelkeznie kell. Könnyen lehetett szállítani, bármit ki lehetett vele fizetni, mindig szükség volt rá és a legtöbb helyen idővel ismerték és el is fogadták.

A cserekereskedelem során használatos árupénz azonban még mindig nem volt teljesen problémamentes fizetőeszköz. Árupénz az áruban, csereérték az áruban, ráadásul sok és nem néhány fajta árupénz még mindig nehézkes kereskedelmet bonyolított.`
  },
  {
    id: 17,
    chapter: 'A PÉNZ KIALAKULÁSA',
    title: 'Nemesfémek',
    content: `Az emberiség fejlődése során, valószínűleg a 6.-7. század környékén jelentek meg az első nemesfém alapú fizetőeszközök, amiket már joggal nevezhetünk pénznek, fizető-eszköznek.

Érméket öntöttek arany és ezüst anyagból és ezeket az akkori "gazdasági" szereplők elfogadták, ismerték a nemesfémek ritkaságát, értékét.

Az arany magasabb értékével, az ezüst alacsonyabb értékű váltópénzként funkcionált.`
  },
  {
    id: 18,
    chapter: 'A PÉNZ KIALAKULÁSA',
    title: 'Bimetalizmus és Monometalizmus',
    content: `Bimetalizmus: az arany és az ezüst együtt töltötték be a pénz funkcióját.

Monometalizmus: amikor egyetlen nemesfém (alapvetően az arany) töltötte be a pénz funkcióját.

Miközben az arany és az ezüst - a nemesfémek - még a saját mivoltukban az árucsere áruit is képviselték, funkciójukban már inkább nevezhetőek pénzhelyettesítőnek, mert a nemesfém bázisú pénzkibocsátás mögöttes értéke évszázadokon keresztül, a modern pénz kialakulásáig az aranyhoz, aranytartalékhoz volt kötve.`
  },
  {
    id: 19,
    chapter: 'A PÉNZ KIALAKULÁSA',
    title: 'Pénzelméletek',
    content: `Az átmenet részeként megjelent az árufedezet alapú pénzhelyettesítők kibocsátása is.

Currency elmélet: annyi pénzhelyettesítőt lehet, szabad forgalomba hozni, amennyi a mögöttes aranyfedezet.

Banking elmélet: a pénzhelyettesítők kibocsátását nem a meglévő aranyfedezethez, hanem árufedezethez kell kötni.`
  },
  {
    id: 20,
    chapter: 'A PÉNZ KIALAKULÁSA',
    title: 'Szabad pénz kora',
    content: `Az Egyesült Államokban a szabályozás hiánya, vagy megengedő mivolta miatt, gyakorlatilag bárki "bocsáthatott ki" saját pénzt. Magánbankok, boltok, éttermek, de akár magánszemélyek is.

Ékes példája mindez annak, hogy a piac pénzelfogadó mechanizmusa képes arra, hogy bármilyen "eszközből" fizetőeszközt tudjon létrehozni.

Kijelenthető, hogy napjainkban nem létezhet határtalanul (szabályozatlanul) a "szabad pénz" fogalma.`
  },
  {
    id: 21,
    chapter: 'A PÉNZ KIALAKULÁSA',
    title: 'Rendeleti pénz',
    content: `Meg is érkeztünk a modern pénz, fizetőeszköz fogalmához. A rendeleti pénz olyan pénz, amit valaki kötelezően forgalomba helyező, tartó és onnan kivonható, átalakítható jelleggel bocsát a gazdaságba.

A rendeleti pénz mögöttes értéke egyéb áruban, de akár nemesfémben is kifejezhető, de meghatározás nélkül is forgalomba bocsájthatja.

A legmegfelelőbb kifejezés: nemzeti valutaként kibocsájtott, állami garanciával bíró, nemzeti fizetési eszköz.`
  },
  {
    id: 22,
    chapter: 'A PÉNZ KIALAKULÁSA',
    title: 'A modern pénz jelentősége',
    content: `A gazdaság ismeri és elismeri a fizetőeszköz árukereskedelemben, szolgáltatásban résztvevő közvetítő szerepét, fizetési eszköz mivoltát.

A társadalmi szabályrendszer, a törvények szigorúan büntetik a fizetőeszköz hamisítását, eltulajdonítását, a pénzzel való visszaéléseket.

A modern pénz, a rendeleti pénz a közgazdaságtan alapvető fogalma. Nélküle nem létezik a mai modern közgazdaságtan, tudomány.`
  },

  // A MODERN PÉNZ FAJTÁI
  {
    id: 23,
    chapter: 'A MODERN PÉNZ FAJTÁI',
    title: 'Készpénz és számlapénz',
    content: `A modern pénz alapvetően egyrészről többféle fizikálisan megjelenő papírpénzformában (bankjegyben) és érmében jelentkezik, másrészről számlapénzben, ami gyakorlatilag virtuális, a bankszámlák közötti forgalom lebonyolítását szolgáló eszköz.

A modern pénznek tehát két alapvető formáját különböztetjük meg: a készpénzt és a számlapénzt.`
  },
  {
    id: 24,
    chapter: 'A MODERN PÉNZ FAJTÁI',
    title: 'Magyar forint érmék',
    content: `A ma forgalomban lévő, leginkább a váltást elősegítő készpénzérmék:

5 forintos
10 forintos
20 forintos
50 forintos
100 forintos
200 forintos`
  },
  {
    id: 25,
    chapter: 'A MODERN PÉNZ FAJTÁI',
    title: 'Magyar forint bankjegyek',
    content: `A jelenben készpénzként létező papírpénzek, bankjegyek:

500 forintos
1000 forintos
2000 forintos
5000 forintos
10000 forintos
20000 forintos

A pénzhamisítást a törvény szigorúan bünteti, az a társadalomra kiemelten káros, megzavarja a gazdaság szereplőinek bizalmát, ami tömeges méretekben akár válsághelyzetet is indukálhat!`
  },

  // A PÉNZ TULAJDONSÁGAI
  {
    id: 26,
    chapter: 'A PÉNZ TULAJDONSÁGAI',
    title: 'A pénz értéket képvisel',
    content: `A pénz szerepe és egyben a tőle elvárható alapvető feladata, hogy értéket fejezzen ki, benne számítottan meghatározható legyen egy áru, termék, szolgáltatás ára.

Minden értéket képviselő jószág általában kifejezhető pénz alapú értékként. Mégis fontos megjegyezni, hogy azonos vagy egymásra jelentős mértékben hasonlító áruk ára is különbözhet.

Egy kiló fehér kenyér ára különböző lehet a sok-sok pékségben, áruházban, ahol árulják őket.`
  },
  {
    id: 27,
    chapter: 'A PÉNZ TULAJDONSÁGAI',
    title: 'Az érték fogalma',
    content: `Az érték: egy anyagi, szellemi tulajdonsággal bíró dolog minősége, hasznossága, ami miatt az adott dolgot megszerezni, tartani, birtokolni érdemes, valamint az adott dolog meghatározható ára.

Ez az a két dolog, ami összessége értéket képvisel és amely értéket pénzben fejezhetünk ki.

És akkor újra leírva, mert meghatározó jelentőségű, hogy az életben nem minden érték fejezhető ki pénzben. Léteznek eszmei értékkel, pénzben nem kifejezhetően létező értékek is. Szeretet, szabadság, egészség és még számos dologi és eszmei érték pénzben történő kifejezése, csupán szubjektív alapú, képzeleti együttható.`
  },

  // További oldalak következnek...
  // (A teljes könyv folytatása ugyanígy, oldalakra bontva)
];

// Egyszerűsített export a StandaloneBookView-hoz való kompatibilitás érdekében
export interface BookViewPage {
  id: string;
  chapter: string;
  title: string;
  content: string;
}

export const penzugyiAlapismeretkBookData: BookViewPage[] = penzugyiAlapismeretekBook.map(page => ({
  id: page.id.toString(),
  chapter: page.chapter,
  title: page.title,
  content: page.content
}));
