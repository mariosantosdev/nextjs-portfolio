import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';

import { PublicFooter } from '../../components/Footer';
import Header from '../../components/Navbar/PublicHeader';
import api from '../../services/api';
import GhostLinkButton from '../../components/Button/GhostLinkButton';

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

export default function Project({ postsAPI }) {
    const router = useRouter();
    const [post] = useState<Post>(postsAPI || null);

    if (!post) return null;

    return (
        <div>
            <Head>
                <title>{post.title} | Mário Santos</title>

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
            <div className='relative w-full h-screen bg-center bg-no-repeat bg-cover'>
                <Image src={post.cover} alt={post.title} layout="fill" objectFit='cover' priority />
                <div className='relative flex flex-col items-center justify-center w-full h-full space-y-4 backdrop-brightness-[.30] backdrop-blur-sm'>
                    <p className='text-2xl font-bold text-white md:text-4xl'>
                        Projeto - {' '}
                        <span className='text-indigo-500'>{post.title}</span>
                    </p>
                    <div className='absolute flex flex-col items-center space-y-4 md:space-y-0 md:bottom-4 md:flex-row bottom-2 md:space-x-4'>
                        {post.link && (
                            <GhostLinkButton
                                text='DEMO'
                                href={post.link}
                                targetBlank
                            />
                        )}
                        {post.repository && (
                            <GhostLinkButton
                                text='REPOSITÓRIO'
                                href={post.repository}
                                targetBlank
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* About Section */}
            <section id='description' className='flex justify-center px-4 bg-gray-200'>
                <div className='flex flex-col w-full max-w-5xl py-4 lg:space-x-4 lg:flex-row md:max-h-96'>
                    {/* Description */}
                    <main className='flex flex-col lg:w-full'>
                        <h1 className='mb-4 text-2xl text-gray-800 md:text-4xl'>Descrição</h1>

                        <span className='flex flex-col space-y-4 overflow-y-auto text-md md:text-xl'>
                            {post.content ? (
                                <p>{post.content}</p>
                            ) : (
                                <p className='italic text-gray-400'>Não foi adicionado nenhuma descrição a este projeto!</p>
                            )}

                        </span>
                    </main>

                    {/* Contact */}
                    <aside className='flex flex-col mt-4 space-y-6 lg:w-1/2'>
                        {/* Social Media Link */}
                        <div className='flex flex-col w-full'>
                            <h1 className='text-2xl text-gray-800 md:text-4xl'>Tecnologias</h1>
                            <p className='mt-2 mb-4'>Estas foram algumas tecnologias utilizadas neste projeto!</p>
                            {post.technologies.map(technology => (
                                <p key={technology} className='text-gray-700 hover:text-indigo-400'>
                                    &#8618; {technology}
                                </p>
                            ))}
                        </div>
                    </aside>
                </div>
            </section>

            <section>

            </section>

            <PublicFooter />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.query;
    const { data } = await api.get<{ post: Post }>(`/api/post/${id}`);

    return {
        props: { postsAPI: data.post }
    }
}