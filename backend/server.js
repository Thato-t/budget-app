import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();

const app = express();

// Middleware
app.use(cors());
// app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('Connected to the database'))
        .catch(err => console.log('Database connection error:', err));

// Routes

app.get('/', (req, res) => {
    res.send('Backend is running');
    
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));