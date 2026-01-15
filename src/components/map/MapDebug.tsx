'use client'

import { useEffect, useState } from 'react'

// Debug component to check if token is loaded
export default function MapDebug() {
  const [token, setToken] = useState<string>('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Use same token as MapView (hardcoded for now)
    const hardcodedToken = 'pk.eyJ1IjoiYXJ0aWVuZW9zIiwiYSI6ImNtamFmdm5pdDA0djczZm9ocWhzc3U1aDkifQ.rkK0cZyfEdXzAblqXVuQQg'
    const envToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
    const finalToken = envToken || hardcodedToken
    setToken(finalToken)
  }, [])

  // Set to true to show debug info
  const SHOW_DEBUG = false

  if (process.env.NODE_ENV === 'development' && isClient && SHOW_DEBUG) {
    const hasToken = token.length > 0
    const tokenPreview = hasToken ? `${token.substring(0, 20)}...` : 'NOT FOUND'
    
    return (
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-xl text-xs font-mono z-50 border border-rock-300 max-w-xs">
        <div className="text-rock-700 font-semibold mb-2">🔍 Debug Info</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-rock-600">Status:</span>
            <span className={`font-semibold ${hasToken ? 'text-forest-600' : 'text-red-600'}`}>
              {hasToken ? '✓ Token Found' : '✗ Token Missing'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-rock-600">Preview:</span>
            <span className="text-forest-600 break-all">{tokenPreview}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-rock-600">Length:</span>
            <span className="text-rock-500">{token.length}</span>
          </div>
          {hasToken && (
            <div className="mt-2 p-2 bg-forest-50 border border-forest-200 rounded text-forest-700">
              ✅ Using hardcoded token (temporary solution)
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}

