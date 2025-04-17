import type { Affirmation, Emotion, HabitSuggestion, VideoRecommendation } from "./types"

export const affirmations: Record<Emotion, Affirmation[]> = {
  happy: [
    { id: "h1", text: "I radiate joy and positive energy to everyone around me.", emotion: "happy" },
    { id: "h2", text: "My happiness comes from within and I choose to nurture it daily.", emotion: "happy" },
    { id: "h3", text: "I am grateful for all the wonderful things in my life.", emotion: "happy" },
  ],
  calm: [
    { id: "c1", text: "I am centered, peaceful, and grounded.", emotion: "calm" },
    { id: "c2", text: "I release tension and embrace tranquility.", emotion: "calm" },
    { id: "c3", text: "I am in harmony with myself and the world around me.", emotion: "calm" },
  ],
  sad: [
    { id: "s1", text: "It's okay to feel my emotions. They are temporary and will pass.", emotion: "sad" },
    { id: "s2", text: "I am gentle with myself during difficult times.", emotion: "sad" },
    { id: "s3", text: "Each day brings new opportunities for joy and healing.", emotion: "sad" },
  ],
  anxious: [
    { id: "a1", text: "I breathe deeply and release my worries with each exhale.", emotion: "anxious" },
    { id: "a2", text: "I am safe and capable of handling whatever comes my way.", emotion: "anxious" },
    { id: "a3", text: "This moment is temporary, and I have the strength to move through it.", emotion: "anxious" },
  ],
  angry: [
    { id: "r1", text: "I choose to respond with patience rather than react with anger.", emotion: "angry" },
    { id: "r2", text: "I release negative emotions and make space for peace.", emotion: "angry" },
    { id: "r3", text: "I am in control of my emotions and choose calm over conflict.", emotion: "angry" },
  ],
  neutral: [
    { id: "n1", text: "I embrace this moment of balance and clarity.", emotion: "neutral" },
    { id: "n2", text: "I am present and aware of the possibilities each day brings.", emotion: "neutral" },
    { id: "n3", text: "I am exactly where I need to be on my journey.", emotion: "neutral" },
  ],
}

export const videoRecommendations: Record<Emotion, VideoRecommendation[]> = {
  happy: [
    {
      id: "vh1",
      title: "Uplifting Morning Meditation",
      embedUrl: "https://www.youtube.com/embed/Aw71zanwMnY",
      emotion: "happy",
      category: "meditation",
    },
    {
      id: "vh2",
      title: "Happy Instrumental Music",
      embedUrl: "https://www.youtube.com/embed/TGx7VFHom_M",
      emotion: "happy",
      category: "music",
    },
  ],
  calm: [
    {
      id: "vc1",
      title: "Peaceful Meditation for Inner Calm",
      embedUrl: "https://www.youtube.com/embed/O-6f5wQXSu8",
      emotion: "calm",
      category: "meditation",
    },
    {
      id: "vc2",
      title: "Relaxing Nature Sounds",
      embedUrl: "https://www.youtube.com/embed/eKFTSSKCzWA",
      emotion: "calm",
      category: "music",
    },
  ],
  sad: [
    {
      id: "vs1",
      title: "Meditation for Difficult Emotions",
      embedUrl: "https://www.youtube.com/embed/IAM2LpGXAJ8",
      emotion: "sad",
      category: "meditation",
    },
    {
      id: "vs2",
      title: "Comforting Piano Music",
      embedUrl: "https://www.youtube.com/embed/f3NWvUV8MD8",
      emotion: "sad",
      category: "music",
    },
  ],
  anxious: [
    {
      id: "va1",
      title: "Anxiety Relief Meditation",
      embedUrl: "https://www.youtube.com/embed/O-6f5wQXSu8",
      emotion: "anxious",
      category: "meditation",
    },
    {
      id: "va2",
      title: "Calming Anxiety Music",
      embedUrl: "https://www.youtube.com/embed/lFcSrYw-ARY",
      emotion: "anxious",
      category: "music",
    },
  ],
  angry: [
    {
      id: "vr1",
      title: "Meditation for Releasing Anger",
      embedUrl: "https://www.youtube.com/embed/QTsUEOUaWpY",
      emotion: "angry",
      category: "meditation",
    },
    {
      id: "vr2",
      title: "Calming Music for Stress Relief",
      embedUrl: "https://www.youtube.com/embed/lFcSrYw-ARY",
      emotion: "angry",
      category: "music",
    },
  ],
  neutral: [
    {
      id: "vn1",
      title: "Mindfulness Meditation",
      embedUrl: "https://www.youtube.com/embed/ZToicYcHIOU",
      emotion: "neutral",
      category: "meditation",
    },
    {
      id: "vn2",
      title: "Ambient Background Music",
      embedUrl: "https://www.youtube.com/embed/sjkrrmBnpGE",
      emotion: "neutral",
      category: "music",
    },
  ],
}

export const habitSuggestions: Record<Emotion, HabitSuggestion[]> = {
  happy: [
    {
      id: "hsh1",
      name: "Gratitude Journal",
      description: "Write down three things you're grateful for to maintain your positive outlook.",
      emotion: "happy",
      category: "mindfulness",
    },
    {
      id: "hsh2",
      name: "Share Your Joy",
      description: "Reach out to a friend or family member to share something positive.",
      emotion: "happy",
      category: "social",
    },
  ],
  calm: [
    {
      id: "hsc1",
      name: "Deep Breathing",
      description: "Take 5 minutes to practice deep, mindful breathing.",
      emotion: "calm",
      category: "mindfulness",
    },
    {
      id: "hsc2",
      name: "Nature Walk",
      description: "Spend time outdoors connecting with nature.",
      emotion: "calm",
      category: "physical",
    },
  ],
  sad: [
    {
      id: "hss1",
      name: "Self-Compassion Break",
      description: "Take a moment to speak kindly to yourself as you would to a friend.",
      emotion: "sad",
      category: "self-care",
    },
    {
      id: "hss2",
      name: "Gentle Movement",
      description: "Do some light stretching or yoga to release tension.",
      emotion: "sad",
      category: "physical",
    },
  ],
  anxious: [
    {
      id: "hsa1",
      name: "Grounding Exercise",
      description:
        "Practice the 5-4-3-2-1 technique: notice 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste.",
      emotion: "anxious",
      category: "mindfulness",
    },
    {
      id: "hsa2",
      name: "Limit Caffeine",
      description: "Reduce or eliminate caffeine intake to help manage anxiety.",
      emotion: "anxious",
      category: "self-care",
    },
  ],
  angry: [
    {
      id: "hsr1",
      name: "Cool Down Walk",
      description: "Take a brisk walk to release tension and clear your mind.",
      emotion: "angry",
      category: "physical",
    },
    {
      id: "hsr2",
      name: "Journaling",
      description: "Write down your feelings to process them constructively.",
      emotion: "angry",
      category: "mindfulness",
    },
  ],
  neutral: [
    {
      id: "hsn1",
      name: "Mindful Moment",
      description: "Take a moment to be fully present and aware of your surroundings.",
      emotion: "neutral",
      category: "mindfulness",
    },
    {
      id: "hsn2",
      name: "Try Something New",
      description: "Explore a new activity or hobby to engage your mind.",
      emotion: "neutral",
      category: "self-care",
    },
  ],
}

export const defaultHabits = [
  {
    id: "h1",
    name: "Drink Water",
    description: "Drink at least 8 glasses of water throughout the day",
    category: "self-care" as const,
    createdAt: new Date().toISOString(),
    completedDates: [],
  },
  {
    id: "h2",
    name: "5-Minute Meditation",
    description: "Take 5 minutes to meditate and center yourself",
    category: "mindfulness" as const,
    createdAt: new Date().toISOString(),
    completedDates: [],
  },
  {
    id: "h3",
    name: "Stretching",
    description: "Do some gentle stretching to release tension",
    category: "physical" as const,
    createdAt: new Date().toISOString(),
    completedDates: [],
  },
]

// Function to analyze text sentiment (simplified version)
export function analyzeSentiment(text: string): Emotion {
  const text_lower = text.toLowerCase()

  // Simple keyword matching for demonstration
  const emotionKeywords = {
    happy: ["happy", "joy", "excited", "great", "wonderful", "fantastic", "pleased", "delighted"],
    calm: ["calm", "peaceful", "relaxed", "serene", "tranquil", "content", "centered"],
    sad: ["sad", "unhappy", "depressed", "down", "blue", "gloomy", "miserable", "upset"],
    anxious: ["anxious", "worried", "nervous", "stressed", "tense", "uneasy", "afraid", "fearful"],
    angry: ["angry", "frustrated", "annoyed", "irritated", "mad", "furious", "upset", "rage"],
  }

  // Count occurrences of emotion keywords
  const counts: Record<Emotion, number> = {
    happy: 0,
    calm: 0,
    sad: 0,
    anxious: 0,
    angry: 0,
    neutral: 0,
  }

  Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
    keywords.forEach((keyword) => {
      if (text_lower.includes(keyword)) {
        counts[emotion as Emotion] += 1
      }
    })
  })

  // Find the emotion with the highest count
  let maxEmotion: Emotion = "neutral"
  let maxCount = 0

  Object.entries(counts).forEach(([emotion, count]) => {
    if (count > maxCount) {
      maxCount = count
      maxEmotion = emotion as Emotion
    }
  })

  return maxCount > 0 ? maxEmotion : "neutral"
}
