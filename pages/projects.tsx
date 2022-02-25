import { useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { PublicFooter } from '../components/Footer';
import Header from '../components/Navbar/ProjectsHeader';
import api from '../services/api';
import SimplePost from '../components/Post';
import Head from '../components/Head';
import ScrollActionSheet from '../components/ScrollActionSheet';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [posts] = useState<Post[]>(postsAPI || []);

  return (
    <div ref={containerRef} className="scroll-smooth">
      <Head title="Projetos | Mário Santos" path={router.asPath} />

      <ScrollActionSheet target={containerRef} />

      <div className="flex flex-col w-full h-screen bg-gray-200">
        <Header />
        <div className="flex flex-col items-center w-full h-full max-w-5xl py-4 mx-auto md:px-4">
          {/* Texts */}
          <h1 className="my-2 text-2xl text-center text-black md:text-4xl">
            Projetos
          </h1>
          <p className="text-sm md:text-lg text-slate-500">
            Veja alguns dos projetos criados por mim!
          </p>

          <div className="flex flex-col w-full max-w-5xl">
            <div className="flex flex-col flex-wrap items-center justify-center w-full md:flex-row md:px-0">
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
                  <p>
                    Desculpe, parece que não existe nenhum projeto público...
                  </p>
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
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get<{ posts: Post[] }>('/api/post');
  return {
    props: { postsAPI: data.posts.filter((post) => post.published === true) },
  };
};
