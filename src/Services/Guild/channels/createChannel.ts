import { CategoryChannel, Client, TextChannel, VoiceChannel } from "discord.js";

import Guild from "../../../Database/Models/Guild";
import errorHandler from "../../../Errors/handler";
import { mapType } from "./helpers";

export const createChannel = async (
  client: Client,
  newChannel: TextChannel | VoiceChannel | CategoryChannel,
  id: string
) => {
  try {
    const channel = {
      id: newChannel.id,
      type: newChannel.type,
      name: newChannel.name,
      parent: newChannel.parentId,
      position: newChannel.position,
    };
    const dbGuild = await Guild.findOne({ id });
    dbGuild.channels[mapType[channel.type]].push(channel);
    const saved = await dbGuild.save();
    if (!saved) {
      throw {
        type: "Database Error",
        message: `Failed to create Channel with ID: ${newChannel.id}`,
        error_code: 400,
      };
    }
  } catch (error) {
    errorHandler(client, error);
  }
};
