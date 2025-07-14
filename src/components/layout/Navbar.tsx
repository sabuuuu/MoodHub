import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, LogOut, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export function Navbar() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      if (subscription) subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      navigate('/')
    }
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Heart className="h-8 w-8 text-primary fill-current animate-pulse-heart" />
            <span className="text-xl font-bold text-gray-900">MoodHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors">
                  Dashboard
                </Link>
                <Link to="/letters" className="text-gray-700 hover:text-primary transition-colors">
                  Letters
                </Link>
                <Link to="/complaints" className="text-gray-700 hover:text-primary transition-colors">
                  Complaints
                </Link>
                <Link to="/memories" className="text-gray-700 hover:text-primary transition-colors">
                  Memories
                </Link>
                <Link to="/date-ideas" className="text-gray-700 hover:text-primary transition-colors">
                  Date Ideas
                </Link>
                <Link to="/timers" className="text-gray-700 hover:text-primary transition-colors">
                  Timers
                </Link>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {user ? (
              <div className="flex flex-col space-y-4">
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/letters"
                  className="text-gray-700 hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Letters
                </Link>
                <Link
                  to="/complaints"
                  className="text-gray-700 hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Complaints
                </Link>
                <Link
                  to="/memories"
                  className="text-gray-700 hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Memories
                </Link>
                <Link
                  to="/date-ideas"
                  className="text-gray-700 hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Date Ideas
                </Link>
                <Link
                  to="/timers"
                  className="text-gray-700 hover:text-primary transition-colors px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Timers
                </Link>
                <div className="px-4 py-2 border-t border-gray-200">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-4 px-4">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full">Sign In</Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90">Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}