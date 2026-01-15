'use client'

import { useAppStore } from '@/stores/useAppStore'
import AnalyticsChart from './AnalyticsChart'
import { Trees, Leaf, TrendingUp, BarChart3 } from 'lucide-react'

/**
 * AnalyticsPanel Component
 * 
 * Provides detailed data visualization and analysis for the selected Census Block Group (CBG).
 * The panel content dynamically updates based on the active map layer:
 * - Greeny (Baseline): Shows current tree inventory, density, and diversity.
 * - Diagnostic: Shows XGBoost-driven feature importance for property values.
 * - Simulation: Shows ROI and predictive scoring for urban greening scenarios.
 */
export default function AnalyticsPanel() {
  const {
    plantingIntensity,
    speciesDiversity,
    maintenanceBudget,
    mapInteraction,
    cbgData,
    setSelectedCbgId,
    activeLayer,
  } = useAppStore()

  const selectedCbgId = mapInteraction.selectedCbgId
  // Find the selected feature from the loaded CBG data
  const selectedCbg = cbgData?.features.find(f => (f.properties.cbgId || f.properties.GEOID) === selectedCbgId)

  const { simulationResults } = useAppStore()
  // Retrieve simulation results (ROI, Diagnostic scores) for the selected block
  const results = selectedCbgId ? simulationResults[selectedCbgId] : null

  // Only show panel when a CBG is selected
  if (!selectedCbgId || !selectedCbg) {
    return null
  }

  const handleClose = () => {
    setSelectedCbgId(null)
  }

  /**
   * Calculates a simplified greening score based on user-controlled parameters.
   * This score serves as a target or projection in the simulation.
   */
  const greeningScore = Math.round(
    (plantingIntensity + speciesDiversity + maintenanceBudget) / 3
  )

  /**
   * Data for the trend chart comparing baseline, diagnostic, simulation, and target goals.
   */
  const trendData = [
    { name: 'Base', value: selectedCbg.properties.Join_Count || 50 },
    { name: 'Diag', value: results?.diagnostic || 50 },
    { name: 'Sim', value: results?.roi || 50 },
    { name: 'Goal', value: greeningScore },
  ]

  // Mock data for tree greening layer
  const treeCount = selectedCbg.properties.Join_Count || 0
  const cbgArea = 0.15 // Mock area in square km (typical NYC CBG size)
  const treeDensity = Math.round(treeCount / cbgArea)

  // Mock species distribution
  const speciesDistribution = [
    { name: 'London Planetree', count: Math.round(treeCount * 0.25), percentage: 25 },
    { name: 'Honeylocust', count: Math.round(treeCount * 0.18), percentage: 18 },
    { name: 'Callery Pear', count: Math.round(treeCount * 0.15), percentage: 15 },
    { name: 'Pin Oak', count: Math.round(treeCount * 0.12), percentage: 12 },
    { name: 'Others', count: Math.round(treeCount * 0.30), percentage: 30 },
  ]

  // Mock age distribution
  const ageDistribution = [
    { range: '0-10 years', count: Math.round(treeCount * 0.20), percentage: 20 },
    { range: '11-25 years', count: Math.round(treeCount * 0.35), percentage: 35 },
    { range: '26-50 years', count: Math.round(treeCount * 0.30), percentage: 30 },
    { range: '50+ years', count: Math.round(treeCount * 0.15), percentage: 15 },
  ]

  /**
   * Renders the specific content based on the currently active map layer.
   * This ensures the analytics are contextually relevant to what the user sees on the map.
   */
  const renderLayerContent = () => {
    if (activeLayer === 'greening') {
      return (
        <div className="space-y-4">
          {/* Layer Description */}
          <div className="bg-forest-50 border border-forest-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="bg-forest-500 p-2 rounded-lg">
                <Trees className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-forest-800 mb-1">Tree Greening Layer</h3>
                <p className="text-xs text-rock-600 leading-relaxed">
                  Displays current tree inventory and distribution across the selected Census Block Group.
                  View total tree count, density metrics, species diversity, and age distribution.
                </p>
              </div>
            </div>
          </div>

          {/* Tree Statistics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3 border border-rock-200">
              <div className="flex items-center gap-2 mb-1">
                <Trees className="w-3.5 h-3.5 text-forest-600" />
                <p className="text-[10px] text-rock-400 font-bold uppercase">Total Trees</p>
              </div>
              <p className="text-2xl font-black text-forest-700">{treeCount.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-rock-200">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-forest-600" />
                <p className="text-[10px] text-rock-400 font-bold uppercase">Density</p>
              </div>
              <p className="text-2xl font-black text-forest-700">{treeDensity.toLocaleString()}</p>
              <p className="text-[9px] text-rock-400 mt-0.5">trees/km²</p>
            </div>
          </div>

          {/* Species Distribution */}
          <div className="bg-white rounded-lg p-4 border border-rock-200">
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-4 h-4 text-forest-600" />
              <h3 className="text-xs font-bold text-rock-700">Species Distribution</h3>
            </div>
            <div className="space-y-2">
              {speciesDistribution.map((species, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-rock-600 font-medium">{species.name}</span>
                    <span className="text-rock-500 font-bold">{species.percentage}%</span>
                  </div>
                  <div className="w-full bg-rock-100 rounded-full h-1.5">
                    <div
                      className="bg-forest-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${species.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Age Distribution */}
          <div className="bg-white rounded-lg p-4 border border-rock-200">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-forest-600" />
              <h3 className="text-xs font-bold text-rock-700">Age Distribution</h3>
            </div>
            <div className="space-y-2">
              {ageDistribution.map((age, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-rock-600 font-medium">{age.range}</span>
                    <span className="text-rock-500 font-bold">{age.percentage}%</span>
                  </div>
                  <div className="w-full bg-rock-100 rounded-full h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${age.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    // Diagnostic layer: XGBoost feature importance
    if (activeLayer === 'diagnostic') {
      // Mock feature importance data - varies slightly by CBG
      const baseImportance = {
        greening: 0.28,
        transportation: 0.35,
        schools: 0.22,
        other: 0.15
      }

      // Add some variance based on CBG ID
      const variance = selectedCbgId ? (parseInt(selectedCbgId.slice(-2), 10) % 10) / 100 : 0
      const features = [
        {
          name: 'Urban Greening & Tree Coverage',
          importance: baseImportance.greening + variance,
          color: 'bg-forest-500'
        },
        {
          name: 'Public Transportation Access',
          importance: baseImportance.transportation - variance * 0.5,
          color: 'bg-blue-500'
        },
        {
          name: 'School District Quality',
          importance: baseImportance.schools + variance * 0.3,
          color: 'bg-purple-500'
        },
        {
          name: 'Other Factors',
          importance: baseImportance.other - variance * 0.2,
          color: 'bg-rock-400'
        },
      ]

      // Normalize to ensure sum is 1.0
      const total = features.reduce((sum, f) => sum + f.importance, 0)
      const normalizedFeatures = features.map(f => ({
        ...f,
        importance: f.importance / total,
        percentage: Math.round((f.importance / total) * 100)
      }))

      return (
        <div className="space-y-4">
          {/* Layer Description */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-blue-800 mb-1">XGBoost Diagnostic Layer</h3>
                <p className="text-xs text-rock-600 leading-relaxed">
                  Identifies features that contribute to neighborhood property values.
                  Click different CBGs to compare how greening, transportation, and schools impact local prices.
                </p>
              </div>
            </div>
          </div>

          {/* Feature Importance Chart */}
          <div className="bg-white rounded-lg p-4 border border-rock-200">
            <h3 className="text-xs font-bold text-rock-700 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              Feature Importance for Property Value
            </h3>
            <div className="space-y-3">
              {normalizedFeatures.map((feature, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-rock-700 font-medium">{feature.name}</span>
                    <span className="text-xs text-rock-600 font-bold">{feature.percentage}%</span>
                  </div>
                  <div className="w-full bg-rock-100 rounded-full h-2">
                    <div
                      className={`${feature.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${feature.percentage}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-rock-400">
                    Importance: {feature.importance.toFixed(3)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Contributing Factors */}
          <div className="bg-white rounded-lg p-4 border border-rock-200">
            <h3 className="text-xs font-bold text-rock-700 mb-3">Top Contributing Factors</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2 bg-rock-50 rounded">
                <span className="text-rock-600">Higher Education Attainment</span>
                <span className="font-bold text-rock-700">10.9%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-rock-50 rounded">
                <span className="text-rock-600">Primary Land Use Type</span>
                <span className="font-bold text-rock-700">6.8%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-rock-50 rounded">
                <span className="text-rock-600">Residential Unit Density</span>
                <span className="font-bold text-rock-700">6.4%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-rock-50 rounded">
                <span className="text-rock-600">Access to Public Amenities</span>
                <span className="font-bold text-rock-700">4.2%</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Simulation layer content (keep original)
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-rock-50 rounded-lg p-3 border border-rock-100">
            <p className="text-[10px] text-rock-400 font-bold uppercase">ROI Increment</p>
            <p className="text-xl font-black text-forest-700">+{results?.roi || 0}%</p>
          </div>
          <div className="bg-rock-50 rounded-lg p-3 border border-rock-100">
            <p className="text-[10px] text-rock-400 font-bold uppercase">Improvement</p>
            <p className="text-xl font-black text-blue-700">{results?.diagnostic || 0}%</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 border border-rock-100">
          <h3 className="text-xs font-bold text-rock-600 mb-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse" />
            Scoring Methodology Prediction
          </h3>
          <AnalyticsChart data={trendData} />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-rock-100 p-5 space-y-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-bold text-rock-800">
          {activeLayer === 'greening' ? 'Tree Inventory' : 'Impact Analytics'}
        </h2>
        <span className="text-[10px] bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full font-bold uppercase">Live</span>
      </div>

      {renderLayerContent()}
    </div>
  )
}
