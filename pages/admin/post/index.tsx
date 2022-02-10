import { Fragment } from "react";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Head from 'next/head';

import Header from "../../../components/Navbar/Header";
import Footer from "../../../components/Footer";
import Sidebar from "../../../components/Navbar/Sidebar";
import api from "../../../services/api";
import PostForms from "../../../components/Forms/Post";
import { uploadImage } from "../../../utils/firebase";

type PostsData = {
    title: string;
    projectURL: string;
    repoURL: string;
    isVisible: boolean;
    technologies: string[];
    description: string;
}

export default function CreatePost() {

    async function onSend(post: PostsData, file: File) {
        try {
            const fileURL = await uploadImage(file);

            const data = { ...post, fileURL };

            await api.post('/api/post', data);
            alert('Post criado com sucesso.');
        } catch (error: any) {
            alert('Ocorreu um erro ao criar este post.')
        }
    }

    return (
        <Fragment>
            <Head>
                <title>Criar Post | Dashboard Mário Portfolio</title>
                <link rel="icon" href="/favicon.ico" />

                <meta name="robots" content="none" />
            </Head>

            <Sidebar />
            <div className="relative h-full transition-colors duration-500 bg-zinc-100 md:ml-64 dark:bg-slate-800">
                <Header />
                <div className="flex flex-col px-4 pt-4 mx-auto md:px-10">
                    <div className="flex flex-wrap mt-4">
                        <PostForms onSend={onSend} />
                    </div>
                </div>
                <Footer />
            </div>
        </Fragment>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ['@marioportfolio:token']: token } = parseCookies(ctx);

    if (!token)
        return {
            redirect: {
                destination: '/signin',
                permanent: false
            }
        }

    return {
        props: {}
    }
}