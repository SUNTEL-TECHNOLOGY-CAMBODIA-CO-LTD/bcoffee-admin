import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts'
import { type SalesTrendItem } from '@/features/hq/data/mock-hq-dashboard'

interface SalesTrendProps {
  data: SalesTrendItem[]
}

export function SalesTrend({ data }: SalesTrendProps) {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray='3 3' vertical={false} />
        <XAxis
          dataKey='time'
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            borderColor: 'hsl(var(--border))',
          }}
          itemStyle={{ color: 'hsl(var(--foreground))' }}
        />
        <Legend />
        <Line
          type='monotone'
          dataKey='Downtown'
          stroke='hsl(var(--primary))'
          strokeWidth={2}
          dot={false}
        />
        <Line
          type='monotone'
          dataKey='Uptown'
          stroke='#3b82f6' // Blue
          strokeWidth={2}
          dot={false}
        />
        <Line
          type='monotone'
          dataKey='Airport'
          stroke='#10b981' // Green
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
