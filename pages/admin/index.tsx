import { Fragment, useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Head from "next/head";
import { parseCookies } from "nookies";

import Header from "../../components/Navbar/Header";
import Footer from "../../components/Footer";
import PostTable from "../../components/Table/PostsTable";
import Sidebar from "../../components/Navbar/Sidebar";
import api from "../../services/api";

export default function Dashboard({ postsAPI }) {
    const [posts] = useState(postsAPI || []);

    return (
        <Fragment>
            <Head>
                <title>Dashboard Mário Portfolio</title>
                <link rel="icon" href="/favicon.ico" />

                <meta name="robots" content="none" />
            </Head>
            <Sidebar />
            <div className="relative h-screen transition-colors duration-500 bg-zinc-100 md:ml-64 dark:bg-slate-800">
                <Header />
                <div className="flex flex-col px-4 pt-4 mx-auto md:px-10 h-5/6">
                    <Link href="/admin/post">
                        <a className="self-center w-40 p-2 text-center text-white bg-indigo-500 rounded-full hover:bg-indigo-800 md:self-end">
                            Criar Postagem
                        </a>
                    </Link>
                    <div className="flex flex-wrap mt-4 ">
                        <PostTable
                            title='Postagens de Projetos'
                            rows={posts}
                            haveActionRow
                        />
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

    const { data } = await api.get('/api/post');
    return {
        props: { postsAPI: data.posts }
    }
}