"use client";

import { Leaf, Maximize2, Sparkles } from "lucide-react";

interface FarmUpgrade {
  id: number;
  name: string;
  description: string;
  cost: number;
  requiredLevel?: number;
  type: "multiplier" | "addStructure" | "autoHarvest" | "custom" | "levelUp";
  apply?: () => void; // optional for custom logic
}

interface UpgradeDisplayProps {
  upgrades: FarmUpgrade[];
  currency: number;
  onPurchase: (id: number) => void;
  playerLevel?: number;
}

export default function UpgradeDisplay({
  upgrades,
  currency,
  onPurchase,
  playerLevel = 1,
}: UpgradeDisplayProps) {
  return (
    <div className=" bg-white/50 backdrop-blur-3xl px-8 border-green-600 shadow-lg rounded-2xl">
      {/* Compact header with currency */}
      <div className="flex items-center justify-between px-3 py-3 ">
        <h2 className="text-xl font-bold  flex items-center tracking-tight gap-1">
          Farm Upgrades
        </h2>
      </div>

      {/* Compact upgrades horizontal scrollable list */}

      <div className="flex space-x-2 flex-col pb-1 gap-4">
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
  );
}

interface UpgradeCardProps {
  upgrade: FarmUpgrade;
  currency: number;
  onPurchase: (id: number) => void;
  playerLevel: number;
}

function CompactUpgradeCard({
  upgrade,
  currency,
  onPurchase,
  playerLevel,
}: UpgradeCardProps) {
  const { name, description, cost, type, requiredLevel = 1 } = upgrade;

  const canAfford = currency >= cost;
  const meetsLevelRequirement = playerLevel >= requiredLevel;
  const canPurchase = canAfford && meetsLevelRequirement;

  // Get icon based on upgrade type
  const getUpgradeIcon = () => {
    switch (type) {
      case "multiplier":
        return <Sparkles className="h-3.5 w-3.5 text-yellow-400" />;
      case "addStructure":
        return <Maximize2 className="h-3.5 w-3.5 text-green-400" />;

      case "custom":
        return <Leaf className="h-3.5 w-3.5 text-purple-400" />;
      default:
        return <Sparkles className="h-3.5 w-3.5 text-yellow-400" />;
    }
  };

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
    <div
      className={`rounded-md backdrop-blur-3xl overflow-hidden shadow-md  flex-shrink-0  px-2 p-1 ${
        canPurchase ? "bg-white/40" : "bg-white/40"
      }`}
    >
      <div className="p-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1">
            <div className="p-1 rounded-full bg-indigo-100">
              {getUpgradeIcon()}
            </div>
            <h3 className="font-bold text-sm text-gray-900 whitespace-nowrap">
              {name}
            </h3>
          </div>
          <div className={priceClass}>${cost}</div>
        </div>

        <p className="text-gray-600 text-xs line-clamp-2 mb-6">{description}</p>

        <div className="flex items-center gap-1.5">
          {requiredLevel > 1 && (
            <div className={levelClass}>Lvl {requiredLevel}</div>
          )}

          <button
            className={buttonClass}
            disabled={!canPurchase}
            onClick={() => canPurchase && onPurchase(upgrade.id)}
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
