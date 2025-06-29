import express from 'express';
import Logs from '../models/log.js';
import { LocalStorage } from 'node-localstorage'

const logRoutes = express.Router();
const localStorage = new LocalStorage('../scratch')
let totalExpenses = 0;
let amountsLeft = 0;

// login in and checking if user exists
logRoutes.get('/users/:username', async (req, res) => {
    const paramsPin = req.params.username
    try{
        const findUsername = await Logs.findOne({paramsPin});
        if (!findUsername){
            const errMsg = `${paramsPin} doesn't exist`
            localStorage.setItem('errMsg',  errMsg)
            console.log(errMsg)
            res.status(200).json({ errMsg })
        }else{
            const found = `${paramsPin} found`
            console.log(findUsername, 'found')
            res.status(200).json({ found })
        }
    }catch (error){
        console.log('Error found: ', error)
        res.status(500).json(error)
    }

})

// fetching dashboard data from db 
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

// fetching reports data from db
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


// making transactions
logRoutes.post('/transaction', async (req, res) => {
    const pin =  localStorage.getItem('pin')
    const { typeOfCategory, categoryEmoji, categoryColor, categoryChange, amount, amountLimitChange, amountSpentChange, dateChange, commentChange, selectOption } = req.body;
    try {        
        
        const findAmounts  = await Logs.findOne({ pin })
        if (findAmounts){
            let totalExpense = parseInt(findAmounts.totalExpense) + parseInt(amountSpentChange);
            let amountLeft = parseInt(findAmounts.totalIncome) - parseInt(totalExpense);
            let totalExpenses = totalExpense
            console.log(amountLeft)

            const saveTransactions = await Logs.findOneAndUpdate(
                { pin: pin },
                {$set: { totalExpense, amountLeft }},
                { $push: { transactons: { 
                    categoryName: typeOfCategory,
                    categoryEmoji: categoryEmoji,
                    emojiBgdColor: categoryColor,
                    exampleName: categoryChange,
                    amountSpend: amountSpentChange,
                    amountLimit: amountLimitChange, 
                    date: dateChange, // ISO format: YYYY-MM-DD
                    comment: commentChange,
                    selectOption
                }} }  
            )
            await saveTransactions.save();
            console.log(saveTransactions);
            res.status(200).json(saveTransactions);
        }else{
            console.error(username, 'not found')
            res.status(404).json('user not found')
        }

    } catch (error) {
        console.error('Error found', error);
        res.status(500).json(error);
    }
    
})

// saving incomes of user to db
logRoutes.post('/settings/amounts/:username', async (req, res) => {
    const pin =  localStorage.getItem('pin')
    const totalExpense = totalExpenses
    const amountLeft = amountsLeft
    const { totalIncome, currency, flagImage } = req.body;

    try {
        const saveAmounts = await Logs.findOneAndUpdate(
            { pin: pin },
            { $set: { totalIncome: parseInt(totalIncome), currency, flagImage, totalExpense, amountLeft } }
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