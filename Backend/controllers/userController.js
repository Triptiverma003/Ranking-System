import { User } from "../models/User.js";
import { History } from "../models/History.js";

export const addUser = async (req, res) => {
  const { name } = req.body;
  const exists = await User.findOne({ name });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const newUser = await User.create({ name });
  res.status(201).json(newUser);
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const claimPoints = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const points = Math.floor(Math.random() * 10) + 1;
  user.totalPoints += points;
  await user.save();

  await History.create({ userId: user._id, points });

  res.json({ message: `${user.name} claimed ${points} points`, user, points });
};

export const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    const leaderboard = users.map((u, index) => ({
      rank: index + 1,
      name: u.name,
      totalPoints: u.totalPoints,
      _id: u._id,
      avatar: '🎯',     // optional static avatar
      flag: '🇮🇳'       // optional static flag
    }));
    res.json(leaderboard);
  } catch (err) {
    console.error("Failed to fetch leaderboard:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getHistory = async (req, res) => {
  const history = await History.find()
    .populate("userId", "name")
    .sort({ timestamp: -1 });
  res.json(history);
};
