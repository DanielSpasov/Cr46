import { ColorResolvable, MessageEmbedOptions } from "discord.js";
import { Command, Interaction } from "../../Interfaces/Core";
import errorHandler from "../../Errors/handler";
import ExtendedClient from "../../Client";

export const command: Command = {
  name: "ping",
  description: "Shows Cr46's Latency in miliseconds.",
  arguments: [],
  aliases: [],
  run: async (
    client: ExtendedClient,
    interaction: Interaction
  ): Promise<MessageEmbedOptions> => {
    try {
      let color: ColorResolvable;
      if (client.ws.ping <= 75) {
        color = "#78ff66";
      } else if (client.ws.ping <= 150) {
        color = "#e6fa64";
      } else if (client.ws.ping <= 999) {
        color = "#fa7664";
      } else {
        color = "DARK_BUT_NOT_BLACK";
      }

      return {
        description: `\`${client.ws.ping}ms\``,
        color,
      };
    } catch (error) {
      errorHandler({
        client,
        error: { channelID: interaction.channelId, ...error },
        module: "Ping",
      });
    }
  },
};
