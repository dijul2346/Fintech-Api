import { Request, Response } from 'express';
import { PaymentService } from './payment.service';

export class PaymentController {

    static async createTransaction(req: Request, res: Response) {
        const { amount, phone } = req.body;
        try {
            const customerId = `CUST_${phone}`;
            const data = await PaymentService.createPaymentLink(amount, customerId, phone);
            return res.json({
                success: true,
                message: "Link Generated Successfully",
                paymentLink: data.link_url, 
                linkId: data.link_id
            });

        } catch (error: any) {
            return res.status(500).json({
                message: "Failed to create link",
                error: error
            });
        }
    }
    static async verifyPayment(req: Request, res: Response) {
        const { linkId } = req.params;
        if (!linkId) {
            return res.status(400).json({message: "Link ID is required" });
        }

        try {
            const data = await PaymentService.getLinkDetails(linkId);
            const isPaid = data.link_status === "PAID";

            return res.json({
                success: true,
                paid: isPaid, 
                status: data.link_status, 
                amount: data.link_amount,
                customer: data.customer_details,
                transactions: data.link_orders || [] 
            });

        } catch (error) {
            return res.status(500).json({
                message: "Verification failed",
                error: error
            });
        }
    }
}