import { Fragment, useEffect, useState } from "react";

import Header from "../../components/Navbar/Header";
import Footer from "../../components/Footer";
import PostTable from "../../components/Table/PostsTable";
import Sidebar from "../../components/Navbar/Sidebar";
import api from "../../services/api";

const rows = [
    {
        id: 'daskmdasda3231',
        title: 'Sploq App',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc urna quam, rhoncus id urna lacinia, tincidunt rhoncus turpis. Proin in libero turpis. Duis at ultrices augue, ut porta urna. Curabitur sed ultrices ante. Aliquam semper lacinia quam, vitae luctus purus consequat ut.',
        published: true,
        repository: 'https://github.com/mariosantos/sploq',
    },
    {
        id: '939123k129',
        title: 'FinancaSaas',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc urna quam, rhoncus id urna lacinia, tincidunt rhoncus turpis. Proin in libero turpis. Duis at ultrices augue, ut porta urna. Curabitur sed ultrices ante. Aliquam semper lacinia quam, vitae luctus purus consequat ut.',
        published: false,
        repository: 'https://github.com/mariosantos/financSaas',
    },
    {
        id: 'd31d01l0s',
        title: 'FitManager',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc urna quam, rhoncus id urna lacinia, tincidunt rhoncus turpis. Proin in libero turpis. Duis at ultrices augue, ut porta urna. Curabitur sed ultrices ante. Aliquam semper lacinia quam, vitae luctus purus consequat ut.',
        published: true,
        repository: 'https://github.com/mariosantos/fitmanager',
    },
    {
        id: '1',
        title: 'FitManager',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc urna quam, rhoncus id urna lacinia, tincidunt rhoncus turpis. Proin in libero turpis. Duis at ultrices augue, ut porta urna. Curabitur sed ultrices ante. Aliquam semper lacinia quam, vitae luctus purus consequat ut.',
        published: true,
        repository: 'https://github.com/mariosantos/fitmanager',
    },
]

export default function Dashboard() {
    const [posts, setPosts] = useState([]);

    async function getPosts() {
        try {
            const { data } = await api.get('/post');

            setPosts(data);
        } catch (error: any) {
            alert('Ocorreu um erro ao encontrar os posts.');
        }
    }

    useEffect(() => {
        getPosts()
    }, []);

    return (
        <Fragment>
            <Sidebar />
            <div className="relative h-screen transition-colors duration-500 bg-zinc-100 md:ml-64 dark:bg-slate-800">
                <Header />
                <div className="px-4 pt-4 mx-auto md:px-10">
                    <div className="flex flex-wrap">
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