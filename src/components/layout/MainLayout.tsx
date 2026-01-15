'use client'

import Header from './Header'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full overflow-hidden bg-forest-50">
      <Header />
      <main className="h-[calc(100vh-4rem)] w-full">{children}</main>
    </div>
  )
}

