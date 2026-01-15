// API utilities for fetching CBG data

import { CBGGeoJSON } from '@/types/cbg'

/**
 * Fetch CBG data from backend API
 * @param endpoint API endpoint URL
 * @returns Promise<CBGGeoJSON>
 */
export async function fetchCbgData(endpoint: string = '/api/cbg'): Promise<CBGGeoJSON> {
  try {
    const response = await fetch(endpoint)
    if (!response.ok) {
      throw new Error(`Failed to fetch CBG data: ${response.statusText}`)
    }
    const data = await response.json()
    
    // Validate data structure
    if (data.type !== 'FeatureCollection' || !Array.isArray(data.features)) {
      throw new Error('Invalid GeoJSON format')
    }
    
    return data as CBGGeoJSON
  } catch (error) {
    console.error('Error fetching CBG data:', error)
    throw error
  }
}

/**
 * Load CBG data from a local JSON file
 * Useful for development or when data is static
 */
export async function loadCbgDataFromFile(filePath: string): Promise<CBGGeoJSON> {
  try {
    const response = await fetch(filePath)
    if (!response.ok) {
      throw new Error(`Failed to load CBG data file: ${response.statusText}`)
    }
    const data = await response.json()
    return data as CBGGeoJSON
  } catch (error) {
    console.error('Error loading CBG data file:', error)
    throw error
  }
}

