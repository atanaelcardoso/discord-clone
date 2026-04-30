import express from 'express';
import cors from 'cors';
import { connection } from './database';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/users', async (req, res) => {
    const { nickname, email, password, isBot } = req.body;
    try {
        const [result] = await connection.execute(
            'INSERT INTO users (nickname, email, password, isBot) VALUES (?, ?, ?, ?)',
            [nickname, email, password, isBot || false]
        );
        res.status(201).json({ id: (result as any).insertId, nickname });
    } catch (err) { res.status(500).json({ error: "Erro ao criar usuário" }); }
});

app.get('/users', async (req, res) => {
    const [rows] = await connection.execute('SELECT id, nickname, avatar, isBot FROM users');
    res.json(rows);
});

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { nickname, avatar } = req.body;
    await connection.execute('UPDATE users SET nickname = ?, avatar = ? WHERE id = ?', [nickname, avatar, id]);
    res.json({ message: "Perfil atualizado" });
});

app.post('/servers', async (req, res) => {
    const { name, owner_id } = req.body;
    const [result] = await connection.execute('INSERT INTO servers (name, owner_id) VALUES (?, ?)', [name, owner_id]);
    res.status(201).json({ id: (result as any).insertId, name });
});

app.delete('/servers/:id', async (req, res) => {
    const { id } = req.params;
    await connection.execute('DELETE FROM servers WHERE id = ?', [id]);
    res.status(204).send();
});

app.get('/servers/:serverId/channels', async (req, res) => {
    const { serverId } = req.params;
    const [rows] = await connection.execute('SELECT * FROM channels WHERE server_id = ?', [serverId]);
    res.json(rows);
});

app.patch('/channels/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    await connection.execute('UPDATE channels SET name = ? WHERE id = ?', [name, id]);
    res.json({ message: "Canal renomeado" });
});

app.get('/channels/:channelId/messages', async (req, res) => {
    const { channelId } = req.params;
    const [rows] = await connection.execute(
        `SELECT m.*, u.nickname, u.avatar, u.isBot 
         FROM messages m 
         JOIN users u ON m.user_id = u.id 
         WHERE m.channel_id = ? 
         ORDER BY m.created_at ASC`, [channelId]
    );
    res.json(rows);
});

// Deletar Mensagem
app.delete('/messages/:id', async (req, res) => {
    const { id } = req.params;
    await connection.execute('DELETE FROM messages WHERE id = ?', [id]);
    res.status(204).send();
});


const PORT = 3333;
app.listen(PORT, () => {
    console.log(`🚀 Servidor Full Stack rodando em http://localhost:${PORT}`);
});
