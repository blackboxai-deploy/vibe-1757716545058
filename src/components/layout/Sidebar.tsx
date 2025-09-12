'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    name: 'Portfolio',
    href: '/portfolio',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  },
  {
    name: 'Trading',
    href: '/trading',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    badge: 'Live',
  },
  {
    name: 'Markets',
    href: '/markets',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: 'Wallet',
    href: '/wallet',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    name: 'News',
    href: '/news',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
]

const quickActions = [
  {
    name: 'Buy Crypto',
    href: '/trading?action=buy',
    description: 'Purchase cryptocurrency',
    color: 'bg-green-50 text-green-700 hover:bg-green-100',
  },
  {
    name: 'Sell Crypto',
    href: '/trading?action=sell',
    description: 'Sell your holdings',
    color: 'bg-red-50 text-red-700 hover:bg-red-100',
  },
  {
    name: 'Send Funds',
    href: '/wallet?action=send',
    description: 'Transfer to wallet',
    color: 'bg-blue-50 text-blue-700 hover:bg-blue-100',
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r">
      {/* Sidebar Header */}
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SKV</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900">SKV Global</span>
            <span className="text-xs text-blue-600">Crypto Platform</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center px-3 py-2 text-sm font-medium border-l-4 rounded-r-md transition-colors'
                )}
              >
                <span className={cn(
                  isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 transition-colors'
                )}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <Badge variant={isActive ? 'default' : 'secondary'} className="ml-auto">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </div>

        <Separator className="my-6" />

        {/* Quick Actions */}
        <div className="space-y-3">
          <div className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Quick Actions
          </div>
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className={cn(
                'group flex flex-col px-3 py-3 text-sm rounded-lg transition-colors',
                action.color
              )}
            >
              <span className="font-medium">{action.name}</span>
              <span className="text-xs opacity-75">{action.description}</span>
            </Link>
          ))}
        </div>

        <Separator className="my-6" />

        {/* Account Summary */}
        <div className="px-3">
          <div className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
            <div className="text-sm font-medium">Portfolio Value</div>
            <div className="text-2xl font-bold">$125,500</div>
            <div className="text-sm opacity-90 flex items-center mt-1">
              <span className="text-green-300">+$8,750 (+7.49%)</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Support Link */}
      <div className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start text-sm" asChild>
          <Link href="/support">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Help & Support
          </Link>
        </Button>
      </div>
    </div>
  )
}