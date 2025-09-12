import { NextResponse } from 'next/server'
import { fetchTrades } from '@/lib/crypto-api'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const symbol = searchParams.get('symbol')
  const limit = parseInt(searchParams.get('limit') || '50')

  try {
    let trades = await fetchTrades()

    // Apply filters
    if (status) {
      trades = trades.filter(trade => trade.status === status)
    }

    if (symbol) {
      trades = trades.filter(trade => 
        trade.symbol.toLowerCase() === symbol.toLowerCase()
      )
    }

    // Apply limit
    trades = trades.slice(0, limit)

    return NextResponse.json({
      trades,
      total: trades.length,
      filters: { status, symbol, limit }
    })
  } catch (error) {
    console.error('Trades API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch trades data' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { 
      type, 
      symbol, 
      amount, 
      price, 
      order_type = 'market',
      stop_loss,
      take_profit 
    } = body

    // Validation
    if (!type || !symbol || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: type, symbol, amount' },
        { status: 400 }
      )
    }

    if (!['buy', 'sell'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid trade type. Must be "buy" or "sell"' },
        { status: 400 }
      )
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      )
    }

    // Simulate API processing delay
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Calculate trade details
    const marketPrice = price || (symbol === 'BTC' ? 43250 : symbol === 'ETH' ? 2650 : 315)
    const totalValue = amount * marketPrice
    const fee = totalValue * 0.001 // 0.1% fee
    const tradeId = `trade_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const tradeResponse = {
      success: true,
      trade: {
        id: tradeId,
        type,
        symbol: symbol.toUpperCase(),
        amount,
        price: marketPrice,
        total_value: totalValue,
        fee,
        order_type,
        status: order_type === 'market' ? 'completed' : 'pending',
        timestamp: new Date().toISOString(),
        stop_loss,
        take_profit,
      },
      message: `${type === 'buy' ? 'Buy' : 'Sell'} order ${order_type === 'market' ? 'executed' : 'placed'} successfully`
    }

    return NextResponse.json(tradeResponse)
  } catch (error) {
    console.error('Trade Execution Error:', error)
    return NextResponse.json(
      { error: 'Failed to execute trade' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tradeId = searchParams.get('id')

    if (!tradeId) {
      return NextResponse.json(
        { error: 'Trade ID is required' },
        { status: 400 }
      )
    }

    // Simulate cancellation processing
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      message: `Trade ${tradeId} cancelled successfully`,
      cancelled_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Trade Cancellation Error:', error)
    return NextResponse.json(
      { error: 'Failed to cancel trade' },
      { status: 500 }
    )
  }
}