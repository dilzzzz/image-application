import React from 'react';
import type { HistoryItem } from '../types';

const RegenerateIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.5 19M20 20l-1.5-1.5A9 9 0 003.5 5" />
    </svg>
);

const DeleteIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

interface ImageHistoryItemProps {
  item: HistoryItem;
  onRegenerate: (item: HistoryItem) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
}

export const ImageHistoryItem: React.FC<ImageHistoryItemProps> = ({ item, onRegenerate, onDelete, isLoading }) => {
  return (
    <div className="group bg-slate-800/50 p-4 rounded-lg shadow-md border border-slate-700 flex items-center space-x-4 transition-all hover:border-indigo-500/50 hover:bg-slate-800">
      <div className="flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={item.thumbnailSrc}
          alt={item.prompt}
          className="w-20 h-20 object-cover bg-slate-700 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex-grow min-w-0">
        <p className="text-sm text-gray-200 truncate font-medium" title={item.prompt}>
          {item.prompt}
        </p>
        <div className="flex items-center space-x-2 mt-2">
            <span className="inline-block bg-slate-700 text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                {item.numberOfImages} image{item.numberOfImages > 1 ? 's' : ''}
            </span>
            <span className="inline-block bg-slate-700 text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                {item.aspectRatio}
            </span>
        </div>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
        <button
          onClick={() => onRegenerate(item)}
          disabled={isLoading}
          className="p-2 rounded-full text-slate-300 hover:bg-slate-700 hover:text-white disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
          aria-label="Regenerate"
          title="Regenerate with this prompt"
        >
          <RegenerateIcon />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          disabled={isLoading}
          className="p-2 rounded-full text-slate-300 hover:bg-slate-700 hover:text-red-400 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
          aria-label="Delete from history"
          title="Delete from history"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};