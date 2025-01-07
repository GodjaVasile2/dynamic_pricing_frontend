// App.js
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ParkingMap from "./components/ParkingMap";
import ParkingJSON from "./components/ParkingJSON";
import axios from "axios";

function App() {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParkingData = async () => {
      try {
        const response = await axios.get("http://13.60.97.119:3001/api/parking-prices");
        setParkingSpots(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching parking data:", error);
        setLoading(false);
      }
    };

    fetchParkingData();
  }, []);

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
