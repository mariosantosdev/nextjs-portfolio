import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import AppProvider from '../contexts/App';
import Script from 'next/script';

import 'react-toastify/dist/ReactToastify.css';
import '../services/firebase';
import '../styles/globals.css';
import { Fragment } from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/tw-elements/dist/css/index.min.css"
        />
      </Head>
      <Script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js" />
      <AppProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </AppProvider>
    </Fragment>
  );
}

export default MyApp;
