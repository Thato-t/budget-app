import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import logRoutes from './routes/logRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import quoteRoutes from './routes/quotesRoutes.js';

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true 
}));
app.use(express.json());
app.use('/', logRoutes);
app.use('/', userRoutes);
app.use('/', categoriesRoutes);
app.use('/', quoteRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected to the database'))
        .catch(err => console.log('Database connection error:', err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
