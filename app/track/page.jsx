"use client";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";

// Google Maps container style
const containerStyle = {
  width: "100%",
  height: "500px",
};

// Default center point (Dhaka)
const defaultCenter = {
  lat: 23.8103, // Latitude for Dhaka
  lng: 90.4125, // Longitude for Dhaka
};

export default function MapComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBIrPtKyXR--gijymYeTks8aAnn0zRBQf0", // Replace with your API key
  });

  const [currentLocation, setCurrentLocation] = useState(defaultCenter);

  useEffect(() => {
    // Example: You can update this with some other logic or static location updates if needed
    setCurrentLocation(defaultCenter);
  }, []);

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation} // Center the map based on the default or updated location
      zoom={16} // Adjust the zoom level as needed
    >
      {/* Add a marker to indicate the current location */}
      <Marker position={currentLocation} />
    </GoogleMap>
  );
}
