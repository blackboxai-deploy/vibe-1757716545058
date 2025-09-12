import { NextResponse } from 'next/server'
import { fetchPortfolio } from '@/lib/crypto-api'

export async function GET() {
  try {
    const portfolio = await fetchPortfolio()
    return NextResponse.json(portfolio)
  } catch (error) {
    console.error('Portfolio API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, symbol, amount } = body

    // Simulate API processing delay
    await new Promise(resolve => setTimeout(resolve, 800))

    switch (action) {
      case 'add-holding':
        return NextResponse.json({
          success: true,
          message: `Added ${amount} ${symbol} to portfolio`,
          holding_id: `holding_${Date.now()}`,
        })

      case 'remove-holding':
        return NextResponse.json({
          success: true,
          message: `Removed ${symbol} from portfolio`,
        })

      case 'update-holding':
        return NextResponse.json({
          success: true,
          message: `Updated ${symbol} holding to ${amount}`,
        })

      case 'rebalance':
        return NextResponse.json({
          success: true,
          message: 'Portfolio rebalanced successfully',
          rebalance_id: `rebalance_${Date.now()}`,
          suggestions: [
            {
              symbol: 'BTC',
              action: 'reduce',
              current_allocation: 55.2,
              target_allocation: 50.0,
              adjustment: -5.2
            },
            {
              symbol: 'ETH',
              action: 'increase',
              current_allocation: 25.8,
              target_allocation: 30.0,
              adjustment: +4.2
            }
          ]
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action specified' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Portfolio API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process portfolio request' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { holdings } = body

    // Simulate portfolio update
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: 'Portfolio updated successfully',
      updated_holdings: holdings.length,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Portfolio Update Error:', error)
    return NextResponse.json(
      { error: 'Failed to update portfolio' },
      { status: 500 }
    )
  }
}