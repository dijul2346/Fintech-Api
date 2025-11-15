import express from "express";
import { fetchCryptoPrice } from "../controllers/cryptoController";

const router = express.Router();

router.get("/:symbol", fetchCryptoPrice);

export default router;

