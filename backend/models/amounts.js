import mongoose from 'mongoose'

const amountsSchema = new mongoose.Schema({
    currency: { type: String, required: true },
    totalIncome: { type: Number, required: true },
    remainingAmount: Number,
    TotalExpense: Number
})

const Amounts = mongoose.model('User Amount', amountsSchema)

export default Amounts; 