import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

    //users
app.get('/users', async (req, res) => {
    const data = await prisma.user.findMany();
    res.json(data);
});

app.post('/users', async (req, res) => {
    const data = await prisma.user.create({
        data: {
            nickname: req.body.nickname,
            avatar: req.body.avatar,
            isBot: req.body.isBot || false,
            email: req.body.email || `${req.body.nickname}@discord.com`,
            password: req.body.password || "123456"
        }
    });
    res.status(201).json(data);
});

app.put('/users/:id', async (req, res) => {
    const data = await prisma.user.update({
        where: { id: Number(req.params.id) },
        data: { 
            nickname: req.body.nickname, 
            avatar: req.body.avatar,
            email: req.body.email,
            password: req.body.password
        }
    });
    res.json(data);
});

app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
});

 //servers
app.get('/servers', async (req, res) => {
    const data = await prisma.server.findMany({ include: { channels: true } });
    res.json(data);
});

app.put('/servers/:id', async (req, res) => {
    const data = await prisma.server.update({
        where: { id: Number(req.params.id) },
        data: { 
            name: req.body.name, 
            icon: req.body.icon 
        }
    });
    res.json(data);
});

app.post('/servers', async (req, res) => {
    const data = await prisma.server.create({
        data: { name: req.body.name, ownerId: Number(req.body.ownerId) }
    });
    res.status(201).json(data);
});

app.patch('/servers/:id', async (req, res) => {
    const data = await prisma.server.update({
        where: { id: Number(req.params.id) },
        data: { name: req.body.name }
    });
    res.json(data);
});

app.delete('/servers/:id', async (req, res) => {
    await prisma.server.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
});

    //canais
app.get('/channels', async (req, res) => {
    const data = await prisma.channel.findMany();
    res.json(data);
});

app.put('/channels/:id', async (req, res) => {
    const data = await prisma.channel.update({
        where: { id: Number(req.params.id) },
        data: { 
            name: req.body.name, 
            type: req.body.type 
        }
    });
    res.json(data);
});

app.post('/channels', async (req, res) => {
    const data = await prisma.channel.create({
        data: { name: req.body.name, serverId: Number(req.body.serverId), type: req.body.type || 'TEXT' }
    });
    res.status(201).json(data);
});

app.patch('/channels/:id', async (req, res) => {
    const data = await prisma.channel.update({
        where: { id: Number(req.params.id) },
        data: { name: req.body.name }
    });
    res.json(data);
});

app.delete('/channels/:id', async (req, res) => {
    await prisma.channel.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
});

    //mensagens
app.get('/messages/:channelId', async (req, res) => {
    const data = await prisma.message.findMany({
        where: { channelId: Number(req.params.channelId) },
        include: { user: true }
    });
    res.json(data);
});

app.put('/messages/:id', async (req, res) => {
    const data = await prisma.message.update({
        where: { id: Number(req.params.id) },
        data: { 
            content: req.body.content 
        }
    });
    res.json(data);
});

app.post('/messages', async (req, res) => {
    const data = await prisma.message.create({
        data: { content: req.body.content, userId: Number(req.body.userId), channelId: Number(req.body.channelId) }
    });
    res.status(201).json(data);
});

app.delete('/messages/:id', async (req, res) => {
    await prisma.message.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
});

    //Roles
app.get('/roles/:serverId', async (req, res) => {
    const data = await prisma.role.findMany({ where: { serverId: Number(req.params.serverId) } });
    res.json(data);
});

app.put('/roles/:id', async (req, res) => {
    const data = await prisma.role.update({
        where: { id: Number(req.params.id) },
        data: { 
            name: req.body.name, 
            color: req.body.color,
            hoist: req.body.hoist 
        }
    });
    res.json(data);
});

app.post('/roles', async (req, res) => {
    const data = await prisma.role.create({
        data: { 
            name: req.body.name, 
            color: req.body.color || '#8a8c90', 
            serverId: Number(req.body.serverId),
            hoist: req.body.hoist || false
        }
    });
    res.status(201).json(data);
});

app.patch('/roles/:id', async (req, res) => {
    const data = await prisma.role.update({
        where: { id: Number(req.params.id) },
        data: { name: req.body.name, color: req.body.color }
    });
    res.json(data);
});

app.delete('/roles/:id', async (req, res) => {
    await prisma.role.delete({ where: { id: Number(req.params.id) } });
    res.status(204).send();
});

const PORT = 3333;
app.listen(PORT, () => console.log('🚀 Backend Full CRUD rodando na porta 3333'));
