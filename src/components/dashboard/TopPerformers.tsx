'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CryptoIcon } from '@/components/shared/CryptoIcon'
import { PriceDisplay } from '@/components/shared/PriceDisplay'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { fetchCryptoList } from '@/lib/crypto-api'
import { formatMarketCap } from '@/lib/utils'
import type { CryptoCurrency } from '@/types/crypto'

export function TopPerformers() {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewType, setViewType] = useState<'gainers' | 'losers' | 'volume'>('gainers')

  useEffect(() => {
    const loadCryptos = async () => {
      try {
        const data = await fetchCryptoList()
        setCryptos(data)
      } catch (error) {
        console.error('Failed to fetch crypto data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCryptos()
  }, [])

  const getSortedCryptos = () => {
    const sorted = [...cryptos]
    switch (viewType) {
      case 'gainers':
        return sorted.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 5)
      case 'losers':
        return sorted.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 5)
      case 'volume':
        return sorted.sort((a, b) => b.total_volume - a.total_volume).slice(0, 5)
      default:
        return sorted.slice(0, 5)
    }
  }

  const viewOptions = [
    { key: 'gainers', label: 'Top Gainers', color: 'bg-green-50 text-green-700' },
    { key: 'losers', label: 'Top Losers', color: 'bg-red-50 text-red-700' },
    { key: 'volume', label: 'High Volume', color: 'bg-blue-50 text-blue-700' },
  ]

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Market Movers</CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingSpinner text="Loading market data..." />
        </CardContent>
      </Card>
    )
  }

  const displayCryptos = getSortedCryptos()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">Market Movers</CardTitle>
        <div className="flex space-x-1">
          {viewOptions.map((option) => (
            <Button
              key={option.key}
              variant={viewType === option.key ? "default" : "outline"}
              size="sm"
              onClick={() => setViewType(option.key as any)}
              className="h-8 text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayCryptos.map((crypto, index) => (
            <div key={crypto.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500 w-4">
                    #{index + 1}
                  </span>
                  <CryptoIcon
                    symbol={crypto.symbol}
                    name={crypto.name}
                    image={crypto.image}
                    size="sm"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{crypto.name}</div>
                  <div className="text-sm text-gray-500 flex items-center space-x-2">
                    <span>{crypto.symbol.toUpperCase()}</span>
                    <Badge variant="outline" className="text-xs">
                      #{crypto.market_cap_rank}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <PriceDisplay
                  price={crypto.current_price}
                  changePercentage={crypto.price_change_percentage_24h}
                  size="sm"
                  showChange={viewType !== 'volume'}
                />
                {viewType === 'volume' && (
                  <div className="text-xs text-gray-500 mt-1">
                    Vol: {formatMarketCap(crypto.total_volume)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button variant="outline" className="w-full" size="sm">
            View All Markets →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}