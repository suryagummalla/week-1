'use client';

import { useState } from 'react';

export default function TestPredict() {
  const [hour, setHour] = useState(10);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e) => {
    e.preventDefault();

    setError('');
    if (hour < 0 || hour > 23) {
      setError('Please enter a valid hour (0–23).');
      return;
    }
    setLoading(true);
    try {
      const url = `http://127.0.0.1:8003/predict?hour=${hour}`;
      console.log('Fetching URL:', url);
      const res = await fetch(url, { method: 'GET' });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setPrediction(data.consumption);
    } catch (err) {
      setError(`Failed to get prediction: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Energy Consumption Prediction</h1>
      <form onSubmit={handlePredict}>
        <input
          type="number"
          value={hour}
          min={0}
          max={23}
          onChange={(e) => setHour(Number(e.target.value))}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Predict'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {prediction !== null && (
        <p>Predicted Consumption: {prediction}</p>
      )}
    </div>
  );
}

