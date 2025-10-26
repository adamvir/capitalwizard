import { BookViewTerm } from '../components/StandaloneBookView';

export const fundamentalisElemzesData: BookViewTerm[] = [
  {
    id: '1',
    term: 'Mi a Fundamentális Elemzés?',
    definition: 'Vállalatok belső értékének meghatározása pénzügyi kimutatások, iparági trendek, gazdasági mutatók és menedzsment minőségének elemzésével. A cél: alul- vagy túlértékelt részvények azonosítása.',
    category: 'Alapok'
  },
  {
    id: '2',
    term: 'Belső Érték (Intrinsic Value)',
    definition: 'Egy vállalat valódi értéke pénzáramlások alapján. Ha piaci ár < belső érték = alulértékelt (vásárlás). Ha piaci ár > belső érték = túlértékelt (eladás).',
    category: 'Alapok'
  },
  {
    id: '3',
    term: 'Biztonsági Rezerv (Margin of Safety)',
    definition: 'Benjamin Graham koncepciója. Vásárlás belső érték alatt jelentős diszkonttal (pl. 20-30%). Védelem becslési hibák és váratlan események ellen.',
    category: 'Alapelvek'
  },
  {
    id: '4',
    term: 'Top-Down vs Bottom-Up',
    definition: 'Top-Down: makró → iparág → vállalat. Bottom-Up: egyedi vállalat elemzése makró figyelmen kívül hagyásával. Legjobb: mindkettő kombinációja.',
    category: 'Megközelítések'
  },
  {
    id: '5',
    term: 'Három Pénzügyi Kimutatás',
    definition: 'Mérleg (Balance Sheet), Eredménykimutatás (Income Statement), Cash Flow kimutatás. Mind a három szükséges teljes képhez.',
    category: 'Pénzügyi Kimutatások'
  },
  {
    id: '6',
    term: 'Mérleg (Balance Sheet)',
    definition: 'Adott időpontbeli pénzügyi helyzet pillanatképe. Eszközök = Kötelezettségek + Saját tőke. Mit birtokol és mivel tartozik a vállalat.',
    category: 'Pénzügyi Kimutatások'
  },
  {
    id: '7',
    term: 'Eszközök (Assets)',
    definition: 'Amit a vállalat birtokol. Forgóeszközök (készpénz, követelések, készletek) + Befektetett eszközök (ingatlan, gépek, immateriális javak).',
    category: 'Mérleg'
  },
  {
    id: '8',
    term: 'Kötelezettségek (Liabilities)',
    definition: 'Mivel tartozik a vállalat. Rövid lejáratú (1 éven belül) + Hosszú lejáratú (1 év felett). Adósság szintje kritikus!',
    category: 'Mérleg'
  },
  {
    id: '9',
    term: 'Saját Tőke (Equity)',
    definition: 'Részvényesek nettó tulajdona. Eszközök - Kötelezettségek = Saját Tőke. Növekedő saját tőke pozitív jel.',
    category: 'Mérleg'
  },
  {
    id: '10',
    term: 'Eredménykimutatás',
    definition: 'Adott időszak (negyedév, év) profitábilitása. Bevétel - Kiadások = Profit. Mutatja, hogy a vállalat pénzt keres-e.',
    category: 'Pénzügyi Kimutatások'
  },
  {
    id: '11',
    term: 'Bevétel (Revenue)',
    definition: 'Termékek és szolgáltatások értékesítéséből származó összes pénz. "Top line". Növekedési ütem fontos mutató.',
    category: 'Eredménykimutatás'
  },
  {
    id: '12',
    term: 'Bruttó Profit',
    definition: 'Bevétel - Közvetlen költségek (COGS). Mutatja az alapüzletág jövedelmezőségét. Bruttó profit margin = Bruttó Profit / Bevétel.',
    category: 'Eredménykimutatás'
  },
  {
    id: '13',
    term: 'Működési Profit (EBIT)',
    definition: 'Earnings Before Interest and Taxes. Bruttó profit - Működési költségek. Operatív hatékonyságot mutatja.',
    category: 'Eredménykimutatás'
  },
  {
    id: '14',
    term: 'Nettó Nyereség (Net Income)',
    definition: 'Bottom line. EBIT - Kamatok - Adók. Ezt osztják fel részvényesek között vagy fektetik vissza.',
    category: 'Eredménykimutatás'
  },
  {
    id: '15',
    term: 'EBITDA',
    definition: 'Earnings Before Interest, Taxes, Depreciation, Amortization. Operatív cash flow proxy. Vállalatok összehasonlítására használják.',
    category: 'Eredménykimutatás'
  },
  {
    id: '16',
    term: 'Cash Flow Kimutatás',
    definition: 'Pénzmozgás három kategóriában: Működési, Befektetési, Finanszírozási. "Cash is king" - a legfontosabb kimutatás!',
    category: 'Pénzügyi Kimutatások'
  },
  {
    id: '17',
    term: 'Működési Cash Flow (OCF)',
    definition: 'Alaptevékenységből származó pénzmozgás. Pozitív OCF kritikus! Jobb, mint a könyv szerinti profit.',
    category: 'Cash Flow'
  },
  {
    id: '18',
    term: 'Free Cash Flow (FCF)',
    definition: 'OCF - Capex (tőkekiadások). Szabadon felhasználható pénz osztalékra, visszavásárlásra, adósságfizetésre. Kulcsmutató!',
    category: 'Cash Flow'
  },
  {
    id: '19',
    term: 'Befektetési Cash Flow',
    definition: 'Tőkekiadások, felvásárlások, beruházások. Negatív normális (növekvő vállalatoknál). Capex intenzitás iparágonként változik.',
    category: 'Cash Flow'
  },
  {
    id: '20',
    term: 'Finanszírozási Cash Flow',
    definition: 'Adósság felvétel/törlesztés, részvénykibocsátás/visszavásárlás, osztalékfizetés. Tőkestruktúra változásait mutatja.',
    category: 'Cash Flow'
  },
  {
    id: '21',
    term: 'P/E Ráta (Price-to-Earnings)',
    definition: 'Árfolyam / Egy részvényre jutó nyereség. Megmutatja, hányszor fizetjük meg az éves profitot. Alacsony P/E = olcsó (de miért?).',
    category: 'Értékelési Mutatók'
  },
  {
    id: '22',
    term: 'Forward P/E',
    definition: 'Árfolyam / Előrejelzett jövőbeli nyereség. Jövőorientált. Összehasonlítás iparági átlaggal és történeti szintekkel.',
    category: 'Értékelési Mutatók'
  },
  {
    id: '23',
    term: 'PEG Ráta',
    definition: 'P/E / Nyereség növekedési ráta. Normalizálja a P/E-t a növekedésre. PEG < 1 = potenciálisan alulértékelt.',
    category: 'Értékelési Mutatók'
  },
  {
    id: '24',
    term: 'P/B Ráta (Price-to-Book)',
    definition: 'Árfolyam / Könyv szerinti érték (egy részvényre). Eszközalapú értékelés. Bankoknál, ingatlanon különösen hasznos.',
    category: 'Értékelési Mutatók'
  },
  {
    id: '25',
    term: 'P/S Ráta (Price-to-Sales)',
    definition: 'Piaci kapitalizáció / Bevétel. Veszteséges vállalatoknál használható (nincs nyereség). Technológiai startupokná népszerű.',
    category: 'Értékelési Mutatók'
  },
  {
    id: '26',
    term: 'EV/EBITDA',
    definition: 'Enterprise Value / EBITDA. Teljes vállalat értékelés (részvény + adósság - készpénz). Felvásárlásoknál használják.',
    category: 'Értékelési Mutatók'
  },
  {
    id: '27',
    term: 'ROE (Return on Equity)',
    definition: 'Nettó nyereség / Saját tőke. Mennyit keres a vállalat a részvényesi tőkéből. 15%+ kiváló. Warren Buffett kedvenc mutatója.',
    category: 'Jövedelmezőségi Mutatók'
  },
  {
    id: '28',
    term: 'ROA (Return on Assets)',
    definition: 'Nettó nyereség / Eszközök. Eszközök hatékony kihasználása. Eszközintenzív iparágakban különösen fontos.',
    category: 'Jövedelmezőségi Mutatók'
  },
  {
    id: '29',
    term: 'ROIC (Return on Invested Capital)',
    definition: 'NOPAT / Befektetett tőke. Teljes tőke (saját + idegen) hozama. ROIC > WACC = értékteremtés.',
    category: 'Jövedelmezőségi Mutatók'
  },
  {
    id: '30',
    term: 'Profit Margin',
    definition: 'Nettó nyereség / Bevétel. Ár hatalom és költség kontroll. Iparágonként nagy eltérések (tech: magas, kiskereskedelem: alacsony).',
    category: 'Jövedelmezőségi Mutatók'
  },
  {
    id: '31',
    term: 'Adósság/Tőke Ráta (D/E)',
    definition: 'Összes adósság / Saját tőke. Pénzügyi tőkeáttét. Magas D/E = kockázatos, különösen visszaesésben.',
    category: 'Tőkeáttételi Mutatók'
  },
  {
    id: '32',
    term: 'Adósság/EBITDA',
    definition: 'Nettó adósság / EBITDA. Hány év EBITDA kell az adósság törlesztéséhez. < 3x egészséges, > 5x veszélyes.',
    category: 'Tőkeáttételi Mutatók'
  },
  {
    id: '33',
    term: 'Interest Coverage Ratio',
    definition: 'EBIT / Kamatköltségek. Hányszor tudja megfizetni a kamatokat. < 2.5x = pénzügyi stressz veszély.',
    category: 'Tőkeáttételi Mutatók'
  },
  {
    id: '34',
    term: 'Current Ratio',
    definition: 'Forgóeszközök / Rövid lejáratú kötelezettségek. Likviditás mérő. > 1.5x egészséges, < 1x = likviditási probléma.',
    category: 'Likviditási Mutatók'
  },
  {
    id: '35',
    term: 'Quick Ratio (Acid Test)',
    definition: '(Forgóeszközök - Készletek) / Rövid kötelezettségek. Konzervatív likviditás. Készleteket nehezebb pénzzé tenni.',
    category: 'Likviditási Mutatók'
  },
  {
    id: '36',
    term: 'Cash Ratio',
    definition: 'Készpénz / Rövid kötelezettségek. Legszigorúbb likviditási mérő. Mennyire képes azonnal fizetni.',
    category: 'Likviditási Mutatók'
  },
  {
    id: '37',
    term: 'Inventory Turnover',
    definition: 'COGS / Átlagos készlet. Hányszor fordul meg a készlet évente. Magasabb = hatékonyabb. Iparágonként változik.',
    category: 'Hatékonysági Mutatók'
  },
  {
    id: '38',
    term: 'Receivables Turnover',
    definition: 'Bevétel / Átlagos követelések. Milyen gyorsan behajtják a pénzt. Lassulás = figyelmeztetés.',
    category: 'Hatékonysági Mutatók'
  },
  {
    id: '39',
    term: 'Asset Turnover',
    definition: 'Bevétel / Eszközök. Eszközök hatékony kihasználása bevételtermelésre. Kiskereskedelem: magas, közműszolgáltatás: alacsony.',
    category: 'Hatékonysági Mutatók'
  },
  {
    id: '40',
    term: 'Osztalék Hozam (Dividend Yield)',
    definition: 'Éves osztalék / Árfolyam. Jövedelembefektetők fő mutatója. 2-6% ideális tartomány. Túl magas = veszélyben az osztalék?',
    category: 'Osztalék Mutatók'
  },
  {
    id: '41',
    term: 'Payout Ratio',
    definition: 'Osztalék / Nettó nyereség. Mekkora részt fizet ki. 40-60% fenntartható. 80%+ = kevés mozgástér.',
    category: 'Osztalék Mutatók'
  },
  {
    id: '42',
    term: 'Dividend Growth Rate',
    definition: 'Osztalék növekedési üteme. Osztalék arisztokraták: 25+ év folyamatos növelés. Kompounding hatalom!',
    category: 'Osztalék Mutatók'
  },
  {
    id: '43',
    term: 'EPS (Earnings Per Share)',
    definition: 'Nettó nyereség / Részvények száma. Egy részvényre jutó profit. Növekedő EPS = jó, de ne manipulációból (visszavásárlás).',
    category: 'Per Share Mutatók'
  },
  {
    id: '44',
    term: 'Book Value Per Share',
    definition: 'Saját tőke / Részvények száma. Egy részvényre jutó nettó eszközérték. Csőd esetén elméletileg ezt kapnánk.',
    category: 'Per Share Mutatók'
  },
  {
    id: '45',
    term: 'DCF Értékelés',
    definition: 'Discounted Cash Flow. Jövőbeli cash flow-k jelenértékre diszkontálása. Elméleti aranystandard, de feltételezésfüggő.',
    category: 'Értékelési Módszerek'
  },
  {
    id: '46',
    term: 'WACC (Weighted Average Cost of Capital)',
    definition: 'Súlyozott átlagos tőkeköltség. DCF-ben diszkont ráta. Saját és idegen tőke költségének súlyozott átlaga.',
    category: 'Értékelési Módszerek'
  },
  {
    id: '47',
    term: 'Terminal Value',
    definition: 'DCF-ben az előrejelzési horizont utáni érték. Gyakran az érték 60-80%-a! Gordon Growth Model: perpetuitás feltételezés.',
    category: 'Értékelési Módszerek'
  },
  {
    id: '48',
    term: 'Comparables Analysis',
    definition: 'Hasonló vállalatokkal való összehasonlítás (P/E, EV/EBITDA stb.). Gyorsabb, mint DCF. Iparági átlagok fontos benchmark.',
    category: 'Értékelési Módszerek'
  },
  {
    id: '49',
    term: 'Precedent Transactions',
    definition: 'Korábbi M&A ügyletek értékelési szintjei. Mit fizettek hasonló vállalatokért? M&A prémium figyelembevétele.',
    category: 'Értékelési Módszerek'
  },
  {
    id: '50',
    term: 'Sum-of-the-Parts (SOTP)',
    definition: 'Konglomerátumok értékelése divíziók különálló értékelésével. Gyakran "konglomerátum diszkont" van a piacon.',
    category: 'Értékelési Módszerek'
  },
  {
    id: '51',
    term: 'Gazdasági Védelem (Economic Moat)',
    definition: 'Warren Buffett koncepciója. Tartós versenyelőny: brand, hálózati hatás, költségelőny, szabályozási előny. Véd a konkurenciától.',
    category: 'Minőségi Tényezők'
  },
  {
    id: '52',
    term: 'Hálózati Hatás',
    definition: 'A termék értékesebb több felhasználóval (Facebook, Visa). Erős moat, győztes mindent visz dinamika.',
    category: 'Minőségi Tényezők'
  },
  {
    id: '53',
    term: 'Brand Erő',
    definition: 'Díjképes márka (Apple, Coca-Cola). Vásárlók fizetnek többet. Nehéz építeni, könnyű rombolni.',
    category: 'Minőségi Tényezők'
  },
  {
    id: '54',
    term: 'Váltási Költségek',
    definition: 'Magas költség másik szolgáltatóra váltáshoz (bankok, software). Vevőket "bezárja", stabil bevétel.',
    category: 'Minőségi Tényezők'
  },
  {
    id: '55',
    term: 'Menedzsment Minősége',
    definition: 'Vezetés kritikus! Nézd: múltbeli teljesítmény, kommunikáció, tőkeallokáció, skin in the game (saját részvényeik).',
    category: 'Minőségi Tényezők'
  },
  {
    id: '56',
    term: 'Tőkeallokáció',
    definition: 'Hogyan használja a vállalat a profitot: növekedés, osztalék, visszavásárlás, adósságcsökkentés? Jó allokáció = értékteremtés.',
    category: 'Minőségi Tényezők'
  },
  {
    id: '57',
    term: 'Insider Ownership',
    definition: 'Menedzsment és igazgatóság részvénytulajdona. Magas insider ownership = érdekek egyeznek a részvényesekkel.',
    category: 'Menedzsment'
  },
  {
    id: '58',
    term: 'Insider Trading',
    definition: 'Vezetők vételi/eladási tevékenysége. Intenzív vásárlás = bizalom. Eladás = lehet profit realizálás vagy aggodalom.',
    category: 'Menedzsment'
  },
  {
    id: '59',
    term: 'Corporate Governance',
    definition: 'Vállalatirányítási struktúra. Független igazgatók, audit bizottság, részvényesi jogok. ESG befektetésnél kritikus.',
    category: 'Menedzsment'
  },
  {
    id: '60',
    term: 'Iparági Elemzés',
    definition: 'A vállalat nem légüres térben működik. Iparági trend, verseny, szabályozás, technológiai változás megértése.',
    category: 'Iparág'
  },
  {
    id: '61',
    term: 'Porter 5 Erő',
    definition: 'Michael Porter keretrendszere. 1) Új belépők, 2) Helyettesítők, 3) Vevők alkuereje, 4) Szállítók alkuereje, 5) Versenytársak. Jövedelmezőséget meghatározzák.',
    category: 'Iparág'
  },
  {
    id: '62',
    term: 'Iparági Életciklus',
    definition: 'Bevezetés, növekedés, érettség, hanyatlás. Különböző fázisok különböző értékelést és stratégiát igényelnek.',
    category: 'Iparág'
  },
  {
    id: '63',
    term: 'Piaci Részesedés',
    definition: 'Vállalat bevétele / Iparági összbevétel. Növekvő részesedés = versenyképesség. Piacvezető előnyök (scale).',
    category: 'Iparág'
  },
  {
    id: '64',
    term: 'TAM, SAM, SOM',
    definition: 'Total Addressable Market, Serviceable Available Market, Serviceable Obtainable Market. Növekedési potenciál felmérése.',
    category: 'Iparág'
  },
  {
    id: '65',
    term: 'Makrogazdasági Elemzés',
    definition: 'GDP, infláció, kamatlábak, munkanélküliség. Ciklikus vállalatoknál különösen fontos. Top-down megközelítés része.',
    category: 'Makroökonómia'
  },
  {
    id: '66',
    term: 'Kamatláb Környezet',
    definition: 'Alacsony kamatok = magasabb értékelések (DCF). Magas kamatok = alacsonyabb P/E. Fed policy kritikus!',
    category: 'Makroökonómia'
  },
  {
    id: '67',
    term: 'Infláció Hatása',
    definition: 'Mérsékelt infláció OK. Magas infláció = költségnövekedés, margin pressure. Defláció = bevétel csökkenés.',
    category: 'Makroökonómia'
  },
  {
    id: '68',
    term: 'Gazdasági Ciklus',
    definition: 'Expanzió, csúcs, recesszió, mélypoint. Ciklikus szektorok (tech, autó) vs defenzív (közműszolgáltatás, egészségügy).',
    category: 'Makroökonómia'
  },
  {
    id: '69',
    term: 'Earnings Call',
    definition: 'Negyedéves eredményközlés utáni menedzsment call. Guidance, kérdések. Hangnem és bizalom fontos, nem csak számok.',
    category: 'Információforrások'
  },
  {
    id: '70',
    term: '10-K és 10-Q',
    definition: '10-K: éves jelentés, 10-Q: negyedéves. SEC kötelező. Részletes pénzügyi adatok, kockázatok, menedzsment beszámoló.',
    category: 'Információforrások'
  },
  {
    id: '71',
    term: '8-K Filing',
    definition: 'Azonnali jelentés fontos eseményekről: M&A, vezetőváltás, fizetésképtelenség. SEC-hez bejelentve.',
    category: 'Információforrások'
  },
  {
    id: '72',
    term: 'Proxy Statement (DEF 14A)',
    definition: 'Éves közgyűlés dokumentuma. Vezetői kompenzáció, választási javaslatok, insider tulajdon. Governance értékeléshez.',
    category: 'Információforrások'
  },
  {
    id: '73',
    term: 'Analyst Reports',
    definition: 'Sell-side elemzői jelentések. Hasznos adatok, de conflicts of interest (banking fees). Kritikusan értékelendő.',
    category: 'Információforrások'
  },
  {
    id: '74',
    term: 'Consensus Estimates',
    definition: 'Elemzői előrejelzések átlaga. "Beat" vagy "miss" hatás az árfolyamra. De: konzenzus gyakran téved!',
    category: 'Információforrások'
  },
  {
    id: '75',
    term: 'Értékbefektetés (Value Investing)',
    definition: 'Graham és Buffett filozófiája. Alulértékelt részvények vásárlása biztonsági rezervvel. Türelem és hosszú távú fókusz.',
    category: 'Befektetési Stílusok'
  },
  {
    id: '76',
    term: 'Növekedési Befektetés (Growth)',
    definition: 'Gyorsan növekvő vállalatok, gyakran magas értékeléssel. Jövőbeli potenciálba fektet. Peter Lynch megközelítés.',
    category: 'Befektetési Stílusok'
  },
  {
    id: '77',
    term: 'GARP (Growth at Reasonable Price)',
    definition: 'Növekedés és érték kombinációja. Növekvő vállalatok ésszerű áron. PEG < 1 keresése.',
    category: 'Befektetési Stílusok'
  },
  {
    id: '78',
    term: 'Osztalékbefektetés',
    definition: 'Stabil, növekvő osztalékfizető vállalatok. Passzív jövedelem, alacsonyabb volatilitás. Osztalék arisztokraták kedveltek.',
    category: 'Befektetési Stílusok'
  },
  {
    id: '79',
    term: 'Quality Investing',
    definition: 'Magas ROE, stabil profit margin, alacsony adósság, erős cash flow. "Megfizeted, amit kapsz" - prémium értékelés OK.',
    category: 'Befektetési Stílusok'
  },
  {
    id: '80',
    term: 'Contrarian Investing',
    definition: 'Ellentétes pozíciók a tömegpszichológiával szemben. "Félelem amikor mások kapzsik, kapzsiság amikor félnek." Nehéz pszichológiailag!',
    category: 'Befektetési Stílusok'
  },
  {
    id: '81',
    term: 'Red Flags - Earnings Quality',
    definition: 'Figyelmeztetések: növekvő követelések bevételnél gyorsabban, készlet felhalmozás, cash flow < nyereség. Agresszív könyvelés jelei.',
    category: 'Veszélyjelek'
  },
  {
    id: '82',
    term: 'Red Flags - Debt',
    definition: 'Gyorsan növekvő adósság, rövid lejáratú adósság refinanszálási kockázat, covenant közelében. Fizetésképtelenség előjele lehet.',
    category: 'Veszélyjelek'
  },
  {
    id: '83',
    term: 'Red Flags - Management',
    definition: 'Gyakori CEO váltás, insider heavy selling, agresszív guidance, restatements, összeférhetetlenségek.',
    category: 'Veszélyjelek'
  },
  {
    id: '84',
    term: 'Accounting Manipulation',
    definition: 'Channel stuffing, cookie jar reserves, big bath charges, off-balance sheet items. Enron lecke!',
    category: 'Veszélyjelek'
  },
  {
    id: '85',
    term: 'Short Interest',
    definition: 'Short pozíciók aránya. Magas short interest = medvék várnak esést, vagy short squeeze potenciál. Figyelmeztetés lehet.',
    category: 'Piaci Mutatók'
  },
  {
    id: '86',
    term: 'Institutional Ownership',
    definition: 'Intézményi befektetők aránya. Magas = professzionális elemzés történt. Változások (13F filings) fontosak.',
    category: 'Piaci Mutatók'
  },
  {
    id: '87',
    term: 'Float és Days to Cover',
    definition: 'Float: szabad forgó részvények. Days to Cover: short pozíciók / átlagos napi volume. Magas DTC = short squeeze rizikó.',
    category: 'Piaci Mutatók'
  },
  {
    id: '88',
    term: 'Sector Rotation',
    definition: 'Gazdasági ciklus alapú szektorváltás. Korai ciklus: tech, fogyasztási. Közép: ipar, anyagok. Késői: energia. Recesszió: védelem.',
    category: 'Szektorstratégia'
  },
  {
    id: '89',
    term: 'Defensive Sectors',
    definition: 'Közműszolgáltatás, egészségügy, alapvető fogyasztási cikkek. Stabil kereslet recesszióban is. Alacsony béta.',
    category: 'Szektorstratégia'
  },
  {
    id: '90',
    term: 'Cyclical Sectors',
    definition: 'Technológia, fogyasztási javak, pénzügyek, ingatlan. Gazdasági ciklussal együtt mozognak. Magas béta.',
    category: 'Szektorstratégia'
  },
  {
    id: '91',
    term: 'Small Cap vs Large Cap',
    definition: 'Small cap: magasabb növekedés, volatilitás. Large cap: stabilitás, likviditás, osztalék. Diverzifikáció mindkettőből.',
    category: 'Méretstratégia'
  },
  {
    id: '92',
    term: 'IPO Elemzés',
    definition: 'Lockup periódus, underwriters, use of proceeds, comparable valuations. Általában várakozás javasolt (6 hónap).',
    category: 'Speciális Helyzetek'
  },
  {
    id: '93',
    term: 'Spinoff Elemzés',
    definition: 'Leválasztott divíziók gyakran alulértékeltek. Szülővállalat részvényesei automatikusan kapják. Kényszer eladás után lehetőség.',
    category: 'Speciális Helyzetek'
  },
  {
    id: '94',
    term: 'Merger Arbitrage',
    definition: 'M&A bejelentés után céltársaság vásárlása diszkonttal. Kockázat: deal meghiúsul. Event-driven stratégia.',
    category: 'Speciális Helyzetek'
  },
  {
    id: '95',
    term: 'Turnaround Helyzetek',
    definition: 'Bajban lévő vállalatok fordulóban. Magas kockázat, de multi-bagger potenciál. Új menedzsment, restrukturálás jelei.',
    category: 'Speciális Helyzetek'
  },
  {
    id: '96',
    term: 'Scuttlebutt Method',
    definition: 'Phil Fisher módszere. Beszélj vevőkkel, szállítókkal, versenytársakkal, volt alkalmazottakkal. Kvalitatív kutatás.',
    category: 'Kutatási Módszerek'
  },
  {
    id: '97',
    term: 'Mosaic Theory',
    definition: 'Sok kis, nyilvános információból összerakni a képet. Legális és hatékony módszer. Különbözik az insider tradingtől.',
    category: 'Kutatási Módszerek'
  },
  {
    id: '98',
    term: 'Channel Checks',
    definition: 'Beszállítók, viszonteladók látogatása. Valós kereslet mérése. Példa: Apple új iPhone eladások becslése carrier checkekkel.',
    category: 'Kutatási Módszerek'
  },
  {
    id: '99',
    term: 'Expert Networks',
    definition: 'Iparági szakértőkkel konzultálás. Compliance fontos: nincs material non-public info. Due diligence forrás.',
    category: 'Kutatási Módszerek'
  },
  {
    id: '100',
    term: 'Összefoglalás: Fundamentális Elemzés',
    definition: 'Kombináld a kvantitatív (pénzügyi kimutatások) és kvalitatív (moat, menedzsment) elemzést. Értékelj iparági kontextusban. Biztonsági rezerv. Hosszú távú fókusz. Folyamatos tanulás. A legnagyobb befektetők (Buffett, Lynch, Graham) fundamentalisták!',
    category: 'Összefoglalás'
  }
];
