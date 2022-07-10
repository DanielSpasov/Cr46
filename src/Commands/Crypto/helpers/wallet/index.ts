import { takeAmount } from "./takeAmount";
import { loadAmount } from "./loadAmount";
import { setupWallet } from "./setup";
import { getInfo } from "./getInfo";

export const wallet = {
  setup: setupWallet,
  take: takeAmount,
  load: loadAmount,
  getInfo,
};
