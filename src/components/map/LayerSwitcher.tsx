'use client'

import React from 'react'
import { useAppStore } from '@/stores/useAppStore'

export default function LayerSwitcher() {
    const { activeLayer, setActiveLayer } = useAppStore()

    const layers = [
        {
            id: 'greening',
            label: 'Baseline',
            description: 'Current tree inventory'
        },
        {
            id: 'diagnostic',
            label: 'Diagnostic',
            description: 'Improvement potential'
        },
        {
            id: 'simulation',
            label: 'Simulation',
            description: 'Scenario forecasting'
        }
    ] as const

    return (
        <div className="px-4 pb-3">
            <div className="flex gap-2">
                {layers.map((layer) => (
                    <button
                        key={layer.id}
                        onClick={() => setActiveLayer(layer.id)}
                        className={`flex-1 relative flex flex-col items-center justify-center gap-1 px-3 py-3 rounded-lg transition-all ${activeLayer === layer.id
                            ? 'bg-forest-600 border-2 border-forest-700 shadow-lg scale-105'
                            : 'bg-white border-2 border-rock-200 hover:border-forest-300 hover:bg-forest-50/50'
                            }`}
                    >
                        {/* Green Indicator Dot */}
                        {activeLayer === layer.id && (
                            <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-white rounded-full animate-pulse shadow-lg ring-2 ring-forest-400" />
                        )}

                        {/* Label */}
                        <div className="text-center">
                            <div className={`text-sm font-bold leading-tight ${activeLayer === layer.id ? 'text-white' : 'text-rock-600'
                                }`}>
                                {layer.label}
                            </div>
                            <div className={`text-[9px] mt-0.5 leading-tight ${activeLayer === layer.id ? 'text-forest-100' : 'text-rock-400'
                                }`}>
                                {layer.description}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
