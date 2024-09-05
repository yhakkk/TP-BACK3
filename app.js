import express from 'express';
import cors from 'cors';
import taskRoutes from './Routes/taskRoutes.js';
import dotenv from 'dotenv';
import conectarBD from './db.js';
dotenv.config();
const app = express();
const port = process.env.PORT2;


conectarBD()

app.use(express.json());
app.use(cors());

app.use('/task', taskRoutes);

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
