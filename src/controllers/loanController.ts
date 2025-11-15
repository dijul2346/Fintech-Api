import { Request, Response } from "express";
import LoanRate from "../models/loanRateModel";

export const calculateLoan = async (req: Request, res: Response): Promise<void> => {
  try {
    const { loanType, principal, time } = req.body;

    const rateData = await LoanRate.findOne({ loanType });
    if (!rateData) {
      res.status(404).json({ message: "Loan type not found" });
      return;
    }

    const rate = rateData.interestRate;
    const monthlyRate = rate / (12 * 100);
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, time)) /
      (Math.pow(1 + monthlyRate, time) - 1);

    const totalPayment = emi * time;
    const totalInterest = totalPayment - principal;

    res.json({
      loanType,
      rate,
      principal,
      time,
      emi: parseFloat(emi.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      totalPayment: parseFloat(totalPayment.toFixed(2)),
    });
  } catch (error) {
    res.status(500).json({ message: "Error calculating loan", error });
  }
};
