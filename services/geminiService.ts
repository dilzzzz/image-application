import type { GeneratedImage, AspectRatio } from '../types';

export const PROMPT_BLOCKED_ERROR_MESSAGE = "This prompt couldn't be processed, likely due to safety filters. Please try describing your image in a different way.";

export const generateImagesFromPrompt = async (
  prompt: string,
  numberOfImages: number,
  aspectRatio: AspectRatio
): Promise<GeneratedImage[]> => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, numberOfImages, aspectRatio }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        if (errorData.isBlocked) {
            throw new Error(PROMPT_BLOCKED_ERROR_MESSAGE);
        }
        throw new Error(errorData.error || 'An error occurred while generating images.');
    }

    const data = await response.json();
    if (!data.images) {
      throw new Error("API response did not contain images.");
    }
    return data.images;
  } catch (error) {
    console.error("Error calling image generation service:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("An unexpected network error occurred.");
  }
};
