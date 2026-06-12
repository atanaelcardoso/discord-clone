import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import appRoutes from '../routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(appRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`🚀 Full CRUD backend running on port ${PORT}`);
});
