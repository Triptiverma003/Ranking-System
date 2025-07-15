import express from "express";
import {
  addUser,
  getUsers,
  claimPoints,
  getLeaderboard,
  getHistory,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/add-user", addUser);
router.get("/users", getUsers);
router.post("/claim/:userId", claimPoints);
router.get("/leaderboard", getLeaderboard);
router.get("/history", getHistory);

export default router;
