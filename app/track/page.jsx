"use client";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  TrafficLayer,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

// Google Maps container style
const containerStyle = {
  width: "100%",
  height: "500px",
};

export default function MapComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBIrPtKyXR--gijymYeTks8aAnn0zRBQf0", // Replace with your API key
  });

  const [currentLocation, setCurrentLocation] = useState(null); // Store user's current geolocation
  const [destination, setDestination] = useState({ lat: 23.6238, lng: 90.4992 }); // Example: Narayanganj
  const [directions, setDirections] = useState(null); // Store directions

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting current location: ", error);
          // Fallback to a default location if geolocation fails
          setCurrentLocation({ lat: 23.8103, lng: 90.4125 });
        }
      );
    }
  }, []);

  useEffect(() => {
    if (isLoaded && currentLocation) {
      // Create a DirectionsService instance to calculate the route
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: currentLocation, // User's current location
          destination: destination, // Dynamic destination (e.g., Narayanganj)
          travelMode: google.maps.TravelMode.DRIVING, // Use DRIVING mode for traffic updates
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirections(result); // Update the directions state
          } else {
            console.error(`Error fetching directions: ${status}`);
          }
        }
      );
    }
  }, [isLoaded, currentLocation, destination]);

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation || { lat: 23.8103, lng: 90.4125 }} // Use current location or fallback to Dhaka
      zoom={10} // Set zoom level
    >
      {/* Marker for the current location */}
      {currentLocation && <Marker position={currentLocation} />}

      {/* Traffic layer to show real-time traffic */}
      <TrafficLayer />

      {/* Render directions if available */}
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
}
