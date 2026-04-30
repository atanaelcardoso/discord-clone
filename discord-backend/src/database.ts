import mysql from 'mysql2/promise';

export const connection = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'discord_clone',
  port: Number(process.env.DB_PORT) || 3306,
});