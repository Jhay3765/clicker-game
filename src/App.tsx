import { useState, useEffect, use } from "react";
import { createPortal } from "react-dom";

// Store upgradges
// Show Amount increase when clicked on mouse
// **** Upgrades *** \\
// Make it so you can buy upgrades
// Can buy upgrades at different points in the game
// Create an Update Queue - upgrades that are not shown can be bought after the buying the ones first in the queue.
//
interface Crop {
  cropProfit: number;
  cropName: string;
  increaseCurrency: (amount: number) => void;
}

const upgrades = [
  {
    id: 1,
    name: "2x Crop Multiplier",
    description: "Double your crops per click!",
    cost: 50,
    multiplier: 2,
  },
  {
    id: 2,
    name: "3x Crop Multiplier",
    description: "Triple your crops per click!",
    cost: 150,
    multiplier: 3,
  },
];

interface BasicUpgrade {
  id: number;
  name: string;
  description: string;
  multiplier: number;
  cost: number;
}

function App() {
  const [score, setScore] = useState(0);
  const [currency, setCurrency] = useState(150);
  const [multiplier, setMultiplier] = useState(2);

  const increaseScore = () => {
    setScore(score + 1);
    setCurrency(currency + 1 * multiplier);
  };

  const increaseCurrency = (amount: number) => {
    setCurrency((prevCurrency) => {
      return prevCurrency + amount;
      console.log("setting curreny ");
    });
  };

  const purchaseBasicUpgrade = (upgrade: BasicUpgrade) => {
    console.log(upgrade);
    if (currency >= upgrade.cost) {
      setCurrency(currency - upgrade.cost);

      console.log(upgrade.name + "bought!" + "You Spent " + upgrade.cost);
      setMultiplier(upgrade.multiplier);
      return;
    }

    // setCurrency((prevCurrency) => {
    //   console.log("setting curreny ");
    //   const newCurrency = prevCurrency - upgrade.cost;
    //   return newCurrency;
    // });
  };

  return (
    <main className="grid bg-[#83924C] place-content-center min-h-screen">
      <div onClick={increaseScore} className="fixed h-screen w-screen -z-40  ">
        <ScoreDisplay
          score={score}
          currency={currency}
          multiplier={multiplier}
        />
      </div>

      <SoilLevelOne increaseCurrency={increaseCurrency} />

      <div className="border z-40 bottom-4 absolute w-full justify-center py-1 flex gap-8">
        {upgrades.map((upgrade, upgradeIdx) => (
          <Upgrade
            purchaseBasicUpgrade={purchaseBasicUpgrade}
            upgrade={upgrade}
            key={upgradeIdx}
          ></Upgrade>
        ))}
      </div>
    </main>
  );
}

const SoilLevelOne = ({ increaseCurrency }: any) => {
  const [soil, setSoil] = useState(Array(9).fill(null));
  const [soilColor, setSoilColor] = useState("#A0522D");

  return (
    <div className="grid grid-cols-3 gap-4">
      {soil.map((_, idx) => {
        return (
          <Soil
            key={idx}
            cropName={"carrot"}
            cropProfit={10}
            increaseCurrency={increaseCurrency}
          />
        );
      })}
    </div>
  );
};

const Soil = ({ cropName, cropProfit, increaseCurrency }: Crop) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prevStage) => {
        if (prevStage >= 3) return prevStage;
        return prevStage + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const harvest = () => {
    console.log("Attempting to harvest!");
    if (stage === 3) {
      increaseCurrency(cropProfit);
      setStage(0);
      console.log("harvested!");
      return;
    }
    console.log("not ready to harvest yet!");
  };

  return (
    <div onClick={() => harvest()} className="w-20 h-20 bg-[#A0522D] border ">
      {cropName}
      <br />
      stage: {stage}
    </div>
  );
};

const Upgrade = (props: {
  upgrade: BasicUpgrade;
  purchaseBasicUpgrade: any;
}) => {
  const { cost, description, name, multiplier } = props.upgrade;

  return (
    <div className="border">
      <h2>{name}</h2>
      <p>{description}</p>
      <p>Cost: ${cost}</p>

      <button
        className="bg-amber-700 px-4 py-1 z-40 cursor-pointer text-white rounded-md hover:bg-amber-600"
        disabled={props.upgrade.cost > props.upgrade.cost}
        onClick={() => props.purchaseBasicUpgrade(props.upgrade)}
      >
        Purchase
      </button>
    </div>
  );
};

const MouseCoin = () => {
  useEffect(() => {}, []);
  return (
    <div className="fixed w-10 h-10 bg-amber-700 rounded-full animate-ping"></div>
  );
};

const ScoreDisplay = (props: {
  score: number;
  currency: number;
  multiplier: number;
}) => {
  return (
    <>
      {createPortal(
        <div className="fixed font-bold text-2xl top-2 border p-16 grid place-content-center left-2">
          <div>Clicks : {props.score}</div>
          <div>Currency : ${props.currency}</div>
          <div>Multiplier : {props.multiplier}</div>
        </div>,

        document.body
      )}
    </>
  );
};

export default App;
