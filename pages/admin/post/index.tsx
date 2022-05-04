import Head from 'next/head';
import { Fragment } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';

import Header from '../../../components/Navbar/Header';
import Footer from '../../../components/Footer';
import Sidebar from '../../../components/Navbar/Sidebar';
import api from '../../../services/api';
import PostForms from '../../../components/Forms/Post';
import { uploadImage } from '../../../utils/firebase';
import { useRouter } from 'next/router';

type PostsData = {
  title: string;
  projectURL: string;
  repoURL: string;
  isVisible: boolean;
  technologies: string[];
  description: string;
};

export default function CreatePost() {
  const router = useRouter();

  async function onSend(post: PostsData, file: File) {
    const promiseUploadImage = uploadImage(file);
    const fileURL = await toast.promise(
      promiseUploadImage,
      {
        success: 'Imagem enviada com sucesso.',
        pending: 'Enviando imagem.',
        error: {
          render({ data }) {
            console.error(data.error);
            return 'Ocorreu um erro ao enviar esta imagem.';
          },
        },
      },
      { autoClose: 2000, toastId: 'toast-upload-image' }
    );

    const data = { ...post, fileURL };

    const promiseCreatePost = api.post('/api/post', data);
    await toast.promise(
      promiseCreatePost,
      {
        success: 'Post criado com suceesso.',
        pending: 'Criando post.',
        error: {
          render({ data }) {
            console.error(data.error);
            return 'Ocorreu um erro ao criar esta postagem.';
          },
        },
      },
      { autoClose: 2000, toastId: 'toast-create-post' }
    );

    router.push('/admin');
  }

  return (
    <Fragment>
      <Head>
        <title>Criar Post | Dashboard Mário Portfolio</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="robots" content="none" />
      </Head>

      <Sidebar />
      <div className="relative flex flex-col min-h-screen transition-colors duration-500 bg-zinc-100 md:ml-64 dark:bg-slate-800">
        <Header />
        <div className="flex flex-col flex-1 w-full px-4 pt-4 mx-auto md:px-10">
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
        permanent: false,
      },
    };

  return {
    props: {},
  };
};
