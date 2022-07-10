import { getCoin, getAmount } from "./interactions";
import { topHundred } from "./cryptocurrencies";
import { url } from "./url";

export const get = {
  amount: getAmount,
  coin: getCoin,
  topHundred,
  url,
};
