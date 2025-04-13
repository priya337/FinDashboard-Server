import React, { useEffect, useState } from 'react';
import './Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1400/dashboard/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.error('Failed to load transactions:', err));
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div style={{ marginLeft: '1rem', flex: 1 }}>
      <h2
        style={{
          fontSize: '1.0rem',
          fontWeight: '600',
          color: '#2c2c3a',
          marginBottom: '1rem',
          marginLeft: '7.5rem',
          marginTop: '0.5rem'
        }}
      >
        Recent Transactions
      </h2>

      <div
        style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          height: '200px', // ⬅️ reduced to force scroll overflow
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          width: '36%',
          marginLeft: '7.5rem'
        }}
      >
        <div
          className="dark-scrollbar"
          style={{
            overflowY: 'auto',
            height: '70%',
            paddingRight: '0.1rem',
          }}
        >
          {transactions.map((tx) => {
            const isPositive = tx.amount >= 0;
            return (
              <div
                key={tx.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                  borderBottom: '1px solid #eee',
                  paddingBottom: '1rem',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    backgroundColor: isPositive ? '#e0fcec' : '#fff4db',
                  }}
                >
                  {tx.icon || '💰'}
                </div>

                <div style={{ flex: 1, marginLeft: '1rem' }}>
                  <div
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      marginBottom: '0.25rem',
                      color: '#2c2c3a',
                    }}
                  >
                    {tx.description}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#888' }}>
                    {formatDate(tx.date)}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: isPositive ? '#28C76F' : '#EA5455',
                    overflowX: 'auto',
                    maxWidth: '100px',
                    whiteSpace: 'nowrap',
                    paddingBottom: '4px',
                  }}
                >
                  {isPositive
                    ? `+$${tx.amount.toLocaleString()}`
                    : `-$${Math.abs(tx.amount).toLocaleString()}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scrollbar Styling */}
      <style>
        {`
          .dark-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #333 #e0e0e0;
          }
          .dark-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .dark-scrollbar::-webkit-scrollbar-thumb {
            background: #333;
            border-radius: 4px;
          }
        `}
      </style>
    </div>
  );
};

export default Transactions;
