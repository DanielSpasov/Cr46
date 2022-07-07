import { Client, TextChannel } from "discord.js";

import errorHandler from "../../../Errors/handler";

export const text = async (
  client: Client,
  channelID?: string
): Promise<TextChannel> => {
  try {
    const _channelID = !channelID ? process.env.CONSOLE_CHANNEL_ID : channelID;
    const channel: TextChannel = await (<Promise<TextChannel>>(
      client.channels.fetch(_channelID)
    ));
    return channel;
  } catch (error) {
    errorHandler(client, error);
  }
};