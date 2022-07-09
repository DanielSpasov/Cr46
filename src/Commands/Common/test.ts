import { Command, Interaction } from "../../Interfaces/Core";
import errorHandler from "../../Errors/handler";
import ExtendedClient from "../../Client";
import { message } from "../../Messages";

export const command: Command = {
  name: "test",
  description: "Tests Cr46's enviroment.",
  arguments: [],
  aliases: [],
  run: async (client: ExtendedClient, interaction: Interaction) => {
    try {
      return message.common.status(client);
    } catch (error) {
      errorHandler({
        client,
        error: { channelID: interaction.channelId, ...error },
        module: "League of Legends",
      });
    }
  },
};
