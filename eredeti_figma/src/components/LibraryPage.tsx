import { ArrowLeft, BookOpen, Filter, SortAsc, Search, Grid3x3, List, BookMarked, Clock, Coins, Calendar, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from './ui/dropdown-menu';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface LibraryPageProps {
  onBack: () => void;
  onOpenBookView: (bookTitle: string) => void;
  coins: number;
  onCoinsChange: (newCoins: number) => void;
}

// Book data structure
interface Book {
  title: string;
  color: string;
  width: number;
  spineColor: string;
  textColor: string;
  hasContent?: boolean;
}

interface RentedBook {
  title: string;
  rentedUntil: number; // timestamp
  daysRented: number;
  color: string;
  textColor: string;
}

// Calculate rental price based on days
const calculateRentalPrice = (days: number): number => {
  if (days === 1) return 50;
  if (days === 30) return 1000;
  
  // Progressive discount: the more days, the cheaper per day
  // Formula: starts at 50/day, decreases to 33.33/day at 30 days
  const basePrice = 50;
  const maxDiscount = 0.33; // 33% discount at max
  const discountFactor = (days - 1) / 29; // 0 to 1 progression
  const pricePerDay = basePrice * (1 - (maxDiscount * discountFactor));
  
  return Math.round(pricePerDay * days);
};

export function LibraryPage({ onBack, onOpenBookView, coins, onCoinsChange }: LibraryPageProps) {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'color'>('name');
  const [showOnlyContent, setShowOnlyContent] = useState(false);
  const [showRentalPanel, setShowRentalPanel] = useState(false);
  const [bookToRent, setBookToRent] = useState<Book | null>(null);
  const [rentalDays, setRentalDays] = useState(7);
  const [rentedBooks, setRentedBooks] = useState<RentedBook[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successBookTitle, setSuccessBookTitle] = useState('');
  
  // Load rented books from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('rentedBooks');
    if (saved) {
      const parsed: RentedBook[] = JSON.parse(saved);
      // Filter out expired rentals
      const active = parsed.filter(book => book.rentedUntil > Date.now());
      setRentedBooks(active);
      if (active.length !== parsed.length) {
        localStorage.setItem('rentedBooks', JSON.stringify(active));
      }
    }
  }, []);
  
  // Save rented books to localStorage
  const saveRentedBooks = (books: RentedBook[]) => {
    setRentedBooks(books);
    localStorage.setItem('rentedBooks', JSON.stringify(books));
  };
  
  const handleRentBook = () => {
    if (!bookToRent) return;
    
    const price = calculateRentalPrice(rentalDays);
    
    if (coins < price) {
      toast.error('Nincs elég aranyad a kölcsönzéshez!');
      return;
    }
    
    // Check if book is already rented
    const alreadyRented = rentedBooks.find(b => b.title === bookToRent.title);
    if (alreadyRented) {
      toast.error('Ez a könyv már ki van kölcsönözve!');
      return;
    }
    
    // Deduct coins
    onCoinsChange(coins - price);
    
    // Add to rented books
    const newRental: RentedBook = {
      title: bookToRent.title,
      rentedUntil: Date.now() + (rentalDays * 24 * 60 * 60 * 1000),
      daysRented: rentalDays,
      color: bookToRent.color,
      textColor: bookToRent.textColor,
    };
    
    saveRentedBooks([...rentedBooks, newRental]);
    
    // Close rental panel and show success modal
    setSuccessBookTitle(bookToRent.title);
    setBookToRent(null);
    setShowRentalPanel(false);
    setShowSuccessModal(true);
  };
  
  const handleReturnBook = (bookTitle: string) => {
    const book = rentedBooks.find(b => b.title === bookTitle);
    if (!book) return;
    
    // Calculate refund
    const remainingTime = book.rentedUntil - Date.now();
    const remainingDays = Math.max(0, Math.floor(remainingTime / (24 * 60 * 60 * 1000)));
    
    // Calculate refund: original price minus price for elapsed days
    if (remainingDays > 0) {
      const daysElapsed = book.daysRented - remainingDays;
      const priceForElapsedDays = calculateRentalPrice(daysElapsed);
      const originalPrice = calculateRentalPrice(book.daysRented);
      const refund = originalPrice - priceForElapsedDays;
      onCoinsChange(coins + refund);
      toast.success(`Visszaadva! ${refund} arany visszatérítés`);
    } else {
      toast.success('Könyv visszaadva!');
    }
    
    const updatedBooks = rentedBooks.filter(b => b.title !== bookTitle);
    saveRentedBooks(updatedBooks);
  };
  
  const isBookRented = (bookTitle: string) => {
    return rentedBooks.some(b => b.title === bookTitle);
  };
  
  const getRemainingDays = (rentedUntil: number) => {
    const remaining = rentedUntil - Date.now();
    return Math.max(0, Math.ceil(remaining / (24 * 60 * 60 * 1000)));
  };
  
  // Generate book shelves with various financial books
  const shelves: Book[][] = [
    // Shelf 1 - Top shelf
    [
      { title: 'Tőkepiaci Szótár', color: 'bg-gradient-to-r from-amber-700 to-amber-900', width: 60, spineColor: 'border-amber-950', textColor: 'text-amber-100', hasContent: true },
      { title: 'Pénzügyi Alapismeretek', color: 'bg-gradient-to-r from-slate-700 to-slate-900', width: 54, spineColor: 'border-slate-950', textColor: 'text-slate-100', hasContent: true },
      { title: 'Befektetés Alapjai', color: 'bg-gradient-to-r from-blue-700 to-blue-900', width: 55, spineColor: 'border-blue-950', textColor: 'text-blue-100', hasContent: true },
      { title: 'Részvények', color: 'bg-gradient-to-r from-green-700 to-green-900', width: 48, spineColor: 'border-green-950', textColor: 'text-green-100', hasContent: true },
      { title: 'Kötvények', color: 'bg-gradient-to-r from-purple-700 to-purple-900', width: 52, spineColor: 'border-purple-950', textColor: 'text-purple-100', hasContent: true },
      { title: 'Portfolió Kezelés', color: 'bg-gradient-to-r from-red-700 to-red-900', width: 58, spineColor: 'border-red-950', textColor: 'text-red-100', hasContent: true },
    ],
    // Shelf 2
    [
      { title: 'Technikai Elemzés', color: 'bg-gradient-to-r from-indigo-700 to-indigo-900', width: 62, spineColor: 'border-indigo-950', textColor: 'text-indigo-100', hasContent: true },
      { title: 'Fundamentális Elemzés', color: 'bg-gradient-to-r from-teal-700 to-teal-900', width: 65, spineColor: 'border-teal-950', textColor: 'text-teal-100', hasContent: true },
      { title: 'Pénzügyi Matematika', color: 'bg-gradient-to-r from-orange-700 to-orange-900', width: 56, spineColor: 'border-orange-950', textColor: 'text-orange-100', hasContent: true },
      { title: 'Opciók', color: 'bg-gradient-to-r from-pink-700 to-pink-900', width: 44, spineColor: 'border-pink-950', textColor: 'text-pink-100', hasContent: true },
      { title: 'Határidős Ügyletek', color: 'bg-gradient-to-r from-cyan-700 to-cyan-900', width: 54, spineColor: 'border-cyan-950', textColor: 'text-cyan-100', hasContent: true },
    ],
    // Shelf 3
    [
      { title: 'Devizapiac', color: 'bg-gradient-to-r from-emerald-700 to-emerald-900', width: 50, spineColor: 'border-emerald-950', textColor: 'text-emerald-100' },
      { title: 'Kockázatkezelés', color: 'bg-gradient-to-r from-rose-700 to-rose-900', width: 58, spineColor: 'border-rose-950', textColor: 'text-rose-100', hasContent: true },
      { title: 'Vállalati Pénzügyek', color: 'bg-gradient-to-r from-violet-700 to-violet-900', width: 60, spineColor: 'border-violet-950', textColor: 'text-violet-100' },
      { title: 'Értékpapírok', color: 'bg-gradient-to-r from-lime-700 to-lime-900', width: 52, spineColor: 'border-lime-950', textColor: 'text-lime-100' },
      { title: 'Befektetési Alapok', color: 'bg-gradient-to-r from-fuchsia-700 to-fuchsia-900', width: 56, spineColor: 'border-fuchsia-950', textColor: 'text-fuchsia-100' },
    ],
    // Shelf 4
    [
      { title: 'ETF-ek', color: 'bg-gradient-to-r from-sky-700 to-sky-900', width: 42, spineColor: 'border-sky-950', textColor: 'text-sky-100' },
      { title: 'Makrogazdaság', color: 'bg-gradient-to-r from-amber-600 to-amber-800', width: 55, spineColor: 'border-amber-900', textColor: 'text-amber-100', hasContent: true },
      { title: 'Day Trading', color: 'bg-gradient-to-r from-blue-600 to-blue-800', width: 54, spineColor: 'border-blue-900', textColor: 'text-blue-100' },
      { title: 'Napi Kereskedés', color: 'bg-gradient-to-r from-green-600 to-green-800', width: 52, spineColor: 'border-green-900', textColor: 'text-green-100' },
      { title: 'Passzív Befektetés', color: 'bg-gradient-to-r from-purple-600 to-purple-800', width: 58, spineColor: 'border-purple-900', textColor: 'text-purple-100' },
    ],
    // Shelf 5
    [
      { title: 'Pénzügyi Szabályozás', color: 'bg-gradient-to-r from-red-600 to-red-800', width: 62, spineColor: 'border-red-900', textColor: 'text-red-100' },
      { title: 'Kripto és Blockchain', color: 'bg-gradient-to-r from-indigo-600 to-indigo-800', width: 57, spineColor: 'border-indigo-900', textColor: 'text-indigo-100', hasContent: true },
      { title: 'Pszichológia és Trading', color: 'bg-gradient-to-r from-teal-600 to-teal-800', width: 56, spineColor: 'border-teal-900', textColor: 'text-teal-100', hasContent: true },
      { title: 'Ingatlan Befektetés', color: 'bg-gradient-to-r from-orange-600 to-orange-800', width: 58, spineColor: 'border-orange-900', textColor: 'text-orange-100', hasContent: true },
      { title: 'Kereskedési Stratégiák', color: 'bg-gradient-to-r from-pink-600 to-pink-800', width: 60, spineColor: 'border-pink-900', textColor: 'text-pink-100' },
    ],
    // Shelf 6
    [
      { title: 'Árfolyam Grafikonok', color: 'bg-gradient-to-r from-cyan-600 to-cyan-800', width: 55, spineColor: 'border-cyan-900', textColor: 'text-cyan-100' },
      { title: 'Piaci Mutatók', color: 'bg-gradient-to-r from-emerald-600 to-emerald-800', width: 50, spineColor: 'border-emerald-900', textColor: 'text-emerald-100' },
      { title: 'Diverzifikáció', color: 'bg-gradient-to-r from-rose-600 to-rose-800', width: 54, spineColor: 'border-rose-900', textColor: 'text-rose-100' },
      { title: 'Eszköz Allokáció', color: 'bg-gradient-to-r from-violet-600 to-violet-800', width: 56, spineColor: 'border-violet-900', textColor: 'text-violet-100' },
      { title: 'Hosszú Távú Befektetés', color: 'bg-gradient-to-r from-lime-600 to-lime-800', width: 62, spineColor: 'border-lime-900', textColor: 'text-lime-100' },
    ],
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-amber-950 via-stone-900 to-amber-950 overflow-hidden">
      {/* Warm wood cabinet background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-stone-800/90 to-amber-900/80" />
      
      {/* Wood grain texture overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `repeating-linear-gradient(
          90deg,
          rgba(139, 69, 19, 0.2) 0px,
          transparent 1px,
          transparent 2px,
          rgba(139, 69, 19, 0.2) 3px
        )`
      }} />

      {/* Header */}
      <div className="relative z-20 pt-12 px-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 bg-amber-700/80 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center border-2 border-amber-900/50 transition-transform hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-amber-100" />
            </button>
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-amber-300" />
              <h1 className="text-amber-100 text-2xl drop-shadow-lg">Könyvtár</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Rental Panel Toggle */}
            <button
              onClick={() => setShowRentalPanel(!showRentalPanel)}
              className="relative w-10 h-10 bg-amber-700/80 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center border-2 border-amber-900/50 transition-transform hover:scale-105 active:scale-95"
            >
              <BookMarked className="w-5 h-5 text-amber-100" />
              {rentedBooks.length > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full border-2 border-amber-950 flex items-center justify-center">
                  <span className="text-white text-xs">{rentedBooks.length}</span>
                </div>
              )}
            </button>

            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-10 h-10 bg-amber-700/80 backdrop-blur-sm rounded-xl shadow-lg flex items-center justify-center border-2 border-amber-900/50 transition-transform hover:scale-105 active:scale-95">
                  <Filter className="w-5 h-5 text-amber-100" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-amber-50 border-2 border-amber-900/30 shadow-xl" align="end">
                <DropdownMenuLabel className="text-amber-900">Könyvtár Beállítások</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-amber-200" />
                
                <DropdownMenuLabel className="text-xs text-amber-700">Rendezés</DropdownMenuLabel>
                <DropdownMenuItem 
                  onClick={() => setSortBy('name')}
                  className="cursor-pointer hover:bg-amber-100 focus:bg-amber-100"
                >
                  <SortAsc className="w-4 h-4 mr-2 text-amber-700" />
                  <span className="text-amber-900">Név szerint (A-Z)</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortBy('color')}
                  className="cursor-pointer hover:bg-amber-100 focus:bg-amber-100"
                >
                  <Grid3x3 className="w-4 h-4 mr-2 text-amber-700" />
                  <span className="text-amber-900">Szín szerint</span>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="bg-amber-200" />
                
                <DropdownMenuLabel className="text-xs text-amber-700">Szűrés</DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={showOnlyContent}
                  onCheckedChange={setShowOnlyContent}
                  className="cursor-pointer hover:bg-amber-100 focus:bg-amber-100"
                >
                  <span className="text-amber-900">Csak olvasható könyvek</span>
                </DropdownMenuCheckboxItem>
                
                <DropdownMenuSeparator className="bg-amber-200" />
                
                <DropdownMenuItem className="cursor-pointer hover:bg-amber-100 focus:bg-amber-100">
                  <Search className="w-4 h-4 mr-2 text-amber-700" />
                  <span className="text-amber-900">Keresés...</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-amber-100 focus:bg-amber-100">
                  <List className="w-4 h-4 mr-2 text-amber-700" />
                  <span className="text-amber-900">Kategóriák</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Bookshelf Container */}
      <div className="relative z-10 h-[calc(100%-100px)] overflow-y-auto px-6 pb-20 scrollbar-hide">
        <div className="space-y-6">
          {shelves.map((shelf, shelfIndex) => (
            <div key={shelfIndex} className="relative">
              {/* Shelf backing */}
              <div className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-b from-amber-800 to-amber-950 rounded-sm shadow-lg" />
              <div className="absolute inset-x-0 bottom-3 h-1 bg-amber-950/80 shadow-inner" />
              
              {/* Books on shelf */}
              <div className="flex items-end justify-start gap-1 pb-4 px-2 min-h-[180px]">
                {shelf.map((book, bookIndex) => {
                  const isRented = isBookRented(book.title);
                  
                  return (
                    <button
                      key={bookIndex}
                      onClick={() => {
                        setSelectedBook(book);
                        if (book.hasContent && isRented) {
                          onOpenBookView(book.title);
                        }
                      }}
                      className="group relative transition-all hover:-translate-y-2 active:translate-y-0"
                      style={{ width: `${book.width}px` }}
                    >
                      {/* Rented indicator */}
                      {isRented && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 w-full flex justify-center">
                          <div className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap max-w-full">
                            <BookMarked className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">Kikölcsönözve</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Book spine */}
                      <div
                        className={`${book.color} rounded-sm shadow-xl border-l-2 border-r-2 ${book.spineColor} transition-all group-hover:shadow-2xl ${isRented ? 'opacity-60' : ''}`}
                        style={{
                          height: `${140 + Math.random() * 40}px`,
                          transformOrigin: 'bottom',
                        }}
                      >
                        {/* Book title on spine */}
                        <div className="h-full flex items-center justify-center p-1">
                          <div
                            className={`${book.textColor} text-xs text-center leading-tight`}
                            style={{
                              writingMode: 'vertical-rl',
                              textOrientation: 'mixed',
                              transform: 'rotate(180deg)',
                            }}
                          >
                            {book.title}
                          </div>
                        </div>

                        {/* Book details/texture */}
                        <div className="absolute top-2 inset-x-0 h-px bg-white/20" />
                        <div className="absolute bottom-2 inset-x-0 h-px bg-black/30" />
                      </div>

                      {/* Book bottom edge */}
                      <div className={`h-2 ${book.color} brightness-75 rounded-b-sm border-x-2 ${book.spineColor}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-4 w-16 h-20 bg-amber-700/20 rounded-b-lg shadow-lg" />
        <div className="absolute top-32 left-2 w-12 h-16 bg-amber-800/30 rounded-b-lg shadow-lg" />
      </div>

      {/* Book Details Modal */}
      {selectedBook && (
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm z-30 flex items-center justify-center p-8"
          onClick={() => setSelectedBook(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl shadow-2xl p-8 max-w-sm border-4 border-amber-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`${selectedBook.color} rounded-lg p-6 mb-4 shadow-lg`}>
              <BookOpen className={`w-12 h-12 ${selectedBook.textColor} mb-2`} />
              <h2 className={`text-2xl ${selectedBook.textColor}`}>{selectedBook.title}</h2>
            </div>
            
            <p className="text-amber-900 mb-6">
              {isBookRented(selectedBook.title) 
                ? 'Ez a könyv jelenleg ki van kölcsönözve. Nyomd meg az "Olvasás" gombot a megtekintéshez.'
                : selectedBook.hasContent 
                  ? 'Ez egy pénzügyi és tőkepiaci oktatási könyv. Kölcsönözd ki, hogy hozzáférj a tartalmához!'
                  : 'Ez a könyv hamarosan elérhető lesz!'}
            </p>
            
            <div className="space-y-2">
              {selectedBook.hasContent && !isBookRented(selectedBook.title) && (
                <button
                  onClick={() => {
                    setBookToRent(selectedBook);
                    setSelectedBook(null);
                  }}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Coins className="w-5 h-5" />
                  Kölcsönzés
                </button>
              )}
              
              {selectedBook.hasContent && isBookRented(selectedBook.title) && (
                <button
                  onClick={() => {
                    setSelectedBook(null);
                    onOpenBookView(selectedBook.title);
                  }}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <BookOpen className="w-5 h-5" />
                  Olvasás
                </button>
              )}
              
              <button
                onClick={() => setSelectedBook(null)}
                className="w-full bg-amber-700 hover:bg-amber-800 text-amber-100 py-3 rounded-lg transition-colors flex items-center justify-center"
              >
                Bezárás
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Rental Selection Modal */}
      <AnimatePresence>
        {bookToRent && (
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center p-8"
            onClick={() => setBookToRent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl shadow-2xl p-6 max-w-md w-full border-4 border-amber-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl text-amber-900">Könyv Kölcsönzése</h2>
                <button
                  onClick={() => setBookToRent(null)}
                  className="w-8 h-8 bg-amber-700 rounded-lg flex items-center justify-center hover:bg-amber-800 transition-colors"
                >
                  <X className="w-5 h-5 text-amber-100" />
                </button>
              </div>

              <div className={`${bookToRent.color} rounded-lg p-4 mb-6 shadow-lg`}>
                <h3 className={`text-lg ${bookToRent.textColor}`}>{bookToRent.title}</h3>
              </div>

              {/* Days Selector */}
              <div className="mb-6">
                <label className="block text-amber-900 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Kölcsönzési időszak
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={rentalDays}
                  onChange={(e) => setRentalDays(parseInt(e.target.value))}
                  className="w-full h-2 bg-amber-300 rounded-lg appearance-none cursor-pointer accent-amber-700"
                />
                <div className="flex justify-between text-sm text-amber-700 mt-1">
                  <span>1 nap</span>
                  <span className="text-amber-900">{rentalDays} nap</span>
                  <span>30 nap</span>
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg p-4 mb-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Coins className="w-6 h-6 text-yellow-900" />
                    <span className="text-yellow-900">Ár:</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-yellow-900">{calculateRentalPrice(rentalDays)}</div>
                    <div className="text-xs text-yellow-800">
                      (~{Math.round(calculateRentalPrice(rentalDays) / rentalDays)} arany/nap)
                    </div>
                  </div>
                </div>
              </div>

              {/* User's coins */}
              <div className="flex items-center justify-between mb-6 p-3 bg-amber-200/50 rounded-lg">
                <span className="text-amber-900">Egyenleged:</span>
                <div className="flex items-center gap-1">
                  <Coins className="w-5 h-5 text-amber-700" />
                  <span className="text-amber-900">{coins}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleRentBook}
                  disabled={coins < calculateRentalPrice(rentalDays)}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Coins className="w-5 h-5" />
                  Kölcsönzés - {calculateRentalPrice(rentalDays)} arany
                </button>
                <button
                  onClick={() => setBookToRent(null)}
                  className="w-full bg-amber-700 hover:bg-amber-800 text-amber-100 py-2 rounded-lg transition-colors flex items-center justify-center"
                >
                  Mégse
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Rental Panel */}
      <AnimatePresence>
        {showRentalPanel && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 z-40"
              onClick={() => setShowRentalPanel(false)}
            />
            
            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-br from-amber-100 to-amber-200 shadow-2xl z-50 overflow-y-auto border-l-4 border-amber-900"
            >
              {/* Panel Header */}
              <div className="sticky top-0 bg-gradient-to-r from-amber-700 to-amber-800 p-4 shadow-lg z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookMarked className="w-6 h-6 text-amber-100" />
                    <h2 className="text-amber-100 text-xl">Kölcsönzött Könyvek</h2>
                  </div>
                  <button
                    onClick={() => setShowRentalPanel(false)}
                    className="w-8 h-8 bg-amber-900 rounded-lg flex items-center justify-center hover:bg-amber-950 transition-colors"
                  >
                    <X className="w-5 h-5 text-amber-100" />
                  </button>
                </div>
              </div>

              {/* Rented Books List */}
              <div className="p-4 space-y-3">
                {rentedBooks.length === 0 ? (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                    <p className="text-amber-700">Még nincs kikölcsönzött könyved</p>
                    <p className="text-amber-600 text-sm mt-2">Kölcsönözz ki egy könyvet a polcokról!</p>
                  </div>
                ) : (
                  rentedBooks.map((book, index) => {
                    const remainingDays = getRemainingDays(book.rentedUntil);
                    const isExpiringSoon = remainingDays <= 3;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg p-4 shadow-lg border-2 border-amber-300"
                      >
                        <div className={`${book.color} rounded-lg p-3 mb-3 shadow-md`}>
                          <div className="flex items-center gap-2">
                            <BookOpen className={`w-5 h-5 ${book.textColor}`} />
                            <h3 className={`${book.textColor} text-sm`}>{book.title}</h3>
                          </div>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-amber-700 flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Kölcsönözve:
                            </span>
                            <span className="text-amber-900">{book.daysRented} napra</span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className={`${isExpiringSoon ? 'text-red-600' : 'text-amber-700'} flex items-center gap-1`}>
                              <Clock className="w-4 h-4" />
                              Hátralévő idő:
                            </span>
                            <span className={`${isExpiringSoon ? 'text-red-700 font-bold' : 'text-amber-900'}`}>
                              {remainingDays} nap
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-amber-200 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full transition-all ${
                                isExpiringSoon ? 'bg-red-600' : 'bg-green-600'
                              }`}
                              style={{
                                width: `${(remainingDays / book.daysRented) * 100}%`
                              }}
                            />
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setShowRentalPanel(false);
                              onOpenBookView(book.title);
                            }}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 rounded-lg transition-all text-sm flex items-center justify-center gap-1"
                          >
                            <BookOpen className="w-4 h-4" />
                            Olvasás
                          </button>
                          <button
                            onClick={() => handleReturnBook(book.title)}
                            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 rounded-lg transition-all text-sm flex items-center justify-center"
                          >
                            Visszaadás
                          </button>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Info Section */}
              <div className="p-4 bg-amber-300/30 border-t-2 border-amber-400 mt-4">
                <h3 className="text-amber-900 text-sm mb-2">ℹ️ Tudnivalók</h3>
                <ul className="text-xs text-amber-800 space-y-1">
                  <li>• Min. 1 nap, max. 30 nap kölcsönzés</li>
                  <li>• 1 nap = 50 arany</li>
                  <li>• 30 nap = 1000 arany (kedvezmény!)</li>
                  <li>• Hosszabb időszak = jobb ár/nap arány</li>
                  <li>• Korai visszaadásnál időarányos visszatérítés</li>
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Celebration Modal */}
      {showSuccessModal && (
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-8"
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl shadow-2xl p-8 max-w-sm w-full border-4 border-amber-600 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-700 rounded-full mx-auto mb-4 flex items-center justify-center shadow-xl">
              <BookMarked className="w-10 h-10 text-white" />
            </div>

            {/* Success Message */}
            <h2 className="text-3xl text-amber-900 text-center mb-2">
              Sikeres kölcsönzés! 🎉
            </h2>

            <p className="text-amber-800 text-center mb-6">
              <span className="block text-lg mb-1">{successBookTitle}</span>
              <span className="text-sm">Most már hozzáférhetsz a könyv tartalmához!</span>
            </p>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4">
              <BookOpen className="w-8 h-8 text-amber-600/30" />
            </div>
            <div className="absolute bottom-4 left-4">
              <Coins className="w-8 h-8 text-amber-600/30" />
            </div>

            {/* Continue Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-12 py-3 rounded-lg transition-all shadow-lg text-lg hover:scale-105 active:scale-95"
              >
                Rendben
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
