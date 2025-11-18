import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import {connectDB} from "./config/db";

import expenseRoutes from "./routes/expenseRoutes";


dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use("/docs", express.static(path.join(__dirname, "..", "docs")));

const swaggerPath = path.join(__dirname, "..", "docs", "swagger.json");
let swaggerDocument: any = {};
try {
  const raw = fs.readFileSync(swaggerPath, "utf8");
  swaggerDocument = JSON.parse(raw);
} catch (err) {
  console.warn("Could not load swagger.json:", err);
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/expenses", expenseRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
