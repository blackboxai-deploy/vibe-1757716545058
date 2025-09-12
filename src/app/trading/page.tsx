'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CryptoIcon } from '@/components/shared/CryptoIcon'
import { PriceDisplay } from '@/components/shared/PriceDisplay'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { fetchCryptoList, fetchTrades } from '@/lib/crypto-api'
import { formatCurrency, formatNumber } from '@/lib/utils'
import type { CryptoCurrency, Trade } from '@/types/crypto'

export default function TradingPage() {
  const [cryptos, setCryptos] = useState<CryptoCurrency[]>([])
  const [recentTrades, setRecentTrades] = useState<Trade[]>([])
  const [selectedCrypto, setSelectedCrypto] = useState<string>('bitcoin')
  const [isLoading, setIsLoading] = useState(true)
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState('')
  const [orderType, setOrderType] = useState('market')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cryptoData, tradesData] = await Promise.all([
          fetchCryptoList(),
          fetchTrades()
        ])
        setCryptos(cryptoData)
        setRecentTrades(tradesData.slice(0, 10))
      } catch (error) {
        console.error('Failed to load trading data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const selectedCryptoData = cryptos.find(c => c.id === selectedCrypto)

  const handleTrade = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCryptoData || !amount) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/trades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: tradeType,
          symbol: selectedCryptoData.symbol,
          amount: parseFloat(amount),
          price: selectedCryptoData.current_price,
          order_type: orderType,
        }),
      })

      const result = await response.json()
      
      if (result.success) {
        alert(`Trade executed successfully! ${result.message}`)
        setAmount('')
        // Refresh recent trades
        const tradesData = await fetchTrades()
        setRecentTrades(tradesData.slice(0, 10))
      } else {
        alert(`Trade failed: ${result.error}`)
      }
    } catch (error) {
      console.error('Trade error:', error)
      alert('Failed to execute trade. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateTotal = () => {
    if (!selectedCryptoData || !amount) return 0
    return parseFloat(amount) * selectedCryptoData.current_price
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner text="Loading trading interface..." />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trading</h1>
          <p className="text-gray-600 mt-1">Buy and sell cryptocurrencies with live market data</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
          Markets Open
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trading Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Place Order</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleTrade} className="space-y-6">
                {/* Asset Selection */}
                <div>
                  <Label htmlFor="asset">Select Asset</Label>
                  <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cryptos.map((crypto) => (
                        <SelectItem key={crypto.id} value={crypto.id}>
                          <div className="flex items-center space-x-2">
                            <CryptoIcon 
                              symbol={crypto.symbol} 
                              name={crypto.name}
                              size="xs"
                            />
                            <span>{crypto.name} ({crypto.symbol.toUpperCase()})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Current Price Display */}
                {selectedCryptoData && (
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CryptoIcon 
                            symbol={selectedCryptoData.symbol}
                            name={selectedCryptoData.name}
                            image={selectedCryptoData.image}
                            size="md"
                          />
                          <div>
                            <div className="font-medium">{selectedCryptoData.name}</div>
                            <div className="text-sm text-gray-500">{selectedCryptoData.symbol.toUpperCase()}</div>
                          </div>
                        </div>
                        <PriceDisplay
                          price={selectedCryptoData.current_price}
                          changePercentage={selectedCryptoData.price_change_percentage_24h}
                          size="lg"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Trade Type Selection */}
                <Tabs value={tradeType} onValueChange={(v) => setTradeType(v as 'buy' | 'sell')}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
                      Buy
                    </TabsTrigger>
                    <TabsTrigger value="sell" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-700">
                      Sell
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="buy" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="buy-amount">Amount ({selectedCryptoData?.symbol.toUpperCase()})</Label>
                        <Input
                          id="buy-amount"
                          type="number"
                          step="0.00000001"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Total (USD)</Label>
                        <div className="mt-1 p-2 bg-gray-50 border rounded-md font-mono">
                          {formatCurrency(calculateTotal())}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="sell" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="sell-amount">Amount ({selectedCryptoData?.symbol.toUpperCase()})</Label>
                        <Input
                          id="sell-amount"
                          type="number"
                          step="0.00000001"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Total (USD)</Label>
                        <div className="mt-1 p-2 bg-gray-50 border rounded-md font-mono">
                          {formatCurrency(calculateTotal())}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Order Type */}
                <div>
                  <Label htmlFor="order-type">Order Type</Label>
                  <Select value={orderType} onValueChange={setOrderType}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market">Market Order</SelectItem>
                      <SelectItem value="limit">Limit Order</SelectItem>
                      <SelectItem value="stop">Stop Order</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className={`w-full ${tradeType === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
                  disabled={isSubmitting || !amount || !selectedCrypto}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <LoadingSpinner size="sm" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    `${tradeType === 'buy' ? 'Buy' : 'Sell'} ${selectedCryptoData?.symbol.toUpperCase()}`
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Market Data & Recent Trades */}
        <div className="space-y-6">
          {/* Top Cryptocurrencies */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Market Prices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cryptos.slice(0, 5).map((crypto) => (
                  <div key={crypto.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CryptoIcon 
                        symbol={crypto.symbol}
                        name={crypto.name}
                        image={crypto.image}
                        size="xs"
                      />
                      <div>
                        <div className="text-sm font-medium">{crypto.symbol.toUpperCase()}</div>
                        <div className="text-xs text-gray-500">{crypto.name}</div>
                      </div>
                    </div>
                    <PriceDisplay
                      price={crypto.current_price}
                      changePercentage={crypto.price_change_percentage_24h}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Trades */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTrades.map((trade) => (
                  <div key={trade.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-2">
                      <Badge variant={trade.type === 'buy' ? 'default' : 'destructive'} className="w-12 text-xs">
                        {trade.type.toUpperCase()}
                      </Badge>
                      <div>
                        <div className="text-sm font-medium">{trade.symbol}</div>
                        <div className="text-xs text-gray-500">
                          {formatNumber(trade.amount)} @ {formatCurrency(trade.price)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{formatCurrency(trade.total)}</div>
                      <div className="text-xs text-gray-500">{trade.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}