"use client";
import { useEffect, useState } from "react";

const BloodInfo = ({ params }) => {
  const [bloodStore, setBloodStore] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/blood_api/${params.slug}`)
      .then((res) => res.json())
      .then((data) => {
        setBloodStore(data);
        console.log("show data:::", data);
      });
  }, [params.slug]);
  return (
    <div>
      <h1 className="text-xl">Blood Details.</h1>
      <hr />
      {bloodStore ? <p>{bloodStore.name}</p> : <h2>loading</h2>}
    </div>
  );
};

export default BloodInfo;
