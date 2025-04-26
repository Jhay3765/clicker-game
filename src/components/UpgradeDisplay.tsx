interface FarmUpgrade {
  id: number;
  name: string;
  description: string;
  cost: number;
  requiredLevel?: number;
  type: "multiplier" | "addPlot" | "autoHarvest" | "custom";
  apply?: () => void; // optional for custom logic
}

interface UpgradeDisplayProps {
  upgrades: FarmUpgrade[];
  currency: number;
  onPurchase: (upgrade: FarmUpgrade) => void;
}
interface UpgradeProps {
  upgrade: FarmUpgrade;
  currency: number;
  onPurchase: (upgrade: FarmUpgrade) => void;
}

const closeShop = () => {
  const shop = document.querySelector(".shop") as HTMLElement;
  if (shop) {
    shop.style.display = "none";
  }
};
const openShop = () => {
  const shop = document.querySelector(".shop") as HTMLElement;
  if (shop) {
    shop.style.display = "flex";
  }
};
const openShopButton = document.querySelector(
  ".open-shop-button"
) as HTMLElement;
if (openShopButton) {
  openShopButton.addEventListener("click", openShop);
}

const UpgradeDisplay = ({
  upgrades,
  currency,
  onPurchase,
}: UpgradeDisplayProps) => {
  return (
    <div className="z-40 top-0 backdrop-blur-3xl bg-gradient-to-bl from-blue-800 to-indigo-500   right-0 absolute w-fit h-full  px-8 justify-center py-1 flex flex-col gap-8">
      <div
        onClick={openShop}
        className="open-shop-button bg-red-400 text-white"
      >
        Open Shop
      </div>

      <section className="shop flex flex-col gap-8">
        <div
          onClick={closeShop}
          className="absolute top-0  bg-red-500 text-white rounded-full p-2 cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out"
        >
          Close Shop
        </div>
        <div className="text-3xl text-center font-bold uppercase tracking-tighter">
          Shop
        </div>
        {upgrades.map((upgrade) => (
          <Upgrade
            key={upgrade.id}
            upgrade={upgrade}
            currency={currency}
            onPurchase={onPurchase}
          />
        ))}
      </section>
    </div>
  );
};

const Upgrade = ({ upgrade, currency, onPurchase }: UpgradeProps) => {
  const { cost, description, name } = upgrade;

  return (
    <div className=" p-4 rounded-lg shadow-md bg-white w-64">
      <h2 className="font-bold text-lg">{name}</h2>
      <p>{description}</p>
      <p className="text-sm text-gray-600">Cost: ${cost}</p>

      <button
        className="mt-2 bg-amber-700 px-4 py-1 text-white rounded-md hover:bg-amber-600 disabled:opacity-50"
        disabled={currency < cost}
        onClick={() => onPurchase(upgrade)}
      >
        Buy
      </button>
    </div>
  );
};
export default UpgradeDisplay;
