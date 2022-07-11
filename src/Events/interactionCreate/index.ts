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

        const isEphemeral = client.config.ephemeral_commands.includes(
          interaction.commandName
        );
        const hasLength = Boolean(guild.validChannels.length);
        const isValid = guild.validChannels.includes(interaction.channelId);
        if (hasLength && !isValid) {
          await interaction.reply({
            embeds: [messages.common.invalidChannel],
            ephemeral: true,
          });
          return;
        }

        await interaction.deferReply({ ephemeral: isEphemeral });
        const message = await client.commands
          .get(interaction.commandName)
          .run(client, interaction);
        if (!message) return;
        await interaction.editReply({ embeds: [message] });
      }
    } catch (error) {
      errorHandler({ client, error });
    }
  },
};
