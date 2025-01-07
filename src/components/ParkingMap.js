import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIconFree from "../assets/placeholder_free.png"; // Marker pentru starea "free"
import markerIconOccupied from "../assets/placeholder_occ.png"; // Marker pentru starea "occupied"

// Creează icon-uri personalizate pentru stările "free" și "occupied"
const freeIcon = new L.Icon({
  iconUrl: markerIconFree,
  iconSize: [25, 41], // Dimensiune standard
  iconAnchor: [12, 41], // Punctul de ancorare
  popupAnchor: [1, -34], // Poziția popup-ului
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const occupiedIcon = new L.Icon({
  iconUrl: markerIconOccupied,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const ParkingMap = ({ parkingSpots }) => {
  return (
    <div className="map-container">
      <MapContainer
        center={[46.769, 23.589]} // Centrat pe o locație implicită
        zoom={12}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.carto.com/">Carto</a>'
        />
        {parkingSpots.map((spot) => (
          <Marker
            key={spot.spot_id}
            position={[spot.latitude, spot.longitude]}
            icon={spot.status === "free" ? freeIcon : occupiedIcon} // Atribuie icon-ul pe baza stării
          >
            <Popup>
              <strong>{spot.spot_id}</strong>
              <br />
              Status: {spot.status}
              <br />
              Price: ${spot.price}
              <br />
              Occupancy: {spot.occupancy_rate}%
              <br />
              Weather: {spot.weather.condition}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ParkingMap;
