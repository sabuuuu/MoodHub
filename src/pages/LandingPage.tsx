import { Link } from 'react-router-dom'
import { Heart, Users, Camera, MessageCircle, Calendar, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-burgundy-50 to-pink-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <Heart className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse-heart" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your Relationship
            <span className="text-primary block">Hub</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Track your moods, share memories, plan dates, and strengthen your bond with the 
            ultimate relationship companion for couples.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-3">
                Create Your MoodHub
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 opacity-20 animate-float">
          <Heart className="h-8 w-8 text-primary fill-current" />
        </div>
        <div className="absolute top-40 right-20 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
          <Heart className="h-6 w-6 text-primary fill-current" />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
          <Heart className="h-10 w-10 text-primary fill-current" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to nurture your relationship
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From tracking moods to planning perfect dates, MoodHub brings couples closer together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
              <CardHeader>
                <MessageCircle className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Love Letters</CardTitle>
                <CardDescription>
                  Write and send beautiful love letters to your partner with our rich editor
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
              <CardHeader>
                <Camera className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Memory Gallery</CardTitle>
                <CardDescription>
                  Store and share your favorite photos and memories in a beautiful gallery
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
              <CardHeader>
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Date Ideas</CardTitle>
                <CardDescription>
                  Plan amazing dates together with our curated ideas and voting system
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
              <CardHeader>
                <Timer className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Relationship Timers</CardTitle>
                <CardDescription>
                  Count down to special moments and track relationship milestones
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
              <CardHeader>
                <Heart className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Mood Tracking</CardTitle>
                <CardDescription>
                  Monitor your relationship health with beautiful mood charts and insights
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
              <CardHeader>
                <Users className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Partner Connection</CardTitle>
                <CardDescription>
                  Invite your partner and create a shared space for your relationship
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-burgundy-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to strengthen your relationship?
          </h2>
          <p className="text-xl text-burgundy-100 mb-8 max-w-2xl mx-auto">
            Join thousands of couples who are building stronger, happier relationships with MoodHub.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Get Started For Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}