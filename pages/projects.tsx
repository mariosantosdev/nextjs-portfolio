import { Fragment, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { PublicFooter } from '../components/Footer';
import Header from '../components/Navbar/PublicHeader';
import api from '../services/api';
import SimplePost from '../components/Post';
import Head from '../components/Head';

type Post = {
  id: string;
  title: string;
  content?: string;
  link?: string;
  repository?: string;
  published: boolean;
  cover: string;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
};

export default function Home({ postsAPI }) {
  const router = useRouter();
  const [posts] = useState<Post[]>(postsAPI || []);

  return (
    <Fragment>
      <Head title="Projetos | Mário Santos" path={router.asPath} />

      <Header />

      <main className="flex flex-col items-center justify-center p-4 bg-indigo-900">
        <div className="flex justify-center w-full max-w-5xl md:justify-start">
          <h1 className="mb-4 text-2xl text-center text-white md:text-left md:text-6xl">
            Projetos
          </h1>
        </div>

        <div className="flex flex-col w-full max-w-5xl">
          <div className="flex flex-col flex-wrap items-center justify-center w-full h-full min-h-screen md:flex-row md:px-0">
            {posts.length > 0 ? (
              posts.map((post) => (
                <SimplePost
                  key={post.id}
                  post={post}
                  onClick={() => router.push(`/project/${post.id}`)}
                />
              ))
            ) : (
              <span className="flex flex-col text-xl text-center text-white md:text-4xl">
                <p>Desculpe, parece que não existe nenhum projeto público...</p>
                <p>
                  Considere visitar meu{' '}
                  <a
                    href="http://github.com/mariosantosdev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    GitHub
                  </a>
                  , para ver projetos diversos!
                </p>
              </span>
            )}
          </div>
        </div>
      </main>

      <PublicFooter />
    </Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get<{ posts: Post[] }>('/api/post');
  return {
    props: { postsAPI: data.posts.filter((post) => post.published === true) },
  };
};
