// models/Log.js
import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  categoryName: { type: String},
  categoryEmoji: { type: String },
  emojiBgdColor: { type: String },
  exampleName: { type: String },
  amountSpend: { type: Number },
  categoryLimit: { type: Number },
  date: { type: String }, // ISO format: YYYY-MM-DD
  comment: { type: String },
  selectOption: { type: String }
});

const categoriesSchema = new mongoose.Schema({
  category: { type: String}
})

const logSchema = new mongoose.Schema({
  username: { type: String },
  amount: { type: Number },
  amountLeft: { type: Number },
  totalExpense: { type: Number },
  currency: { type: String },
  flagImage: { type: String }, 
  pin: { type: String },
  totalIncome: { type: Number },
  transactions: [entrySchema]
}, { timestamps: true });

const Logs = mongoose.model('Logs', logSchema);

export default Logs;
