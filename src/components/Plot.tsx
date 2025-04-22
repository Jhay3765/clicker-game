import { useState, useEffect } from "react";

interface Crop {
  cropProfit: number;
  cropName: string;
  increaseCurrency: (amount: number) => void;
}

interface PlotProps {
  increaseCurrency: (amount: number) => void;
  amountOfTiles: number;
  cropName: string;
}
const Crops = [
  {
    id: 1,
    name: "carrot",
    profit: 10,
    color: "#FFA500",
  },
  {
    id: 2,
    name: "potato",
    profit: 20,
    color: "#d1a24b",
  },

  {
    id: 3,
    name: "corn",
    profit: 30,
    color: "#FFD700",
  },
];

const Plot = ({ increaseCurrency, amountOfTiles, cropName }: PlotProps) => {
  const plot = Array(amountOfTiles).fill(null);

  return (
    <div className="grid grid-cols-3 gap-4">
      {plot.map((_, idx) => {
        return (
          <Patch
            key={idx}
            cropName={cropName}
            cropProfit={10}
            increaseCurrency={increaseCurrency}
          />
        );
      })}
    </div>
  );
};

const Patch = ({ cropName, increaseCurrency }: Crop) => {
  const [stage, setStage] = useState(0);

  const crop = Crops.find((crop) => crop.name === cropName);
  const { profit, color } = crop || { profit: 0 };

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prevStage) => {
        if (prevStage >= 3) return prevStage;
        return prevStage + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  if (!crop) {
    console.log("Crop not found!");
    return null;
  }

  const harvest = () => {
    console.log("Attempting to harvest!");
    if (stage === 3) {
      increaseCurrency(profit);
      setStage(0);
      console.log("harvested!");
      return;
    }
    console.log("not ready to harvest yet!");
  };

  return (
    <div
      onClick={() => harvest()}
      style={{ backgroundColor: color }}
      className={`w-20 h-20  border`}
    >
      {cropName}
      <br />
      stage: {stage}
    </div>
  );
};

export default Plot;
