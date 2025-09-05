"use client";

import { useState, useEffect } from "react";

export default function Prediction() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPrediction() {
      try {
        const response = await fetch("/api/predict");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPrediction();
  }, []);

  if (loading) return <p>Loading prediction...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Energy Consumption Prediction</h2>
      <p>
        Consumption: {data.consumption} {data.unit}
      </p>
      <p>Timestamp: {new Date(data.timestamp).toLocaleString()}</p>
    </div>
  );
}
