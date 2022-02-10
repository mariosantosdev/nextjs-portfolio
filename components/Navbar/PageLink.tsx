import Link from "next/link";
import { useRouter } from "next/router";

export interface IPropsPageLink {
    title: string;
    path: string;
}

export default function PageLink({ title, path }: IPropsPageLink) {
    const router = useRouter();

    return (
        <li
            className={`
                flex justify-center w-full text-xl md:text-md transition-all duration-300 hover:text-xl
                ${(router.pathname === path)
                    ? ' dark:text-indigo-300 text-indigo-500'
                    : ' dark:text-white text-gray-600'}
                `}
        >
            <Link href={path}>
                <a>{title}</a>
            </Link>
        </li>
    )
}