'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CryptoIcon } from '@/components/shared/CryptoIcon'
import { PriceDisplay } from '@/components/shared/PriceDisplay'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { fetchCryptoList, fetchMarketData } from '@/lib/crypto-api'
import { formatMarketCap } from '@/lib/utils'
import type { CryptoCurrency, MarketData } from '@/types/crypto'

export default function MarketsPage() {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([])
  const [marketData, setMarketData] = useState<MarketData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'market_cap' | 'price' | 'change'>('market_cap')

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cryptoData, market] = await Promise.all([
          fetchCryptoList(),
          fetchMarketData()
        ])
        setCryptos(cryptoData)
        setMarketData(market)
      } catch (error) {
        console.error('Failed to load market data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredCryptos = cryptos
    .filter(crypto => 
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap':
          return b.market_cap - a.market_cap
        case 'price':
          return b.current_price - a.current_price
        case 'change':
          return b.price_change_percentage_24h - a.price_change_percentage_24h
        default:
          return 0
      }
    })

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner text="Loading market data..." />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Markets</h1>
          <p className="text-gray-600 mt-1">Real-time cryptocurrency market data and analysis</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
          Live Data
        </Badge>
      </div>

      {/* Market Overview Stats */}
      {marketData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">Total Market Cap</div>
              <div className="text-xl font-bold text-gray-900">{formatMarketCap(marketData.total_market_cap)}</div>
              <div className="text-sm text-green-600">+{marketData.market_cap_change_percentage_24h.toFixed(2)}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">24h Volume</div>
              <div className="text-xl font-bold text-gray-900">{formatMarketCap(marketData.total_volume)}</div>
              <div className="text-sm text-gray-500">Trading volume</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">BTC Dominance</div>
              <div className="text-xl font-bold text-gray-900">{marketData.bitcoin_dominance.toFixed(1)}%</div>
              <div className="text-sm text-gray-500">Market share</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">Active Coins</div>
              <div className="text-xl font-bold text-gray-900">{marketData.active_cryptocurrencies.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Listed</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Market Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Cryptocurrency Prices</CardTitle>
            <div className="flex items-center space-x-4">
              <Input
                placeholder="Search cryptocurrencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <div className="flex space-x-1">
                <Button
                  variant={sortBy === 'market_cap' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('market_cap')}
                >
                  Market Cap
                </Button>
                <Button
                  variant={sortBy === 'price' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('price')}
                >
                  Price
                </Button>
                <Button
                  variant={sortBy === 'change' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('change')}
                >
                  Change
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-600">#</th>
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Asset</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Price</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">24h Change</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Market Cap</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Volume (24h)</th>
                  <th className="text-center py-3 px-2 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCryptos.map((crypto) => (
                  <tr key={crypto.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-2 text-gray-500 font-medium">
                      {crypto.market_cap_rank}
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <CryptoIcon
                          symbol={crypto.symbol}
                          name={crypto.name}
                          image={crypto.image}
                          size="sm"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{crypto.name}</div>
                          <div className="text-sm text-gray-500">{crypto.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <PriceDisplay
                        price={crypto.current_price}
                        size="sm"
                        showChange={false}
                      />
                    </td>
                    <td className="py-4 px-2 text-right">
                      <PriceDisplay
                        price={0}
                        changePercentage={crypto.price_change_percentage_24h}
                        size="sm"
                        showCurrency={false}
                      />
                    </td>
                    <td className="py-4 px-2 text-right text-gray-900">
                      {formatMarketCap(crypto.market_cap)}
                    </td>
                    <td className="py-4 px-2 text-right text-gray-900">
                      {formatMarketCap(crypto.total_volume)}
                    </td>
                    <td className="py-4 px-2 text-center">
                      <div className="flex space-x-1 justify-center">
                        <Button variant="outline" size="sm">
                          Buy
                        </Button>
                        <Button variant="outline" size="sm">
                          Trade
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCryptos.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No cryptocurrencies found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}