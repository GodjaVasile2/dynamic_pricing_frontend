// components/ParkingJSON.js
import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/docco";

// Înregistrează limbajul JSON pentru SyntaxHighlighter
SyntaxHighlighter.registerLanguage("json", json);

const ParkingJSON = ({ parkingSpots }) => {
  return (
    <div className="json-container">
      <h2>Parking Data (JSON)</h2>
      <SyntaxHighlighter language="json" style={docco}>
        {JSON.stringify(parkingSpots, null, 2)}
      </SyntaxHighlighter>
    </div>
  );
};

export default ParkingJSON;
