import express from 'express';
import Logs from '../models/log.js';

const logRoutes = express.Router();
let usernames;
let totalExpenses = 0;
let amountsLeft = 0;

logRoutes.post('/username', async (req, res) => {
    const { username } = req.body;
    let usernames = username;
    const findUsername = await Logs.findOne({username});
    try{
        if (!findUsername){
            const logUsername = await new Logs({ username })
            await logUsername.save()
            console.log(logUsername, 'saved in the database')
            res.status(200).json(logUsername)
        }else{
            console.log(findUsername, 'exists in database')
            res.json(findUsername)
            return
        }
    }catch (error){
        console.log('Error found: ', error)
        res.status(500).json(error)
    }


})

logRoutes.post('/settings/:username', async (req, res) => {
    let username = usernames;
    const totalExpense = totalExpenses
    const amountLeft = amountsLeft
    const { totalIncome, currency, flagImage } = req.body;
    console.log(username)
    console.log(req.params.username)

    try {
        const saveAmounts = await Logs.findOneAndUpdate(
            { username: username },
            { $set: { totalIncome, currency, flagImage, totalExpense, amountLeft } }
        )
        await saveAmounts.save();
        console.log(saveAmounts, 'amounts saved')
        res.status(200).json(saveAmounts)
    } catch (error) {
        console.error('Error found', error);
        res.status(500).json(error)
    }
})

logRoutes.post('/transaction/:username/:id', async (req, res) => {
    let username = usernames;
    const { typeOfCategory, categoryEmoji, categoryColor, categoryChange, amount, amountLimitChange, amountSpentChange, dateChange, commentChange, selectOption } = req.body;
    try {        

        const findAmounts  = await Logs.find(req.params.username || username)
        if (findAmounts){
            let amountLefts = findAmounts.totalIncome - amountSpentChange;
            const totalExpense = totalExpense + amountSpentChange;
            let totalExpenses = totalExpense
        }else{
            console.error(username, 'not found');
            return
        }

        const saveTransactions = await Logs.findOneAndUpdate(
            { username: req.params.username },
            {$set: { totalIncome, totalExpense, amountLefts }},
            { $push: { transactons: { 
                categoryName: typeOfCategory,
                categoryEmoji: categoryEmoji,
                emojiBgdColor: categoryColor,
                exampleName: categoryChange,
                amountSpend: amountSpendChange,
                amountLimit: amountLimitChange, 
                date: dateChange, // ISO format: YYYY-MM-DD
                comment: commentChange,
                selectOption
             }} }  
            )
            await saveTransactions.save();
            console.log(saveTransactions);
            res.status(200).json(saveTransactions);
    } catch (error) {
        console.error('Error found', error);
        res.status(500).json(error);
    }

})

logRoutes.delete('/username/:username', async (req, res) => {

})



export default logRoutes