// models/Log.js
import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  categoryEmoji: { type: String },
  emojiBgdColor: { type: String },
  exampleName: { type: String, required: true },
  amountSpend: { type: Number, required: true },
  date: { type: String, required: true }, // ISO format: YYYY-MM-DD
  comment: { type: String },
});

const logSchema = new mongoose.Schema({
  username: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  amountLimit: { type: Number, required: true },
  amountLeft: { type: Number, required: true },
  entries: [entrySchema]
}, { timestamps: true });

const Logs = mongoose.model('Logs', logSchema);

export default Logs;
