import Image from "next/image"
import Link from "next/link"

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

interface ISimplePost {
    post: Post;
    onClick?: () => void;
}

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#ddd" offset="20%" />
      <stop stop-color="#ccc" offset="50%" />
      <stop stop-color="#ddd" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#ddd" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str) =>
    typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str)

export default function SimplePost({ post, onClick }: ISimplePost) {
    return (
        <div onClick={onClick} className="flex items-center justify-center w-full px-4 mt-4 md:w-1/2 lg:w-1/3">
            <div className="flex flex-col cursor-pointer">
                <div className='relative h-48 overflow-hidden rounded-md md:h-64 w-72 md:w-80'>
                    <Image
                        src={post.cover}
                        layout="fill"
                        alt={post.title}
                        objectFit='cover'
                        className="transition ease-out transform hover:scale-125 duration-2000"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                        placeholder="blur"

                    />
                    <h1 className='absolute text-lg text-white bottom-1 left-1'>{post.title}</h1>
                </div>
                <Link href={`/project/${post.id}`}>
                    <a className='self-end text-indigo-300'>Ver Projeto &#8594;</a>
                </Link>

            </div>
        </div>
    )
}