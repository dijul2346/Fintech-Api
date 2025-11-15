import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./config/db";


import loanRoutes from "./routes/loanRoutes";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/loan", loanRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
