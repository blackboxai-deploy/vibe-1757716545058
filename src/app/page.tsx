'use client'

import React from 'react'
import { MarketOverview } from '@/components/dashboard/MarketOverview'
import { PriceChart } from '@/components/dashboard/PriceChart'
import { TopPerformers } from '@/components/dashboard/TopPerformers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function Dashboard() {
  const quickStats = [
    {
      title: 'Portfolio Value',
      value: '$125,500.00',
      change: '+$8,750.00',
      changePercent: '+7.49%',
      positive: true,
    },
    {
      title: 'Total Profit/Loss',
      value: '+$8,750.00',
      change: '+$1,250.00',
      changePercent: '+16.7%',
      positive: true,
    },
    {
      title: 'Holdings',
      value: '12 Assets',
      change: '+2',
      changePercent: 'This month',
      positive: true,
    },
  ]

  const recentActivity = [
    {
      type: 'buy',
      asset: 'Bitcoin',
      symbol: 'BTC',
      amount: '0.5',
      value: '$21,625.00',
      time: '2 hours ago',
    },
    {
      type: 'sell',
      asset: 'Ethereum',
      symbol: 'ETH',
      amount: '3.0',
      value: '$7,950.00',
      time: '5 hours ago',
    },
    {
      type: 'receive',
      asset: 'BNB',
      symbol: 'BNB',
      amount: '25.0',
      value: '$7,887.50',
      time: '1 day ago',
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your crypto portfolio overview.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
            Live Data
          </Badge>
          <Button>
            Quick Trade
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2 space-x-1">
                    <span className={stat.positive ? 'text-green-600' : 'text-red-600'}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500">({stat.changePercent})</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.positive ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {stat.positive ? (
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts and Market Overview - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <MarketOverview />
          <PriceChart symbol="BTC" title="Bitcoin Price Chart" height={350} />
        </div>

        {/* Sidebar Content - 1/3 width */}
        <div className="space-y-6">
          <TopPerformers />
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        activity.type === 'buy' ? 'bg-green-100 text-green-700' :
                        activity.type === 'sell' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {activity.type === 'buy' ? '+' : 
                         activity.type === 'sell' ? '-' : '→'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {activity.type === 'buy' ? 'Bought' : 
                           activity.type === 'sell' ? 'Sold' : 'Received'} {activity.asset}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.amount} {activity.symbol} • {activity.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{activity.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full" size="sm">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}