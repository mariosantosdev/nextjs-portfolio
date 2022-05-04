import Link from 'next/link';
import { useRouter } from 'next/router';

import Head from '../components/Head';

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen overflow-auto snap-y snap-mandatory scroll-smooth">
      <Head
        title="Mário Santos - Desenvolvedor Mobile, Web, Backend"
        path={router.asPath}
      />

      <div className="flex items-center justify-center w-screen h-screen bg-gradient-to-r from-indigo-600 to-blue-400">
        <div className="px-40 py-20 bg-white rounded-md shadow-xl">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-indigo-600 text-9xl">404</h1>

            <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span className="text-red-500">Oops!</span> Página não encontrada
            </h6>

            <p className="mb-8 text-center text-gray-500 md:text-lg">
              A página que você está tentando acessar não existe.
            </p>

            <Link href="/">
              <a className="px-6 py-2 text-sm font-semibold text-indigo-800 bg-indigo-100">
                Voltar ao inicio
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
