import { useState } from 'react'
import { Plus, Camera, Heart, Download, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ImageUploader } from '@/components/ui/image-uploader'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'

export function MemoriesPage() {
  const [showUploader, setShowUploader] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Sample memories - in a real app, these would come from Supabase Storage
  const memories = [
    {
      id: 1,
      title: 'Our First Date',
      description: 'Coffee at that cute little café downtown. You were so nervous!',
      imageUrl: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
      date: '2025-01-10',
      tags: ['first-date', 'coffee'],
    },
    {
      id: 2,
      title: 'Beach Vacation',
      description: 'The most beautiful sunset we\'ve ever seen together.',
      imageUrl: 'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg',
      date: '2025-01-05',
      tags: ['vacation', 'beach', 'sunset'],
    },
    {
      id: 3,
      title: 'Cooking Together',
      description: 'First time making pasta from scratch. What a delicious mess!',
      imageUrl: 'https://images.pexels.com/photos/4252137/pexels-photo-4252137.jpeg',
      date: '2024-12-28',
      tags: ['cooking', 'pasta', 'home'],
    },
    {
      id: 4,
      title: 'Movie Night',
      description: 'Watched The Notebook and you definitely didn\'t cry...',
      imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
      date: '2024-12-20',
      tags: ['movie-night', 'cozy'],
    },
    {
      id: 5,
      title: 'Christmas Morning',
      description: 'Your reaction to the surprise gift was priceless!',
      imageUrl: 'https://images.pexels.com/photos/1303088/pexels-photo-1303088.jpeg',
      date: '2024-12-25',
      tags: ['christmas', 'gifts', 'surprise'],
    },
    {
      id: 6,
      title: 'Ice Skating',
      description: 'You fell down 12 times but kept laughing. Love your spirit!',
      imageUrl: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg',
      date: '2024-12-15',
      tags: ['ice-skating', 'winter', 'fun'],
    },
  ]

  const handleUpload = (file: File) => {
    setSelectedFile(file)
  }

  const handleSaveMemory = () => {
    if (title.trim() && selectedFile) {
      // In a real app, this would upload to Supabase Storage
      console.log('Saving memory:', { title, description, file: selectedFile })
      setTitle('')
      setDescription('')
      setSelectedFile(null)
      setShowUploader(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Camera className="h-8 w-8 text-primary" />
            Shared Memories
          </h1>
          <p className="text-gray-600 mt-1">Capture and cherish your beautiful moments together</p>
        </div>
        <Button 
          onClick={() => setShowUploader(!showUploader)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Memory
        </Button>
      </div>

      {/* Memory Upload Form */}
      {showUploader && (
        <Card className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Add a New Memory</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title">Memory Title</Label>
              <Input
                id="title"
                placeholder="What made this moment special?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell the story behind this memory..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            <ImageUploader onUpload={handleUpload} />
            
            <div className="flex space-x-2">
              <Button 
                onClick={handleSaveMemory}
                disabled={!title.trim() || !selectedFile}
                className="bg-primary hover:bg-primary/90"
              >
                Save Memory
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowUploader(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Memories Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map((memory) => (
          <Card key={memory.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative">
              <img
                src={memory.imageUrl}
                alt={memory.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-1">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" className="h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="absolute bottom-2 left-2">
                <Badge variant="secondary" className="bg-black/50 text-white">
                  {new Date(memory.date).toLocaleDateString()}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                {memory.title}
                <Heart className="h-4 w-4 text-red-500 fill-current" />
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {memory.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {memory.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {memories.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No memories yet</h3>
            <p className="text-gray-600 mb-4">Start capturing your beautiful moments together.</p>
            <Button 
              onClick={() => setShowUploader(true)}
              className="bg-primary hover:bg-primary/90"
            >
              Add Your First Memory
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}