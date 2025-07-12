import { Timer, Heart, Calendar, Gift, PartyPopper } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CountdownCard } from '@/components/ui/countdown-card'

export function TimersPage() {
  // Sample dates - in a real app, these would be configurable
  const relationshipStart = new Date('2023-01-15T00:00:00')
  const nextMeetup = new Date('2025-02-14T19:00:00')
  const anniversary = new Date('2025-01-15T00:00:00')
  const yourBirthday = new Date('2025-03-22T00:00:00')
  const partnerBirthday = new Date('2025-05-08T00:00:00')
  const vacation = new Date('2025-07-20T00:00:00')

  // Calculate how long you've been together
  const daysTogether = Math.floor((new Date().getTime() - relationshipStart.getTime()) / (1000 * 60 * 60 * 24))
  const yearsTogether = Math.floor(daysTogether / 365)
  const remainingDays = daysTogether % 365

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2 mb-2">
          <Timer className="h-8 w-8 text-primary" />
          Relationship Timers
        </h1>
        <p className="text-gray-600">Track your milestones and count down to special moments</p>
      </div>

      {/* Time Together */}
      <Card className="bg-gradient-to-r from-primary/10 to-burgundy-100 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Heart className="h-6 w-6 text-primary fill-current animate-pulse-heart" />
            Time Together
          </CardTitle>
          <CardDescription>Celebrating your beautiful journey</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 rounded-lg p-4">
              <div className="text-3xl font-bold text-primary">{daysTogether}</div>
              <div className="text-sm text-gray-600">Total Days</div>
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <div className="text-3xl font-bold text-primary">{yearsTogether}</div>
              <div className="text-sm text-gray-600">Years</div>
            </div>
            <div className="bg-white/80 rounded-lg p-4">
              <div className="text-3xl font-bold text-primary">{remainingDays}</div>
              <div className="text-sm text-gray-600">Days This Year</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CountdownCard
            title="Valentine's Date Night"
            targetDate={nextMeetup}
            icon={<Heart className="h-5 w-5 text-red-500" />}
          />
          
          <CountdownCard
            title="Your Birthday"
            targetDate={yourBirthday}
            icon={<Gift className="h-5 w-5 text-blue-500" />}
          />
          
          <CountdownCard
            title="Partner's Birthday"
            targetDate={partnerBirthday}
            icon={<PartyPopper className="h-5 w-5 text-purple-500" />}
          />
          
          <CountdownCard
            title="Summer Vacation"
            targetDate={vacation}
            icon={<Calendar className="h-5 w-5 text-green-500" />}
          />
          
          <CountdownCard
            title="Next Anniversary"
            targetDate={anniversary}
            icon={<Heart className="h-5 w-5 text-primary" />}
          />
        </div>
      </div>

      {/* Special Milestones */}
      <Card>
        <CardHeader>
          <CardTitle>Milestone Tracker</CardTitle>
          <CardDescription>Special relationship milestones you've reached</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">First "I Love You"</span>
              </div>
              <span className="text-sm text-green-700">3 months ago</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">First Trip Together</span>
              </div>
              <span className="text-sm text-green-700">8 months ago</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">One Year Together</span>
              </div>
              <span className="text-sm text-green-700">1 year ago</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-medium">Meeting the Parents</span>
              </div>
              <span className="text-sm text-yellow-700">Coming up</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}