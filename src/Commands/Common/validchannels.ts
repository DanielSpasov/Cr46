import { Command, Interaction } from "../../Interfaces/Core";
import { MessageEmbedOptions } from "discord.js";
import errorHandler from "../../Errors/handler";
import Guild from "../../Database/Models/Guild";
import ExtendedClient from "../../Client";

export const command: Command = {
  name: "validchannels",
  description: "Authorizes command usage in that channel.",
  subCommands: [],
  options: [
    {
      name: "channel",
      description: "Mention the channel you want to validate",
      required: false,
    },
  ],
  run: async (
    client: ExtendedClient,
    interaction: Interaction
  ): Promise<MessageEmbedOptions> => {
    try {
      const guild = await Guild.findOne({ id: interaction.guildId });
      const channel = interaction.options._hoistedOptions.find(
        (x) => x.name === "channel"
      );

      if (!channel) {
        let validChannels: string = "Every channel is valid.";
        if (guild.validChannels.length) {
          validChannels = guild.validChannels
            .map((ch: string) => (ch = `<#${ch}>`))
            .join(", ");
        }

        return {
          title: "Valid Channels",
          description: validChannels,
          color: "GREEN",
        };
      } else {
        const channelID = channel.value.slice(2, channel.value.length - 1);
        const guilds = await client.guilds.fetch();
        const currentGuild = await guilds.get(interaction.guildId).fetch();
        const channels = await currentGuild.channels.fetch();
        const targetChannel = channels.get(channelID);

        const isValidChannel =
          /<#[0-9]{18}>/.test(channel.value) &&
          targetChannel.type === "GUILD_TEXT";
        if (!isValidChannel) {
          throw {
            message: `${channel.value} is not a valid text channel. Please mention the channel e.g. <#${interaction.channelId}>`,
            error_code: 400,
          };
        }

        if (guild.validChannels.includes(channelID)) {
          const channelIndex = guild.validChannels.indexOf(channelID);
          guild.validChannels.splice(channelIndex, 1);
          await guild.save();
          return {
            description: `<#${channelID}> is no more a valid channel.`,
            color: "GREEN",
          };
        } else {
          guild.validChannels.push(channelID);
          await guild.save();
          return {
            description: `<#${channelID}> is now a valid channel.`,
            color: "GREEN",
          };
        }
      }
    } catch (error) {
      errorHandler({
        client,
        interaction,
        error,
        module: "Channel Validating",
      });
    }
  },
};
