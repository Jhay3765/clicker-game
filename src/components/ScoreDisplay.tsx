"use client"

import { createPortal } from "react-dom"

interface ScoreDisplayProps {
  score: number
  currency: number
  multiplier: number
  increaseCurrency: (amount: number) => void
}

const ScoreDisplay = ({ score, currency, multiplier, increaseCurrency }: ScoreDisplayProps) => {
  return createPortal(
    <section className="fixed left-6 top-6 flex gap-6 z-40">
      <div className="font-bold text-xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 flex flex-col gap-3">
        <div className="flex items-center">
          <span className="text-2xl mr-2">👆</span>
          <span>
            Clicks: <span className="text-amber-700">{score}</span>
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-2xl mr-2">💰</span>
          <span>
            Currency: <span className="text-amber-700">${currency}</span>
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-2xl mr-2">🌾</span>
          <span>
            Multiplier: <span className="text-amber-700">x{multiplier}</span>
          </span>
        </div>
      </div>

      <div
        onClick={() => increaseCurrency(1 * multiplier)}
        className="h-24 w-24 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg border-4 border-yellow-300 cursor-pointer transition-all hover:scale-110 active:scale-95"
      >
        <div className="text-4xl pointer-events-none">💰</div>
      </div>
    </section>,
    document.body,
  )
}

export default ScoreDisplay
