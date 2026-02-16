import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const LiveTracking = () => {
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  useEffect(() => {
    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setAccuracy(pos.coords.accuracy);
        },
        (err) => console.error(err),
        {
          enableHighAccuracy: true,
        }
      );
    };

    updateLocation(); // Initial fetch
    const intervalId = setInterval(updateLocation, 10000); // Update every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  if (!position) return <h2 className="text-center text-xl">📍 Fetching location...</h2>;

  return (
    <div className="absolute inset-0"> {/* Ensures the map takes the full screen */}
      <MapContainer center={position} zoom={12} className="h-full w-full">
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} />
        <Circle center={position} radius={accuracy} />
      </MapContainer>
    </div>
  );
};

export default LiveTracking;