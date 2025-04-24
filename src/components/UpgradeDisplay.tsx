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
}
interface UpgradeProps {
  upgrade: FarmUpgrade;
  currency: number;
  onPurchase: (upgrade: FarmUpgrade) => void;
}

const UpgradeDisplay = ({
  upgrades,
  currency,
  onPurchase,
}: UpgradeDisplayProps) => {
  return (
    <div className="border z-40 bottom-4 absolute w-full justify-center py-1 flex gap-8">
      {upgrades.map((upgrade) => (
        <Upgrade
          key={upgrade.id}
          upgrade={upgrade}
          currency={currency}
          onPurchase={onPurchase}
        />
      ))}
    </div>
  );
};

const Upgrade = ({ upgrade, currency, onPurchase }: UpgradeProps) => {
  const { cost, description, name } = upgrade;

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white w-64">
      <h2 className="font-bold text-lg">{name}</h2>
      <p>{description}</p>
      <p className="text-sm text-gray-600">Cost: ${cost}</p>

      <button
        className="mt-2 bg-amber-700 px-4 py-1 text-white rounded-md hover:bg-amber-600 disabled:opacity-50"
        disabled={currency < cost}
        onClick={() => onPurchase(upgrade)}
      >
        Purchase
      </button>
    </div>
  );
};
export default UpgradeDisplay;
