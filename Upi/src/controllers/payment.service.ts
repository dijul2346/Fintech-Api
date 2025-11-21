import axios from 'axios';

export class PaymentService {
    

    private static BASE_URL = 'https://sandbox.cashfree.com/pg/links';

    static async createPaymentLink(amount: number, customerId: string, phone: string) {
        try {
            const appId = process.env.CASHFREE_APP_ID!;
            const secretKey = process.env.CASHFREE_SECRET_KEY!;

            const linkId = "LINK_" + Date.now(); 

            const payload = {
                link_id: linkId,
                link_amount: amount,
                link_currency: "INR",
                link_purpose: "Test Transaction",
                customer_details: {
                    customer_id: customerId,
                    customer_phone: phone,
                    customer_name: "Test Customer"
                },
                link_notify: {
                    send_sms: false,
                    send_email: false
                }
            };

            const response = await axios.post(this.BASE_URL, payload, {
                headers: {
                    'x-client-id': appId,
                    'x-client-secret': secretKey,
                    'x-api-version': '2025-01-01',
                    'Content-Type': 'application/json'
                }
            });

            return response.data;

        } catch (error: any) {
            throw error.response?.data || new Error("Link Creation Failed");
        }
    }

    
    static async getLinkDetails(linkId: string) {
        try {
            const appId = process.env.CASHFREE_APP_ID!;
            const secretKey = process.env.CASHFREE_SECRET_KEY!;
            const url = `https://sandbox.cashfree.com/pg/links/${linkId}`;
            const response = await axios.get(url, {
                headers: {
                    'x-client-id': appId,
                    'x-client-secret': secretKey,
                    'x-api-version': '2025-01-01',
                    'Content-Type': 'application/json'
                }
            });

            return response.data;

        } catch (error: any) {
            throw error.response?.data || new Error("Failed to fetch link status");
        }
    }
}