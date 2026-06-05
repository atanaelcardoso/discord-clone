import { Express } from "express";
import router from "../Routes/routes.js";
import cors from "cors";
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app: Express = express();

app.use(router);
app.use(cors());
app.use(express.json());

const PORT = 3333;
app.listen(PORT, () => console.log('🚀 Full CRUD backend running on port 3333'));
