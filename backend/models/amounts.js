import mongoose from 'mongoose'

const amountsSchema = new mongoose.Schema({
    currency: { type: String, required: true },
    totalIncome: { type: Number, required: true },
    remainingAmount: Number,
    TotalExpense: Number
})

const amounts = mongoose.model('User Amount', amountsSchema)
amounts.save();

module.exports = amounts 