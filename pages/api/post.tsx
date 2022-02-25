import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import isAuthenticated from "../../services/authMiddleware";

type PostsData = {
    title: string;
    projectURL: string;
    repoURL: string;
    isVisible: boolean;
    fileURL: string;
    technologies: string[];
    description: string;
}

function getPosts(limit?: number) {
    return new Promise(async (resolve, reject) => {
        try {
            const prisma = new PrismaClient();

            const posts = prisma.post.findMany({take: limit});

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
                const { limit } = req.query;
                const limitToFetch = Number(
                typeof limit === 'string' ? limit : limit[0]
                );
                const posts = await getPosts(limitToFetch);
                res.status(200).json({ posts });
                break;

            case 'POST':
                if (!await isAuthenticated(req))
                    return res.status(403).json({ message: 'Você não tem acesso a essa api.' });

                const post = await createPost(req.body);
                res.status(201).json({ post });
                break;

            default:
                res.setHeader('Allow', ['GET', 'POST'])
                res.status(405).end(`Method ${req.method} Not Allowed`)
                break;
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}