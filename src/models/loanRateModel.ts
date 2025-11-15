import mongoose from "mongoose";

const loanRateSchema = new mongoose.Schema({
  loanType: { type: String, required: true, unique: true },
  interestRate: { type: Number, required: true } // Annual interest rate (%)
});

export default mongoose.model("LoanRate", loanRateSchema);
