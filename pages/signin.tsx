import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import React, { Fragment, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import isAuthenticated from '../services/authMiddleware';

export default function SignIn() {
  const routes = useRouter();
  const { SignIn } = useAuth();

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  async function preventSignIn(e: FormEvent, email: string, password: string) {
    e.preventDefault();
    await handleSignIn(email, password);
  }

  async function handleSignIn(email: string, password: string) {
    const promiseToastLogin = SignIn(email, password);
    await toast.promise(
      promiseToastLogin,
      {
        pending: 'Verificando credenciais.',
        success: 'Autenticação realizada com sucesso.',
        error: {
          render({ data }: { data: any }) {
            console.error(data?.code || data);
            return data?.code ? `Falha na autenticação. [${data.code}]` : data;
          },
        },
      },
      { autoClose: 2000, toastId: 'toast-auth' }
    );

    routes.push('/admin');
  }

  return (
    <Fragment>
      <Head>
        <title>Mário Santos | Entrar</title>
        <meta name="robots" content="none" />
      </Head>

      <div className="flex items-center justify-center h-screen bg-indigo-50">
        <div className="container h-full px-4 mx-auto">
          <div className="flex items-center content-center justify-center h-full">
            <div className="w-full px-4 lg:w-4/12">
              <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white border-0 rounded-lg shadow-lg">
                <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
                  <div className="my-3 font-bold text-center text-blueGray-400">
                    <small>Acessar Painel</small>
                  </div>
                  <form
                    onSubmit={(e) =>
                      preventSignIn(e, emailInput, passwordInput)
                    }
                    onKeyPress={(e) => {
                      if (e.key === 'Enter')
                        preventSignIn(e, emailInput, passwordInput);
                    }}
                  >
                    <div className="relative w-full mb-3">
                      <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="grid-password"
                      >
                        Email de Acesso
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="E-mail"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block mb-2 text-xs font-bold uppercase text-blueGray-600"
                        htmlFor="grid-password"
                      >
                        Senha de acesso
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-3 text-sm transition-all duration-150 ease-linear bg-white border-0 rounded shadow placeholder-blueGray-300 text-blueGray-600 focus:outline-none focus:ring"
                        placeholder="Senha"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                      />
                    </div>

                    <div className="mt-6 text-center">
                      <button
                        className="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase transition-all duration-150 ease-linear bg-indigo-800 rounded shadow outline-none active:bg-indigo-600 hover:shadow-lg focus:outline-none"
                        type="button"
                        onClick={() => handleSignIn(emailInput, passwordInput)}
                      >
                        Entrar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ['@marioportfolio:token']: token } = parseCookies(ctx);

  if (await isAuthenticated(token)) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
