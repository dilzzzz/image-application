import React, { useState, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { ImagePromptForm } from './components/ImagePromptForm';
import { ImageDisplay } from './components/ImageDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { WelcomeMessage } from './components/WelcomeMessage';
import { PromptSuggestion } from './components/PromptSuggestion';
import { ImageHistory } from './components/ImageHistory';
import { generateImagesFromPrompt, PROMPT_BLOCKED_ERROR_MESSAGE } from './services/geminiService';
import { useImageHistory } from './hooks/useImageHistory';
import type { GeneratedImage, AspectRatio, HistoryItem } from './types';

interface FormHandle {
  setFormValues: (values: { prompt: string; numImages: number; aspectRatio: AspectRatio }) => void;
}

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const { history, addHistoryItem, deleteHistoryItem, clearHistory } = useImageHistory();
  const formRef = useRef<FormHandle>(null);

  const handleGenerateImages = useCallback(async (prompt: string, numImages: number, aspectRatio: AspectRatio) => {
    setIsLoading(true);
    setError(null);
    setImages([]);

    try {
      const generatedImages = await generateImagesFromPrompt(prompt, numImages, aspectRatio);
      setImages(generatedImages);
      addHistoryItem(prompt, numImages, aspectRatio, generatedImages);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred. Please try again.');
      }
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  }, [addHistoryItem]);

  const handleRegenerateFromHistory = useCallback((item: HistoryItem) => {
    if (isLoading) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    formRef.current?.setFormValues({
      prompt: item.prompt,
      numImages: item.numberOfImages,
      aspectRatio: item.aspectRatio,
    });
  }, [isLoading]);

  const handleDeleteHistoryItem = useCallback((id: number) => {
    if (isLoading) return;
    deleteHistoryItem(id);
  }, [isLoading, deleteHistoryItem]);

  const handleClearHistory = useCallback(() => {
    if (isLoading) return;
    if (window.confirm('Are you sure you want to clear your entire generation history? This action cannot be undone.')) {
        clearHistory();
    }
  }, [isLoading, clearHistory]);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <ImagePromptForm ref={formRef} onGenerate={handleGenerateImages} isLoading={isLoading} />
          
          <div className="mt-12">
            {isLoading && <LoadingSpinner />}
            {error && error === PROMPT_BLOCKED_ERROR_MESSAGE && <PromptSuggestion message={error} />}
            {error && error !== PROMPT_BLOCKED_ERROR_MESSAGE && <ErrorMessage message={error} />}
            {!isLoading && !error && images.length > 0 && <ImageDisplay images={images} />}
            {!isLoading && !error && images.length === 0 && <WelcomeMessage />}
          </div>

          <ImageHistory
            history={history}
            onRegenerate={handleRegenerateFromHistory}
            onDelete={handleDeleteHistoryItem}
            onClear={handleClearHistory}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
