import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import AppProvider from '../contexts/App';

import 'react-toastify/dist/ReactToastify.css';
import '../services/firebase';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </AppProvider>
  );
}

export default MyApp;
