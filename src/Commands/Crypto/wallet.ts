import { Command, Interaction } from "../../Interfaces/Core";
import { Cryptocurrency } from "../../Interfaces/Core";
import Wallet from "../../Database/Models/Wallet";
import { MessageEmbedOptions } from "discord.js";
import errorHandler from "../../Errors/handler";
import ExtendedClient from "../../Client";
import { get } from "./helpers";

export const command: Command = {
  name: "wallet",
  description: "Opens your cryptocurrency wallet.",
  arguments: [],
  aliases: [],
  run: async (
    client: ExtendedClient,
    interaction: Interaction
  ): Promise<MessageEmbedOptions> => {
    try {
      const wallet = await Wallet.findOne({ userID: interaction.user.id });
      if (!wallet) {
        throw {
          message:
            "You don't have a wallet yet, use `/setupwallet` to create it.",
          error_code: 400,
        };
      }

      const USDBalance = {
        name: `**USD** Balance:`,
        value: `\`$${wallet.balance}\``,
      };
      const cryptoBalance = wallet.crypto.map((coin: Cryptocurrency) => ({
        name: `**${coin.name}** Balance:`,
        value: `\`${coin.balance} ${coin.symbol}\``,
        inline: true,
      }));

      return {
        author: {
          name: `${interaction.user.username}'s Wallet`,
          icon_url: interaction.user.avatarURL(),
        },
        fields: [USDBalance, ...cryptoBalance],
        color: "GREEN",
        timestamp: Date.now(),
        footer: {
          text: "Cr46",
          icon_url: client.config.bot_icon_url,
        },
      };
    } catch (error) {
      console.log(error);
      errorHandler({
        client,
        interaction,
        error,
        module: "Cryptocurrency",
      });
    }
  },
};
