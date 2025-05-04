import { useEffect, useState } from "react";

const hayImg = "/assets/buildings/silo/hay.png";
const siloImg = "/assets/buildings/silo/0.png";

export default function Silo(props: {
  increaseCurrency: (amount: number) => void;
}) {
  return (
    <div className="bg-gradient-to-b from-white/50 to-white/50 backdrop-blur-3xl shadow-lg p-4 flex flex-col rounded-2xl border-amber-600  justify-center relative">
      <h3 className="font-bold">🏭 Silo</h3>
      <img className="h-48 w-28 mx-auto mt-6" src={siloImg} alt="" />

      <section className="flex items-center gap-2 mt-4 rounded-md">
        <Hay increaseCurrency={props.increaseCurrency} />
        <Hay increaseCurrency={props.increaseCurrency} />
        <Hay increaseCurrency={props.increaseCurrency} />
      </section>
    </div>
  );
}

const Hay = (props: { increaseCurrency: (amount: number) => void }) => {
  const [hayStage, setHayStage] = useState(0);
  const [isHayReady, setIsHayReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isHayReady) {
        return;
      }
      setHayStage(1);
      setIsHayReady(true);
      console.log("Eggs are ready!");
    }, 4000);

    return () => clearInterval(interval);
  }, [isHayReady]);

  const collectHay = () => {
    console.log("Collecting hay...");
    if (isHayReady) {
      props.increaseCurrency(500);
      setHayStage(0);
      setIsHayReady(false);
      return;
    }
    console.log("Eggs are not ready yet!");
  };
  return (
    <div className="p-2 bg-amber-200 border-2 border-amber-500 rounded-md">
      <div className="h-8 w-8">
        {isHayReady && (
          <button onClick={collectHay}>
            <img className="h-8 w-8 " src={hayImg} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};
