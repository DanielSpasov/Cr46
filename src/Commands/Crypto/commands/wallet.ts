import { Interaction, SubCommand } from "../../../Interfaces/Core";
import { Cryptocurrency } from "../../../Interfaces/Core";
import { wallet as walletService } from "../helpers";
import Wallet from "../../../Database/Models/Wallet";
import errorHandler from "../../../Handlers/error";
import { MessageEmbedOptions } from "discord.js";
import ExtendedClient from "../../../Client";

export const command: SubCommand = {
  name: "wallet",
  description: "Opens your cryptocurrency wallet.",
  options: [],
  run: async (
    client: ExtendedClient,
    interaction: Interaction
  ): Promise<MessageEmbedOptions> => {
    try {
      // Handle Wallet Creation
      const hasWallet = await Wallet.findOne({ userID: interaction.user.id });
      if (!hasWallet) {
        const newWallet = await walletService.setup(client, interaction);
        if (!newWallet) {
          throw {
            message: "Failed to create a wallet.",
            error_code: 500,
          };
        }
      }

      // Get Wallet Information
      const wallet = await walletService.getInfo(interaction.user.id);
      const USDBalance = {
        name: `**USD** Balance:`,
        value: `\`$${wallet.balance}\``,
      };
      const cryptoBalance = wallet.crypto.map((coin: Cryptocurrency) => ({
        name: `**${coin.name}** Balance:`,
        value: `\`${coin.balance} ${coin.symbol}\``,
        inline: true,
      }));

      // Message
      return {
        author: {
          name: `${interaction.user.username}'s Wallet`,
          icon_url: interaction.user.avatarURL(),
        },
        fields: [USDBalance, ...cryptoBalance],
        color: "GREEN",
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
