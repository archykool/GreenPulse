'use client'

import MainLayout from '@/components/layout/MainLayout'
import MapView from '@/components/map/MapView'
import MapInitializer from '@/components/map/MapInitializer'
import ControlPanel from '@/components/controls/ControlPanel'
import AnalyticsPanel from '@/components/analytics/AnalyticsPanel'
import LayerSwitcher from '@/components/map/LayerSwitcher'

export default function Home() {
  return (
    <MainLayout>
      <MapInitializer />
      <div className="flex h-full w-full overflow-hidden">
        {/* Main Map Area */}
        <div className="relative flex-grow h-full bg-rock-100">
          <MapView />
        </div>

        {/* Right Dashboard Sidebar */}
        <aside className="w-[30vw] min-w-[400px] h-full bg-white border-l border-rock-200 shadow-2xl z-20 overflow-y-auto overflow-x-hidden transition-all duration-300">
          <div className="flex flex-col h-full">
            {/* Sidebar Header with Layer Switcher */}
            <header className="border-b border-rock-200 bg-gradient-to-b from-white to-rock-50">
              <div className="p-4 pb-3">
                <h2 className="text-xl font-bold text-rock-800 mb-1">Scenario Dashboard</h2>
                <p className="text-xs text-rock-500">Configure parameters and analyze impacts for the selected block.</p>
              </div>
              <LayerSwitcher />
            </header>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              <ControlPanel />
              <AnalyticsPanel />
            </div>
          </div>
        </aside>
      </div>
    </MainLayout>
  )
}

