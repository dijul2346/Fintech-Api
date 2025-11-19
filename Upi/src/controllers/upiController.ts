import axios from "axios";
import { Request, Response } from "express";

const CASHFREE_BASE_URL =
  process.env.CASHFREE_ENV === "production"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";

// ------------------ PUBLIC API: /create ------------------
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { amount, customerId, customerPhone, customerEmail } = req.body;

    const orderId = "order_" + Date.now();

    const orderPayload = {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: customerId,
        customer_phone: customerPhone,
        customer_email: customerEmail,
      },
      order_meta: {
        return_url: `https://your-app.com/success?order_id=${orderId}`
      }
    };

    const response = await axios.post(
      `${CASHFREE_BASE_URL}/orders`,
      orderPayload,
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID!,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
          "x-api-version": "2022-09-01",
          "Content-Type": "application/json",
        },
      }
    );

    // THIS is the only time Cashfree gives payment_session_id
    res.status(200).json({
      success: true,
      orderId,
      paymentSessionId: response.data.payment_session_id,
      paymentLink: response.data.payment_link
    });
  } catch (error: any) {
    console.error("Create order error:", error.response?.data || error);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: error.response?.data
    });
  }
};



// ------------------ PUBLIC API: /verify/:orderId ------------------
export const verifyPayment = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;

    const response = await axios.get(`${CASHFREE_BASE_URL}/orders/${orderId}`, {
      headers: {
        "x-client-id": process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
        "x-api-version": "2022-09-01",
      },
    });

    res.json({
      success: true,
      orderId: response.data.order_id,
      status: response.data.order_status,
      payments: response.data.payments || [],
    });
  } catch (error: any) {
    console.error("Verify Error:", error.response?.data || error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.response?.data,
    });
  }
};

export const verifyUPI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { upiId } = req.body;

    if (!upiId) {
      res.status(400).json({
        success: false,
        message: "UPI ID is required",
      });
      return;
    }

    const response = await axios.post(
      `${CASHFREE_BASE_URL}/upi/verify`,
      { vpa: upiId },
      {
        headers: {
          "Content-Type": "application/json",
          "x-client-id": process.env.CASHFREE_APP_ID!,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
          "x-api-version": "2023-08-01"
        },
      }
    );

    res.status(200).json({
      success: true,
      data: response.data,
    });

  } catch (error: any) {
    console.error("UPI Verify Error:", error.response?.data || error);

    res.status(500).json({
      success: false,
      message: "UPI verification failed",
      error: error.response?.data || error.message,
    });
  }
};



