import { useState } from 'react'
import { Heart, Send, Mail, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'

export function LettersPage() {
  const [newLetter, setNewLetter] = useState('')
  const [subject, setSubject] = useState('')
  const [sendAsEmail, setSendAsEmail] = useState(false)
  const [showEditor, setShowEditor] = useState(false)

  const letters = [
    {
      id: 1,
      subject: 'Missing You',
      content: 'My dearest love, I was just thinking about you and couldn\'t help but smile. Your laugh echoes in my mind, and I can\'t wait to hold you again...',
      date: '2025-01-15',
      from: 'You',
      read: true,
    },
    {
      id: 2,
      subject: 'Thank You for Everything',
      content: 'I wanted to take a moment to tell you how grateful I am for everything you do. Your kindness, your patience, and your love mean the world to me...',
      date: '2025-01-12',
      from: 'Partner',
      read: false,
    },
    {
      id: 3,
      subject: 'Our Adventure',
      content: 'Remember when we got lost on that hiking trail? At first I was worried, but then I realized - being lost with you is better than being found with anyone else...',
      date: '2025-01-08',
      from: 'You',
      read: true,
    },
  ]

  const handleSendLetter = () => {
    if (newLetter.trim() && subject.trim()) {
      // In a real app, this would save to Supabase
      console.log('Sending letter:', { subject, content: newLetter, sendAsEmail })
      setNewLetter('')
      setSubject('')
      setShowEditor(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="h-8 w-8 text-primary fill-current" />
            Love Letters
          </h1>
          <p className="text-gray-600 mt-1">Express your feelings and share your thoughts</p>
        </div>
        <Button 
          onClick={() => setShowEditor(!showEditor)}
          className="bg-primary hover:bg-primary/90"
        >
          <Edit className="h-4 w-4 mr-2" />
          Write Letter
        </Button>
      </div>

      {/* Letter Editor */}
      {showEditor && (
        <Card>
          <CardHeader>
            <CardTitle>Write a Love Letter</CardTitle>
            <CardDescription>Share your feelings with your partner</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="What's this letter about?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Your Letter</Label>
              <Textarea
                id="content"
                placeholder="Dear love..."
                value={newLetter}
                onChange={(e) => setNewLetter(e.target.value)}
                className="min-h-[200px] resize-none"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="send-email"
                checked={sendAsEmail}
                onCheckedChange={setSendAsEmail}
              />
              <Label htmlFor="send-email">Send as email too</Label>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                onClick={handleSendLetter}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Letter
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowEditor(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Letters List */}
      <div className="space-y-4">
        {letters.map((letter) => (
          <Card key={letter.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {letter.subject}
                    {!letter.read && <Badge variant="secondary">New</Badge>}
                  </CardTitle>
                  <CardDescription>
                    From {letter.from} • {new Date(letter.date).toLocaleDateString()}
                  </CardDescription>
                </div>
                {letter.from === 'Partner' && (
                  <Mail className="h-5 w-5 text-primary" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {letter.content}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button variant="ghost" size="sm">
                  Reply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {letters.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No letters yet</h3>
            <p className="text-gray-600 mb-4">Start sharing your feelings with your first love letter.</p>
            <Button 
              onClick={() => setShowEditor(true)}
              className="bg-primary hover:bg-primary/90"
            >
              Write Your First Letter
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}