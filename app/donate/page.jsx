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

const Donate = () => {
  const divisions = "https://bdapis.com/api/v1.0/divisions";
  const { donationData, setDonationData } = useMyContext();
  const [divisionDataState, setDivisionDataState] = useState([]);
  const [dhakaAreas, setDhakaState] = useState([]);

  useEffect(() => {
    fetch(divisions)
      .then((response) => response.json())
      .then((divisionData) => {
        setDivisionDataState(divisionData.data);
      })
      .catch((error) => {
        console.error("Error fetching divisions:", error);
      });
  }, []);

  useEffect(() => {
    setDhakaState(dhakaArea);
  }, []);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    if (value.startsWith("+880")) {
      setDonationData({ ...donationData, phoneNumber: value });
    }
  };

  const handleSubmit = () => {
    console.log("context value", donationData);
    setCustomState(donationData);
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
        <label htmlFor="name">Full Name</label> <br />
        <Input
          placeholder="Full Name"
          className="w-auto"
          value={donationData.name || ""}
          onChange={(e) =>
            setDonationData({ ...donationData, name: e.target.value })
          }
        />
        <div className="mt-2">
          <Select
            onValueChange={(value) =>
              setDonationData({ ...donationData, bloodType: value })
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
        <div className="mt-4">
          {donationData.bloodType && (
            <Select
              onValueChange={(value) =>
                setDonationData({ ...donationData, division: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Division" />
              </SelectTrigger>
              <SelectContent>
                {divisionDataState.map((divisionItem) => (
                  <SelectItem
                    key={divisionItem._id}
                    value={divisionItem.division}
                  >
                    {divisionItem.division} ({divisionItem.divisionbn})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {donationData.division === "Dhaka" && (
          <div className="mt-4">
            <Select
              onValueChange={(value) =>
                setDonationData({ ...donationData, dhakaArea: value })
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
      <div className="mt-4">
        <Input
          value={donationData.phoneNumber || ""}
          onChange={handlePhoneNumberChange}
          placeholder="Phone Number"
          className="w-auto"
          type="tel"
          maxLength={14}
        />
      </div>
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
