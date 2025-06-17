import express from 'express';
import Amounts from '../models/amounts.js';

const amountRoutes  = express.Router();

amountRoutes.post('/', async (req, res) => {
    const { totalIncome, currency, flagImage } = req.body;
    console.log(req.body)
    const totalExpense = 0

    try {
        const newAmounts = new Amounts({
            currency,
            totalIncome,
            totalExpense,
            remainingAmount: (totalIncome - totalExpense).toFixed(2),
            flagImage: flagImage
        })
        await newAmounts.save();
        res.status(200).json(newAmounts);
    } catch (error) {
        console.error('Found error: ', error)
        res.status(500).json({ message: 'Error found', error });
    }
})

// amountRoutes.patch('/', async (req, res) => {

// })

export default amountRoutes