import { Router } from "express";
import { createOrder,  verifyPayment, verifyUPI } from "../controllers/upiController";

const router = Router();

router.post("/create", createOrder);
router.get("/verify/:orderId", verifyPayment);
router.post("/verify-upi", verifyUPI);
// Webhook added later (after deployment)

export default router;
