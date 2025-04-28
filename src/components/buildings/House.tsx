import { useState } from "react";

export default function House() {
  const [houseStage, setHouseStage] = useState(0);

  const upgradeHouse = () => {
    setHouseStage((prevStage: number) => (prevStage + 1) % 3);
  };

  return (
    <div className="px-24  flex flex-col items-center relative justify-center">
      <img
        className="h-64 w-64"
        src={`/assets/buildings/house/${houseStage}.png`}
        alt=""
      />
      <button
        onClick={upgradeHouse}
        className="bg-amber-800 absolute -bottom-12 text-white font-bold py-2 px-4 rounded-full mt-2 hover:bg-amber-700 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95"
      >
        Upgrade House
      </button>
    </div>
  );
}
