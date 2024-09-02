"use client";

import { useEffect, useState } from "react";
import BloodCard from "./BloodCard";

const ShowBloodLists = () => {
  const [bloodInfos, setBloodInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/donate");
        const data = await res.json();
        console.log(data);
        setBloodInfos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from API", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-10">
      <div className="mt-20">
        <h1 className="titleStyle">Blood list</h1>
      </div>
      {bloodInfos.map((singleBloodDetails) => {
        const {
          name,
          bloodType,
          phoneNumber,
          _id,
          division,
          dhakaArea,
          hospitalLocation,
          hospitalName,
        } = singleBloodDetails;
        return (
          <BloodCard
            key={_id}
            userName={name}
            userNeedBloodType={bloodType}
            userAddress={dhakaArea}
            userDivision={division}
            userNumber={phoneNumber}
            hospitalName={hospitalName}
            hospitalLocation={hospitalLocation}
          />
        );
      })}
    </div>
  );
};

export default ShowBloodLists;
