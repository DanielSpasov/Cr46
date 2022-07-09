import { CategoryChannel, TextChannel, VoiceChannel } from "discord.js";
import Guild from "../../../Database/Models/Guild";
import errorHandler from "../../../Errors/handler";
import ExtendedClient from "../../../Client";
import { mapType } from "./helpers";

export const createChannel = async (
  client: ExtendedClient,
  newChannel: TextChannel | VoiceChannel | CategoryChannel
) => {
  try {
    const channel = {
      id: newChannel.id,
      type: newChannel.type,
      name: newChannel.name,
      parent: newChannel.parentId,
      position: newChannel.position,
    };
    const dbGuild = await Guild.findOne({ id: newChannel.guildId });
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
    errorHandler({ client, error });
  }
};
