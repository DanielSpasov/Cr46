import { message as messages } from "../../Messages";
import Guild from "../../Database/Models/Guild";
import errorHandler from "../../Errors/handler";
import { Event } from "../../Interfaces/Core";
import ExtendedClient from "../../Client";
import { Interaction } from "discord.js";

export const event: Event = {
  name: "interactionCreate",
  run: async (client: ExtendedClient, interaction: Interaction) => {
    try {
      if (interaction.isCommand()) {
        const guild = await Guild.findOne({ id: interaction.guildId });

        if (
          !guild.validChannels.includes(interaction.channelId) &&
          !!guild.validChannels.length
        ) {
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
