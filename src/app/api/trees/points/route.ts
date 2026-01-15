import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'processed', 'tree_census_2025_10percent.json')
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const data = JSON.parse(fileContents)

        return NextResponse.json(data)
    } catch (error) {
        console.error('Error loading tree point data:', error)
        return NextResponse.json({ error: 'Failed to load data' }, { status: 500 })
    }
}
