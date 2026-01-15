// CBG (Census Block Group) data types

export interface CBGProperties {
  cbgId?: string
  GEOID?: string
  Join_Count?: number
  NAMELSAD?: string
  BoroName?: string
  name?: string
  // Greening metrics
  plantingIntensity: number // 0-100
  speciesDiversity: number // 0-100
  maintenanceBudget: number // 0-100
  // Calculated score
  greeningScore?: number // 0-100, calculated from above metrics
  diagnostic?: number
  roi?: number
}

export interface CBGFeature {
  type: 'Feature'
  properties: CBGProperties
  geometry: {
    type: 'Polygon' | 'MultiPolygon'
    coordinates: number[][][] | number[][][][]
  }
}

export interface CBGGeoJSON {
  type: 'FeatureCollection'
  features: CBGFeature[]
}

// Map interaction state
export interface MapInteractionState {
  hoveredCbgId: string | null
  selectedCbgId: string | null
  mousePosition: { lng: number; lat: number } | null
  screenPosition: { x: number; y: number } | null
}

