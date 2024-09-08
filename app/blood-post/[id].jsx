"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BloodPostDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBloodPost = async () => {
        try {
          const res = await fetch(
            `https://daan-rakto-server.vercel.app/donate/${id}`,
          );
          const data = await res.json();
          setPostDetails(data);
        } catch (error) {
          console.error("Error fetching blood post details:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBloodPost();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!postDetails) {
    return <div>No post found!</div>;
  }

  const {
    name,
    bloodType,
    phoneNumber,
    division,
    dhakaArea,
    hospitalLocation,
    hospitalName,
  } = postDetails;

  return (
    <div className="px-10 py-5">
      <h1 className="text-2xl">Blood Post Details</h1>
      <div className="mt-4">
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Blood Type:</strong> {bloodType}
        </p>
        <p>
          <strong>Phone Number:</strong> {phoneNumber}
        </p>
        <p>
          <strong>Division:</strong> {division}
        </p>
        <p>
          <strong>Area:</strong> {dhakaArea}
        </p>
        <p>
          <strong>Hospital Name:</strong> {hospitalName}
        </p>
        <p>
          <strong>Hospital Location:</strong> {hospitalLocation}
        </p>
      </div>
    </div>
  );
};

export default BloodPostDetails;
