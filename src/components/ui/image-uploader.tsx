import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface ImageUploaderProps {
  onUpload: (file: File) => void
  maxSize?: number
  className?: string
}

export function ImageUploader({ onUpload, maxSize = 5 * 1024 * 1024, className }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.size > maxSize) {
      alert(`File size must be less than ${maxSize / 1024 / 1024}MB`)
      return
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    onUpload(file)
  }

  const clearPreview = () => {
    setPreview(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <Card className={`p-6 ${className}`}>
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={clearPreview}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragActive
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary hover:bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            Drop your image here, or click to browse
          </p>
          <p className="text-sm text-gray-500">
            PNG, JPG, GIF up to {maxSize / 1024 / 1024}MB
          </p>
          <Button className="mt-4" variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Choose File
          </Button>
        </div>
      )}
      
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </Card>
  )
}