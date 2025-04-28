"use client";

import { ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const MAX_LEVEL = 3;

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
  const amountOfTiles = level * 12;
  const plot = Array(amountOfTiles).fill(null);
  const autoHarvest = level >= 3;
  const crop = Crops.find((c) => c.name === cropName);
  const cropIcon = crop?.icon || "🌱";

  const upgradeLevel = () => {
    if (!crop) return;
    if (level >= MAX_LEVEL) return;

    setLevel((prev) => prev + 1);
    increaseCurrency(-crop.price);
  };

  const purchasePlot = () => {
    if (!crop) return;
    increaseCurrency(-crop.price);
    setIsPurchased(true);
  };

  return (
    <div className="flex flex-col  p-4 rounded-lg bg-gradient-to-b from-amber-50 to-amber-100 border border-amber-200 shadow-md">
      {isPurchased && (
        <>
          <section className="flex justify-between items-center mb-2">
            <h3 className="text-md font-bold mb-2 capitalize">
              {cropIcon} {cropName}
            </h3>

            <div className="flex items-center gap-2">
              <p>(Lvl {level})</p>

              <UpgradeButton upgradeLevel={upgradeLevel} level={level} />
            </div>
          </section>

          <div className="flex max-w-xl flex-wrap w-fit gap-1  ">
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

const UpgradeButton = (props: { upgradeLevel: () => void; level: number }) => {
  const isUpgradeAvailable = props.level <= MAX_LEVEL - 1;

  return (
    <>
      {isUpgradeAvailable ? (
        <div
          onClick={props.upgradeLevel}
          className="bg-emerald-500 hover:bg-emerald-600 text-white relative flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-all cursor-pointer"
        >
          <ArrowUp className="w-4 h-4" />
          <p>UPGRADE</p>
        </div>
      ) : (
        <div className="bg-gray-300 text-gray-500 relative flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-all cursor-not-allowed">
          <p>MAX LEVEL</p>
        </div>
      )}
    </>
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

  const readyToHarvestStyles =
    stage === 4 ? "bg-amber-200/50 animate-pulse" : "";

  return (
    <div
      ref={setPatchRef}
      onClick={harvest}
      className={`text-lg border border-amber-200    rounded flex flex-col items-center justify-center text-white ${readyToHarvestStyles}`}
    >
      <img
        style={{ imageRendering: "pixelated" }}
        src={cropStageImage}
        alt=""
        className="h-12 w-12 object-cover p-1 "
      />
    </div>
  );
};

export default Plot;
