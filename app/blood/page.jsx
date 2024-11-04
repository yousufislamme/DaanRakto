"use client";

import { myServerApi } from "@/components/api/app";
import BloodCard from "@/components/BloodCard";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useEffect, useState } from "react";

const ShowBloodLists = () => {
  const [bloodInfos, setBloodInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [itemsToShow, setItemsToShow] = useState(4); // State for controlling displayed items

  const handleSearchBloodGroup = (e) => {
    setSearchValue(e.target.value);
  };

  const handleShowMore = () => {
    setItemsToShow((prevItemsToShow) => prevItemsToShow + 4); // Increase items shown by 4
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(myServerApi);
        const data = await res.json();
        console.log("API response:", data);
        if (Array.isArray(data)) {
          setBloodInfos(data);
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

  const filteredBloodInfos = bloodInfos.filter((item) => {
    const searchString = searchValue.toLowerCase();
    const nameMatch = item.name?.toLowerCase().includes(searchString);
    const bloodTypeMatch = item.bloodType?.toLowerCase().includes(searchString);
    return searchString === "" || nameMatch || bloodTypeMatch;
  });

  return (
    <div className="px-10">
      <div className="mt-20">
        <h1 className="titleStyle">Blood list</h1>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by name or blood group"
        className="m-5 rounded-full border-2 border-orange-500 px-5 py-3 outline-none md:w-[400px]"
        onChange={handleSearchBloodGroup}
      />

      {filteredBloodInfos.length === 0 ? (
        <p>No matching results found</p>
      ) : (
        <>
          {filteredBloodInfos
            .slice(0, itemsToShow)
            .map((singleBloodDetails) => {
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

              const { latitude, longitude } = currentLocation || {};

              return (
                <Link key={_id} href={`/blood/${_id}`}>
                  <BloodCard
                    userName={name}
                    userNeedBloodType={bloodType}
                    userNumber={number}
                    hospitalName={hospitalName}
                    hospitalLocation={hospitalAddress}
                    mapTrack={currentLocation}
                    latitude={latitude}
                    longitude={longitude}
                  />
                </Link>
              );
            })}
          {itemsToShow < filteredBloodInfos.length && (
            <button
              onClick={handleShowMore}
              className="mt-5 rounded-lg bg-blue-500 px-4 py-2 text-white"
            >
              Show More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ShowBloodLists;
