import { CategoryChannel, TextChannel, VoiceChannel } from "discord.js";
import Guild from "../../../Database/Models/Guild";
import errorHandler from "../../../Errors/handler";
import ExtendedClient from "../../../Client";
import { mapType } from "./helpers";

export const deleteChannel = async (
  client: ExtendedClient,
  channel: TextChannel | VoiceChannel | CategoryChannel
) => {
  try {
    const guild = await Guild.findOne({ id: channel.guildId });
    const typeChannels = guild.channels[mapType[channel.type]];
    const filteredChannels = typeChannels.filter((ch) => ch.id !== channel.id);
    guild.channels[mapType[channel.type]] = filteredChannels;

    const saved = await guild.save();
    if (!saved) {
      throw {
        type: "Database Error",
        message: `Failed to delete Channel with ID: ${channel.id}`,
        error_code: 400,
      };
    }
  } catch (error) {
    errorHandler({ client, error });
  }
};
