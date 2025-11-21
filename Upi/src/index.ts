import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./config/db";


import upiRoutes from "./routes/upiRoutes";
import { setupSwagger } from "./swagger/swaggeer";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
setupSwagger(app)


app.use("/api", upiRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
