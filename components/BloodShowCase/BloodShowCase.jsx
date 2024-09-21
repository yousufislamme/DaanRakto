import { useEffect, useState } from "react";

const BloodShowCase = () => {
  const [bloodTypeCounts, setBloodTypeCounts] = useState({});

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchBloodTypeCounts = async () => {
      try {
        const response = await fetch("http://localhost:5000/blood_api");
        const data = await response.json();
        setBloodTypeCounts(data);
      } catch (error) {
        console.error("Error fetching blood type data:", error);
      }
    };

    fetchBloodTypeCounts();
  }, []);
  // "https://www.google.com/maps/dir/23.6837866,90.4562554"
  return (
    <div className="absolute -bottom-12 rounded-lg bg-red-600 p-5 shadow-xl">
      <div className="flex gap-5"></div>
    </div>
  );
};

export default BloodShowCase;
