import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
    AiFillInstagram,
    AiOutlineTwitter,
    AiFillLinkedin,
    AiFillGithub,
    AiOutlineMenu,
    AiOutlineClose
} from 'react-icons/ai'
import { motion, AnimatePresence } from "framer-motion";

import PageLink, { IPropsPageLink } from "./PageLink";


export default function Header() {
    const router = useRouter();

    const [showMenu, setShowMenu] = useState(false);

    const pages: IPropsPageLink[] = [
        { title: 'Inicio', path: '/' },
        { title: 'Projetos', path: '/projects' },
        { title: 'Contato', path: '/contact' },
    ]

    return (
        <header className={`${showMenu && 'h-screen fixed z-50'} flex flex-col w-screen p-4 md:flex-row bg-white`}>
            {/* SmallScreen Version */}
            <div className="flex flex-row md:hidden">
                <div className="flex flex-col w-full md:w-1/3">
                    <p className="text-xl font-medium">Mário Santos</p>
                    <p className="text-sm italic text-gray-600 md:text-md">Mobile and Full-Stack Developer</p>
                </div>

                <button className="md:hidden" onClick={() => setShowMenu(prev => !prev)}>
                    <AnimatePresence>
                        {!showMenu ? (
                            <motion.div
                                initial={{ rotateZ: 180 }}
                                animate={{ rotateZ: 360 }}
                                exit={{ rotateZ: 0 }}
                            >
                                <AiOutlineMenu />
                            </motion.div>
                        ) : (
                            <motion.div>
                                <AiOutlineClose />
                            </motion.div>
                        )}
                    </AnimatePresence>

                </button>
            </div>

            <div className={`${showMenu ? 'flex' : 'hidden'} flex-col md:hidden h-full`}>
                <div className="h-full py-4">
                    <ul className="flex flex-col items-center h-full space-y-2">
                        {pages.map(({ title, path }) => (
                            <PageLink key={path} path={path} title={title} />
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col h-min">
                    <ul className="flex flex-row items-center justify-center w-full py-4">
                        {/* Instagram Button */}
                        <li>
                            <Link href="https://www.instagram.com/mariosantos.dev/">
                                <a target='_blank'>
                                    <AiFillInstagram
                                        className="mr-4 text-gray-800 transition-all duration-300 hover:text-indigo-500"
                                        size={24}
                                    />
                                </a>
                            </Link>
                        </li>

                        {/* Github Button */}
                        <li>
                            <Link href="https://github.com/mariosantosdev">
                                <a target='_blank'>
                                    <AiFillGithub
                                        className="mr-4 text-gray-800 transition-all duration-300 hover:text-indigo-500"
                                        size={24}
                                    />
                                </a>
                            </Link>
                        </li>

                        {/* LinkedIn Button */}
                        <li>
                            <Link href="https://www.linkedin.com/in/mariosantos-dev/">
                                <a target='_blank'>
                                    <AiFillLinkedin
                                        className="mr-4 text-gray-800 transition-all duration-300 hover:text-indigo-500"
                                        size={24}
                                    />
                                </a>
                            </Link>
                        </li>

                        {/* Twitter Button */}
                        <li>
                            <Link href="https://twitter.com/mariosantosdev">
                                <a target='_blank'>
                                    <AiOutlineTwitter
                                        className="text-gray-800 transition-all duration-300 hover:text-indigo-500"
                                        size={24}
                                    />
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* LargeScreen Version */}
            <div className="hidden w-full md:flex">
                <div className="flex flex-col w-1/3">
                    <p className="text-xl font-medium">Mário Santos</p>
                    <p className="text-sm italic text-gray-600 md:text-md">Mobile and Full-Stack Developer</p>
                </div>

                <div className="w-1/3">
                    <ul className="flex flex-row items-center justify-center h-full ">
                        <li
                            className={`
                            flex justify-center w-1/3 transition-all duration-300 hover:text-xl
                            ${(router.pathname === '/')
                                    ? ' dark:text-indigo-300 text-indigo-500'
                                    : ' dark:text-white text-gray-600'}
                        `}
                        >
                            <Link href='/'>
                                <a>Início</a>
                            </Link>
                        </li>
                        <li
                            className={`
                            flex justify-center w-1/3 transition-all duration-300 hover:text-xl
                            ${(router.pathname === '/projects')
                                    ? 'text-indigo-500 dark:text-indigo-300'
                                    : 'text-gray-600 dark:text-white'}
                        `}
                        >
                            <Link href='/projects'>
                                <a>Projetos</a>
                            </Link>
                        </li>
                        <li
                            className={`
                            flex justify-center w-1/3 transition-all duration-300 hover:text-xl
                            ${(router.pathname === '/contact')
                                    ? 'text-indigo-500 dark:text-indigo-300'
                                    : 'text-gray-600 dark:text-white'}
                        `}
                        >
                            <Link href='/contact'>
                                <a>Contato</a>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-row w-1/3">
                    <ul className="flex flex-row items-center justify-end w-full">
                        <li>
                            <Link href="https://www.instagram.com/mariosantos.dev/">
                                <a target='_blank'>
                                    <AiFillInstagram
                                        className="mr-4 text-gray-800 transition-all duration-300 hover:text-indigo-500"
                                        size={24}
                                    />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://github.com/mariosantosdev">
                                <a target='_blank'>
                                    <AiFillGithub
                                        className="mr-4 text-gray-800 transition-all duration-300 hover:text-indigo-500"
                                        size={24}
                                    />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.linkedin.com/in/mariosantos-dev/">
                                <a target='_blank'>
                                    <AiFillLinkedin
                                        className="mr-4 text-gray-800 transition-all duration-300 hover:text-indigo-500"
                                        size={24}
                                    />
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://twitter.com/mariosantosdev">
                                <a target='_blank'>
                                    <AiOutlineTwitter
                                        className="text-gray-800 transition-all duration-300 hover:text-indigo-500"
                                        size={24}
                                    />
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}