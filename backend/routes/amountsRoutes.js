import express from 'express';
import Amounts from '../models/amounts.js';

const amountRoutes  = express.Router();

amountRoutes.post('/amounts', async (req, res) => {
    const { totalIncome, currency, flagImage } = req.body
    try {
        const newAmounts = new Amounts({
            currency,
            totalIncome,
            TotalExpense: 0,
            remainingAmount: (totalIncome - TotalExpense).toFixed(2),
            flagImage: flagImage
        })
        newAmounts.save()
        res.status(200).json(newAmounts)
    } catch (error) {
        res.status(500).json({ message: 'Erro found', error })
    }
})

amountRoutes.patch('/', async (req, res) => {

})

export default amountRoutes