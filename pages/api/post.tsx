import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

type PostsData = {
    title: string;
    projectURL: string;
    repoURL: string;
    isVisible: boolean;
    fileURL: string;
    technologies: string[];
    description: string;
}

function getPosts() {
    return new Promise(async (resolve, reject) => {
        try {
            const prisma = new PrismaClient();

            const posts = prisma.post.findMany({});

            resolve(posts);
        } catch (error: any) {
            reject(error);
        }
    })
}

function createPost(data: PostsData) {
    return new Promise(async (resolve, reject) => {
        try {
            const prisma = new PrismaClient();
            const {
                title,
                projectURL,
                repoURL,
                isVisible,
                fileURL,
                technologies,
                description
            } = data;

            const posts = prisma.post.create({
                data: {
                    title,
                    content: description,
                    link: projectURL,
                    repository: repoURL,
                    published: isVisible,
                    cover: fileURL,
                    technologies,
                }
            });

            resolve(posts);
        } catch (error: any) {
            reject(error);
        }
    })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'GET':
                const posts = await getPosts();
                res.status(200).json({ posts });
                break;

            case 'POST':
                const post = await createPost(req.body);
                res.status(201).json({ post });
                break;

            default:
                res.status(404).send('');
                break;
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}