import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = array.slice(); // create a copy
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const randomizedSubset = <T>(dataset: T[]): T[] => {
  const shuffled = shuffleArray(dataset);
  return shuffled.slice(0, Math.floor(shuffled.length * 0.7));
};
