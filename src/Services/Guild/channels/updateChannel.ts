import { CategoryChannel, Client, TextChannel, VoiceChannel } from "discord.js";

import { IChannel } from "../../../Interfaces/IChannel";
import Guild from "../../../Database/Models/Guild";
import errorHandler from "../../../Errors/handler";
import { mapType } from "./helpers";

export const updateChannel = async (
  client: Client,
  channel: TextChannel | VoiceChannel | CategoryChannel
) => {
  try {
    const updatedChannel: IChannel = {
      id: channel.id,
      name: channel.name,
      type: channel.type,
      parent: channel.parentId,
      position: channel.position,
    };
    const guild = await Guild.findOne({ id: channel.guildId });
    const channels = guild.channels[mapType[channel.type]];
    // channels.map((ch: IChannel) =>
    //   ch.id === updatedChannel.id ? updatedChannel : ch
    // );
    // for (let i in channels) {
    //   console.log(
    //     channels[i].name,
    //     guild.channels[mapType[channel.type]][i].name
    //   );
    // }

    // guild.channels[mapType[channel.type]] = channels;

    // const saved = guild.save();
    // if (!saved) {
    //   throw {
    //     type: "Database Error",
    //     message: `Failed to update Channel with ID: ${channel.id}`,
    //     error_code: 400,
    //   };
    // }
  } catch (error) {
    errorHandler(client, error);
  }
};
