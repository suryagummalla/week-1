import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';

function ConsumptionChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8002/predict_all')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  const chartData = {
    labels: data.map((item) => item.hour),
    datasets: [
      {
        label: 'Energy Consumption',
        data: data.map((item) => item.consumption), // ✅ fixed
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
        tension: 0.1,
      }
    ],
  };

  return <Line data={chartData} />;
}

export default ConsumptionChart;
