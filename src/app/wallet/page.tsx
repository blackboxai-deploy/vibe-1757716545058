'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CryptoIcon } from '@/components/shared/CryptoIcon'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { fetchWallet } from '@/lib/crypto-api'
import { formatCurrency, formatDate, truncateAddress } from '@/lib/utils'
import type { Wallet } from '@/types/crypto'

export default function WalletPage() {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadWallet = async () => {
      try {
        const data = await fetchWallet()
        setWallet(data)
      } catch (error) {
        console.error('Failed to fetch wallet data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadWallet()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner text="Loading wallet..." />
        </div>
      </div>
    )
  }

  if (!wallet) {
    return (
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">Failed to load wallet data</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Wallet</h1>
          <p className="text-gray-600 mt-1">Manage your cryptocurrency balances and transactions</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Receive</Button>
          <Button>Send</Button>
        </div>
      </div>

      {/* Total Balance */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="text-lg opacity-90">Total Balance</div>
            <div className="text-4xl font-bold mt-2">{formatCurrency(wallet.total_balance_usd)}</div>
            <div className="text-sm opacity-75 mt-2">Across all cryptocurrencies</div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balances */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Your Balances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wallet.balances.map((balance, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CryptoIcon
                      symbol={balance.symbol}
                      name={balance.currency}
                      image={balance.image}
                      size="md"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{balance.currency}</div>
                      <div className="text-sm text-gray-500">{balance.symbol}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">
                      {balance.balance.toLocaleString()} {balance.symbol}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatCurrency(balance.usd_value)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wallet.transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'receive' ? 'bg-green-100 text-green-700' :
                      transaction.type === 'send' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {transaction.type === 'receive' ? '↓' : 
                       transaction.type === 'send' ? '↑' : 
                       transaction.type === 'buy' ? '+' : '-'}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 capitalize">
                        {transaction.type} {transaction.currency}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(transaction.timestamp)}
                      </div>
                      <div className="text-xs text-gray-400">
                        {truncateAddress(transaction.transaction_hash)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${
                      transaction.type === 'receive' || transaction.type === 'buy' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {transaction.type === 'receive' || transaction.type === 'buy' ? '+' : '-'}
                      {transaction.amount} {transaction.currency}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatCurrency(transaction.usd_value)}
                    </div>
                    <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'} className="mt-1">
                      {transaction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="outline" className="w-full" size="sm">
                View All Transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}