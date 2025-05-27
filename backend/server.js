import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import transactionRoutes from './routes/transactionRoutes.js'
// import userRoutes from './routes/userRoutes.js'
// import amountRoutes from './routes/amountRoutes.js'

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));
app.use(express.json())
app.use('/submit', transactionRoutes)

const anySchema = new mongoose.Schema({}, {strict: false})

// Database connection
mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected to the database'))
        .catch(err => console.log('Database connection error:', err));

// Routes

app.get('/', async (req, res) => {
    const recents = mongoose.model('recents', anySchema, 'data')
    const categories = mongoose.model('categories', anySchema, 'categories')
    const transactions = mongoose.model('transactions', anySchema, 'transactions')

    const dt = await recents.find()
    const cat = await categories.find()
    const trans = await transactions.find()

    res.json({ dt, cat, trans })
    
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));