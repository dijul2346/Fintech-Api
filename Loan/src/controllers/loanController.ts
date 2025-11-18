// src/controllers/loanController.ts
import { Request, Response } from "express";
import LoanRate from "../models/loanRateModel";

export const addLoanType = async (req: Request, res: Response): Promise<void> => {
    try {
        const { loanType, interestRate } = req.body;
        const exists = await LoanRate.findOne({ loanType });
        if (exists) {
            res.status(400).json({ message: "Loan type already exists" });
            return;
        }
        const loan = await LoanRate.create({ loanType, interestRate });
        res.status(201).json({ message: "Loan type added", loan });
    } catch (error) {
        res.status(500).json({ message: "Error adding loan type", error });
    }
};

export const getLoanTypes = async (req: Request, res: Response): Promise<void> => {
    try {
        const loans = await LoanRate.find();
        res.json(loans);
    } catch (error) {
        res.status(500).json({ message: "Error fetching loan types", error });
    }
};

export const editLoanType = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { interestRate } = req.body;

        const updated = await LoanRate.findByIdAndUpdate(
            id,
            { interestRate },
            { new: true }
        );

        if (!updated) {
            res.status(404).json({ message: "Loan type not found" });
            return;
        }

        res.json({ message: "Loan type updated", updated });
    } catch (error) {
        res.status(500).json({ message: "Error updating loan type", error });
    }
};


export const deleteLoanType = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const deleted = await LoanRate.findByIdAndDelete(id);

        if (!deleted) {
            res.status(404).json({ message: "Loan type not found" });
            return;
        }

        res.json({ message: "Loan type deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting loan type", error });
    }
};

export const calculateLoan = async (req: Request, res: Response): Promise<void> => {
    try {
        const { loanType, principal, months } = req.body;

        const loan = await LoanRate.findOne({ loanType });

        if (!loan) {
            res.status(404).json({ message: "Loan type not found" });
            return;
        }
        const annualRate = loan.interestRate;
        const monthlyRate = annualRate / (12 * 100);
        const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months);
        const denominator = Math.pow(1 + monthlyRate, months) - 1;
        const emi = numerator / denominator;
        res.json({
            loanType,
            interestRate: annualRate,
            emi: parseFloat(emi.toFixed(2))
        });
    } catch (error) {
        res.status(500).json({ message: "Error calculating EMI", error });
    }
};
