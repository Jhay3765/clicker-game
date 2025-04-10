import { useState } from "react";
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
  const [currency, setCurrency] = useState(0);
  const [multiplier, setMultiplier] = useState(2);

  const purchaseBasicUpgrade = (upgrade: BasicUpgrade) => {
    if (currency <= upgrade.cost) {
      setCurrency(currency - upgrade.cost);
      console.log(upgrade.name + "bought!" + "You Spent" + upgrade.cost);
      return;
    }

    setCurrency((prevCurrency) => {
      const newCurrency = prevCurrency - upgrade.cost;
      return newCurrency;
    });
  };

  const increaseScore = () => {
    setScore(score + 1);
    setCurrency(currency + 1 * multiplier);
  };

  return (
    <div
      onClick={increaseScore}
      className="grid place-content-center min-h-screen"
    >
      <ScoreDisplay score={score} currency={currency} />
      <Upgrades purchaseBasicUpgrade={purchaseBasicUpgrade} />
    </div>
  );
}

const Upgrades = (props) => {
  return (
    <div className="border bottom-4 absolute w-full max-w-xl mx-auto flex gap-8">
      {upgrades.map((upgrade, upgradeIdx) => (
        <Upgrade
          purchaseBasicUpgrade={props.purchaseBasicUpgrade}
          upgrade={upgrade}
          key={upgradeIdx}
        ></Upgrade>
      ))}
    </div>
  );
};

const Upgrade = (props: {
  upgrade: BasicUpgrade;
  purchaseBasicUpgrade: any;
}) => {
  const { cost, description, name, multiplier } = props.upgrade;
  const { purchaseBasicUpgrade } = props.purchaseBasicUpgrade;
  console.log(props.upgrade);
  return (
    <div className="border">
      <button onClick={() => purchaseBasicUpgrade(props.upgrade)}></button>
    </div>
  );
};

const ScoreDisplay = (props: { score: number; currency: number }) => {
  return (
    <>
      {createPortal(
        <div className="fixed font-bold text-2xl top-2 border p-16 grid place-content-center left-2">
          <div>Clicks : {props.score}</div>
          <div>Currency : ${props.currency}</div>
        </div>,

        document.body
      )}
    </>
  );
};

export default App;
