// Modular Firebase v.9 Initialization.
import { getApp, getApps, initializeApp } from 'firebase/app';

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export function initFirebase() {
  if (getApps().length) return getApp();

  if (typeof window !== undefined) {
    const app = initializeApp(clientCredentials);
    console.log('Firebase has been init successfully');
    return app;
  }
}

export const fbApp = initializeApp(clientCredentials);
