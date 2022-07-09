import { message as messages } from "../../Messages";
import { guildService } from "../../Services/Guild";
import errorHandler from "../../Errors/handler";
import { validateInteraction } from "./helpers";
import { Event } from "../../Interfaces/Core";
import ExtendedClient from "../../Client";
import { Interaction } from "discord.js";

export const event: Event = {
  name: "interactionCreate",
  run: async (client: ExtendedClient, interaction: Interaction) => {
    try {
      if (interaction.isCommand()) {
        const guild = await guildService.get(client, interaction.guildId);
        const isValid = validateInteraction(
          client,
          guild,
          interaction.channelId
        );
        if (!isValid) {
          await interaction.reply({
            embeds: [messages.common.invalidChannel(client)],
            ephemeral: true,
          });
          return;
        }

        await interaction.deferReply();
        const message = await client.commands
          .get(interaction.commandName)
          .run(client, interaction, []);
        if (!message) return await interaction.deleteReply();
        interaction.editReply({ embeds: [message] });
      }
    } catch (error) {
      errorHandler({ client, error });
    }
  },
};
