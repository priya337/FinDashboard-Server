import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ExpenseChart = () => {
  // Order: [Entertainment (Top), Bill Expense (Left), Investment (Right), Others (Bottom)]
  const labels = ['Entertainment', 'Bill Expense', 'Others', 'Investment'];
  const values = [30, 15, 35,20];
  const colors = ['#2e3361', '#f59f0a', '#1b1b1b',  '#3763f4'];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderColor: '#ffffff',
        borderWidth: 6,
        spacing: 10,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -3100 * (Math.PI / 180), // Start at top (default is right)
    plugins: {
      datalabels: {
        color: '#fff',
        font: {
          size: 13,
          weight: 'bold',
          family: 'Segoe UI',
        },
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${value}%\n${label}`;
        },
        anchor: 'center',
        align: 'center',
        offset: 0,
        padding: 0,
        clip: false,
      },
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: context => `${context.label}: ${context.raw}%`,
        },
      },
    },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      {/* Title outside the box */}
      <h2 style={{
        fontSize: '1.0rem',
        fontWeight: 600,
        color: '#2c2c3a',
        marginBottom: '1rem',
        marginLeft: '-45rem'
      }}>
        Expense Statistics
      </h2>

      <div
        style={{
          background: '#fff',
          borderRadius: '20px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.06)',
          height: '290px',
          width: '350px',
          padding: '1.2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: '-45rem'
        }}
      >
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseChart;
