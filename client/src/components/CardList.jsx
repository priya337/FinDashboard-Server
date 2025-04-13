import React, { useEffect, useState, useRef } from 'react';
import './CardList.css'

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [showScroll, setShowScroll] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/dashboard/cards`)
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(() => setCards([]));
  }, []);

  const toggleScroll = () => {
    setShowScroll(prev => !prev);
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const visibleCards = showScroll ? cards : cards.slice(0, 1);

  return (
    <>
      {/* Scrollbar styling */}
      <style>{`
        .scroll-area::-webkit-scrollbar {
          height: 8px;
        }
        .scroll-area::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 4px;
        }
        .scroll-area {
          scrollbar-width: thin;
          scrollbar-color: #444 #eee;
        }
      `}</style>

      <div style={{ marginBottom: '2rem', paddingRight: '1rem' }}>
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <h2
            style={{
              fontSize: '1.0rem',
              fontWeight: 600,
              color: '#2c2c2c',
              margin: 0,
            }}
          >
            My Cards
          </h2>
          {cards.length > 1 && (
            <button
              onClick={toggleScroll}
              style={{
                background: 'none',
                border: '1px solid #3f51b5',
                borderRadius: '6px',
                color: '#3f51b5',
                fontWeight: 500,
                fontSize: '1rem',
                cursor: 'pointer',
                padding: '0.3rem 0.75rem',
              }}
            >
              {showScroll ? 'Show Less' : 'See All'}
            </button>
          )}
        </div>

        {/* Scrollable card list */}
        <div
  ref={scrollRef}
  className="scroll-area"
  style={{
    overflowX: showScroll ? 'auto' : 'hidden',
    overflowY: 'hidden', // ⬅️ if vertical scroll is not needed
    whiteSpace: 'nowrap',
    scrollBehavior: 'smooth',
    paddingBottom: '0.5rem',
    width: '95%',
    maxHeight: '200px', // ⬅️ FORCES scroll area limit
    borderBottom: '1px solid #eee',
  }}
>
          {visibleCards.map((card, index) => (
            <div
              key={card.id}
              style={{
                display: 'inline-block',
                verticalAlign: 'top',
                minWidth: '260px',
                maxWidth: '260px',
                marginRight: '1.5rem',
                borderRadius: '16px',
                padding: '1.2rem',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
                background:
                  index === 0
                    ? 'linear-gradient(135deg, #1c1c27, #3a3a4c)'
                    : '#fff',
                color: index === 0 ? '#fff' : '#1c1c1c',
                border: index === 0 ? 'none' : '1px solid #ddd',
                position: 'relative',
              }}
            >
              <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                <svg width="30" height="20" viewBox="0 0 36 28">
                  <rect
                    x="1"
                    y="1"
                    width="34"
                    height="26"
                    rx="4"
                    fill={index === 0 ? '#fff' : '#1c1c1c'}
                  />
                  <rect x="13" y="1" width="2" height="26" fill="#ccc" />
                  <rect x="21" y="1" width="2" height="26" fill="#ccc" />
                  <circle cx="18" cy="14" r="2" fill="#888" />
                </svg>
              </div>

              <div
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                }}
              >
                ${parseFloat(card.balance).toLocaleString()}
              </div>
              <div
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  marginBottom: '0.25rem',
                }}
              >
                {card.cardHolder}
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 500 }}>
                **** **** **** {card.cardNumber.slice(-4)}
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                }}
              >
                <svg width="36" height="36" viewBox="0 0 48 48">
                  <circle
                    cx="20"
                    cy="24"
                    r="10"
                    fill={index === 0 ? '#fff' : '#000'}
                  />
                  <circle
                    cx="28"
                    cy="24"
                    r="10"
                    fill={index === 0 ? '#fff' : '#000'}
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CardList;
