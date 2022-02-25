import Link from 'next/link';
import { useRouter } from 'next/router';

export interface IPropsPageLink {
  title: string;
  path: string;
}

export default function PageLink({ title, path }: IPropsPageLink) {
  const router = useRouter();
  const pathIsIndex = path.startsWith('/');
  const pathToCompare = pathIsIndex ? path : `/${path}`;

  return (
    <li
      className={`
                flex justify-center lg:w-1/4 lg:text-md w-full text-xl transition-all duration-300 hover:text-xl
                ${
                  router.asPath === pathToCompare
                    ? ' text-indigo-500'
                    : ' text-white'
                }
                `}
    >
      <Link href={path}>
        <a>{title}</a>
      </Link>
    </li>
  );
}
