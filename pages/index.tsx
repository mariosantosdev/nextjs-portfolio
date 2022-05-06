import { MutableRefObject, useRef, useState } from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Header from '../components/Navbar/PublicHeader';
import api from '../services/api';
import { Post } from '../components/Post';
import Head from '../components/Head';
import ScrollActionSheet, { onScroll } from '../components/ScrollActionSheet';
import ContactSession from '../components/HomeScreen/ContactSession';
import ProjectSession from '../components/HomeScreen/ProjectsSessions';
import AboutSession from '../components/HomeScreen/AboutSession';

export default function Home({ postsAPI }) {
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [posts] = useState<Post[]>(postsAPI || []);

  return (
    <div
      ref={divRef}
      className="h-screen overflow-auto snap-y scroll-smooth"
      onScroll={() => onScroll(divRef)}
    >
      <ScrollActionSheet target={divRef} />
      <Head
        title="Mário Santos - Desenvolvedor Mobile, Web, Backend"
        path={router.asPath}
      />

      {/* Cover Header */}
      <div className='relative snap-start bg-[url("/cover.jpeg")] bg-no-repeat bg-cover h-screen bg-center'>
        <Header />
        <div className="flex flex-col-reverse items-center justify-center w-full h-full max-w-5xl py-4 mx-auto md:px-4 md:justify-between md:flex-row">
          {/* Texts */}
          <div className="flex flex-col mt-4 md:mt-0">
            <span className="flex flex-col px-4">
              <p className="text-2xl font-light text-white md:text-4xl">
                Olá! Eu sou o
              </p>
              <p className="text-3xl font-bold text-indigo-500 md:text-5xl">
                Mário Santos
              </p>
            </span>
            <p className="px-4 my-4 text-xl text-white md:text-2xl">
              Desenvolvedor Mobile, Web & Backend.
            </p>
            <div className="flex px-4">
              {/* Button */}
              <Link href="/#about">
                <a className="w-full p-4 px-12 text-center text-indigo-500 transition-colors delay-100 border-2 border-indigo-500 rounded-sm md:w-auto hover:text-white hover:bg-indigo-500 ">
                  ME CONHEÇA MELHOR!
                </a>
              </Link>
            </div>
          </div>

          {/* Avatar */}
          <div className="relative flex w-32 h-32 border-4 border-indigo-500 rounded-full md:w-48 md:h-48 lg:w-96 lg:h-96">
            <Image
              src="https://github.com/mariosantosdev.png"
              alt="Mário Santos"
              layout="fill"
              objectFit="contain"
              className="rounded-full"
              blurDataURL="data:..."
              placeholder="blur"
              priority
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <AboutSession />

      {/* Projects */}
      <ProjectSession posts={posts} />

      {/* Contact */}
      <ContactSession />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get<{ posts: Post[] }>('/api/post?limit=6');
  return {
    props: {
      postsAPI: data.posts.filter((post) => post.published === true),
    },
  };
};
