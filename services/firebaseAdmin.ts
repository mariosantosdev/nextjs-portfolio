import admin from 'firebase-admin';

export function initFirebaseAdmin() {
  if (admin.apps.length) return admin.app();

  try {
    const app = admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.NEXT_PRIVATE_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.NEXT_PRIVATE_FIREBASE_PRIVATE_KEY,
        projectId: process.env.NEXT_PRIVATE_FIREBASE_PROJECT_ID,
      }),
    });
    return app;
  } catch (error) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
      console.error('Firebase admin initialization error', error.stack);
    }
  }
}
