// src/controllers/expenseController.ts
import { Request, Response } from "express";
import Expense from "../models/expenseModel";

export const addExpense = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, amount, category, date } = req.body;

        const expense = await Expense.create({ title, amount, category, date });

        res.status(201).json({
            message: "Expense added successfully",
            expense,
        });
    } catch (error) {
        res.status(500).json({ message: "Error adding expense", error });
    }
};

export const getExpenses = async (req: Request, res: Response): Promise<void> => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Error fetching expenses", error });
    }
};

export const updateExpense = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const updated = await Expense.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!updated) {
            res.status(404).json({ message: "Expense not found" });
            return;
        }

        res.json({
            message: "Expense updated successfully",
            updated,
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating expense", error });
    }
};

export const deleteExpense = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deleted = await Expense.findByIdAndDelete(id);

        if (!deleted) {
            res.status(404).json({ message: "Expense not found" });
            return;
        }

        res.json({
            message: "Expense deleted successfully",
            deleted,
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting expense", error });
    }
};
