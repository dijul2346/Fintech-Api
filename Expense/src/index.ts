import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import {connectDB} from "./config/db";

import expenseRoutes from "./routes/expenseRoutes";


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve Swagger/OpenAPI JSON and other docs from the `docs` folder
app.use("/docs", express.static(path.join(__dirname, "..", "docs")));

app.use("/api/expenses", expenseRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
