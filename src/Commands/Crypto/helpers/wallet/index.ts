import { compareDailyHours } from "./compareDailyHours";
import { takeAmount } from "./takeAmount";
import { loadAmount } from "./loadAmount";
import { setupWallet } from "./setup";
import { getInfo } from "./getInfo";

export const wallet = {
  setup: setupWallet,
  compareDailyHours,
  take: takeAmount,
  load: loadAmount,
  getInfo,
};
