// src/routes/loanRoutes.ts
import { Router } from "express";
import {
    addLoanType,
    getLoanTypes,
    editLoanType,
    deleteLoanType,
    calculateLoan
} from "../controllers/loanController";

const router = Router();

router.post("/add-type", addLoanType);
router.get("/types", getLoanTypes);
router.put("/types/:id",editLoanType);
router.delete("/types/:id", deleteLoanType);
router.post("/calculate", calculateLoan);

export default router;
