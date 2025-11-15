import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./config/db";


import cryptoRoutes from "./routes/cryptoRoutes";
import { swaggerUi, swaggerSpec } from "./swagger";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use("/api/crypto", cryptoRoutes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
