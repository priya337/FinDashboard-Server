import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);

const BalanceChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/dashboard/balance-history`)
      .then(res => res.json())
      .then(data => {
        const labels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
        const values = labels.map(month => {
          const entry = data.find(item => item.month === month);
          return entry?.balance || 0;
        });

        setChartData({
          labels,
          datasets: [
            {
              label: '', // No label shown
              data: values,
              fill: true,
              tension: 0.5,
              borderColor: '#377dff', // Soft blue line
              backgroundColor: 'rgba(55, 125, 255, 0.08)', // soft fill
              pointRadius: 0, // remove dots
            },
          ],
        });
      });
  }, []);

  return (
    <div style={{ maxWidth: '550px' }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem', color: '#2c2c3a' }}>
        Balance History
      </h2>
      <div
    style={{
    background: '#fff',
    borderRadius: '20px',
    padding: '1.5rem 2rem',
    height: '150px',
    width: '150%',
    boxShadow: '0 10px 20px rgba(0,0,0,0.04)',
  }}
>
        {chartData ? (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                datalabels: { display: false },
                tooltip: {
                  enabled: true,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  min: 0,
                  max: 800,
                  ticks: {
                    stepSize: 200,
                    color: '#9ca3af',
                    font: {
                      size: 11,
                      family: 'Segoe UI',
                    },
                  },
                  grid: {
                    drawBorder: false,
                    color: '#f3f4f6',
                  },
                },
                x: {
                  ticks: {
                    color: '#9ca3af',
                    font: {
                      size: 11,
                      family: 'Segoe UI',
                    },
                  },
                  grid: {
                    display: false,
                  },
                },
              },
              elements: {
                line: {
                  borderWidth: 2,
                },
                point: {
                  radius: 0, // fully hide points
                  hitRadius: 10,
                  hoverRadius: 4,
                },
              },
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default BalanceChart;
