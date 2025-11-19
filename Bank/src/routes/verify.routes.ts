import express from "express";
import { verifyBankAccount } from "../controller/verify.controller";

const router = express.Router();

router.post("/verify", verifyBankAccount);

export default router;
