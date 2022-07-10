import { Command, Interaction } from "../../Interfaces/Core";
import Wallet from "../../Database/Models/Wallet";
import { MessageEmbedOptions } from "discord.js";
import errorHandler from "../../Errors/handler";
import ExtendedClient from "../../Client";

export const command: Command = {
  name: "setupwallet",
  description:
    "Setup your wallet to start trading your discord $ for cryptocurrencies.",
  arguments: [],
  aliases: [],
  run: async (
    client: ExtendedClient,
    interaction: Interaction
  ): Promise<MessageEmbedOptions> => {
    try {
      const hasWallet = await Wallet.findOne({ userID: interaction.user.id });
      if (hasWallet) {
        throw {
          message: "You already have a wallet, use `/wallet` to open it.",
          error_code: 400,
        };
      }

      const wallet = new Wallet({
        userID: interaction.user.id,
        daily: null,
        balance: client.config.startup_wallet_balance,
        crypto: [],
      });
      await wallet.save();

      return {
        title: "Wallet Setup Successful!",
        description: "Use `/wallet` to open it.",
        color: "GREEN",
        timestamp: Date.now(),
        footer: {
          text: "Cr46",
          icon_url: client.config.bot_icon_url,
        },
      };
    } catch (error) {
      errorHandler({
        client,
        interaction,
        error,
        module: "Cryptocurrency",
      });
    }
  },
};
