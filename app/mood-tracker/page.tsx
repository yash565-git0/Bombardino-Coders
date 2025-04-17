"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { Emotion, MoodEntry } from "@/lib/types"
import { formatDate, getEmotionIcon } from "@/lib/utils"
import { getMoodEntries, saveMoodEntry } from "@/lib/storage"
import { EmotionBadge } from "@/components/emotion-badge"
import { BarChart2, Plus } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

export default function MoodTrackerPage() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newMood, setNewMood] = useState<{
    emotion: Emotion
    intensity: number
    notes: string
  }>({
    emotion: "neutral",
    intensity: 5,
    notes: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    const fetchMoodEntries = async () => {
      try {
        const storedEntries = await getMoodEntries()
        setMoodEntries(storedEntries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
      } catch (error) {
        console.error("Error fetching mood entries:", error)
        toast({
          title: "Error loading mood data",
          description: "There was a problem loading your mood entries. Please refresh the page.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchMoodEntries()
  }, [toast])

  const handleAddMood = async () => {
    const today = new Date().toISOString().split("T")[0]

    try {
      const entry: MoodEntry = {
        date: today,
        emotion: newMood.emotion,
        intensity: newMood.intensity,
        notes: newMood.notes,
      }

      await saveMoodEntry(entry)

      // Refresh entries
      const updatedEntries = await getMoodEntries()
      setMoodEntries(updatedEntries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))

      // Reset form
      setNewMood({
        emotion: "neutral",
        intensity: 5,
        notes: "",
      })

      setDialogOpen(false)

      toast({
        title: "Mood logged",
        description: "Your mood has been logged successfully.",
      })
    } catch (error) {
      console.error("Error saving mood entry:", error)
      toast({
        title: "Error logging mood",
        description: "There was a problem saving your mood entry. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Prepare data for chart
  const chartData = moodEntries.map((entry) => ({
    date: formatDate(entry.date),
    intensity: entry.intensity,
    emotion: entry.emotion,
  }))

  return (
    <div className="container max-w-4xl py-8 space-y-8 animate-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Mood Tracker</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Log Mood
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How are you feeling today?</DialogTitle>
              <DialogDescription>
                Track your mood to identify patterns and improve your emotional awareness.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Select your mood</Label>
                <RadioGroup
                  value={newMood.emotion}
                  onValueChange={(value) => setNewMood({ ...newMood, emotion: value as Emotion })}
                  className="grid grid-cols-3 gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="happy" id="happy" />
                    <Label htmlFor="happy" className="flex items-center gap-1">
                      {getEmotionIcon("happy")} Happy
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="calm" id="calm" />
                    <Label htmlFor="calm" className="flex items-center gap-1">
                      {getEmotionIcon("calm")} Calm
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="neutral" id="neutral" />
                    <Label htmlFor="neutral" className="flex items-center gap-1">
                      {getEmotionIcon("neutral")} Neutral
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sad" id="sad" />
                    <Label htmlFor="sad" className="flex items-center gap-1">
                      {getEmotionIcon("sad")} Sad
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="anxious" id="anxious" />
                    <Label htmlFor="anxious" className="flex items-center gap-1">
                      {getEmotionIcon("anxious")} Anxious
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="angry" id="angry" />
                    <Label htmlFor="angry" className="flex items-center gap-1">
                      {getEmotionIcon("angry")} Angry
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <Label htmlFor="intensity">Intensity (1-10)</Label>
                  <span className="text-sm">{newMood.intensity}</span>
                </div>
                <Slider
                  id="intensity"
                  min={1}
                  max={10}
                  step={1}
                  value={[newMood.intensity]}
                  onValueChange={(value) => setNewMood({ ...newMood, intensity: value[0] })}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Intense</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="What's contributing to your mood today?"
                  value={newMood.notes}
                  onChange={(e) => setNewMood({ ...newMood, notes: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMood}>Save Mood</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Mood Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5" />
            Mood Trends
          </CardTitle>
          <CardDescription>
            Visualize your emotional patterns over time to gain insights into your mental wellbeing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading your mood data...</p>
            </div>
          ) : moodEntries.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">You haven't logged any moods yet.</p>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Log Your First Mood
              </Button>
            </div>
          ) : (
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  intensity: {
                    label: "Mood Intensity",
                    color: "hsl(var(--primary))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} tickFormatter={(value) => value.split(",")[0]} />
                    <YAxis domain={[0, 10]} />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">Date</span>
                                  <span className="font-bold text-sm">{data.date}</span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">Intensity</span>
                                  <span className="font-bold text-sm">{data.intensity}</span>
                                </div>
                                <div className="flex flex-col col-span-2">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">Emotion</span>
                                  <span className="font-bold text-sm flex items-center gap-1">
                                    {getEmotionIcon(data.emotion as Emotion)}
                                    {data.emotion.charAt(0).toUpperCase() + data.emotion.slice(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="intensity"
                      stroke="var(--color-intensity)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Moods */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Moods</h2>

        {loading ? (
          <Card className="bg-muted/50">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Loading your mood entries...</p>
            </CardContent>
          </Card>
        ) : moodEntries.length === 0 ? (
          <Card className="bg-muted/50">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                No mood entries yet. Start tracking to see your emotional patterns.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...moodEntries]
              .reverse()
              .slice(0, 6)
              .map((entry) => (
                <Card key={entry.date} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{formatDate(entry.date)}</CardTitle>
                      <EmotionBadge emotion={entry.emotion} />
                    </div>
                    <CardDescription>Intensity: {entry.intensity}/10</CardDescription>
                  </CardHeader>
                  {entry.notes && (
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{entry.notes}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
