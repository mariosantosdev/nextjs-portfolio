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
import { motion, AnimatePresence } from 'framer-motion';

import PageLink, { IPropsPageLink } from './PageLink';

function Logo() {
  return (
    <div className="flex flex-col w-full lg:w-1/3">
      <p className="text-xl font-medium text-white">Mário Santos</p>
      <p className="text-sm italic text-white md:text-md">
        Desenvolvedor Mobile e Full-Stack
      </p>
    </div>
  );
}

function SocialMedias() {
  return (
    <div className="flex flex-col lg:flex-row h-min lg:w-1/3">
      <ul className="flex flex-row items-center justify-center w-full py-0 lg:justify-end lg:py-4">
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

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const pages: IPropsPageLink[] = [
    { title: 'Inicio', path: '/' },
    { title: 'Sobre', path: '#about' },
    { title: 'Projetos', path: '#projects' },
    { title: 'Contato', path: '#contact' },
  ];

  return (
    <header
      className={`${
        showMenu ? 'h-screen fixed z-50 bg-opacity-100' : 'bg-opacity-70'
      } lg:absolute z-10 flex flex-col w-screen p-4 lg:flex-row bg-black lg:bg-opacity-30`}
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
            {pages.map(({ title, path }) => (
              <PageLink key={path} path={path} title={title} />
            ))}
          </ul>
        </div>

        <SocialMedias />
      </div>

      {/* LargeScreen Version */}
      <div className="hidden w-full lg:flex">
        <Logo />

        <div className="w-1/3">
          <ul className="flex flex-row items-center justify-center h-full">
            {pages.map(({ title, path }) => (
              <PageLink key={path} path={path} title={title} />
            ))}
          </ul>
        </div>

        <SocialMedias />
      </div>
    </header>
  );
}
