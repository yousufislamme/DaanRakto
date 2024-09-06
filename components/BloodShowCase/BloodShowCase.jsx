import BloodShowCaseType from "./BloodShowCaseType";

const BloodShowCase = ({ bloodTypeCounts = {} }) => {
  return (
    <div className="absolute -bottom-12 rounded-lg bg-sky-600 p-5 shadow-xl">
      <div className="flex gap-5">
        {Object.entries(bloodTypeCounts).map(([bloodType, count]) => (
          <BloodShowCaseType
            key={bloodType}
            BloodTypeName={bloodType}
            BloodTypeNumber={count}
          />
        ))}
      </div>
    </div>
  );
};

export default BloodShowCase;
