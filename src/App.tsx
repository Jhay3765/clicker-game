import { useState, useEffect, useCallback } from "react";
import Plot from "./components/Plot";
import UpgradeDisplay from "./components/UpgradeDisplay";
import House from "./components/buildings/House";
import Silo from "./components/buildings/Silo";
import Coop from "./components/buildings/Coop";
import ScoreDisplay from "./components/ScoreDisplay";
import Barn from "./components/buildings/Barn";

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
  type: "multiplier" | "addStructure" | "autoHarvest" | "custom" | "levelUp";
  apply?: () => void; // optional for custom logic
}

function App() {
  const [currency, setCurrency] = useState(1000);
  const [multiplier, setMultiplier] = useState(1);
  const [isMoneyMadeDisplayVisible, setIsMoneyMadeDisplayVisible] =
    useState(false);
  const [amountJustMade, setAmountJustMade] = useState(0);
  const [totalCurrency, setTotalCurrency] = useState(0);
  const [isCarrotPlotPurchased, setIsCarrotPlotPurchased] = useState(true);
  const [isPotatoPlotPurchased, setIsPotatoPlotPurchased] = useState(true);
  const [isCoopPurchased, setIsCoopPurchased] = useState(true);
  const [playerLevel, setPlayerLevel] = useState(1);
  const [upgrades, setUpgrades] = useState<FarmUpgrade[]>([
    {
      id: 1,
      name: "2x Coin Multiplier",
      description: "Double your coins per click!",
      cost: 50,
      requiredLevel: 1,
      type: "multiplier",
      apply: () => increaseMultiplier(2),
    },
    {
      id: 2,
      name: "Carrot Plot!",
      description: "Add a carrot plot to your Farm!",
      cost: 300,
      requiredLevel: 2,
      type: "addStructure",
      apply: () => addStructure("carrot"),
    },
    {
      id: 3,
      name: "3x Coin Multiplier",
      description: "Triple your coins per click!",
      cost: 400,
      requiredLevel: 2,
      type: "multiplier",
      apply: () => increaseMultiplier(3),
    },

    {
      id: 4,
      name: "Potato Plot!",
      description: "Add a potato plot to your Farm!",
      cost: 500,
      requiredLevel: 3,
      type: "addStructure",
      apply: () => addStructure("potato"),
    },
    {
      id: 5,
      name: "Chicken Coop!",
      description: "Add a chicken coop to your Farm!",
      cost: 1500,
      requiredLevel: 3,
      type: "addStructure",
      apply: () => addStructure("coop"),
    },
  ]);

  const increaseMultiplier = (amount: number) => {
    setMultiplier((prevMultiplier) => prevMultiplier + amount);
    setPlayerLevel((prevLevel) => prevLevel + 1);
  };

  const increaseCurrency = useCallback((amount: number) => {
    setCurrency((prevCurrency) => {
      return prevCurrency + amount;
    });
    setIsMoneyMadeDisplayVisible(true);
    setAmountJustMade(amount);
    setTotalCurrency((prevTotal) => prevTotal + amount);
  }, []);

  const addStructure = (structure: string) => {
    if (structure === "carrot") {
      setIsCarrotPlotPurchased(true);
    } else if (structure === "potato") {
      setIsPotatoPlotPurchased(true);
    } else if (structure === "coop") {
      setIsCoopPurchased(true);
    }
    // Logic to add a plot in your state management
    console.log(`Added plot of type: ${structure}`);
  };

  const onPurchase = (id: number) => {
    const upgrade = upgrades.find((upgrade) => upgrade.id === id);
    if (!upgrade) {
      console.log("Upgrade not found.");
      return;
    }
    if (currency >= upgrade.cost) {
      setCurrency((prevCurrency) => prevCurrency - upgrade.cost);
      if (upgrade.apply) {
        upgrade.apply();
      }
      setUpgrades((prevUpgrades) =>
        prevUpgrades.filter((upgrade) => upgrade.id !== id)
      );
    } else {
      console.log("Not enough currency to purchase this upgrade.");
    }
  };
  const MoneyMadeDisplay = () => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsMoneyMadeDisplayVisible(false);
      }, 1000); // Hide the coin after 1 second

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);
    return (
      <div className="fixed right-8 top-8 w-24 h-24 text-yellow-400 grid place-content-center text-3xl font-bold animate-pulse">
        +${amountJustMade}
      </div>
    );
  };

  return (
    <main className="min-h-screen  bg-black">
      <img
        src="/dd.png"
        alt=""
        className="bg-cover absolute w-full opacity-50"
      />
      <div className="flex gap-8 pt-4 justify-between px-24  ">
        <section>
          <div className="flex w-full gap-8 ">
            <House currency={currency} multiplier={multiplier} />

            <aside className="grid grid-cols-2 gap-4 h-full flex-wrap  w-full">
              {isCarrotPlotPurchased && (
                <Plot increaseCurrency={increaseCurrency} cropName="carrot" />
              )}

              {isPotatoPlotPurchased && (
                <Plot increaseCurrency={increaseCurrency} cropName="potato" />
              )}

              <Plot increaseCurrency={increaseCurrency} cropName="corn" />
              <Plot increaseCurrency={increaseCurrency} cropName="pumpkin" />
            </aside>
          </div>
          <div className=" flex pt-4 gap-8 w-full h">
            <Silo increaseCurrency={increaseCurrency} />
            {isCoopPurchased && <Coop increaseCurrency={increaseCurrency} />}
            <Barn />
          </div>
        </section>
        <UpgradeDisplay
          playerLevel={playerLevel}
          upgrades={upgrades}
          currency={currency}
          onPurchase={onPurchase}
        />
      </div>

      {isMoneyMadeDisplayVisible && <MoneyMadeDisplay></MoneyMadeDisplay>}
    </main>
  );
}

export default App;
