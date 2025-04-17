import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Emotion } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatShortDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

export function getEmotionColor(emotion: Emotion): string {
  switch (emotion) {
    case "happy":
      return "bg-mood-happy text-black"
    case "calm":
      return "bg-mood-calm text-white"
    case "sad":
      return "bg-mood-sad text-white"
    case "anxious":
      return "bg-mood-anxious text-black"
    case "angry":
      return "bg-mood-angry text-white"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export function getEmotionIcon(emotion: Emotion) {
  switch (emotion) {
    case "happy":
      return "😊"
    case "calm":
      return "😌"
    case "sad":
      return "😔"
    case "anxious":
      return "😰"
    case "angry":
      return "😠"
    default:
      return "😐"
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}
