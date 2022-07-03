import { Client, VoiceChannel } from "discord.js";

import errorHandler from "../../../Errors/handler";

export const voice = async (
  client: Client,
  channelID?: string
): Promise<VoiceChannel> => {
  try {
    const _channelID = !channelID ? process.env.CONSOLE_CHANNEL_ID : channelID;
    const channel: VoiceChannel = await (<Promise<VoiceChannel>>(
      client.channels.fetch(_channelID)
    ));
    return channel;
  } catch (error) {
    errorHandler(client, error);
  }
};
