'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { fetchNewsArticles } from '@/lib/crypto-api'
import { formatTimeAgo } from '@/lib/utils'
import type { NewsArticle } from '@/types/crypto'
import Image from 'next/image'

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'positive' | 'negative' | 'neutral'>('all')

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchNewsArticles()
        setArticles(data)
      } catch (error) {
        console.error('Failed to fetch news:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadNews()
  }, [])

  const filteredArticles = articles.filter(article => 
    filter === 'all' || article.sentiment === filter
  )

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800'
      case 'negative':
        return 'bg-red-100 text-red-800'
      case 'neutral':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center min-h-96">
          <LoadingSpinner text="Loading news..." />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Crypto News</h1>
          <p className="text-gray-600 mt-1">Stay updated with the latest cryptocurrency news and insights</p>
        </div>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Latest Updates
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Filter by sentiment:</span>
            <div className="flex space-x-2">
              {['all', 'positive', 'negative', 'neutral'].map((sentimentFilter) => (
                <Button
                  key={sentimentFilter}
                  variant={filter === sentimentFilter ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(sentimentFilter as any)}
                  className="capitalize"
                >
                  {sentimentFilter}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* News Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative h-48 w-full">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover rounded-t-lg"
                onError={() => {
                  console.log(`Failed to load image for article: ${article.title}`)
                }}
              />
              <div className="absolute top-3 right-3">
                <Badge className={getSentimentColor(article.sentiment)} variant="secondary">
                  {article.sentiment}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold line-clamp-2 leading-tight">
                {article.title}
              </CardTitle>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{article.source}</span>
                <span>{formatTimeAgo(article.published_at)}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                {article.summary}
              </p>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No articles found for the selected filter.</p>
          </CardContent>
        </Card>
      )}

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="px-8">
          Load More Articles
        </Button>
      </div>
    </div>
  )
}