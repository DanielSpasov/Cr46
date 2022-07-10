import { Wallet } from "../../../../Interfaces/Core";

export const loadAmount = async (
  wallet: Wallet,
  amount: number
): Promise<void> => {
  wallet.balance += amount;
  await wallet.save();
};
