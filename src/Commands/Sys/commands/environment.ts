import { SubCommand, Interaction } from "../../../Interfaces/Core";
import { MessageEmbedOptions } from "discord.js";
import errorHandler from "../../../Handlers/error";
import ExtendedClient from "../../../Client";
import { message } from "../../../Messages";

export const command: SubCommand = {
  name: "env",
  description: "Tests Cr46's environment.",
  options: [],
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
