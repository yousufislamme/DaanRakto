"use client";
import { BloodTypesData, myServerUrl } from "@/components/bloodTypes";
import DotAnimation from "@/components/DotAnimation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "sonner";

const BloodRequest = () => {
  const [postReq, setPostReq] = useState({
    name: "",
    age: "",
    number: "",
    bloodType: "",
    hospitalName: "",
    hospitalAddress: "",
    currentLocation: {
      latitude: "",
      longitude: "",
    },
  });
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState(null);

  // Handle input field changes
  const handleDataCollect = (e) => {
    setPostReq({
      ...postReq,
      [e.target.name]: e.target.value,
    });
  };

  // Handle blood type selection
  const handleBloodTypeChange = (value) => {
    setPostReq({
      ...postReq,
      bloodType: value,
    });
  };

  // Fetch user's current location (latitude & longitude)
  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
          });
          // Set currentLocation in postReq
          setPostReq((prevState) => ({
            ...prevState,
            currentLocation: {
              latitude,
              longitude,
            },
          }));
          setError(null);
          toast("Location fetched successfully!");
        },
        (error) => {
          setError(error.message);
        },
      );
    } else {
      setError("Geolocation is not available in your browser.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location.latitude || !location.longitude) {
      toast("Please fetch your location before submitting.");
      return;
    }

    try {
      const response = await axios.post(myServerUrl, postReq);
      if (response.data.acknowledged) {
        toast("Request submitted successfully!");
      } else {
        toast("Failed to submit request.");
      }
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
      toast("Error occurred while submitting request.");
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5 text-xl font-semibold">
        Blood Request Page <DotAnimation />
      </h1>

      <form className="my-5" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={postReq.name}
          onChange={handleDataCollect}
          className="w-[300px]"
          placeholder="Full Name"
          required
        />
        <Input
          className="mt-2 w-[300px]"
          type="number"
          name="number"
          value={postReq.number}
          onChange={handleDataCollect}
          required
          placeholder="Phone Number"
        />
        <Input
          type="text"
          name="hospitalName"
          value={postReq.hospitalName}
          onChange={handleDataCollect}
          className="mt-2 w-[300px]"
          placeholder="Hospital Name"
          required
        />
        <Input
          type="text"
          name="hospitalAddress"
          value={postReq.hospitalAddress}
          onChange={handleDataCollect}
          className="mt-2 w-[300px]"
          placeholder="Hospital Address"
          required
        />
        <Input
          type="text"
          name="age"
          value={postReq.age}
          onChange={handleDataCollect}
          className="mt-2 w-[300px]"
          placeholder="Age"
          required
        />

        <div className="mt-2">
          <Select onValueChange={handleBloodTypeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Blood Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Blood Types</SelectLabel>
                {BloodTypesData.map((bloodType) => (
                  <SelectItem key={bloodType.type} value={bloodType.type}>
                    {bloodType.type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-5">
          <Button size="lg" onClick={fetchLocation} type="button">
            Add your current location <FaMapMarkerAlt className="text-lg" />
          </Button>
          {error ? (
            <p>Error: {error}</p>
          ) : location.latitude && location.longitude ? (
            <>
              <p>Latitude: {location.latitude}</p>
              <p>Longitude: {location.longitude}</p>
            </>
          ) : (
            <p>Click the button to get your location.</p>
          )}
        </div>

        <Button className="mt-2" size="sm" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default BloodRequest;
