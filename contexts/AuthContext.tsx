import { getAuth, signInWithEmailAndPassword, User } from 'firebase/auth';
import { destroyCookie, setCookie } from 'nookies';
import { createContext, useContext, useEffect, useState } from 'react';
import { initFirebase } from '../services/firebase';

interface IAuth {
  user: User | null;
  SignIn: (email: string, password: string) => Promise<void>;
  SignOut: () => Promise<void>;
}

const AuthContext = createContext({} as IAuth);

const fbApp = initFirebase();
export const auth = getAuth(fbApp);
const cookieName = '@marioportfolio:token';

export function AuthProvider({ children }) {
  function SignIn(email: string, password: string) {
    return new Promise<void>((resolve, reject) => {
      if (!password || !password.trim()) reject('Senha de acesso incorreta.');

      if (!email || !email.trim()) reject('E-mail de acesso incorreto.');

      signInWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          setUser(user);
          const token = await user.getIdToken(true);
          setCookie(undefined, cookieName, token, { sameSite: 'lax' });
          resolve();
        })
        .catch(({ code }) => {
          if (
            code == 'auth/user-not-found' ||
            code == 'auth/wrong-password' ||
            code == 'auth/invalid-email'
          )
            return reject('E-mail ou senha incorreto');

          return reject(code);
        });
    });
  }

  function SignOut() {
    return new Promise<void>((resolve, reject) => {
      auth
        .signOut()
        .then(() => {
          destroyCookie(undefined, cookieName, { sameSite: 'lax' });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) setUser(auth.currentUser);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, SignIn, SignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
