import { useState } from 'react'
import { Plus, Heart, MapPin, Star, Calendar, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function DateIdeasPage() {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [location, setLocation] = useState('')
  const [filter, setFilter] = useState('all')

  const dateIdeas = [
    {
      id: 1,
      title: 'Picnic in the Park',
      description: 'Pack some sandwiches and find a cozy spot under the trees',
      type: 'outdoor',
      location: 'Central Park',
      votes: 8,
      favorite: true,
      tags: ['romantic', 'nature', 'budget-friendly'],
      difficulty: 'easy',
    },
    {
      id: 2,
      title: 'Virtual Museum Tour',
      description: 'Explore the Louvre or MoMA from the comfort of our couch',
      type: 'virtual',
      location: 'home',
      votes: 5,
      favorite: false,
      tags: ['educational', 'art', 'indoor'],
      difficulty: 'easy',
    },
    {
      id: 3,
      title: 'Cooking Challenge',
      description: 'Each pick 3 random ingredients and see who makes the best dish',
      type: 'indoor',
      location: 'home',
      votes: 12,
      favorite: true,
      tags: ['fun', 'creative', 'food'],
      difficulty: 'medium',
    },
    {
      id: 4,
      title: 'Hiking Adventure',
      description: 'Find a new trail and spend the day exploring nature together',
      type: 'outdoor',
      location: 'Blue Ridge Trail',
      votes: 6,
      favorite: false,
      tags: ['adventure', 'exercise', 'nature'],
      difficulty: 'hard',
    },
    {
      id: 5,
      title: 'Drive-in Movie',
      description: 'Classic date night with popcorn and cozy blankets in the car',
      type: 'outdoor',
      location: 'Sunset Drive-in Theater',
      votes: 9,
      favorite: true,
      tags: ['classic', 'movies', 'nostalgic'],
      difficulty: 'easy',
    },
    {
      id: 6,
      title: 'Wine Tasting at Home',
      description: 'Order a selection of wines and create our own tasting experience',
      type: 'indoor',
      location: 'home',
      votes: 7,
      favorite: false,
      tags: ['sophisticated', 'relaxing', 'alcohol'],
      difficulty: 'medium',
    },
  ]

  const filteredIdeas = dateIdeas.filter(idea => {
    if (filter === 'all') return true
    if (filter === 'favorites') return idea.favorite
    return idea.type === filter
  })

  const handleSubmit = () => {
    if (title.trim() && description.trim() && type) {
      // In a real app, this would save to Supabase
      console.log('New date idea:', { title, description, type, location })
      setTitle('')
      setDescription('')
      setType('')
      setLocation('')
      setShowForm(false)
    }
  }

  const handleVote = (id: number) => {
    // In a real app, this would update the vote count in Supabase
    console.log('Voting for idea:', id)
  }

  const toggleFavorite = (id: number) => {
    // In a real app, this would update the favorite status in Supabase
    console.log('Toggling favorite for idea:', id)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="h-8 w-8 text-primary" />
            Date Ideas
          </h1>
          <p className="text-gray-600 mt-1">Plan amazing dates and adventures together</p>
        </div>
        <Button 
          onClick={() => setShowForm(!showForm)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Idea
        </Button>
      </div>

      {/* Add Date Idea Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add a New Date Idea</CardTitle>
            <CardDescription>What adventure should you try next?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Date Title</Label>
                <Input
                  id="title"
                  placeholder="What's the activity?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indoor">Indoor</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                    <SelectItem value="virtual">Virtual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Where will this happen?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the date idea..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button 
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90"
              >
                Add Date Idea
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

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={setFilter} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Ideas</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="indoor">Indoor</TabsTrigger>
          <TabsTrigger value="outdoor">Outdoor</TabsTrigger>
          <TabsTrigger value="virtual">Virtual</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIdeas.map((idea) => (
              <Card key={idea.id} className="hover:shadow-lg transition-shadow group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {idea.title}
                        {idea.favorite && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {idea.location}
                      </CardDescription>
                    </div>
                    <Badge className={getDifficultyColor(idea.difficulty)}>
                      {idea.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{idea.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {idea.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVote(idea.id)}
                        className="flex items-center gap-1"
                      >
                        <Heart className="h-3 w-3" />
                        {idea.votes}
                      </Button>
                      <Button
                        size="sm"
                        variant={idea.favorite ? "default" : "outline"}
                        onClick={() => toggleFavorite(idea.id)}
                      >
                        <Star className={`h-3 w-3 ${idea.favorite ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {idea.type}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredIdeas.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No date ideas yet</h3>
            <p className="text-gray-600 mb-4">Start planning your perfect dates together.</p>
            <Button 
              onClick={() => setShowForm(true)}
              className="bg-primary hover:bg-primary/90"
            >
              Add Your First Date Idea
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}