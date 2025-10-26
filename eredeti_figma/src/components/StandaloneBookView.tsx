/**
 * Standalone Book View Component
 * 
 * Ez a komponens egy lapozható digitális könyv nézetet biztosít
 * bármilyen szótár vagy glossary típusú adathoz.
 * 
 * HASZNÁLAT:
 * 
 * 1. Importáld a komponenst:
 *    import { StandaloneBookView } from './components/StandaloneBookView';
 * 
 * 2. Használd a komponenst:
 *    <StandaloneBookView
 *      title="Szótár címe"
 *      subtitle="Alcím"
 *      data={yourGlossaryData}
 *      onBack={() => setShowBook(false)}
 *    />
 * 
 * 3. Az adat formátuma:
 *    [{
 *      id: string,
 *      term: string,
 *      definition: string,
 *      category: string
 *    }]
 * 
 * FÜGGŐSÉGEK:
 * - motion/react (Framer Motion)
 * - lucide-react
 * - ImageWithFallback komponens (vagy img tag)
 * - Button komponens (vagy natív button)
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, BookMarked, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// === INTERFACES ===

export interface BookViewTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
}

export interface StandaloneBookViewProps {
  data: BookViewTerm[];
  title?: string;
  subtitle?: string;
  year?: number;
  onBack: () => void;
  coverColor?: string;
  accentColor?: string;
}

interface Page {
  type: 'cover' | 'intro' | 'toc' | 'letter-title' | 'content' | 'back';
  content?: any;
  letter?: string;
  terms?: BookViewTerm[];
  tocSection?: { letter: string; count: number }[];
}

// === UNSPLASH ILLUSTRATIONS (100% Free) ===

const illustrations = {
  stockMarket: "https://images.unsplash.com/photo-1651341050677-24dba59ce0fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMHRyYWRpbmd8ZW58MXx8fHwxNzYwOTQxNTY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  financialData: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBkYXRhJTIwY2hhcnRzfGVufDF8fHx8MTc2MDg3MDYyOXww&ixlib=rb-4.1.0&q=80&w=1080",
  businessAbstract: "https://images.unsplash.com/photo-1749631934602-13b05524e688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGZpbmFuY2UlMjBhYnN0cmFjdHxlbnwxfHx8fDE3NjA5ODAyNTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  booksVintage: "https://images.unsplash.com/photo-1687826188097-d06cb3673bec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjB2aW50YWdlfGVufDF8fHx8MTc2MDk0NTAzMnww&ixlib=rb-4.1.0&q=80&w=1080",
  geometric: "https://images.unsplash.com/photo-1729653809906-010c303eb11e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwZ2VvbWV0cmljJTIwcGF0dGVybnxlbnwxfHx8fDE3NjA5MDcxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  goldCoins: "https://images.unsplash.com/photo-1653590501805-cce7dec267e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwY29pbnMlMjBtb25leXxlbnwxfHx8fDE3NjA5NDc5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  office: "https://images.unsplash.com/photo-1603985585179-3d71c35a537c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2MDkyMDc3NXww&ixlib=rb-4.1.0&q=80&w=1080",
  techBlue: "https://images.unsplash.com/photo-1652212976547-16d7e2841b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBibHVlfGVufDF8fHx8MTc2MDg4NDUzMXww&ixlib=rb-4.1.0&q=80&w=1080"
};

// === SIMPLE BUTTON COMPONENT (fallback if no Button from ui) ===

const SimpleButton: React.FC<{
  onClick: () => void;
  variant?: string;
  size?: string;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}> = ({ onClick, className = '', children, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 transition-colors ${className}`}
  >
    {children}
  </button>
);

// === SIMPLE IMAGE COMPONENT (fallback) ===

const SimpleImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} />
);

// === MAIN COMPONENT ===

export function StandaloneBookView({
  data,
  title = "Tőkepiaci Szótár",
  subtitle = "Átfogó referencia",
  year = new Date().getFullYear(),
  onBack,
  coverColor = "from-slate-900 via-slate-800 to-slate-900",
  accentColor = "border-amber-400 text-amber-400"
}: StandaloneBookViewProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Használj Button komponenst ha elérhető, különben SimpleButton
  const ButtonComponent = SimpleButton;
  const ImageComponent = SimpleImage;

  // Alfabetikus sorrend
  const sortedData = [...data].sort((a, b) => 
    a.term.localeCompare(b.term, 'hu')
  );

  // Betűk szerinti csoportosítás
  const groupedByLetter = sortedData.reduce((acc, term) => {
    const firstLetter = term.term[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {} as Record<string, BookViewTerm[]>);

  const letters = Object.keys(groupedByLetter).sort();

  // Kategóriák gyűjtése
  const categories = Array.from(new Set(data.map(t => t.category)));

  // Oldalak generálása
  const generatePages = (): Page[] => {
    const pages: Page[] = [];
    
    pages.push({ type: 'cover' });
    pages.push({ type: 'intro' });
    
    const tocChunks: { letter: string; count: number }[][] = [];
    const tocData = letters.map(letter => ({ letter, count: groupedByLetter[letter].length }));
    
    for (let i = 0; i < tocData.length; i += 15) {
      tocChunks.push(tocData.slice(i, i + 15));
    }
    
    tocChunks.forEach(chunk => {
      pages.push({ type: 'toc', tocSection: chunk });
    });
    
    letters.forEach(letter => {
      const letterTerms = groupedByLetter[letter];
      pages.push({ type: 'letter-title', letter, content: letterTerms.length });
      
      for (let i = 0; i < letterTerms.length; i += 3) {
        pages.push({ 
          type: 'content', 
          letter,
          terms: letterTerms.slice(i, i + 3)
        });
      }
    });
    
    pages.push({ type: 'back' });
    
    return pages;
  };

  const pages = generatePages();

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setDirection('right');
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setDirection('left');
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNum: number) => {
    if (pageNum >= 0 && pageNum < pages.length) {
      setDirection(pageNum > currentPage ? 'right' : 'left');
      setCurrentPage(pageNum);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNextPage();
      if (e.key === 'ArrowLeft') goToPrevPage();
      if (e.key === 'Escape') onBack();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage]);

  const handleExportPDF = () => {
    window.print();
  };

  const pageVariants = {
    enter: (direction: string) => ({
      x: direction === 'right' ? 1000 : -1000,
      opacity: 0,
      rotateY: direction === 'right' ? 45 : -45,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1
    },
    exit: (direction: string) => ({
      x: direction === 'right' ? -1000 : 1000,
      opacity: 0,
      rotateY: direction === 'right' ? -45 : 45,
      scale: 0.8
    })
  };

  const renderPage = (page: Page) => {
    switch (page.type) {
      case 'cover':
        return (
          <div className={`h-full flex flex-col items-center justify-center bg-gradient-to-br ${coverColor} text-white p-6 rounded-r-xl shadow-2xl`}>
            <div className="text-center space-y-4">
              <div className="space-y-3">
                <div className={`inline-block px-4 py-1.5 border-2 ${accentColor} rounded-full mb-3`}>
                  <span className={`${accentColor.split(' ')[1]} tracking-wider text-xs`}>PROFESSZIONÁLIS REFERENCIA</span>
                </div>
                <h1 className="text-3xl tracking-tight mb-2" style={{ fontWeight: 300, letterSpacing: '-0.02em' }}>
                  {title.split(' ')[0]}
                </h1>
                <h1 className="text-4xl tracking-tight mb-3" style={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
                  {title.split(' ').slice(1).join(' ')}
                </h1>
                <div className={`h-0.5 w-24 bg-amber-400 mx-auto my-4`}></div>
                <p className="text-lg text-slate-300 mt-3" style={{ fontWeight: 300 }}>
                  {data.length} alapvető fogalom
                </p>
                <p className="text-base text-slate-400">
                  {subtitle}
                </p>
              </div>
              
              <div className="mt-8 pt-4 border-t border-slate-700">
                <p className="text-slate-400 text-sm">
                  {year}. kiadás
                </p>
              </div>
            </div>
          </div>
        );

      case 'intro':
        return (
          <div className="h-full flex flex-col justify-between p-5 bg-white rounded-r-xl shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-1/2 opacity-10">
              <ImageComponent
                src={illustrations.booksVintage}
                alt="Books"
                className="w-full h-full object-cover rounded-bl-3xl"
              />
            </div>
            
            <div className="relative z-10">
              <div className="border-l-4 border-slate-900 pl-4 mb-4">
                <h2 className="text-2xl mb-2" style={{ fontWeight: 600 }}>{title}</h2>
                <p className="text-base text-slate-600">
                  {subtitle}
                </p>
              </div>

              <div className="space-y-3 text-slate-700">
                <p className="text-sm leading-relaxed">
                  Ez a szótár {data.length} alapvető fogalmat tartalmaz, 
                  kategóriák szerint rendszerezve. Átfogó referencia a szakmai 
                  terminológiához.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-200">
                  <div>
                    <h3 className="text-xs uppercase tracking-wide text-slate-500 mb-1">Tartalom</h3>
                    <p className="text-xl" style={{ fontWeight: 600 }}>{data.length} fogalom</p>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-wide text-slate-500 mb-1">Betűk</h3>
                    <p className="text-xl" style={{ fontWeight: 600 }}>{letters.length}</p>
                  </div>
                </div>

                {categories.length > 0 && (
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <h3 className="text-xs uppercase tracking-wide text-slate-500 mb-2">Kategóriák</h3>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {categories.slice(0, 8).map((cat, idx) => (
                        <div key={idx}>• {cat}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center text-slate-500 text-xs mt-4 relative z-10">
              <p>© {year} • Minden jog fenntartva</p>
            </div>
          </div>
        );

      case 'toc':
        return (
          <div className="h-full p-5 bg-white rounded-r-xl shadow-2xl overflow-hidden relative">
            <div className="absolute bottom-0 left-0 w-32 h-32 opacity-5">
              <ImageComponent
                src={illustrations.financialData}
                alt="Financial"
                className="w-full h-full object-cover rounded-tr-3xl"
              />
            </div>
            
            <h2 className="text-2xl mb-4 pb-3 border-b-2 border-slate-900 relative z-10" style={{ fontWeight: 600 }}>
              Tartalomjegyzék
            </h2>
            
            <div className="grid grid-cols-3 gap-2 mt-4 relative z-10">
              {page.tocSection?.map((item) => {
                const letterPageIndex = pages.findIndex(p => p.type === 'letter-title' && p.letter === item.letter);
                
                return (
                  <button
                    key={item.letter}
                    onClick={() => goToPage(letterPageIndex)}
                    className="p-2 border-2 border-slate-200 rounded-lg hover:border-slate-900 hover:bg-slate-50 transition-colors group text-left"
                  >
                    <div className="text-xl mb-1 group-hover:text-slate-900" style={{ fontWeight: 700 }}>
                      {item.letter}
                    </div>
                    <div className="text-xs text-slate-600">
                      {item.count} fogalom
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'letter-title':
        return (
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-white rounded-r-xl shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 opacity-5">
              <ImageComponent
                src={illustrations.geometric}
                alt="Pattern"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="text-center relative z-10">
              <div className="text-8xl text-slate-900 mb-4" style={{ fontWeight: 700, lineHeight: 1 }}>
                {page.letter}
              </div>
              <div className="text-lg text-slate-600">
                {page.content} fogalom
              </div>
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="h-full p-5 bg-white rounded-r-xl shadow-2xl overflow-hidden">
            <div className="space-y-5">
              {page.terms?.map((term) => (
                <div 
                  key={term.id} 
                  className="border-l-4 border-slate-200 pl-3 py-2 hover:border-slate-900 transition-colors"
                >
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <h3 className="text-lg text-slate-900" style={{ fontWeight: 600 }}>
                      {term.term}
                    </h3>
                    <span className="text-xs uppercase tracking-wider text-slate-500 px-2 py-0.5 bg-slate-100 rounded">
                      {term.category}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-sm">
                    {term.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'back':
        return (
          <div className="h-full flex flex-col justify-between bg-gradient-to-br from-slate-50 to-white p-5 rounded-r-xl shadow-2xl">
            <div>
              <div className="max-w-2xl">
                <h2 className="text-2xl mb-4" style={{ fontWeight: 600 }}>
                  Szakmai terminológia
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed mb-3">
                  Ez a szótár átfogó áttekintést nyújt a legfontosabb 
                  szakmai fogalmakról. Mind a kezdők, mind a tapasztalt szakemberek 
                  számára hasznos referenciaként szolgál.
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  A {data.length} kifejezés {categories.length} különböző kategóriába sorolva 
                  tartalmazza a legfontosabb terminológiát.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="text-3xl" style={{ fontWeight: 700 }}>{data.length}</div>
                  <div className="text-xs text-slate-600">Szakfogalom</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl" style={{ fontWeight: 700 }}>{categories.length}</div>
                  <div className="text-xs text-slate-600">Kategória</div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl" style={{ fontWeight: 700 }}>100%</div>
                  <div className="text-xs text-slate-600">Magyar</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-300">
              <div className="text-center text-slate-600 text-xs">
                <p className="mb-1">{title}</p>
                <p className="text-xs">
                  {year}. kiadás • Magyar nyelven • {data.length} fogalom
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 overflow-hidden flex flex-col">
      {/* Vezérlő felület */}
      <div className="flex-shrink-0 px-3 pt-3 pb-2 flex items-center justify-between bg-white/80 backdrop-blur-sm border-b border-amber-200">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 hover:bg-amber-200 transition-colors">
            <X className="h-4 w-4 text-amber-900" />
          </button>
          <div className="flex items-center gap-2">
            <BookMarked className="h-4 w-4 text-amber-700" />
            <span className="text-sm text-amber-900">
              {currentPage + 1} / {pages.length}
            </span>
          </div>
        </div>

        <button onClick={handleExportPDF} className="text-xs px-3 py-1.5 bg-amber-100 hover:bg-amber-200 rounded-full text-amber-900 transition-colors flex items-center gap-1">
          <Download className="h-3 w-3" />
          PDF
        </button>
      </div>

      {/* Könyv tartalom */}
      <div className="flex-1 flex items-center justify-center px-3 py-4 overflow-hidden">
        <div className="relative w-full h-full max-h-[620px]">
          
          {/* Bal oldali lapozó */}
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white rounded-full shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition-all"
          >
            <ChevronLeft className="h-5 w-5 text-amber-900" />
          </button>

          {/* Jobb oldali lapozó */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === pages.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white rounded-full shadow-lg disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 transition-all"
          >
            <ChevronRight className="h-5 w-5 text-amber-900" />
          </button>

          {/* Könyv gerinc - bal oldal */}
          <div className="absolute left-2 top-0 bottom-0 w-6 bg-gradient-to-r from-slate-800 to-slate-700 rounded-l-xl shadow-xl" style={{ transform: 'perspective(800px) rotateY(5deg)', transformOrigin: 'right' }}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent"></div>
          </div>

          {/* Oldal animáció */}
          <div className="relative h-full ml-8" style={{ perspective: '1500px' }}>
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentPage}
                custom={direction}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  rotateY: { duration: 0.5 },
                  scale: { duration: 0.3 }
                }}
                className="absolute inset-0 bg-white overflow-y-auto rounded-r-xl shadow-xl"
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden'
                }}
              >
                {renderPage(pages[currentPage])}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default StandaloneBookView;