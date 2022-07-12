import { Command, Interaction } from "../../Interfaces/Core";
import { MessageEmbedOptions } from "discord.js";
import errorHandler from "../../Errors/handler";
import ExtendedClient from "../../Client";
import { message } from "../../Messages";

export const command: Command = {
  name: "environment",
  description: "Tests Cr46's environment.",
  args: [],
  run: async (
    client: ExtendedClient,
    interaction: Interaction
  ): Promise<MessageEmbedOptions> => {
    try {
      return message.common.status(client);
    } catch (error) {
      errorHandler({
        client,
        interaction,
        error,
        module: "Environment",
      });
    }
  },
};
