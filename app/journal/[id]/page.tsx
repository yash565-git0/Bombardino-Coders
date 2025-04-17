"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Affirmation, HabitSuggestion, JournalEntry, VideoRecommendation } from "@/lib/types"
import { affirmations, habitSuggestions, videoRecommendations } from "@/lib/data"
import { formatDate } from "@/lib/utils"
import { getJournalEntryById } from "@/lib/storage"
import { EmotionBadge } from "@/components/emotion-badge"
import { ArrowLeft, MessageSquareQuote, PlayCircle, ListChecks } from "lucide-react"

export default function JournalEntryPage() {
  const router = useRouter()
  const { id } = useParams()
  const [entry, setEntry] = useState<JournalEntry | null>(null)
  const [entryAffirmations, setEntryAffirmations] = useState<Affirmation[]>([])
  const [entryVideos, setEntryVideos] = useState<VideoRecommendation[]>([])
  const [entryHabits, setEntryHabits] = useState<HabitSuggestion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEntry = async () => {
      if (typeof id !== "string") return

      try {
        const journalEntry = await getJournalEntryById(id)
        if (!journalEntry) {
          router.push("/journal")
          return
        }

        setEntry(journalEntry)

        // Get recommendations based on emotion
        if (journalEntry.emotion) {
          setEntryAffirmations(affirmations[journalEntry.emotion])
          setEntryVideos(videoRecommendations[journalEntry.emotion])
          setEntryHabits(habitSuggestions[journalEntry.emotion])
        }
      } catch (error) {
        console.error("Error fetching journal entry:", error)
        router.push("/journal")
      } finally {
        setLoading(false)
      }
    }

    fetchEntry()
  }, [id, router])

  if (loading) {
    return (
      <div className="container py-8 flex justify-center">
        <div className="animate-pulse text-center">
          <p>Loading your journal entry...</p>
        </div>
      </div>
    )
  }

  if (!entry) {
    return <div className="container py-8">Entry not found</div>
  }

  return (
    <div className="container max-w-4xl py-8 space-y-8 animate-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/journal">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Journal Entry</h1>
      </div>

      {/* Journal Entry */}
      <Card className="bg-card border-accent/50">
        <CardHeader>
          <div className="flex flex-wrap justify-between items-center gap-2">
            <CardTitle>{formatDate(entry.date)}</CardTitle>
            <EmotionBadge emotion={entry.emotion} />
          </div>
          <CardDescription>Based on your entry, we've detected that you're feeling {entry.emotion}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/30 p-4 rounded-md whitespace-pre-wrap">{entry.content}</div>

          {/* AI Analysis */}
          {entry.analysis && (
            <div>
              <h3 className="text-sm font-medium mb-2">AI Analysis:</h3>
              <div className="bg-primary/5 p-4 rounded-md text-sm italic">{entry.analysis}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Tabs defaultValue="affirmations">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="affirmations" className="flex items-center gap-1">
            <MessageSquareQuote className="h-4 w-4" />
            <span className="hidden sm:inline">Affirmations</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="flex items-center gap-1">
            <PlayCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Videos</span>
          </TabsTrigger>
          <TabsTrigger value="habits" className="flex items-center gap-1">
            <ListChecks className="h-4 w-4" />
            <span className="hidden sm:inline">Habits</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="affirmations" className="space-y-4">
          <h2 className="text-xl font-semibold">Affirmations for You</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {entryAffirmations.map((affirmation) => (
              <Card key={affirmation.id} className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <p className="text-lg italic">"{affirmation.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <h2 className="text-xl font-semibold">Recommended Videos</h2>
          <div className="grid gap-6">
            {entryVideos.map((video) => (
              <Card key={video.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{video.title}</CardTitle>
                  <CardDescription>{video.category.charAt(0).toUpperCase() + video.category.slice(1)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full rounded-md"
                      src={video.embedUrl}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="habits" className="space-y-4">
          <h2 className="text-xl font-semibold">Suggested Habits</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {entryHabits.map((habit) => (
              <Card key={habit.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{habit.name}</CardTitle>
                  <CardDescription>{habit.category.charAt(0).toUpperCase() + habit.category.slice(1)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{habit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <Button asChild>
              <Link href="/habits">
                <ListChecks className="h-4 w-4 mr-2" />
                Go to Habit Tracker
              </Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
