"use client";
import { useState } from "react";

const BloodCard = ({
  userName,
  userNumber,
  userNeedBloodType,
  userDivision,
  userAddress,
  hospitalName,
  hospitalLocation,
}) => {
  const [copySuccess, setCopySuccess] = useState("");

  const handleCopy = () => {
    navigator.clipboard.writeText(userNumber).then(
      () => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000); // Reset message after 2 seconds
      },
      () => {
        setCopySuccess("Failed to copy");
      },
    );
  };

  return (
    <div className="m-2 rounded-lg border-2 bg-slate-100 px-5 py-2 dark:bg-slate-800">
      <div className="flex justify-between">
        <h3 className="text-xl">{userName}</h3>
        <p>
          Blood Group is: <b>{userNeedBloodType}</b>
        </p>
      </div>
      <div>
        <p>
          Phone Number: {userNumber}{" "}
          <button onClick={handleCopy} className="ml-2 text-blue-500">
            {copySuccess || "Copy"}
          </button>
        </p>
      </div>
      <div>
        <p>Division: {userDivision}</p>
        <p>Address: {userAddress}</p>
        <p>Hospital Name: {hospitalName}</p>
        <p>Hospital Location: {hospitalLocation}</p>
      </div>
    </div>
  );
};

export default BloodCard;
