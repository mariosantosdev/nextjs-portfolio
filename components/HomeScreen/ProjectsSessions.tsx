import { useRouter } from 'next/router';
import SimplePost, { Post } from '../Post';

interface IProjectSession {
  posts: Post[];
}

export default function ProjectSession({ posts }: IProjectSession) {
  const router = useRouter();

  return (
    <section
      id="projects"
      className="relative flex flex-col items-center min-h-screen py-4 bg-indigo-900 snap-start"
    >
      <div className="flex flex-col items-center flex-1 w-full h-full max-w-5xl px-4">
        <div className="flex flex-col items-center justify-center w-full md:flex-row">
          <h1 className="w-full my-2 text-2xl text-center text-white md:text-4xl">
            Últimos Projetos
          </h1>
        </div>

        <div className="flex flex-col flex-wrap items-center justify-center flex-1 w-full h-max md:flex-row md:px-0">
          {posts.map((post) => (
            <SimplePost
              key={post.id}
              post={post}
              onClick={() => router.push(`/project/${post.id}`)}
            />
          ))}
        </div>

        <footer className="flex items-end justify-center w-full">
          <button
            onClick={() => router.push('/projects')}
            className="p-4 px-6 text-black bg-white rounded-md shadow-md w-max md:right-4"
          >
            &#8599; Ver Todos
          </button>
        </footer>
      </div>
    </section>
  );
}
