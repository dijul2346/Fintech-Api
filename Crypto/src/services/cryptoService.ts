import axios from "axios";

export const getCryptoPrice = async (symbol: string) => {
  const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
  const { data } = await axios.get(url);
  return data[symbol]?.inr;
};
