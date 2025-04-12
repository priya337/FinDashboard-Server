import React, { useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import './QuickTransfer.css';

function QuickTransfer() {
  const [contacts, setContacts] = useState([]);
  const [amount, setAmount] = useState('525.50');

  useEffect(() => {
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    fetch(`${baseURL}/dashboard/contacts`)
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(err => console.error("Failed to fetch contacts:", err));
  }, []);

  return (
    <div className="quick-transfer-container">
      <h2 className="section-title">Quick Transfer</h2>

      <div className="transfer-card">
        <div className="transfer-users">
          {contacts.map(contact => (
            <div className="user" key={contact.id}>
              <img src={contact.avatar} alt={contact.name} />
              <div className="user-info">
                <span className="user-name">{contact.name}</span>
                <span className="user-role">{contact.role}</span>
              </div>
            </div>
          ))}
          <div className="arrow-btn">➤</div>
        </div>

        <div className="transfer-input">
          <span className="label">Write Amount</span>
          <input
            type="text"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="amount-box"
          />
          <button className="send-btn">
            Send <FiSend className="send-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuickTransfer;
