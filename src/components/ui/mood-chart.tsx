import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Mon', mood: 8 },
  { day: 'Tue', mood: 6 },
  { day: 'Wed', mood: 9 },
  { day: 'Thu', mood: 7 },
  { day: 'Fri', mood: 10 },
  { day: 'Sat', mood: 9 },
  { day: 'Sun', mood: 8 },
]

export function MoodChart() {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 10]} />
          <Tooltip />
          <Bar dataKey="mood" fill="#7B2C3B" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}