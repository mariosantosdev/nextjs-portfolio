import { PrismaClient, Post } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

function getUniquePost(id: string) {
    return new Promise<Post>(async (resolve, reject) => {
        try {
            const prisma = new PrismaClient();

            const post = prisma.post.findFirst({
                where: { id }
            });

            resolve(post);
        } catch (error: any) {
            reject(error);
        }
    })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { query, method } = req;

        switch (method) {
            case 'GET':
                const id = typeof query.id === 'object' ? query.id[0] : query.id;
                const post = await getUniquePost(id);
                res.status(200).json({ post });
                break;
            default:
                res.setHeader('Allow', ['GET', 'PUT'])
                res.status(405).end(`Method ${method} Not Allowed`)
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}