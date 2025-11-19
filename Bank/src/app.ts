import express from "express";
import cors from "cors";
import verifyRoutes from "./routes/verify.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", verifyRoutes);

export default app;
