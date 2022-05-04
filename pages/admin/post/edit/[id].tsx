import Head from 'next/head';
import { Fragment } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';

import Header from '../../../../components/Navbar/Header';
import Footer from '../../../../components/Footer';
import Sidebar from '../../../../components/Navbar/Sidebar';
import api, { createApiConnector } from '../../../../services/api';
import PostForms from '../../../../components/Forms/Post';
import { deleteImage, uploadImage } from '../../../../utils/firebase';
import { useRouter } from 'next/router';

type PostsData = {
  title: string;
  projectURL: string;
  repoURL: string;
  isVisible: boolean;
  technologies: string[];
  description: string;
};

type PostFromDB = {
  id: string;
  title: string;
  content?: string;
  link?: string;
  repository?: string;
  published: boolean;
  cover: string;
  technologies: string[];
};

interface IEditPostProps {
  post: PostFromDB;
}

export default function EditPost({ post }: IEditPostProps) {
  const router = useRouter();

  async function onUpdatePost(data: PostsData, file?: File) {
    try {
      let cover: string;

      if (file) {
        await deleteImage(post.cover);
        cover = await uploadImage(file);
      }

      await api.put(`/api/post/${post.id}`, { ...data, cover });
      alert('Post atualizado com sucesso.');
    } catch (error: any) {
      alert('Ocorreu um erro ao editar este post.');
    }
  }

  async function onDeletePost(id: string) {
    if (confirm('Você tem certeza que deseja deletar esta postagem?')) {
      const promiseDeleteImage = deleteImage(post.cover);
      await toast.promise(
        promiseDeleteImage,
        {
          success: 'Imagem deletada com sucesso.',
          pending: 'Deletando imagem.',
          error: {
            render({ data }) {
              console.error(data.error);
              return 'Ocorreu um erro ao deletar esta imagem.';
            },
          },
        },
        { autoClose: 2000, toastId: 'toast-delete-image' }
      );

      const promiseDeletePost = api.delete(`/api/post/${id}`);
      await toast.promise(
        promiseDeletePost,
        {
          success: 'Post deletado com sucesso.',
          pending: 'Deletando post.',
          error: {
            render({ data }) {
              console.error(data.error);
              return 'Ocorreu um erro ao deletar este post.';
            },
          },
        },
        { autoClose: 2000, toastId: 'toast-delete-post' }
      );

      router.push('/admin');
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Editar Post | Dashboard Mário Portfolio</title>
        <link rel="icon" href="/favicon.ico" />

        <meta name="robots" content="none" />
      </Head>

      <Sidebar />
      <div className="relative flex flex-col min-h-screen transition-colors duration-500 bg-zinc-100 md:ml-64 dark:bg-slate-800">
        <Header />
        <div className="flex flex-col flex-1 w-full px-4 pt-4 mx-auto md:px-10">
          <div className="flex flex-wrap mt-4">
            <PostForms
              post={post}
              onUpdate={onUpdatePost}
              onDelete={onDeletePost}
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
  const { id } = ctx.query;

  if (!token)
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };

  const api = createApiConnector(ctx);

  const { data } = await api.get(`/api/post/${id}`);

  return {
    props: { post: data.post },
  };
};
