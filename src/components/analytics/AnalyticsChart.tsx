'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface AnalyticsChartProps {
  data: Array<{ name: string; value: number }>
}

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis 
          dataKey="name" 
          stroke="#6b7280"
          fontSize={12}
        />
        <YAxis 
          stroke="#6b7280"
          fontSize={12}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
          }}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="hsl(142 40% 35%)" 
          strokeWidth={2}
          dot={{ fill: 'hsl(142 40% 35%)', r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

