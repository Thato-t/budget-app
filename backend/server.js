import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import logRoutes from './routes/logRoutes.js'

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));
app.use(express.json())
app.use('/', logRoutes)

const anySchema = new mongoose.Schema({}, {strict: false})

// Database connection
mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected to the database'))
        .catch(err => console.log('Database connection error:', err));

// Routes

app.get('/', async (req, res) => {

    const categories = mongoose.model('categories', anySchema, 'categories');
    const logs = mongoose.model('logs', anySchema, 'logs');
    

    const cat = await categories.find();
    const log = await logs.find();

    res.json({ cat, log });
    
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));