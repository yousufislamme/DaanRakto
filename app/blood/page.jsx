"use client";

import BloodCard from "@/components/BloodCard";
import { myServerUrl } from "@/components/bloodTypes";
import Loading from "@/components/Loading";
import Link from "next/link"; // Import Link from Next.js
import { useEffect, useState } from "react";

const ShowBloodLists = () => {
  const [bloodInfos, setBloodInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(myServerUrl);
        const data = await res.json();
        setBloodInfos(data);
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
        } = singleBloodDetails;

        return (
          // Wrap BloodCard with a clickable link to the single post page
          <Link href={`/blood/${_id}`}>
            <BloodCard
              key={_id}
              userName={name}
              userNeedBloodType={bloodType}
              userNumber={number}
              hospitalName={hospitalName}
              hospitalLocation={hospitalAddress}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default ShowBloodLists;
