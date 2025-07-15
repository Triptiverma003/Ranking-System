import mongoose from "mongoose";
//maine yha simple schema banaya hai 
//this is history schema
const historySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" },
    points: Number,
  timestamp: { type: Date, default: Date.now }
});

export const History = mongoose.model("History", historySchema);
