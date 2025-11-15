import express from "express";
import { fetchCryptoPrice } from "../controllers/cryptoController";

const router = express.Router();

/**
 * @openapi
 * /api/crypto/{symbol}:
 *   get:
 *     summary: Get crypto price by symbol
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         description: Cryptocurrency symbol (e.g., BTC)
 *     responses:
 *       200:
 *         description: Price retrieved successfully
 */
router.get("/:symbol", fetchCryptoPrice);

export default router;

