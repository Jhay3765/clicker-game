import React from "react";
import Plot from "./Plot";
export default function CarrotPlot({
  increaseCurrency,
}: {
  increaseCurrency: (amount: number) => void;
}) {
  const [patchAmount, setPatchAmount] = React.useState(3);
  const [plotLevel, setPlotLevel] = React.useState(1);

  return (
    <div>
      <Plot
        amountOfTiles={patchAmount}
        cropName="carrot"
        increaseCurrency={increaseCurrency}
      />
    </div>
  );
}
