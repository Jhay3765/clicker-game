import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

// Store upgradges
// Show Amount increase when clicked on mouse
// **** Upgrades *** \\
// Make it so you can buy upgrades
// Can buy upgrades at different points in the game
// Create an Update Queue - upgrades that are not shown can be bought after the buying the ones first in the queue.
//

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

  const purchaseBasicUpgrade = (props: { upgrade: BasicUpgrade }) => {
    console.log(props.upgrade);
    // if (currency >= props.upgrade.cost) {
    //   setCurrency(currency - props.upgrade.cost);

    //   console.log(
    //     props.upgrade.name + "bought!" + "You Spent " + props.upgrade.cost
    //   );
    //   setMultiplier(props.upgrade.multiplier);
    //   return;
    // }

    // setCurrency((prevCurrency) => {
    //   console.log("setting curreny ");
    //   const newCurrency = prevCurrency - upgrade.cost;
    //   return newCurrency;
    // });
  };

  return (
    <main className="grid place-content-center min-h-screen">
      <div onClick={increaseScore} className="fixed h-screen w-screen  ">
        <ScoreDisplay
          score={score}
          currency={currency}
          multiplier={multiplier}
        />
      </div>

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
        className="bg-amber-700 px-4 py-1 cursor-pointer text-white rounded-md hover:bg-amber-600"
        disabled={props.upgrade.cost > props.upgrade.cost}
        onClick={() => props.purchaseBasicUpgrade(props.upgrade)}
      >
        Purchase
      </button>
    </div>
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
