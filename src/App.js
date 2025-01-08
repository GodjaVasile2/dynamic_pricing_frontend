// App.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import Navbar from "./components/Navbar";
import ParkingMap from "./components/ParkingMap";
import ParkingJSON from "./components/ParkingJSON";

function App() {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  // Inițializezi conexiunea la server
  useEffect(() => {
    // IP-ul/hostul și portul trebuie să corespundă cu serverul tau Node
    const socket = io("http://localhost:3001");

    // Ascultă evenimentul "parkingEvent" de la server
    socket.on("parkingEvent", (newEvent) => {
      console.log("New event received:", newEvent);

      // Aici decizi cum actualizezi state-ul.
      // E posibil să faci un API call la /api/parking-prices
      // sau să încerci să actualizezi doar spot-ul afectat:
      // (depinde de logica ta)

      // Simplu: refaci tot call-ul la /api/parking-prices
      // ca să recalculezi prețuri, occupancy, etc.
      fetchParkingData();
    });

    // În plus, la montare (component did mount):
    fetchParkingData();

    return () => {
      // Cleanup
      socket.disconnect();
    };
  }, []);

  const fetchParkingData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/parking-prices");
      setParkingSpots(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching parking data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <main>
        {loading ? (
          <p>Loading parking spots...</p>
        ) : (
          <div className="content">
            <div className="left">
              <ParkingMap parkingSpots={parkingSpots} />
            </div>
            <div className="right">
              <ParkingJSON parkingSpots={parkingSpots} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
