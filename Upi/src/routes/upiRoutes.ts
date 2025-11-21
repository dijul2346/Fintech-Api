import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";
const router = Router();
router.post('/pay/create', PaymentController.createTransaction);
router.get('/pay/verify/:linkId', PaymentController.verifyPayment);
export default router;
