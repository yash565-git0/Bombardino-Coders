"use server"

import { xai } from "@ai-sdk/xai"
import { generateText } from "ai"
import { createServerClient } from "./supabase"
import type { Emotion, JournalEntry } from "./types"

// Update the analyzeJournalSentiment function to handle markdown-formatted responses

export async function analyzeJournalSentiment(content: string): Promise<{
  emotion: Emotion
  analysis: string
}> {
  try {
    const prompt = `
      Analyze the following journal entry and determine the primary emotion expressed.
      Choose exactly one emotion from this list: happy, calm, sad, anxious, angry, neutral.
      Also provide a brief analysis (2-3 sentences) of the emotional state reflected in the entry.
      
      Journal entry: "${content}"
      
      Return your response in JSON format with two fields:
      - emotion: the primary emotion (one of: happy, calm, sad, anxious, angry, neutral)
      - analysis: brief analysis of the emotional state
      
      IMPORTANT: Return ONLY the JSON object without any markdown formatting, code blocks, or additional text.
    `

    const { text } = await generateText({
      model: xai("grok-2"),
      prompt,
    })

    // Extract JSON from the response, handling potential markdown formatting
    let jsonStr = text.trim()

    // Check if the response is wrapped in markdown code blocks
    const jsonMatch = jsonStr.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (jsonMatch && jsonMatch[1]) {
      jsonStr = jsonMatch[1].trim()
    }

    // Parse the JSON response
    const result = JSON.parse(jsonStr)

    return {
      emotion: result.emotion as Emotion,
      analysis: result.analysis,
    }
  } catch (error) {
    console.error("Error analyzing sentiment:", error)
    // Fallback to a default response if the AI fails
    return {
      emotion: "neutral",
      analysis: "Unable to analyze sentiment. Please try again later.",
    }
  }
}

// Save journal entry to Supabase
export async function saveJournalEntryToDb(entry: Omit<JournalEntry, "id">): Promise<JournalEntry> {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("journal_entries")
    .insert({
      content: entry.content,
      emotion: entry.emotion,
      analysis: entry.analysis,
      date: entry.date,
    })
    .select()
    .single()

  if (error) {
    console.error("Error saving journal entry:", error)
    throw new Error("Failed to save journal entry")
  }

  return data as JournalEntry
}

// Get journal entries from Supabase
export async function getJournalEntriesFromDb(): Promise<JournalEntry[]> {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("journal_entries").select("*").order("date", { ascending: false })

  if (error) {
    console.error("Error fetching journal entries:", error)
    return []
  }

  return data as JournalEntry[]
}

// Get a single journal entry by ID
export async function getJournalEntryByIdFromDb(id: string): Promise<JournalEntry | null> {
  const supabase = createServerClient()

  const { data, error } = await supabase.from("journal_entries").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching journal entry:", error)
    return null
  }

  return data as JournalEntry
}
