import mongoose from "mongoose";
//yha maine user schema banaya hai
const userSchema = new mongoose.Schema({
  //name is mandatory in this case
  name: 
  { 
    type: String, 
    required: true 
  },
  totalPoints: {
     type: Number, default: 0 
    }
});

export const User = mongoose.model("User", userSchema);
