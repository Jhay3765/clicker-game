import { Coins } from "lucide-react";
import { useEffect, useState } from "react";

//  Improve The Ui for the Coop
// Add a better Ready State

const MAX_LEVEL = 1;
const UPGRADE_PRICE = 1000;

interface CoopProps {
  increaseCurrency: (amount: number) => void;
}

export default function Coop(props: CoopProps) {
  const [coopLevel, setCoopLevel] = useState(0);

  const [isEggsReady, setIsEggsReady] = useState(false);
  const [eggStage, setEggStage] = useState(0);
  const coolStyles = ["h-16 w-16 mx-auto", "h-36 w-36 mx-auto"];

  const upgradeCoop = () => {
    setCoopLevel(1);
    setIsEggsReady(false);
  };

  const collectEggs = () => {
    if (isEggsReady) {
      props.increaseCurrency((coopLevel + 1) * 200);
      setEggStage(0);
      setIsEggsReady(false);
      return;
    }
    console.log("Eggs are not ready yet!");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isEggsReady) {
        return;
      }
      setEggStage(1);
      setIsEggsReady(true);
      console.log("Eggs are ready!");
    }, 4000);

    return () => clearInterval(interval);
  }, [isEggsReady]);

  return (
    <div
      className={`
      gap-4  relative bg-gradient-to-b from-white/50 to-white/50 backdrop-blur-3xl shadow-lg p-4 flex flex-col rounded-2xl border-amber-600`}
    >
      <h3 className="text-md font-bold mb-2 ">🐔 Chicken Coop</h3>

      <div className="px-4 py-4  w-fit mx-auto  rounded-lg">
        <img
          className={`${coolStyles[coopLevel]}    `}
          src={`/assets/buildings/coop/${coopLevel}.png`}
          alt=""
        />
      </div>

      <CollectEggsButton
        collectEggs={collectEggs}
        eggStage={eggStage}
        isEggsReady={isEggsReady}
      />

      <div className="flex  items-center gap-2">
        <p className="bg-amber-500 px-4 rounded-full font-semibold text-amber-900">
          Lvl {coopLevel + 1}
        </p>

        <UpgradeButton upgradeCoop={upgradeCoop} coopLevel={coopLevel} />
      </div>
    </div>
  );
}

const CollectEggsButton = (props: {
  collectEggs: () => void;
  eggStage: number;
  isEggsReady: boolean;
}) => {
  return (
    <>
      {props.isEggsReady ? (
        <button
          onClick={props.collectEggs}
          className="w-full py-1 bg-amber-100 rounded-full  cursor-pointer border-amber-300"
        >
          Collect Eggs
        </button>
      ) : (
        <button className="w-full py-1 bg-red-400/40  rounded-full    cursor-pointer border-amber-300">
          Eggs Not Ready
        </button>
      )}
    </>
  );
};

const UpgradeButton = (props: {
  upgradeCoop: () => void;
  coopLevel: number;
}) => {
  const isUpgradeAvailable = props.coopLevel <= MAX_LEVEL - 1;

  return (
    <>
      {isUpgradeAvailable ? (
        <div
          onClick={props.upgradeCoop}
          className="bg-emerald-500 hover:bg-emerald-600 text-white relative flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-all cursor-pointer"
        >
          <p>UPGRADE</p>
          <aside className="px-2 items-center flex gap-1  bg-emerald-400 rounded-full">
            <Coins className="w-4 h-4" />
            <p>{UPGRADE_PRICE}</p>
          </aside>
        </div>
      ) : (
        <div className="bg-gray-300 text-gray-500 relative flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-all cursor-not-allowed">
          <p>MAX LEVEL</p>
        </div>
      )}
    </>
  );
};
