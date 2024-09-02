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

  useEffect(() => {
    setDhakaState(dhakaArea);
    setDonationData((prevData) => ({ ...prevData, division: "Dhaka" }));
  }, [setDonationData]);

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setDonationData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async () => {
    console.log("context value", donationData);
    setCustomState(donationData);

    try {
      const response = await fetch("http://localhost:5000/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.acknowledged) {
        toast("successful");
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
          I need{" "}
          {donationData.bloodType && (
            <span className="rounded-lg bg-red-500 px-1 text-white">
              {donationData.bloodType}
            </span>
          )}{" "}
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
      </div>

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

      <div className="mt-4">
        <button
          onClick={handleSubmit}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Donate;
