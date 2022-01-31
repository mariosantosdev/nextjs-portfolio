import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaFileAlt,
    FaPenAlt
} from 'react-icons/fa'

export default function Sidebar() {
    const [collapseShow, setCollapseShow] = React.useState("hidden");
    const router = useRouter();

    return (
        <>
            <nav className="relative z-10 flex flex-wrap items-center justify-between px-6 py-4 transition-colors duration-500 shadow-xl bg-neutral-50 dark:bg-gray-900 md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-64">
                <div className="flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-nowrap ">
                    {/* Toggler */}
                    <button
                        className="px-3 py-1 text-xl leading-none bg-transparent rounded cursor-pointer md:hidden"
                        type="button"
                        onClick={() => setCollapseShow("m-2 py-3 px-6")}
                    >
                        <FaBars className="text-black transition-colors duration-500 dark:text-white" />
                    </button>
                    {/* Brand */}
                    <Link href="/admin">
                        <a
                            href="#"
                            className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left text-black uppercase transition-colors duration-500 dark:text-white md:block md:pb-2 whitespace-nowrap"
                        >
                            Mário | Portfolio
                        </a>
                    </Link>
                    {/* User */}
                    <ul className="flex flex-wrap items-center list-none md:hidden">
                        <li className="relative inline-block">
                            <FaSignOutAlt className="text-black transition-colors duration-500 dark:text-white" />
                        </li>
                    </ul>
                    {/* Collapse */}
                    <div
                        className={`
                            md:flex md:flex-col md:items-stretch md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded bg-neutral-50 dark:bg-gray-900 transition-colors duration-500
                            ${collapseShow}
                        `}
                    >
                        {/* Collapse header */}
                        <div className="block pb-4 mb-4 md:min-w-full md:hidden">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <Link href="/admin">
                                        <a
                                            href="#"
                                            className="inline-block p-4 px-0 mr-0 text-sm font-bold text-left text-black uppercase transition-colors duration-500 dark:text-indigo-100 md:block md:pb-2 whitespace-nowrap"
                                        >
                                            Mário | Portfolio
                                        </a>
                                    </Link>
                                </div>
                                <div className="flex justify-end w-6/12">
                                    <button
                                        type="button"
                                        className="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded cursor-pointer md:hidden"
                                        onClick={() => setCollapseShow("hidden")}
                                    >
                                        <FaTimes className="text-black transition-colors duration-500 dark:text-white" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <hr className="my-4 md:min-w-full" />
                        {/* Navigation */}

                        <ul className="flex flex-col list-none md:flex-col md:min-w-full">
                            <li className="flex-row items-center">
                                <Link href="/admin">
                                    <a href="#">
                                        <span
                                            className={`
                                                flex flex-row text-xs uppercase py-3 font-bold   
                                                ${(router.pathname === '/admin'
                                                    ? "text-indigo-500 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-500 transition-colors duration-500"
                                                    : "text-gray-500 hover:text-black dark:text-white transition-colors duration-500")}
                                        `}>
                                            <FaFileAlt className="mr-2 text-sm" />
                                            Posts
                                        </span>
                                    </a>
                                </Link>
                            </li>

                            <li className="flex-row items-center">
                                <Link href="/admin/post">
                                    <a href="#">
                                        <span
                                            className={`
                                                flex flex-row text-xs uppercase py-3 font-bold   
                                                ${(router.pathname === '/admin/post'
                                                    ? "text-indigo-500 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-500 transition-colors duration-500"
                                                    : "text-gray-500 hover:text-black dark:text-white transition-colors duration-500")}
                                        `}>
                                            <FaPenAlt className="mr-2 text-sm" />
                                            Criar Post
                                        </span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}