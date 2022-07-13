import { Interaction, SubCommand } from "../../../Interfaces/Core";
import { wallet as walletSc } from "../helpers/wallet";
import Wallet from "../../../Database/Models/Wallet";
import { MessageEmbedOptions } from "discord.js";
import errorHandler from "../../../Handlers/error";
import ExtendedClient from "../../../Client";
import { format } from "../helpers";

export const command: SubCommand = {
  name: "daily",
  description: "Collect your daily $75.",
  options: [],
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

      const hasCollected = walletSc.hasCollectedDaily(wallet.daily, new Date());
      if (!hasCollected) {
        wallet.balance += 75;
        wallet.daily = new Date();
        await wallet.save();
      } else {
        const nextDaily = format.dailyDate(wallet.daily);
        throw {
          message: `You have already collected your daily \`$75\`.\nCome back around ${nextDaily}.`,
          error_code: 400,
        };
      }

      return {
        author: {
          name: `${interaction.user.username}'s Wallet`,
          icon_url: interaction.user.avatarURL(),
        },
        description: "Collected Daily `$75`.\nCome tomorrow for another `$75`.",
        color: "GREEN",
        footer: {
          text: "Cr46",
          icon_url: client.user.avatarURL(),
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
