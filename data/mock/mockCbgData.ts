import { CBGGeoJSON } from '@/types/cbg'

// Mock CBG data for New York City area
// These are simplified polygons around Manhattan
export const mockCbgData: CBGGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        cbgId: 'cbg-001',
        name: 'Lower Manhattan',
        plantingIntensity: 35,
        speciesDiversity: 45,
        maintenanceBudget: 60,
        greeningScore: 47,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-74.02, 40.72],
            [-74.01, 40.72],
            [-74.01, 40.71],
            [-74.02, 40.71],
            [-74.02, 40.72],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        cbgId: 'cbg-002',
        name: 'Midtown East',
        plantingIntensity: 65,
        speciesDiversity: 70,
        maintenanceBudget: 55,
        greeningScore: 63,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.97, 40.76],
            [-73.96, 40.76],
            [-73.96, 40.75],
            [-73.97, 40.75],
            [-73.97, 40.76],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        cbgId: 'cbg-003',
        name: 'Upper West Side',
        plantingIntensity: 25,
        speciesDiversity: 30,
        maintenanceBudget: 40,
        greeningScore: 32,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.99, 40.79],
            [-73.98, 40.79],
            [-73.98, 40.78],
            [-73.99, 40.78],
            [-73.99, 40.79],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        cbgId: 'cbg-004',
        name: 'Central Park Area',
        plantingIntensity: 85,
        speciesDiversity: 90,
        maintenanceBudget: 80,
        greeningScore: 85,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.96, 40.78],
            [-73.95, 40.78],
            [-73.95, 40.77],
            [-73.96, 40.77],
            [-73.96, 40.78],
          ],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        cbgId: 'cbg-005',
        name: 'East Village',
        plantingIntensity: 50,
        speciesDiversity: 55,
        maintenanceBudget: 50,
        greeningScore: 52,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-73.98, 40.73],
            [-73.97, 40.73],
            [-73.97, 40.72],
            [-73.98, 40.72],
            [-73.98, 40.73],
          ],
        ],
      },
    },
  ],
}

