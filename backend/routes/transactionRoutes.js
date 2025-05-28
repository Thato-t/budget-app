import express from 'express'
import Transactions from '../models/Transaction.js'

const transactionRouter = express.Router()

transactionRouter.post('/', async (req, res) => {
    try{
        const { typeOfCategory, categoryEmoji, categoryColor, categoryChange, amount, amountLimitChange, amountSpentChange, dateChange, commentChange, selectOption } = req.body;
        console.log(req.body)

        // const title = await Transactions.find({selectOption: { $exists: true }})
  
        const newTransaction = new Transactions({
            categoryName:  typeOfCategory,
            categoryEmoji,
            emojiBgdColor: categoryColor,
            exampleName: categoryChange,
            amountLeft: amount,
            amountLimit: amountLimitChange,
            amountSpend: amountSpentChange,
            date: dateChange,
            comment: commentChange,
        })
        await newTransaction.save()
        res.status(201).json(newTransaction)
    }catch(err){
        res.status(500).json({error: err.message})
    }
})

export default transactionRouter