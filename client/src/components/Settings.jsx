import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'Charlene Reed',
    username: 'Charlene Reed',
    email: 'charlenereed@gmail.com',
    password: '********',
    dob: '1990-01-25',
    presentAddress: 'San Jose, California, USA',
    permanentAddress: 'San Jose, California, USA',
    city: 'San Jose',
    postalCode: '45962',
    country: 'USA',
  });

  const [profilePic, setProfilePic] = useState('https://i.pravatar.cc/100'); // Profile picture in settings

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newProfilePic = URL.createObjectURL(file); // Create an object URL for the uploaded image
      setProfilePic(newProfilePic); // Update profile picture state in settings
      handleProfilePicChange(newProfilePic); // Pass updated profile picture to the parent
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="settings-page">
      <h2 className="settings-title" style={{ position: 'absolute', top: '3%', left: '17%' }}>
        Settings
      </h2>

      <div className="settings-card">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Edit Profile
          </button>
          <button
            className={`tab ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            Preferences
          </button>
          <button
            className={`tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>

        {activeTab === 'profile' && (
          <>
            <div className="form-grid">
              <div className="profile-picture">
                <img src="https://i.pravatar.cc/100" alt="Profile" />
                <label className="edit-icon" title="Edit photo">
                  ✏️
                  <input type="file" hidden />
                </label>
              </div>

              <div className="form-group">
                <label>Your Name</label>
                <input name="name" value={formData.name} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>User Name</label>
                <input name="username" value={formData.username} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input name="password" type="password" value={formData.password} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input name="dob" type="date" value={formData.dob} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Present Address</label>
                <input name="presentAddress" value={formData.presentAddress} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Permanent Address</label>
                <input name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>City</label>
                <input name="city" value={formData.city} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Postal Code</label>
                <input name="postalCode" value={formData.postalCode} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Country</label>
                <input name="country" value={formData.country} onChange={handleChange} />
              </div>
            </div>

            <div className="form-actions">
              <button className="save-button">Save</button>
            </div>
          </>
        )}

        {activeTab === 'preferences' && <div className="placeholder">Preferences coming soon...</div>}
        {activeTab === 'security' && <div className="placeholder">Security content coming soon...</div>}
      </div>
    </div>
  );
};

export default Settings;
