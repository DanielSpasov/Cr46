import { Coin } from "../../../../Interfaces/Crypto/Coin";
import axios from "axios";
import { get } from ".";

export const topHundred = async (): Promise<Coin[]> => {
  const { data } = await axios.get(get.url({ key: "top100" }), {
    headers: {
      "X-CMC_PRO_API_KEY": process.env.CRYPTO_API_KEY,
    },
  });
  return data.data;
};
