import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';

import { PublicFooter } from '../components/Footer';
import Header from '../components/Navbar/PublicHeader';
import api from '../services/api';
import SimplePost from '../components/Post';

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
}

export default function Home({ postsAPI }) {
    const router = useRouter();
    const [posts] = useState<Post[]>(postsAPI || []);

    return (
        <div>
            <Head>
                <title>Mário Santos - Desenvolvedor Mobile, Web, Backend</title>

                <meta
                    property="og:url"
                    content={`https://yourwebsite.com${router.asPath}`}
                />
                <link
                    rel="canonical"
                    href={`https://yourwebsite.com${router.asPath}`}
                />
            </Head>

            <Header />

            {/* Cover Header */}
            <div className='bg-[url("/cover.jpeg")] bg-no-repeat bg-cover w-full h-screen bg-center'>
                <div className='flex flex-col items-center justify-center w-full h-full space-y-4 backdrop-brightness-50'>
                    <div className='flex flex-col items-center justify-center py-4'>
                        {/* Avatar */}
                        <div className='relative w-24 h-24 border-4 border-indigo-500 rounded-full md:border-4 md:w-48 md:h-48 ring-indigo-500/75 rind-6 md:ring-8 '>
                            <Image
                                src='https://github.com/mariosantosdev.png'
                                alt='Mário Santos'
                                layout='fill'
                                objectFit="contain"
                                className='rounded-full'
                                blurDataURL="data:..."
                                placeholder="blur"
                            />
                        </div>

                        {/* Texts */}
                        <span className='flex flex-col px-4'>
                            <h1 className='text-xl font-bold text-white md:text-2xl'>Olá,</h1>
                            <span className='flex flex-row text-2xl font-bold text-white md:text-4xl'>
                                <p>
                                    Eu sou o {' '}
                                    <span className='text-indigo-500'>Mário Santos</span>
                                </p>
                            </span>
                        </span>
                        <p className='px-4 my-4 text-xl text-center text-white md:text-2xl'>Desenvolvedor Mobile, Web & Backend.</p>

                        {/* Button */}
                        <Link href="/#about">
                            <a className='p-4 px-12 text-indigo-500 transition-colors delay-100 border-2 border-indigo-500 rounded-sm hover:text-white hover:bg-indigo-500 '>
                                SOBRE
                            </a>
                        </Link>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <section id='about' className='flex justify-center py-4 bg-gray-200'>
                <div className='flex flex-col-reverse w-full max-w-5xl space-x-4 lg:flex-row'>
                    {/* Contact */}
                    <aside className='flex flex-col px-4 mt-4 space-y-6 lg:w-1/2'>
                        {/* E-mail call action */}
                        <div className='flex flex-col justify-center w-full '>
                            <h1 className='mb-4 text-2xl text-gray-800 md:text-4xl'>Contato</h1>
                            <p className='text-gray-700'>Caso tenha interesse em contratar meus serviços, entrar em contato comigo por qualquer outro motivo, dê preferência ao meu <a className='font-bold text-indigo-500 underline' target="_blank" href="mailto:mariodev7@gmail.com" rel="noreferrer">email</a>.</p>
                        </div>

                        {/* Social Media Link */}
                        <div className='flex flex-col w-full'>
                            <h1 className='mb-4 text-2xl text-gray-800 md:text-4xl'>Redes sociais</h1>
                            <a
                                href="http://instagram.com/mariosantosdev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='text-gray-700 hover:underline'
                            >
                                &#8594; Instagram
                            </a>
                            <a
                                href="https://www.linkedin.com/in/mariosantos-dev/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='text-gray-700 hover:underline'
                            >
                                &#8594; LinkedIn
                            </a>
                            <a
                                href="https://twitter.com/mariosantosdev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='text-gray-700 hover:underline'
                            >
                                &#8594; Twitter
                            </a>
                            <a
                                href="https://github.com/mariosantosdev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className='text-gray-700 hover:underline'
                            >
                                &#8594; Github
                            </a>
                        </div>
                    </aside>

                    {/* About text */}
                    <main className='flex flex-col lg:w-full'>
                        <h1 className='mb-4 text-2xl text-gray-800 md:text-4xl'>Sobre</h1>

                        <span className='flex flex-col space-y-4 text-md md:text-xl'>
                            <p>Sou um desenvolvedor full-stack de aplicativos móveis, web e backend!<br />
                                Estou na área da programação desde 2016. (aproximadamente {new Date().getFullYear() - 2016} anos)</p>

                            <p>Comecei desenvolvendo sites com apenas HTML e CSS, algum tempo depois, me desafiei aprendendo PHP. Depois comecei a me aventurar desenvolvendo jogos pela Unity3D com C#, e mods com .LUA, passei rápidamente pelo Python, e desde 2018 estou trabalhando exclusivamente com NodeJS.</p>

                            <p>Atualmente trabalho com diversas tecnólogias modernas e busco sempre me manter o mais atualizado possível, dentre diversas destas técnologias estão algumas como: React, NextJS, Redux, Saas, TailwindCSS, Styled Components, React Native, Node.JS, Typescript, Express, Jest, Mongoose, Prisma.io, MongoDB, Postgres, Axios, Graphql, Docker, Git, Github.</p>
                        </span>
                    </main>
                </div>
            </section>

            {/* Top Services */}
            {posts.length > 1 && (
                <section id='top_services' className='flex flex-col items-center py-4 bg-indigo-900'>
                    <div className='flex flex-col items-center max-w-5xl'>
                        <div className='relative flex flex-col items-center justify-center w-full md:flex-row'>
                            <h1 className='mb-4 text-2xl text-white md:text-4xl'>Projetos Populares</h1>
                            <button
                                onClick={() => router.push('/projects')}
                                className='relative p-4 px-6 text-black bg-white rounded-md shadow-md md:absolute md:right-4'
                            >
                                &#8599; Ver Todos
                            </button>
                        </div>

                        <div className='flex flex-col flex-wrap items-center justify-center w-full md:flex-row md:px-0'>
                            {posts.map(post => (
                                <SimplePost key={post.id} post={post} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <PublicFooter />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await api.get<{ posts: Post[] }>('/api/post');
    return {
        props: { postsAPI: data.posts.filter(post => post.published === true) }
    }
}