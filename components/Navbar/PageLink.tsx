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
                flex justify-center md:w-1/4 md:text-md w-full text-xl transition-all duration-300 hover:text-xl
                ${
                  router.asPath === path || router.asPath === `/${path}`
                    ? " text-indigo-500"
                    : " text-white"
                }
                `}
    >
      <Link href={path}>
        <a>{title}</a>
      </Link>
    </li>
  );
}
