import express from "express";
import { calculateLoan } from "../controllers/loanController";

const router = express.Router();

router.post("/", calculateLoan);

export default router;
