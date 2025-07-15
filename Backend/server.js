import express from "express";
import dotenv from "dotenv";
import connectToDB from "./configs/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Only start app after DB is connected
connectToDB().then(() => {
  console.log("MongoDB connected");

  //  Mount routes *after* DB connection
  app.use("/api", userRoutes);

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error(" DB connection failed:", err);
});
