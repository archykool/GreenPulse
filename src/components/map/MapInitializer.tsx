'use client'

import { useEffect, useState } from 'react'
import { useAppStore } from '@/stores/useAppStore'
import { mockCbgData } from '@data/mock/mockCbgData'
import { fetchCbgData } from '@/lib/api'
import { runGlobalSimulation } from '@/lib/simulation'

// Component to initialize map data on mount
export default function MapInitializer() {
  const setCbgData = useAppStore((state) => state.setCbgData)
  const setSimulationResults = useAppStore((state) => state.setSimulationResults)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/cbg')
        if (!response.ok) throw new Error('Failed to fetch CBG data')
        const data = await response.json()

        setCbgData(data)

        // Run initial simulation
        const results = runGlobalSimulation(data)
        setSimulationResults(results)

        console.log('✅ CBG data loaded and simulation initialized')
      } catch (err) {
        console.error('❌ Failed to load CBG data:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [setCbgData, setSimulationResults])

  return null // This component doesn't render anything
}

