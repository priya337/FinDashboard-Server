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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        background: '#fff',
        borderRadius: '20px',
        padding: isMobile ? '1rem' : '0.5rem 2rem',
        height: isMobile ? '240px' : '300px',
        width: isMobile ? '85%' : '820px',
        marginLeft: isMobile ? 0 : '0.5rem',
        boxShadow: '0 10px 20px rgba(0,0,0,0.04)',
        boxSizing: 'border-box',
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
