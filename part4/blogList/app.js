import express from 'express';
import mongoose from 'mongoose';
import router from './routes/router.js';
import { mongoUrl } from './utils/config.js';

const app = express();

mongoose.connect(mongoUrl, { family: 4 });

app.use(express.json());
app.use('/api', router);

export default app;
