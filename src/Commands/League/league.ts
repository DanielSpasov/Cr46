import { Interaction, Command } from "../../Interfaces/Core";
import { Collection, MessageEmbedOptions } from "discord.js";
import errorHandler from "../../Handlers/error";
import ExtendedClient from "../../Client";

import handleSubCommand from "../../Handlers/subCommand";

export const command: Command = {
  name: "league",
  description: "League of Legends commands.",
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
        module: "League of Legends",
      });
    }
  },
};
