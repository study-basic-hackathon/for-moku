import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const eventContainerClass = cn(
  "flex flex-col justify-start items-center",
  "border border-gray-900 mx-2 rounded-lg p-4 m-4 gap-4 h-full"
); 