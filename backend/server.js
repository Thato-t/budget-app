import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import UserAmount from './models/amounts.js'
import Transaction from './models/Transaction.js'
import Users from './models/user.js'
import Log from './models/log.js'

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));

app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected to the database'))
        .catch(err => console.log('Database connection error:', err));

const anySchema = new mongoose.Schema({}, { strict: false });


// Routes

app.get('/', async (req, res) => {
    const dummyData = new mongoose.model('AnyModel', anySchema, 'data');
    const categories = new mongoose.model('AnyModel', anySchema, 'categories');

    const dt = await dummyData.find()
    const cat = await categories.find()

    console.log(dt)
    console.log(cat)
    res.json({ dt, cat })
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));