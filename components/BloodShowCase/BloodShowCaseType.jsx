const BloodShowCaseType = ({ BloodTypeName, BloodTypeNumber }) => {
  return (
    <div className="flex items-center justify-center rounded-lg border-2 px-2 py-1">
      <div className="flex flex-col items-center justify-center">
        <h2 className="border-b-2">{BloodTypeName}</h2>
        <p>{BloodTypeNumber}</p>
      </div>
    </div>
  );
};

export default BloodShowCaseType;
