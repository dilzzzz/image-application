import { useState, useEffect, useCallback } from 'react';
import type { HistoryItem, AspectRatio, GeneratedImage } from '../types';

const HISTORY_STORAGE_KEY = 'ai-image-generator-history';
const MAX_HISTORY_ITEMS = 50;

export const useImageHistory = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to parse history from localStorage", error);
      setHistory([]);
    }
  }, []);

  const updateLocalStorage = (newHistory: HistoryItem[]) => {
    try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
    } catch (error) {
        console.error("Failed to save history to localStorage", error);
    }
  };

  const addHistoryItem = useCallback((prompt: string, numberOfImages: number, aspectRatio: AspectRatio, images: GeneratedImage[]) => {
    if (images.length === 0) return;
    
    const newHistoryItem: HistoryItem = {
      id: Date.now(),
      prompt,
      numberOfImages,
      aspectRatio,
      thumbnailSrc: images[0].src,
    };

    setHistory(prevHistory => {
      // Avoid adding duplicates based on the exact same prompt and settings
      const isDuplicate = prevHistory.some(item => item.prompt === prompt && item.numberOfImages === numberOfImages && item.aspectRatio === aspectRatio);
      if(isDuplicate) return prevHistory;

      const updatedHistory = [newHistoryItem, ...prevHistory].slice(0, MAX_HISTORY_ITEMS);
      updateLocalStorage(updatedHistory);
      return updatedHistory;
    });
  }, []);

  const deleteHistoryItem = useCallback((id: number) => {
    setHistory(prevHistory => {
      const updatedHistory = prevHistory.filter(item => item.id !== id);
      updateLocalStorage(updatedHistory);
      return updatedHistory;
    });
  }, []);
  
  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  }, []);

  return { history, addHistoryItem, deleteHistoryItem, clearHistory };
};