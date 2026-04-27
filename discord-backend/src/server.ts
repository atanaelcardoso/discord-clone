import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { connection } from './database';

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5173" } // Porta do seu Vite
});

// Teste de conexão com o banco
connection.query('SELECT 1')
  .then(() => console.log('✅ Banco de Dados conectado via Docker!'))
  .catch(err => console.error('❌ Erro ao conectar ao banco:', err));

io.on('connection', (socket) => {
  console.log(`🔌 Novo usuário conectado: ${socket.id}`);

  socket.on('sendMessage', async (data) => {
    try {
      // Salva no MySQL (Persistência)
      await connection.execute(
        'INSERT INTO messages (content, user_id) VALUES (?, ?)',
        [data.content, data.userId]
      );

      // Distribui para os outros usuários (Tempo Real)
      io.emit('receivedMessage', data);
    } catch (error) {
      console.error('Erro ao salvar mensagem:', error);
    }
  });
});

httpServer.listen(3333, () => {
  console.log('🚀 Servidor e Socket.io prontos na porta 3333');
});