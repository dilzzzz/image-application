import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";

type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!process.env.API_KEY) {
    return res.status(500).json({ error: 'API_KEY environment variable not set on the server.' });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const { prompt, numberOfImages, aspectRatio } = req.body as {
    prompt: string;
    numberOfImages: number;
    aspectRatio: AspectRatio;
  };

  if (!prompt || !numberOfImages || !aspectRatio) {
    return res.status(400).json({ error: 'Missing required parameters: prompt, numberOfImages, aspectRatio' });
  }

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt,
      config: {
        numberOfImages,
        outputMimeType: 'image/jpeg',
        aspectRatio,
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      return res.status(400).json({
        error: "This prompt couldn't be processed, likely due to safety filters. Please try describing your image in a different way.",
        isBlocked: true,
      });
    }
    
    const images = response.generatedImages
      .map((img) => {
        if (img.image && img.image.imageBytes) {
          const base64ImageBytes = img.image.imageBytes;
          return {
            src: `data:image/jpeg;base64,${base64ImageBytes}`,
            prompt: prompt,
          };
        }
        return null;
      })
      .filter((img): img is { src: string; prompt: string } => img !== null);

    return res.status(200).json({ images });

  } catch (error) {
    console.error("Error in /api/generate:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return res.status(500).json({ error: `An unexpected error occurred while generating images: ${errorMessage}` });
  }
}