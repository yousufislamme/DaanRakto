"use client";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import io from "socket.io-client";

// Connect to the Socket.io server
const socket = io("http://localhost:4000"); // Replace with your API server URL

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
    googleMapsApiKey: "AIzaSyBVWwiek_E90YFAAjB8jZeQVn_Fzqv1vq8", // Replace with your API key
  });

  const [currentLocation, setCurrentLocation] = useState(defaultCenter);

  useEffect(() => {
    // Listen for location updates from the server
    socket.on("trackLocation", (data) => {
      setCurrentLocation({
        lat: data.latitude,
        lng: data.longitude,
      });
    });

    return () => socket.disconnect(); // Clean up on component unmount
  }, []);

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation} // Center the map based on the real-time location
      zoom={16} // Adjust the zoom level as needed
    >
      {/* Add a marker to indicate the real-time location */}
      <Marker position={currentLocation} />
    </GoogleMap>
  );
}
