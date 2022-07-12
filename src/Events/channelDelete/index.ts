import errorHandler from "../../Handlers/error";
import Guild from "../../Database/Models/Guild";
import { Event } from "../../Interfaces/Core";
import ExtendedClient from "../../Client";
import { TextChannel } from "discord.js";

export const event: Event = {
  name: "channelDelete",
  run: async (client: ExtendedClient, channel: TextChannel) => {
    try {
      const guild = await Guild.findOne({ id: channel.guildId });
      if (guild.validChannels.includes(channel.id)) {
        const channelIndex = guild.validChannels.indexOf(channel.id);
        guild.validChannels.splice(channelIndex, 1);
        await guild.save();
      }
    } catch (error) {
      errorHandler({ client, error });
    }
  },
};
