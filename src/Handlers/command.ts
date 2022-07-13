import { CommandInteraction, MessageEmbedOptions } from "discord.js";
import Guild from "../Database/Models/Guild";
import ExtendedClient from "../Client";
import { message } from "../Messages";

interface ExtendedCommandInteraction extends CommandInteraction {
  options: any;
}

const handleCommand = async (
  client: ExtendedClient,
  interaction: ExtendedCommandInteraction
): Promise<MessageEmbedOptions> => {
  const guild = await Guild.findOne({ id: interaction.guildId });

  const hasLength = Boolean(guild.validChannels.length);
  const isValid = guild.validChannels.includes(interaction.channelId);
  if (hasLength && !isValid) {
    await interaction.reply({
      embeds: [message.common.invalidChannel],
      ephemeral: true,
    });
    return;
  }

  const isEphemeral = client.config.ephemeral_commands.includes(
    interaction.options._subcommand || interaction.commandName
  );
  await interaction.deferReply({ ephemeral: isEphemeral });

  return await client.commands
    .get(interaction.commandName)
    .run(client, interaction);
};

export default handleCommand;
