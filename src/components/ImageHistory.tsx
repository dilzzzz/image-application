import React from 'react';
import type { HistoryItem } from '../types';
import { ImageHistoryItem } from './ImageHistoryItem';

interface ImageHistoryProps {
  history: HistoryItem[];
  onRegenerate: (item: HistoryItem) => void;
  onDelete: (id: number) => void;
  onClear: () => void;
  isLoading: boolean;
}

const HistoryIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


export const ImageHistory: React.FC<ImageHistoryProps> = ({ history, onRegenerate, onDelete, onClear, isLoading }) => {
  if (history.length === 0) {
    return null; // Don't render the component if there's no history
  }

  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-200 flex items-center">
          <HistoryIcon />
          Generation History
        </h2>
        <button
          onClick={onClear}
          disabled={isLoading}
          className="text-sm font-medium text-slate-400 hover:text-red-400 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors"
          aria-label="Clear all generation history"
        >
          Clear History
        </button>
      </div>
      <div className="space-y-4">
        {history.map(item => (
          <ImageHistoryItem
            key={item.id}
            item={item}
            onRegenerate={onRegenerate}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};