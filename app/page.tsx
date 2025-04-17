import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, BarChart2, ListChecks } from "lucide-react"

export default function Home() {
  return (
    <div className="container max-w-5xl py-8 md:py-12 space-y-12 animate-in">
      {/* Hero Section */}
      <section className="text-center space-y-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-primary">Find Your Inner Peace</h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Journal your thoughts, track your mood, and build healthy habits for a more balanced life.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Button asChild size="lg">
            <Link href="/journal">Start Journaling</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/mood-tracker">Track Your Mood</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-background to-accent/30 border-accent/50 shadow-sm transition-all duration-300 hover:shadow-md">
          <CardContent className="p-6 space-y-4">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Journal</h2>
            <p className="text-muted-foreground">
              Express your thoughts and feelings through daily journaling with emotional analysis.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-background to-accent/30 border-accent/50 shadow-sm transition-all duration-300 hover:shadow-md">
          <CardContent className="p-6 space-y-4">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
              <BarChart2 className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Mood Tracker</h2>
            <p className="text-muted-foreground">
              Visualize your emotional patterns over time to gain insights into your mental wellbeing.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-background to-accent/30 border-accent/50 shadow-sm transition-all duration-300 hover:shadow-md">
          <CardContent className="p-6 space-y-4">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
              <ListChecks className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Habit Builder</h2>
            <p className="text-muted-foreground">
              Create and maintain positive habits that support your mental health journey.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Testimonial Section */}
      <section className="bg-accent/30 rounded-lg p-8 text-center">
        <blockquote className="text-lg md:text-xl italic text-muted-foreground">
          "Taking a few minutes each day to journal and track my mood has made a tremendous difference in my mental
          wellbeing."
        </blockquote>
        <p className="mt-4 font-medium">— Sarah, Serene Mind User</p>
      </section>

      {/* CTA Section */}
      <section className="text-center py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Begin Your Wellness Journey Today</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Small steps each day lead to big changes over time. Start your mental wellness practice now.
        </p>
        <Button asChild size="lg">
          <Link href="/journal">Get Started</Link>
        </Button>
      </section>
    </div>
  )
}
