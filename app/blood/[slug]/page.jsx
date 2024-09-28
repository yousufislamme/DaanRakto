"use client";
import { myServerApi } from "@/components/bloodTypes";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuMapPinOff } from "react-icons/lu";

const PostView = ({ params }) => {
  const [singlePostData, setSinglePostData] = useState(null); // Initialize as null to handle loading state
  const [yourCurrentLocation, setYourCurrentLocation] = useState("");

  useEffect(() => {
    fetch(`${myServerApi}/${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setSinglePostData(data);
        console.log(data);
      });
  }, [params.slug]);

  // If data is still being fetched, show loading state
  if (!singlePostData) {
    return <Loading />;
  }

  const {
    name,
    age,
    number,
    BloodType,
    hospitalName,
    hospitalAddress,
    currentLocation,
  } = singlePostData;

  // Function to handle input change
  const handleLocationChange = (e) => {
    setYourCurrentLocation(e.target.value);
  };

  return (
    <div className="container py-5">
      <h1>PostView</h1>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Number: {number}</p>
      <p>Blood Type: {BloodType}</p>
      <p>Hospital Name: {hospitalName}</p>
      <p>Hospital Address: {hospitalAddress}</p>
      <p>Apni ekhon kothay theke jete can?</p>

      <Input
        value={yourCurrentLocation}
        onChange={handleLocationChange}
        className="max-w-[300px]"
        type="text"
        placeholder="Your current location"
      />

      {currentLocation ? (
        <div className="flex gap-5">
          <Button size="lg" className="mt-2">
            <Link
              href={`https://www.google.com/maps/dir/${yourCurrentLocation}/${currentLocation.latitude},${currentLocation.longitude}`}
              target="_blank"
            >
              Go to track Map
            </Link>
          </Button>
        </div>
      ) : (
        <p>
          Current Location: Not available <LuMapPinOff />
        </p>
      )}
    </div>
  );
};

export default PostView;
