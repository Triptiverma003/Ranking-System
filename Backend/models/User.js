const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  image: {
    type: String // will store Base64 or image URL
  }
});

export const User = mongoose.model("User", userSchema);
