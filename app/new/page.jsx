"use client";
import Loading from "@/components/Loading";
import axios from "axios";
import { useEffect, useState } from "react";

const New = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/blood_api")
      .then((res) => {
        setUsers(res.data); // Load data into state
        setLoading(false); // Stop loading effect
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl">New page</h1>
    </div>
  );
};

export default New;
