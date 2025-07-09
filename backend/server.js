import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import logRoutes from './routes/logRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5000',
    credentials: true 
}));
app.use(express.json());
app.use('/', logRoutes);
app.use('/', userRoutes);

const anySchema = new mongoose.Schema({}, {strict: false})

// Database connection
mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected to the database'))
        .catch(err => console.log('Database connection error:', err));

// categories routes

app.get('/transaction/categories', async (req, res) => {
    const categories = mongoose.model('categories', anySchema, 'categories');

    try {
        const cat = await categories.find();
        res.json({ cat })
    } catch (error) {
        console.log('Found Error: ', error)
        res.status(500).json({ message: error })
    }
    
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
