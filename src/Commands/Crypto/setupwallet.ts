import { Command, GuildUser, Interaction, Wallet } from "../../Interfaces/Core";
import { MessageEmbedOptions } from "discord.js";
import errorHandler from "../../Errors/handler";
import ExtendedClient from "../../Client";
import Guild from "../../Database/Models/Guild";

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
      const guild = await Guild.findOne({ id: interaction.guildId });

      const hasWallet = guild.users.find(
        (user: GuildUser) => user.id === interaction.user.id
      );
      if (hasWallet) {
        throw {
          message: "You already have a wallet, use `/wallet` to open it.",
          error_code: 400,
        };
      }

      const newUser: GuildUser = {
        id: interaction.user.id,
        wallet: {
          balance: client.config.startup_wallet_balance,
          crypto: [],
        },
      };
      guild.users.push(newUser);
      await guild.save();

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
        error: { channelID: interaction.channelId, ...error },
        module: "Cryptocurrency",
      });
    }
  },
};
