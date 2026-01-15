'use client'

import { useAppStore } from '@/stores/useAppStore'
import { MousePointer2 } from 'lucide-react'

export default function SelectionHint() {
  const { mapInteraction, cbgData } = useAppStore()
  const selectedCbgId = mapInteraction.selectedCbgId

  // Only show hint when no CBG is selected and data is loaded
  if (selectedCbgId || !cbgData) {
    return null
  }

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-white/90 backdrop-blur-md rounded-lg shadow-xl border border-white/20 px-4 py-3 flex items-center gap-2 animate-pulse">
      <MousePointer2 className="w-5 h-5 text-forest-600" />
      <span className="text-sm text-rock-700">
        Click on a CBG area to view and edit parameters
      </span>
    </div>
  )
}

