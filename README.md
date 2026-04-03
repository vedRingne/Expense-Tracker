# Expense Tracker Pro

A modern, full-featured expense tracking application built with React, Tailwind CSS, and Recharts.

## Features

-   **Dashboard**: real-time overview of expenses with visual charts.
-   **Analytics**: Daily spending trends and category distribution.
-   **Transaction Management**: Search, filter, and manage expense records.
-   **Data Export**: Download your expenses as CSV.
-   **Modern UI**: Fully responsive, dark-mode ready design.

## Tech Stack

-   React 19
-   Vite
-   Tailwind CSS
-   Recharts
-   Context API
-   **Firebase** (Authentication & Firestore Database)

## Quick Start (How to Run Perfectly)

To run this application locally with full functionality, you must configure your Firebase backend. Follow these exact steps:

### 1. Firebase Console Setup
1. Go to your [Firebase Console](https://console.firebase.google.com/).
2. **Authentication**: Navigate to Authentication -> Sign-in method, and **Enable Email/Password**.
3. **Firestore Database**: Create a Firestore Database. Go to the Rules tab and temporarily set them to allow testing:
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
4. **Get Credentials**: Go to Project Settings (the gear icon) -> General. Scroll down to "Your apps" (or create a Web App if you haven't). Copy the `firebaseConfig` object values.

### 2. Local Environment Setup
1. Open the `.env` file at the root of the project.
2. Replace the placeholder values with your actual Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### 3. Run the Application
Start the development server:
```bash
npm run dev
```

The app will launch in your browser. You can now use the `/login` route to Create an Account or Sign in!

## Expanding the ESLint configuration
If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
