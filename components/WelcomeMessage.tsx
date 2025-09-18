
import React from 'react';

const PaintBrushIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

export const WelcomeMessage: React.FC = () => {
    return (
        <div className="text-center py-16 px-6 bg-slate-800/30 border-2 border-dashed border-slate-700 rounded-2xl">
            <PaintBrushIcon />
            <h2 className="mt-6 text-2xl font-bold text-gray-200">Your Canvas is Ready</h2>
            <p className="mt-2 text-lg text-gray-400">
                Use the form above to describe the image you want to create. Let your imagination run wild!
            </p>
        </div>
    );
};
