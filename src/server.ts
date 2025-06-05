import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const app = fastify();
const prisma = new PrismaClient();

type Users = {
    name: string  // Alterado String para string (TypeScript recomenda tipos primitivos)
    email: string
}

app.get("/users", async () => {
    try {
        const users = await prisma.user.findMany();
        return { value: users };
    } catch (error) {
        console.error(error);
        throw error;
    }
});

app.post("/users", async (req, res) => {
    try {
        const { name, email } = req.body as Users;

        const createdUser = await prisma.user.create({
            data: {
                name,
                email
            }
        });

        return {
            value: createdUser
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
});

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3002
}).then(() => {
    console.log('Servidor funcionando!');
});