export type Emotion = "happy" | "calm" | "sad" | "anxious" | "angry" | "neutral"

export interface JournalEntry {
  id: string
  date: string
  content: string
  emotion: Emotion
  analysis?: string
  created_at?: string
}

export interface Habit {
  id: string
  name: string
  description?: string
  category: "mindfulness" | "physical" | "social" | "self-care"
  createdAt: string
  completedDates: string[]
}

export interface MoodEntry {
  id?: string
  date: string
  emotion: Emotion
  intensity: number // 1-10
  notes?: string
  created_at?: string
}

export interface Affirmation {
  id: string
  text: string
  emotion: Emotion
}

export interface VideoRecommendation {
  id: string
  title: string
  embedUrl: string
  emotion: Emotion
  category: "meditation" | "music" | "motivation"
}

export interface HabitSuggestion {
  id: string
  name: string
  description: string
  emotion: Emotion
  category: "mindfulness" | "physical" | "social" | "self-care"
}
