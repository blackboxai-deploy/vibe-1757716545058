import { NextResponse } from 'next/server'
import { fetchCryptoList, fetchCryptoById, fetchMarketData } from '@/lib/crypto-api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const endpoint = searchParams.get('endpoint')

  try {
    if (endpoint === 'market-data') {
      const marketData = await fetchMarketData()
      return NextResponse.json(marketData)
    }
    
    if (id) {
      const crypto = await fetchCryptoById(id)
      if (!crypto) {
        return NextResponse.json(
          { error: 'Cryptocurrency not found' },
          { status: 404 }
        )
      }
      return NextResponse.json(crypto)
    }

    const cryptos = await fetchCryptoList()
    return NextResponse.json(cryptos)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cryptocurrency data' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, symbol, amount, price } = body

    // Simulate API processing delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock response based on action
    switch (action) {
      case 'buy':
        return NextResponse.json({
          success: true,
          message: `Successfully purchased ${amount} ${symbol} at ${price}`,
          transaction_id: `tx_${Date.now()}`,
          timestamp: new Date().toISOString(),
        })

      case 'sell':
        return NextResponse.json({
          success: true,
          message: `Successfully sold ${amount} ${symbol} at ${price}`,
          transaction_id: `tx_${Date.now()}`,
          timestamp: new Date().toISOString(),
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action specified' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}