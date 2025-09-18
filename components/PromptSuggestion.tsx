import React from 'react';

const LightbulbIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
);

interface PromptSuggestionProps {
  message: string;
}

export const PromptSuggestion: React.FC<PromptSuggestionProps> = ({ message }) => {
  return (
    <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-lg relative flex items-start" role="alert">
      <LightbulbIcon />
      <div>
        <strong className="font-bold">Prompt Tip</strong>
        <p className="mt-1">{message}</p>
        <p className="mt-3 text-sm text-yellow-400/80">
            <strong>Tip:</strong> Try being more descriptive and focus on the subject and scene. Avoid ambiguous or potentially sensitive terms.
        </p>
      </div>
    </div>
  );
};
