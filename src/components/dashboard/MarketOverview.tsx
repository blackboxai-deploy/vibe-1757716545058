'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { formatMarketCap, getChangeColor } from '@/lib/utils'
import { fetchMarketData } from '@/lib/crypto-api'
import type { MarketData } from '@/types/crypto'

export function MarketOverview() {
  const [marketData, setMarketData] = useState<MarketData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadMarketData = async () => {
      try {
        const data = await fetchMarketData()
        setMarketData(data)
      } catch (error) {
        console.error('Failed to fetch market data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMarketData()
  }, [])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingSpinner text="Loading market data..." />
        </CardContent>
      </Card>
    )
  }

  if (!marketData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Failed to load market data</p>
        </CardContent>
      </Card>
    )
  }

  const marketStats = [
    {
      label: 'Total Market Cap',
      value: formatMarketCap(marketData.total_market_cap),
      change: marketData.market_cap_change_percentage_24h,
      description: '24h change',
    },
    {
      label: 'Total Volume',
      value: formatMarketCap(marketData.total_volume),
      change: null,
      description: '24h trading volume',
    },
    {
      label: 'Bitcoin Dominance',
      value: `${marketData.bitcoin_dominance.toFixed(1)}%`,
      change: null,
      description: 'Market share',
    },
    {
      label: 'Active Cryptocurrencies',
      value: marketData.active_cryptocurrencies.toLocaleString(),
      change: null,
      description: 'Listed coins',
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Global Market Overview</CardTitle>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
          Live Data
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {marketStats.map((stat, index) => (
            <div key={index} className="space-y-2">
              <div className="text-sm font-medium text-gray-600">{stat.label}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center space-x-1 text-sm">
                {stat.change !== null && (
                  <span className={getChangeColor(stat.change)}>
                    {stat.change >= 0 ? '+' : ''}
                    {stat.change.toFixed(2)}%
                  </span>
                )}
                <span className="text-gray-500">{stat.description}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-blue-600">BTC Dominance</div>
                <div className="text-xl font-bold text-blue-900">
                  {marketData.bitcoin_dominance.toFixed(1)}%
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-purple-600">ETH Dominance</div>
                <div className="text-xl font-bold text-purple-900">
                  {marketData.ethereum_dominance.toFixed(1)}%
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}