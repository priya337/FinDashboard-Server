import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const WeeklyChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/dashboard/weekly-activity`)
      .then(res => res.json())
      .then(data => {
        const labels = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        const deposit = [];
        const withdrawal = [];

        // Match days and ensure data aligns
        labels.forEach(day => {
          const entry = data.find(item => item.day === day);
          deposit.push(entry?.deposit || 0);
          withdrawal.push(entry?.withdrawal || 0);
        });

        setChartData({
          labels,
          datasets: [
            {
              label: 'Deposit',
              data: deposit,
              backgroundColor: '#377dff',
              borderRadius: 6,
              barPercentage: 0.4,
              categoryPercentage: 0.5,
            },
            {
              label: 'Withdraw',
              data: withdrawal,
              backgroundColor: '#111827',
              borderRadius: 6,
              barPercentage: 0.4,
              categoryPercentage: 0.5,
            },
          ],
        });
      });
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px', marginRight: '1.5rem' }}>
      {/* Title OUTSIDE the card box */}
      <h2
        style={{
          fontSize: '1.0rem',
          fontWeight: '600',
          color: '#2c2c3a',
          marginBottom: '1rem',
          marginLeft: '0.5rem',
        }}
      >
        Weekly Activity
      </h2>

      <div
        style={{
          flex: 1,
          background: '#fff',
          borderRadius: '10px',
          padding: '85px 40px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.04)',
          minWidth: '850px',
        }}
      >
        {chartData ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                datalabels: {
                  display: false,
                },
                legend: {
                  position: 'top',
                  align: 'end',
                  labels: {
                    color: '#4b5563',
                    boxWidth: 12,
                    usePointStyle: true,
                    font: {
                      size: 12,
                      family: 'Segoe UI',
                    },
                  },
                },
                tooltip: {
                  enabled: true,
                },
              },
              scales: {
                x: {
                  stacked: false,
                  grid: { display: false },
                  ticks: {
                    color: '#9ca3af',
                    font: {
                      size: 11,
                      family: 'Segoe UI',
                    },
                  },
                },
                y: {
                  beginAtZero: true,
                  grid: { color: '#f3f4f6', drawBorder: false },
                  ticks: {
                    stepSize: 100,
                    color: '#9ca3af',
                    font: {
                      size: 11,
                      family: 'Segoe UI',
                    },
                  },
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

export default WeeklyChart;
