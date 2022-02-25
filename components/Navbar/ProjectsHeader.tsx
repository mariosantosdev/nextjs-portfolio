import Link from 'next/link';
import { useState } from 'react';
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillGithub,
  AiOutlineMenu,
  AiOutlineClose,
} from 'react-icons/ai';
import { FiArrowLeft } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

import PageLink from './PageLink';

function Logo() {
  return (
    <div className="flex flex-col w-full lg:w-1/2">
      <p className="text-xl font-medium text-white">Mário Santos</p>
      <p className="text-sm italic text-white md:text-md">
        Desenvolvedor Mobile e Full-Stack
      </p>
    </div>
  );
}

function SocialMedias() {
  return (
    <div className="flex flex-collg:flex-row h-min lg:w-1/3">
      <ul className="flex flex-row items-center justify-center w-full py-0 lg:py-4">
        {/* Instagram Button */}
        <li>
          <Link href="https://www.instagram.com/mariosantos.dev/">
            <a target="_blank">
              <AiFillInstagram
                className="mr-4 text-white transition-all duration-300 hover:text-indigo-500"
                size={24}
              />
            </a>
          </Link>
        </li>

        {/* Github Button */}
        <li>
          <Link href="https://github.com/mariosantosdev">
            <a target="_blank">
              <AiFillGithub
                className="mr-4 text-white transition-all duration-300 hover:text-indigo-500"
                size={24}
              />
            </a>
          </Link>
        </li>

        {/* LinkedIn Button */}
        <li>
          <Link href="https://www.linkedin.com/in/mariosantos-dev/">
            <a target="_blank">
              <AiFillLinkedin
                className="mr-4 text-white transition-all duration-300 hover:text-indigo-500"
                size={24}
              />
            </a>
          </Link>
        </li>

        {/* Twitter Button */}
        <li>
          <Link href="https://twitter.com/mariosantosdev">
            <a target="_blank">
              <AiOutlineTwitter
                className="text-white transition-all duration-300 hover:text-indigo-500"
                size={24}
              />
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default function ProjectsHeader() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header
      className={`${
        showMenu && 'h-screen fixed z-50'
      } z-10 flex flex-col w-screen p-4 lg:flex-row bg-black`}
    >
      {/* SmallScreen Version */}
      <div className="flex flex-row lg:hidden">
        <Logo />

        <button onClick={() => setShowMenu((prev) => !prev)}>
          <AnimatePresence>
            {!showMenu ? (
              <motion.div
                initial={{ rotateZ: 180 }}
                animate={{ rotateZ: 360 }}
                exit={{ rotateZ: 0 }}
              >
                <AiOutlineMenu className="text-white" />
              </motion.div>
            ) : (
              <motion.div>
                <AiOutlineClose className="text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <div
        className={`${showMenu ? 'flex' : 'hidden'} flex-col lg:hidden h-full`}
      >
        <div className="h-full py-4">
          <ul className="flex flex-col items-center h-full pt-4 space-y-4">
            <PageLink path="/" title="Voltar para Inicio" />
          </ul>
        </div>

        <SocialMedias />
      </div>

      {/* LargeScreen Version */}
      <div className="hidden w-full lg:flex">
        <Logo />

        <div className="flex items-center justify-end w-1/2">
          <Link href="/">
            <a className="flex flex-row items-center">
              <FiArrowLeft className="mr-2 text-xl text-white" />
              <p className="text-white">VOLTAR PARA INICIO</p>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
