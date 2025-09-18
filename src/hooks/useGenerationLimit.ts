import { useState, useEffect, useCallback } from 'react';

const LIMIT_STORAGE_KEY = 'ai-image-generator-limit';
const DAILY_LIMIT = 10;

interface LimitData {
  count: number; // Number of images generated today
  date: string;  // YYYY-MM-DD format
}

const getTodayDateString = (): string => new Date().toISOString().split('T')[0];

export const useGenerationLimit = () => {
  const [generatedToday, setGeneratedToday] = useState<number>(0);

  // Load and validate the stored limit from localStorage on initial render
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(LIMIT_STORAGE_KEY);
      const today = getTodayDateString();

      if (storedData) {
        const parsedData: LimitData = JSON.parse(storedData);
        // If the stored date is today, use the stored count
        if (parsedData.date === today) {
          setGeneratedToday(parsedData.count);
        } else {
          // It's a new day, so reset the count in localStorage
          localStorage.setItem(LIMIT_STORAGE_KEY, JSON.stringify({ count: 0, date: today }));
          setGeneratedToday(0);
        }
      } else {
        // No data exists, so initialize it for today
        localStorage.setItem(LIMIT_STORAGE_KEY, JSON.stringify({ count: 0, date: today }));
        setGeneratedToday(0);
      }
    } catch (error) {
      console.error("Failed to process generation limit from localStorage", error);
      // Fallback to 0 if there's an error
      setGeneratedToday(0);
    }
  }, []);

  /**
   * Records that a number of images have been generated and updates the count
   * both in state and in localStorage.
   * @param count The number of newly generated images.
   */
  const recordGeneration = useCallback((count: number) => {
    const today = getTodayDateString();
    setGeneratedToday(prevGenerated => {
        const newCount = prevGenerated + count;
        try {
            localStorage.setItem(LIMIT_STORAGE_KEY, JSON.stringify({ count: newCount, date: today }));
        } catch (error) {
            console.error("Failed to save updated generation count to localStorage", error);
        }
        return newCount;
    });
  }, []);

  const remainingGenerations = Math.max(0, DAILY_LIMIT - generatedToday);

  return { remainingGenerations, recordGeneration };
};