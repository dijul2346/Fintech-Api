import express from "express";
import cors from "cors";
import verifyRoutes from "./routes/verify.routes";
import { setupSwagger } from "./swagger/swagger";

const app = express();

app.use(cors());
app.use(express.json());
setupSwagger(app)
app.use("/api", verifyRoutes);

export default app;
