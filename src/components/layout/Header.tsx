'use client'

import { Leaf, Activity } from 'lucide-react'

export default function Header() {
  return (
    <header className="h-16 bg-gradient-to-r from-forest-600 to-forest-700 text-white flex items-center justify-between px-4 lg:px-6 shadow-lg">
      <div className="flex items-center gap-2 lg:gap-3">
        <div className="bg-forest-500 p-1.5 lg:p-2 rounded-lg shadow-md flex items-center justify-center">
          <div className="relative">
            <Leaf className="w-5 h-5 lg:w-6 lg:h-6" />
            <Activity className="w-3 h-3 lg:w-4 lg:h-4 absolute -top-1 -right-1 text-forest-200 animate-pulse" />
          </div>
        </div>
        <div>
          <h1 className="text-lg lg:text-2xl font-bold tracking-tight">
            <span className="text-forest-300">GreenPulse</span>
            <span className="text-rock-800 ml-1.5">Twin</span>
          </h1>
          <p className="text-[10px] lg:text-xs text-forest-200 hidden sm:block">Digital Twin for Urban Greening</p>
        </div>
      </div>
      <nav className="flex items-center gap-2 lg:gap-4">
        <span className="text-xs lg:text-sm text-forest-200 hidden md:block">Interactive Planning Platform</span>
      </nav>
    </header>
  )
}

