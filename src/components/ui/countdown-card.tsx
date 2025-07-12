import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface CountdownCardProps {
  title: string
  targetDate: Date
  icon?: React.ReactNode
}

export function CountdownCard({ title, targetDate, icon }: CountdownCardProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-2xl font-bold text-primary">{timeLeft.days}</div>
            <div className="text-xs text-gray-600">Days</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-2xl font-bold text-primary">{timeLeft.hours}</div>
            <div className="text-xs text-gray-600">Hours</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-2xl font-bold text-primary">{timeLeft.minutes}</div>
            <div className="text-xs text-gray-600">Min</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-2xl font-bold text-primary">{timeLeft.seconds}</div>
            <div className="text-xs text-gray-600">Sec</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}