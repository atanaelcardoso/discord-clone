import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());

// Criar Usuário
app.post('/users', async (req, res) => {
    try {
        await prisma.user.create({
            data: {
                nickname: req.body.nickname,
                avatar: req.body.avatar,
                isBot: req.body.isBot || false,
                email: req.body.email || `${req.body.nickname.replace(/\s+/g, '').toLowerCase()}@padrao.com`,
                password: req.body.password || "senha_padrao_temporaria"
            }
        });
        res.status(201).json(req.body);
    } catch (err) {
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
});

// Listar Todos os Usuários
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, nickname: true, avatar: true, isBot: true }
        });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar usuários" });
    }
});

// Atualizar Perfil de Usuário
app.put('/users/:id', async (req, res) => {
    try {
        await prisma.user.update({
            where: { id: Number(req.params.id) },
            data: { 
                nickname: req.body.nickname, 
                avatar: req.body.avatar 
            }
        });
        res.json({ message: "Perfil atualizado" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar perfil" });
    }
});


// Criar Servidor
app.post('/servers', async (req, res) => {
    try {
        const server = await prisma.server.create({
            data: { 
                name: req.body.name, 
                ownerId: Number(req.body.owner_id) 
            }
        });
        res.status(201).json(server);
    } catch (err) {
        res.status(500).json({ error: "Erro ao criar servidor" });
    }
});

// Deletar Servidor
app.delete('/servers/:id', async (req, res) => {
    try {
        await prisma.server.delete({
            where: { id: Number(req.params.id) }
        });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: "Erro ao deletar servidor" });
    }
});

// Listar Canais de um Servidor
app.get('/servers/:serverId/channels', async (req, res) => {
    try {
        const channels = await prisma.channel.findMany({
            where: { serverId: Number(req.params.serverId) }
        });
        res.json(channels);
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar canais" });
    }
});

// Editar Nome do Canal
app.patch('/channels/:id', async (req, res) => {
    try {
        await prisma.channel.update({
            where: { id: Number(req.params.id) },
            data: { name: req.body.name }
        });
        res.json({ message: "Canal renomeado" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao renomear canal" });
    }
});

// Criar Mensagem (via HTTP POST)
app.post('/channels/:channelId/messages', async (req, res) => {
    try {
        const message = await prisma.message.create({
            data: {
                content: req.body.content,
                userId: Number(req.body.user_id),
                channelId: Number(req.params.channelId)
            }
        });
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ error: "Erro ao enviar mensagem" });
    }
});

// Listar Mensagens (Com dados do Autor via JOIN)
app.get('/channels/:channelId/messages', async (req, res) => {
    try {
        const messages = await prisma.message.findMany({
            where: { channelId: Number(req.params.channelId) },
            include: {
                user: {
                    select: { nickname: true, avatar: true, isBot: true }
                }
            },
            orderBy: { createdAt: 'asc' }
        });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: "Erro ao carregar mensagens" });
    }
});

// Deletar Mensagem
app.delete('/messages/:id', async (req, res) => {
    try {
        await prisma.message.delete({
            where: { id: Number(req.params.id) }
        });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: "Erro ao deletar mensagem" });
    }
});

const PORT = 3333;
app.listen(PORT, () => console.log('🚀 Backend rodando livre na porta 3333'));
