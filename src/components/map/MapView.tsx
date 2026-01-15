'use client'

import { useEffect, useRef, useState } from 'react'
import Map, { MapRef, NavigationControl, FullscreenControl, ScaleControl, Source, Layer } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useAppStore } from '@/stores/useAppStore'
import { Loader2 } from 'lucide-react'
import MapDebug from './MapDebug'
import CbgTooltip from './CbgTooltip'
import SelectionHint from './SelectionHint'
import LayerSwitcher from './LayerSwitcher'

/**
 * MapView Component
 * 
 * The primary visualization engine for the GreenPulse Digital Twin.
 * Responsible for:
 * - Rendering the Mapbox GL JS map
 * - Managing zoom-dependent layer visibility
 * - Handling CBG interactions (click, hover)
 * - Displaying multiple data layers (Baseline, Diagnostic, Simulation)
 */
export default function MapView() {
  const mapRef = useRef<MapRef>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mapboxToken, setMapboxToken] = useState<string>('')

  const {
    setMousePosition,
    setHoveredCbgId,
    setScreenPosition,
    setSelectedCbgId,
    setPlantingIntensity,
    setSpeciesDiversity,
    setMaintenanceBudget,
    cbgData,
    mapInteraction,
    activeLayer,
    zoomLevel,
    setZoomLevel,
    setShowTreePoints
  } = useAppStore()

  // Load Mapbox token on client side
  // TODO: Move to .env.local after fixing environment variable loading
  useEffect(() => {
    // Temporary hardcoded token for testing
    const token = 'pk.eyJ1IjoiYXJ0aWVuZW9zIiwiYSI6ImNtamFmdm5pdDA0djczZm9ocWhzc3U1aDkifQ.rkK0cZyfEdXzAblqXVuQQg'
    // Fallback to env var if available
    const envToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
    const finalToken = envToken || token
    setMapboxToken(finalToken)
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 MapView - Token check:')
      console.log('  - Using hardcoded token:', !envToken)
      console.log('  - Token exists:', !!finalToken)
      console.log('  - Token length:', finalToken.length)
      console.log('  - Token preview:', finalToken ? `${finalToken.substring(0, 20)}...` : 'NOT FOUND')
    }
  }, [])

  const MAPBOX_TOKEN = mapboxToken

  useEffect(() => {
    if (mapRef.current && MAPBOX_TOKEN) {
      setMapLoaded(true)
    }
  }, [MAPBOX_TOKEN])

  /**
   * Finalizes the loading sequence once the Mapbox map is fully initialized.
   */
  const handleMapLoad = () => {
    console.log('✅ Map loaded successfully!')
    setMapLoaded(true)
    setIsLoading(false)
  }

  /**
   * Tracks mouse movement across the map to provide real-time hover feedback.
   * Updates global state with current mouse coordinates and hovered CBG ID.
   */
  const handleMouseMove = (e: any) => {
    if (e.lngLat) {
      setMousePosition({
        lng: e.lngLat.lng,
        lat: e.lngLat.lat,
      })
    }

    // Store screen position for tooltip
    if (e.point) {
      setScreenPosition({
        x: e.point.x,
        y: e.point.y,
      })
    }

    // Check if mouse is over a CBG feature
    if (mapRef.current && cbgData) {
      const features = mapRef.current.queryRenderedFeatures(e.point, {
        layers: ['cbg-fill', 'cbg-fill-diagnostic', 'cbg-fill-simulation'],
      })

      if (features.length > 0) {
        const feature = features[0]
        const cbgId = feature.properties?.cbgId || feature.properties?.GEOID
        if (cbgId) {
          setHoveredCbgId(cbgId)
          // Change cursor to pointer
          if (mapRef.current.getCanvas()) {
            mapRef.current.getCanvas().style.cursor = 'pointer'
          }
        }
      } else {
        setHoveredCbgId(null)
        if (mapRef.current.getCanvas()) {
          mapRef.current.getCanvas().style.cursor = 'default'
        }
      }
    }
  }

  /**
   * Resets hover and position states when the mouse leaves the map area.
   */
  const handleMouseLeave = () => {
    setMousePosition(null)
    setScreenPosition(null)
    setHoveredCbgId(null)
  }

  /**
   * Handles map click events to select a Census Block Group (CBG).
   * Loads the selected block's parameters into the control panel.
   */
  const handleClick = (e: any) => {
    // Handle CBG selection on click
    if (mapRef.current && cbgData && e.point) {
      const features = mapRef.current.queryRenderedFeatures(e.point, {
        layers: ['cbg-fill', 'cbg-fill-diagnostic', 'cbg-fill-simulation'],
      })

      if (features.length > 0) {
        const feature = features[0]
        const cbgId = feature.properties?.cbgId || feature.properties?.GEOID
        if (cbgId) {
          // Find the CBG feature and load its data into control panel
          const cbgFeature = cbgData.features.find(f => (f.properties.cbgId || f.properties.GEOID) === cbgId)
          if (cbgFeature) {
            setSelectedCbgId(cbgId)
            // Load CBG's current parameters into control panel
            const props = cbgFeature.properties
            setPlantingIntensity(props.plantingIntensity || 50)
            setSpeciesDiversity(props.speciesDiversity || 50)
            setMaintenanceBudget(props.maintenanceBudget || 60)
            console.log('✅ CBG selected:', cbgId, props)
          }
        }
      } else {
        // Clicked outside CBG, deselect
        setSelectedCbgId(null)
      }
    }
  }

  const handleError = (e: any) => {
    console.error('❌ Map error:', e)
    setIsLoading(false)
  }

  const { simulationResults } = useAppStore()

  /**
   * Prepares and transforms the GeoJSON data for the active layer.
   * Injects simulation results (diagnostic scores, ROI) into feature properties
   * for data-driven styling in Mapbox.
   */
  const mapData = {
    ...cbgData,
    features: cbgData?.features.map(f => ({
      ...f,
      properties: {
        ...f.properties,
        diagnostic: simulationResults?.[f.properties.cbgId || f.properties.GEOID || '']?.diagnostic || 0,
        roi: simulationResults?.[f.properties.cbgId || f.properties.GEOID || '']?.roi || 0,
      }
    }))
  }

  if (!MAPBOX_TOKEN) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-rock-100 to-rock-200">
        <div className="text-center p-8 bg-white rounded-xl shadow-xl max-w-md mx-4 border border-rock-200">
          <div className="mb-4">
            <div className="w-16 h-16 mx-auto bg-forest-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-rock-800 mb-2">Mapbox Token Required</h3>
          <p className="text-sm text-rock-600 mb-4">
            To display the map, please set your Mapbox access token in <code className="bg-rock-100 px-2 py-1 rounded text-xs">.env.local</code>
          </p>
          <div className="text-left bg-rock-50 p-3 rounded text-xs font-mono text-rock-700 border border-rock-200">
            <div className="mb-1">Create <code>.env.local</code> file:</div>
            <div className="text-forest-600">NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here</div>
          </div>
          <a
            href="https://account.mapbox.com/access-tokens/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm text-forest-600 hover:text-forest-700 underline"
          >
            Get your free token →
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full w-full relative">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-rock-50/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-forest-600 animate-spin" />
            <p className="text-sm text-rock-600">Loading map...</p>
          </div>
        </div>
      )}

      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{
          longitude: -73.935242, // New York City
          latitude: 40.730610,
          zoom: 11,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/light-v11"
        onLoad={handleMapLoad}
        onError={handleError}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onZoom={(e) => {
          const newZoom = e.viewState.zoom
          setZoomLevel(newZoom)
          setShowTreePoints(newZoom >= 15) // Show points at zoom 15+
        }}
        interactiveLayerIds={['cbg-fill', 'cbg-fill-diagnostic', 'cbg-fill-simulation']}
        cursor="default"
      >
        {/* Map Controls */}
        <NavigationControl
          position="top-left"
          showCompass={true}
          showZoom={true}
        />
        <FullscreenControl position="top-left" />
        <ScaleControl position="bottom-left" />

        {/* CBG Boundaries and Layers */}
        {cbgData && (
          <Source id="cbg-data" type="geojson" data={mapData}>
            {/* Greening Layer (Default) */}
            <Layer
              id="cbg-fill"
              type="fill"
              layout={{ visibility: activeLayer === 'greening' ? 'visible' : 'none' }}
              paint={{
                'fill-color': [
                  'interpolate',
                  ['linear'],
                  ['coalesce', ['get', 'Join_Count'], 0],
                  0, '#fee2e2',
                  10, '#fecaca',
                  30, '#fde68a',
                  60, '#86efac',
                  100, '#15803d',
                ],
                'fill-opacity': 0.6,
              }}
            />

            {/* Diagnostic Layer (XGBoost) */}
            <Layer
              id="cbg-fill-diagnostic"
              type="fill"
              layout={{ visibility: activeLayer === 'diagnostic' ? 'visible' : 'none' }}
              paint={{
                'fill-color': [
                  'interpolate',
                  ['linear'],
                  ['get', 'diagnostic'],
                  0, '#f1f5f9',
                  25, '#cbd5e1',
                  50, '#94a3b8',
                  75, '#475569',
                  100, '#1e293b',
                ],
                'fill-opacity': 0.7,
              }}
            />

            {/* Simulation Heatmap Layer */}
            <Layer
              id="simulation-heatmap"
              type="heatmap"
              layout={{ visibility: activeLayer === 'simulation' ? 'visible' : 'none' }}
              paint={{
                'heatmap-weight': [
                  'interpolate',
                  ['linear'],
                  ['get', 'roi'],
                  0, 0,
                  100, 1
                ],
                'heatmap-intensity': 1.5,
                'heatmap-color': [
                  'interpolate',
                  ['linear'],
                  ['heatmap-density'],
                  0, 'rgba(0,0,0,0)',
                  0.2, '#f0fdf4',
                  0.4, '#bbf7d0',
                  0.6, '#4ade80',
                  0.8, '#16a34a',
                  1, '#14532d'
                ],
                'heatmap-radius': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  11, 20,
                  15, 50
                ],
                'heatmap-opacity': 0.8
              }}
            />

            {/* Simulation Fill Layer (transparent, for clicking) */}
            <Layer
              id="cbg-fill-simulation"
              type="fill"
              layout={{ visibility: activeLayer === 'simulation' ? 'visible' : 'none' }}
              paint={{
                'fill-color': 'transparent',
                'fill-opacity': 0,
              }}
            />

            {/* Border layer */}
            <Layer
              id="cbg-border"
              type="line"
              paint={{
                'line-color': '#4a7d61',
                'line-width': 1,
                'line-opacity': 0.4,
              }}
            />
          </Source>
        )}

        {/* Tree Points Source & Layer */}
        {zoomLevel >= 13 && (
          <Source id="tree-points" type="geojson" data="/api/trees/points">
            <Layer
              id="tree-point-layer"
              type="circle"
              paint={{
                'circle-radius': [
                  'interpolate', ['linear'], ['zoom'],
                  13, 1.5,
                  16, 4
                ],
                'circle-color': '#059669',
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff',
                'circle-opacity': 0.8
              }}
            />
          </Source>
        )}
      </Map>

      <LayerSwitcher />

      {/* CBG Tooltip */}
      <CbgTooltip />

      {/* Selection Hint */}
      <SelectionHint />

      {/* Debug component - only in development */}
      <MapDebug />
    </div>
  )
}

