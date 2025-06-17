import mongoose from 'mongoose'

const amountsSchema = new mongoose.Schema({
    currency: { type: String, required: true },
    totalIncome: { type: Number, required: true },
    totalExpense: Number,
    remainingAmount: Number,
    flagImage: String
})

const Amounts = mongoose.model('User Amount', amountsSchema)

export default Amounts; 