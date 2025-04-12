import React, { useEffect, useState } from 'react';
import './Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1000/dashboard/transactions')
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
    <div className="transactions-box">
      {/* <h3 className="transactions-title">Recent Transaction</h3> */}
      <div className="transaction-cards">
        {transactions.map(tx => {
          const isPositive = tx.amount >= 0;
          return (
            <div className="transaction-row" key={tx.id}>
              <div
                className="transaction-icon"
                style={{ backgroundColor: isPositive ? '#e0fcec' : '#fff4db' }}
              >
                {tx.icon || '💰'}
              </div>
              <div className="transaction-info">
                <div className="transaction-desc">{tx.description}</div>
                <div className="transaction-date">{formatDate(tx.date)}</div>
              </div>
              <div
                className="transaction-amount"
                style={{ color: isPositive ? '#28C76F' : '#EA5455' }}
              >
                {isPositive ? `+$${tx.amount.toLocaleString()}` : `-$${Math.abs(tx.amount).toLocaleString()}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Transactions;
