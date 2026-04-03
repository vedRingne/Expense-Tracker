<div align="center">
  <h1>💸 Expense Tracker Pro</h1>
  <p>A beautifully designed, full-featured personal finance application built to help you track your spending, visualize your money, and take control of your financial health.</p>
</div>

---

## 🌟 Features

- 🔐 **Secure Authentication:** Private data securely managed via Firebase Authentication (Email/Password).
- 📊 **Dynamic Dashboard:** Real-time overview of your finances with Recharts pie charts and metrics.
- 📱 **Fully Responsive:** Sleek, modern UI that works flawlessly on mobile, tablet, and desktop.
- 💳 **Transaction Management:** Add, delete, and categorize expenses intuitively.
- 🌙 **Dark/Light Mode Ready:** Beautiful Tailwind CSS design that adapts to your preferences.
- ⚡ **Real-time Sync:** Powered by Firebase Firestore, your expenses are synced instantaneously across devices.

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS
- **Visualization:** Recharts, Lucide React (Icons)
- **State Management:** React Context API
- **Backend/Database:** Google Firebase (Auth & Firestore)
- **Routing:** React Router v7

---

## 🚀 Quick Start & Installation

To run this application locally with full functionality, you must configure your Firebase backend. 

### 1. Firebase Console Setup
1. Go to your [Firebase Console](https://console.firebase.google.com/).
2. **Authentication:** Go to `Authentication -> Sign-in method` and **Enable Email/Password**.
3. **Firestore Database:** Create a new Firestore Database. Under the Rules tab, paste the following strictly for logged-in security:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null; // Only logged in users
       }
     }
   }
   ```
4. **Get Credentials:** Go to `Project Settings (Gear Icon) -> General`. Scroll down to the "Your apps" section and locate your `firebaseConfig` keys.

### 2. Local Environment Setup
Clone the repository and install the dependencies:
```bash
git clone https://github.com/vedRingne/Expense-Tracker.git
cd Expense-Tracker
npm install
```

Create an `.env` file at the root of the project and paste your actual Firebase configuration values:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Run the Application
Boot up the Vite development server:
```bash
npm run dev
```
The app will launch locally at `http://localhost:5173/`. Navigate to the `/login` route to create your first account and start tracking!

---

## 📂 Project Structure

```text
expense-tracker/
├── public/                 # Static assets (including deployment redirects)
├── src/
│   ├── components/         # Reusable UI components (Sidebar, Layout, Modals)
│   ├── context/            # React Context (AuthContext, ExpenseContext)
│   ├── pages/              # Primary views (Dashboard, Transactions, Login, etc.)
│   ├── App.jsx             # Advanced App Routing & Protection
│   ├── firebase.js         # Firebase App, db, and auth instance exports
│   └── index.css           # Global Tailwind integrations
├── .env                    # Environment variables (Ignored by Git)
├── vercel.json             # Vercel deployment configurations
└── package.json            # Node dependencies
```

---

## 🚀 Deployment Configured

This app comes readily configured for deployment on any static platform. By default:
- **Netlify:** Utilizes `public/_redirects` to correctly handle client-side React Routing.
- **Vercel:** Utilizes `vercel.json` to handle React Routing rewrites seamlessly.

Just link the repository to your host and select the `dist` directory as the build output!

