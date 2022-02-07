import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head'
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
                <title>Projetos | Mário Santos</title>

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

            <main className='flex flex-col justify-center py-4 mt-12 bg-indigo-900 lg:flex-row'>
                <div className='flex flex-col w-full max-w-5xl'>
                    <h1 className='px-4 mb-4 -mt-16 text-2xl text-center text-indigo-500 md:text-left md:text-6xl'>Projetos</h1>
                    <div className='flex flex-col flex-wrap items-center justify-center w-full h-full min-h-screen px-4 md:flex-row md:px-0'>
                        {posts.length >= 0 ? (
                            posts.map(post => (
                                <SimplePost key={post.id} post={post} />
                            ))
                        ) : (
                            <span className='flex flex-col text-xl text-center text-white md:text-4xl'>
                                <p>Desculpe, parece que não existe nenhum projeto público...</p>
                                <p>Considere visitar meu {' '}
                                    <a
                                        href="http://github.com/mariosantosdev"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='underline'
                                    >
                                        GitHub
                                    </a>
                                    , para ver projetos diversos!</p>
                            </span>
                        )}
                    </div>
                </div>

            </main>

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