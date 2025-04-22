interface BaseUpgrade {
  id: number;
  name: string;
  description: string;
  cost: number;
  requiredLevel?: number;
  type: "multiplier" | "addPlot" | "autoHarvest" | "custom";
  apply?: () => void; // optional for custom logic
}

const upgrades: BaseUpgrade[] = [
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
