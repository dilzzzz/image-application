
export interface GeneratedImage {
  src: string;
  prompt: string;
}

export type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";

export interface HistoryItem {
  id: number; // Using timestamp for a unique ID
  prompt: string;
  numberOfImages: number;
  aspectRatio: AspectRatio;
  thumbnailSrc: string; // src of the first generated image
}