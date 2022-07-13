import { ChannelData, Collection, MessageEmbedOptions } from "discord.js";
import { Command, Interaction } from "../../Interfaces/Core";
import errorHandler from "../../Handlers/error";
import Guild from "../../Database/Models/Guild";
import ExtendedClient from "../../Client";

export const command: Command = {
  name: "validchannels",
  description: "Authorizes command usage in that channel.",
  subCommands: new Collection(),
  options: [
    {
      name: "channel",
      description: "Mention the channel you want to validate",
      type: "Channel",
      required: false,
    },
  ],
  run: async (
    client: ExtendedClient,
    interaction: Interaction
  ): Promise<MessageEmbedOptions> => {
    try {
      // Interaction Formatting
      const guild = await Guild.findOne({ id: interaction.guildId });
      const channel = interaction.options._hoistedOptions.find(
        (x: ChannelData) => x.name === "channel"
      );

      // Check Valid Channels (No Options Selected)
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
        // Remove Valid Channel (Valid Channel Selected)
        if (guild.validChannels.includes(channel.value)) {
          const channelIndex = guild.validChannels.indexOf(channel.value);
          guild.validChannels.splice(channelIndex, 1);
          await guild.save();
          return {
            description: `<#${channel.value}> is no more a valid channel.`,
            color: "GREEN",
          };
        } else {
          // Add Valid Channel (Invalid Channel Selected)
          guild.validChannels.push(channel.value);
          await guild.save();
          return {
            description: `<#${channel.value}> is now a valid channel.`,
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
