import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  quote: {
    type: String,
    required: true,
  },
  saidBy: {
    type: String,
    required: true,
  },
},{
    timestamps:true
});
export const quote = mongoose.model('quote',quoteSchema)