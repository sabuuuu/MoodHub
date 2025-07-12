import { Heart, Calendar, Camera, MessageCircle, Timer, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MoodChart } from '@/components/ui/mood-chart'
import { CountdownCard } from '@/components/ui/countdown-card'
import { Link } from 'react-router-dom'

export function DashboardPage() {
  const watchlist = [
    { title: 'The Notebook', type: 'Movie', status: 'watching' },
    { title: 'Friends', type: 'TV Show', status: 'plan-to-watch' },
    { title: 'Pride and Prejudice', type: 'Movie', status: 'completed' },
  ]

  const nextMeetup = new Date('2025-02-01T19:00:00')
  const anniversary = new Date('2025-06-15T00:00:00')

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your MoodHub Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening in your relationship.</p>
        </div>
        <Heart className="h-8 w-8 text-primary fill-current animate-pulse-heart" />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Together For</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 years</div>
            <p className="text-xs text-muted-foreground">734 days and counting</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shared Memories</CardTitle>
            <Camera className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Love Letters</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">2 unread</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Date Ideas</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">3 favorites</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shared Watchlist */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Shared Watchlist
            </CardTitle>
            <CardDescription>Your current movies and shows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {watchlist.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.type}</p>
                  </div>
                  <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                    {item.status === 'watching' ? 'Watching' : 
                     item.status === 'plan-to-watch' ? 'Plan to Watch' : 'Completed'}
                  </Badge>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              Add to Watchlist
            </Button>
          </CardContent>
        </Card>

        {/* Mood Chart Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              This Week's Mood
            </CardTitle>
            <CardDescription>Your relationship happiness levels</CardDescription>
          </CardHeader>
          <CardContent>
            <MoodChart />
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Average mood: 8.1/10</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Countdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CountdownCard
          title="Next Date Night"
          targetDate={nextMeetup}
          icon={<Calendar className="h-5 w-5" />}
        />
        <CountdownCard
          title="Anniversary"
          targetDate={anniversary}
          icon={<Heart className="h-5 w-5" />}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump into your favorite MoodHub features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/letters">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <MessageCircle className="h-6 w-6" />
                <span>Write Letter</span>
              </Button>
            </Link>
            <Link to="/memories">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <Camera className="h-6 w-6" />
                <span>Add Memory</span>
              </Button>
            </Link>
            <Link to="/date-ideas">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>Plan Date</span>
              </Button>
            </Link>
            <Link to="/timers">
              <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                <Timer className="h-6 w-6" />
                <span>View Timers</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}