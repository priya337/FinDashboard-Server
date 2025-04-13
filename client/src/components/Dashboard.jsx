import React, { useEffect, useState } from 'react';
import CardList from './CardList';
import Transactions from './Transactions';
import WeeklyChart from './WeeklyChart';
import ExpenseChart from './ExpenseChart';
import BalanceChart from './ BalanceChart.jsx';
import QuickTransfer from './QuickTransfer';
import './Dashboard.css';

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [balanceData, setBalanceData] = useState([]);
  const [showAllCards, setShowAllCards] = useState(false);

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    Promise.all([
      fetch(`${baseURL}/dashboard/cards`).then(res => res.json()),
      fetch(`${baseURL}/dashboard/transactions`).then(res => res.json()),
      fetch(`${baseURL}/dashboard/contacts`).then(res => res.json()),
      fetch(`${baseURL}/dashboard/balance-history`).then(res => res.json()),
    ])
      .then(([cardsData, txns, contactsData, balanceData]) => {
        setCards(cardsData);
        setTransactions(txns);
        setContacts(contactsData);
        setBalanceData(balanceData);
      })
      .catch(err => {
        console.error('Failed to load dashboard data:', err);
      });
  }, []);

  const visibleCards = showAllCards ? cards : cards.slice(0, 1);

  return (
    <div className="dashboard-wrapper">
      <h2 className="settings-title" style={{ position: 'absolute', top: '3%', left: '17%' }}>
        Overview
      </h2>

      {/* Header Row for My Cards & Transactions */}
      <div className="dashboard-row header-row">
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {/* <h2 style={{ fontSize: '1rem', fontWeight: '700', color: '#2c2c3a', margin: 0 }}>
            My Cards
          </h2> */}
          {/* <button
            onClick={() => setShowAllCards(prev => !prev)}
            className="see-all-btn"
            style={{ fontSize: '0.87rem', fontWeight: '600', marginRight: 'auto', marginLeft: '2rem' }}
          >
            {showAllCards ? 'Show Less' : 'See All'}
          </button> */}
          {/* <h2 style={{ fontSize: '1rem', fontWeight: '700', color: '#2c2c3a', marginRight: '15rem' }}>
            Recent Transactions
          </h2> */}
        </div>
      </div>

      {/* Cards & Transactions Row */}
      <div className="dashboard-row content-row">
        <CardList cards={visibleCards} />
        <Transactions items={transactions.slice(0, 3)} />
      </div>

      {/* Charts Row */}
      <div className="chart-row">
        <WeeklyChart />
        <ExpenseChart />
      </div>

      {/* Quick Transfer & Balance Row */}
      <div className="dashboard-row">
        <div className="dashboard-section quick-balance-wrapper">
          <QuickTransfer contacts={contacts} />
          <BalanceChart data={balanceData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
