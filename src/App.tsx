import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AuthWrapper } from '@/components/layout/AuthWrapper'
import { Toaster } from '@/components/ui/toaster'
import { supabase } from '@/lib/supabase'
// Pages
import { LandingPage } from '@/pages/LandingPage'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'
import { SetupPage } from '@/pages/SetupPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { LettersPage } from '@/pages/LettersPage'
import { ComplaintsPage } from '@/pages/ComplaintsPage'
import { MemoriesPage } from '@/pages/MemoriesPage'
import { DateIdeasPage } from '@/pages/DateIdeasPage'
import { TimersPage } from '@/pages/TimersPage'


function PublicRoute({ children, isAuthenticated, isLoading }) {
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setIsLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setIsLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const isAuthenticated = !!user

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={
              <PublicRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <LandingPage />
              </PublicRoute>
            } />
            <Route path="/login" element={
              <PublicRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <LoginPage />
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <SignupPage />
              </PublicRoute>
            } />
           
            <Route path="/setup" element={
              <AuthWrapper>
                <SetupPage />
              </AuthWrapper>
            } />
            <Route path="/dashboard" element={
              <AuthWrapper>
                <DashboardPage />
              </AuthWrapper>
            } />
            <Route path="/letters" element={
              <AuthWrapper>
                <LettersPage />
              </AuthWrapper>
            } />
            <Route path="/complaints" element={
              <AuthWrapper>
                <ComplaintsPage />
              </AuthWrapper>
            } />
            <Route path="/memories" element={
              <AuthWrapper>
                <MemoriesPage />
              </AuthWrapper>
            } />
            <Route path="/date-ideas" element={
              <AuthWrapper>
                <DateIdeasPage />
              </AuthWrapper>
            } />
            <Route path="/timers" element={
              <AuthWrapper>
                <TimersPage />
              </AuthWrapper>
            } />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  )
}

export default App