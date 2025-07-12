import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, Copy, Mail, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'

export function SetupPage() {
  const [partnerEmail, setPartnerEmail] = useState('')
  const [copied, setCopied] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const invitationLink = `${window.location.origin}/join?invite=${Math.random().toString(36).substring(7)}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(invitationLink)
      setCopied(true)
      toast({
        title: 'Link copied!',
        description: 'Invitation link has been copied to your clipboard.',
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to copy link to clipboard.',
        variant: 'destructive',
      })
    }
  }

  const handleEmailInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send an email via Supabase Edge Functions
    toast({
      title: 'Invitation sent!',
      description: `An invitation has been sent to ${partnerEmail}.`,
    })
  }

  const handleSkip = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-burgundy-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-primary fill-current animate-pulse-heart" />
          </div>
          <CardTitle className="text-2xl font-bold">Invite Your Partner</CardTitle>
          <CardDescription>
            Create a shared space for your relationship by inviting your partner to join your MoodHub
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="link" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="link">Share Link</TabsTrigger>
              <TabsTrigger value="email">Send Email</TabsTrigger>
            </TabsList>
            
            <TabsContent value="link" className="space-y-4">
              <div className="space-y-4">
                <Label>Invitation Link</Label>
                <div className="flex space-x-2">
                  <Input
                    value={invitationLink}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button onClick={handleCopyLink} variant="outline">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-sm text-gray-600">
                  Share this link with your partner so they can join your MoodHub space.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="email" className="space-y-4">
              <form onSubmit={handleEmailInvite} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="partnerEmail">Partner's Email</Label>
                  <Input
                    id="partnerEmail"
                    type="email"
                    placeholder="Enter your partner's email"
                    value={partnerEmail}
                    onChange={(e) => setPartnerEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Invitation
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-4">
              You can always invite your partner later from your dashboard.
            </p>
            <Button variant="ghost" onClick={handleSkip} className="w-full">
              Skip for now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}