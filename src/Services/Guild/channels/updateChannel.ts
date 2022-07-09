import { CategoryChannel, TextChannel, VoiceChannel } from "discord.js";
import { Channel } from "../../../Interfaces/Core";
import Guild from "../../../Database/Models/Guild";
import errorHandler from "../../../Errors/handler";
import ExtendedClient from "../../../Client";
import { mapType } from "./helpers";

export const updateChannel = async (
  client: ExtendedClient,
  channel: TextChannel | VoiceChannel | CategoryChannel
) => {
  try {
    const updatedChannel: Channel = {
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
    errorHandler({ client, error });
  }
};
