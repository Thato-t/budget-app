import express from 'express';
import mongoose from 'mongoose';

const anySchema = new mongoose.Schema({}, {strict: false});


const categoriesRoutes = express.Router();


// categories routes

categoriesRoutes.get('/transaction/categories', async (req, res) => {
    const categories = mongoose.model('categories', anySchema, 'categories');

    try {
        const cat = await categories.find();
        res.status(200).json({ cat })
    } catch (error) {
        console.log('Found Error: ', error)
        res.status(500).json({ message: error })
    }
    
});

export default categoriesRoutes