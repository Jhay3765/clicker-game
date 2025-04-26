export default function Silo(type: { type?: number }) {
  const siloType = type.type || 0; // Default to 0 if type is not provided
  return (
    <div>
      <img
        className="h-48 w-28"
        src={`/assets/buildings/silo/${siloType}.png`}
        alt=""
      />
    </div>
  );
}
