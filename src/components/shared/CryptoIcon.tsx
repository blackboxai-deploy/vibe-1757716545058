'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface CryptoIconProps {
  symbol: string
  name: string
  image?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showFallback?: boolean
}

export function CryptoIcon({
  symbol,
  name,
  image,
  size = 'md',
  className,
  showFallback = true
}: CryptoIconProps) {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  }

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }

  if (image) {
    return (
      <div className={cn('relative rounded-full overflow-hidden', sizeClasses[size], className)}>
        <Image
          src={image}
          alt={`${name} (${symbol}) logo`}
          fill
          className="object-cover"
          onError={() => {
            // Fallback will be handled by the parent component if needed
            console.log(`Failed to load image for ${symbol}`)
          }}
        />
      </div>
    )
  }

  if (showFallback) {
    // Color mapping for common cryptocurrencies
    const colorMap: Record<string, string> = {
      BTC: 'bg-orange-500',
      ETH: 'bg-blue-500',
      BNB: 'bg-yellow-500',
      ADA: 'bg-blue-600',
      SOL: 'bg-purple-500',
      XRP: 'bg-gray-800',
      DOT: 'bg-pink-500',
      DOGE: 'bg-yellow-600',
      AVAX: 'bg-red-500',
      MATIC: 'bg-purple-600',
      UNI: 'bg-pink-600',
      LINK: 'bg-blue-700',
      LTC: 'bg-gray-500',
      BCH: 'bg-green-500',
      USDC: 'bg-blue-400',
      USDT: 'bg-green-600',
    }

    const bgColor = colorMap[symbol.toUpperCase()] || 'bg-blue-600'

    return (
      <div className={cn(
        'rounded-full flex items-center justify-center text-white font-semibold',
        sizeClasses[size],
        textSizeClasses[size],
        bgColor,
        className
      )}>
        {symbol.slice(0, 2).toUpperCase()}
      </div>
    )
  }

  return null
}