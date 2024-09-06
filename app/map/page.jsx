"use client";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
function MapNear() {
  const [userLocation, setUserLocation] = useState(null);

  // Function to get the user's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting user location:", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Run the getUserLocation function when the component mounts
  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div>
      <h1>Geolocation App</h1>
      {userLocation ? (
        <MapContainer
          center={[userLocation.latitude, userLocation.longitude]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[userLocation.latitude, userLocation.longitude]}>
            <Popup>
              You are here:
              {/* Check for valid coordinates before displaying */}
              {userLocation.latitude && userLocation.longitude ? (
                `${userLocation.latitude}, ${userLocation.longitude}`
              ) : (
                <span>Location unavailable</span>
              )}
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
}

export default MapNear;
