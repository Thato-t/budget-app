import express from 'express';
import Logs from '../models/log.js';

const logRoutes = express.Router();

// fetching dashboard data from db 
logRoutes.get('/home/dashboard/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const findLog = await Logs.findOne({ email });
        res.status(200).json({ findLog });
    } catch (error) {
        console.error('Error found', error);
        res.status(404).json(error);
    }
})

// fetching reports data from db
logRoutes.get('/reports/dashboard/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const findLog = await Logs.findOne({ email });
        res.status(200).json({ findLog });
    } catch (error) {
        console.error('Error found', error);
        res.status(404).json(error);
    }
})


// making transactions
logRoutes.post('/add/transaction/:email', async (req, res) => {
    const email =  req.params.email;
    const { typeOfCategory, categoryEmoji, categoryColor, categoryChange, amount, amountLimitChange, amountSpentChange, dateChange, commentChange, selectOption } = req.body;
    try {        
        
        const findAmounts  = await Logs.findOne({ email })
        if (findAmounts){
            let totalExpense = parseInt(findAmounts.totalExpense) + parseInt(amountLimitChange);
            let amountLeft = parseInt(findAmounts.totalIncome) - parseInt(totalExpense);

            const saveTransactions = await Logs.findOneAndUpdate(
                { email: email },
                {$push: { transactions: { 
                    categoryName: typeOfCategory,
                    categoryEmoji: categoryEmoji,
                    emojiBgdColor: categoryColor,
                    exampleName: categoryChange,
                    amountSpend: parseInt(amountSpentChange),
                    categoryLimit: parseInt(amountLimitChange), 
                    date: dateChange, // ISO format: YYYY-MM-DD
                    comment: commentChange,
                    selectOption: selectOption,
                    amount: parseInt(amount)
                }}, $set: { totalExpense, amountLeft }}
            )
            console.log(saveTransactions);
            res.status(200).json(saveTransactions);
        }else{
            console.error(email, 'not found')
            res.status(404).json('user not found')
        }

    } catch (error) {
        console.error('Error found', error);
        res.status(500).json(error);
    }
    
})

// get transactions
logRoutes.get('/getTransactions/:email', async (req, res) => {
    const email = req.params.email;
    try {        
        const findAmounts  = await Logs.findOne({ email });
        if(!findAmounts){
            console.error('Not found');
            res.status(404).json('Not found');
        } else{
            console.log('User Found');
            res.status(200).json({ findAmounts })
        }
    } catch (error){
        console.error('Error found', error);
        res.status(500).json({error});
    }
})


// saving incomes of user to db
logRoutes.post('/settings/amounts/:email', async (req, res) => {
    const email =  req.params.email;
    const { totalIncome, currency, flagImage, totalExpense, amountLeft } = req.body;

    try {
        const saveAmounts = await Logs.findOneAndUpdate(
            { email: email },
            { $set: { totalIncome: totalIncome, currency, flagImage, totalExpense, amountLeft } }
        )
        await saveAmounts.save();
        console.log(saveAmounts, 'amounts saved')
        res.status(201).json(saveAmounts)
    } catch (error) {
        console.error('Error found', error);
        res.status(500).json(error)
    }
})


export default logRoutes