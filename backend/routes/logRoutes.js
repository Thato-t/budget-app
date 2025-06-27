import express from 'express';
import Logs from '../models/log.js';
import { LocalStorage } from 'node-localstorage'

const logRoutes = express.Router();
const localStorage = new LocalStorage('../scratch')
let totalExpenses = 0;
let amountsLeft = 0;

logRoutes.get('/users/:username', async (req, res) => {
    const pin = req.params.username
    console.log(pin)
    const findUsername = await Logs.findOne({pin});
    try{
        if (!findUsername){
            const errMsg = `${pin} doesn't exist`
            console.log(errMsg)
            res.status(200).json({ errMsg })
        }else{
            const found = `${pin} found`
            console.log(findUsername, 'found')
            res.status(200).json({ found })
        }
    }catch (error){
        console.log('Error found: ', error)
        res.status(500).json(error)
    }

})

logRoutes.get('/home/dashboard', async (req, res) => {
    const pin = localStorage.getItem('pin')
    try {
        const findLog = await Logs.findOne({ pin });
        res.status(200).json({ findLog });
    } catch (error) {
        console.error('Error found', error);
        res.status(404).json(error);
    }
})

logRoutes.get('/reports/dashboard', async (req, res) => {
    const pin = localStorage.getItem('pin')
    try {
        const findLog = await Logs.findOne({ pin });
        res.status(200).json({ findLog });
    } catch (error) {
        console.error('Error found', error);
        res.status(404).json(error);
    }
})


logRoutes.post('/settings/amounts/:username', async (req, res) => {
    const pin =  localStorage.getItem('pin')
    const totalExpense = totalExpenses
    const amountLeft = amountsLeft
    const { totalIncome, currency, flagImage } = req.body;

    try {
        const saveAmounts = await Logs.findOneAndUpdate(
            { pin: pin },
            { $set: { totalIncome, currency, flagImage, totalExpense, amountLeft } }
        )
        await saveAmounts.save();
        console.log(saveAmounts, 'amounts saved')
        res.status(201).json(saveAmounts)
    } catch (error) {
        console.error('Error found', error);
        res.status(500).json(error)
    }
})

logRoutes.post('/transaction/:username/:id', async (req, res) => {
    const pin =  localStorage.getItem('pin')
    const { typeOfCategory, categoryEmoji, categoryColor, categoryChange, amount, amountLimitChange, amountSpentChange, dateChange, commentChange, selectOption } = req.body;
    try {        

        const findAmounts  = await Logs.find(pin || pin)
        if (findAmounts){
            let amountLefts = findAmounts.totalIncome - amountSpentChange;
            const totalExpense = totalExpense + amountSpentChange;
            let totalExpenses = totalExpense
        }else{
            console.error(username, 'not found');
            return
        }

        const saveTransactions = await Logs.findOneAndUpdate(
            { pin: pin },
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




export default logRoutes