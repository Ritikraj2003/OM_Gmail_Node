import express from 'express';
import cors from 'cors';
import applyRoutes from '../routes/apply.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/apply', applyRoutes);

export default app;
