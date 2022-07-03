import { CategoryChannel, Client, TextChannel, VoiceChannel } from "discord.js";

import Guild from "../../../Database/Models/Guild";
import errorHandler from "../../../Errors/handler";
import { mapType } from "./helpers";

export const deleteChannel = async (
  client: Client,
  channel: TextChannel | VoiceChannel | CategoryChannel,
  guildID: string
) => {
  try {
    const dbGuild = await Guild.findOne({ id: guildID });
    const typeChannels = dbGuild.channels[mapType[channel.type]];
    const filteredChannels = typeChannels.filter((ch) => ch.id !== channel.id);
    dbGuild.channels[mapType[channel.type]] = filteredChannels;
    const saved = await dbGuild.save();
    if (!saved) {
      throw {
        type: "Database Error",
        message: `Failed to delete Channel with ID: ${channel.id}`,
        error_code: 400,
      };
    }
  } catch (error) {
    errorHandler(client, error);
  }
};
