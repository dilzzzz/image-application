import React, { useState, forwardRef, useImperativeHandle } from 'react';
import type { AspectRatio } from '../types';

interface ImagePromptFormProps {
  onGenerate: (prompt: string, numImages: number, aspectRatio: AspectRatio) => void;
  isLoading: boolean;
  remainingGenerations: number;
}

interface FormHandle {
  setFormValues: (values: { prompt: string; numImages: number; aspectRatio: AspectRatio }) => void;
}

const aspectRatios: AspectRatio[] = ["1:1", "16:9", "9:16", "4:3", "3:4"];
const numImageOptions = [1, 2, 3, 4];

const GenerateIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1-1-1 1-2-2-3 3V5z" />
        <path d="M15 11a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
);

export const ImagePromptForm = forwardRef<FormHandle, ImagePromptFormProps>(({ onGenerate, isLoading, remainingGenerations }, ref) => {
  const [prompt, setPrompt] = useState<string>('');
  const [numImages, setNumImages] = useState<number>(2);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');

  useImperativeHandle(ref, () => ({
    setFormValues: (values) => {
      setPrompt(values.prompt);
      setNumImages(values.numImages);
      setAspectRatio(values.aspectRatio);
    }
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt, numImages, aspectRatio);
    }
  };

  const hasReachedLimit = remainingGenerations <= 0;
  const willExceedLimit = numImages > remainingGenerations;

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl shadow-lg border border-slate-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
            Describe the image you want to create
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A majestic lion wearing a crown, cinematic lighting, hyperrealistic"
            rows={4}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder-gray-400"
            disabled={isLoading || hasReachedLimit}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="numImages" className="block text-sm font-medium text-gray-300 mb-2">
              Number of Images
            </label>
            <select
              id="numImages"
              value={numImages}
              onChange={(e) => setNumImages(Number(e.target.value))}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              disabled={isLoading || hasReachedLimit}
            >
              {numImageOptions.map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="aspectRatio" className="block text-sm font-medium text-gray-300 mb-2">
              Aspect Ratio
            </label>
            <select
              id="aspectRatio"
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              disabled={isLoading || hasReachedLimit}
            >
              {aspectRatios.map(ratio => <option key={ratio} value={ratio}>{ratio}</option>)}
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !prompt.trim() || willExceedLimit || hasReachedLimit}
          className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          {isLoading ? 'Generating...' : <> <GenerateIcon /> Generate Images </>}
        </button>

        <div className="text-center text-sm text-slate-400 pt-2">
          {hasReachedLimit ? (
            <p className="font-bold text-yellow-400">You have reached your daily generation limit.</p>
          ) : (
            <p>You have <span className="font-bold text-indigo-400">{remainingGenerations}</span> image generation{remainingGenerations !== 1 ? 's' : ''} left today.</p>
          )}
        </div>
      </form>
    </div>
  );
});