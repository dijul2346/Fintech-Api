import { Request, Response } from "express";
import axios from "axios";

export const fetchCryptoPrice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { symbol } = req.params;

    if (!symbol) {
      res.status(400).json({ message: "Symbol parameter is required" });
      return;
    }
    const uppercaseSymbol = symbol.toUpperCase();
    const pair = `${uppercaseSymbol}USDT`;

    const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${pair}`);

    if (!response.data || !response.data.price) {
      res.status(404).json({ message: "Symbol not found" });
      return;
    }

    res.status(200).json({
      symbol: uppercaseSymbol,
      pair: pair,
      price: parseFloat(response.data.price),
      currency: "USDT",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      res.status(404).json({ message: "Symbol not found" });
    } else {
      console.error("Error fetching price:", error.message);
      res.status(500).json({ message: "Failed to fetch crypto price" });
    }
  }
};
