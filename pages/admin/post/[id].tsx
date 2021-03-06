import Head from 'next/head';
import { Fragment } from 'react';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';

import Header from '../../../components/Navbar/Header';
import Footer from '../../../components/Footer';
import Sidebar from '../../../components/Navbar/Sidebar';
import api, { createApiConnector } from '../../../services/api';
import PostForms from '../../../components/Forms/Post';
import {
  deleteImage,
  deleteMultiImages,
  uploadImage,
  uploadMultiImages,
} from '../../../utils/firebase';
import { useRouter } from 'next/router';
import isAuthenticated from '../../../services/authMiddleware';

type PostsData = {
  title: string;
  projectURL: string;
  repoURL: string;
  isVisible: boolean;
  technologies: string[];
  description: string;
  images: string[];
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
  images: string[];
};

interface IEditPostProps {
  post: PostFromDB;
}

export default function EditPost({ post }: IEditPostProps) {
  const router = useRouter();

  function uploadNewImage(cover: File) {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const promiseUploadImage = uploadImage(cover);
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

        resolve(fileURL);
      } catch (error) {
        reject(error);
      }
    });
  }

  function deleteOldImage(coverURL: string) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const promiseDeleteImage = deleteImage(coverURL);
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

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  function handleDeleteMultiImages(urls: string[]) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const promiseDeleteImage = deleteMultiImages(urls);
        await toast.promise(
          promiseDeleteImage,
          {
            success: 'Imagens de demonstra????o deletada com sucesso.',
            pending: 'Deletando imagens de demonstra????o.',
            error: {
              render({ data }) {
                console.error(data.error);
                return 'Ocorreu um erro ao deletar alguma imagem de demonstra????p.';
              },
            },
          },
          { autoClose: 2000, toastId: 'toast-delete-multi-image' }
        );

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async function onUpdatePost(
    data: PostsData,
    file?: File,
    imagesAlreadyUpload: string[] = [],
    imagesToUpload: File[] = [],
    imagesToDelete: string[] = []
  ) {
    try {
      let cover: string;
      let images: string[] = Array.from(imagesAlreadyUpload ?? []);
      let imagesUploadURL: string[] = [];

      if (file) {
        await deleteOldImage(post.cover);
        cover = await uploadNewImage(file);
      }

      if (imagesToDelete.length) {
        await handleDeleteMultiImages(imagesToDelete);

        imagesToDelete.forEach((deletedImage) => {
          const indexDeletedImage = images.findIndex(
            (imageInDB) => imageInDB === deletedImage
          );
          if (indexDeletedImage < 0) return;

          images.splice(indexDeletedImage, 1);
        });
      }

      if (imagesToUpload.length) {
        const promiseUploadMultiImages = uploadMultiImages(imagesToUpload);
        imagesUploadURL = await toast.promise(
          promiseUploadMultiImages,
          {
            success: 'Imagens de demonstra????o enviadas com sucesso.',
            pending: 'Enviando imagens de demonstra????o.',
            error: {
              render({ data }) {
                console.error(data.error);
                return 'Ocorreu um erro ao enviar alguma imagem de demonstra????o.';
              },
            },
          },
          { autoClose: 2000, toastId: 'toast-upload-multi-image' }
        );
      }

      const promiseUpdatePost = api.put(`/api/post/${post.id}`, {
        ...data,
        cover,
        images: images.concat(imagesUploadURL),
      });
      await toast.promise(
        promiseUpdatePost,
        {
          success: 'Post atualizado com sucesso.',
          pending: 'Atualizando post.',
          error: {
            render({ data }) {
              console.error(data.error);
              return 'Ocorreu um erro ao atualizar este post.';
            },
          },
        },
        { autoClose: 2000, toastId: 'toast-update-post' }
      );
    } catch (error: any) {
      console.error(error);
    }
  }

  async function onDeletePost(id: string) {
    if (confirm('Voc?? tem certeza que deseja deletar esta postagem?')) {
      await deleteOldImage(post.cover);

      await handleDeleteMultiImages(post.images);

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
        <title>Editar Post | Dashboard M??rio Portfolio</title>
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

  const unauthorization = {
    redirect: {
      destination: '/signin',
      permanent: false,
    },
  };

  if (!token) return unauthorization;

  if (!(await isAuthenticated(token))) return unauthorization;

  const api = createApiConnector(ctx);

  const { data } = await api.get(`/api/post/${id}`);

  return {
    notFound: !Boolean(data.post),
    props: { post: data.post },
  };
};
