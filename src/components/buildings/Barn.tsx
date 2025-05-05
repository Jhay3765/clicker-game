export default function Barn() {
  return (
    <div className=" p-4 bg-white/50 backdrop-blur-3xl  border-amber-100 rounded-xl w-fit   flex flex-col items-center relative justify-center">
      <h3 className="text-md font-bold mb-2 ">🐔 Chicken Coop</h3>
      <img
        className="h-56 w-48 mt-8"
        src={`/assets/buildings/barn/0.png`}
        alt=""
      />
    </div>
  );
}
