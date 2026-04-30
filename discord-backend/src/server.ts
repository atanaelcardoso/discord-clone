import 'dotenv/config'; // DEVE ser a primeira linha
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL as string,
    },
  },
} as any);

const app = express();
app.use(cors());
app.use(express.json());

app.post('/users', async (req, res) => {
    const { nickname, email, password, isBot } = req.body;
    try {
        const user = await prisma.user.create({
            data: { nickname, email, password, isBot: isBot || false }
        });
        res.status(201).json(user);
    } catch (err) { 
        res.status(500).json({ error: "Erro ao criar usuário" }); 
    }
});

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany({
        select: { id: true, nickname: true, avatar: true, isBot: true }
    });
    res.json(users);
});

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { nickname, avatar } = req.body;
    await prisma.user.update({
        where: { id: Number(id) },
        data: { nickname, avatar }
    });
    res.json({ message: "Perfil atualizado" });
});

app.post('/servers', async (req, res) => {
    const { name, owner_id } = req.body;
    const server = await prisma.server.create({
        data: { name, ownerId: owner_id }
    });
    res.status(201).json(server);
});

app.delete('/servers/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.server.delete({
        where: { id: Number(id) }
    });
    res.status(204).send();
});

app.get('/servers/:serverId/channels', async (req, res) => {
    const { serverId } = req.params;
    const channels = await prisma.channel.findMany({
        where: { serverId: Number(serverId) }
    });
    res.json(channels);
});

app.patch('/channels/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    await prisma.channel.update({
        where: { id: Number(id) },
        data: { name }
    });
    res.json({ message: "Canal renomeado" });
});

app.get('/channels/:channelId/messages', async (req, res) => {
    const { channelId } = req.params;
    const messages = await prisma.message.findMany({
        where: { channelId: Number(channelId) },
        include: {
            user: {
                select: { nickname: true, avatar: true, isBot: true }
            }
        },
        orderBy: { createdAt: 'asc' }
    });
    res.json(messages);
});

app.delete('/messages/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.message.delete({
        where: { id: Number(id) }
    });
    res.status(204).send();
});

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`🚀 Servidor com Prisma rodando em http://localhost:${PORT}`);
});