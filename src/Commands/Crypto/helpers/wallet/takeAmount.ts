import { Wallet } from "../../../../Interfaces/Core";

export const takeAmount = async (
  wallet: Wallet,
  amount: number
): Promise<void> => {
  wallet.balance -= amount;
  await wallet.save();
};
