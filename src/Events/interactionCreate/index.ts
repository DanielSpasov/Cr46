import handleCommand from "../../Handlers/command";
import errorHandler from "../../Handlers/error";
import { Event } from "../../Interfaces/Core";
import ExtendedClient from "../../Client";
import { Interaction } from "discord.js";

export const event: Event = {
  name: "interactionCreate",
  run: async (client: ExtendedClient, interaction: Interaction) => {
    try {
      if (interaction.isCommand()) {
        const message = await handleCommand(client, interaction);
        if (!message) return;
        await interaction.editReply({ embeds: [message] });
      }
    } catch (error) {
      errorHandler({ client, error });
    }
  },
};
