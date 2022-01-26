import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'GET':
                const posts = await getPosts();
                res.status(200).json({ posts });
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