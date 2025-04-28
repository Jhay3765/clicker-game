"use client";

import { Coins, CopyPlus, MousePointerClick } from "lucide-react";
import { createPortal } from "react-dom";

interface ScoreDisplayProps {
  score: number;
  currency: number;
  multiplier: number;
  increaseCurrency: (amount: number) => void;
}

const ScoreDisplay = ({
  score,
  currency,
  multiplier,
  increaseCurrency,
}: ScoreDisplayProps) => {
  return createPortal(
    <section className="fixed left-6 top-6 flex gap-6 z-40">
      <div className="font-bold text-xl bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20 flex flex-col gap-3">
        <div className="flex items-center gap-2 bg-amber-100 px-3 py-2 rounded-full">
          <MousePointerClick className="text-amber-600 w-5 h-5" />
          <span className="font-bold text-amber-800">{score}</span>
        </div>
        <div className="flex items-center gap-2 bg-amber-100 px-3 py-2 rounded-full">
          <Coins className="text-amber-600 w-5 h-5" />
          <span className="font-bold text-amber-800">{currency}</span>
        </div>
        <div className="flex items-center gap-2 bg-amber-100 px-3 py-2 rounded-full">
          <CopyPlus className="text-amber-600 w-5 h-5" />
          <span className="font-bold text-amber-800">{multiplier}</span>
        </div>
      </div>

      <div
        onClick={() => increaseCurrency(1 * multiplier)}
        className="h-24 w-24 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg border-4 border-yellow-300 cursor-pointer transition-all hover:scale-110 active:scale-95"
      >
        <div className="text-4xl pointer-events-none">💰</div>
      </div>
    </section>,
    document.body
  );
};

export default ScoreDisplay;
