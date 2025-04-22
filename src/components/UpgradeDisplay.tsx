interface FarmUpgrade {
  id: number;
  name: string;
  description: string;
  cost: number;
  requiredLevel?: number;
  type: "multiplier" | "addPlot" | "autoHarvest" | "custom";
  apply?: () => void; // optional for custom logic
}

const setMultiplier = (multiplier: number) => {
  // Logic to set the multiplier in your state management
  console.log(`Multiplier set to ${multiplier}`);
};

const addPlot = (plotType: string) => {
  // Logic to add a plot in your state management
  console.log(`Added plot of type: ${plotType}`);
};

const enableAutoHarvesting = () => {
  // Logic to enable auto-harvesting in your state management
  console.log("Auto-harvesting enabled");
};

const upgrades: FarmUpgrade[] = [
  {
    id: 1,
    name: "3x Coin Multiplier",
    description: "Triple your coins per click!",
    cost: 50,
    requiredLevel: 1,
    type: "multiplier",
    apply: () => setMultiplier(3),
  },
  {
    id: 2,
    name: "Carrot Plot!",
    description: "Add a carrot plot to your Farm!",
    cost: 150,
    requiredLevel: 2,
    type: "addPlot",
    apply: () => addPlot("carrot"), // you'd define this logic
  },
  {
    id: 3,
    name: "Auto-Harvest",
    description: "Your crops harvest automatically every few seconds!",
    cost: 300,
    type: "autoHarvest",
    apply: () => enableAutoHarvesting(),
  },
];

const UpgradeDisplay = () => {
  console.log("UpgradeDisplay rendered");
  return (
    <div className="border z-40 bottom-4 absolute w-full justify-center py-1 flex gap-8">
      {upgrades.map((upgrade, upgradeIdx) => (
        <Upgrade upgrade={upgrade} key={upgradeIdx}></Upgrade>
      ))}
    </div>
  );
};

const Upgrade = (props: { upgrade: FarmUpgrade }) => {
  const { cost, description, name, apply } = props.upgrade;
  if (!props.upgrade) return <div>Error: Upgrade not Found</div>;
  return (
    <div className="border">
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Cost: ${cost}</p>

      <button
        className="bg-amber-700 px-4 py-1 z-40 cursor-pointer text-white rounded-md hover:bg-amber-600"
        disabled={props.upgrade.cost > props.upgrade.cost}
        onClick={() => apply && apply()}
      >
        Purchase
      </button>
    </div>
  );
};

export default UpgradeDisplay;
