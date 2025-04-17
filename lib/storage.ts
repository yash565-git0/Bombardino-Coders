"use client"

import { createBrowserClient } from "./supabase"
import type { Habit, JournalEntry, MoodEntry } from "./types"

// Journal Entries
export async function saveJournalEntry(entry: JournalEntry): Promise<void> {
  const supabase = createBrowserClient()

  await supabase.from("journal_entries").insert({
    id: entry.id,
    content: entry.content,
    emotion: entry.emotion,
    analysis: entry.analysis,
    date: entry.date,
  })
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const supabase = createBrowserClient()

  const { data, error } = await supabase.from("journal_entries").select("*").order("date", { ascending: false })

  if (error) {
    console.error("Error fetching journal entries:", error)
    return []
  }

  return data as JournalEntry[]
}

export async function getJournalEntryById(id: string): Promise<JournalEntry | undefined> {
  const supabase = createBrowserClient()

  const { data, error } = await supabase.from("journal_entries").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching journal entry:", error)
    return undefined
  }

  return data as JournalEntry
}

// Habits
export async function saveHabit(habit: Habit): Promise<void> {
  const supabase = createBrowserClient()

  await supabase.from("habits").insert({
    id: habit.id,
    name: habit.name,
    description: habit.description,
    category: habit.category,
    created_at: habit.createdAt,
  })
}

export async function getHabits(): Promise<Habit[]> {
  const supabase = createBrowserClient()

  const { data: habitsData, error: habitsError } = await supabase.from("habits").select("*")

  if (habitsError) {
    console.error("Error fetching habits:", habitsError)
    return []
  }

  // Get habit completions for each habit
  const habits: Habit[] = []

  for (const habit of habitsData) {
    const { data: completionsData, error: completionsError } = await supabase
      .from("habit_completions")
      .select("date")
      .eq("habit_id", habit.id)

    if (completionsError) {
      console.error("Error fetching habit completions:", completionsError)
    }

    habits.push({
      id: habit.id,
      name: habit.name,
      description: habit.description,
      category: habit.category,
      createdAt: habit.created_at,
      completedDates: completionsData?.map((c) => c.date) || [],
    })
  }

  return habits
}

export async function updateHabit(updatedHabit: Habit): Promise<void> {
  const supabase = createBrowserClient()

  await supabase
    .from("habits")
    .update({
      name: updatedHabit.name,
      description: updatedHabit.description,
      category: updatedHabit.category,
    })
    .eq("id", updatedHabit.id)
}

export async function toggleHabitCompletion(habitId: string, date: string): Promise<void> {
  const supabase = createBrowserClient()

  // Check if completion exists
  const { data, error: checkError } = await supabase
    .from("habit_completions")
    .select("id")
    .eq("habit_id", habitId)
    .eq("date", date)
    .single()

  if (checkError && checkError.code !== "PGRST116") {
    // PGRST116 is "no rows returned" error
    console.error("Error checking habit completion:", checkError)
    return
  }

  if (data) {
    // Delete completion if it exists
    const { error: deleteError } = await supabase.from("habit_completions").delete().eq("id", data.id)

    if (deleteError) {
      console.error("Error deleting habit completion:", deleteError)
    }
  } else {
    // Add completion if it doesn't exist
    const { error: insertError } = await supabase.from("habit_completions").insert({
      habit_id: habitId,
      date,
    })

    if (insertError) {
      console.error("Error inserting habit completion:", insertError)
    }
  }
}

export async function deleteHabit(habitId: string): Promise<void> {
  const supabase = createBrowserClient()

  await supabase.from("habits").delete().eq("id", habitId)
}

// Mood Entries
export async function saveMoodEntry(entry: MoodEntry): Promise<void> {
  const supabase = createBrowserClient()

  // Check if entry exists for this date
  const { data, error: checkError } = await supabase.from("mood_entries").select("id").eq("date", entry.date).single()

  if (checkError && checkError.code !== "PGRST116") {
    // PGRST116 is "no rows returned" error
    console.error("Error checking mood entry:", checkError)
  }

  if (data) {
    // Update existing entry
    const { error: updateError } = await supabase
      .from("mood_entries")
      .update({
        emotion: entry.emotion,
        intensity: entry.intensity,
        notes: entry.notes,
      })
      .eq("id", data.id)

    if (updateError) {
      console.error("Error updating mood entry:", updateError)
    }
  } else {
    // Insert new entry
    const { error: insertError } = await supabase.from("mood_entries").insert({
      date: entry.date,
      emotion: entry.emotion,
      intensity: entry.intensity,
      notes: entry.notes,
    })

    if (insertError) {
      console.error("Error inserting mood entry:", insertError)
    }
  }
}

export async function getMoodEntries(): Promise<MoodEntry[]> {
  const supabase = createBrowserClient()

  const { data, error } = await supabase.from("mood_entries").select("*").order("date", { ascending: true })

  if (error) {
    console.error("Error fetching mood entries:", error)
    return []
  }

  return data as MoodEntry[]
}

// Initialize default data
export async function initializeDefaultData(): Promise<void> {
  const supabase = createBrowserClient()

  // Check if habits exist
  const { count, error: countError } = await supabase.from("habits").select("*", { count: "exact", head: true })

  if (countError) {
    console.error("Error checking habits count:", countError)
    return
  }

  // Only initialize if no habits exist
  if (count === 0) {
    const defaultHabits = [
      {
        name: "Drink Water",
        description: "Drink at least 8 glasses of water throughout the day",
        category: "self-care" as const,
        created_at: new Date().toISOString(),
      },
      {
        name: "5-Minute Meditation",
        description: "Take 5 minutes to meditate and center yourself",
        category: "mindfulness" as const,
        created_at: new Date().toISOString(),
      },
      {
        name: "Stretching",
        description: "Do some gentle stretching to release tension",
        category: "physical" as const,
        created_at: new Date().toISOString(),
      },
    ]

    const { error: insertError } = await supabase.from("habits").insert(defaultHabits)

    if (insertError) {
      console.error("Error inserting default habits:", insertError)
    }
  }
}
