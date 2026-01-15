// Next.js API route for CBG data
// This is a placeholder - replace with your actual backend endpoint

import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'processed', 'nyc_CBG_treecount.geojson')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = JSON.parse(fileContents)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching tree count data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tree count data' },
      { status: 500 }
    )
  }
}

