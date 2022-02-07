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
}

export default function SimplePost({ post }: ISimplePost) {
    return (
        <div className="flex items-center justify-center w-1/3 mt-4">
            <div className="flex flex-col cursor-pointer">
                <div className='relative h-64 overflow-hidden rounded-md w-80'>
                    <Image
                        src={post.cover}
                        layout="fill"
                        alt={post.title}
                        objectFit='cover'
                        className="transition ease-out transform hover:scale-125 duration-2000"
                        blurDataURL="data:..."
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