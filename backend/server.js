import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import router from './routes/index.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use('/api', router);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})