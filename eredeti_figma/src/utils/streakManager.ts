interface StreakData {
  lastCompletionDate: string; // YYYY-MM-DD format
  currentStreak: number;
  completedToday: boolean;
}

const STREAK_STORAGE_KEY = 'daily_streak';

// Get today's date in YYYY-MM-DD format
function getTodayString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// Get yesterday's date in YYYY-MM-DD format
function getYesterdayString(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

// Save streak data to localStorage
function saveStreakData(data: StreakData): void {
  try {
    localStorage.setItem(STREAK_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving streak data:', error);
  }
}

// Load streak data from localStorage
export function loadStreakData(): StreakData {
  try {
    const saved = localStorage.getItem(STREAK_STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved) as StreakData;
      const today = getTodayString();
      const yesterday = getYesterdayString();
      
      // Check if the saved date is today - if yes, keep completedToday flag
      // If not today, reset completedToday to false for the new day
      if (data.lastCompletionDate !== today) {
        data.completedToday = false;
        
        // If last completion was NOT yesterday, streak is broken
        if (data.lastCompletionDate !== yesterday) {
          console.log('📅 Streak expired. Last completion:', data.lastCompletionDate);
          data.currentStreak = 0;
          data.lastCompletionDate = '';
          // Save the reset data
          saveStreakData(data);
        }
      }
      
      return data;
    }
  } catch (error) {
    console.error('Error loading streak data:', error);
  }
  
  return {
    lastCompletionDate: '',
    currentStreak: 0,
    completedToday: false
  };
}

// Record a task completion and update streak
export function recordTaskCompletion(): { isFirstToday: boolean; newStreak: number } {
  const data = loadStreakData();
  const today = getTodayString();
  const yesterday = getYesterdayString();
  
  console.log('🔥 recordTaskCompletion:', {
    today,
    yesterday,
    lastCompletionDate: data.lastCompletionDate,
    currentStreak: data.currentStreak,
    completedToday: data.completedToday
  });
  
  // If already completed today, just return current streak
  if (data.completedToday) {
    console.log('✅ Already completed today, returning current streak:', data.currentStreak);
    return {
      isFirstToday: false,
      newStreak: data.currentStreak
    };
  }
  
  // This is the first completion today
  let newStreak = 1;
  
  if (data.lastCompletionDate === yesterday) {
    // Completed yesterday, so increment streak
    newStreak = data.currentStreak + 1;
    console.log('📈 Completed yesterday! Incrementing streak:', newStreak);
  } else if (data.lastCompletionDate === today) {
    // Already completed today (shouldn't happen, but just in case)
    newStreak = data.currentStreak;
    console.log('✅ Already completed today (edge case)');
  } else {
    // Streak broken or first time, reset to 1
    newStreak = 1;
    console.log('🔄 Streak broken or first time. Starting new streak:', newStreak);
  }
  
  // Update and save
  const updatedData: StreakData = {
    lastCompletionDate: today,
    currentStreak: newStreak,
    completedToday: true
  };
  
  saveStreakData(updatedData);
  console.log('💾 Saved new streak data:', updatedData);
  
  return {
    isFirstToday: true,
    newStreak: newStreak
  };
}

// Get current streak count
export function getCurrentStreak(): number {
  const data = loadStreakData();
  const today = getTodayString();
  const yesterday = getYesterdayString();
  
  console.log('📊 getCurrentStreak check:', {
    today,
    yesterday,
    lastCompletionDate: data.lastCompletionDate,
    currentStreak: data.currentStreak,
    completedToday: data.completedToday
  });
  
  // If last completion was today or yesterday, return current streak
  if (data.lastCompletionDate === today || data.lastCompletionDate === yesterday) {
    return data.currentStreak;
  }
  
  // Streak is broken - reset streak data
  if (data.currentStreak > 0) {
    console.warn('⚠️ Streak broken! Resetting to 0');
    const resetData: StreakData = {
      lastCompletionDate: '',
      currentStreak: 0,
      completedToday: false
    };
    saveStreakData(resetData);
  }
  
  return 0;
}

// Reset streak (for game reset/restart)
export function resetStreak(): void {
  try {
    localStorage.removeItem(STREAK_STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting streak data:', error);
  }
}
