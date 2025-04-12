import React, { useEffect, useState } from 'react';
import './CardList.css';

const CardList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/dashboard/cards`)
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(() => setCards([]));
  }, []);

  return (
    <div className="cards-wrapper">
      <h2 style={{ fontSize: '1.0rem', fontWeight: '700', color: '#2c2c3a', margin: 0, textAlign: 'left', marginLeft:  '-250px', marginTop: '-75px' }}className="cards-title">My Cards</h2>

      <div className="card-container">
     
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${index === 0 ? 'primary' : 'secondary'}`}
          >
          <svg width="25" height="120" ></svg>
            <div className="card-chip">
              <svg width="30" height="20" viewBox="0 0 36 28">
                <rect
                  x="1"
                  y="1"
                  width="34"
                  height="26"
                  rx="4"
                  fill={index === 0 ? '#ffffff' : '#1c1c1c'}
                />
                <rect x="13" y="1" width="2" height="26" fill="#ccc" />
                <rect x="21" y="1" width="2" height="26" fill="#ccc" />
                <circle cx="18" cy="14" r="2" fill="#888" />
              </svg>
            </div>

            <div className="card-balance">${parseFloat(card.balance).toLocaleString()}</div>
            <div className="card-holder">{card.cardHolder}</div>
            <div className="card-number">**** **** **** {card.cardNumber.slice(-4)}</div>

            <div className="card-toggle">
  <svg width="36" height="36" viewBox="0 0 48 48">
    <circle cx="20" cy="24" r="10" fill={index === 0 ? '#fff' : '#000'} />
    <circle cx="28" cy="24" r="10" fill={index === 0 ? '#fff' : '#000'} />
  </svg>
</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
