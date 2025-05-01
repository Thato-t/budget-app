import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    categoryEmoji: { type: String },
    emojiBgdColor: { type: String },
    exampleName: { type: String, required: true },
    amountLeft: { type: Number, required: true },
    amountLimit: { type: Number, required: true },
    amountSpend: { type: Number, required: true },
    date: { type: String, required: true },
    comment: { type: String },
}, { timestamps: true });

 mongoose.model('Transaction', TransactionSchema)

module.exports = transactions;