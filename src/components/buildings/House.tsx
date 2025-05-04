import { useState } from "react";
import { Coins, CopyPlus, ShoppingBag } from "lucide-react";
export default function House(props: { multiplier: number; currency: number }) {
  const [houseStage, setHouseStage] = useState(0);

  const upgradeHouse = () => {
    setHouseStage((prevStage: number) => (prevStage + 1) % 3);
  };

  return (
    <div className=" p-4 bg-white/50 backdrop-blur-3xl  border-amber-100 rounded-xl w-fit mx-auto  flex flex-col items-center relative justify-center">
      <section className="flex justify-between w-full mx-24">
        <div className="flex items-center gap-2 bg-amber-100 px-3 py-2 rounded-full">
          <Coins className="text-amber-600 w-5 h-5" />
          <span className="font-bold text-amber-800">{props.currency}</span>
        </div>
        <div className="flex items-center gap-2 bg-amber-100 px-3 py-2 rounded-full">
          <ShoppingBag className="text-amber-600 w-5 h-5" />
          <span className="font-bold text-amber-800">Shop</span>
        </div>
        <div className="flex items-center gap-2 bg-amber-100 px-3 py-2 rounded-full">
          <CopyPlus className="text-amber-600 w-5 h-5" />
          <span className="font-bold text-amber-800">{props.multiplier}</span>
        </div>
      </section>

      <img
        className="h-64 w-64 mt-8"
        src={`/assets/buildings/house/${houseStage}.png`}
        alt=""
      />

      <button
        onClick={upgradeHouse}
        className="bg-amber-200 mt-8 text-amber-900 font-bold  py-2 px-8 rounded-full uppercase  hover:bg-amber-700 transition duration-300 ease-in-out shadow-lg  "
      >
        Upgrade House
      </button>
    </div>
  );
}
