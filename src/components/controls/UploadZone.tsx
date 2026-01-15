'use client'

import { useState, useCallback } from 'react'
import { Upload, FileText, X } from 'lucide-react'

export default function UploadZone() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'text/csv') {
      setUploadedFile(file)
      // Handle file upload logic here
    }
  }, [])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'text/csv') {
      setUploadedFile(file)
      // Handle file upload logic here
    }
  }, [])

  if (uploadedFile) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <FileText className="w-4 h-4 text-forest-600 flex-shrink-0" />
        <span className="text-rock-700 truncate max-w-[200px]">{uploadedFile.name}</span>
        <button
          onClick={() => setUploadedFile(null)}
          className="text-rock-400 hover:text-red-600 flex-shrink-0"
          title="Remove file"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-rock-600">Upload CSV:</span>
      <label className="inline-block">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          className="hidden"
        />
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-forest-700 bg-forest-50 hover:bg-forest-100 rounded-md border border-forest-200 transition-colors"
        >
          <Upload className="w-3.5 h-3.5" />
          Browse
        </button>
      </label>
    </div>
  )
}

