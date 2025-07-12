import { Heart } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Heart className="h-6 w-6 text-primary fill-current" />
            <span className="text-lg font-semibold text-gray-900">MoodHub</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-600">
              Made with{' '}
              <Heart className="inline h-4 w-4 text-red-500 fill-current mx-1" />
              for couples everywhere
            </p>
            <p className="text-xs text-gray-500 mt-1">
              © 2025 MoodHub. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}