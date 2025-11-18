import { Router } from 'express';
import { addExpense, deleteExpense, getExpenses, updateExpense } from "../controllers/expenseController";

const router = Router();

router.post("/", addExpense);
router.get("/", getExpenses);
router.put("/:id",updateExpense);
router.delete("/:id",deleteExpense);

export default router;
