import { useState } from "react";

export default function Coop() {
  const [coopStage, setCoopStage] = useState(0);

  const coolStyles = ["h-16 w-16", "h-36 w-36"];

  const upgradeCoop = () => {
    setCoopStage((prevStage: number) => (prevStage + 1) % coolStyles.length);
  };

  return (
    <div
      className={`
      flex flex-col items-center justify-center relative p-4 rounded-lg bg-gradient-to-b from-amber-50 to-amber-100 border border-amber-200 shadow-md`}
    >
      <img
        className={coolStyles[coopStage]}
        src={`/assets/buildings/coop/${coopStage}.png`}
        alt=""
      />

      <button
        onClick={upgradeCoop}
        className="bg-amber-800 grayscale-0 whitespace-nowrap    text-white font-bold py-2 px-4 rounded-full mt-2 hover:bg-amber-700 transition duration-300 ease-in-out "
      >
        Upgrade Coop
      </button>
    </div>
  );
}
