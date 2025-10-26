import { useState } from 'react';
import { ChevronLeft, ChevronRight, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookReaderProps {
  title: string;
  content: string; // Full book content with chapters
  onBack: () => void;
}

export function BookReader({ title, content, onBack }: BookReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);

  // Split content into pages by chapters and sections
  const pages = content.split('\n\n\n').filter(p => p.trim());
  
  const nextPage = () => {
    if (currentPage < pages.length - 1) {
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

  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      {/* Book Container */}
      <div className="w-full max-w-4xl h-[90vh] bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 flex items-center justify-between border-b-4 border-amber-600">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl text-white">{title}</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-amber-200 text-sm">
              {currentPage + 1} / {pages.length}
            </span>
            <button
              onClick={onBack}
              className="w-10 h-10 bg-slate-700/60 hover:bg-slate-600/60 rounded-lg flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 relative overflow-hidden">
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
              className="absolute inset-0 overflow-y-auto p-8 md:p-12"
            >
              {/* Page styling - book-like */}
              <div className="max-w-3xl mx-auto">
                <div 
                  className="prose prose-slate prose-lg max-w-none"
                  style={{
                    fontFamily: 'Georgia, serif',
                    lineHeight: '1.8',
                    textAlign: 'justify'
                  }}
                >
                  {/* Detect and render chapter titles */}
                  {pages[currentPage].split('\n').map((line, idx) => {
                    const trimmed = line.trim();
                    
                    // Chapter headers (ALL CAPS lines)
                    if (trimmed === trimmed.toUpperCase() && trimmed.length > 0 && trimmed.length < 50) {
                      return (
                        <h2 
                          key={idx} 
                          className="text-2xl font-bold text-slate-800 mb-6 mt-8 text-center border-b-2 border-amber-600 pb-2"
                          style={{ fontFamily: 'Georgia, serif' }}
                        >
                          {trimmed}
                        </h2>
                      );
                    }
                    
                    // Section titles (Title Case, shorter lines)
                    if (trimmed.length > 0 && trimmed.length < 100 && /^[A-ZÁÉÍÓÖŐÚÜŰ]/.test(trimmed) && !trimmed.endsWith('.')) {
                      return (
                        <h3 
                          key={idx} 
                          className="text-xl font-semibold text-slate-700 mb-4 mt-6"
                          style={{ fontFamily: 'Georgia, serif' }}
                        >
                          {trimmed}
                        </h3>
                      );
                    }
                    
                    // Regular paragraphs
                    if (trimmed.length > 0) {
                      return (
                        <p key={idx} className="text-slate-800 mb-4 first-letter:text-5xl first-letter:font-bold first-letter:text-amber-700 first-letter:float-left first-letter:mr-2 first-letter:leading-none">
                          {line}
                        </p>
                      );
                    }
                    
                    return <div key={idx} className="h-4" />;
                  })}
                </div>
              </div>

              {/* Page number at bottom */}
              <div className="text-center mt-12 text-slate-500 text-sm">
                — {currentPage + 1} —
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 flex items-center justify-between border-t-4 border-amber-600">
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Előző</span>
          </button>

          <div className="text-amber-200">
            {currentPage + 1} / {pages.length} oldal
          </div>

          <button
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
            className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors shadow-lg"
          >
            <span>Következő</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
