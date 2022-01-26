import { Fragment, useState } from "react";

import Header from "../../components/Navbar/Header";
import Footer from "../../components/Footer";
import PostTable from "../../components/Table/PostsTable";
import Sidebar from "../../components/Navbar/Sidebar";
import api from "../../services/api";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function Dashboard({ postsAPI }) {
    const [posts] = useState(postsAPI || []);

    return (
        <Fragment>
            <Sidebar />
            <div className="relative h-screen transition-colors duration-500 bg-zinc-100 md:ml-64 dark:bg-slate-800">
                <Header />
                <div className="flex flex-col px-4 pt-4 mx-auto md:px-10">
                    <a
                        href="/admin/post"
                        className="self-center w-40 p-2 text-center text-white bg-indigo-500 rounded-full hover:bg-indigo-800 md:self-end"
                    >
                        Criar Postagem
                    </a>
                    <div className="flex flex-wrap mt-4">
                        <PostTable
                            title='Postagens de Projetos'
                            rows={posts}
                            haveActionRow
                        />
                    </div>
                    <Footer />
                </div>
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