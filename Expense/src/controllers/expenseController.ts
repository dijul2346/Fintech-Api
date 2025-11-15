import { Request, Response } from "express";
import Expense from "../models/expenseModel";

export const addExpense = async (req: Request, res: Response) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Error adding expense", error });
  }
};

export const getExpenses = async (_: Request, res: Response) => {
  const expenses = await Expense.find();
  res.json(expenses);
};
