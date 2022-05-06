import React, { useContext } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

import { AppContext } from '../../contexts/App';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function Header() {
  const routes = useRouter();
  const { SignOut } = useAuth();
  const { darkMode, toggleDarkMode } = useContext(AppContext);

  async function handleSignOut() {
    const promiseSignout = SignOut();
    await toast.promise(
      promiseSignout,
      {
        pending: 'Saindo da conta...',
        success: 'Volte sempre!',
        error: {
          render({ data }: { data: any }) {
            console.error(data?.code || data);
            return data?.code
              ? `Ocorreu um erro ao sair desta conta. [${data.code}]`
              : data;
          },
        },
      },
      { autoClose: 1500 }
    );

    routes.push('/signin');
  }

  return (
    <nav className="z-10 items-center hidden w-full p-4 transition-colors duration-500 shadow-md lg:flex bg-slate-900 dark:bg-white md:flex-row md:flex-nowrap md:justify-start">
      <div className="flex flex-wrap items-center justify-between w-full px-4 mx-autp md:flex-nowrap md:px-10">
        {/* Brand */}
        <Link href="/admin">
          <a className="hidden text-sm font-semibold text-white uppercase duration-500 dark:text-black lg:inline-block">
            Dashboard
          </a>
        </Link>
        <ul className="flex-col items-center hidden list-none md:flex-row md:flex">
          <AnimatePresence>
            {darkMode ? (
              <motion.button
                initial={false}
                animate={{ rotateZ: 180 }}
                className="p-1 mr-8 text-sm text-orange-400 uppercase rounded-full lg:inline-block hover:bg-zinc-100"
                onClick={toggleDarkMode}
              >
                <FaSun />
              </motion.button>
            ) : (
              <motion.button
                initial={false}
                className="p-1 mr-8 text-sm text-yellow-400 uppercase rounded-full lg:inline-block hover:bg-slate-600"
                onClick={toggleDarkMode}
              >
                <FaMoon />
              </motion.button>
            )}
          </AnimatePresence>
          <a
            className="text-sm font-semibold text-white uppercase duration-500 dark:text-black lg:inline-block"
            href="#"
            onClick={handleSignOut}
          >
            Sair
          </a>
        </ul>
      </div>
    </nav>
  );
}
