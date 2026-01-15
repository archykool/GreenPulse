'use client'

interface SliderControlProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  unit?: string
}

export default function SliderControl({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  unit = '',
}: SliderControlProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <label className="text-xs font-medium text-rock-700">{label}</label>
        <span className="text-xs font-semibold text-forest-600">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-rock-200 rounded-lg appearance-none cursor-pointer accent-forest-600"
        style={{
          background: `linear-gradient(to right, hsl(142 40% 35%) 0%, hsl(142 40% 35%) ${((value - min) / (max - min)) * 100}%, hsl(210 40% 96.1%) ${((value - min) / (max - min)) * 100}%, hsl(210 40% 96.1%) 100%)`,
        }}
      />
    </div>
  )
}

