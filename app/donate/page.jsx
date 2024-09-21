"use client";
import { BloodTypesData } from "@/components/bloodTypes";
import { dhakaArea } from "@/components/dhaka";
import DotAnimation from "@/components/DotAnimation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMyContext } from "@/Context/Context";
import { useEffect, useState } from "react";
import { toast } from "sonner";
// Reusable Input Component
const ReusableInput = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}) => (
  <div className="mt-2">
    <label>{label}</label> <br />
    <Input
      placeholder={placeholder}
      type={type}
      value={value || ""}
      onChange={onChange}
      className="w-auto"
    />
  </div>
);

const Donate = () => {
  const { donationData, setDonationData, customState, setCustomState } =
    useMyContext();
  const [dhakaAreas, setDhakaState] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null); // State for user's location

  useEffect(() => {
    setDhakaState(dhakaArea);
    setDonationData((prevData) => ({ ...prevData, division: "Dhaka" }));

    // Get current geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setDonationData((prevData) => ({
            ...prevData,
            geolocation: { lat: latitude, lng: longitude },
          }));
        },
        (error) => console.error("Error getting geolocation: ", error),
      );
    }
  }, [setDonationData]);

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setDonationData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async () => {
    console.log("context value", donationData);
    setCustomState(donationData);

    try {
      const response = await fetch(
        "https://daan-rakto-server.vercel.app/donate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(donationData),
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.acknowledged) {
        toast("Donation request submitted successfully!");
      } else {
        alert("Failed to submit donation information.");
      }

      console.log("Response data:", data);
    } catch (error) {
      console.log("Error posting donation info || ", error);
    }
  };

  return (
    <div className="px-10 py-5">
      <h1 className="text-2xl">
        Blood Donate <DotAnimation />
      </h1>

      <div className="mt-10">
        <h3 className="subHeading">
          I need
          {donationData.bloodType && (
            <span className="rounded-lg bg-red-500 px-1 text-white">
              {donationData.bloodType}
            </span>
          )}
          blood
        </h3>

        <ReusableInput
          label="Full Name"
          placeholder="Full Name"
          value={donationData.name}
          onChange={handleInputChange("name")}
        />

        <div className="mt-2">
          <Select
            onValueChange={(value) =>
              setDonationData((prevData) => ({ ...prevData, bloodType: value }))
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Blood Type" />
            </SelectTrigger>
            <SelectContent>
              {BloodTypesData.map((bloodItem) => (
                <SelectItem key={bloodItem.id} value={bloodItem.type}>
                  {bloodItem.type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {donationData.bloodType && (
          <div className="mt-4">
            <Select
              onValueChange={(value) =>
                setDonationData((prevData) => ({
                  ...prevData,
                  dhakaArea: value,
                }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Area in Dhaka" />
              </SelectTrigger>
              <SelectContent>
                {dhakaAreas.map((dhakaOneArea) => (
                  <SelectItem
                    key={dhakaOneArea.division_id}
                    value={dhakaOneArea.name}
                  >
                    {dhakaOneArea.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Reusable Input Components */}
        <ReusableInput
          label="Phone Number"
          placeholder="Phone Number"
          type="tel"
          value={donationData.phoneNumber}
          onChange={handleInputChange("phoneNumber")}
        />
        <ReusableInput
          label="Hospital Name"
          placeholder="Hospital Name"
          value={donationData.hospitalName}
          onChange={handleInputChange("hospitalName")}
        />
        <ReusableInput
          label="Hospital Location"
          placeholder="Hospital Location"
          value={donationData.hospitalLocation}
          onChange={handleInputChange("hospitalLocation")}
        />

        {/* Geolocation information (hidden from UI, but sent to server) */}
        {currentLocation && (
          <div className="mt-4 text-sm text-gray-500">
            <p>
              Current Location: Lat: {currentLocation.lat}, Lng:{" "}
              {currentLocation.lng}
            </p>
          </div>
        )}

        <div className="mt-4">
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donate;
