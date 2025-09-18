
import React from 'react';

const SparklesIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L13 12l-1.293-1.293a1 1 0 010-1.414L14 7m5 4l-2.293-2.293a1 1 0 00-1.414 0L13 12l1.293 1.293a1 1 0 001.414 0L18 11m-9 9l2.293-2.293a1 1 0 000-1.414L9 12l-1.293 1.293a1 1 0 000 1.414L10 17" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="py-6 bg-slate-900/70 backdrop-blur-sm border-b border-slate-700">
      <div className="container mx-auto px-4 flex items-center justify-center space-x-4">
        <SparklesIcon />
        <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
          AI Image Generator
        </h1>
      </div>
    </header>
  );
};
