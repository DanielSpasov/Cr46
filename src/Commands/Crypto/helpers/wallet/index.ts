import { hasCollectedDaily } from "./hasCollectedDaily";
import { takeAmount } from "./takeAmount";
import { loadAmount } from "./loadAmount";
import { setupWallet } from "./setup";
import { getInfo } from "./getInfo";

export const wallet = {
  setup: setupWallet,
  hasCollectedDaily,
  take: takeAmount,
  load: loadAmount,
  getInfo,
};
