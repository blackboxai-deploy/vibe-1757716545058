'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { fetchPriceHistory } from '@/lib/crypto-api'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { PriceHistoryPoint } from '@/types/crypto'

interface PriceChartProps {
  symbol?: string
  title?: string
  height?: number
}

export function PriceChart({ symbol = 'BTC', title, height = 300 }: PriceChartProps) {
  const [priceData, setPriceData] = useState<PriceHistoryPoint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeframe, setTimeframe] = useState<number>(7)

  const timeframes = [
    { label: '7D', value: 7 },
    { label: '30D', value: 30 },
    { label: '90D', value: 90 },
  ]

  useEffect(() => {
    const loadPriceData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchPriceHistory(symbol, timeframe)
        setPriceData(data)
      } catch (error) {
        console.error('Failed to fetch price history:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPriceData()
  }, [symbol, timeframe])

  const chartData = priceData.map(point => ({
    timestamp: point.timestamp,
    price: point.price,
    date: new Date(point.timestamp).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }))

  const currentPrice = priceData[priceData.length - 1]?.price
  const previousPrice = priceData[0]?.price
  const priceChange = currentPrice && previousPrice ? currentPrice - previousPrice : 0
  const priceChangePercentage = previousPrice ? (priceChange / previousPrice) * 100 : 0

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="text-sm text-gray-600">{formatDate(new Date(data.timestamp))}</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(data.price)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">
            {title || `${symbol} Price Chart`}
          </CardTitle>
          {currentPrice && (
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(currentPrice)}
              </span>
              {priceChange !== 0 && (
                <Badge 
                  variant={priceChange >= 0 ? "default" : "destructive"}
                  className={priceChange >= 0 ? "bg-green-100 text-green-800" : ""}
                >
                  {priceChange >= 0 ? '+' : ''}
                  {priceChange.toFixed(2)} ({priceChangePercentage.toFixed(2)}%)
                </Badge>
              )}
            </div>
          )}
        </div>
        <div className="flex space-x-1">
          {timeframes.map((tf) => (
            <Button
              key={tf.value}
              variant={timeframe === tf.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(tf.value)}
              className="h-8"
            >
              {tf.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center" style={{ height }}>
            <LoadingSpinner text="Loading price data..." />
          </div>
        ) : chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#666' }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#2563eb' }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center" style={{ height }}>
            <p className="text-gray-500">No price data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}