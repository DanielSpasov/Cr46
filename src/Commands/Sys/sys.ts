import { Interaction, Command } from "../../Interfaces/Core";
import { Collection, MessageEmbedOptions } from "discord.js";
import handleSubCommand from "../../Handlers/subCommand";
import errorHandler from "../../Handlers/error";
import ExtendedClient from "../../Client";

export const command: Command = {
  name: "sys",
  description: "System commands.",
  subCommands: new Collection(),
  options: [],
  run: async (
    client: ExtendedClient,
    interaction: Interaction
  ): Promise<MessageEmbedOptions> => {
    try {
      return await handleSubCommand(client, interaction);
    } catch (error) {
      errorHandler({
        client,
        interaction,
        error,
        module: "System",
      });
    }
  },
};
