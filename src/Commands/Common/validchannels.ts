import { Command, Interaction } from "../../Interfaces/Core";
import { MessageEmbedOptions } from "discord.js";
import errorHandler from "../../Errors/handler";
import ExtendedClient from "../../Client";
import Guild from "../../Database/Models/Guild";
import { ObjectFlags } from "typescript";

export const command: Command = {
  name: "validchannels",
  description: "Authorizes command usage in that channel.",
  arguments: [
    {
      key: "channel",
      description: "Mention the channel you want to validate",
      required: false,
    },
  ],
  aliases: [],
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
        return {
          title: "Valid Channels",
          description: `<#${guild.validChannels.join(">, <#")}>`,
          color: "GREEN",
        };
      } else {
        const isValidChannel = /<#[0-9]{18}>/.test(channel.value);
        if (!isValidChannel) {
          throw {
            channelID: interaction.channelId,
            message: `${channel.value} is not a valid channel. Please mention the channel e.g. <#${interaction.channelId}>`,
            error_code: 400,
          };
        }

        const channelID = channel.value.slice(2, channel.value.length - 1);
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
        error: { channelID: interaction.channelId, ...error },
        module: "Ping",
      });
    }
  },
};