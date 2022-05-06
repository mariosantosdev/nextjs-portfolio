import { auth } from 'firebase-admin';
import { initFirebaseAdmin } from './firebaseAdmin';

export default function isAuthenticated(token: string) {
  return new Promise<boolean>((resolve, reject) => {
    if (!token) return resolve(false);
    const adminApp = initFirebaseAdmin();

    token = typeof token === 'string' ? token : token[0];
    if (!token) reject('Token inválido');

    const tokenWithoutType = token.replace('Bearer ', '');

    auth(adminApp)
      .verifyIdToken(tokenWithoutType, false)
      .then(() => resolve(true))
      .catch((error) => {
        console.error(error);
        resolve(false);
      });
  });
}
