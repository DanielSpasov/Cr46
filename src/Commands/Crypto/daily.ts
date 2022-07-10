import { Command, Interaction } from "../../Interfaces/Core";
import { Cryptocurrency } from "../../Interfaces/Core";
import { wallet as walletService } from "./helpers";
import Wallet from "../../Database/Models/Wallet";
import { MessageEmbedOptions } from "discord.js";
import errorHandler from "../../Errors/handler";
import ExtendedClient from "../../Client";
import { compareDailyHours } from "./helpers/wallet/compareDailyHours";

export const command: Command = {
  name: "daily",
  description: "Collect your daily $75.",
  arguments: [],
  aliases: [],
  run: async (
    client: ExtendedClient,
    interaction: Interaction
  ): Promise<MessageEmbedOptions> => {
    try {
      const hasWallet = await Wallet.findOne({ userID: interaction.user.id });
      if (!hasWallet) {
        throw {
          message: "Failed to find a wallet. Type `/wallet` to create one.",
          error_code: 404,
        };
      }

      const wallet = await Wallet.findOne({ userID: interaction.user.id });

      const hasCollected = compareDailyHours(wallet.daily, new Date());
      if (!hasCollected) {
        wallet.balance += 75;
        wallet.daily = new Date();
        await wallet.save();
      } else {
        throw {
          message: `You have alerady collected your daily.`,
          error_code: 401,
        };
      }

      return {
        author: {
          name: `${interaction.user.username}'s Wallet`,
          icon_url: interaction.user.avatarURL(),
        },
        description: "Collected Daily `$75`.\nCome tomorrow for another `$75`.",
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
        module: "Daily Money",
      });
    }
  },
};
