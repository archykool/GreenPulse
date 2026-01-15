'use client'

import { useAppStore } from '@/stores/useAppStore'
import SliderControl from './SliderControl'
import UploadZone from './UploadZone'
import { X } from 'lucide-react'

export default function ControlPanel() {
  const {
    plantingIntensity,
    speciesDiversity,
    maintenanceBudget,
    setPlantingIntensity,
    setSpeciesDiversity,
    setMaintenanceBudget,
    mapInteraction,
    cbgData,
    setSelectedCbgId,
    updateSelectedCbgData,
    activeLayer,
  } = useAppStore()

  const selectedCbgId = mapInteraction.selectedCbgId
  const selectedCbg = cbgData?.features.find(f => (f.properties.cbgId || f.properties.GEOID) === selectedCbgId)

  // Show selection hint if no CBG is selected
  if (!selectedCbgId || !selectedCbg) {
    return (
      <div className="bg-forest-50 border border-forest-100 rounded-xl p-6 text-center">
        <div className="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-6 h-6 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
        </div>
        <h3 className="text-sm font-bold text-forest-900 mb-1">No Block Selected</h3>
        <p className="text-xs text-rock-500">Pick a neighborhood block group on the map to view details.</p>
      </div>
    )
  }

  const handleClose = () => {
    setSelectedCbgId(null)
  }

  const handleParameterChange = (param: 'plantingIntensity' | 'speciesDiversity' | 'maintenanceBudget', value: number) => {
    // Update global state
    if (param === 'plantingIntensity') {
      setPlantingIntensity(value)
    } else if (param === 'speciesDiversity') {
      setSpeciesDiversity(value)
    } else if (param === 'maintenanceBudget') {
      setMaintenanceBudget(value)
    }

    // Update selected CBG's data
    if (updateSelectedCbgData) {
      updateSelectedCbgData(selectedCbgId, { [param]: value })
    }
  }

  // Baseline layer: show only info
  if (activeLayer === 'greening') {
    return (
      <div className="bg-white rounded-xl border border-rock-100 p-5 space-y-4 shadow-sm">
        {/* Header with CBG name and close button */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold text-rock-800">
              {selectedCbg.properties.name || selectedCbg.properties.NAMELSAD || selectedCbgId}
            </h3>
            <p className="text-[10px] text-rock-400 uppercase tracking-tight font-semibold">Block Group ID: {selectedCbgId}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-rock-300 hover:text-rock-600 transition-colors p-1"
            title="Deselect block"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info message for baseline layer */}
        <div className="bg-forest-50 border border-forest-200 rounded-lg p-4 text-center">
          <p className="text-xs text-rock-600">
            View current tree inventory and distribution data in the analytics panel below.
          </p>
        </div>
      </div>
    )
  }

  // Diagnostic layer: show only info
  if (activeLayer === 'diagnostic') {
    return (
      <div className="bg-white rounded-xl border border-rock-100 p-5 space-y-4 shadow-sm">
        {/* Header with CBG name and close button */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold text-rock-800">
              {selectedCbg.properties.name || selectedCbg.properties.NAMELSAD || selectedCbgId}
            </h3>
            <p className="text-[10px] text-rock-400 uppercase tracking-tight font-semibold">Block Group ID: {selectedCbgId}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-rock-300 hover:text-rock-600 transition-colors p-1"
            title="Deselect block"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info message for diagnostic layer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-xs text-rock-600">
            View XGBoost feature importance analysis in the analytics panel below.
          </p>
        </div>
      </div>
    )
  }

  // Simulation layer: show full controls with sliders
  return (
    <div className="bg-white rounded-xl border border-rock-100 p-5 space-y-4 shadow-sm">
      {/* Header with CBG name and close button */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-sm font-bold text-rock-800">
            {selectedCbg.properties.name || selectedCbg.properties.NAMELSAD || selectedCbgId}
          </h3>
          <p className="text-[10px] text-rock-400 uppercase tracking-tight font-semibold">Block Group ID: {selectedCbgId}</p>
        </div>
        <button
          onClick={handleClose}
          className="text-rock-300 hover:text-rock-600 transition-colors p-1"
          title="Deselect block"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Compact Slider Controls */}
      <div className="space-y-3">
        <SliderControl
          label="Planting Intensity"
          value={plantingIntensity}
          onChange={(value) => handleParameterChange('plantingIntensity', value)}
          min={0}
          max={100}
          unit="%"
        />

        <SliderControl
          label="Species Diversity"
          value={speciesDiversity}
          onChange={(value) => handleParameterChange('speciesDiversity', value)}
          min={0}
          max={100}
          unit="%"
        />

        <SliderControl
          label="Maintenance Budget"
          value={maintenanceBudget}
          onChange={(value) => handleParameterChange('maintenanceBudget', value)}
          min={0}
          max={100}
          unit="%"
        />
      </div>

      {/* Compact Upload Zone */}
      <div className="pt-2 border-t border-rock-200/50">
        <UploadZone />
      </div>
    </div>
  )
}
