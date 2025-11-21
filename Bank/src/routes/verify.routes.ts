import express from "express";
import { verifyBankAccount } from "../controller/verify.controller";

const router = express.Router();

router.post("/verify", verifyBankAccount);

/**
 * @swagger
 * /verify:
 *   post:
 *     summary: Verify Bank Account
 *     tags: [Verification]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bankAccount
 *               - ifsc
 *           example:
 *             bankAccount: "026291800001191"
 *             ifsc: "YESB0000262"
 *             name: "Test"
 *     responses:
 *       200:
 *         description: Successful verification
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 reference_id: 4777879
 *                 name_at_bank: "JOHN DOE"
 *                 bank_name: "YES BANK"
 *                 account_status: "VALID"
 *                 branch: "SANTACRUZ, MUMBAI"
 *       400:
 *         description: Missing input fields
 *         content:
 *           application/json:
 *             example:
 *               message: "bankAccount and ifsc required"
 *       500:
 *         description: Server or Cashfree Error
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               error: "Internal server error"
 */
router.post("/verify", verifyBankAccount);

export default router;
