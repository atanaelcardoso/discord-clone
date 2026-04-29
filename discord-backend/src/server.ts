import mysql from "mysql2/promise";
import "dotenv/config";

// Criamos um Pool para gerenciar múltiplas conexões simultâneas (Sistemas Distribuídos)
export const connection = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "discord_clone",
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Teste de conexão imediato
connection
  .query("SELECT 1")
  .then(() => console.log("✅ Conectado ao MySQL via Docker!"))
  .catch((err) => {
    console.error("❌ Erro ao conectar ao banco de dados:");
    console.error(err.message);
  });
