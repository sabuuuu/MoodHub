import { useState } from 'react'
import { Plus, MessageSquare, CheckCircle, XCircle, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function ComplaintsPage() {
  const [showForm, setShowForm] = useState(false)
  const [complaint, setComplaint] = useState('')
  const [moodLevel, setMoodLevel] = useState([5])
  const [category, setCategory] = useState('')
  const [suggestedApology, setSuggestedApology] = useState('')

  const complaints = [
    {
      id: 1,
      title: 'Left dishes in sink again',
      content: 'The kitchen was a mess when I got home. We agreed to clean as we go!',
      moodLevel: 3,
      category: 'Chores',
      suggestedApology: 'Cook their favorite meal',
      status: 'resolved',
      date: '2025-01-14',
      resolution: 'Apologized and set up a cleaning schedule',
    },
    {
      id: 2,
      title: 'Forgot our date night',
      content: 'Had plans to watch a movie together but they made other plans with friends.',
      moodLevel: 2,
      category: 'Quality Time',
      suggestedApology: 'Plan a special surprise date',
      status: 'pending',
      date: '2025-01-12',
    },
    {
      id: 3,
      title: 'Not listening during conversations',
      content: 'I was trying to tell them about my day but they were on their phone the whole time.',
      moodLevel: 4,
      category: 'Communication',
      suggestedApology: 'Have a phone-free dinner',
      status: 'in-progress',
      date: '2025-01-10',
      resolution: 'Talked about it, working on better attention',
    },
  ]

  const handleSubmit = () => {
    if (complaint.trim() && category) {
      // In a real app, this would save to Supabase
      console.log('New complaint:', {
        complaint,
        moodLevel: moodLevel[0],
        category,
        suggestedApology,
      })
      setComplaint('')
      setMoodLevel([5])
      setCategory('')
      setSuggestedApology('')
      setShowForm(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-red-100 text-red-800'
    }
  }

  const getMoodColor = (level: number) => {
    if (level <= 3) return 'text-red-500'
    if (level <= 6) return 'text-yellow-500'
    return 'text-green-500'
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-primary" />
            Relationship Complaints
          </h1>
          <p className="text-gray-600 mt-1">A lighthearted way to address relationship hiccups</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Complaint
        </Button>
      </div>

      {/* Complaint Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>File a New Complaint</CardTitle>
            <CardDescription>What's bugging you? Let's track it with humor!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="What type of complaint is this?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Chores">Chores</SelectItem>
                  <SelectItem value="Communication">Communication</SelectItem>
                  <SelectItem value="Quality Time">Quality Time</SelectItem>
                  <SelectItem value="Habits">Habits</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="complaint">What happened?</Label>
              <Textarea
                id="complaint"
                placeholder="Describe the issue..."
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-3">
              <Label>Mood Level (1-10)</Label>
              <div className="px-2">
                <Slider
                  value={moodLevel}
                  onValueChange={setMoodLevel}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>1 (Very Upset)</span>
                  <span className={`font-medium ${getMoodColor(moodLevel[0])}`}>
                    {moodLevel[0]}
                  </span>
                  <span>10 (Just Annoyed)</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apology">Suggested Apology/Resolution</Label>
              <Input
                id="apology"
                placeholder="How should they make it up to you?"
                value={suggestedApology}
                onChange={(e) => setSuggestedApology(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button 
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90"
              >
                File Complaint
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Complaints List */}
      <div className="space-y-4">
        {complaints.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {item.title}
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1 capitalize">{item.status.replace('-', ' ')}</span>
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {item.category} • {new Date(item.date).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Mood Level</div>
                  <div className={`text-2xl font-bold ${getMoodColor(item.moodLevel)}`}>
                    {item.moodLevel}/10
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{item.content}</p>
              
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <h4 className="font-medium text-gray-900 mb-1">Suggested Apology:</h4>
                <p className="text-gray-700">{item.suggestedApology}</p>
              </div>
              
              {item.resolution && (
                <div className="bg-green-50 rounded-lg p-3">
                  <h4 className="font-medium text-green-900 mb-1">Resolution:</h4>
                  <p className="text-green-700">{item.resolution}</p>
                </div>
              )}
              
              {item.status === 'pending' && (
                <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
                  <Button size="sm" variant="outline">
                    Mark as Resolved
                  </Button>
                  <Button size="sm" variant="outline">
                    In Progress
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {complaints.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No complaints yet</h3>
            <p className="text-gray-600 mb-4">Everything's perfect! Or file your first complaint to get started.</p>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-primary hover:bg-primary/90"
            >
              File Your First Complaint
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}