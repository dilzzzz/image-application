
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-12 h-12 border-4 border-t-indigo-500 border-r-indigo-500 border-b-indigo-500 border-l-slate-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-300 font-semibold">Generating your masterpiece...</p>
      <p className="mt-2 text-sm text-gray-400">This can take a moment. Please be patient.</p>
    </div>
  );
};