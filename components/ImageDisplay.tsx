import React from 'react';
import type { GeneratedImage } from '../types';

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const ShareIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
    </svg>
);


interface ImageCardProps {
  image: GeneratedImage;
  downloadFilename: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, downloadFilename }) => {
    const canShare = typeof navigator !== 'undefined' && !!navigator.share;

    const handleShare = async () => {
        if (!canShare) {
            console.warn("Web Share API not supported in this browser.");
            return;
        }

        try {
            const response = await fetch(image.src);
            const blob = await response.blob();
            const file = new File([blob], downloadFilename, { type: blob.type });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: 'AI Generated Image',
                    text: `Check out this image I created: "${image.prompt}"`,
                    files: [file],
                });
            } else {
                console.warn("Sharing this file type is not supported.");
            }
        } catch (error) {
            if ((error as DOMException).name !== 'AbortError') {
                console.error("Error sharing the image:", error);
            }
        }
    };

    const handleDownload = () => {
        if (window.confirm("Are you sure you want to download this image?")) {
            const link = document.createElement('a');
            link.href = image.src;
            link.download = downloadFilename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="group relative overflow-hidden rounded-xl shadow-lg border border-slate-700 bg-slate-800 transition-transform duration-300 hover:scale-105 hover:shadow-indigo-500/30">
            <img src={image.src} alt={image.prompt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <p className="text-sm text-gray-200 mb-4 line-clamp-3">{image.prompt}</p>
                 <div className="self-end flex items-center gap-2">
                    {canShare && (
                        <button
                            onClick={handleShare}
                            className="inline-flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                            aria-label="Share this image"
                            title="Share this image"
                        >
                            <ShareIcon />
                            Share
                        </button>
                    )}
                    <button
                        onClick={handleDownload}
                        className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                        aria-label="Download this image"
                        title="Download this image"
                    >
                        <DownloadIcon />
                        Download
                    </button>
                </div>
            </div>
        </div>
    );
}

interface ImageDisplayProps {
  images: GeneratedImage[];
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ images }) => {
  // Generate a single timestamp for the entire batch of images to ensure consistent filenames.
  // This will be recalculated only when the `images` array itself changes.
  const batchTimestamp = React.useMemo(() => Date.now(), [images]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {images.map((image, index) => {
        const downloadFilename = `ai-image-${batchTimestamp}-${index}.jpeg`;
        return <ImageCard key={index} image={image} downloadFilename={downloadFilename} />;
      })}
    </div>
  );
};