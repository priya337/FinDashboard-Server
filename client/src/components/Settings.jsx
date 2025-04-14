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

  const [errors, setErrors] = useState({});
  const [profilePic, setProfilePic] = useState('https://i.pravatar.cc/100');
  const [isSaving, setIsSaving] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newProfilePic = URL.createObjectURL(file);
      setProfilePic(newProfilePic);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters and include letters and numbers.';
    }

    return newErrors;
  };

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSaving(false);
    alert('Settings saved!');
  };

  return (
    <div className="settings-page">
      {/* <h2 className="settings-title" style={{ position: 'absolute', top: '3%', left: '17%' }}>
        Settings
      </h2> */}

      <div className="settings-card">
        <div className="tabs">
          {['profile', 'preferences', 'security'].map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'profile' && (
          <>
            <div className="form-grid">
            <div className="profile-picture">
  <img src={profilePic} alt="Profile" />
  <label
    className="edit-icon"
    title="Edit photo"
    aria-label="Edit profile picture"
    role="button"
    tabIndex="0"
  >
    ✏️
    <input type="file" hidden onChange={handleImageUpload} />
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
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'invalid' : ''}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'invalid' : ''}
                />
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input name="dob" type="date" value={formData.dob} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label>Present Address</label>
                <input
                  name="presentAddress"
                  value={formData.presentAddress}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Permanent Address</label>
                <input
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                />
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
              <button className="save-button" onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </button>
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
