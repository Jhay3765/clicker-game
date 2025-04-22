import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Plot from "./components/Plot";
import UpgradeDisplay from "./components/UpgradeDisplay";
// Store upgradges
// Show Amount increase when clicked on mouse
// **** Upgrades *** \\
// Make it so you can buy upgrades
// Can buy upgrades at different points in the game
// Create an Update Queue - upgrades that are not shown can be bought after the buying the ones first in the queue.
// Pointer events none not working on the coin

function App() {
  const [score, setScore] = useState(0);
  const [currency, setCurrency] = useState(150);
  const [multiplier, setMultiplier] = useState(1);
  const [isMoneyMadeDisplayVisible, setIsMoneyMadeDisplayVisible] =
    useState(false);
  const [amountJustMade, setAmountJustMade] = useState(0);
  const [totalCurrency, setTotalCurrency] = useState(0);
  const [level, setLevel] = useState(1);

  const increaseCurrency = (amount: number) => {
    setCurrency((prevCurrency) => {
      return prevCurrency + amount;
    });
    setIsMoneyMadeDisplayVisible(true);
    setAmountJustMade(amount);
    setTotalCurrency((prevTotal) => prevTotal + amount);
  };

  const MoneyMadeDisplay = () => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsMoneyMadeDisplayVisible(false);
      }, 1000); // Hide the coin after 1 second

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }, []);
    return (
      <div className="fixed right-8 top-8 w-24 h-24 bg-red-500 rounded-full grid place-content-center text-3xl font-bold animate-pulse">
        +${amountJustMade}
      </div>
    );
  };

  return (
    <main className="grid bg-[#83924C] place-content-center min-h-screen">
      {isMoneyMadeDisplayVisible && <MoneyMadeDisplay></MoneyMadeDisplay>}
      <UpgradeDisplay />

      <ScoreDisplay
        increaseCurrency={increaseCurrency}
        score={score}
        currency={currency}
        multiplier={multiplier}
      />

      <div className="flex gap-24">
        <Plot
          increaseCurrency={increaseCurrency}
          cropName="carrot"
          amountOfTiles={9}
        />
        <Plot
          increaseCurrency={increaseCurrency}
          cropName="potato"
          amountOfTiles={9}
        />
      </div>
    </main>
  );
}

const ScoreDisplay = (props: {
  score: number;
  currency: number;
  multiplier: number;
  increaseCurrency: (amount: number) => void;
}) => {
  return (
    <>
      {createPortal(
        <section className="flex gap-8 fixed left-2 top-2">
          <div className=" font-bold text-2xl  border bg-white/50 p-8 rounded-lg shadow-lg grid gap-2 place-content-center ">
            <div>👆 Clicks: {props.score}</div>
            <div>💰 Currency: ${props.currency}</div>
            <div>🌾 Multiplier: x{props.multiplier}</div>
          </div>
          <div
            onClick={() => props.increaseCurrency(1 * props.multiplier)}
            className="p-10 grid place-content-center bg-white/90 rounded-lg shadow-lg border "
          >
            <p className="pointer-events-none">Coin</p>
          </div>
        </section>,

        document.body
      )}
    </>
  );
};

export default App;
