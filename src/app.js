"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function App() {
  const [inputHour, setInputHour] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // API base URL (from .env.local or fallback)
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://127.0.0.1:8002";

  const handlePredict = async (e) => {
    e.preventDefault(); // Prevent default form POST submission
    setError("");
    setPrediction(null);
    setLoading(true);

    const hour = parseInt(inputHour.trim(), 10);

    if (isNaN(hour) || hour < 0 || hour > 23) {
      setError("Please enter a valid hour (0–23).");
      setLoading(false);
      return;
    }

    try {
      const url = `${API_BASE}/predict?hour=${hour}`;
      console.log("Calling API:", url);

      const res = await fetch(url, { method: "GET" }); // Ensure GET request

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      console.log("API response:", data);

      if (data && typeof data.consumption !== "undefined") {
        setPrediction(data.consumption);
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      if (err.name === "TypeError") {
        setError("Network error: Check server or CORS settings.");
      } else {
        setError(err.message || "Failed to get prediction. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-center">
            ⚡ Energy Consumption Prediction
          </h1>

          <form onSubmit={handlePredict} className="flex space-x-2">
            <Input
              type="number"
              min="0"
              max="23"
              value={inputHour}
              onChange={(e) => setInputHour(e.target.value)}
              placeholder="Enter hour (0–23)"
            />
            <Button type="submit" disabled={loading || inputHour.trim() === ""}>
              {loading ? "Loading..." : "Predict"}
            </Button>
          </form>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {prediction !== null && (
            <p className="text-green-600 text-lg font-medium text-center">
              Prediction: {prediction} kWh
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

