import React, { useEffect, useState } from 'react';
import CardList from './CardList';
import Transactions from './Transactions';
import './Dashboard.css';
import WeeklyChart from './WeeklyChart';
import ExpenseChart from './ExpenseChart';
import BalanceChart from './ BalanceChart.jsx';
import QuickTransfer from './QuickTransfer.jsx';

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [contacts, setContacts] = useState([]); 
  const [balanceData, setBalanceData] = useState([]);

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    Promise.all([
      fetch(`${baseURL}/dashboard/cards`).then(res => res.json()),
      fetch(`${baseURL}/dashboard/transactions`).then(res => res.json()),
      fetch(`${baseURL}/dashboard/contacts`).then(res => res.json()) ,
      fetch(`${baseURL}/dashboard/balance-history`).then(res => res.json())
    ])
      .then(([cardsData, txns]) => {
        setCards(cardsData);
        setTransactions(txns);
      })
      .catch(err => {
        console.error("Failed to load dashboard data:", err);
      });
  }, []);

  return (
    <div className="dashboard-wrapper">
     <h2 className="settings-title" style={{ position: 'absolute', top: '3%', left: '17%' }}>
        Overview
      </h2>
      <div className="dashboard-row header-row">
        {/* <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#2c2c3a', margin: 0, marginbottom: '10px', textAlign: 'left', marginRight:  '850px', marginTop: '30px' }}>My Cards</h3> */}
        <button  style={{ fontSize: '0.87rem', fontWeight: '600', color: '#2c2c3a', margin: 0, textAlign: 'left', marginLeft: '850px' }} className="see-all-btn">See All</button>
        <h2 style={{ fontSize: '1.0rem', fontWeight: '700', color: '#2c2c3a', margin: 0, textAlign: 'left', marginRight: '250px' }}>Recent Transaction</h2>
      </div>

      <div className="dashboard-row content-row">
        <CardList cards={cards.slice(0, 2)} />
        <Transactions items={transactions.slice(0, 2)} />
      </div>

      <div className="chart-row">
  <WeeklyChart />
  <ExpenseChart />
</div>

<div className="dashboard-row">
  <div className="dashboard-section quick-balance-wrapper">
    <QuickTransfer />
    <BalanceChart />
  </div>
</div>
    </div>
  );
};

export default Dashboard;
