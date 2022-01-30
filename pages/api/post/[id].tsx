import { PrismaClient, Post, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import isAuthenticated from "../../../services/authMiddleware";

function getUniquePost(id: string) {
    return new Promise<Post>(async (resolve, reject) => {
        try {
            const prisma = new PrismaClient();

            const post = await prisma.post.findFirst({
                where: { id }
            });

            resolve(post);
        } catch (error: any) {
            reject(error);
        }
    })
}

function updateUniquePost(id: string, data: Prisma.PostUpdateInput) {
    return new Promise<Post>(async (resolve, reject) => {
        try {
            const prisma = new PrismaClient();

            const post = await prisma.post.update({
                where: { id },
                data,
            });

            resolve(post);
        } catch (error: any) {
            reject(error);
        }
    })
}

function deleteUniquePost(id: string) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const prisma = new PrismaClient();

            await prisma.post.delete({
                where: { id }
            });

            resolve();
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
            case 'PUT':
                if (!await isAuthenticated(req))
                    return res.status(403).json({ message: 'Você não tem acesso a essa api.' });

                const idToUpdate = typeof query.id === 'object' ? query.id[0] : query.id;
                const postUpdated = await updateUniquePost(idToUpdate, req.body);
                res.status(200).json({ post: postUpdated });
                break;
            case 'DELETE':
                if (!await isAuthenticated(req))
                    return res.status(403).json({ message: 'Você não tem acesso a essa api.' });

                const idToDelete = typeof query.id === 'object' ? query.id[0] : query.id;
                await deleteUniquePost(idToDelete);
                res.status(200).send('');
                break;
            default:
                res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
                res.status(405).end(`Method ${method} Not Allowed`)
        }
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}