import { StandaloneBookView } from './components/StandaloneBookView';
import { PenzugyiAlapismeretkBookView } from './components/PenzugyiAlapismeretkBookView';
import { SideMenu } from './components/SideMenu';
import { EventCards } from './components/EventCards';
import { CharacterLineup } from './components/CharacterLineup';
import { PhoneFrame } from './components/PhoneFrame';
import { ProgressAnimation } from './components/ProgressAnimation';
import { LessonHeader } from './components/LessonHeader';
import { LessonGame } from './components/LessonGame';
import { QuizGame } from './components/QuizGame';
import { ReadingGame } from './components/ReadingGame';
import { LevelUpCelebration } from './components/LevelUpCelebration';
import { StreakCelebration } from './components/StreakCelebration';
import { TipBar } from './components/TipBar';
import { UniversityPage } from './components/UniversityPage';
import { ArenaPage } from './components/ArenaPage';
import { ProfilePage } from './components/ProfilePage';
import { SubscriptionPage } from './components/SubscriptionPage';
import { DailyLimitPage } from './components/DailyLimitPage';
import { AvatarSelectorPage } from './components/AvatarSelectorPage';
import { ManagerPage } from './components/ManagerPage';
import { PlayerStatusBar } from './components/PlayerStatusBar';
import { TopBar } from './components/TopBar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import { recordTaskCompletion, getCurrentStreak, resetStreak } from './utils/streakManager';
import { getGameConfig, getLevelFromXp } from './utils/gameConfig';
import { tokepiaciSzotarData } from './data/tokepiaciSzotar';
import { befektetesAlapjaiData } from './data/befektetesAlapjai';
import { penzugyiAlapismeretkData } from './data/penzugyiAlapismeretek';
import { reszvenyekData } from './data/reszvenyekData';
import { kotvenyekData } from './data/kotvenyekData';
import { portfolioKezelesData } from './data/portfolioKezeles';
import { technikaiElemzesData } from './data/technikaiElemzes';
import { fundamentalisElemzesData } from './data/fundamentalisElemzes';
import { penzugyimatematikaData } from './data/penzugyiMatematika';
import { opciokData } from './data/opciok';
import { hatariidosUgyletekData } from './data/hatariidosUgyletek';
import { kockazatkezelesData } from './data/kockazatkezeles';
import { makrogazdasagData } from './data/makrogazdasag';
import { kriptoEsBlockchainData } from './data/kriptoEsBlockchain';
import { pszichologiaEsTradingData } from './data/pszichologiaEsTrading';
import { ingatlanBefektetesData } from './data/ingatlanBefektetes';
import { penzugyiAlapismeretkLessons, getTotalLessonsInFirstRound, getTotalLessonsInSecondRound } from './data/penzugyiAlapismeretkLessons';
import { useState, useEffect } from 'react';

// Lesson rewards mapping
const lessonRewards: Record<number, number> = {
  7: 150,
  8: 300,
  9: 100
};

// Initial welcome state (for first time users)
const getWelcomeState = () => {
  const config = getGameConfig();
  return {
    currentPage: 'main' as const,
    coins: config.initialGold,
    gems: 0,
    currentLesson: 7,
    progressPosition: 0,
    playerLevel: 0,
    totalXp: 0,
    selectedBookTitle: 'Tőkepiaci Szótár',
    subscriptionTier: 'free' as 'free' | 'pro' | 'master',
    hasSeenWelcome: false,
    currentStageInSection: 1,
    totalStagesCompleted: 0
  };
};

// Default game state
const DEFAULT_GAME_STATE = {
  currentPage: 'main' as const,
  coins: 680,
  gems: 25,
  currentLesson: 7,
  progressPosition: 3,
  playerLevel: 2,
  totalXp: 1000,
  selectedBookTitle: 'Tőkepiaci Szótár',
  subscriptionTier: 'free' as 'free' | 'pro' | 'master',
  hasSeenWelcome: true,
  currentStageInSection: 4,
  totalStagesCompleted: 3
};

// Load from localStorage or use defaults
const loadGameState = () => {
  try {
    const saved = localStorage.getItem('rpg_game_state');
    if (saved) {
      const state = JSON.parse(saved);
      // Ensure progressPosition is synced with currentStageInSection
      if (state.currentStageInSection !== undefined && state.progressPosition === undefined) {
        state.progressPosition = state.currentStageInSection - 1;
      }
      return state;
    }
  } catch (error) {
    console.error('Error loading game state:', error);
  }
  // First time user - show welcome screen
  return getWelcomeState();
};

// Save to localStorage
const saveGameState = (state: any) => {
  try {
    localStorage.setItem('rpg_game_state', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving game state:', error);
  }
};

export default function App() {
  const initialState = loadGameState();
  
  const [currentPage, setCurrentPage] = useState<'main' | 'lesson' | 'game' | 'university' | 'bookview' | 'arena' | 'profile' | 'subscription' | 'dailylimit' | 'avatar' | 'manager'>(initialState.currentPage);
  const [coins, setCoins] = useState(initialState.coins);
  const [gems, setGems] = useState(initialState.gems || 0);
  const [currentLesson, setCurrentLesson] = useState(initialState.currentLesson);
  const [currentStageInSection, setCurrentStageInSection] = useState(initialState.currentStageInSection || 1);
  const [progressPosition, setProgressPosition] = useState(
    initialState.progressPosition !== undefined 
      ? initialState.progressPosition 
      : (initialState.currentStageInSection ? initialState.currentStageInSection - 1 : 0)
  ); // 0-based index, synced with currentStageInSection
  const [totalXp, setTotalXp] = useState(initialState.totalXp || 0);
  const [playerLevel, setPlayerLevel] = useState(initialState.playerLevel);
  const [subscriptionTier, setSubscriptionTier] = useState<'free' | 'pro' | 'master'>(initialState.subscriptionTier || 'free');
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showStreakCelebration, setShowStreakCelebration] = useState(false);
  const [celebratedStreakNumber, setCelebratedStreakNumber] = useState(0);
  const [selectedBookTitle, setSelectedBookTitle] = useState<string>(initialState.selectedBookTitle);
  const [playerName, setPlayerName] = useState<string>('');
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [limitType, setLimitType] = useState<'lessons' | 'arena'>('lessons');
  const [hasSeenWelcome, setHasSeenWelcome] = useState(initialState.hasSeenWelcome ?? true);
  const [totalStagesCompleted, setTotalStagesCompleted] = useState(initialState.totalStagesCompleted || 0);
  
  // New lesson system for Pénzügyi Alapismeretek
  const [currentBookLessonIndex, setCurrentBookLessonIndex] = useState(initialState.currentBookLessonIndex || 0);
  const [currentGameType, setCurrentGameType] = useState<'reading' | 'matching' | 'quiz'>(initialState.currentGameType || 'reading');
  const [isFirstRound, setIsFirstRound] = useState(initialState.isFirstRound ?? true);

  // Debug: Log lesson state changes
  useEffect(() => {
    console.log('📊 Lesson state changed:', {
      currentBookLessonIndex,
      currentGameType,
      isFirstRound
    });
  }, [currentBookLessonIndex, currentGameType, isFirstRound]);

  // Debug: Log progress position changes and ensure sync
  useEffect(() => {
    const expectedProgressPosition = currentStageInSection - 1;
    console.log('🎯 Progress state:', {
      currentStageInSection,
      progressPosition,
      expectedProgressPosition,
      synced: progressPosition === expectedProgressPosition
    });
    
    // Auto-fix if out of sync
    if (progressPosition !== expectedProgressPosition) {
      console.warn('⚠️ Progress position out of sync! Fixing...');
      setProgressPosition(expectedProgressPosition);
    }
  }, [currentStageInSection, progressPosition]);

  // Load initial streak on mount
  useEffect(() => {
    const streak = getCurrentStreak();
    setCurrentStreak(streak);
  }, []);

  // Check and update streak daily at midnight
  useEffect(() => {
    const updateStreakIfNeeded = () => {
      const streak = getCurrentStreak();
      if (streak !== currentStreak) {
        console.log('📅 New day detected! Updating streak:', streak);
        setCurrentStreak(streak);
      }
    };

    // Check immediately
    updateStreakIfNeeded();

    // Check every minute to detect midnight crossover
    const interval = setInterval(updateStreakIfNeeded, 60000); // Check every 60 seconds

    return () => clearInterval(interval);
  }, [currentStreak]);

  // Load player name from profile
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('user_profile');
      if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        setPlayerName(profile.name || '');
      }
    } catch (error) {
      console.error('Error loading player name:', error);
    }
  }, []);

  // Listen for profile updates
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedProfile = localStorage.getItem('user_profile');
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          setPlayerName(profile.name || '');
        }
      } catch (error) {
        console.error('Error loading player name:', error);
      }
    };

    const handleProfileUpdate = () => {
      handleStorageChange();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profileUpdated', handleProfileUpdate);
    // Also check when returning from profile page
    if (currentPage === 'main') {
      handleStorageChange();
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, [currentPage]);

  // Listen for streak updates from Arena or other components
  useEffect(() => {
    const handleStreakUpdate = (event: CustomEvent) => {
      if (event.detail && typeof event.detail.streak === 'number') {
        setCurrentStreak(event.detail.streak);
        
        // Show celebration if this is a first completion today
        if (event.detail.isFirstToday) {
          setCelebratedStreakNumber(event.detail.streak);
          setShowStreakCelebration(true);
        }
      }
    };

    window.addEventListener('streakUpdated', handleStreakUpdate as EventListener);

    return () => {
      window.removeEventListener('streakUpdated', handleStreakUpdate as EventListener);
    };
  }, []);

  // Save game state whenever it changes
  useEffect(() => {
    saveGameState({
      currentPage,
      coins,
      gems,
      currentLesson,
      progressPosition,
      totalXp,
      playerLevel,
      subscriptionTier,
      selectedBookTitle,
      hasSeenWelcome,
      currentStageInSection,
      totalStagesCompleted,
      currentBookLessonIndex,
      currentGameType,
      isFirstRound
    });
  }, [currentPage, coins, gems, currentLesson, progressPosition, totalXp, playerLevel, subscriptionTier, selectedBookTitle, hasSeenWelcome, currentStageInSection, totalStagesCompleted, currentBookLessonIndex, currentGameType, isFirstRound]);

  // Check daily lesson limit (3 lessons per day for free users)
  const checkLessonLimit = () => {
    if (subscriptionTier !== 'free') {
      return true; // Pro and Master have unlimited lessons
    }

    const today = new Date().toDateString();
    const savedData = localStorage.getItem('daily_lessons');
    
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.date === today) {
        return data.lessonsCompleted < 3;
      }
    }
    
    return true; // New day or first time
  };

  const incrementLessonsCompleted = () => {
    if (subscriptionTier !== 'free') {
      return; // No need to track for premium users
    }

    const today = new Date().toDateString();
    const savedData = localStorage.getItem('daily_lessons');
    
    let lessonsCompleted = 1;
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.date === today) {
        lessonsCompleted = data.lessonsCompleted + 1;
      }
    }

    localStorage.setItem('daily_lessons', JSON.stringify({
      date: today,
      lessonsCompleted: lessonsCompleted
    }));
  };

  const handleProgressClick = () => {
    // Check lesson limit before allowing to start
    if (!checkLessonLimit()) {
      setLimitType('lessons');
      setCurrentPage('dailylimit');
      return;
    }
    setCurrentPage('lesson');
  };

  const handleBackClick = () => {
    setCurrentPage('main');
  };

  const handleStartClick = () => {
    // Increment lesson counter when starting a lesson
    incrementLessonsCompleted();
    setCurrentPage('game');
  };

  const handleUniversityClick = () => {
    setCurrentPage('university');
  };

  const handleArenaClick = () => {
    setCurrentPage('arena');
  };

  const handleOpenBookView = (bookTitle: string) => {
    setSelectedBookTitle(bookTitle);
    setCurrentPage('bookview');
  };

  const handleBackFromBookView = () => {
    setCurrentPage('university');
  };

  const handleProfileClick = () => {
    setCurrentPage('profile');
  };

  const handleSubscriptionClick = () => {
    setCurrentPage('subscription');
  };

  const handleXpGain = (xpAmount: number) => {
    const newTotalXp = totalXp + xpAmount;
    setTotalXp(newTotalXp);
    
    // Calculate new level
    const { level: newLevel } = getLevelFromXp(newTotalXp);
    
    // Check if leveled up
    if (newLevel > playerLevel) {
      setPlayerLevel(newLevel);
      setShowLevelUp(true);
    }
  };

  const handleArenaLimitReached = () => {
    setLimitType('arena');
    setCurrentPage('dailylimit');
  };

  const handleDailyLimitUpgrade = () => {
    setCurrentPage('subscription');
  };

  const handleAvatarClick = () => {
    setCurrentPage('avatar');
  };

  const handleManagerClick = () => {
    setCurrentPage('manager');
  };

  // Get book data and styling based on selected book title
  const getBookData = () => {
    switch (selectedBookTitle) {
      case 'Tőkepiaci Szótár':
        return {
          data: tokepiaciSzotarData,
          coverColor: 'from-amber-700 via-amber-800 to-amber-900',
          accentColor: 'border-amber-400 text-amber-400'
        };
      case 'Befektetés Alapjai':
        return {
          data: befektetesAlapjaiData,
          coverColor: 'from-blue-700 via-blue-800 to-blue-900',
          accentColor: 'border-blue-400 text-blue-400'
        };
      case 'Pénzügyi Alapismeretek':
        return {
          data: penzugyiAlapismeretkData,
          coverColor: 'from-slate-700 via-slate-800 to-slate-900',
          accentColor: 'border-slate-400 text-slate-400'
        };
      case 'Részvények':
        return {
          data: reszvenyekData,
          coverColor: 'from-green-700 via-green-800 to-green-900',
          accentColor: 'border-green-400 text-green-400'
        };
      case 'Kötvények':
        return {
          data: kotvenyekData,
          coverColor: 'from-purple-700 via-purple-800 to-purple-900',
          accentColor: 'border-purple-400 text-purple-400'
        };
      case 'Portfolió Kezelés':
        return {
          data: portfolioKezelesData,
          coverColor: 'from-red-700 via-red-800 to-red-900',
          accentColor: 'border-red-400 text-red-400'
        };
      case 'Technikai Elemzés':
        return {
          data: technikaiElemzesData,
          coverColor: 'from-indigo-700 via-indigo-800 to-indigo-900',
          accentColor: 'border-indigo-400 text-indigo-400'
        };
      case 'Fundamentális Elemzés':
        return {
          data: fundamentalisElemzesData,
          coverColor: 'from-teal-700 via-teal-800 to-teal-900',
          accentColor: 'border-teal-400 text-teal-400'
        };
      case 'Pénzügyi Matematika':
        return {
          data: penzugyimatematikaData,
          coverColor: 'from-orange-700 via-orange-800 to-orange-900',
          accentColor: 'border-orange-400 text-orange-400'
        };
      case 'Opciók':
        return {
          data: opciokData,
          coverColor: 'from-pink-700 via-pink-800 to-pink-900',
          accentColor: 'border-pink-400 text-pink-400'
        };
      case 'Határidős Ügyletek':
        return {
          data: hatariidosUgyletekData,
          coverColor: 'from-cyan-700 via-cyan-800 to-cyan-900',
          accentColor: 'border-cyan-400 text-cyan-400'
        };
      case 'Kockázatkezelés':
        return {
          data: kockazatkezelesData,
          coverColor: 'from-gray-700 via-gray-800 to-gray-900',
          accentColor: 'border-gray-400 text-gray-400'
        };
      case 'Makrogazdaság':
        return {
          data: makrogazdasagData,
          coverColor: 'from-yellow-700 via-yellow-800 to-yellow-900',
          accentColor: 'border-yellow-400 text-yellow-400'
        };
      case 'Kripto és Blockchain':
        return {
          data: kriptoEsBlockchainData,
          coverColor: 'from-green-700 via-green-800 to-green-900',
          accentColor: 'border-green-400 text-green-400'
        };
      case 'Pszichológia és Trading':
        return {
          data: pszichologiaEsTradingData,
          coverColor: 'from-blue-700 via-blue-800 to-blue-900',
          accentColor: 'border-blue-400 text-blue-400'
        };
      case 'Ingatlan Befektetés':
        return {
          data: ingatlanBefektetesData,
          coverColor: 'from-red-700 via-red-800 to-red-900',
          accentColor: 'border-red-400 text-red-400'
        };
      default:
        return {
          data: tokepiaciSzotarData,
          coverColor: 'from-amber-700 via-amber-800 to-amber-900',
          accentColor: 'border-amber-400 text-amber-400'
        };
    }
  };

  const bookConfig = getBookData();

  const advanceStage = () => {
    const config = getGameConfig();
    const newStageInSection = currentStageInSection + 1;
    const newTotalStages = totalStagesCompleted + 1;
    
    // Check if completing a milestone (6 stages)
    if (newStageInSection > config.stagesPerMilestone) {
      // Reset to stage 1 and award diamonds
      setCurrentStageInSection(1);
      setProgressPosition(0); // Reset progressPosition to 0 (first position)
      setTotalStagesCompleted(newTotalStages);
      
      const diamondReward = config.diamondsPerMilestone;
      setGems(prev => prev + diamondReward);
      
      // Show diamond reward toast
      toast.success(`🏆 Mérföldkő teljesítve! +${diamondReward} gyémánt!`, {
        duration: 4000,
      });
    } else {
      // Just advance to next stage
      setCurrentStageInSection(newStageInSection);
      setProgressPosition(newStageInSection - 1); // progressPosition is 0-indexed (0-5)
      setTotalStagesCompleted(newTotalStages);
    }
  };

  const handleWin = () => {
    const config = getGameConfig();
    
    // Calculate current lesson number (every game is a separate lesson)
    const currentLessonNumber = isFirstRound 
      ? (currentBookLessonIndex * 3) + (currentGameType === 'reading' ? 1 : currentGameType === 'matching' ? 2 : 3)
      : penzugyiAlapismeretkLessons.length * 3 + currentBookLessonIndex + 1;
    
    console.log('🎮 handleWin called!', {
      currentBookLessonIndex,
      currentGameType,
      isFirstRound,
      currentLessonNumber
    });

    // Record task completion and update streak
    const { isFirstToday, newStreak } = recordTaskCompletion();
    
    console.log('🔥 Streak updated:', {
      isFirstToday,
      newStreak,
      previousStreak: currentStreak
    });
    
    // Update streak state
    setCurrentStreak(newStreak);
    
    // Advance stage
    advanceStage();
    
    // Add reward coins - 150 per lesson
    const reward = 150;
    setCoins(prev => prev + reward);
    
    // Add XP reward
    const xpReward = config.xpPerLesson;
    handleXpGain(xpReward);
    
    // Determine next lesson based on new book system
    let shouldShowCelebration = false;
    
    if (isFirstRound) {
      // First round: Reading -> Matching -> Quiz for each page
      if (currentGameType === 'reading') {
        // Move to matching - stay on game page
        console.log('📖 Reading completed, moving to matching');
        setCurrentGameType('matching');
        toast.success(`✅ ${currentLessonNumber}. lecke (Szövegértés) teljesítve! +${xpReward} XP, +${reward} arany`, { duration: 3000 });
      } else if (currentGameType === 'matching') {
        // Move to quiz - stay on game page
        console.log('🔗 Matching completed, moving to quiz');
        setCurrentGameType('quiz');
        toast.success(`✅ ${currentLessonNumber}. lecke (Párosítás) teljesítve! +${xpReward} XP, +${reward} arany`, { duration: 3000 });
      } else {
        // Completed quiz - move to next page
        const nextPageIndex = currentBookLessonIndex + 1;
        console.log('❓ Quiz completed, next page index:', nextPageIndex);
        
        if (nextPageIndex >= penzugyiAlapismeretkLessons.length) {
          // Completed first round - start second round
          console.log('🎉 First round completed!');
          setIsFirstRound(false);
          setCurrentBookLessonIndex(0);
          setCurrentGameType('reading');
          toast.success(`✅ ${currentLessonNumber}. lecke (Kvíz) teljesítve! +${xpReward} XP, +${reward} arany`, { duration: 3000 });
          toast.success('🎉 Első kör teljesítve! Kezdődik a második kör!', { duration: 5000 });
          shouldShowCelebration = true;
        } else {
          // Move to next page - stay on game page
          console.log('➡️ Moving to next lesson:', nextPageIndex);
          setCurrentBookLessonIndex(nextPageIndex);
          setCurrentGameType('reading');
          toast.success(`✅ ${currentLessonNumber}. lecke (Kvíz) teljesítve! +${xpReward} XP, +${reward} arany`, { duration: 3000 });
        }
      }
    } else {
      // Second round: Only reading for each page
      const nextPageIndex = currentBookLessonIndex + 1;
      console.log('📚 Second round, next page:', nextPageIndex);
      
      if (nextPageIndex >= penzugyiAlapismeretkLessons.length) {
        // Book completed!
        console.log('🏆 Book completed!');
        setCurrentBookLessonIndex(0);
        setCurrentGameType('reading');
        setIsFirstRound(true);
        toast.success(`✅ ${currentLessonNumber}. lecke (2. kör) teljesítve! +${xpReward} XP, +${reward} arany`, { duration: 3000 });
        toast.success('🏆 Gratulálok! Teljesítetted a könyvet!', { duration: 6000 });
        shouldShowCelebration = true;
      } else {
        // Move to next page - stay on game page
        console.log('➡️ Second round - moving to next lesson:', nextPageIndex);
        setCurrentBookLessonIndex(nextPageIndex);
        toast.success(`✅ ${currentLessonNumber}. lecke (2. kör) teljesítve! +${xpReward} XP, +${reward} arany`, { duration: 3000 });
      }
    }
    
    // Show streak celebration if this is the first task today
    if (isFirstToday) {
      setCelebratedStreakNumber(newStreak);
      setShowStreakCelebration(true);
    } else if (shouldShowCelebration) {
      // Only return to main if it's a major milestone (round completed or book completed)
      setCurrentPage('main');
    }
    // Otherwise stay on game page to continue with next lesson automatically
  };

  const handleLevelUpContinue = () => {
    setShowLevelUp(false);
    
    // Check if we need to show streak celebration after level up
    if (celebratedStreakNumber > 0) {
      setShowStreakCelebration(true);
    } else {
      setCurrentPage('main');
    }
  };

  const handleStreakCelebrationContinue = () => {
    setShowStreakCelebration(false);
    setCelebratedStreakNumber(0);
    setCurrentPage('main');
  };

  const handleJumpToLesson = (lesson: number) => {
    // Calculate coins and progress based on lesson number
    if (lesson === 7) {
      // Jump to start (lesson 7) - RESET TO WELCOME STATE
      const welcomeState = getWelcomeState();
      setCoins(welcomeState.coins);
      setGems(welcomeState.gems);
      setCurrentLesson(welcomeState.currentLesson);
      setProgressPosition(welcomeState.progressPosition);
      setPlayerLevel(welcomeState.playerLevel);
      setTotalXp(welcomeState.totalXp);
      setSelectedBookTitle(welcomeState.selectedBookTitle);
      setSubscriptionTier(welcomeState.subscriptionTier);
      setHasSeenWelcome(false); // Show welcome screen
      setCurrentStageInSection(welcomeState.currentStageInSection);
      setTotalStagesCompleted(welcomeState.totalStagesCompleted);
      
      // Reset lesson progress to start
      setCurrentBookLessonIndex(0);
      setCurrentGameType('reading');
      setIsFirstRound(true);
      
      // Reset streak
      resetStreak();
      setCurrentStreak(0);
      
      // Reset daily limits to free tier defaults
      localStorage.removeItem('daily_lessons');
      localStorage.removeItem('arena_daily_games');
      
      // Clear user profile
      localStorage.removeItem('user_profile');
      setPlayerName('');
      
      // Clear avatar
      localStorage.removeItem('player_avatar');
      window.dispatchEvent(new Event('storage'));
      
      // Clear library rentals
      localStorage.removeItem('rentedBooks');
      
      // Notify components about the reset
      window.dispatchEvent(new Event('arenaGameCompleted'));
    } else if (lesson === 8) {
      // Jump after lesson 7 (to lesson 8)
      setCoins(680 + 150); // 830
      setCurrentLesson(8);
      setProgressPosition(4);
      setPlayerLevel(2);
      setCurrentStageInSection(5);
      setTotalStagesCompleted(4);
    } else if (lesson === 9) {
      // Jump after lesson 8 (to lesson 9)
      setCoins(680 + 150 + 300); // 1130
      setCurrentLesson(9);
      setProgressPosition(5);
      setPlayerLevel(2);
      setCurrentStageInSection(6);
      setTotalStagesCompleted(5);
    }
    // Always return to main page
    setCurrentPage('main');
  };

  const handleWelcomeComplete = () => {
    setHasSeenWelcome(true);
  };

  return (
    <div className="relative w-full min-h-screen bg-white flex items-center justify-center p-8">
      <PhoneFrame>
        {/* iPhone screen content */}
        <div className="relative w-full h-full bg-gradient-to-b from-slate-900 via-purple-900/40 to-slate-900 overflow-hidden">
          {/* Background with fantasy cave theme */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: `
                  radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                  radial-gradient(circle at 70% 60%, rgba(168, 85, 247, 0.2) 0%, transparent 50%),
                  linear-gradient(to bottom, rgba(15, 23, 42, 0.8), rgba(88, 28, 135, 0.4))
                `
              }}
            />
            
            {/* Crystal decorations */}
            <div className="absolute bottom-0 left-0 w-32 h-40 bg-gradient-to-br from-purple-600/40 to-transparent rounded-tr-full"></div>
            <div className="absolute bottom-0 right-0 w-40 h-32 bg-gradient-to-bl from-blue-600/30 to-transparent rounded-tl-full"></div>
            <div className="absolute top-1/3 left-1/4 w-24 h-32 bg-gradient-to-br from-purple-500/20 to-transparent transform -rotate-12"></div>
            <div className="absolute top-1/2 right-1/3 w-20 h-28 bg-gradient-to-bl from-pink-500/20 to-transparent transform rotate-12"></div>
            
            {/* Cave crystals scattered */}
            <div className="absolute bottom-48 left-8 w-16 h-20 bg-gradient-to-t from-purple-600/50 to-purple-400/30 transform rotate-12 rounded-t-lg"></div>
            <div className="absolute bottom-52 left-20 w-12 h-16 bg-gradient-to-t from-blue-600/40 to-blue-400/20 transform -rotate-6 rounded-t-lg"></div>
            <div className="absolute bottom-48 right-12 w-20 h-24 bg-gradient-to-t from-pink-600/40 to-pink-400/20 transform rotate-6 rounded-t-lg"></div>
          </div>

          {/* Welcome Screen */}
          {!hasSeenWelcome ? (
            <WelcomeScreen onGetStarted={handleWelcomeComplete} />
          ) : (
            <>
              {/* Main content */}
              <div className="relative h-full flex flex-col pt-12">
                {currentPage === 'main' ? (
                  <>
                    {/* Top section */}
                    <TopBar 
                      coins={coins} 
                      gems={gems} 
                      progressPosition={progressPosition} 
                      playerLevel={playerLevel} 
                      currentLesson={currentLesson} 
                      onAvatarClick={handleAvatarClick}
                      currentStageInSection={currentStageInSection}
                    />

                    {/* Middle section - Game world */}
                    <div className="flex-1 relative pb-8">
                      <SideMenu />
                      <EventCards onArenaClick={handleArenaClick} subscriptionTier={subscriptionTier} />
                    </div>

                    {/* Tip Bar */}
                    <TipBar />

                    {/* Bottom menu */}
                    <CharacterLineup 
                      onJumpToLesson={handleJumpToLesson} 
                      onUniversityClick={handleUniversityClick}
                      onProfileClick={handleProfileClick}
                      onSubscriptionClick={handleSubscriptionClick}
                      onManagerClick={handleManagerClick}
                    />

                    {/* Player Status Bar */}
                    <PlayerStatusBar 
                      playerName={playerName} 
                      subscriptionTier={subscriptionTier} 
                      streak={currentStreak}
                      currentXp={getLevelFromXp(totalXp).currentXp}
                      xpForNextLevel={getLevelFromXp(totalXp).xpForNextLevel}
                    />

                    {/* Progress Animation */}
                    <ProgressAnimation 
                      onClick={handleProgressClick} 
                      currentBookLessonIndex={currentBookLessonIndex}
                      currentGameType={currentGameType}
                      isFirstRound={isFirstRound}
                    />
              </>
            ) : currentPage === 'lesson' ? (
              <>
                {/* Lesson page with header and bottom menu */}
                {(() => {
                  // Calculate lesson number based on page index, game type, and round
                  const lessonNumber = isFirstRound 
                    ? (currentBookLessonIndex * 3) + (currentGameType === 'reading' ? 1 : currentGameType === 'matching' ? 2 : 3)
                    : penzugyiAlapismeretkLessons.length * 3 + currentBookLessonIndex + 1;
                  
                  return (
                    <LessonHeader 
                      onBack={handleBackClick} 
                      onStart={handleStartClick} 
                      lessonNumber={lessonNumber}
                      gameType={currentGameType}
                      isFirstRound={isFirstRound}
                    />
                  );
                })()}
                <div className="flex-1"></div>
                <CharacterLineup />
              </>
            ) : currentPage === 'university' ? (
              <UniversityPage 
                onBack={handleBackClick} 
                onOpenBookView={handleOpenBookView}
                coins={coins}
                onCoinsChange={setCoins}
              />
            ) : currentPage === 'bookview' ? (
              selectedBookTitle === 'Pénzügyi Alapismeretek' ? (
                <PenzugyiAlapismeretkBookView onBack={handleBackFromBookView} />
              ) : (
                <StandaloneBookView
                  title={selectedBookTitle}
                  subtitle="Átfogó szakmai referencia"
                  data={bookConfig.data}
                  onBack={handleBackFromBookView}
                  coverColor={bookConfig.coverColor}
                  accentColor={bookConfig.accentColor}
                />
              )
            ) : currentPage === 'arena' ? (
              <ArenaPage 
                onClose={handleBackClick} 
                coins={coins} 
                onCoinsChange={setCoins} 
                subscriptionTier={subscriptionTier}
                onLimitReached={handleArenaLimitReached}
                onXpGain={handleXpGain}
                onStageAdvance={advanceStage}
                onStreakUpdate={(newStreak, isFirstToday) => {
                  console.log('🎯 Arena streak callback received:', { newStreak, isFirstToday });
                  setCurrentStreak(newStreak);
                }}
              />
            ) : currentPage === 'profile' ? (
              <ProfilePage 
                onBack={handleBackClick} 
                playerLevel={playerLevel} 
                coins={coins}
                gems={gems}
                subscriptionTier={subscriptionTier}
              />
            ) : currentPage === 'subscription' ? (
              <SubscriptionPage 
                onBack={handleBackClick} 
                subscriptionTier={subscriptionTier}
                onSubscriptionChange={setSubscriptionTier}
              />
            ) : currentPage === 'dailylimit' ? (
              <DailyLimitPage 
                onBack={handleBackClick}
                onUpgrade={handleDailyLimitUpgrade}
                limitType={limitType}
                subscriptionTier={subscriptionTier}
              />
            ) : currentPage === 'avatar' ? (
              <AvatarSelectorPage 
                onBack={handleBackClick}
                subscriptionTier={subscriptionTier}
              />
            ) : currentPage === 'manager' ? (
              <ManagerPage 
                onBack={handleBackClick}
              />
            ) : (
              <>
                {/* Game page with title and bottom menu */}
                {(() => {
                  const lessonData = penzugyiAlapismeretkLessons[currentBookLessonIndex];
                  
                  // Calculate actual lesson number (every game is a separate lesson)
                  const displayLessonNumber = isFirstRound 
                    ? (currentBookLessonIndex * 3) + (currentGameType === 'reading' ? 1 : currentGameType === 'matching' ? 2 : 3)
                    : penzugyiAlapismeretkLessons.length * 3 + currentBookLessonIndex + 1;
                  
                  const gameKey = `${currentBookLessonIndex}-${currentGameType}-${isFirstRound ? 'round1' : 'round2'}`;
                  
                  if (currentGameType === 'reading') {
                    return <ReadingGame 
                      key={gameKey}
                      onBackToHome={handleBackClick} 
                      onWin={handleWin} 
                      lessonNumber={displayLessonNumber}
                      lessonData={lessonData}
                    />;
                  } else if (currentGameType === 'matching') {
                    return <LessonGame 
                      key={gameKey}
                      onBackToHome={handleBackClick} 
                      onWin={handleWin} 
                      lessonNumber={displayLessonNumber}
                      lessonData={lessonData}
                    />;
                  } else {
                    return <QuizGame 
                      key={gameKey}
                      onBackToHome={handleBackClick} 
                      onWin={handleWin} 
                      lessonNumber={displayLessonNumber}
                      lessonData={lessonData}
                    />;
                  }
                })()}
                {/* Show bottom menu only for matching and quiz games */}
                {currentGameType !== 'reading' && <CharacterLineup />}
              </>
            )}

            {/* Level Up Celebration */}
            {showLevelUp && (
              <LevelUpCelebration newLevel={playerLevel} onContinue={handleLevelUpContinue} />
            )}

            {/* Streak Celebration */}
            {showStreakCelebration && (
              <StreakCelebration newStreak={celebratedStreakNumber} onContinue={handleStreakCelebrationContinue} />
            )}
          </div>
            </>
          )}
        </div>
      </PhoneFrame>
      <Toaster position="top-center" />
    </div>
  );
}