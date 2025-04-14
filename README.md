# FinDashboard-Frontend: 

# Features
# Dashboard Page
My Cards: Scrollable card section (horizontally or vertically on smaller screens) with "See All"/"Show Less" toggle.

Recent Transactions: Scrollable list of latest financial activities with icons and color-coded amounts.

Weekly Activity Chart: Dynamic bar chart using Chart.js showing deposit/withdrawal trends.

Expense Statistics: Pie chart representing category-wise spending.

Quick Transfer: Contact-based UI for simulated transfers with input for amounts.

Balance History Chart: Line chart visualizing trends in account balance.

# Settings Page
Tabs: Profile, Preferences, and Security.

Edit Profile: Editable form with fields like name, email, password, address, etc., and validation.

Profile Picture Upload: Possibility to navigate to the location for uploading a new profile picture. 

Form Validation: Validates email format and password strength.

# Tech Stack
React.js + React Router

Chart.js for data visualization

CSS Modules / Custom CSS

Context API for lightweight state management

Vite for lightning-fast development

Mock API Integration via fetch() from VITE_API_BASE_URL

# Responsiveness
Responsive on Laptop, IPad Mini ,Iphone SE , Samsung Galaxy S8+ etc..

Mobile and tablet layouts tested across Chrome DevTools , Edge Devtools and Firefox 
DevTools. 

Vertical scrolling on smaller screens are also available. 

# Project Structure
css
Copy
Edit
src/
│
├── components/
│   ├── CardList.jsx
│   ├── Transactions.jsx
│   ├── WeeklyChart.jsx
│   ├── ExpenseChart.jsx
│   ├── QuickTransfer.jsx
│   ├── BalanceChart.jsx
│   ├── Settings.jsx
│   ├── Header.jsx
│   ├── Sidebar.jsx
│
├── styles/
│   ├── App.css
│   ├── Dashboard.css
│   ├── Header.css
│   ├── CardList.css
│   └── Settings.css
│
├── App.jsx
└── main.jsx

# Setup Instructions

# Clone the Repository
git clone https://github.com/your-username/soar-finance-dashboard.git
cd soar-finance-dashboard

# Install Dependencies
npm install

# Create .env File
VITE_API_BASE_URL=http://localhost:1400

# Run Locally
npm run dev

# Build for Production

npm run build


# Assumptions Made

API endpoints are mocked using static JSON or local servers.

Placeholder avatars and icons are used for quick transfer and transactions.

No backend integration – this is a purely frontend UI implementation.

