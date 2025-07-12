import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AuthWrapper } from '@/components/layout/AuthWrapper'
import { Toaster } from '@/components/ui/toaster'

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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            
            {/* Protected routes */}
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