"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const Test = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/users")
      .then((res) => {
        setUsers(res.data); // Store the data in the state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError(error.message); // Store the error message if the request fails
        setLoading(false);
      });
  }, []); // Empty dependency array means it runs only once, after the first render

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container px-10">
      <h1>API Fetch with Axios</h1>
      <hr />
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name.firstname} {user.name.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Test;
