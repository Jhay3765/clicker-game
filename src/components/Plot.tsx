"use client";

import { useState, useEffect } from "react";

interface Crop {
  cropProfit: number;
  cropName: string;
  increaseCurrency: (
    amount: number,
    position?: { x: number; y: number }
  ) => void;
}

interface PlotProps {
  increaseCurrency: (
    amount: number,
    position?: { x: number; y: number }
  ) => void;
  level: number;
  cropName: string;
}

const Crops = [
  { id: 1, name: "carrot", profit: 10, color: "#FFA500", icon: "🥕" },
  { id: 2, name: "potato", profit: 20, color: "#D2B48C", icon: "🥔" },
  { id: 3, name: "corn", profit: 30, color: "#FFD700", icon: "🌽" },
];

const Plot = ({ increaseCurrency, level, cropName }: PlotProps) => {
  const amountOfTiles = level * 3;
  const plot = Array(amountOfTiles).fill(null);
  const autoHarvest = level >= 3;
  const crop = Crops.find((c) => c.name === cropName);
  const cropIcon = crop?.icon || "🌱";

  return (
    <div className="flex flex-col items-center p-4 rounded-md">
      <h3 className="text-md font-bold mb-2 capitalize">
        {cropIcon} {cropName} (Lvl {level})
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {plot.map((_, idx) => (
          <Patch
            key={idx}
            patchId={idx}
            cropName={cropName}
            cropProfit={crop?.profit || 10}
            increaseCurrency={increaseCurrency}
            autoHarvest={autoHarvest}
          />
        ))}
      </div>
    </div>
  );
};

interface PatchProps extends Crop {
  autoHarvest: boolean;
  patchId: number;
}

const Patch = ({
  cropName,
  cropProfit,
  increaseCurrency,
  autoHarvest,
}: PatchProps) => {
  const [stage, setStage] = useState(() => Math.floor(Math.random() * 3));
  const [lastHarvestTime, setLastHarvestTime] = useState(0);
  const [patchRef, setPatchRef] = useState<HTMLDivElement | null>(null);
  const crop = Crops.find((c) => c.name === cropName);
  const profit = crop?.profit || cropProfit;
  const cropColor = crop?.color || "#CCC";
  const cropIcon = crop?.icon || "🌱";

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setStage((prev) => {
        if (prev >= 3 && autoHarvest && now - lastHarvestTime > 1000) {
          const pos = patchRef?.getBoundingClientRect();
          increaseCurrency(
            profit,
            pos
              ? {
                  x: pos.left + pos.width / 2,
                  y: pos.top + pos.height / 2,
                }
              : undefined
          );
          setLastHarvestTime(now);
          return 0;
        }
        return prev >= 3 ? prev : prev + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [autoHarvest, increaseCurrency, profit, lastHarvestTime, patchRef]);

  const harvest = () => {
    if (stage === 3) {
      const pos = patchRef?.getBoundingClientRect();
      increaseCurrency(
        profit,
        pos
          ? {
              x: pos.left + pos.width / 2,
              y: pos.top + pos.height / 2,
            }
          : undefined
      );
      setStage(0);
      setLastHarvestTime(Date.now());
    }
  };

  const getStageColor = () => {
    if (stage === 3) return cropColor;
    if (stage === 2) return "#6ECB63";
    if (stage === 1) return "#B0E57C";
    return "#8B4513";
  };

  const stageInfo = ["Soil", "Seedling", "Growing", "Ready"][stage];

  return (
    <div
      ref={setPatchRef}
      onClick={harvest}
      style={{ backgroundColor: getStageColor() }}
      className="w-24 h-24 text-lg border border-black rounded flex flex-col items-center justify-center text-white"
    >
      <div>{stage === 3 ? cropIcon : "🌱"}</div>
      <div>{stageInfo}</div>
    </div>
  );
};

export default Plot;
