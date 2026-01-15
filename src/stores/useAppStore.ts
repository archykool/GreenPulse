import { create } from 'zustand'
import { CBGGeoJSON, MapInteractionState } from '@/types/cbg'

/**
 * Global application state interface using Zustand.
 * Manages map interaction, simulation parameters, and data loading states.
 */
interface AppState {
  // --- Control Parameters (Decision Support Sliders) ---
  /** Current tree planting intensity setting (0-100) */
  plantingIntensity: number
  /** Level of tree species diversity/heterogeneity (0-100) */
  speciesDiversity: number
  /** Allocated budget for long-term tree maintenance (0-100) */
  maintenanceBudget: number

  // --- Map and Layer State ---
  /** Loaded Census Block Group (CBG) GeoJSON data */
  cbgData: CBGGeoJSON | null
  /** Currently active map visualization layer */
  activeLayer: 'greening' | 'diagnostic' | 'simulation'
  /** Visibility toggle for individual tree point markers */
  showTreePoints: boolean
  /** Real-time zoom level of the Mapbox map */
  zoomLevel: number
  /** Previous zoom level for transition handling */
  lastZoomLevel: number
  /** Map of CBG IDs to their calculated ROI and diagnostic impact scores */
  simulationResults: Record<string, { roi: number; diagnostic: number }>
  /** Detailed state of user interaction with the map */
  mapInteraction: MapInteractionState

  // --- Actions & State Setters ---
  setPlantingIntensity: (value: number) => void
  setSpeciesDiversity: (value: number) => void
  setMaintenanceBudget: (value: number) => void
  setCbgData: (data: CBGGeoJSON) => void
  setActiveLayer: (layer: 'greening' | 'diagnostic' | 'simulation') => void
  setShowTreePoints: (show: boolean) => void
  setZoomLevel: (zoom: number) => void
  setSimulationResults: (results: Record<string, { roi: number; diagnostic: number }>) => void
  setHoveredCbgId: (cbgId: string | null) => void
  setSelectedCbgId: (cbgId: string | null) => void
  setMousePosition: (position: { lng: number; lat: number } | null) => void
  setScreenPosition: (position: { x: number; y: number } | null) => void
  /** Updates the properties of a specific CBG feature within the GeoJSON collection */
  updateSelectedCbgData: (cbgId: string, updates: Partial<{ plantingIntensity: number; speciesDiversity: number; maintenanceBudget: number }>) => void
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  plantingIntensity: 50,
  speciesDiversity: 50,
  maintenanceBudget: 50,

  // Map data
  cbgData: null,
  activeLayer: 'greening',
  showTreePoints: false,
  zoomLevel: 11,
  lastZoomLevel: 11,
  simulationResults: {},
  mapInteraction: {
    hoveredCbgId: null,
    selectedCbgId: null,
    mousePosition: null,
    screenPosition: null,
  },

  // Actions
  setPlantingIntensity: (value) => set({ plantingIntensity: Math.max(0, Math.min(100, value)) }),
  setSpeciesDiversity: (value) => set({ speciesDiversity: Math.max(0, Math.min(100, value)) }),
  setMaintenanceBudget: (value) => set({ maintenanceBudget: Math.max(0, Math.min(100, value)) }),
  setCbgData: (data) => set({ cbgData: data }),
  setActiveLayer: (layer) => set({ activeLayer: layer }),
  setShowTreePoints: (show) => set({ showTreePoints: show }),
  setZoomLevel: (zoom) => set((state) => ({
    lastZoomLevel: state.zoomLevel,
    zoomLevel: zoom
  })),
  setSimulationResults: (results: Record<string, { roi: number; diagnostic: number }>) => set({ simulationResults: results }),
  setHoveredCbgId: (cbgId) => set((state) => ({
    mapInteraction: { ...state.mapInteraction, hoveredCbgId: cbgId }
  })),
  setSelectedCbgId: (cbgId) => set((state) => ({
    mapInteraction: { ...state.mapInteraction, selectedCbgId: cbgId }
  })),
  setMousePosition: (position) => set((state) => ({
    mapInteraction: { ...state.mapInteraction, mousePosition: position }
  })),
  setScreenPosition: (position) => set((state) => ({
    mapInteraction: { ...state.mapInteraction, screenPosition: position }
  })),
  updateSelectedCbgData: (cbgId, updates) => set((state) => {
    if (!state.cbgData) return state

    // Calculate new greening score
    const newPlantingIntensity = updates.plantingIntensity ??
      state.cbgData.features.find(f => f.properties.cbgId === cbgId)?.properties.plantingIntensity ?? 50
    const newSpeciesDiversity = updates.speciesDiversity ??
      state.cbgData.features.find(f => f.properties.cbgId === cbgId)?.properties.speciesDiversity ?? 50
    const newMaintenanceBudget = updates.maintenanceBudget ??
      state.cbgData.features.find(f => f.properties.cbgId === cbgId)?.properties.maintenanceBudget ?? 50
    const newGreeningScore = Math.round((newPlantingIntensity + newSpeciesDiversity + newMaintenanceBudget) / 3)

    // Update the CBG feature
    const updatedFeatures = state.cbgData.features.map(f => {
      if (f.properties.cbgId === cbgId) {
        return {
          ...f,
          properties: {
            ...f.properties,
            ...updates,
            greeningScore: newGreeningScore,
          },
        }
      }
      return f
    })

    return {
      ...state,
      cbgData: {
        ...state.cbgData,
        features: updatedFeatures,
      },
    }
  }),
}))

