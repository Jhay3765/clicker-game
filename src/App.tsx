import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Plot from "./components/Plot";
import UpgradeDisplay from "./components/UpgradeDisplay";

// Store upgradges
// Show Amount increase when clicked on mouse
// **** Upgrades *** \\
// Make it so you can buy upgrades
// Can buy upgrades at different points in the game
// Create an Update Queue - upgrades that are not shown can be bought after the buying the ones first in the queue.
// Pointer events none not working on the coin

interface FarmUpgrade {
  id: number;
  name: string;
  description: string;
  cost: number;
  requiredLevel?: number;
  type: "multiplier" | "addPlot" | "autoHarvest" | "custom" | "levelUp";
  apply?: () => void; // optional for custom logic
}

function App() {
  const [score, setScore] = useState(0);
  const [currency, setCurrency] = useState(100);
  const [multiplier, setMultiplier] = useState(1);
  const [isMoneyMadeDisplayVisible, setIsMoneyMadeDisplayVisible] =
    useState(false);
  const [amountJustMade, setAmountJustMade] = useState(0);
  const [totalCurrency, setTotalCurrency] = useState(0);
  const [isCarrotPlotPurchased, setIsCarrotPlotPurchased] = useState(false);
  const [carrotPlotLevel, setCarrotPlotLevel] = useState(1);
  const [isPotatoPlotPurchased, setIsPotatoPlotPurchased] = useState(false);
  const [potatoPlotLevel, setPotatoPlotLevel] = useState(2);
  const [level, setLevel] = useState(1);
  const [upgrades, setUpgrades] = useState<FarmUpgrade[]>([
    {
      id: 1,
      name: "3x Coin Multiplier",
      description: "Triple your coins per click!",
      cost: 50,
      requiredLevel: 1,
      type: "multiplier",
      apply: () => setMultiplier(2),
    },
    {
      id: 2,
      name: "Carrot Plot!",
      description: "Add a carrot plot to your Farm!",
      cost: 150,
      requiredLevel: 2,
      type: "addPlot",
      apply: () => addPlot("carrot"),
    },
    {
      id: 3,
      name: "Auto-Harvest",
      description: "Your crops harvest automatically every few seconds!",
      cost: 300,
      type: "autoHarvest",
      apply: () => enableAutoHarvesting(),
    },
    {
      id: 4,
      name: "Upgrade Carrot Plot!",
      description: "Level up your carrot plot to increase its yield!",
      cost: 300,
      requiredLevel: 2,
      type: "levelUp",
      apply: () => levelUpPlot("carrot"),
    },
  ]);

  const increaseCurrency = useCallback((amount: number) => {
    setCurrency((prevCurrency) => {
      return prevCurrency + amount;
    });
    setIsMoneyMadeDisplayVisible(true);
    setAmountJustMade(amount);
    setTotalCurrency((prevTotal) => prevTotal + amount);
  }, []);

  const levelUpPlot = (plotType: string) => {
    if (plotType === "carrot") {
      setCarrotPlotLevel((prevLevel) => prevLevel + 1);
    } else if (plotType === "potato") {
      setPotatoPlotLevel((prevLevel) => prevLevel + 1);
    }
    // Logic to level up the plot in your state management
    console.log(`Leveled up plot of type: ${plotType}`);
  };

  const addPlot = (plotType: string) => {
    if (plotType === "carrot") {
      setIsCarrotPlotPurchased(true);
    } else if (plotType === "potato") {
      setIsPotatoPlotPurchased(true);
    }
    // Logic to add a plot in your state management
    console.log(`Added plot of type: ${plotType}`);
  };

  const enableAutoHarvesting = () => {
    // Logic to enable auto-harvesting in your state management
    console.log("Auto-harvesting enabled");
  };

  const MoneyMadeDisplay = () => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsMoneyMadeDisplayVisible(false);
      }, 1000); // Hide the coin after 1 second

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);
    return (
      <div className="fixed right-8 top-8 w-24 h-24 bg-red-500 rounded-full grid place-content-center text-3xl font-bold animate-pulse">
        +${amountJustMade}
      </div>
    );
  };

  return (
    <main className="grid bg-[#83924C] place-content-center min-h-screen">
      {isMoneyMadeDisplayVisible && <MoneyMadeDisplay></MoneyMadeDisplay>}
      <UpgradeDisplay
        upgrades={upgrades}
        currency={currency}
        onPurchase={(upgrade) => {
          if (currency >= upgrade.cost) {
            setCurrency(currency - upgrade.cost);
            upgrade.apply?.();
            setUpgrades((prevUpgrades) =>
              prevUpgrades.filter((u) => u.id !== upgrade.id)
            );
          }
        }}
      />

      <ScoreDisplay
        increaseCurrency={increaseCurrency}
        score={score}
        currency={currency}
        multiplier={multiplier}
      />

      <div className="flex gap-24">
        {isCarrotPlotPurchased ? (
          <Plot
            increaseCurrency={increaseCurrency}
            cropName="carrot"
            level={carrotPlotLevel}
          />
        ) : (
          <div className="w-0 h-0"></div>
        )}

        {isPotatoPlotPurchased ? (
          <Plot
            increaseCurrency={increaseCurrency}
            cropName="potato"
            level={potatoPlotLevel}
          />
        ) : (
          <div className="w-0 h-0"></div>
        )}
      </div>
    </main>
  );
}

const ScoreDisplay = (props: {
  score: number;
  currency: number;
  multiplier: number;
  increaseCurrency: (amount: number) => void;
}) => {
  return (
    <>
      {createPortal(
        <section className="flex gap-8 fixed left-2 top-2">
          <div className=" font-bold text-2xl  border bg-white/50 p-8 rounded-lg shadow-lg grid gap-2 place-content-center ">
            <div>👆 Clicks: {props.score}</div>
            <div>💰 Currency: ${props.currency}</div>
            <div>🌾 Multiplier: x{props.multiplier}</div>
          </div>
          <div
            onClick={() => props.increaseCurrency(1 * props.multiplier)}
            className="p-10 grid relative place-content-center rounded-lg shadow-lg active:bg-amber-300/20 border hover:bg-black/10 border-black/90"
          >
            <div>
              <p className="pointer-events-none text-5xl absolute -z-40 top-5 left-2">
                💰
              </p>
            </div>
          </div>
        </section>,

        document.body
      )}
    </>
  );
};

export default App;
