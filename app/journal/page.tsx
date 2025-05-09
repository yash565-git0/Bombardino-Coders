"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { JournalEntry } from "@/lib/types"
import { formatDate } from "@/lib/utils"
import { getJournalEntries, saveJournalEntry } from "@/lib/storage"
import { analyzeJournalSentiment } from "@/lib/actions"
import { EmotionBadge } from "@/components/emotion-badge"
import { PenLine, Plus } from "lucide-react"

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [newEntry, setNewEntry] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchEntries = async () => {
      const storedEntries = await getJournalEntries()
      setEntries(storedEntries)
    }

    fetchEntries()
  }, [])

  const handleSubmit = async () => {
    if (!newEntry.trim()) return

    setIsSubmitting(true)

    try {
      // Analyze sentiment using Grok AI
      const { emotion, analysis } = await analyzeJournalSentiment(newEntry)

      // Create new entry with UUID generated by Supabase
      const entry: Omit<JournalEntry, "id"> = {
        date: new Date().toISOString(),
        content: newEntry,
        emotion,
        analysis,
      }

      // Save entry
      await saveJournalEntry(entry as JournalEntry)

      // Refresh entries
      const updatedEntries = await getJournalEntries()
      setEntries(updatedEntries)

      setNewEntry("")
      toast({
        title: "Journal entry saved",
        description: "Your journal entry has been saved and analyzed.",
      })
    } catch (error) {
      console.error("Error saving journal entry:", error)
      toast({
        title: "Error saving entry",
        description: "There was a problem saving your journal entry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-4xl py-8 space-y-8 animate-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Journal</h1>
      </div>

      {/* New Entry Form */}
      <Card className="bg-card border-accent/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenLine className="h-5 w-5" />
            New Entry
          </CardTitle>
          <CardDescription>
            Write your thoughts and feelings. We'll use AI to analyze your entry and help you understand your emotions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="How are you feeling today?"
            className="min-h-[150px] resize-none"
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSubmit} disabled={!newEntry.trim() || isSubmitting}>
            {isSubmitting ? "Analyzing..." : "Save Entry"}
          </Button>
        </CardFooter>
      </Card>

      {/* Journal Entries List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Entries</h2>

        {entries.length === 0 ? (
          <Card className="bg-muted/50">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                No journal entries yet. Start writing to track your emotional journey.
              </p>
              <Button variant="link" className="mt-2" onClick={() => document.querySelector("textarea")?.focus()}>
                <Plus className="h-4 w-4 mr-1" />
                Create your first entry
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {entries.map((entry) => (
              <Card key={entry.id} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{formatDate(entry.date)}</CardTitle>
                    <EmotionBadge emotion={entry.emotion} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-muted-foreground">{entry.content}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/journal/${entry.id}`}>View Analysis</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
