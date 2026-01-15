'use client'

import { useAppStore } from '@/stores/useAppStore'
import { CBGProperties } from '@/types/cbg'

export default function CbgTooltip() {
  const { mapInteraction, cbgData, simulationResults } = useAppStore()
  const { hoveredCbgId, screenPosition } = mapInteraction

  if (!hoveredCbgId || !screenPosition || !cbgData) {
    return null
  }

  const feature = cbgData.features.find(f => (f.properties.cbgId || f.properties.GEOID) === hoveredCbgId)
  if (!feature) return null

  const props: CBGProperties = feature.properties
  const results = simulationResults[hoveredCbgId]

  return (
    <div
      className="fixed bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/20 p-4 min-w-[220px] z-50 pointer-events-none"
      style={{
        left: `${screenPosition.x}px`,
        top: `${screenPosition.y}px`,
        transform: 'translate(-50%, -100%)',
        marginTop: '-10px',
      }}
    >
      <div className="space-y-3">
        <div className="border-b border-rock-100 pb-2">
          <div className="font-bold text-forest-800 text-sm leading-tight">{props.name || props.NAMELSAD || hoveredCbgId}</div>
          {props.BoroName && (
            <div className="text-[11px] text-forest-600 font-semibold mt-0.5">{props.BoroName}</div>
          )}
          <div className="text-[10px] text-rock-400 font-semibold uppercase mt-0.5">Census Block Group</div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-rock-500">Tree Count:</span>
            <span className="font-bold text-forest-700 bg-forest-50 px-1.5 py-0.5 rounded">{props.Join_Count || 0}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex flex-col">
              <span className="text-[10px] text-rock-400 font-bold uppercase">ROI</span>
              <span className="font-bold text-forest-600">{results?.roi || 0}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-rock-400 font-bold uppercase">Diag</span>
              <span className="font-bold text-blue-600">{results?.diagnostic || 0}%</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-rock-100">
            <span className="text-rock-600 font-bold">Greening Level:</span>
            <span className="font-black text-forest-600">{Math.round((props.plantingIntensity + props.speciesDiversity + props.maintenanceBudget) / 3)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

