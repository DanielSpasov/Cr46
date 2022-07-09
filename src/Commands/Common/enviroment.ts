import { Command, Interaction } from "../../Interfaces/Core";
import { MessageEmbedOptions } from "discord.js";
import errorHandler from "../../Errors/handler";
import ExtendedClient from "../../Client";
import { message } from "../../Messages";

export const command: Command = {
  name: "enviroment",
  description: "Tests Cr46's enviroment.",
  arguments: [],
  aliases: [],
  run: async (
    client: ExtendedClient,
    interaction: Interaction
  ): Promise<MessageEmbedOptions> => {
    try {
      return message.common.status(client);
    } catch (error) {
      errorHandler({
        client,
        error: { channelID: interaction.channelId, ...error },
        module: "Enviroment",
      });
    }
  },
};
