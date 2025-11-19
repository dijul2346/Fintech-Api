import { Request, Response } from "express";
import { VerifyService } from "../services/verify.service";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID = process.env.CASHFREE_CLIENT_ID!;
const CLIENT_SECRET = process.env.CASHFREE_CLIENT_SECRET!;

const verifyService = new VerifyService(CLIENT_ID, CLIENT_SECRET);

export const verifyBankAccount = async (req: Request, res: Response) => {
    const { bankAccount, ifsc, name, phone } = req.body;

    if (!bankAccount || !ifsc)
        return res.status(400).json({ message: "bankAccount and ifsc required" });

    try {
        const result = await verifyService.verifyBankAccount(
            bankAccount,
            ifsc,
            name,
            phone
        );

        res.json({ success: true, data: result });
    } catch (error: any) {
        res.status(error.response?.status || 500).json({
            success: false,
            error: error.response?.data || error.message,
        });
    }
};
