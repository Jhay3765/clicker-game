"use client";

import { Leaf, Maximize2, BotIcon as Robot, Sparkles } from "lucide-react";

interface FarmUpgrade {
  id: number;
  name: string;
  description: string;
  cost: number;
  requiredLevel?: number;
  type: "multiplier" | "addPlot" | "autoHarvest" | "custom";
  apply?: () => void; // optional for custom logic
}

interface UpgradeDisplayProps {
  upgrades: FarmUpgrade[];
  currency: number;
  onPurchase: (upgrade: FarmUpgrade) => void;
  playerLevel?: number;
}

export default function UpgradeDisplay({
  upgrades,
  currency,
  onPurchase,
  playerLevel = 1,
}: UpgradeDisplayProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-amber-100 border border-amber-300 shadow-lg">
      {/* Compact header with currency */}
      <div className="flex items-center justify-between px-3 py-2 ">
        <h2 className="text-sm font-bold text-white flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5" />
          Farm Upgrades
        </h2>
      </div>

      {/* Compact upgrades horizontal scrollable list */}
      <div className="overflow-x-auto py-2 px-2">
        <div className="flex space-x-2 pb-1">
          {upgrades.map((upgrade) => (
            <CompactUpgradeCard
              key={upgrade.id}
              upgrade={upgrade}
              currency={currency}
              onPurchase={onPurchase}
              playerLevel={playerLevel}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface UpgradeCardProps {
  upgrade: FarmUpgrade;
  currency: number;
  onPurchase: (upgrade: FarmUpgrade) => void;
  playerLevel: number;
}

function CompactUpgradeCard({
  upgrade,
  currency,
  onPurchase,
  playerLevel,
}: UpgradeCardProps) {
  const { id, name, description, cost, type, requiredLevel = 1 } = upgrade;

  const canAfford = currency >= cost;
  const meetsLevelRequirement = playerLevel >= requiredLevel;
  const canPurchase = canAfford && meetsLevelRequirement;

  // Get icon based on upgrade type
  const getUpgradeIcon = () => {
    switch (type) {
      case "multiplier":
        return <Sparkles className="h-3.5 w-3.5 text-yellow-400" />;
      case "addPlot":
        return <Maximize2 className="h-3.5 w-3.5 text-green-400" />;
      case "autoHarvest":
        return <Robot className="h-3.5 w-3.5 text-blue-400" />;
      case "custom":
        return <Leaf className="h-3.5 w-3.5 text-purple-400" />;
      default:
        return <Sparkles className="h-3.5 w-3.5 text-yellow-400" />;
    }
  };

  // Card class based on purchase availability
  const cardClass = `rounded-md overflow-hidden shadow-md border flex-shrink-0 w-48 ${
    canPurchase
      ? "bg-white/95 border-indigo-200"
      : "bg-white/80 border-gray-200"
  }`;

  // Price tag class based on affordability
  const priceClass = `px-1.5 py-0.5 rounded-full text-xs font-medium ${
    canAfford ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-600"
  }`;

  // Level requirement class based on player level
  const levelClass = `text-xs px-1.5 py-0.5 rounded-full ${
    playerLevel >= requiredLevel
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800"
  }`;

  // Button class based on purchase availability
  const buttonClass = `flex-1 py-1 px-2 rounded text-xs font-medium transition-all duration-200 ${
    canPurchase
      ? "bg-amber-600 hover:bg-amber-500 text-white"
      : "bg-gray-200 text-gray-500 cursor-not-allowed"
  }`;

  return (
    <div className={cardClass}>
      <div className="p-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <div className="p-1 rounded-full bg-indigo-100">
              {getUpgradeIcon()}
            </div>
            <h3 className="font-bold text-sm text-gray-900">{name}</h3>
          </div>
          <div className={priceClass}>${cost}</div>
        </div>

        <p className="text-gray-600 mb-1.5 text-xs line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-1.5">
          {requiredLevel > 1 && (
            <div className={levelClass}>Lvl {requiredLevel}</div>
          )}

          <button
            className={buttonClass}
            disabled={!canPurchase}
            onClick={() => canPurchase && onPurchase(upgrade)}
          >
            {!canAfford
              ? "Can't afford"
              : !meetsLevelRequirement
              ? "Lvl too low"
              : "Buy"}
          </button>
        </div>
      </div>
    </div>
  );
}
