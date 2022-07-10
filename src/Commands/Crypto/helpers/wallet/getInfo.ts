import { Wallet as IWallet } from "../../../../Interfaces/Core";
import Wallet from "../../../../Database/Models/Wallet";

export const getInfo = async (userID: string): Promise<IWallet> => {
  return await Wallet.findOne({ userID });
};
