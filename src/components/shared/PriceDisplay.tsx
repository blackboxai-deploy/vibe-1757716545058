'use client'

import React from 'react'
import { formatCurrency, getChangeColor } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface PriceDisplayProps {
  price: number
  change?: number
  changePercentage?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showCurrency?: boolean
  showChange?: boolean
  className?: string
}

export function PriceDisplay({
  price,
  change,
  changePercentage,
  size = 'md',
  showCurrency = true,
  showChange = true,
  className
}: PriceDisplayProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const changeSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <div className={cn('font-semibold text-gray-900', sizeClasses[size])}>
        {showCurrency ? formatCurrency(price) : price.toLocaleString()}
      </div>
      
      {showChange && (change !== undefined || changePercentage !== undefined) && (
        <div className={cn('flex items-center space-x-1', changeSizeClasses[size])}>
          {change !== undefined && (
            <span className={getChangeColor(change)}>
              {change >= 0 ? '+' : ''}
              {formatCurrency(change)}
            </span>
          )}
          
          {changePercentage !== undefined && (
            <span className={cn('flex items-center', getChangeColor(changePercentage))}>
              {changePercentage >= 0 ? (
                <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-3 h-3 mr-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {Math.abs(changePercentage).toFixed(2)}%
            </span>
          )}
        </div>
      )}
    </div>
  )
}