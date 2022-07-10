import { Interaction, Wallet as IWallet } from "../../../../Interfaces/Core";
import Wallet from "../../../../Database/Models/Wallet";
import ExtendedClient from "../../../../Client";

export const setupWallet = async (
  client: ExtendedClient,
  interaction: Interaction
): Promise<IWallet> => {
  const wallet = new Wallet({
    userID: interaction.user.id,
    daily: null,
    balance: client.config.startup_wallet_balance,
    crypto: [
      {
        name: "Bitcoin",
        symbol: "BTC",
        balance: 0,
      },
      {
        name: "Ethereum",
        symbol: "ETH",
        balance: 0,
      },
      {
        name: "Binance",
        symbol: "BNB",
        balance: 0,
      },
    ],
  });
  await wallet.save();
  return wallet;
};
