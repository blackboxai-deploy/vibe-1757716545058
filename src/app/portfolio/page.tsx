'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CryptoIcon } from '@/components/shared/CryptoIcon'

import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { fetchPortfolio } from '@/lib/crypto-api'
import { formatCurrency, formatNumber, getChangeColor } from '@/lib/utils'
import type { Portfolio } from '@/types/crypto'

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const data = await fetchPortfolio()
        setPortfolio(data)
      } catch (error) {
        console.error('Failed to fetch portfolio data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPortfolio()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner text="Loading portfolio..." />
        </div>
      </div>
    )
  }

  if (!portfolio) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Failed to load portfolio data</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portfolio</h1>
          <p className="text-gray-600 mt-1">Track and manage your cryptocurrency investments</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            Add Asset
          </Button>
          <Button>
            Rebalance Portfolio
          </Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Portfolio Value</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {formatCurrency(portfolio.total_value)}
                </p>
                <div className="flex items-center mt-2">
                  <span className={getChangeColor(portfolio.total_profit_loss)}>
                    {portfolio.total_profit_loss >= 0 ? '+' : ''}
                    {formatCurrency(portfolio.total_profit_loss)}
                  </span>
                  <span className={`ml-2 ${getChangeColor(portfolio.total_profit_loss_percentage)}`}>
                    ({portfolio.total_profit_loss_percentage.toFixed(2)}%)
                  </span>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Total Assets</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {portfolio.holdings.length}
              </p>
              <p className="text-sm text-gray-500 mt-1">Cryptocurrencies</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Best Performer</p>
              <p className="text-lg font-bold text-green-600 mt-1">
                +{Math.max(...portfolio.holdings.map(h => h.profit_loss_percentage)).toFixed(2)}%
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {portfolio.holdings.find(h => h.profit_loss_percentage === Math.max(...portfolio.holdings.map(h => h.profit_loss_percentage)))?.symbol}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Holdings Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Your Holdings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-medium text-gray-600">Asset</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Holdings</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Avg Price</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Current Price</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Total Value</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">P&L</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Allocation</th>
                  <th className="text-right py-3 px-2 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.holdings.map((holding) => (
                  <tr key={holding.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-2">
                      <div className="flex items-center space-x-3">
                        <CryptoIcon
                          symbol={holding.symbol}
                          name={holding.name}
                          image={holding.image}
                          size="sm"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{holding.name}</div>
                          <div className="text-sm text-gray-500">{holding.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="font-medium text-gray-900">
                        {formatNumber(holding.amount)} {holding.symbol.toUpperCase()}
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="text-gray-900">
                        {formatCurrency(holding.average_price)}
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="text-gray-900">
                        {formatCurrency(holding.current_price)}
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="font-medium text-gray-900">
                        {formatCurrency(holding.total_value)}
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className={getChangeColor(holding.profit_loss)}>
                        {holding.profit_loss >= 0 ? '+' : ''}
                        {formatCurrency(holding.profit_loss)}
                      </div>
                      <div className={`text-sm ${getChangeColor(holding.profit_loss_percentage)}`}>
                        ({holding.profit_loss_percentage.toFixed(2)}%)
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <Badge variant="outline">
                        {holding.allocation_percentage.toFixed(1)}%
                      </Badge>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="flex space-x-1 justify-end">
                        <Button variant="outline" size="sm">
                          Buy
                        </Button>
                        <Button variant="outline" size="sm">
                          Sell
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}