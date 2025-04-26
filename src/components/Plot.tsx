"use client";

import { useState, useEffect } from "react";

interface Crop {
  cropProfit: number;
  cropName: string;
  cropPrice?: number;
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

  cropName: string;
}

const Crops = [
  {
    id: 1,
    name: "carrot",
    profit: 10,
    color: "#FFA500",
    icon: "🥕",
    price: "150",
  },
  {
    id: 2,
    name: "potato",
    profit: 20,
    color: "#D2B48C",
    icon: "🥔",
    price: "150",
  },
  {
    id: 3,
    name: "corn",
    profit: 30,
    color: "#FFD700",
    icon: "🌽",
    price: "150",
  },
];

const Plot = ({ increaseCurrency, cropName }: PlotProps) => {
  const [isPurchased, setIsPurchased] = useState(true);
  const [level, setLevel] = useState(1);
  const amountOfTiles = level * 24;
  const plot = Array(amountOfTiles).fill(null);
  const autoHarvest = level >= 3;
  const crop = Crops.find((c) => c.name === cropName);
  const cropIcon = crop?.icon || "🌱";

  const upgradeLevel = () => {
    if (!crop) return;

    setLevel((prev) => prev + 1);
    increaseCurrency(-crop.price);
  };

  const purchasePlot = () => {
    if (!crop) return;
    increaseCurrency(-crop.price);
    setIsPurchased(true);
  };

  return (
    <div className="flex flex-col items-center p-4 rounded-md">
      {isPurchased && (
        <>
          <h3 className="text-md font-bold mb-2 capitalize">
            {cropIcon} {cropName} (Lvl {level})
          </h3>
          <div className="grid grid-cols-12 w-fit gap-1  ">
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
        </>
      )}
    </div>
  );
};

interface PatchProps extends Crop {
  autoHarvest: boolean;
  patchId: number;
}

const DummyPatch = () => {
  return (
    <div className="w-24 h-24 text-lg border border-black rounded flex flex-col items-center justify-center text-white">
      <div>Soil</div>
    </div>
  );
};

const Patch = ({
  cropName,
  cropProfit,
  increaseCurrency,
  autoHarvest,
}: PatchProps) => {
  const [stage, setStage] = useState(0);
  const [lastHarvestTime, setLastHarvestTime] = useState(0);
  const [patchRef, setPatchRef] = useState<HTMLDivElement | null>(null);
  const crop = Crops.find((c) => c.name === cropName);
  const profit = crop?.profit || cropProfit;
  const cropStageImage = `/assets/crops/${cropName}/${stage}.png`;
  const cropIcon = crop?.icon || "🌱";

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setStage((prev) => {
        if (prev >= 4 && autoHarvest && now - lastHarvestTime > 1000) {
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
        return prev >= 4 ? prev : prev + 1;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [autoHarvest, increaseCurrency, profit, lastHarvestTime, patchRef]);

  const harvest = () => {
    if (stage === 4) {
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

  return (
    <div
      ref={setPatchRef}
      onClick={harvest}
      className=" text-lg   rounded flex flex-col items-center justify-center text-white"
    >
      <img
        style={{ imageRendering: "pixelated" }}
        src={cropStageImage}
        alt=""
        className="h-10 w-10"
      />
    </div>
  );
};

export default Plot;
