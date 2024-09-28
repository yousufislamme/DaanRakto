"use client";

import BloodCard from "@/components/BloodCard";
import { myServerApi } from "@/components/bloodTypes";
import Loading from "@/components/Loading";
import Link from "next/link"; // Import Link from Next.js
import { useEffect, useState } from "react";

const ShowBloodLists = () => {
  const [bloodInfos, setBloodInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(myServerApi);
        const data = await res.json();
        console.log("API response:", data); // Log API response
        if (Array.isArray(data)) {
          setBloodInfos(data); // Only set if it's an array
        } else {
          console.error("Unexpected API response format:", data);
        }
      } catch (error) {
        console.error("Error fetching data from API", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!Array.isArray(bloodInfos)) {
    return <div>Error: Blood info is not available in the correct format.</div>;
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
          number,
          age,
          _id,
          hospitalAddress,
          hospitalName,
          currentLocation,
        } = singleBloodDetails;

        // Extract latitude and longitude from currentLocation
        const { latitude, longitude } = currentLocation || {};

        return (
          <Link key={_id} href={`/blood/${_id}`}>
            <BloodCard
              key={_id}
              userName={name}
              userNeedBloodType={bloodType}
              userNumber={number}
              hospitalName={hospitalName}
              hospitalLocation={hospitalAddress}
              mapTrack={currentLocation}
              latitude={latitude} // Pass latitude to BloodCard
              longitude={longitude} // Pass longitude to BloodCard
            />
          </Link>
        );
      })}
    </div>
  );
};

export default ShowBloodLists;
