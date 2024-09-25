"use client";
import { myServerUrl } from "@/components/bloodTypes";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { LuMapPinOff } from "react-icons/lu";
import { SiGooglemaps } from "react-icons/si";
const PostView = ({ params }) => {
  const [singlePostData, setSinglePostData] = useState(null); // Initialize as null to handle loading state

  useEffect(() => {
    fetch(`${myServerUrl}/${params.slug}`)
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

  // Safely check for currentLocation and display latitude if it exists
  const {
    name,
    age,
    number,
    BloodType,
    hospitalName,
    hospitalAddress,
    currentLocation,
  } = singlePostData;

  return (
    <div>
      <h1>PostView</h1>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Number: {number}</p>
      <p>Blood Type: {BloodType}</p>
      <p>Hospital Name: {hospitalName}</p>
      <p>Hospital Address: {hospitalAddress}</p>
      {currentLocation ? (
        <Button icon size="lg">
          {/* <Link href="/https://www.google.com/maps/dir/23.6753874,90.4731487">
          </Link> */}
          Current Location: Latitude {currentLocation.latitude}, Longitude
          {currentLocation.longitude} <SiGooglemaps />
        </Button>
      ) : (
        <p>
          Current Location: Not available <LuMapPinOff />
        </p>
      )}
    </div>
  );
};

export default PostView;
