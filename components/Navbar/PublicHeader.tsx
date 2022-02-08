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

export default function Header() {
    const router = useRouter();

    const [showMenu, setShowMenu] = useState(false);

    return (
        <header className="flex flex-col w-screen p-4 md:flex-row">
            {/* SmallScreen Version */}
            <div className="flex flex-row md:hidden">
                <div className="flex flex-col w-full md:w-1/3">
                    <p className="text-xl font-medium">Mário Santos</p>
                    <p className="text-sm italic text-gray-600 md:text-md">Mobile and Full-Stack Developer</p>
                </div>

                <button className="md:hidden" onClick={() => setShowMenu(prev => !prev)}>
                    <AiOutlineMenu />
                </button>
            </div>

            <div className={`${showMenu ? 'flex' : 'hidden'} relative md:hidden h-min flex-col py-4 bg-zinc-100 rounded-md`}>
                <button className="absolute top-2 right-2" onClick={() => setShowMenu(false)}>
                    <AiOutlineClose />
                </button>
                <div className="h-1/3">
                    <ul className="flex flex-col items-center justify-center h-full ">
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

                <div className="flex flex-col h-1/3">
                    <ul className="flex flex-row items-center justify-center w-full mt-4">
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